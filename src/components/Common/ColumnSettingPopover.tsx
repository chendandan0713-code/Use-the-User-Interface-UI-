import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Check, 
  X, 
  Search, 
  CheckSquare, 
  Square,
  Lock,
  Columns3
} from 'lucide-react';

export interface ColumnItem {
  key: string;
  label: string;
  defaultVisible?: boolean;
  required?: boolean; // Cannot be unchecked (e.g. key identifier or actions)
  group?: string;
}

interface ColumnSettingPopoverProps {
  columns: ColumnItem[];
  visibleKeys: string[];
  onChange: (visibleKeys: string[]) => void;
  storageKey?: string; // Optional localStorage key to persist user preferences
  buttonText?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
  placement?: 'bottom-left' | 'bottom-right' | 'top-right' | 'top-left';
}

export const ColumnSettingPopover: React.FC<ColumnSettingPopoverProps> = ({
  columns,
  visibleKeys,
  onChange,
  storageKey,
  buttonText = '自定义列',
  className = '',
  size = 'xs',
  placement = 'bottom-right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Load from localStorage on mount if storageKey is provided
  useEffect(() => {
    if (storageKey) {
      try {
        const saved = localStorage.getItem(`col_settings_${storageKey}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Ensure all required columns are included
            const requiredKeys = columns.filter(c => c.required).map(c => c.key);
            const validKeys = Array.from(new Set([...parsed, ...requiredKeys])).filter(k => 
              columns.some(c => c.key === k)
            );
            if (validKeys.length > 0) {
              onChange(validKeys);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load column settings:', err);
      }
    }
  }, [storageKey]);

  // Save to localStorage when changed
  const handleKeysChange = (newKeys: string[]) => {
    onChange(newKeys);
    if (storageKey) {
      try {
        localStorage.setItem(`col_settings_${storageKey}`, JSON.stringify(newKeys));
      } catch (err) {
        console.error('Failed to save column settings:', err);
      }
    }
  };

  // Toggle a single column
  const toggleColumn = (key: string, required?: boolean) => {
    if (required) return;
    if (visibleKeys.includes(key)) {
      // Don't allow unchecking everything; keep at least 1 column
      if (visibleKeys.length <= 1) return;
      handleKeysChange(visibleKeys.filter((k) => k !== key));
    } else {
      handleKeysChange([...visibleKeys, key]);
    }
  };

  // Select all columns
  const handleSelectAll = () => {
    handleKeysChange(columns.map((c) => c.key));
  };

  // Invert selection (while preserving required columns)
  const handleInvert = () => {
    const requiredKeys = columns.filter((c) => c.required).map((c) => c.key);
    const newKeys = columns
      .filter((c) => !visibleKeys.includes(c.key) || c.required)
      .map((c) => c.key);
    
    // Fallback if inverted result is empty
    if (newKeys.length === 0) {
      handleKeysChange(requiredKeys.length > 0 ? requiredKeys : [columns[0].key]);
    } else {
      handleKeysChange(newKeys);
    }
  };

  // Reset to default columns
  const handleResetDefault = () => {
    const defaultKeys = columns
      .filter((c) => c.defaultVisible !== false)
      .map((c) => c.key);
    handleKeysChange(defaultKeys);
  };

  // Filtered columns by search
  const filteredColumns = useMemo(() => {
    if (!searchText.trim()) return columns;
    const lower = searchText.toLowerCase().trim();
    return columns.filter((col) => col.label.toLowerCase().includes(lower));
  }, [columns, searchText]);

  const allSelected = columns.every((c) => visibleKeys.includes(c.key));
  const isPartiallySelected = !allSelected && columns.some((c) => visibleKeys.includes(c.key));

  return (
    <div ref={popoverRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      {buttonText ? (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          title="自定义列表展示字段"
          className={`flex items-center gap-1.5 px-2.5 h-8 rounded-md border text-xs font-medium transition-all select-none cursor-pointer shadow-2xs ${
            isOpen
              ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500/15 font-semibold'
              : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 hover:text-blue-600 hover:border-blue-400'
          }`}
        >
          <Columns3 className={`w-3.5 h-3.5 ${isOpen ? 'text-blue-600' : 'text-slate-500'}`} />
          <span>{buttonText}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          title="自定义展示列"
          className={`w-6 h-6 flex items-center justify-center rounded-md border transition-all select-none cursor-pointer shadow-2xs ${
            isOpen
              ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500/20'
              : 'bg-white hover:bg-blue-50 border-slate-300 text-slate-500 hover:text-blue-600 hover:border-blue-400'
          }`}
        >
          <Columns3 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div
          className={`absolute z-50 w-72 bg-white rounded-xl shadow-xl border border-slate-300 py-2.5 px-3 animate-in fade-in zoom-in-95 duration-100 ${
            placement === 'bottom-right'
              ? 'right-0 top-full mt-1.5'
              : placement === 'bottom-left'
              ? 'left-0 top-full mt-1.5'
              : placement === 'top-right'
              ? 'right-0 bottom-full mb-1.5'
              : 'left-0 bottom-full mb-1.5'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <Columns3 className="w-3.5 h-3.5 text-blue-600" />
              <span>自定义展示字段</span>
            </div>
            <button
              type="button"
              onClick={handleResetDefault}
              className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
              title="恢复默认列配置"
            >
              <RotateCcw className="w-3 h-3" />
              <span>恢复默认</span>
            </button>
          </div>

          {/* Search box if columns > 6 */}
          {columns.length > 6 && (
            <div className="mt-2 relative">
              <input
                type="text"
                placeholder="搜索字段名称..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full h-7 pl-7 pr-6 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-blue-500 focus:outline-none placeholder-slate-400 text-slate-700"
              />
              <Search className="w-3 h-3 text-slate-400 absolute left-2 top-2 pointer-events-none" />
              {searchText && (
                <button
                  type="button"
                  onClick={() => setSearchText('')}
                  className="absolute right-1.5 top-1.5 text-slate-400 hover:text-slate-600 p-0.5 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {/* Quick Select Actions */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 py-1.5 my-1 px-1 bg-slate-50/70 rounded-md border border-slate-100">
            <label className="flex items-center gap-1.5 cursor-pointer select-none font-medium text-slate-700">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isPartiallySelected;
                }}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleSelectAll();
                  } else {
                    handleResetDefault();
                  }
                }}
                className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
              />
              <span>全选</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleInvert}
                className="hover:text-blue-600 transition cursor-pointer"
              >
                反选
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={handleSelectAll}
                className="hover:text-blue-600 transition cursor-pointer"
              >
                展示全部
              </button>
            </div>
          </div>

          {/* Checkbox List with Scrollbar */}
          <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-0.5 py-1 pr-1">
            {filteredColumns.length > 0 ? (
              filteredColumns.map((col) => {
                const isChecked = visibleKeys.includes(col.key);
                return (
                  <label
                    key={col.key}
                    onClick={(e) => {
                      if (col.required) e.preventDefault();
                    }}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-md text-xs transition select-none cursor-pointer ${
                      isChecked
                        ? 'bg-blue-50/50 hover:bg-blue-50 text-slate-800'
                        : 'hover:bg-slate-50 text-slate-500'
                    } ${col.required ? 'cursor-not-allowed opacity-80' : ''}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={col.required}
                        onChange={() => toggleColumn(col.key, col.required)}
                        className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <span className={`truncate font-normal ${isChecked ? 'text-slate-900 font-medium' : ''}`}>
                        {col.label}
                      </span>
                    </div>

                    {col.required && (
                      <span className="flex items-center gap-0.5 text-[10px] text-slate-400 bg-slate-100 px-1 py-0.2 rounded border border-slate-200" title="必须展示字段">
                        <Lock className="w-2.5 h-2.5" />
                        <span>固定</span>
                      </span>
                    )}
                  </label>
                );
              })
            ) : (
              <div className="py-4 text-center text-slate-400 text-xs">
                未搜索到相关字段
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-400">设置自动保存</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-xs shadow-xs transition cursor-pointer"
            >
              完成
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
