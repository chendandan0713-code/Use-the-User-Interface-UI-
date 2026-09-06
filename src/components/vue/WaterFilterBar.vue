<template>
  <div class="bg-white rounded-lg p-3 border border-[#b4c7e0] shadow-2xs text-xs select-none space-y-3">
    <!-- Top Filter Inputs Container (严格参考截图排布，清透边框与灰白底色) -->
    <div class="flex flex-wrap items-center gap-2.5">
      <!-- 1. 查询方式 Radio: 按发证机关 / 按取水地址 -->
      <div class="flex items-center gap-3 px-2 py-1 bg-[#f8fafc] rounded border border-[#b8cde6] text-gray-700 shrink-0">
        <span class="text-gray-500">查询方式:</span>
        <label class="inline-flex items-center gap-1 cursor-pointer hover:text-gray-900">
          <input
            type="radio"
            name="queryMode"
            value="authority"
            v-model="queryMode"
            class="accent-[#1677ff] cursor-pointer"
          />
          <span>按发证机关</span>
        </label>
        <label class="inline-flex items-center gap-1.5 cursor-pointer text-[#1677ff] font-medium">
          <input
            type="radio"
            name="queryMode"
            value="address"
            v-model="queryMode"
            class="accent-[#1677ff] cursor-pointer"
          />
          <span>按取水地址</span>
        </label>
      </div>

      <!-- 2. 请输入计量设施(器具)编号 -->
      <div class="relative w-[190px] shrink-0">
        <input
          v-model="filterParams.facilityCode"
          type="text"
          placeholder="请输入计量设施(器具)编号"
          class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
          @keydown.enter="$emit('search')"
        />
        <button
          v-if="filterParams.facilityCode"
          type="button"
          @click="clearField('facilityCode')"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          title="清空"
        >
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 3. 请输入计量设施名称 -->
      <div class="relative w-[190px] shrink-0">
        <input
          v-model="filterParams.facilityName"
          type="text"
          placeholder="请输入计量设施名称"
          class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
          @keydown.enter="$emit('search')"
        />
        <button
          v-if="filterParams.facilityName"
          type="button"
          @click="clearField('facilityName')"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          title="清空"
        >
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 4. 请输入取水权人名称 -->
      <div class="relative w-[190px] shrink-0">
        <input
          v-model="filterParams.waterOwner"
          type="text"
          placeholder="请输入取水权人名称"
          class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
          @keydown.enter="$emit('search')"
        />
        <button
          v-if="filterParams.waterOwner"
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

      <!-- 5. 请输入许可证编号 -->
      <div class="relative w-[190px] shrink-0">
        <input
          v-model="filterParams.permitNumber"
          type="text"
          placeholder="请输入许可证编号"
          class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
          @keydown.enter="$emit('search')"
        />
        <button
          v-if="filterParams.permitNumber"
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

      <!-- 6. 使用状态: 请选择 -->
      <CustomSelect
        v-model="filterParams.status"
        :options="[
          { value: '', label: '全部使用状态' },
          { value: '正常', label: '正常运行', badge: 'true', badgeColor: 'bg-emerald-500' },
          { value: '故障', label: '故障报修', badge: 'true', badgeColor: 'bg-amber-500' },
          { value: '停用', label: '停用锁定', badge: 'true', badgeColor: 'bg-rose-500' },
        ]"
        placeholder="使用状态: 请选择"
        customClass="w-[180px] shrink-0"
        @change="$emit('search')"
      />

      <!-- 高级展开筛选字段 -->
      <template v-if="isExpanded">
        <!-- 7. 行政区划 -->
        <CustomSelect
          v-model="filterParams.selectedDistrict"
          :options="['城东区', '城中区', '城西区', '城北区', '湟中区', '大通县', '湟源县']"
          placeholder="请选择行政区划"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />

        <!-- 8. 计量器具类型 -->
        <CustomSelect
          v-model="filterParams.meteringMethod"
          :options="['电磁水表', '超声波水表', '机械水表', '多普勒流速仪', '超声波明渠流量计']"
          placeholder="计量设施类型: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />

        <!-- 9. 水源类型 -->
        <CustomSelect
          v-model="filterParams.waterSourceType"
          :options="['地表水', '地下水', '泉水', '自备井', '水库水']"
          placeholder="水源类型: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />
      </template>
    </div>

    <!-- Bottom Action Row (严格参考截图按钮样式与排列次序) -->
    <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
      <!-- Left: 按钮集合 -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- 1. 查询 (亮纯蓝) -->
        <button
          type="button"
          @click="$emit('search')"
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
          @click="$emit('reset')"
          class="px-3.5 py-1.5 rounded bg-[#f0f5fe] text-[#1677ff] border border-[#d2e2fa] hover:bg-blue-100/50 font-medium flex items-center gap-1.5 transition cursor-pointer"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
          </svg>
          <span>重置</span>
        </button>

        <!-- 3. + 新增计量设施 (统一为与查询一致的高饱和亮蓝 #1677ff) -->
        <button
          type="button"
          @click="$emit('add-facility')"
          class="px-3.5 py-1.5 rounded bg-[#1677ff] hover:bg-blue-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>新增计量设施</span>
        </button>

        <!-- 4. 导出 (翠绿) -->
        <button
          type="button"
          @click="$emit('export-data')"
          class="px-3.5 py-1.5 rounded bg-[#00a854] hover:bg-emerald-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>导出</span>
        </button>

        <!-- 5. 自定义列 (白底灰边) -->
        <t-popup trigger="click" placement="bottom-start">
          <button
            type="button"
            class="px-3 py-1.5 rounded border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium flex items-center gap-1.5 transition cursor-pointer bg-white"
          >
            <svg class="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            <span>自定义列</span>
          </button>
          <template #content>
            <div class="p-3 w-48 space-y-2 text-xs bg-white rounded-lg shadow-xl border border-gray-200">
              <div class="font-bold text-gray-800 pb-1.5 border-b border-gray-100 flex items-center justify-between">
                <span>显示列配置</span>
                <span class="text-[10px] text-gray-400 font-normal">勾选显示</span>
              </div>
              <label class="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                <input type="checkbox" v-model="visibleCols.facilityName" class="rounded text-blue-600" />
                <span>设施名称</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                <input type="checkbox" v-model="visibleCols.facilityCode" class="rounded text-blue-600" />
                <span>计量设施(器具)编号</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                <input type="checkbox" v-model="visibleCols.status" class="rounded text-blue-600" />
                <span>使用状态</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                <input type="checkbox" v-model="visibleCols.meteringMethod" class="rounded text-blue-600" />
                <span>计量设施类型</span>
              </label>
            </div>
          </template>
        </t-popup>

        <!-- 6. 包含下级区域 (带蓝色滑动 Switch) -->
        <div class="flex items-center gap-2 ml-1 text-gray-700 cursor-pointer select-none" @click="filterParams.includeChildren = !filterParams.includeChildren">
          <span>包含下级区域</span>
          <div
            :class="[
              'w-8 h-4 rounded-full transition-colors relative flex items-center px-0.5',
              filterParams.includeChildren ? 'bg-[#1677ff]' : 'bg-gray-300'
            ]"
          >
            <div
              :class="[
                'w-3 h-3 rounded-full bg-white transition-transform',
                filterParams.includeChildren ? 'translate-x-4' : 'translate-x-0'
              ]"
            ></div>
          </div>
          <span class="text-gray-500 text-[11px]">{{ filterParams.includeChildren ? '已开启' : '已关闭' }}</span>
        </div>
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
import { ref } from 'vue';
import type { WaterFilterParams } from '../../types';
import CustomSelect from './CustomSelect.vue';

const props = defineProps<{
  filterParams: WaterFilterParams;
  selectedCount?: number;
  visibleCols: {
    waterOwner: boolean;
    facilityName: boolean;
    facilityCode: boolean;
    district: boolean;
    meteringMethod: boolean;
    status: boolean;
    reading: boolean;
    time: boolean;
  };
}>();

const emit = defineEmits<{
  (e: 'search'): void;
  (e: 'reset'): void;
  (e: 'add-facility'): void;
  (e: 'export-data'): void;
  (e: 'batch-delete'): void;
  (e: 'refresh'): void;
}>();

const queryMode = ref('address');
const isExpanded = ref(false);

const clearField = (field: keyof WaterFilterParams) => {
  // @ts-ignore
  props.filterParams[field] = '';
  emit('search');
};
</script>

<style scoped>
select {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  background-color: #f8fafc !important;
  border: 1px solid #dce6f5 !important;
  outline: none !important;
  box-shadow: none !important;
  color: #334155;
}
select:hover {
  border-color: #bcd5f5 !important;
  background-color: #ffffff !important;
}
select:focus {
  border-color: #1677ff !important;
  background-color: #ffffff !important;
  box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.15) !important;
}
select option {
  background-color: #ffffff;
  color: #1e293b;
  padding: 6px 10px;
}
</style>
