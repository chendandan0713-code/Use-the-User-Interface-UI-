<template>
  <div class="flex-1 flex min-h-0 overflow-hidden p-3 gap-3 bg-[#edf3fb] select-none">
    <!-- 左侧：行政区划树 (与系统各模块保持完全一致的视觉统一感) -->
    <WaterDistrictTree
      :selected-district="selectedDistrict"
      @select-district="handleDistrictSelect"
    />

    <!-- 右侧：档案完整度核算主工作区 -->
    <div class="flex-1 flex flex-col min-w-0 min-h-0 gap-2.5 overflow-hidden">
      <!-- 1. 顶部六维指标概览栏 (按照完整度计算规则提炼的核心指标) -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 shrink-0">
        <!-- 指标 1: 档案建档总数 -->
        <div class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">一户一档总数</div>
            <div class="text-lg font-bold font-mono text-slate-800 mt-0.5">
              {{ summary.totalCount }} <span class="text-xs font-normal text-slate-400">户</span>
            </div>
            <div class="text-[10px] text-blue-600 mt-0.5">全域建档纳入核算</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-[#1677ff] flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
        </div>

        <!-- 指标 2: 全域平均完整度评分 -->
        <div class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">平均完整度得分</div>
            <div class="text-lg font-bold font-mono text-blue-700 mt-0.5">
              {{ summary.averageScore }} <span class="text-xs font-normal text-slate-400">分</span>
            </div>
            <div class="text-[10px] text-emerald-600 mt-0.5">综合表现良好</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
          </div>
        </div>

        <!-- 指标 3: 优秀等级户数 (90-100分) -->
        <div
          class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between cursor-pointer hover:border-emerald-400 transition"
          @click="quickFilterByLevel('优秀')"
          title="点击快速筛选优秀档案"
        >
          <div>
            <div class="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <span>优秀档案</span>
              <span class="text-[10px] text-emerald-600 font-semibold">[90-100]</span>
            </div>
            <div class="text-lg font-bold font-mono text-emerald-700 mt-0.5">
              {{ summary.excellentCount }} <span class="text-xs font-normal text-slate-400">户</span>
            </div>
            <div class="text-[10px] text-emerald-600 mt-0.5">占比 {{ getPercent(summary.excellentCount) }}%</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>

        <!-- 指标 4: 良好等级户数 (80-89分) -->
        <div
          class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between cursor-pointer hover:border-blue-400 transition"
          @click="quickFilterByLevel('良好')"
          title="点击快速筛选良好档案"
        >
          <div>
            <div class="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <span>良好档案</span>
              <span class="text-[10px] text-blue-600 font-semibold">[80-89]</span>
            </div>
            <div class="text-lg font-bold font-mono text-blue-700 mt-0.5">
              {{ summary.goodCount }} <span class="text-xs font-normal text-slate-400">户</span>
            </div>
            <div class="text-[10px] text-blue-600 mt-0.5">占比 {{ getPercent(summary.goodCount) }}%</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
        </div>

        <!-- 指标 5: 一般等级户数 (60-79分) -->
        <div
          class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between cursor-pointer hover:border-amber-400 transition"
          @click="quickFilterByLevel('一般')"
          title="点击快速筛选一般档案"
        >
          <div>
            <div class="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <span>一般档案</span>
              <span class="text-[10px] text-amber-600 font-semibold">[60-79]</span>
            </div>
            <div class="text-lg font-bold font-mono text-amber-700 mt-0.5">
              {{ summary.fairCount }} <span class="text-xs font-normal text-slate-400">户</span>
            </div>
            <div class="text-[10px] text-amber-600 mt-0.5">占比 {{ getPercent(summary.fairCount) }}%</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
        </div>

        <!-- 指标 6: 较差等级户数 (<60分) -->
        <div
          class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between cursor-pointer hover:border-rose-400 transition"
          @click="quickFilterByLevel('较差')"
          title="点击快速筛选较差待补正档案"
        >
          <div>
            <div class="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <span>较差档案</span>
              <span class="text-[10px] text-rose-600 font-semibold">[&lt;60]</span>
            </div>
            <div class="text-lg font-bold font-mono text-rose-700 mt-0.5">
              {{ summary.poorCount }} <span class="text-xs font-normal text-slate-400">户</span>
            </div>
            <div class="text-[10px] text-rose-600 mt-0.5">重点督办整改</div>
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

      <!-- 2. 搜索与核算控制栏 (Filter Bar) -->
      <div class="bg-white rounded-lg p-3 border border-[#b4c7e0] shadow-2xs shrink-0 text-xs">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2.5 items-center">
          <!-- 搜索项 1: 关键字 -->
          <div class="flex items-center">
            <label class="w-16 shrink-0 text-gray-600 font-normal text-right pr-2">关键字</label>
            <div class="relative flex-1">
              <input
                type="text"
                v-model="filterParams.keyword"
                placeholder="取水权人/许可证/代码"
                class="w-full h-8 px-2.5 pr-6 bg-[#f8fafc] border border-[#b8cde6] rounded text-gray-800 focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400"
                @keyup.enter="handleSearch"
              />
              <button
                v-if="filterParams.keyword"
                type="button"
                @click="filterParams.keyword = ''"
                class="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
              >
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <!-- 搜索项 2: 完整度评级 -->
          <div class="flex items-center">
            <label class="w-16 shrink-0 text-gray-600 font-normal text-right pr-2">完整评级</label>
            <select
              v-model="filterParams.completenessLevel"
              class="flex-1 h-8 px-2 bg-[#f8fafc] border border-[#b8cde6] rounded text-gray-800 focus:bg-white focus:outline-none focus:border-[#1677ff] transition cursor-pointer"
            >
              <option value="">全部评级</option>
              <option value="优秀">优秀 (90~100分)</option>
              <option value="良好">良好 (80~89分)</option>
              <option value="一般">一般 (60~79分)</option>
              <option value="较差">较差 (&lt;60分)</option>
            </select>
          </div>

          <!-- 搜索项 3: 分数区间 -->
          <div class="flex items-center">
            <label class="w-16 shrink-0 text-gray-600 font-normal text-right pr-2">得分区间</label>
            <select
              v-model="filterParams.scoreRange"
              class="flex-1 h-8 px-2 bg-[#f8fafc] border border-[#b8cde6] rounded text-gray-800 focus:bg-white focus:outline-none focus:border-[#1677ff] transition cursor-pointer"
            >
              <option value="">全部分数段</option>
              <option value="ge90">90分及以上 (高完整度)</option>
              <option value="80to89">80 ~ 89 分 (良好达标)</option>
              <option value="60to79">60 ~ 79 分 (需查漏补缺)</option>
              <option value="lt60">60分以下 (薄弱急需整改)</option>
            </select>
          </div>

          <!-- 搜索项 4: 数据来源类型 -->
          <div class="flex items-center">
            <label class="w-16 shrink-0 text-gray-600 font-normal text-right pr-2">数据来源</label>
            <select
              v-model="filterParams.dataSourceType"
              class="flex-1 h-8 px-2 bg-[#f8fafc] border border-[#b8cde6] rounded text-gray-800 focus:bg-white focus:outline-none focus:border-[#1677ff] transition cursor-pointer"
            >
              <option value="">全部来源类型</option>
              <option value="国控">国控</option>
              <option value="省控">省控</option>
              <option value="中央资金">中央资金</option>
            </select>
          </div>

          <!-- 搜索项 5: 规模以上 -->
          <div class="flex items-center">
            <label class="w-16 shrink-0 text-gray-600 font-normal text-right pr-2">规上状态</label>
            <select
              v-model="filterParams.aboveDesignatedScale"
              class="flex-1 h-8 px-2 bg-[#f8fafc] border border-[#b8cde6] rounded text-gray-800 focus:bg-white focus:outline-none focus:border-[#1677ff] transition cursor-pointer"
            >
              <option value="">全部规模</option>
              <option value="是">是 (规上大户)</option>
              <option value="否">否 (规下)</option>
            </select>
          </div>

          <!-- 搜索项 6: 发证机关 -->
          <div class="flex items-center">
            <label class="w-16 shrink-0 text-gray-600 font-normal text-right pr-2">发证机关</label>
            <select
              v-model="filterParams.issuingAuthority"
              class="flex-1 h-8 px-2 bg-[#f8fafc] border border-[#b8cde6] rounded text-gray-800 focus:bg-white focus:outline-none focus:border-[#1677ff] transition cursor-pointer"
            >
              <option value="">全部发证机关</option>
              <option value="青海省水利厅">青海省水利厅</option>
              <option value="西宁市水务局">西宁市水务局</option>
              <option value="大通县水利局">大通县水利局</option>
              <option value="海东市水务局">海东市水务局</option>
              <option value="海西州水利局">海西州水利局</option>
              <option value="海南州水利局">海南州水利局</option>
              <option value="黄南州水利局">黄南州水利局</option>
            </select>
          </div>

          <!-- 搜索项 7: 排序规则 -->
          <div class="flex items-center">
            <label class="w-16 shrink-0 text-gray-600 font-normal text-right pr-2">排序方式</label>
            <select
              v-model="sortBy"
              class="flex-1 h-8 px-2 bg-[#f8fafc] border border-[#b8cde6] rounded text-gray-800 focus:bg-white focus:outline-none focus:border-[#1677ff] transition cursor-pointer"
            >
              <option value="score_desc">得分从高到低</option>
              <option value="score_asc">得分从低到高</option>
              <option value="name">企业名称首字母</option>
            </select>
          </div>
        </div>

        <!-- 按钮操作区与批量核算动作 -->
        <div class="flex flex-wrap items-center justify-between border-t border-gray-100 mt-2.5 pt-2 gap-2">
          <div class="text-slate-500 text-[11px] flex items-center gap-1.5 flex-wrap">
            <span class="w-1.5 h-1.5 rounded-full bg-[#1677ff]"></span>
            <span>当前辖区：<strong class="text-blue-700">{{ selectedDistrictLabel }}</strong></span>
            <span class="text-slate-300 mx-1">|</span>
            <span>纳入核算：<strong class="font-mono text-slate-800">{{ filteredScores.length }}</strong> 户</span>
            <span class="text-slate-300 mx-1">|</span>
            <span>档案达标率：<strong class="font-mono text-emerald-700 font-semibold">{{ summary.complianceRate }}%</strong></span>
          </div>

          <div class="flex items-center gap-2">
            <!-- 一键重新核算 (核心功能按钮) -->
            <button
              type="button"
              @click="handleRecalculateAll"
              :disabled="isCalculating"
              class="px-3.5 h-7.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs disabled:opacity-50"
            >
              <svg
                class="w-3.5 h-3.5"
                :class="isCalculating ? 'animate-spin' : ''"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M23 4v6h-6"></path>
                <path d="M1 20v-6h6"></path>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              <span>{{ isCalculating ? '正在核算中...' : '一键全量核算' }}</span>
            </button>

            <!-- 查询按钮 -->
            <button
              type="button"
              @click="handleSearch"
              class="px-3 h-7.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-xs font-medium flex items-center gap-1 transition cursor-pointer"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>筛选</span>
            </button>

            <!-- 重置按钮 -->
            <button
              type="button"
              @click="handleReset"
              class="px-3 h-7.5 bg-white hover:bg-gray-50 text-gray-700 border border-[#b8cde6] rounded text-xs font-medium flex items-center gap-1 transition cursor-pointer"
            >
              <svg class="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M3 21v-5h5"></path>
              </svg>
              <span>重置</span>
            </button>

            <!-- 导出核算报告 -->
            <button
              type="button"
              @click="handleExportReport"
              class="px-3 h-7.5 bg-white hover:bg-gray-50 text-gray-700 border border-[#b8cde6] rounded text-xs font-medium flex items-center gap-1 transition cursor-pointer"
            >
              <svg class="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>导出核算报表</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 3. 数据表格区 (Table Container) -->
      <div class="flex-1 min-h-0 bg-white rounded-lg border border-[#b4c7e0] shadow-2xs flex flex-col overflow-hidden">
        <!-- 表格滚动区 -->
        <div class="flex-1 overflow-auto custom-scrollbar relative">
          <table class="w-full text-xs text-left border-collapse border-separate border-spacing-0">
            <!-- 统一表头 -->
            <thead class="sticky top-0 z-20 bg-[#eaf1fb] text-gray-700 font-semibold border-b border-[#b8cde6]">
              <tr>
                <!-- 0. 序号 & 多选 -->
                <th class="py-2.5 px-2 text-center w-14 border-r border-b border-[#b8cde6] sticky top-0 left-0 z-30 bg-[#eaf1fb] shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]">
                  <div class="flex items-center justify-center gap-1">
                    <input
                      type="checkbox"
                      :checked="isAllSelected"
                      @change="toggleSelectAll"
                      class="rounded border-gray-400 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                    />
                    <span>#</span>
                  </div>
                </th>

                <!-- 1. 取水权人名称 -->
                <th class="py-2.5 px-3 min-w-[200px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  取水权人名称
                </th>

                <!-- 2. 取水许可证编号 -->
                <th class="py-2.5 px-3 min-w-[170px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  取水许可证编号
                </th>

                <!-- 3. 所属行政区划 -->
                <th class="py-2.5 px-2.5 text-center min-w-[90px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  行政辖区
                </th>

                <!-- 4. 完整度综合得分 -->
                <th class="py-2.5 px-3 text-center min-w-[120px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  综合得分 (满分100)
                </th>

                <!-- 5. 完整度评级 -->
                <th class="py-2.5 px-2.5 text-center min-w-[90px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  完整度等级
                </th>

                <!-- 6. 基础信息规范 (25分) -->
                <th class="py-2.5 px-2.5 text-center min-w-[100px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  基础信息 (25分)
                </th>

                <!-- 7. 许可凭证规范 (25分) -->
                <th class="py-2.5 px-2.5 text-center min-w-[100px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  许可凭证 (25分)
                </th>

                <!-- 8. 取水口工程 (20分) -->
                <th class="py-2.5 px-2.5 text-center min-w-[100px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  取水口工程 (20分)
                </th>

                <!-- 9. 计量监测体系 (20分) -->
                <th class="py-2.5 px-2.5 text-center min-w-[100px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  计量监测 (20分)
                </th>

                <!-- 10. 电子资料档案 (10分) -->
                <th class="py-2.5 px-2.5 text-center min-w-[100px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  电子资料 (10分)
                </th>

                <!-- 11. 缺失要素项数 -->
                <th class="py-2.5 px-2.5 text-center min-w-[100px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  待补全项
                </th>

                <!-- 12. 统一社会信用代码 -->
                <th class="py-2.5 px-3 min-w-[170px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  统一社会信用代码
                </th>

                <!-- 13. 发证机关 -->
                <th class="py-2.5 px-3 min-w-[120px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  发证机关
                </th>

                <!-- 14. 操作 (固定在最右侧) -->
                <th class="py-2.5 px-3 whitespace-nowrap text-center min-w-[140px] border-r border-b border-[#b8cde6] sticky top-0 right-0 z-30 bg-[#eaf1fb] shadow-[-2px_0_6px_-2px_rgba(0,0,0,0.06)]">
                  操作
                </th>
              </tr>
            </thead>

            <!-- 表体 -->
            <tbody>
              <!-- 空状态提示 -->
              <tr v-if="paginatedList.length === 0">
                <td colspan="15" class="py-16 text-center text-slate-400 bg-white border-b border-[#b8cde6]">
                  <div class="flex flex-col items-center justify-center gap-2">
                    <svg class="w-10 h-10 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    <span class="text-xs">暂无符合筛选条件的档案完整度核算数据</span>
                    <button
                      type="button"
                      @click="handleReset"
                      class="text-xs text-[#1677ff] hover:underline mt-1 cursor-pointer"
                    >
                      清空筛选条件
                    </button>
                  </div>
                </td>
              </tr>

              <!-- 数据行 -->
              <tr
                v-for="(row, idx) in paginatedList"
                :key="row.dossierId"
                class="hover:bg-[#f2f7fe] transition-colors border-b border-[#cde0f5]"
                :class="selectedRowKeys.includes(row.dossierId) ? 'bg-[#edf4fe]' : idx % 2 === 1 ? 'bg-[#fafcff]' : 'bg-white'"
              >
                <!-- 0. 序号 & 选择框 -->
                <td
                  class="py-2 px-2 text-center border-r border-[#cde0f5] sticky left-0 z-10 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]"
                  :class="selectedRowKeys.includes(row.dossierId) ? 'bg-[#edf4fe]' : idx % 2 === 1 ? 'bg-[#fafcff]' : 'bg-white'"
                >
                  <div class="flex items-center justify-center gap-1.5">
                    <input
                      type="checkbox"
                      :checked="selectedRowKeys.includes(row.dossierId)"
                      @change="toggleSelectRow(row.dossierId)"
                      class="rounded border-gray-400 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                    />
                    <span class="font-mono text-gray-500 text-[11px]">{{ (currentPage - 1) * pageSize + idx + 1 }}</span>
                  </div>
                </td>

                <!-- 1. 取水权人名称 -->
                <td class="py-2 px-3 border-r border-[#cde0f5]">
                  <div class="flex items-center gap-1.5">
                    <span class="font-medium text-slate-800 hover:text-blue-600 transition cursor-pointer" @click="handleOpenDetail(row)">
                      {{ row.waterOwnerName }}
                    </span>
                    <span v-if="row.aboveDesignatedScale" class="px-1 py-0.2 rounded text-[9px] bg-blue-50 text-blue-600 border border-blue-200">
                      规上
                    </span>
                  </div>
                </td>

                <!-- 2. 取水许可证编号 -->
                <td class="py-2 px-3 border-r border-[#cde0f5] font-mono text-blue-700 font-medium">
                  {{ row.permitNumber }}
                </td>

                <!-- 3. 所属行政区划 -->
                <td class="py-2 px-2.5 text-center border-r border-[#cde0f5] text-slate-600">
                  {{ row.district }}
                </td>

                <!-- 4. 综合得分 (带进度条柱) -->
                <td class="py-2 px-3 border-r border-[#cde0f5]">
                  <div class="flex items-center justify-center gap-2">
                    <div class="w-14 h-2 bg-slate-100 rounded-full overflow-hidden shrink-0">
                      <div
                        class="h-full rounded-full transition-all duration-300"
                        :class="getBarBgColor(row.level)"
                        :style="{ width: `${row.totalScore}%` }"
                      ></div>
                    </div>
                    <span class="font-mono font-bold text-xs" :class="getTextColor(row.level)">
                      {{ row.totalScore }}
                    </span>
                    <span class="text-[10px] text-slate-400">分</span>
                  </div>
                </td>

                <!-- 5. 完整度等级 Badge -->
                <td class="py-2 px-2.5 text-center border-r border-[#cde0f5]">
                  <span
                    class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold"
                    :class="getLevelBadgeClass(row.level)"
                  >
                    {{ row.level }}
                  </span>
                </td>

                <!-- 6. 基础信息得分 -->
                <td class="py-2 px-2.5 text-center border-r border-[#cde0f5] font-mono">
                  <span :class="row.basicInfoScore >= 24 ? 'text-emerald-700 font-semibold' : 'text-slate-700'">
                    {{ row.basicInfoScore }}
                  </span>
                  <span class="text-[10px] text-slate-400">/25</span>
                </td>

                <!-- 7. 许可凭证得分 -->
                <td class="py-2 px-2.5 text-center border-r border-[#cde0f5] font-mono">
                  <span :class="row.licenseInfoScore >= 24 ? 'text-indigo-700 font-semibold' : 'text-slate-700'">
                    {{ row.licenseInfoScore }}
                  </span>
                  <span class="text-[10px] text-slate-400">/25</span>
                </td>

                <!-- 8. 取水口工程得分 -->
                <td class="py-2 px-2.5 text-center border-r border-[#cde0f5] font-mono">
                  <span :class="row.engineeringScore >= 18 ? 'text-teal-700 font-semibold' : 'text-slate-700'">
                    {{ row.engineeringScore }}
                  </span>
                  <span class="text-[10px] text-slate-400">/20</span>
                </td>

                <!-- 9. 计量监测得分 -->
                <td class="py-2 px-2.5 text-center border-r border-[#cde0f5] font-mono">
                  <span :class="row.meteringScore >= 18 ? 'text-emerald-700 font-semibold' : 'text-slate-700'">
                    {{ row.meteringScore }}
                  </span>
                  <span class="text-[10px] text-slate-400">/20</span>
                </td>

                <!-- 10. 电子资料得分 -->
                <td class="py-2 px-2.5 text-center border-r border-[#cde0f5] font-mono">
                  <span :class="row.materialsScore >= 9 ? 'text-amber-700 font-semibold' : 'text-slate-700'">
                    {{ row.materialsScore }}
                  </span>
                  <span class="text-[10px] text-slate-400">/10</span>
                </td>

                <!-- 11. 缺失要素项数 -->
                <td class="py-2 px-2.5 text-center border-r border-[#cde0f5] font-mono">
                  <span
                    v-if="row.missingItems.length === 0"
                    class="text-emerald-600 font-medium inline-flex items-center gap-0.5 text-[11px]"
                  >
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    齐全
                  </span>
                  <span
                    v-else
                    class="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200"
                    :title="row.missingItems.join('；')"
                  >
                    缺 {{ row.missingItems.length }} 项
                  </span>
                </td>

                <!-- 12. 统一社会信用代码 -->
                <td class="py-2 px-3 border-r border-[#cde0f5] font-mono text-slate-600 text-[11px]">
                  {{ row.creditCode }}
                </td>

                <!-- 13. 发证机关 -->
                <td class="py-2 px-3 border-r border-[#cde0f5] text-slate-600">
                  {{ row.issuingAuthority }}
                </td>

                <!-- 14. 操作列 (固定在最右侧) -->
                <td
                  class="py-2 px-3 text-center border-r border-[#cde0f5] whitespace-nowrap sticky right-0 z-10 shadow-[-2px_0_6px_-2px_rgba(0,0,0,0.06)]"
                  :class="selectedRowKeys.includes(row.dossierId) ? 'bg-[#edf4fe]' : idx % 2 === 1 ? 'bg-[#fafcff]' : 'bg-white'"
                >
                  <div class="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      @click="handleOpenDetail(row)"
                      class="px-2 py-1 text-xs font-medium text-[#1677ff] hover:text-blue-800 hover:bg-blue-50 rounded transition cursor-pointer flex items-center gap-1"
                      title="查看核算评分报告"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                      <span>核算诊断</span>
                    </button>

                    <button
                      type="button"
                      @click="handleSingleRecalculate(row.dossierId)"
                      class="px-2 py-1 text-xs font-medium text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded transition cursor-pointer flex items-center gap-1"
                      title="重新计算当前档案"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M23 4v6h-6"></path>
                        <path d="M1 20v-6h6"></path>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                      </svg>
                      <span>重新核算</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 分页底部栏 (Pagination Bar) -->
        <div class="px-3.5 py-2 border-t border-[#b8cde6] bg-white flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs text-gray-600">
          <!-- 左侧：选中数量与数据总计 -->
          <div class="flex items-center gap-3">
            <span class="text-slate-500">
              共 <strong class="font-mono text-slate-800">{{ filteredScores.length }}</strong> 条档案核算记录
            </span>
            <span v-if="selectedRowKeys.length > 0" class="text-blue-600 font-medium">
              已选中 {{ selectedRowKeys.length }} 项
            </span>
          </div>

          <!-- 右侧：分页控件 -->
          <div class="flex items-center gap-2">
            <!-- 每页条数选择 -->
            <div class="flex items-center gap-1">
              <span class="text-gray-500">每页</span>
              <select
                v-model="pageSize"
                @change="currentPage = 1"
                class="h-7 px-2 border border-[#b8cde6] rounded bg-[#f8fafc] text-gray-700 cursor-pointer focus:outline-none focus:border-[#1677ff]"
              >
                <option :value="10">10 条</option>
                <option :value="15">15 条</option>
                <option :value="20">20 条</option>
                <option :value="50">50 条</option>
              </select>
            </div>

            <!-- 页码切换 -->
            <div class="flex items-center gap-1">
              <button
                type="button"
                @click="currentPage > 1 && currentPage--"
                :disabled="currentPage === 1"
                class="px-2 h-7 border border-[#b8cde6] rounded bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                上一页
              </button>

              <span class="px-2 font-mono text-slate-700">
                {{ currentPage }} / {{ totalPages || 1 }}
              </span>

              <button
                type="button"
                @click="currentPage < totalPages && currentPage++"
                :disabled="currentPage >= totalPages"
                class="px-2 h-7 border border-[#b8cde6] rounded bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                下一页
              </button>
            </div>

            <!-- 跳转页 -->
            <div class="flex items-center gap-1 pl-2">
              <span class="text-gray-500">跳至</span>
              <input
                type="number"
                v-model.number="jumpPageInput"
                @keyup.enter="handleJumpPage"
                class="w-12 h-7 px-1.5 text-center border border-[#b8cde6] rounded bg-[#f8fafc] focus:outline-none focus:border-[#1677ff]"
                min="1"
                :max="totalPages"
              />
              <span class="text-gray-500">页</span>
              <button
                type="button"
                @click="handleJumpPage"
                class="px-2 h-7 border border-[#b8cde6] rounded bg-white hover:bg-gray-50 transition cursor-pointer text-gray-700"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 档案完整度诊断明细弹窗 -->
    <DossierCompletenessDetailModal
      v-model:visible="detailModalVisible"
      :score-data="currentScoreRecord"
      @recalculate="handleSingleRecalculate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import WaterDistrictTree from './WaterDistrictTree.vue';
import DossierCompletenessDetailModal from './DossierCompletenessDetailModal.vue';
import type {
  DossierCompletenessScore,
  DossierCompletenessLevel,
  DossierCompletenessFilterParams
} from '../../types';
import {
  mockDossierCompletenessScores,
  computeCompletenessSummary,
  calculateDossierScore
} from '../../data/mockDossierCompletenessData';
import { mockEnterpriseDossiers } from '../../mockEnterpriseDossierData';

// 基础状态
const selectedDistrict = ref<string>('全部');
const isCalculating = ref<boolean>(false);
const allScores = ref<DossierCompletenessScore[]>([...mockDossierCompletenessScores]);
const selectedRowKeys = ref<string[]>([]);

// 弹窗状态
const detailModalVisible = ref<boolean>(false);
const currentScoreRecord = ref<DossierCompletenessScore | null>(null);

// 筛选与排序参数
const filterParams = reactive<DossierCompletenessFilterParams>({
  keyword: '',
  district: '',
  completenessLevel: '',
  scoreRange: '',
  dataSourceType: '',
  aboveDesignatedScale: '',
  issuingAuthority: '',
});

const sortBy = ref<string>('score_desc');

// 分页控制
const currentPage = ref<number>(1);
const pageSize = ref<number>(15);
const jumpPageInput = ref<number>(1);

// 计算当前辖区名称
const selectedDistrictLabel = computed(() => {
  return selectedDistrict.value === '全部' ? '全省汇总' : selectedDistrict.value;
});

// 筛选后的完整数据集
const filteredScores = computed(() => {
  return allScores.value.filter(item => {
    // 辖区树过滤
    if (selectedDistrict.value !== '全部' && selectedDistrict.value !== '青海省') {
      if (item.district !== selectedDistrict.value) return false;
    }

    // 关键字搜索 (权人名称、信用代码、许可证号)
    if (filterParams.keyword.trim()) {
      const kw = filterParams.keyword.trim().toLowerCase();
      const matchName = item.waterOwnerName.toLowerCase().includes(kw);
      const matchPermit = item.permitNumber.toLowerCase().includes(kw);
      const matchCode = item.creditCode.toLowerCase().includes(kw);
      if (!matchName && !matchPermit && !matchCode) return false;
    }

    // 完整度评级
    if (filterParams.completenessLevel && item.level !== filterParams.completenessLevel) {
      return false;
    }

    // 得分区间过滤
    if (filterParams.scoreRange) {
      if (filterParams.scoreRange === 'ge90' && item.totalScore < 90) return false;
      if (filterParams.scoreRange === '80to89' && (item.totalScore < 80 || item.totalScore >= 90)) return false;
      if (filterParams.scoreRange === '60to79' && (item.totalScore < 60 || item.totalScore >= 80)) return false;
      if (filterParams.scoreRange === 'lt60' && item.totalScore >= 60) return false;
    }

    // 数据来源类型
    if (filterParams.dataSourceType && item.dataSourceType !== filterParams.dataSourceType) {
      return false;
    }

    // 规上状态
    if (filterParams.aboveDesignatedScale) {
      const isAbove = filterParams.aboveDesignatedScale === '是';
      if (item.aboveDesignatedScale !== isAbove) return false;
    }

    // 发证机关
    if (filterParams.issuingAuthority && item.issuingAuthority !== filterParams.issuingAuthority) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy.value === 'score_desc') {
      return b.totalScore - a.totalScore;
    } else if (sortBy.value === 'score_asc') {
      return a.totalScore - b.totalScore;
    } else if (sortBy.value === 'name') {
      return a.waterOwnerName.localeCompare(b.waterOwnerName, 'zh');
    }
    return 0;
  });
});

// 统计大盘指标
const summary = computed(() => {
  return computeCompletenessSummary(filteredScores.value);
});

// 分页切片列表
const totalPages = computed(() => Math.ceil(filteredScores.value.length / pageSize.value));

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredScores.value.slice(start, start + pageSize.value);
});

// 全选判断
const isAllSelected = computed(() => {
  if (paginatedList.value.length === 0) return false;
  return paginatedList.value.every(row => selectedRowKeys.value.includes(row.dossierId));
});

// 百分比计算小助手
const getPercent = (count: number) => {
  if (!summary.value.totalCount) return '0.0';
  return ((count / summary.value.totalCount) * 100).toFixed(1);
};

// 交互动作
const handleDistrictSelect = (district: string) => {
  selectedDistrict.value = district;
  currentPage.value = 1;
};

const handleSearch = () => {
  currentPage.value = 1;
  MessagePlugin.success(`检索完成，匹配到 ${filteredScores.value.length} 条核算结果`);
};

const handleReset = () => {
  filterParams.keyword = '';
  filterParams.district = '';
  filterParams.completenessLevel = '';
  filterParams.scoreRange = '';
  filterParams.dataSourceType = '';
  filterParams.aboveDesignatedScale = '';
  filterParams.issuingAuthority = '';
  sortBy.value = 'score_desc';
  selectedDistrict.value = '全部';
  currentPage.value = 1;
  selectedRowKeys.value = [];
  MessagePlugin.info('核算筛选条件与辖区已全部重置');
};

const quickFilterByLevel = (level: DossierCompletenessLevel) => {
  filterParams.completenessLevel = filterParams.completenessLevel === level ? '' : level;
  currentPage.value = 1;
};

// 一键全量重新核算
const handleRecalculateAll = () => {
  isCalculating.value = true;
  MessagePlugin.info('正在基于最新一户一档业务数据与国标规则重新核算...');
  
  setTimeout(() => {
    allScores.value = mockEnterpriseDossiers.map(dossier => calculateDossierScore(dossier));
    isCalculating.value = false;
    MessagePlugin.success(`全量 ${allScores.value.length} 户档案完整度重新核算完毕，最新平均得分 ${summary.value.averageScore} 分`);
  }, 600);
};

// 单条档案重新核算
const handleSingleRecalculate = (id: string) => {
  const targetDossier = mockEnterpriseDossiers.find(d => d.id === id);
  if (targetDossier) {
    const updatedScore = calculateDossierScore(targetDossier);
    const idx = allScores.value.findIndex(s => s.dossierId === id);
    if (idx !== -1) {
      allScores.value[idx] = updatedScore;
      if (currentScoreRecord.value && currentScoreRecord.value.dossierId === id) {
        currentScoreRecord.value = updatedScore;
      }
    }
    MessagePlugin.success(`【${targetDossier.waterOwnerName}】一户一档已重新核算完毕（得分: ${updatedScore.totalScore}分）`);
  }
};

// 查看明细弹窗
const handleOpenDetail = (row: DossierCompletenessScore) => {
  currentScoreRecord.value = row;
  detailModalVisible.value = true;
};

// 导出核算报表
const handleExportReport = () => {
  MessagePlugin.success(`正在导出【${selectedDistrictLabel.value}】一户一档完整度核算报表（共 ${filteredScores.value.length} 条记录）...`);
};

// 行选择
const toggleSelectRow = (id: string) => {
  const idx = selectedRowKeys.value.indexOf(id);
  if (idx > -1) {
    selectedRowKeys.value.splice(idx, 1);
  } else {
    selectedRowKeys.value.push(id);
  }
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    const pageIds = paginatedList.value.map(r => r.dossierId);
    selectedRowKeys.value = selectedRowKeys.value.filter(id => !pageIds.includes(id));
  } else {
    paginatedList.value.forEach(r => {
      if (!selectedRowKeys.value.includes(r.dossierId)) {
        selectedRowKeys.value.push(r.dossierId);
      }
    });
  }
};

const handleJumpPage = () => {
  if (jumpPageInput.value >= 1 && jumpPageInput.value <= totalPages.value) {
    currentPage.value = jumpPageInput.value;
  } else {
    MessagePlugin.warning(`请输入有效页码 (1-${totalPages.value})`);
  }
};

// 视觉样式映射
const getLevelBadgeClass = (level: DossierCompletenessLevel) => {
  switch (level) {
    case '优秀':
      return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
    case '良好':
      return 'bg-blue-100 text-blue-800 border border-blue-300';
    case '一般':
      return 'bg-amber-100 text-amber-800 border border-amber-300';
    case '较差':
      return 'bg-rose-100 text-rose-800 border border-rose-300';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const getTextColor = (level: DossierCompletenessLevel) => {
  switch (level) {
    case '优秀':
      return 'text-emerald-600';
    case '良好':
      return 'text-blue-600';
    case '一般':
      return 'text-amber-600';
    case '较差':
      return 'text-rose-600';
    default:
      return 'text-slate-700';
  }
};

const getBarBgColor = (level: DossierCompletenessLevel) => {
  switch (level) {
    case '优秀':
      return 'bg-emerald-500';
    case '良好':
      return 'bg-blue-500';
    case '一般':
      return 'bg-amber-500';
    case '较差':
      return 'bg-rose-500';
    default:
      return 'bg-slate-400';
  }
};
</script>
