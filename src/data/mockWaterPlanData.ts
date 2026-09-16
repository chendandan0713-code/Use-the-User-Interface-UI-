import { WaterPlanRecord, FormQuotaData, WaterPlanDocumentIssue } from '../types';

export const initialWaterPlanRecords: WaterPlanRecord[] = [
  {
    id: 'WP-2025-0001',
    city: '西宁市',
    district: '大通县',
    unitName: '西宁铝电开发有限公司（取水许可重点单位）',
    creditCode: '9132732927556',
    industryType: '4.有色',
    isPublicPipeNetwork: '否',
    isSelfWaterSource: '是',
    isAboveDesignatedSize: '是',
    keyType: '重点',
    directManageType: '流域管理机构',
    waterIntakeType: '水资源配置类',
    itemType: '首次填报',
    status: '县级待审核',
    permitVolume: 123.45,
    planVolume: 123.45,
    surfaceWater: 12.34,
    groundwater: 23.45,
    unconventionalTotal: 34.56,
    recycledWater: 24.50,
    mineWater: 5.06,
    rainWater: 5.00,
    brackishWater: 0.00,
    year: '2025',
    userType: 'permit',
    permitNumber: '取水（青宁大）字[2025]第0001号',
    supervisorUnit: '大通回族土族自治县水务局',
    applyDate: '2025-01-15',
    auditHistory: [
      {
        stepName: '企业年度申报',
        operator: '张明海（申报专工）',
        department: '西宁铝电开发有限公司水资源部',
        action: '提交申报',
        time: '2025-01-15 09:30:21',
        opinion: '依据2025年度产能扩建排产计划编制用水计划，已严格落实定额用水标准。',
        status: 'passed'
      },
      {
        stepName: '县级水行政主管初审',
        operator: '李建军（科长）',
        department: '大通县水务局水资源管理股',
        action: '待初审',
        time: '2025-01-16 10:00:00',
        opinion: '待对企业填报的自备水源取水量与红线指标进行现场核验。',
        status: 'pending'
      }
    ]
  },
  {
    id: 'WP-2025-0002',
    city: '西宁市',
    district: '大通县',
    unitName: '大通北川综合供水管网服务有限公司',
    creditCode: '9132732927556',
    industryType: '4.有色',
    isPublicPipeNetwork: '否',
    isSelfWaterSource: '是',
    isAboveDesignatedSize: '否',
    keyType: '非重点',
    directManageType: '省级',
    waterIntakeType: '河道内生产类',
    itemType: '首次填报',
    status: '县级待审核',
    permitVolume: 123.45,
    planVolume: 123.45,
    surfaceWater: 12.34,
    groundwater: 23.45,
    unconventionalTotal: 34.56,
    recycledWater: 20.00,
    mineWater: 8.56,
    rainWater: 6.00,
    brackishWater: 0.00,
    year: '2025',
    userType: 'public_supply',
    permitNumber: '取水（青宁大）字[2025]第0002号',
    supervisorUnit: '大通县住房和城乡建设局',
    applyDate: '2025-01-16',
    auditHistory: [
      {
        stepName: '企业年度申报',
        operator: '马晓峰',
        department: '管网生产调度科',
        action: '提交申报',
        time: '2025-01-16 11:20:00',
        opinion: '申报公共供水服务区年度用水总量。',
        status: 'passed'
      }
    ]
  },
  {
    id: 'WP-2025-0003',
    city: '西宁市',
    district: '大通县',
    unitName: '青海华硅半导体材料制造有限公司',
    creditCode: '9132732927556',
    industryType: '4.有色',
    isPublicPipeNetwork: '否',
    isSelfWaterSource: '是',
    isAboveDesignatedSize: '是',
    keyType: '重点',
    directManageType: '市级',
    waterIntakeType: '基础设施或公用事业类',
    itemType: '首次填报',
    status: '市级待审核',
    permitVolume: 123.45,
    planVolume: 123.45,
    surfaceWater: 12.34,
    groundwater: 23.45,
    unconventionalTotal: 34.56,
    recycledWater: 22.10,
    mineWater: 6.46,
    rainWater: 6.00,
    brackishWater: 0.00,
    year: '2025',
    userType: 'permit',
    permitNumber: '取水（青宁大）字[2025]第0003号',
    supervisorUnit: '西宁经济技术开发区管委会',
    applyDate: '2025-01-18',
    auditHistory: [
      {
        stepName: '企业申报',
        operator: '陈卫国',
        department: '动力能源车间',
        action: '提交申报',
        time: '2025-01-18 14:00:00',
        opinion: '高纯多晶硅生产线超纯水制备取水申报。',
        status: 'passed'
      },
      {
        stepName: '县级水行政主管初审',
        operator: '李建军',
        department: '大通县水务局',
        action: '初审通过',
        time: '2025-01-20 09:15:00',
        opinion: '初审通过，拟转报市水务局重点项目复审。',
        status: 'passed'
      }
    ]
  },
  {
    id: 'WP-2025-0004',
    city: '西宁市',
    district: '大通县',
    unitName: '大通高原特色生态绿色农业灌区合作社',
    creditCode: '9132732927556',
    industryType: '4.有色',
    isPublicPipeNetwork: '否',
    isSelfWaterSource: '是',
    isAboveDesignatedSize: '否',
    keyType: '非重点',
    directManageType: '县级',
    waterIntakeType: '自备水源类',
    itemType: '首次填报',
    status: '省级待审核',
    permitVolume: 123.45,
    planVolume: 123.45,
    surfaceWater: 12.34,
    groundwater: 23.45,
    unconventionalTotal: 34.56,
    recycledWater: 15.00,
    mineWater: 9.56,
    rainWater: 10.00,
    brackishWater: 0.00,
    year: '2025',
    userType: 'permit',
    permitNumber: '取水（青宁大）字[2025]第0004号',
    supervisorUnit: '大通县农业农村局',
    applyDate: '2025-01-22',
    auditHistory: [
      {
        stepName: '合作社申报',
        operator: '马成林',
        department: '理事会',
        action: '申报',
        time: '2025-01-22 16:30:00',
        opinion: '灌区自备地下深水井滴灌用水申报。',
        status: 'passed'
      }
    ]
  },
  {
    id: 'WP-2025-0005',
    city: '西宁市',
    district: '大通县',
    unitName: '青海黄河水电大通发电有限责任公司',
    creditCode: '9132732927556',
    industryType: '4.有色',
    isPublicPipeNetwork: '否',
    isSelfWaterSource: '是',
    isAboveDesignatedSize: '是',
    keyType: '重点',
    directManageType: '县级',
    waterIntakeType: '自备水源类',
    itemType: '年计划调整',
    status: '审核通过',
    permitVolume: 123.45,
    planVolume: 123.45,
    surfaceWater: 12.34,
    groundwater: 23.45,
    unconventionalTotal: 34.56,
    recycledWater: 25.00,
    mineWater: 5.56,
    rainWater: 4.00,
    brackishWater: 0.00,
    year: '2025',
    userType: 'permit',
    permitNumber: '取水（青宁大）字[2025]第0005号',
    supervisorUnit: '西宁市发展和改革委员会',
    applyDate: '2025-02-05',
    auditor: '王宏志',
    auditDate: '2025-02-10 15:40:00',
    auditOpinion: '经查验该企业机组空冷改造技改后节水效果显著，调减计划指标符合节水评价标准，准予通过。',
    approvedVolume: 123.45,
    approvedSurfaceWater: 12.34,
    approvedGroundwater: 23.45,
    approvedUnconventionalWater: 34.56,
    auditHistory: [
      {
        stepName: '调整申请',
        operator: '刘伟',
        department: '安全环保部',
        action: '提交调整',
        time: '2025-02-05 10:12:00',
        opinion: '依据机组节能节水技改成果申请调剂地表水与再生水配比。',
        status: 'passed'
      },
      {
        stepName: '审批核准',
        operator: '王宏志',
        department: '西宁市水务局水资源科',
        action: '审批通过',
        time: '2025-02-10 15:40:00',
        opinion: '准予调整，核定年计划用水总量123.45万立方米。',
        status: 'passed'
      }
    ]
  },
  {
    id: 'WP-2025-0006',
    city: '西宁市',
    district: '大通县',
    unitName: '青海桥头铝电电解三厂有限责任公司',
    creditCode: '9132732927556',
    industryType: '4.有色',
    isPublicPipeNetwork: '否',
    isSelfWaterSource: '是',
    isAboveDesignatedSize: '是',
    keyType: '重点',
    directManageType: '县级',
    waterIntakeType: '自备水源类',
    itemType: '年计划调整',
    status: '审核驳回',
    permitVolume: 123.45,
    planVolume: 123.45,
    surfaceWater: 12.34,
    groundwater: 23.45,
    unconventionalTotal: 34.56,
    recycledWater: 10.00,
    mineWater: 14.56,
    rainWater: 10.00,
    brackishWater: 0.00,
    year: '2025',
    userType: 'permit',
    permitNumber: '取水（青宁大）字[2025]第0006号',
    supervisorUnit: '大通县水务局',
    applyDate: '2025-02-12',
    auditor: '赵国栋',
    auditDate: '2025-02-15 11:20:00',
    auditOpinion: '申请调增地下承压水计划指标超出区域地下水压采刚性管控指标，且非常规水利用率未达规程要求，予以驳回。',
    auditHistory: [
      {
        stepName: '申请调整',
        operator: '张强',
        department: '生产调度室',
        action: '提交调整',
        time: '2025-02-12 14:20:00',
        opinion: '申请追加地下水取水配额。',
        status: 'passed'
      },
      {
        stepName: '水务局审核',
        operator: '赵国栋',
        department: '大通县水务局',
        action: '驳回',
        time: '2025-02-15 11:20:00',
        opinion: '超地下水红线管控指标，驳回申请，请优先配置中水回用系统。',
        status: 'rejected'
      }
    ]
  },
  {
    id: 'WP-2025-0007',
    city: '西宁市',
    district: '大通县',
    unitName: '大通高原矿产开采加工有限责任公司',
    creditCode: '9132732927556',
    industryType: '4.有色',
    isPublicPipeNetwork: '否',
    isSelfWaterSource: '是',
    isAboveDesignatedSize: '否',
    keyType: '非重点',
    directManageType: '县级',
    waterIntakeType: '自备水源类',
    itemType: '首次填报',
    status: '已下达计划',
    permitVolume: 123.45,
    planVolume: 123.45,
    surfaceWater: 12.34,
    groundwater: 23.45,
    unconventionalTotal: 34.56,
    recycledWater: 18.00,
    mineWater: 12.56,
    rainWater: 4.00,
    brackishWater: 0.00,
    year: '2025',
    userType: 'permit',
    permitNumber: '取水（青宁大）字[2025]第0007号',
    supervisorUnit: '大通县自然资源局',
    applyDate: '2025-01-10',
    auditor: '李建军',
    auditDate: '2025-01-25 16:00:00',
    auditOpinion: '已通过综合评估，计划文件正式下达，纳入西宁市实时用水计量监控平台监管。',
    approvedVolume: 123.45,
    approvedSurfaceWater: 12.34,
    approvedGroundwater: 23.45,
    approvedUnconventionalWater: 34.56,
    auditHistory: [
      {
        stepName: '指标下达',
        operator: '李建军',
        department: '大通县水行政审批中心',
        action: '正式下达',
        time: '2025-01-25 16:00:00',
        opinion: '青宁大水计[2025]018号文件正式印发下达。',
        status: 'passed'
      }
    ]
  },
  {
    id: 'WP-2025-0008',
    city: '西宁市',
    district: '大通县',
    unitName: '青海青稞精酿食品饮料实业有限责任公司',
    creditCode: '9132732927556',
    industryType: '4.有色',
    isPublicPipeNetwork: '否',
    isSelfWaterSource: '是',
    isAboveDesignatedSize: '否',
    keyType: '非重点',
    directManageType: '县级',
    waterIntakeType: '自备水源类',
    itemType: '月计划调整',
    status: '报备中',
    permitVolume: 123.45,
    planVolume: 123.45,
    surfaceWater: 12.34,
    groundwater: 23.45,
    unconventionalTotal: 34.56,
    recycledWater: 20.00,
    mineWater: 4.56,
    rainWater: 10.00,
    brackishWater: 0.00,
    year: '2025',
    userType: 'permit',
    permitNumber: '取水（青宁大）字[2025]第0008号',
    supervisorUnit: '大通县市场监督管理局',
    applyDate: '2025-02-28',
    auditHistory: [
      {
        stepName: '月度动态报备',
        operator: '孙丽娜',
        department: '质量运营部',
        action: '提交报备',
        time: '2025-02-28 09:00:00',
        opinion: '3月份旺季生产线开工率提升，月度计划配额微调报备中。',
        status: 'pending'
      }
    ]
  },
  {
    id: 'WP-2025-0009',
    city: '西宁市',
    district: '大通县',
    unitName: '大通回族土族自治县金江热力管网有限公司',
    creditCode: '9132732927556',
    industryType: '电力',
    isPublicPipeNetwork: '否',
    isSelfWaterSource: '是',
    isAboveDesignatedSize: '是',
    keyType: '重点',
    directManageType: '县级',
    waterIntakeType: '基础设施或公用事业类',
    itemType: '年计划调整',
    status: '计划重新下达',
    permitVolume: 145.00,
    planVolume: 138.20,
    surfaceWater: 80.20,
    groundwater: 28.00,
    unconventionalTotal: 30.00,
    recycledWater: 30.00,
    mineWater: 0.00,
    rainWater: 0.00,
    brackishWater: 0.00,
    year: '2025',
    userType: 'permit',
    permitNumber: '取水（青宁大）字[2025]第0009号',
    supervisorUnit: '大通县水务局',
    applyDate: '2025-02-20',
    auditor: '李建军',
    auditDate: '2025-03-01 14:15:00',
    auditOpinion: '鉴于冬季供暖期管网循环水补水量调整，重新复核下达2025年度供暖保障计划配额。',
    approvedVolume: 138.20,
    approvedSurfaceWater: 80.20,
    approvedGroundwater: 28.00,
    approvedUnconventionalWater: 30.00,
    auditHistory: [
      {
        stepName: '重新下达确认',
        operator: '李建军',
        department: '大通县水务局',
        action: '重新下达',
        time: '2025-03-01 14:15:00',
        opinion: '重新核发取水配额批复文件。',
        status: 'passed'
      }
    ]
  },
  // Additional realistic data for other districts in Xining:
  {
    id: 'WP-2025-0010',
    city: '西宁市',
    district: '城东区',
    unitName: '西宁青藏铁路东川现代物流园区发展有限公司',
    creditCode: '91630102712345678A',
    industryType: '交通',
    isPublicPipeNetwork: '是',
    isSelfWaterSource: '否',
    isAboveDesignatedSize: '是',
    keyType: '重点',
    directManageType: '市级',
    waterIntakeType: '基础设施或公用事业类',
    itemType: '首次填报',
    status: '市级待审核',
    permitVolume: 85.00,
    planVolume: 82.50,
    surfaceWater: 40.00,
    groundwater: 0.00,
    unconventionalTotal: 42.50,
    recycledWater: 35.00,
    mineWater: 0.00,
    rainWater: 7.50,
    brackishWater: 0.00,
    year: '2025',
    userType: 'public_supply',
    permitNumber: '取水（青宁东）字[2025]第0015号',
    supervisorUnit: '城东区水务局',
    applyDate: '2025-02-18',
    auditHistory: [
      {
        stepName: '申报提交',
        operator: '郭海波',
        department: '物流基地综合办',
        action: '申报',
        time: '2025-02-18 10:00:00',
        opinion: '园区集装箱清洗与绿化冲洗用水申报，优先采用再生水。',
        status: 'passed'
      }
    ]
  },
  {
    id: 'WP-2025-0011',
    city: '西宁市',
    district: '城西区',
    unitName: '青海省人民医院海湖院区',
    creditCode: '91630104889900112B',
    industryType: '服务业',
    isPublicPipeNetwork: '是',
    isSelfWaterSource: '否',
    isAboveDesignatedSize: '是',
    keyType: '重点',
    directManageType: '市级',
    waterIntakeType: '水资源配置类',
    itemType: '首次填报',
    status: '审核通过',
    permitVolume: 65.00,
    planVolume: 63.80,
    surfaceWater: 50.00,
    groundwater: 0.00,
    unconventionalTotal: 13.80,
    recycledWater: 10.00,
    mineWater: 0.00,
    rainWater: 3.80,
    brackishWater: 0.00,
    year: '2025',
    userType: 'public_supply',
    permitNumber: '取水（青宁西）字[2025]第0008号',
    supervisorUnit: '城西区城乡建设局',
    applyDate: '2025-01-20',
    auditor: '孙建强',
    auditDate: '2025-01-28 11:30:00',
    auditOpinion: '医疗卫生公共服务机构定额合理，符合西宁市刚性约束指标，审批通过。',
    approvedVolume: 63.80,
    approvedSurfaceWater: 50.00,
    approvedGroundwater: 0.00,
    approvedUnconventionalWater: 13.80,
    auditHistory: [
      {
        stepName: '医疗机构申报',
        operator: '杨帆',
        department: '后勤保障部',
        action: '申报',
        time: '2025-01-20 09:30:00',
        opinion: '年度就诊及病房生活用水计划申报。',
        status: 'passed'
      }
    ]
  },
  {
    id: 'WP-2025-0012',
    city: '西宁市',
    district: '湟中区',
    unitName: '青海湟中鲁沙尔生态文化旅游开发有限公司',
    creditCode: '91630121667788990C',
    industryType: '服务业',
    isPublicPipeNetwork: '否',
    isSelfWaterSource: '是',
    isAboveDesignatedSize: '否',
    keyType: '非重点',
    directManageType: '县级',
    waterIntakeType: '自备水源类',
    itemType: '首次填报',
    status: '县级待审核',
    permitVolume: 45.00,
    planVolume: 42.00,
    surfaceWater: 20.00,
    groundwater: 12.00,
    unconventionalTotal: 10.00,
    recycledWater: 6.00,
    mineWater: 0.00,
    rainWater: 4.00,
    brackishWater: 0.00,
    year: '2025',
    userType: 'permit',
    permitNumber: '取水（青宁中）字[2025]第0033号',
    supervisorUnit: '湟中区水务局',
    applyDate: '2025-02-14',
    auditHistory: [
      {
        stepName: '景区申报',
        operator: '韩雪梅',
        department: '景区运营处',
        action: '申报',
        time: '2025-02-14 15:20:00',
        opinion: '景区自备水井与景观湖补水年度计划申报。',
        status: 'passed'
      }
    ]
  }
];

// 生成单条记录对应的“本年度实际用水表”数据
export function createActualWaterQuotaForRecord(record?: WaterPlanRecord | null): FormQuotaData {
  if (record?.actualWaterQuota) {
    return JSON.parse(JSON.stringify(record.actualWaterQuota));
  }

  const surface = record?.surfaceWater ?? 12.34;
  const ground = record?.groundwater ?? 23.45;
  const unconv = record?.unconventionalTotal ?? 34.56;
  const recycled = record?.recycledWater ?? 20.0;
  const rain = record?.rainWater ?? 5.0;
  const mine = record?.mineWater ?? 0.0;
  const brackish = record?.brackishWater ?? 0.0;

  return {
    livingWaterRows: [
      {
        type: '厂区办公生活用水',
        quota: 28.5,
        population: 260,
        surfaceWater: Number((surface * 0.25).toFixed(2)),
        groundwater: Number((ground * 0.2).toFixed(2))
      }
    ],
    industryWaterRows: [
      {
        productName: record?.industryType?.includes('光伏') || record?.industryType?.includes('硅') ? '高纯多晶硅' : '核心工艺主产品',
        quota: 14.5,
        output: '2.2万吨',
        productVolume: '31.90',
        surfaceWater: Number((surface * 0.5).toFixed(2)),
        groundwater: Number((ground * 0.5).toFixed(2)),
        recycledWater: Number((recycled * 0.7).toFixed(2)),
        rainWater: Number((rain * 0.6).toFixed(2)),
        mineWater: Number((mine * 0.5).toFixed(2)),
        brackishWater: Number((brackish * 0.5).toFixed(2))
      },
      {
        productName: '副产品及冷却水循网',
        quota: 7.8,
        output: '0.9万吨',
        productVolume: '7.02',
        surfaceWater: Number((surface * 0.25).toFixed(2)),
        groundwater: Number((ground * 0.3).toFixed(2)),
        recycledWater: Number((recycled * 0.3).toFixed(2)),
        rainWater: Number((rain * 0.4).toFixed(2)),
        mineWater: Number((mine * 0.5).toFixed(2)),
        brackishWater: Number((brackish * 0.5).toFixed(2))
      }
    ],
    agricultureWaterRows: [
      {
        area: 12000.0,
        times: 3,
        quota: 90,
        crops: '厂区绿化防风林',
        method: '微喷滴灌',
        surfaceWater: 0.12,
        groundwater: 0.15,
        total: 10.8
      }
    ],
    livestockWaterRows: [
      {
        livestockType: '后勤基地生猪/肉禽',
        count: 150,
        quota: 35.0,
        days: 365,
        surfaceWater: 0.05,
        groundwater: 0.07
      }
    ],
    powerWaterRows: [
      {
        units: 1,
        capacity: '300MW',
        generation: '15.6亿',
        hours: 5200,
        surfaceWater: 6.5,
        groundwater: 0.0,
        hydroMinFlow: 0.0,
        thermalMaxHourly: 95.0,
        total: 6.5
      }
    ],
    serviceWaterRows: [
      {
        industryName: '综合办公与餐饮招待中心',
        scale: '8500㎡',
        quota: 3.2,
        surfaceWater: 0.18,
        groundwater: 0.12,
        recycledWater: 0.06
      }
    ],
    requiredCategories: ['living', 'industry'],
    monthlySummaryRows: [
      { month: '1月', surfaceWater: 15.2, groundwater: 14.8, recycledWater: 1.0, rainWater: 0.1, mineWater: 0.0, brackishWater: 0.0 },
      { month: '2月', surfaceWater: 14.8, groundwater: 14.2, recycledWater: 0.95, rainWater: 0.15, mineWater: 0.0, brackishWater: 0.0 },
      { month: '3月', surfaceWater: 16.5, groundwater: 15.6, recycledWater: 1.1, rainWater: 0.3, mineWater: 0.0, brackishWater: 0.0 },
      { month: '4月', surfaceWater: 17.2, groundwater: 16.0, recycledWater: 1.15, rainWater: 0.5, mineWater: 0.0, brackishWater: 0.0 },
      { month: '5月', surfaceWater: 18.0, groundwater: 17.2, recycledWater: 1.2, rainWater: 1.0, mineWater: 0.0, brackishWater: 0.0 },
      { month: '6月', surfaceWater: 19.5, groundwater: 18.1, recycledWater: 1.25, rainWater: 1.6, mineWater: 0.0, brackishWater: 0.0 },
      { month: '7月', surfaceWater: 20.2, groundwater: 18.8, recycledWater: 1.3, rainWater: 2.3, mineWater: 0.0, brackishWater: 0.0 },
      { month: '8月', surfaceWater: 19.8, groundwater: 18.5, recycledWater: 1.25, rainWater: 2.2, mineWater: 0.0, brackishWater: 0.0 },
      { month: '9月', surfaceWater: 18.4, groundwater: 17.0, recycledWater: 1.2, rainWater: 1.4, mineWater: 0.0, brackishWater: 0.0 },
      { month: '10月', surfaceWater: 17.6, groundwater: 16.2, recycledWater: 1.15, rainWater: 0.7, mineWater: 0.0, brackishWater: 0.0 },
      { month: '11月', surfaceWater: 16.2, groundwater: 15.0, recycledWater: 1.05, rainWater: 0.25, mineWater: 0.0, brackishWater: 0.0 },
      { month: '12月', surfaceWater: 15.5, groundwater: 14.5, recycledWater: 1.0, rainWater: 0.15, mineWater: 0.0, brackishWater: 0.0 }
    ]
  };
}

// 生成单条记录对应的“下年度计划用水表”数据
export function createPlanWaterQuotaForRecord(record?: WaterPlanRecord | null): FormQuotaData {
  if (record?.planWaterQuota) {
    return JSON.parse(JSON.stringify(record.planWaterQuota));
  }

  const surface = (record?.surfaceWater ?? 12.34) * 1.05;
  const ground = (record?.groundwater ?? 23.45) * 1.03;
  const unconv = (record?.unconventionalTotal ?? 34.56) * 1.1;
  const recycled = (record?.recycledWater ?? 20.0) * 1.1;
  const rain = (record?.rainWater ?? 5.0) * 1.08;
  const mine = record?.mineWater ?? 0.0;
  const brackish = record?.brackishWater ?? 0.0;

  return {
    livingWaterRows: [
      {
        type: '厂区办公生活用水',
        quota: 30.0,
        population: 280,
        surfaceWater: Number((surface * 0.25).toFixed(2)),
        groundwater: Number((ground * 0.2).toFixed(2))
      }
    ],
    industryWaterRows: [
      {
        productName: record?.industryType?.includes('光伏') || record?.industryType?.includes('硅') ? '高纯多晶硅' : '核心工艺主产品',
        quota: 14.5,
        output: '2.5万吨',
        productVolume: '36.25',
        surfaceWater: Number((surface * 0.5).toFixed(2)),
        groundwater: Number((ground * 0.5).toFixed(2)),
        recycledWater: Number((recycled * 0.7).toFixed(2)),
        rainWater: Number((rain * 0.6).toFixed(2)),
        mineWater: Number((mine * 0.5).toFixed(2)),
        brackishWater: Number((brackish * 0.5).toFixed(2))
      },
      {
        productName: '副产品及冷却水循网',
        quota: 7.8,
        output: '1.2万吨',
        productVolume: '9.36',
        surfaceWater: Number((surface * 0.25).toFixed(2)),
        groundwater: Number((ground * 0.3).toFixed(2)),
        recycledWater: Number((recycled * 0.3).toFixed(2)),
        rainWater: Number((rain * 0.4).toFixed(2)),
        mineWater: Number((mine * 0.5).toFixed(2)),
        brackishWater: Number((brackish * 0.5).toFixed(2))
      }
    ],
    agricultureWaterRows: [
      {
        area: 12000.0,
        times: 3,
        quota: 88,
        crops: '厂区绿化防风林',
        method: '节水型智能滴灌',
        surfaceWater: 0.11,
        groundwater: 0.14,
        total: 10.2
      }
    ],
    livestockWaterRows: [
      {
        livestockType: '后勤基地生猪/肉禽',
        count: 150,
        quota: 33.0,
        days: 365,
        surfaceWater: 0.05,
        groundwater: 0.06
      }
    ],
    powerWaterRows: [
      {
        units: 1,
        capacity: '300MW',
        generation: '16.2亿',
        hours: 5400,
        surfaceWater: 6.8,
        groundwater: 0.0,
        hydroMinFlow: 0.0,
        thermalMaxHourly: 98.0,
        total: 6.8
      }
    ],
    serviceWaterRows: [
      {
        industryName: '综合办公与餐饮招待中心',
        scale: '8500㎡',
        quota: 3.0,
        surfaceWater: 0.17,
        groundwater: 0.11,
        recycledWater: 0.07
      }
    ],
    requiredCategories: ['living', 'industry'],
    monthlySummaryRows: [
      { month: '1月', surfaceWater: 16.0, groundwater: 15.2, recycledWater: 1.1, rainWater: 0.12, mineWater: 0.0, brackishWater: 0.0 },
      { month: '2月', surfaceWater: 15.5, groundwater: 14.8, recycledWater: 1.05, rainWater: 0.18, mineWater: 0.0, brackishWater: 0.0 },
      { month: '3月', surfaceWater: 17.5, groundwater: 16.2, recycledWater: 1.2, rainWater: 0.35, mineWater: 0.0, brackishWater: 0.0 },
      { month: '4月', surfaceWater: 18.2, groundwater: 16.8, recycledWater: 1.25, rainWater: 0.55, mineWater: 0.0, brackishWater: 0.0 },
      { month: '5月', surfaceWater: 19.0, groundwater: 18.0, recycledWater: 1.3, rainWater: 1.1, mineWater: 0.0, brackishWater: 0.0 },
      { month: '6月', surfaceWater: 20.8, groundwater: 19.0, recycledWater: 1.35, rainWater: 1.8, mineWater: 0.0, brackishWater: 0.0 },
      { month: '7月', surfaceWater: 21.5, groundwater: 19.6, recycledWater: 1.4, rainWater: 2.5, mineWater: 0.0, brackishWater: 0.0 },
      { month: '8月', surfaceWater: 21.0, groundwater: 19.2, recycledWater: 1.35, rainWater: 2.4, mineWater: 0.0, brackishWater: 0.0 },
      { month: '9月', surfaceWater: 19.5, groundwater: 17.8, recycledWater: 1.3, rainWater: 1.55, mineWater: 0.0, brackishWater: 0.0 },
      { month: '10月', surfaceWater: 18.6, groundwater: 17.0, recycledWater: 1.25, rainWater: 0.8, mineWater: 0.0, brackishWater: 0.0 },
      { month: '11月', surfaceWater: 17.2, groundwater: 15.8, recycledWater: 1.15, rainWater: 0.3, mineWater: 0.0, brackishWater: 0.0 },
      { month: '12月', surfaceWater: 16.4, groundwater: 15.1, recycledWater: 1.1, rainWater: 0.2, mineWater: 0.0, brackishWater: 0.0 }
    ]
  };
}

// 获取/生成用水计划文件下发列表（包含多次下发）
export function createDocumentIssuesForRecord(record?: WaterPlanRecord | null): WaterPlanDocumentIssue[] {
  if (record?.documentIssues && record.documentIssues.length > 0) {
    return JSON.parse(JSON.stringify(record.documentIssues));
  }

  const year = record?.year || '2025';
  const unitName = record?.unitName || '重点用水企业';
  const district = record?.district || '大通县';
  const issuer = record?.supervisorUnit || `${district}水务局水资源管理办公室`;
  const approvedVol = record?.approvedVolume || record?.planVolume || 123.45;

  return [
    {
      id: `${record?.id || 'WP'}-issue-01`,
      title: `关于下达${unitName} ${year}年度计划用水指标的正式通知`,
      noticeType: '正式用水计划通知',
      issuerUnit: issuer,
      issueTime: `${year}-01-22 09:30:00`,
      issueEvent: `${year}年度用水计划指标初次正式下达`,
      docNumber: `宁水资计〔${year}〕第 0428 号`,
      approvedTotalVolume: approvedVol,
      remarks: `依据《西宁市节约用水条例》，严格执行定额管理制度。贵单位应按月度分解指标合理取水，不得擅自超定额、超计划取水。`,
      files: [
        {
          id: 'file-01-01',
          name: `${year}年度计划用水指标正式核定通知书(红头盖章件).pdf`,
          type: 'pdf',
          size: '3.8 MB',
          uploadTime: `${year}-01-22 09:31:12`
        },
        {
          id: 'file-01-02',
          name: `${unitName}用水定额分水源核算明细表.xlsx`,
          type: 'excel',
          size: '1.5 MB',
          uploadTime: `${year}-01-22 09:31:45`
        },
        {
          id: 'file-01-03',
          name: `节约用水管理告知承诺书与回执备案单.docx`,
          type: 'word',
          size: '680 KB',
          uploadTime: `${year}-01-22 09:32:00`
        },
        {
          id: 'file-01-04',
          name: `水资源管理专用章电子凭证及现场核验原件扫描.image`,
          type: 'image',
          size: '2.4 MB',
          uploadTime: `${year}-01-22 09:35:10`
        }
      ]
    },
    {
      id: `${record?.id || 'WP'}-issue-02`,
      title: `关于调整下达${unitName} ${year}年度中后期计划用水指标的通知`,
      noticeType: '调整用水计划通知',
      issuerUnit: '西宁市水务局水资源管理处',
      issueTime: `${year}-06-18 15:20:00`,
      issueEvent: `年中根据规上重点企业扩产增效水平衡评估调整指标下达`,
      docNumber: `宁水资调〔${year}〕第 0115 号`,
      approvedTotalVolume: Number((approvedVol * 1.08).toFixed(2)),
      remarks: `同意核增夏季高温期及三期技改项目的非常规再生水循环利用指标，常规地表水严格维持刚性约束红线不变。`,
      files: [
        {
          id: 'file-02-01',
          name: `${year}年度用水计划指标追加调整批复函(西水发〔${year}〕68号).pdf`,
          type: 'pdf',
          size: '4.2 MB',
          uploadTime: `${year}-06-18 15:21:30`
        },
        {
          id: 'file-02-02',
          name: `企业扩产水平衡测试复核评估与非常规水置换论证报告.pdf`,
          type: 'pdf',
          size: '7.6 MB',
          uploadTime: `${year}-06-18 15:22:15`
        },
        {
          id: 'file-02-03',
          name: `调整后1至12月月度取水进度控制表.xlsx`,
          type: 'excel',
          size: '1.8 MB',
          uploadTime: `${year}-06-18 15:23:00`
        }
      ]
    }
  ];
}

