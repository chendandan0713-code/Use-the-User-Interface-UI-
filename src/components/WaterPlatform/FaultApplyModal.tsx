import React, { useState, useEffect } from 'react';
import { X, Upload, AlertCircle, FileText } from 'lucide-react';
import { FaultRecord, WaterFacility } from '../../types';

interface FaultApplyModalProps {
  isOpen: boolean;
  facilities: WaterFacility[];
  editingRecord: FaultRecord | null;
  onClose: () => void;
  onSubmit: (recordData: Partial<FaultRecord>, isResubmit: boolean) => void;
}

export const FaultApplyModal: React.FC<FaultApplyModalProps> = ({
  isOpen,
  facilities,
  editingRecord,
  onClose,
  onSubmit,
}) => {
  const isEditing = !!editingRecord;

  const [formData, setFormData] = useState<Partial<FaultRecord>>({
    facilityId: '',
    facilityName: '',
    facilityCode: '',
    waterOwner: '',
    permitNumber: '',
    faultWaterMeterReading: '',
    faultDesc: '',
    faultImages: [],
    reporter: '段问薇',
    faultTime: new Date().toISOString().split('T')[0],
    district: '湟中区',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (editingRecord) {
        setFormData({
          ...editingRecord,
          faultWaterMeterReading: String(editingRecord.faultWaterMeterReading || ''),
        });
      } else {
        const defaultFac = facilities[0];
        setFormData({
          facilityId: defaultFac?.id || '',
          facilityName: defaultFac?.name || '湟中区拦隆口镇卡阳村人畜饮水工程',
          facilityCode: defaultFac?.code || '241017001024',
          waterOwner: defaultFac?.waterOwner || '湟中永兴种养殖专业合作社',
          permitNumber: defaultFac?.permitNumber || 'D632524S2021-0017',
          faultWaterMeterReading: '12343',
          faultDesc: '',
          faultImages: ['现场水表故障照片.jpg'],
          reporter: '段问薇',
          faultTime: new Date().toISOString().split('T')[0],
          district: defaultFac?.district || '湟中区',
        });
      }
      setSelectedFile(null);
      setErrorMsg('');
    }
  }, [isOpen, editingRecord, facilities]);

  if (!isOpen) return null;

  const handleFacilitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const facId = e.target.value;
    const fac = facilities.find((f) => f.id === facId);
    if (fac) {
      setFormData((prev) => ({
        ...prev,
        facilityId: fac.id,
        facilityName: fac.name,
        facilityCode: fac.code,
        waterOwner: fac.waterOwner,
        permitNumber: fac.permitNumber,
        district: fac.district,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.facilityName?.trim()) {
      setErrorMsg('请选择计量设施');
      return;
    }
    if (!formData.faultWaterMeterReading) {
      setErrorMsg('请输入故障水表底数');
      return;
    }
    if (!formData.faultDesc?.trim()) {
      setErrorMsg('请输入故障情况说明');
      return;
    }

    const payload: Partial<FaultRecord> = {
      ...formData,
      faultImages: selectedFile
        ? [selectedFile.name, ...(formData.faultImages || [])]
        : formData.faultImages && formData.faultImages.length > 0
        ? formData.faultImages
        : ['现场故障实拍.jpg'],
    };

    onSubmit(payload, isEditing);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            {isEditing ? '编辑故障申请（重新提交审核）' : '发起故障申报'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* 计量设施选择 */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-slate-700 text-right font-medium">
              <span className="text-rose-500 mr-1">*</span>计量设施
            </label>
            <div className="col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  readOnly
                  value={formData.facilityName}
                  className="w-full h-8 px-3 bg-slate-50 border border-slate-300 rounded text-slate-700 outline-none"
                />
              ) : (
                <select
                  value={formData.facilityId}
                  onChange={handleFacilitySelect}
                  className="w-full h-8 px-3 bg-white border border-slate-300 rounded text-slate-700 outline-none focus:border-blue-500"
                >
                  {facilities.map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name} ({fac.code}) - {fac.waterOwner}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* 计量器具编号 */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-slate-700 text-right font-medium">计量器具编号</label>
            <div className="col-span-2">
              <input
                type="text"
                readOnly
                value={formData.facilityCode}
                className="w-full h-8 px-3 bg-slate-50 border border-slate-300 rounded font-mono text-slate-700 outline-none"
              />
            </div>
          </div>

          {/* 取水权人 */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-slate-700 text-right font-medium">取水权人</label>
            <div className="col-span-2">
              <input
                type="text"
                readOnly
                value={formData.waterOwner}
                className="w-full h-8 px-3 bg-slate-50 border border-slate-300 rounded text-slate-700 outline-none"
              />
            </div>
          </div>

          {/* 故障水表底数 */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-slate-700 text-right font-medium">
              <span className="text-rose-500 mr-1">*</span>故障水表底数 (m³)
            </label>
            <div className="col-span-2">
              <input
                type="number"
                step="any"
                required
                placeholder="请输入故障时水表读数"
                value={formData.faultWaterMeterReading}
                onChange={(e) =>
                  setFormData({ ...formData, faultWaterMeterReading: e.target.value })
                }
                className="w-full h-8 px-3 bg-white border border-slate-300 rounded text-slate-800 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* 上报人 & 故障时间 */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-slate-700 text-right font-medium">上报人 / 故障时间</label>
            <div className="col-span-2 flex gap-2">
              <input
                type="text"
                value={formData.reporter}
                onChange={(e) => setFormData({ ...formData, reporter: e.target.value })}
                className="w-1/2 h-8 px-3 bg-white border border-slate-300 rounded text-slate-800 outline-none focus:border-blue-500"
                placeholder="上报人姓名"
              />
              <input
                type="date"
                value={formData.faultTime}
                onChange={(e) => setFormData({ ...formData, faultTime: e.target.value })}
                className="w-1/2 h-8 px-3 bg-white border border-slate-300 rounded text-slate-800 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* 故障图片材料 */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-slate-700 text-right font-medium">
              <span className="text-rose-500 mr-1">*</span>故障照片材料
            </label>
            <div className="col-span-2 flex items-center gap-3">
              <label className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-slate-700 cursor-pointer transition flex items-center gap-1.5 font-medium">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                <Upload className="w-3.5 h-3.5" />
                选择文件
              </label>
              <span className="text-slate-500 truncate max-w-[200px]">
                {selectedFile ? selectedFile.name : formData.faultImages?.[0] || '未选择新文件'}
              </span>
            </div>
          </div>

          {/* 故障情况说明 */}
          <div className="grid grid-cols-3 items-start gap-2 pt-1">
            <label className="text-slate-700 text-right font-medium pt-1.5">
              <span className="text-rose-500 mr-1">*</span>故障情况说明
            </label>
            <div className="col-span-2 space-y-1">
              <textarea
                rows={3}
                required
                value={formData.faultDesc}
                onChange={(e) => {
                  setFormData({ ...formData, faultDesc: e.target.value });
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="详细说明故障表象、原因及初步处理措施..."
                className="w-full px-3 py-2 border border-slate-300 rounded text-slate-800 placeholder-slate-400 focus:border-blue-500 outline-none resize-none"
              />
              {errorMsg && (
                <p className="text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errorMsg}
                </p>
              )}
            </div>
          </div>

          {/* Red Notice */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-[11px] text-amber-900 leading-relaxed">
            <span className="font-semibold text-rose-600">说明：</span>
            故障的提交，需要等到审核通过之后才改变状态，如果说故障驳回了，是可以在当前记录编辑再次提交审核的，如果说驳回了没有再次提交，就可以再次发起新的故障申请（但是有新的故障申请则原来的驳回不可再次编辑提交了）。
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-1.5 border border-slate-300 text-slate-600 hover:bg-slate-50 rounded font-medium transition cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium shadow-xs transition cursor-pointer"
            >
              {isEditing ? '重新提交审核' : '提交申请'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
