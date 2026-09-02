import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

export interface SelectOption {
  value: string | number;
  label: string;
  badge?: string;
  badgeColor?: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  value: string | number;
  onChange: (value: any) => void;
  options: SelectOption[];
  placeholder?: string;
  labelPrefix?: string;
  className?: string;
  dropdownClassName?: string;
  disabled?: boolean;
  clearable?: boolean;
  size?: 'xs' | 'sm' | 'md';
  align?: 'left' | 'right';
  placement?: 'bottom' | 'top';
  id?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = '请选择',
  labelPrefix,
  className = '',
  dropdownClassName = '',
  disabled = false,
  clearable = true,
  size = 'sm',
  align = 'left',
  placement = 'bottom',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => String(opt.value) === String(value) && String(opt.value) !== '');
  const hasValue = Boolean(selectedOption && value !== '');

  let displayText = selectedOption ? selectedOption.label : placeholder;
  if (labelPrefix) {
    displayText = selectedOption 
      ? `${labelPrefix}：${selectedOption.label}` 
      : `${labelPrefix}：${placeholder}`;
  }

  // Size variations
  const sizeClasses = {
    xs: 'h-6 text-xs px-2 py-0.5',
    sm: 'h-8 text-xs px-2.5 py-1',
    md: 'h-9 text-sm px-3 py-1.5',
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative inline-block select-none group ${className}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-1.5 rounded-md border text-left transition-all duration-150 cursor-pointer ${
          sizeClasses[size]
        } ${
          isOpen
            ? 'bg-white border-blue-500 ring-2 ring-blue-500/15 text-slate-900 shadow-xs'
            : disabled
            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
            : hasValue
            ? 'bg-blue-50/40 hover:bg-white text-slate-800 border-blue-200 hover:border-blue-400 shadow-2xs'
            : 'bg-slate-50/80 hover:bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
        }`}
      >
        <span className={`truncate ${!hasValue ? 'text-slate-400 font-normal' : 'text-slate-800 font-medium'}`}>
          {displayText}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {clearable && hasValue && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              title="清除选择"
              className="p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-blue-600' : 'group-hover:text-slate-600'
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${
            placement === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          } ${
            align === 'right' ? 'right-0' : 'left-0'
          } w-full min-w-[120px] max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100 custom-scrollbar ${dropdownClassName}`}
        >
          {options.length === 0 ? (
            <div className="px-3 py-2 text-xs text-slate-400 text-center">暂无选项</div>
          ) : (
            options.map((option) => {
              const isSelected = String(option.value) === String(value) && String(option.value) !== '';
              return (
                <button
                  key={String(option.value)}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => {
                    // Clicking selected item unselects it, otherwise select it
                    onChange(isSelected ? '' : option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                    option.disabled
                      ? 'text-slate-300 cursor-not-allowed'
                      : isSelected
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
