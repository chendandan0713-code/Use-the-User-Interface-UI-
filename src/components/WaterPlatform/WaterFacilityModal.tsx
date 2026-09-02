import React, { useState, useEffect } from 'react';
import { X, Save, Building2, MapPin, Gauge, ShieldCheck, Check } from 'lucide-react';
import { WaterFacility, WaterUsageType, WaterSourceType, MeteringMethod, TransmissionMethod, FundingSource, ReportMethod } from '../../types';
import { CustomSelect } from '../Common/CustomSelect';

interface WaterFacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  facility: WaterFacility | null;
  onSave: (facilityData: Partial<WaterFacility>) => void;
}

// Module-level draft cache so unsubmitted drafts persist across open/close
let draftAddFormData: Partial<WaterFacility> = {
  name: '',
  code: '632524JL' + Math.floor(10000 + Math.random() * 90000),
  district: '城东区',
  waterOwner: '',
  permitNumber: '取水（青宁）字[2026]第' + Math.floor(100 + Math.random() * 900) + '号',
  waterSourceType: '地表水',
  fundingSource: '中央发展基金',
  fundingYear: '2026',
  specModel: 'DN100-W4',
  facilityType: '电磁水表',
  status: '正常',
  reportMethod: '在线',
  transmissionMethod: '在线',
  isArchived: true,
  isReportedToNational: true,
  address: '',
  waterUsage: '生活饮用',
  meteringMethod: '电磁流量计',
  dataSource: '物联网RTU遥测',
  monitorPointCode: 'MP-630102-108',
  flowRate: 12.5,
  accumulatedFlow: 5400.0,
  lastReportTime: '2026-09-01',
  lastCalibrationTime: '2026-09-01',
  calibrationExpiryDate: '2027-08-31',
};

export const WaterFacilityModal: React.FC<WaterFacilityModalProps> = ({
  isOpen,
  onClose,
  facility,
  onSave,
}) => {
  const isEditing = !!facility;

  const [formData, setFormData] = useState<Partial<WaterFacility>>(
    facility ? facility : draftAddFormData
  );

  useEffect(() => {
    if (isOpen) {
      if (facility) {
        setFormData(facility);
      } else {
        setFormData(draftAddFormData);
      }
    }
  }, [facility, isOpen]);

  // Keep module draft in sync for additions
  const handleFieldChange = <K extends keyof WaterFacility>(key: K, value: WaterFacility[K]) => {
    setFormData((prev) => {
      const updated = { ...prev, [key]: value };
      if (!isEditing) {
        draftAddFormData = updated;
      }
      return updated;
    });
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert('请输入设施名称');
      return;
    }
    if (!formData.code?.trim()) {
      alert('请输入计量设施编号');
      return;
    }
    onSave(formData);
    // Reset draft after successful submit
    if (!isEditing) {
      draftAddFormData = {
        name: '',
        code: '632524JL' + Math.floor(10000 + Math.random() * 90000),
        district: '城东区',
        waterOwner: '',
        permitNumber: '取水（青宁）字[2026]第' + Math.floor(100 + Math.random() * 900) + '号',
        waterSourceType: '地表水',
        fundingSource: '中央发展基金',
        fundingYear: '2026',
        specModel: 'DN100-W4',
        facilityType: '电磁水表',
        status: '正常',
        reportMethod: '在线',
        transmissionMethod: '在线',
        isArchived: true,
        isReportedToNational: true,
        address: '',
        waterUsage: '生活饮用',
        meteringMethod: '电磁流量计',
        dataSource: '物联网RTU遥测',
        monitorPointCode: 'MP-630102-' + Math.floor(100 + Math.random() * 900),
        flowRate: 12.5,
        accumulatedFlow: 5400.0,
        lastReportTime: '2026-09-01',
        lastCalibrationTime: '2026-09-01',
        calibrationExpiryDate: '2027-08-31',
      };
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-300 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isEditing ? '编辑计量设施档案' : '新增取用水计量设施'}
              </h3>
              <p className="text-xs text-slate-500">西宁市取用水精细化计量监管系统</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs custom-scrollbar">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 设施名称 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                <span className="text-rose-500 mr-0.5">*</span>设施名称
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="例如: 日村人畜饮水工程"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* 计量设施(器具)编号 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                <span className="text-rose-500 mr-0.5">*</span>计量器具编号
              </label>
              <input
                type="text"
                required
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="例如: 632524JL00186"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-mono"
              />
            </div>

            {/* 所属区县 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">所属区县</label>
              <CustomSelect
                className="w-full"
                value={formData.district || '城东区'}
                onChange={(val) => setFormData({ ...formData, district: val })}
                options={[
                  { value: '城东区', label: '城东区' },
                  { value: '城中区', label: '城中区' },
                  { value: '城西区', label: '城西区' },
                  { value: '城北区', label: '城北区' },
                  { value: '湟中区', label: '湟中区' },
                  { value: '大通县', label: '大通县' },
                  { value: '湟源县', label: '湟源县' },
                ]}
              />
            </div>

            {/* 取水权人名称 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">取水权人名称</label>
              <input
                type="text"
                value={formData.waterOwner || ''}
                onChange={(e) => setFormData({ ...formData, waterOwner: e.target.value })}
                placeholder="例如: 西宁市东川供水有限责任公司"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
              />
            </div>

            {/* 取水许可证号 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">许可证编号</label>
              <input
                type="text"
                value={formData.permitNumber || ''}
                onChange={(e) => setFormData({ ...formData, permitNumber: e.target.value })}
                placeholder="例如: 取水（青宁）字[2024]第0018号"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono"
              />
            </div>

            {/* 监测点编号 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">监测点编号</label>
              <input
                type="text"
                value={formData.monitorPointCode || ''}
                onChange={(e) => setFormData({ ...formData, monitorPointCode: e.target.value })}
                placeholder="例如: MP-630102-001"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono"
              />
            </div>

            {/* 水源类型 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">水源类型</label>
              <CustomSelect
                className="w-full"
                value={formData.waterSourceType || '地表水'}
                onChange={(val) => setFormData({ ...formData, waterSourceType: val as WaterSourceType })}
                options={[
                  { value: '地表水', label: '地表水' },
                  { value: '地下水', label: '地下水' },
                  { value: '水库水', label: '水库水' },
                  { value: '泉水', label: '泉水' },
                  { value: '自备井', label: '自备井' },
                ]}
              />
            </div>

            {/* 建设来源 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">建设来源</label>
              <CustomSelect
                className="w-full"
                value={formData.fundingSource || '中央发展基金'}
                onChange={(val) => setFormData({ ...formData, fundingSource: val as FundingSource })}
                options={[
                  { value: '中央发展基金', label: '中央发展基金' },
                  { value: '自计量', label: '自计量' },
                  { value: '省级水利专项', label: '省级水利专项' },
                  { value: '市级统筹', label: '市级统筹' },
                ]}
              />
            </div>

            {/* 资金年份 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">资金年份</label>
              <input
                type="text"
                value={formData.fundingYear || '2026'}
                onChange={(e) => setFormData({ ...formData, fundingYear: e.target.value })}
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono"
              />
            </div>

            {/* 计量设施类型 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">计量器具类型</label>
              <input
                type="text"
                value={formData.facilityType || '电磁水表'}
                onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
              />
            </div>

            {/* 规格型号 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">规格型号</label>
              <input
                type="text"
                value={formData.specModel || 'DN100-W4'}
                onChange={(e) => setFormData({ ...formData, specModel: e.target.value })}
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono"
              />
            </div>

            {/* 使用状态 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">使用状态</label>
              <CustomSelect
                className="w-full"
                value={formData.status || '正常'}
                onChange={(val) => setFormData({ ...formData, status: val as any })}
                options={[
                  { value: '正常', label: '正常' },
                  { value: '故障', label: '故障' },
                  { value: '停用', label: '停用' },
                ]}
              />
            </div>

            {/* 上报方式 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">上报方式</label>
              <CustomSelect
                className="w-full"
                value={formData.reportMethod || '在线'}
                onChange={(val) => setFormData({ ...formData, reportMethod: val as ReportMethod })}
                options={[
                  { value: '在线', label: '在线' },
                  { value: '接口', label: '接口' },
                  { value: '非在线', label: '非在线' },
                ]}
              />
            </div>

            {/* 数据传输方式 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">数据传输方式</label>
              <CustomSelect
                className="w-full"
                value={formData.transmissionMethod || '在线'}
                onChange={(val) => setFormData({ ...formData, transmissionMethod: val as TransmissionMethod })}
                options={[
                  { value: '在线', label: '在线' },
                  { value: '非在线', label: '非在线' },
                  { value: '无线4G', label: '无线4G' },
                  { value: 'NB-IoT', label: 'NB-IoT' },
                ]}
              />
            </div>

          </div>

          {/* 取水地址 */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">取水详细地址</label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="请输入取水点具体地理位置"
              className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Checkbox options */}
          <div className="flex items-center gap-6 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isArchived ?? true}
                onChange={(e) => setFormData({ ...formData, isArchived: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <span className="text-slate-700 font-medium">档案信息已完善</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isReportedToNational ?? true}
                onChange={(e) => setFormData({ ...formData, isReportedToNational: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <span className="text-slate-700 font-medium">是否上报水利部国家平台</span>
            </label>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm flex items-center gap-1.5 transition"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? '保存修改' : '确认录入'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
