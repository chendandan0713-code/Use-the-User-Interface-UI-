import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  badge?: string;
  badgeColor?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: (SelectOption | string)[];
  placeholder?: string;
  clearable?: boolean;
  className?: string;
  disabled?: boolean;
  dropdownMinWidth?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = '请选择',
  clearable = true,
  className = '',
  disabled = false,
  dropdownMinWidth = '100%',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return opt;
    }
    return {
      value: String(opt),
      label: String(opt),
    };
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div ref={containerRef} className={`relative select-none text-xs inline-block text-left ${className}`}>
      {/* Trigger Box */}
      <div
        tabIndex={0}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsOpen(false);
          if (e.key === 'ArrowDown' || e.key === 'Enter') setIsOpen(true);
        }}
        className={`w-full flex items-center justify-between transition-all duration-150 rounded cursor-pointer border px-2.5 py-1.5 h-[30px] ${
          isOpen
            ? 'bg-white border-[#1677ff] ring-2 ring-[#1677ff]/15 shadow-2xs'
            : 'bg-[#f8fafc] border-[#b8cde6] hover:border-[#1677ff] hover:bg-white'
        } ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100 border-slate-200' : ''}`}
      >
        {/* Selected value / Placeholder */}
        <div className="truncate flex items-center gap-1.5 flex-1 min-w-0 pr-1">
          {selectedOption && selectedOption.value !== '' ? (
            <>
              {selectedOption.badge && (
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${selectedOption.badgeColor || 'bg-blue-500'}`} />
              )}
              <span className="text-gray-800 font-medium truncate">{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-gray-400 font-normal truncate">{placeholder}</span>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 shrink-0 ml-1">
          {clearable && value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200/60 transition cursor-pointer"
              title="清空"
            >
              <X className="w-3 h-3" />
            </button>
          )}

          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#1677ff]' : 'text-gray-400'
            }`}
          />
        </div>
      </div>

      {/* Floating Menu */}
      {isOpen && (
        <div
          className="absolute left-0 top-[calc(100%+4px)] z-[120] w-full min-w-[150px] bg-white rounded-lg border border-slate-200/90 shadow-lg py-1 max-h-60 overflow-y-auto custom-scrollbar"
          style={{ minWidth: dropdownMinWidth }}
        >
          {normalizedOptions.map((opt, idx) => (
            <div
              key={opt.value + idx}
              onClick={() => handleSelect(opt.value)}
              className={`px-3 py-2 text-xs flex items-center justify-between cursor-pointer transition-colors duration-100 ${
                value === opt.value
                  ? 'bg-[#e6f4ff] text-[#1677ff] font-medium'
                  : 'text-slate-700 hover:bg-[#f0f7ff] hover:text-[#1677ff]'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                {opt.badge && (
                  <span className={`w-2 h-2 rounded-full shrink-0 ${opt.badgeColor || 'bg-blue-500'}`} />
                )}
                <span className="truncate">{opt.label}</span>
              </div>

              {value === opt.value && <Check className="w-3.5 h-3.5 text-[#1677ff] shrink-0" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
