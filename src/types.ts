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
  maintainUnit?: string; // 运维单位
  maintainPerson?: string; // 运维负责人及电话
  maintainExpiryDate?: string; // 运维截止日期
  manageUnit?: string; // 管理单位
  builderUnit?: string; // 承建单位
  pipeDiameter?: string; // 管径大小
  maxDailyWater?: string; // 日最大取水量
  installType?: string; // 安装类型
  installForm?: string; // 安装形式
  waterIntake?: string; // 取水口
  stationName?: string; // 监测站名称
  meteringDimension?: string; // 一次性计量纲
  measuringRange?: string; // 测量范围
  coordinates?: string; // 经纬度
  installDate?: string; // 安装时间
  dataSourceType?: string; // 数据来源类型
  nextCalibrationDate?: string; // 下次检定日期
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

// 计划用水管理 - 填报审批类型定义
export type WaterPlanUserType = 'all' | 'permit' | 'public_supply';
export type WaterPlanStatus = 
  | '全部'
  | '县级待审核'
  | '市级待审核'
  | '省级待审核'
  | '审核通过'
  | '审核驳回'
  | '已下达计划'
  | '报备中'
  | '计划重新下达';

export type WaterPlanItemType = '首次填报' | '年计划调整' | '月计划调整';

export interface WaterPlanAuditLog {
  stepName: string;
  operator: string;
  department: string;
  action: string;
  time: string;
  opinion: string;
  status: 'passed' | 'rejected' | 'pending';
}

export interface WaterPlanRecord {
  id: string;
  city: string; // 市(州): 西宁市
  district: string; // 县(区): 大通县, 城东区, 城西区等
  unitName: string; // 用水单位名称
  creditCode: string; // 统一社会信用代码
  industryType: string; // 行业类型: 4.有色, 制造, 冶金, 采矿等
  isPublicPipeNetwork: '是' | '否'; // 是否公共管网取水
  isSelfWaterSource: '是' | '否'; // 自备水源取水
  isAboveDesignatedSize: '是' | '否'; // 是否规上
  keyType: '重点' | '非重点'; // 重点类型
  directManageType: '流域管理机构' | '省级' | '市级' | '县级'; // 直管类型
  waterIntakeType: '水资源配置类' | '河道内生产类' | '基础设施或公用事业类' | '自备水源类'; // 取水类型
  itemType: WaterPlanItemType; // 事项类型: 首次填报 / 年计划调整 / 月计划调整
  status: WaterPlanStatus; // 状态
  permitVolume: number; // 许可水量 (万m³)
  planVolume: number; // 计划水量 (万m³)
  surfaceWater: number; // 地表水 (万m³)
  groundwater: number; // 地下水 (万m³)
  unconventionalTotal: number; // 非常规水总计 (万m³)
  recycledWater?: number; // 再生水 (万m³)
  mineWater?: number; // 矿坑(井)水 (万m³)
  rainWater?: number; // 集蓄雨水 (万m³)
  brackishWater?: number; // 微咸水 (万m³)
  year: string; // 查询年份: 2025, 2026
  userType: WaterPlanUserType; // 计划用水户类型
  permitNumber?: string; // 取水许可证编号
  supervisorUnit?: string; // 上级主管部门
  applyDate?: string; // 填报申请日期
  auditor?: string; // 审核人
  auditDate?: string; // 审核日期
  auditOpinion?: string; // 审批意见
  approvedVolume?: number; // 核准计划水量 (万m³)
  approvedSurfaceWater?: number; // 核准地表水
  approvedGroundwater?: number; // 核准地下水
  approvedUnconventionalWater?: number; // 核准非常规水
  auditHistory?: WaterPlanAuditLog[]; // 审批流程历史
  actualWaterQuota?: FormQuotaData; // 本年度实际用水表数据
  planWaterQuota?: FormQuotaData; // 下年度计划用水表数据
  documentIssues?: WaterPlanDocumentIssue[]; // 用水计划下发文件列表（支持多次下发）
}

export interface WaterPlanFilterParams {
  userType: WaterPlanUserType; // 计划用水户类型: 全部 / 取水许可 / 公共供水
  status: string; // 状态
  itemType: string; // 事项类型
  year: string; // 查询年份
  industryType: string; // 行业类型
  isSelfWaterSource: string; // 是否自备水源取水 (不限 / 是 / 否)
  waterIntakeType: string; // 取水类型
  supervisorUnit: string; // 上级主管部门
  waterUserName: string; // 取用水户名称
  permitNumber: string; // 取水许可编号
  keySupervisionUnit: string; // 重点监督单位
  directManageType: string; // 直管类型
  isAboveDesignatedSize: string; // 是否规上
  // 水量筛选
  permitVolumeFilter: string;
  planVolumeFilter: string;
  surfaceWaterFilter: string;
  groundwaterFilter: string;
  unconventionalFilter: string;
  recycledWaterFilter: string;
  mineWaterFilter: string;
  rainWaterFilter: string;
  brackishWaterFilter: string;
  selectedDistrict: string; // 选中区县
}

export interface LivingWaterRow {
  type: string;
  quota: number;
  population: number;
  surfaceWater: number;
  groundwater: number;
}

export interface IndustryWaterRow {
  productName: string;
  quota: number;
  output: string;
  productVolume: string;
  surfaceWater: number;
  groundwater: number;
  recycledWater: number;
  rainWater: number;
  mineWater: number;
  brackishWater: number;
}

export interface AgricultureWaterRow {
  area: number;
  times: number;
  quota: number;
  crops: string;
  method: string;
  surfaceWater: number;
  groundwater: number;
  total?: number;
}

export interface LivestockWaterRow {
  livestockType: string; // 畜禽种类/饲养品种 (如: 肉牛、奶牛、生猪、肉羊、蛋鸡)
  count: number; // 存栏/饲养数量(头/只/羽)
  quota: number; // 用水定额(L/头·天)
  days?: number; // 饲养天数
  surfaceWater: number; // 地表水 (万m³)
  groundwater: number; // 地下水 (万m³)
  total?: number; // 总计 (万m³)
}

export interface PowerWaterRow {
  units: number;
  capacity: string;
  generation: string;
  hours: number;
  surfaceWater: number;
  groundwater: number;
  hydroMinFlow: number;
  thermalMaxHourly: number;
  total?: number;
}

export interface ServiceWaterRow {
  industryName: string; // 服务类型/经营行业 (如: 住宿餐饮、商务办公、商超零售、洗车洗浴)
  scale: string; // 经营规模/面积/客流 (如: "建筑面积 15000㎡")
  quota: number; // 用水定额
  surfaceWater: number; // 地表水 (万m³)
  groundwater: number; // 地下水 (万m³)
  recycledWater?: number; // 非常规水/再生水 (万m³)
  total?: number; // 总计 (万m³)
}

export interface MonthlySummaryRow {
  month: string; // 月份: '1月', '2月', ..., '12月'
  surfaceWater: number; // 地表水
  groundwater: number; // 地下水
  recycledWater: number; // 再生水
  rainWater: number; // 雨水
  mineWater: number; // 矿井水
  brackishWater: number; // 微咸水
  unconventionalTotal?: number; // 非常规计
  total?: number; // 总计
}

export interface FormQuotaData {
  requiredCategories?: string[]; // 勾选的必须填写分类: ['living', 'industry', 'agriculture', 'livestock', 'power', 'service']
  livingWaterRows: LivingWaterRow[];
  industryWaterRows: IndustryWaterRow[];
  agricultureWaterRows: AgricultureWaterRow[];
  livestockWaterRows?: LivestockWaterRow[]; // 牲畜饲养用水
  powerWaterRows: PowerWaterRow[];
  serviceWaterRows?: ServiceWaterRow[]; // 服务业用水
  monthlySummaryRows?: MonthlySummaryRow[]; // 1至12月用水总结表
}

export type WaterPlanNoticeType = '正式用水计划通知' | '调整用水计划通知';

export interface WaterPlanNoticeFile {
  id: string;
  name: string;
  type: 'pdf' | 'word' | 'excel' | 'image';
  size: string;
  uploadTime?: string;
  url?: string;
}

export interface WaterPlanDocumentIssue {
  id: string;
  title: string; // 通知名称
  noticeType: WaterPlanNoticeType; // 通知类型：正式用水计划通知、调整用水计划通知
  issuerUnit: string; // 下发单位
  issueTime: string; // 下发时间
  issueEvent: string; // 下发事件 (如：2025年度计划用水指标初核下发、年中产能扩产计划用水调整下发)
  docNumber?: string; // 批复发文字号，如：宁水资计〔2025〕0428号
  files: WaterPlanNoticeFile[]; // 多个通知文件
  remarks?: string; // 备注说明
  approvedTotalVolume?: number; // 批复核定总量 (万m³)
}

// ==================== 数据归集 - 人工归集功能类型 ====================
export type ReportCycleType = 'month' | 'quarter' | 'year'; // 按月 / 按季度 / 按年
export type ManualAuditStatus = '待审核' | '已通过' | '已驳回' | '草稿';

export interface NonOnlineFacility {
  id: string;
  code: string; // 计量器具编号
  name: string; // 设施名称
  waterOwner: string; // 取水权人
  permitNumber: string; // 取水许可证编号
  district: string; // 所属区县
  waterUsage: string; // 取水用途
  waterSourceType: string; // 水源类型
  meteringMethod: string; // 计量方式 (机械水表 / 电磁水表 / 超声波水表等)
  specModel: string; // 规格型号
  address: string; // 安装地点
  transmissionMethod: '非在线'; // 传输方式：非在线
  reportCycle: ReportCycleType; // 填报配置周期：'month' | 'quarter' | 'year'
  currentBaseReading: number; // 当前表底数 (m³)
  lastReportPeriod: string; // 最近填报期次，如 '2026年08月' 或 '2026年第二季度'
  lastReportDate: string; // 最近抄报时间
  reporterName: string; // 填报责任人
  reporterPhone: string; // 责任人电话
  status: '正常' | '停用'; // 设施状态
  deadlineDesc?: string; // 周期时限说明，如 "每月5日前填报" / "每季度初10日前填报"
  quotaVolume?: number; // 年度/季度核定额度 (万m³)
}

export interface ManualReportRecord {
  id: string;
  recordNo: string; // 归集单号，如 RG202609-001
  facilityId: string;
  facilityCode: string;
  facilityName: string;
  waterOwner: string;
  permitNumber: string;
  district: string;
  waterUsage: string;
  meteringMethod: string;
  reportCycle: ReportCycleType; // 填报周期类型: month | quarter | year
  year: number; // 年份，如 2026
  periodKey: string; // 唯一期次键，如 '2026-01', '2026-08', '2026-Q1', '2026-Y'
  periodLabel: string; // 期次显示名称，如 '2026年08月', '2026年第二季度', '2026年度'
  startReading: number; // 上期底数 (m³)
  endReading: number; // 本期底数 (m³)
  waterVolume: number; // 本期水量 (m³)
  readingDate: string; // 抄表日期
  submitTime: string; // 填报提交时间
  reporterName: string; // 填报人员
  reporterPhone: string; // 填报人员电话
  auditStatus: ManualAuditStatus; // 审核状态: 待审核 / 已通过 / 已驳回
  voucherFiles: string[]; // 现场水表抄表凭证附件
  notes?: string; // 填报备注
  isBatch?: boolean; // 是否批量补报
  auditor?: string; // 审核人
  auditTime?: string; // 审核时间
  auditComment?: string; // 审核意见
}

export interface ManualReportFilterParams {
  keyword: string; // 设施名称/编码/权人
  district: string; // 区县
  reportCycle: string; // 周期配置: 全部 / month / quarter / year
  auditStatus: string; // 审核状态: 全部 / 待审核 / 已通过 / 已驳回
  dateRange: string; // 日期区间
}

// ======================= 数据规范整合 - 一户一档 =======================
export type EnterpriseDataSourceType = '国控' | '省控' | '中央资金';
export type EnterpriseLicenseStatus = '正常' | '临期' | '变更中' | '延续审批中' | '已过期' | '已注销';
export type EnterpriseAccountStatus = '正常' | '启用' | '停运' | '在建';

export interface EnterpriseDossier {
  id: string;
  issuingAuthority: string; // 发证机关
  creditCode: string; // 统一信用代码
  waterOwnerName: string; // 取水权人名称
  permitNumber: string; // 取水许可证
  dataSourceType: EnterpriseDataSourceType; // 数据来源类型（国控、省控、中央资金）
  aboveDesignatedScale: boolean; // 规模以上 (true/false)
  waterSourceType: string; // 水源类型 (地表水、地下水、非常规水、矿井水、混合水源)
  licenseStatus: EnterpriseLicenseStatus; // 证照状态 (正常、临期、变更中、延续审批中、已过期、已注销)
  intakeProjectCount: number; // 取水口工程数量
  intakeCount: number; // 取水口数据 (数量)
  meteringPointCount: number; // 计量点数量
  onlineMeteringCount: number; // 在线计量点
  offlineMeteringCount: number; // 非在线计量点
  status: EnterpriseAccountStatus; // 状态 (正常、启用、停运、在建)
  district: string; // 所属区县
  legalPerson?: string; // 法定代表人
  contactPhone?: string; // 联系电话
  address?: string; // 取水地址
  annualPermitVolume?: number; // 年许可取水量(万m³)
}

export interface EnterpriseDossierFilterParams {
  keyword: string; // 权人名称 / 信用代码 / 许可证
  issuingAuthority: string; // 发证机关
  dataSourceType: string; // 数据来源类型 (全部 / 国控 / 省控 / 中央资金)
  aboveDesignatedScale: string; // 规模以上 (全部 / 是 / 否)
  waterSourceType: string; // 水源类型
  licenseStatus: string; // 证照状态
  status: string; // 状态
}




