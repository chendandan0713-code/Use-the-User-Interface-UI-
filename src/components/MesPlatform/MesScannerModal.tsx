import React, { useState } from 'react';
import { X, ScanLine, QrCode, CheckCircle2, Search, Zap } from 'lucide-react';

interface MesScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanResult: (code: string) => void;
}

export const MesScannerModal: React.FC<MesScannerModalProps> = ({
  isOpen,
  onClose,
  onScanResult,
}) => {
  const [manualCode, setManualCode] = useState('');

  if (!isOpen) return null;

  const sampleCodes = [
    { code: 'WO20260901-001', label: '电磁水表传感器工单' },
    { code: 'WO20260901-002', label: '超声波测流换能器工单' },
    { code: 'WO20260901-003', label: 'RTU遥测终端工单' },
    { code: 'WO20260901-006', label: '电路板贴片返工工单' },
  ];

  const handleApply = (code: string) => {
    onScanResult(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
              <ScanLine className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">生产条码 / 二维码扫码识读</h3>
              <p className="text-[11px] text-slate-500">支持工业手持枪、移动端摄像头或快速模拟</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scanner Viewfinder Visual */}
        <div className="p-6 flex flex-col items-center">
          <div className="relative w-64 h-48 bg-slate-900 rounded-xl overflow-hidden shadow-inner flex items-center justify-center border-2 border-slate-700">
            {/* Laser scanning line animation */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] animate-pulse"></div>
            
            {/* Viewfinder corner brackets */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

            <div className="flex flex-col items-center text-slate-400 text-xs gap-2">
              <QrCode className="w-12 h-12 text-slate-600 animate-pulse" />
              <span>将条码/二维码对准框内</span>
            </div>
          </div>

          {/* Quick Mock Barcode Buttons */}
          <div className="w-full mt-4 space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              快速模拟识读测试码:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {sampleCodes.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleApply(item.code)}
                  className="p-2 text-left bg-slate-50 hover:bg-blue-50 hover:border-blue-300 rounded-lg border border-slate-200 transition text-xs"
                >
                  <p className="font-mono font-bold text-blue-600">{item.code}</p>
                  <p className="text-[10px] text-slate-500 truncate">{item.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Input */}
          <div className="w-full mt-4 pt-3 border-t border-slate-100">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">手动输入条码编号</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="例如: WO20260901-001"
                className="flex-1 h-8 px-2.5 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => manualCode.trim() && handleApply(manualCode.trim())}
                className="px-3 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
              >
                确认
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
