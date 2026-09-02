import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  User, 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  ArrowRight, 
  Building2,
  CheckCircle2,
  Waves
} from 'lucide-react';
import { PlatformType } from '../../types';

interface AdminLoginPageProps {
  onLoginSuccess: (userRole: string, platform: PlatformType) => void;
  defaultPlatform?: PlatformType;
  isModal?: boolean;
  onClose?: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  defaultPlatform = 'water',
  isModal = false,
  onClose,
}) => {
  // Login Role: 管理端 (水务局监管) | 取水户端 (企业自主填报)
  const [userType, setUserType] = useState<'admin' | 'enterprise'>('admin');
  
  // Form Fields
  const [username, setUsername] = useState('admin_xining');
  const [password, setPassword] = useState('123456');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Generate random captcha string
  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput(code); // Pre-fill for convenience
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleRoleTabChange = (type: 'admin' | 'enterprise') => {
    setUserType(type);
    setErrorMessage('');
    if (type === 'admin') {
      setUsername('admin_xining');
    } else {
      setUsername('enterprise_001');
    }
    generateCaptcha();
  };

  // Submit Login
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage(userType === 'admin' ? '请输入管理账号/工号' : '请输入企业统一社会信用代码/账号');
      return;
    }
    if (!password) {
      setErrorMessage('请输入登录密码');
      return;
    }
    if (captchaInput.toUpperCase() !== captchaCode.toUpperCase()) {
      setErrorMessage('验证码错误，请重新输入');
      generateCaptcha();
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const roleTitle = userType === 'admin' ? '水务监管管理员' : '青海盐湖工业(取水户)';
      onLoginSuccess(roleTitle, 'water');
    }, 400);
  };

  const loginCard = (
    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
      {/* Brand Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 pt-7 pb-6 text-white text-center relative">
        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 mx-auto flex items-center justify-center mb-3 shadow-inner">
          <Droplets className="w-6 h-6 text-cyan-200" />
        </div>
        <h2 className="text-lg font-bold tracking-wide">
          西宁市水资源取用水与计量监管系统
        </h2>
        <p className="text-xs text-blue-100/80 mt-1 font-mono">
          Water Resources & Metering Management Platform
        </p>

        {/* Identity Tab (管理端 / 取水户端) */}
        <div className="mt-5 grid grid-cols-2 gap-1 bg-blue-900/40 p-1 rounded-xl border border-blue-400/30 text-xs">
          <button
            type="button"
            onClick={() => handleRoleTabChange('admin')}
            className={`py-1.5 rounded-lg font-semibold transition ${
              userType === 'admin'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-blue-100 hover:text-white hover:bg-white/10'
            }`}
          >
            水务局管理端
          </button>
          <button
            type="button"
            onClick={() => handleRoleTabChange('enterprise')}
            className={`py-1.5 rounded-lg font-semibold transition ${
              userType === 'enterprise'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-blue-100 hover:text-white hover:bg-white/10'
            }`}
          >
            取水企业端
          </button>
        </div>
      </div>

      {/* Form Area */}
      <div className="p-6">
        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {userType === 'admin' ? '管理账号 / 工号' : '取水户账号 / 信用代码'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={userType === 'admin' ? '请输入管理员账号' : '请输入统一社会信用代码'}
                className="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 focus:bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                登录密码
              </label>
              <button
                type="button"
                onClick={() => alert('请联系西宁市水资源信息中心管理员重置密码')}
                className="text-[11px] text-blue-600 hover:underline"
              >
                忘记密码?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full h-10 pl-9 pr-9 text-xs bg-slate-50 focus:bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-slate-400 hover:text-slate-600 absolute right-2.5 top-2.5 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Captcha */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              图形验证码
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  maxLength={4}
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="验证码"
                  className="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 focus:bg-white text-slate-900 uppercase font-mono tracking-widest rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
                />
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>

              <div 
                onClick={generateCaptcha}
                title="点击刷新验证码"
                className="h-10 px-3.5 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer hover:bg-blue-100 transition select-none"
              >
                <span className="font-mono text-sm font-bold tracking-widest text-blue-700">
                  {captchaCode}
                </span>
                <RefreshCw className="w-3 h-3 text-blue-500 hover:rotate-180 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>记住密码</span>
            </label>
            <span className="text-[11px] text-slate-400">青海省水务统一认证</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 mt-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>正在验证登录...</span>
              </>
            ) : (
              <>
                <span>登 录 系 统</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick 1-Click Login for Demo */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>快捷体验：</span>
          <button
            type="button"
            onClick={() => onLoginSuccess('水务局超级管理员', 'water')}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer"
          >
            一键以管理员身份进入 →
          </button>
        </div>
      </div>
    </div>
  );

  // If used as modal
  if (isModal) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
        onClick={onClose}
      >
        <div onClick={(e) => e.stopPropagation()}>
          {loginCard}
        </div>
      </div>
    );
  }

  // Full screen page view
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-slate-100 relative overflow-hidden select-none font-sans text-slate-800">
      {/* Subtle Background Water Ambient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-blue-50 via-slate-100 to-slate-200" />
      
      {/* Top Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow">
            <Droplets className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-800 tracking-wide">
            西宁市水资源取用水与计量监管系统
          </span>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>政务网络安全认证</span>
        </div>
      </header>

      {/* Center Box */}
      <main className="relative z-10 w-full flex-1 flex items-center justify-center p-4">
        {loginCard}
      </main>

      {/* Simple Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-3 text-center text-xs text-slate-500">
        <span>西宁市水务局 · 水资源节约与保护中心 版权所有</span>
      </footer>
    </div>
  );
};
