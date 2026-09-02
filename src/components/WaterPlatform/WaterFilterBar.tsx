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
  const [isExpanded, setIsExpanded] = useState(true);

  const updateParam = <K extends keyof WaterFilterParams>(key: K, value: WaterFilterParams[K]) => {
    onFilterChange({
      ...filterParams,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 p-3 shadow-xs">
      
      {/* Top row: Radio Query Mode & Key inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 items-center">
        
        {/* 查询方式 Radio */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-700">
          <span className="text-slate-500 whitespace-nowrap">查询方式:</span>
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="radio"
              name="queryMode"
              checked={filterParams.queryMode === 'cert_auth'}
              onChange={() => updateParam('queryMode', 'cert_auth')}
              className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <span>按发证机关</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="radio"
              name="queryMode"
              checked={filterParams.queryMode === 'water_address'}
              onChange={() => updateParam('queryMode', 'water_address')}
              className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <span className="text-blue-600 font-semibold flex items-center gap-1">
              按取水地址
            </span>
          </label>
        </div>

        {/* 计量设施(器具)编号 */}
        <div className="flex items-center gap-2 text-xs">
          <label className="w-32 text-slate-600 text-right whitespace-nowrap">
            计量设施(器具)编号
          </label>
          <input
            type="text"
            value={filterParams.facilityCode}
            onChange={(e) => updateParam('facilityCode', e.target.value)}
            placeholder="请输入编号"
            className="flex-1 h-8 px-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* 计量设施名称 */}
        <div className="flex items-center gap-2 text-xs">
          <label className="w-24 text-slate-600 text-right whitespace-nowrap">
            计量设施名称
          </label>
          <input
            type="text"
            value={filterParams.facilityName}
            onChange={(e) => updateParam('facilityName', e.target.value)}
            placeholder="请输入名称"
            className="flex-1 h-8 px-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

      </div>

      {/* Expanded Filter Fields */}
      {isExpanded && (
        <div className="mt-2.5 pt-2.5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          
          {/* 取水权人名称 */}
          <div className="flex items-center gap-2">
            <label className="w-24 text-slate-600 text-right whitespace-nowrap">取水权人名称</label>
            <input
              type="text"
              value={filterParams.waterOwner}
              onChange={(e) => updateParam('waterOwner', e.target.value)}
              placeholder="请输入"
              className="flex-1 h-8 px-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          {/* 许可证编号 */}
          <div className="flex items-center gap-2">
            <label className="w-20 text-slate-600 text-right whitespace-nowrap">许可证编号</label>
            <input
              type="text"
              value={filterParams.permitNumber}
              onChange={(e) => updateParam('permitNumber', e.target.value)}
              placeholder="请输入"
              className="flex-1 h-8 px-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          {/* 水源类型 */}
          <div className="flex items-center gap-2">
            <label className="w-20 text-slate-600 text-right whitespace-nowrap">水源类型</label>
            <CustomSelect
              className="flex-1"
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
          </div>

          {/* 数据来源 */}
          <div className="flex items-center gap-2">
            <label className="w-20 text-slate-600 text-right whitespace-nowrap">数据来源</label>
            <CustomSelect
              className="flex-1"
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
          </div>

          {/* 监测点编号 */}
          <div className="flex items-center gap-2">
            <label className="w-24 text-slate-600 text-right whitespace-nowrap">监测点编号</label>
            <input
              type="text"
              value={filterParams.monitorPointCode}
              onChange={(e) => updateParam('monitorPointCode', e.target.value)}
              placeholder="请输入"
              className="flex-1 h-8 px-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          {/* 取水用途 */}
          <div className="flex items-center gap-2">
            <label className="w-20 text-slate-600 text-right whitespace-nowrap">取水用途</label>
            <CustomSelect
              className="flex-1"
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
          </div>

          {/* 计量方式 */}
          <div className="flex items-center gap-2">
            <label className="w-20 text-slate-600 text-right whitespace-nowrap">计量方式</label>
            <CustomSelect
              className="flex-1"
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
          </div>

          {/* 数据传输方式 */}
          <div className="flex items-center gap-2">
            <label className="w-20 text-slate-600 text-right whitespace-nowrap">数据传输方式</label>
            <CustomSelect
              className="flex-1"
              value={filterParams.transmissionMethod}
              onChange={(val) => updateParam('transmissionMethod', val)}
              placeholder="全部传输"
              options={[
                { value: '', label: '全部传输' },
                { value: '在线', label: '在线' },
                { value: '非在线', label: '非在线' },
              ]}
            />
          </div>

          {/* 档案信息是否完善 */}
          <div className="flex items-center gap-2">
            <label className="w-24 text-slate-600 text-right whitespace-nowrap">档案是否完善</label>
            <CustomSelect
              className="flex-1"
              value={filterParams.isArchived}
              onChange={(val) => updateParam('isArchived', val)}
              placeholder="全部状态"
              options={[
                { value: '', label: '全部状态' },
                { value: 'true', label: '是 (已完善)' },
                { value: 'false', label: '否 (待完善)' },
              ]}
            />
          </div>

          {/* 状态 */}
          <div className="flex items-center gap-2">
            <label className="w-20 text-slate-600 text-right whitespace-nowrap">使用状态</label>
            <CustomSelect
              className="flex-1"
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
          </div>

          {/* 包含下级 Switch */}
          <div className="flex items-center gap-2.5">
            <span className="text-slate-600 whitespace-nowrap">包含下级</span>
            <button
              type="button"
              role="switch"
              aria-checked={filterParams.includeChildren}
              onClick={() => updateParam('includeChildren', !filterParams.includeChildren)}
              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer ${
                filterParams.includeChildren ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  filterParams.includeChildren ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-[11px] text-slate-400">
              {filterParams.includeChildren ? '已开启' : '已关闭'}
            </span>
          </div>

        </div>
      )}

      {/* Bottom Button Bar */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        
        {/* Left Action Buttons matching Image 1: 查询, 重置, 清空, +新增计量设施, 导出 */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 查询 */}
          <button
            type="button"
            onClick={onSearch}
            className="flex items-center gap-1.5 px-4 h-8 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-xs hover:shadow transition"
          >
            <Search className="w-3.5 h-3.5" />
            <span>查询</span>
          </button>

          {/* 重置 */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 h-8 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700 rounded-lg text-xs font-medium border border-blue-200/80 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置</span>
          </button>

          {/* +新增计量设施 */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-4 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm hover:shadow transition ml-1"
          >
            <Plus className="w-4 h-4" />
            <span>+ 新增计量设施</span>
          </button>

          {/* 导出 */}
          <button
            type="button"
            onClick={onExport}
            className="flex items-center gap-1.5 px-3.5 h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs hover:shadow transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>导出</span>
          </button>
        </div>

        {/* Toggle Collapse */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 px-2 py-1 rounded transition"
        >
          <span>{isExpanded ? '收起高级筛选' : '展开高级筛选'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

      </div>

    </div>
  );
};
