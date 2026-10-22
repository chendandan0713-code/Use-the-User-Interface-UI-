<template>
  <div class="flex-1 flex flex-col min-w-0 min-h-0 overflow-y-auto p-3 sm:p-4 gap-3.5 bg-[#edf3fb] select-none text-slate-800">
    <!-- 1. Upper Section: 推送链路流转图 (Pipeline Flow Diagram) -->
    <PushPipelineFlow
      @filter-link="handleFlowFilterLink"
      @clear-filter="handleResetFilters"
      @trigger-batch-retry="handleOpenBatchRetryFailed"
    />

    <!-- 2. Lower Section: 推送计量列表数据卡片 (Measurement List Card) -->
    <div class="bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col overflow-hidden">
      <!-- 2.1 Search & Filter Toolbar -->
      <div class="p-3.5 sm:p-4 border-b border-slate-100 bg-slate-50/50 space-y-3">
        <!-- Filter Inputs Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
          <!-- Filter 1: 按日期 (水量时间) -->
          <div>
            <label class="block text-[11px] font-medium text-slate-500 mb-1">水量时间 (日期)</label>
            <div class="relative">
              <select
                v-model="filters.waterDate"
                class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 transition shadow-2xs"
              >
                <option value="">全部时间周期</option>
                <option value="2026-10-22">2026-10-22 (今日实时)</option>
                <option value="2026-10-21">2026-10-21 (昨日定额)</option>
                <option value="2026-10">2026-10 (月度归集)</option>
              </select>
            </div>
          </div>

          <!-- Filter 2: 计量编号 -->
          <div>
            <label class="block text-[11px] font-medium text-slate-500 mb-1">计量设施编号</label>
            <input
              type="text"
              v-model="filters.facilityCode"
              placeholder="如 241017001536..."
              class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 transition shadow-2xs placeholder:text-slate-400"
            />
          </div>

          <!-- Filter 3: 许可编号 -->
          <div>
            <label class="block text-[11px] font-medium text-slate-500 mb-1">取水许可证号</label>
            <input
              type="text"
              v-model="filters.permitNumber"
              placeholder="如 取水（青宁）字..."
              class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 transition shadow-2xs placeholder:text-slate-400"
            />
          </div>

          <!-- Filter 4: 数据接收方式 -->
          <div>
            <label class="block text-[11px] font-medium text-slate-500 mb-1">数据接收方式</label>
            <select
              v-model="filters.receiveMethod"
              class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 transition shadow-2xs"
            >
              <option value="">全部接收方式</option>
              <option value="协议归集">协议归集 (按日)</option>
              <option value="接口归集">接口归集 (按日)</option>
              <option value="人工归集">人工归集 (按月)</option>
            </select>
          </div>

          <!-- Filter 5: 汇集状态 -->
          <div>
            <label class="block text-[11px] font-medium text-slate-500 mb-1">汇集状态</label>
            <select
              v-model="filters.aggregationStatus"
              class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 transition shadow-2xs"
            >
              <option value="">全部汇集状态</option>
              <option value="汇集成功">汇集成功</option>
              <option value="汇集异常">汇集异常</option>
              <option value="待汇集">待汇集</option>
              <option value="解析失败">解析失败</option>
            </select>
          </div>

          <!-- Filter 6: 推送状态 -->
          <div>
            <label class="block text-[11px] font-medium text-slate-500 mb-1">推送国家平台状态</label>
            <select
              v-model="filters.pushStatus"
              class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 transition shadow-2xs"
            >
              <option value="">全部推送状态</option>
              <option value="推送成功">推送成功</option>
              <option value="推送失败">推送失败 / 异常</option>
              <option value="待推送">待推送队列</option>
              <option value="重新推送中">重新推送中</option>
            </select>
          </div>

          <!-- Filter 7: 行政区划 -->
          <div>
            <label class="block text-[11px] font-medium text-slate-500 mb-1">所属区县</label>
            <select
              v-model="filters.district"
              class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 transition shadow-2xs"
            >
              <option value="">全部区县</option>
              <option value="城东区">城东区</option>
              <option value="城中区">城中区</option>
              <option value="城西区">城西区</option>
              <option value="城北区">城北区</option>
              <option value="湟中区">湟中区</option>
              <option value="大通县">大通县</option>
              <option value="湟源县">湟源县</option>
            </select>
          </div>
        </div>

        <!-- Buttons Row & Quick Selection -->
        <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="handleSearch"
              class="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs font-medium shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>查询</span>
            </button>

            <button
              type="button"
              @click="handleResetFilters"
              class="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium transition cursor-pointer shadow-2xs"
            >
              重置
            </button>

            <span class="text-[11px] text-slate-400 ml-1">
              当前匹配数据：<strong class="text-blue-600 font-mono">{{ filteredRecords.length }}</strong> 处计量设施
            </span>
          </div>

          <!-- Batch Operations -->
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="openBatchPushModal"
              :disabled="selectedRecordIds.length === 0"
              class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs font-medium shadow-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              <span>批量推送 ({{ selectedRecordIds.length }})</span>
            </button>

            <button
              type="button"
              @click="handleExport"
              class="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium transition cursor-pointer shadow-2xs flex items-center gap-1"
            >
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>导出台账</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 2.2 Measurement Table -->
      <div class="overflow-x-auto min-h-[360px]">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
              <th class="py-2.5 px-3 w-10 text-center">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                  class="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>
              <th class="py-2.5 px-3 font-semibold whitespace-nowrap">水量时间</th>
              <th class="py-2.5 px-3 font-semibold min-w-[180px]">计量设施名称</th>
              <th class="py-2.5 px-3 font-semibold whitespace-nowrap">计量设施编号</th>
              <th class="py-2.5 px-3 font-semibold whitespace-nowrap">数据接收方式</th>
              <th class="py-2.5 px-3 font-semibold text-right whitespace-nowrap">水量 (m³)</th>
              <th class="py-2.5 px-3 font-semibold whitespace-nowrap">推送国家平台计划</th>
              <th class="py-2.5 px-3 font-semibold whitespace-nowrap">同步时间</th>
              <th class="py-2.5 px-3 font-semibold text-center whitespace-nowrap">汇集状态</th>
              <th class="py-2.5 px-3 font-semibold text-center whitespace-nowrap">推送状态</th>
              <th class="py-2.5 px-3 font-semibold text-center min-w-[140px] whitespace-nowrap">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr
              v-for="record in paginatedRecords"
              :key="record.id"
              class="hover:bg-blue-50/40 transition group"
              :class="selectedRecordIds.includes(record.id) ? 'bg-blue-50/60' : ''"
            >
              <!-- Checkbox -->
              <td class="py-2.5 px-3 text-center">
                <input
                  type="checkbox"
                  :value="record.id"
                  v-model="selectedRecordIds"
                  class="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </td>

              <!-- 水量时间 -->
              <td class="py-2.5 px-3 font-mono font-medium whitespace-nowrap text-slate-800">
                <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono">
                  {{ record.waterDate }}
                </span>
              </td>

              <!-- 计量设施名称 -->
              <td class="py-2.5 px-3">
                <div class="font-bold text-slate-900 group-hover:text-blue-600 transition">
                  {{ record.facilityName }}
                </div>
                <div class="text-[10.5px] text-slate-400 truncate mt-0.5" :title="record.waterOwner">
                  {{ record.waterOwner }} · {{ record.district }}
                </div>
              </td>

              <!-- 计量设施编号 -->
              <td class="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                <div>{{ record.facilityCode }}</div>
                <div class="text-[10.5px] text-slate-400 font-sans truncate">{{ record.permitNumber }}</div>
              </td>

              <!-- 数据接收方式 -->
              <td class="py-2.5 px-3 whitespace-nowrap">
                <span
                  class="px-2 py-0.5 rounded-full text-[11px] font-medium inline-flex items-center gap-1"
                  :class="getReceiveMethodBadge(record.receiveMethod)"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="getReceiveDotClass(record.receiveMethod)"></span>
                  {{ record.receiveMethod }}
                </span>
                <div class="text-[10px] text-slate-400 mt-0.5 font-mono">
                  {{ record.protocolType }}
                </div>
              </td>

              <!-- 水量 (m³) -->
              <td class="py-2.5 px-3 text-right font-mono font-bold whitespace-nowrap">
                <span :class="record.waterVolume > 0 ? 'text-blue-700' : 'text-slate-400'">
                  {{ (record.waterVolume || 0).toLocaleString() }}
                </span>
              </td>

              <!-- 推送国家平台计划 -->
              <td class="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                <div class="flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{{ record.pushPlan }}</span>
                </div>
              </td>

              <!-- 同步时间 -->
              <td class="py-2.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                {{ record.syncTime }}
              </td>

              <!-- 汇集状态 -->
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <span
                  class="px-2 py-0.5 rounded text-[11px] font-semibold"
                  :class="getAggregationBadge(record.aggregationStatus)"
                >
                  {{ record.aggregationStatus }}
                </span>
              </td>

              <!-- 推送状态 -->
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <div class="inline-flex items-center gap-1">
                  <span
                    class="px-2 py-0.5 rounded text-[11px] font-semibold"
                    :class="getPushStatusBadge(record.pushStatus)"
                  >
                    <span v-if="record.pushStatus === '重新推送中'" class="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-spin mr-1"></span>
                    {{ record.pushStatus }}
                  </span>
                </div>
                <div v-if="record.nationalReceiptNo" class="text-[9.5px] font-mono text-emerald-600 truncate max-w-[120px] mt-0.5" :title="record.nationalReceiptNo">
                  收条: {{ record.nationalReceiptNo.slice(-6) }}
                </div>
              </td>

              <!-- 操作 (重新推送 / 查看推送原因) -->
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <div class="flex items-center justify-center gap-2">
                  <!-- 重新推送 -->
                  <button
                    type="button"
                    @click="handleSingleRepush(record)"
                    :disabled="record.pushStatus === '重新推送中'"
                    class="text-blue-600 hover:text-blue-800 font-medium transition cursor-pointer flex items-center gap-1 disabled:opacity-50"
                    title="立即重发此数据至国家水资源信息管理平台"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="23 4 23 10 17 10"></polyline>
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                    <span>重新推送</span>
                  </button>

                  <span class="text-slate-300">|</span>

                  <!-- 查看推送原因 -->
                  <button
                    type="button"
                    @click="handleViewPushReason(record)"
                    class="text-indigo-600 hover:text-indigo-800 font-medium transition cursor-pointer flex items-center gap-1"
                    title="查看前置机交互日志、错误诊断与报文"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <span>查看推送原因</span>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="filteredRecords.length === 0">
              <td colspan="11" class="py-12 text-center text-slate-400">
                <div class="flex flex-col items-center justify-center space-y-2">
                  <svg class="w-10 h-10 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  <p class="text-xs">暂无符合条件的日水量推送记录</p>
                  <button
                    type="button"
                    @click="handleResetFilters"
                    class="text-xs text-blue-600 hover:underline font-medium cursor-pointer"
                  >
                    清空筛选重试
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 2.3 Pagination & Selection Bar -->
      <div class="px-4 py-3 border-t border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div class="flex items-center gap-2">
          <span>共 <strong class="font-mono text-slate-800">{{ filteredRecords.length }}</strong> 条记录</span>
          <span v-if="selectedRecordIds.length > 0" class="text-blue-600 font-medium">
            (已选中 {{ selectedRecordIds.length }} 项)
          </span>
        </div>

        <!-- Pagination Controls -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            上一页
          </button>
          <span class="font-mono">
            第 {{ currentPage }} / {{ totalPages }} 页
          </span>
          <button
            type="button"
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            下一页
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- 1. 查看推送原因模态框 -->
    <PushReasonModal
      v-model:visible="reasonModalVisible"
      :record="selectedRecordForModal"
      @repush="handleSingleRepush"
    />

    <!-- 2. 批量推送模态框 -->
    <PushBatchModal
      v-model:visible="batchModalVisible"
      :records="selectedRecordsList"
      @completed="handleBatchCompleted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next';
import type { PushPipelineRecord, PushPipelineFilterParams } from '../../../types';
import { initialPushPipelineRecords } from '../../../data/mockPushPipelineData';

import PushPipelineFlow from './PushPipelineFlow.vue';
import PushReasonModal from './PushReasonModal.vue';
import PushBatchModal from './PushBatchModal.vue';

// Master data
const records = ref<PushPipelineRecord[]>([...initialPushPipelineRecords]);

// Filters
const filters = reactive<PushPipelineFilterParams>({
  waterDate: '',
  facilityCode: '',
  permitNumber: '',
  aggregationStatus: '',
  receiveMethod: '',
  pushStatus: '',
  district: '',
});

// Selection
const selectedRecordIds = ref<string[]>([]);

// Modals
const reasonModalVisible = ref(false);
const batchModalVisible = ref(false);
const selectedRecordForModal = ref<PushPipelineRecord | null>(null);

// Pagination
const currentPage = ref(1);
const pageSize = ref(10);

// Filtered Records
const filteredRecords = computed(() => {
  return records.value.filter((r) => {
    // Water Date
    if (filters.waterDate && !r.waterDate.includes(filters.waterDate)) {
      return false;
    }
    // Facility Code
    if (filters.facilityCode.trim()) {
      const q = filters.facilityCode.trim().toLowerCase();
      if (!r.facilityCode.toLowerCase().includes(q)) return false;
    }
    // Permit Number
    if (filters.permitNumber.trim()) {
      const q = filters.permitNumber.trim().toLowerCase();
      if (!r.permitNumber.toLowerCase().includes(q)) return false;
    }
    // Receive Method
    if (filters.receiveMethod && r.receiveMethod !== filters.receiveMethod) {
      return false;
    }
    // Aggregation Status
    if (filters.aggregationStatus && r.aggregationStatus !== filters.aggregationStatus) {
      return false;
    }
    // Push Status
    if (filters.pushStatus && r.pushStatus !== filters.pushStatus) {
      return false;
    }
    // District
    if (filters.district && filters.district !== '全部' && filters.district !== '西宁市') {
      if (r.district !== filters.district) return false;
    }
    return true;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredRecords.value.length / pageSize.value) || 1;
});

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredRecords.value.slice(start, start + pageSize.value);
});

const selectedRecordsList = computed(() => {
  return records.value.filter((r) => selectedRecordIds.value.includes(r.id));
});

const isAllSelected = computed(() => {
  return (
    paginatedRecords.value.length > 0 &&
    paginatedRecords.value.every((r) => selectedRecordIds.value.includes(r.id))
  );
});

const toggleSelectAll = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked;
  if (checked) {
    const pageIds = paginatedRecords.value.map((r) => r.id);
    selectedRecordIds.value = Array.from(new Set([...selectedRecordIds.value, ...pageIds]));
  } else {
    const pageIds = paginatedRecords.value.map((r) => r.id);
    selectedRecordIds.value = selectedRecordIds.value.filter((id) => !pageIds.includes(id));
  }
};

// Filter Linkage from top Flowchart
const handleFlowFilterLink = (filter: {
  receiveMethod?: string;
  aggregationStatus?: string;
  pushStatus?: string;
  arrivalStatus?: string;
  label: string;
}) => {
  if (filter.receiveMethod) filters.receiveMethod = filter.receiveMethod;
  if (filter.aggregationStatus) filters.aggregationStatus = filter.aggregationStatus;
  if (filter.pushStatus) filters.pushStatus = filter.pushStatus;
  currentPage.value = 1;
  MessagePlugin.info(`已联动拓扑节点筛选：【${filter.label}】`);
};

const handleSearch = () => {
  currentPage.value = 1;
  MessagePlugin.info(`已执行检索，共筛选出 ${filteredRecords.value.length} 条计量设施推送记录`);
};

const handleResetFilters = () => {
  filters.waterDate = '';
  filters.facilityCode = '';
  filters.permitNumber = '';
  filters.aggregationStatus = '';
  filters.receiveMethod = '';
  filters.pushStatus = '';
  filters.district = '';
  selectedRecordIds.value = [];
  currentPage.value = 1;
  MessagePlugin.success('检索与拓扑联动条件已重置为全量数据');
};

// Actions
const handleSingleRepush = (record: PushPipelineRecord) => {
  const originalStatus = record.pushStatus;
  record.pushStatus = '重新推送中';

  setTimeout(() => {
    record.pushStatus = '推送成功';
    record.syncTime = '刚刚 (手动重推)';
    record.nationalReceiptNo = `NAT-RCV-${Date.now().toString().slice(-6)}`;
    if (record.pushReason) {
      record.pushReason.category = '重新推送成功';
      record.pushReason.summary = '手动触发国家平台前置通道重新上报成功';
      record.pushReason.code = 'NAT-200-SUCCESS';
      record.pushReason.diagnostics = '已刷新通道Token重新调用部平台前置网关，校验通过并已取得回执。';
      record.pushReason.solution = '';
    }
    MessagePlugin.success(`设施【${record.facilityName}】已成功重新报送国家水资源信息管理平台！`);
  }, 1000);
};

const handleViewPushReason = (record: PushPipelineRecord) => {
  selectedRecordForModal.value = record;
  reasonModalVisible.value = true;
};

const openBatchPushModal = () => {
  if (selectedRecordIds.value.length === 0) return;
  batchModalVisible.value = true;
};

const handleOpenBatchRetryFailed = () => {
  const failed = records.value.filter((r) => r.pushStatus === '推送失败');
  if (failed.length === 0) {
    MessagePlugin.info('当前暂无推送失败的设施记录');
    return;
  }
  selectedRecordIds.value = failed.map((r) => r.id);
  filters.pushStatus = '推送失败';
  batchModalVisible.value = true;
};

const handleBatchCompleted = (updated: PushPipelineRecord[]) => {
  const ids = updated.map((r) => r.id);
  records.value.forEach((r) => {
    if (ids.includes(r.id)) {
      r.pushStatus = '推送成功';
      r.syncTime = '刚刚 (批量推送)';
      r.nationalReceiptNo = `NAT-RCV-${Date.now().toString().slice(-6)}`;
    }
  });
  selectedRecordIds.value = [];
};

const handleExport = () => {
  const count = selectedRecordIds.value.length > 0 ? selectedRecordIds.value.length : filteredRecords.value.length;
  MessagePlugin.success(`正在导出 ${count} 条日水量国家平台推送台账Excel...`);
};

// Styling helper badges
const getReceiveMethodBadge = (method: string) => {
  switch (method) {
    case '协议归集':
      return 'bg-blue-50 text-blue-700 border border-blue-200/80';
    case '接口归集':
      return 'bg-cyan-50 text-cyan-700 border border-cyan-200/80';
    case '人工归集':
      return 'bg-amber-50 text-amber-800 border border-amber-200/80';
    default:
      return 'bg-slate-50 text-slate-700';
  }
};

const getReceiveDotClass = (method: string) => {
  switch (method) {
    case '协议归集':
      return 'bg-blue-500';
    case '接口归集':
      return 'bg-cyan-500';
    case '人工归集':
      return 'bg-amber-500';
    default:
      return 'bg-slate-400';
  }
};

const getAggregationBadge = (status: string) => {
  switch (status) {
    case '汇集成功':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200/80';
    case '汇集异常':
      return 'bg-rose-50 text-rose-700 border border-rose-200/80';
    case '解析失败':
      return 'bg-amber-50 text-amber-700 border border-amber-200/80';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};

const getPushStatusBadge = (status: string) => {
  switch (status) {
    case '推送成功':
      return 'bg-emerald-100 text-emerald-800 border border-emerald-300/60';
    case '推送失败':
      return 'bg-rose-100 text-rose-800 border border-rose-300/60';
    case '待推送':
      return 'bg-blue-100 text-blue-800 border border-blue-300/60';
    case '重新推送中':
      return 'bg-indigo-100 text-indigo-800 border border-indigo-300/60 animate-pulse';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};
</script>
