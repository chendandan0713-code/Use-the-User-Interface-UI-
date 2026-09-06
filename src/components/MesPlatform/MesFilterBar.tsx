import React, { useState } from 'react';
import { 
  ScanLine, 
  RotateCcw, 
  Plus, 
  ChevronDown, 
  Search, 
  Download,
  X
} from 'lucide-react';
import { MesFilterParams } from '../../types';
import { CustomSelect } from './CustomSelect';

interface MesFilterBarProps {
  filterParams: MesFilterParams;
  onFilterChange: (newParams: MesFilterParams) => void;
  onReset: () => void;
  onOpenAddModal: () => void;
  onOpenScanner: () => void;
  onNotify: (title: string, message?: string, type?: 'info' | 'success') => void;
}

export const MesFilterBar: React.FC<MesFilterBarProps> = ({
  filterParams,
  onFilterChange,
  onReset,
  onOpenAddModal,
  onOpenScanner,
  onNotify,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [includeOutsourced, setIncludeOutsourced] = useState(true);
  const [orderQueryMode, setOrderQueryMode] = useState('all');

  const updateParam = <K extends keyof MesFilterParams>(key: K, value: MesFilterParams[K]) => {
    onFilterChange({
      ...filterParams,
      [key]: value,
    });
  };

  const clearParam = <K extends keyof MesFilterParams>(key: K) => {
    updateParam(key, '' as unknown as MesFilterParams[K]);
  };

  const handleSearchClick = () => {
    onNotify('查询工单', '已根据当前筛选条件更新工单列表', 'success');
  };

  const handleExportClick = () => {
    onNotify('导出工单数据', '正在导出 MES 生产工单台账 Excel 报表...', 'info');
  };

  return (
    <div className="bg-white rounded-lg p-3 border border-[#b4c7e0] shadow-2xs text-xs select-none space-y-3 mb-3">
      {/* Top Filter Inputs Container (与计量设施管理页面严格一致) */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* 1. 工单范围单选 */}
        <div className="flex items-center gap-3 px-2 py-1 bg-[#f8fafc] rounded border border-[#b8cde6] text-gray-700 shrink-0">
          <span className="text-gray-500">工单范围:</span>
          <label className="inline-flex items-center gap-1 cursor-pointer hover:text-gray-900">
            <input
              type="radio"
              name="mesOrderQueryMode"
              value="all"
              checked={orderQueryMode === 'all'}
              onChange={() => {
                setOrderQueryMode('all');
                updateParam('status', '');
              }}
              className="accent-[#1677ff] cursor-pointer"
            />
            <span>全部工单</span>
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer text-[#1677ff] font-medium">
            <input
              type="radio"
              name="mesOrderQueryMode"
              value="inProduction"
              checked={orderQueryMode === 'inProduction'}
              onChange={() => {
                setOrderQueryMode('inProduction');
                updateParam('status', '生产中');
              }}
              className="accent-[#1677ff] cursor-pointer"
            />
            <span>生产中工单</span>
          </label>
        </div>

        {/* 2. 请输入工单编号 (带扫码与清空) */}
        <div className="relative w-[210px] shrink-0">
          <input
            type="text"
            value={filterParams.orderCode}
            onChange={(e) => updateParam('orderCode', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
            placeholder="请输入工单编号"
            className="w-full pl-2.5 pr-14 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800 font-mono"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            {filterParams.orderCode && (
              <button
                type="button"
                onClick={() => clearParam('orderCode')}
                className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                title="清空"
              >
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              type="button"
              onClick={onOpenScanner}
              title="一键扫码识读"
              className="p-1 text-[#1677ff] hover:text-blue-700 hover:bg-blue-50 rounded transition cursor-pointer"
            >
              <ScanLine className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. 请输入产品名称 */}
        <div className="relative w-[180px] shrink-0">
          <input
            type="text"
            value={filterParams.productName}
            onChange={(e) => updateParam('productName', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
            placeholder="请输入产品名称"
            className="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
          />
          {filterParams.productName && (
            <button
              type="button"
              onClick={() => clearParam('productName')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
              title="清空"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* 4. 请输入零件号 */}
        <div className="relative w-[180px] shrink-0">
          <input
            type="text"
            value={filterParams.partNumber}
            onChange={(e) => updateParam('partNumber', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
            placeholder="请输入零件号"
            className="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800 font-mono"
          />
          {filterParams.partNumber && (
            <button
              type="button"
              onClick={() => clearParam('partNumber')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
              title="清空"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* 5. 请输入生产批次 */}
        <div className="relative w-[180px] shrink-0">
          <input
            type="text"
            value={filterParams.productionBatch}
            onChange={(e) => updateParam('productionBatch', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
            placeholder="请输入生产批次"
            className="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800 font-mono"
          />
          {filterParams.productionBatch && (
            <button
              type="button"
              onClick={() => clearParam('productionBatch')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
              title="清空"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* 6. 工单状态 */}
        <CustomSelect
          value={filterParams.status}
          onChange={(val) => updateParam('status', val)}
          options={[
            { value: '', label: '全部工单状态' },
            { value: '待排产', label: '待排产', badge: 'true', badgeColor: 'bg-amber-500' },
            { value: '生产中', label: '生产中', badge: 'true', badgeColor: 'bg-blue-500' },
            { value: '质检中', label: '质检中', badge: 'true', badgeColor: 'bg-purple-500' },
            { value: '已完工', label: '已完工', badge: 'true', badgeColor: 'bg-emerald-500' },
            { value: '暂停', label: '暂停', badge: 'true', badgeColor: 'bg-rose-500' },
          ]}
          placeholder="工单状态: 全部"
          customClass="w-[170px] shrink-0"
        />

        {/* 7. 优先级 */}
        <CustomSelect
          value={filterParams.priority}
          onChange={(val) => updateParam('priority', val)}
          options={[
            { value: '', label: '全部优先级' },
            { value: '特急', label: '特急 (P0)', badge: 'true', badgeColor: 'bg-rose-500' },
            { value: '高', label: '高 (P1)', badge: 'true', badgeColor: 'bg-amber-500' },
            { value: '中', label: '中 (P2)', badge: 'true', badgeColor: 'bg-blue-500' },
            { value: '低', label: '低 (P3)', badge: 'true', badgeColor: 'bg-slate-400' },
          ]}
          placeholder="优先级: 全部"
          customClass="w-[160px] shrink-0"
        />

        {/* 高级展开筛选字段 */}
        {isExpanded && (
          <>
            {/* 8. 生产计划 */}
            <CustomSelect
              value={filterParams.productionPlan}
              onChange={(val) => updateParam('productionPlan', val)}
              options={[
                { value: '', label: '全部生产计划' },
                { value: 'PLN-2026Q3-09', label: 'PLN-2026Q3-09 (智能水表)' },
                { value: 'PLN-2026Q3-10', label: 'PLN-2026Q3-10 (RTU遥测)' },
                { value: 'PLN-2026Q3-11', label: 'PLN-2026Q3-11 (外协铸造)' },
                { value: 'PLN-2026Q3-08', label: 'PLN-2026Q3-08 (明渠特型)' },
              ]}
              placeholder="生产计划: 全部"
              customClass="w-[185px] shrink-0"
            />

            {/* 9. 客户名称 */}
            <CustomSelect
              value={filterParams.customerName}
              onChange={(val) => updateParam('customerName', val)}
              options={[
                { value: '', label: '全部客户' },
                { value: '西宁市供水集团总公司', label: '西宁市供水集团总公司' },
                { value: '青海西矿水务水资源监控中心', label: '青海西矿水务监控中心' },
                { value: '湟中区水利水保局', label: '湟中区水利水保局' },
                { value: '黑泉水库灌区管理局', label: '黑泉水库灌区管理局' },
              ]}
              placeholder="客户名称: 全部"
              customClass="w-[185px] shrink-0"
            />

            {/* 10. 制单人 */}
            <CustomSelect
              value={filterParams.creator}
              onChange={(val) => updateParam('creator', val)}
              options={[
                { value: '', label: '全部制单人' },
                { value: '张建军(88012)', label: '张建军(88012)' },
                { value: '王海玲(88015)', label: '王海玲(88015)' },
                { value: '刘伟(88019)', label: '刘伟(88019)' },
              ]}
              placeholder="制单人: 全部"
              customClass="w-[160px] shrink-0"
            />

            {/* 11. 关联订单 */}
            <div className="relative w-[170px] shrink-0">
              <input
                type="text"
                value={filterParams.relatedOrder}
                onChange={(e) => updateParam('relatedOrder', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                placeholder="请输入关联订单号"
                className="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800 font-mono"
              />
              {filterParams.relatedOrder && (
                <button
                  type="button"
                  onClick={() => clearParam('relatedOrder')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
                  title="清空"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* 12. 材料牌号 */}
            <div className="relative w-[170px] shrink-0">
              <input
                type="text"
                value={filterParams.materialGrade}
                onChange={(e) => updateParam('materialGrade', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                placeholder="请输入材料牌号"
                className="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
              />
              {filterParams.materialGrade && (
                <button
                  type="button"
                  onClick={() => clearParam('materialGrade')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
                  title="清空"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* 13. 创建时间 */}
            <div className="relative w-[170px] shrink-0">
              <input
                type="date"
                value={filterParams.createDateRange}
                onChange={(e) => updateParam('createDateRange', e.target.value)}
                title="创建时间"
                className="w-full pl-2.5 pr-2 py-1 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition text-gray-800 font-mono"
              />
            </div>

            {/* 14. 计划开始日期 */}
            <div className="relative w-[170px] shrink-0">
              <input
                type="date"
                value={filterParams.planStartDate}
                onChange={(e) => updateParam('planStartDate', e.target.value)}
                title="计划开始日期"
                className="w-full pl-2.5 pr-2 py-1 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition text-gray-800 font-mono"
              />
            </div>

            {/* 15. 计划结束日期 */}
            <div className="relative w-[170px] shrink-0">
              <input
                type="date"
                value={filterParams.planEndDate}
                onChange={(e) => updateParam('planEndDate', e.target.value)}
                title="计划结束日期"
                className="w-full pl-2.5 pr-2 py-1 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition text-gray-800 font-mono"
              />
            </div>
          </>
        )}
      </div>

      {/* Bottom Action Row (严格与计量设施管理保持一致) */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        {/* Left: 按钮集合 */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. 查询 (亮纯蓝) */}
          <button
            type="button"
            onClick={handleSearchClick}
            className="px-4 py-1.5 rounded bg-[#1677ff] hover:bg-blue-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <Search className="w-3.5 h-3.5 text-white" />
            <span>查询</span>
          </button>

          {/* 2. 重置 (微淡蓝背景 + 蓝字) */}
          <button
            type="button"
            onClick={onReset}
            className="px-3.5 py-1.5 rounded bg-[#f0f5fe] text-[#1677ff] border border-[#d2e2fa] hover:bg-blue-100/50 font-medium flex items-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置</span>
          </button>

          {/* 3. + 新增工单 (高饱和亮蓝 #1677ff) */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="px-3.5 py-1.5 rounded bg-[#1677ff] hover:bg-blue-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ 新增工单</span>
          </button>

          {/* 4. 扫码识读 (白底灰边) */}
          <button
            type="button"
            onClick={onOpenScanner}
            className="px-3 py-1.5 rounded border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium flex items-center gap-1.5 transition cursor-pointer bg-white shadow-2xs"
          >
            <ScanLine className="w-3.5 h-3.5 text-slate-600" />
            <span>扫码识读</span>
          </button>

          {/* 5. 导出工单 (翠绿) */}
          <button
            type="button"
            onClick={handleExportClick}
            className="px-3.5 py-1.5 rounded bg-[#00a854] hover:bg-emerald-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>导出工单</span>
          </button>

          {/* 6. 包含外协工单 Switch */}
          <div 
            className="flex items-center gap-2 ml-1 text-gray-700 cursor-pointer select-none" 
            onClick={() => setIncludeOutsourced(!includeOutsourced)}
          >
            <span>包含外协工单</span>
            <div
              className={`w-8 h-4 rounded-full transition-colors relative flex items-center px-0.5 ${
                includeOutsourced ? 'bg-[#1677ff]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full bg-white transition-transform ${
                  includeOutsourced ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
            <span className="text-gray-500 text-[11px]">{includeOutsourced ? '已开启' : '已关闭'}</span>
          </div>
        </div>

        {/* Right: 展开高级筛选 */}
        <div>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#1677ff] hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer text-xs"
          >
            <span>{isExpanded ? '收起高级筛选' : '展开高级筛选'}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
