import React, { useState } from 'react';
import { X, Sliders, History, Save, Check } from 'lucide-react';
import { WaterFacility } from '../../types';

interface WaterOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'setting' | 'logs';
  facility: WaterFacility | null;
  onSaveSetting?: (facilityId: string, settings: any) => void;
}

export const WaterOperationModal: React.FC<WaterOperationModalProps> = ({
  isOpen,
  onClose,
  type,
  facility,
  onSaveSetting,
}) => {
  const [reportCycle, setReportCycle] = useState('15分钟');
  const [thresholdMax, setThresholdMax] = useState('150');
  const [alarmEnabled, setAlarmEnabled] = useState(true);

  if (!isOpen || !facility) return null;

  const isSetting = type === 'setting';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSaveSetting) {
      onSaveSetting(facility.id, { reportCycle, thresholdMax, alarmEnabled });
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-300 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
              {isSetting ? <Sliders className="w-4 h-4" /> : <History className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isSetting ? `填报参数设置 - ${facility.name}` : `操作与审计日志 - ${facility.name}`}
              </h3>
              <p className="text-[11px] font-mono text-slate-500">{facility.code}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {isSetting ? (
          <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">自动上报采集周期</label>
              <select
                value={reportCycle}
                onChange={(e) => setReportCycle(e.target.value)}
                className="w-full h-8 px-2.5 rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white"
              >
                <option value="5分钟">每 5 分钟 (高精密度)</option>
                <option value="15分钟">每 15 分钟 (标准规范)</option>
                <option value="1小时">每 1 小时 (节能模式)</option>
                <option value="1天">每天 1 次 (人工抄报)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">取水量超限预警阈值 (m³/h)</label>
              <input
                type="number"
                value={thresholdMax}
                onChange={(e) => setThresholdMax(e.target.value)}
                className="w-full h-8 px-2.5 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800">短信与系统预警推送</span>
                <p className="text-[11px] text-slate-500 mt-0.5">当流量异常突增或通信中断时向责任人告警</p>
              </div>
              <input
                type="checkbox"
                checked={alarmEnabled}
                onChange={(e) => setAlarmEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1 shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>保存设置</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-5 space-y-3 text-xs max-h-80 overflow-y-auto custom-scrollbar">
            <div className="space-y-3 divide-y divide-slate-100">
              <div className="pt-2 first:pt-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">状态由【停用】变更为【正常】</span>
                  <span className="text-[10px] text-slate-400">2026-09-01 10:45</span>
                </div>
                <p className="text-slate-500 mt-0.5">操作人: 管理员(18818260278) | 备注: 完成年度例行检定，恢复正常供水计量</p>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">计量档案信息校验审核通过</span>
                  <span className="text-[10px] text-slate-400">2026-08-30 16:20</span>
                </div>
                <p className="text-slate-500 mt-0.5">操作人: 水资源科-李工 | 备注: 核对许可证取水许可量与表具量程匹配</p>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">设施初始档案建档录入</span>
                  <span className="text-[10px] text-slate-400">2026-01-10 09:00</span>
                </div>
                <p className="text-slate-500 mt-0.5">操作人: 实施运维团队 | 备注: 中央发展基金农村饮水安全项目建档</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
              >
                关闭
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
