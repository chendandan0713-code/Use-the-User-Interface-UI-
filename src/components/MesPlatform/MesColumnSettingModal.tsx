import React, { useState } from 'react';
import { X, Check, RotateCcw, Sliders } from 'lucide-react';

interface MesColumnSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (title: string, message?: string, type?: 'success') => void;
}

export const MesColumnSettingModal: React.FC<MesColumnSettingModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const defaultColumns = [
    { key: 'orderCode', label: '工单编号', visible: true, required: true },
    { key: 'orderTag', label: '工单标识', visible: true },
    { key: 'productName', label: '产品名称', visible: true, required: true },
    { key: 'productCode', label: '产品编号', visible: true },
    { key: 'spec', label: '规格', visible: true },
    { key: 'unit', label: '单位', visible: true },
    { key: 'materialGrade', label: '材料牌号', visible: true },
    { key: 'partNumber', label: '零件图号', visible: true },
    { key: 'productionBatch', label: '生产批次', visible: true },
    { key: 'type', label: '类型', visible: true },
    { key: 'productionPlan', label: '生产计划', visible: true },
    { key: 'progress', label: '进度与状态', visible: true, required: true },
  ];

  const [columns, setColumns] = useState(defaultColumns);

  if (!isOpen) return null;

  const toggleColumn = (key: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key && !col.required ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSave = () => {
    onNotify('表格列配置已保存', '当前界面已应用自定义列视图', 'success');
    onClose();
  };

  const handleReset = () => {
    setColumns(defaultColumns);
    onNotify('已恢复默认列排布', '', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">自定义表格显示列</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2 max-h-72 overflow-y-auto custom-scrollbar text-xs">
          {columns.map((col) => (
            <label
              key={col.key}
              className={`flex items-center justify-between p-2 rounded-lg border transition cursor-pointer select-none ${
                col.visible
                  ? 'bg-blue-50/50 border-blue-200 text-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <span className="font-medium">{col.label}</span>
              <input
                type="checkbox"
                checked={col.visible}
                disabled={col.required}
                onChange={() => toggleColumn(col.key)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 disabled:opacity-50"
              />
            </label>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600"
          >
            <RotateCcw className="w-3 h-3" />
            <span>恢复默认</span>
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 text-xs font-medium"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
            >
              保存配置
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
