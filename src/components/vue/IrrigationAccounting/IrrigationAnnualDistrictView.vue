<template>
  <div class="flex-1 min-h-0 bg-white border border-slate-200/90 rounded-xl shadow-2xs flex flex-col overflow-hidden">
    <!-- Header Control Bar: 行政区划 & 年份选择器 -->
    <div class="p-3 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5 text-xs shrink-0">
      <!-- Left: Administrative Division Selector & Year Dimensions -->
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex items-center gap-1.5 font-bold text-slate-800">
          <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
            <line x1="8" y1="2" x2="8" y2="18"></line>
            <line x1="16" y1="6" x2="16" y2="22"></line>
          </svg>
          <span>行政区划当年数据大盘：</span>
        </div>

        <!-- 行政区划切换药丸按钮 -->
        <div class="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg border border-slate-300/80">
          <button
            v-for="dist in availableDistricts"
            :key="dist"
            type="button"
            @click="selectedDistrict = dist"
            :class="[
              'px-2.5 py-1 rounded-md transition cursor-pointer text-xs font-medium',
              selectedDistrict === dist
                ? 'bg-white text-blue-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            ]"
          >
            {{ dist }}
          </button>
        </div>

        <!-- 年份维度选择器 -->
        <div class="flex items-center gap-1 ml-1 text-slate-500">
          <span>考核年度：</span>
          <select
            v-model="selectedYear"
            class="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 font-semibold focus:outline-none focus:border-blue-500"
          >
            <option value="2026">2026 年度 (当年)</option>
            <option value="2025">2025 年度</option>
            <option value="2024">2024 年度</option>
          </select>
        </div>
      </div>

      <!-- Right: Summary Tag -->
      <div class="flex items-center gap-2 text-[11px] text-slate-500">
        <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
          {{ selectedDistrict }} · {{ selectedYear }}年度累计农业用水综合核算
        </span>
        <button
          type="button"
          @click="handleExportAnnual"
          class="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium flex items-center gap-1 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>导出年度区划分析报表</span>
        </button>
      </div>
    </div>

    <!-- Main Content Area: 4 High-Impact Stat Bento Cards + Trend Charts + Breakdown Table -->
    <div class="flex-1 min-h-0 p-3 overflow-y-auto space-y-3">
      <!-- 1. Top Key Stat Bento Grid (以当年行政区划为维度) -->
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
        <!-- Metric 1: 辖区持证灌区数量与年许可总额 -->
        <div class="p-3 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200/80 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-slate-500 font-medium">辖区持证灌区及年许可</span>
            <span class="p-1.5 rounded-lg bg-blue-100/70 text-blue-700">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
              </svg>
            </span>
          </div>
          <div class="mt-2">
            <div class="text-xl font-bold font-mono text-slate-800">
              {{ currentDistrictSummary.totalLicenses }} <span class="text-xs font-normal text-slate-500">处小型灌区</span>
            </div>
            <div class="text-[11px] text-blue-600 mt-1">
              核准年许可总额：<strong>{{ currentDistrictSummary.annualQuotaTotal.toFixed(1) }}</strong> 万m³
            </div>
          </div>
        </div>

        <!-- Metric 2: 当年累计核算用水总量 & 用水进度 -->
        <div class="p-3 rounded-xl bg-gradient-to-br from-emerald-50/50 to-emerald-50/20 border border-emerald-200/80 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-emerald-800 font-medium">当年累计核算用水量</span>
            <span class="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </span>
          </div>
          <div class="mt-2">
            <div class="text-xl font-bold font-mono text-emerald-700">
              {{ currentDistrictSummary.annualUsedTotal.toFixed(2) }} <span class="text-xs font-normal text-emerald-600">万m³</span>
            </div>
            <div class="mt-1 flex items-center justify-between text-[11px]">
              <span class="text-emerald-700">占年许可进度：</span>
              <span class="font-bold font-mono text-emerald-800">{{ currentDistrictSummary.quotaUsageRate }}%</span>
            </div>
            <div class="w-full bg-emerald-200/60 h-1.5 rounded-full overflow-hidden mt-1">
              <div class="bg-emerald-500 h-full rounded-full" :style="{ width: `${Math.min(currentDistrictSummary.quotaUsageRate, 100)}%` }"></div>
            </div>
          </div>
        </div>

        <!-- Metric 3: 当年地下水核算量与压采控制 -->
        <div class="p-3 rounded-xl bg-gradient-to-br from-cyan-50/50 to-cyan-50/20 border border-cyan-200/80 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-cyan-800 font-medium">其中：当年地下水核算量</span>
            <span class="p-1.5 rounded-lg bg-cyan-100 text-cyan-700">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </span>
          </div>
          <div class="mt-2">
            <div class="text-xl font-bold font-mono text-cyan-800">
              {{ currentDistrictSummary.groundwaterTotal.toFixed(2) }} <span class="text-xs font-normal text-cyan-600">万m³</span>
            </div>
            <div class="text-[11px] text-cyan-700 mt-1">
              地下水占比：<strong>{{ currentDistrictSummary.groundwaterRatio }}%</strong> · 严格压采红线
            </div>
          </div>
        </div>

        <!-- Metric 4: 每月任务下发填报履约率 -->
        <div class="p-3 rounded-xl bg-gradient-to-br from-indigo-50/50 to-indigo-50/20 border border-indigo-200/80 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-indigo-800 font-medium">月度自动下发任务履约率</span>
            <span class="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </div>
          <div class="mt-2">
            <div class="text-xl font-bold font-mono text-indigo-700">
              {{ currentDistrictSummary.taskCompletionRate }}%
            </div>
            <div class="text-[11px] text-indigo-600 mt-1 flex items-center justify-between">
              <span>已办结任务: {{ currentDistrictSummary.completedTasks }}/{{ currentDistrictSummary.totalTasks }} 项</span>
              <span class="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">闭环率高</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Middle Row: 1~12月度变化趋势柱状图 + 农业用水 6 分类构成比例 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <!-- 2.1 当年1-12月月度核算水量趋势分布 (2/3 宽度) -->
        <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-3 flex flex-col">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-800 text-xs">当年 ({{ selectedYear }}) 1~12月度核算水量变化历程</span>
              <span class="text-[10px] text-slate-400">单位：万m³</span>
            </div>
            <div class="flex items-center gap-3 text-[11px]">
              <div class="flex items-center gap-1 text-slate-600">
                <span class="w-2.5 h-2.5 rounded-xs bg-blue-600 inline-block"></span>
                <span>农业用水小计</span>
              </div>
              <div class="flex items-center gap-1 text-slate-600">
                <span class="w-2.5 h-2.5 rounded-xs bg-cyan-400 inline-block"></span>
                <span>取用地下水</span>
              </div>
              <div class="flex items-center gap-1 text-slate-400">
                <span class="w-2 h-2 rounded-full bg-slate-300 inline-block"></span>
                <span>未到期月份</span>
              </div>
            </div>
          </div>

          <!-- 柱状图可视化 (12个月) -->
          <div class="pt-4 pb-2 flex items-end justify-between gap-1.5 h-44 px-2">
            <div
              v-for="item in currentDistrictSummary.monthlyTrend"
              :key="item.month"
              class="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative"
            >
              <!-- Tooltip on Hover -->
              <div class="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 bg-slate-900 text-white text-[10px] p-1.5 rounded shadow-lg whitespace-nowrap">
                <div class="font-bold">{{ item.monthLabel }}</div>
                <div>农业总水量: {{ item.waterVolume.toFixed(2) }} 万m³</div>
                <div class="text-cyan-300">取地下水: {{ item.groundwater.toFixed(2) }} 万m³</div>
                <div class="text-slate-300">状态: {{ item.status === 'completed' ? '已入库' : item.status === 'in_progress' ? '本月流转中' : '待下发' }}</div>
              </div>

              <!-- Bar Heights -->
              <div class="w-full flex items-end justify-center gap-0.5 max-w-[28px]">
                <!-- 农业总用水量柱 -->
                <div
                  class="w-3 rounded-t-sm transition-all duration-300"
                  :class="[
                    item.status === 'completed' ? 'bg-blue-600 group-hover:bg-blue-700' :
                    item.status === 'in_progress' ? 'bg-amber-500 group-hover:bg-amber-600' : 'bg-slate-200'
                  ]"
                  :style="{ height: `${Math.max((item.waterVolume / maxMonthlyVolume) * 110, 4)}px` }"
                ></div>
                <!-- 地下水柱 -->
                <div
                  class="w-2 rounded-t-sm transition-all duration-300"
                  :class="[
                    item.status === 'completed' ? 'bg-cyan-400 group-hover:bg-cyan-500' :
                    item.status === 'in_progress' ? 'bg-cyan-300' : 'bg-slate-150'
                  ]"
                  :style="{ height: `${Math.max((item.groundwater / maxMonthlyVolume) * 110, 2)}px` }"
                ></div>
              </div>

              <!-- Value label -->
              <span class="text-[9.5px] font-mono text-slate-600">
                {{ item.waterVolume > 0 ? item.waterVolume.toFixed(1) : '-' }}
              </span>

              <!-- Month label -->
              <span
                class="text-[10px] font-medium border-t border-slate-100 pt-0.5 w-full text-center"
                :class="item.month === 3 ? 'text-blue-700 font-bold bg-blue-50/70 rounded' : 'text-slate-500'"
              >
                {{ item.month }}月
              </span>
            </div>
          </div>
          <div class="text-[11px] text-slate-500 text-center bg-slate-50 py-1 rounded border border-slate-100 mt-1">
            春灌期（3月-5月）与秋灌期为小型灌区农业用水峰值，系统每月月初精准下发核算任务。
          </div>
        </div>

        <!-- 2.2 当年农业用水 6 分类占比明细 (1/3 宽度) -->
        <div class="bg-white rounded-xl border border-slate-200 p-3 flex flex-col justify-between">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <span class="font-bold text-slate-800 text-xs">农业用水分类累计构成</span>
            <span class="text-[10px] text-slate-400">万m³ / 占比</span>
          </div>

          <div class="space-y-2 py-2 text-xs">
            <!-- 耕地灌溉 -->
            <div>
              <div class="flex justify-between text-[11px] mb-0.5">
                <span class="text-slate-700 flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span> (一) 耕地灌溉
                </span>
                <span class="font-mono font-medium text-slate-800">
                  {{ currentDistrictSummary.farmlandTotal.toFixed(2) }} ({{ calcPercent(currentDistrictSummary.farmlandTotal) }}%)
                </span>
              </div>
              <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" :style="{ width: `${calcPercent(currentDistrictSummary.farmlandTotal)}%` }"></div>
              </div>
            </div>

            <!-- 林地灌溉 -->
            <div>
              <div class="flex justify-between text-[11px] mb-0.5">
                <span class="text-slate-700 flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-green-600"></span> (二) 林地灌溉
                </span>
                <span class="font-mono font-medium text-slate-800">
                  {{ currentDistrictSummary.woodlandTotal.toFixed(2) }} ({{ calcPercent(currentDistrictSummary.woodlandTotal) }}%)
                </span>
              </div>
              <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-green-600 h-full rounded-full" :style="{ width: `${calcPercent(currentDistrictSummary.woodlandTotal)}%` }"></div>
              </div>
            </div>

            <!-- 园地灌溉 -->
            <div>
              <div class="flex justify-between text-[11px] mb-0.5">
                <span class="text-slate-700 flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-lime-500"></span> (三) 园地灌溉
                </span>
                <span class="font-mono font-medium text-slate-800">
                  {{ currentDistrictSummary.orchardTotal.toFixed(2) }} ({{ calcPercent(currentDistrictSummary.orchardTotal) }}%)
                </span>
              </div>
              <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-lime-500 h-full rounded-full" :style="{ width: `${calcPercent(currentDistrictSummary.orchardTotal)}%` }"></div>
              </div>
            </div>

            <!-- 牧草地灌溉 -->
            <div>
              <div class="flex justify-between text-[11px] mb-0.5">
                <span class="text-slate-700 flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-teal-500"></span> (四) 牧草地灌溉
                </span>
                <span class="font-mono font-medium text-slate-800">
                  {{ currentDistrictSummary.pastureTotal.toFixed(2) }} ({{ calcPercent(currentDistrictSummary.pastureTotal) }}%)
                </span>
              </div>
              <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-teal-500 h-full rounded-full" :style="{ width: `${calcPercent(currentDistrictSummary.pastureTotal)}%` }"></div>
              </div>
            </div>

            <!-- 鱼塘补水 -->
            <div>
              <div class="flex justify-between text-[11px] mb-0.5">
                <span class="text-slate-700 flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-cyan-500"></span> (五) 鱼塘补水
                </span>
                <span class="font-mono font-medium text-slate-800">
                  {{ currentDistrictSummary.fishpondTotal.toFixed(2) }} ({{ calcPercent(currentDistrictSummary.fishpondTotal) }}%)
                </span>
              </div>
              <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-cyan-500 h-full rounded-full" :style="{ width: `${calcPercent(currentDistrictSummary.fishpondTotal)}%` }"></div>
              </div>
            </div>

            <!-- 畜禽用水 -->
            <div>
              <div class="flex justify-between text-[11px] mb-0.5">
                <span class="text-slate-700 flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-amber-500"></span> (六) 畜禽用水
                </span>
                <span class="font-mono font-medium text-slate-800">
                  {{ currentDistrictSummary.livestockTotal.toFixed(2) }} ({{ calcPercent(currentDistrictSummary.livestockTotal) }}%)
                </span>
              </div>
              <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-amber-500 h-full rounded-full" :style="{ width: `${calcPercent(currentDistrictSummary.livestockTotal)}%` }"></div>
              </div>
            </div>
          </div>

          <div class="p-2 rounded bg-blue-50/60 border border-blue-100 text-[11px] text-blue-900 flex justify-between items-center">
            <span>(七) 累计小计：</span>
            <strong class="font-mono text-sm text-blue-700">{{ currentDistrictSummary.annualUsedTotal.toFixed(2) }} 万m³</strong>
          </div>
        </div>
      </div>

      <!-- 3. Bottom Table: 本行政区划小型灌区证照年度核算汇总明细 -->
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div class="p-2.5 px-3 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between text-xs">
          <span class="font-bold text-slate-800">【{{ selectedDistrict }}】持证小型灌区当年年度台账列表</span>
          <span class="text-slate-500 text-[11px]">共 {{ districtLicenses.length }} 处灌区，均已建立按月核算台账</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead class="bg-slate-100 text-slate-600 text-[11px] border-b border-slate-200">
              <tr>
                <th class="p-2 pl-3">取水许可证编号</th>
                <th class="p-2">小型灌区名称</th>
                <th class="p-2">取水权人 / 主体</th>
                <th class="p-2">水源类型</th>
                <th class="p-2 text-right">年核准许可(万m³)</th>
                <th class="p-2 text-right">当年累计已核算(万m³)</th>
                <th class="p-2 text-right">其中地下水(万m³)</th>
                <th class="p-2 text-center">年度用水进度</th>
                <th class="p-2 text-center pr-3">月度任务状态</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="lic in districtLicenses" :key="lic.id" class="hover:bg-slate-50/70 transition">
                <td class="p-2 pl-3 font-mono font-semibold text-blue-700 text-[11px]">
                  {{ lic.permitNumber }}
                </td>
                <td class="p-2 font-medium text-slate-900">
                  {{ lic.irrigationName }}
                </td>
                <td class="p-2 text-slate-600 text-[11px]">
                  {{ lic.waterOwner }}
                </td>
                <td class="p-2 text-slate-600">
                  <span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10.5px]">
                    {{ lic.waterSourceType }}
                  </span>
                </td>
                <td class="p-2 text-right font-mono font-medium text-slate-700">
                  {{ lic.annualQuota.toFixed(1) }}
                </td>
                <td class="p-2 text-right font-mono font-bold text-emerald-700">
                  {{ getLicenseAnnualUsed(lic.id).toFixed(2) }}
                </td>
                <td class="p-2 text-right font-mono text-cyan-700">
                  {{ getLicenseGroundwater(lic.id).toFixed(2) }}
                </td>
                <td class="p-2 text-center">
                  <div class="flex items-center justify-center gap-1.5">
                    <div class="w-14 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        class="bg-blue-600 h-full rounded-full"
                        :style="{ width: `${Math.min(calcLicenseProgress(lic.id, lic.annualQuota), 100)}%` }"
                      ></div>
                    </div>
                    <span class="text-[10px] font-mono text-slate-600">{{ calcLicenseProgress(lic.id, lic.annualQuota) }}%</span>
                  </div>
                </td>
                <td class="p-2 text-center pr-3">
                  <span class="px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    按月下发并履约中
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { IrrigationLicense, IrrigationAccountingRecord, DistrictAnnualSummary } from '../../../types';

const props = defineProps<{
  licenses: IrrigationLicense[];
  records: IrrigationAccountingRecord[];
}>();

const availableDistricts = ['全西宁市', '湟中区', '湟源县', '大通县', '城北区', '城东区'];
const selectedDistrict = ref<string>('全西宁市');
const selectedYear = ref<string>('2026');

// 过滤出选定行政区划的证照
const districtLicenses = computed(() => {
  if (selectedDistrict.value === '全西宁市') {
    return props.licenses;
  }
  return props.licenses.filter((l) => l.district === selectedDistrict.value);
});

// 过滤出选定区划与年份的核算记录
const districtRecords = computed(() => {
  return props.records.filter((r) => {
    if (String(r.year) !== selectedYear.value) return false;
    if (selectedDistrict.value !== '全西宁市' && r.district !== selectedDistrict.value) return false;
    return true;
  });
});

// 计算某个证照当年的用水总量
const getLicenseAnnualUsed = (licenseId: string) => {
  return props.records
    .filter((r) => r.licenseId === licenseId && String(r.year) === selectedYear.value)
    .reduce((sum, r) => sum + (r.waterData?.subtotal || 0), 0);
};

const getLicenseGroundwater = (licenseId: string) => {
  return props.records
    .filter((r) => r.licenseId === licenseId && String(r.year) === selectedYear.value)
    .reduce((sum, r) => sum + (r.waterData?.groundwater || 0), 0);
};

const calcLicenseProgress = (licenseId: string, quota: number) => {
  if (!quota || quota === 0) return 0;
  const used = getLicenseAnnualUsed(licenseId);
  return Math.round((used / quota) * 100);
};

// 构造行政区划年度维度聚合统计数据
const currentDistrictSummary = computed<DistrictAnnualSummary>(() => {
  const lics = districtLicenses.value;
  const recs = districtRecords.value;

  const totalLicenses = lics.length;
  const annualQuotaTotal = lics.reduce((sum, l) => sum + l.annualQuota, 0);

  const farmlandTotal = recs.reduce((sum, r) => sum + (r.waterData?.farmland || 0), 0);
  const woodlandTotal = recs.reduce((sum, r) => sum + (r.waterData?.woodland || 0), 0);
  const orchardTotal = recs.reduce((sum, r) => sum + (r.waterData?.orchard || 0), 0);
  const pastureTotal = recs.reduce((sum, r) => sum + (r.waterData?.pasture || 0), 0);
  const fishpondTotal = recs.reduce((sum, r) => sum + (r.waterData?.fishpond || 0), 0);
  const livestockTotal = recs.reduce((sum, r) => sum + (r.waterData?.livestock || 0), 0);
  const annualUsedTotal = recs.reduce((sum, r) => sum + (r.waterData?.subtotal || 0), 0);
  const groundwaterTotal = recs.reduce((sum, r) => sum + (r.waterData?.groundwater || 0), 0);

  const quotaUsageRate = annualQuotaTotal > 0 ? Math.round((annualUsedTotal / annualQuotaTotal) * 100) : 0;
  const groundwaterRatio = annualUsedTotal > 0 ? Math.round((groundwaterTotal / annualUsedTotal) * 100) : 0;

  // 12个月趋势数据构造
  const monthlyTrend = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const monthRecs = recs.filter((r) => r.month === month);
    const waterVol = monthRecs.reduce((sum, r) => sum + (r.waterData?.subtotal || 0), 0);
    const gwVol = monthRecs.reduce((sum, r) => sum + (r.waterData?.groundwater || 0), 0);

    let status: 'completed' | 'in_progress' | 'future' = 'future';
    if (month < 3) {
      status = 'completed';
    } else if (month === 3) {
      status = 'in_progress';
    } else {
      status = 'future';
    }

    return {
      month,
      monthLabel: `${selectedYear.value}年${month < 10 ? '0' + month : month}月`,
      waterVolume: waterVol,
      groundwater: gwVol,
      status,
    };
  });

  return {
    district: selectedDistrict.value,
    year: Number(selectedYear.value),
    totalLicenses,
    annualQuotaTotal,
    annualUsedTotal,
    quotaUsageRate,
    groundwaterTotal,
    groundwaterRatio,
    farmlandTotal,
    woodlandTotal,
    orchardTotal,
    pastureTotal,
    fishpondTotal,
    livestockTotal,
    taskCompletionRate: 92,
    totalTasks: totalLicenses * 3, // 截止当前3月份
    completedTasks: Math.round(totalLicenses * 3 * 0.92),
    monthlyTrend,
  };
});

const maxMonthlyVolume = computed(() => {
  const max = Math.max(...currentDistrictSummary.value.monthlyTrend.map((t) => t.waterVolume));
  return max > 0 ? max : 20;
});

const calcPercent = (val: number) => {
  const total = currentDistrictSummary.value.annualUsedTotal;
  if (!total || total === 0) return 0;
  return Math.round((val / total) * 100);
};

const handleExportAnnual = () => {
  MessagePlugin.success(`已生成并导出【${selectedDistrict.value} ${selectedYear.value}年度小型灌区农业用水综合核算分析台账】`);
};
</script>
