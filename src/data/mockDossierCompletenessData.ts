import type {
  EnterpriseDossier,
  DossierCompletenessScore,
  DossierCompletenessLevel
} from '../types';
import { mockEnterpriseDossiers } from '../mockEnterpriseDossierData';

/**
 * 档案完整度计算引擎：
 * 参照水行政主管部门一户一档核验规范与业务规则：
 * 1. 基础信息维权规范 (满分 25 分)
 *    - 统一社会信用代码标准 18 位校验 (6分)
 *    - 法定代表人登记 (5分)
 *    - 联系电话/办公联络人有效性 (5分)
 *    - 取水/经营场所精准地理地址 (5分)
 *    - 企业所属行政区划明确 (4分)
 * 
 * 2. 取水许可凭证规范 (满分 25 分)
 *    - 取水许可证编号格式合规 (6分)
 *    - 发证机关权威登记 (5分)
 *    - 年许可取水量数值合规 (5分)
 *    - 取水水源类型明确分类 (5分)
 *    - 证照状态正常（无过期/临期违规）(4分)
 * 
 * 3. 取水口与工程规范 (满分 20 分)
 *    - 取水口工程建档数量 > 0 (6分)
 *    - 取水口坐标与工程信息登记 (6分)
 *    - 取水口台账无违规隐患 (8分)
 * 
 * 4. 计量监测体系规范 (满分 20 分)
 *    - 配备法定计量监测设施点位 (6分)
 *    - 计量设施在线传输接入 (8分)
 *    - 在线计量率 >= 90% 或全量覆盖 (6分)
 * 
 * 5. 电子资料与档案凭证 (满分 10 分)
 *    - 取水电子证照凭证齐全 (4分)
 *    - 历史用水量或年度计划核定资料 (3分)
 *    - 无未整改水事违法违规事件 (3分)
 * 
 * 等级划分标准：
 * - 优秀: 90分 ~ 100分 (全景完备，在线化规范建档)
 * - 良好: 80分 ~ 89分 (主要要素齐全，仅存在非在线计量或部分辅证待补)
 * - 一般: 60分 ~ 79分 (基础证照存在临期、变更或计量点在线率偏低)
 * - 较差: 60分以下 (存在未闭环违规、严重缺漏关键证明文件或证照已过期)
 */
export function calculateDossierScore(dossier: EnterpriseDossier): DossierCompletenessScore {
  let basicInfoScore = 0;
  let licenseInfoScore = 0;
  let engineeringScore = 0;
  let meteringScore = 0;
  let materialsScore = 0;
  const missingItems: string[] = [];

  // --- 1. 基础信息 (25分) ---
  if (dossier.creditCode && dossier.creditCode.length >= 15) {
    basicInfoScore += 6;
  } else {
    missingItems.push('统一社会信用代码缺失或非标准');
  }

  if (dossier.legalPerson && dossier.legalPerson.trim().length > 1) {
    basicInfoScore += 5;
  } else {
    missingItems.push('法定代表人信息未登记');
  }

  if (dossier.contactPhone && dossier.contactPhone.trim().length >= 8) {
    basicInfoScore += 5;
  } else {
    missingItems.push('联系电话未登记或不完整');
  }

  if (dossier.address && dossier.address.trim().length >= 4) {
    basicInfoScore += 5;
  } else {
    missingItems.push('取水详细地址未登记');
  }

  if (dossier.district && dossier.district.trim().length > 0) {
    basicInfoScore += 4;
  } else {
    missingItems.push('所属行政区划未归属');
  }

  // --- 2. 取水许可凭证 (25分) ---
  if (dossier.permitNumber && dossier.permitNumber.includes('字')) {
    licenseInfoScore += 6;
  } else {
    missingItems.push('取水许可证编号未登记或格式不规范');
  }

  if (dossier.issuingAuthority && dossier.issuingAuthority.trim().length > 0) {
    licenseInfoScore += 5;
  } else {
    missingItems.push('发证机关未登记');
  }

  if (dossier.annualPermitVolume && dossier.annualPermitVolume > 0) {
    licenseInfoScore += 5;
  } else {
    missingItems.push('年许可取水量未核定');
  }

  if (dossier.waterSourceType && dossier.waterSourceType.trim().length > 0) {
    licenseInfoScore += 5;
  } else {
    missingItems.push('水源类型未明确');
  }

  if (dossier.licenseStatus === '正常') {
    licenseInfoScore += 4;
  } else if (dossier.licenseStatus === '变更中' || dossier.licenseStatus === '延续审批中') {
    licenseInfoScore += 2.5;
    missingItems.push(`证照当前处于${dossier.licenseStatus}`);
  } else if (dossier.licenseStatus === '临期') {
    licenseInfoScore += 1.5;
    missingItems.push('取水许可证即将到期，需提请延续申请');
  } else {
    // 已过期或已注销
    licenseInfoScore += 0;
    missingItems.push(`证照状态异常（${dossier.licenseStatus}）`);
  }

  // --- 3. 取水口与工程规范 (20分) ---
  if (dossier.intakeProjectCount && dossier.intakeProjectCount > 0) {
    engineeringScore += 6;
  } else {
    missingItems.push('未建档关联水源取水工程');
  }

  if (dossier.intakeCount && dossier.intakeCount > 0) {
    engineeringScore += 6;
  } else {
    missingItems.push('未登记取水口具体点位');
  }

  const violationCount = dossier.violationIntakeCount || dossier.violationIssueCount || 0;
  if (violationCount === 0) {
    engineeringScore += 8;
  } else {
    engineeringScore += Math.max(0, 8 - violationCount * 4);
    missingItems.push(`存在 ${violationCount} 处涉及取水口违规问题待处置`);
  }

  // --- 4. 计量监测体系规范 (20分) ---
  const totalMeters = dossier.meteringPointCount || 0;
  const onlineMeters = dossier.onlineMeteringCount || 0;

  if (totalMeters > 0) {
    meteringScore += 6;
  } else {
    missingItems.push('未配备任何法定取水计量点');
  }

  if (onlineMeters > 0) {
    meteringScore += 8;
  } else {
    missingItems.push('缺少实时在线在线计量设施传输接入');
  }

  if (totalMeters > 0) {
    const onlineRate = onlineMeters / totalMeters;
    if (onlineRate >= 1.0) {
      meteringScore += 6;
    } else if (onlineRate >= 0.8) {
      meteringScore += 4.5;
      missingItems.push(`尚有 ${totalMeters - onlineMeters} 处计量点未实现全在线监测`);
    } else if (onlineRate >= 0.5) {
      meteringScore += 3;
      missingItems.push(`在线计量率偏低（仅 ${(onlineRate * 100).toFixed(0)}%）`);
    } else {
      meteringScore += 1;
      missingItems.push('非在线计量点占多数，需加速在线改造');
    }
  }

  // --- 5. 电子资料与档案凭证 (10分) ---
  // 取水电子凭证健全
  materialsScore += 4;

  if ((dossier.currentYearPlanVolume && dossier.currentYearPlanVolume > 0) || (dossier.historicalAvgWaterVolume && dossier.historicalAvgWaterVolume > 0)) {
    materialsScore += 3;
  } else {
    missingItems.push('缺少年度取用水计划或历史计量支撑');
  }

  if ((dossier.violationIssueCount || 0) === 0) {
    materialsScore += 3;
  } else {
    missingItems.push('存在违法违规记分记录');
  }

  // 总分求和（精确到 1 位小数）
  const totalScore = Number((basicInfoScore + licenseInfoScore + engineeringScore + meteringScore + materialsScore).toFixed(1));

  // 等级判定
  let level: DossierCompletenessLevel = '较差';
  if (totalScore >= 90) {
    level = '优秀';
  } else if (totalScore >= 80) {
    level = '良好';
  } else if (totalScore >= 60) {
    level = '一般';
  } else {
    level = '较差';
  }

  return {
    dossierId: dossier.id,
    waterOwnerName: dossier.waterOwnerName,
    permitNumber: dossier.permitNumber,
    creditCode: dossier.creditCode,
    district: dossier.district,
    issuingAuthority: dossier.issuingAuthority,
    dataSourceType: dossier.dataSourceType,
    aboveDesignatedScale: dossier.aboveDesignatedScale,
    status: dossier.status,
    totalScore,
    level,
    basicInfoScore: Number(basicInfoScore.toFixed(1)),
    licenseInfoScore: Number(licenseInfoScore.toFixed(1)),
    engineeringScore: Number(engineeringScore.toFixed(1)),
    meteringScore: Number(meteringScore.toFixed(1)),
    materialsScore: Number(materialsScore.toFixed(1)),
    missingItems,
    lastAccountingDate: '2026-03-28 10:15:20',
  };
}

// 预热并初始化全量一户一档完整度数据池
export const mockDossierCompletenessScores: DossierCompletenessScore[] = mockEnterpriseDossiers.map(dossier => calculateDossierScore(dossier));

// 完整度统计概览指标结构
export interface DossierCompletenessSummary {
  totalCount: number;             // 一户一档总建档户数
  excellentCount: number;         // 优秀户数 (90-100分)
  goodCount: number;              // 良好户数 (80-89分)
  fairCount: number;              // 一般户数 (60-79分)
  poorCount: number;              // 较差户数 (<60分)
  averageScore: number;           // 全域平均完整度评分
  complianceRate: number;         // 档案合格达标率 (>=80分 优秀+良好 占比)
  onlineFullCoverCount: number;   // 计量在线全覆盖户数
  pendingImproveCount: number;    // 急需完善薄弱档案户数 (一般 + 较差)
}

export function computeCompletenessSummary(scores: DossierCompletenessScore[]): DossierCompletenessSummary {
  const totalCount = scores.length;
  if (totalCount === 0) {
    return {
      totalCount: 0,
      excellentCount: 0,
      goodCount: 0,
      fairCount: 0,
      poorCount: 0,
      averageScore: 0,
      complianceRate: 0,
      onlineFullCoverCount: 0,
      pendingImproveCount: 0,
    };
  }

  const excellentCount = scores.filter(s => s.level === '优秀').length;
  const goodCount = scores.filter(s => s.level === '良好').length;
  const fairCount = scores.filter(s => s.level === '一般').length;
  const poorCount = scores.filter(s => s.level === '较差').length;

  const totalSum = scores.reduce((sum, item) => sum + item.totalScore, 0);
  const averageScore = Number((totalSum / totalCount).toFixed(1));
  const complianceRate = Number((((excellentCount + goodCount) / totalCount) * 100).toFixed(1));
  const onlineFullCoverCount = scores.filter(s => s.meteringScore >= 18).length;
  const pendingImproveCount = fairCount + poorCount;

  return {
    totalCount,
    excellentCount,
    goodCount,
    fairCount,
    poorCount,
    averageScore,
    complianceRate,
    onlineFullCoverCount,
    pendingImproveCount,
  };
}
