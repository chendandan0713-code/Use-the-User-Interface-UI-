import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronsRight, 
  Check, 
  QrCode, 
  Smartphone, 
  ShieldCheck, 
  RefreshCw,
  PhoneCall,
  Laptop
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
  isModal = false,
  onClose,
}) => {
  // Login Mode: 'account' (账号登录) | 'sms' (短信登录) | 'qrcode' (扫码登录)
  const [loginTab, setLoginTab] = useState<'account' | 'sms'>('account');
  const [isQrMode, setIsQrMode] = useState<boolean>(false);

  // Government User Role Persona
  const [selectedRole, setSelectedRole] = useState<'admin' | 'enterprise' | 'enforce'>('admin');

  // Account Form
  const [username, setUsername] = useState('admin_xining');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  // SMS Form
  const [phone, setPhone] = useState('13897210988');
  const [smsCode, setSmsCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Slider Verification
  const [sliderProgress, setSliderProgress] = useState(0); // 0 to 100
  const [isVerified, setIsVerified] = useState(false);
  const isDraggingRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Role Switching
  const handleRoleChange = (role: 'admin' | 'enterprise' | 'enforce') => {
    setSelectedRole(role);
    setErrorMsg('');
    if (role === 'admin') {
      setUsername('admin_xining');
      setPassword('123456');
      setPhone('13897210988');
    } else if (role === 'enterprise') {
      setUsername('91630100710928340X'); // Enterprise Unified Social Credit Code
      setPassword('123456');
      setPhone('18997186620');
    } else {
      setUsername('law_enforce_008');
      setPassword('123456');
      setPhone('13997082215');
    }
  };

  // Slider Mouse/Touch Event Handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isVerified) return;
    isDraggingRef.current = true;
    handleDragMove(e);
  };

  const handleDragMove = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current || isVerified || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offsetX = clientX - rect.left - 20; // 20px handle center offset
    const maxOffset = rect.width - 44; // Handle width 44px
    const percentage = Math.max(0, Math.min(100, (offsetX / maxOffset) * 100));
    setSliderProgress(percentage);

    if (percentage >= 95) {
      isDraggingRef.current = false;
      setSliderProgress(100);
      setIsVerified(true);
      setErrorMsg('');
    }
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (!isVerified) {
      // Rebound to 0
      setSliderProgress(0);
    }
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => handleDragMove(e);
    const onUp = () => handleDragEnd();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isVerified]);

  // Countdown timer for SMS
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendSms = () => {
    if (!phone || phone.length < 11) {
      setErrorMsg('请输入正确的11位手机号码');
      return;
    }
    setErrorMsg('');
    setCountdown(60);
    setSmsCode('882019'); // Pre-fill mock SMS code for ease of test
  };

  // Submit Login
  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (loginTab === 'account') {
      if (!username.trim()) {
        setErrorMsg('请输入您的账号');
        return;
      }
      if (!password) {
        setErrorMsg('请输入密码');
        return;
      }
    } else {
      if (!phone.trim()) {
        setErrorMsg('请输入手机号码');
        return;
      }
      if (!smsCode.trim()) {
        setErrorMsg('请输入短信验证码');
        return;
      }
    }

    if (!isVerified) {
      setErrorMsg('请先按住滑块拖动到最右边完成安全校验');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      let roleTitle = '水务监管管理员(88018)';
      if (selectedRole === 'enterprise') {
        roleTitle = '青海百河铝业(取水企业)';
      } else if (selectedRole === 'enforce') {
        roleTitle = '水政水资源监察执法支队';
      }
      onLoginSuccess(roleTitle, 'water');
    }, 450);
  };

  // QR Code Instant Login Simulation
  const handleQrCodeClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('政务移动端扫码授权用户', 'water');
    }, 500);
  };

  const loginCardContent = (
    <div className="w-full max-w-[490px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(28,68,140,0.16)] border border-white/90 relative overflow-hidden backdrop-blur-xs">
      {/* Top-Right Triangle Fold Corner for QR Code / Account Switch */}
      <div 
        onClick={() => setIsQrMode(!isQrMode)}
        title={isQrMode ? "切换为账号密码登录" : "切换为移动政务扫码登录"}
        className="absolute top-0 right-0 w-16 h-16 cursor-pointer z-20 group"
      >
        {/* Triangle Background Badge */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[64px] border-l-[64px] border-t-[#2257aa] border-l-transparent transition-all group-hover:border-t-[#1b468a]" />
        
        {/* QR / Computer Icon in corner */}
        <div className="absolute top-2.5 right-2.5 text-white transform group-hover:scale-110 transition-transform">
          {isQrMode ? (
            <Laptop className="w-5 h-5 text-sky-100 drop-shadow-xs" />
          ) : (
            <QrCode className="w-5 h-5 text-white drop-shadow-xs" />
          )}
        </div>
      </div>

      <div className="pt-9 pb-8 px-8 sm:px-10">
        {!isQrMode ? (
          <>
            {/* Header Tabs: 账号登录 | 短信登录 */}
            <div className="flex items-center justify-center gap-4 mb-7 select-none">
              <button
                type="button"
                onClick={() => {
                  setLoginTab('account');
                  setErrorMsg('');
                }}
                className={`text-[17px] tracking-wide transition-all cursor-pointer relative pb-1 ${
                  loginTab === 'account'
                    ? 'font-bold text-[#1f56a8]'
                    : 'font-normal text-slate-500 hover:text-slate-700'
                }`}
              >
                账号登录
                {loginTab === 'account' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1f56a8] rounded-full" />
                )}
              </button>

              <span className="text-slate-300 font-light text-base select-none">|</span>

              <button
                type="button"
                onClick={() => {
                  setLoginTab('sms');
                  setErrorMsg('');
                }}
                className={`text-[17px] tracking-wide transition-all cursor-pointer relative pb-1 ${
                  loginTab === 'sms'
                    ? 'font-bold text-[#1f56a8]'
                    : 'font-normal text-slate-500 hover:text-slate-700'
                }`}
              >
                短信登录
                {loginTab === 'sms' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1f56a8] rounded-full" />
                )}
              </button>
            </div>

            {/* Error Message banner */}
            {errorMsg && (
              <div className="mb-4 px-3.5 py-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginTab === 'account' ? (
                <>
                  {/* Account Input */}
                  <div className="h-11 border border-slate-300/80 rounded-md flex items-center px-3.5 bg-white focus-within:border-[#2f66be] focus-within:ring-1 focus-within:ring-[#2f66be]/30 transition shadow-xs">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="h-4 w-px bg-slate-200 mx-3 shrink-0" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="请输入您的账号"
                      className="w-full text-xs text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="h-11 border border-slate-300/80 rounded-md flex items-center px-3.5 bg-white focus-within:border-[#2f66be] focus-within:ring-1 focus-within:ring-[#2f66be]/30 transition shadow-xs">
                    <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="h-4 w-px bg-slate-200 mx-3 shrink-0" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="请输入密码"
                      className="w-full text-xs text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-slate-400 hover:text-slate-600 transition shrink-0 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Mobile Phone Input */}
                  <div className="h-11 border border-slate-300/80 rounded-md flex items-center px-3.5 bg-white focus-within:border-[#2f66be] focus-within:ring-1 focus-within:ring-[#2f66be]/30 transition shadow-xs">
                    <Smartphone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="h-4 w-px bg-slate-200 mx-3 shrink-0" />
                    <input
                      type="tel"
                      maxLength={11}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="请输入手机号码"
                      className="w-full text-xs text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                    />
                  </div>

                  {/* SMS Code Input */}
                  <div className="h-11 border border-slate-300/80 rounded-md flex items-center px-3.5 bg-white focus-within:border-[#2f66be] focus-within:ring-1 focus-within:ring-[#2f66be]/30 transition shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="h-4 w-px bg-slate-200 mx-3 shrink-0" />
                    <input
                      type="text"
                      maxLength={6}
                      value={smsCode}
                      onChange={(e) => setSmsCode(e.target.value)}
                      placeholder="请输入短信验证码"
                      className="w-full text-xs text-slate-800 placeholder:text-slate-400 outline-none bg-transparent font-mono tracking-wider"
                    />
                    <button
                      type="button"
                      disabled={countdown > 0}
                      onClick={handleSendSms}
                      className="text-xs text-[#2f66be] hover:text-[#214e97] font-medium shrink-0 disabled:text-slate-400 disabled:cursor-not-allowed pl-2 cursor-pointer"
                    >
                      {countdown > 0 ? `${countdown}s 后重新获取` : '获取验证码'}
                    </button>
                  </div>
                </>
              )}

              {/* Slider Verification (拖动滑块验证组件) */}
              <div
                ref={trackRef}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className={`h-11 rounded-md border relative flex items-center select-none overflow-hidden transition-colors ${
                  isVerified
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-[#e7f0fc] border-[#c7dcf7]'
                }`}
              >
                {/* Dragged Track Fill */}
                <div
                  className={`absolute left-0 top-0 bottom-0 transition-all ${
                    isVerified ? 'bg-emerald-500/20' : 'bg-[#a7ccf7]/40'
                  }`}
                  style={{ width: `${sliderProgress}%` }}
                />

                {/* Text inside the track */}
                <div className="w-full text-center text-xs font-normal z-10 pointer-events-none transition-colors">
                  {isVerified ? (
                    <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                      <Check className="w-4 h-4 text-emerald-600" />
                      验证通过
                    </span>
                  ) : (
                    <span className="text-[#5984bf]">
                      请按住滑块，拖动到最右边
                    </span>
                  )}
                </div>

                {/* Slider Handle */}
                <div
                  className={`absolute top-0 bottom-0 w-11 bg-white border flex items-center justify-center shadow-xs transition-colors z-20 ${
                    isVerified
                      ? 'border-emerald-300 text-emerald-600 cursor-default'
                      : 'border-slate-300 text-slate-400 hover:text-slate-600 cursor-ew-resize hover:bg-slate-50'
                  }`}
                  style={{
                    left: isVerified ? 'calc(100% - 44px)' : `${(sliderProgress / 100) * (trackRef.current ? trackRef.current.clientWidth - 44 : 0)}px`,
                  }}
                >
                  {isVerified ? (
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <ChevronsRight className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 mt-1 bg-[#2f66be] hover:bg-[#2558a7] active:bg-[#1f4a8e] text-white text-sm font-medium tracking-[0.2em] rounded-md shadow-sm hover:shadow transition-all flex items-center justify-center cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>正在登录...</span>
                  </span>
                ) : (
                  '登 录'
                )}
              </button>
            </form>

            {/* Bottom Tip (提醒：还没有账号？可致电平台服务人员开通) */}
            <div className="mt-5 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <span>提醒：还没有账号？可致电平台服务人员开通</span>
            </div>

            {/* Role Persona Presets for Convenient Testing */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="shrink-0 text-slate-400">身份预设：</span>
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                <button
                  type="button"
                  onClick={() => handleRoleChange('admin')}
                  className={`px-2 py-0.5 rounded text-[11px] transition cursor-pointer ${
                    selectedRole === 'admin'
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  水务监管部门
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('enterprise')}
                  className={`px-2 py-0.5 rounded text-[11px] transition cursor-pointer ${
                    selectedRole === 'enterprise'
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  取水企业户
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('enforce')}
                  className={`px-2 py-0.5 rounded text-[11px] transition cursor-pointer ${
                    selectedRole === 'enforce'
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  水政监察执法
                </button>
              </div>
            </div>
          </>
        ) : (
          /* QR Code Login View */
          <div className="text-center py-2 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-800 mb-1">
              政务移动端扫码登录
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              请打开「西宁政务通」或「水务监管移动版」APP 扫一扫
            </p>

            <div 
              onClick={handleQrCodeClick}
              title="点击模拟扫码成功登录"
              className="inline-block p-4 bg-white border border-slate-200 rounded-xl shadow-md cursor-pointer hover:border-blue-400 hover:shadow-lg transition group relative"
            >
              {/* Stylized QR Code SVG */}
              <div className="w-48 h-48 bg-slate-50 rounded-lg flex items-center justify-center p-2 relative overflow-hidden">
                <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="currentColor">
                  {/* Top-left locator */}
                  <rect x="10" y="10" width="25" height="25" rx="3" fill="#1e40af" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="#1e40af" />

                  {/* Top-right locator */}
                  <rect x="65" y="10" width="25" height="25" rx="3" fill="#1e40af" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="#1e40af" />

                  {/* Bottom-left locator */}
                  <rect x="10" y="65" width="25" height="25" rx="3" fill="#1e40af" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="#1e40af" />

                  {/* Data patterns */}
                  <rect x="42" y="12" width="6" height="6" fill="#334155" />
                  <rect x="52" y="12" width="6" height="12" fill="#334155" />
                  <rect x="42" y="24" width="16" height="6" fill="#334155" />
                  
                  <rect x="12" y="42" width="12" height="6" fill="#334155" />
                  <rect x="12" y="52" width="6" height="6" fill="#334155" />
                  <rect x="24" y="48" width="10" height="10" fill="#334155" />

                  <rect x="40" y="40" width="20" height="20" rx="4" fill="#0284c7" />
                  <circle cx="50" cy="50" r="5" fill="white" />

                  <rect x="65" y="42" width="12" height="6" fill="#334155" />
                  <rect x="80" y="48" width="10" height="6" fill="#334155" />
                  <rect x="65" y="55" width="15" height="6" fill="#334155" />

                  <rect x="42" y="68" width="8" height="8" fill="#334155" />
                  <rect x="54" y="68" width="12" height="6" fill="#334155" />
                  <rect x="42" y="80" width="18" height="8" fill="#334155" />
                  <rect x="66" y="78" width="10" height="10" fill="#334155" />
                  <rect x="80" y="70" width="8" height="18" fill="#334155" />
                </svg>

                {/* Scan line effect on hover */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-0 group-hover:top-full transition-all duration-1000 ease-in-out pointer-events-none" />
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              点击二维码模拟快速授权登录
            </div>

            <button
              type="button"
              onClick={() => setIsQrMode(false)}
              className="mt-4 text-xs text-[#2f66be] hover:underline font-medium cursor-pointer"
            >
              ← 返回账号密码登录
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // If used as modal
  if (isModal) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
        onClick={onClose}
      >
        <div onClick={(e) => e.stopPropagation()}>
          {loginCardContent}
        </div>
      </div>
    );
  }

  // Full-screen Page matching the user's provided screenshot
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-[#d9ebfb] via-[#e5f1fd] to-[#d6e8fa] relative overflow-hidden select-none font-sans text-slate-800">
      
      {/* 1. Background Flowing Silk Water Wave Watermark (Left side flowing wave ribbon) */}
      <svg 
        className="absolute -left-20 top-0 w-[65vw] h-[80vh] pointer-events-none opacity-40 mix-blend-multiply"
        viewBox="0 0 800 800" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M-100,50 C150,120 280,30 450,180 C620,330 350,520 600,680 C700,740 750,780 800,850 L-100,850 Z" 
          fill="url(#silkGradient)" 
        />
        <path 
          d="M-100,200 C120,260 220,160 380,300 C540,440 280,600 500,740 L-100,850 Z" 
          fill="url(#silkGradientLight)" 
          opacity="0.6"
        />
        <defs>
          <linearGradient id="silkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="silkGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* 2. City Skyline Silhouette in Pale Cyan (Middle Horizon) */}
      <div className="absolute inset-x-0 bottom-24 h-64 pointer-events-none opacity-30 flex items-end justify-center overflow-hidden">
        <svg className="w-full h-full min-w-[1200px]" viewBox="0 0 1440 240" fill="none" preserveAspectRatio="none">
          {/* Skyline blocks */}
          <rect x="60" y="120" width="40" height="120" fill="#7fafe6" />
          <rect x="110" y="80" width="55" height="160" fill="#7fafe6" />
          <polygon points="120,80 137,40 155,80" fill="#7fafe6" />
          <rect x="175" y="110" width="50" height="130" fill="#7fafe6" />
          <rect x="235" y="70" width="70" height="170" fill="#7fafe6" />
          <rect x="315" y="130" width="45" height="110" fill="#7fafe6" />

          <rect x="420" y="90" width="60" height="150" fill="#8cb9ee" />
          <rect x="490" y="60" width="65" height="180" fill="#8cb9ee" />
          <rect x="565" y="105" width="50" height="135" fill="#8cb9ee" />

          <rect x="880" y="100" width="55" height="140" fill="#7fafe6" />
          <rect x="945" y="65" width="75" height="175" fill="#7fafe6" />
          <polygon points="960,65 982,25 1005,65" fill="#7fafe6" />
          <rect x="1030" y="110" width="60" height="130" fill="#7fafe6" />
          <rect x="1100" y="85" width="50" height="155" fill="#7fafe6" />
          <rect x="1160" y="130" width="65" height="110" fill="#7fafe6" />
          <rect x="1235" y="75" width="80" height="165" fill="#7fafe6" />
        </svg>
      </div>

      {/* 3. Detailed Architectural Sketch Blueprint Graphics at Bottom Foreground */}
      <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none flex items-end justify-center overflow-hidden z-0">
        <svg 
          className="w-full max-w-[1600px] h-36 opacity-75"
          viewBox="0 0 1600 160" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Landmark structural sketch - Western China / Modern civic centers / Grand Theater / Stadium sketch lineart */}
          <g stroke="#265ca5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Left Pavilion & Modern curves */}
            <path d="M 200,160 L 200,110 L 250,90 L 300,110 L 300,160" fill="#d9e9f9" fillOpacity="0.5" />
            <line x1="220" y1="110" x2="220" y2="160" />
            <line x1="240" y1="100" x2="240" y2="160" />
            <line x1="260" y1="100" x2="260" y2="160" />
            <line x1="280" y1="110" x2="280" y2="160" />

            {/* Futuristic tilted tower like CCTV/Landmark */}
            <path d="M 330,160 L 360,50 L 410,40 L 430,70 L 410,160 Z" fill="#d3e4f7" fillOpacity="0.7" />
            <line x1="360" y1="70" x2="415" y2="60" />
            <line x1="365" y1="95" x2="413" y2="85" />
            <line x1="370" y1="120" x2="411" y2="110" />
            <line x1="375" y1="140" x2="410" y2="135" />

            {/* Modern curved cultural center / Water cube structure */}
            <path d="M 440,160 Q 490,95 550,115 T 660,160" fill="#cbe0f6" fillOpacity="0.6" />
            <path d="M 460,160 Q 500,115 550,130 T 640,160" />

            {/* Center Landmark Tower */}
            <path d="M 680,160 L 710,75 L 750,75 L 770,160" fill="#d0e2f5" fillOpacity="0.5" />
            <line x1="730" y1="75" x2="730" y2="20" strokeWidth="1.5" />
            <circle cx="730" cy="45" r="8" fill="#d0e2f5" />
            
            {/* Right Iconic Expo Pavilion / Modern Canopy */}
            <path d="M 860,160 L 890,110 L 960,110 L 980,160" fill="#d0e2f5" fillOpacity="0.5" />
            <path d="M 990,160 L 1030,80 L 1090,80 L 1120,160" fill="#d4e5f7" fillOpacity="0.6" />
            <path d="M 1040,80 L 1060,50 L 1080,80" />

            {/* Stadium curved roof / Grand arena */}
            <path d="M 1140,160 Q 1200,90 1280,95 T 1380,160" fill="#cde1f6" fillOpacity="0.5" />
            <line x1="1160" y1="145" x2="1360" y2="145" />
            <line x1="1180" y1="130" x2="1340" y2="130" />
            <line x1="1210" y1="115" x2="1310" y2="115" />
          </g>
          {/* Ground water reflection ribbon */}
          <path d="M 0,160 Q 400,140 800,150 T 1600,150 L 1600,160 Z" fill="#2056a8" fillOpacity="0.15" />
        </svg>
      </div>

      {/* 4. Top-Left Government Official Branding Emblem & Header */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-8 sm:pt-10 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {/* Government Water Resource Official Emblem */}
          <div className="w-13 h-13 rounded-full bg-gradient-to-br from-amber-400 via-red-600 to-red-700 p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1 relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                {/* Golden wreath ring */}
                <circle cx="50" cy="50" r="46" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3 2" />
                {/* Red background */}
                <circle cx="50" cy="50" r="41" fill="#dc2626" />
                {/* 5 Golden Stars */}
                <polygon points="50,22 52,28 58,28 53,32 55,38 50,34 45,38 47,32 42,28 48,28" fill="#fbbf24" />
                <polygon points="36,27 37,30 40,30 38,32 39,35 36,33 33,35 34,32 32,30 35,30" fill="#fbbf24" />
                <polygon points="64,27 65,30 68,30 66,32 67,35 64,33 61,35 62,32 60,30 63,30" fill="#fbbf24" />
                {/* Central water flow ripples in blue and white */}
                <path d="M 20,62 Q 50,52 80,62 Q 50,72 20,62" fill="#38bdf8" />
                <path d="M 24,70 Q 50,60 76,70 Q 50,80 24,70" fill="#0284c7" />
                <circle cx="50" cy="48" r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                {/* Wheat / gear emblem border */}
                <path d="M 26,78 Q 50,90 74,78" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-[#194ea0] drop-shadow-xs flex items-center gap-2">
              智慧取用水一体化服务平台
            </h1>
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#2e68bf] uppercase mt-0.5">
              INTELLIGENT WATER ABSTRACTION INTEGRATED SERVICE PLATFORM
            </p>
          </div>
        </div>

        {/* Right Help / Hotline */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 bg-white/70 px-3 py-1.5 rounded-full border border-white/80 shadow-xs">
          <PhoneCall className="w-3.5 h-3.5 text-[#2f66be]" />
          <span>政务服务技术保障：0971-8820119</span>
        </div>
      </div>

      {/* 5. Center Main Login Area with Floating Card & Flying Birds */}
      <main className="relative z-10 w-full flex-1 flex items-center justify-center px-4 py-8">
        
        {/* Flying Birds / Doves Silhouette Above Card to the Right */}
        <div className="absolute right-[12%] sm:right-[18%] lg:right-[26%] top-[12%] sm:top-[16%] pointer-events-none opacity-85 z-0">
          <svg className="w-36 h-28" viewBox="0 0 140 100" fill="#2056a8">
            {/* Bird 1 */}
            <path d="M 20,40 Q 35,20 48,32 Q 52,24 62,35 Q 46,38 38,48 Q 28,45 20,40 Z" />
            {/* Bird 2 */}
            <path d="M 68,18 Q 78,4 88,14 Q 92,8 99,17 Q 87,19 82,27 Q 74,23 68,18 Z" opacity="0.9" />
            {/* Bird 3 */}
            <path d="M 95,38 Q 106,24 117,33 Q 120,28 128,36 Q 116,39 111,46 Q 102,42 95,38 Z" opacity="0.8" />
            {/* Bird 4 */}
            <path d="M 45,60 Q 53,50 61,56 Q 63,52 69,58 Q 59,60 56,65 Q 49,63 45,60 Z" opacity="0.7" />
          </svg>
        </div>

        {/* The Centered Floating Card */}
        <div className="relative z-10">
          {loginCardContent}
        </div>
      </main>

      {/* 6. Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-slate-500 bg-white/40 border-t border-white/60 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>主办单位：西宁市水务局 · 水资源节约与保护监督中心</span>
          <span className="text-[11px] text-slate-400">青公网安备 63010002000118号 · 统一社会信用代码政务认证</span>
        </div>
      </footer>
    </div>
  );
};
