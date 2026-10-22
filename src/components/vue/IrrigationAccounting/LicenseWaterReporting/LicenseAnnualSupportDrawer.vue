<template>
  <t-drawer
    :visible="visible"
    header="取水许可证年度取用水核算台账与数据支撑大盘"
    size="840px"
    :footer="null"
    @update:visible="$emit('update:visible', $event)"
  >
    <div v-if="summary" class="space-y-4 text-xs text-slate-700 py-1">
      <!-- 1. License Card Header with Year Selector -->
      <div class="p-4 rounded-xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white shadow-sm space-y-3">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-base font-bold">{{ summary.licenseName }}</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/40 text-blue-100 border border-blue-400/50">
                {{ summary.industryType }}
              </span>
              <span class="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/40 text-cyan-100 border border-cyan-400/50">
                {{ summary.waterSourceType }}
              </span>
            </div>
            <div class="text-blue-200 text-xs flex flex-wrap items-center gap-x-4">
              <span>许可证号：<strong class="font-mono text-white">{{ summary.permitNumber }}</strong></span>
              <span>取水权人：{{ summary.waterOwner }}</span>
              <span>所属行政区县：<strong>{{ summary.district }}</strong></span>
            </div>
          </div>

          <!-- Year Selector -->
          <div class="flex items-center gap-1.5 bg-blue-900/60 p-1.5 rounded-lg border border-blue-500/40">
            <span class="text-blue-200 text-[11px]">核算年度：</span>
            <select
              :value="summary.year"
              @change="$emit('change-year', Number(($event.target as HTMLSelectElement).value))"
              class="bg-blue-800 text-white font-bold rounded px-2 py-1 text-xs border border-blue-400/50 focus:outline-none cursor-pointer"
            >
              <option :value="2026">2026 年度 (执行中)</option>
              <option :value="2025">2025 年度 (完整归档)</option>
              <option :value="2024">2024 年度 (历史归档)</option>
            </select>
          </div>
        </div>

        <!-- 3 KPI metric gauges inside banner -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-blue-600/60 text-white">
          <div class="bg-white/10 backdrop-blur-xs rounded-lg p-2.5">
            <div class="text-blue-200 text-[11px]">核准年许可取水总量</div>
            <div class="text-lg font-bold font-mono">{{ summary.annualQuota.toFixed(2) }} <span class="text-xs font-normal text-blue-200">万m³</span></div>
          </div>

          <div class="bg-white/15 backdrop-blur-xs rounded-lg p-2.5 ring-1 ring-emerald-400/50">
            <div class="text-emerald-300 text-[11px] font-semibold flex items-center justify-between">
              <span>市审生效数据支撑量</span>
              <span class="text-[10px] bg-emerald-500/40 px-1 rounded text-white">年度支撑</span>
            </div>
            <div class="text-lg font-bold font-mono text-emerald-300">
              {{ summary.totalApprovedWater.toFixed(2) }} <span class="text-xs font-normal text-emerald-200">万m³</span>
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-xs rounded-lg p-2.5">
            <div class="text-blue-200 text-[11px]">年许可指标执行进度</div>
            <div class="text-lg font-bold font-mono" :class="summary.usageRatio >= 100 ? 'text-red-300' : 'text-cyan-300'">
              {{ summary.usageRatio.toFixed(1) }}%
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-xs rounded-lg p-2.5">
            <div class="text-blue-200 text-[11px]">已填报 / 已市审月数</div>
            <div class="text-lg font-bold font-mono">
              <span class="text-emerald-300">{{ summary.approvedMonthsCount }}</span> / <span class="text-blue-100">{{ summary.reportedMonthsCount }}</span>
              <span class="text-xs font-normal text-blue-200 ml-1">个月</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Annual Quota Usage Progress Bar -->
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
        <div class="flex items-center justify-between text-xs">
          <span class="font-semibold text-slate-800 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>年度红线控制与执行进度分析（{{ summary.year }}年）</span>
          </span>
          <span class="text-slate-500 text-[11px]">
            剩余可用配额：
            <strong class="font-mono text-blue-700">
              {{ Math.max(0, summary.annualQuota - summary.totalApprovedWater).toFixed(2) }} 万m³
            </strong>
          </span>
        </div>

        <!-- Progress bar -->
        <div class="w-full bg-slate-200 rounded-full h-3 overflow-hidden flex">
          <div
            class="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
            :style="{ width: `${Math.min(100, summary.usageRatio)}%` }"
            :title="`已核准生效: ${summary.usageRatio.toFixed(1)}%`"
          ></div>
        </div>

        <div class="flex items-center justify-between text-[11px] text-slate-500">
          <span>0 万m³</span>
          <span class="text-center">
            地下水累计：<strong class="text-cyan-700 font-mono">{{ summary.groundwaterTotal.toFixed(2) }} 万m³</strong>
            ({{ summary.totalApprovedWater > 0 ? ((summary.groundwaterTotal / summary.totalApprovedWater) * 100).toFixed(1) : 0 }}%)
          </span>
          <span>年许可额度：{{ summary.annualQuota.toFixed(2) }} 万m³</span>
        </div>
      </div>

      <!-- 3. Visual 1-12 Month Water Trend (SVG Chart) -->
      <div class="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2.5">
        <div class="flex items-center justify-between">
          <span class="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>1~12月逐月取水量支撑柱状分布图 (万m³)</span>
          </span>
          <div class="flex items-center gap-3 text-[11px]">
            <span class="flex items-center gap-1">
              <span class="w-2.5 h-2.5 bg-blue-500 rounded-xs"></span>
              <span>地表水</span>
            </span>
            <span class="flex items-center gap-1">
              <span class="w-2.5 h-2.5 bg-cyan-500 rounded-xs"></span>
              <span>地下水</span>
            </span>
            <span class="flex items-center gap-1 text-slate-400">
              <span class="w-2.5 h-2.5 bg-slate-200 rounded-xs"></span>
              <span>未填报</span>
            </span>
          </div>
        </div>

        <!-- 12-month visual bars -->
        <div class="h-32 flex items-end justify-between gap-1.5 pt-4 pb-1 px-2 border-b border-slate-200">
          <div
            v-for="mb in summary.monthlyBreakdown"
            :key="mb.month"
            class="flex-1 flex flex-col items-center h-full justify-end group relative"
          >
            <!-- Tooltip -->
            <div class="absolute -top-8 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10 shadow">
              {{ mb.monthLabel }}: {{ mb.totalWater.toFixed(2) }} 万m³
              ({{ mb.status === 'approved' ? '市审生效' : mb.status === 'pending_city' ? '待市审' : mb.status === 'draft' ? '草稿' : '未报' }})
            </div>

            <!-- Stacking bar -->
            <div class="w-full max-w-[32px] flex flex-col justify-end rounded-t overflow-hidden bg-slate-100 min-h-[4px]">
              <div
                v-if="mb.groundwater > 0"
                class="bg-cyan-500 w-full transition-all"
                :style="{ height: `${Math.min(70, mb.groundwater * 4.5)}px` }"
              ></div>
              <div
                v-if="mb.surfaceWater > 0"
                class="bg-blue-600 w-full transition-all"
                :style="{ height: `${Math.min(70, mb.surfaceWater * 4.5)}px` }"
              ></div>
            </div>

            <span class="text-[10px] text-slate-500 mt-1 font-mono font-medium">{{ mb.month }}月</span>
          </div>
        </div>
      </div>

      <!-- 4. 1-12 Month Detailed Ledger Table -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>证照全年度按月填报明细与支撑生效台账</span>
          </span>
          <span class="text-[11px] text-slate-500">
            仅审核通过记录计入年度支撑汇总
          </span>
        </div>

        <div class="overflow-x-auto border border-slate-200 rounded-xl bg-white">
          <table class="w-full text-left text-xs border-collapse">
            <thead class="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold text-[11px]">
              <tr>
                <th class="py-2 px-3 text-center w-12">月份</th>
                <th class="py-2 px-3">本月合计 (万m³)</th>
                <th class="py-2 px-3">地表水 (万m³)</th>
                <th class="py-2 px-3">地下水 (万m³)</th>
                <th class="py-2 px-3">非常规水 (万m³)</th>
                <th class="py-2 px-3 text-center">填报/审核状态</th>
                <th class="py-2 px-3 text-center">年度支撑生效</th>
                <th class="py-2 px-3 text-center">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              <tr
                v-for="mb in summary.monthlyBreakdown"
                :key="mb.month"
                :class="[
                  'hover:bg-blue-50/40 transition',
                  mb.isSupported ? 'bg-emerald-50/20' : ''
                ]"
              >
                <td class="py-2 px-3 text-center font-bold text-slate-800 font-mono">{{ mb.month }}月</td>
                <td class="py-2 px-3 font-mono font-bold" :class="mb.totalWater > 0 ? 'text-blue-700' : 'text-slate-300'">
                  {{ mb.totalWater > 0 ? mb.totalWater.toFixed(2) : '--' }}
                </td>
                <td class="py-2 px-3 font-mono" :class="mb.surfaceWater > 0 ? 'text-slate-800' : 'text-slate-300'">
                  {{ mb.surfaceWater > 0 ? mb.surfaceWater.toFixed(2) : '--' }}
                </td>
                <td class="py-2 px-3 font-mono" :class="mb.groundwater > 0 ? 'text-cyan-700' : 'text-slate-300'">
                  {{ mb.groundwater > 0 ? mb.groundwater.toFixed(2) : '--' }}
                </td>
                <td class="py-2 px-3 font-mono" :class="mb.unconventionalWater > 0 ? 'text-indigo-700' : 'text-slate-300'">
                  {{ mb.unconventionalWater > 0 ? mb.unconventionalWater.toFixed(2) : '--' }}
                </td>
                <td class="py-2 px-3 text-center">
                  <span
                    :class="[
                      'px-2 py-0.5 rounded-full text-[10.5px] font-medium inline-block border',
                      mb.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
                      mb.status === 'pending_city' ? 'bg-amber-50 text-amber-700 border-amber-300' :
                      mb.status === 'draft' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                      mb.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-300' :
                      'bg-gray-50 text-gray-400 border-gray-200'
                    ]"
                  >
                    {{ formatMonthStatus(mb.status) }}
                  </span>
                </td>
                <td class="py-2 px-3 text-center">
                  <span v-if="mb.isSupported" class="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>已生效支撑</span>
                  </span>
                  <span v-else-if="mb.status === 'pending_city'" class="text-amber-600 text-[11px]">待审中</span>
                  <span v-else class="text-slate-400 text-[11px]">未计入</span>
                </td>
                <td class="py-2 px-3 text-center">
                  <button
                    v-if="mb.reportId"
                    type="button"
                    @click="$emit('view-report-detail', mb.reportId)"
                    class="text-blue-600 hover:text-blue-800 font-medium text-[11px] cursor-pointer"
                  >
                    查看月报
                  </button>
                  <span v-else class="text-slate-300 text-[11px]">--</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 5. Official Archive Certification Stamp -->
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 font-bold text-xs">
            印
          </div>
          <div>
            <div class="font-bold text-slate-800 text-xs">西宁市取水许可水量年度核算数据支撑台账认证</div>
            <div class="text-[11px] text-slate-500">
              数据规范：依据《取水许可和水资源费征收管理条例》，县级按月填报并由市级审核终审入库。
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="handleExport"
            class="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium cursor-pointer flex items-center gap-1 text-xs"
          >
            <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>导出年度台账 (Excel)</span>
          </button>

          <button
            type="button"
            @click="handlePrint"
            class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer flex items-center gap-1 text-xs"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>打印核算台账</span>
          </button>
        </div>
      </div>
    </div>
  </t-drawer>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import type { LicenseAnnualSupportSummary } from '../../../../types';

defineProps<{
  visible: boolean;
  summary: LicenseAnnualSupportSummary | null;
}>();

defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'change-year', year: number): void;
  (e: 'view-report-detail', reportId: string): void;
}>();

function formatMonthStatus(status: string) {
  switch (status) {
    case 'approved': return '市审通过';
    case 'pending_city': return '待市审';
    case 'draft': return '县级草稿';
    case 'rejected': return '已退回';
    case 'unreported': return '未填报';
    default: return status;
  }
}

function handleExport() {
  MessagePlugin.success('已生成《取水许可证年度取用水核算台账.xlsx》，正在导出下载...');
}

function handlePrint() {
  MessagePlugin.info('已准备打印样式，调起系统打印窗口');
}
</script>
