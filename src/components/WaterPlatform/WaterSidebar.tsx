import React, { useState } from 'react';
import {
  LayoutDashboard,
  Map,
  Layers,
  CalendarCheck,
  Calculator,
  Database,
  Gauge,
  SlidersHorizontal,
  ShieldCheck,
  Settings,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Boxes,
  Link2,
  AlertOctagon,
  FileCheck2,
  ToggleLeft,
  RefreshCw,
  HeartPulse,
  Grid
} from 'lucide-react';

interface WaterSidebarProps {
  activeSubMenu: string;
  onSubMenuChange: (menuKey: string) => void;
  onNotify: (title: string, message?: string, type?: 'info' | 'success') => void;
}

export const WaterSidebar: React.FC<WaterSidebarProps> = ({
  activeSubMenu,
  onSubMenuChange,
  onNotify,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    metering: true, // 计量监管 expanded by default
    plan: false,
    waterCalc: false,
    dataCollect: false,
    dataStandard: false,
    qualityControl: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMenuClick = (key: string, name: string) => {
    onSubMenuChange(key);
    if (key !== 'facility_management') {
      onNotify(`已切换至【${name}】`, '当前模块演示数据已加载', 'info');
    }
  };

  return (
    <aside className="w-56 h-full min-h-full flex-shrink-0 bg-[#006be6] text-white flex flex-col select-none border-r border-blue-600/50 shadow-md">
      {/* Scrollable menu items */}
      <div className="flex-1 overflow-y-auto min-h-0 py-2.5 px-2 space-y-1 text-[13px] font-medium custom-scrollbar">
        
        {/* 首页 */}
        <button
          type="button"
          onClick={() => handleMenuClick('home', '首页')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
            activeSubMenu === 'home'
              ? 'bg-white/20 text-white font-semibold shadow-inner'
              : 'text-blue-100 hover:bg-white/10 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 opacity-80" />
          <span>首页</span>
        </button>

        {/* 一张图 */}
        <button
          type="button"
          onClick={() => handleMenuClick('map_view', '一张图')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
            activeSubMenu === 'map_view'
              ? 'bg-white/20 text-white font-semibold shadow-inner'
              : 'text-blue-100 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Map className="w-4 h-4 opacity-80" />
          <span>一张图</span>
        </button>

        {/* 综合应用场景 */}
        <button
          type="button"
          onClick={() => handleMenuClick('scenarios', '综合应用场景')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
            activeSubMenu === 'scenarios'
              ? 'bg-white/20 text-white font-semibold shadow-inner'
              : 'text-blue-100 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 opacity-80" />
          <span>综合应用场景</span>
        </button>

        {/* 计划用水管理 */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('plan')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
          >
            <div className="flex items-center gap-2.5">
              <CalendarCheck className="w-4 h-4 opacity-80" />
              <span>计划用水管理</span>
            </div>
            {expandedSections.plan ? (
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            )}
          </button>
        </div>

        {/* 取用水量核算 */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('waterCalc')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
          >
            <div className="flex items-center gap-2.5">
              <Calculator className="w-4 h-4 opacity-80" />
              <span>取用水量核算</span>
            </div>
            {expandedSections.waterCalc ? (
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            )}
          </button>
        </div>

        {/* 数据归集 */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('dataCollect')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 opacity-80" />
              <span>数据归集</span>
            </div>
            {expandedSections.dataCollect ? (
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            )}
          </button>
        </div>

        {/* 计量监管 (Active Expanded Group from Image 1) */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => toggleSection('metering')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-blue-800/60 text-white font-semibold border border-blue-400/30"
          >
            <div className="flex items-center gap-2.5">
              <Gauge className="w-4 h-4 text-cyan-200" />
              <span>计量监管</span>
            </div>
            {expandedSections.metering ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {expandedSections.metering && (
            <div className="pl-2 mt-1 space-y-0.5 ml-2 py-1">
              <button
                type="button"
                onClick={() => handleMenuClick('audit', '计量审核管理')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition flex items-center gap-2 ${
                  activeSubMenu === 'audit'
                    ? 'bg-white text-blue-900 font-semibold shadow-sm'
                    : 'text-blue-100 hover:bg-white/15 hover:text-white'
                }`}
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                <span>计量审核管理</span>
              </button>

              <button
                type="button"
                onClick={() => handleMenuClick('facility_management', '计量设施管理')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition flex items-center gap-2 ${
                  activeSubMenu === 'facility_management'
                    ? 'bg-white text-blue-800 font-bold shadow-md ring-1 ring-blue-200'
                    : 'text-blue-100 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Boxes className="w-3.5 h-3.5 text-blue-600" />
                <span>计量设施管理</span>
              </button>

              <button
                type="button"
                onClick={() => handleMenuClick('relation', '关联关系维护')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition flex items-center gap-2 ${
                  activeSubMenu === 'relation'
                    ? 'bg-white text-blue-900 font-semibold'
                    : 'text-blue-100 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>关联关系维护</span>
              </button>

              <button
                type="button"
                onClick={() => handleMenuClick('fault', '故障记录')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition flex items-center gap-2 ${
                  activeSubMenu === 'fault'
                    ? 'bg-white text-blue-800 font-bold shadow-md ring-1 ring-blue-200'
                    : 'text-blue-100 hover:bg-white/15 hover:text-white'
                }`}
              >
                <AlertOctagon className={`w-3.5 h-3.5 ${activeSubMenu === 'fault' ? 'text-blue-600' : ''}`} />
                <span>故障记录</span>
              </button>

              <button
                type="button"
                onClick={() => handleMenuClick('calibration', '检定记录')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition flex items-center gap-2 ${
                  activeSubMenu === 'calibration'
                    ? 'bg-white text-blue-900 font-semibold'
                    : 'text-blue-100 hover:bg-white/15 hover:text-white'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>检定记录</span>
              </button>

              <button
                type="button"
                onClick={() => handleMenuClick('toggle_logs', '停用启用记录')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition flex items-center gap-2 ${
                  activeSubMenu === 'toggle_logs'
                    ? 'bg-white text-blue-900 font-semibold'
                    : 'text-blue-100 hover:bg-white/15 hover:text-white'
                }`}
              >
                <ToggleLeft className="w-3.5 h-3.5" />
                <span>停用启用记录</span>
              </button>

              <button
                type="button"
                onClick={() => handleMenuClick('replace_logs', '换表记录')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition flex items-center gap-2 ${
                  activeSubMenu === 'replace_logs'
                    ? 'bg-white text-blue-900 font-semibold'
                    : 'text-blue-100 hover:bg-white/15 hover:text-white'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>换表记录</span>
              </button>

              <button
                type="button"
                onClick={() => handleMenuClick('health', '计量健康状态管理')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition flex items-center gap-2 ${
                  activeSubMenu === 'health'
                    ? 'bg-white text-blue-900 font-semibold'
                    : 'text-blue-100 hover:bg-white/15 hover:text-white'
                }`}
              >
                <HeartPulse className="w-3.5 h-3.5" />
                <span>计量健康状态管理</span>
              </button>

              <button
                type="button"
                onClick={() => handleMenuClick('grid', '计量网格化管理')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition flex items-center gap-2 ${
                  activeSubMenu === 'grid'
                    ? 'bg-white text-blue-900 font-semibold'
                    : 'text-blue-100 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>计量网格化管理</span>
              </button>
            </div>
          )}
        </div>

        {/* 数据规范整合 */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('dataStandard')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
          >
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4 opacity-80" />
              <span>数据规范整合</span>
            </div>
            {expandedSections.dataStandard ? (
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            )}
          </button>
        </div>

        {/* 数据质量控制 */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('qualityControl')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 opacity-80" />
              <span>数据质量控制</span>
            </div>
            {expandedSections.qualityControl ? (
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            )}
          </button>
        </div>

        {/* 系统配置 */}
        <button
          type="button"
          onClick={() => handleMenuClick('system_config', '系统配置')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
            activeSubMenu === 'system_config'
              ? 'bg-white/20 text-white font-semibold'
              : 'text-blue-100 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4 opacity-80" />
          <span>系统配置</span>
        </button>

      </div>

      {/* Footer copyright */}
      <div className="p-3 border-t border-blue-500/40 text-[11px] text-blue-200 text-center">
        <span>青海省西宁市水务局 © 2026</span>
      </div>
    </aside>
  );
};
