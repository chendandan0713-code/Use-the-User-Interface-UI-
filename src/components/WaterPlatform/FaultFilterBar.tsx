import React from 'react';
import { Search, RotateCcw, Plus, Calendar } from 'lucide-react';
import { FaultFilterParams } from '../../types';

interface FaultFilterBarProps {
  filterParams: FaultFilterParams;
  onFilterChange: (newParams: FaultFilterParams) => void;
  onSearch: () => void;
  onReset: () => void;
  onOpenApplyModal?: () => void;
}

export const FaultFilterBar: React.FC<FaultFilterBarProps> = ({
  filterParams,
  onFilterChange,
  onSearch,
  onReset,
  onOpenApplyModal,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs mb-3">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        
        {/* 计量设施名称 */}
        <div className="flex items-center gap-2 text-xs">
          <label className="text-slate-600 whitespace-nowrap font-medium">
            计量设施名称
          </label>
          <input
            type="text"
            placeholder="计量设施名称"
            value={filterParams.facilityName}
            onChange={(e) =>
              onFilterChange({ ...filterParams, facilityName: e.target.value })
            }
            className="w-44 h-8 px-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* 取水许可编号/取水权人 */}
        <div className="flex items-center gap-2 text-xs">
          <label className="text-slate-600 whitespace-nowrap font-medium">
            取水许可编号
          </label>
          <input
            type="text"
            placeholder="取水许可编号/取水权人"
            value={filterParams.permitNumberOrOwner}
            onChange={(e) =>
              onFilterChange({
                ...filterParams,
                permitNumberOrOwner: e.target.value,
              })
            }
            className="w-52 h-8 px-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* 申请时间 */}
        <div className="flex items-center gap-2 text-xs">
          <label className="text-slate-600 whitespace-nowrap font-medium">
            申请时间
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="开始时间-结束时间"
              value={filterParams.dateRange}
              onChange={(e) =>
                onFilterChange({ ...filterParams, dateRange: e.target.value })
              }
              className="w-48 h-8 pl-2.5 pr-8 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
            />
            <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* 状态 */}
        <div className="flex items-center gap-2 text-xs">
          <label className="text-slate-600 whitespace-nowrap font-medium">
            状态
          </label>
          <div className="relative">
            <select
              value={filterParams.status}
              onChange={(e) =>
                onFilterChange({ ...filterParams, status: e.target.value })
              }
              className="w-32 h-8 px-2.5 pr-7 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition appearance-none cursor-pointer"
            >
              <option value="全部">全部状态</option>
              <option value="故障待审">故障待审</option>
              <option value="处理待审">处理待审</option>
              <option value="故障中">故障中</option>
              <option value="故障驳回">故障驳回</option>
              <option value="处理驳回">处理驳回</option>
              <option value="已完成">已完成</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400 text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* 操作按钮组 */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={onSearch}
            className="flex items-center gap-1.5 px-3.5 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>查询</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 h-8 bg-white hover:bg-slate-50 text-slate-700 rounded-md text-xs font-medium border border-slate-300 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置</span>
          </button>

          {onOpenApplyModal && (
            <button
              type="button"
              onClick={onOpenApplyModal}
              className="flex items-center gap-1.5 px-3.5 h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>申报故障</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
