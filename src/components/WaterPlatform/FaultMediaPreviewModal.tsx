import React from 'react';
import { X, FileText, Image as ImageIcon, Download } from 'lucide-react';

interface FaultMediaPreviewModalProps {
  isOpen: boolean;
  title: string;
  files: string[];
  description?: string;
  onClose: () => void;
}

export const FaultMediaPreviewModal: React.FC<FaultMediaPreviewModalProps> = ({
  isOpen,
  title,
  files,
  description,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          {description && (
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
              <span className="font-semibold text-slate-700 block mb-1">情况说明：</span>
              <p className="text-slate-600 leading-relaxed">{description}</p>
            </div>
          )}

          <div>
            <span className="font-semibold text-slate-700 block mb-2">附件材料清单：</span>
            {files && files.length > 0 ? (
              <div className="space-y-2">
                {files.map((file, idx) => {
                  const isImage = file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png');
                  return (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/30 transition group"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {isImage ? (
                          <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                        )}
                        <span className="font-medium text-slate-800 truncate">{file}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert(`已触发下载/预览: ${file}`)}
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition cursor-pointer"
                        title="下载"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center text-slate-400">暂无上传的附件材料</div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-md text-xs font-medium transition cursor-pointer"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
