import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  FileText, 
  AlertTriangle, 
  Power, 
  PowerOff, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronDown,
  Building,
  RefreshCw,
  ExternalLink,
  Clock,
  Gauge
} from 'lucide-react';
import { WaterFacility } from '../../types';

interface WaterDetailDrawerProps {
  facility: WaterFacility | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (facility: WaterFacility) => void;
}

export const WaterDetailDrawer: React.FC<WaterDetailDrawerProps> = ({
  facility,
  isOpen,
  onClose,
  onEdit,
}) => {
  const [activeTab, setActiveTab] = useState<
    'basic' | 'project' | 'license' | 'fault' | 'toggle' | 'calibration' | 'replace'
  >('basic');
  const [showMapModal, setShowMapModal] = useState(false);

  if (!isOpen || !facility) return null;

  // Format helper
  const districtStr = facility.district?.includes('/') 
    ? facility.district 
    : `青海省/西宁市/${facility.district || '大通县'}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-5xl bg-white h-[85vh] max-h-[85vh] rounded-xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 relative text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header matching Screenshot: "详情" on the left, "X" on the right */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">详情</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation matching Screenshot:
            基本信息 | 取水工程/取水口 | 所属证照 | 故障记录 (2) | 停用启用 (3) | 检定记录 (23) | 换表记录 (1)
        */}
        <div className="flex items-center gap-6 px-6 border-b border-slate-200 bg-white text-xs font-medium overflow-x-auto select-none">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`py-3 relative cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'basic'
                ? 'text-blue-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            基本信息
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('project')}
            className={`py-3 relative cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'project'
                ? 'text-blue-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            取水工程/取水口
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('license')}
            className={`py-3 relative cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'license'
                ? 'text-blue-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            所属证照
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fault')}
            className={`py-3 relative cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'fault'
                ? 'text-blue-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            故障记录 (2)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('toggle')}
            className={`py-3 relative cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'toggle'
                ? 'text-blue-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            停用启用 (3)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('calibration')}
            className={`py-3 relative cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'calibration'
                ? 'text-blue-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            检定记录 (23)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('replace')}
            className={`py-3 relative cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'replace'
                ? 'text-blue-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            换表记录 (1)
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 text-xs custom-scrollbar">
          
          {/* TAB 1: 基本信息 (Exactly matching screenshot grid & orange labels) */}
          {activeTab === 'basic' && (
            <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
              <table className="w-full border-collapse text-xs">
                <tbody>
                  {/* Row 1 */}
                  <tr className="border-b border-slate-200">
                    <td className="w-36 bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      行政区划
                    </td>
                    <td className="w-[35%] px-4 py-2.5 text-slate-900 border-r border-slate-200">
                      {districtStr}
                    </td>
                    <td className="w-36 bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      取水权人
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      {facility.waterOwner || '这里距是去水权人'}
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      关联证照
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 font-mono border-r border-slate-200">
                      {facility.permitNumber || 'D4322252511115515'}
                    </td>
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      取水口
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      取水工程名称取水口#1/XSM34225525232
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      计量设施(器具)编号
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 font-mono border-r border-slate-200">
                      {facility.code || '630000JL00701'}
                    </td>
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      监测站名称
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      {facility.name || '计量设施名称'}
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      监测点编码
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 font-mono border-r border-slate-200">
                      {facility.monitorPointCode || '63000000701'}
                    </td>
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      计量设施名称
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      {facility.name || '计量设施名称'}
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      传输方式
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">
                      在线
                    </td>
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      上报方式
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      <div className="flex items-center justify-between">
                        <span>接口上传</span>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </div>
                    </td>
                  </tr>

                  {/* Row 6 */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      计量方式
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">
                      管道计量/外夹式流量计
                    </td>
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      计量器具类型
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      {facility.facilityType || '超声波流量计'}
                    </td>
                  </tr>

                  {/* Row 7: Orange highlight labels */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-amber-600 px-4 py-2.5 font-medium border-r border-slate-200">
                      管径大小
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">
                      DN&gt;300
                    </td>
                    <td className="bg-slate-50 text-amber-600 px-4 py-2.5 font-medium border-r border-slate-200">
                      安装形式
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      管段式
                    </td>
                  </tr>

                  {/* Row 8 */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      日最大取水量
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">
                      200m3
                    </td>
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      一次性计量纲
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      时段累计水量
                    </td>
                  </tr>

                  {/* Row 9 */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      规格型号
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 font-mono border-r border-slate-200">
                      {facility.specModel || 'CLD220'}
                    </td>
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      测量范围
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      1~100m3/s
                    </td>
                  </tr>

                  {/* Row 10 */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      安装类型
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">
                      取水口
                    </td>
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      安装位置
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      {facility.address || '青海省西宁市大通县*********'}
                    </td>
                  </tr>

                  {/* Row 11 */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      水源类型
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">
                      {facility.waterSourceType || '地表水'}
                    </td>
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      经纬度
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 font-mono">
                      123.232323, 1.234432
                    </td>
                  </tr>

                  {/* Row 12: 取水用途 & 安装时间 [地图按钮] */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      取水用途
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">
                      <span className="underline cursor-pointer text-slate-800 hover:text-blue-600">
                        {facility.waterUsage || '一般工业'}
                      </span>
                    </td>
                    <td className="bg-slate-50 text-slate-700 px-4 py-2.5 font-normal border-r border-slate-200">
                      安装时间
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      <div className="flex items-center justify-between">
                        <span>2026-09-2</span>
                        <button
                          type="button"
                          onClick={() => setShowMapModal(true)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium cursor-pointer shadow-xs transition"
                        >
                          地图
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 13: Orange highlight labels */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-amber-600 px-4 py-2.5 font-medium border-r border-slate-200">
                      中央资金年份
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">
                      {facility.fundingYear || '2026'}
                    </td>
                    <td className="bg-slate-50 text-amber-600 px-4 py-2.5 font-medium border-r border-slate-200">
                      数据来源类型
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      {facility.fundingSource || '中央发展基金'}
                    </td>
                  </tr>

                  {/* Row 14: Orange highlight labels */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-amber-600 px-4 py-2.5 font-medium border-r border-slate-200">
                      运维单位
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">
                      水务承建单位公司
                    </td>
                    <td className="bg-slate-50 text-amber-600 px-4 py-2.5 font-medium border-r border-slate-200">
                      管理单位
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      大通县水利局
                    </td>
                  </tr>

                  {/* Row 15: Orange highlight labels */}
                  <tr className="border-b border-slate-200">
                    <td className="bg-slate-50 text-amber-600 px-4 py-2.5 font-medium border-r border-slate-200">
                      运维截止日期
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">
                      2026-09-2
                    </td>
                    <td className="bg-slate-50 text-amber-600 px-4 py-2.5 font-medium border-r border-slate-200">
                      承建单位
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      水务承建单位公司
                    </td>
                  </tr>

                  {/* Row 16: Orange highlight labels */}
                  <tr>
                    <td className="bg-slate-50 text-amber-600 px-4 py-2.5 font-medium border-r border-slate-200">
                      最新检定时间
                    </td>
                    <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">
                      {facility.lastCalibrationTime || '2027-08-01'}
                    </td>
                    <td className="bg-slate-50 text-amber-600 px-4 py-2.5 font-medium border-r border-slate-200">
                      下次检定日期
                    </td>
                    <td className="px-4 py-2.5 text-slate-900">
                      2027-08-01
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: 取水工程/取水口 */}
          {activeTab === 'project' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
                <table className="w-full border-collapse text-xs">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="w-36 bg-slate-50 text-slate-700 px-4 py-2.5 border-r border-slate-200">取水工程名称</td>
                      <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">大通宝库河引水自流骨干工程</td>
                      <td className="w-36 bg-slate-50 text-slate-700 px-4 py-2.5 border-r border-slate-200">工程等别</td>
                      <td className="px-4 py-2.5 text-slate-900">Ⅱ等大型工程</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="bg-slate-50 text-slate-700 px-4 py-2.5 border-r border-slate-200">取水地点编码</td>
                      <td className="px-4 py-2.5 text-slate-900 font-mono border-r border-slate-200">XSM34225525232</td>
                      <td className="bg-slate-50 text-slate-700 px-4 py-2.5 border-r border-slate-200">取水方式</td>
                      <td className="px-4 py-2.5 text-slate-900">自流引水/管道泵送</td>
                    </tr>
                    <tr>
                      <td className="bg-slate-50 text-slate-700 px-4 py-2.5 border-r border-slate-200">许可年取水量</td>
                      <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200 font-semibold text-blue-700">73.0 万m³/年</td>
                      <td className="bg-slate-50 text-slate-700 px-4 py-2.5 border-r border-slate-200">核准最大流量</td>
                      <td className="px-4 py-2.5 text-slate-900">0.08 m³/s</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: 所属证照 */}
          {activeTab === 'license' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
                <table className="w-full border-collapse text-xs">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="w-36 bg-slate-50 text-slate-700 px-4 py-2.5 border-r border-slate-200">取水许可证号</td>
                      <td className="px-4 py-2.5 text-slate-900 font-mono font-medium border-r border-slate-200">
                        {facility.permitNumber || 'D4322252511115515'}
                      </td>
                      <td className="w-36 bg-slate-50 text-slate-700 px-4 py-2.5 border-r border-slate-200">发证机关</td>
                      <td className="px-4 py-2.5 text-slate-900">西宁市水务局行政审批处</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="bg-slate-50 text-slate-700 px-4 py-2.5 border-r border-slate-200">有效起始日</td>
                      <td className="px-4 py-2.5 text-slate-900 border-r border-slate-200">2022-01-01</td>
                      <td className="bg-slate-50 text-slate-700 px-4 py-2.5 border-r border-slate-200">有效截止日</td>
                      <td className="px-4 py-2.5 text-slate-900 font-medium text-emerald-700">2027-12-31 (正常有效)</td>
                    </tr>
                    <tr>
                      <td className="bg-slate-50 text-slate-700 px-4 py-2.5 border-r border-slate-200">信用代码</td>
                      <td className="px-4 py-2.5 text-slate-900 font-mono border-r border-slate-200">91630000710502882M</td>
                      <td className="bg-slate-50 text-slate-700 px-4 py-2.5 border-r border-slate-200">电子证照核验</td>
                      <td className="px-4 py-2.5 text-emerald-600 font-medium">国密验签有效 · 电子印章已签署</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: 故障记录 (2) */}
          {activeTab === 'fault' && (
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                    <tr>
                      <th className="px-4 py-2.5">故障编号</th>
                      <th className="px-4 py-2.5">上报时间</th>
                      <th className="px-4 py-2.5">故障现象</th>
                      <th className="px-4 py-2.5">处理状态</th>
                      <th className="px-4 py-2.5">恢复时间</th>
                      <th className="px-4 py-2.5">处理人</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-mono text-slate-900">FLT-20260715-01</td>
                      <td className="px-4 py-2.5 text-slate-600">2026-07-15 08:30</td>
                      <td className="px-4 py-2.5 text-slate-800">4G DTU无线通信模组离线</td>
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                          已修复
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">2026-07-15 14:10</td>
                      <td className="px-4 py-2.5 text-slate-700">水务运维专员(李工)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-mono text-slate-900">FLT-20260210-03</td>
                      <td className="px-4 py-2.5 text-slate-600">2026-02-10 16:20</td>
                      <td className="px-4 py-2.5 text-slate-800">冬季管道超声探头结霜瞬时读数跳变</td>
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                          已修复
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">2026-02-11 10:05</td>
                      <td className="px-4 py-2.5 text-slate-700">承建单位现场站长</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: 停用启用 (3) */}
          {activeTab === 'toggle' && (
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                    <tr>
                      <th className="px-4 py-2.5">操作类型</th>
                      <th className="px-4 py-2.5">变更前状态</th>
                      <th className="px-4 py-2.5">变更后状态</th>
                      <th className="px-4 py-2.5">操作时间</th>
                      <th className="px-4 py-2.5">申请事由</th>
                      <th className="px-4 py-2.5">审核人/操作人</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {facility.disableReason && (
                      <tr className="hover:bg-amber-50/50 bg-amber-50/20">
                        <td className="px-4 py-2.5">
                          <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                            <PowerOff className="w-3.5 h-3.5" />
                            申报停用
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-emerald-600">正常</td>
                        <td className="px-4 py-2.5 text-slate-500 font-medium">停用</td>
                        <td className="px-4 py-2.5 text-slate-600">{facility.disableTime || '2026-09-01'}</td>
                        <td className="px-4 py-2.5 text-slate-700 font-medium">
                          {facility.disableReason}
                          {facility.disableMaterial && (
                            <span className="ml-2 text-xs text-blue-600 underline cursor-pointer">
                              [{facility.disableMaterial}]
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-slate-700">西宁市水务局(管理员)</td>
                      </tr>
                    )}
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                          <Power className="w-3.5 h-3.5" />
                          系统启用
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-500">停用</td>
                      <td className="px-4 py-2.5 text-emerald-600 font-medium">正常</td>
                      <td className="px-4 py-2.5 text-slate-600">2026-08-01 09:00</td>
                      <td className="px-4 py-2.5 text-slate-700">防汛备用水源年度例行启用</td>
                      <td className="px-4 py-2.5 text-slate-700">西宁市水务局(管理员)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                          <PowerOff className="w-3.5 h-3.5" />
                          计划停用
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-emerald-600">正常</td>
                      <td className="px-4 py-2.5 text-slate-500 font-medium">停用</td>
                      <td className="px-4 py-2.5 text-slate-600">2026-03-01 17:30</td>
                      <td className="px-4 py-2.5 text-slate-700">灌区非灌溉期计量管道排空防冻保养</td>
                      <td className="px-4 py-2.5 text-slate-700">大通县水利局审批员</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                          <Power className="w-3.5 h-3.5" />
                          初始启用
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-500">新建未激活</td>
                      <td className="px-4 py-2.5 text-emerald-600 font-medium">正常</td>
                      <td className="px-4 py-2.5 text-slate-600">2025-09-02 10:00</td>
                      <td className="px-4 py-2.5 text-slate-700">中央资金计量设施竣工验收通水投运</td>
                      <td className="px-4 py-2.5 text-slate-700">工程项目验收组</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: 检定记录 (23) */}
          {activeTab === 'calibration' && (
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                    <tr>
                      <th className="px-4 py-2.5">证书编号</th>
                      <th className="px-4 py-2.5">检定机构</th>
                      <th className="px-4 py-2.5">检定日期</th>
                      <th className="px-4 py-2.5">检定结论</th>
                      <th className="px-4 py-2.5">有效截止日期</th>
                      <th className="px-4 py-2.5">检定证书</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-mono text-slate-900">QHJ-2026-08192</td>
                      <td className="px-4 py-2.5 text-slate-800">青海省计量检定测试院</td>
                      <td className="px-4 py-2.5 text-slate-600">2026-08-01</td>
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[11px]">
                          合格 (误差 +0.28%)
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-medium text-slate-800">2027-08-01</td>
                      <td className="px-4 py-2.5">
                        <span className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          查看PDF
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-mono text-slate-900">QHJ-2025-07411</td>
                      <td className="px-4 py-2.5 text-slate-800">青海省计量检定测试院</td>
                      <td className="px-4 py-2.5 text-slate-600">2025-08-03</td>
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[11px]">
                          合格 (误差 -0.15%)
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-medium text-slate-800">2026-08-03</td>
                      <td className="px-4 py-2.5">
                        <span className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          查看PDF
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-mono text-slate-900">QHJ-2024-06920</td>
                      <td className="px-4 py-2.5 text-slate-800">国家大流量计量分中心</td>
                      <td className="px-4 py-2.5 text-slate-600">2024-08-05</td>
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[11px]">
                          合格 (误差 +0.12%)
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-medium text-slate-800">2025-08-05</td>
                      <td className="px-4 py-2.5">
                        <span className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          查看PDF
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: 换表记录 (1) */}
          {activeTab === 'replace' && (
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                    <tr>
                      <th className="px-4 py-2.5">换表工单</th>
                      <th className="px-4 py-2.5">原表具编号/底数</th>
                      <th className="px-4 py-2.5">新表具编号/初始数</th>
                      <th className="px-4 py-2.5">更换时间</th>
                      <th className="px-4 py-2.5">更换原因</th>
                      <th className="px-4 py-2.5">施工单位及签字</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-mono text-slate-900">REP-20250918-01</td>
                      <td className="px-4 py-2.5 text-slate-700">
                        <p className="font-mono">630000JL00210</p>
                        <p className="text-[11px] text-slate-500">终止底数: 84,200.5 m³</p>
                      </td>
                      <td className="px-4 py-2.5 text-slate-900 font-semibold">
                        <p className="font-mono">{facility.code || '630000JL00701'}</p>
                        <p className="text-[11px] text-emerald-600">初始读数: 0.0 m³</p>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">2025-09-18 11:30</td>
                      <td className="px-4 py-2.5 text-slate-800">老旧电磁流量计升级为超声波高精计量表</td>
                      <td className="px-4 py-2.5 text-slate-700">青海水务工程有限公司 · 王工 (已签章)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom (Light background) */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">西宁市取用水与计量监管平台 · 档案详情</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-semibold transition cursor-pointer"
          >
            关闭
          </button>
        </div>

      </div>

      {/* Embedded Map Popup when user clicks [地图] */}
      {showMapModal && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          onClick={() => setShowMapModal(false)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                取水设施 GIS 空间定位
              </span>
              <button 
                type="button" 
                onClick={() => setShowMapModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="h-56 bg-slate-100 rounded-lg border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center">
                {/* Visual Map Mock */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="mt-1 px-2 py-0.5 bg-blue-900/80 text-white text-[10px] rounded shadow backdrop-blur-xs">
                    {facility.name}
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <p><span className="text-slate-400">经纬坐标：</span>123.232323° E, 1.234432° N</p>
                <p><span className="text-slate-400">地理位置：</span>{facility.address || '青海省西宁市大通县*********'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
