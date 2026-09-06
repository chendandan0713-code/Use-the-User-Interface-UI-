<template>
  <div class="h-10 bg-white border-b border-gray-200 px-3.5 flex items-center justify-between text-xs text-gray-600 select-none shrink-0 shadow-2xs">
    <!-- Left: Hamburger toggle, Navigation arrows & Route Tabs -->
    <div class="flex items-center gap-3">
      <!-- Hamburger toggle button -->
      <button
        type="button"
        class="text-gray-500 hover:text-gray-800 transition cursor-pointer p-0.5 rounded hover:bg-gray-100"
        title="折叠/展开侧边栏"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <!-- History navigation arrows -->
      <div class="flex items-center gap-1 text-gray-400">
        <button
          type="button"
          class="hover:text-gray-700 transition cursor-pointer p-0.5 rounded hover:bg-gray-100"
          title="后退"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          type="button"
          class="hover:text-gray-700 transition cursor-pointer p-0.5 rounded hover:bg-gray-100"
          title="前进"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <!-- Route Tabs -->
      <div class="flex items-center gap-1.5 ml-1 overflow-x-auto no-scrollbar">
        <!-- 首页 tab -->
        <button
          type="button"
          @click="$emit('navigate', 'home')"
          :class="[
            'px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1.5',
            activeMenu === 'home'
              ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs font-semibold'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
          ]"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>首页</span>
        </button>

        <!-- 违规问题处理 tab -->
        <button
          type="button"
          @click="$emit('navigate', 'violation_handling')"
          :class="[
            'px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1.5',
            activeMenu === 'violation_handling'
              ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs font-semibold'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
          ]"
        >
          <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>违规问题处理</span>
        </button>

        <!-- 计划用水填报审批 tab -->
        <button
          type="button"
          @click="$emit('navigate', 'water_plan')"
          :class="[
            'px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1.5',
            activeMenu === 'water_plan'
              ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs font-semibold'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
          ]"
        >
          <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>计划用水填报审批</span>
        </button>

        <!-- 计量设施管理 tab -->
        <button
          type="button"
          @click="$emit('navigate', 'facility_management')"
          :class="[
            'px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1.5',
            activeMenu === 'facility_management'
              ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs font-semibold'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
          ]"
        >
          <!-- facility icon -->
          <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <span>计量设施管理</span>
        </button>

        <!-- 故障记录 tab -->
        <button
          type="button"
          @click="$emit('navigate', 'fault')"
          :class="[
            'px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1.5',
            activeMenu === 'fault'
              ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs font-semibold'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
          ]"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>故障记录</span>
        </button>
      </div>
    </div>

    <!-- Right: Switch to MES Platform Button -->
    <div class="flex items-center gap-2">
      <button
        type="button"
        @click="$emit('switch-mes')"
        class="px-3 py-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-md text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
      >
        <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        <span>切换生产工单系统 →</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  activeMenu: string;
}>();

defineEmits<{
  (e: 'navigate', menu: string): void;
  (e: 'switch-mes'): void;
  (e: 'refresh'): void;
}>();

const currentTabTitle = computed(() => {
  switch (props.activeMenu) {
    case 'water_plan':
      return '计划用水管理 - 填报审批';
    case 'fault':
      return '故障记录';
    case 'violation_handling':
      return '违规问题处理';
    case 'scenarios':
      return '综合应用场景';
    case 'system_loading':
      return '系统加载';
    default:
      return '计量设施管理';
  }
});
</script>
