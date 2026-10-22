<template>
  <header class="h-12 bg-[#2563EB] text-white flex items-center justify-between px-4 z-30 shrink-0 select-none shadow-xs">
    <!-- Left: Logo & Title & Version & Home icon -->
    <div class="flex items-center gap-2.5">
      <!-- Water droplet hex icon -->
      <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
        <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" opacity="0.9" />
          <path d="M12 6.5l3.2 3.2a4.5 4.5 0 1 1-6.4 0z" fill="#ffffff" opacity="0.95" />
        </svg>
      </div>

      <!-- Title -->
      <div class="flex items-center gap-2">
        <span class="font-bold text-base tracking-wide text-white leading-tight">
          西宁市取用水管理平台
        </span>
        <span class="text-[10px] font-semibold text-white/90 border border-white/50 px-1.5 py-0.5 rounded bg-white/10 tracking-wider">
          V2.6 PRO
        </span>
      </div>

      <!-- Home Icon Button -->
      <button
        type="button"
        @click="$emit('switch-platform', 'water')"
        class="w-7 h-7 rounded-md bg-white/15 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer transition ml-1"
        title="平台首页"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </button>
    </div>

    <!-- Center: Platform Segmented Tabs -->
    <div class="flex items-center bg-blue-900/40 rounded-lg p-0.5 border border-white/10">
      <button
        type="button"
        @click="currentSegment = 'client'"
        :class="[
          'px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer',
          currentSegment === 'client'
            ? 'bg-white text-blue-700 font-semibold shadow-xs'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        ]"
      >
        取水客户端
      </button>
      <button
        type="button"
        @click="currentSegment = 'admin'"
        :class="[
          'px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer',
          currentSegment === 'admin'
            ? 'bg-white text-blue-700 shadow-xs'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        ]"
      >
        管理端
      </button>

      <!-- 综合大屏快速入口 -->
      <button
        type="button"
        @click="$emit('navigate', 'scenarios')"
        class="ml-2 px-2.5 py-1 text-xs font-semibold rounded-md bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 text-white border border-cyan-400/50 transition cursor-pointer flex items-center gap-1.5 shadow-xs"
        title="进入西宁市综合应用场景大屏"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse"></span>
        <span>综合场景大屏</span>
      </button>
    </div>

    <!-- Right: Search & Notifications & User Profile -->
    <div class="flex items-center gap-3">
      <!-- Search Input -->
      <div class="relative flex items-center">
        <svg class="w-3.5 h-3.5 text-white/60 absolute left-3 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="菜单搜索 (快捷键 Ctrl+K)..."
          class="w-52 sm:w-64 pl-8 pr-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white placeholder-white/60 text-xs focus:outline-none focus:bg-white/25 focus:border-white/40 transition"
        />
      </div>

      <!-- Notification Badge -->
      <button
        type="button"
        @click="$emit('open-notifications')"
        class="relative p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
        title="系统通知"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <span class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
          3
        </span>
      </button>

      <!-- User Info with TDesign Dropdown -->
      <t-dropdown :options="userOptions" @click="handleUserAction">
        <div class="flex items-center gap-1.5 text-white cursor-pointer hover:opacity-90 pl-1">
          <div class="w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-xs text-white shadow-xs">
            管
          </div>
          <span class="text-xs font-medium">管理员(88018)</span>
          <svg class="w-3.5 h-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </t-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

defineProps<{
  activePlatform: 'water' | 'mes';
}>();

defineEmits<{
  (e: 'switch-platform', platform: 'water' | 'mes'): void;
  (e: 'navigate', menu: string): void;
  (e: 'open-notifications'): void;
}>();

const currentSegment = ref<'client' | 'admin'>('admin');
const searchQuery = ref('');

const userOptions = [
  { content: '个人中心', value: 'profile' },
  { content: '系统偏好设置', value: 'settings' },
  { content: '切换角色权限 (水政/工段)', value: 'switch_role' },
  { content: '退出登录', value: 'logout', divider: true },
];

const handleUserAction = (data: any) => {
  if (data.value === 'profile') {
    MessagePlugin.info('当前登录账号：系统超级管理员（工号: 88018）');
  } else if (data.value === 'settings') {
    MessagePlugin.info('系统基础设置：当前版本 V2.6 PRO');
  } else if (data.value === 'switch_role') {
    MessagePlugin.success('已切换为超级管理审计员权限');
  } else if (data.value === 'logout') {
    MessagePlugin.warning('演示模式无需退出，可自由体验全功能');
  }
};
</script>
