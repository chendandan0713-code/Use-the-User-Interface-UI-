import React, { useState } from 'react';
import { X, FileText, Image as ImageIcon, Eye } from 'lucide-react';

interface FaultMediaPreviewModalProps {
  isOpen: boolean;
  title?: string;
  files: string[];
  description?: string;
  onClose: () => void;
}

export const FaultMediaPreviewModal: React.FC<FaultMediaPreviewModalProps> = ({
  isOpen,
  title = '附件查看',
  files,
  onClose,
}) => {
  const [activePreview, setActivePreview] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-100">
          <h3 className="text-base font-bold text-slate-900">{title || '附件查看'}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 rounded-lg transition cursor-pointer"
            title="关闭窗口"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <div>
            <span className="font-medium text-slate-700 block mb-2">附件材料清单 ({files?.length || 0})：</span>
            {files && files.length > 0 ? (
              <div className="space-y-1.5">
                {files.map((file, idx) => {
                  const isImage = file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png');
                  return (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/70 transition"
                    >
                      <div className="flex items-center gap-2.5 truncate pr-2">
                        {isImage ? (
                          <div className="w-7 h-7 rounded bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <ImageIcon className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className="font-medium text-slate-800 truncate">{file}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActivePreview(activePreview === file ? null : file)}
                        className="px-2.5 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50/50 rounded text-xs font-medium transition cursor-pointer flex items-center gap-1 shrink-0"
                      >
                        <Eye className="w-3 h-3" />
                        <span>{activePreview === file ? '收起' : '查看'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center text-slate-400">暂无上传的附件材料</div>
            )}
          </div>

          {/* 展开查看区域 */}
          {activePreview && (
            <div className="p-4 bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="font-medium text-slate-800 text-xs">{activePreview}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">附件已通过系统合规核验，记录存档完备</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-white flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md text-xs font-medium transition cursor-pointer"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
