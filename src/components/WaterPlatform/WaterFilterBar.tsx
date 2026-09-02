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
    <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs mb-4">
      
      {/* Top row: Radio Query Mode & Key inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 items-center">
        
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
        <div className="mt-3.5 pt-3.5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
          
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
            <select
              value={filterParams.waterSourceType}
              onChange={(e) => updateParam('waterSourceType', e.target.value)}
              className="flex-1 h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition cursor-pointer"
            >
              <option value="">全部水源</option>
              <option value="地表水">地表水</option>
              <option value="地下水">地下水</option>
              <option value="水库水">水库水</option>
              <option value="泉水">泉水</option>
              <option value="自备井">自备井</option>
            </select>
          </div>

          {/* 数据来源 */}
          <div className="flex items-center gap-2">
            <label className="w-20 text-slate-600 text-right whitespace-nowrap">数据来源</label>
            <select
              value={filterParams.dataSource}
              onChange={(e) => updateParam('dataSource', e.target.value)}
              className="flex-1 h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition cursor-pointer"
            >
              <option value="">全部来源</option>
              <option value="市级水利监控专网">市级水利监控专网</option>
              <option value="物联网RTU遥测">物联网RTU遥测</option>
              <option value="省级数据共享接口">省级数据共享接口</option>
              <option value="自备井例行抄报">自备井例行抄报</option>
              <option value="人工周期填报">人工周期填报</option>
            </select>
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
            <select
              value={filterParams.waterUsage}
              onChange={(e) => updateParam('waterUsage', e.target.value)}
              className="flex-1 h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition cursor-pointer"
            >
              <option value="">全部用途</option>
              <option value="生活饮用">生活饮用</option>
              <option value="工业用水">工业用水</option>
              <option value="农业灌溉">农业灌溉</option>
              <option value="生态环境">生态环境</option>
            </select>
          </div>

          {/* 计量方式 */}
          <div className="flex items-center gap-2">
            <label className="w-20 text-slate-600 text-right whitespace-nowrap">计量方式</label>
            <select
              value={filterParams.meteringMethod}
              onChange={(e) => updateParam('meteringMethod', e.target.value)}
              className="flex-1 h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition cursor-pointer"
            >
              <option value="">全部方式</option>
              <option value="电磁流量计">电磁流量计</option>
              <option value="超声波流量计">超声波流量计</option>
              <option value="机械水表">机械水表</option>
              <option value="明渠流量计">明渠流量计</option>
              <option value="多普勒流速仪">多普勒流速仪</option>
            </select>
          </div>

          {/* 数据传输方式 */}
          <div className="flex items-center gap-2">
            <label className="w-20 text-slate-600 text-right whitespace-nowrap">数据传输方式</label>
            <select
              value={filterParams.transmissionMethod}
              onChange={(e) => updateParam('transmissionMethod', e.target.value)}
              className="flex-1 h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition cursor-pointer"
            >
              <option value="">全部传输</option>
              <option value="在线">在线</option>
              <option value="非在线">非在线</option>
            </select>
          </div>

          {/* 档案信息是否完善 */}
          <div className="flex items-center gap-2">
            <label className="w-24 text-slate-600 text-right whitespace-nowrap">档案是否完善</label>
            <select
              value={filterParams.isArchived}
              onChange={(e) => updateParam('isArchived', e.target.value)}
              className="flex-1 h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition cursor-pointer"
            >
              <option value="">全部状态</option>
              <option value="true">是 (已完善)</option>
              <option value="false">否 (待完善)</option>
            </select>
          </div>

          {/* 状态 */}
          <div className="flex items-center gap-2">
            <label className="w-20 text-slate-600 text-right whitespace-nowrap">使用状态</label>
            <select
              value={filterParams.status}
              onChange={(e) => updateParam('status', e.target.value)}
              className="flex-1 h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition cursor-pointer"
            >
              <option value="">全部状态</option>
              <option value="正常">正常</option>
              <option value="故障">故障</option>
              <option value="停用">停用</option>
            </select>
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
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
        
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
