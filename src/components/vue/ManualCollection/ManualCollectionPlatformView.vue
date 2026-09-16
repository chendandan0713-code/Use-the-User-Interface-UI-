<template>
  <div class="flex-1 flex min-h-0 overflow-hidden p-3 gap-3 bg-[#edf3fb] select-none">
    <!-- Left District Tree Card (与计量设施管理页面统一联动) -->
    <WaterDistrictTree
      :selected-district="selectedDistrict"
      @select-district="handleDistrictSelect"
    />

    <!-- Right Manual Collection Workspace -->
    <div class="flex-1 flex flex-col min-w-0 min-h-0 gap-3 overflow-hidden">
      <!-- 1. Top Key Performance Metrics -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-2.5 shrink-0">
        <!-- Metric 1: 非在线设施总数 -->
        <div class="bg-white rounded-xl p-3 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">非在线设施总数</div>
            <div class="text-xl font-bold font-mono text-slate-800 mt-0.5">
              {{ filteredFacilities.length }} <span class="text-xs font-normal text-slate-400">处</span>
            </div>
            <div class="text-[10px] text-blue-600 mt-0.5">全域人工抄表监控设施</div>
          </div>
          <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </div>
        </div>

        <!-- Metric 2: 待审核填报工单 (重点高亮) -->
        <div class="bg-white rounded-xl p-3 border border-amber-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">待审核填报数据</div>
            <div class="text-xl font-bold font-mono text-amber-600 mt-0.5">
              {{ pendingAuditCount }} <span class="text-xs font-normal text-slate-400">单</span>
            </div>
            <div class="text-[10px] text-amber-600 mt-0.5">需水资源管理科复核</div>
          </div>
          <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
        </div>

        <!-- Metric 3: 已归集审核通过总量 -->
        <div class="bg-white rounded-xl p-3 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">已归集水量 (2026年)</div>
            <div class="text-xl font-bold font-mono text-emerald-600 mt-0.5">
              {{ (totalApprovedWaterVolume / 10000).toFixed(2) }} <span class="text-xs font-normal text-slate-400">万m³</span>
            </div>
            <div class="text-[10px] text-emerald-600 mt-0.5">经审核合格入库总量</div>
          </div>
          <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        <!-- Metric 4: 存在待补报期次设施 -->
        <div class="bg-white rounded-xl p-3 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">需补报设施数</div>
            <div class="text-xl font-bold font-mono text-indigo-600 mt-0.5">
              {{ needReportFacilitiesCount }} <span class="text-xs font-normal text-slate-400">处</span>
            </div>
            <div class="text-[10px] text-indigo-500 mt-0.5">支持按月/季度批量补报</div>
          </div>
          <div class="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
        </div>

        <!-- Metric 5: 审核归集办结率 -->
        <div class="bg-white rounded-xl p-3 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">归集审核通过率</div>
            <div class="text-xl font-bold font-mono text-slate-800 mt-0.5">
              {{ auditPassRate }} <span class="text-xs font-normal text-slate-400">%</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-0.5">严格凭证闭环审查</div>
          </div>
          <div class="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- 2. Main Workspace Container with Sub Tabs -->
      <div class="flex-1 min-h-0 bg-white border border-slate-200/90 rounded-xl shadow-2xs flex flex-col overflow-hidden">
        <!-- Sub-tabs Header -->
        <div class="h-11 px-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div class="flex items-center gap-2">
            <!-- Tab 1: 设施填报台账 -->
            <button
              type="button"
              @click="activeSubTab = 'facilities'"
              :class="[
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer',
                activeSubTab === 'facilities'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              ]"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              <span>非在线计量设施填报台账</span>
              <span class="px-1.5 py-0.2 rounded-full text-[10px]" :class="activeSubTab === 'facilities' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'">
                {{ filteredFacilities.length }}
              </span>
            </button>

            <!-- Tab 2: 归集数据审核工作台 -->
            <button
              type="button"
              @click="activeSubTab = 'audit'"
              :class="[
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer relative',
                activeSubTab === 'audit'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              ]"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 11 12 14 22 4"></polyline>
              </svg>
              <span>归集数据审核工作台</span>
              <span
                v-if="pendingAuditCount > 0"
                class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
                :class="activeSubTab === 'audit' ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-800 border border-amber-200'"
              >
                {{ pendingAuditCount }} 待审
              </span>
            </button>

            <!-- Tab 3: 历史台账与归集记录 -->
            <button
              type="button"
              @click="activeSubTab = 'history'"
              :class="[
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer',
                activeSubTab === 'history'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              ]"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span>数据归集历史台账 ({{ reportRecords.length }})</span>
            </button>
          </div>

          <!-- Quick Global Actions -->
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="handleExportCsv"
              class="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-md text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              <svg class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>导出归集Excel</span>
            </button>
          </div>
        </div>

        <!-- Tab 1 View: 非在线计量设施填报台账 -->
        <div v-show="activeSubTab === 'facilities'" class="flex-1 flex flex-col min-h-0 overflow-hidden p-3 gap-3">
          <!-- Filter Bar -->
          <div class="bg-slate-50/70 rounded-lg p-2.5 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div class="flex flex-wrap items-center gap-2">
              <div class="w-52">
                <t-input
                  v-model="facilityKeyword"
                  placeholder="搜索设施名称/编号/权人"
                  clearable
                  size="small"
                >
                  <template #prefix-icon>
                    <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </template>
                </t-input>
              </div>

              <!-- 周期配置筛选 -->
              <div class="w-36">
                <t-select
                  v-model="selectedCycleFilter"
                  placeholder="填报周期配置"
                  clearable
                  size="small"
                  :options="[
                    { label: '全部周期', value: 'all' },
                    { label: '按月填报', value: 'month' },
                    { label: '按季度填报', value: 'quarter' },
                    { label: '按年填报', value: 'year' },
                  ]"
                />
              </div>

              <!-- 填报进度状态 -->
              <div class="w-36">
                <t-select
                  v-model="selectedStatusFilter"
                  placeholder="填报进度状态"
                  clearable
                  size="small"
                  :options="[
                    { label: '全部状态', value: 'all' },
                    { label: '需补报/有未报期次', value: 'need_report' },
                    { label: '最新已齐备', value: 'up_to_date' },
                  ]"
                />
              </div>

              <button
                type="button"
                @click="resetFacilityFilters"
                class="px-2.5 py-1 text-slate-600 hover:text-slate-900 transition text-xs cursor-pointer"
              >
                重置
              </button>
            </div>

            <div class="text-[11px] text-slate-500">
              当前行政区划：<strong class="text-blue-600">{{ selectedDistrict }}</strong>
              <span class="ml-2">匹配到 {{ filteredFacilities.length }} 处非在线计量设施</span>
            </div>
          </div>

          <!-- Facilities Table -->
          <div class="flex-1 min-h-0 overflow-auto border border-slate-200 rounded-lg">
            <table class="w-full text-left text-xs border-collapse">
              <thead class="sticky top-0 bg-slate-100 z-10 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th class="py-2.5 px-3 w-10 text-center">#</th>
                  <th class="py-2.5 px-3">计量设施名称 / 编号</th>
                  <th class="py-2.5 px-3">取水权人 / 许可证号</th>
                  <th class="py-2.5 px-3 w-24">行政区划</th>
                  <th class="py-2.5 px-3 w-24">取水用途</th>
                  <th class="py-2.5 px-3 w-32">计量方式 / 型号</th>
                  <th class="py-2.5 px-3 w-28">填报周期配置</th>
                  <th class="py-2.5 px-3 w-28 text-right">在册底数 (m³)</th>
                  <th class="py-2.5 px-3 w-28">最近填报期次</th>
                  <th class="py-2.5 px-3 w-28 text-center">填报状态</th>
                  <th class="py-2.5 px-3 w-40 text-center">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200/80 bg-white">
                <tr
                  v-for="(fac, index) in filteredFacilities"
                  :key="fac.id"
                  class="hover:bg-blue-50/25 transition"
                >
                  <td class="py-2 px-3 text-center text-slate-400 font-mono">{{ index + 1 }}</td>
                  <td class="py-2 px-3">
                    <div class="font-bold text-slate-800 text-xs">{{ fac.name }}</div>
                    <div class="text-[10px] font-mono text-slate-500 mt-0.5">{{ fac.code }}</div>
                  </td>
                  <td class="py-2 px-3">
                    <div class="text-slate-800 font-medium truncate max-w-[180px]">{{ fac.waterOwner }}</div>
                    <div class="text-[10px] text-slate-500 truncate max-w-[180px]">{{ fac.permitNumber }}</div>
                  </td>
                  <td class="py-2 px-3">
                    <span class="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium">
                      {{ fac.district }}
                    </span>
                  </td>
                  <td class="py-2 px-3 text-slate-700">{{ fac.waterUsage }}</td>
                  <td class="py-2 px-3">
                    <div class="text-slate-800 font-medium">{{ fac.meteringMethod }}</div>
                    <div class="text-[10px] text-slate-400">{{ fac.specModel }}</div>
                  </td>
                  <td class="py-2 px-3">
                    <span
                      v-if="fac.reportCycle === 'month'"
                      class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      按月填报
                    </span>
                    <span
                      v-else-if="fac.reportCycle === 'quarter'"
                      class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 inline-flex items-center gap-1"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-cyan-600"></span>
                      按季度填报
                    </span>
                    <span
                      v-else
                      class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200 inline-flex items-center gap-1"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                      按年填报
                    </span>
                  </td>
                  <td class="py-2 px-3 text-right font-mono font-bold text-slate-700">
                    {{ fac.currentBaseReading.toLocaleString() }}
                  </td>
                  <td class="py-2 px-3 font-medium text-slate-700">
                    {{ fac.lastReportPeriod || '-' }}
                  </td>
                  <td class="py-2 px-3 text-center">
                    <span
                      v-if="getFacilityNeedReportCount(fac) > 0"
                      class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 inline-block"
                      :title="`尚有 ${getFacilityNeedReportCount(fac)} 期历史数据未填报`"
                    >
                      待补报 ({{ getFacilityNeedReportCount(fac) }}期)
                    </span>
                    <span
                      v-else
                      class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block"
                    >
                      最新已归集
                    </span>
                  </td>
                  <td class="py-2 px-3 text-center">
                    <div class="flex items-center justify-center gap-1.5">
                      <!-- 核心填报按钮: 点击直接调起支持按月/季/年以及批量提交的填报弹窗 -->
                      <button
                        type="button"
                        @click="openReportModal(fac)"
                        class="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs"
                        :title="getFacilityNeedReportCount(fac) > 1 ? '包含多期未报，可一键批量提交' : '人工抄表填报申报'"
                      >
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        <span>{{ getFacilityNeedReportCount(fac) > 1 ? '批量补报' : '人工填报' }}</span>
                      </button>

                      <!-- 配置周期按钮 -->
                      <button
                        type="button"
                        @click="openConfigModal(fac)"
                        class="p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer"
                        title="配置填报周期与责任人"
                      >
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tab 2 View: 归集数据审核工作台 (提交后数据需要审核) -->
        <div v-show="activeSubTab === 'audit'" class="flex-1 flex flex-col min-h-0 overflow-hidden p-3 gap-3">
          <!-- Audit Filters & Batch Actions Bar -->
          <div class="bg-slate-50/70 rounded-lg p-2.5 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div class="flex flex-wrap items-center gap-2">
              <div class="w-52">
                <t-input
                  v-model="auditKeyword"
                  placeholder="搜索单号/设施/权人/填报人"
                  clearable
                  size="small"
                >
                  <template #prefix-icon>
                    <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </template>
                </t-input>
              </div>

              <!-- 审核状态筛选 -->
              <div class="w-36">
                <t-select
                  v-model="selectedAuditStatus"
                  placeholder="审核状态"
                  size="small"
                  :options="[
                    { label: '全部状态', value: 'all' },
                    { label: '待审核 (需处理)', value: '待审核' },
                    { label: '审核通过 (已入库)', value: '已通过' },
                    { label: '已驳回 (退回重报)', value: '已驳回' },
                  ]"
                />
              </div>

              <!-- 周期筛选 -->
              <div class="w-32">
                <t-select
                  v-model="selectedAuditCycle"
                  placeholder="周期类型"
                  size="small"
                  :options="[
                    { label: '全部周期', value: 'all' },
                    { label: '月报', value: 'month' },
                    { label: '季报', value: 'quarter' },
                    { label: '年报', value: 'year' },
                  ]"
                />
              </div>

              <!-- 批量审核操作 (当勾选了待审核项时激活) -->
              <button
                v-if="selectedAuditIds.length > 0"
                type="button"
                @click="handleBatchApprove"
                class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>批量审核通过 ({{ selectedAuditIds.length }})</span>
              </button>

              <button
                v-if="selectedAuditIds.length > 0"
                type="button"
                @click="handleBatchReject"
                class="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-xs font-bold transition cursor-pointer"
              >
                批量驳回
              </button>
            </div>

            <div class="text-[11px] text-slate-500">
              共筛选出 <strong class="text-slate-800">{{ filteredAuditRecords.length }}</strong> 条申报单据
              （其中 <strong class="text-amber-600">{{ filteredAuditRecords.filter(r => r.auditStatus === '待审核').length }}</strong> 条待审核）
            </div>
          </div>

          <!-- Audit Records Table -->
          <div class="flex-1 min-h-0 overflow-auto border border-slate-200 rounded-lg">
            <table class="w-full text-left text-xs border-collapse">
              <thead class="sticky top-0 bg-slate-100 z-10 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th class="py-2.5 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      :checked="isAllSelected"
                      @change="handleToggleSelectAll"
                      class="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th class="py-2.5 px-3 w-28">归集单号</th>
                  <th class="py-2.5 px-3">申报计量设施 / 取水权人</th>
                  <th class="py-2.5 px-3 w-24">行政区划</th>
                  <th class="py-2.5 px-3 w-28">申报期次</th>
                  <th class="py-2.5 px-3 w-24 text-right">起码 (m³)</th>
                  <th class="py-2.5 px-3 w-24 text-right">止码 (m³)</th>
                  <th class="py-2.5 px-3 w-28 text-right">申报水量 (m³)</th>
                  <th class="py-2.5 px-3 w-28">填报人及电话</th>
                  <th class="py-2.5 px-3 w-32">提交时间</th>
                  <th class="py-2.5 px-3 w-24 text-center">审核状态</th>
                  <th class="py-2.5 px-3 w-28 text-center">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200/80 bg-white">
                <tr
                  v-for="record in filteredAuditRecords"
                  :key="record.id"
                  class="hover:bg-blue-50/25 transition"
                  :class="record.auditStatus === '待审核' ? 'bg-amber-50/20' : ''"
                >
                  <td class="py-2 px-3 text-center">
                    <input
                      type="checkbox"
                      :checked="selectedAuditIds.includes(record.id)"
                      @change="handleToggleSelectRecord(record.id)"
                      class="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td class="py-2 px-3 font-mono font-bold text-slate-700">
                    {{ record.recordNo }}
                    <span v-if="record.isBatch" class="block text-[10px] text-indigo-600 font-sans font-normal">
                      [批量补报]
                    </span>
                  </td>
                  <td class="py-2 px-3">
                    <div class="font-bold text-slate-800 text-xs">{{ record.facilityName }}</div>
                    <div class="text-[10px] text-slate-500 truncate max-w-[200px]">{{ record.waterOwner }}</div>
                  </td>
                  <td class="py-2 px-3 text-slate-600 font-medium">{{ record.district }}</td>
                  <td class="py-2 px-3">
                    <span class="font-bold text-blue-700">{{ record.periodLabel }}</span>
                  </td>
                  <td class="py-2 px-3 text-right font-mono text-slate-600">{{ record.startReading.toLocaleString() }}</td>
                  <td class="py-2 px-3 text-right font-mono text-slate-700">{{ record.endReading.toLocaleString() }}</td>
                  <td class="py-2 px-3 text-right font-mono font-bold text-emerald-600 text-xs">
                    {{ record.waterVolume.toLocaleString() }}
                  </td>
                  <td class="py-2 px-3">
                    <div class="text-slate-800 font-medium">{{ record.reporterName }}</div>
                    <div class="text-[10px] text-slate-400 font-mono">{{ record.reporterPhone }}</div>
                  </td>
                  <td class="py-2 px-3 text-[11px] text-slate-500 font-mono">
                    {{ record.submitTime }}
                  </td>
                  <td class="py-2 px-3 text-center">
                    <span
                      v-if="record.auditStatus === '待审核'"
                      class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 inline-flex items-center gap-1"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      待审核
                    </span>
                    <span
                      v-else-if="record.auditStatus === '已通过'"
                      class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-block"
                    >
                      已通过
                    </span>
                    <span
                      v-else
                      class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 inline-block"
                      :title="record.auditComment || '审核已退回'"
                    >
                      已驳回
                    </span>
                  </td>
                  <td class="py-2 px-3 text-center">
                    <button
                      type="button"
                      @click="openAuditModal(record)"
                      :class="[
                        'px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer',
                        record.auditStatus === '待审核'
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-2xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      ]"
                    >
                      {{ record.auditStatus === '待审核' ? '审核复核' : '查看流程' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tab 3 View: 数据归集历史总览台账 -->
        <div v-show="activeSubTab === 'history'" class="flex-1 flex flex-col min-h-0 overflow-hidden p-3 gap-3">
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-700">归集数据流转汇总分析</span>
              <span class="text-slate-400">|</span>
              <span class="text-slate-600">全部历史记录数：<strong>{{ reportRecords.length }}</strong> 笔</span>
              <span class="text-slate-400">|</span>
              <span class="text-emerald-700">已入库总水量：<strong>{{ totalApprovedWaterVolume.toLocaleString() }} m³</strong></span>
            </div>

            <div class="text-[11px] text-slate-500">
              数据源：非在线计量设施现场人工抄表与水务局逐级审核归集
            </div>
          </div>

          <!-- 历史明细流水列表 -->
          <div class="flex-1 min-h-0 overflow-auto border border-slate-200 rounded-lg">
            <table class="w-full text-left text-xs border-collapse">
              <thead class="sticky top-0 bg-slate-100 z-10 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th class="py-2.5 px-3 w-10 text-center">序号</th>
                  <th class="py-2.5 px-3 w-28">归集单号</th>
                  <th class="py-2.5 px-3">计量设施名称</th>
                  <th class="py-2.5 px-3">所属区县</th>
                  <th class="py-2.5 px-3">归集期次</th>
                  <th class="py-2.5 px-3 text-right">起码 (m³)</th>
                  <th class="py-2.5 px-3 text-right">止码 (m³)</th>
                  <th class="py-2.5 px-3 text-right">取水量 (m³)</th>
                  <th class="py-2.5 px-3 text-center">状态</th>
                  <th class="py-2.5 px-3">审核科室 / 人员</th>
                  <th class="py-2.5 px-3">审核时间</th>
                  <th class="py-2.5 px-3">审核批语</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200/80 bg-white">
                <tr
                  v-for="(rec, idx) in reportRecords"
                  :key="rec.id"
                  class="hover:bg-slate-50 transition"
                >
                  <td class="py-2 px-3 text-center text-slate-400 font-mono">{{ idx + 1 }}</td>
                  <td class="py-2 px-3 font-mono font-bold text-slate-700">{{ rec.recordNo }}</td>
                  <td class="py-2 px-3 font-medium text-slate-800">{{ rec.facilityName }}</td>
                  <td class="py-2 px-3 text-slate-600">{{ rec.district }}</td>
                  <td class="py-2 px-3 font-bold text-blue-700">{{ rec.periodLabel }}</td>
                  <td class="py-2 px-3 text-right font-mono text-slate-500">{{ rec.startReading.toLocaleString() }}</td>
                  <td class="py-2 px-3 text-right font-mono text-slate-600">{{ rec.endReading.toLocaleString() }}</td>
                  <td class="py-2 px-3 text-right font-mono font-bold text-emerald-600">{{ rec.waterVolume.toLocaleString() }}</td>
                  <td class="py-2 px-3 text-center">
                    <span
                      :class="[
                        'px-2 py-0.5 rounded-full text-[10px] font-bold inline-block',
                        rec.auditStatus === '已通过'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : rec.auditStatus === '待审核'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      ]"
                    >
                      {{ rec.auditStatus }}
                    </span>
                  </td>
                  <td class="py-2 px-3 text-slate-700">{{ rec.auditor || '-' }}</td>
                  <td class="py-2 px-3 font-mono text-[11px] text-slate-500">{{ rec.auditTime || '-' }}</td>
                  <td class="py-2 px-3 text-slate-500 truncate max-w-[200px]" :title="rec.auditComment">
                    {{ rec.auditComment || '-' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- 1. 人工填报弹窗 (支持按月/按季/按年，可批量提交当前月或者季度之前的数，已填报不可重报) -->
    <ManualReportModal
      v-model:visible="reportModalVisible"
      :facility="selectedFacility"
      :existing-records="reportRecords"
      @submit="handleSaveManualReport"
    />

    <!-- 2. 数据审核弹窗 (提交后数据需要审核) -->
    <ManualAuditModal
      v-model:visible="auditModalVisible"
      :record="selectedAuditRecord"
      @audit-completed="handleAuditCompleted"
    />

    <!-- 3. 设施填报周期与责任人配置弹窗 -->
    <FacilityConfigModal
      v-model:visible="configModalVisible"
      :facility="selectedFacility"
      @save="handleSaveFacilityConfig"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next';
import type { NonOnlineFacility, ManualReportRecord, ReportCycleType } from '../../../types';
import { initialNonOnlineFacilities, initialManualReportRecords } from '../../../mockManualCollectionData';

// Sub components
import WaterDistrictTree from '../WaterDistrictTree.vue';
import ManualReportModal from './ManualReportModal.vue';
import ManualAuditModal from './ManualAuditModal.vue';
import FacilityConfigModal from './FacilityConfigModal.vue';

const props = defineProps<{
  selectedDistrict: string;
}>();

const emit = defineEmits<{
  (e: 'select-district', district: string): void;
}>();

// State
const activeSubTab = ref<'facilities' | 'audit' | 'history'>('facilities');
const facilities = ref<NonOnlineFacility[]>([...initialNonOnlineFacilities]);
const reportRecords = ref<ManualReportRecord[]>([...initialManualReportRecords]);

// Modals
const reportModalVisible = ref(false);
const auditModalVisible = ref(false);
const configModalVisible = ref(false);
const selectedFacility = ref<NonOnlineFacility | null>(null);
const selectedAuditRecord = ref<ManualReportRecord | null>(null);

// Facilities Tab Filters
const facilityKeyword = ref('');
const selectedCycleFilter = ref('all');
const selectedStatusFilter = ref('all');

// Audit Tab Filters
const auditKeyword = ref('');
const selectedAuditStatus = ref('all');
const selectedAuditCycle = ref('all');
const selectedAuditIds = ref<string[]>([]);

// District selection
const handleDistrictSelect = (district: string) => {
  emit('select-district', district);
};

// 计算设施待补报期数
const getFacilityNeedReportCount = (fac: NonOnlineFacility) => {
  if (fac.reportCycle === 'month') {
    // 2026年 1至9月为应报期次
    let count = 0;
    for (let m = 1; m <= 9; m++) {
      const key = `2026-${String(m).padStart(2, '0')}`;
      const rec = reportRecords.value.find((r) => r.facilityId === fac.id && r.periodKey === key);
      // 如果没有记录或记录被驳回，则属于需补报
      if (!rec || rec.auditStatus === '已驳回') {
        count++;
      }
    }
    return count;
  } else if (fac.reportCycle === 'quarter') {
    // 2026年 Q1至Q3为应报期次
    let count = 0;
    ['2026-Q1', '2026-Q2', '2026-Q3'].forEach((k) => {
      const rec = reportRecords.value.find((r) => r.facilityId === fac.id && r.periodKey === k);
      if (!rec || rec.auditStatus === '已驳回') {
        count++;
      }
    });
    return count;
  } else {
    // 按年
    const rec = reportRecords.value.find((r) => r.facilityId === fac.id && r.periodKey === '2026-Y');
    return !rec || rec.auditStatus === '已驳回' ? 1 : 0;
  }
};

// Filtered Facilities
const filteredFacilities = computed(() => {
  return facilities.value.filter((fac) => {
    // District from left tree
    if (props.selectedDistrict && props.selectedDistrict !== '全部' && props.selectedDistrict !== '西宁市' && props.selectedDistrict !== '青海省') {
      if (fac.district !== props.selectedDistrict) return false;
    }

    // Keyword
    if (facilityKeyword.value.trim()) {
      const q = facilityKeyword.value.trim().toLowerCase();
      const matchName = fac.name.toLowerCase().includes(q);
      const matchCode = fac.code.toLowerCase().includes(q);
      const matchOwner = fac.waterOwner.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchOwner) return false;
    }

    // Cycle
    if (selectedCycleFilter.value && selectedCycleFilter.value !== 'all') {
      if (fac.reportCycle !== selectedCycleFilter.value) return false;
    }

    // Status (need report)
    if (selectedStatusFilter.value === 'need_report') {
      if (getFacilityNeedReportCount(fac) === 0) return false;
    } else if (selectedStatusFilter.value === 'up_to_date') {
      if (getFacilityNeedReportCount(fac) > 0) return false;
    }

    return true;
  });
});

// Filtered Audit Records
const filteredAuditRecords = computed(() => {
  return reportRecords.value.filter((rec) => {
    // District
    if (props.selectedDistrict && props.selectedDistrict !== '全部' && props.selectedDistrict !== '西宁市' && props.selectedDistrict !== '青海省') {
      if (rec.district !== props.selectedDistrict) return false;
    }

    // Keyword
    if (auditKeyword.value.trim()) {
      const q = auditKeyword.value.trim().toLowerCase();
      const matchNo = rec.recordNo.toLowerCase().includes(q);
      const matchName = rec.facilityName.toLowerCase().includes(q);
      const matchOwner = rec.waterOwner.toLowerCase().includes(q);
      const matchReporter = rec.reporterName.toLowerCase().includes(q);
      if (!matchNo && !matchName && !matchOwner && !matchReporter) return false;
    }

    // Audit status
    if (selectedAuditStatus.value && selectedAuditStatus.value !== 'all') {
      if (rec.auditStatus !== selectedAuditStatus.value) return false;
    }

    // Cycle
    if (selectedAuditCycle.value && selectedAuditCycle.value !== 'all') {
      if (rec.reportCycle !== selectedAuditCycle.value) return false;
    }

    return true;
  });
});

// Metrics
const pendingAuditCount = computed(() => {
  return reportRecords.value.filter((r) => r.auditStatus === '待审核').length;
});

const totalApprovedWaterVolume = computed(() => {
  return reportRecords.value
    .filter((r) => r.auditStatus === '已通过')
    .reduce((sum, r) => sum + (r.waterVolume || 0), 0);
});

const needReportFacilitiesCount = computed(() => {
  return facilities.value.filter((f) => getFacilityNeedReportCount(f) > 0).length;
});

const auditPassRate = computed(() => {
  const totalReviewed = reportRecords.value.filter((r) => r.auditStatus === '已通过' || r.auditStatus === '已驳回').length;
  if (totalReviewed === 0) return '100.0';
  const approved = reportRecords.value.filter((r) => r.auditStatus === '已通过').length;
  return ((approved / totalReviewed) * 100).toFixed(1);
});

// Audit selection
const isAllSelected = computed(() => {
  const currentList = filteredAuditRecords.value;
  if (currentList.length === 0) return false;
  return currentList.every((r) => selectedAuditIds.value.includes(r.id));
});

const handleToggleSelectAll = () => {
  const currentList = filteredAuditRecords.value;
  if (isAllSelected.value) {
    selectedAuditIds.value = [];
  } else {
    selectedAuditIds.value = currentList.map((r) => r.id);
  }
};

const handleToggleSelectRecord = (id: string) => {
  const idx = selectedAuditIds.value.indexOf(id);
  if (idx > -1) {
    selectedAuditIds.value.splice(idx, 1);
  } else {
    selectedAuditIds.value.push(id);
  }
};

// Facility Actions
const resetFacilityFilters = () => {
  facilityKeyword.value = '';
  selectedCycleFilter.value = 'all';
  selectedStatusFilter.value = 'all';
};

const openReportModal = (fac: NonOnlineFacility) => {
  selectedFacility.value = fac;
  reportModalVisible.value = true;
};

const openConfigModal = (fac: NonOnlineFacility) => {
  selectedFacility.value = fac;
  configModalVisible.value = true;
};

const openAuditModal = (rec: ManualReportRecord) => {
  selectedAuditRecord.value = rec;
  auditModalVisible.value = true;
};

// Handle Save Manual Report
const handleSaveManualReport = (newRecords: ManualReportRecord[]) => {
  // Add to records list
  reportRecords.value.unshift(...newRecords);

  // Update facility last reading & period
  if (selectedFacility.value && newRecords.length > 0) {
    const latestRecord = newRecords[newRecords.length - 1];
    const idx = facilities.value.findIndex((f) => f.id === selectedFacility.value!.id);
    if (idx !== -1) {
      facilities.value[idx].currentBaseReading = latestRecord.endReading;
      facilities.value[idx].lastReportPeriod = latestRecord.periodLabel;
      facilities.value[idx].lastReportDate = latestRecord.readingDate;
    }
  }

  // Also auto-switch or notify
  MessagePlugin.info(`已自动同步刷新填报台账，可在【归集数据审核工作台】中查看待审单据`);
};

// Handle Audit Completed
const handleAuditCompleted = (payload: {
  recordId: string;
  auditStatus: '已通过' | '已驳回';
  auditComment: string;
  auditor: string;
  auditTime: string;
}) => {
  const rec = reportRecords.value.find((r) => r.id === payload.recordId);
  if (rec) {
    rec.auditStatus = payload.auditStatus;
    rec.auditComment = payload.auditComment;
    rec.auditor = payload.auditor;
    rec.auditTime = payload.auditTime;
  }
};

// Handle Batch Approve
const handleBatchApprove = () => {
  const pendingSelected = reportRecords.value.filter(
    (r) => selectedAuditIds.value.includes(r.id) && r.auditStatus === '待审核'
  );

  if (pendingSelected.length === 0) {
    MessagePlugin.warning('选中的单据中没有处于【待审核】状态的记录！');
    return;
  }

  const dialog = DialogPlugin.confirm({
    header: '批量审核通过确认',
    body: `确定要将选中的 ${pendingSelected.length} 笔人工归集数据全部审核通过并归档入库吗？`,
    confirmBtn: '确认审核通过',
    cancelBtn: '取消',
    theme: 'primary',
    onConfirm: () => {
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
      pendingSelected.forEach((rec) => {
        rec.auditStatus = '已通过';
        rec.auditor = '西宁市水务局水资源管理科 / 王文斌';
        rec.auditTime = nowStr;
        rec.auditComment = '批量审查合格，数据递进无误，同意归集入库。';
      });
      selectedAuditIds.value = [];
      dialog.hide();
      MessagePlugin.success(`已成功批量审核通过 ${pendingSelected.length} 笔归集数据！`);
    }
  });
};

// Handle Batch Reject
const handleBatchReject = () => {
  const pendingSelected = reportRecords.value.filter(
    (r) => selectedAuditIds.value.includes(r.id) && r.auditStatus === '待审核'
  );

  if (pendingSelected.length === 0) {
    MessagePlugin.warning('选中的单据中没有处于【待审核】状态的记录！');
    return;
  }

  const dialog = DialogPlugin.confirm({
    header: '批量驳回确认',
    body: `确定要将选中的 ${pendingSelected.length} 笔申报数据批量退回并驳回吗？被驳回期次可重新修改填报。`,
    confirmBtn: '确认驳回',
    cancelBtn: '取消',
    theme: 'danger',
    onConfirm: () => {
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
      pendingSelected.forEach((rec) => {
        rec.auditStatus = '已驳回';
        rec.auditor = '西宁市水务局水资源管理科 / 王文斌';
        rec.auditTime = nowStr;
        rec.auditComment = '批量审核驳回：申报凭证材料存在异常，请核实后重提。';
      });
      selectedAuditIds.value = [];
      dialog.hide();
      MessagePlugin.warning(`已批量驳回 ${pendingSelected.length} 笔申报数据！`);
    }
  });
};

// Handle Save Facility Config
const handleSaveFacilityConfig = (payload: {
  facilityId: string;
  reportCycle: ReportCycleType;
  reporterName: string;
  reporterPhone: string;
  deadlineDesc: string;
  quotaVolume: number;
}) => {
  const idx = facilities.value.findIndex((f) => f.id === payload.facilityId);
  if (idx !== -1) {
    facilities.value[idx].reportCycle = payload.reportCycle;
    facilities.value[idx].reporterName = payload.reporterName;
    facilities.value[idx].reporterPhone = payload.reporterPhone;
    facilities.value[idx].deadlineDesc = payload.deadlineDesc;
    facilities.value[idx].quotaVolume = payload.quotaVolume;
  }
};

// Handle Export CSV
const handleExportCsv = () => {
  const headers = ['归集单号', '设施名称', '器具编码', '取水权人', '行政区划', '填报期次', '起码(m³)', '止码(m³)', '本期水量(m³)', '抄表日期', '填报人', '电话', '审核状态', '审核人', '审核时间'];
  const rows = reportRecords.value.map((r) => [
    r.recordNo,
    `"${r.facilityName}"`,
    `"${r.facilityCode}"`,
    `"${r.waterOwner}"`,
    r.district,
    r.periodLabel,
    r.startReading,
    r.endReading,
    r.waterVolume,
    r.readingDate,
    r.reporterName,
    r.reporterPhone,
    r.auditStatus,
    r.auditor || '-',
    r.auditTime || '-',
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `西宁市非在线计量设施人工归集数据台账_${new Date().toISOString().substring(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  MessagePlugin.success('已导出西宁市非在线计量设施人工归集数据完整Excel台账！');
};
</script>
