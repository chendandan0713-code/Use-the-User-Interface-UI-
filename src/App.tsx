import React, { useState, useMemo } from 'react';
import { 
  PlatformType, 
  SubTabType, 
  MesTabType, 
  WaterFacility, 
  WaterFilterParams, 
  FaultRecord,
  FaultFilterParams,
  WorkOrder, 
  MesFilterParams, 
  ToastMessage 
} from './types';
import { 
  initialDistricts, 
  initialFacilities, 
  initialWorkOrders 
} from './mockData';
import { initialFaultRecords } from './mockFaultData';
import { Navbar } from './components/Navbar';
import { WaterSidebar } from './components/WaterPlatform/WaterSidebar';
import { WaterDistrictTree } from './components/WaterPlatform/WaterDistrictTree';
import { WaterBreadcrumbBar } from './components/WaterPlatform/WaterBreadcrumbBar';
import { WaterFilterBar } from './components/WaterPlatform/WaterFilterBar';
import { WaterFacilityTable } from './components/WaterPlatform/WaterFacilityTable';
import { WaterFacilityModal } from './components/WaterPlatform/WaterFacilityModal';
import { WaterDetailDrawer } from './components/WaterPlatform/WaterDetailDrawer';
import { WaterOperationModal } from './components/WaterPlatform/WaterOperationModal';
import { WaterDisableModal } from './components/WaterPlatform/WaterDisableModal';
import { FaultFilterBar } from './components/WaterPlatform/FaultFilterBar';
import { FaultRecordTable } from './components/WaterPlatform/FaultRecordTable';
import { FaultWorkflowModal } from './components/WaterPlatform/FaultWorkflowModal';
import { FaultMediaPreviewModal } from './components/WaterPlatform/FaultMediaPreviewModal';
import { FaultApplyModal } from './components/WaterPlatform/FaultApplyModal';
import { MesHeaderTabs } from './components/MesPlatform/MesHeaderTabs';
import { MesFilterBar } from './components/MesPlatform/MesFilterBar';
import { MesWorkOrderTable } from './components/MesPlatform/MesWorkOrderTable';
import { MesScannerModal } from './components/MesPlatform/MesScannerModal';
import { MesAddOrderModal } from './components/MesPlatform/MesAddOrderModal';
import { MesOrderDetailDrawer } from './components/MesPlatform/MesOrderDetailDrawer';
import { MesColumnSettingModal } from './components/MesPlatform/MesColumnSettingModal';
import { ToastContainer } from './components/Common/ToastContainer';
import { ConfirmModal } from './components/Common/ConfirmModal';
import { AdminLoginPage } from './components/Auth/AdminLoginPage';
import { 
  Droplets, 
  Factory, 
  Download, 
  FileSpreadsheet, 
  BarChart3, 
  TrendingUp,
  Boxes,
  Zap,
  LogIn
} from 'lucide-react';

export default function App() {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentUserRole, setCurrentUserRole] = useState<string>('管理员(88018)');

  // Global Platform Navigation
  const [currentPlatform, setCurrentPlatform] = useState<PlatformType>('water');
  const [subTab, setSubTab] = useState<SubTabType>('admin_client');
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  // Toast Notification System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    title: string,
    message?: string,
    type: 'success' | 'warning' | 'error' | 'info' = 'success'
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --------------------------------------------------------------------------
  // WATER PLATFORM STATE
  // --------------------------------------------------------------------------
  const [facilities, setFacilities] = useState<WaterFacility[]>(initialFacilities);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('西宁市');
  const [activeWaterMenu, setActiveWaterMenu] = useState<string>('facility_management');
  const [waterSelectedIds, setWaterSelectedIds] = useState<string[]>([]);
  const [waterCurrentPage, setWaterCurrentPage] = useState(1);
  const [waterPageSize, setWaterPageSize] = useState(20);

  const initialWaterFilterState: WaterFilterParams = {
    queryMode: 'water_address',
    facilityCode: '',
    facilityName: '',
    waterOwner: '',
    permitNumber: '',
    waterSourceType: '',
    dataSource: '',
    monitorPointCode: '',
    waterUsage: '',
    meteringMethod: '',
    transmissionMethod: '',
    isArchived: '',
    status: '',
    includeChildren: true,
    selectedDistrict: '西宁市',
  };

  const [waterFilters, setWaterFilters] = useState<WaterFilterParams>(initialWaterFilterState);

  // Water Modals
  const [waterFacilityModalOpen, setWaterFacilityModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<WaterFacility | null>(null);
  const [viewingFacility, setViewingFacility] = useState<WaterFacility | null>(null);
  const [waterDrawerOpen, setWaterDrawerOpen] = useState(false);
  const [waterDisableModalOpen, setWaterDisableModalOpen] = useState(false);
  const [disablingFacility, setDisablingFacility] = useState<WaterFacility | null>(null);
  const [waterOperationModal, setWaterOperationModal] = useState<{
    isOpen: boolean;
    type: 'setting' | 'logs';
    facility: WaterFacility | null;
  }>({ isOpen: false, type: 'setting', facility: null });

  // Confirmation modal state
  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    type?: 'danger' | 'warning' | 'primary';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Filtered Water Facilities
  const filteredFacilities = useMemo(() => {
    return facilities.filter((item) => {
      // District filter
      if (
        selectedDistrict !== '西宁市' &&
        item.district !== selectedDistrict &&
        !waterFilters.includeChildren
      ) {
        return false;
      }
      // Global top search
      if (globalSearchTerm.trim()) {
        const term = globalSearchTerm.toLowerCase().trim();
        const match =
          item.name.toLowerCase().includes(term) ||
          item.code.toLowerCase().includes(term) ||
          item.district.toLowerCase().includes(term) ||
          (item.waterOwner && item.waterOwner.toLowerCase().includes(term));
        if (!match) return false;
      }
      // Form filters
      if (waterFilters.facilityCode && !item.code.includes(waterFilters.facilityCode.trim())) {
        return false;
      }
      if (waterFilters.facilityName && !item.name.includes(waterFilters.facilityName.trim())) {
        return false;
      }
      if (waterFilters.waterOwner && (!item.waterOwner || !item.waterOwner.includes(waterFilters.waterOwner.trim()))) {
        return false;
      }
      if (waterFilters.permitNumber && (!item.permitNumber || !item.permitNumber.includes(waterFilters.permitNumber.trim()))) {
        return false;
      }
      if (waterFilters.waterSourceType && item.waterSourceType !== waterFilters.waterSourceType) {
        return false;
      }
      if (waterFilters.dataSource && item.dataSource !== waterFilters.dataSource) {
        return false;
      }
      if (waterFilters.monitorPointCode && (!item.monitorPointCode || !item.monitorPointCode.includes(waterFilters.monitorPointCode.trim()))) {
        return false;
      }
      if (waterFilters.waterUsage && item.waterUsage !== waterFilters.waterUsage) {
        return false;
      }
      if (waterFilters.meteringMethod && item.meteringMethod !== waterFilters.meteringMethod) {
        return false;
      }
      if (waterFilters.transmissionMethod && item.transmissionMethod !== waterFilters.transmissionMethod) {
        return false;
      }
      if (waterFilters.isArchived) {
        const targetBool = waterFilters.isArchived === 'true';
        if (item.isArchived !== targetBool) return false;
      }
      if (waterFilters.status && item.status !== waterFilters.status) {
        return false;
      }
      return true;
    });
  }, [facilities, selectedDistrict, globalSearchTerm, waterFilters]);

  // --------------------------------------------------------------------------
  // FAULT RECORDS STATE (故障记录)
  // --------------------------------------------------------------------------
  const [faultRecords, setFaultRecords] = useState<FaultRecord[]>(initialFaultRecords);
  const initialFaultFilterState: FaultFilterParams = {
    facilityName: '',
    permitNumberOrOwner: '',
    dateRange: '',
    status: '全部',
    selectedDistrict: '西宁市',
  };
  const [faultFilters, setFaultFilters] = useState<FaultFilterParams>(initialFaultFilterState);

  // Fault Modals
  const [faultApplyModalOpen, setFaultApplyModalOpen] = useState(false);
  const [editingFaultRecord, setEditingFaultRecord] = useState<FaultRecord | null>(null);
  const [workflowModalState, setWorkflowModalState] = useState<{
    isOpen: boolean;
    record: FaultRecord | null;
  }>({ isOpen: false, record: null });
  const [mediaModalState, setMediaModalState] = useState<{
    isOpen: boolean;
    title: string;
    files: string[];
    description?: string;
  }>({ isOpen: false, title: '', files: [], description: '' });

  // Filtered Fault Records
  const filteredFaultRecords = useMemo(() => {
    return faultRecords.filter((item) => {
      // District filter
      if (selectedDistrict !== '西宁市' && item.district !== selectedDistrict) {
        return false;
      }
      // Global search
      if (globalSearchTerm.trim()) {
        const term = globalSearchTerm.toLowerCase().trim();
        const match =
          item.facilityName.toLowerCase().includes(term) ||
          item.facilityCode.toLowerCase().includes(term) ||
          (item.waterOwner && item.waterOwner.toLowerCase().includes(term)) ||
          (item.permitNumber && item.permitNumber.toLowerCase().includes(term)) ||
          item.reporter.toLowerCase().includes(term) ||
          (item.handler && item.handler.toLowerCase().includes(term));
        if (!match) return false;
      }
      // Form filters
      if (faultFilters.facilityName && !item.facilityName.includes(faultFilters.facilityName.trim())) {
        return false;
      }
      if (faultFilters.permitNumberOrOwner) {
        const q = faultFilters.permitNumberOrOwner.trim();
        const matchPermit = item.permitNumber && item.permitNumber.includes(q);
        const matchOwner = item.waterOwner && item.waterOwner.includes(q);
        if (!matchPermit && !matchOwner) return false;
      }
      if (faultFilters.dateRange && !item.faultTime.includes(faultFilters.dateRange.trim())) {
        return false;
      }
      if (faultFilters.status && faultFilters.status !== '全部' && item.status !== faultFilters.status) {
        return false;
      }
      return true;
    });
  }, [faultRecords, selectedDistrict, globalSearchTerm, faultFilters]);

  // Fault Actions
  const handleFaultSearch = () => {
    addToast('已完成故障记录检索', `共查询到 ${filteredFaultRecords.length} 条记录`, 'success');
  };

  const handleFaultReset = () => {
    setFaultFilters(initialFaultFilterState);
    setSelectedDistrict('西宁市');
    setGlobalSearchTerm('');
    addToast('故障检索条件已重置', '', 'info');
  };

  const handleOpenApplyFault = () => {
    setEditingFaultRecord(null);
    setFaultApplyModalOpen(true);
  };

  const handleEditRejectedFault = (record: FaultRecord) => {
    setEditingFaultRecord(record);
    setFaultApplyModalOpen(true);
  };

  const handleSaveFaultRecord = (data: Partial<FaultRecord>, isResubmit: boolean) => {
    if (isResubmit && editingFaultRecord) {
      setFaultRecords((prev) =>
        prev.map((r) =>
          r.id === editingFaultRecord.id
            ? {
                ...r,
                ...data,
                status: '故障待审',
                canReapply: false,
                auditLogs: [
                  ...(r.auditLogs || []),
                  {
                    stage: '重新上报',
                    time: new Date().toLocaleString('zh-CN'),
                    operator: data.reporter || '当前用户',
                    result: '提交',
                    remark: '修改申报材料并重新发起故障审核',
                  },
                ],
              }
            : r
        )
      );
      addToast('故障申报材料已重新提交', `【${data.facilityName}】已重新进入待审核序列`, 'success');
    } else {
      const newRecord: FaultRecord = {
        id: `flt-${Date.now().toString().slice(-4)}`,
        waterOwner: data.waterOwner || '湟中永兴种养殖专业合作社',
        permitNumber: data.permitNumber || 'D632524S2021-0017',
        facilityName: data.facilityName || '新建故障申报设施',
        facilityCode: data.facilityCode || '241017001024',
        faultWaterMeterReading: data.faultWaterMeterReading || '12345',
        faultDesc: data.faultDesc || '现场申报设备故障',
        faultImages: data.faultImages?.length ? data.faultImages : ['现场水表故障照片.jpg'],
        reporter: data.reporter || '当前用户',
        faultTime: data.faultTime || new Date().toISOString().split('T')[0],
        resolvedWaterMeterReading: '-',
        resolvedDesc: '-',
        resolvedFiles: [],
        handler: '-',
        handleTime: '-',
        status: '故障待审',
        district: data.district || selectedDistrict || '湟中区',
        canReapply: false,
        auditLogs: [
          {
            stage: '故障上报',
            time: new Date().toLocaleString('zh-CN'),
            operator: data.reporter || '当前用户',
            result: '提交',
            remark: '新建故障上报申请已提交',
          },
          {
            stage: '水务初审',
            time: new Date().toLocaleString('zh-CN'),
            operator: '系统自动派单',
            result: '处理中',
            remark: '已进入区县水务部门初审池',
          },
        ],
      };
      setFaultRecords((prev) => [newRecord, ...prev]);
      addToast('故障申报提交成功', `【${newRecord.facilityName}】故障记录已生成并待审`, 'success');
    }
  };

  const handleViewFaultProgress = (record: FaultRecord) => {
    setWorkflowModalState({ isOpen: true, record });
  };

  const handleViewFaultMedia = (title: string, files: string[], description?: string) => {
    setMediaModalState({ isOpen: true, title, files, description });
  };

  const handleAuditApprove = (record: FaultRecord) => {
    setFaultRecords((prev) =>
      prev.map((r) =>
        r.id === record.id
          ? {
              ...r,
              status: '故障中',
              auditLogs: [
                ...(r.auditLogs || []),
                {
                  stage: '故障审核',
                  time: new Date().toLocaleString('zh-CN'),
                  operator: '市水务审核中心',
                  result: '通过',
                  remark: '审核通过，已批准设备进入故障维保期',
                },
              ],
            }
          : r
      )
    );
    setWorkflowModalState({ isOpen: false, record: null });
    addToast('故障申请审核已通过', `【${record.facilityName}】进入故障维保阶段`, 'success');
  };

  const handleAuditReject = (record: FaultRecord, reason: string) => {
    setFaultRecords((prev) =>
      prev.map((r) =>
        r.id === record.id
          ? {
              ...r,
              status: '故障驳回',
              canReapply: true,
              auditLogs: [
                ...(r.auditLogs || []),
                {
                  stage: '故障审核',
                  time: new Date().toLocaleString('zh-CN'),
                  operator: '市水务审核中心',
                  result: '驳回',
                  remark: `驳回原因：${reason}`,
                },
              ],
            }
          : r
      )
    );
    setWorkflowModalState({ isOpen: false, record: null });
    addToast('已驳回该故障申请', `已通知上报人重新补充材料`, 'warning');
  };

  // Water Actions
  const handleWaterSearch = () => {
    addToast('已完成取水计量设施检索', `共查询到 ${filteredFacilities.length} 条记录`, 'success');
  };

  const handleWaterReset = () => {
    setWaterFilters(initialWaterFilterState);
    setSelectedDistrict('西宁市');
    setGlobalSearchTerm('');
    addToast('查询条件已重置为默认值', '', 'info');
  };

  const handleWaterClear = () => {
    setWaterFilters({
      queryMode: 'water_address',
      facilityCode: '',
      facilityName: '',
      waterOwner: '',
      permitNumber: '',
      waterSourceType: '',
      dataSource: '',
      monitorPointCode: '',
      waterUsage: '',
      meteringMethod: '',
      transmissionMethod: '',
      isArchived: '',
      status: '',
      includeChildren: true,
      selectedDistrict: '西宁市',
    });
    addToast('筛选表单已全部清空', '', 'info');
  };

  const handleOpenAddFacility = () => {
    setEditingFacility(null);
    setWaterFacilityModalOpen(true);
  };

  const handleEditFacility = (facility: WaterFacility) => {
    setEditingFacility(facility);
    setWaterFacilityModalOpen(true);
  };

  const handleSaveFacility = (data: Partial<WaterFacility>) => {
    if (editingFacility) {
      setFacilities((prev) =>
        prev.map((f) => (f.id === editingFacility.id ? ({ ...f, ...data } as WaterFacility) : f))
      );
      addToast('计量设施档案更新成功', `【${data.name}】信息已同步`, 'success');
    } else {
      const newFacility: WaterFacility = {
        id: `fac-${Date.now()}`,
        name: data.name || '新建计量设施',
        code: data.code || '632524JL00999',
        status: data.status || '正常',
        reportMethod: data.reportMethod || '在线',
        transmissionMethod: data.transmissionMethod || '在线',
        waterSourceType: data.waterSourceType || '地表水',
        fundingSource: data.fundingSource || '中央发展基金',
        fundingYear: data.fundingYear || '2026',
        specModel: data.specModel || 'DN100',
        facilityType: data.facilityType || '电磁水表',
        isArchived: data.isArchived ?? true,
        lastReportTime: data.lastReportTime || '2026-09-01',
        lastCalibrationTime: data.lastCalibrationTime || '2026-09-01',
        calibrationExpiryDate: data.calibrationExpiryDate || '2027-08-31',
        isReportedToNational: data.isReportedToNational ?? true,
        district: data.district || '城东区',
        waterOwner: data.waterOwner || '西宁市取水户',
        permitNumber: data.permitNumber || '取水（青宁）字[2026]第0001号',
        monitorPointCode: data.monitorPointCode || 'MP-630101-001',
        waterUsage: data.waterUsage || '生活饮用',
        meteringMethod: data.meteringMethod || '电磁流量计',
        dataSource: data.dataSource || '物联网RTU遥测',
        address: data.address || '青海省西宁市辖区',
        flowRate: data.flowRate ?? 15.0,
        accumulatedFlow: data.accumulatedFlow ?? 5000.0,
        batteryLevel: 95,
        signalStrength: 90,
      };
      setFacilities((prev) => [newFacility, ...prev]);
      addToast('新建计量设施录入成功', `器具编号: ${newFacility.code}`, 'success');
    }
    setWaterFacilityModalOpen(false);
  };

  const handleOpenDisableModal = (facility: WaterFacility) => {
    if (facility.status === '停用') {
      addToast(`该设施当前已处于【停用】状态`, `编号: ${facility.code}`, 'info');
      return;
    }
    setDisablingFacility(facility);
    setWaterDisableModalOpen(true);
  };

  const handleConfirmDisable = (facility: WaterFacility, disableReason: string, fileName?: string) => {
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === facility.id
          ? {
              ...f,
              status: '停用',
              disableReason,
              disableMaterial: fileName || '停用申请及审批表.pdf',
              disableTime: new Date().toISOString().split('T')[0],
            }
          : f
      )
    );
    setWaterDisableModalOpen(false);
    setDisablingFacility(null);
    addToast(
      '计量设施已成功停用',
      `【${facility.name}】停用原因已归档: ${disableReason.substring(0, 20)}${disableReason.length > 20 ? '...' : ''}`,
      'warning'
    );
  };

  const handleToggleFacilityStatus = (facility: WaterFacility, targetStatus?: '正常' | '停用') => {
    const newStatus = targetStatus || (facility.status === '停用' ? '正常' : '停用');
    if (facility.status === newStatus) {
      addToast(`该设施当前已处于【${newStatus}】状态`, `编号: ${facility.code}`, 'info');
      return;
    }
    if (newStatus === '停用') {
      handleOpenDisableModal(facility);
      return;
    }
    setConfirmModalState({
      isOpen: true,
      title: `启用计量设施确认`,
      message: `确定要将【${facility.name}】(${facility.code}) 的状态变更为【启用(正常)】吗？启用后将恢复流量遥测与上报。`,
      type: 'primary',
      confirmText: `确认启用`,
      onConfirm: () => {
        setFacilities((prev) =>
          prev.map((f) => (f.id === facility.id ? { ...f, status: '正常' } : f))
        );
        addToast(`已成功启用设施`, `【${facility.name}】状态已变更为【正常】`, 'success');
      },
    });
  };

  const handleDeleteFacility = (facility: WaterFacility) => {
    setConfirmModalState({
      isOpen: true,
      title: '删除计量设施确认',
      message: `确定要删除计量设施【${facility.name}】(${facility.code}) 吗？此操作将注销该点位的监测档案及历史遥测索引，请谨慎操作。`,
      type: 'danger',
      confirmText: '确认删除',
      onConfirm: () => {
        setFacilities((prev) => prev.filter((f) => f.id !== facility.id));
        setWaterSelectedIds((prev) => prev.filter((id) => id !== facility.id));
        addToast('计量设施已成功删除', `【${facility.name}】已从台账中注销`, 'warning');
      },
    });
  };

  const handleExportWaterData = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [
        '设施名称,计量设施编号,使用状态,上报方式,数据传输方式,水源类型,建设来源,资金年份,规格型号,计量设施类型,档案是否完善,最新到报时间,最新检定时间,所属区县',
        ...filteredFacilities.map(
          (f) =>
            `"${f.name}","${f.code}","${f.status}","${f.reportMethod}","${f.transmissionMethod}","${f.waterSourceType}","${f.fundingSource}","${f.fundingYear}","${f.specModel}","${f.facilityType}","${f.isArchived ? '是' : '否'}","${f.lastReportTime}","${f.lastCalibrationTime}","${f.district}"`
        ),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `西宁市取用水计量设施台账_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('计量设施报表导出成功', `已下载 ${filteredFacilities.length} 条记录至本地 CSV 文件`, 'success');
  };

  // --------------------------------------------------------------------------
  // MES WORK ORDER PLATFORM STATE
  // --------------------------------------------------------------------------
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(initialWorkOrders);
  const [mesActiveTab, setMesActiveTab] = useState<MesTabType>('production_order');
  const [mesSelectedIds, setMesSelectedIds] = useState<string[]>([]);
  const [mesCurrentPage, setMesCurrentPage] = useState(1);
  const [mesPageSize, setMesPageSize] = useState(20);

  const initialMesFilterState: MesFilterParams = {
    orderCode: '',
    productName: '',
    partNumber: '',
    productionBatch: '',
    status: '',
    priority: '',
    productionPlan: '',
    relatedOrder: '',
    customerName: '',
    creator: '',
    materialGrade: '',
    createDateRange: '',
    planStartDate: '',
    planEndDate: '',
  };

  const [mesFilters, setMesFilters] = useState<MesFilterParams>(initialMesFilterState);

  // MES Modals
  const [mesAddModalOpen, setMesAddModalOpen] = useState(false);
  const [editingWorkOrder, setEditingWorkOrder] = useState<WorkOrder | null>(null);
  const [viewingWorkOrder, setViewingWorkOrder] = useState<WorkOrder | null>(null);
  const [mesDrawerOpen, setMesDrawerOpen] = useState(false);
  const [mesScannerOpen, setMesScannerOpen] = useState(false);
  const [mesColumnModalOpen, setMesColumnModalOpen] = useState(false);

  // Filtered Work Orders
  const filteredWorkOrders = useMemo(() => {
    return workOrders.filter((order) => {
      // Global search
      if (globalSearchTerm.trim()) {
        const term = globalSearchTerm.toLowerCase().trim();
        const match =
          order.orderCode.toLowerCase().includes(term) ||
          order.productName.toLowerCase().includes(term) ||
          order.productCode.toLowerCase().includes(term) ||
          order.productionBatch.toLowerCase().includes(term);
        if (!match) return false;
      }
      if (mesFilters.orderCode && !order.orderCode.toLowerCase().includes(mesFilters.orderCode.toLowerCase().trim())) {
        return false;
      }
      if (mesFilters.productName && !order.productName.includes(mesFilters.productName.trim())) {
        return false;
      }
      if (mesFilters.partNumber && !order.partNumber.includes(mesFilters.partNumber.trim())) {
        return false;
      }
      if (mesFilters.productionBatch && !order.productionBatch.includes(mesFilters.productionBatch.trim())) {
        return false;
      }
      if (mesFilters.status && order.status !== mesFilters.status) {
        return false;
      }
      if (mesFilters.priority && order.priority !== mesFilters.priority) {
        return false;
      }
      if (mesFilters.productionPlan && order.productionPlan !== mesFilters.productionPlan) {
        return false;
      }
      if (mesFilters.relatedOrder && !order.relatedOrder.includes(mesFilters.relatedOrder.trim())) {
        return false;
      }
      if (mesFilters.customerName && order.customerName !== mesFilters.customerName) {
        return false;
      }
      if (mesFilters.creator && order.creator !== mesFilters.creator) {
        return false;
      }
      if (mesFilters.materialGrade && !order.materialGrade.includes(mesFilters.materialGrade.trim())) {
        return false;
      }
      return true;
    });
  }, [workOrders, globalSearchTerm, mesFilters]);

  // MES Actions
  const handleMesReset = () => {
    setMesFilters(initialMesFilterState);
    setGlobalSearchTerm('');
    addToast('工单查询条件已重置', '', 'info');
  };

  const handleOpenAddWorkOrder = () => {
    setEditingWorkOrder(null);
    setMesAddModalOpen(true);
  };

  const handleEditWorkOrder = (order: WorkOrder) => {
    setEditingWorkOrder(order);
    setMesAddModalOpen(true);
  };

  const handleSaveWorkOrder = (data: Partial<WorkOrder>) => {
    if (editingWorkOrder) {
      setWorkOrders((prev) =>
        prev.map((o) => (o.id === editingWorkOrder.id ? ({ ...o, ...data } as WorkOrder) : o))
      );
      addToast('生产工单已保存修改', `工单【${data.orderCode}】更新成功`, 'success');
    } else {
      const newOrder: WorkOrder = {
        id: `wo-${Date.now()}`,
        orderCode: data.orderCode || `WO20260901-${Math.floor(100 + Math.random() * 900)}`,
        orderTag: data.orderTag || `TAG-XN-${Math.floor(8800 + Math.random() * 900)}`,
        productName: data.productName || '智能水表配件',
        productCode: data.productCode || 'PRD-XN-001',
        spec: data.spec || 'DN100 PN16',
        unit: data.unit || '台',
        materialGrade: data.materialGrade || '304不锈钢',
        partNumber: data.partNumber || 'DWG-2026-01',
        productionBatch: data.productionBatch || 'BAT-202609-01',
        type: data.type || '自制',
        productionPlan: data.productionPlan || 'PLN-2026Q3-09',
        customerName: data.customerName || '西宁市供水集团总公司',
        creator: data.creator || '管理员(88018)',
        relatedOrder: data.relatedOrder || 'SO-202608-0100',
        priority: data.priority || '中',
        status: data.status || '待排产',
        plannedQuantity: data.plannedQuantity || 100,
        completedQuantity: data.completedQuantity || 0,
        progress: data.progress || 0,
        createTime: '2026-09-01 10:00',
        planStartDate: data.planStartDate || '2026-09-02',
        planEndDate: data.planEndDate || '2026-09-10',
        workshop: data.workshop || '精密制造一车间',
        currentProcess: data.currentProcess || '下料与机加',
        operator: data.operator || '李永强',
      };
      setWorkOrders((prev) => [newOrder, ...prev]);
      addToast('新建生产工单创建成功', `工单编号: ${newOrder.orderCode}`, 'success');
    }
    setMesAddModalOpen(false);
  };

  const handleAssignWorkOrder = (order: WorkOrder) => {
    addToast('已下发派工任务', `工单 ${order.orderCode} 已派发至【${order.workshop}】`, 'success');
  };

  const handleReportWorkOrder = (order: WorkOrder) => {
    setWorkOrders((prev) =>
      prev.map((o) => {
        if (o.id === order.id) {
          const nextCompleted = Math.min(o.plannedQuantity, o.completedQuantity + 10);
          const nextProgress = Math.round((nextCompleted / o.plannedQuantity) * 100);
          const nextStatus = nextProgress >= 100 ? '已完工' : '生产中';
          return {
            ...o,
            completedQuantity: nextCompleted,
            progress: nextProgress,
            status: nextStatus,
          };
        }
        return o;
      })
    );
    addToast('已完成快捷报工 +10 件', `工单 ${order.orderCode} 进度已刷新`, 'success');
  };

  const handleScanResult = (code: string) => {
    setMesFilters((prev) => ({ ...prev, orderCode: code }));
    addToast('条码扫描识别成功', `已自动定位工单: ${code}`, 'success');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        <AdminLoginPage
          defaultPlatform={currentPlatform}
          onLoginSuccess={(role, platform) => {
            setIsLoggedIn(true);
            setCurrentUserRole(role);
            setCurrentPlatform(platform);
            addToast(`欢迎登录系统，${role}`, `已成功载入【${platform === 'water' ? '西宁市水资源监管平台' : 'MES智能制造工单系统'}】`, 'success');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans relative">
      
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Top Main Navigation */}
      <Navbar
        currentPlatform={currentPlatform}
        onPlatformChange={setCurrentPlatform}
        subTab={subTab}
        onSubTabChange={(tab) => {
          setSubTab(tab);
          if (tab === 'third_party') {
            setIsLoggedIn(false);
            addToast('已跳转至统一身份认证登录门户', '', 'info');
          } else {
            addToast(`已切换至【${tab === 'user_client' ? '取水户端' : '管理端'}】`, '', 'info');
          }
        }}
        searchTerm={globalSearchTerm}
        onSearchChange={setGlobalSearchTerm}
        onNotify={addToast}
        onLogout={() => {
          setIsLoggedIn(false);
          addToast('已安全退出管理系统', '会话状态已安全归档', 'info');
        }}
        currentUser={currentUserRole}
      />

      {/* Quick Floating Switch to Login Page for testing */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => {
            setIsLoggedIn(false);
            addToast('已切换至后台登录页面', '支持账号/短信/UKey及多角色快捷模拟', 'info');
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-lg border border-slate-700/80 backdrop-blur-md transition-all hover:scale-105"
        >
          <LogIn className="w-3.5 h-3.5 text-cyan-400" />
          <span>预览后台登录页</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ========================================================================= */}
        {/* VIEW 1: 西宁市取用水管理平台 (Image 1) */}
        {/* ========================================================================= */}
        {currentPlatform === 'water' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar Menu */}
            <WaterSidebar
              activeSubMenu={activeWaterMenu}
              onSubMenuChange={setActiveWaterMenu}
              onNotify={addToast}
            />

            {/* Right Container: Breadcrumb Bar on Top + Content Area Underneath */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-100/75">
              {/* 2、面包屑在行政区划和搜索的上面，用白色底框 */}
              <WaterBreadcrumbBar
                activeMenu={activeWaterMenu}
                selectedDistrict={selectedDistrict}
                totalFacilitiesCount={
                  activeWaterMenu === 'fault'
                    ? filteredFaultRecords.length
                    : filteredFacilities.length
                }
                onSelectMenu={setActiveWaterMenu}
                onSwitchPlatform={() => {
                  setCurrentPlatform('mes');
                  addToast('已切换至生产工单协同系统', '欢迎查阅表二 (生产工单与任务台账)', 'info');
                }}
              />

              {/* Main Content: 1、行政区划独立块 + 右侧搜索与数据台账 */}
              <div className="flex-1 flex overflow-hidden p-3 gap-3 min-w-0">
                {/* 1、行政区划的背景是单独的一个块 */}
                <WaterDistrictTree
                  districts={initialDistricts}
                  selectedDistrict={selectedDistrict}
                  onSelectDistrict={(dist) => {
                    setSelectedDistrict(dist);
                    setWaterFilters((prev) => ({ ...prev, selectedDistrict: dist }));
                    setFaultFilters((prev) => ({ ...prev, selectedDistrict: dist }));
                    addToast(`已筛选区县: ${dist}`, `当前区域台账已更新`, 'info');
                  }}
                />

                {/* Main Data & Query Area */}
                {activeWaterMenu === 'fault' ? (
                  <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 min-w-0">
                    {/* Fault Query & Filter Form */}
                    <FaultFilterBar
                      filterParams={faultFilters}
                      onFilterChange={setFaultFilters}
                      onSearch={handleFaultSearch}
                      onReset={handleFaultReset}
                      onOpenApplyModal={handleOpenApplyFault}
                    />

                    {/* Fault Data Table */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <FaultRecordTable
                        records={filteredFaultRecords}
                        onViewProgress={handleViewFaultProgress}
                        onViewMedia={handleViewFaultMedia}
                        onEditRejected={handleEditRejectedFault}
                      />
                    </div>
                  </main>
                ) : (
                  <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 min-w-0">
                    {/* Query & Filter Form */}
                    <WaterFilterBar
                      filterParams={waterFilters}
                      onFilterChange={setWaterFilters}
                      onSearch={handleWaterSearch}
                      onReset={handleWaterReset}
                      onClear={handleWaterClear}
                      onOpenAddModal={handleOpenAddFacility}
                      onExport={handleExportWaterData}
                    />

                    {/* Data Table */}
                    <div className="flex-1 min-w-0">
                      <WaterFacilityTable
                        facilities={filteredFacilities}
                        selectedIds={waterSelectedIds}
                        onToggleSelect={(id) => {
                          setWaterSelectedIds((prev) =>
                            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
                          );
                        }}
                        onToggleSelectAll={() => {
                          if (waterSelectedIds.length === filteredFacilities.length) {
                            setWaterSelectedIds([]);
                          } else {
                            setWaterSelectedIds(filteredFacilities.map((f) => f.id));
                          }
                        }}
                        onEdit={handleEditFacility}
                        onViewDetail={(facility) => {
                          setViewingFacility(facility);
                          setWaterDrawerOpen(true);
                        }}
                        onToggleStatus={handleToggleFacilityStatus}
                        onOpenDisableModal={handleOpenDisableModal}
                        onDelete={handleDeleteFacility}
                        onSetting={(facility) => {
                          setWaterOperationModal({ isOpen: true, type: 'setting', facility });
                        }}
                        onViewLogs={(facility) => {
                          setWaterOperationModal({ isOpen: true, type: 'logs', facility });
                        }}
                        onNotify={addToast}
                        currentPage={waterCurrentPage}
                        pageSize={waterPageSize}
                        totalCount={210}
                        onPageChange={setWaterCurrentPage}
                        onPageSizeChange={setWaterPageSize}
                      />
                    </div>
                  </main>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: 智能制造生产工单系统 (Image 2) */}
        {/* ========================================================================= */}
        {currentPlatform === 'mes' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/70">
            {/* Header Tabs: 首页, 工单信息, 生产工单, 生产任务, 报工记录, 委外工单, 委外任务 */}
            <MesHeaderTabs
              activeTab={mesActiveTab}
              onTabChange={setMesActiveTab}
              onNotify={addToast}
            />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 lg:p-5 custom-scrollbar flex flex-col min-w-0">
              
              {/* Header Title & Switch back */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">制造执行中心</span>
                  <span className="text-slate-300">/</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5 text-blue-600" />
                    生产工单管理与排产跟踪
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold ml-1">
                    当前展示: 智能水表与仪器仪表零部件加工
                  </span>
                </div>

                {/* Switch back button */}
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPlatform('water');
                    addToast('已切换至西宁市取用水管理平台', '欢迎查阅表一 (取水设施与计量监管台账)', 'info');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-blue-700 text-xs font-semibold border border-blue-200 shadow-xs hover:shadow transition"
                >
                  <Droplets className="w-3.5 h-3.5 text-blue-600" />
                  <span>← 返回第一张表: 西宁取用水计量监管</span>
                </button>
              </div>

              {/* MES Filter Bar with Barcode Scan Button */}
              <MesFilterBar
                filterParams={mesFilters}
                onFilterChange={setMesFilters}
                onReset={handleMesReset}
                onOpenAddModal={handleOpenAddWorkOrder}
                onOpenScanner={() => setMesScannerOpen(true)}
                onNotify={addToast}
              />

              {/* MES Work Order Table */}
              <div className="flex-1 min-w-0">
                <MesWorkOrderTable
                  orders={filteredWorkOrders}
                  selectedIds={mesSelectedIds}
                  onToggleSelect={(id) => {
                    setMesSelectedIds((prev) =>
                      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
                    );
                  }}
                  onToggleSelectAll={() => {
                    if (mesSelectedIds.length === filteredWorkOrders.length) {
                      setMesSelectedIds([]);
                    } else {
                      setMesSelectedIds(filteredWorkOrders.map((o) => o.id));
                    }
                  }}
                  onViewDetail={(order) => {
                    setViewingWorkOrder(order);
                    setMesDrawerOpen(true);
                  }}
                  onEdit={handleEditWorkOrder}
                  onAssign={handleAssignWorkOrder}
                  onReportWork={handleReportWorkOrder}
                  onOpenSettings={() => setMesColumnModalOpen(true)}
                  onNotify={addToast}
                  currentPage={mesCurrentPage}
                  pageSize={mesPageSize}
                  totalCount={filteredWorkOrders.length}
                  onPageChange={setMesCurrentPage}
                />
              </div>

            </main>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODALS & DRAWERS */}
      {/* ========================================================================= */}
      
      {/* Water Add / Edit Modal */}
      <WaterFacilityModal
        isOpen={waterFacilityModalOpen}
        onClose={() => setWaterFacilityModalOpen(false)}
        facility={editingFacility}
        onSave={handleSaveFacility}
      />

      {/* Water Detail Drawer */}
      <WaterDetailDrawer
        isOpen={waterDrawerOpen}
        facility={viewingFacility}
        onClose={() => setWaterDrawerOpen(false)}
        onEdit={(fac) => {
          setWaterDrawerOpen(false);
          handleEditFacility(fac);
        }}
      />

      {/* Water Operation & Settings Modal */}
      <WaterOperationModal
        isOpen={waterOperationModal.isOpen}
        type={waterOperationModal.type}
        facility={waterOperationModal.facility}
        onClose={() => setWaterOperationModal({ isOpen: false, type: 'setting', facility: null })}
        onSaveSetting={(id, settings) => {
          addToast('填报参数已成功保存', `上报周期: ${settings.reportCycle}, 阈值: ${settings.thresholdMax}m³/h`, 'success');
        }}
      />

      {/* Water Disable Modal (计量停用) */}
      <WaterDisableModal
        isOpen={waterDisableModalOpen}
        facility={disablingFacility}
        onClose={() => {
          setWaterDisableModalOpen(false);
          setDisablingFacility(null);
        }}
        onSubmit={handleConfirmDisable}
      />

      {/* Fault Apply / Re-submit Modal */}
      <FaultApplyModal
        isOpen={faultApplyModalOpen}
        facilities={facilities}
        editingRecord={editingFaultRecord}
        onClose={() => {
          setFaultApplyModalOpen(false);
          setEditingFaultRecord(null);
        }}
        onSubmit={handleSaveFaultRecord}
      />

      {/* Fault Workflow Timeline Modal */}
      <FaultWorkflowModal
        isOpen={workflowModalState.isOpen}
        record={workflowModalState.record}
        onClose={() => setWorkflowModalState({ isOpen: false, record: null })}
        onAuditApprove={handleAuditApprove}
        onAuditReject={handleAuditReject}
      />

      {/* Fault Media / Attachment Preview Modal */}
      <FaultMediaPreviewModal
        isOpen={mediaModalState.isOpen}
        title={mediaModalState.title}
        files={mediaModalState.files}
        description={mediaModalState.description}
        onClose={() => setMediaModalState({ isOpen: false, title: '', files: [], description: '' })}
      />

      {/* MES Barcode Scanner Modal */}
      <MesScannerModal
        isOpen={mesScannerOpen}
        onClose={() => setMesScannerOpen(false)}
        onScanResult={handleScanResult}
      />

      {/* MES Add / Edit Work Order Modal */}
      <MesAddOrderModal
        isOpen={mesAddModalOpen}
        onClose={() => setMesAddModalOpen(false)}
        order={editingWorkOrder}
        onSave={handleSaveWorkOrder}
      />

      {/* MES Work Order Detail Drawer */}
      <MesOrderDetailDrawer
        isOpen={mesDrawerOpen}
        order={viewingWorkOrder}
        onClose={() => setMesDrawerOpen(false)}
        onEdit={(ord) => {
          setMesDrawerOpen(false);
          handleEditWorkOrder(ord);
        }}
        onAssign={(ord) => {
          handleAssignWorkOrder(ord);
        }}
      />

      {/* MES Column Config Modal */}
      <MesColumnSettingModal
        isOpen={mesColumnModalOpen}
        onClose={() => setMesColumnModalOpen(false)}
        onNotify={addToast}
      />

      {/* Confirm Action Dialog */}
      <ConfirmModal
        isOpen={confirmModalState.isOpen}
        title={confirmModalState.title}
        message={confirmModalState.message}
        confirmText={confirmModalState.confirmText}
        type={confirmModalState.type}
        onClose={() => setConfirmModalState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModalState.onConfirm}
      />

    </div>
  );
}
