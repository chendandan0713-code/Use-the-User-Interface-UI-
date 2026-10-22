<template>
  <div class="flex-1 flex min-h-0 overflow-hidden p-3 gap-3 bg-[#edf3fb] select-none">
    <!-- 左侧：行政区划树 (与系统各模块保持完全一致的视觉统一感) -->
    <WaterDistrictTree
      :selected-district="selectedDistrict"
      @select-district="handleDistrictSelect"
    />

    <!-- 右侧：计量健康状态管理主工作区 -->
    <div class="flex-1 flex flex-col min-w-0 min-h-0 gap-2.5 overflow-hidden">
      <!-- 1. 顶部六维健康指标概览栏 (按照最新运行健康度80分+检定20分+停用覆盖规则统计) -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 shrink-0">
        <!-- 指标 1: 纳管设施总数与在线率 -->
        <div class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">纳管计量设施</div>
            <div class="text-lg font-bold font-mono text-slate-800 mt-0.5">
              {{ summary.totalCount }} <span class="text-xs font-normal text-slate-400">台</span>
            </div>
            <div class="text-[10px] text-blue-600 mt-0.5">在线率 {{ summary.onlineRate }}%</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-[#1677ff] flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
        </div>

        <!-- 指标 2: 全域综合健康平均分 -->
        <div class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">综合健康平均分</div>
            <div class="text-lg font-bold font-mono text-blue-700 mt-0.5">
              {{ summary.avgScore }} <span class="text-xs font-normal text-slate-400">分</span>
            </div>
            <div class="text-[10px] text-emerald-600 mt-0.5">80分运行+20分检定</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
        </div>

        <!-- 指标 3: 优等级 (90–100分) -->
        <div
          class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between cursor-pointer hover:border-emerald-400 transition"
          @click="quickFilterByLevel('优')"
          title="点击快速筛选「优」等级设施（正常巡检）"
        >
          <div>
            <div class="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <span class="font-bold text-emerald-700">优</span>
              <span class="text-[10px] text-emerald-600 font-semibold">[90–100]</span>
            </div>
            <div class="text-lg font-bold font-mono text-emerald-700 mt-0.5">
              {{ summary.excellentCount }} <span class="text-xs font-normal text-slate-400">台</span>
            </div>
            <div class="text-[10px] text-emerald-600 mt-0.5">
              正常巡检 · 占比 {{ getPercent(summary.excellentCount) }}%
            </div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>

        <!-- 指标 4: 良等级 (70–89分) -->
        <div
          class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between cursor-pointer hover:border-blue-400 transition"
          @click="quickFilterByLevel('良')"
          title="点击快速筛选「良」等级设施（关注）"
        >
          <div>
            <div class="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <span class="font-bold text-blue-700">良</span>
              <span class="text-[10px] text-blue-600 font-semibold">[70–89]</span>
            </div>
            <div class="text-lg font-bold font-mono text-blue-700 mt-0.5">
              {{ summary.goodCount }} <span class="text-xs font-normal text-slate-400">台</span>
            </div>
            <div class="text-[10px] text-blue-600 mt-0.5">
              业务关注 · 占比 {{ getPercent(summary.goodCount) }}%
            </div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
        </div>

        <!-- 指标 5: 中等级 (50–69分) -->
        <div
          class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between cursor-pointer hover:border-amber-400 transition"
          @click="quickFilterByLevel('中')"
          title="点击快速筛选「中」等级设施（生成维护工单）"
        >
          <div>
            <div class="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <span class="font-bold text-amber-700">中</span>
              <span class="text-[10px] text-amber-600 font-semibold">[50–69]</span>
            </div>
            <div class="text-lg font-bold font-mono text-amber-700 mt-0.5">
              {{ summary.mediumCount }} <span class="text-xs font-normal text-slate-400">台</span>
            </div>
            <div class="text-[10px] text-amber-600 mt-0.5">
              生成维护工单
            </div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
        </div>

        <!-- 指标 6: 差/极差/不可用/停用 (<50分或状态覆盖) -->
        <div
          class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between cursor-pointer hover:border-rose-400 transition"
          @click="quickFilterByLevel('差')"
          title="点击快速筛选差/极差/不可用等预警设施"
        >
          <div>
            <div class="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <span class="font-bold text-rose-700">差/极差/不可用</span>
            </div>
            <div class="text-lg font-bold font-mono text-rose-700 mt-0.5">
              {{ summary.poorCount + summary.veryPoorCount + summary.unavailableCount }} <span class="text-xs font-normal text-slate-400">台</span>
            </div>
            <div class="text-[10px] text-rose-600 mt-0.5">
              停用 {{ summary.deactivatedCount }} · 工单 {{ summary.pendingWorkOrders }}
            </div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
        </div>
      </div>

      <!-- 2. 权限身份状态指示栏与快速操作条 -->
      <div class="bg-white rounded-lg px-3.5 py-2 border border-[#b8cde6] shadow-2xs flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div class="flex items-center gap-2.5 text-xs text-slate-700">
          <div class="flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-medium">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>当前登录身份: <strong>{{ currentRoleInfo.roleName }}</strong></span>
          </div>

          <span class="text-slate-400 hidden sm:inline">|</span>
          <span class="text-[11px] text-slate-500 hidden md:inline">{{ currentRoleInfo.scopeDesc }}</span>
        </div>

        <div class="flex items-center gap-2">
          <!-- 评分与权限规则说明按钮 (核心入口) -->
          <button
            type="button"
            @click="ruleModalVisible = true"
            class="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>诊断规则总表与等级映射说明</span>
          </button>

          <!-- 全网一键健康重算 -->
          <button
            type="button"
            v-if="currentRoleInfo.canRecalculateAll"
            @click="handleRecalculateAll"
            :disabled="isRecalculating"
            class="px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md transition cursor-pointer flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
          >
            <svg
              class="w-3.5 h-3.5 text-indigo-600"
              :class="{ 'animate-spin': isRecalculating }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
            </svg>
            <span>{{ isRecalculating ? '正在全网重算...' : '一键全网健康诊断重算' }}</span>
          </button>

          <!-- 导出健康体检报表 -->
          <button
            type="button"
            v-if="currentRoleInfo.canExportReports"
            @click="handleExportReport"
            class="px-3 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <svg class="w-3.5 h-3.5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>导出健康评估报告</span>
          </button>
        </div>
      </div>

      <!-- 3. 多维筛选与检索工具栏 -->
      <div class="bg-white rounded-lg p-3 border border-[#b8cde6] shadow-2xs shrink-0 flex flex-col gap-2.5">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <!-- 关键词搜索 -->
          <div>
            <label class="text-[11px] text-slate-500 font-medium">综合检索</label>
            <input
              type="text"
              v-model="filterParams.keyword"
              placeholder="设施名称 / 编号 / 取水权人"
              class="w-full mt-0.5 px-2.5 py-1 text-xs border border-slate-300 rounded-md focus:outline-hidden focus:border-blue-500 bg-white"
            />
          </div>

          <!-- 健康等级筛选 (7级映射) -->
          <div>
            <label class="text-[11px] text-slate-500 font-medium">健康等级 (7级)</label>
            <select
              v-model="filterParams.level"
              class="w-full mt-0.5 px-2.5 py-1 text-xs border border-slate-300 rounded-md focus:outline-hidden focus:border-blue-500 bg-white"
            >
              <option value="">全部等级</option>
              <option value="优">优 (90–100 · 正常巡检)</option>
              <option value="良">良 (70–89 · 关注)</option>
              <option value="中">中 (50–69 · 生成维护工单)</option>
              <option value="差">差 (30–49 · 优先处理)</option>
              <option value="极差">极差 (0–29 · 立即处理)</option>
              <option value="不可用">不可用 (检定超期·禁止使用)</option>
              <option value="停用">停用 (人工停用·不参与评分)</option>
            </select>
          </div>

          <!-- 异常状态特征筛选 (按新扣分总表) -->
          <div>
            <label class="text-[11px] text-slate-500 font-medium">触发扣分异常项</label>
            <select
              v-model="filterParams.anomalyKey"
              class="w-full mt-0.5 px-2.5 py-1 text-xs border border-slate-300 rounded-md focus:outline-hidden focus:border-blue-500 bg-white"
            >
              <option value="">全部诊断项</option>
              <option value="daily_missing">未上报 (单日未上报·扣1.2)</option>
              <option value="daily_incomplete">缺报 (单日缺报·扣1.2)</option>
              <option value="negative_value">负值 (出现负值·扣1.2)</option>
              <option value="extreme_value">极大值 (超阈值·扣1.2)</option>
              <option value="accum_10d_missing">累计10天未上报 (重扣16分·工单)</option>
              <option value="consec_15d_same">连续15天同一数 (重扣24分·高优)</option>
              <option value="accum_20d_zero">累计20天为0 (待核实扣8/16分)</option>
              <option value="calib_near_expiry">检定临近到期 (30天内扣4分)</option>
              <option value="calib_overdue">检定超期 (直接置不可用)</option>
              <option value="calib_missing_record">检定记录缺失 (扣8分)</option>
              <option value="status_deactivated">停用 (状态覆盖)</option>
            </select>
          </div>

          <!-- 传输方式 -->
          <div>
            <label class="text-[11px] text-slate-500 font-medium">传输方式</label>
            <select
              v-model="filterParams.transmissionMethod"
              class="w-full mt-0.5 px-2.5 py-1 text-xs border border-slate-300 rounded-md focus:outline-hidden focus:border-blue-500 bg-white"
            >
              <option value="">全部方式</option>
              <option value="4G RTU 远传在线">4G RTU 远传在线</option>
              <option value="NB-IoT 远传在线">NB-IoT 远传在线</option>
              <option value="光纤专网在线">光纤专网在线</option>
            </select>
          </div>

          <!-- 水源类型 -->
          <div>
            <label class="text-[11px] text-slate-500 font-medium">水源类型</label>
            <select
              v-model="filterParams.waterSourceType"
              class="w-full mt-0.5 px-2.5 py-1 text-xs border border-slate-300 rounded-md focus:outline-hidden focus:border-blue-500 bg-white"
            >
              <option value="">全部水源</option>
              <option value="地表水">地表水</option>
              <option value="地下水">地下水</option>
              <option value="泉水">泉水</option>
              <option value="自备井">自备井</option>
            </select>
          </div>

          <!-- 排序规则 -->
          <div>
            <label class="text-[11px] text-slate-500 font-medium">结果排序</label>
            <select
              v-model="filterParams.sortBy"
              class="w-full mt-0.5 px-2.5 py-1 text-xs border border-slate-300 rounded-md focus:outline-hidden focus:border-blue-500 bg-white"
            >
              <option value="score_desc">健康得分从高到低</option>
              <option value="score_asc">健康得分从低到高</option>
              <option value="time_desc">最新到报时间</option>
              <option value="name_asc">设施名称排序</option>
            </select>
          </div>
        </div>

        <!-- 筛选栏按钮群 -->
        <div class="flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
          <div class="text-[11px] text-slate-500">
            已检索到 <strong class="text-blue-700 font-mono">{{ filteredFacilities.length }}</strong> 台计量设施
            <span v-if="selectedFacilityIds.length > 0" class="ml-2 text-indigo-600 font-medium">
              （已勾选 {{ selectedFacilityIds.length }} 台）
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="handleResetFilters"
              class="px-3 py-1 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
            >
              重置筛选
            </button>
            <button
              type="button"
              @click="handleApplyFilter"
              class="px-3.5 py-1 rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer shadow-2xs"
            >
              查询
            </button>
            <button
              type="button"
              v-if="selectedFacilityIds.length > 0 && currentRoleInfo.canDispatchWorkOrder"
              @click="handleBatchDispatch"
              class="px-3 py-1 rounded-md text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 transition cursor-pointer shadow-2xs"
            >
              批量下发处置工单 ({{ selectedFacilityIds.length }})
            </button>
          </div>
        </div>
      </div>

      <!-- 4. 计量健康状态数据表格 -->
      <div class="bg-white rounded-lg border border-[#b4c7e0] shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden select-none">
        <div class="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar min-h-[380px]">
          <table class="w-full text-left border-collapse text-xs border-l border-t border-[#b8cde6]">
            <!-- 表头 -->
            <thead class="sticky top-0 z-20">
              <tr class="bg-[#eaf1fb] text-gray-800 font-semibold border-b border-[#a6c1e2]">
                <!-- 1. 序号与多选 -->
                <th class="py-2.5 px-2 whitespace-nowrap w-14 text-center border-r border-b border-[#b8cde6] sticky top-0 left-0 z-30 bg-[#eaf1fb]">
                  <div class="flex items-center justify-center gap-1">
                    <input
                      type="checkbox"
                      :checked="isAllSelected"
                      @change="toggleSelectAll"
                      class="rounded border-gray-400 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                    />
                    <span>序号</span>
                  </div>
                </th>

                <!-- 2. 设施名称与器具编号 -->
                <th class="py-2.5 px-3 whitespace-nowrap min-w-[170px] border-r border-b border-[#b8cde6]">
                  计量设施名称 / 器具编号
                </th>

                <!-- 3. 取水权人与区县 -->
                <th class="py-2.5 px-3 whitespace-nowrap min-w-[160px] border-r border-b border-[#b8cde6]">
                  取水权人 / 行政区划
                </th>

                <!-- 4. 传输方式与水源 -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[110px] border-r border-b border-[#b8cde6]">
                  数据传输 / 水源类型
                </th>

                <!-- 5. 综合健康得分 / 等级 (核心关注列) -->
                <th class="py-2.5 px-3 whitespace-nowrap text-center min-w-[130px] border-r border-b border-[#b8cde6]">
                  综合得分 / 等级
                </th>

                <!-- 6. 业务动作 (新映射规范) -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[100px] border-r border-b border-[#b8cde6]">
                  联动业务动作
                </th>

                <!-- 7. 异常扣分归因明细 -->
                <th class="py-2.5 px-3 whitespace-nowrap min-w-[180px] border-r border-b border-[#b8cde6]">
                  扣分归因 (运行80分·检定20分)
                </th>

                <!-- 8. 最新诊断结论 -->
                <th class="py-2.5 px-3 whitespace-nowrap min-w-[180px] border-r border-b border-[#b8cde6]">
                  最新诊断工况
                </th>

                <!-- 9. 实时流速与底数 -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-right min-w-[100px] border-r border-b border-[#b8cde6]">
                  瞬时流速 / 累计
                </th>

                <!-- 10. 检定状态/有效期 -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[110px] border-r border-b border-[#b8cde6]">
                  检定有效状态
                </th>

                <!-- 11. 工单处置状态 -->
                <th class="py-2.5 px-2 whitespace-nowrap text-center w-20 border-r border-b border-[#b8cde6]">
                  工单状态
                </th>

                <!-- 12. 操作列 -->
                <th class="py-2.5 px-3 whitespace-nowrap text-center min-w-[130px] border-r border-b border-[#b8cde6] sticky top-0 right-0 z-30 bg-[#eaf1fb]">
                  操作
                </th>
              </tr>
            </thead>

            <!-- 表体 -->
            <tbody class="divide-y divide-[#d4e2f4]">
              <tr
                v-for="(fac, index) in filteredFacilities"
                :key="fac.id"
                class="hover:bg-blue-50/40 transition"
              >
                <!-- 1. 序号与选择框 -->
                <td class="py-2.5 px-2 text-center border-r border-[#b8cde6] sticky left-0 z-10 bg-white">
                  <div class="flex items-center justify-center gap-1.5 font-mono">
                    <input
                      type="checkbox"
                      :checked="selectedFacilityIds.includes(fac.id)"
                      @change="toggleSelectRow(fac.id)"
                      class="rounded border-gray-400 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                    />
                    <span class="text-slate-500 text-[11px]">{{ index + 1 }}</span>
                  </div>
                </td>

                <!-- 2. 设施名称与器具编号 -->
                <td class="py-2.5 px-3 border-r border-[#b8cde6]">
                  <div class="font-bold text-slate-800 text-xs">{{ fac.facilityName }}</div>
                  <div class="text-[11px] font-mono text-slate-400 mt-0.5">{{ fac.facilityCode }}</div>
                </td>

                <!-- 3. 取水权人与区县 -->
                <td class="py-2.5 px-3 border-r border-[#b8cde6]">
                  <div class="text-slate-700 text-xs truncate max-w-[200px]" :title="fac.waterOwner">
                    {{ fac.waterOwner }}
                  </div>
                  <div class="text-[10px] text-blue-600 mt-0.5 flex items-center gap-1">
                    <span class="px-1 py-0.2 rounded bg-blue-50 border border-blue-200">{{ fac.district }}</span>
                    <span class="text-slate-400 font-mono">{{ fac.permitNumber }}</span>
                  </div>
                </td>

                <!-- 4. 传输方式与水源 -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#b8cde6]">
                  <div class="text-xs text-slate-700">{{ fac.transmissionMethod }}</div>
                  <div class="text-[10px] text-slate-400 mt-0.5">{{ fac.waterSourceType }} · {{ fac.facilityType }}</div>
                </td>

                <!-- 5. 综合健康得分与等级 (核心展示) -->
                <td class="py-2.5 px-3 text-center border-r border-[#b8cde6]">
                  <div class="flex items-center justify-center gap-1.5">
                    <span
                      v-if="!fac.healthScore.isDeactivated && !fac.healthScore.isUnavailable"
                      class="font-mono text-base font-extrabold"
                      :class="[
                        fac.healthScore.level === '优' ? 'text-emerald-700' :
                        fac.healthScore.level === '良' ? 'text-blue-700' :
                        fac.healthScore.level === '中' ? 'text-amber-700' :
                        fac.healthScore.level === '差' ? 'text-orange-700' : 'text-rose-700'
                      ]"
                    >
                      {{ fac.healthScore.totalScore }}
                    </span>

                    <span
                      :class="[
                        'px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider',
                        fac.healthScore.level === '优' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        fac.healthScore.level === '良' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                        fac.healthScore.level === '中' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        fac.healthScore.level === '差' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                        fac.healthScore.level === '极差' ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse' :
                        fac.healthScore.level === '不可用' ? 'bg-purple-100 text-purple-800 border border-purple-300 font-extrabold' :
                        'bg-slate-100 text-slate-700 border border-slate-300'
                      ]"
                    >
                      {{ fac.healthScore.level }}
                    </span>
                  </div>
                </td>

                <!-- 6. 联动业务动作 -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#b8cde6]">
                  <span
                    :class="[
                      'px-2 py-0.5 rounded text-[11px] font-medium',
                      fac.healthScore.businessAction === '正常巡检' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      fac.healthScore.businessAction === '关注' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      fac.healthScore.businessAction === '生成维护工单' ? 'bg-amber-50 text-amber-800 border border-amber-200 font-bold' :
                      fac.healthScore.businessAction === '优先处理' ? 'bg-orange-50 text-orange-800 border border-orange-200 font-bold' :
                      fac.healthScore.businessAction === '立即处理' ? 'bg-rose-50 text-rose-800 border border-rose-200 font-bold animate-pulse' :
                      fac.healthScore.businessAction === '禁止使用' ? 'bg-purple-50 text-purple-800 border border-purple-200 font-bold' :
                      'bg-slate-50 text-slate-600 border border-slate-200'
                    ]"
                  >
                    {{ fac.healthScore.businessAction }}
                  </span>
                </td>

                <!-- 7. 异常扣分归因明细 -->
                <td class="py-2.5 px-3 border-r border-[#b8cde6]">
                  <div v-if="fac.healthScore.isDeactivated" class="text-slate-500 text-xs">
                    人工停用覆盖（不参与评分）
                  </div>
                  <div v-else-if="fac.healthScore.totalPenalty === 0" class="text-emerald-600 font-medium text-xs flex items-center gap-1">
                    <svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>无扣分（满分80+20）</span>
                  </div>
                  <div v-else class="flex flex-wrap gap-1">
                    <span
                      v-for="d in Object.values(fac.healthScore.deductions).filter(i => i.actualDeduction > 0)"
                      :key="d.key"
                      :class="[
                        'px-1.5 py-0.5 rounded text-[10px]',
                        d.group === 'B组' ? 'bg-rose-50 border border-rose-200 text-rose-700 font-bold' :
                        d.group === 'C组' ? 'bg-amber-50 border border-amber-200 text-amber-700 font-bold' :
                        d.key === 'calib_overdue' ? 'bg-purple-50 border border-purple-200 text-purple-700 font-bold' :
                        'bg-blue-50 border border-blue-200 text-blue-700'
                      ]"
                      :title="d.currentStatusDesc"
                    >
                      {{ d.name }}-{{ d.actualDeduction }}分
                    </span>
                  </div>
                </td>

                <!-- 8. 最新诊断工况 -->
                <td class="py-2.5 px-3 border-r border-[#b8cde6]">
                  <div
                    class="text-xs truncate max-w-[220px]"
                    :class="[
                      fac.healthScore.level === '极差' || fac.healthScore.level === '差' ? 'text-rose-700 font-semibold' :
                      fac.healthScore.level === '不可用' ? 'text-purple-700 font-semibold' : 'text-slate-700'
                    ]"
                    :title="fac.healthScore.diagnosisText"
                  >
                    {{ fac.healthScore.diagnosisText }}
                  </div>
                  <div class="text-[10px] text-slate-400 mt-0.5 truncate font-mono">
                    最新到报: {{ fac.lastReportTime }}
                  </div>
                </td>

                <!-- 9. 实时流速与底数 -->
                <td class="py-2.5 px-2.5 text-right font-mono border-r border-[#b8cde6]">
                  <div
                    class="font-bold text-xs"
                    :class="fac.currentReading < 0 ? 'text-rose-600' : 'text-slate-800'"
                  >
                    {{ fac.currentReading }} m³/h
                  </div>
                  <div class="text-[10px] text-slate-400 mt-0.5">
                    {{ fac.accumulatedFlow }} m³
                  </div>
                </td>

                <!-- 10. 检定有效状态 -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#b8cde6]">
                  <div
                    class="text-[11px] font-medium"
                    :class="[
                      fac.healthScore.deductions.calib_overdue.isTriggered ? 'text-purple-700 font-bold' :
                      fac.healthScore.deductions.calib_near_expiry.isTriggered ? 'text-amber-700 font-bold' :
                      !fac.hasCalibrationRecord ? 'text-slate-500' : 'text-emerald-700'
                    ]"
                  >
                    {{
                      fac.healthScore.deductions.calib_overdue.isTriggered ? '已超期(不可用)' :
                      fac.healthScore.deductions.calib_near_expiry.isTriggered ? '临近到期(<30天)' :
                      !fac.hasCalibrationRecord ? '缺失记录' : '合格有效'
                    }}
                  </div>
                  <div class="text-[10px] text-slate-400 mt-0.5 font-mono">
                    {{ fac.calibrationExpiryDate || '-' }}
                  </div>
                </td>

                <!-- 11. 工单处置状态 -->
                <td class="py-2.5 px-2 text-center border-r border-[#b8cde6]">
                  <span
                    v-if="fac.workOrderPending"
                    class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold"
                  >
                    处理中
                  </span>
                  <span
                    v-else-if="fac.healthScore.businessAction === '生成维护工单' || fac.healthScore.businessAction === '优先处理' || fac.healthScore.businessAction === '立即处理'"
                    class="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px]"
                  >
                    待派单
                  </span>
                  <span
                    v-else
                    class="text-slate-400 text-[10px]"
                  >
                    正常
                  </span>
                </td>

                <!-- 12. 操作列 -->
                <td class="py-2.5 px-3 text-center border-r border-[#b8cde6] sticky right-0 z-10 bg-white">
                  <div class="flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      @click="openDiagnosticModal(fac)"
                      class="px-2 py-1 rounded text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition cursor-pointer flex items-center gap-1"
                      title="打开设备健康诊断体检单"
                    >
                      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>诊断单</span>
                    </button>

                    <button
                      type="button"
                      @click="handleRecalculateSingle(fac)"
                      class="px-1.5 py-1 rounded text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
                      title="按最新诊断规则重算"
                    >
                      重算
                    </button>
                  </div>
                </td>
              </tr>

              <!-- 空状态 -->
              <tr v-if="filteredFacilities.length === 0">
                <td colspan="12" class="py-12 text-center text-slate-400 text-xs">
                  暂无匹配的计量设施健康记录，请调整筛选条件
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 弹窗 1: 评分规则总表与权限体系模态框 -->
    <MeterHealthRuleModal
      :visible="ruleModalVisible"
      :current-role="currentRole"
      @close="ruleModalVisible = false"
      @change-role="handleChangeRole"
    />

    <!-- 弹窗 2: 单台设施健康诊断体检与处置弹窗 -->
    <MeterHealthDiagnosticModal
      :visible="diagnosticModalVisible"
      :facility="selectedFacilityForDiagnosis"
      @close="diagnosticModalVisible = false"
      @dispatch-work-order="handleDispatchWorkOrder"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import WaterDistrictTree from './WaterDistrictTree.vue';
import MeterHealthRuleModal from './MeterHealthRuleModal.vue';
import MeterHealthDiagnosticModal from './MeterHealthDiagnosticModal.vue';
import type {
  MeterFacilityHealthRecord,
  HealthUserRole,
  MeterHealthFilterParams,
  DiagnosticRuleKey
} from '../../types';
import {
  mockMeterHealthFacilities,
  getMeterHealthSummary,
  healthRolePermissions
} from '../../data/mockMeterHealthData';

// 基础数据状态
const facilities = ref<MeterFacilityHealthRecord[]>([...mockMeterHealthFacilities]);
const selectedDistrict = ref('全区');
const currentRole = ref<HealthUserRole>('provincial'); // 默认省级管理员

// 选中的设施ID集合
const selectedFacilityIds = ref<string[]>([]);

// 弹窗状态
const ruleModalVisible = ref(false);
const diagnosticModalVisible = ref(false);
const selectedFacilityForDiagnosis = ref<MeterFacilityHealthRecord | null>(null);
const isRecalculating = ref(false);

// 过滤参数
const filterParams = ref<MeterHealthFilterParams>({
  keyword: '',
  district: '全区',
  level: '',
  anomalyKey: '',
  dimension: '',
  transmissionMethod: '',
  waterSourceType: '',
  status: '',
  sortBy: 'score_desc'
});

// 当前角色信息
const currentRoleInfo = computed(() => {
  return healthRolePermissions[currentRole.value];
});

// 大盘汇总计算
const summary = computed(() => {
  return getMeterHealthSummary(facilities.value);
});

function getPercent(count: number): number {
  if (!summary.value.totalCount) return 0;
  return Number(((count / summary.value.totalCount) * 100).toFixed(1));
}

// 筛选设施列表
const filteredFacilities = computed(() => {
  let list = [...facilities.value];

  // 1. 行政区划树联动
  if (selectedDistrict.value && selectedDistrict.value !== '全区') {
    list = list.filter(item => item.district === selectedDistrict.value);
  }

  // 2. 关键词模糊匹配
  if (filterParams.value.keyword.trim()) {
    const kw = filterParams.value.keyword.trim().toLowerCase();
    list = list.filter(
      item =>
        item.facilityName.toLowerCase().includes(kw) ||
        item.facilityCode.toLowerCase().includes(kw) ||
        item.waterOwner.toLowerCase().includes(kw) ||
        item.permitNumber.toLowerCase().includes(kw)
    );
  }

  // 3. 健康等级筛选 (7级)
  if (filterParams.value.level) {
    list = list.filter(item => item.healthScore.level === filterParams.value.level);
  }

  // 4. 异常特征筛选 (依据 DiagnosticRuleKey)
  if (filterParams.value.anomalyKey) {
    const key = filterParams.value.anomalyKey as DiagnosticRuleKey;
    list = list.filter(item => item.healthScore.deductions[key]?.isTriggered);
  }

  // 5. 传输方式
  if (filterParams.value.transmissionMethod) {
    list = list.filter(item => item.transmissionMethod === filterParams.value.transmissionMethod);
  }

  // 6. 水源类型
  if (filterParams.value.waterSourceType) {
    list = list.filter(item => item.waterSourceType === filterParams.value.waterSourceType);
  }

  // 7. 排序
  if (filterParams.value.sortBy === 'score_desc') {
    list.sort((a, b) => b.healthScore.totalScore - a.healthScore.totalScore);
  } else if (filterParams.value.sortBy === 'score_asc') {
    list.sort((a, b) => a.healthScore.totalScore - b.healthScore.totalScore);
  } else if (filterParams.value.sortBy === 'time_desc') {
    list.sort((a, b) => b.lastReportTime.localeCompare(a.lastReportTime));
  } else if (filterParams.value.sortBy === 'name_asc') {
    list.sort((a, b) => a.facilityName.localeCompare(b.facilityName));
  }

  return list;
});

// 全选
const isAllSelected = computed(() => {
  return (
    filteredFacilities.value.length > 0 &&
    filteredFacilities.value.every(f => selectedFacilityIds.value.includes(f.id))
  );
});

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedFacilityIds.value = [];
  } else {
    selectedFacilityIds.value = filteredFacilities.value.map(f => f.id);
  }
}

function toggleSelectRow(id: string) {
  const idx = selectedFacilityIds.value.indexOf(id);
  if (idx >= 0) {
    selectedFacilityIds.value.splice(idx, 1);
  } else {
    selectedFacilityIds.value.push(id);
  }
}

function handleDistrictSelect(district: string) {
  selectedDistrict.value = district;
  filterParams.value.district = district;
}

function quickFilterByLevel(level: string) {
  if (filterParams.value.level === level) {
    filterParams.value.level = ''; // 取消
  } else {
    filterParams.value.level = level;
  }
}

function handleApplyFilter() {
  // filteredFacilities computed handles reactivity
}

function handleResetFilters() {
  filterParams.value = {
    keyword: '',
    district: selectedDistrict.value,
    level: '',
    anomalyKey: '',
    dimension: '',
    transmissionMethod: '',
    waterSourceType: '',
    status: '',
    sortBy: 'score_desc'
  };
}

function openDiagnosticModal(facility: MeterFacilityHealthRecord) {
  selectedFacilityForDiagnosis.value = facility;
  diagnosticModalVisible.value = true;
}

function handleChangeRole(role: HealthUserRole) {
  currentRole.value = role;
}

// 全网一键健康重算
function handleRecalculateAll() {
  isRecalculating.value = true;
  setTimeout(() => {
    isRecalculating.value = false;
  }, 600);
}

// 单台设施重算
function handleRecalculateSingle(fac: MeterFacilityHealthRecord) {
  fac.healthScore.evaluatedAt = '2026-10-11 12:30:00';
}

// 派发工单
function handleDispatchWorkOrder(payload: {
  facilityId: string;
  engineer: string;
  urgency: string;
  deadline: string;
}) {
  const target = facilities.value.find(f => f.id === payload.facilityId);
  if (target) {
    target.workOrderPending = true;
    target.workOrderId = `WO-20261011-${Math.floor(100 + Math.random() * 900)}`;
  }
  diagnosticModalVisible.value = false;
}

// 批量派发工单
function handleBatchDispatch() {
  selectedFacilityIds.value.forEach(id => {
    const target = facilities.value.find(f => f.id === id);
    if (target && !target.workOrderPending) {
      target.workOrderPending = true;
      target.workOrderId = `WO-20261011-${Math.floor(100 + Math.random() * 900)}`;
    }
  });
  selectedFacilityIds.value = [];
}

// 导出评估报告
function handleExportReport() {
  const csvHeader = '器具编号,设施名称,取水权人,所属区县,传输方式,综合健康得分,评定等级,业务动作,运行健康度扣分,检定扣分,最新诊断\n';
  const rows = filteredFacilities.value.map(f => {
    return `"${f.facilityCode}","${f.facilityName}","${f.waterOwner}","${f.district}","${f.transmissionMethod}",${f.healthScore.totalScore},"${f.healthScore.level}","${f.healthScore.businessAction}","扣${f.healthScore.operationPenalty}分","扣${f.healthScore.calibrationPenalty}分","${f.healthScore.diagnosisText}"`;
  }).join('\n');
  const blob = new Blob(['\uFEFF' + csvHeader + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `青海省水资源计量设施健康状态评估大盘报表_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
</script>
