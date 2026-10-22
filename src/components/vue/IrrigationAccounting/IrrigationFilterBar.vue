<template>
  <div class="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs shrink-0 flex flex-col gap-2.5">
    <!-- Filter inputs grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 text-xs">
      <!-- 1. 核算年份 -->
      <div class="flex items-center gap-1.5">
        <label class="text-slate-500 shrink-0 w-14 text-right">核算年份:</label>
        <select
          v-model="filters.year"
          class="flex-1 bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 focus:bg-white focus:outline-none focus:border-blue-500 transition"
        >
          <option value="">全部年份</option>
          <option value="2026">2026 年</option>
          <option value="2025">2025 年</option>
          <option value="2024">2024 年</option>
        </select>
      </div>

      <!-- 2. 核算月份 (支持按月核算填报) -->
      <div class="flex items-center gap-1.5">
        <label class="text-slate-500 shrink-0 w-14 text-right">核算月份:</label>
        <select
          v-model="filters.month"
          class="flex-1 bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 focus:bg-white focus:outline-none focus:border-blue-500 transition"
        >
          <option value="">全部月份</option>
          <option value="3">03 月 (当前月)</option>
          <option value="2">02 月</option>
          <option value="1">01 月</option>
          <option value="4">04 月</option>
          <option value="5">05 月</option>
          <option value="6">06 月</option>
          <option value="7">07 月</option>
          <option value="8">08 月</option>
          <option value="9">09 月</option>
          <option value="10">10 月</option>
          <option value="11">11 月</option>
          <option value="12">12 月</option>
        </select>
      </div>

      <!-- 3. 所属区县 -->
      <div class="flex items-center gap-1.5">
        <label class="text-slate-500 shrink-0 w-14 text-right">所属区县:</label>
        <select
          v-model="filters.district"
          class="flex-1 bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 focus:bg-white focus:outline-none focus:border-blue-500 transition"
        >
          <option value="">全部区县</option>
          <option value="湟中区">湟中区</option>
          <option value="湟源县">湟源县</option>
          <option value="大通县">大通县</option>
          <option value="城北区">城北区</option>
          <option value="城东区">城东区</option>
          <option value="城中区">城中区</option>
          <option value="城西区">城西区</option>
        </select>
      </div>

      <!-- 4. 审核流转状态 -->
      <div class="flex items-center gap-1.5">
        <label class="text-slate-500 shrink-0 w-14 text-right">流转状态:</label>
        <select
          v-model="filters.status"
          class="flex-1 bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 focus:bg-white focus:outline-none focus:border-blue-500 transition"
        >
          <option value="">全部状态</option>
          <option value="draft">草稿</option>
          <option value="pending_city">待市级审核</option>
          <option value="pending_province">待省级审核</option>
          <option value="approved">审核通过 / 已入库</option>
          <option value="rejected">已驳回 (待县级修改)</option>
        </select>
      </div>

      <!-- 5. 水源类型 -->
      <div class="flex items-center gap-1.5">
        <label class="text-slate-500 shrink-0 w-14 text-right">水源类型:</label>
        <select
          v-model="filters.waterSourceType"
          class="flex-1 bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 focus:bg-white focus:outline-none focus:border-blue-500 transition"
        >
          <option value="">全部水源</option>
          <option value="地表水">地表水</option>
          <option value="地下水">地下水</option>
          <option value="混合水源">混合水源</option>
        </select>
      </div>

      <!-- 6. 证照与灌区关键字 -->
      <div class="flex items-center gap-1.5">
        <label class="text-slate-500 shrink-0 w-14 text-right">证照检索:</label>
        <input
          v-model="filters.keyword"
          type="text"
          placeholder="许可证号/灌区名称/权人"
          @keyup.enter="$emit('search')"
          class="flex-1 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition"
        />
      </div>
    </div>

    <!-- Actions toolbar row -->
    <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
      <!-- Left: Search & Reset buttons -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="$emit('search')"
          class="px-3 py-1.5 rounded-md bg-[#2563EB] hover:bg-blue-700 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>查询检索</span>
        </button>

        <button
          type="button"
          @click="$emit('reset')"
          class="px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
            <path d="M21 3v5h-5"></path>
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            <path d="M3 21v-5h5"></path>
          </svg>
          <span>重置条件</span>
        </button>

        <!-- Current Filter indicator chips -->
        <span v-if="hasActiveFilters" class="text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
          <span>已应用筛选条件</span>
        </span>
      </div>

      <!-- Right: Functional Operation Buttons -->
      <div class="flex items-center gap-2">
        <!-- 导出核算台账 -->
        <button
          type="button"
          @click="$emit('export')"
          class="px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          title="导出小型灌区月度农业用水核算台账 Excel"
        >
          <svg class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>导出核算台账</span>
        </button>

        <!-- 县级：新增月度核算填报 -->
        <button
          type="button"
          @click="$emit('add-report')"
          class="px-3.5 py-1.5 rounded-md bg-[#1677ff] hover:bg-blue-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          title="以取水许可证维度，录入灌区当月农业用水核算数据"
        >
          <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span class="font-bold">月度核算填报</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IrrigationFilterParams } from '../../../types';

const props = defineProps<{
  filters: IrrigationFilterParams;
}>();

defineEmits<{
  (e: 'search'): void;
  (e: 'reset'): void;
  (e: 'export'): void;
  (e: 'add-report'): void;
}>();

const hasActiveFilters = computed(() => {
  return !!(
    props.filters.year ||
    props.filters.month ||
    props.filters.district ||
    props.filters.keyword ||
    props.filters.status ||
    props.filters.waterSourceType
  );
});
</script>
