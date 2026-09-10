export interface WaterDataRevision {
  id: string;
  revisionNo: string;
  facilityCode: string;
  facilityName: string;
  waterOwner: string;
  district: string;
  period: string;
  originalAmount: number; // 原始读数/水量 (万m³)
  revisedAmount: number;  // 修订后水量 (万m³)
  diffAmount: number;     // 调整差值 (万m³)
  reasonType: '仪表漂移误差调平' | '通信中断丢包补录' | '管网爆管折算剔除' | '现场人工抄表校核' | '倒流脉冲数据修正';
  reasonDetail: string;
  applicant: string;
  applyTime: string;
  status: '待审核' | '已通过' | '已驳回';
  auditor?: string;
  auditTime?: string;
  proofDoc: string;
}

export const initialRevisionRecords: WaterDataRevision[] = [
  {
    id: 'rev-1',
    revisionNo: 'REV-202609-001',
    facilityCode: 'XN-630104-W001',
    facilityName: '西宁特钢2号提水泵房主计量电磁流量计',
    waterOwner: '西宁特殊钢股份有限公司',
    district: '西宁市·城北区',
    period: '2026年08月01日 - 2026年08月31日',
    originalAmount: 14.82,
    revisedAmount: 12.30,
    diffAmount: -2.52,
    reasonType: '仪表漂移误差调平',
    reasonDetail: '检定机构青海省计量检定测试所出具检测报告，显示励磁线圈零点向上漂移+17%，按实测折减修正。',
    applicant: '西宁特钢能源保卫处 / 郭强',
    applyTime: '2026-09-02 10:24',
    status: '待审核',
    proofDoc: '202608期流量计检定标定证书.pdf',
  },
  {
    id: 'rev-2',
    revisionNo: 'REV-202609-002',
    facilityCode: 'XN-630122-W009',
    facilityName: '多巴水厂配水管网出口电磁水表',
    waterOwner: '西宁市多巴自来水供水有限公司',
    district: '西宁市·湟中区',
    period: '2026年08月15日 - 2026年08月18日',
    originalAmount: 2.10,
    revisedAmount: 4.65,
    diffAmount: 2.55,
    reasonType: '通信中断丢包补录',
    reasonDetail: '多巴变电站避雷检修停电导致遥测终端离线72小时，调取水厂内网SCADA本地机械计数器进行等量补录。',
    applicant: '多巴供水调度室 / 赵明',
    applyTime: '2026-09-03 14:15',
    status: '已通过',
    auditor: '西宁市水务局水资源管理科 / 王文斌',
    auditTime: '2026-09-04 11:30',
    proofDoc: 'SCADA本地累积报表与现场表盘照片.pdf',
  },
  {
    id: 'rev-3',
    revisionNo: 'REV-202609-003',
    facilityCode: 'XN-630121-W003',
    facilityName: '大通铝业1号自备井超声波流量计',
    waterOwner: '青海青铜峡铝业大通分公司',
    district: '西宁市·大通县',
    period: '2026年07月01日 - 2026年07月31日',
    originalAmount: 16.50,
    revisedAmount: 13.90,
    diffAmount: -2.60,
    reasonType: '管网爆管折算剔除',
    reasonDetail: '厂区DN400主供水管受地质微沉降开裂发生严重漫溢漏水，属于突发管网爆管事故，经局党组会议研判予以核减。',
    applicant: '大通铝业安环部 / 刘长林',
    applyTime: '2026-08-28 09:00',
    status: '已通过',
    auditor: '大通回族土族自治县水利局 / 马成龙',
    auditTime: '2026-08-30 16:40',
    proofDoc: '事故抢修鉴定记录与测绘核算书.pdf',
  },
  {
    id: 'rev-4',
    revisionNo: 'REV-202609-004',
    facilityCode: 'XN-630102-W016',
    facilityName: '南川园区4号取水泵井智能流量传感器',
    waterOwner: '西宁南川水务投资运营有限公司',
    district: '西宁市·城中区',
    period: '2026年08月20日 - 2026年08月25日',
    originalAmount: 3.45,
    revisedAmount: 3.12,
    diffAmount: -0.33,
    reasonType: '倒流脉冲数据修正',
    reasonDetail: '供水泵站停机减压瞬间，管道止回阀闭合滞后形成双向振荡，脉冲采集器误将回流识别为正向流量。',
    applicant: '南川水务运维组 / 孙博',
    applyTime: '2026-09-05 16:30',
    status: '待审核',
    proofDoc: '止回阀检修报告与秒级瞬时波形导出.xlsx',
  },
  {
    id: 'rev-5',
    revisionNo: 'REV-202609-005',
    facilityCode: 'XN-630103-W012',
    facilityName: '城西热电厂2号冷凝塔进水流量计',
    waterOwner: '青海华电大通热电有限公司西宁分公司',
    district: '西宁市·城西区',
    period: '2026年08月01日 - 2026年08月31日',
    originalAmount: 8.80,
    revisedAmount: 9.10,
    diffAmount: 0.30,
    reasonType: '现场人工抄表校核',
    reasonDetail: '季度水政巡查人工抄见表针读数与数字化直报累计数产生0.3万方累积微差，予以一致化平差校准。',
    applicant: '城西区水政监察大队 / 彭飞',
    applyTime: '2026-09-01 09:20',
    status: '已通过',
    auditor: '西宁市水务局节水办 / 陈宏伟',
    auditTime: '2026-09-02 14:00',
    proofDoc: '水政现场巡视校表签证单.pdf',
  },
  {
    id: 'rev-6',
    revisionNo: 'REV-202609-006',
    facilityCode: 'XN-630123-W021',
    facilityName: '日月乡集中供水站总表',
    waterOwner: '湟源县农村供水保障总站',
    district: '西宁市·湟源县',
    period: '2026年08月10日 - 2026年08月20日',
    originalAmount: 1.50,
    revisedAmount: 0.85,
    diffAmount: -0.65,
    reasonType: '仪表漂移误差调平',
    reasonDetail: '申请核减上旬灌溉期引水量，佐证材料缺省第三方检定校核规程证书，不符合水行政主管部门核定标准。',
    applicant: '日月乡水务站 / 张成',
    applyTime: '2026-09-04 11:00',
    status: '已驳回',
    auditor: '湟源县水务局水政股 / 韩峰',
    auditTime: '2026-09-06 10:15',
    proofDoc: '乡镇申请说明函.docx',
  },
];
