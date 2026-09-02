import React from 'react';
import { X, CheckCircle2, Clock, XCircle, AlertTriangle, ArrowRight, UserCheck } from 'lucide-react';
import { FaultRecord } from '../../types';

interface FaultWorkflowModalProps {
  isOpen: boolean;
  record: FaultRecord | null;
  onClose: () => void;
  onAuditApprove?: (record: FaultRecord) => void;
  onAuditReject?: (record: FaultRecord, reason: string) => void;
}

export const FaultWorkflowModal: React.FC<FaultWorkflowModalProps> = ({
  isOpen,
  record,
  onClose,
  onAuditApprove,
  onAuditReject,
}) => {
  if (!isOpen || !record) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '已完成':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-50 text-emerald-600 border border-emerald-200">已完成</span>;
      case '故障驳回':
      case '处理驳回':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded bg-rose-50 text-rose-600 border border-rose-200">{status}</span>;
      case '故障中':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-50 text-amber-600 border border-amber-200">故障维护中</span>;
      case '处理待审':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-600 border border-blue-200">处理待审</span>;
      case '故障待审':
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-50 text-amber-600 border border-amber-200">故障待审</span>;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-slate-900">故障处理进度流程</h3>
            {getStatusBadge(record.status)}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Header */}
        <div className="p-6 border-b border-slate-100 bg-white grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-500">设施名称：</span>
            <span className="font-medium text-slate-800">{record.facilityName}</span>
          </div>
          <div>
            <span className="text-slate-500">计量器具编号：</span>
            <span className="font-mono font-medium text-slate-800">{record.facilityCode}</span>
          </div>
          <div>
            <span className="text-slate-500">取水权人：</span>
            <span className="font-medium text-slate-800">{record.waterOwner}</span>
          </div>
          <div>
            <span className="text-slate-500">许可证编号：</span>
            <span className="font-mono text-slate-800">{record.permitNumber || '-'}</span>
          </div>
          <div>
            <span className="text-slate-500">故障上报人：</span>
            <span className="text-slate-800">{record.reporter} ({record.faultTime})</span>
          </div>
          <div>
            <span className="text-slate-500">水表底数：</span>
            <span className="font-mono text-slate-800">
              故障底数: {record.faultWaterMeterReading} m³ | 解除底数: {record.resolvedWaterMeterReading || '-'} m³
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-6 bg-slate-50/50 space-y-6">
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">审核流转记录</h4>
          
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {record.auditLogs && record.auditLogs.length > 0 ? (
              record.auditLogs.map((log, idx) => {
                const isPass = log.result === '通过' || log.result === '提交';
                const isReject = log.result === '驳回';
                return (
                  <div key={idx} className="relative group">
                    {/* Node Dot */}
                    <div 
                      className={`absolute -left-[19px] top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                        isReject 
                          ? 'border-rose-500 text-rose-500' 
                          : isPass 
                          ? 'border-emerald-500 text-emerald-500' 
                          : 'border-blue-500 text-blue-500'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${isReject ? 'bg-rose-500' : isPass ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                    </div>

                    <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">{log.stage}</span>
                          <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${
                            isReject 
                              ? 'bg-rose-100 text-rose-700' 
                              : isPass 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {log.result}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">{log.time}</span>
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-1.5 mb-1">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        <span>操作人：{log.operator}</span>
                      </div>
                      {log.remark && (
                        <p className={`text-xs mt-1.5 p-2 rounded ${
                          isReject ? 'bg-rose-50 text-rose-800 border border-rose-100' : 'bg-slate-50 text-slate-600'
                        }`}>
                          {log.remark}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-xs text-slate-500">暂无详细流转记录</div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-white flex items-center justify-between text-xs">
          <div className="text-slate-500">
            {record.status === '故障驳回' && (
              <span className="text-rose-600">提示：本条记录已驳回，可在列表直接编辑重报。</span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition cursor-pointer"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
