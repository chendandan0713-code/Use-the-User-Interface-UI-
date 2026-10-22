<template>
  <div class="space-y-3">
    <!-- Filter & Action Bar -->
    <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-2.5 text-xs">
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex items-center gap-1.5">
          <span class="text-slate-500 font-medium">所属区县：</span>
          <select
            v-model="filterDistrict"
            class="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="全部">全部区县</option>
            <option value="湟中区">湟中区</option>
            <option value="湟源县">湟源县</option>
            <option value="大通县">大通县</option>
          </select>
        </div>

        <div class="flex items-center gap-1.5">
          <span class="text-slate-500 font-medium">审核状态：</span>
          <select
            v-model="filterStatus"
            class="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="全部">全部状态</option>
            <option value="draft">县级草稿</option>
            <option value="pending_city">待市级审核</option>
            <option value="approved">审核通过(已入库)</option>
            <option value="rejected">已退回</option>
          </select>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button
          v-if="currentRole === 'county'"
          type="button"
          @click="openAddModal"
          class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>区县填报畜禽用水核算</span>
        </button>

        <div class="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
          数据来源：<strong>各区县统计部门《国民经济与社会发展统计年鉴》年末存栏量</strong>
        </div>
      </div>
    </div>

    <!-- Summary Metrics Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">核算区县总数</span>
        <div class="text-xl font-bold font-mono text-slate-800 mt-0.5">
          {{ list.length }} <span class="text-xs font-normal text-slate-500">个区县</span>
        </div>
        <div class="text-[10px] text-slate-400 mt-0.5">湟中区、湟源县、大通县等牧业大县</div>
      </div>

      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">统计部门年末存栏总量</span>
        <div class="text-xl font-bold font-mono text-blue-700 mt-0.5">
          {{ totalStockSum.toLocaleString() }} <span class="text-xs font-normal text-slate-500">头/只</span>
        </div>
        <div class="text-[10px] text-blue-600 mt-0.5">经统计局年鉴凭证核实</div>
      </div>

      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">畜禽取用水量总计（万m³）</span>
        <div class="text-xl font-bold font-mono text-emerald-700 mt-0.5">
          {{ totalGrandWaterSum.toFixed(2) }} <span class="text-xs font-normal text-slate-500">万m³</span>
        </div>
        <div class="text-[10px] text-slate-500 mt-0.5">
          地表水 {{ totalSurfaceSum.toFixed(2) }} | 地下水 {{ totalGroundSum.toFixed(2) }}
        </div>
      </div>

      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">审核入库与复核</span>
        <div class="text-xl font-bold font-mono text-indigo-700 mt-0.5">
          {{ approvedCount }} <span class="text-xs font-normal text-slate-500">/ {{ list.length }} 通过</span>
        </div>
        <div class="text-[10px] text-amber-600 font-medium mt-0.5">待市级审核 {{ pendingCityCount }} 个区县</div>
      </div>
    </div>

    <!-- 畜禽用水核算填报核心展示区域 (规范模板) -->
    <div class="space-y-3">
      <div
        v-for="record in filteredList"
        :key="record.id"
        class="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden"
      >
        <!-- District Header Bar -->
        <div class="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-3">
            <span class="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span class="w-2 h-4 rounded bg-amber-500"></span>
              <span>{{ record.district }} 畜禽用水核算</span>
            </span>
            <span class="px-2 py-0.5 rounded text-[10.5px] bg-slate-200 text-slate-700 font-medium">
              {{ record.periodLabel }}
            </span>
            <span class="text-[11px] text-slate-500 hidden md:inline">
              数据来源：<strong class="text-slate-700">{{ record.dataSourceAgency }}</strong>
            </span>
          </div>

          <div class="flex items-center gap-2">
            <span
              v-if="record.status === 'approved'"
              class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300"
            >
              审核通过 (纳入市级汇总)
            </span>
            <span
              v-else-if="record.status === 'pending_city'"
              class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse"
            >
              待市级水行政主管部门审核
            </span>
            <span
              v-else
              class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700"
            >
              县级草稿
            </span>

            <!-- Actions -->
            <button
              v-if="(currentRole === 'city' || currentRole === 'province') && record.status === 'pending_city'"
              type="button"
              @click="openAuditModal(record)"
              class="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white font-medium cursor-pointer shadow-2xs"
            >
              市级审核
            </button>
            <button
              v-if="currentRole === 'county' && (record.status === 'draft' || record.status === 'rejected')"
              type="button"
              @click="submitToCity(record)"
              class="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer shadow-2xs"
            >
              上报市审
            </button>
          </div>
        </div>

        <!-- 规范模板表格 -->
        <div class="overflow-x-auto no-scrollbar">
          <table class="w-full text-left text-xs border-collapse border-spacing-0">
            <thead class="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200 text-[11px]">
              <tr>
                <th colspan="3" class="p-2 text-center bg-blue-50/80 border-r border-blue-200 text-blue-900 font-bold border-b border-blue-200">
                  畜禽养殖基础信息
                </th>
                <th colspan="3" class="p-2 text-center bg-emerald-50/80 border-r border-emerald-200 text-emerald-900 font-bold border-b border-emerald-200">
                  取用水量 (万m³)
                </th>
                <th rowspan="2" class="p-2.5 min-w-[140px] text-center border-r border-slate-200 bg-amber-50/50">
                  市级审核比对 (定额/直报)
                </th>
              </tr>
              <tr class="bg-slate-50/90 text-[10.5px]">
                <th class="p-2 border-r border-slate-200">牲畜种类</th>
                <th class="p-2 text-right border-r border-slate-200">年末存栏量 (头/只)</th>
                <th class="p-2 text-right border-r border-blue-200">单位牲畜日用水量 (L/头(只)·d)</th>

                <th class="p-2 text-right border-r border-slate-200">地表水 (万m³)</th>
                <th class="p-2 text-right border-r border-slate-200">地下水 (万m³)</th>
                <th class="p-2 text-right border-r border-emerald-200 font-bold text-emerald-800 bg-emerald-100/40">合计 (万m³)</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="item in record.items"
                :key="item.category"
                class="hover:bg-slate-50/80"
              >
                <!-- 牲畜种类 -->
                <td class="p-2.5 border-r border-slate-100">
                  <div class="font-bold text-slate-900">{{ item.categoryName }}</div>
                  <div class="text-[10.5px] text-slate-400">{{ item.examples }}</div>
                </td>

                <!-- 年末存栏量 -->
                <td class="p-2.5 text-right font-mono font-medium text-slate-800 border-r border-slate-100">
                  {{ item.yearEndStock.toLocaleString() }}
                </td>

                <!-- 单位牲畜日用水量 -->
                <td class="p-2.5 text-right font-mono text-blue-700 font-bold border-r border-blue-100">
                  {{ item.dailyWaterPerHead.toFixed(1) }}
                  <span class="text-[10px] text-slate-400 font-normal block">定额基准: {{ item.quotaStandardDaily }}</span>
                </td>

                <!-- 地表水 -->
                <td class="p-2.5 text-right font-mono text-slate-700 border-r border-slate-100">
                  {{ item.surfaceWater.toFixed(2) }}
                </td>

                <!-- 地下水 -->
                <td class="p-2.5 text-right font-mono text-cyan-700 font-semibold border-r border-slate-100">
                  {{ item.groundwater.toFixed(2) }}
                </td>

                <!-- 合计 -->
                <td class="p-2.5 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30 border-r border-emerald-100">
                  {{ item.totalWater.toFixed(2) }}
                </td>

                <!-- 定额偏差 -->
                <td class="p-2.5 border-r border-slate-100 text-[10.5px]">
                  <div class="flex items-center justify-between">
                    <span class="text-slate-500">定额比对:</span>
                    <span :class="Math.abs(item.quotaDeviation) > 20 ? 'text-rose-600 font-bold' : 'text-slate-700 font-mono'">
                      {{ item.quotaDeviation > 0 ? '+' : '' }}{{ item.quotaDeviation.toFixed(1) }}%
                    </span>
                  </div>
                </td>
              </tr>

              <!-- 汇总总计行 -->
              <tr class="bg-blue-50/40 font-bold text-slate-900">
                <td class="p-2.5 text-blue-900 border-r border-slate-200">
                  {{ record.district }} 汇总总计
                </td>
                <td class="p-2.5 text-right font-mono text-blue-900 border-r border-slate-200">
                  {{ record.totalYearEndStock.toLocaleString() }}
                </td>
                <td class="p-2.5 text-right text-slate-400 border-r border-blue-200 font-normal">
                  —
                </td>
                <td class="p-2.5 text-right font-mono text-slate-900 border-r border-slate-200">
                  {{ record.totalSurfaceWater.toFixed(2) }}
                </td>
                <td class="p-2.5 text-right font-mono text-cyan-800 border-r border-slate-200">
                  {{ record.totalGroundwater.toFixed(2) }}
                </td>
                <td class="p-2.5 text-right font-mono text-emerald-700 bg-emerald-100/50 border-r border-emerald-200 text-sm">
                  {{ record.grandTotalWater.toFixed(2) }}
                </td>
                <td class="p-2.5 text-[11px] text-slate-700">
                  直报比对: <strong>{{ record.directReportWater }}</strong> (偏差 {{ record.directReportDeviation }}%)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 畜禽填报弹窗 -->
    <t-dialog
      v-model:visible="addModalVisible"
      header="区、县级水行政主管部门 - 畜禽用水核算填报"
      width="780px"
      :footer="false"
      :close-on-overlay-click="false"
    >
      <div class="space-y-4 max-h-[75vh] overflow-y-auto pr-1 text-xs select-none">
        <div class="bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-blue-900 text-[11.5px] leading-relaxed">
          <strong>填报指引：</strong>年末存栏量需来自统计部门年鉴资料。分大牲畜、小牲畜、家禽填报日用水量与水源拆分（推算总用水量），提交后将进行定额比对（偏差超20%需说明）及直报系统一致性核验。
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-slate-600 mb-1 font-medium">填报区县 <span class="text-rose-500">*</span></label>
            <select
              v-model="newRecordDistrict"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="湟中区">湟中区</option>
              <option value="湟源县">湟源县</option>
              <option value="大通县">大通县</option>
            </select>
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">存栏量数据来源部门 <span class="text-rose-500">*</span></label>
            <input
              v-model="newRecordSource"
              type="text"
              placeholder="如：西宁市统计局农林牧渔业统计年鉴"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <!-- 3类牲畜数据录入卡片 -->
        <div class="space-y-3">
          <div
            v-for="(item, idx) in newRecordItems"
            :key="idx"
            class="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2"
          >
            <div class="font-bold text-slate-800 text-xs flex items-center justify-between">
              <span>{{ item.categoryName }} ({{ item.examples }})</span>
              <span class="text-[11px] text-blue-600 font-mono">
                小计用水: {{ (item.surfaceWater + item.groundwater).toFixed(2) }} 万m³
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label class="block text-slate-600 text-[11px] mb-1">年末存栏量 (头/只)</label>
                <input
                  v-model.number="item.yearEndStock"
                  type="number"
                  class="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                />
              </div>

              <div>
                <label class="block text-slate-600 text-[11px] mb-1">单位日用水量 (L/头·d)</label>
                <input
                  v-model.number="item.dailyWaterPerHead"
                  type="number"
                  step="0.1"
                  class="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-blue-700 font-bold"
                />
              </div>

              <div>
                <label class="block text-slate-600 text-[11px] mb-1">地表水水量 (万m³)</label>
                <input
                  v-model.number="item.surfaceWater"
                  type="number"
                  step="0.01"
                  class="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                />
              </div>

              <div>
                <label class="block text-slate-600 text-[11px] mb-1">地下水水量 (万m³)</label>
                <input
                  v-model.number="item.groundwater"
                  type="number"
                  step="0.01"
                  class="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-cyan-700 font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
          <button
            type="button"
            @click="addModalVisible = false"
            class="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            @click="saveNewRecord(true)"
            class="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition cursor-pointer shadow-2xs"
          >
            确认并上报市级审核
          </button>
        </div>
      </div>
    </t-dialog>

    <!-- 市级审核弹窗 -->
    <t-dialog
      v-model:visible="auditModalVisible"
      header="市级水行政主管部门审核 - 畜禽用水核算"
      width="720px"
      :footer="false"
      :close-on-overlay-click="false"
    >
      <div v-if="currentAuditRecord" class="space-y-3.5 max-h-[75vh] overflow-y-auto pr-1 text-xs">
        <div class="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-950">
          <div class="font-bold">【市级审核要求】</div>
          <div class="text-[11px] mt-0.5">
            ① 完整性审核：检查存栏量、水源类型完整性<br />
            ② 数据来源审核：复核年末存栏量是否源于统计部门资料<br />
            ③ 逻辑一致性：单位牲畜日用水量比对定额(偏差20%需备注)，与用水统计调查直报系统数据复核一致
          </div>
        </div>

        <div class="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
          <div>审核区县：<strong class="text-slate-900">{{ currentAuditRecord.district }}</strong> ({{ currentAuditRecord.periodLabel }})</div>
          <div>统计数据源：<span class="text-blue-700 font-medium">{{ currentAuditRecord.dataSourceAgency }}</span></div>
          <div>核算总取用水量：<strong class="text-emerald-700">{{ currentAuditRecord.grandTotalWater }} 万m³</strong> (直报量: {{ currentAuditRecord.directReportWater }} 万m³)</div>
        </div>

        <div>
          <label class="block text-slate-700 font-bold mb-1">市级水行政主管部门审核意见 <span class="text-rose-500">*</span></label>
          <textarea
            v-model="auditComment"
            rows="3"
            class="w-full bg-white border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            placeholder="若通过，标注审核通过并纳入汇总；若退回，请明确指出存栏量来源不实或数据偏差问题..."
          ></textarea>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-slate-200">
          <button
            type="button"
            @click="auditModalVisible = false"
            class="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            取消
          </button>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="submitAuditResult('reject')"
              class="px-4 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-300 hover:bg-rose-100 font-semibold cursor-pointer"
            >
              审核退回 (要求县级复核)
            </button>
            <button
              type="button"
              @click="submitAuditResult('pass')"
              class="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer shadow-2xs"
            >
              审核通过 (纳入市级畜禽用水汇总)
            </button>
          </div>
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { LivestockAccountingRecord, LivestockItem, IrrigationRoleLevel } from '../../../types';
import { initialLivestockRecords } from '../../../data/mockAccountingCategoriesData';

const props = defineProps<{
  currentRole: IrrigationRoleLevel;
}>();

const list = ref<LivestockAccountingRecord[]>([...initialLivestockRecords]);

const filterDistrict = ref<string>('全部');
const filterStatus = ref<string>('全部');

const filteredList = computed(() => {
  return list.value.filter((i) => {
    if (filterDistrict.value !== '全部' && i.district !== filterDistrict.value) return false;
    if (filterStatus.value !== '全部' && i.status !== filterStatus.value) return false;
    return true;
  });
});

const totalStockSum = computed(() => list.value.reduce((acc, c) => acc + c.totalYearEndStock, 0));
const totalGrandWaterSum = computed(() => list.value.reduce((acc, c) => acc + c.grandTotalWater, 0));
const totalSurfaceSum = computed(() => list.value.reduce((acc, c) => acc + c.totalSurfaceWater, 0));
const totalGroundSum = computed(() => list.value.reduce((acc, c) => acc + c.totalGroundwater, 0));
const approvedCount = computed(() => list.value.filter((i) => i.status === 'approved').length);
const pendingCityCount = computed(() => list.value.filter((i) => i.status === 'pending_city').length);

// 填报
const addModalVisible = ref(false);
const newRecordDistrict = ref('湟中区');
const newRecordSource = ref('西宁市湟中区统计局国民经济统计年鉴农林牧渔业篇');
const newRecordItems = ref<LivestockItem[]>([
  {
    category: 'large',
    categoryName: '大牲畜',
    examples: '马、牛、驴、骡等',
    yearEndStock: 95000,
    dailyWaterPerHead: 48.0,
    quotaStandardDaily: 50.0,
    quotaDeviation: -4.0,
    surfaceWater: 100.0,
    groundwater: 66.44,
    totalWater: 166.44,
  },
  {
    category: 'small',
    categoryName: '小牲畜',
    examples: '猪、羊等',
    yearEndStock: 310000,
    dailyWaterPerHead: 14.5,
    quotaStandardDaily: 15.0,
    quotaDeviation: -3.3,
    surfaceWater: 95.0,
    groundwater: 69.04,
    totalWater: 164.04,
  },
  {
    category: 'poultry',
    categoryName: '家禽',
    examples: '鸡、鸭、鹅等',
    yearEndStock: 800000,
    dailyWaterPerHead: 0.58,
    quotaStandardDaily: 0.60,
    quotaDeviation: -3.3,
    surfaceWater: 10.0,
    groundwater: 6.94,
    totalWater: 16.94,
  },
]);

function openAddModal() {
  addModalVisible.value = true;
}

function saveNewRecord(submitDirectly: boolean) {
  const stockTotal = newRecordItems.value.reduce((acc, c) => acc + c.yearEndStock, 0);
  const surfTotal = Number(newRecordItems.value.reduce((acc, c) => acc + c.surfaceWater, 0).toFixed(2));
  const groundTotal = Number(newRecordItems.value.reduce((acc, c) => acc + c.groundwater, 0).toFixed(2));
  const grandTotal = Number((surfTotal + groundTotal).toFixed(2));

  const newRec: LivestockAccountingRecord = {
    id: `live-${Date.now()}`,
    district: newRecordDistrict.value,
    year: 2026,
    periodLabel: '2026年度',
    dataSourceAgency: newRecordSource.value,
    hasStatisticalYearbookDoc: true,
    items: JSON.parse(JSON.stringify(newRecordItems.value)),
    totalYearEndStock: stockTotal,
    totalSurfaceWater: surfTotal,
    totalGroundwater: groundTotal,
    grandTotalWater: grandTotal,
    directReportWater: Number((grandTotal * 0.98).toFixed(2)),
    directReportDeviation: 2.0,
    status: submitDirectly ? 'pending_city' : 'draft',
    reporter: {
      name: '县级填报员',
      unit: `${newRecordDistrict.value}水务局水资源股`,
      time: new Date().toLocaleString(),
    },
    logs: [
      {
        id: `log-${Date.now()}`,
        action: '县级填报上报',
        operatorName: '县级填报员',
        roleName: `${newRecordDistrict.value}水务局`,
        time: new Date().toLocaleString(),
        statusAfter: submitDirectly ? 'pending_city' : 'draft',
      },
    ],
  };

  list.value.unshift(newRec);
  addModalVisible.value = false;
  MessagePlugin.success('畜禽用水核算已提交至市水行政主管部门审核');
}

function submitToCity(record: LivestockAccountingRecord) {
  record.status = 'pending_city';
  MessagePlugin.success(`${record.district}畜禽用水核算已提交市水行政主管部门`);
}

// 审核
const auditModalVisible = ref(false);
const currentAuditRecord = ref<LivestockAccountingRecord | null>(null);
const auditComment = ref('');

function openAuditModal(record: LivestockAccountingRecord) {
  currentAuditRecord.value = record;
  auditComment.value = '经核验统计部门年鉴资料，存栏量真实有效；各类牲畜日用水量符合定额，直报对比一致，审核通过。';
  auditModalVisible.value = true;
}

function submitAuditResult(result: 'pass' | 'reject') {
  if (!currentAuditRecord.value) return;
  if (!auditComment.value.trim()) {
    MessagePlugin.warning('请填写审核意见');
    return;
  }

  currentAuditRecord.value.status = result === 'pass' ? 'approved' : 'rejected';
  currentAuditRecord.value.cityAuditor = {
    name: '刘洪涛',
    unit: '西宁市水务局水资源管理科',
    time: new Date().toLocaleString(),
    result,
    comment: auditComment.value,
  };
  auditModalVisible.value = false;
  MessagePlugin.success(result === 'pass' ? '审核通过，已纳入市级畜禽用水核算汇总' : '已退回县级部门修改重报');
}
</script>
