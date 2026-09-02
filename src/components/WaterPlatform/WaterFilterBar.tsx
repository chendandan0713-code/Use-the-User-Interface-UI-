import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Plus, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Filter,
  Check
} from 'lucide-react';
import { WaterFilterParams } from '../../types';
import { CustomSelect } from '../Common/CustomSelect';

interface WaterFilterBarProps {
  filterParams: WaterFilterParams;
  onFilterChange: (newParams: WaterFilterParams) => void;
  onSearch: () => void;
  onReset: () => void;
  onClear?: () => void;
  onOpenAddModal: () => void;
  onExport: () => void;
}

export const WaterFilterBar: React.FC<WaterFilterBarProps> = ({
  filterParams,
  onFilterChange,
  onSearch,
  onReset,
  onClear,
  onOpenAddModal,
  onExport,
}) => {
  // 默认展示第一行，其余默认收起
  const [isExpanded, setIsExpanded] = useState(false);

  const updateParam = <K extends keyof WaterFilterParams>(key: K, value: WaterFilterParams[K]) => {
    onFilterChange({
      ...filterParams,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 p-3 shadow-xs">
      
      {/* First Row: 4 responsive grid items matching the exact same style as expanded rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2.5 text-xs items-center">
        
        {/* 1. 查询方式 */}
        <div className="w-full flex items-center justify-around bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-md px-2.5 h-8 text-slate-700">
          <span className="text-slate-400 whitespace-nowrap mr-1 font-medium">查询方式:</span>
          <label className="flex items-center gap-1 cursor-pointer select-none">
            <input
              type="radio"
              name="queryMode"
              checked={filterParams.queryMode === 'cert_auth'}
              onChange={() => updateParam('queryMode', 'cert_auth')}
              className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
            <span className="whitespace-nowrap">按发证机关</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer select-none">
            <input
              type="radio"
              name="queryMode"
              checked={filterParams.queryMode === 'water_address'}
              onChange={() => updateParam('queryMode', 'water_address')}
              className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
            <span className={`whitespace-nowrap ${filterParams.queryMode === 'water_address' ? 'text-blue-600 font-medium' : ''}`}>
              按取水地址
            </span>
          </label>
        </div>

        {/* 2. 计量设施(器具)编号 */}
        <input
          type="text"
          value={filterParams.facilityCode}
          onChange={(e) => updateParam('facilityCode', e.target.value)}
          placeholder="请输入计量设施(器具)编号"
          className="w-full h-8 px-3 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition text-xs"
        />

        {/* 3. 计量设施名称 */}
        <input
          type="text"
          value={filterParams.facilityName}
          onChange={(e) => updateParam('facilityName', e.target.value)}
          placeholder="请输入计量设施名称"
          className="w-full h-8 px-3 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition text-xs"
        />

        {/* 4. 取水权人名称 */}
        <input
          type="text"
          value={filterParams.waterOwner}
          onChange={(e) => updateParam('waterOwner', e.target.value)}
          placeholder="请输入取水权人名称"
          className="w-full h-8 px-3 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition text-xs"
        />

      </div>

      {/* Expanded Filter Fields: exact same grid system */}
      {isExpanded && (
        <div className="mt-2.5 pt-2.5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2.5 text-xs items-center">
          
          {/* 许可证编号 */}
          <input
            type="text"
            value={filterParams.permitNumber}
            onChange={(e) => updateParam('permitNumber', e.target.value)}
            placeholder="请输入许可证编号"
            className="w-full h-8 px-3 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition text-xs"
          />

          {/* 水源类型 */}
          <CustomSelect
            className="w-full"
            labelPrefix="水源类型"
            value={filterParams.waterSourceType}
            onChange={(val) => updateParam('waterSourceType', val)}
            placeholder="全部水源"
            options={[
              { value: '', label: '全部水源' },
              { value: '地表水', label: '地表水' },
              { value: '地下水', label: '地下水' },
              { value: '水库水', label: '水库水' },
              { value: '泉水', label: '泉水' },
              { value: '自备井', label: '自备井' },
            ]}
          />

          {/* 数据来源 */}
          <CustomSelect
            className="w-full"
            labelPrefix="数据来源"
            value={filterParams.dataSource}
            onChange={(val) => updateParam('dataSource', val)}
            placeholder="全部来源"
            options={[
              { value: '', label: '全部来源' },
              { value: '市级水利监控专网', label: '市级水利监控专网' },
              { value: '物联网RTU遥测', label: '物联网RTU遥测' },
              { value: '省级数据共享接口', label: '省级数据共享接口' },
              { value: '自备井例行抄报', label: '自备井例行抄报' },
              { value: '人工周期填报', label: '人工周期填报' },
            ]}
          />

          {/* 监测点编号 */}
          <input
            type="text"
            value={filterParams.monitorPointCode}
            onChange={(e) => updateParam('monitorPointCode', e.target.value)}
            placeholder="请输入监测点编号"
            className="w-full h-8 px-3 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition text-xs"
          />

          {/* 取水用途 */}
          <CustomSelect
            className="w-full"
            labelPrefix="取水用途"
            value={filterParams.waterUsage}
            onChange={(val) => updateParam('waterUsage', val)}
            placeholder="全部用途"
            options={[
              { value: '', label: '全部用途' },
              { value: '生活饮用', label: '生活饮用' },
              { value: '工业用水', label: '工业用水' },
              { value: '农业灌溉', label: '农业灌溉' },
              { value: '生态环境', label: '生态环境' },
            ]}
          />

          {/* 计量方式 */}
          <CustomSelect
            className="w-full"
            labelPrefix="计量方式"
            value={filterParams.meteringMethod}
            onChange={(val) => updateParam('meteringMethod', val)}
            placeholder="全部方式"
            options={[
              { value: '', label: '全部方式' },
              { value: '电磁流量计', label: '电磁流量计' },
              { value: '超声波流量计', label: '超声波流量计' },
              { value: '机械水表', label: '机械水表' },
              { value: '明渠流量计', label: '明渠流量计' },
              { value: '多普勒流速仪', label: '多普勒流速仪' },
            ]}
          />

          {/* 数据传输方式 */}
          <CustomSelect
            className="w-full"
            labelPrefix="传输方式"
            value={filterParams.transmissionMethod}
            onChange={(val) => updateParam('transmissionMethod', val)}
            placeholder="全部方式"
            options={[
              { value: '', label: '全部方式' },
              { value: '在线', label: '在线' },
              { value: '非在线', label: '非在线' },
            ]}
          />

          {/* 档案信息是否完善 */}
          <CustomSelect
            className="w-full"
            labelPrefix="档案完善"
            value={filterParams.isArchived}
            onChange={(val) => updateParam('isArchived', val)}
            placeholder="全部状态"
            options={[
              { value: '', label: '全部状态' },
              { value: 'true', label: '是 (已完善)' },
              { value: 'false', label: '否 (待完善)' },
            ]}
          />

          {/* 状态 */}
          <CustomSelect
            className="w-full"
            labelPrefix="使用状态"
            value={filterParams.status}
            onChange={(val) => updateParam('status', val)}
            placeholder="全部状态"
            options={[
              { value: '', label: '全部状态' },
              { value: '正常', label: '正常' },
              { value: '故障', label: '故障' },
              { value: '停用', label: '停用' },
            ]}
          />

          {/* 包含下级 Switch */}
          <div className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-md px-3 h-8">
            <span className="text-slate-600 font-medium">包含下级区域</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={filterParams.includeChildren}
                onClick={() => updateParam('includeChildren', !filterParams.includeChildren)}
                className={`w-8 h-4.5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer ${
                  filterParams.includeChildren ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    filterParams.includeChildren ? 'translate-x-3.5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-500 font-medium w-8">
                {filterParams.includeChildren ? '已开启' : '已关闭'}
              </span>
            </div>
          </div>

        </div>
      )}

      {/* Bottom Button Bar */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        
        {/* Left Action Buttons: 查询, 重置, +新增计量设施, 导出 */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 查询 */}
          <button
            type="button"
            onClick={onSearch}
            className="flex items-center gap-1.5 px-4 h-8 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-xs hover:shadow transition cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>查询</span>
          </button>

          {/* 重置 */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 h-8 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700 rounded-lg text-xs font-medium border border-blue-200/80 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置</span>
          </button>

          {/* +新增计量设施 */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-4 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm hover:shadow transition ml-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ 新增计量设施</span>
          </button>

          {/* 导出 */}
          <button
            type="button"
            onClick={onExport}
            className="flex items-center gap-1.5 px-3.5 h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs hover:shadow transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>导出</span>
          </button>
        </div>

        {/* Toggle Collapse */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 px-2 py-1 rounded transition cursor-pointer"
        >
          <span>{isExpanded ? '收起高级筛选' : '展开高级筛选'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

      </div>

    </div>
  );
};
