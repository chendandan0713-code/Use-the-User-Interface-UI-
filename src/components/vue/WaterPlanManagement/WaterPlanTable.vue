<template>
  <div class="bg-white rounded-lg border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col flex-1">
    <!-- Table Container -->
    <div class="overflow-x-auto overflow-y-auto flex-1 custom-scrollbar min-h-[380px]">
      <table class="w-full text-left text-xs border-collapse min-w-[1720px] select-none">
        <thead class="bg-[#f8fafc] text-slate-700 font-semibold border-b border-slate-200 sticky top-0 z-10">
          <tr class="divide-x divide-slate-200/80">
            <th class="w-10 px-3 py-2.5 text-center">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="toggleSelectAll"
                class="w-3.5 h-3.5 accent-[#1677ff] rounded cursor-pointer"
              />
            </th>
            <th class="w-16 px-2.5 py-2.5 text-center whitespace-nowrap">市(州)</th>
            <th class="w-18 px-2.5 py-2.5 text-center whitespace-nowrap">县(区)</th>
            <th class="min-w-[190px] px-3 py-2.5 whitespace-nowrap">用水单位名称</th>
            <th class="w-32 px-3 py-2.5 text-center whitespace-nowrap font-mono">统一社会信用代码</th>
            <th class="w-20 px-2.5 py-2.5 text-center whitespace-nowrap">行业类型</th>
            <th class="w-22 px-2 py-2.5 text-center whitespace-nowrap">是否公共管网取水</th>
            <th class="w-20 px-2 py-2.5 text-center whitespace-nowrap">自备水源取水</th>
            <th class="w-16 px-2 py-2.5 text-center whitespace-nowrap">是否规上</th>
            <th class="w-18 px-2 py-2.5 text-center whitespace-nowrap">重点类型</th>
            <th class="w-24 px-2.5 py-2.5 text-center whitespace-nowrap">直管类型</th>
            <th class="w-32 px-2.5 py-2.5 text-center whitespace-nowrap">取水类型</th>
            <th class="w-22 px-2.5 py-2.5 text-center whitespace-nowrap">事项类型</th>
            <th class="w-24 px-2.5 py-2.5 text-center whitespace-nowrap">状态</th>
            <th class="w-20 px-2.5 py-2.5 text-right whitespace-nowrap font-mono">许可水量</th>
            <th class="w-20 px-2.5 py-2.5 text-right whitespace-nowrap font-mono">计划水量</th>
            <th class="w-18 px-2.5 py-2.5 text-right whitespace-nowrap font-mono">地表水</th>
            <th class="w-18 px-2.5 py-2.5 text-right whitespace-nowrap font-mono">地下水</th>
            <th class="w-22 px-2.5 py-2.5 text-right whitespace-nowrap font-mono">非常规水总计</th>
            <th class="w-32 px-3 py-2.5 text-center whitespace-nowrap sticky right-0 bg-[#f8fafc] z-10 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.04)]">
              操作
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-700">
          <tr
            v-for="record in paginatedRecords"
            :key="record.id"
            :class="[
              'hover:bg-blue-50/40 transition-colors divide-x divide-slate-100',
              selectedIds.includes(record.id) ? 'bg-blue-50/60' : ''
            ]"
          >
            <!-- Checkbox -->
            <td class="px-3 py-2 text-center">
              <input
                type="checkbox"
                :checked="selectedIds.includes(record.id)"
                @change="toggleSelect(record.id)"
                class="w-3.5 h-3.5 accent-[#1677ff] rounded cursor-pointer"
              />
            </td>

            <!-- 市(州) -->
            <td class="px-2.5 py-2 text-center whitespace-nowrap text-slate-600">
              {{ record.city }}
            </td>

            <!-- 县(区) -->
            <td class="px-2.5 py-2 text-center whitespace-nowrap font-medium text-slate-800">
              {{ record.district }}
            </td>

            <!-- 用水单位名称 -->
            <td class="px-3 py-2 font-medium text-slate-800 truncate max-w-[220px]" :title="record.unitName">
              {{ record.unitName }}
            </td>

            <!-- 统一社会信用代码 -->
            <td class="px-3 py-2 text-center font-mono">
              <span
                @click="$emit('view-detail', record)"
                class="text-[#1677ff] hover:underline cursor-pointer font-medium tracking-tight"
                title="点击查看详细信息"
              >
                {{ record.creditCode }}
              </span>
            </td>

            <!-- 行业类型 -->
            <td class="px-2.5 py-2 text-center whitespace-nowrap text-slate-600">
              {{ record.industryType }}
            </td>

            <!-- 是否公共管网取水 -->
            <td class="px-2 py-2 text-center whitespace-nowrap">
              <span :class="record.isPublicPipeNetwork === '是' ? 'text-blue-600 font-semibold' : 'text-slate-500'">
                {{ record.isPublicPipeNetwork }}
              </span>
            </td>

            <!-- 自备水源取水 -->
            <td class="px-2 py-2 text-center whitespace-nowrap">
              <span :class="record.isSelfWaterSource === '是' ? 'text-emerald-600 font-semibold' : 'text-slate-500'">
                {{ record.isSelfWaterSource }}
              </span>
            </td>

            <!-- 是否规上 -->
            <td class="px-2 py-2 text-center whitespace-nowrap">
              <span :class="record.isAboveDesignatedSize === '是' ? 'text-amber-600 font-semibold' : 'text-slate-400'">
                {{ record.isAboveDesignatedSize }}
              </span>
            </td>

            <!-- 重点类型 -->
            <td class="px-2.5 py-2 text-center whitespace-nowrap">
              <span
                :class="[
                  'px-1.5 py-0.5 rounded text-[11px] font-medium border',
                  record.keyType === '重点'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                ]"
              >
                {{ record.keyType }}
              </span>
            </td>

            <!-- 直管类型 -->
            <td class="px-2.5 py-2 text-center whitespace-nowrap text-slate-600">
              {{ record.directManageType }}
            </td>

            <!-- 取水类型 -->
            <td class="px-2.5 py-2 text-center whitespace-nowrap text-slate-700 font-medium">
              {{ record.waterIntakeType }}
            </td>

            <!-- 事项类型 -->
            <td class="px-2.5 py-2 text-center whitespace-nowrap">
              <span
                :class="[
                  'px-1.5 py-0.5 rounded text-[11px] font-medium border',
                  record.itemType === '首次填报'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : record.itemType === '年计划调整'
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                ]"
              >
                {{ record.itemType }}
              </span>
            </td>

            <!-- 状态 -->
            <td class="px-2.5 py-2 text-center whitespace-nowrap font-medium text-[11.5px]">
              <span
                v-if="record.status === '县级待审核' || record.status === '市级待审核' || record.status === '省级待审核'"
                class="text-[#1677ff] hover:underline cursor-pointer font-semibold"
                @click="$emit('audit-record', record)"
              >
                {{ record.status }}
              </span>
              <span
                v-else-if="record.status === '审核通过'"
                class="text-emerald-600 font-semibold"
              >
                {{ record.status }}
              </span>
              <span
                v-else-if="record.status === '审核驳回'"
                class="text-rose-500 font-semibold"
              >
                {{ record.status }}
              </span>
              <span
                v-else-if="record.status === '已下达计划'"
                class="text-cyan-700 font-medium"
              >
                {{ record.status }}
              </span>
              <span
                v-else-if="record.status === '报备中'"
                class="text-amber-600 font-semibold"
              >
                {{ record.status }}
              </span>
              <span
                v-else
                class="text-slate-500"
              >
                {{ record.status }}
              </span>
            </td>

            <!-- 许可水量 -->
            <td class="px-2.5 py-2 text-right font-mono font-medium text-slate-800">
              {{ record.permitVolume.toFixed(2) }}
            </td>

            <!-- 计划水量 -->
            <td class="px-2.5 py-2 text-right font-mono font-semibold text-[#1677ff]">
              {{ record.planVolume.toFixed(2) }}
            </td>

            <!-- 地表水 -->
            <td class="px-2.5 py-2 text-right font-mono text-slate-700">
              {{ record.surfaceWater.toFixed(2) }}
            </td>

            <!-- 地下水 -->
            <td class="px-2.5 py-2 text-right font-mono text-slate-700">
              {{ record.groundwater.toFixed(2) }}
            </td>

            <!-- 非常规水总计 -->
            <td class="px-2.5 py-2 text-right font-mono font-medium text-emerald-600">
              {{ record.unconventionalTotal.toFixed(2) }}
            </td>

            <!-- 操作 -->
            <td class="px-3 py-2 text-center whitespace-nowrap sticky right-0 bg-white group-hover:bg-blue-50/40 z-10 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.04)]">
              <div class="flex items-center justify-center gap-1.5">
                <!-- 待审核状态显示绿色 [审核] 按钮 -->
                <button
                  v-if="record.status.includes('待审核')"
                  type="button"
                  @click="$emit('audit-record', record)"
                  class="px-2.5 py-1 rounded bg-[#00a854] hover:bg-emerald-600 text-white font-medium transition cursor-pointer shadow-2xs flex items-center gap-1 text-xs"
                >
                  <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>审核</span>
                </button>

                <!-- 报备中状态显示橙色 [确认] 按钮 -->
                <button
                  v-else-if="record.status === '报备中'"
                  type="button"
                  @click="$emit('confirm-record', record)"
                  class="px-2.5 py-1 rounded bg-[#fa8c16] hover:bg-amber-600 text-white font-medium transition cursor-pointer shadow-2xs flex items-center gap-1 text-xs"
                >
                  <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>确认</span>
                </button>

                <!-- 查看详情按钮 (统一风格，同截图与违规处理) -->
                <button
                  type="button"
                  @click="$emit('view-detail', record)"
                  class="px-2 py-1 rounded bg-blue-50 text-[#1677ff] border border-blue-200 hover:bg-blue-100/70 font-medium transition cursor-pointer flex items-center gap-1 text-xs"
                >
                  <svg class="w-3 h-3 text-[#1677ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>查看详情</span>
                </button>
              </div>
            </td>
          </tr>

          <!-- 空状态 -->
          <tr v-if="records.length === 0">
            <td colspan="20" class="py-12 text-center text-slate-400">
              <div class="flex flex-col items-center justify-center space-y-2">
                <svg class="w-8 h-8 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <span>未检索到匹配的计划用水申报记录</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Bottom Pagination & Permission Warning Note (严格对应截图红色标注与分页) -->
    <div class="bg-[#f8fafc] border-t border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
      <!-- 左侧：已选计数与分页信息 -->
      <div class="flex items-center gap-3 text-slate-600">
        <span>共 <strong class="text-slate-800 font-semibold">{{ records.length }}</strong> 条申报数据</span>
        <span v-if="selectedIds.length > 0" class="text-blue-600 font-medium">
          已选中 {{ selectedIds.length }} 条
        </span>
        <div class="flex items-center gap-1.5 ml-2">
          <span>每页</span>
          <select
            v-model="pageSize"
            class="h-7 px-2 bg-white border border-slate-300 rounded text-xs text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option :value="10">10条/页</option>
            <option :value="20">20条/页</option>
            <option :value="50">50条/页</option>
          </select>
        </div>
      </div>

      <!-- 中间/右侧：截图红色关键提示文字 "只能审核自己下发的数据，但是可以查看所有下级填报的数据？" -->
      <div class="flex items-center gap-2 text-rose-500 font-medium select-none text-[11.5px]">
        <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>只能审核自己下发的数据，但是可以查看所有下级填报的数据</span>
      </div>

      <!-- 分页操作按钮 -->
      <div class="flex items-center gap-1">
        <button
          type="button"
          :disabled="currentPage <= 1"
          @click="currentPage--"
          class="px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer text-xs"
        >
          上一页
        </button>
        <div class="flex items-center gap-1 px-1">
          <span class="font-medium text-[#1677ff]">{{ currentPage }}</span>
          <span class="text-slate-400">/</span>
          <span class="text-slate-600">{{ totalPages }}</span>
        </div>
        <button
          type="button"
          :disabled="currentPage >= totalPages"
          @click="currentPage++"
          class="px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer text-xs"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { WaterPlanRecord } from '../../../types';

const props = defineProps<{
  records: WaterPlanRecord[];
}>();

const emit = defineEmits<{
  (e: 'audit-record', record: WaterPlanRecord): void;
  (e: 'view-detail', record: WaterPlanRecord): void;
  (e: 'confirm-record', record: WaterPlanRecord): void;
}>();

const selectedIds = ref<string[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => Math.max(1, Math.ceil(props.records.length / pageSize.value)));

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return props.records.slice(start, start + pageSize.value);
});

const isAllSelected = computed(() => {
  if (paginatedRecords.value.length === 0) return false;
  return paginatedRecords.value.every(r => selectedIds.value.includes(r.id));
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedIds.value = selectedIds.value.filter(
      id => !paginatedRecords.value.some(r => r.id === id)
    );
  } else {
    const currentIds = paginatedRecords.value.map(r => r.id);
    selectedIds.value = Array.from(new Set([...selectedIds.value, ...currentIds]));
  }
};

const toggleSelect = (id: string) => {
  const index = selectedIds.value.indexOf(id);
  if (index > -1) {
    selectedIds.value.splice(index, 1);
  } else {
    selectedIds.value.push(id);
  }
};
</script>
