import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Clock, 
  User, 
  Calendar, 
  CheckCircle2, 
  QrCode, 
  Wrench, 
  FileText, 
  Send,
  Boxes,
  AlertTriangle
} from 'lucide-react';
import { WorkOrder } from '../../types';

interface MesOrderDetailDrawerProps {
  order: WorkOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (order: WorkOrder) => void;
  onAssign: (order: WorkOrder) => void;
}

export const MesOrderDetailDrawer: React.FC<MesOrderDetailDrawerProps> = ({
  order,
  isOpen,
  onClose,
  onEdit,
  onAssign,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'routing' | 'bom' | 'logs'>('info');

  if (!isOpen || !order) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white max-h-[90vh] rounded-2xl shadow-2xl flex flex-col border border-slate-300 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shadow-inner">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{order.productName}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  order.status === '生产中'
                    ? 'bg-blue-100 text-blue-800'
                    : order.status === '已完工'
                    ? 'bg-emerald-100 text-emerald-800'
                    : order.status === '暂停'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500 mt-0.5">工单号: {order.orderCode}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onAssign(order)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>派工</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-5 bg-white text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`py-3 px-3 border-b-2 font-semibold transition ${
              activeTab === 'info'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            工单详情
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('routing')}
            className={`py-3 px-3 border-b-2 font-semibold transition ${
              activeTab === 'routing'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            工艺工序路线
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bom')}
            className={`py-3 px-3 border-b-2 font-semibold transition ${
              activeTab === 'bom'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            BOM物料清单
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`py-3 px-3 border-b-2 font-semibold transition ${
              activeTab === 'logs'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            报工与质检记录
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs custom-scrollbar">
          
          {activeTab === 'info' && (
            <div className="space-y-4">
              {/* Progress Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-blue-900">生产执行进度</span>
                  <span className="font-bold text-blue-800 text-sm font-mono">{order.progress}%</span>
                </div>
                <div className="w-full bg-blue-200/60 rounded-full h-2 overflow-hidden mb-2">
                  <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${order.progress}%` }}></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                  <span>计划: {order.plannedQuantity} {order.unit}</span>
                  <span>已完工: {order.completedQuantity} {order.unit}</span>
                  <span>合格率: 99.2%</span>
                </div>
              </div>

              {/* Work Order Info Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-slate-400">产品编号</span>
                  <p className="font-mono font-medium text-slate-800 mt-0.5">{order.productCode}</p>
                </div>
                <div>
                  <span className="text-slate-400">规格型号</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{order.spec}</p>
                </div>
                <div>
                  <span className="text-slate-400">材料牌号</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{order.materialGrade}</p>
                </div>
                <div>
                  <span className="text-slate-400">零件图号</span>
                  <p className="font-mono font-medium text-slate-800 mt-0.5">{order.partNumber}</p>
                </div>
                <div>
                  <span className="text-slate-400">生产批次</span>
                  <p className="font-mono font-medium text-slate-800 mt-0.5">{order.productionBatch}</p>
                </div>
                <div>
                  <span className="text-slate-400">生产计划</span>
                  <p className="font-mono font-medium text-slate-800 mt-0.5">{order.productionPlan}</p>
                </div>
                <div>
                  <span className="text-slate-400">客户名称</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{order.customerName}</p>
                </div>
                <div>
                  <span className="text-slate-400">制单人</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{order.creator}</p>
                </div>
              </div>

              {/* Barcode Tag Visual */}
              <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <QrCode className="w-8 h-8 text-blue-600" />
                  <div>
                    <h5 className="font-bold text-slate-800">工单追溯标识条码</h5>
                    <p className="font-mono text-slate-500 text-[11px]">{order.orderTag}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`打印工单流转卡: ${order.orderCode}`)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 font-semibold"
                >
                  打印流转卡
                </button>
              </div>
            </div>
          )}

          {activeTab === 'routing' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-semibold text-slate-800">标准工艺路线: 精密流量传感器制造 (PR-EM-10)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">车间: {order.workshop} | 责任工程师: {order.operator || '李永强'}</p>
              </div>

              <div className="space-y-3 pl-4 border-l-2 border-blue-500 ml-2">
                <div className="relative pl-3">
                  <span className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                  <p className="font-bold text-slate-800">工序 10: 管道毛坯精车与法兰端面加工</p>
                  <p className="text-[11px] text-slate-500">机床: 数控车床 CNC-04 | 状态: 已完工 (合格率 100%)</p>
                </div>

                <div className="relative pl-3">
                  <span className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white"></span>
                  <p className="font-bold text-slate-800">工序 20: 衬里注塑与励磁线圈组装</p>
                  <p className="text-[11px] text-slate-500">工位: 组装工位 02 | 状态: 生产中 (正在作业)</p>
                </div>

                <div className="relative pl-3">
                  <span className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-slate-300 border-2 border-white"></span>
                  <p className="font-bold text-slate-800">工序 30: 水力标定与耐压试验</p>
                  <p className="text-[11px] text-slate-500">标定塔: 标准表法水流量检定装置 | 状态: 待生产</p>
                </div>

                <div className="relative pl-3">
                  <span className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-slate-300 border-2 border-white"></span>
                  <p className="font-bold text-slate-800">工序 40: 成品检验与激光打码包装</p>
                  <p className="text-[11px] text-slate-500">质检台: QA-01 | 状态: 待生产</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bom' && (
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              <div className="p-3 bg-slate-50 flex items-center justify-between font-semibold text-slate-700">
                <span>物料编码与名称</span>
                <span>定额 / 已发</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">MAT-316L-100 316L不锈钢法兰</p>
                  <p className="text-[11px] text-slate-400">规格: DN100 PN16</p>
                </div>
                <span className="font-mono font-semibold text-slate-700">200 / 200 件 (已领全)</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">COIL-MAG-01 磁极励磁铜线圈组</p>
                  <p className="text-[11px] text-slate-400">规格: 0.35mm QZ-2</p>
                </div>
                <span className="font-mono font-semibold text-slate-700">400 / 400 组 (已领全)</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">CHIP-MCU-32 微功耗主控芯片</p>
                  <p className="text-[11px] text-slate-400">规格: LQFP-48</p>
                </div>
                <span className="font-mono font-semibold text-slate-700">200 / 200 片 (已领全)</span>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center justify-between font-bold text-emerald-900">
                  <span>首件检验合格确认</span>
                  <span className="text-[10px]">2026-09-01 09:30</span>
                </div>
                <p className="text-[11px] text-emerald-800 mt-1">
                  检验员: 质检部-陈工 | 测量尺寸公差在 ±0.02mm 范围内，外观光洁无毛刺，允许批量加工。
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>工单派工至精密加工一车间</span>
                  <span className="text-[10px] text-slate-400">2026-09-01 08:35</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  调度员: 张建军 | 安排李永强班组领料生产
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onEdit(order)}
            className="px-4 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 font-semibold"
          >
            编辑工单
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            关闭详情
          </button>
        </div>

      </div>
    </div>
  );
};
