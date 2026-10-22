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
  currentYearPlanVolume?: number; // 今年年计划水量(万m³)
  historicalAvgWaterVolume?: number; // 历年平均计量水量(万m³)
  currentYearTaxPaid?: number; // 今年已纳税(万元)
  violationIssueCount?: number; // 违规问题次数
  violationIntakeCount?: number; // 违规涉及取水口数量
  licenseChangeCount?: number; // 证照变更次数
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

// ======================= 数据规范整合 - 档案完整度核算 =======================
// 档案完整度等级：优秀(90-100分)、良好(80-89分)、一般(60-79分)、较差(<60分)
export type DossierCompletenessLevel = '优秀' | '良好' | '一般' | '较差';

// 档案各维度完整度评分明细
export interface DossierCompletenessScore {
  dossierId: string;
  waterOwnerName: string;
  permitNumber: string;
  creditCode: string;
  district: string;
  issuingAuthority: string;
  dataSourceType: EnterpriseDataSourceType;
  aboveDesignatedScale: boolean;
  status: EnterpriseAccountStatus;
  
  // 综合得分 (0 - 100)
  totalScore: number;
  level: DossierCompletenessLevel;
  
  // 分项得分与完成率
  basicInfoScore: number;       // 基础信息 (满分 25 分: 统一社会信用代码、法人代表、联系电话、取水地点、经营地址等)
  licenseInfoScore: number;     // 取水许可凭证 (满分 25 分: 许可证号、有效期限、发证机关、年许可水量、水源类型等)
  engineeringScore: number;     // 取水口与工程 (满分 20 分: 取水口坐标、工程名称、取水方式、设计规模、施工及验收文件等)
  meteringScore: number;        // 计量监测体系 (满分 20 分: 计量点位、在线监测、检定校验、传输编码等)
  materialsScore: number;       // 电子资料档案 (满分 10 分: 取水申请、审批决定、排污许可证、年度总结、巡检台账等)

  // 缺失/薄弱项提示清单
  missingItems: string[];
  lastAccountingDate: string; // 最近核算时间
}

export interface DossierCompletenessFilterParams {
  keyword: string;
  district: string;
  completenessLevel: string; // 全部 / 优秀 / 良好 / 一般 / 较差
  scoreRange: string;        // 全部 / 90分及以上 / 80-89分 / 60-79分 / 60分以下
  dataSourceType: string;    // 全部 / 国控 / 省控 / 中央资金
  aboveDesignatedScale: string; // 全部 / 规上 / 规下
  issuingAuthority: string;
}

// ======================= 取用水量核算 - 小型灌区核算 =======================
// 登录角色层级（县级填报、市级审核、省级审核，同后台多角色）
export type IrrigationRoleLevel = 'county' | 'city' | 'province';

// 审核流转状态
export type IrrigationAuditStatus = 
  | 'draft'             // 县级草稿
  | 'pending_city'      // 待市级审核
  | 'pending_province'  // 待省级审核
  | 'approved'          // 审核通过 / 已入库
  | 'rejected';         // 已驳回 (退回县级修改)

// 取水许可证照信息（填报证照维度）
export interface IrrigationLicense {
  id: string;
  permitNumber: string;         // 取水许可证编号，如 取水（青宁中）字[2024]第0012号
  irrigationName: string;       // 小型灌区名称
  district: string;             // 所属区县（如 湟中区、湟源县、大通县）
  waterOwner: string;           // 灌区管理主体/持证人
  waterSourceType: string;      // 水源类型（地表水、地下水、混合水源）
  annualQuota: number;          // 核准年许可取水量 (万m³)
  designArea: number;           // 设计灌溉面积 (亩)
  effectiveArea: number;        // 有效灌溉面积 (亩)
  managerName: string;          // 灌区负责人
  contactPhone: string;         // 负责人电话
  intakeLocation: string;       // 取水地点/水源工程
}

// 一、农业用水量分项数据（单位：万m³）
export interface IrrigationAgriculturalWater {
  farmland: number;     // (一) 耕地灌溉
  woodland: number;     // (二) 林地灌溉
  orchard: number;      // (三) 园地灌溉
  pasture: number;      // (四) 牧草地灌溉
  fishpond: number;     // (五) 鱼塘补水
  livestock: number;    // (六) 畜禽用水
  subtotal: number;     // (七) 小计 = (一)至(六)求和
  groundwater: number;  // 其中: 取用地下 (需 <= 小计)
}

// 审核流转日志
export interface IrrigationAuditLog {
  id: string;
  action: string;               // 动作名称，如 '县级提交' | '市级初审通过' | '市级初审驳回' | '省级终审通过' | '省级终审驳回'
  operatorName: string;         // 操作人员
  roleName: string;             // 角色/机构（如 湟中区水务局、西宁市水务局水资源科、青海省水利厅）
  time: string;                 // 操作时间
  result?: 'pass' | 'reject';   // 审核结果
  comment?: string;             // 审核批注/驳回原因
  statusAfter: IrrigationAuditStatus;
}

// ======================= 取用水量核算 - 小型灌区核算 (扩展增强版) =======================

// 小型灌区基础信息与核算填报记录 (规范模板)
export interface SmallIrrigationRecord {
  id: string;
  name: string; // 小型灌区名称
  district: string; // 所属区县
  permitNumber: string; // 取水许可证号
  year: number; // 核算年度
  periodLabel: string; // 核算周期/年份

  // 基础信息填报
  effectiveArea: number; // 有效灌溉面积（亩）(含耕地、林地、园地、牧草地)
  actualArea: number; // 实际灌溉面积（亩）
  mainCropTypes: string[]; // 主要作物类型 (按面积占比依次列出前3类，如小麦、油菜、马铃薯)
  quotaPerMu: number; // 亩均用水量（m³/亩）(有计量按实际计算，无计量填报统计直报系统典型亩均)
  hasDirectMeter: boolean; // 是否有实际取用水计量数据
  areaRatioAlert?: boolean; // 实际面积超出有效面积或低于有效面积10%及以上的预警标志

  // 取用水量填报 (按水源类型拆分，单位：万m³)
  surfaceWater: number; // 地表水取用水量 (万m³)
  groundwater: number; // 地下水取用水量 (万m³)
  otherWater: number; // 其他水源取用水量 (雨水集蓄等非常规水源，万m³)
  totalWater: number; // 取用水量合计 (自动计算 = 地表水 + 地下水 + 其他水源)

  // 审核对比与合规指标
  quotaStandard: number; // 所属农业灌溉分区用水定额标准 (m³/亩)
  quotaDeviation: number; // 亩均用水量与所属农业灌溉分区用水定额比对偏差比例 (%)
  quotaDeviationExplain?: string; // 偏差20%以上的说明
  directReportWater: number; // 县级用水统计调查直报系统填报的取用水量 (万m³)
  directReportDeviation: number; // 与直报系统数据偏差比例 (%)
  directReportExplain?: string; // 偏差超过±10%的说明与典型名录调整建议
  sourceLegitimate: boolean; // 数据来源是否合规有凭证
  sourceVouchers: string[]; // 数据来源凭证

  // 审核流转状态与信息
  status: 'draft' | 'pending_city' | 'approved' | 'rejected';
  reporter: {
    name: string;
    unit: string;
    time: string;
  };
  cityAuditor?: {
    name: string;
    unit: string;
    time: string;
    result: 'pass' | 'reject';
    comment: string;
  };
  logs: IrrigationAuditLog[];
}

// ======================= 取用水量核算 - 畜禽用水核算管理 =======================
export type LivestockCategory = 'large' | 'small' | 'poultry'; // 大牲畜、小牲畜、家禽

export interface LivestockItem {
  category: LivestockCategory;
  categoryName: string; // 大牲畜 / 小牲畜 / 家禽
  examples: string; // 马、牛、驴、骡等 / 猪、羊等 / 鸡、鸭、鹅等
  yearEndStock: number; // 年末存栏量 (头/只) 源于统计部门
  dailyWaterPerHead: number; // 单位牲畜日用水量 (L/头(只)·d) 参考用水定额
  quotaStandardDaily: number; // 青海省行业定额标准日用水量 (L/头·d)
  quotaDeviation: number; // 与定额偏差百分比 (%)
  quotaDeviationExplain?: string; // 偏差20%以上备注说明
  surfaceWater: number; // 地表水取用水量 (万m³) 以典型调查为基础参考定额推算
  groundwater: number; // 地下水取用水量 (万m³)
  totalWater: number; // 合计 (万m³) = 地表水 + 地下水
}

export interface LivestockAccountingRecord {
  id: string;
  district: string; // 区县名称
  year: number; // 核算年份
  periodLabel: string; // 例如 "2026年度"
  dataSourceAgency: string; // 年末存栏量数据来源部门 (如统计局、农业农村局统计年鉴)
  hasStatisticalYearbookDoc: boolean; // 统计年鉴资料核验凭证是否具备
  statVoucherName?: string;

  // 核心核算数据三类牲畜
  items: LivestockItem[];

  // 汇总统计
  totalYearEndStock: number; // 存栏总量
  totalSurfaceWater: number; // 地表水合计 (万m³)
  totalGroundwater: number; // 地下水合计 (万m³)
  grandTotalWater: number; // 取用水量总合计 (万m³)

  // 对比审核指标
  directReportWater: number; // 县级用水统计调查直报系统填报的畜禽取用水量 (万m³)
  directReportDeviation: number; // 偏差比例 (%)
  deviationExplain?: string; // 偏差复核说明

  // 审核流转状态
  status: 'draft' | 'pending_city' | 'approved' | 'rejected';
  reporter: {
    name: string;
    unit: string;
    time: string;
  };
  cityAuditor?: {
    name: string;
    unit: string;
    time: string;
    result: 'pass' | 'reject';
    comment: string;
  };
  logs: IrrigationAuditLog[];
}

// ======================= 取用水量核算 - 鱼塘用水核算管理 =======================
export interface FishpondAccountingRecord {
  id: string;
  district: string; // 区县名称
  year: number; // 核算年份
  periodLabel: string; // 例如 "2026年度"
  pondName?: string; // 养殖水产基地/片区名称 (如湟中鲁沙尔渔业生态养殖区)

  // 基础信息
  pondArea: number; // 鱼塘补水面积 (亩) 用于养殖水产品需人工补水
  quotaPerMuYear: number; // 亩均补水量 (m³/(667㎡·Y)) 根据统计调查直报系统典型调查与用水定额确定
  standardQuota: number; // 省用水定额基准补水量 (m³/亩·年)
  quotaDeviation: number; // 偏差比例 (%)
  quotaDeviationExplain?: string; // 偏差20%以上说明

  // 取用水量填报 (核心统计补水量，单位：万m³)
  surfaceWaterSupply: number; // 地表水补水量 (河道、水库等，万m³)
  groundwaterSupply: number; // 地下水补水量 (自备井抽取，万m³)
  totalWaterSupply: number; // 补水量合计 (万m³ = 地表水 + 地下水)

  // 数据来源与直报系统核验
  dataSourceType: string; // 统计年报 / 渔业养殖台账 / 农业调查
  hasSourceVoucher: boolean; // 数据来源凭证
  sourceVoucherFile?: string;
  directReportWater: number; // 县级用水统计调查直报系统填报的鱼塘补水取用水量 (万m³)
  directReportDeviation: number; // 偏差比例 (%)
  deviationExplain?: string; // 复核一致说明

  // 审核流转状态
  status: 'draft' | 'pending_city' | 'approved' | 'rejected';
  reporter: {
    name: string;
    unit: string;
    time: string;
  };
  cityAuditor?: {
    name: string;
    unit: string;
    time: string;
    result: 'pass' | 'reject';
    comment: string;
  };
  logs: IrrigationAuditLog[];
}

// ======================= 取用水量核算 - 建筑业用水核算管理 =======================
export interface ConstructionAccountingRecord {
  id: string;
  district: string; // 区县名称
  year: number; // 核算年份
  periodLabel: string; // 例如 "2026年度"
  enterpriseName?: string; // 建筑统计口径主体或片区

  // 基础信息
  completedArea: number; // 年度竣工面积 (平方米 ㎡) 数据来源为统计部门
  waterQuotaPerSquare: number; // 单位建筑面积施工用水量 (m³/㎡) 参考用水统计调查直报系统与用水定额
  standardQuotaPerSquare: number; // 省级建筑用水定额基准 (m³/㎡)
  quotaDeviation: number; // 偏差比例 (%)
  quotaDeviationExplain?: string; // 偏差20%以上说明

  // 取用水量填报 (各类水源，单位：万m³)
  selfSurfaceWater: number; // 自备地表水取水量 (河道、坑塘等，万m³)
  selfGroundwater: number; // 自备地下水取水量 (地下水，万m³)
  otherWater: number; // 其他 (再生水、雨水集蓄利用等非常规水源，万m³)
  totalWater: number; // 取用水量合计 (万m³ = 自备地表水 + 自备地下水 + 其他)

  // 统计部门来源复核与直报系统核对
  statDeptSource: string; // 统计局固投与建筑业年报
  hasStatVoucher: boolean;
  statVoucherFile?: string;
  directReportWater: number; // 县级用水统计调查直报系统填报的建筑业取用水量 (万m³)
  directReportDeviation: number; // 偏差比例 (%)
  deviationExplain?: string; // 偏差复核一致性说明

  // 审核流转状态
  status: 'draft' | 'pending_city' | 'approved' | 'rejected';
  reporter: {
    name: string;
    unit: string;
    time: string;
  };
  cityAuditor?: {
    name: string;
    unit: string;
    time: string;
    result: 'pass' | 'reject';
    comment: string;
  };
  logs: IrrigationAuditLog[];
}


// 小型灌区按月核算填报记录
export interface IrrigationAccountingRecord {
  id: string;
  licenseId: string;            // 关联取水许可证ID
  permitNumber: string;         // 取水许可证编号
  irrigationName: string;       // 小型灌区名称
  district: string;             // 所属行政区县
  waterOwner: string;           // 灌区取水权人
  waterSourceType: string;      // 水源类型
  annualQuota: number;          // 年许可取水量 (万m³)
  year: number;                 // 核算年份 (如 2026)
  month: number;                // 核算月份 (1-12)
  periodKey: string;            // 期次标识，如 '2026-03'
  periodLabel: string;          // 期次显示，如 '2026年03月'
  waterData: IrrigationAgriculturalWater; // 一、农业用水量各子项数据
  calculationMethod: string;    // 核算核定方法: 计量仪表实测 | 以电折水核算 | 定额面积推算 | 渠系量水尺量测
  voucherFiles: string[];       // 现场抄表凭证/用电结算单/水尺记录附件
  status: IrrigationAuditStatus; // 审核流转状态
  currentStepLabel: string;     // 当前流转环节名称
  reporter: {
    name: string;
    phone: string;
    unit: string;
    time: string;
  };
  cityAuditor?: {
    name: string;
    unit: string;
    time: string;
    result: 'pass' | 'reject';
    comment: string;
  };
  provinceAuditor?: {
    name: string;
    unit: string;
    time: string;
    result: 'pass' | 'reject';
    comment: string;
  };
  logs: IrrigationAuditLog[];
  remarks?: string;             // 填报补充说明
}

export interface IrrigationFilterParams {
  year: string;
  month: string;
  district: string;
  keyword: string;              // 许可证号 / 灌区名称 / 取水权人
  status: string;               // 全部 / draft / pending_city / pending_province / approved / rejected
  waterSourceType: string;      // 全部 / 地表水 / 地下水 / 混合水源
}

// 系统每月自动下发的填报任务定义
export type IrrigationTaskStatus = 'pending' | 'submitted' | 'approved' | 'overdue';

export interface IrrigationMonthlyTask {
  id: string;
  taskId: string;               // 任务编号，例如 RW-202603-01
  taskTitle: string;            // 任务标题，例如 "2026年03月小型灌区农业用水核算填报任务"
  year: number;                 // 年份 2026
  month: number;                // 月份 3
  periodKey: string;            // "2026-03"
  periodLabel: string;          // "2026年03月"
  dispatchTime: string;         // 系统自动下发时间，例如 "2026-03-01 00:00:00"
  deadline: string;             // 填报截止日期，例如 "2026-03-25 24:00:00"
  district: string;             // 接收行政区划（如 湟中区、湟源县、大通县）
  licenseId: string;            // 关联小型灌区取水许可证ID
  permitNumber: string;         // 证照编号
  irrigationName: string;       // 灌区名称
  waterOwner: string;           // 取水权人/管理单位
  targetUnit: string;           // 承办水务主管机构
  status: IrrigationTaskStatus; // 任务状态: pending (待填报) | submitted (已提交审核) | approved (终审已入库) | overdue (逾期催报)
  associatedRecordId?: string;  // 已填报生成的核算记录ID
  autoDispatched: boolean;      // 是否系统每月定时自动下发
}

// 自动下发规则配置定义
export interface IrrigationTaskRule {
  enabled: boolean;             // 是否开启每月自动下发
  dispatchDay: number;          // 每月下发日 (如每月 1 日 00:00 自动触发)
  deadlineDay: number;          // 每月截止日 (如每月 25 日 24:00)
  autoRemindDays: number[];     // 催办提醒天数 (如截止前 3 天、1 天自动短信/系统红点提醒)
  lastDispatchedPeriod: string; // 最近下发期次，如 "2026-03"
  totalDispatchedCount: number; // 累计下发任务数
}

// 行政区划年度维度聚合统计数据
export interface DistrictAnnualSummary {
  district: string;
  year: number;
  totalLicenses: number;        // 辖区纳入核算小型灌区证照数
  annualQuotaTotal: number;     // 年度核准许可总额 (万m³)
  annualUsedTotal: number;      // 当年累计核算用水总量 (万m³)
  quotaUsageRate: number;       // 年度用水进度 / 占许可额度百分比
  groundwaterTotal: number;     // 当年累计地下水核算量 (万m³)
  groundwaterRatio: number;     // 地下水占比
  farmlandTotal: number;        // 耕地灌溉
  woodlandTotal: number;        // 林地灌溉
  orchardTotal: number;         // 园地灌溉
  pastureTotal: number;         // 牧草地灌溉
  fishpondTotal: number;        // 鱼塘补水
  livestockTotal: number;       // 畜禽用水
  taskCompletionRate: number;   // 年度月度任务按期填报履约率 (%)
  totalTasks: number;           // 应填月度任务数
  completedTasks: number;       // 已完成任务数
  monthlyTrend: {
    month: number;
    monthLabel: string;
    waterVolume: number;
    groundwater: number;
    status: 'completed' | 'in_progress' | 'future';
  }[];
}

// ======================= 取用水量核算 - 证照水量按月填报与审核 (市县一体化复用架构) =======================

// 取水许可证照维度实体（纳入填报管理的证照基本信息）
export interface WaterPermitLicenseDimension {
  id: string;
  permitNumber: string;         // 取水许可证编号，如：取水（青宁中）字[2024]第0012号
  licenseName: string;          // 证照工程/项目名称
  waterOwner: string;           // 取水权人/单位名称
  creditCode?: string;          // 统一社会信用代码
  district: string;             // 所属行政区县 (如 湟中区、湟源县、大通县、城东区等)
  industryType: string;         // 行业类型 (农业灌溉、工业制造、城乡供水、水产养殖、建筑业等)
  waterSourceType: '地表水' | '地下水' | '混合水源' | '非常规水源'; // 水源类型
  annualQuota: number;          // 年许可取水量 (万m³)
  monthlyRefQuota: number;      // 月度参考限额 (万m³) = 年许可/12
  meteringMethod: string;       // 计量监控方式 (表计计量 / 超声波流量计 / 以电折水 / 渠道量水堰)
  meterDeviceCode?: string;     // 计量表号 / RTU采集编号
  intakeLocation: string;       // 取水口位置
  issueDate: string;            // 发证日期
  expiryDate: string;           // 有效期至
  status: '有效' | '临期' | '注销';
}

// 证照按月填报凭证附件
export interface LicenseVoucherFile {
  name: string;
  size: string;
  type: string; // 'image' | 'pdf' | 'excel'
  url?: string;
  uploadTime: string;
}

// 证照按月水量填报单实体 (由县级填报，市级审核，审核后进入年度数据支撑)
export interface LicenseMonthlyWaterReport {
  id: string;
  licenseId: string;            // 关联取水许可证ID
  permitNumber: string;         // 证照编号
  licenseName: string;          // 证照/项目名称
  waterOwner: string;           // 取水权人
  district: string;             // 所属区县
  waterSourceType: string;      // 水源类型
  industryType: string;         // 行业类型
  annualQuota: number;          // 年许可取水量 (万m³)
  year: number;                 // 填报年度 (如 2026, 2025)
  month: number;                // 填报月份 (1-12)
  periodKey: string;            // 期次键 (如 '2026-03')
  periodLabel: string;          // 期次文本 (如 '2026年03月')

  // 本月水量填报核心数据 (万m³)
  surfaceWater: number;         // 地表水取水量 (万m³)
  groundwater: number;          // 地下水取水量 (万m³)
  unconventionalWater: number;  // 非常规水/再生水 (万m³)
  totalWater: number;           // 本月合计取水量 (万m³) = 地表水 + 地下水 + 非常规水

  // 抄表复核与计量支撑
  meteringMethod: string;       // 计量方式
  prevMeterReading: number;     // 上期水表读数 (m³)
  currentMeterReading: number;  // 本期水表读数 (m³)
  meterMultiplier: number;      // 互感器倍率
  meterComputedWater: number;   // 表计核算量 (万m³)
  meterDeviation: number;       // 表底核算与填报偏差 (%)

  // 月度指标对标与预警
  monthlyQuota: number;         // 当月指标/参考配额 (万m³)
  quotaWarning: 'normal' | 'near_limit' | 'exceeded'; // 正常 (<90%) | 临界 (90%-100%) | 超配额 (>100%)
  warningReason?: string;       // 超限/大幅波动说明

  // 佐证凭证材料 (抄表相片、水费凭据、电量结算单等)
  voucherFiles: LicenseVoucherFile[];

  // 审核状态机: 草稿(县级) -> 待市级审核 -> 市级已通过(入库年度支撑) / 市级已退回
  status: 'draft' | 'pending_city' | 'approved' | 'rejected';
  
  // 县级填报经办信息
  reporter: {
    name: string;
    phone: string;
    unit: string;
    time: string;
  };

  // 市级审核经办信息
  cityAuditor?: {
    name: string;
    phone?: string;
    unit: string;
    time: string;
    result: 'pass' | 'reject';
    comment: string;
  };

  // 审核与填报流转日志
  logs: IrrigationAuditLog[];

  // 支撑年度汇总标记
  isUsedForAnnualSummary: boolean; // 是否已生效并作为年度汇总的数据支撑
  remarks?: string;
}

// 证照年度数据支撑汇总（每个证照在指定年份下的1-12月汇总台账）
export interface LicenseAnnualSupportSummary {
  licenseId: string;
  permitNumber: string;
  licenseName: string;
  waterOwner: string;
  district: string;
  waterSourceType: string;
  industryType: string;
  year: number;
  annualQuota: number;          // 核准年许可总量 (万m³)
  totalApprovedWater: number;   // 审核通过累计生效水量 (万m³) - 核心数据支撑
  totalPendingWater: number;    // 待市审水量 (万m³)
  totalDraftWater: number;      // 县级草稿水量 (万m³)
  totalWaterAll: number;        // 已录入全部水量 (万m³)
  usageRatio: number;           // 年许可指标使用率 (%) = (totalApprovedWater / annualQuota) * 100
  surfaceWaterTotal: number;    // 地表水累计 (万m³)
  groundwaterTotal: number;     // 地下水累计 (万m³)
  unconventionalTotal: number;  // 非常规水累计 (万m³)
  quotaAlertLevel: 'safe' | 'warning' | 'danger'; // 安全 (<80%) | 预警 (80%-100%) | 超额 (>100%)
  reportedMonthsCount: number;  // 已填报月份数 (0-12)
  approvedMonthsCount: number;  // 已市审通过月份数 (0-12)
  monthlyBreakdown: {
    month: number;
    monthLabel: string;
    surfaceWater: number;
    groundwater: number;
    unconventionalWater: number;
    totalWater: number;
    status: 'approved' | 'pending_city' | 'draft' | 'unreported' | 'rejected';
    reportId?: string;
    isSupported: boolean;       // 是否计入年度数据支撑
  }[];
}

// 筛选检索参数
export interface LicenseReportFilterParams {
  year: string;
  month: string;
  district: string;
  keyword: string;              // 证照编号 / 取水权人 / 项目名称
  status: string;               // 全部 / draft / pending_city / approved / rejected
  waterSourceType: string;      // 全部 / 地表水 / 地下水 / 混合水源
  quotaWarning: string;         // 全部 / normal / near_limit / exceeded
}

// ==================== 计量健康状态管理与评分规则（依据最新评分规则总表） ====================
export type MeterHealthLevel = '优' | '良' | '中' | '差' | '极差' | '不可用' | '停用';

export type MeterBusinessAction =
  | '正常巡检'      // 90-100 优
  | '关注'          // 70-89 良
  | '生成维护工单'  // 50-69 中
  | '优先处理'      // 30-49 差
  | '立即处理'      // 0-29 极差
  | '禁止使用'      // 不可用 (检定超期)
  | '不参与评分';   // 停用 (人工停用状态覆盖)

export type MeterHealthDimension = '运行健康度' | '检定' | '停用';

export type DiagnosticRuleKey =
  | 'daily_missing'        // A组: 未上报 (单日未上报)
  | 'daily_incomplete'     // A组: 缺报 (单日缺报)
  | 'negative_value'       // A组: 负值 (出现负值)
  | 'extreme_value'        // A组: 极大值 (超阈值)
  | 'accum_10d_missing'    // B组: 累计10天未上报
  | 'consec_15d_same'      // B组: 连续15天同一数
  | 'accum_20d_zero'       // C组: 累计20天为0
  | 'calib_near_expiry'    // 检定A组: 临近到期 (30天内到期)
  | 'calib_overdue'        // 检定A组: 超期 (超过有效期)
  | 'calib_missing_record' // 检定B组: 记录缺失 (无检定记录)
  | 'status_deactivated';  // 停用: 人工停用状态覆盖

// 兼容别名
export type MeterAnomalyCategory = DiagnosticRuleKey;

export interface DiagnosticDeductionDetail {
  key: DiagnosticRuleKey;
  dimension: MeterHealthDimension;
  group: 'A组' | 'B组' | 'C组' | '检定A组' | '检定B组' | '停用';
  name: string;               // 异常/状态名称
  internalWeight: string;     // 内部权重: 如 '25%', '40%', '60%', '100%', '20%'
  maxPoints: number;          // 折算总分/上限 (如 6, 16, 24, 4, 20)
  triggerCondition: string;   // 触发条件
  penaltyRule: string;        // 扣分规则
  actualDeduction: number;    // 实际扣分 (分)
  isTriggered: boolean;       // 是否触发
  triggerCountOrDays?: number;// 触发次数或天数
  isRecoverable: '可恢复' | '视结论' | '—'; // 是否可恢复
  recoveryRule: string;       // 恢复规则
  keepRecord: boolean;        // 记录是否保留
  linkedAction: string;       // 联动动作
  currentStatusDesc?: string; // 诊断说明
}

export interface MeterHealthScoreDetail {
  totalScore: number;         // 最终得分 0 - 100
  operationScore: number;     // 运行健康度得分 (满分80)
  calibrationScore: number;   // 检定合规得分 (满分20)
  level: MeterHealthLevel;    // 优 / 良 / 中 / 差 / 极差 / 不可用 / 停用
  businessAction: MeterBusinessAction; // 联动业务动作
  isDeactivated: boolean;     // 状态覆盖：是否人工停用
  isUnavailable: boolean;     // 状态覆盖：是否置为不可用 (检定超期)
  totalPenalty: number;       // 累计总扣分
  operationPenalty: number;   // 运行健康度累计扣分 (上限80)
  calibrationPenalty: number; // 检定累计扣分 (上限20)
  deductions: Record<DiagnosticRuleKey, DiagnosticDeductionDetail>;
  diagnosisText: string;      // 诊断诊断简述
  detailedAdvice: string[];   // 针对性专家建议与处置闭环
  evaluatedAt: string;        // 核算评估时间
}

export interface MeterTelemetryPoint {
  time: string;          // HH:mm 或 YYYY-MM-DD HH:mm
  instantFlow: number;   // 瞬时流量 m³/h
  accumulated: number;   // 累计量 m³
  isReported: boolean;   // 是否正常到报
  isAnomaly: boolean;    // 是否为异常点
  anomalyType?: string;  // 异常类型 (如 负值/死数/突增/未到报)
}

export interface MeterFacilityHealthRecord {
  id: string;
  facilityCode: string;          // 器具编号
  facilityName: string;          // 设施名称
  waterOwner: string;            // 取水权人
  permitNumber: string;          // 取水许可证号
  district: string;              // 所属区县
  waterSourceType: string;       // 水源类型
  facilityType: string;          // 计量设施类型
  specModel: string;             // 规格型号
  transmissionMethod: string;    // 数据传输方式 (4G RTU / NB-IoT / 光纤)
  reportMethod: string;          // 上报方式
  status: '正常' | '故障' | '停用'; // 运行状态
  isOnline: boolean;             // 是否在线
  lastReportTime: string;        // 最新到报时间
  currentReading: number;        // 瞬时流速 m³/h
  accumulatedFlow: number;       // 累计水量 m³
  batteryLevel: number;          // 电池电量 %
  signalStrength: number;        // 信号强度 dBm / %
  monitorPointCode: string;      // 监测点编号
  address: string;               // 建设地址
  maintainUnit: string;          // 运维单位
  maintainPerson: string;        // 运维联系人及电话
  lastCalibrationTime: string;   // 最新检定时间
  calibrationExpiryDate: string; // 检定有效期截止日
  hasCalibrationRecord: boolean; // 是否有检定记录
  healthScore: MeterHealthScoreDetail; // 综合健康度核算得分
  recentTelemetry: MeterTelemetryPoint[]; // 近24小时或近7日关键时序报文
  workOrderPending?: boolean;    // 是否已派发处置工单
  workOrderId?: string;          // 关联工单编号
}

export interface HealthScoringRuleItem {
  key: DiagnosticRuleKey;
  dimension: MeterHealthDimension;
  group: string;
  name: string;
  internalWeight: string;        // 内部权重
  maxPoints: number;             // 折算分
  triggerCondition: string;      // 触发条件
  penaltyRule: string;           // 扣分规则
  recoveryRule: string;          // 恢复规则
  isRecoverable: '可恢复' | '视结论' | '—';
  keepRecord: boolean;           // 记录是否保留
  linkedAction: string;          // 联动动作
  explanation: string;           // 业务说明
}

export interface HealthScoringRuleConfig {
  dimensions: {
    operationWeight: number;     // 80分
    calibrationWeight: number;   // 20分
    deactivatedWeight: number;   // 不计分
  };
  operationGroups: {
    groupAWeight: number;        // 30% -> 24分
    groupBWeight: number;        // 50% -> 40分
    groupCWeight: number;        // 20% -> 16分
  };
  rules: HealthScoringRuleItem[];
  levels: {
    excellentMin: number;        // 90–100 优 (正常巡检)
    goodMin: number;             // 70–89 良 (关注)
    mediumMin: number;           // 50–69 中 (生成维护工单)
    poorMin: number;             // 30–49 差 (优先处理)
    veryPoorMax: number;         // 0–29 极差 (立即处理)
  };
}

export type HealthUserRole = 'provincial' | 'municipal' | 'county' | 'enterprise';

export interface HealthRolePermission {
  role: HealthUserRole;
  roleName: string;
  scopeDesc: string;             // 管辖范围
  canViewProvinceSummary: boolean; // 查看全省/全域态势
  canModifyRuleWeights: boolean;   // 调整评分规则与权重参数
  canRecalculateAll: boolean;      // 触发全网一键健康重算
  canExportReports: boolean;       // 导出综合体检与审计报告
  canDispatchWorkOrder: boolean;   // 下发运维督办与检修工单
  canVerifyAndResolve: boolean;    // 现场核验消警与工单结案
  canViewRawTelemetry: boolean;    // 查看底层时序报文
}

export interface MeterHealthFilterParams {
  keyword: string;               // 设施名称 / 器具编号 / 取水权人 / 许可证
  district: string;              // 区县
  level: string;                 // 全部 / 优 / 良 / 中 / 差 / 极差 / 不可用 / 停用
  anomalyKey: string;            // 全部 / 各异常触发项
  dimension: string;             // 全部 / 运行健康度 / 检定 / 停用
  transmissionMethod: string;    // 全部 / 4G RTU / NB-IoT / 光纤 / 接口
  waterSourceType: string;       // 全部 / 地表水 / 地下水 / 泉水 / 自备井
  status: string;                // 全部 / 正常 / 故障 / 停用
  sortBy: 'score_asc' | 'score_desc' | 'time_desc' | 'name_asc';
}

// ==================== 数据归集 -> 推送链路相关类型 ====================
export type DataReceiveMethod = '协议归集' | '接口归集' | '人工归集';
export type PushAggregationStatus = '汇集成功' | '汇集异常' | '待汇集' | '解析失败';
export type PushStatus = '推送成功' | '推送失败' | '待推送' | '重新推送中';

export interface PushPipelineRecord {
  id: string;
  waterDate: string; // 水量时间
  facilityName: string; // 计量设施名称
  facilityCode: string; // 计量设施编号
  permitNumber: string; // 许可编号
  waterOwner: string; // 取水权人
  district: string; // 行政区划
  receiveMethod: DataReceiveMethod; // 数据接收方式
  protocolType: string; // 协议/接口细类 (如 SL651-2014, SZY206-2016, RESTful, Kafka, 人工填报)
  waterVolume: number; // 当期水量 (m³)
  pushPlan: string; // 推送国家平台计划 (如 每日02:00定时推送, 每日04:00增量推送, 月度5日汇总推送)
  syncTime: string; // 同步时间
  aggregationStatus: PushAggregationStatus; // 汇集状态
  pushStatus: PushStatus; // 推送状态
  arrivalStatus: '已到' | '未到'; // 应到/已到/未到
  packetCount?: number; // 报文接收条数
  parseSuccessCount?: number; // 成功解析条数
  nationalReceiptNo?: string; // 国家平台回执单号
  errorCode?: string; // 错误码
  pushReason?: {
    summary: string;
    code: string;
    category: string;
    targetUrl: string;
    nationalReceiptNo?: string;
    pushTime: string;
    latencyMs: number;
    requestPayload: Record<string, any>;
    responsePayload: Record<string, any>;
    timeline: Array<{
      time: string;
      step: string;
      status: 'success' | 'warning' | 'error';
      detail: string;
    }>;
    diagnostics?: string;
    solution?: string;
  };
}

export interface PushPipelineFilterParams {
  waterDate: string;
  facilityCode: string;
  permitNumber: string;
  aggregationStatus: string;
  receiveMethod: string;
  pushStatus: string;
  district?: string;
}
