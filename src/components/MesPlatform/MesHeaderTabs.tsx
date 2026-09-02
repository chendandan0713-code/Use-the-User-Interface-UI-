import React from 'react';
import { MesTabType } from '../../types';
import { 
  Home, 
  FileSpreadsheet, 
  Layers, 
  CheckSquare, 
  ClipboardList, 
  Share2, 
  ExternalLink 
} from 'lucide-react';

interface MesHeaderTabsProps {
  activeTab: MesTabType;
  onTabChange: (tab: MesTabType) => void;
  onNotify: (title: string, message?: string, type?: 'info') => void;
}

export const MesHeaderTabs: React.FC<MesHeaderTabsProps> = ({
  activeTab,
  onTabChange,
  onNotify,
}) => {
  const tabs: { key: MesTabType; name: string; icon: React.ReactNode; badge?: string }[] = [
    { key: 'home', name: '首页', icon: <Home className="w-3.5 h-3.5" /> },
    { key: 'order_info', name: '工单信息', icon: <FileSpreadsheet className="w-3.5 h-3.5" /> },
    { key: 'production_order', name: '生产工单', icon: <Layers className="w-3.5 h-3.5" />, badge: '6' },
    { key: 'production_task', name: '生产任务', icon: <CheckSquare className="w-3.5 h-3.5" /> },
    { key: 'work_record', name: '报工记录', icon: <ClipboardList className="w-3.5 h-3.5" /> },
    { key: 'outsource_order', name: '委外工单', icon: <Share2 className="w-3.5 h-3.5" />, badge: '1' },
    { key: 'outsource_task', name: '委外任务', icon: <ExternalLink className="w-3.5 h-3.5" /> },
  ];

  const handleTabClick = (key: MesTabType, name: string) => {
    onTabChange(key);
    if (key !== 'production_order') {
      onNotify(`已切换至【${name}】`, '制造执行系统视图已加载', 'info');
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 px-4 flex items-center gap-1 overflow-x-auto select-none custom-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleTabClick(tab.key, tab.name)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              isActive
                ? 'border-blue-600 text-blue-700 font-bold bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            <span>{tab.name}</span>
            {tab.badge && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
