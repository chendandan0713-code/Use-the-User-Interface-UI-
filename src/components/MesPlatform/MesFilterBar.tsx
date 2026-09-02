import React, { useState } from 'react';
import { 
  ScanLine, 
  RotateCcw, 
  Plus, 
  ChevronUp, 
  ChevronDown, 
  Search, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { MesFilterParams } from '../../types';

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
  const [isExpanded, setIsExpanded] = useState(true);

  const updateParam = <K extends keyof MesFilterParams>(key: K, value: MesFilterParams[K]) => {
    onFilterChange({
      ...filterParams,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs mb-4">
      
      {/* Row 1: 工单编号 (with 扫码), 产品名称, 零件号, 生产批次 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
        
        {/* 工单编号 */}
        <div className="flex items-center gap-2">
          <label className="w-18 text-slate-600 text-right whitespace-nowrap">工单编号</label>
          <div className="flex-1 flex items-center relative">
            <input
              type="text"
              value={filterParams.orderCode}
              onChange={(e) => updateParam('orderCode', e.target.value)}
              placeholder="请输入工单编号"
              className="w-full h-8 pl-2.5 pr-8 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition font-mono"
            />
            {/* 扫码 Scan icon button matching Image 2 */}
            <button
              type="button"
              onClick={onOpenScanner}
              title="一键扫码识读"
              className="absolute right-1.5 p-1 text-slate-400 hover:text-blue-600 rounded transition"
            >
              <ScanLine className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 产品名称 */}
        <div className="flex items-center gap-2">
          <label className="w-18 text-slate-600 text-right whitespace-nowrap">产品名称</label>
          <input
            type="text"
            value={filterParams.productName}
            onChange={(e) => updateParam('productName', e.target.value)}
            placeholder="请输入产品名称"
            className="flex-1 h-8 px-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition"
          />
        </div>

        {/* 零件号 */}
        <div className="flex items-center gap-2">
          <label className="w-18 text-slate-600 text-right whitespace-nowrap">零件号</label>
          <input
            type="text"
            value={filterParams.partNumber}
            onChange={(e) => updateParam('partNumber', e.target.value)}
            placeholder="请输入零件号"
            className="flex-1 h-8 px-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition font-mono"
          />
        </div>

        {/* 生产批次 */}
        <div className="flex items-center gap-2">
          <label className="w-18 text-slate-600 text-right whitespace-nowrap">生产批次</label>
          <input
            type="text"
            value={filterParams.productionBatch}
            onChange={(e) => updateParam('productionBatch', e.target.value)}
            placeholder="请输入生产批次"
            className="flex-1 h-8 px-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition font-mono"
          />
        </div>

      </div>

      {/* Row 2: 工单状态, 优先级, 生产计划, 关联订单 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs mt-3">
        
        {/* 工单状态 */}
        <div className="flex items-center gap-2">
          <label className="w-18 text-slate-600 text-right whitespace-nowrap">工单状态</label>
          <select
            value={filterParams.status}
            onChange={(e) => updateParam('status', e.target.value)}
            className="flex-1 h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 outline-none transition cursor-pointer"
          >
            <option value="">请选择状态</option>
            <option value="待排产">待排产</option>
            <option value="生产中">生产中</option>
            <option value="质检中">质检中</option>
            <option value="已完工">已完工</option>
            <option value="暂停">暂停</option>
          </select>
        </div>

        {/* 优先级 */}
        <div className="flex items-center gap-2">
          <label className="w-18 text-slate-600 text-right whitespace-nowrap">优先级</label>
          <select
            value={filterParams.priority}
            onChange={(e) => updateParam('priority', e.target.value)}
            className="flex-1 h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 outline-none transition cursor-pointer"
          >
            <option value="">请选择优先级</option>
            <option value="特急">特急 (P0)</option>
            <option value="高">高 (P1)</option>
            <option value="中">中 (P2)</option>
            <option value="低">低 (P3)</option>
          </select>
        </div>

        {/* 生产计划 */}
        <div className="flex items-center gap-2">
          <label className="w-18 text-slate-600 text-right whitespace-nowrap">生产计划</label>
          <select
            value={filterParams.productionPlan}
            onChange={(e) => updateParam('productionPlan', e.target.value)}
            className="flex-1 h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 outline-none transition cursor-pointer"
          >
            <option value="">请选择生产计划</option>
            <option value="PLN-2026Q3-09">PLN-2026Q3-09 (智能水表主生产)</option>
            <option value="PLN-2026Q3-10">PLN-2026Q3-10 (RTU遥测终端工程)</option>
            <option value="PLN-2026Q3-11">PLN-2026Q3-11 (大口径外协铸造)</option>
            <option value="PLN-2026Q3-08">PLN-2026Q3-08 (明渠测流特型件)</option>
          </select>
        </div>

        {/* 关联订单 */}
        <div className="flex items-center gap-2">
          <label className="w-18 text-slate-600 text-right whitespace-nowrap">关联订单</label>
          <input
            type="text"
            value={filterParams.relatedOrder}
            onChange={(e) => updateParam('relatedOrder', e.target.value)}
            placeholder="请输入关联订单号"
            className="flex-1 h-8 px-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition font-mono"
          />
        </div>

      </div>

      {/* Row 3: 客户名称, 制单人, 材料牌号, 创建时间 (Expanded) */}
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs mt-3 pt-3 border-t border-slate-100">
          
          {/* 客户名称 */}
          <div className="flex items-center gap-2">
            <label className="w-18 text-slate-600 text-right whitespace-nowrap">客户名称</label>
            <select
              value={filterParams.customerName}
              onChange={(e) => updateParam('customerName', e.target.value)}
              className="flex-1 h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 outline-none transition cursor-pointer"
            >
              <option value="">请选择客户</option>
              <option value="西宁市供水集团总公司">西宁市供水集团总公司</option>
              <option value="青海西矿水务水资源监控中心">青海西矿水务水资源监控中心</option>
              <option value="湟中区水利水保局">湟中区水利水保局</option>
              <option value="黑泉水库灌区管理局">黑泉水库灌区管理局</option>
              <option value="西宁市水务局河湖保护中心">西宁市水务局河湖保护中心</option>
            </select>
          </div>

          {/* 制单人 */}
          <div className="flex items-center gap-2">
            <label className="w-18 text-slate-600 text-right whitespace-nowrap">制单人</label>
            <select
              value={filterParams.creator}
              onChange={(e) => updateParam('creator', e.target.value)}
              className="flex-1 h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 outline-none transition cursor-pointer"
            >
              <option value="">请选择制单人</option>
              <option value="张建军(88012)">张建军(88012)</option>
              <option value="王海玲(88015)">王海玲(88015)</option>
              <option value="刘伟(88019)">刘伟(88019)</option>
            </select>
          </div>

          {/* 材料牌号 */}
          <div className="flex items-center gap-2">
            <label className="w-18 text-slate-600 text-right whitespace-nowrap">材料牌号</label>
            <input
              type="text"
              value={filterParams.materialGrade}
              onChange={(e) => updateParam('materialGrade', e.target.value)}
              placeholder="请输入材料牌号"
              className="flex-1 h-8 px-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          {/* 创建时间 (日期范围) */}
          <div className="flex items-center gap-2">
            <label className="w-18 text-slate-600 text-right whitespace-nowrap">创建时间</label>
            <div className="flex-1 flex items-center gap-1">
              <input
                type="date"
                value={filterParams.createDateRange}
                onChange={(e) => updateParam('createDateRange', e.target.value)}
                className="w-full h-8 px-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-md border border-slate-200 focus:border-blue-500 outline-none transition font-mono text-[11px]"
              />
            </div>
          </div>

        </div>
      )}

      {/* Bottom Button Bar matching Image 2 */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left side actions: 计划开始, 计划结束 (if expanded) */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">计划开始:</span>
            <input
              type="date"
              value={filterParams.planStartDate}
              onChange={(e) => updateParam('planStartDate', e.target.value)}
              className="h-7 px-2 bg-slate-50 text-slate-700 rounded border border-slate-200 font-mono text-[11px]"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">计划结束:</span>
            <input
              type="date"
              value={filterParams.planEndDate}
              onChange={(e) => updateParam('planEndDate', e.target.value)}
              className="h-7 px-2 bg-slate-50 text-slate-700 rounded border border-slate-200 font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Right side buttons matching Image 2: [重置], [+ 新增], [收起/展开] */}
        <div className="flex items-center gap-2">
          
          {/* 重置 */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 px-3.5 h-8 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置</span>
          </button>

          {/* + 新增 */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-4 h-8 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-xs hover:shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ 新增</span>
          </button>

          {/* 收起 / 展开 */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-3 h-8 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium border border-blue-200 transition"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>收起</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>展开</span>
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
};
