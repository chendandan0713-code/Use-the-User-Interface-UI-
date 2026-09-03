import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  AlertCircle, 
  FileText, 
  Image as ImageIcon, 
  Trash2, 
  Eye, 
  Info 
} from 'lucide-react';
import { FaultRecord, WaterFacility } from '../../types';
import { CustomSelect } from '../Common/CustomSelect';

interface FaultApplyModalProps {
  isOpen: boolean;
  facilities: WaterFacility[];
  editingRecord: FaultRecord | null;
  onClose: () => void;
  onSubmit: (recordData: Partial<FaultRecord>, isResubmit: boolean) => void;
}

interface AttachmentItem {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'pdf' | 'other';
  previewUrl?: string;
  file?: File;
}

export const FaultApplyModal: React.FC<FaultApplyModalProps> = ({
  isOpen,
  facilities,
  editingRecord,
  onClose,
  onSubmit,
}) => {
  const isEditing = !!editingRecord;
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [previewingItem, setPreviewingItem] = useState<AttachmentItem | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (editingRecord) {
        setFormData({
          ...editingRecord,
          faultWaterMeterReading: String(editingRecord.faultWaterMeterReading || ''),
        });

        // Initialize attachments from record
        const initialImages = editingRecord.faultImages && editingRecord.faultImages.length > 0
          ? editingRecord.faultImages
          : ['现场水表故障照片.jpg'];
        
        setAttachments(
          initialImages.map((imgName, index) => ({
            id: `att-init-${index}`,
            name: imgName,
            size: '2.4 MB',
            type: imgName.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image',
          }))
        );
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

        setAttachments([
          {
            id: 'att-default-1',
            name: '现场水表表盘裂损实拍.jpg',
            size: '1.8 MB',
            type: 'image',
          },
        ]);
      }
      setErrorMsg('');
      setPreviewingItem(null);
    }
  }, [isOpen, editingRecord, facilities]);

  if (!isOpen) return null;

  const handleFacilityChange = (facId: string) => {
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

  const handleAddFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newItems: AttachmentItem[] = [];
    Array.from(files).forEach((file, index) => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const isPdf = ext === 'pdf';
      const isImg = ['jpg', 'jpeg', 'png', 'webp'].includes(ext || '');

      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      const previewUrl = isImg ? URL.createObjectURL(file) : undefined;

      newItems.push({
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        size: sizeStr,
        type: isPdf ? 'pdf' : isImg ? 'image' : 'other',
        previewUrl,
        file,
      });
    });

    setAttachments((prev) => [...prev, ...newItems]);
    setErrorMsg('');
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
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
    if (attachments.length === 0) {
      setErrorMsg('请上传现场故障照片或佐证材料');
      return;
    }

    const payload: Partial<FaultRecord> = {
      ...formData,
      faultImages: attachments.map((item) => item.name),
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
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 text-slate-800 flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* 1. Modal Header */}
        {/* ========================================================================= */}
        <div className="px-6 py-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 leading-tight">
            {isEditing ? '编辑故障申请（重新提交审核）' : '发起故障申报'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 rounded-lg transition cursor-pointer"
            title="关闭窗口"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2. Modal Body (输入框单行展示、双列等宽对齐、标签严格对齐) */}
        {/* ========================================================================= */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto max-h-[75vh] p-6 space-y-4 text-xs custom-scrollbar">
          
          {/* 错误提示条 */}
          {errorMsg && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center gap-2 text-xs font-medium animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 行1: 计量设施 (单项全宽展示，标签宽度 w-24) */}
          <div className="flex items-center gap-2.5">
            <label className="w-24 shrink-0 text-right font-medium text-slate-700">
              <span className="text-rose-500 mr-1">*</span>计量设施
            </label>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  disabled
                  value={formData.facilityName || ''}
                  className="w-full px-3 py-2 bg-slate-200/70 border border-slate-300 rounded-lg text-slate-700 font-medium cursor-not-allowed"
                />
              ) : (
                <CustomSelect
                  value={formData.facilityId || ''}
                  options={facilities.map((f) => ({
                    value: f.id,
                    label: `${f.name} (${f.code})`,
                  }))}
                  onChange={handleFacilityChange}
                  placeholder="请选择发生故障的计量设施..."
                  className="w-full"
                />
              )}
            </div>
          </div>

          {/* 行2: 器具编号 (左) + 取水权人 (右) (双列并排，50% 等宽) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <label className="w-24 shrink-0 text-right font-medium text-slate-700">
                器具编号
              </label>
              <input
                type="text"
                disabled
                value={formData.facilityCode || ''}
                placeholder="自动关联"
                className="flex-1 min-w-0 px-3 py-2 bg-slate-200/70 border border-slate-300 rounded-lg text-slate-700 font-medium text-xs cursor-not-allowed"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <label className="w-24 shrink-0 text-right font-medium text-slate-700">
                取水权人
              </label>
              <input
                type="text"
                disabled
                value={formData.waterOwner || ''}
                placeholder="自动关联"
                className="flex-1 min-w-0 px-3 py-2 bg-slate-200/70 border border-slate-300 rounded-lg text-slate-700 font-medium text-xs cursor-not-allowed truncate"
              />
            </div>
          </div>

          {/* 行3: 故障水表底数 (左) + 故障时间 (右) (双列并排，50% 等宽) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <label className="w-24 shrink-0 text-right font-medium text-slate-700">
                <span className="text-rose-500 mr-1">*</span>故障底数(m³)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.faultWaterMeterReading}
                onChange={(e) => {
                  setFormData({ ...formData, faultWaterMeterReading: e.target.value });
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="请输入故障时底数..."
                className="flex-1 min-w-0 px-3 py-2 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <label className="w-24 shrink-0 text-right font-medium text-slate-700">
                <span className="text-rose-500 mr-1">*</span>故障时间
              </label>
              <input
                type="date"
                required
                value={formData.faultTime}
                onChange={(e) => setFormData({ ...formData, faultTime: e.target.value })}
                className="flex-1 min-w-0 px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition bg-white"
              />
            </div>
          </div>

          {/* 行4: 上报人员 (左) + 所属区县 (右) (双列并排，50% 等宽) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <label className="w-24 shrink-0 text-right font-medium text-slate-700">
                上报人员
              </label>
              <input
                type="text"
                value={formData.reporter || ''}
                onChange={(e) => setFormData({ ...formData, reporter: e.target.value })}
                placeholder="填报人姓名"
                className="flex-1 min-w-0 px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <label className="w-24 shrink-0 text-right font-medium text-slate-700">
                所属区县
              </label>
              <input
                type="text"
                disabled
                value={formData.district || '湟中区'}
                className="flex-1 min-w-0 px-3 py-2 bg-slate-200/70 border border-slate-300 rounded-lg text-slate-700 font-medium text-xs cursor-not-allowed"
              />
            </div>
          </div>

          {/* 行5: 故障说明 (单项全宽展示，标签宽度 w-24) */}
          <div className="flex items-start gap-2.5">
            <label className="w-24 shrink-0 text-right font-medium text-slate-700 pt-2">
              <span className="text-rose-500 mr-1">*</span>故障说明
            </label>
            <div className="flex-1 min-w-0">
              <textarea
                rows={3}
                required
                value={formData.faultDesc}
                onChange={(e) => {
                  setFormData({ ...formData, faultDesc: e.target.value });
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="详细说明水表故障表象（如表盘黑屏、机械齿轮卡阻、瞬时流量跳变、漏水）、产生原因及已采取的应急措施..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none transition leading-relaxed"
              />
            </div>
          </div>

          {/* 行6: 照片材料附件 (简洁样式：上传按钮 + 干净文件列表) */}
          <div className="flex items-start gap-2.5">
            <label className="w-24 shrink-0 text-right font-medium text-slate-700 pt-1.5">
              <span className="text-rose-500 mr-1">*</span>材料附件
            </label>
            <div className="flex-1 min-w-0 space-y-2">
              
              {/* 简洁上传入口 */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  <span>上传照片/附件</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={(e) => handleAddFiles(e.target.files)}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.webp,.pdf"
                />
                <span className="text-slate-400 text-[11px]">
                  支持 JPG、PNG、PDF 格式，单个文件不超过 10MB
                </span>
              </div>

              {/* 附件清单展示样式：简洁紧凑的条目 */}
              {attachments.length > 0 ? (
                <div className="space-y-1.5">
                  {attachments.map((item) => {
                    const isPdf = item.type === 'pdf';
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between px-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg text-xs transition"
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          {isPdf ? (
                            <FileText className="w-4 h-4 text-rose-500 shrink-0" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-blue-500 shrink-0" />
                          )}
                          <span className="text-slate-800 truncate font-medium max-w-sm" title={item.name}>
                            {item.name}
                          </span>
                          <span className="text-slate-400 text-[11px] shrink-0">
                            ({item.size})
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => setPreviewingItem(item)}
                            className="text-blue-600 hover:text-blue-800 hover:underline text-[11px] cursor-pointer flex items-center gap-0.5"
                          >
                            <Eye className="w-3 h-3" />
                            <span>预览</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveAttachment(item.id)}
                            className="text-rose-600 hover:text-rose-800 hover:underline text-[11px] cursor-pointer flex items-center gap-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>删除</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-2.5 text-center text-slate-400 bg-slate-50/50 rounded-lg border border-dashed border-slate-200 text-xs">
                  暂无上传材料附件
                </div>
              )}
            </div>
          </div>

          {/* 说明展示 (带颜色标识，不需要 label) */}
          <div className="rounded-lg bg-blue-50/80 border border-blue-200/90 p-3 text-xs text-slate-700 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-blue-700">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <span>说明</span>
            </div>
            <div className="text-[11.5px] text-slate-600 leading-relaxed space-y-0.5 pl-5">
              <p>1. 故障水表底数须与现场表盘实拍照片记录一致，作为故障停运期水量核算与台账追补依据。</p>
              <p>2. 佐证材料建议包含水表表盘读数特写、铭牌信息及现场工况照片，支持上传 JPG、PNG、PDF 格式。</p>
              <p>3. 申报提交后将即时流转至水利水务监管部门审核，核验通过后开展维修置换与水量追补。</p>
            </div>
          </div>

        </form>

        {/* ========================================================================= */}
        {/* 3. Modal Footer (底色去掉，简洁白色，纯文字按钮) */}
        {/* ========================================================================= */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium transition cursor-pointer shadow-2xs"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            {isEditing ? '重新提交审核' : '确认提交申报'}
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. 附件材料简洁预览弹窗 */}
      {/* ========================================================================= */}
      {previewingItem && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPreviewingItem(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 text-slate-800 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 truncate">
                {previewingItem.type === 'pdf' ? (
                  <FileText className="w-4 h-4 text-rose-500 shrink-0" />
                ) : (
                  <ImageIcon className="w-4 h-4 text-blue-600 shrink-0" />
                )}
                <span className="truncate">{previewingItem.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewingItem(null)}
                className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 bg-slate-100/70 flex items-center justify-center min-h-[240px]">
              {previewingItem.previewUrl ? (
                <img
                  src={previewingItem.previewUrl}
                  alt={previewingItem.name}
                  className="max-h-[55vh] max-w-full rounded object-contain shadow-sm"
                />
              ) : previewingItem.type === 'pdf' ? (
                <div className="text-center py-6 space-y-2">
                  <FileText className="w-12 h-12 text-rose-500 mx-auto" />
                  <p className="text-xs font-semibold text-slate-700">{previewingItem.name}</p>
                  <p className="text-[11px] text-slate-400">PDF 文件已就绪</p>
                </div>
              ) : (
                <div className="text-center py-6 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
                    <ImageIcon className="w-7 h-7" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700">{previewingItem.name}</p>
                  <p className="text-[11px] text-slate-400">水表读数: 12343 m³</p>
                </div>
              )}
            </div>

            <div className="px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>文件大小: {previewingItem.size}</span>
              <button
                type="button"
                onClick={() => setPreviewingItem(null)}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-md text-slate-700 text-xs font-medium transition"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
