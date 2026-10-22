<template>
  <div class="flex-1 min-h-0 bg-white border border-slate-200/90 rounded-xl shadow-2xs flex flex-col overflow-hidden">
    <!-- Table Header Toolbar -->
    <div class="p-2.5 px-3.5 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
      <!-- Left count and selected indicators -->
      <div class="flex items-center gap-2">
        <span class="font-bold text-slate-800">小型灌区月度核算台账列表</span>
        <span class="text-slate-400">|</span>
        <span class="text-slate-600">
          共计 <strong class="text-blue-600 font-mono">{{ records.length }}</strong> 条核算记录
        </span>
        <span v-if="selectedIds.length > 0" class="text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-medium">
          已勾选 {{ selectedIds.length }} 条
        </span>
      </div>

      <!-- Right table actions -->
      <div class="flex items-center gap-2 text-[11px]">
        <!-- 批量市级审核 (仅市级角色且有勾选时可用) -->
        <button
          v-if="currentRole === 'city' && selectedPendingCityCount > 0"
          type="button"
          @click="$emit('batch-audit', 'city')"
          class="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white font-medium flex items-center gap-1 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>批量市级初审 ({{ selectedPendingCityCount }})</span>
        </button>

        <!-- 批量省级终审 (仅省级角色且有勾选时可用) -->
        <button
          v-if="currentRole === 'province' && selectedPendingProvinceCount > 0"
          type="button"
          @click="$emit('batch-audit', 'province')"
          class="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center gap-1 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <span>批量省级终审 ({{ selectedPendingProvinceCount }})</span>
        </button>

        <!-- 表格列说明小提示 -->
        <span class="text-slate-400 hidden xl:inline">
          注：数据单位统一为【万m³】，“(七) 小计”为各项农业用水之和
        </span>
      </div>
    </div>

    <!-- Scrollable Table Container -->
    <div class="flex-1 min-h-0 overflow-auto no-scrollbar">
      <table class="w-full text-left text-xs border-collapse border-spacing-0">
        <!-- Sticky Table Header with grouped classification -->
        <thead class="sticky top-0 z-10 bg-slate-100/95 text-slate-700 font-semibold border-b border-slate-200 text-[11px] select-none backdrop-blur-xs">
          <!-- Top Header Level -->
          <tr>
            <th rowspan="2" class="p-2.5 text-center w-10 border-r border-slate-200">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="toggleSelectAll"
                class="rounded text-blue-600 focus:ring-0 cursor-pointer"
              />
            </th>
            <th rowspan="2" class="p-2.5 min-w-[130px] border-r border-slate-200">取水许可证号 (证照维度)</th>
            <th rowspan="2" class="p-2.5 min-w-[130px] border-r border-slate-200">小型灌区名称</th>
            <th rowspan="2" class="p-2.5 min-w-[70px] border-r border-slate-200">所属区县</th>
            <th rowspan="2" class="p-2.5 min-w-[80px] text-center border-r border-slate-200">核算月份</th>
            
            <!-- 一、农业用水量 (合并7项 + 其中地下水) -->
            <th colspan="8" class="p-2 text-center bg-blue-50/70 border-r border-blue-200 text-blue-900 font-bold border-b border-blue-200/60">
              一、农业用水量 (万m³)
            </th>

            <th rowspan="2" class="p-2.5 min-w-[90px] border-r border-slate-200 text-center">核算方法</th>
            <th rowspan="2" class="p-2.5 min-w-[95px] text-center border-r border-slate-200">流转审核状态</th>
            <th rowspan="2" class="p-2.5 min-w-[100px] border-r border-slate-200">填报人 / 单位</th>
            <th rowspan="2" class="p-2.5 min-w-[140px] text-center sticky right-0 bg-slate-100 z-20 shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.06)]">
              业务操作
            </th>
          </tr>

          <!-- Sub Header Level for 一、农业用水量分类 -->
          <tr class="bg-blue-50/40 text-[10.5px]">
            <th class="p-1.5 px-2 text-right border-r border-slate-200 text-slate-600 font-medium">(一)耕地灌溉</th>
            <th class="p-1.5 px-2 text-right border-r border-slate-200 text-slate-600 font-medium">(二)林地灌溉</th>
            <th class="p-1.5 px-2 text-right border-r border-slate-200 text-slate-600 font-medium">(三)园地灌溉</th>
            <th class="p-1.5 px-2 text-right border-r border-slate-200 text-slate-600 font-medium">(四)牧草地灌溉</th>
            <th class="p-1.5 px-2 text-right border-r border-slate-200 text-slate-600 font-medium">(五)鱼塘补水</th>
            <th class="p-1.5 px-2 text-right border-r border-slate-200 text-slate-600 font-medium">(六)畜禽用水</th>
            <th class="p-1.5 px-2 text-right border-r border-slate-200 text-blue-800 font-bold bg-blue-100/50">(七)小计</th>
            <th class="p-1.5 px-2 text-right border-r border-blue-200 text-cyan-800 font-bold bg-cyan-50/80">其中:取用地下</th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="record in records"
            :key="record.id"
            :class="[
              'transition hover:bg-blue-50/40',
              selectedIds.includes(record.id) ? 'bg-blue-50/60' : ''
            ]"
          >
            <!-- Checkbox -->
            <td class="p-2.5 text-center border-r border-slate-100">
              <input
                type="checkbox"
                :value="record.id"
                v-model="selectedIds"
                class="rounded text-blue-600 focus:ring-0 cursor-pointer"
              />
            </td>

            <!-- Permit Number (证照维度) -->
            <td class="p-2.5 border-r border-slate-100">
              <div class="font-mono text-xs font-semibold text-slate-800 hover:text-blue-600 cursor-pointer flex items-center gap-1" @click="$emit('view-detail', record)">
                <svg class="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                </svg>
                <span class="truncate" :title="record.permitNumber">{{ record.permitNumber }}</span>
              </div>
              <div class="text-[10px] text-slate-400 mt-0.5 truncate" :title="record.waterOwner">
                {{ record.waterOwner }}
              </div>
            </td>

            <!-- Irrigation Area Name -->
            <td class="p-2.5 border-r border-slate-100">
              <div class="font-semibold text-slate-900 flex items-center gap-1.5">
                <span>{{ record.irrigationName }}</span>
              </div>
              <div class="flex items-center gap-1.5 mt-0.5 text-[10px]">
                <span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {{ record.waterSourceType }}
                </span>
                <span class="text-slate-400">许可: {{ record.annualQuota }}万m³</span>
              </div>
            </td>

            <!-- District -->
            <td class="p-2.5 border-r border-slate-100 text-slate-700">
              {{ record.district }}
            </td>

            <!-- Month (按月核算) -->
            <td class="p-2.5 border-r border-slate-100 text-center font-mono font-medium text-slate-800">
              <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
                {{ record.periodLabel }}
              </span>
            </td>

            <!-- 1. 耕地灌溉 -->
            <td class="p-2.5 border-r border-slate-100 text-right font-mono text-slate-700">
              {{ record.waterData.farmland.toFixed(2) }}
            </td>

            <!-- 2. 林地灌溉 -->
            <td class="p-2.5 border-r border-slate-100 text-right font-mono text-slate-700">
              {{ record.waterData.woodland.toFixed(2) }}
            </td>

            <!-- 3. 园地灌溉 -->
            <td class="p-2.5 border-r border-slate-100 text-right font-mono text-slate-700">
              {{ record.waterData.orchard.toFixed(2) }}
            </td>

            <!-- 4. 牧草地灌溉 -->
            <td class="p-2.5 border-r border-slate-100 text-right font-mono text-slate-700">
              {{ record.waterData.pasture.toFixed(2) }}
            </td>

            <!-- 5. 鱼塘补水 -->
            <td class="p-2.5 border-r border-slate-100 text-right font-mono text-slate-700">
              {{ record.waterData.fishpond.toFixed(2) }}
            </td>

            <!-- 6. 畜禽用水 -->
            <td class="p-2.5 border-r border-slate-100 text-right font-mono text-slate-700">
              {{ record.waterData.livestock.toFixed(2) }}
            </td>

            <!-- 7. (七) 小计 (高亮自动求和) -->
            <td class="p-2.5 border-r border-slate-100 text-right font-mono font-bold text-blue-700 bg-blue-50/30">
              {{ record.waterData.subtotal.toFixed(2) }}
            </td>

            <!-- 其中: 取用地下 -->
            <td class="p-2.5 border-r border-slate-100 text-right font-mono font-bold text-cyan-800 bg-cyan-50/30">
              <span :class="record.waterData.groundwater > 0 ? 'text-cyan-700' : 'text-slate-400'">
                {{ record.waterData.groundwater.toFixed(2) }}
              </span>
            </td>

            <!-- Calculation Method -->
            <td class="p-2.5 border-r border-slate-100 text-center">
              <span class="px-1.5 py-0.5 rounded text-[10.5px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                {{ record.calculationMethod }}
              </span>
            </td>

            <!-- Audit Workflow Status -->
            <td class="p-2.5 border-r border-slate-100 text-center">
              <!-- 草稿 -->
              <span
                v-if="record.status === 'draft'"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>县级草稿</span>
              </span>

              <!-- 待市级审核 -->
              <span
                v-else-if="record.status === 'pending_city'"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span>待市级初审</span>
              </span>

              <!-- 待省级审核 -->
              <span
                v-else-if="record.status === 'pending_province'"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                <span>待省级终审</span>
              </span>

              <!-- 审核通过 -->
              <span
                v-else-if="record.status === 'approved'"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                <svg class="w-3 h-3 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>已通过入库</span>
              </span>

              <!-- 已驳回 -->
              <span
                v-else-if="record.status === 'rejected'"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 cursor-pointer"
                :title="record.cityAuditor?.comment || '已驳回'"
                @click="$emit('view-detail', record)"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>已驳回修改</span>
              </span>
            </td>

            <!-- Reporter & Unit -->
            <td class="p-2.5 border-r border-slate-100">
              <div class="text-slate-800 font-medium text-xs">{{ record.reporter.name }}</div>
              <div class="text-[10px] text-slate-400 mt-0.5 truncate" :title="record.reporter.unit">
                {{ record.reporter.unit }}
              </div>
            </td>

            <!-- Action column (Role dynamic) -->
            <td class="p-2.5 text-center sticky right-0 bg-white z-10 shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.06)]">
              <div class="flex items-center justify-center gap-1.5">
                <!-- 1. 查看详情 (全角色可用) -->
                <button
                  type="button"
                  @click="$emit('view-detail', record)"
                  class="text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition text-xs"
                >
                  详情
                </button>

                <!-- 2. 县级角色专用操作 -->
                <template v-if="currentRole === 'county'">
                  <!-- 编辑 (仅草稿或驳回时可用) -->
                  <button
                    v-if="record.status === 'draft' || record.status === 'rejected'"
                    type="button"
                    @click="$emit('edit-report', record)"
                    class="text-emerald-600 hover:text-emerald-800 font-medium cursor-pointer transition text-xs"
                  >
                    修改
                  </button>

                  <!-- 提交审核 (针对草稿) -->
                  <button
                    v-if="record.status === 'draft'"
                    type="button"
                    @click="$emit('submit-for-audit', record)"
                    class="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer transition text-xs"
                  >
                    提交
                  </button>

                  <!-- 撤回修改 (仅当处于待市级审核时) -->
                  <button
                    v-if="record.status === 'pending_city'"
                    type="button"
                    @click="$emit('recall-report', record)"
                    class="text-amber-600 hover:text-amber-800 font-medium cursor-pointer transition text-xs"
                  >
                    撤回
                  </button>

                  <!-- 删除草稿 (仅草稿) -->
                  <button
                    v-if="record.status === 'draft'"
                    type="button"
                    @click="$emit('delete-report', record)"
                    class="text-rose-500 hover:text-rose-700 font-medium cursor-pointer transition text-xs"
                  >
                    删除
                  </button>
                </template>

                <!-- 3. 市级角色专用操作 -->
                <template v-if="currentRole === 'city'">
                  <button
                    v-if="record.status === 'pending_city'"
                    type="button"
                    @click="$emit('open-audit', record, 'city')"
                    class="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 font-bold cursor-pointer transition text-xs shadow-2xs"
                  >
                    市级初审
                  </button>
                  <span v-else-if="record.status === 'pending_province'" class="text-[11px] text-slate-400">已转呈省厅</span>
                  <span v-else-if="record.status === 'approved'" class="text-[11px] text-emerald-600">已终审入库</span>
                  <span v-else-if="record.status === 'rejected'" class="text-[11px] text-rose-500">已退回县级</span>
                  <span v-else class="text-[11px] text-slate-400">待县级报送</span>
                </template>

                <!-- 4. 省级角色专用操作 -->
                <template v-if="currentRole === 'province'">
                  <button
                    v-if="record.status === 'pending_province'"
                    type="button"
                    @click="$emit('open-audit', record, 'province')"
                    class="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-300 hover:bg-indigo-100 font-bold cursor-pointer transition text-xs shadow-2xs"
                  >
                    省级终审
                  </button>
                  <span v-else-if="record.status === 'approved'" class="text-[11px] text-emerald-600 font-medium">已入库归档</span>
                  <span v-else-if="record.status === 'pending_city'" class="text-[11px] text-amber-600">等待市级初审</span>
                  <span v-else class="text-[11px] text-slate-400">未进入省审</span>
                </template>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="records.length === 0">
            <td colspan="15" class="py-14 text-center text-slate-400">
              <div class="flex flex-col items-center justify-center gap-2">
                <svg class="w-10 h-10 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <div class="text-sm font-medium text-slate-600">暂无匹配的小型灌区核算填报记录</div>
                <div class="text-xs text-slate-400">您可以尝试调整筛选项，或点击右上角【月度核算填报】新增填报数据</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Footer Stats -->
    <div class="p-2.5 px-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 text-slate-500">
      <div class="flex items-center gap-4">
        <span>当前页显示: <strong class="text-slate-800">{{ records.length }}</strong> 条</span>
        <span class="hidden sm:inline">
          当前页农业用水合计: <strong class="text-blue-600 font-mono font-bold">{{ pageSubtotal.toFixed(2) }}</strong> 万m³
        </span>
        <span class="hidden sm:inline">
          其中取用地下水合计: <strong class="text-cyan-600 font-mono font-bold">{{ pageGroundwater.toFixed(2) }}</strong> 万m³
        </span>
      </div>

      <div class="flex items-center gap-1.5 text-[11px] text-slate-400">
        <span class="w-2 h-2 rounded-full bg-blue-500"></span>
        <span>青海省西宁市水务局 · 取水许可与水量核算监管中心</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { IrrigationAccountingRecord, IrrigationRoleLevel } from '../../../types';

const props = defineProps<{
  records: IrrigationAccountingRecord[];
  currentRole: IrrigationRoleLevel;
}>();

const emit = defineEmits<{
  (e: 'view-detail', record: IrrigationAccountingRecord): void;
  (e: 'edit-report', record: IrrigationAccountingRecord): void;
  (e: 'submit-for-audit', record: IrrigationAccountingRecord): void;
  (e: 'recall-report', record: IrrigationAccountingRecord): void;
  (e: 'delete-report', record: IrrigationAccountingRecord): void;
  (e: 'open-audit', record: IrrigationAccountingRecord, level: 'city' | 'province'): void;
  (e: 'batch-audit', level: 'city' | 'province'): void;
}>();

const selectedIds = ref<string[]>([]);

const isAllSelected = computed(() => {
  return props.records.length > 0 && selectedIds.value.length === props.records.length;
});

const toggleSelectAll = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked;
  if (checked) {
    selectedIds.value = props.records.map((r) => r.id);
  } else {
    selectedIds.value = [];
  }
};

const selectedPendingCityCount = computed(() => {
  return props.records.filter((r) => selectedIds.value.includes(r.id) && r.status === 'pending_city').length;
});

const selectedPendingProvinceCount = computed(() => {
  return props.records.filter((r) => selectedIds.value.includes(r.id) && r.status === 'pending_province').length;
});

const pageSubtotal = computed(() => {
  return props.records.reduce((acc, r) => acc + (r.waterData?.subtotal || 0), 0);
});

const pageGroundwater = computed(() => {
  return props.records.reduce((acc, r) => acc + (r.waterData?.groundwater || 0), 0);
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
.no-scrollbar {
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}
</style>
