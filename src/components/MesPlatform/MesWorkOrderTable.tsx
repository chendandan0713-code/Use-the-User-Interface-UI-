import React, { useState } from 'react';
import { 
  Settings2, 
  Eye, 
  Edit3, 
  Send, 
  FileCheck, 
  QrCode, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check,
  PlayCircle,
  PauseCircle,
  Clock,
  MoreVertical
} from 'lucide-react';
import { WorkOrder } from '../../types';

interface MesWorkOrderTableProps {
  orders: WorkOrder[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onViewDetail: (order: WorkOrder) => void;
  onEdit: (order: WorkOrder) => void;
  onAssign: (order: WorkOrder) => void;
  onReportWork: (order: WorkOrder) => void;
  onOpenSettings: () => void;
  onNotify: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export const MesWorkOrderTable: React.FC<MesWorkOrderTableProps> = ({
  orders,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onViewDetail,
  onEdit,
  onAssign,
  onReportWork,
  onOpenSettings,
  onNotify,
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const allSelected = orders.length > 0 && selectedIds.length === orders.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(text);
    onNotify('已复制', text, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-xs flex flex-col relative h-full min-h-0 flex-1 overflow-hidden">
      
      {/* Table Area */}
      <div className="overflow-auto flex-1 min-h-0 custom-scrollbar border-b border-slate-300">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#ebf3fb] text-slate-800 border-b border-slate-300 font-semibold sticky top-0 z-20 select-none">
              <th className="py-3 px-2 w-16 min-w-[64px] text-center border-r border-slate-300 sticky top-0 left-0 bg-[#ebf3fb] shadow-[2px_0_6px_-2px_rgba(0,0,0,0.08)] z-30">
                <div className="flex items-center justify-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={onToggleSelectAll}
                    className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-700">序号</span>
                </div>
              </th>
              <th className="py-3 px-3 min-w-[140px] whitespace-nowrap border-r border-slate-300 sticky top-0 bg-[#ebf3fb]">工单编号</th>
              <th className="py-3 px-3 min-w-[90px] whitespace-nowrap text-center border-r border-slate-300 sticky top-0 bg-[#ebf3fb]">工单标识</th>
              <th className="py-3 px-3 min-w-[180px] whitespace-nowrap border-r border-slate-300 sticky top-0 bg-[#ebf3fb]">产品名称</th>
              <th className="py-3 px-3 min-w-[130px] whitespace-nowrap border-r border-slate-300 sticky top-0 bg-[#ebf3fb]">产品编号</th>
              <th className="py-3 px-3 min-w-[140px] whitespace-nowrap border-r border-slate-300 sticky top-0 bg-[#ebf3fb]">规格</th>
              <th className="py-3 px-3 min-w-[60px] whitespace-nowrap text-center border-r border-slate-300 sticky top-0 bg-[#ebf3fb]">单位</th>
              <th className="py-3 px-3 min-w-[130px] whitespace-nowrap border-r border-slate-300 sticky top-0 bg-[#ebf3fb]">材料牌号</th>
              <th className="py-3 px-3 min-w-[130px] whitespace-nowrap border-r border-slate-300 sticky top-0 bg-[#ebf3fb]">零件图号</th>
              <th className="py-3 px-3 min-w-[120px] whitespace-nowrap border-r border-slate-300 sticky top-0 bg-[#ebf3fb]">生产批次</th>
              <th className="py-3 px-3 min-w-[70px] whitespace-nowrap text-center border-r border-slate-300 sticky top-0 bg-[#ebf3fb]">类型</th>
              <th className="py-3 px-3 min-w-[130px] whitespace-nowrap border-r border-slate-300 sticky top-0 bg-[#ebf3fb]">生产计划</th>
              <th className="py-3 px-3 min-w-[130px] whitespace-nowrap border-r border-slate-300 sticky top-0 bg-[#ebf3fb]">进度与状态</th>
              <th className="py-3 px-3 min-w-[140px] text-center sticky top-0 right-0 bg-[#ebf3fb] border-l border-slate-300 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.08)] z-30">
                <div className="flex items-center justify-between px-2">
                  <span>操作</span>
                  {/* Settings Cog Icon matching Image 2 */}
                  <button
                    type="button"
                    onClick={onOpenSettings}
                    title="列配置与自定义显示"
                    className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-slate-200 transition"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-slate-700">
            {orders.length > 0 ? (
              orders.map((order, idx) => {
                const isSelected = selectedIds.includes(order.id);
                const isUrgent = order.priority === '特急' || order.priority === '高';

                return (
                  <tr
                    key={order.id}
                    className={`group transition-colors hover:bg-blue-50/40 ${
                      isSelected ? 'bg-blue-50/70' : idx % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'
                    }`}
                  >
                    {/* Checkbox & 序号 (固定在最左侧) */}
                    <td
                      className={`py-2.5 px-2 text-center border-r border-slate-200 select-none whitespace-nowrap sticky left-0 z-10 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.08)] ${
                        isSelected ? 'bg-blue-50' : idx % 2 === 1 ? 'bg-[#fcfdfd] group-hover:bg-blue-50/40' : 'bg-white group-hover:bg-blue-50/40'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelect(order.id)}
                          className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                        />
                        <span className="text-slate-500 font-mono text-xs w-6 text-center">
                          {(currentPage - 1) * pageSize + idx + 1}
                        </span>
                      </div>
                    </td>

                    {/* 工单编号 */}
                    <td className="py-2.5 px-3 border-r border-slate-200">
                      <div className="flex items-center gap-1 font-mono text-blue-600 font-semibold">
                        <span 
                          className="hover:underline cursor-pointer"
                          onClick={() => onViewDetail(order)}
                        >
                          {order.orderCode}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(order.orderCode)}
                          className="text-slate-400 hover:text-blue-600 p-0.5 rounded"
                        >
                          {copiedCode === order.orderCode ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* 工单标识 */}
                    <td className="py-2.5 px-3 text-center border-r border-slate-200">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 rounded text-[11px] font-mono text-slate-600 border border-slate-200">
                        <QrCode className="w-3 h-3 text-slate-500" />
                        {order.orderTag}
                      </span>
                    </td>

                    {/* 产品名称 */}
                    <td className="py-2.5 px-3 border-r border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900">{order.productName}</span>
                        {isUrgent && (
                          <span className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                            order.priority === '特急' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {order.priority}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 产品编号 */}
                    <td className="py-2.5 px-3 font-mono text-slate-600 border-r border-slate-200">
                      {order.productCode}
                    </td>

                    {/* 规格 */}
                    <td className="py-2.5 px-3 text-slate-600 border-r border-slate-200">
                      {order.spec}
                    </td>

                    {/* 单位 */}
                    <td className="py-2.5 px-3 text-center text-slate-600 font-medium border-r border-slate-200">
                      {order.unit}
                    </td>

                    {/* 材料牌号 */}
                    <td className="py-2.5 px-3 text-slate-700 font-medium border-r border-slate-200">
                      {order.materialGrade}
                    </td>

                    {/* 零件图号 */}
                    <td className="py-2.5 px-3 font-mono text-slate-600 border-r border-slate-200">
                      {order.partNumber}
                    </td>

                    {/* 生产批次 */}
                    <td className="py-2.5 px-3 font-mono text-slate-600 border-r border-slate-200">
                      {order.productionBatch}
                    </td>

                    {/* 类型 */}
                    <td className="py-2.5 px-3 text-center border-r border-slate-200">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        order.type === '自制'
                          ? 'bg-blue-100 text-blue-800'
                          : order.type === '委外'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.type}
                      </span>
                    </td>

                    {/* 生产计划 */}
                    <td className="py-2.5 px-3 font-mono text-slate-600 border-r border-slate-200">
                      {order.productionPlan}
                    </td>

                    {/* 进度与状态 */}
                    <td className="py-2.5 px-3 border-r border-slate-200">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className={`font-semibold ${
                            order.status === '生产中'
                              ? 'text-blue-600'
                              : order.status === '已完工'
                              ? 'text-emerald-600'
                              : order.status === '质检中'
                              ? 'text-purple-600'
                              : order.status === '暂停'
                              ? 'text-rose-600'
                              : 'text-slate-500'
                          }`}>
                            {order.status}
                          </span>
                          <span className="font-mono text-slate-500">
                            {order.completedQuantity}/{order.plannedQuantity} {order.unit} ({order.progress}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              order.status === '已完工'
                                ? 'bg-emerald-500'
                                : order.status === '暂停'
                                ? 'bg-rose-500'
                                : 'bg-blue-600'
                            }`}
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* 操作 (派工, 报工, 详情, 编辑，固定在最右侧) */}
                    <td className={`py-2.5 px-3 text-center sticky right-0 ${
                      isSelected ? 'bg-blue-50' : idx % 2 === 1 ? 'bg-[#fcfdfd] group-hover:bg-blue-50/40' : 'bg-white group-hover:bg-blue-50/40'
                    } border-l border-slate-300 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.08)] z-10`}>
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => onAssign(order)}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                          派工
                        </button>
                        <button
                          type="button"
                          onClick={() => onReportWork(order)}
                          className="text-emerald-600 hover:text-emerald-800 hover:underline font-medium"
                        >
                          报工
                        </button>
                        <button
                          type="button"
                          onClick={() => onViewDetail(order)}
                          className="text-slate-600 hover:text-slate-900 hover:underline font-medium"
                        >
                          详情
                        </button>
                        <button
                          type="button"
                          onClick={() => onEdit(order)}
                          className="text-slate-600 hover:text-slate-900 hover:underline font-medium"
                        >
                          编辑
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={14} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <span>暂无符合条件的工单记录</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="shrink-0 py-1.5 px-3.5 border-t border-slate-200 bg-slate-50/60 rounded-b-xl flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>共 <strong className="text-slate-800">{totalCount}</strong> 条生产工单</span>
          {selectedIds.length > 0 && (
            <span className="text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 text-[11px]">
              已选 {selectedIds.length} 项工单
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <span className="font-semibold text-slate-800 px-1.5">第 {currentPage} / {totalPages} 页</span>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
