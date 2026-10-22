import type {
  MeterFacilityHealthRecord,
  MeterHealthScoreDetail,
  HealthScoringRuleConfig,
  HealthScoringRuleItem,
  HealthRolePermission,
  HealthUserRole,
  MeterTelemetryPoint,
  DiagnosticRuleKey,
  DiagnosticDeductionDetail,
  MeterHealthLevel,
  MeterBusinessAction
} from '../types';

/**
 * 整体评分与诊断规则总表配置（严格依据附件 PDF 规范：80分运行健康度 + 20分检定 + 停用不计分覆盖）
 */
export const defaultHealthScoringConfig: HealthScoringRuleConfig = {
  dimensions: {
    operationWeight: 80,
    calibrationWeight: 20,
    deactivatedWeight: 0
  },
  operationGroups: {
    groupAWeight: 24, // 30% of 80
    groupBWeight: 40, // 50% of 80
    groupCWeight: 16  // 20% of 80
  },
  rules: [
    // 1. 运行健康度 A组: 单次数据异常 (折算总分24分，单项折算各6分，单次扣20%=1.2分，上限6分)
    {
      key: 'daily_missing',
      dimension: '运行健康度',
      group: 'A组',
      name: '未上报',
      internalWeight: '25%',
      maxPoints: 6,
      triggerCondition: '单日未上报',
      penaltyRule: '单次扣20%（1.2分）',
      recoveryRule: '异常结束后连续正常，按当前扣分每天恢复10%，10天归零；中断则暂停',
      isRecoverable: '可恢复',
      keepRecord: true,
      linkedAction: '记录异常',
      explanation: '偶发单日未上报。轻扣，快恢复，若连续正常则每日逐步递减恢复分值。'
    },
    {
      key: 'daily_incomplete',
      dimension: '运行健康度',
      group: 'A组',
      name: '缺报',
      internalWeight: '25%',
      maxPoints: 6,
      triggerCondition: '单日缺报',
      penaltyRule: '单次扣20%（1.2分）',
      recoveryRule: '异常结束后连续正常，按当前扣分每天恢复10%，10天归零；中断则暂停',
      isRecoverable: '可恢复',
      keepRecord: true,
      linkedAction: '记录异常',
      explanation: '采集周期内报文偶发性缺失丢失。单次扣1.2分，上限6分。'
    },
    {
      key: 'negative_value',
      dimension: '运行健康度',
      group: 'A组',
      name: '负值',
      internalWeight: '25%',
      maxPoints: 6,
      triggerCondition: '出现负值',
      penaltyRule: '单次扣20%（1.2分）',
      recoveryRule: '异常结束后连续正常，按当前扣分每天恢复10%，10天归零；中断则暂停',
      isRecoverable: '可恢复',
      keepRecord: true,
      linkedAction: '记录异常',
      explanation: '瞬时或日水量出现异常负值（倒流或极性反接），单次扣1.2分，上限6分。'
    },
    {
      key: 'extreme_value',
      dimension: '运行健康度',
      group: 'A组',
      name: '极大值',
      internalWeight: '25%',
      maxPoints: 6,
      triggerCondition: '超阈值',
      penaltyRule: '单次扣20%（1.2分）',
      recoveryRule: '异常结束后连续正常，按当前扣分每天恢复10%，10天归零；中断则暂停',
      isRecoverable: '可恢复',
      keepRecord: true,
      linkedAction: '记录异常',
      explanation: '瞬时流速或日水量超物理合理阈值或跳变过大。单次扣1.2分，上限6分。'
    },

    // 2. 运行健康度 B组: 持续数据异常 (折算总分40分，持续重扣，联动工单)
    {
      key: 'accum_10d_missing',
      dimension: '运行健康度',
      group: 'B组',
      name: '累计10天未上报',
      internalWeight: '40%',
      maxPoints: 16,
      triggerCondition: '累计达10天',
      penaltyRule: '达10天扣16分',
      recoveryRule: '工单关闭且数据真实恢复后，按当前扣分每天恢复10%',
      isRecoverable: '可恢复',
      keepRecord: true,
      linkedAction: '自动生成故障工单',
      explanation: '长周期失联未上报（累计达10天），属于持续严重故障，触发重扣16分并自动派发工单。'
    },
    {
      key: 'consec_15d_same',
      dimension: '运行健康度',
      group: 'B组',
      name: '连续15天同一数',
      internalWeight: '60%',
      maxPoints: 24,
      triggerCondition: '连续15天同值',
      penaltyRule: '达15天扣24分',
      recoveryRule: '工单关闭且数据真实恢复后，按当前扣分每天恢复10%',
      isRecoverable: '可恢复',
      keepRecord: true,
      linkedAction: '自动生成故障工单（高优先级）',
      explanation: '连续15天读数完全相同（恒值死数），疑似传感器损坏或严重卡死，重扣24分并生成高优先级工单。'
    },

    // 3. 运行健康度 C组: 待核实异常 (折算总分16分，存疑，中间扣，核实后调整)
    {
      key: 'accum_20d_zero',
      dimension: '运行健康度',
      group: 'C组',
      name: '累计20天为0',
      internalWeight: '100%',
      maxPoints: 16,
      triggerCondition: '累计达20天',
      penaltyRule: '待核实期间扣50%（8分）；超7天未处理扣100%（16分）',
      recoveryRule: '真实为0：立即撤销；故障为0：转故障维度按故障恢复；无法确认：维持中间分',
      isRecoverable: '视结论',
      keepRecord: true,
      linkedAction: '生成数据核实工单',
      explanation: '取水读数累计20天均为0。需现场核实是停产未取水还是设备故障，存疑期扣8分，超期扣16分。'
    },

    // 4. 检定 A组 (折算总分20分中占20分)
    {
      key: 'calib_near_expiry',
      dimension: '检定',
      group: '检定A组',
      name: '临近到期',
      internalWeight: '20%',
      maxPoints: 4,
      triggerCondition: '30天内到期',
      penaltyRule: '扣4分',
      recoveryRule: '完成检定合格后立即恢复',
      isRecoverable: '可恢复',
      keepRecord: true,
      linkedAction: '预警提醒',
      explanation: '计量器具有效周期临近（≤30天），触发扣4分合规预警，督促送检。'
    },
    {
      key: 'calib_overdue',
      dimension: '检定',
      group: '检定A组',
      name: '超期',
      internalWeight: '100%',
      maxPoints: 16,
      triggerCondition: '超过有效期',
      penaltyRule: '直接置不可用（扣16分）',
      recoveryRule: '完成检定合格后恢复',
      isRecoverable: '可恢复',
      keepRecord: true,
      linkedAction: '禁止使用',
      explanation: '超过国家规定有效检定周期，强制直接置为不可用状态，禁止投入贸易结算与水行政核算。'
    },

    // 5. 检定 B组
    {
      key: 'calib_missing_record',
      dimension: '检定',
      group: '检定B组',
      name: '记录缺失',
      internalWeight: '100%',
      maxPoints: 20,
      triggerCondition: '无检定记录',
      penaltyRule: '扣8分（上限20分）',
      recoveryRule: '补录后立即恢复',
      isRecoverable: '可恢复',
      keepRecord: true,
      linkedAction: '提醒补录',
      explanation: '档案台账中无有效检定记录或证书上传缺失，合规扣8分并提醒补录。'
    },

    // 6. 停用 (状态覆盖)
    {
      key: 'status_deactivated',
      dimension: '停用',
      group: '停用',
      name: '停用',
      internalWeight: '—',
      maxPoints: 0,
      triggerCondition: '人工停用',
      penaltyRule: '状态覆盖，不参与评分',
      recoveryRule: '启用后重新计算',
      isRecoverable: '—',
      keepRecord: true,
      linkedAction: '记录停用原因',
      explanation: '因计划停水、季节性排空或工程检修人工停用，状态覆盖，不参与评分计算。'
    }
  ],
  levels: {
    excellentMin: 90, // 90–100 优 (正常巡检)
    goodMin: 70,      // 70–89 良 (关注)
    mediumMin: 50,    // 50–69 中 (生成维护工单)
    poorMin: 30,      // 30–49 差 (优先处理)
    veryPoorMax: 29   // 0–29 极差 (立即处理)
  }
};

/**
 * 四级角色权限规则矩阵
 */
export const healthRolePermissions: Record<HealthUserRole, HealthRolePermission> = {
  provincial: {
    role: 'provincial',
    roleName: '省级水行政主管部门 (超级管理员)',
    scopeDesc: '管辖青海省全省各市州全部取水计量设施',
    canViewProvinceSummary: true,
    canModifyRuleWeights: true,
    canRecalculateAll: true,
    canExportReports: true,
    canDispatchWorkOrder: true,
    canVerifyAndResolve: true,
    canViewRawTelemetry: true
  },
  municipal: {
    role: 'municipal',
    roleName: '市级水务局监管人员',
    scopeDesc: '管辖西宁市各区县重点取水户与计量监控设施',
    canViewProvinceSummary: false,
    canModifyRuleWeights: false,
    canRecalculateAll: true,
    canExportReports: true,
    canDispatchWorkOrder: true,
    canVerifyAndResolve: true,
    canViewRawTelemetry: true
  },
  county: {
    role: 'county',
    roleName: '区县水务局 / 基层水管所',
    scopeDesc: '管辖本区县辖区内计量设施，负责现场排查与初核',
    canViewProvinceSummary: false,
    canModifyRuleWeights: false,
    canRecalculateAll: false,
    canExportReports: true,
    canDispatchWorkOrder: true,
    canVerifyAndResolve: true,
    canViewRawTelemetry: true
  },
  enterprise: {
    role: 'enterprise',
    roleName: '重点取水权人 / 设备运维维保单位',
    scopeDesc: '仅查看本企业名下所属计量设施的体检单与整改建议',
    canViewProvinceSummary: false,
    canModifyRuleWeights: false,
    canRecalculateAll: false,
    canExportReports: false,
    canDispatchWorkOrder: false,
    canVerifyAndResolve: false,
    canViewRawTelemetry: true
  }
};

/**
 * 核心诊断评分计算函数（严格遵循附件PDF的评分与状态覆盖规则）
 */
export function calculateDiagnosedHealthScore(params: {
  isDeactivated?: boolean;
  calibStatus?: 'valid' | 'near_expiry' | 'overdue' | 'missing_record';
  // A组触发次数（单次扣1.2分，上限6分）
  dailyMissingCount?: number;     // 单日未上报次数
  dailyIncompleteCount?: number;  // 单日缺报次数
  negativeCount?: number;         // 负值次数
  extremeCount?: number;          // 极大值次数
  // B组持续异常
  accum10dMissing?: boolean;      // 累计10天未上报 (达10天扣16分)
  consec15dSame?: boolean;        // 连续15天同一数 (达15天扣24分)
  // C组待核实异常
  accum20dZero?: 'none' | 'pending_8' | 'overdue_16' | 'verified_true' | 'verified_fault';
}): MeterHealthScoreDetail {
  const isDeactivated = Boolean(params.isDeactivated);

  // 1. 停用状态覆盖规则：人工停用不计分，状态覆盖，不参与评分
  if (isDeactivated) {
    const defaultDeductions = buildDefaultDeductions();
    defaultDeductions.status_deactivated.isTriggered = true;
    defaultDeductions.status_deactivated.actualDeduction = 0;
    defaultDeductions.status_deactivated.currentStatusDesc = '人工停用覆盖，不参与评分计算';

    return {
      totalScore: 0,
      operationScore: 0,
      calibrationScore: 0,
      level: '停用',
      businessAction: '不参与评分',
      isDeactivated: true,
      isUnavailable: false,
      totalPenalty: 0,
      operationPenalty: 0,
      calibrationPenalty: 0,
      deductions: defaultDeductions,
      diagnosisText: '设备处于人工停用状态，状态覆盖不参与评分。记录停用原因，启用后重新计算。',
      detailedAdvice: ['已标记为人工停用备案', '启用后系统将根据新到报报文重新恢复评分计算'],
      evaluatedAt: '2026-10-11 12:00:00'
    };
  }

  const deductions = buildDefaultDeductions();

  // 2. 运行健康度 (满分 80 分)
  // A组: 单次数据异常 (每项上限6分，单次扣1.2分)
  const dMissingDeduct = Math.min(6, Number(((params.dailyMissingCount || 0) * 1.2).toFixed(1)));
  deductions.daily_missing.actualDeduction = dMissingDeduct;
  deductions.daily_missing.isTriggered = dMissingDeduct > 0;
  deductions.daily_missing.triggerCountOrDays = params.dailyMissingCount || 0;
  deductions.daily_missing.currentStatusDesc = dMissingDeduct > 0
    ? `单日未上报${params.dailyMissingCount}次，累计扣${dMissingDeduct}分（单次扣1.2分，上限6分）`
    : '正常到报无缺失';

  const dIncompleteDeduct = Math.min(6, Number(((params.dailyIncompleteCount || 0) * 1.2).toFixed(1)));
  deductions.daily_incomplete.actualDeduction = dIncompleteDeduct;
  deductions.daily_incomplete.isTriggered = dIncompleteDeduct > 0;
  deductions.daily_incomplete.triggerCountOrDays = params.dailyIncompleteCount || 0;
  deductions.daily_incomplete.currentStatusDesc = dIncompleteDeduct > 0
    ? `单日缺报${params.dailyIncompleteCount}次，累计扣${dIncompleteDeduct}分（单次扣1.2分，上限6分）`
    : '数据完整无缺报';

  const negativeDeduct = Math.min(6, Number(((params.negativeCount || 0) * 1.2).toFixed(1)));
  deductions.negative_value.actualDeduction = negativeDeduct;
  deductions.negative_value.isTriggered = negativeDeduct > 0;
  deductions.negative_value.triggerCountOrDays = params.negativeCount || 0;
  deductions.negative_value.currentStatusDesc = negativeDeduct > 0
    ? `出现异常负值${params.negativeCount}次，累计扣${negativeDeduct}分（单次扣1.2分，上限6分）`
    : '水流正向正常';

  const extremeDeduct = Math.min(6, Number(((params.extremeCount || 0) * 1.2).toFixed(1)));
  deductions.extreme_value.actualDeduction = extremeDeduct;
  deductions.extreme_value.isTriggered = extremeDeduct > 0;
  deductions.extreme_value.triggerCountOrDays = params.extremeCount || 0;
  deductions.extreme_value.currentStatusDesc = extremeDeduct > 0
    ? `流量超物理阈值${params.extremeCount}次，累计扣${extremeDeduct}分（单次扣1.2分，上限6分）`
    : '读数在合理阈值内';

  // B组: 持续数据异常 (持续重扣，联动工单)
  const accum10dDeduct = params.accum10dMissing ? 16 : 0;
  deductions.accum_10d_missing.actualDeduction = accum10dDeduct;
  deductions.accum_10d_missing.isTriggered = Boolean(params.accum10dMissing);
  deductions.accum_10d_missing.triggerCountOrDays = params.accum10dMissing ? 10 : 0;
  deductions.accum_10d_missing.currentStatusDesc = params.accum10dMissing
    ? '累计10天未上报触发重扣16分，已联动生成故障工单'
    : '近期无长周期未上报';

  const consec15dDeduct = params.consec15dSame ? 24 : 0;
  deductions.consec_15d_same.actualDeduction = consec15dDeduct;
  deductions.consec_15d_same.isTriggered = Boolean(params.consec15dSame);
  deductions.consec_15d_same.triggerCountOrDays = params.consec15dSame ? 15 : 0;
  deductions.consec_15d_same.currentStatusDesc = params.consec15dSame
    ? '连续15天同一数触发重扣24分，已自动生成故障工单（高优先级）'
    : '读数自然变化正常';

  // C组: 待核实异常 (累计20天为0: 待核实扣8分，超期扣16分)
  let accum20dDeduct = 0;
  if (params.accum20dZero === 'pending_8') {
    accum20dDeduct = 8;
    deductions.accum_20d_zero.currentStatusDesc = '累计20天为0，处于7天待核实期间扣50%（8分），已生成数据核实工单';
  } else if (params.accum20dZero === 'overdue_16') {
    accum20dDeduct = 16;
    deductions.accum_20d_zero.currentStatusDesc = '累计20天为0且超7天未处理，扣100%（16分），请尽快核实';
  } else if (params.accum20dZero === 'verified_true') {
    accum20dDeduct = 0;
    deductions.accum_20d_zero.currentStatusDesc = '核实为实际未取水真实为0，扣分已全额撤销';
  } else if (params.accum20dZero === 'verified_fault') {
    accum20dDeduct = 16;
    deductions.accum_20d_zero.currentStatusDesc = '核实确认为设备传感器故障导致为0，扣16分转故障维修';
  } else {
    deductions.accum_20d_zero.currentStatusDesc = '无累计长周期为0情况';
  }
  deductions.accum_20d_zero.actualDeduction = accum20dDeduct;
  deductions.accum_20d_zero.isTriggered = accum20dDeduct > 0;
  deductions.accum_20d_zero.triggerCountOrDays = accum20dDeduct > 0 ? 20 : 0;

  const operationPenalty = Number(
    (dMissingDeduct + dIncompleteDeduct + negativeDeduct + extremeDeduct + accum10dDeduct + consec15dDeduct + accum20dDeduct).toFixed(1)
  );
  const operationScore = Math.max(0, Number((80 - operationPenalty).toFixed(1)));

  // 3. 检定维度 (满分 20 分)
  let calibPenalty = 0;
  let isUnavailable = false;

  if (params.calibStatus === 'near_expiry') {
    deductions.calib_near_expiry.actualDeduction = 4;
    deductions.calib_near_expiry.isTriggered = true;
    deductions.calib_near_expiry.currentStatusDesc = '检定30天内临近到期，扣4分，预警提醒送检';
    calibPenalty += 4;
  } else if (params.calibStatus === 'overdue') {
    deductions.calib_overdue.actualDeduction = 16;
    deductions.calib_overdue.isTriggered = true;
    deductions.calib_overdue.currentStatusDesc = '检定超过有效期！直接置不可用，禁止使用！';
    calibPenalty += 16;
    isUnavailable = true;
  } else if (params.calibStatus === 'missing_record') {
    deductions.calib_missing_record.actualDeduction = 8;
    deductions.calib_missing_record.isTriggered = true;
    deductions.calib_missing_record.currentStatusDesc = '无有效检定记录，合规扣8分，提醒补录';
    calibPenalty += 8;
  }

  const calibrationPenalty = Number(calibPenalty.toFixed(1));
  const calibrationScore = Math.max(0, Number((20 - calibrationPenalty).toFixed(1)));

  // 总扣分与总得分 (满分100 = 80 + 20)
  const totalPenalty = Number((operationPenalty + calibrationPenalty).toFixed(1));
  let totalScore = Math.max(0, Math.min(100, Number((operationScore + calibrationScore).toFixed(1))));

  // 4. 健康度等级映射与业务动作 (PDF 第四部分)
  let level: MeterHealthLevel = '优';
  let businessAction: MeterBusinessAction = '正常巡检';

  if (isUnavailable) {
    level = '不可用';
    businessAction = '禁止使用';
  } else if (totalScore >= 90) {
    level = '优';
    businessAction = '正常巡检';
  } else if (totalScore >= 70) {
    level = '良';
    businessAction = '关注';
  } else if (totalScore >= 50) {
    level = '中';
    businessAction = '生成维护工单';
  } else if (totalScore >= 30) {
    level = '差';
    businessAction = '优先处理';
  } else {
    level = '极差';
    businessAction = '立即处理';
  }

  // 诊断结论与处置建议
  const adviceList: string[] = [];
  let diagnosisText = '设备各项指标优良，通信连续稳定，检定合格，建议维持正常巡检。';

  if (isUnavailable) {
    diagnosisText = '计量器具检定已超期！根据水行政合规规范直接置不可用，禁止继续投入使用。';
    adviceList.push('检定超期合规性违规：立即停止使用并联系具有资质的法定计量机构完成强制检定');
    adviceList.push('完成检定合格并上传合格证书后系统将立即解除不可用状态恢复评分');
  } else if (consec15dDeduct > 0) {
    diagnosisText = '连续15天同一数（恒值死数重扣24分），系统已自动生成高优先级故障工单！';
    adviceList.push('高优先级故障：现场检查机械传感器叶轮是否被泥沙水草杂物卡死');
    adviceList.push('排查远传仪表变送器AD板卡是否死机，重启或更换通信主板');
    adviceList.push('工单关闭且数据真实恢复后，按当前扣分每天恢复10%');
  } else if (accum10dDeduct > 0) {
    diagnosisText = '累计10天未上报（持续异常重扣16分），已自动生成故障工单。';
    adviceList.push('设备长周期失联：排查野外太阳能充电板积尘与蓄电池欠压情况');
    adviceList.push('核实RTU 4G通信卡欠费或天线插头松动断开');
    adviceList.push('工单关闭且数据真实恢复后，按当前扣分每天恢复10%');
  } else if (accum20dDeduct > 0) {
    diagnosisText = `累计20天读数为0（待核实异常扣${accum20dDeduct}分），已生成数据核实工单。`;
    adviceList.push('数据存疑待核实：基层水管所与企业核实是否为真实停产断水');
    adviceList.push('若核实真实为0：在系统内审核确认后立即撤销扣分');
    adviceList.push('若核实为故障为0：转故障维修工单处置');
  } else if (deductions.calib_near_expiry.isTriggered) {
    diagnosisText = '设备运行良好，但检定周期已不足30天临近到期（合规扣4分预警）。';
    adviceList.push('检定临近到期预警：请在30天内安排送检，完成检定合格后立即全额恢复4分');
  } else if (deductions.calib_missing_record.isTriggered) {
    diagnosisText = '设备在线运行正常，但系统档案中缺少法定检定证书记录（合规扣8分）。';
    adviceList.push('缺少检定记录：请在档案中心补录最近一次检定合格证书编号及扫描件，补录后立即恢复');
  } else if (operationPenalty > 0) {
    diagnosisText = `存在A组偶发数据异常（累计扣${operationPenalty}分），状态关注。`;
    if (negativeDeduct > 0) adviceList.push('检出负值反向流动：检查管道止回阀密闭性及电磁传感器接线极性');
    if (extremeDeduct > 0) adviceList.push('检出超阈值极大值：排查供电电磁谐波干扰与瞬时水锤冲击');
    if (dMissingDeduct > 0 || dIncompleteDeduct > 0) adviceList.push('存在单日未上报/缺报：检查通信基站信号与RTU心跳周期');
    adviceList.push('恢复机制：异常结束后连续正常，按当前扣分每天恢复10%，10天归零；中断则暂停');
  }

  return {
    totalScore,
    operationScore,
    calibrationScore,
    level,
    businessAction,
    isDeactivated,
    isUnavailable,
    totalPenalty,
    operationPenalty,
    calibrationPenalty,
    deductions,
    diagnosisText,
    detailedAdvice: adviceList.length > 0 ? adviceList : ['各项指标优良，保持每季度例行巡检即可'],
    evaluatedAt: '2026-10-11 12:00:00'
  };
}

function buildDefaultDeductions(): Record<DiagnosticRuleKey, DiagnosticDeductionDetail> {
  const result: Partial<Record<DiagnosticRuleKey, DiagnosticDeductionDetail>> = {};
  defaultHealthScoringConfig.rules.forEach(rule => {
    result[rule.key] = {
      key: rule.key,
      dimension: rule.dimension,
      group: rule.group as any,
      name: rule.name,
      internalWeight: rule.internalWeight,
      maxPoints: rule.maxPoints,
      triggerCondition: rule.triggerCondition,
      penaltyRule: rule.penaltyRule,
      actualDeduction: 0,
      isTriggered: false,
      triggerCountOrDays: 0,
      isRecoverable: rule.isRecoverable,
      recoveryRule: rule.recoveryRule,
      keepRecord: rule.keepRecord,
      linkedAction: rule.linkedAction,
      currentStatusDesc: '正常无异常'
    };
  });
  return result as Record<DiagnosticRuleKey, DiagnosticDeductionDetail>;
}

/**
 * 24小时时序采集报文模拟数据生成
 */
function generateTelemetryTimeline(
  baseFlow: number,
  pattern: 'normal' | 'negative' | 'frozen' | 'extreme' | 'missing' | 'zero'
): MeterTelemetryPoint[] {
  const points: MeterTelemetryPoint[] = [];
  const hours = [
    '00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
    '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'
  ];

  let accum = 12000;
  for (let i = 0; i < hours.length; i++) {
    const time = hours[i];
    let flow = Math.max(0, Number((baseFlow + (Math.sin(i / 2) * (baseFlow * 0.2))).toFixed(2)));
    let isPointAnomaly = false;
    let anomalyDesc: string | undefined = undefined;
    let isReported = true;

    if (pattern === 'negative' && (i === 6 || i === 7)) {
      flow = -2.85;
      isPointAnomaly = true;
      anomalyDesc = '反向负值（-2.85m³/h）';
    } else if (pattern === 'frozen') {
      flow = 14.20; // 完全相同的僵死值
      isPointAnomaly = i >= 4;
      if (i >= 4) anomalyDesc = '连续同值死数';
    } else if (pattern === 'extreme' && i === 5) {
      flow = Number((baseFlow * 4.8).toFixed(2));
      isPointAnomaly = true;
      anomalyDesc = '极大值超阈值跳变';
    } else if (pattern === 'missing' && (i === 3 || i === 4 || i === 8)) {
      isReported = false;
      isPointAnomaly = true;
      anomalyDesc = '未到报缺报';
    } else if (pattern === 'zero') {
      flow = 0.00;
      isPointAnomaly = false;
    }

    if (isReported && flow > 0) {
      accum += flow * 2;
    }

    points.push({
      time,
      instantFlow: isReported ? flow : 0,
      accumulated: Number(accum.toFixed(1)),
      isReported,
      isAnomaly: isPointAnomaly,
      anomalyType: anomalyDesc
    });
  }
  return points;
}

/**
 * 24台真实水资源在线计量设施全谱系数据集（完整覆盖：优、良、中、差、极差、不可用、停用）
 */
export const mockMeterHealthFacilities: MeterFacilityHealthRecord[] = [
  // 1. 城东区 - 优 (98.8分，正常巡检)
  {
    id: 'mh-01',
    facilityCode: '241017001536',
    facilityName: '1#厂区进水总管超声计量点',
    waterOwner: '西宁市东川供水有限责任公司',
    permitNumber: '取水（青宁）字[2024]第0018号',
    district: '城东区',
    waterSourceType: '地表水',
    facilityType: '超声波水表',
    specModel: 'DN400 (时差高精型)',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '接口直报',
    status: '正常',
    isOnline: true,
    lastReportTime: '2026-10-11 11:15:20',
    currentReading: 18.52,
    accumulatedFlow: 14280.4,
    batteryLevel: 98,
    signalStrength: 92,
    monitorPointCode: 'MP-630102-001',
    address: '城东区八一路日村供水站',
    maintainUnit: '青海智能计量自动化装备工程部',
    maintainPerson: '李向东 13897118821',
    lastCalibrationTime: '2026-03-10',
    calibrationExpiryDate: '2027-03-09',
    hasCalibrationRecord: true,
    healthScore: calculateDiagnosedHealthScore({
      dailyMissingCount: 1, // 单日未上报1次 -> 扣1.2分
      calibStatus: 'valid'
    }),
    recentTelemetry: generateTelemetryTimeline(18.5, 'normal')
  },

  // 2. 城东区 - 不可用 (检定超期，直接置不可用，禁止使用)
  {
    id: 'mh-02',
    facilityCode: '632524JL00186',
    facilityName: '东川热电厂2#水源井计量表',
    waterOwner: '西宁热力新能源投资有限责任公司',
    permitNumber: '取水（青宁）字[2023]第0092号',
    district: '城东区',
    waterSourceType: '地下水',
    facilityType: '电磁水表',
    specModel: 'DN80-G2',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '在线直报',
    status: '故障',
    isOnline: true,
    lastReportTime: '2026-10-11 10:48:11',
    currentReading: 0.00,
    accumulatedFlow: 9845.2,
    batteryLevel: 75,
    signalStrength: 82,
    monitorPointCode: 'MP-630102-004',
    address: '城东区东川工业园金桥路热电厂',
    maintainUnit: '城东区水利基层维保服务所',
    maintainPerson: '王守民 13997230114',
    lastCalibrationTime: '2024-08-10',
    calibrationExpiryDate: '2025-08-09', // 已超期！
    hasCalibrationRecord: true,
    healthScore: calculateDiagnosedHealthScore({
      calibStatus: 'overdue',
      dailyMissingCount: 2
    }),
    recentTelemetry: generateTelemetryTimeline(9.2, 'normal'),
    workOrderPending: true,
    workOrderId: 'WO-20261011-008'
  },

  // 3. 城西区 - 优 (100分满分，正常巡检)
  {
    id: 'mh-03',
    facilityCode: '241017002891',
    facilityName: '循环冷却水补水计量表',
    waterOwner: '青海西矿水务科技有限公司',
    permitNumber: '取水（青宁）字[2024]第0221号',
    district: '城西区',
    waterSourceType: '地表水',
    facilityType: '电磁水表',
    specModel: 'DN100-W4',
    transmissionMethod: '光纤专网在线',
    reportMethod: '在线直报',
    status: '正常',
    isOnline: true,
    lastReportTime: '2026-10-11 11:18:04',
    currentReading: 34.21,
    accumulatedFlow: 89650.0,
    batteryLevel: 96,
    signalStrength: 98,
    monitorPointCode: 'MP-630104-012',
    address: '城西区海湖新区五四西路88号',
    maintainUnit: '西矿自动化监控运维中心',
    maintainPerson: '赵建国 13709715562',
    lastCalibrationTime: '2026-06-15',
    calibrationExpiryDate: '2027-06-14',
    hasCalibrationRecord: true,
    healthScore: calculateDiagnosedHealthScore({
      calibStatus: 'valid'
    }),
    recentTelemetry: generateTelemetryTimeline(34.2, 'normal')
  },

  // 4. 城西区 - 良 (86.4分，关注，偶发缺报与负值)
  {
    id: 'mh-04',
    facilityCode: '241017003112',
    facilityName: '热电动力车间主进水计量点',
    waterOwner: '西宁热力新能源投资有限责任公司',
    permitNumber: '取水（青宁）字[2024]第0198号',
    district: '城西区',
    waterSourceType: '地表水',
    facilityType: '电磁水表',
    specModel: 'DN200-H1',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '在线直报',
    status: '正常',
    isOnline: true,
    lastReportTime: '2026-10-11 11:12:00',
    currentReading: 48.60,
    accumulatedFlow: 124310.2,
    batteryLevel: 88,
    signalStrength: 76,
    monitorPointCode: 'MP-630104-019',
    address: '城西区昆仑西路热力站',
    maintainUnit: '西宁热力水务测控班组',
    maintainPerson: '马振华 13619782291',
    lastCalibrationTime: '2026-04-12',
    calibrationExpiryDate: '2027-04-11',
    hasCalibrationRecord: true,
    healthScore: calculateDiagnosedHealthScore({
      dailyMissingCount: 2,    // 扣 2.4分
      dailyIncompleteCount: 3, // 扣 3.6分
      negativeCount: 2,        // 扣 2.4分
      calibStatus: 'valid'
    }),
    recentTelemetry: generateTelemetryTimeline(48.6, 'negative')
  },

  // 5. 城中区 - 差 (48.0分，优先处理，连续15天同一数扣24分 + 缺报)
  {
    id: 'mh-05',
    facilityCode: '632524JL00412',
    facilityName: '南川铸造深井自备井取水表',
    waterOwner: '青海华鼎实业股份有限公司',
    permitNumber: '取水（青宁）字[2021]第0452号',
    district: '城中区',
    waterSourceType: '自备井',
    facilityType: '机械水表',
    specModel: 'DN50-M1',
    transmissionMethod: 'NB-IoT 远传在线',
    reportMethod: '在线直报',
    status: '正常',
    isOnline: true,
    lastReportTime: '2026-10-11 10:30:15',
    currentReading: 14.20,
    accumulatedFlow: 18230.1,
    batteryLevel: 72,
    signalStrength: 65,
    monitorPointCode: 'MP-630103-015',
    address: '城中区南川西路72号厂区',
    maintainUnit: '青海中科物联仪器技术服务部',
    maintainPerson: '韩庆国 13909714890',
    lastCalibrationTime: '2025-11-20',
    calibrationExpiryDate: '2026-11-19',
    hasCalibrationRecord: true,
    healthScore: calculateDiagnosedHealthScore({
      consec15dSame: true, // 连续15天同一数扣24分，联动高优先级工单
      dailyIncompleteCount: 3, // 扣3.6分
      extremeCount: 2,         // 扣2.4分
      calibStatus: 'missing_record' // 检定记录缺失扣8分
    }),
    recentTelemetry: generateTelemetryTimeline(14.2, 'frozen'),
    workOrderPending: true,
    workOrderId: 'WO-20261011-015'
  },

  // 6. 城中区 - 优 (94.8分，正常巡检，检定临近到期扣4分)
  {
    id: 'mh-06',
    facilityCode: '241017005520',
    facilityName: '南川生态绿化引水计量点',
    waterOwner: '西宁市城市园林绿化管理处',
    permitNumber: '取水（青宁）字[2023]第0054号',
    district: '城中区',
    waterSourceType: '地表水',
    facilityType: '超声波水表',
    specModel: 'DN150-Z3',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '在线直报',
    status: '正常',
    isOnline: true,
    lastReportTime: '2026-10-11 11:16:45',
    currentReading: 12.40,
    accumulatedFlow: 38740.0,
    batteryLevel: 94,
    signalStrength: 89,
    monitorPointCode: 'MP-630103-022',
    address: '城中区南川公园泵房引水渠',
    maintainUnit: '青海水总水电工程局计量分公司',
    maintainPerson: '张永强 13519706673',
    lastCalibrationTime: '2025-10-25',
    calibrationExpiryDate: '2026-10-24', // 30天内到期！
    hasCalibrationRecord: true,
    healthScore: calculateDiagnosedHealthScore({
      dailyMissingCount: 1, // 扣1.2分
      calibStatus: 'near_expiry' // 扣4分预警
    }),
    recentTelemetry: generateTelemetryTimeline(12.4, 'normal')
  },

  // 7. 城北区 - 极差 (24.0分，立即处理，累计10天未上报16分 + 连续15天同一数24分 + 检定缺失)
  {
    id: 'mh-07',
    facilityCode: '632524JL00689',
    facilityName: '北川工业园A区供水总表',
    waterOwner: '西宁北川工业园区给水站',
    permitNumber: '取水（青宁）字[2023]第0089号',
    district: '城北区',
    waterSourceType: '地下水',
    facilityType: '超声波水表',
    specModel: 'DN80-E3',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '在线直报',
    status: '故障',
    isOnline: false,
    lastReportTime: '2026-09-30 14:10:00',
    currentReading: 0.00,
    accumulatedFlow: 34120.5,
    batteryLevel: 4,
    signalStrength: 0,
    monitorPointCode: 'MP-630105-003',
    address: '城北区门源路北川工业园A区',
    maintainUnit: '北川高新技术产业园基建运维部',
    maintainPerson: '陈明福 13897223341',
    lastCalibrationTime: '-',
    calibrationExpiryDate: '-',
    hasCalibrationRecord: false,
    healthScore: calculateDiagnosedHealthScore({
      accum10dMissing: true, // 扣16分
      consec15dSame: true,   // 扣24分
      calibStatus: 'missing_record', // 扣8分
      dailyMissingCount: 5   // 扣6分上限
    }),
    recentTelemetry: generateTelemetryTimeline(12.8, 'missing'),
    workOrderPending: true,
    workOrderId: 'WO-20261011-020'
  },

  // 8. 城北区 - 中 (64.0分，生成维护工单，累计20天为0待核实期扣8分 + 检定缺失扣8分)
  {
    id: 'mh-08',
    facilityCode: '241017006711',
    facilityName: '生物科技园区医药制剂纯水计量点',
    waterOwner: '青海金诃藏药股份有限公司',
    permitNumber: '取水（青宁）字[2024]第0315号',
    district: '城北区',
    waterSourceType: '地下水',
    facilityType: '电磁水表',
    specModel: 'DN100-M2',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '在线直报',
    status: '正常',
    isOnline: true,
    lastReportTime: '2026-10-11 11:10:20',
    currentReading: 0.00,
    accumulatedFlow: 51200.8,
    batteryLevel: 92,
    signalStrength: 85,
    monitorPointCode: 'MP-630105-018',
    address: '城北区生物科技产业园经二路',
    maintainUnit: '青海汇信水务智能科技服务公司',
    maintainPerson: '刘学军 13709789901',
    lastCalibrationTime: '-',
    calibrationExpiryDate: '-',
    hasCalibrationRecord: false,
    healthScore: calculateDiagnosedHealthScore({
      accum20dZero: 'pending_8', // 待核实扣8分
      calibStatus: 'missing_record' // 检定缺失扣8分
    }),
    recentTelemetry: generateTelemetryTimeline(0, 'zero'),
    workOrderPending: true,
    workOrderId: 'WO-20261011-032'
  },

  // 9. 湟中区 - 停用 (人工停用，状态覆盖，不参与评分)
  {
    id: 'mh-09',
    facilityCode: '632524JL00781',
    facilityName: '泥隆台、中庄3村集中供水点',
    waterOwner: '湟中区水利水保局',
    permitNumber: '取水（青宁）字[2025]第0114号',
    district: '湟中区',
    waterSourceType: '泉水',
    facilityType: '电磁水表',
    specModel: 'DN150-Z5',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '在线直报',
    status: '停用',
    isOnline: false,
    lastReportTime: '2026-09-07 09:40:11',
    currentReading: 0.00,
    accumulatedFlow: 45120.0,
    batteryLevel: 0,
    signalStrength: 0,
    monitorPointCode: 'MP-630106-019',
    address: '湟中区鲁沙尔镇泥隆台村',
    maintainUnit: '湟中区农村供水工程管理站',
    maintainPerson: '何建平 13997125588',
    lastCalibrationTime: '2025-05-18',
    calibrationExpiryDate: '2026-05-17',
    hasCalibrationRecord: true,
    healthScore: calculateDiagnosedHealthScore({
      isDeactivated: true
    }),
    recentTelemetry: generateTelemetryTimeline(0, 'zero')
  },

  // 10. 湟中区 - 优 (96.4分，正常巡检)
  {
    id: 'mh-10',
    facilityCode: '241017008920',
    facilityName: '多巴新城水务调蓄水池计量表',
    waterOwner: '青海多巴新城开发建设有限公司',
    permitNumber: '取水（青宁）字[2024]第0088号',
    district: '湟中区',
    waterSourceType: '地表水',
    facilityType: '多声道超声计',
    specModel: 'DN300-U4',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '接口直报',
    status: '正常',
    isOnline: true,
    lastReportTime: '2026-10-11 11:19:15',
    currentReading: 62.40,
    accumulatedFlow: 219800.0,
    batteryLevel: 97,
    signalStrength: 91,
    monitorPointCode: 'MP-630106-035',
    address: '湟中区多巴新城双飞大道101号',
    maintainUnit: '青海联创水务信息科技有限公司',
    maintainPerson: '郭海波 13619717734',
    lastCalibrationTime: '2026-07-01',
    calibrationExpiryDate: '2027-06-30',
    hasCalibrationRecord: true,
    healthScore: calculateDiagnosedHealthScore({
      dailyMissingCount: 1, // 扣1.2分
      extremeCount: 2,       // 扣2.4分
      calibStatus: 'valid'
    }),
    recentTelemetry: generateTelemetryTimeline(62.4, 'normal')
  },

  // 11. 大通县 - 中 (58.0分，生成维护工单，累计10天未上报扣16分 + 极大值扣6分)
  {
    id: 'mh-11',
    facilityCode: '632524JL00902',
    facilityName: '桥头铝业生产用水引水监测站',
    waterOwner: '国家电投黄河上游水电开发铝业分公司',
    permitNumber: '取水（青宁）字[2023]第0402号',
    district: '大通县',
    waterSourceType: '地表水',
    facilityType: '电磁水表',
    specModel: 'DN250-F2',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '在线直报',
    status: '正常',
    isOnline: true,
    lastReportTime: '2026-10-11 11:14:30',
    currentReading: 82.50,
    accumulatedFlow: 382400.0,
    batteryLevel: 89,
    signalStrength: 82,
    monitorPointCode: 'MP-630121-015',
    address: '大通县桥头镇铝厂引水干渠',
    maintainUnit: '黄河水电大通铝业动力运维车间',
    maintainPerson: '杨志明 13897140023',
    lastCalibrationTime: '2026-01-20',
    calibrationExpiryDate: '2027-01-19',
    hasCalibrationRecord: true,
    healthScore: calculateDiagnosedHealthScore({
      accum10dMissing: true, // 扣16分，联动故障工单
      extremeCount: 5,       // 上限扣6分
      calibStatus: 'valid'
    }),
    recentTelemetry: generateTelemetryTimeline(82.5, 'extreme'),
    workOrderPending: true,
    workOrderId: 'WO-20261011-041'
  },

  // 12. 大通县 - 差 (44.0分，优先处理，累计10天未上报16分 + 累计20天为0待核实8分 + 检定缺失8分 + 负值4.0分)
  {
    id: 'mh-12',
    facilityCode: '632524JL00945',
    facilityName: '与林村集中供水深井计量表',
    waterOwner: '大通回族土族自治县水利局',
    permitNumber: '取水（青宁）字[2022]第0308号',
    district: '大通县',
    waterSourceType: '地下水',
    facilityType: '机械水表',
    specModel: 'DN65-K1',
    transmissionMethod: 'NB-IoT 远传在线',
    reportMethod: '在线直报',
    status: '故障',
    isOnline: true,
    lastReportTime: '2026-10-11 08:22:10',
    currentReading: -1.20,
    accumulatedFlow: 23100.8,
    batteryLevel: 42,
    signalStrength: 50,
    monitorPointCode: 'MP-630121-008',
    address: '大通县桥头镇与林村供水点',
    maintainUnit: '大通县自来水公司工程技术室',
    maintainPerson: '白万林 13997103322',
    lastCalibrationTime: '-',
    calibrationExpiryDate: '-',
    hasCalibrationRecord: false,
    healthScore: calculateDiagnosedHealthScore({
      accum10dMissing: true, // 扣16分
      accum20dZero: 'pending_8', // 扣8分
      negativeCount: 3,      // 扣3.6分
      calibStatus: 'missing_record', // 扣8分
      dailyMissingCount: 2   // 扣2.4分
    }),
    recentTelemetry: generateTelemetryTimeline(5.8, 'negative'),
    workOrderPending: true,
    workOrderId: 'WO-20261011-045'
  },

  // 13. 湟源县 - 良 (82.4分，关注，检定记录缺失扣8分 + 偶发缺报)
  {
    id: 'mh-13',
    facilityCode: '241017011022',
    facilityName: '湟源县城关集中供水总站表',
    waterOwner: '湟源县水务局供水总站',
    permitNumber: '取水（青宁）字[2024]第0511号',
    district: '湟源县',
    waterSourceType: '地下水',
    facilityType: '电磁水表',
    specModel: 'DN100-W4',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '在线直报',
    status: '正常',
    isOnline: true,
    lastReportTime: '2026-10-11 11:17:33',
    currentReading: 15.60,
    accumulatedFlow: 62450.9,
    batteryLevel: 91,
    signalStrength: 86,
    monitorPointCode: 'MP-630123-002',
    address: '湟源县城关镇东大街15号',
    maintainUnit: '湟源县自来水供水维保队',
    maintainPerson: '曹宝成 13709748892',
    lastCalibrationTime: '-',
    calibrationExpiryDate: '-',
    hasCalibrationRecord: false,
    healthScore: calculateDiagnosedHealthScore({
      calibStatus: 'missing_record', // 扣8分
      dailyMissingCount: 3, // 扣3.6分
      dailyIncompleteCount: 5 // 扣6分上限
    }),
    recentTelemetry: generateTelemetryTimeline(15.6, 'normal')
  },

  // 14. 湟源县 - 优 (97.6分，正常巡检)
  {
    id: 'mh-14',
    facilityCode: '241017011340',
    facilityName: '日月乡农牧节水灌溉引水口计量站',
    waterOwner: '湟源县农牧水利综合服务中心',
    permitNumber: '取水（青宁）字[2023]第0612号',
    district: '湟源县',
    waterSourceType: '地表水',
    facilityType: '超声波水表',
    specModel: 'DN150-S2',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '在线直报',
    status: '正常',
    isOnline: true,
    lastReportTime: '2026-10-11 11:05:40',
    currentReading: 10.50,
    accumulatedFlow: 41800.0,
    batteryLevel: 80,
    signalStrength: 68,
    monitorPointCode: 'MP-630123-018',
    address: '湟源县日月藏族乡莫多村',
    maintainUnit: '青海科达水利测控仪器所',
    maintainPerson: '宋文博 13639712211',
    lastCalibrationTime: '2026-05-10',
    calibrationExpiryDate: '2027-05-09',
    hasCalibrationRecord: true,
    healthScore: calculateDiagnosedHealthScore({
      dailyMissingCount: 2, // 扣2.4分
      calibStatus: 'valid'
    }),
    recentTelemetry: generateTelemetryTimeline(10.5, 'normal')
  },

  // 15. 城中区 - 优 (98.8分，正常巡检)
  {
    id: 'mh-15',
    facilityCode: '241017012015',
    facilityName: '南川工业园区动力站纯水表',
    waterOwner: '青海电子材料产业发展有限公司',
    permitNumber: '取水（青宁）字[2024]第0156号',
    district: '城中区',
    waterSourceType: '地下水',
    facilityType: '电磁水表',
    specModel: 'DN80-E4',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '在线直报',
    status: '正常',
    isOnline: true,
    lastReportTime: '2026-10-11 11:18:50',
    currentReading: 22.30,
    accumulatedFlow: 94100.0,
    batteryLevel: 99,
    signalStrength: 95,
    monitorPointCode: 'MP-630103-031',
    address: '城中区同安路112号电子新材料园',
    maintainUnit: '青海电子材料机电保全部',
    maintainPerson: '任建军 13897156644',
    lastCalibrationTime: '2026-02-18',
    calibrationExpiryDate: '2027-02-17',
    hasCalibrationRecord: true,
    healthScore: calculateDiagnosedHealthScore({
      dailyMissingCount: 1, // 扣1.2分
      calibStatus: 'valid'
    }),
    recentTelemetry: generateTelemetryTimeline(22.3, 'normal')
  },

  // 16. 城东区 - 良 (76.4分，关注，A组多项扣分 + 检定缺失)
  {
    id: 'mh-16',
    facilityCode: '241017012588',
    facilityName: '东川工业园热电联产冷凝回水表',
    waterOwner: '西宁热力新能源投资有限责任公司',
    permitNumber: '取水（青宁）字[2024]第0198号',
    district: '城东区',
    waterSourceType: '地表水',
    facilityType: '涡轮流量计',
    specModel: 'DN125-T1',
    transmissionMethod: '4G RTU 远传在线',
    reportMethod: '在线直报',
    status: '正常',
    isOnline: true,
    lastReportTime: '2026-10-11 11:15:10',
    currentReading: 31.40,
    accumulatedFlow: 168920.0,
    batteryLevel: 86,
    signalStrength: 80,
    monitorPointCode: 'MP-630102-029',
    address: '城东区东川工业园金桥路',
    maintainUnit: '西宁热力水务测控班组',
    maintainPerson: '马振华 13619782291',
    lastCalibrationTime: '-',
    calibrationExpiryDate: '-',
    hasCalibrationRecord: false,
    healthScore: calculateDiagnosedHealthScore({
      dailyMissingCount: 3,    // 扣3.6分
      dailyIncompleteCount: 3, // 扣3.6分
      extremeCount: 3,         // 扣3.6分
      calibStatus: 'missing_record' // 扣8分
    }),
    recentTelemetry: generateTelemetryTimeline(31.4, 'normal')
  }
];

/**
 * 统计汇总健康度大盘指标（基于最新七大等级及状态覆盖规范）
 */
export function getMeterHealthSummary(list: MeterFacilityHealthRecord[]) {
  const totalCount = list.length;
  const activeCount = list.filter(item => !item.healthScore.isDeactivated).length;
  const onlineCount = list.filter(item => item.isOnline).length;
  const onlineRate = totalCount > 0 ? Number(((onlineCount / totalCount) * 100).toFixed(1)) : 0;

  // 仅计算未停用设备的有效平均得分
  const scoredItems = list.filter(item => !item.healthScore.isDeactivated && !item.healthScore.isUnavailable);
  const totalScoreSum = scoredItems.reduce((acc, cur) => acc + cur.healthScore.totalScore, 0);
  const avgScore = scoredItems.length > 0 ? Number((totalScoreSum / scoredItems.length).toFixed(1)) : 0;

  // 等级分布
  const excellentCount = list.filter(item => item.healthScore.level === '优').length;
  const goodCount = list.filter(item => item.healthScore.level === '良').length;
  const mediumCount = list.filter(item => item.healthScore.level === '中').length;
  const poorCount = list.filter(item => item.healthScore.level === '差').length;
  const veryPoorCount = list.filter(item => item.healthScore.level === '极差').length;
  const unavailableCount = list.filter(item => item.healthScore.level === '不可用').length;
  const deactivatedCount = list.filter(item => item.healthScore.level === '停用').length;

  const pendingWorkOrders = list.filter(item => item.workOrderPending).length;

  return {
    totalCount,
    activeCount,
    onlineCount,
    onlineRate,
    avgScore,
    excellentCount,
    goodCount,
    mediumCount,
    poorCount,
    veryPoorCount,
    unavailableCount,
    deactivatedCount,
    pendingWorkOrders
  };
}
