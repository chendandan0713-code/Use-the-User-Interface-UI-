<template>
  <div
    ref="containerRef"
    :class="['relative select-none text-xs inline-block text-left', customClass || 'w-full']"
  >
    <!-- Trigger Input Box -->
    <div
      tabindex="0"
      @click="toggleDropdown"
      @keydown.down.prevent="openAndFocusNext"
      @keydown.up.prevent="openAndFocusPrev"
      @keydown.esc="closeDropdown"
      :class="[
        'w-full flex items-center justify-between transition-all duration-150 rounded cursor-pointer border',
        size === 'small' ? 'px-2.5 py-1.5 h-[30px]' : 'px-3 py-2 h-[34px]',
        isOpen
          ? 'bg-white border-[#1677ff] ring-2 ring-[#1677ff]/15 shadow-2xs'
          : 'bg-[#f8fafc] border-[#b8cde6] hover:border-[#1677ff] hover:bg-white',
        disabled ? 'opacity-50 cursor-not-allowed bg-slate-100 border-slate-200' : ''
      ]"
    >
      <!-- Selected value / Placeholder -->
      <div class="truncate flex items-center gap-1.5 flex-1 min-w-0 pr-1">
        <span v-if="prefix" class="text-slate-400 shrink-0 text-[11px] font-normal">
          {{ prefix }}
        </span>
        
        <template v-if="selectedOption && selectedOption.value !== ''">
          <span 
            v-if="selectedOption.badge" 
            :class="['w-1.5 h-1.5 rounded-full shrink-0', selectedOption.badgeColor || 'bg-blue-500']"
          ></span>
          <span class="text-gray-800 font-medium truncate">
            {{ selectedOption.label }}
          </span>
        </template>
        
        <span v-else class="text-gray-400 font-normal truncate">
          {{ placeholder || '请选择' }}
        </span>
      </div>

      <!-- Action icons (Clear + Chevron) -->
      <div class="flex items-center gap-1 shrink-0 ml-1">
        <!-- Clear Icon button -->
        <button
          v-if="clearable && modelValue !== '' && modelValue !== null && modelValue !== undefined && !disabled"
          type="button"
          @click.stop="handleClear"
          class="p-0.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200/60 transition cursor-pointer"
          title="清空"
        >
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Animated Down Chevron -->
        <svg
          :class="[
            'w-3.5 h-3.5 transition-transform duration-200',
            isOpen ? 'rotate-180 text-[#1677ff]' : 'text-gray-400'
          ]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <!-- Dropdown Floating Menu -->
    <transition
      enter-active-class="transition ease-out duration-150 transform"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100 transform"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :class="[
          'absolute left-0 z-[120] w-full min-w-[140px] bg-white rounded-lg border border-slate-200/90 shadow-lg py-1 max-h-60 overflow-y-auto custom-scrollbar',
          openUpward ? 'bottom-[calc(100%+4px)] shadow-[-2px_-4px_12px_rgba(0,0,0,0.08)]' : 'top-[calc(100%+4px)]'
        ]"
        :style="{ minWidth: dropdownMinWidth || '100%' }"
      >
        <!-- Optional Quick Search Filter if options > 8 -->
        <div v-if="searchable || normalizedOptions.length > 8" class="p-1.5 border-b border-slate-100">
          <div class="relative">
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="快速搜索..."
              class="w-full pl-7 pr-2 py-1 text-xs rounded border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1677ff] transition text-slate-700"
              @click.stop
            />
            <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <!-- Options List -->
        <div v-if="filteredOptions.length > 0" class="py-0.5">
          <div
            v-for="(opt, idx) in filteredOptions"
            :key="String(opt.value) + idx"
            @click.stop="handleSelect(opt)"
            :class="[
              'px-3 py-2 text-xs flex items-center justify-between cursor-pointer transition-colors duration-100',
              modelValue === opt.value
                ? 'bg-[#e6f4ff] text-[#1677ff] font-medium'
                : 'text-slate-700 hover:bg-[#f0f7ff] hover:text-[#1677ff]'
            ]"
          >
            <div class="flex items-center gap-2 min-w-0 flex-1 mr-2">
              <span 
                v-if="opt.badge" 
                :class="['w-2 h-2 rounded-full shrink-0', opt.badgeColor || 'bg-blue-500']"
              ></span>
              <span class="truncate">{{ opt.label }}</span>
            </div>

            <!-- Checkmark for selected item -->
            <svg
              v-if="modelValue === opt.value"
              class="w-3.5 h-3.5 text-[#1677ff] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        <!-- Empty result -->
        <div v-else class="px-3 py-4 text-center text-slate-400 text-xs">
          无匹配选项
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

export interface SelectOption {
  value: string | number;
  label: string;
  badge?: string;
  badgeColor?: string;
  description?: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null | undefined;
    options: (SelectOption | string | number)[];
    placeholder?: string;
    clearable?: boolean;
    size?: 'small' | 'medium';
    disabled?: boolean;
    customClass?: string;
    prefix?: string;
    searchable?: boolean;
    dropdownMinWidth?: string;
  }>(),
  {
    modelValue: '',
    placeholder: '请选择',
    clearable: true,
    size: 'small',
    disabled: false,
    customClass: '',
    prefix: '',
    searchable: false,
    dropdownMinWidth: '100%',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void;
  (e: 'change', val: string | number): void;
  (e: 'clear'): void;
}>();

const containerRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const openUpward = ref(false);
const searchKeyword = ref('');

// Normalize options to SelectOption format
const normalizedOptions = computed<SelectOption[]>(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return opt as SelectOption;
    }
    return {
      value: opt,
      label: String(opt),
    };
  });
});

// Currently selected option
const selectedOption = computed(() => {
  return normalizedOptions.value.find((opt) => opt.value === props.modelValue);
});

// Filtered options based on searchKeyword
const filteredOptions = computed(() => {
  if (!searchKeyword.value.trim()) {
    return normalizedOptions.value;
  }
  const kw = searchKeyword.value.toLowerCase().trim();
  return normalizedOptions.value.filter((opt) =>
    opt.label.toLowerCase().includes(kw)
  );
});

const toggleDropdown = () => {
  if (props.disabled) return;
  if (!isOpen.value && containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    openUpward.value = spaceBelow < 220 && rect.top > 200;
  }
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    searchKeyword.value = '';
  }
};

const closeDropdown = () => {
  isOpen.value = false;
  searchKeyword.value = '';
};

const handleSelect = (opt: SelectOption) => {
  emit('update:modelValue', opt.value);
  emit('change', opt.value);
  closeDropdown();
};

const handleClear = () => {
  emit('update:modelValue', '');
  emit('change', '');
  emit('clear');
};

const openAndFocusNext = () => {
  if (!isOpen.value) {
    isOpen.value = true;
  }
};

const openAndFocusPrev = () => {
  if (!isOpen.value) {
    isOpen.value = true;
  }
};

// Handle clicks outside
const handleClickOutside = (e: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
