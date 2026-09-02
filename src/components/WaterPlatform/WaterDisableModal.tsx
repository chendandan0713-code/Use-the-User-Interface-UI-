import React, { useState, useEffect } from 'react';
import { X, Upload, Check, AlertCircle } from 'lucide-react';
import { WaterFacility } from '../../types';

interface WaterDisableModalProps {
  isOpen: boolean;
  facility: WaterFacility | null;
  onClose: () => void;
  onSubmit: (facility: WaterFacility, disableReason: string, fileName?: string) => void;
}

export const WaterDisableModal: React.FC<WaterDisableModalProps> = ({
  isOpen,
  facility,
  onClose,
  onSubmit,
}) => {
  const [disableReason, setDisableReason] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setDisableReason('');
      setSelectedFile(null);
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen || !facility) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setErrorMsg('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disableReason.trim()) {
      setErrorMsg('请输入停用原因');
      return;
    }
    onSubmit(facility, disableReason, selectedFile?.name);
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
        {/* Header matching screenshot: 计量停用 + X */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">计量停用</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 text-sm">
          
          {/* 计量设施名称 */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-slate-800 text-right whitespace-nowrap font-normal">
              计量设施名称
            </label>
            <div className="flex-1">
              <input
                type="text"
                readOnly
                value={facility.name || '这里显示计量设施名称'}
                className="w-full h-10 px-3.5 bg-slate-50/80 border border-slate-300 rounded-md text-slate-700 select-none outline-none"
              />
            </div>
          </div>

          {/* 计量设施编号 */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-slate-800 text-right whitespace-nowrap font-normal">
              计量设施编号
            </label>
            <div className="flex-1">
              <input
                type="text"
                readOnly
                value={facility.code || '630293JL0001'}
                className="w-full h-10 px-3.5 bg-slate-50/80 border border-slate-300 rounded-md text-slate-700 font-mono select-none outline-none"
              />
            </div>
          </div>

          {/* * 停用材料 */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-slate-800 text-right whitespace-nowrap font-normal flex items-center justify-end">
              <span className="text-amber-600 mr-1">*</span>
              <span>停用材料</span>
            </label>
            <div className="flex-1 flex items-center gap-3">
              <label className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-xs text-slate-700 cursor-pointer transition select-none flex items-center gap-1.5 font-medium">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                选择文件
              </label>
              <span className="text-xs text-slate-500 truncate max-w-[240px]">
                {selectedFile ? selectedFile.name : '未选择任何文件'}
              </span>
            </div>
          </div>

          {/* * 停用原因 */}
          <div className="flex items-start gap-4">
            <label className="w-28 text-slate-800 text-right whitespace-nowrap font-normal pt-2 flex items-center justify-end">
              <span className="text-amber-600 mr-1">*</span>
              <span>停用原因</span>
            </label>
            <div className="flex-1 space-y-1">
              <textarea
                rows={3}
                value={disableReason}
                onChange={(e) => {
                  setDisableReason(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="请输入"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm resize-none"
              />
              {errorMsg && (
                <p className="text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errorMsg}
                </p>
              )}
            </div>
          </div>

          {/* Red hint text from user requirements */}
          <div className="text-center pt-2">
            <p className="text-xs text-rose-600 font-normal">
              点击新增没有提交的时候，下次打开弹窗保留填写的信息，就不要暂存按钮了
            </p>
          </div>

          {/* Bottom Buttons: [取消] [提交] */}
          <div className="pt-4 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-md text-xs font-medium transition cursor-pointer min-w-[80px]"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md text-xs font-semibold shadow-xs transition cursor-pointer min-w-[80px]"
            >
              提交
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
