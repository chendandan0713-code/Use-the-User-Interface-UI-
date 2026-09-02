import React from 'react';
import { Menu, ChevronLeft, ChevronRight, Boxes, Factory, Home, X, AlertOctagon } from 'lucide-react';

interface WaterBreadcrumbBarProps {
  activeMenu: string;
  selectedDistrict: string;
  totalFacilitiesCount: number;
  onSwitchPlatform: () => void;
  onSelectMenu?: (menuKey: string) => void;
  onResetDistrict?: () => void;
}

export const WaterBreadcrumbBar: React.FC<WaterBreadcrumbBarProps> = ({
  activeMenu,
  selectedDistrict,
  totalFacilitiesCount,
  onSwitchPlatform,
  onSelectMenu,
}) => {
  const getMenuLabel = (key: string) => {
    switch (key) {
      case 'fault':
        return '故障记录';
      case 'facility_management':
        return '计量设施管理';
      case 'audit':
        return '计量审核管理';
      case 'relation':
        return '关联关系维护';
      case 'calibration':
        return '检定记录';
      case 'toggle_logs':
        return '停用启用记录';
      case 'home':
        return '首页';
      case 'map_view':
        return '一张图';
      case 'scenarios':
        return '综合应用场景';
      default:
        return key || '计量监管';
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 h-10 px-3 flex items-center justify-between select-none shadow-xs z-10 flex-shrink-0">
      {/* Left Area: Collapse Icon, Navigation Arrows & Multi-Tab Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        {/* Toggle Sidebar Menu Icon (≡) */}
        <button
          type="button"
          title="收起/展开菜单"
          className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition flex items-center justify-center cursor-pointer"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Back / Forward Arrow Controls */}
        <div className="flex items-center gap-0.5 text-slate-400 mr-1">
          <button
            type="button"
            title="后退"
            onClick={() => onSelectMenu && onSelectMenu('facility_management')}
            className="p-1 hover:bg-slate-100 hover:text-slate-700 rounded transition cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="前进"
            onClick={() => onSelectMenu && onSelectMenu('fault')}
            className="p-1 hover:bg-slate-100 hover:text-slate-700 rounded transition cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Separator */}
        <div className="h-4 w-px bg-slate-200 mr-1" />

        {/* Home Tab */}
        <div 
          onClick={() => onSelectMenu && onSelectMenu('home')}
          className="flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded cursor-pointer transition font-medium"
        >
          <Home className="w-3.5 h-3.5 text-slate-400" />
          <span>首页</span>
        </div>

        {/* Active Page Tab */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 font-semibold rounded-md border border-blue-200/70 shadow-xs">
          {activeMenu === 'fault' ? (
            <AlertOctagon className="w-3.5 h-3.5 text-blue-600" />
          ) : (
            <Boxes className="w-3.5 h-3.5 text-blue-600" />
          )}
          <span>{getMenuLabel(activeMenu)}</span>
          {activeMenu !== 'facility_management' && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectMenu) onSelectMenu('facility_management');
              }}
              className="p-0.5 hover:bg-blue-200/50 rounded-full text-blue-400 hover:text-blue-700 transition ml-0.5 cursor-pointer"
              title="关闭并返回计量设施管理"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Current Scope Badge */}
        <div className="hidden md:flex items-center gap-1.5 ml-2 text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>当前辖区: <strong className="text-slate-700">{selectedDistrict}</strong> ({totalFacilitiesCount} 条{activeMenu === 'fault' ? '故障记录' : '设施点位'})</span>
        </div>
      </div>

      {/* Right Area: Fast Switch & Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSwitchPlatform}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 hover:bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-200/80 shadow-2xs hover:shadow-xs transition"
          title="切换至生产工单协同系统"
        >
          <Factory className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline">切换生产工单系统 →</span>
        </button>
      </div>
    </div>
  );
};
