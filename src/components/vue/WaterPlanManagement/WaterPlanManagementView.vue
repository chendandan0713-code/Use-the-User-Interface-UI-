<template>
  <div class="space-y-3 h-full flex flex-col">
    <!-- Top Filter Bar matching Measurement Facility Management style -->
    <WaterPlanFilterBar
      :filterParams="filterParams"
      @search="handleSearch"
      @reset="handleReset"
      @export-data="handleExport"
      @add-report="openReportModal"
    />

    <!-- Quick Stats Bar & Action Row -->
    <div class="bg-white rounded-lg border border-slate-200/80 p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
      <!-- Left: Key stats indicator pills -->
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700">
          <span class="text-slate-400">申报总户数:</span>
          <strong class="text-slate-900 font-semibold">{{ filteredRecords.length }}</strong>
        </div>

        <div class="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded text-blue-700">
          <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span>待审核:</span>
          <strong class="font-bold text-blue-700">{{ pendingCount }}</strong>
        </div>

        <div class="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded text-emerald-700">
          <span>审核通过:</span>
          <strong class="font-bold text-emerald-700">{{ approvedCount }}</strong>
        </div>

        <div class="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 border border-rose-200 rounded text-rose-700">
          <span>审核驳回:</span>
          <strong class="font-bold text-rose-700">{{ rejectedCount }}</strong>
        </div>

        <div class="flex items-center gap-1.5 px-2.5 py-1 bg-cyan-50 border border-cyan-200 rounded text-cyan-800">
          <span>已下达计划:</span>
          <strong class="font-bold text-cyan-800">{{ releasedCount }}</strong>
        </div>

        <div class="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 border border-purple-200 rounded text-purple-700 font-mono">
          <span>计划总量:</span>
          <strong class="font-bold text-purple-800">{{ totalPlanVolume.toFixed(2) }}</strong>
          <span class="text-[10px] text-purple-600">万m³</span>
        </div>
      </div>

      <!-- Right: Action Buttons -->
      <div class="flex items-center gap-2">
        <!-- 新增计划申报填报按钮 -->
        <button
          type="button"
          @click="openReportModal"
          class="px-3.5 py-1.5 rounded bg-[#1677ff] hover:bg-blue-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs text-xs"
        >
          <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>计划用水申报填报</span>
        </button>
      </div>
    </div>

    <!-- Main Table View -->
    <WaterPlanTable
      :records="filteredRecords"
      @audit-record="openAuditModal"
      @view-detail="openDetailModal"
      @confirm-record="handleConfirmRecord"
    />

    <!-- Audit Modal -->
    <WaterPlanAuditModal
      v-model:visible="showAuditModal"
      :record="selectedRecord"
      @submit-audit="handleAuditSubmitted"
    />

    <!-- Detail Modal -->
    <WaterPlanDetailModal
      v-model:visible="showDetailModal"
      :record="selectedRecord"
    />

    <!-- Report / Add Modal -->
    <WaterPlanReportModal
      v-model:visible="showReportModal"
      :initialData="editingRecord"
      @submit-report="handleReportSubmitted"
    />

    <!-- Toast message feedback -->
    <div
      v-if="toastMessage"
      class="fixed bottom-6 right-6 z-70 bg-slate-900/90 text-white text-xs px-4 py-2.5 rounded-lg shadow-xl backdrop-blur-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <svg class="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { WaterPlanRecord, WaterPlanFilterParams } from '../../../types';
import { initialWaterPlanRecords } from '../../../data/mockWaterPlanData';
import WaterPlanFilterBar from './WaterPlanFilterBar.vue';
import WaterPlanTable from './WaterPlanTable.vue';
import WaterPlanAuditModal from './WaterPlanAuditModal.vue';
import WaterPlanDetailModal from './WaterPlanDetailModal.vue';
import WaterPlanReportModal from './WaterPlanReportModal.vue';

const props = defineProps<{
  selectedDistrict?: string;
}>();

// Records in state
const records = ref<WaterPlanRecord[]>([...initialWaterPlanRecords]);

// Modals state
const showAuditModal = ref(false);
const showDetailModal = ref(false);
const showReportModal = ref(false);
const selectedRecord = ref<WaterPlanRecord | null>(null);
const editingRecord = ref<WaterPlanRecord | null>(null);

// Toast feedback
const toastMessage = ref('');
const showToast = (msg: string) => {
  toastMessage.value = msg;
  setTimeout(() => {
    toastMessage.value = '';
  }, 2500);
};

// Filter parameters initial state matching the screenshot
const filterParams = ref<WaterPlanFilterParams>({
  userType: 'all',
  status: '',
  itemType: '',
  year: '2025',
  industryType: '',
  isSelfWaterSource: '',
  waterIntakeType: '',
  supervisorUnit: '',
  waterUserName: '',
  permitNumber: '',
  keySupervisionUnit: '',
  directManageType: '',
  isAboveDesignatedSize: '',
  permitVolumeFilter: '',
  planVolumeFilter: '',
  surfaceWaterFilter: '',
  groundwaterFilter: '',
  unconventionalFilter: '',
  recycledWaterFilter: '',
  mineWaterFilter: '',
  rainWaterFilter: '',
  brackishWaterFilter: '',
  selectedDistrict: props.selectedDistrict || '全部'
});

watch(
  () => props.selectedDistrict,
  (newDist) => {
    if (newDist) {
      filterParams.value.selectedDistrict = newDist;
    }
  }
);

// Filtered Records logic
const filteredRecords = computed(() => {
  return records.value.filter((item) => {
    // 1. 行政区县
    if (
      filterParams.value.selectedDistrict &&
      filterParams.value.selectedDistrict !== '全部' &&
      filterParams.value.selectedDistrict !== '西宁市'
    ) {
      if (!item.district.includes(filterParams.value.selectedDistrict) && !filterParams.value.selectedDistrict.includes(item.district)) {
        return false;
      }
    }

    // 2. 计划用水户类型
    if (filterParams.value.userType !== 'all') {
      if (item.userType !== filterParams.value.userType) return false;
    }

    // 3. 状态
    if (filterParams.value.status) {
      if (item.status !== filterParams.value.status) return false;
    }

    // 4. 事项类型
    if (filterParams.value.itemType) {
      if (item.itemType !== filterParams.value.itemType) return false;
    }

    // 5. 查询年份
    if (filterParams.value.year) {
      if (item.year !== filterParams.value.year) return false;
    }

    // 6. 行业类型
    if (filterParams.value.industryType) {
      if (!item.industryType.includes(filterParams.value.industryType)) return false;
    }

    // 7. 是否自备水源取水
    if (filterParams.value.isSelfWaterSource) {
      if (item.isSelfWaterSource !== filterParams.value.isSelfWaterSource) return false;
    }

    // 8. 取水类型
    if (filterParams.value.waterIntakeType) {
      if (item.waterIntakeType !== filterParams.value.waterIntakeType) return false;
    }

    // 9. 上级主管部门
    if (filterParams.value.supervisorUnit.trim()) {
      if (
        !item.supervisorUnit ||
        !item.supervisorUnit.toLowerCase().includes(filterParams.value.supervisorUnit.trim().toLowerCase())
      ) {
        return false;
      }
    }

    // 10. 取用水户名称或社会信用代码
    if (filterParams.value.waterUserName.trim()) {
      const kw = filterParams.value.waterUserName.trim().toLowerCase();
      const matchUnit = item.unitName.toLowerCase().includes(kw);
      const matchCode = item.creditCode.toLowerCase().includes(kw);
      if (!matchUnit && !matchCode) return false;
    }

    // 11. 取水许可编号
    if (filterParams.value.permitNumber.trim()) {
      const pkw = filterParams.value.permitNumber.trim().toLowerCase();
      if (!item.permitNumber || !item.permitNumber.toLowerCase().includes(pkw)) {
        return false;
      }
    }

    // 12. 重点监督单位
    if (filterParams.value.keySupervisionUnit) {
      if (item.keyType !== filterParams.value.keySupervisionUnit) return false;
    }

    // 13. 直管类型
    if (filterParams.value.directManageType) {
      if (item.directManageType !== filterParams.value.directManageType) return false;
    }

    // 14. 是否规上
    if (filterParams.value.isAboveDesignatedSize) {
      if (item.isAboveDesignatedSize !== filterParams.value.isAboveDesignatedSize) return false;
    }

    // 15. 水量筛选
    if (filterParams.value.permitVolumeFilter) {
      if (filterParams.value.permitVolumeFilter === '0-50' && item.permitVolume > 50) return false;
      if (filterParams.value.permitVolumeFilter === '50-100' && (item.permitVolume < 50 || item.permitVolume > 100)) return false;
      if (filterParams.value.permitVolumeFilter === '100-200' && (item.permitVolume < 100 || item.permitVolume > 200)) return false;
      if (filterParams.value.permitVolumeFilter === '>200' && item.permitVolume <= 200) return false;
    }

    if (filterParams.value.planVolumeFilter) {
      if (filterParams.value.planVolumeFilter === '0-50' && item.planVolume > 50) return false;
      if (filterParams.value.planVolumeFilter === '50-100' && (item.planVolume < 50 || item.planVolume > 100)) return false;
      if (filterParams.value.planVolumeFilter === '100-200' && (item.planVolume < 100 || item.planVolume > 200)) return false;
      if (filterParams.value.planVolumeFilter === '>200' && item.planVolume <= 200) return false;
    }

    return true;
  });
});

// Stats
const pendingCount = computed(() => {
  return records.value.filter((r) => r.status.includes('待审核')).length;
});

const approvedCount = computed(() => {
  return records.value.filter((r) => r.status === '审核通过').length;
});

const rejectedCount = computed(() => {
  return records.value.filter((r) => r.status === '审核驳回').length;
});

const releasedCount = computed(() => {
  return records.value.filter((r) => r.status === '已下达计划').length;
});

const totalPlanVolume = computed(() => {
  return filteredRecords.value.reduce((acc, cur) => acc + cur.planVolume, 0);
});

// Action Handlers
const handleSearch = () => {
  showToast(`已更新检索结果，共找到 ${filteredRecords.value.length} 条申报记录`);
};

const handleReset = () => {
  filterParams.value = {
    userType: 'all',
    status: '',
    itemType: '',
    year: '2025',
    industryType: '',
    isSelfWaterSource: '',
    waterIntakeType: '',
    supervisorUnit: '',
    waterUserName: '',
    permitNumber: '',
    keySupervisionUnit: '',
    directManageType: '',
    isAboveDesignatedSize: '',
    permitVolumeFilter: '',
    planVolumeFilter: '',
    surfaceWaterFilter: '',
    groundwaterFilter: '',
    unconventionalFilter: '',
    recycledWaterFilter: '',
    mineWaterFilter: '',
    rainWaterFilter: '',
    brackishWaterFilter: '',
    selectedDistrict: props.selectedDistrict || '全部'
  };
  showToast('筛选条件已重置');
};

const handleExport = () => {
  const headers = [
    '市(州)',
    '县(区)',
    '用水单位名称',
    '统一社会信用代码',
    '行业类型',
    '是否公共管网取水',
    '自备水源取水',
    '是否规上',
    '重点类型',
    '直管类型',
    '取水类型',
    '事项类型',
    '状态',
    '许可水量(万m³)',
    '计划水量(万m³)',
    '地表水(万m³)',
    '地下水(万m³)',
    '非常规水总计(万m³)'
  ];

  const rows = filteredRecords.value.map((r) => [
    r.city,
    r.district,
    `"${r.unitName.replace(/"/g, '""')}"`,
    `\t${r.creditCode}`,
    r.industryType,
    r.isPublicPipeNetwork,
    r.isSelfWaterSource,
    r.isAboveDesignatedSize,
    r.keyType,
    r.directManageType,
    r.waterIntakeType,
    r.itemType,
    r.status,
    r.permitVolume,
    r.planVolume,
    r.surfaceWater,
    r.groundwater,
    r.unconventionalTotal
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `西宁市计划用水填报审批清单_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('数据导出成功（CSV格式）');
};

const openAuditModal = (record: WaterPlanRecord) => {
  selectedRecord.value = record;
  showAuditModal.value = true;
};

const openDetailModal = (record: WaterPlanRecord) => {
  selectedRecord.value = record;
  showDetailModal.value = true;
};

const openReportModal = () => {
  editingRecord.value = null;
  showReportModal.value = true;
};

const handleAuditSubmitted = (updatedRecord: WaterPlanRecord) => {
  const index = records.value.findIndex((r) => r.id === updatedRecord.id);
  if (index > -1) {
    records.value[index] = updatedRecord;
    showToast(`【${updatedRecord.unitName}】审核操作已成功提交，状态更新为：${updatedRecord.status}`);
  }
};

const handleReportSubmitted = (newRecord: WaterPlanRecord) => {
  records.value.unshift(newRecord);
  showToast(`【${newRecord.unitName}】计划用水申报已成功提交！`);
};

const handleConfirmRecord = (record: WaterPlanRecord) => {
  const index = records.value.findIndex((r) => r.id === record.id);
  if (index > -1) {
    records.value[index] = {
      ...record,
      status: '审核通过',
      auditHistory: [
        ...(record.auditHistory || []),
        {
          stepName: '报备确认',
          operator: '主管审查科',
          department: '西宁市水务局',
          action: '确认通过',
          time: new Date().toISOString().slice(0, 19).replace('T', ' '),
          opinion: '动态报备事项已确认无误。',
          status: 'passed'
        }
      ]
    };
    showToast(`【${record.unitName}】动态报备已确认通过！`);
  }
};
</script>
