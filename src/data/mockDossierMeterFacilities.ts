export interface DossierMeterFaultRecord {
  id: string;
  code: string;
  faultTime: string;
  faultType: string;
  faultReading: number;
  faultDesc: string;
  status: '已修复' | '处理中' | '待审核';
  finishTime: string;
  engineer: string;
  resolvedReading: number;
  resolvedDesc: string;
  images: string[];
}

export interface DossierMeterDisableRecord {
  id: string;
  code: string;
  changeType: '计划性停用' | '季节性防冻排空' | '设施检修停用' | '恢复启用';
  applyTime: string;
  effectiveTime: string;
  resumeTime: string;
  stopReading: number;
  resumeReading: number;
  reason: string;
  sealCode: string;
  operator: string;
  approver: string;
  auditStatus: '审核通过(已备案)' | '已现场启封核验' | '已铅封归档';
  vouchers: string[];
}

export interface DossierMeterReplaceRecord {
  id: string;
  code: string;
  replaceDate: string;
  reason: string;
  oldMeterCode: string;
  oldMeterStopReading: number;
  oldMeterDisposal: string;
  newMeterCode: string;
  newMeterModel: string;
  newMeterStartReading: number;
  newCertCode: string;
  constructor: string;
  inspector: string;
  documents: string[];
}

export interface DossierMeterManualRecord {
  id: string;
  recordNo: string;
  periodLabel: string;
  readingDate: string;
  startReading: number;
  endReading: number;
  waterVolume: number;
  reporterName: string;
  reporterPhone: string;
  submitTime: string;
  auditStatus: '已审核通过' | '待审核' | '已驳回';
  auditor: string;
  auditComment: string;
  vouchers: string[];
  notes?: string;
}

export interface DossierMeterFacility {
  id: string;
  index: number;
  code: string;
  name: string;
  specModel: string;
  facilityType: string;
  caliber: string;
  accuracy: string;
  transmissionMethod: string;
  status: '正常' | '故障' | '停用';
  currentReading: number;
  initialReading: number;
  instantFlow: number;
  lastReportTime: string;
  calibrationPeriod: string;
  lastCalibrationTime: string;
  calibrationExpiryDate: string;
  calibrationStatus: string;
  powerSupply: string;
  protocol: string;
  stationName: string;
  monitorPointCode: string;
  intakeName: string;
  address: string;
  coordinates: string;
  manageUnit: string;
  builderUnit: string;
  maintainUnit: string;
  maintainPerson: string;
  batteryLevel: number;
  signalStrength: number;
  isOnline: boolean;
  
  // 各类全生命周期记录
  faultRecords: DossierMeterFaultRecord[];
  disableRecords: DossierMeterDisableRecord[];
  replaceRecords: DossierMeterReplaceRecord[];
  manualRecords: DossierMeterManualRecord[];
}

// 根据档案生成该企业对应的计量设施全集及各类记录
export function getDossierMeterFacilities(
  dossierId: string,
  waterOwnerName: string,
  permitNumber: string,
  district: string = '湟中区'
): DossierMeterFacility[] {
  const facilityCount = 6;
  const facilities: DossierMeterFacility[] = [];

  const meterNames = [
    '1#厂区进水总管超声计量点',
    '2#化验车间支管电磁计量点',
    '3#动力站冷凝回水计量点',
    '4#备用水源深井计量点',
    '5#尾矿回用水回流监测点',
    '6#厂区绿化非常规水计量点',
  ];

  const specModels = [
    '电磁流量计 DN400 (高精度型)',
    '超声波流量计 DN250 (时差法)',
    '涡轮流量计 DN150 (智能脉冲)',
    '多声道超声计 DN300 (井用潜水型)',
    '电磁流量计 DN200 (耐腐蚀衬里)',
    '智能机械水表 DN80 (无线远传)',
  ];

  const calibers = ['DN400', 'DN250', 'DN150', 'DN300', 'DN200', 'DN80'];
  const types = ['电磁流量计', '超声波流量计', '涡轮流量计', '超声波流量计', '电磁流量计', '智能机械水表'];
  const methods = ['4G RTU 远传在线', '4G RTU 远传在线', 'NB-IoT 远传在线', '4G RTU 远传在线', '光纤专网在线', '非在线人工抄表'];
  const statuses: ('正常' | '故障' | '停用')[] = ['正常', '正常', '正常', '正常', '正常', '正常'];
  
  // 针对特定设施给一点丰富的差异化状态
  if (dossierId === 'DOS-002') {
    statuses[3] = '停用';
  } else if (dossierId === 'DOS-005') {
    statuses[1] = '故障';
  }

  for (let i = 0; i < facilityCount; i++) {
    const idx = i + 1;
    const code = `JL-XN-2026-0${idx}`;
    const baseNum = 124050 + idx * 1845.2;

    // 1. 故障记录
    const faultRecords: DossierMeterFaultRecord[] = [
      {
        id: `FLT-${dossierId}-${idx}-01`,
        code: `GZ-202607-00${idx}`,
        faultTime: '2026-07-14 09:25',
        faultType: idx % 2 === 0 ? '4G通信模组间歇性离线' : '瞬时流量波动跳变异常',
        faultReading: Math.round(baseNum - 420.5),
        faultDesc: `${meterNames[i]}现场信号波动，RTU数据连续2小时未向省级水资源监管专网上报，现场核验天线接头受潮阻抗变大。`,
        status: '已修复',
        finishTime: '2026-07-14 16:40',
        engineer: '周工 (西宁智慧水务运维部)',
        resolvedReading: Math.round(baseNum - 418.0),
        resolvedDesc: '更换IP68防水通信天线与4G物联SIM卡，并升级固件版本，遥测链路自检恢复正常。',
        images: [
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
          'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
        ],
      },
      {
        id: `FLT-${dossierId}-${idx}-02`,
        code: `GZ-202511-01${idx}`,
        faultTime: '2025-11-03 14:10',
        faultType: '高寒低温表头显示屏凝露',
        faultReading: Math.round(baseNum - 3890.0),
        faultDesc: '冬季初寒夜间温差大，表计转换器防爆观察窗轻微结雾凝露，液晶读数模糊。',
        status: '已修复',
        finishTime: '2025-11-04 11:20',
        engineer: '李师傅 (第三方运维团队)',
        resolvedReading: Math.round(baseNum - 3885.5),
        resolvedDesc: '重新烘干加装干燥除湿硅胶，更换耐低温密封圈，加装防寒自限温伴热带。',
        images: [
          'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
        ],
      },
    ];

    // 2. 停用记录
    const disableRecords: DossierMeterDisableRecord[] = [
      {
        id: `DIS-${dossierId}-${idx}-01`,
        code: `TY-2026-0301-${idx}`,
        changeType: '恢复启用',
        applyTime: '2026-03-01 09:00',
        effectiveTime: '2026-03-02 00:00',
        resumeTime: '2026-03-02 08:30',
        stopReading: Math.round(baseNum - 1200.0),
        resumeReading: Math.round(baseNum - 1200.0),
        reason: '冬季供水管道防冻排空检修结束，全厂春季满负荷复工生产，申请解封恢复计量供水。',
        sealCode: `QF-6301-2026-0${idx}8`,
        operator: '王建民 (企业动力保障处)',
        approver: `${district}水务局水资源管理股 (审批通过)`,
        auditStatus: '已现场启封核验',
        vouchers: [
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
        ],
      },
      {
        id: `DIS-${dossierId}-${idx}-02`,
        code: `TY-2025-1215-${idx}`,
        changeType: '季节性防冻排空',
        applyTime: '2025-12-15 14:30',
        effectiveTime: '2025-12-16 00:00',
        resumeTime: '2026-03-02 00:00',
        stopReading: Math.round(baseNum - 1200.0),
        resumeReading: Math.round(baseNum - 1200.0),
        reason: '高原冬季极寒天气防冻保温，管线排空停水，现场关闭前段闸阀并实施法定铅封。',
        sealCode: `QF-6301-2025-0${idx}2`,
        operator: '张主管 (企业环保安全部)',
        approver: `${district}水利水保局 (核准备案)`,
        auditStatus: '已铅封归档',
        vouchers: [
          'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
        ],
      },
    ];

    // 3. 换表记录
    const replaceRecords: DossierMeterReplaceRecord[] = [
      {
        id: `REP-${dossierId}-${idx}-01`,
        code: `HB-202409-0${idx}`,
        replaceDate: '2024-09-12',
        reason: '原机械水表服役满6年达到法定轮换周期，统一升级为具备4G RTU遥测功能的电磁/超声水表。',
        oldMeterCode: `6301-OLD-00${idx}`,
        oldMeterStopReading: Math.round(baseNum - 15200.0),
        oldMeterDisposal: '送青海省计量检定测试院检定存档，出具终审报废证明后集中注销。',
        newMeterCode: code,
        newMeterModel: specModels[i],
        newMeterStartReading: 0.0,
        newCertCode: `青计检[2024]字第0882${idx}号`,
        constructor: '中水北方勘测设计水利水工工程局 (周工程师)',
        inspector: `${district}水务局水资源监督科 (赵科长)`,
        documents: [
          'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
        ],
      },
    ];

    // 4. 人工填报记录 (对未联网或比对核验场景)
    const manualRecords: DossierMeterManualRecord[] = [
      {
        id: `MAN-${dossierId}-${idx}-01`,
        recordNo: `RG-202609-0${idx}1`,
        periodLabel: '2026年08月',
        readingDate: '2026-09-02',
        startReading: Math.round(baseNum - 320.0),
        endReading: Math.round(baseNum),
        waterVolume: 320.0,
        reporterName: '王晓强 (专职抄表员)',
        reporterPhone: '18097118822',
        submitTime: '2026-09-02 10:15:30',
        auditStatus: '已审核通过',
        auditor: '水资源监督科-张工',
        auditComment: '表头读数清晰，与4G遥测平台远传底数完全对标吻合，已核销入库。',
        vouchers: [
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
        ],
        notes: '8月份厂区按生产负荷平稳取水，进出水流量仪表校验正常。',
      },
      {
        id: `MAN-${dossierId}-${idx}-02`,
        recordNo: `RG-202608-0${idx}2`,
        periodLabel: '2026年07月',
        readingDate: '2026-08-03',
        startReading: Math.round(baseNum - 655.0),
        endReading: Math.round(baseNum - 320.0),
        waterVolume: 335.0,
        reporterName: '王晓强 (专职抄表员)',
        reporterPhone: '18097118822',
        submitTime: '2026-08-03 14:22:18',
        auditStatus: '已审核通过',
        auditor: '水资源监督科-李工',
        auditComment: '月度抄见量无异常波动，与计划指标匹配。',
        vouchers: [
          'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
        ],
        notes: '定期人工巡查复核，铅封完好，表具运行工况良好。',
      },
      {
        id: `MAN-${dossierId}-${idx}-03`,
        recordNo: `RG-202607-0${idx}3`,
        periodLabel: '2026年06月',
        readingDate: '2026-07-04',
        startReading: Math.round(baseNum - 960.0),
        endReading: Math.round(baseNum - 655.0),
        waterVolume: 305.0,
        reporterName: '王晓强 (专职抄表员)',
        reporterPhone: '18097118822',
        submitTime: '2026-07-04 11:05:40',
        auditStatus: '已审核通过',
        auditor: '水资源监督科-李工',
        auditComment: '核算无误，数据闭环归档。',
        vouchers: [
          'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
        ],
        notes: '半年总结度抄表，与年度水资源税计税水量一致。',
      },
    ];

    facilities.push({
      id: `FAC-${dossierId}-${idx}`,
      index: idx,
      code,
      name: meterNames[i],
      specModel: specModels[i],
      facilityType: types[i],
      caliber: calibers[i],
      accuracy: idx % 2 === 1 ? '0.5级' : '1.0级',
      transmissionMethod: methods[i],
      status: statuses[i],
      currentReading: Number(baseNum.toFixed(1)),
      initialReading: 0.0,
      instantFlow: Number((18.5 + idx * 3.2).toFixed(1)),
      lastReportTime: '2026-09-14 17:50:00',
      calibrationPeriod: '24 个月 / 次',
      lastCalibrationTime: '2025-05-18',
      calibrationExpiryDate: '2027-05-17',
      calibrationStatus: '合格 (有效期内)',
      powerSupply: idx === 4 ? '市电 220V 双回路供电' : '太阳能板 60W + 磷酸铁锂电池组 24V',
      protocol: 'SL651-2014《水文水资源监测数据传输规约》',
      stationName: `西宁市${district}${waterOwnerName.slice(0, 6)}遥测站${idx}号点`,
      monitorPointCode: `MP-6301-${idx.toString().padStart(4, '0')}`,
      intakeName: idx <= 3 ? '1# 湟水河地表水取水泵站' : '2# 应急备用水源深井井群',
      address: `青海省西宁市${district}东川工业园区${idx}号取水管道测流井`,
      coordinates: `东经 101.78${idx}1°，北纬 36.62${idx}4°`,
      manageUnit: `${district}水务局水资源管理处`,
      builderUnit: '中水北方勘测设计水利水工工程局',
      maintainUnit: '西宁智慧水务科技有限公司',
      maintainPerson: '李工 (13897128841)',
      batteryLevel: 92 - idx * 2,
      signalStrength: 95 - idx * 3,
      isOnline: statuses[i] !== '停用',
      faultRecords,
      disableRecords,
      replaceRecords,
      manualRecords,
    });
  }

  return facilities;
}
