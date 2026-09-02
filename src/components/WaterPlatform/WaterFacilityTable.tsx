import React, { useState, useEffect } from 'react';
import { 
  Edit3, 
  Eye, 
  MoreHorizontal, 
  PowerOff, 
  Power, 
  Trash2, 
  Sliders, 
  History, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { WaterFacility } from '../../types';

interface WaterFacilityTableProps {
  facilities: WaterFacility[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onEdit: (facility: WaterFacility) => void;
  onViewDetail: (facility: WaterFacility) => void;
  onToggleStatus: (facility: WaterFacility, targetStatus?: '正常' | '停用') => void;
  onOpenDisableModal?: (facility: WaterFacility) => void;
  onDelete: (facility: WaterFacility) => void;
  onSetting: (facility: WaterFacility) => void;
  onViewLogs: (facility: WaterFacility) => void;
  onNotify: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const WaterFacilityTable: React.FC<WaterFacilityTableProps> = ({
  facilities,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onViewDetail,
  onToggleStatus,
  onOpenDisableModal,
  onDelete,
  onSetting,
  onViewLogs,
  onNotify,
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
}) => {
  const [activeMoreMenuId, setActiveMoreMenuId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [jumpPageInput, setJumpPageInput] = useState('1');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleDocumentClick = () => {
      setActiveMoreMenuId(null);
    };
    if (activeMoreMenuId) {
      document.addEventListener('click', handleDocumentClick);
    }
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [activeMoreMenuId]);

  const allSelected = facilities.length > 0 && selectedIds.length === facilities.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    onNotify('编号已复制到剪贴板', code, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleJumpPage = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(jumpPageInput, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      onPageChange(p);
    } else {
      onNotify('页码超出范围', `请输入 1 至 ${totalPages} 之间的有效页码`, 'warning');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-xs flex flex-col relative">
      
      {/* Table Container with Horizontal and Vertical Scrolling */}
      <div className="overflow-x-auto min-h-[380px] custom-scrollbar border-b border-slate-300">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-300 font-semibold sticky top-0 z-10 select-none">
              <th className="py-3 px-3 w-10 text-center border-r border-slate-300">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                />
              </th>
              <th className="py-3 px-3 min-w-[170px] whitespace-nowrap border-r border-slate-300">设施名称</th>
              <th className="py-3 px-3 min-w-[150px] whitespace-nowrap border-r border-slate-300">计量设施(器具)编号</th>
              <th className="py-3 px-3 min-w-[80px] whitespace-nowrap text-center border-r border-slate-300">使用状态</th>
              <th className="py-3 px-3 min-w-[80px] whitespace-nowrap text-center border-r border-slate-300">上报方式</th>
              <th className="py-3 px-3 min-w-[95px] whitespace-nowrap text-center border-r border-slate-300">数据传输方式</th>
              <th className="py-3 px-3 min-w-[80px] whitespace-nowrap text-center border-r border-slate-300">水源类型</th>
              <th className="py-3 px-3 min-w-[100px] whitespace-nowrap text-center border-r border-slate-300">建设来源</th>
              <th className="py-3 px-3 min-w-[70px] whitespace-nowrap text-center border-r border-slate-300">资金年份</th>
              <th className="py-3 px-3 min-w-[90px] whitespace-nowrap text-center border-r border-slate-300">规格型号</th>
              <th className="py-3 px-3 min-w-[95px] whitespace-nowrap text-center border-r border-slate-300">计量设施类型</th>
              <th className="py-3 px-3 min-w-[90px] whitespace-nowrap text-center border-r border-slate-300">档案是否完善</th>
              <th className="py-3 px-3 min-w-[105px] whitespace-nowrap text-center border-r border-slate-300">最新到报时间</th>
              <th className="py-3 px-3 min-w-[105px] whitespace-nowrap text-center border-r border-slate-300">最新检定校准时间</th>
              <th className="py-3 px-3 min-w-[110px] whitespace-nowrap text-center border-r border-slate-300">检定校准有效期限</th>
              <th className="py-3 px-3 min-w-[100px] whitespace-nowrap text-center border-r border-slate-300">是否上报部平台</th>
              <th className="py-3 px-4 min-w-[140px] text-center sticky right-0 bg-slate-100/95 border-l border-slate-300 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.08)] z-20">
                操作
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-slate-700">
            {facilities.length > 0 ? (
              facilities.map((facility, index) => {
                const isSelected = selectedIds.includes(facility.id);
                const isNormal = facility.status === '正常';
                const isFault = facility.status === '故障';
                const isDisabled = facility.status === '停用';
                const isMoreOpen = activeMoreMenuId === facility.id;

                return (
                  <tr
                    key={facility.id}
                    className={`transition-colors hover:bg-blue-50/40 ${
                      isSelected ? 'bg-blue-50/70' : index % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'
                    }`}
                  >
                    {/* Select Checkbox */}
                    <td className="py-2.5 px-3 text-center border-r border-slate-200">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(facility.id)}
                        className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                      />
                    </td>

                    {/* 设施名称 */}
                    <td className="py-2.5 px-3 border-r border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-slate-900 hover:text-blue-600 cursor-pointer" onClick={() => onViewDetail(facility)}>
                          {facility.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded border border-slate-200">
                          {facility.district}
                        </span>
                      </div>
                    </td>

                    {/* 计量设施(器具)编号 */}
                    <td className="py-2.5 px-3 border-r border-slate-200">
                      <div className="flex items-center gap-1.5 font-mono text-blue-600 font-medium">
                        <span>{facility.code}</span>
                        <button
                          type="button"
                          title="复制编号"
                          onClick={() => handleCopyCode(facility.code)}
                          className="text-slate-400 hover:text-blue-600 p-0.5 rounded transition"
                        >
                          {copiedCode === facility.code ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* 使用状态 */}
                    <td className="py-2.5 px-3 text-center border-r border-slate-200">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                          isNormal
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isFault
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isNormal ? 'bg-emerald-500 animate-pulse' : isFault ? 'bg-amber-500' : 'bg-slate-400'
                          }`}
                        />
                        {facility.status}
                      </span>
                    </td>

                    {/* 上报方式 */}
                    <td className="py-2.5 px-3 text-center border-r border-slate-200">
                      <span className="text-slate-600 font-medium">{facility.reportMethod}</span>
                    </td>

                    {/* 数据传输方式 */}
                    <td className="py-2.5 px-3 text-center border-r border-slate-200">
                      <span
                        className={`text-[11px] px-1.5 py-0.5 rounded ${
                          facility.transmissionMethod === '在线'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {facility.transmissionMethod}
                      </span>
                    </td>

                    {/* 水源类型 */}
                    <td className="py-2.5 px-3 text-center text-slate-600 border-r border-slate-200">
                      {facility.waterSourceType}
                    </td>

                    {/* 建设来源 */}
                    <td className="py-2.5 px-3 text-center border-r border-slate-200">
                      <span className="text-slate-700">{facility.fundingSource}</span>
                    </td>

                    {/* 资金年份 */}
                    <td className="py-2.5 px-3 text-center font-mono text-slate-600 border-r border-slate-200">
                      {facility.fundingYear}
                    </td>

                    {/* 规格型号 */}
                    <td className="py-2.5 px-3 text-center font-mono text-slate-500 border-r border-slate-200">
                      {facility.specModel || '-'}
                    </td>

                    {/* 计量设施类型 */}
                    <td className="py-2.5 px-3 text-center text-slate-700 border-r border-slate-200">
                      {facility.facilityType || '-'}
                    </td>

                    {/* 档案是否完善 */}
                    <td className="py-2.5 px-3 text-center border-r border-slate-200">
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                          facility.isArchived
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {facility.isArchived ? '是' : '否'}
                      </span>
                    </td>

                    {/* 最新到报时间 */}
                    <td className="py-2.5 px-3 text-center font-mono text-slate-500 border-r border-slate-200">
                      {facility.lastReportTime}
                    </td>

                    {/* 最新检定校准时间 */}
                    <td className="py-2.5 px-3 text-center font-mono text-slate-500 border-r border-slate-200">
                      {facility.lastCalibrationTime}
                    </td>

                    {/* 检定校准有效期限 */}
                    <td className="py-2.5 px-3 text-center font-mono text-slate-500 border-r border-slate-200">
                      {facility.calibrationExpiryDate}
                    </td>

                    {/* 是否上报部平台 */}
                    <td className="py-2.5 px-3 text-center border-r border-slate-200">
                      <span
                        className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${
                          facility.isReportedToNational
                            ? 'text-emerald-700 bg-emerald-50'
                            : 'text-slate-400 bg-slate-50'
                        }`}
                      >
                        {facility.isReportedToNational ? '是' : '否'}
                      </span>
                    </td>

                    {/* 操作 (编辑, 详情, 更多 ▾) Sticky Right Column */}
                    <td className="py-2.5 px-3 text-center sticky right-0 bg-white/95 group-hover:bg-blue-50/40 border-l border-slate-300 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.08)] z-20">
                      <div className="flex items-center justify-center gap-1.5 text-xs">
                        {/* 编辑 */}
                        <button
                          type="button"
                          onClick={() => onEdit(facility)}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium px-1 py-0.5 rounded transition"
                        >
                          编辑
                        </button>

                        {/* 详情 */}
                        <button
                          type="button"
                          onClick={() => onViewDetail(facility)}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium px-1 py-0.5 rounded transition"
                        >
                          详情
                        </button>

                        {/* 更多 ▾ */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMoreMenuId(isMoreOpen ? null : facility.id);
                            }}
                            className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded font-medium transition ${
                              isMoreOpen
                                ? 'bg-blue-100 text-blue-800'
                                : 'text-blue-600 hover:text-blue-800 hover:bg-slate-100'
                            }`}
                          >
                            <span>更多</span>
                            <span className="text-[10px]">▾</span>
                          </button>

                          {/* 更多 Popover Dropdown matching requested actions */}
                          {isMoreOpen && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-full mt-1 w-32 bg-white rounded-xl shadow-xl border border-slate-300 py-1.5 z-50 text-xs text-left animate-in fade-in zoom-in-95 duration-100"
                            >
                              {/* 启用 */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMoreMenuId(null);
                                  onToggleStatus(facility, '正常');
                                }}
                                className={`w-full px-3 py-1.5 hover:bg-emerald-50 flex items-center gap-2 transition ${
                                  facility.status === '正常' ? 'text-emerald-700 font-semibold' : 'text-slate-700'
                                }`}
                              >
                                <Power className="w-3.5 h-3.5 text-emerald-600" />
                                <span>启用</span>
                                {facility.status === '正常' && (
                                  <span className="text-[10px] text-emerald-600 ml-auto">(当前)</span>
                                )}
                              </button>

                              {/* 停用 */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMoreMenuId(null);
                                  if (onOpenDisableModal) {
                                    onOpenDisableModal(facility);
                                  } else {
                                    onToggleStatus(facility, '停用');
                                  }
                                }}
                                className={`w-full px-3 py-1.5 hover:bg-amber-50 flex items-center gap-2 transition ${
                                  facility.status === '停用' ? 'text-amber-700 font-semibold' : 'text-slate-700'
                                }`}
                              >
                                <PowerOff className="w-3.5 h-3.5 text-amber-600" />
                                <span>停用</span>
                                {facility.status === '停用' && (
                                  <span className="text-[10px] text-amber-600 ml-auto">(当前)</span>
                                )}
                              </button>

                              {/* 操作记录 */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMoreMenuId(null);
                                  onViewLogs(facility);
                                }}
                                className="w-full px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 text-slate-700 transition"
                              >
                                <History className="w-3.5 h-3.5 text-blue-600" />
                                <span>操作记录</span>
                              </button>

                              <div className="my-1 border-t border-slate-100" />

                              {/* 删除 */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMoreMenuId(null);
                                  onDelete(facility);
                                }}
                                className="w-full px-3 py-1.5 hover:bg-rose-50 flex items-center gap-2 text-rose-600 transition font-medium"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                <span>删除</span>
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={17} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <span>暂无符合筛选条件的计量设施数据</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar matching Image 1: 共210条 < 1 2 3 4 5 ... 10 > 20条/页 跳到 1 页 */}
      <div className="p-3 border-t border-slate-300 bg-slate-50/70 rounded-b-xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 select-none">
        
        {/* Left: Total records info */}
        <div className="flex items-center gap-3">
          <span>共 <strong className="text-slate-800 font-semibold">{totalCount}</strong> 条</span>
          {selectedIds.length > 0 && (
            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              已选中 <strong>{selectedIds.length}</strong> 项
            </span>
          )}
        </div>

        {/* Right: Page Navigation Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Previous Page Button */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="p-1 rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`min-w-6 h-6 px-1.5 rounded text-xs font-medium transition ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                }`}
              >
                {pageNum}
              </button>
            ))}
            <span className="text-slate-400 px-1">...</span>
            <button
              type="button"
              onClick={() => onPageChange(10)}
              className={`min-w-6 h-6 px-1.5 rounded text-xs font-medium transition ${
                currentPage === 10
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
              }`}
            >
              10
            </button>
          </div>

          {/* Next Page Button */}
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="p-1 rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Page Size Dropdown */}
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-7 px-2 bg-white text-slate-700 text-xs rounded border border-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value={10}>10 条/页</option>
            <option value={20}>20 条/页</option>
            <option value={50}>50 条/页</option>
            <option value={100}>100 条/页</option>
          </select>

          {/* Jump To Page Input */}
          <form onSubmit={handleJumpPage} className="flex items-center gap-1">
            <span>跳到</span>
            <input
              type="text"
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              className="w-10 h-7 text-center bg-white text-slate-800 text-xs rounded border border-slate-300 focus:outline-none focus:border-blue-500"
            />
            <span>页</span>
          </form>
        </div>

      </div>

    </div>
  );
};
