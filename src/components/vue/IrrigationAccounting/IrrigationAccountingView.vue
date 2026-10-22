<template>
  <div class="flex-1 flex flex-col min-h-0 bg-[#F8FAFC] p-3 gap-2.5 overflow-hidden">
    <!-- 1. Top Role Switcher & Sub-module View Switcher (月度填报核算 / 系统每月自动任务下发 / 当年行政区划数据大盘) -->
    <IrrigationStatsOverview
      :current-role="currentRole"
      :active-tab="activeTab"
      :total-licenses="licenses.length"
      :total-water-volume="totalWaterVolume"
      :total-groundwater="totalGroundwater"
      :pending-city-count="pendingCityCount"
      :pending-province-count="pendingProvinceCount"
      :approved-count="approvedCount"
      :draft-count="draftCount"
      :pending-task-count="pendingTaskCount"
      @update:role="handleRoleChange"
      @update:activeTab="activeTab = $event"
    />

    <!-- VIEW A: 月度核算与台账主视图 (Default) -->
    <template v-if="activeTab === 'monthly_accounting'">
      <!-- 2. 系统每月自动下发填报任务引擎状态栏 -->
      <IrrigationTaskDispatcher
        :tasks="monthlyTasks"
        :task-rule="taskRule"
        :licenses="licenses"
        :current-role="currentRole"
        @update:task-rule="handleUpdateTaskRule"
        @dispatch-month="handleManualDispatchMonth"
        @fill-task="handleFillTask"
        @view-task-record="handleViewTaskRecord"
      />

      <!-- 3. Filter & Toolbar -->
      <IrrigationFilterBar
        :filters="filters"
        @search="handleSearch"
        @reset="handleReset"
        @export="handleExport"
        @add-report="openAddModal"
      />

      <!-- 4. Main Data Table -->
      <IrrigationTable
        :records="filteredRecords"
        :current-role="currentRole"
        @view-detail="openDetailModal"
        @edit-report="openEditModal"
        @submit-for-audit="handleSubmitForAudit"
        @recall-report="handleRecallReport"
        @delete-report="handleDeleteReport"
        @open-audit="handleOpenAudit"
        @batch-audit="handleBatchAudit"
      />
    </template>

    <!-- VIEW B: 当年本行政区划数据大盘 (一年为维度聚合展示) -->
    <template v-else-if="activeTab === 'annual_district'">
      <IrrigationAnnualDistrictView
        :licenses="licenses"
        :records="records"
      />
    </template>

    <!-- VIEW C: 小型灌区核算管理 (规范模式：基础信息/面积比对/定额与直报比对) -->
    <div v-else-if="activeTab === 'small_irrigation'" class="flex-1 min-h-0 overflow-y-auto">
      <SmallIrrigationSubView
        :current-role="currentRole"
      />
    </div>

    <!-- VIEW D: 畜禽用水核算管理 (各区县统计年鉴存栏/定额标准/审核) -->
    <div v-else-if="activeTab === 'livestock'" class="flex-1 min-h-0 overflow-y-auto">
      <LivestockAccountingSubView
        :current-role="currentRole"
      />
    </div>

    <!-- VIEW E: 鱼塘用水核算管理 (有效水面/补水定额/水产品产量平衡) -->
    <div v-else-if="activeTab === 'fishpond'" class="flex-1 min-h-0 overflow-y-auto">
      <FishpondAccountingSubView
        :current-role="currentRole"
      />
    </div>

    <!-- VIEW F: 建筑业用水核算管理 (施工面积/竣工定额/增加值比对) -->
    <div v-else-if="activeTab === 'construction'" class="flex-1 min-h-0 overflow-y-auto">
      <ConstructionAccountingSubView
        :current-role="currentRole"
      />
    </div>

    <!-- VIEW G: 证照水量填报与审核 (县级填报·市级审核·年度数据支撑·市县复用) -->
    <div v-else-if="activeTab === 'water_reporting'" class="flex-1 min-h-0 overflow-y-auto">
      <LicenseWaterReportingView
        :current-role="currentRole"
        @role-change="handleRoleChange"
      />
    </div>

    <!-- 5. Report Modal (县级填报/编辑) -->
    <IrrigationReportModal
      v-model:visible="reportModalVisible"
      :licenses="licenses"
      :initial-record="editingRecord"
      @submit="handleReportSubmit"
    />

    <!-- 6. Audit Modal (市级初审 / 省级终审) -->
    <IrrigationAuditModal
      v-model:visible="auditModalVisible"
      :record="auditingRecord"
      :audit-level="activeAuditLevel"
      @audit-complete="handleAuditComplete"
    />

    <!-- 7. Detail & Audit History Modal -->
    <IrrigationDetailModal
      v-model:visible="detailModalVisible"
      :record="detailRecord"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type {
  IrrigationLicense,
  IrrigationAccountingRecord,
  IrrigationRoleLevel,
  IrrigationAuditStatus,
  IrrigationFilterParams,
  IrrigationMonthlyTask,
  IrrigationTaskRule,
} from '../../../types';
import {
  initialIrrigationLicenses,
  initialIrrigationRecords,
  initialIrrigationTasks,
  initialIrrigationTaskRule,
} from '../../../data/mockIrrigationData';

import IrrigationStatsOverview from './IrrigationStatsOverview.vue';
import IrrigationTaskDispatcher from './IrrigationTaskDispatcher.vue';
import IrrigationAnnualDistrictView from './IrrigationAnnualDistrictView.vue';
import IrrigationFilterBar from './IrrigationFilterBar.vue';
import IrrigationTable from './IrrigationTable.vue';
import IrrigationReportModal from './IrrigationReportModal.vue';
import IrrigationAuditModal from './IrrigationAuditModal.vue';
import IrrigationDetailModal from './IrrigationDetailModal.vue';
import SmallIrrigationSubView from './SmallIrrigationSubView.vue';
import LivestockAccountingSubView from './LivestockAccountingSubView.vue';
import FishpondAccountingSubView from './FishpondAccountingSubView.vue';
import ConstructionAccountingSubView from './ConstructionAccountingSubView.vue';
import LicenseWaterReportingView from './LicenseWaterReporting/LicenseWaterReportingView.vue';

type AccountingTabType = 'monthly_accounting' | 'annual_district' | 'small_irrigation' | 'livestock' | 'fishpond' | 'construction' | 'water_reporting';

const props = withDefaults(
  defineProps<{
    initialTab?: AccountingTabType;
  }>(),
  {
    initialTab: 'monthly_accounting',
  }
);

// 0. Active Tab: 'monthly_accounting' (按月填报与审核流转) | 'annual_district' (以一年为维度展示当年本行政区划数据) | 4大细化核算管理
const activeTab = ref<AccountingTabType>(props.initialTab);

watch(
  () => props.initialTab,
  (newVal) => {
    if (newVal) {
      activeTab.value = newVal;
    }
  }
);

// 1. Core State
const currentRole = ref<IrrigationRoleLevel>('county'); // 默认为县级填报端，可一键切换市级审核、省级审核
const licenses = ref<IrrigationLicense[]>([...initialIrrigationLicenses]);
const records = ref<IrrigationAccountingRecord[]>([...initialIrrigationRecords]);

// 每月系统自动下发任务相关状态
const monthlyTasks = ref<IrrigationMonthlyTask[]>([...initialIrrigationTasks]);
const taskRule = ref<IrrigationTaskRule>({ ...initialIrrigationTaskRule });


// 2. Filters
const filters = reactive<IrrigationFilterParams>({
  year: '',
  month: '',
  district: '',
  keyword: '',
  status: '',
  waterSourceType: '',
});

// 3. Modals state
const reportModalVisible = ref(false);
const editingRecord = ref<IrrigationAccountingRecord | null>(null);

const auditModalVisible = ref(false);
const auditingRecord = ref<IrrigationAccountingRecord | null>(null);
const activeAuditLevel = ref<'city' | 'province'>('city');

const detailModalVisible = ref(false);
const detailRecord = ref<IrrigationAccountingRecord | null>(null);

// Computed stats
const totalWaterVolume = computed(() => {
  return records.value.reduce((sum, r) => sum + (r.waterData?.subtotal || 0), 0);
});

const totalGroundwater = computed(() => {
  return records.value.reduce((sum, r) => sum + (r.waterData?.groundwater || 0), 0);
});

const pendingCityCount = computed(() => {
  return records.value.filter((r) => r.status === 'pending_city').length;
});

const pendingProvinceCount = computed(() => {
  return records.value.filter((r) => r.status === 'pending_province').length;
});

const approvedCount = computed(() => {
  return records.value.filter((r) => r.status === 'approved').length;
});

const draftCount = computed(() => {
  return records.value.filter((r) => r.status === 'draft').length;
});

const pendingTaskCount = computed(() => {
  return monthlyTasks.value.filter((t) => t.status === 'pending').length;
});


// Filtered Records
const filteredRecords = computed(() => {
  return records.value.filter((item) => {
    if (filters.year && String(item.year) !== String(filters.year)) {
      return false;
    }
    if (filters.month && String(item.month) !== String(filters.month)) {
      return false;
    }
    if (filters.district && item.district !== filters.district) {
      return false;
    }
    if (filters.status && item.status !== filters.status) {
      return false;
    }
    if (filters.waterSourceType && item.waterSourceType !== filters.waterSourceType) {
      return false;
    }
    if (filters.keyword && filters.keyword.trim()) {
      const kw = filters.keyword.trim().toLowerCase();
      const matchPermit = item.permitNumber.toLowerCase().includes(kw);
      const matchName = item.irrigationName.toLowerCase().includes(kw);
      const matchOwner = item.waterOwner.toLowerCase().includes(kw);
      if (!matchPermit && !matchName && !matchOwner) {
        return false;
      }
    }
    return true;
  });
});

// Role Switch
const handleRoleChange = (role: IrrigationRoleLevel) => {
  currentRole.value = role;
  if (role === 'county') {
    MessagePlugin.info('已切换至【县级填报端】：支持按月填报小型灌区农业用水量及草稿管理');
  } else if (role === 'city') {
    MessagePlugin.info('已切换至【市级审核端】：西宁市水务局水资源管理科初审工作台');
  } else {
    MessagePlugin.info('已切换至【省级审核端】：青海省水利厅水资源处终审工作台');
  }
};

// Filter Actions
const handleSearch = () => {
  MessagePlugin.success(`已更新检索结果，共筛选出 ${filteredRecords.value.length} 条核算记录`);
};

const handleReset = () => {
  filters.year = '';
  filters.month = '';
  filters.district = '';
  filters.keyword = '';
  filters.status = '';
  filters.waterSourceType = '';
  MessagePlugin.info('筛选条件已重置');
};

const handleExport = () => {
  MessagePlugin.success(`已导出 ${filteredRecords.value.length} 条小型灌区月度农业用水核算台账 Excel 文件`);
};

// Modal Actions: Report
const openAddModal = () => {
  editingRecord.value = null;
  reportModalVisible.value = true;
};

const openEditModal = (record: IrrigationAccountingRecord) => {
  editingRecord.value = record;
  reportModalVisible.value = true;
};

const handleReportSubmit = (payload: Partial<IrrigationAccountingRecord>, targetStatus: IrrigationAuditStatus) => {
  const isUpdating = !!editingRecord.value;
  const nowStr = new Date().toLocaleString('zh-CN', { hour12: false });

  if (isUpdating) {
    const idx = records.value.findIndex((r) => r.id === editingRecord.value!.id);
    if (idx !== -1) {
      const old = records.value[idx];
      const newLogs = [...old.logs];
      newLogs.push({
        id: `log-${Date.now()}`,
        action: targetStatus === 'draft' ? '修改草稿' : '重新提交审核',
        operatorName: payload.reporter?.name || '经办人',
        roleName: payload.reporter?.unit || `${old.district}水务局`,
        time: nowStr,
        comment: targetStatus === 'draft' ? '县级修改并保存核算数据草稿' : '县级核实修改后重新提交市级初审',
        statusAfter: targetStatus,
      });

      records.value[idx] = {
        ...old,
        ...payload,
        status: targetStatus,
        currentStepLabel: targetStatus === 'draft' ? '草稿' : '待市级审核',
        logs: newLogs,
      } as IrrigationAccountingRecord;

      if (targetStatus === 'draft') {
        MessagePlugin.success('小型灌区月度核算草稿已保存');
      } else {
        MessagePlugin.success('核算数据已成功提交至西宁市水务局初审！');
      }
    }
  } else {
    // New record creation
    const newRecordId = `irr-rec-${Date.now()}`;
    const newRecord: IrrigationAccountingRecord = {
      id: newRecordId,
      licenseId: payload.licenseId!,
      permitNumber: payload.permitNumber!,
      irrigationName: payload.irrigationName!,
      district: payload.district!,
      waterOwner: payload.waterOwner!,
      waterSourceType: payload.waterSourceType!,
      annualQuota: payload.annualQuota!,
      year: payload.year!,
      month: payload.month!,
      periodKey: payload.periodKey!,
      periodLabel: payload.periodLabel!,
      waterData: payload.waterData!,
      calculationMethod: payload.calculationMethod || '以电折水核算',
      voucherFiles: payload.voucherFiles || [],
      status: targetStatus,
      currentStepLabel: targetStatus === 'draft' ? '草稿' : '待市级审核',
      reporter: payload.reporter!,
      logs: [
        {
          id: `log-${Date.now()}`,
          action: targetStatus === 'draft' ? '保存草稿' : '县级填报提交',
          operatorName: payload.reporter?.name || '经办人',
          roleName: payload.reporter?.unit || `${payload.district}水务局`,
          time: nowStr,
          comment: targetStatus === 'draft' ? '创建并暂存月度核算草稿' : '县级录入当月农业用水核算数据，提交市级初审',
          statusAfter: targetStatus,
        },
      ],
      remarks: payload.remarks || '',
    };

    records.value.unshift(newRecord);
    if (targetStatus === 'draft') {
      MessagePlugin.success('小型灌区月度核算草稿已创建保存');
    } else {
      MessagePlugin.success('小型灌区月度核算已成功申报，已提交市级初审！');
    }
  }
};

// County actions directly on table
const handleSubmitForAudit = (record: IrrigationAccountingRecord) => {
  const idx = records.value.findIndex((r) => r.id === record.id);
  if (idx !== -1) {
    const nowStr = new Date().toLocaleString('zh-CN', { hour12: false });
    records.value[idx].status = 'pending_city';
    records.value[idx].currentStepLabel = '待市级审核';
    records.value[idx].logs.push({
      id: `log-${Date.now()}`,
      action: '提交市级初审',
      operatorName: record.reporter.name,
      roleName: record.reporter.unit,
      time: nowStr,
      comment: '县级正式提交该月份小型灌区农业用水核算数据。',
      statusAfter: 'pending_city',
    });
    MessagePlugin.success(`【${record.irrigationName}】${record.periodLabel}核算数据已提交西宁市水务局审核！`);
  }
};

const handleRecallReport = (record: IrrigationAccountingRecord) => {
  const idx = records.value.findIndex((r) => r.id === record.id);
  if (idx !== -1) {
    const nowStr = new Date().toLocaleString('zh-CN', { hour12: false });
    records.value[idx].status = 'draft';
    records.value[idx].currentStepLabel = '草稿 (已撤回)';
    records.value[idx].logs.push({
      id: `log-${Date.now()}`,
      action: '撤回申报',
      operatorName: record.reporter.name,
      roleName: record.reporter.unit,
      time: nowStr,
      comment: '县级经办人员主动撤回申报以补充核实数据。',
      statusAfter: 'draft',
    });
    MessagePlugin.warning(`【${record.irrigationName}】核算申报已撤回为草稿状态`);
  }
};

const handleDeleteReport = (record: IrrigationAccountingRecord) => {
  records.value = records.value.filter((r) => r.id !== record.id);
  MessagePlugin.success(`草稿记录【${record.irrigationName}】已删除`);
};

// Modal Actions: Audit
const handleOpenAudit = (record: IrrigationAccountingRecord, level: 'city' | 'province') => {
  auditingRecord.value = record;
  activeAuditLevel.value = level;
  auditModalVisible.value = true;
};

const handleAuditComplete = (
  recordId: string,
  result: 'pass' | 'reject',
  comment: string,
  auditor: { name: string; unit: string }
) => {
  const idx = records.value.findIndex((r) => r.id === recordId);
  if (idx === -1) return;

  const old = records.value[idx];
  const nowStr = new Date().toLocaleString('zh-CN', { hour12: false });

  if (activeAuditLevel.value === 'city') {
    // 市级初审
    const targetStatus: IrrigationAuditStatus = result === 'pass' ? 'pending_province' : 'rejected';
    old.status = targetStatus;
    old.currentStepLabel = result === 'pass' ? '待省级审核' : '市级已驳回修改';
    old.cityAuditor = {
      name: auditor.name,
      unit: auditor.unit,
      time: nowStr,
      result: result,
      comment: comment,
    };
    old.logs.push({
      id: `log-${Date.now()}`,
      action: result === 'pass' ? '市级初审通过' : '市级初审驳回',
      operatorName: auditor.name,
      roleName: auditor.unit,
      time: nowStr,
      result: result,
      comment: comment,
      statusAfter: targetStatus,
    });

    if (result === 'pass') {
      MessagePlugin.success(`【${old.irrigationName}】市级初审通过，已转呈青海省水利厅终审！`);
    } else {
      MessagePlugin.warning(`【${old.irrigationName}】已驳回退回县级修改`);
    }
  } else {
    // 省级终审
    const targetStatus: IrrigationAuditStatus = result === 'pass' ? 'approved' : 'rejected';
    old.status = targetStatus;
    old.currentStepLabel = result === 'pass' ? '审核通过 / 已入库' : '省级已驳回修改';
    old.provinceAuditor = {
      name: auditor.name,
      unit: auditor.unit,
      time: nowStr,
      result: result,
      comment: comment,
    };
    old.logs.push({
      id: `log-${Date.now()}`,
      action: result === 'pass' ? '省级终审通过' : '省级终审驳回',
      operatorName: auditor.name,
      roleName: auditor.unit,
      time: nowStr,
      result: result,
      comment: comment,
      statusAfter: targetStatus,
    });

    if (result === 'pass') {
      MessagePlugin.success(`【${old.irrigationName}】省级终审通过，已计入全省农业用水入库台账！`);
    } else {
      MessagePlugin.warning(`【${old.irrigationName}】省级终审驳回，已退回县级重新核查`);
    }
  }
};

// Batch Audit
const handleBatchAudit = (level: 'city' | 'province') => {
  const targetRecords = records.value.filter((r) =>
    level === 'city' ? r.status === 'pending_city' : r.status === 'pending_province'
  );
  if (targetRecords.length === 0) {
    MessagePlugin.warning(`暂无待${level === 'city' ? '市级初审' : '省级终审'}的记录`);
    return;
  }

  const nowStr = new Date().toLocaleString('zh-CN', { hour12: false });
  targetRecords.forEach((r) => {
    if (level === 'city') {
      r.status = 'pending_province';
      r.currentStepLabel = '待省级审核';
      r.cityAuditor = {
        name: '刘洪涛',
        unit: '西宁市水务局水资源管理科',
        time: nowStr,
        result: 'pass',
        comment: '批量审核：经系统指标核验无误，符合农业用水定额，市级初审通过。',
      };
      r.logs.push({
        id: `log-${Date.now()}-${r.id}`,
        action: '批量市级初审通过',
        operatorName: '刘洪涛',
        roleName: '西宁市水务局',
        time: nowStr,
        result: 'pass',
        comment: '批量初审通过转呈省厅。',
        statusAfter: 'pending_province',
      });
    } else {
      r.status = 'approved';
      r.currentStepLabel = '审核通过 / 已入库';
      r.provinceAuditor = {
        name: '马延庆',
        unit: '青海省水利厅水资源处',
        time: nowStr,
        result: 'pass',
        comment: '批量审核：省级终审通过，准予入库归档。',
      };
      r.logs.push({
        id: `log-${Date.now()}-${r.id}`,
        action: '批量省级终审通过',
        operatorName: '马延庆',
        roleName: '青海省水利厅',
        time: nowStr,
        result: 'pass',
        comment: '批量终审通过入库。',
        statusAfter: 'approved',
      });
    }
  });

  MessagePlugin.success(`已完成 ${targetRecords.length} 笔核算记录的批量${level === 'city' ? '市级初审' : '省级终审'}！`);
};

// Modal Actions: Detail
const openDetailModal = (record: IrrigationAccountingRecord) => {
  detailRecord.value = record;
  detailModalVisible.value = true;
};

// Task Dispatcher Handlers (系统每月自动下发任务相关事件处理)
const handleUpdateTaskRule = (newRule: IrrigationTaskRule) => {
  taskRule.value = newRule;
  MessagePlugin.success(`系统每月自动下发规则已更新：每月 ${newRule.dispatchDay} 日定时触发下发，${newRule.deadlineDay} 日截止`);
};

const handleManualDispatchMonth = (monthKey: string) => {
  const [yearStr, monthStr] = monthKey.split('-');
  const y = Number(yearStr);
  const m = Number(monthStr);

  // 批量为辖区每个持证灌区下发月度填报任务
  const newTasks: IrrigationMonthlyTask[] = licenses.value.map((lic, index) => {
    return {
      id: `task-${y}${m < 10 ? '0' + m : m}-${String(index + 1).padStart(3, '0')}`,
      taskId: `RW-${y}${m < 10 ? '0' + m : m}-${lic.district.slice(0, 2)}${String(index + 1).padStart(2, '0')}`,
      taskTitle: `${y}年${m < 10 ? '0' + m : m}月小型灌区农业用水核算填报任务`,
      year: y,
      month: m,
      periodKey: monthKey,
      periodLabel: `${y}年${m < 10 ? '0' + m : m}月`,
      dispatchTime: `${y}-${m < 10 ? '0' + m : m}-01 00:00:00`,
      deadline: `${y}-${m < 10 ? '0' + m : m}-${taskRule.value.deadlineDay} 24:00:00`,
      district: lic.district,
      licenseId: lic.id,
      permitNumber: lic.permitNumber,
      irrigationName: lic.irrigationName,
      waterOwner: lic.waterOwner,
      targetUnit: `${lic.district}水务局水政水资源科`,
      status: 'pending',
      autoDispatched: true,
    };
  });

  monthlyTasks.value.unshift(...newTasks);
  taskRule.value.lastDispatchedPeriod = monthKey;
  taskRule.value.totalDispatchedCount += newTasks.length;
};

// 从任务清单快速跳至填报
const handleFillTask = (task: IrrigationMonthlyTask) => {
  editingRecord.value = {
    id: `temp-rec-${Date.now()}`,
    licenseId: task.licenseId,
    permitNumber: task.permitNumber,
    irrigationName: task.irrigationName,
    district: task.district,
    waterOwner: task.waterOwner,
    waterSourceType: '地表水',
    annualQuota: 100.0,
    year: task.year,
    month: task.month,
    periodKey: task.periodKey,
    periodLabel: task.periodLabel,
    waterData: {
      farmland: 0,
      woodland: 0,
      orchard: 0,
      pasture: 0,
      fishpond: 0,
      livestock: 0,
      subtotal: 0,
      groundwater: 0,
    },
    calculationMethod: '以电折水核算',
    voucherFiles: [],
    status: 'draft',
    currentStepLabel: '草稿',
    reporter: {
      name: '当前经办人',
      phone: '13909710000',
      unit: `${task.district}水务局`,
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
    },
    logs: [],
  };
  reportModalVisible.value = true;
};

const handleViewTaskRecord = (task: IrrigationMonthlyTask) => {
  if (task.associatedRecordId) {
    const rec = records.value.find((r) => r.id === task.associatedRecordId);
    if (rec) {
      detailRecord.value = rec;
      detailModalVisible.value = true;
      return;
    }
  }
  // 查找对应的月度台账记录
  const match = records.value.find(
    (r) => r.licenseId === task.licenseId && r.periodKey === task.periodKey
  );
  if (match) {
    detailRecord.value = match;
    detailModalVisible.value = true;
  } else {
    MessagePlugin.info(`该任务已下发至${task.district}水务局，正在录入核算中。`);
  }
};
</script>

