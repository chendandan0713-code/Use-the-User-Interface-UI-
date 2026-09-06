import React, { useState } from 'react';
import { 
  Droplets, 
  Factory, 
  Search, 
  Bell, 
  Home, 
  User, 
  ChevronDown, 
  Settings, 
  LogOut, 
  Check, 
  ArrowRightLeft,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { PlatformType, SubTabType } from '../types';

interface NavbarProps {
  currentPlatform: PlatformType;
  onPlatformChange: (platform: PlatformType) => void;
  subTab: SubTabType;
  onSubTabChange: (tab: SubTabType) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onNotify: (title: string, message?: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  onLogout?: () => void;
  currentUser?: string;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPlatform,
  onPlatformChange,
  subTab,
  onSubTabChange,
  searchTerm,
  onSearchChange,
  onNotify,
  onLogout,
  currentUser = '管理员(88018)',
  onGoHome,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-lg border-b border-blue-500/30">
      <div className="w-full px-4 sm:px-6 flex items-center justify-between h-14">
        
        {/* Left: Brand / System Title & Platform Switcher */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20">
              {currentPlatform === 'water' ? (
                <Droplets className="w-5 h-5 text-cyan-200 animate-pulse" />
              ) : (
                <Factory className="w-5 h-5 text-amber-200 animate-pulse" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-wide text-white drop-shadow-sm">
                  {currentPlatform === 'water' ? '西宁市取用水管理平台' : '智能制造执行系统 (MES)'}
                </span>
                <span className="text-[10px] uppercase font-semibold bg-white/20 px-1.5 py-0.5 rounded text-cyan-100 border border-white/25">
                  v2.6 Pro
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            title="返回系统首页"
            onClick={() => {
              if (onGoHome) {
                onGoHome();
              }
              onNotify('已返回首页看板', '青海省取水许可审批监管全景数据已更新', 'info');
            }}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all text-white/90 hover:text-white cursor-pointer"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Portal Sub-Tabs (第三方登录 / 取水户端 / 管理端) */}
        {currentPlatform === 'water' && (
          <div className="hidden lg:flex items-center space-x-1 bg-blue-800/40 p-1 rounded-lg border border-blue-400/30">
            <button
              type="button"
              onClick={() => onSubTabChange('third_party')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                subTab === 'third_party'
                  ? 'bg-white text-blue-900 shadow-sm font-semibold'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              第三方登录
            </button>
            <button
              type="button"
              onClick={() => onSubTabChange('user_client')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                subTab === 'user_client'
                  ? 'bg-white text-blue-900 shadow-sm font-semibold'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              取水户端
            </button>
            <button
              type="button"
              onClick={() => onSubTabChange('admin_client')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                subTab === 'admin_client'
                  ? 'bg-white text-blue-900 shadow-sm font-semibold'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              管理端
            </button>
          </div>
        )}

        {/* Right Section: Search, Help, Notifications, User Profile */}
        <div className="flex items-center space-x-3">
          
          {/* Menu Search Box */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="菜单搜索 (快捷键 Ctrl+K)..."
              className="w-48 md:w-60 h-8 pl-8 pr-3 text-xs bg-white/15 hover:bg-white/20 focus:bg-white text-white focus:text-slate-800 placeholder-white/70 focus:placeholder-slate-400 rounded-lg border border-white/20 focus:border-white focus:outline-none transition-all duration-150"
            />
            <Search className="w-3.5 h-3.5 text-white/70 absolute left-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Quick Platform Switch Button (Mobile) */}
          <button
            type="button"
            onClick={() => onPlatformChange(currentPlatform === 'water' ? 'mes' : 'water')}
            className="md:hidden p-1.5 rounded-lg bg-white/15 text-white"
            title="切换另一张表"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {/* Notification Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
              title="系统通知"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-blue-700 animate-pulse">
                3
              </span>
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 py-2 z-50 text-xs">
                <div className="px-3 py-1.5 font-semibold text-slate-900 border-b border-slate-100 flex items-center justify-between">
                  <span>系统待办与预警</span>
                  <span className="text-[10px] text-blue-600 cursor-pointer hover:underline" onClick={() => setShowNotifMenu(false)}>全部已读</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                  <div className="p-2.5 hover:bg-slate-50 transition cursor-pointer">
                    <div className="flex items-center gap-1 text-amber-600 font-medium">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>设施检定预警</span>
                    </div>
                    <p className="text-slate-500 mt-1">日村供水站 (632524JL00186) 检定即将到期</p>
                    <span className="text-[10px] text-slate-400">10分钟前</span>
                  </div>
                  <div className="p-2.5 hover:bg-slate-50 transition cursor-pointer">
                    <div className="flex items-center gap-1 text-rose-600 font-medium">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span>工单缺料预警</span>
                    </div>
                    <p className="text-slate-500 mt-1">工单 WO20260901-006 0402贴片阻容缺料</p>
                    <span className="text-[10px] text-slate-400">30分钟前</span>
                  </div>
                  <div className="p-2.5 hover:bg-slate-50 transition cursor-pointer">
                    <div className="flex items-center gap-1 text-emerald-600 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>水利部数据同步成功</span>
                    </div>
                    <p className="text-slate-500 mt-1">西宁市210个计量点档案核对完成</p>
                    <span className="text-[10px] text-slate-400">2小时前</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 pl-1.5 pr-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all border border-white/20"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-300 to-blue-200 text-blue-900 font-bold flex items-center justify-center text-xs shadow">
                {currentUser.charAt(0) || '管'}
              </div>
              <span className="text-xs font-medium text-white hidden sm:inline">{currentUser}</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/80" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 py-1.5 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-900">{currentUser}</p>
                  <p className="text-[10px] text-slate-500">西宁市水务局 & 智能MES调度中心</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onNotify('系统设置已打开', '当前环境运行平稳', 'info');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>个人与权限配置</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onNotify('帮助文档', '支持按发证机关与工单编号双向溯源', 'info');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>操作手册与帮助</span>
                </button>
                <div className="border-t border-slate-100 mt-1"></div>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onLogout) {
                      onLogout();
                    } else {
                      onNotify('已安全退出管理系统', '会话状态已妥善归档', 'warning');
                    }
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-rose-50 flex items-center gap-2 text-rose-600"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>退出登录 / 返回登录页</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
