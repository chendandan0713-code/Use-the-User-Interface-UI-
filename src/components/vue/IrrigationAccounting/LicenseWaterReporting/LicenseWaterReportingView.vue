<template>
  <div class="space-y-4">
    <!-- 1. Top Role Mode Switcher & Integrated Architecture Banner -->
    <div class="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <!-- Title & Subtitle -->
        <div class="space-y-1">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-2xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
                <span>取水许可证照水量按月填报与审核</span>
                <span class="text-[11px] font-normal px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  市县一体化复用架构
                </span>
              </h2>
              <p class="text-xs text-slate-500">
                县级以证照维度按月填报取水量，市级统筹复核入库；审核通过数据直接作为年度汇总与红线考核的核心数据支撑。
              </p>
            </div>
          </div>
        </div>

        <!-- Role Mode Switcher (县级填报端 vs 市级审核端) - Explaining and executing user's reuse requirement -->
        <div class="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            @click="setRoleMode('county')"
            :class="[
              'px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer',
              currentRoleMode === 'county'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            ]"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>县级填报端</span>
          </button>

          <button
            type="button"
            @click="setRoleMode('city')"
            :class="[
              'px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer',
              currentRoleMode === 'city'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            ]"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>市级审核端</span>
            <span
              v-if="pendingCityAuditCount > 0"
              class="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold"
            >
              {{ pendingCityAuditCount }}
            </span>
          </button>
        </div>
      </div>

      <!-- Key KPI Metric Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 border-t border-slate-100 text-xs">
        <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div class="text-slate-500 text-[11px]">纳管取水许可证照</div>
          <div class="text-base font-bold font-mono text-slate-800 mt-0.5">
            {{ licenses.length }} <span class="text-[11px] font-normal text-slate-500">本</span>
          </div>
          <div class="text-[10px] text-slate-400 mt-0.5">湟中/大通/湟源等辖区</div>
        </div>

        <div class="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/80">
          <div class="text-blue-700 text-[11px] font-medium">年度生效数据支撑量</div>
          <div class="text-base font-bold font-mono text-blue-700 mt-0.5">
            {{ totalApprovedWaterVolume.toFixed(2) }} <span class="text-[11px] font-normal text-blue-600">万m³</span>
          </div>
          <div class="text-[10px] text-blue-500 mt-0.5">市级审核通过正式入库</div>
        </div>

        <div class="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
          <div class="text-amber-800 text-[11px] font-medium flex items-center justify-between">
            <span>待市级审核任务</span>
            <span v-if="pendingCityAuditCount > 0" class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          </div>
          <div class="text-base font-bold font-mono text-amber-800 mt-0.5">
            {{ pendingCityAuditCount }} <span class="text-[11px] font-normal text-amber-700">份</span>
          </div>
          <div class="text-[10px] text-amber-600 mt-0.5">县级已提交等待审核</div>
        </div>

        <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div class="text-slate-500 text-[11px]">县级草稿待提审</div>
          <div class="text-base font-bold font-mono text-slate-700 mt-0.5">
            {{ draftReportsCount }} <span class="text-[11px] font-normal text-slate-500">份</span>
          </div>
          <div class="text-[10px] text-slate-400 mt-0.5">县级暂存待完善凭证</div>
        </div>

        <div class="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
          <div class="text-emerald-800 text-[11px] font-medium">许可指标综合利用率</div>
          <div class="text-base font-bold font-mono text-emerald-800 mt-0.5">
            {{ overallUsageRatio.toFixed(1) }}%
          </div>
          <div class="text-[10px] text-emerald-600 mt-0.5">全部纳管证照年限额</div>
        </div>
      </div>
    </div>

    <!-- 2. Dual View Navigation Tabs: [按月填报与审核流转] vs [证照年度数据支撑大盘] -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-1">
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="activeSubView = 'monthly_reports'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer',
            activeSubView === 'monthly_reports'
              ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
          ]"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>按月填报与审核流转台账</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 font-mono">
            {{ filteredReports.length }}
          </span>
        </button>

        <button
          type="button"
          @click="activeSubView = 'annual_support'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer',
            activeSubView === 'annual_support'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
          ]"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
          <span>证照年度数据支撑大盘 (年度汇总支撑)</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-mono">
            {{ annualSummaries.length }} 本证照
          </span>
        </button>
      </div>

      <!-- Quick Action Buttons adapting to currentRoleMode -->
      <div class="flex items-center gap-2">
        <template v-if="currentRoleMode === 'county'">
          <button
            type="button"
            @click="handleOpenCreateReport"
            class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>+ 证照按月水量填报</span>
          </button>

          <button
            type="button"
            @click="handleBatchSubmitAudit"
            class="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
          >
            <span>批量提交市审</span>
          </button>
        </template>

        <template v-else>
          <button
            type="button"
            @click="handleBatchApprove"
            class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>批量初审通过并入库</span>
          </button>
        </template>

        <button
          type="button"
          @click="handleExportReports"
          class="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-medium flex items-center gap-1 transition cursor-pointer"
          title="导出报表"
        >
          <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>导出</span>
        </button>
      </div>
    </div>

    <!-- 3. Search & Filter Bar -->
    <div class="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs space-y-2 text-xs">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2.5">
        <!-- Year filter -->
        <div>
          <label class="block text-slate-500 text-[11px] mb-0.5">填报年度</label>
          <select
            v-model="filters.year"
            class="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="all">全部年度</option>
            <option value="2026">2026 年度</option>
            <option value="2025">2025 年度</option>
          </select>
        </div>

        <!-- Month filter (only for monthly subview) -->
        <div>
          <label class="block text-slate-500 text-[11px] mb-0.5">月份期次</label>
          <select
            v-model="filters.month"
            class="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="all">全部月份</option>
            <option v-for="m in 12" :key="m" :value="String(m)">{{ m }}月份</option>
          </select>
        </div>

        <!-- District filter -->
        <div>
          <label class="block text-slate-500 text-[11px] mb-0.5">所属区县</label>
          <select
            v-model="filters.district"
            class="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="all">全部区县</option>
            <option value="湟中区">湟中区</option>
            <option value="大通县">大通县</option>
            <option value="湟源县">湟源县</option>
            <option value="城东区">城东区</option>
            <option value="城中区">城中区</option>
            <option value="城西区">城西区</option>
            <option value="城北区">城北区</option>
          </select>
        </div>

        <!-- Status filter -->
        <div>
          <label class="block text-slate-500 text-[11px] mb-0.5">流转审核状态</label>
          <select
            v-model="filters.status"
            class="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="all">全部状态</option>
            <option value="pending_city">待市级审核</option>
            <option value="approved">市级已通过 (生效)</option>
            <option value="draft">县级草稿</option>
            <option value="rejected">市级已退回</option>
          </select>
        </div>

        <!-- Water Source Type -->
        <div>
          <label class="block text-slate-500 text-[11px] mb-0.5">水源类型</label>
          <select
            v-model="filters.waterSourceType"
            class="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="all">全部水源</option>
            <option value="地表水">地表水</option>
            <option value="地下水">地下水</option>
            <option value="混合水源">混合水源</option>
          </select>
        </div>

        <!-- Search Keyword -->
        <div>
          <label class="block text-slate-500 text-[11px] mb-0.5">证照编号/权人/工程</label>
          <div class="relative">
            <input
              v-model="filters.keyword"
              type="text"
              placeholder="搜索证照或权人..."
              class="w-full bg-slate-50 border border-slate-200 rounded-md pl-2 pr-6 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
            <button
              v-if="filters.keyword"
              type="button"
              @click="filters.keyword = ''"
              class="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== VIEW 1: 按月填报与审核流转台账 (Monthly Reports Table) ==================== -->
    <div v-if="activeSubView === 'monthly_reports'" class="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold text-[11px]">
            <tr>
              <th class="py-2.5 px-3 w-8 text-center">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                  class="rounded text-blue-600"
                />
              </th>
              <th class="py-2.5 px-3">填报期次</th>
              <th class="py-2.5 px-3">取水许可证照与工程</th>
              <th class="py-2.5 px-3">所属区县</th>
              <th class="py-2.5 px-3 text-right">申报水量 (万m³)</th>
              <th class="py-2.5 px-3">水源结构 (地表/地下/再生)</th>
              <th class="py-2.5 px-3">月度限额与预警</th>
              <th class="py-2.5 px-3">佐证凭证</th>
              <th class="py-2.5 px-3 text-center">审核状态</th>
              <th class="py-2.5 px-3 text-center">经办人与机构</th>
              <th class="py-2.5 px-3 text-center w-36">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr
              v-for="rep in filteredReports"
              :key="rep.id"
              :class="[
                'hover:bg-blue-50/30 transition',
                selectedReportIds.includes(rep.id) ? 'bg-blue-50/50' : ''
              ]"
            >
              <!-- Checkbox -->
              <td class="py-2.5 px-3 text-center">
                <input
                  type="checkbox"
                  :value="rep.id"
                  v-model="selectedReportIds"
                  class="rounded text-blue-600"
                />
              </td>

              <!-- Period -->
              <td class="py-2.5 px-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                {{ rep.periodLabel }}
              </td>

              <!-- License & Owner -->
              <td class="py-2.5 px-3">
                <div class="font-semibold text-slate-900 hover:text-blue-600 cursor-pointer" @click="handleOpenAnnualDrawerByLicenseId(rep.licenseId)">
                  {{ rep.licenseName }}
                </div>
                <div class="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <span class="font-mono text-slate-600">{{ rep.permitNumber }}</span>
                  <span>·</span>
                  <span class="text-slate-700 font-medium">{{ rep.waterOwner }}</span>
                </div>
              </td>

              <!-- District & Industry -->
              <td class="py-2.5 px-3 whitespace-nowrap">
                <div class="font-medium text-slate-800">{{ rep.district }}</div>
                <div class="text-[10px] text-slate-400">{{ rep.industryType }}</div>
              </td>

              <!-- Total Water -->
              <td class="py-2.5 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                <span class="text-sm text-blue-700">{{ rep.totalWater.toFixed(2) }}</span>
                <span class="text-[10px] text-slate-400 font-normal ml-0.5">万m³</span>
              </td>

              <!-- Breakdown -->
              <td class="py-2.5 px-3 text-[11px] whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <span title="地表水" class="text-slate-800">表: {{ rep.surfaceWater.toFixed(1) }}</span>
                  <span title="地下水" class="text-cyan-700 font-medium">井: {{ rep.groundwater.toFixed(1) }}</span>
                  <span v-if="rep.unconventionalWater" title="非常规水" class="text-indigo-600">再: {{ rep.unconventionalWater.toFixed(1) }}</span>
                </div>
                <div class="text-[10px] text-slate-400 mt-0.5">表底: {{ rep.prevMeterReading }}→{{ rep.currentMeterReading }}</div>
              </td>

              <!-- Quota & Warning -->
              <td class="py-2.5 px-3 whitespace-nowrap">
                <div class="text-[11px] text-slate-600">
                  限额: <span class="font-mono">{{ rep.monthlyQuota.toFixed(1) }}万m³</span>
                </div>
                <div class="mt-0.5">
                  <span
                    v-if="rep.quotaWarning === 'exceeded'"
                    class="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 flex items-center gap-0.5 w-fit"
                  >
                    <span>● 超月限额</span>
                  </span>
                  <span
                    v-else-if="rep.quotaWarning === 'near_limit'"
                    class="px-1.5 py-0.2 rounded text-[10px] font-medium bg-amber-100 text-amber-800 border border-amber-200 w-fit inline-block"
                  >
                    接近限额
                  </span>
                  <span v-else class="text-[10px] text-emerald-600 font-medium">指标正常</span>
                </div>
              </td>

              <!-- Vouchers -->
              <td class="py-2.5 px-3 whitespace-nowrap">
                <button
                  type="button"
                  @click="handleViewDetail(rep)"
                  class="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <svg class="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                  <span>{{ rep.voucherFiles?.length || 0 }} 份凭证</span>
                </button>
              </td>

              <!-- Status -->
              <td class="py-2.5 px-3 text-center whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-0.5 rounded-full text-[10.5px] font-medium inline-block border',
                    rep.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold' :
                    rep.status === 'pending_city' ? 'bg-amber-50 text-amber-700 border-amber-300 font-semibold animate-pulse' :
                    rep.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-300 font-medium' :
                    'bg-slate-100 text-slate-600 border-slate-300'
                  ]"
                >
                  {{ statusText(rep.status) }}
                </span>
                <div v-if="rep.isUsedForAnnualSummary" class="text-[9.5px] text-emerald-600 font-bold mt-0.5">
                  ✓ 已入库支撑
                </div>
              </td>

              <!-- Operator info -->
              <td class="py-2.5 px-3 text-center text-[11px] whitespace-nowrap">
                <div class="text-slate-800 font-medium">{{ rep.reporter?.name }}</div>
                <div class="text-[10px] text-slate-400">{{ rep.reporter?.unit }}</div>
                <div v-if="rep.cityAuditor" class="text-[10px] text-indigo-600 font-medium mt-0.5">
                  审核人: {{ rep.cityAuditor.name }}
                </div>
              </td>

              <!-- Actions (Adaptive according to currentRoleMode and report status) -->
              <td class="py-2.5 px-3 text-center whitespace-nowrap space-x-1">
                <!-- 1. Detail button (available to both) -->
                <button
                  type="button"
                  @click="handleViewDetail(rep)"
                  class="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                  详情
                </button>

                <!-- 2. When in City mode and status is pending_city -->
                <template v-if="currentRoleMode === 'city'">
                  <button
                    v-if="rep.status === 'pending_city'"
                    type="button"
                    @click="handleOpenAudit(rep)"
                    class="px-2 py-0.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 cursor-pointer text-[11px]"
                  >
                    审核
                  </button>
                  <button
                    v-else-if="rep.status === 'approved'"
                    type="button"
                    @click="handleOpenAnnualDrawerByLicenseId(rep.licenseId)"
                    class="text-emerald-700 hover:text-emerald-900 font-medium cursor-pointer"
                  >
                    台账
                  </button>
                </template>

                <!-- 3. When in County mode -->
                <template v-if="currentRoleMode === 'county'">
                  <button
                    v-if="rep.status === 'draft' || rep.status === 'rejected'"
                    type="button"
                    @click="handleEditReport(rep)"
                    class="text-amber-600 hover:text-amber-800 font-medium cursor-pointer"
                  >
                    编辑
                  </button>
                  <button
                    v-if="rep.status === 'draft'"
                    type="button"
                    @click="handleSubmitSingleToAudit(rep)"
                    class="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    提审
                  </button>
                  <button
                    v-if="rep.status === 'pending_city'"
                    type="button"
                    @click="handleWithdrawReport(rep)"
                    class="text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
                    title="撤回修改"
                  >
                    撤回
                  </button>
                </template>

                <!-- View Annual support ledger -->
                <button
                  type="button"
                  @click="handleOpenAnnualDrawerByLicenseId(rep.licenseId)"
                  class="text-slate-500 hover:text-blue-600 cursor-pointer"
                  title="查看该证照年度数据支撑大盘"
                >
                  年台账
                </button>
              </td>
            </tr>

            <tr v-if="filteredReports.length === 0">
              <td colspan="11" class="py-8 text-center text-slate-400">
                暂无符合筛选条件的证照按月水量填报单据
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ==================== VIEW 2: 证照年度数据支撑大盘 (Annual Support Matrix & Aggregation) ==================== -->
    <div v-else class="space-y-4">
      <!-- Explanatory Guide Box for Annual Support -->
      <div class="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <div class="font-bold text-slate-800 text-sm">
              {{ currentFilterYear }} 年度取水许可证照核算数据支撑台账大盘
            </div>
            <div class="text-slate-600 text-[11px] mt-0.5">
              县级按月填报、市级复核通过的水量自动汇聚至各证照年度台账。每年年末进行年度用水总结、指标红线考核时，直接引用本大盘作为真实合规的数据支撑。
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-slate-500 text-[11px]">切换考核年度：</span>
          <select
            v-model="filters.year"
            class="bg-white border border-emerald-300 text-emerald-800 font-bold rounded-md px-2 py-1 text-xs focus:outline-none"
          >
            <option value="2026">2026 年度 (执行中)</option>
            <option value="2025">2025 年度 (全归档支撑)</option>
          </select>
        </div>
      </div>

      <!-- Annual Summary Matrix Table -->
      <div class="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead class="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold text-[11px]">
              <tr>
                <th class="py-2.5 px-3">许可证照与工程</th>
                <th class="py-2.5 px-3">所属区县</th>
                <th class="py-2.5 px-3">年许可总量</th>
                <th class="py-2.5 px-3">已核准生效量 (年度支撑)</th>
                <th class="py-2.5 px-3">年指标执行进度</th>
                <th class="py-2.5 px-3">1~12月月度填报与审核支撑分布状态矩阵</th>
                <th class="py-2.5 px-3 text-center">审核月数</th>
                <th class="py-2.5 px-3 text-center w-28">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              <tr
                v-for="ann in annualSummaries"
                :key="ann.licenseId"
                class="hover:bg-blue-50/30 transition"
              >
                <!-- License Info -->
                <td class="py-2.5 px-3">
                  <div class="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{{ ann.licenseName }}</span>
                    <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {{ ann.waterSourceType }}
                    </span>
                  </div>
                  <div class="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span class="font-mono text-slate-600">{{ ann.permitNumber }}</span>
                    <span>·</span>
                    <span>{{ ann.waterOwner }}</span>
                  </div>
                </td>

                <!-- District -->
                <td class="py-2.5 px-3 whitespace-nowrap">
                  <span class="font-semibold text-slate-800">{{ ann.district }}</span>
                </td>

                <!-- Annual Quota -->
                <td class="py-2.5 px-3 font-mono font-bold text-slate-800 whitespace-nowrap">
                  {{ ann.annualQuota.toFixed(2) }} <span class="text-[10px] font-normal text-slate-400">万m³</span>
                </td>

                <!-- Total Approved Water (Data support) -->
                <td class="py-2.5 px-3 whitespace-nowrap">
                  <div class="font-mono font-bold text-emerald-700 text-sm">
                    {{ ann.totalApprovedWater.toFixed(2) }} <span class="text-[10px] font-normal text-slate-400">万m³</span>
                  </div>
                  <div class="text-[10px] text-slate-400">
                    井: {{ ann.groundwaterTotal.toFixed(1) }} / 表: {{ ann.surfaceWaterTotal.toFixed(1) }}
                  </div>
                </td>

                <!-- Progress & Alert level -->
                <td class="py-2.5 px-3 whitespace-nowrap w-36">
                  <div class="flex items-center justify-between text-[11px] mb-1">
                    <span class="font-mono font-bold" :class="ann.usageRatio >= 100 ? 'text-red-600' : 'text-slate-800'">
                      {{ ann.usageRatio.toFixed(1) }}%
                    </span>
                    <span
                      v-if="ann.quotaAlertLevel === 'danger'"
                      class="text-[9.5px] px-1 rounded bg-red-100 text-red-700 font-bold"
                    >
                      超额
                    </span>
                    <span
                      v-else-if="ann.quotaAlertLevel === 'warning'"
                      class="text-[9.5px] px-1 rounded bg-amber-100 text-amber-700 font-bold"
                    >
                      预警
                    </span>
                    <span v-else class="text-[9.5px] text-emerald-600 font-medium">正常</span>
                  </div>
                  <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      class="h-1.5 rounded-full transition-all"
                      :class="ann.usageRatio >= 100 ? 'bg-red-500' : ann.usageRatio >= 80 ? 'bg-amber-500' : 'bg-emerald-500'"
                      :style="{ width: `${Math.min(100, ann.usageRatio)}%` }"
                    ></div>
                  </div>
                </td>

                <!-- 1-12 Month Status Matrix Indicators -->
                <td class="py-2.5 px-3">
                  <div class="flex items-center gap-1">
                    <div
                      v-for="mb in ann.monthlyBreakdown"
                      :key="mb.month"
                      class="flex flex-col items-center group relative cursor-pointer"
                      @click="mb.reportId ? handleViewDetailById(mb.reportId) : null"
                    >
                      <!-- Matrix Dot -->
                      <div
                        :class="[
                          'w-4 h-5 rounded-xs flex items-center justify-center text-[9px] font-mono font-bold transition',
                          mb.status === 'approved' ? 'bg-emerald-600 text-white shadow-2xs' :
                          mb.status === 'pending_city' ? 'bg-amber-400 text-amber-950 animate-pulse' :
                          mb.status === 'draft' ? 'bg-slate-300 text-slate-800' :
                          mb.status === 'rejected' ? 'bg-red-500 text-white' :
                          'bg-slate-100 text-slate-300 border border-dashed border-slate-300'
                        ]"
                      >
                        {{ mb.month }}
                      </div>

                      <!-- Tooltip -->
                      <div class="absolute -top-7 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-20 shadow">
                        {{ mb.month }}月: {{ mb.totalWater > 0 ? mb.totalWater.toFixed(1) + '万m³' : '未报' }}
                        ({{ mb.status === 'approved' ? '市审生效' : mb.status === 'pending_city' ? '待市审' : mb.status === 'draft' ? '草稿' : '未填报' }})
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Approved months count -->
                <td class="py-2.5 px-3 text-center whitespace-nowrap font-mono">
                  <span class="text-emerald-700 font-bold">{{ ann.approvedMonthsCount }}</span>
                  <span class="text-slate-400"> / 12</span>
                </td>

                <!-- Actions -->
                <td class="py-2.5 px-3 text-center whitespace-nowrap">
                  <button
                    type="button"
                    @click="handleOpenAnnualDrawer(ann)"
                    class="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs border border-blue-200 transition cursor-pointer"
                  >
                    查看年度台账
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modals and Drawers -->
    <!-- 1. County Reporting Modal -->
    <LicenseWaterReportModal
      v-model:visible="showReportModal"
      :licenses="licenses"
      :edit-record="editingRecord"
      @submit="handleSaveReport"
    />

    <!-- 2. City Audit Modal -->
    <LicenseWaterAuditModal
      v-model:visible="showAuditModal"
      :record="auditingRecord"
      @audit="handleAuditComplete"
    />

    <!-- 3. Detail Modal -->
    <LicenseReportDetailModal
      v-model:visible="showDetailModal"
      :record="detailRecord"
    />

    <!-- 4. Annual Support Drawer -->
    <LicenseAnnualSupportDrawer
      v-model:visible="showAnnualDrawer"
      :summary="activeAnnualSummary"
      @change-year="handleDrawerChangeYear"
      @view-report-detail="handleViewDetailById"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type {
  WaterPermitLicenseDimension,
  LicenseMonthlyWaterReport,
  LicenseAnnualSupportSummary,
  UserRole,
} from '../../../../types';
import {
  initialWaterPermitLicenses,
  initialLicenseMonthlyReports,
  generateLicenseAnnualSummary,
} from '../../../../data/mockLicenseWaterReportData';
import LicenseWaterReportModal from './LicenseWaterReportModal.vue';
import LicenseWaterAuditModal from './LicenseWaterAuditModal.vue';
import LicenseReportDetailModal from './LicenseReportDetailModal.vue';
import LicenseAnnualSupportDrawer from './LicenseAnnualSupportDrawer.vue';

const props = defineProps<{
  currentRole?: UserRole;
}>();

const emit = defineEmits<{
  (e: 'role-change', role: UserRole): void;
}>();

// Mode: county (县级填报端) vs city (市级审核端)
const currentRoleMode = ref<'county' | 'city'>(
  props.currentRole === 'city' || props.currentRole === 'province' ? 'city' : 'county'
);

function setRoleMode(mode: 'county' | 'city') {
  currentRoleMode.value = mode;
  emit('role-change', mode as UserRole);
  MessagePlugin.info(`已切换至【${mode === 'county' ? '县级水量填报端' : '市级水量审核端'}】`);
}

// Subview: 'monthly_reports' (按月填报流转) vs 'annual_support' (证照年度数据支撑大盘)
const activeSubView = ref<'monthly_reports' | 'annual_support'>('monthly_reports');

// State data
const licenses = ref<WaterPermitLicenseDimension[]>([...initialWaterPermitLicenses]);
const reports = ref<LicenseMonthlyWaterReport[]>([...initialLicenseMonthlyReports]);

// Search & Filter state
const filters = reactive({
  year: '2026',
  month: 'all',
  district: 'all',
  status: 'all',
  waterSourceType: 'all',
  keyword: '',
});

const currentFilterYear = computed(() => {
  return filters.year === 'all' ? 2026 : Number(filters.year);
});

// Selection for batch operations
const selectedReportIds = ref<string[]>([]);

// Modals & Drawers state
const showReportModal = ref(false);
const editingRecord = ref<LicenseMonthlyWaterReport | null>(null);

const showAuditModal = ref(false);
const auditingRecord = ref<LicenseMonthlyWaterReport | null>(null);

const showDetailModal = ref(false);
const detailRecord = ref<LicenseMonthlyWaterReport | null>(null);

const showAnnualDrawer = ref(false);
const activeAnnualSummary = ref<LicenseAnnualSupportSummary | null>(null);

// ---------------- Computed Metrics ----------------
const pendingCityAuditCount = computed(() => {
  return reports.value.filter((r) => r.status === 'pending_city').length;
});

const draftReportsCount = computed(() => {
  return reports.value.filter((r) => r.status === 'draft').length;
});

const totalApprovedWaterVolume = computed(() => {
  return reports.value
    .filter((r) => r.status === 'approved' && (filters.year === 'all' || String(r.year) === filters.year))
    .reduce((acc, cur) => acc + cur.totalWater, 0);
});

const overallUsageRatio = computed(() => {
  const totalQuota = licenses.value.reduce((acc, cur) => acc + cur.annualQuota, 0);
  if (totalQuota <= 0) return 0;
  return (totalApprovedWaterVolume.value / totalQuota) * 100;
});

// Filtered reports
const filteredReports = computed(() => {
  return reports.value.filter((r) => {
    if (filters.year !== 'all' && String(r.year) !== filters.year) return false;
    if (filters.month !== 'all' && String(r.month) !== filters.month) return false;
    if (filters.district !== 'all' && r.district !== filters.district) return false;
    if (filters.status !== 'all' && r.status !== filters.status) return false;
    if (filters.waterSourceType !== 'all' && r.waterSourceType !== filters.waterSourceType) return false;

    if (filters.keyword.trim()) {
      const kw = filters.keyword.trim().toLowerCase();
      const matchPermit = r.permitNumber.toLowerCase().includes(kw);
      const matchName = r.licenseName.toLowerCase().includes(kw);
      const matchOwner = r.waterOwner.toLowerCase().includes(kw);
      if (!matchPermit && !matchName && !matchOwner) return false;
    }

    return true;
  });
});

const isAllSelected = computed(() => {
  return (
    filteredReports.value.length > 0 &&
    filteredReports.value.every((r) => selectedReportIds.value.includes(r.id))
  );
});

function toggleSelectAll(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    selectedReportIds.value = filteredReports.value.map((r) => r.id);
  } else {
    selectedReportIds.value = [];
  }
}

// Dynamically generated annual support summaries for all licenses
const annualSummaries = computed(() => {
  const targetYear = filters.year === 'all' ? 2026 : Number(filters.year);
  let list = generateLicenseAnnualSummary(licenses.value, reports.value, targetYear);

  if (filters.district !== 'all') {
    list = list.filter((a) => a.district === filters.district);
  }
  if (filters.keyword.trim()) {
    const kw = filters.keyword.trim().toLowerCase();
    list = list.filter(
      (a) =>
        a.permitNumber.toLowerCase().includes(kw) ||
        a.licenseName.toLowerCase().includes(kw) ||
        a.waterOwner.toLowerCase().includes(kw)
    );
  }

  return list;
});

// ---------------- Helper formatting ----------------
function statusText(status: string) {
  switch (status) {
    case 'draft': return '县级草稿';
    case 'pending_city': return '待市级审核';
    case 'approved': return '市级已通过';
    case 'rejected': return '市级已退回';
    default: return status;
  }
}

// ---------------- Actions ----------------
function handleOpenCreateReport() {
  editingRecord.value = null;
  showReportModal.value = true;
}

function handleEditReport(record: LicenseMonthlyWaterReport) {
  editingRecord.value = record;
  showReportModal.value = true;
}

function handleSaveReport(data: Partial<LicenseMonthlyWaterReport>, action: 'draft' | 'pending_city') {
  if (editingRecord.value) {
    // Edit existing
    const idx = reports.value.findIndex((r) => r.id === editingRecord.value?.id);
    if (idx !== -1) {
      const updated: LicenseMonthlyWaterReport = {
        ...reports.value[idx],
        ...data,
        status: action,
        logs: [
          ...reports.value[idx].logs,
          {
            id: `log-${Date.now()}`,
            action: action === 'pending_city' ? '县级修改并提交市审' : '县级保存草稿',
            operatorName: data.reporter?.name || '经办人',
            roleName: data.reporter?.unit || '县级水务局',
            time: new Date().toLocaleString('zh-CN', { hour12: false }),
            statusAfter: action,
          },
        ],
      };
      reports.value[idx] = updated;
      MessagePlugin.success(action === 'pending_city' ? '修改成功并已提交市级水务局审核' : '草稿保存成功');
    }
  } else {
    // Create new
    const newId = `rep-${Date.now()}`;
    const newRecord: LicenseMonthlyWaterReport = {
      id: newId,
      licenseId: data.licenseId || '',
      permitNumber: data.permitNumber || '',
      licenseName: data.licenseName || '',
      waterOwner: data.waterOwner || '',
      district: data.district || '',
      waterSourceType: data.waterSourceType || '',
      industryType: data.industryType || '',
      annualQuota: data.annualQuota || 100,
      year: data.year || 2026,
      month: data.month || 3,
      periodKey: data.periodKey || '2026-03',
      periodLabel: data.periodLabel || '2026年03月',
      surfaceWater: data.surfaceWater || 0,
      groundwater: data.groundwater || 0,
      unconventionalWater: data.unconventionalWater || 0,
      totalWater: data.totalWater || 0,
      meteringMethod: data.meteringMethod || '智能流量计',
      prevMeterReading: data.prevMeterReading || 0,
      currentMeterReading: data.currentMeterReading || 0,
      meterMultiplier: data.meterMultiplier || 1,
      meterComputedWater: data.meterComputedWater || 0,
      meterDeviation: 0,
      monthlyQuota: data.monthlyQuota || 10,
      quotaWarning: data.quotaWarning || 'normal',
      warningReason: data.warningReason || '',
      voucherFiles: data.voucherFiles || [],
      status: action,
      reporter: data.reporter || {
        name: '何晓峰',
        phone: '13897109823',
        unit: '湟中区水务局',
        time: new Date().toLocaleString('zh-CN', { hour12: false }),
      },
      logs: [
        {
          id: `log-${Date.now()}`,
          action: action === 'pending_city' ? '县级新增填报并提交市审' : '县级新增暂存草稿',
          operatorName: data.reporter?.name || '经办人',
          roleName: data.reporter?.unit || '县级水务局',
          time: new Date().toLocaleString('zh-CN', { hour12: false }),
          statusAfter: action,
        },
      ],
      isUsedForAnnualSummary: false,
    };
    reports.value.unshift(newRecord);
    MessagePlugin.success(action === 'pending_city' ? '填报成功！已提交西宁市水务局审核' : '草稿已保存');
  }
}

function handleOpenAudit(record: LicenseMonthlyWaterReport) {
  auditingRecord.value = record;
  showAuditModal.value = true;
}

function handleAuditComplete(recordId: string, result: 'pass' | 'reject', comment: string, auditorName: string) {
  const idx = reports.value.findIndex((r) => r.id === recordId);
  if (idx !== -1) {
    const target = reports.value[idx];
    const newStatus = result === 'pass' ? 'approved' : 'rejected';
    target.status = newStatus;
    target.isUsedForAnnualSummary = result === 'pass';
    target.cityAuditor = {
      name: auditorName,
      unit: '西宁市水务局水资源科',
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
      result,
      comment,
    };
    target.logs.push({
      id: `log-${Date.now()}`,
      action: result === 'pass' ? '市级审核通过入库' : '市级审核退回驳回',
      operatorName: auditorName,
      roleName: '西宁市水务局',
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
      result,
      comment,
      statusAfter: newStatus,
    });

    if (result === 'pass') {
      MessagePlugin.success(`【${target.licenseName} - ${target.periodLabel}】审核通过，已正式入库作为年度数据支撑！`);
    } else {
      MessagePlugin.warning(`【${target.licenseName} - ${target.periodLabel}】已退回县级修改重报。`);
    }
  }
}

function handleSubmitSingleToAudit(record: LicenseMonthlyWaterReport) {
  record.status = 'pending_city';
  record.logs.push({
    id: `log-${Date.now()}`,
    action: '县级提交市审',
    operatorName: record.reporter?.name || '经办人',
    roleName: record.reporter?.unit || '县级水务局',
    time: new Date().toLocaleString('zh-CN', { hour12: false }),
    statusAfter: 'pending_city',
  });
  MessagePlugin.success(`【${record.licenseName}】已提交西宁市水务局审核`);
}

function handleWithdrawReport(record: LicenseMonthlyWaterReport) {
  record.status = 'draft';
  record.logs.push({
    id: `log-${Date.now()}`,
    action: '县级撤回草稿',
    operatorName: record.reporter?.name || '经办人',
    roleName: record.reporter?.unit || '县级水务局',
    time: new Date().toLocaleString('zh-CN', { hour12: false }),
    statusAfter: 'draft',
  });
  MessagePlugin.info(`已撤回【${record.licenseName}】填报单至草稿箱`);
}

function handleBatchSubmitAudit() {
  if (selectedReportIds.value.length === 0) {
    MessagePlugin.warning('请先勾选需要提交市审的记录');
    return;
  }
  let count = 0;
  reports.value.forEach((r) => {
    if (selectedReportIds.value.includes(r.id) && (r.status === 'draft' || r.status === 'rejected')) {
      r.status = 'pending_city';
      r.logs.push({
        id: `log-${Date.now()}-${r.id}`,
        action: '县级批量提交市审',
        operatorName: '县级经办人',
        roleName: '县级水务局',
        time: new Date().toLocaleString('zh-CN', { hour12: false }),
        statusAfter: 'pending_city',
      });
      count++;
    }
  });
  selectedReportIds.value = [];
  MessagePlugin.success(`已批量提交 ${count} 份单据至市级水务局审核`);
}

function handleBatchApprove() {
  if (selectedReportIds.value.length === 0) {
    MessagePlugin.warning('请先勾选需要批量通过的记录');
    return;
  }
  let count = 0;
  reports.value.forEach((r) => {
    if (selectedReportIds.value.includes(r.id) && r.status === 'pending_city') {
      r.status = 'approved';
      r.isUsedForAnnualSummary = true;
      r.cityAuditor = {
        name: '刘洪涛',
        unit: '西宁市水务局水资源科',
        time: new Date().toLocaleString('zh-CN', { hour12: false }),
        result: 'pass',
        comment: '市级集中复核无误，批量审核通过入库作为年度数据支撑。',
      };
      r.logs.push({
        id: `log-${Date.now()}-${r.id}`,
        action: '市级批量审核通过入库',
        operatorName: '刘洪涛',
        roleName: '西宁市水务局',
        time: new Date().toLocaleString('zh-CN', { hour12: false }),
        result: 'pass',
        statusAfter: 'approved',
      });
      count++;
    }
  });
  selectedReportIds.value = [];
  MessagePlugin.success(`批量审核成功！已将 ${count} 份月度水量单据入库，计入年度数据支撑台账。`);
}

function handleViewDetail(record: LicenseMonthlyWaterReport) {
  detailRecord.value = record;
  showDetailModal.value = true;
}

function handleViewDetailById(reportId: string) {
  const found = reports.value.find((r) => r.id === reportId);
  if (found) {
    handleViewDetail(found);
  } else {
    MessagePlugin.info('未找到该月报详情');
  }
}

function handleOpenAnnualDrawer(summary: LicenseAnnualSupportSummary) {
  activeAnnualSummary.value = summary;
  showAnnualDrawer.value = true;
}

function handleOpenAnnualDrawerByLicenseId(licenseId: string) {
  const targetYear = filters.year === 'all' ? 2026 : Number(filters.year);
  const found = annualSummaries.value.find((a) => a.licenseId === licenseId);
  if (found) {
    handleOpenAnnualDrawer(found);
  } else {
    const list = generateLicenseAnnualSummary(licenses.value, reports.value, targetYear);
    const item = list.find((a) => a.licenseId === licenseId);
    if (item) {
      handleOpenAnnualDrawer(item);
    }
  }
}

function handleDrawerChangeYear(year: number) {
  if (activeAnnualSummary.value) {
    const list = generateLicenseAnnualSummary(licenses.value, reports.value, year);
    const updated = list.find((a) => a.licenseId === activeAnnualSummary.value?.licenseId);
    if (updated) {
      activeAnnualSummary.value = updated;
    }
  }
}

function handleExportReports() {
  MessagePlugin.success('已生成《西宁市取水许可证按月填报与审核流转明细.xlsx》，正在下载...');
}
</script>
