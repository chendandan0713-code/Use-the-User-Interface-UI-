export type PlatformType = 'water' | 'mes';

export type SubTabType = 'third_party' | 'user_client' | 'admin_client';

export type MesTabType = 
  | 'home' 
  | 'order_info' 
  | 'production_order' 
  | 'production_task' 
  | 'work_record' 
  | 'outsource_order' 
  | 'outsource_task';

// Water Management Platform Types
export type FacilityStatus = '正常' | '故障' | '停用';
export type ReportMethod = '接口' | '在线' | '非在线';
export type TransmissionMethod = '在线' | '非在线' | '无线4G' | 'NB-IoT';
export type FundingSource = '自计量' | '中央发展基金' | '省级水利专项' | '市级统筹';
export type WaterSourceType = '地下水' | '地表水' | '水库水' | '泉水' | '自备井';
export type WaterUsageType = '生活饮用' | '农业灌溉' | '工业用水' | '生态环境' | '特种行业';
export type MeteringMethod = '电磁流量计' | '超声波流量计' | '机械水表' | '明渠流量计' | '多普勒流速仪';

export interface WaterFacility {
  id: string;
  name: string; // 设施名称
  code: string; // 计量设施(器具)编号
  status: FacilityStatus; // 使用状态
  reportMethod: ReportMethod; // 上报方式
  transmissionMethod: TransmissionMethod; // 数据传输方式
  waterSourceType: WaterSourceType; // 水源类型
  fundingSource: FundingSource; // 建设来源
  fundingYear: string; // 资金年份
  specModel: string; // 规格型号
  facilityType: string; // 计量设施类型
  isArchived: boolean; // 档案是否完善
  lastReportTime: string; // 最新到报时间
  lastCalibrationTime: string; // 最新检定校准时间
  calibrationExpiryDate: string; // 检定校准有效期限
  isReportedToNational: boolean; // 是否上报部平台
  district: string; // 所属区县
  waterOwner: string; // 取水权人名称
  permitNumber: string; // 许可证编号
  monitorPointCode: string; // 监测点编号
  waterUsage: WaterUsageType; // 取水用途
  meteringMethod: MeteringMethod; // 计量方式
  dataSource: string; // 数据来源
  address: string; // 取水地址
  flowRate?: number; // 瞬时流量 m³/h
  accumulatedFlow?: number; // 累计流量 m³
  batteryLevel?: number; // 电池电量 %
  signalStrength?: number; // 信号强度
  disableReason?: string; // 停用原因
  disableMaterial?: string; // 停用材料附件名
  disableTime?: string; // 停用时间
}

export interface DistrictNode {
  id: string;
  name: string;
  count: number;
  children?: DistrictNode[];
}

export interface WaterFilterParams {
  queryMode: 'cert_auth' | 'water_address'; // 按发证机关 / 按取水地址
  facilityCode: string; // 计量设施编号
  facilityName: string; // 计量设施名称
  waterOwner: string; // 取水权人名称
  permitNumber: string; // 许可证编号
  waterSourceType: string; // 水源类型
  dataSource: string; // 数据来源
  monitorPointCode: string; // 监测点编号
  waterUsage: string; // 取水用途
  meteringMethod: string; // 计量方式
  transmissionMethod: string; // 数据传输方式
  isArchived: string; // 档案信息是否完善 (全部 / 是 / 否)
  status: string; // 状态 (全部 / 正常 / 故障 / 停用)
  includeChildren: boolean; // 包含下级
  selectedDistrict: string; // 选中区县
}

// MES Production Work Order Types
export type WorkOrderStatus = '待排产' | '生产中' | '已完工' | '暂停' | '已取消' | '质检中';
export type PriorityLevel = '低' | '中' | '高' | '特急';
export type WorkOrderType = '自制' | '委外' | '返工' | '试制';

export interface WorkOrder {
  id: string;
  orderCode: string; // 工单编号
  orderTag: string; // 工单标识/批次条码
  productName: string; // 产品名称
  productCode: string; // 产品编号
  spec: string; // 规格
  unit: string; // 单位
  materialGrade: string; // 材料牌号
  partNumber: string; // 零件图号
  productionBatch: string; // 生产批次
  type: WorkOrderType; // 类型
  productionPlan: string; // 生产计划
  customerName: string; // 客户名称
  creator: string; // 制单人
  relatedOrder: string; // 关联订单
  priority: PriorityLevel; // 优先级
  status: WorkOrderStatus; // 工单状态
  plannedQuantity: number; // 计划数量
  completedQuantity: number; // 已完工数量
  progress: number; // 进度百分比
  createTime: string; // 创建时间
  planStartDate: string; // 计划开始日期
  planEndDate: string; // 计划结束日期
  actualStartDate?: string;
  actualEndDate?: string;
  workshop: string; // 所属车间
  currentProcess: string; // 当前工序
  operator?: string; // 负责人
  notes?: string;
}

export interface MesFilterParams {
  orderCode: string;
  productName: string;
  partNumber: string;
  productionBatch: string;
  status: string;
  priority: string;
  productionPlan: string;
  relatedOrder: string;
  customerName: string;
  creator: string;
  materialGrade: string;
  createDateRange: string;
  planStartDate: string;
  planEndDate: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
}

// Fault Record Types (故障记录)
export type FaultStatus = 
  | '故障待审' 
  | '处理待审' 
  | '故障中' 
  | '故障驳回' 
  | '处理驳回' 
  | '已完成';

export interface FaultAuditLog {
  stage: string;
  time: string;
  operator: string;
  result: '通过' | '驳回' | '处理中' | '提交';
  remark?: string;
}

export interface FaultRecord {
  id: string;
  waterOwner: string; // 取水权人
  permitNumber: string; // 证照编号
  facilityName: string; // 计量设施名称
  facilityCode: string; // 计量器具编号
  faultWaterMeterReading: string | number; // 故障水表底数
  faultDesc: string; // 故障情况说明
  faultImages?: string[]; // 故障图片
  reporter: string; // 上报人
  faultTime: string; // 故障时间
  resolvedWaterMeterReading?: string | number; // 故障解除底数
  resolvedDesc?: string; // 故障解除说明
  resolvedFiles?: string[]; // 解除证明材料
  handler?: string; // 处理人
  handleTime?: string; // 处理时间
  status: FaultStatus; // 状态
  district: string; // 所属区县
  facilityId?: string; // 关联设施ID
  canReapply?: boolean; // 是否可以重新发起/重新编辑
  auditLogs?: FaultAuditLog[]; // 审批流程
}

export interface FaultFilterParams {
  facilityName: string;
  permitNumberOrOwner: string;
  dateRange: string;
  status: string;
  selectedDistrict: string;
}

