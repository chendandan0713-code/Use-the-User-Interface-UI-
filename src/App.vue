<template>
  <div class="h-screen w-screen flex flex-col overflow-hidden bg-slate-100 font-sans text-slate-800 antialiased select-none">
    <!-- Top Global Navigation Bar -->
    <TopNavbar
      :active-platform="activePlatform"
      @switch-platform="handleSwitchPlatform"
      @open-notifications="handleOpenNotifications"
    />

    <!-- Main Workspace Container -->
    <div class="flex-1 flex min-h-0 overflow-hidden">
      
      <!-- Left Sidebar (When in Water platform) -->
      <WaterSidebar
        v-if="activePlatform === 'water'"
        :active-menu="activeMenu"
        @select-menu="handleSelectMenu"
      />

      <!-- Right Content Layout -->
      <main class="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden bg-[#edf3fb]">
        <!-- Breadcrumb & Tab Bar -->
        <WaterBreadcrumbBar
          v-if="activePlatform === 'water'"
          :active-menu="activeMenu"
          @navigate="handleSelectMenu"
          @refresh="handleRefreshData"
          @switch-mes="handleSwitchPlatform('mes')"
        />

        <!-- View Router -->
        <div class="flex-1 min-h-0 overflow-hidden flex flex-col">
          <!-- 1. MES Digital Platform View -->
          <MesPlatformView v-if="activePlatform === 'mes'" />

          <!-- 2. Water Home Page with GIS polygon boundaries -->
          <WaterHomePage
            v-else-if="activeMenu === 'home'"
            @navigate="handleSelectMenu"
            @select-district="handleDistrictSelectFromMap"
          />

          <!-- 3. Dynamic Liquid Loading Animation Page -->
          <SystemLoadingPage
            v-else-if="activeMenu === 'system_loading'"
            @navigate="handleSelectMenu"
          />

          <!-- 4. Water Facility Management View -->
          <div
            v-else-if="activeMenu === 'facility_management'"
            class="flex-1 flex min-h-0 overflow-hidden p-3 gap-3 bg-[#edf3fb]"
          >
            <!-- Left District Tree Card -->
            <WaterDistrictTree
              :selected-district="selectedDistrict"
              @select-district="handleDistrictSelect"
            />

            <!-- Right Facility Table & Filter Content -->
            <div class="flex-1 flex flex-col min-w-0 min-h-0 gap-3 overflow-hidden">
              <WaterFilterBar
                :filter-params="filterParams"
                :selected-count="selectedFacilityIds.length"
                :visible-cols="facilityVisibleColumns"
                @search="handleSearchFacilities"
                @reset="handleResetFacilityFilters"
                @add-facility="openAddFacilityModal"
                @export-data="handleExportFacilityData"
                @batch-delete="() => handleBatchDeleteFacilities(selectedFacilityIds)"
                @refresh="handleRefreshData"
              />

              <WaterFacilityTable
                :facilities="filteredFacilities"
                :selected-row-keys="selectedFacilityIds"
                @update:selected-row-keys="(keys) => selectedFacilityIds = keys"
                :visible-cols="facilityVisibleColumns"
                @view-detail="handleViewFacilityDetail"
                @edit-facility="handleEditFacility"
                @toggle-disable="handleToggleFacilityDisable"
                @bind-gateway="handleBindFacilityGateway"
              />
            </div>
          </div>

          <!-- 5. Fault Reporting Management View -->
          <div
            v-else-if="activeMenu === 'fault'"
            class="flex-1 flex min-h-0 overflow-hidden"
          >
            <!-- Left District Tree for Faults -->
            <WaterDistrictTree
              :selected-district="selectedDistrict"
              @select-district="handleDistrictSelect"
            />

            <div class="flex-1 flex flex-col min-w-0 min-h-0 p-3 sm:p-4 gap-3 overflow-hidden bg-slate-100/80">
              <FaultFilterBar
                :filter-params="faultFilterParams"
                @search="handleSearchFaults"
                @reset="handleResetFaultFilters"
                @apply-fault="applyFaultModalVisible = true"
                @export-faults="handleExportFaults"
              />

              <FaultRecordTable
                :records="filteredFaultRecords"
                @view-workflow="handleViewFaultWorkflow"
                @preview-media="handlePreviewFaultMedia"
                @reapply-fault="handleReapplyFault"
              />
            </div>
          </div>

          <!-- 6. 数据质量控制 -> 告警处置 -> 告警工单 -->
          <AlarmWorkOrderView
            v-else-if="activeMenu === 'alarm_work_order'"
          />

          <!-- 7. 数据质量控制 -> 告警处置 -> 告警明细 -->
          <AlarmDetailView
            v-else-if="activeMenu === 'alarm_detail'"
          />

          <!-- 8. 数据质量控制 -> 水量数据修订 -->
          <WaterDataRevisionView
            v-else-if="activeMenu === 'water_data_revision'"
          />

          <!-- 9. 数据质量控制 -> 违规问题排查 -> 违规问题处理（全国） -->
          <ViolationHandlingView
            v-else-if="activeMenu === 'violation_national' || activeMenu === 'violation_handling'"
            level="national"
          />

          <!-- 10. 数据质量控制 -> 违规问题排查 -> 违规问题处理（省级） -->
          <ViolationHandlingView
            v-else-if="activeMenu === 'violation_provincial'"
            level="provincial"
          />

          <!-- 11. 数据归集 -> 人工归集 (非在线计量设施人工填报与审核) -->
          <ManualCollectionPlatformView
            v-else-if="activeMenu === 'manual_collection'"
            :selected-district="selectedDistrict"
            @select-district="handleDistrictSelect"
          />

          <!-- 12. 数据规范整合 -> 一户一档 -->
          <EnterpriseDossierView
            v-else-if="activeMenu === 'enterprise_dossier'"
          />

          <!-- 7. Water Plan Management (计划用水管理 -> 填报审批) View -->
          <div
            v-else-if="activeMenu === 'water_plan' || activeMenu === 'water_plan_management'"
            class="flex-1 flex min-h-0 overflow-hidden p-3 gap-3 bg-[#edf3fb]"
          >
            <!-- Left District Tree Card (与计量设施管理页面布局完全统一) -->
            <WaterDistrictTree
              :selected-district="selectedDistrict"
              @select-district="handleDistrictSelect"
            />

            <!-- Right Water Plan Management Content -->
            <div class="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
              <WaterPlanManagementView
                :selected-district="selectedDistrict"
              />
            </div>
          </div>

          <!-- 8. Scenarios View -->
          <div
            v-else
            class="flex-1 p-6 overflow-y-auto bg-slate-100/80 space-y-4"
          >
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <h2 class="text-base font-bold text-slate-800 mb-2">全域综合应用场景与水权沙盘</h2>
              <p class="text-xs text-slate-500 leading-relaxed">
                包含地下水压采超采区动态预警、黄河干流水权跨区指标置换交易、工业企业水平衡智能诊断模型等 12 项智慧水利高阶场景。
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                <div class="p-3 bg-blue-50/60 rounded-lg border border-blue-200/60">
                  <div class="font-bold text-blue-900 text-xs">地下水超采智慧压采</div>
                  <div class="text-[11px] text-blue-700 mt-1">监测深层承压水水位回升，已实现西宁全域管网精准限流。</div>
                </div>
                <div class="p-3 bg-cyan-50/60 rounded-lg border border-cyan-200/60">
                  <div class="font-bold text-cyan-900 text-xs">企业水平衡智能仿真</div>
                  <div class="text-[11px] text-cyan-700 mt-1">实时比对工单排产与瞬时用水峰谷，杜绝违规直排超排。</div>
                </div>
                <div class="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200/60">
                  <div class="font-bold text-emerald-900 text-xs">生态补水与水权交易</div>
                  <div class="text-[11px] text-emerald-700 mt-1">湟水河流域生态流量 100% 达标，水权转让收益直达专户。</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>

    <!-- Modals & Drawers -->
    <WaterFacilityDetailModal
      v-model:visible="detailDrawerVisible"
      :facility="selectedFacility"
    />

    <WaterFacilityModal
      v-model:visible="facilityModalVisible"
      :facility="selectedFacility"
      @save="handleSaveFacility"
    />

    <WaterDisableModal
      v-model:visible="disableModalVisible"
      :facility="selectedFacility"
      @confirm="handleConfirmDisableFacility"
    />

    <WaterBindingModal
      v-model:visible="bindingModalVisible"
      :facility="selectedFacility"
      @confirm="handleConfirmBindGateway"
    />

    <FaultWorkflowModal
      v-model:visible="workflowModalVisible"
      :record="selectedFaultRecord"
    />

    <FaultMediaPreviewModal
      v-model:visible="mediaPreviewVisible"
      :record="selectedFaultRecord"
    />

    <FaultApplyModal
      v-model:visible="applyFaultModalVisible"
      @submit="handleSaveFaultTicket"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next';
import type { WaterFacility, FaultRecord, WaterFilterParams, FaultFilterParams } from './types';
import { initialFacilities } from './mockData';
import { initialFaultRecords } from './mockFaultData';

// Vue Components
import TopNavbar from './components/vue/TopNavbar.vue';
import WaterSidebar from './components/vue/WaterSidebar.vue';
import WaterBreadcrumbBar from './components/vue/WaterBreadcrumbBar.vue';
import WaterDistrictTree from './components/vue/WaterDistrictTree.vue';
import WaterFilterBar from './components/vue/WaterFilterBar.vue';
import WaterFacilityTable from './components/vue/WaterFacilityTable.vue';
import WaterHomePage from './components/vue/WaterHomePage.vue';
import SystemLoadingPage from './components/vue/SystemLoadingPage.vue';
import WaterFacilityDetailModal from './components/vue/WaterFacilityDetailModal.vue';
import WaterFacilityModal from './components/vue/WaterFacilityModal.vue';
import WaterDisableModal from './components/vue/WaterDisableModal.vue';
import WaterBindingModal from './components/vue/WaterBindingModal.vue';
import FaultFilterBar from './components/vue/FaultFilterBar.vue';
import FaultRecordTable from './components/vue/FaultRecordTable.vue';
import FaultWorkflowModal from './components/vue/FaultWorkflowModal.vue';
import FaultMediaPreviewModal from './components/vue/FaultMediaPreviewModal.vue';
import FaultApplyModal from './components/vue/FaultApplyModal.vue';
import MesPlatformView from './components/vue/MesPlatformView.vue';
import ViolationHandlingView from './components/vue/ViolationHandlingView.vue';
import WaterPlanManagementView from './components/vue/WaterPlanManagement/WaterPlanManagementView.vue';
import AlarmWorkOrderView from './components/vue/AlarmWorkOrderView.vue';
import AlarmDetailView from './components/vue/AlarmDetailView.vue';
import WaterDataRevisionView from './components/vue/WaterDataRevisionView.vue';
import ManualCollectionPlatformView from './components/vue/ManualCollection/ManualCollectionPlatformView.vue';
import EnterpriseDossierView from './components/vue/EnterpriseDossierView.vue';

// Master State
const savedPlatform = typeof window !== 'undefined' ? (localStorage.getItem('xns_active_platform') as 'water' | 'mes') : null;
const savedMenu = typeof window !== 'undefined' ? localStorage.getItem('xns_active_menu') : null;

const activePlatform = ref<'water' | 'mes'>(savedPlatform || 'water');
const activeMenu = ref<string>(savedMenu || 'alarm_work_order');
const selectedDistrict = ref<string>('全部');

// Facilities Data
const facilities = ref<WaterFacility[]>([...initialFacilities]);
const selectedFacility = ref<WaterFacility | null>(null);
const selectedFacilityIds = ref<string[]>([]);
const facilityVisibleColumns = reactive({
  waterOwner: true,
  facilityName: true,
  facilityCode: true,
  district: true,
  meteringMethod: true,
  status: true,
  reading: true,
  time: true,
});

// Fault Records Data
const faultRecords = ref<FaultRecord[]>([...initialFaultRecords]);
const selectedFaultRecord = ref<FaultRecord | null>(null);

// Modals Visibility
const detailDrawerVisible = ref(false);
const facilityModalVisible = ref(false);
const disableModalVisible = ref(false);
const bindingModalVisible = ref(false);
const workflowModalVisible = ref(false);
const mediaPreviewVisible = ref(false);
const applyFaultModalVisible = ref(false);

// Facility Filters
const filterParams = ref<WaterFilterParams>({
  queryMode: 'cert_auth',
  facilityCode: '',
  facilityName: '',
  waterOwner: '',
  permitNumber: '',
  waterSourceType: '',
  dataSource: '',
  monitorPointCode: '',
  waterUsage: '',
  meteringMethod: '',
  transmissionMethod: '',
  isArchived: '',
  status: '',
  includeChildren: true,
  selectedDistrict: '',
});

// Fault Filters
const faultFilterParams = ref<FaultFilterParams>({
  facilityName: '',
  permitNumberOrOwner: '',
  dateRange: '',
  status: '全部',
  selectedDistrict: '全部',
});

// Computed Filtered Facilities
const filteredFacilities = computed(() => {
  return facilities.value.filter((f) => {
    // District from left tree
    if (selectedDistrict.value !== '全部' && selectedDistrict.value !== '西宁市' && selectedDistrict.value !== '青海省') {
      if (f.district !== selectedDistrict.value) return false;
    }
    // District from search dropdown
    if (filterParams.value.selectedDistrict && filterParams.value.selectedDistrict !== '全部') {
      if (f.district !== filterParams.value.selectedDistrict) return false;
    }
    // Facility Code
    if (filterParams.value.facilityCode && filterParams.value.facilityCode.trim()) {
      const q = filterParams.value.facilityCode.trim().toLowerCase();
      if (!f.code.toLowerCase().includes(q)) return false;
    }
    // Facility Name
    if (filterParams.value.facilityName.trim()) {
      const q = filterParams.value.facilityName.trim().toLowerCase();
      if (!f.name.toLowerCase().includes(q)) {
        return false;
      }
    }
    // Owner
    if (filterParams.value.waterOwner.trim()) {
      const q = filterParams.value.waterOwner.trim().toLowerCase();
      if (!f.waterOwner.toLowerCase().includes(q)) return false;
    }
    // Status
    if (filterParams.value.status && filterParams.value.status !== '全部') {
      if (f.status !== filterParams.value.status) return false;
    }
    // Metering Method
    if (filterParams.value.meteringMethod && filterParams.value.meteringMethod !== '全部') {
      if (f.meteringMethod !== filterParams.value.meteringMethod && f.facilityType !== filterParams.value.meteringMethod) {
        return false;
      }
    }
    // Water Source
    if (filterParams.value.waterSourceType && filterParams.value.waterSourceType !== '全部') {
      if (f.waterSourceType !== filterParams.value.waterSourceType) return false;
    }
    // Transmission
    if (filterParams.value.transmissionMethod && filterParams.value.transmissionMethod !== '全部') {
      if (f.transmissionMethod !== filterParams.value.transmissionMethod) return false;
    }
    // Permit Number
    if (filterParams.value.permitNumber.trim()) {
      const q = filterParams.value.permitNumber.trim().toLowerCase();
      if (!f.permitNumber.toLowerCase().includes(q)) return false;
    }
    // Archived
    if (filterParams.value.isArchived && filterParams.value.isArchived !== '全部') {
      const shouldBeArchived = filterParams.value.isArchived === '是';
      if (f.isArchived !== shouldBeArchived) return false;
    }
    return true;
  });
});

// Computed Filtered Fault Records
const filteredFaultRecords = computed(() => {
  return faultRecords.value.filter((r) => {
    if (selectedDistrict.value !== '全部' && selectedDistrict.value !== '西宁市' && selectedDistrict.value !== '青海省') {
      if (r.district !== selectedDistrict.value) return false;
    }
    if (faultFilterParams.value.facilityName.trim()) {
      const q = faultFilterParams.value.facilityName.trim().toLowerCase();
      if (!r.facilityName.toLowerCase().includes(q) && !r.facilityCode.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (faultFilterParams.value.permitNumberOrOwner.trim()) {
      const q = faultFilterParams.value.permitNumberOrOwner.trim().toLowerCase();
      if (!r.waterOwner.toLowerCase().includes(q) && !r.permitNumber.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (faultFilterParams.value.status && faultFilterParams.value.status !== '全部') {
      if (r.status !== faultFilterParams.value.status) return false;
    }
    return true;
  });
});

// Navigation handlers
const handleSwitchPlatform = (p: 'water' | 'mes') => {
  activePlatform.value = p;
  if (typeof window !== 'undefined') {
    localStorage.setItem('xns_active_platform', p);
  }
  MessagePlugin.info(`已切换至【${p === 'water' ? '西宁市取水许可监管平台' : '智造MES生产管理平台'}】`);
};

const handleSelectMenu = (menu: string) => {
  activeMenu.value = menu;
  if (typeof window !== 'undefined') {
    localStorage.setItem('xns_active_menu', menu);
  }
};

const handleDistrictSelect = (district: string) => {
  selectedDistrict.value = district;
  MessagePlugin.info(`已切换行政区域：${district}`);
};

const handleDistrictSelectFromMap = (district: string) => {
  selectedDistrict.value = district;
  activeMenu.value = 'facility_management';
  MessagePlugin.success(`已联动跳转并锁定行政区划：【${district}】`);
};

const handleRefreshData = () => {
  MessagePlugin.success('数据缓存已刷新，最新遥测报文已同步');
};

const handleOpenNotifications = () => {
  MessagePlugin.info('通知中心：西宁市城东区水厂等 3 个点位遥测自检正常');
};

// Facility Action handlers
const handleSearchFacilities = () => {
  MessagePlugin.info(`已执行检索，共筛选出 ${filteredFacilities.value.length} 条计量设施`);
};

const handleResetFacilityFilters = () => {
  filterParams.value = {
    queryMode: 'cert_auth',
    facilityCode: '',
    facilityName: '',
    waterOwner: '',
    permitNumber: '',
    waterSourceType: '',
    dataSource: '',
    monitorPointCode: '',
    waterUsage: '',
    meteringMethod: '',
    transmissionMethod: '',
    isArchived: '',
    status: '',
    includeChildren: true,
    selectedDistrict: '',
  };
  selectedDistrict.value = '全部';
  MessagePlugin.success('筛选条件已重置');
};

const openAddFacilityModal = () => {
  selectedFacility.value = null;
  facilityModalVisible.value = true;
};

const handleViewFacilityDetail = (f: WaterFacility) => {
  selectedFacility.value = f;
  detailDrawerVisible.value = true;
};

const handleEditFacility = (f: WaterFacility) => {
  selectedFacility.value = f;
  facilityModalVisible.value = true;
};

const handleSaveFacility = (data: Partial<WaterFacility>) => {
  if (selectedFacility.value) {
    const idx = facilities.value.findIndex((f) => f.id === selectedFacility.value!.id);
    if (idx !== -1) {
      facilities.value[idx] = { ...facilities.value[idx], ...data } as WaterFacility;
    }
  } else {
    const newFacility: WaterFacility = {
      id: `fac-${Date.now()}`,
      name: data.name || '新建计量设施',
      code: data.code || '241017009999',
      status: data.status || '正常',
      reportMethod: '接口',
      transmissionMethod: data.transmissionMethod || '无线4G',
      waterSourceType: data.waterSourceType || '地表水',
      fundingSource: '自计量',
      fundingYear: '2026',
      specModel: data.specModel || 'DN100-W4',
      facilityType: '电磁水表',
      isArchived: true,
      lastReportTime: '刚刚',
      lastCalibrationTime: '2026-01-01',
      calibrationExpiryDate: '2028-01-01',
      isReportedToNational: true,
      district: data.district || '城东区',
      waterOwner: data.waterOwner || '西宁供水公司',
      permitNumber: data.permitNumber || '取水（青宁）字[2026]第0001号',
      monitorPointCode: 'MP-099',
      waterUsage: '工业用水',
      meteringMethod: '电磁流量计',
      dataSource: '西宁物联采集网',
      address: data.address || '西宁市东川工业园区',
    };
    facilities.value.unshift(newFacility);
  }
};

const handleToggleFacilityDisable = (f: WaterFacility) => {
  selectedFacility.value = f;
  disableModalVisible.value = true;
};

const handleConfirmDisableFacility = (payload: { id: string; status: '正常' | '停用'; reason?: string; material?: string }) => {
  const idx = facilities.value.findIndex((f) => f.id === payload.id);
  if (idx !== -1) {
    facilities.value[idx].status = payload.status;
    facilities.value[idx].disableReason = payload.reason;
    facilities.value[idx].disableMaterial = payload.material;
  }
};

const handleBindFacilityGateway = (f: WaterFacility) => {
  selectedFacility.value = f;
  bindingModalVisible.value = true;
};

const handleConfirmBindGateway = (payload: { id: string; gatewaySerial: string }) => {
  const idx = facilities.value.findIndex((f) => f.id === payload.id);
  if (idx !== -1) {
    facilities.value[idx].transmissionMethod = '无线4G';
  }
};

const handleExportFacilityData = () => {
  const count = selectedFacilityIds.value.length > 0 ? selectedFacilityIds.value.length : filteredFacilities.value.length;
  const tip = selectedFacilityIds.value.length > 0 ? `选中的 ${count} 处` : `全域 ${count} 处`;
  MessagePlugin.success(`正在导出西宁市 ${tip} 计量设施Excel台账...`);
};

const handleBatchDisableFacilities = (keys: string[]) => {
  facilities.value.forEach((f) => {
    if (keys.includes(f.id)) {
      f.status = '停用';
    }
  });
  MessagePlugin.warning(`已批量停用选中的 ${keys.length} 处计量设施`);
};

const handleBatchExportFacilities = (keys: string[]) => {
  MessagePlugin.success(`已批量导出 ${keys.length} 处计量设施明细数据`);
};

const handleBatchDeleteFacilities = (keys: string[]) => {
  if (!keys || keys.length === 0) return;
  const confirmDialog = DialogPlugin.confirm({
    header: '批量删除确认',
    body: `确定要删除选中的 ${keys.length} 项计量设施记录吗？此操作不可逆。`,
    confirmBtn: '确认删除',
    cancelBtn: '取消',
    theme: 'danger',
    onConfirm: () => {
      facilities.value = facilities.value.filter((f) => !keys.includes(f.id));
      selectedFacilityIds.value = [];
      confirmDialog.hide();
      MessagePlugin.success(`已成功删除选中的 ${keys.length} 项计量设施`);
    }
  });
};

// Fault handlers
const handleSearchFaults = () => {
  MessagePlugin.info(`已执行故障工单检索，匹配出 ${filteredFaultRecords.value.length} 条工单`);
};

const handleResetFaultFilters = () => {
  faultFilterParams.value = {
    facilityName: '',
    permitNumberOrOwner: '',
    dateRange: '',
    status: '全部',
    selectedDistrict: '全部',
  };
  selectedDistrict.value = '全部';
  MessagePlugin.success('工单筛选条件已重置');
};

const handleViewFaultWorkflow = (record: FaultRecord) => {
  selectedFaultRecord.value = record;
  workflowModalVisible.value = true;
};

const handlePreviewFaultMedia = (record: FaultRecord) => {
  selectedFaultRecord.value = record;
  mediaPreviewVisible.value = true;
};

const handleReapplyFault = (record: FaultRecord) => {
  applyFaultModalVisible.value = true;
};

const handleSaveFaultTicket = (newRecord: Partial<FaultRecord>) => {
  faultRecords.value.unshift(newRecord as FaultRecord);
};

const handleExportFaults = () => {
  MessagePlugin.success(`已成功导出 ${filteredFaultRecords.value.length} 条故障工单台账`);
};
</script>
