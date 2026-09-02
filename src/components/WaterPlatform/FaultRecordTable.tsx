import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  FileText, 
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Edit3
} from 'lucide-react';
import { FaultRecord } from '../../types';
import { CustomSelect } from '../Common/CustomSelect';

interface FaultRecordTableProps {
  records: FaultRecord[];
  onViewProgress: (record: FaultRecord) => void;
  onViewMedia: (title: string, files: string[], description?: string) => void;
  onEditRejected: (record: FaultRecord) => void;
}

export const FaultRecordTable: React.FC<FaultRecordTableProps> = ({
  records,
  onViewProgress,
  onViewMedia,
  onEditRejected,
}) => {
  const [currentPage, setCurrentPage] = useState(3); // Matching screenshot page 3
  const [pageSize, setPageSize] = useState(20);
  const totalCount = 210; // Matching screenshot '共210条'

  const getStatusClass = (status: string) => {
    switch (status) {
      case '已完成':
        return 'text-emerald-600 font-medium';
      case '故障驳回':
      case '处理驳回':
        return 'text-rose-600 font-medium';
      case '故障中':
      case '处理待审':
      case '故障待审':
      default:
        return 'text-amber-600 font-medium';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-xs flex flex-col relative h-full min-h-0 flex-1 overflow-hidden">
      
      {/* Table Container */}
      <div className="flex-1 min-h-0 overflow-x-auto overflow-y-auto custom-scrollbar">
        <table className="w-full text-[12px] text-left border-collapse min-w-[1400px]">
          
          {/* Header */}
          <thead className="bg-[#ebf3fb] text-slate-800 font-semibold border-b border-slate-300 sticky top-0 z-10 select-none">
            <tr>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap">取水权人</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap">证照编号</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap">计量设施名称</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap text-center">计量器具编号</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap text-center">故障水表底数</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap">故障情况说明</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap text-center">故障图片</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap text-center">上报人</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap text-center">故障时间</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap text-center">故障解除底数</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap">故障解除说明</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap text-center">解除证明材料</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap text-center">处理人</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap text-center">处理时间</th>
              <th className="px-3 py-2.5 border-r border-slate-300/80 whitespace-nowrap text-center">状态</th>
              <th className="px-3 py-2.5 whitespace-nowrap text-center">流程</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
            {records.map((record) => {
              const isRejected = record.status === '故障驳回' || record.status === '处理驳回';
              return (
                <tr 
                  key={record.id} 
                  className="hover:bg-blue-50/40 transition-colors group h-10"
                >
                  {/* 取水权人 */}
                  <td className="px-3 py-2 border-r border-slate-100 max-w-[160px] truncate" title={record.waterOwner}>
                    {record.waterOwner}
                  </td>

                  {/* 证照编号 */}
                  <td className="px-3 py-2 border-r border-slate-100 font-mono text-slate-600 whitespace-nowrap">
                    {record.permitNumber || '-'}
                  </td>

                  {/* 计量设施名称 */}
                  <td className="px-3 py-2 border-r border-slate-100 max-w-[180px] truncate font-medium text-slate-800" title={record.facilityName}>
                    {record.facilityName}
                  </td>

                  {/* 计量器具编号 */}
                  <td className="px-3 py-2 border-r border-slate-100 font-mono text-center text-slate-700 whitespace-nowrap">
                    {record.facilityCode}
                  </td>

                  {/* 故障水表底数 */}
                  <td className="px-3 py-2 border-r border-slate-100 font-mono text-center text-slate-700">
                    {record.faultWaterMeterReading}
                  </td>

                  {/* 故障情况说明 */}
                  <td className="px-3 py-2 border-r border-slate-100 max-w-[150px] truncate text-slate-500" title={record.faultDesc}>
                    {record.faultDesc || '-'}
                  </td>

                  {/* 故障图片 */}
                  <td className="px-3 py-2 border-r border-slate-100 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() =>
                        onViewMedia(
                          `故障图片材料 - ${record.facilityName}`,
                          record.faultImages || ['现场水表故障照片.jpg'],
                          record.faultDesc
                        )
                      }
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium cursor-pointer"
                    >
                      查看
                    </button>
                  </td>

                  {/* 上报人 */}
                  <td className="px-3 py-2 border-r border-slate-100 text-center whitespace-nowrap">
                    {record.reporter}
                  </td>

                  {/* 故障时间 */}
                  <td className="px-3 py-2 border-r border-slate-100 font-mono text-center text-slate-600 whitespace-nowrap">
                    {record.faultTime}
                  </td>

                  {/* 故障解除底数 */}
                  <td className="px-3 py-2 border-r border-slate-100 font-mono text-center text-slate-700">
                    {record.resolvedWaterMeterReading || '-'}
                  </td>

                  {/* 故障解除说明 */}
                  <td className="px-3 py-2 border-r border-slate-100 max-w-[150px] truncate text-slate-500" title={record.resolvedDesc}>
                    {record.resolvedDesc || '-'}
                  </td>

                  {/* 解除证明材料 */}
                  <td className="px-3 py-2 border-r border-slate-100 text-center whitespace-nowrap">
                    {record.resolvedFiles && record.resolvedFiles.length > 0 ? (
                      <button
                        type="button"
                        onClick={() =>
                          onViewMedia(
                            `解除证明材料 - ${record.facilityName}`,
                            record.resolvedFiles || [],
                            record.resolvedDesc
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium cursor-pointer"
                      >
                        查看
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          onViewMedia(
                            `解除证明材料 - ${record.facilityName}`,
                            ['解除修复工单.pdf'],
                            record.resolvedDesc || '正在组织修复处理中'
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium cursor-pointer"
                      >
                        查看
                      </button>
                    )}
                  </td>

                  {/* 处理人 */}
                  <td className="px-3 py-2 border-r border-slate-100 text-center whitespace-nowrap">
                    {record.handler || '-'}
                  </td>

                  {/* 处理时间 */}
                  <td className="px-3 py-2 border-r border-slate-100 font-mono text-center text-slate-600 whitespace-nowrap">
                    {record.handleTime || '-'}
                  </td>

                  {/* 状态 */}
                  <td className="px-3 py-2 border-r border-slate-100 text-center whitespace-nowrap">
                    <span className={getStatusClass(record.status)}>
                      {record.status}
                    </span>
                    {isRejected && record.canReapply && (
                      <button
                        type="button"
                        onClick={() => onEditRejected(record)}
                        className="ml-1.5 text-[11px] text-blue-600 hover:text-blue-800 hover:underline cursor-pointer inline-flex items-center"
                        title="点击重新编辑提交审核"
                      >
                        [编辑重报]
                      </button>
                    )}
                  </td>

                  {/* 流程 */}
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onViewProgress(record)}
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium cursor-pointer"
                    >
                      进度
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* Extra decorative empty grid rows matching screenshot layout */}
            <tr className="h-9 border-b border-slate-100">
              <td colSpan={14} className="border-r border-slate-100"></td>
              <td className="text-center font-medium text-rose-600 border-r border-slate-100">处理驳回</td>
              <td></td>
            </tr>

            {/* Red Notice Bar directly matching the screenshot text */}
            <tr className="bg-white">
              <td colSpan={16} className="py-3 px-6 text-center border-t border-b border-slate-100">
                <p className="text-rose-600 text-xs font-normal tracking-wide select-none leading-relaxed">
                  说明：故障的提交，需要等到审核通过之后才改变状态，如果说故障驳回了，是可以在当前记录编辑再次提交审核的，如果说驳回了没有再次提交，就可以再次发起新的故障申请（但是有新的故障申请则原来的驳回不可再次编辑提交了）
                </p>
              </td>
            </tr>

            {/* Additional empty grid rows */}
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <tr key={`empty-${idx}`} className="h-8 border-b border-slate-50">
                {Array.from({ length: 16 }).map((_, cIdx) => (
                  <td key={cIdx} className="border-r border-slate-100/50"></td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Pagination matching screenshot: 共210条 < 1 2 [3] 4 5 ... 10 > [20条/页 ▾] 跳到 [ 1 ] 页 */}
      <div className="shrink-0 px-3.5 py-1.5 border-t border-slate-200/80 bg-white flex flex-wrap items-center justify-end gap-2 text-xs text-slate-600 select-none">
        
        {/* Total Count */}
        <span className="text-slate-500 mr-2">共{totalCount}条</span>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`w-6 h-6 flex items-center justify-center rounded text-xs transition cursor-pointer ${
              currentPage === 1 ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            1
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`w-6 h-6 flex items-center justify-center rounded text-xs transition cursor-pointer ${
              currentPage === 2 ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            2
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className={`w-6 h-6 flex items-center justify-center rounded border text-xs transition cursor-pointer ${
              currentPage === 3 ? 'border-blue-500 text-blue-600 font-semibold bg-blue-50/50' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            3
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(4)}
            className={`w-6 h-6 flex items-center justify-center rounded text-xs transition cursor-pointer ${
              currentPage === 4 ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            4
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(5)}
            className={`w-6 h-6 flex items-center justify-center rounded text-xs transition cursor-pointer ${
              currentPage === 5 ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            5
          </button>

          <span className="text-slate-400 px-0.5 text-xs">...</span>

          <button
            type="button"
            onClick={() => setCurrentPage(10)}
            className={`w-6 h-6 flex items-center justify-center rounded text-xs transition cursor-pointer ${
              currentPage === 10 ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            10
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
            disabled={currentPage === 10}
            className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Page Size Select */}
        <CustomSelect
          size="xs"
          placement="top"
          className="w-24"
          value={pageSize}
          onChange={(val) => setPageSize(Number(val))}
          options={[
            { value: 10, label: '10 条/页' },
            { value: 20, label: '20 条/页' },
            { value: 50, label: '50 条/页' },
            { value: 100, label: '100 条/页' },
          ]}
        />

        {/* Jump to */}
        <div className="flex items-center gap-1 text-slate-600">
          <span>跳到</span>
          <input
            type="number"
            min={1}
            max={10}
            defaultValue={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = Number((e.target as HTMLInputElement).value);
                if (val >= 1 && val <= 10) setCurrentPage(val);
              }
            }}
            className="w-9 h-6 text-center border border-slate-300 rounded text-slate-800 outline-none focus:border-blue-500 text-xs"
          />
          <span>页</span>
        </div>

      </div>

    </div>
  );
};
