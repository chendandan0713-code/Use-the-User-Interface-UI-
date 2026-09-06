<template>
  <div class="w-56 bg-white rounded-lg border border-[#b4c7e0] shadow-2xs h-full flex flex-col shrink-0 select-none overflow-hidden">
    <!-- 1. 统一顶部标题栏 -->
    <div class="px-3.5 py-2.5 border-b border-[#b8cde6] flex items-center justify-between shrink-0">
      <div class="flex items-center gap-2">
        <!-- Blue map pin icon -->
        <svg class="w-4 h-4 text-[#1677ff] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
        </svg>
        <span class="text-xs font-bold text-gray-800 tracking-wide">行政区划</span>
      </div>
      <button
        type="button"
        @click="selectDistrict('全部')"
        class="text-[11px] text-[#1677ff] hover:text-blue-700 cursor-pointer font-medium hover:underline"
        title="重置为全省"
      >
        全部
      </button>
    </div>

    <!-- 2. 统一搜索过滤框 -->
    <div class="p-2.5 pb-1.5 shrink-0">
      <div class="relative flex items-center">
        <svg class="w-3.5 h-3.5 text-gray-400 absolute left-2.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          v-model="searchKey"
          type="text"
          placeholder="搜索区县名称..."
          class="w-full pl-8 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
        />
        <button
          v-if="searchKey"
          type="button"
          @click="searchKey = ''"
          class="absolute right-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          title="清空搜索"
        >
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- 3. 树形层级结构列表 -->
    <div class="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-0.5 text-xs">
      <!-- 根节点：青海省 (默认展开，展示全域) -->
      <div>
        <div
          @click="toggleProvince"
          :class="[
            'flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition',
            selectedDistrict === '全部' || selectedDistrict === '青海省'
              ? 'bg-[#eef4fe] text-[#1677ff] font-semibold'
              : 'text-gray-700 hover:bg-[#f5f8fd]'
          ]"
        >
          <div class="flex items-center gap-1.5 truncate">
            <!-- 折叠小三角 -->
            <svg
              class="w-3.5 h-3.5 text-gray-400 transition-transform shrink-0"
              :class="isProvinceExpanded ? 'rotate-90 text-[#1677ff]' : ''"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="6 4 18 12 6 20 6 4"></polygon>
            </svg>
            <!-- Blue Folder icon -->
            <svg class="w-4 h-4 text-[#1677ff] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
            </svg>
            <span class="truncate">青海省全域</span>
          </div>
          <span class="text-[11px] px-1.5 py-0.5 rounded bg-[#f0f2f5] text-gray-500 font-mono">
            {{ totalCount }}
          </span>
        </div>

        <!-- 8个市州列表 (当省展开时展示) -->
        <div v-show="isProvinceExpanded" class="pl-2 space-y-0.5 mt-0.5">
          <div
            v-for="city in filteredCityList"
            :key="city.name"
            class="space-y-0.5"
          >
            <!-- 市州节点 (西宁市、海东市、海北州、黄南州、海南州、果洛州、玉树州、海西州) -->
            <div
              @click="toggleCity(city)"
              :class="[
                'flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition group',
                selectedDistrict === city.name
                  ? 'bg-[#eef4fe] text-[#1677ff] font-semibold'
                  : 'text-gray-700 hover:bg-[#f5f8fd]'
              ]"
            >
              <div class="flex items-center gap-1.5 truncate">
                <!-- 折叠小三角 -->
                <svg
                  class="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-transform shrink-0"
                  :class="city.expanded ? 'rotate-90 text-[#1677ff]' : ''"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="6 4 18 12 6 20 6 4"></polygon>
                </svg>
                <span class="truncate">{{ city.name }}</span>
              </div>
              <span
                class="text-[10px] px-1.5 py-0.5 rounded bg-[#f0f2f5] text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 font-mono transition"
              >
                {{ city.count }}
              </span>
            </div>

            <!-- 市州下属各区县列表 -->
            <div
              v-if="city.expanded && city.counties && city.counties.length > 0"
              class="pl-4 space-y-0.5"
            >
              <div
                v-for="county in city.counties"
                :key="county.name"
                @click.stop="selectCounty(county.name, city.name)"
                :class="[
                  'flex items-center justify-between px-2 py-1 rounded cursor-pointer transition text-xs',
                  selectedDistrict === county.name
                    ? 'bg-[#eef4fe] text-[#1677ff] font-semibold'
                    : 'text-gray-600 hover:bg-[#f5f8fd] hover:text-gray-900'
                ]"
              >
                <div class="flex items-center gap-1.5 truncate">
                  <!-- File/Dot icon -->
                  <svg class="w-3 h-3 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span class="truncate">{{ county.name }}</span>
                </div>
                <span class="text-[10px] px-1 py-0.2 rounded bg-[#f0f2f5] text-gray-400 font-mono">
                  {{ county.count }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface CountyItem {
  name: string;
  count: number;
}

interface CityItem {
  name: string;
  expanded: boolean;
  count: number;
  counties: CountyItem[];
}

const props = defineProps<{
  selectedDistrict: string;
}>();

const emit = defineEmits<{
  (e: 'select-district', district: string, city?: string): void;
}>();

const searchKey = ref('');
const isProvinceExpanded = ref(true);

// 统一的青海省 8 个市州及下属区县结构与数据统计
const cities = ref<CityItem[]>([
  {
    name: '西宁市',
    expanded: true, // 默认展开省会西宁市
    count: 210,
    counties: [
      { name: '城东区', count: 38 },
      { name: '城中区', count: 42 },
      { name: '城西区', count: 35 },
      { name: '城北区', count: 45 },
      { name: '湟中区', count: 28 },
      { name: '大通县', count: 14 },
      { name: '湟源县', count: 8 },
    ],
  },
  {
    name: '海东市',
    expanded: false,
    count: 46,
    counties: [
      { name: '平安区', count: 9 },
      { name: '乐都区', count: 11 },
      { name: '互助县', count: 10 },
      { name: '民和县', count: 7 },
      { name: '化隆县', count: 5 },
      { name: '循化县', count: 4 },
    ],
  },
  {
    name: '海北州',
    expanded: false,
    count: 18,
    counties: [
      { name: '门源县', count: 6 },
      { name: '祁连县', count: 5 },
      { name: '海晏县', count: 4 },
      { name: '刚察县', count: 3 },
    ],
  },
  {
    name: '黄南州',
    expanded: false,
    count: 24,
    counties: [
      { name: '同仁市', count: 9 },
      { name: '尖扎县', count: 7 },
      { name: '泽库县', count: 5 },
      { name: '河南县', count: 3 },
    ],
  },
  {
    name: '海南州',
    expanded: false,
    count: 22,
    counties: [
      { name: '共和县', count: 8 },
      { name: '贵德县', count: 6 },
      { name: '同德县', count: 4 },
      { name: '兴海县', count: 2 },
      { name: '贵南县', count: 2 },
    ],
  },
  {
    name: '果洛州',
    expanded: false,
    count: 12,
    counties: [
      { name: '玛沁县', count: 4 },
      { name: '班玛县', count: 2 },
      { name: '甘德县', count: 2 },
      { name: '达日县', count: 2 },
      { name: '久治县', count: 1 },
      { name: '玛多县', count: 1 },
    ],
  },
  {
    name: '玉树州',
    expanded: false,
    count: 14,
    counties: [
      { name: '玉树市', count: 5 },
      { name: '杂多县', count: 3 },
      { name: '称多县', count: 2 },
      { name: '治多县', count: 2 },
      { name: '囊谦县', count: 1 },
      { name: '曲麻莱县', count: 1 },
    ],
  },
  {
    name: '海西州',
    expanded: false,
    count: 28,
    counties: [
      { name: '德令哈市', count: 8 },
      { name: '格尔木市', count: 10 },
      { name: '都兰县', count: 4 },
      { name: '乌兰县', count: 3 },
      { name: '天峻县', count: 2 },
      { name: '茫崖市', count: 1 },
    ],
  },
]);

// 总数
const totalCount = computed(() => {
  return cities.value.reduce((sum, c) => sum + c.count, 0);
});

// 搜索过滤区县
const filteredCityList = computed(() => {
  if (!searchKey.value.trim()) return cities.value;
  const kw = searchKey.value.trim().toLowerCase();
  return cities.value
    .map((city) => {
      const matchCity = city.name.toLowerCase().includes(kw);
      const matchedCounties = city.counties.filter((c) =>
        c.name.toLowerCase().includes(kw)
      );
      if (matchCity || matchedCounties.length > 0) {
        return {
          ...city,
          expanded: true, // 搜索到内容时自动展开该市州
          counties: matchCity ? city.counties : matchedCounties,
        };
      }
      return null;
    })
    .filter(Boolean) as CityItem[];
});

const toggleProvince = () => {
  isProvinceExpanded.value = !isProvinceExpanded.value;
  emit('select-district', '青海省');
};

const toggleCity = (city: CityItem) => {
  city.expanded = !city.expanded;
  emit('select-district', city.name, city.name);
};

const selectCounty = (countyName: string, cityName: string) => {
  emit('select-district', countyName, cityName);
};

const selectDistrict = (district: string) => {
  emit('select-district', district);
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
}
</style>
