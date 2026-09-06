<template>
  <div class="flex-1 flex min-h-0 overflow-hidden p-3 gap-3 bg-[#edf3fb] select-none">
    <!-- 1. 左侧行政区划树 (青海省 -> 市州 -> 县区) -->
    <ViolationDistrictTree
      :selected-district="selectedDistrict"
      @select-district="handleDistrictSelect"
    />

    <!-- 2. 右侧主工作区 -->
    <div class="flex-1 flex flex-col min-w-0 min-h-0 gap-2.5 overflow-hidden">
      <!-- 2.1 顶部业务标签页 (计量水量超许可 / 直报水量超许可 / 违规新增取水许可 等) -->
      <ViolationFilterTabs
        v-model:active-tab="currentCategory"
        :tabs="businessTabs"
      />

      <!-- 2.2 搜索过滤栏 (按截图高仿表单结构) -->
      <ViolationFilterBar
        @search="handleSearch"
        @reset="handleReset"
        @export="handleExport"
      />

      <!-- 2.3 违规数据表格与分页器 -->
      <ViolationTable
        :items="filteredViolations"
        @view-detail="handleViewDetail"
        @audit="handleAudit"
        @urge="handleUrge"
        @delete="handleDelete"
      />
    </div>

    <!-- 3. 详情弹窗 -->
    <ViolationDetailModal
      v-model:visible="detailModalVisible"
      :item="selectedItem"
      @urged="handleUrge"
    />

    <!-- 4. 省级审核弹窗 -->
    <ViolationAuditModal
      v-model:visible="auditModalVisible"
      :item="selectedItem"
      @audit-complete="handleAuditComplete"
    />

    <!-- 5. 右下角快捷在线工单/反馈悬浮小圆球 (截图右下角圆形气泡图标) -->
    <div class="fixed right-6 bottom-5 z-40">
      <button
        type="button"
        @click="handleOpenHelp"
        class="w-10 h-10 rounded-full bg-white text-gray-700 hover:text-[#1677ff] border border-gray-200 shadow-md flex items-center justify-center transition cursor-pointer hover:shadow-lg"
        title="在线客服与违规处置工单"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next';
import ViolationDistrictTree from './ViolationDistrictTree.vue';
import ViolationFilterTabs from './ViolationFilterTabs.vue';
import ViolationFilterBar, { type ViolationFilterState } from './ViolationFilterBar.vue';
import ViolationTable from './ViolationTable.vue';
import ViolationDetailModal from './ViolationDetailModal.vue';
import ViolationAuditModal from './ViolationAuditModal.vue';
import { generateFullViolations, type ViolationItem } from '../../mockViolationData';

// 初始生成完整的 93 条真实对应数据集
const violationsList = ref<ViolationItem[]>(generateFullViolations());

// 当前选中的业务 Tab (默认截图中的：计量水量超许可)
const currentCategory = ref<string>('meter_exceed');

// 选中的区县或市州
const selectedDistrict = ref<string>('青海省');
const selectedCity = ref<string>('');

// 过滤参数状态
const filterParams = ref<ViolationFilterState>({
  waterOwner: '',
  permitNumber: '',
  isConfirmedProblem: '',
  rectificationStatus: '',
  checkStatus: '',
  isOverdue: '',
  queryModes: ['所有发证', '流域', '省级', '市级', '县级'],
  batchYear: '',
  handleUnit: '',
  deadlineFilter: '',
});

// 弹窗状态
const detailModalVisible = ref(false);
const auditModalVisible = ref(false);
const selectedItem = ref<ViolationItem | null>(null);

// 统计各 Tab 的真实业务数量
const businessTabs = computed(() => [
  {
    key: 'meter_exceed',
    label: '计量水量超许可',
    count: violationsList.value.filter((v) => v.category === 'meter_exceed').length,
  },
  {
    key: 'direct_report_exceed',
    label: '直报水量超许可',
    count: violationsList.value.filter((v) => v.category === 'direct_report_exceed').length,
  },
  {
    key: 'illegal_new_license',
    label: '违规新增取水许可',
    count: violationsList.value.filter((v) => v.category === 'illegal_new_license').length,
  },
  {
    key: 'all',
    label: '全部违规问题',
    count: violationsList.value.length,
  },
]);

// 综合联动筛选计算属性
const filteredViolations = computed(() => {
  return violationsList.value.filter((item) => {
    // 1. Tab 类别匹配 (在默认 Tab 下主要展示 meter_exceed，当切换其他 Tab 时展示对应数据)
    if (currentCategory.value && currentCategory.value !== 'all' && item.category !== currentCategory.value) {
      return false;
    }

    // 2. 行政区划联动筛选
    if (selectedDistrict.value && selectedDistrict.value !== '青海省' && selectedDistrict.value !== '全部') {
      const matchCity = item.city.includes(selectedDistrict.value);
      const matchCounty = item.county.includes(selectedDistrict.value);
      if (!matchCity && !matchCounty) {
        return false;
      }
    }

    // 3. 取水权人检索
    if (filterParams.value.waterOwner.trim()) {
      const kw = filterParams.value.waterOwner.trim().toLowerCase();
      if (!item.waterOwner.toLowerCase().includes(kw)) {
        return false;
      }
    }

    // 4. 许可证编号检索
    if (filterParams.value.permitNumber.trim()) {
      const kw = filterParams.value.permitNumber.trim().toLowerCase();
      if (!item.permitNumber.toLowerCase().includes(kw)) {
        return false;
      }
    }

    // 5. 是否确认为问题
    if (filterParams.value.isConfirmedProblem) {
      if (item.isConfirmedProblem !== filterParams.value.isConfirmedProblem) {
        return false;
      }
    }

    // 6. 整改状态
    if (filterParams.value.rectificationStatus) {
      if (item.rectificationStatus !== filterParams.value.rectificationStatus) {
        return false;
      }
    }

    // 7. 排查状态
    if (filterParams.value.checkStatus) {
      if (item.checkStatus !== filterParams.value.checkStatus) {
        return false;
      }
    }

    // 8. 是否超时
    if (filterParams.value.isOverdue) {
      if (item.isOverdue !== filterParams.value.isOverdue) {
        return false;
      }
    }

    // 9. 查询方式 (发证层级)
    if (filterParams.value.queryModes && filterParams.value.queryModes.length > 0) {
      if (!filterParams.value.queryModes.includes('所有发证')) {
        if (!filterParams.value.queryModes.includes(item.licenseType)) {
          return false;
        }
      }
    }

    // 10. 更多条件：年份
    if (filterParams.value.batchYear && item.batchYear !== filterParams.value.batchYear) {
      return false;
    }

    // 11. 更多条件：处置单位
    if (filterParams.value.handleUnit?.trim()) {
      if (!item.handleUnit.includes(filterParams.value.handleUnit.trim())) {
        return false;
      }
    }

    return true;
  });
});

// 处理行政区划树点击
const handleDistrictSelect = (district: string, city?: string) => {
  selectedDistrict.value = district;
  if (city) selectedCity.value = city;
  MessagePlugin.info(`已切换行政区域：${district}`);
};

// 搜索
const handleSearch = (params: ViolationFilterState) => {
  filterParams.value = { ...params };
  MessagePlugin.success('已应用筛选条件');
};

// 重置
const handleReset = () => {
  filterParams.value = {
    waterOwner: '',
    permitNumber: '',
    isConfirmedProblem: '',
    rectificationStatus: '',
    checkStatus: '',
    isOverdue: '',
    queryModes: ['所有发证', '流域', '省级', '市级', '县级'],
    batchYear: '',
    handleUnit: '',
    deadlineFilter: '',
  };
  MessagePlugin.info('已重置搜索条件');
};

// 导出问题台账
const handleExport = () => {
  MessagePlugin.success('正在导出当前筛选出的违规问题台账 Excel 数据表...');
};

// 查看详情
const handleViewDetail = (item: ViolationItem) => {
  selectedItem.value = item;
  detailModalVisible.value = true;
};

// 审核
const handleAudit = (item: ViolationItem) => {
  selectedItem.value = item;
  auditModalVisible.value = true;
};

// 审核完成回调
const handleAuditComplete = (item: ViolationItem, conclusion: string) => {
  const target = violationsList.value.find((v) => v.id === item.id);
  if (target) {
    target.status = '整改中';
    target.stage = '整改落实';
    target.checkStatus = '已归档';
    target.isConfirmedProblem = conclusion.includes('属实') ? '是' : '否';
  }
};

// 催办
const handleUrge = (item: ViolationItem) => {
  const target = violationsList.value.find((v) => v.id === item.id);
  if (target) {
    target.isUrged = true;
    MessagePlugin.success(`已向【${item.handleUnit}】发送超限违规督办通知短信与平台待办`);
  }
};

// 删除 / 作废记录
const handleDelete = (item: ViolationItem) => {
  const confirmDialog = DialogPlugin.confirm({
    header: '确认作废/删除',
    body: `确定要作废并移除【${item.waterOwner}】（${item.county}）的违规问题记录吗？该操作将归入审计废案库。`,
    confirmBtn: {
      content: '确认删除',
      theme: 'danger',
    },
    cancelBtn: '取消',
    onConfirm: () => {
      violationsList.value = violationsList.value.filter((v) => v.id !== item.id);
      MessagePlugin.success('该违规问题记录已成功移除');
      confirmDialog.hide();
    },
  });
};

const handleOpenHelp = () => {
  MessagePlugin.info('违规问题治理与核查咨询热线：0971-8228315（省水资源管理中心）');
};
</script>
