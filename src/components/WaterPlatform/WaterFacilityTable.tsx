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
  AlertCircle,
  Columns3
} from 'lucide-react';
import { WaterFacility } from '../../types';
import { CustomSelect } from '../Common/CustomSelect';
import { ColumnSettingPopover, ColumnItem } from '../Common/ColumnSettingPopover';

export const ALL_WATER_FACILITY_COLUMNS: ColumnItem[] = [
  { key: 'name', label: '设施名称', required: true, defaultVisible: true },
  { key: 'code', label: '计量设施(器具)编号', defaultVisible: true },
  { key: 'waterOwner', label: '取水权人名称', defaultVisible: false },
  { key: 'permitNumber', label: '取水许可证编号', defaultVisible: false },
  { key: 'status', label: '使用状态', defaultVisible: true },
  { key: 'reportMethod', label: '上报方式', defaultVisible: true },
  { key: 'transmissionMethod', label: '数据传输方式', defaultVisible: true },
  { key: 'waterSourceType', label: '水源类型', defaultVisible: true },
  { key: 'fundingSource', label: '建设来源', defaultVisible: true },
  { key: 'fundingYear', label: '资金年份', defaultVisible: true },
  { key: 'specModel', label: '规格型号', defaultVisible: true },
  { key: 'facilityType', label: '计量设施类型', defaultVisible: true },
  { key: 'waterUsage', label: '取水用途', defaultVisible: false },
  { key: 'district', label: '所属行政区划', defaultVisible: false },
  { key: 'isArchived', label: '档案是否完善', defaultVisible: true },
  { key: 'lastReportTime', label: '最新到报时间', defaultVisible: true },
  { key: 'lastCalibrationTime', label: '最新检定校准时间', defaultVisible: true },
  { key: 'calibrationExpiryDate', label: '检定校准有效期限', defaultVisible: true },
  { key: 'isReportedToNational', label: '是否上报部平台', defaultVisible: true },
];

export const DEFAULT_WATER_VISIBLE_KEYS: string[] = ALL_WATER_FACILITY_COLUMNS
  .filter((c) => c.defaultVisible !== false)
  .map((c) => c.key);

interface WaterFacilityTableProps {
  facilities: WaterFacility[];
  selectedIds: string[];
  visibleKeys?: string[];
  onVisibleKeysChange?: (keys: string[]) => void;
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
  visibleKeys: externalVisibleKeys,
  onVisibleKeysChange,
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
  const [internalVisibleKeys, setInternalVisibleKeys] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('col_settings_water_facility_table');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_WATER_VISIBLE_KEYS;
  });

  const visibleKeys = externalVisibleKeys || internalVisibleKeys;
  const setVisibleKeys = (keys: string[]) => {
    setInternalVisibleKeys(keys);
    if (onVisibleKeysChange) onVisibleKeysChange(keys);
  };

  const isColVisible = (key: string) => visibleKeys.includes(key);

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

  // Calculate dynamic colSpan for empty row
  const activeColSpan = 1 + visibleKeys.length + 1; // 序号 + visible fields + 操作

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-xs flex flex-col relative h-full min-h-0 flex-1 overflow-hidden">
      
      {/* Table Container with Horizontal and Vertical Scrolling */}
      <div className="overflow-auto flex-1 min-h-0 custom-scrollbar border-b border-slate-300">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#ebf3fb] text-slate-800 border-b border-slate-300 font-semibold sticky top-0 z-10 select-none">
              <th className="py-3 px-2 w-16 min-w-[64px] text-center border-r border-slate-300">
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

              {isColVisible('name') && (
                <th className="py-3 px-3 min-w-[170px] whitespace-nowrap border-r border-slate-300">设施名称</th>
              )}

              {isColVisible('code') && (
                <th className="py-3 px-3 min-w-[150px] whitespace-nowrap border-r border-slate-300">计量设施(器具)编号</th>
              )}

              {isColVisible('waterOwner') && (
                <th className="py-3 px-3 min-w-[160px] whitespace-nowrap border-r border-slate-300">取水权人名称</th>
              )}

              {isColVisible('permitNumber') && (
                <th className="py-3 px-3 min-w-[150px] whitespace-nowrap border-r border-slate-300">许可证编号</th>
              )}

              {isColVisible('status') && (
                <th className="py-3 px-3 min-w-[80px] whitespace-nowrap text-center border-r border-slate-300">使用状态</th>
              )}

              {isColVisible('reportMethod') && (
                <th className="py-3 px-3 min-w-[80px] whitespace-nowrap text-center border-r border-slate-300">上报方式</th>
              )}

              {isColVisible('transmissionMethod') && (
                <th className="py-3 px-3 min-w-[95px] whitespace-nowrap text-center border-r border-slate-300">数据传输方式</th>
              )}

              {isColVisible('waterSourceType') && (
                <th className="py-3 px-3 min-w-[80px] whitespace-nowrap text-center border-r border-slate-300">水源类型</th>
              )}

              {isColVisible('fundingSource') && (
                <th className="py-3 px-3 min-w-[100px] whitespace-nowrap text-center border-r border-slate-300">建设来源</th>
              )}

              {isColVisible('fundingYear') && (
                <th className="py-3 px-3 min-w-[70px] whitespace-nowrap text-center border-r border-slate-300">资金年份</th>
              )}

              {isColVisible('specModel') && (
                <th className="py-3 px-3 min-w-[90px] whitespace-nowrap text-center border-r border-slate-300">规格型号</th>
              )}

              {isColVisible('facilityType') && (
                <th className="py-3 px-3 min-w-[95px] whitespace-nowrap text-center border-r border-slate-300">计量设施类型</th>
              )}

              {isColVisible('waterUsage') && (
                <th className="py-3 px-3 min-w-[90px] whitespace-nowrap text-center border-r border-slate-300">取水用途</th>
              )}

              {isColVisible('district') && (
                <th className="py-3 px-3 min-w-[90px] whitespace-nowrap text-center border-r border-slate-300">所属行政区划</th>
              )}

              {isColVisible('isArchived') && (
                <th className="py-3 px-3 min-w-[90px] whitespace-nowrap text-center border-r border-slate-300">档案是否完善</th>
              )}

              {isColVisible('lastReportTime') && (
                <th className="py-3 px-3 min-w-[105px] whitespace-nowrap text-center border-r border-slate-300">最新到报时间</th>
              )}

              {isColVisible('lastCalibrationTime') && (
                <th className="py-3 px-3 min-w-[105px] whitespace-nowrap text-center border-r border-slate-300">最新检定校准时间</th>
              )}

              {isColVisible('calibrationExpiryDate') && (
                <th className="py-3 px-3 min-w-[110px] whitespace-nowrap text-center border-r border-slate-300">检定校准有效期限</th>
              )}

              {isColVisible('isReportedToNational') && (
                <th className="py-3 px-3 min-w-[100px] whitespace-nowrap text-center border-r border-slate-300">是否上报部平台</th>
              )}

              {/* Sticky Right Operation Column with Column Setting button */}
              <th className="py-3 px-4 min-w-[170px] text-center sticky right-0 bg-[#ebf3fb] border-l border-slate-300 shadow-[-6px_0_10px_-2px_rgba(0,0,0,0.1)] z-30">
                <div className="flex items-center justify-center gap-1.5">
                  <span>操作</span>
                  <ColumnSettingPopover
                    columns={ALL_WATER_FACILITY_COLUMNS}
                    visibleKeys={visibleKeys}
                    onChange={setVisibleKeys}
                    storageKey="water_facility_table"
                    buttonText=""
                    className="inline-block"
                  />
                </div>
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
                const isNearBottom = index >= Math.max(0, facilities.length - 3) && facilities.length > 3;

                return (
                  <tr
                    key={facility.id}
                    className={`transition-colors hover:bg-blue-50/40 ${
                      isSelected ? 'bg-blue-50/70' : index % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'
                    } ${isMoreOpen ? 'relative z-50' : 'relative'}`}
                  >
                    {/* Select Checkbox & 序号 */}
                    <td className="py-2.5 px-2 text-center border-r border-slate-200 select-none whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelect(facility.id)}
                          className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                        />
                        <span className="text-slate-500 font-mono text-xs w-6 text-center">
                          {(currentPage - 1) * pageSize + index + 1}
                        </span>
                      </div>
                    </td>

                    {/* 设施名称 */}
                    {isColVisible('name') && (
                      <td className="py-2.5 px-3 border-r border-slate-200 max-w-[200px]">
                        <div className="relative group max-w-full">
                          <span
                            className="font-medium text-slate-900 hover:text-blue-600 cursor-pointer block truncate"
                            onClick={() => onViewDetail(facility)}
                            title={facility.name}
                          >
                            {facility.name}
                          </span>

                          {/* 鼠标悬停小黑弹窗 Tooltip */}
                          <div
                            className={`absolute left-0 ${
                              index === 0 ? 'top-full mt-1.5' : 'bottom-full mb-1.5'
                            } hidden group-hover:block z-50 pointer-events-none drop-shadow-md`}
                          >
                            <div className="relative bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-xl border border-slate-700/60 font-normal">
                              {facility.name}
                              {index === 0 ? (
                                <div className="absolute bottom-full left-3 -mb-1 border-4 border-transparent border-b-slate-900" />
                              ) : (
                                <div className="absolute top-full left-3 -mt-1 border-4 border-transparent border-t-slate-900" />
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    )}

                    {/* 计量设施(器具)编号 */}
                    {isColVisible('code') && (
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
                    )}

                    {/* 取水权人名称 */}
                    {isColVisible('waterOwner') && (
                      <td className="py-2.5 px-3 border-r border-slate-200 max-w-[180px] truncate" title={facility.waterOwner}>
                        <span className="text-slate-800">{facility.waterOwner || '-'}</span>
                      </td>
                    )}

                    {/* 许可证编号 */}
                    {isColVisible('permitNumber') && (
                      <td className="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-700 whitespace-nowrap">
                        {facility.permitNumber || '-'}
                      </td>
                    )}

                    {/* 使用状态 */}
                    {isColVisible('status') && (
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
                    )}

                    {/* 上报方式 */}
                    {isColVisible('reportMethod') && (
                      <td className="py-2.5 px-3 text-center border-r border-slate-200">
                        <span className="text-slate-600 font-medium">{facility.reportMethod}</span>
                      </td>
                    )}

                    {/* 数据传输方式 */}
                    {isColVisible('transmissionMethod') && (
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
                    )}

                    {/* 水源类型 */}
                    {isColVisible('waterSourceType') && (
                      <td className="py-2.5 px-3 text-center text-slate-600 border-r border-slate-200">
                        {facility.waterSourceType}
                      </td>
                    )}

                    {/* 建设来源 */}
                    {isColVisible('fundingSource') && (
                      <td className="py-2.5 px-3 text-center border-r border-slate-200">
                        <span className="text-slate-700">{facility.fundingSource}</span>
                      </td>
                    )}

                    {/* 资金年份 */}
                    {isColVisible('fundingYear') && (
                      <td className="py-2.5 px-3 text-center font-mono text-slate-600 border-r border-slate-200">
                        {facility.fundingYear}
                      </td>
                    )}

                    {/* 规格型号 */}
                    {isColVisible('specModel') && (
                      <td className="py-2.5 px-3 text-center font-mono text-slate-500 border-r border-slate-200">
                        {facility.specModel || '-'}
                      </td>
                    )}

                    {/* 计量设施类型 */}
                    {isColVisible('facilityType') && (
                      <td className="py-2.5 px-3 text-center text-slate-700 border-r border-slate-200">
                        {facility.facilityType || '-'}
                      </td>
                    )}

                    {/* 取水用途 */}
                    {isColVisible('waterUsage') && (
                      <td className="py-2.5 px-3 text-center text-slate-700 border-r border-slate-200">
                        {facility.waterUsage || '-'}
                      </td>
                    )}

                    {/* 所属行政区划 */}
                    {isColVisible('district') && (
                      <td className="py-2.5 px-3 text-center text-slate-600 border-r border-slate-200">
                        {facility.district || '-'}
                      </td>
                    )}

                    {/* 档案是否完善 */}
                    {isColVisible('isArchived') && (
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
                    )}

                    {/* 最新到报时间 */}
                    {isColVisible('lastReportTime') && (
                      <td className="py-2.5 px-3 text-center font-mono text-slate-500 border-r border-slate-200">
                        {facility.lastReportTime}
                      </td>
                    )}

                    {/* 最新检定校准时间 */}
                    {isColVisible('lastCalibrationTime') && (
                      <td className="py-2.5 px-3 text-center font-mono text-slate-500 border-r border-slate-200">
                        {facility.lastCalibrationTime}
                      </td>
                    )}

                    {/* 检定校准有效期限 */}
                    {isColVisible('calibrationExpiryDate') && (
                      <td className="py-2.5 px-3 text-center font-mono text-slate-500 border-r border-slate-200">
                        {facility.calibrationExpiryDate}
                      </td>
                    )}

                    {/* 是否上报部平台 */}
                    {isColVisible('isReportedToNational') && (
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
                    )}

                    {/* 操作 (编辑, 详情, 更多 ▾) Sticky Right Column */}
                    <td
                      className={`py-2.5 px-3 min-w-[175px] whitespace-nowrap text-center sticky right-0 border-l border-slate-300 shadow-[-6px_0_10px_-2px_rgba(0,0,0,0.08)] ${
                        isMoreOpen
                          ? 'bg-blue-50/90 z-50'
                          : isSelected
                          ? 'bg-blue-50/90 z-20'
                          : index % 2 === 1
                          ? 'bg-[#f8fafc] group-hover:bg-[#eef4ff] z-20'
                          : 'bg-white group-hover:bg-[#eef4ff] z-20'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2.5 text-xs whitespace-nowrap">
                        {/* 编辑 */}
                        <button
                          type="button"
                          onClick={() => onEdit(facility)}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium px-1 py-0.5 rounded transition cursor-pointer whitespace-nowrap"
                        >
                          编辑
                        </button>

                        {/* 详情 */}
                        <button
                          type="button"
                          onClick={() => onViewDetail(facility)}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium px-1 py-0.5 rounded transition cursor-pointer whitespace-nowrap"
                        >
                          详情
                        </button>

                        {/* 更多 ▾ */}
                        <div className="relative inline-block">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMoreMenuId(isMoreOpen ? null : facility.id);
                            }}
                            className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded font-medium transition cursor-pointer whitespace-nowrap ${
                              isMoreOpen
                                ? 'bg-blue-100 text-blue-800 font-semibold'
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
                              className={`absolute right-0 ${
                                isNearBottom ? 'bottom-full mb-1.5' : 'top-full mt-1'
                              } w-32 bg-white rounded-xl shadow-2xl border border-slate-300 py-1.5 z-[100] text-xs text-left animate-in fade-in zoom-in-95 duration-100`}
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
                <td colSpan={activeColSpan} className="py-12 text-center text-slate-400">
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
      <div className="shrink-0 py-1.5 px-3.5 border-t border-slate-300 bg-slate-50/70 rounded-b-xl flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 select-none">
        
        {/* Left: Total records info */}
        <div className="flex items-center gap-2.5">
          <span>共 <strong className="text-slate-800 font-semibold">{totalCount}</strong> 条</span>
          {selectedIds.length > 0 && (
            <span className="text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 text-[11px]">
              已选 <strong>{selectedIds.length}</strong> 项
            </span>
          )}
        </div>

        {/* Right: Page Navigation Controls */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Previous Page Button */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="w-6 h-6 flex items-center justify-center rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
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
                className={`min-w-6 h-6 px-1.5 flex items-center justify-center rounded text-xs font-medium transition ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                }`}
              >
                {pageNum}
              </button>
            ))}
            <span className="text-slate-400 px-0.5 text-xs">...</span>
            <button
              type="button"
              onClick={() => onPageChange(10)}
              className={`min-w-6 h-6 px-1.5 flex items-center justify-center rounded text-xs font-medium transition ${
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
            className="w-6 h-6 flex items-center justify-center rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Page Size Dropdown */}
          <CustomSelect
            size="xs"
            placement="top"
            className="w-24"
            value={pageSize}
            onChange={(val) => onPageSizeChange(Number(val))}
            options={[
              { value: 10, label: '10 条/页' },
              { value: 20, label: '20 条/页' },
              { value: 50, label: '50 条/页' },
              { value: 100, label: '100 条/页' },
            ]}
          />

          {/* Jump To Page Input */}
          <form onSubmit={handleJumpPage} className="flex items-center gap-1">
            <span>跳到</span>
            <input
              type="text"
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              className="w-9 h-6 text-center bg-white text-slate-800 text-xs rounded border border-slate-300 focus:outline-none focus:border-blue-500"
            />
            <span>页</span>
          </form>
        </div>

      </div>

    </div>
  );
};

