<template>
  <div class="bg-[#f8fafc] p-2 rounded-xl border border-[#b8cde6] shrink-0">
    <div class="flex items-center flex-wrap gap-2 text-xs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        @click="selectTab(tab.key)"
        class="px-4 py-2 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 select-none"
        :class="[
          activeTab === tab.key
            ? 'bg-white text-[#1677ff] font-bold shadow-xs border border-[#b8cde6]'
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
        ]"
      >
        <span>{{ tab.label }}</span>
        <span
          v-if="tab.count !== undefined"
          class="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-normal"
          :class="activeTab === tab.key ? 'bg-blue-50 text-[#1677ff]' : 'bg-gray-200/60 text-gray-500'"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TabItem {
  key: string;
  label: string;
  count?: number;
}

defineProps<{
  activeTab: string;
  tabs: TabItem[];
}>();

const emit = defineEmits<{
  (e: 'update:activeTab', tabKey: string): void;
}>();

const selectTab = (key: string) => {
  emit('update:activeTab', key);
};
</script>
