<template>
  <div class="bg-white rounded-lg p-3 border border-[#b4c7e0] shadow-2xs text-xs select-none space-y-2.5">
    <!-- 1. 统一搜索输入项容器：所有搜索框在同一个区域内自适应 flex-wrap，无中间横线 -->
    <div class="flex flex-wrap items-center gap-2.5">
      <!-- 1.1 查询方式 (复选框组：所有发证、流域、省级、市级、县级) -->
      <div class="flex items-center gap-2.5 px-3 py-1.5 bg-[#f8fafc] rounded border border-[#b8cde6] text-gray-700 shrink-0">
        <span class="text-gray-500 font-medium">查询方式:</span>
        <!-- 所有发证 -->
        <label class="inline-flex items-center gap-1 cursor-pointer hover:text-[#1677ff] transition">
          <input
            type="checkbox"
            :checked="isAllQueryModesChecked"
            @change="toggleAllQueryModes"
            class="w-3.5 h-3.5 accent-[#1677ff] rounded cursor-pointer"
          />
          <span :class="isAllQueryModesChecked ? 'text-[#1677ff] font-medium' : ''">所有发证</span>
        </label>
        <!-- 各层级复选框 -->
        <label
          v-for="mode in individualLevels"
          :key="mode"
          class="inline-flex items-center gap-1 cursor-pointer hover:text-[#1677ff] transition"
        >
          <input
            type="checkbox"
            :value="mode"
            v-model="localParams.queryModes"
            @change="handleSingleQueryModeChange"
            class="w-3.5 h-3.5 accent-[#1677ff] rounded cursor-pointer"
          />
          <span :class="localParams.queryModes.includes(mode) ? 'text-[#1677ff] font-medium' : ''">{{ mode }}</span>
        </label>
      </div>

      <!-- 1.2 取水权人名称 (固定宽度 190px，自适应换行) -->
      <div class="relative w-[190px] shrink-0">
        <input
          v-model="localParams.waterOwner"
          type="text"
          placeholder="请输入取水权人名称"
          class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
          @keydown.enter="handleSearch"
        />
        <button
          v-if="localParams.waterOwner"
          type="button"
          @click="clearField('waterOwner')"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          title="清空"
        >
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 1.3 许可证编号 (固定宽度 190px，自适应换行) -->
      <div class="relative w-[190px] shrink-0">
        <input
          v-model="localParams.permitNumber"
          type="text"
          placeholder="请输入许可证编号"
          class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800 font-mono"
          @keydown.enter="handleSearch"
        />
        <button
          v-if="localParams.permitNumber"
          type="button"
          @click="clearField('permitNumber')"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          title="清空"
        >
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 1.4 是否确认为问题 (固定宽度 160px，自适应换行) -->
      <CustomSelect
        v-model="localParams.isConfirmedProblem"
        :options="[
          { value: '', label: '是否确认为问题: 全部' },
          { value: '是', label: '是', badge: 'true', badgeColor: 'bg-rose-500' },
          { value: '否', label: '否', badge: 'true', badgeColor: 'bg-emerald-500' },
          { value: '待研判', label: '待研判', badge: 'true', badgeColor: 'bg-amber-500' },
        ]"
        placeholder="是否确认为问题: 全部"
        customClass="w-[160px] shrink-0"
        @change="handleSearch"
      />

      <!-- 1.5 整改状态 (固定宽度 160px，自适应换行) -->
      <CustomSelect
        v-model="localParams.rectificationStatus"
        :options="[
          { value: '', label: '整改状态: 全部' },
          { value: '未整改', label: '未整改', badge: 'true', badgeColor: 'bg-rose-500' },
          { value: '整改中', label: '整改中', badge: 'true', badgeColor: 'bg-amber-500' },
          { value: '已完成', label: '已完成', badge: 'true', badgeColor: 'bg-emerald-500' },
          { value: '免于整改', label: '免于整改', badge: 'true', badgeColor: 'bg-slate-400' },
        ]"
        placeholder="整改状态: 全部"
        customClass="w-[160px] shrink-0"
        @change="handleSearch"
      />

      <!-- 展开时展示的高级扩展搜索项：直接置于同一 flex 区域内，自适应自然排列换行，无中部分割线 -->
      <template v-if="isExpanded">
        <!-- 1.6 排查状态 (固定宽度 160px) -->
        <CustomSelect
          v-model="localParams.checkStatus"
          :options="[
            { value: '', label: '排查状态: 全部' },
            { value: '待排查', label: '待排查', badge: 'true', badgeColor: 'bg-amber-500' },
            { value: '排查中', label: '排查中', badge: 'true', badgeColor: 'bg-blue-500' },
            { value: '省级待审核', label: '省级待审核', badge: 'true', badgeColor: 'bg-purple-500' },
            { value: '已归档', label: '已归档', badge: 'true', badgeColor: 'bg-emerald-500' },
          ]"
          placeholder="排查状态: 全部"
          customClass="w-[160px] shrink-0"
          @change="handleSearch"
        />

        <!-- 1.7 是否超时 (固定宽度 160px) -->
        <CustomSelect
          v-model="localParams.isOverdue"
          :options="[
            { value: '', label: '时限状态: 全部' },
            { value: '是', label: '已超期', badge: 'true', badgeColor: 'bg-rose-500' },
            { value: '临期', label: '临期预警', badge: 'true', badgeColor: 'bg-amber-500' },
            { value: '否', label: '时限正常', badge: 'true', badgeColor: 'bg-emerald-500' },
          ]"
          placeholder="时限状态: 全部"
          customClass="w-[160px] shrink-0"
          @change="handleSearch"
        />

        <!-- 1.8 问题处置单位 (固定宽度 190px) -->
        <div class="relative w-[190px] shrink-0">
          <input
            v-model="localParams.handleUnit"
            type="text"
            placeholder="请输入问题处置单位"
            class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
            @keydown.enter="handleSearch"
          />
          <button
            v-if="localParams.handleUnit"
            type="button"
            @click="clearField('handleUnit')"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
            title="清空"
          >
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 1.9 问题批次年份 (固定宽度 160px) -->
        <CustomSelect
          v-model="localParams.batchYear"
          :options="[
            { value: '', label: '问题批次年份: 全部' },
            { value: '2026', label: '2026年' },
            { value: '2025', label: '2025年' },
            { value: '2024', label: '2024年' },
            { value: '2023', label: '2023年' },
          ]"
          placeholder="问题批次年份: 全部"
          customClass="w-[160px] shrink-0"
          @change="handleSearch"
        />
      </template>
    </div>

    <!-- 2. 底部操作按钮行 (严格与计量设施管理保持一致) -->
    <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
      <!-- Left: 按钮集合 -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- 1. 查询 (亮纯蓝) -->
        <button
          type="button"
          @click="handleSearch"
          class="px-4 py-1.5 rounded bg-[#1677ff] hover:bg-blue-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>查询</span>
        </button>

        <!-- 2. 重置 (微淡蓝背景 + 蓝字) -->
        <button
          type="button"
          @click="handleReset"
          class="px-3.5 py-1.5 rounded bg-[#f0f5fe] text-[#1677ff] border border-[#d2e2fa] hover:bg-blue-100/50 font-medium flex items-center gap-1.5 transition cursor-pointer"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
          </svg>
          <span>重置</span>
        </button>

        <!-- 3. 导出问题台账 (翠绿) -->
        <button
          type="button"
          @click="handleExport"
          class="px-3.5 py-1.5 rounded bg-[#00a854] hover:bg-emerald-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>导出问题台账</span>
        </button>

        <!-- 4. 包含下级区域 Switch -->
        <div class="flex items-center gap-2 ml-1 text-gray-700 cursor-pointer select-none" @click="includeChildren = !includeChildren">
          <span>包含下级区域</span>
          <div
            :class="[
              'w-8 h-4 rounded-full transition-colors relative flex items-center px-0.5',
              includeChildren ? 'bg-[#1677ff]' : 'bg-gray-300'
            ]"
          >
            <div
              :class="[
                'w-3 h-3 rounded-full bg-white transition-transform',
                includeChildren ? 'translate-x-4' : 'translate-x-0'
              ]"
            ></div>
          </div>
          <span class="text-gray-500 text-[11px]">{{ includeChildren ? '已开启' : '已关闭' }}</span>
        </div>

        <!-- 5. 筛选条件数量状态 -->
        <span v-if="activeFilterCount > 0" class="text-[#1677ff] font-medium bg-[#eef4fe] px-2 py-0.5 rounded text-[11px] ml-1">
          已生效 {{ activeFilterCount }} 项筛选
        </span>
      </div>

      <!-- Right: 展开高级筛选 -->
      <div>
        <button
          type="button"
          @click="isExpanded = !isExpanded"
          class="text-[#1677ff] hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer text-xs"
        >
          <span>{{ isExpanded ? '收起高级筛选' : '展开高级筛选' }}</span>
          <svg
            :class="['w-3.5 h-3.5 transition-transform duration-200', isExpanded ? 'rotate-180' : '']"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CustomSelect from './CustomSelect.vue';

export interface ViolationFilterState {
  waterOwner: string;
  permitNumber: string;
  isConfirmedProblem: string;
  rectificationStatus: string;
  checkStatus: string;
  isOverdue: string;
  queryModes: string[];
  batchYear?: string;
  handleUnit?: string;
  deadlineFilter?: string;
}

const emit = defineEmits<{
  (e: 'search', params: ViolationFilterState): void;
  (e: 'reset'): void;
  (e: 'export'): void;
}>();

// 默认收起状态，只展示第一行
const isExpanded = ref(false);
const includeChildren = ref(true);

const handleExport = () => {
  emit('export');
};

// 各级发证选项
const individualLevels = ['流域', '省级', '市级', '县级'];

const localParams = ref<ViolationFilterState>({
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

// 计算是否勾选了“所有发证”
const isAllQueryModesChecked = computed(() => {
  return individualLevels.every((lvl) => localParams.value.queryModes.includes(lvl));
});

// 点击“所有发证”复选框
const toggleAllQueryModes = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    localParams.value.queryModes = ['所有发证', ...individualLevels];
  } else {
    localParams.value.queryModes = [];
  }
  handleSearch();
};

// 点击单个发证层级复选框
const handleSingleQueryModeChange = () => {
  const hasAll = individualLevels.every((lvl) => localParams.value.queryModes.includes(lvl));
  if (hasAll) {
    if (!localParams.value.queryModes.includes('所有发证')) {
      localParams.value.queryModes.push('所有发证');
    }
  } else {
    const idx = localParams.value.queryModes.indexOf('所有发证');
    if (idx >= 0) {
      localParams.value.queryModes.splice(idx, 1);
    }
  }
  handleSearch();
};

// 计算已激活过滤项数量
const activeFilterCount = computed(() => {
  let count = 0;
  if (localParams.value.waterOwner.trim()) count++;
  if (localParams.value.permitNumber.trim()) count++;
  if (localParams.value.isConfirmedProblem) count++;
  if (localParams.value.rectificationStatus) count++;
  if (localParams.value.checkStatus) count++;
  if (localParams.value.isOverdue) count++;
  if (localParams.value.handleUnit?.trim()) count++;
  if (localParams.value.batchYear) count++;
  if (!isAllQueryModesChecked.value && localParams.value.queryModes.length > 0) count++;
  return count;
});

const clearField = (field: keyof ViolationFilterState) => {
  if (field === 'queryModes') {
    localParams.value.queryModes = ['所有发证', ...individualLevels];
  } else {
    localParams.value[field] = '';
  }
  handleSearch();
};

const handleSearch = () => {
  emit('search', { ...localParams.value });
};

const handleReset = () => {
  localParams.value = {
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
  emit('reset');
};
</script>
