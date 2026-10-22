<template>
  <div class="flex-1 h-full overflow-y-auto bg-[#f1f5f9] p-3 sm:p-4 text-slate-800 flex flex-col gap-3.5 custom-scrollbar select-none">
    
    <!-- Top Row: 5 Metric Cards matching the screenshot -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      
      <!-- Card 1: 许可证有效期 -->
      <div
        class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-red-300 transition"
        @click="handleNavigate('license_water_reporting')"
      >
        <div class="w-10 h-10 rounded-lg bg-red-50 text-red-500 border border-red-100 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <div class="min-w-0">
          <div class="text-xs font-bold text-slate-800">许可证有效期</div>
          <div class="mt-1 flex flex-col text-[11px] leading-tight">
            <span class="text-red-600 font-medium">过期: 29 本</span>
            <span class="text-red-500 font-medium">临期: 8 本</span>
          </div>
        </div>
      </div>

      <!-- Card 2: 超许可数量 -->
      <div
        class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-amber-300 transition"
        @click="handleNavigate('violation_national')"
      >
        <div class="w-10 h-10 rounded-lg bg-amber-50 text-amber-500 border border-amber-100 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </div>
        <div class="min-w-0">
          <div class="text-xs font-bold text-slate-800">超许可数量</div>
          <div class="mt-1 text-sky-500 font-mono text-sm font-semibold">
            -- 个 个
          </div>
        </div>
      </div>

      <!-- Card 3: 规模以上非农 -->
      <div
        class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-sky-300 transition"
        @click="handleNavigate('facility_management')"
      >
        <div class="w-10 h-10 rounded-lg bg-sky-50 text-sky-500 border border-sky-100 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="min-w-0">
          <div class="text-xs font-bold text-slate-800">规模以上非农</div>
          <div class="mt-1 text-[11px] text-sky-600 font-medium leading-tight">
            <div>应接: 309 个</div>
            <div>已接: 304 个</div>
            <div>接入率: 98.38 %</div>
          </div>
        </div>
      </div>

      <!-- Card 4: 规模以上农业 -->
      <div
        class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-pink-300 transition"
        @click="handleNavigate('irrigation_accounting')"
      >
        <div class="w-10 h-10 rounded-lg bg-pink-50 text-pink-500 border border-pink-100 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </div>
        <div class="min-w-0">
          <div class="text-xs font-bold text-slate-800">规模以上农业</div>
          <div class="mt-1 text-[11px] text-sky-600 font-medium leading-tight">
            <div>应接: 22 个</div>
            <div>已接: 22 个</div>
            <div>接入率: 100 %</div>
          </div>
        </div>
      </div>

      <!-- Card 5: 中央资金建设情况 -->
      <div class="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs flex flex-col justify-between">
        <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
          <div class="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <span>中央资金建设情况</span>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-full border border-blue-400 text-blue-600 bg-blue-50/50 font-medium cursor-pointer hover:bg-blue-100/50">
            近三年
          </span>
        </div>

        <!-- Table rows -->
        <table class="w-full text-[11px] mt-1.5">
          <thead>
            <tr class="text-slate-400">
              <th class="font-normal text-left pb-1">年份</th>
              <th class="font-normal text-center pb-1">应接</th>
              <th class="font-normal text-center pb-1">已接</th>
              <th class="font-normal text-right pb-1">接入率</th>
            </tr>
          </thead>
          <tbody class="font-mono divide-y divide-slate-50">
            <tr class="text-slate-800">
              <td class="font-bold text-left py-0.5">26年</td>
              <td class="text-center text-slate-600 py-0.5">312</td>
              <td class="text-center text-slate-600 py-0.5">308</td>
              <td class="text-right font-bold text-sky-600 py-0.5">98.72%</td>
            </tr>
            <tr class="text-slate-800">
              <td class="font-bold text-left py-0.5">25年</td>
              <td class="text-center text-slate-600 py-0.5">427</td>
              <td class="text-center text-slate-600 py-0.5">423</td>
              <td class="text-right font-bold text-sky-600 py-0.5">99.06%</td>
            </tr>
            <tr class="text-slate-800">
              <td class="font-bold text-left py-0.5">24年</td>
              <td class="text-center text-slate-600 py-0.5">677</td>
              <td class="text-center text-slate-600 py-0.5">658</td>
              <td class="text-right font-bold text-sky-600 py-0.5">97.19%</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <!-- Main Content Area: 3 Columns Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1 min-h-0">
      
      <!-- ================= LEFT COLUMN: 待办事项 & 取水许可证照统计 ================= -->
      <div class="lg:col-span-3 flex flex-col gap-3.5">
        
        <!-- Box 1: 待办事项 -->
        <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col">
          <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div class="flex items-center gap-1.5">
              <span class="w-1.5 h-4 bg-sky-500 rounded-full inline-block"></span>
              <span class="text-xs font-bold text-slate-800">待办事项</span>
            </div>
            <span class="text-[11px] px-2 py-0.5 rounded-full border border-amber-300 text-amber-600 bg-amber-50/80 font-medium">
              共 16 项待审
            </span>
          </div>

          <!-- To-do item list -->
          <div class="space-y-2 mt-2.5">
            <!-- 1. 取水计划填报待审 -->
            <div
              class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-pointer"
              @click="handleNavigate('water_plan_management')"
            >
              <div class="flex items-center gap-2 min-w-0">
                <div class="w-7 h-7 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <span class="text-xs font-medium text-slate-700 truncate">取水计划填报待审</span>
              </div>
              <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-600 font-bold border border-sky-100 shrink-0">
                4 条
              </span>
            </div>

            <!-- 2. 数据修订待审 -->
            <div
              class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-pointer"
              @click="handleNavigate('water_data_revision')"
            >
              <div class="flex items-center gap-2 min-w-0">
                <div class="w-7 h-7 rounded-md bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="18" x2="12" y2="12"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                  </svg>
                </div>
                <span class="text-xs font-medium text-slate-700 truncate">数据修订待审</span>
              </div>
              <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 font-bold border border-amber-100 shrink-0">
                3 条
              </span>
            </div>

            <!-- 3. 工单修订待审 -->
            <div
              class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-pointer"
              @click="handleNavigate('fault')"
            >
              <div class="flex items-center gap-2 min-w-0">
                <div class="w-7 h-7 rounded-md bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <span class="text-xs font-medium text-slate-700 truncate">工单修订待审</span>
              </div>
              <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 font-bold border border-purple-100 shrink-0">
                2 条
              </span>
            </div>

            <!-- 4. 计量申请待审 -->
            <div
              class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-pointer"
              @click="handleNavigate('facility_management')"
            >
              <div class="flex items-center gap-2 min-w-0">
                <div class="w-7 h-7 rounded-md bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 14 14"></polyline>
                  </svg>
                </div>
                <span class="text-xs font-medium text-slate-700 truncate">计量申请待审</span>
              </div>
              <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold border border-emerald-100 shrink-0">
                5 条
              </span>
            </div>

            <!-- 5. 人工填报待审 -->
            <div
              class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-pointer"
              @click="handleNavigate('manual_collection')"
            >
              <div class="flex items-center gap-2 min-w-0">
                <div class="w-7 h-7 rounded-md bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                    <path d="M2 2l7.586 7.586"></path>
                    <circle cx="11" cy="11" r="2"></circle>
                  </svg>
                </div>
                <span class="text-xs font-medium text-slate-700 truncate">人工填报待审</span>
              </div>
              <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold border border-rose-100 shrink-0">
                2 条
              </span>
            </div>
          </div>
        </div>

        <!-- Box 2: 取水许可证照统计(个) -->
        <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <span class="w-1.5 h-4 bg-sky-500 rounded-full inline-block"></span>
              <span class="text-xs font-bold text-slate-800">取水许可证照统计(个)</span>
            </div>

            <!-- Legend Items (8 Statuses) -->
            <div class="grid grid-cols-4 gap-y-1.5 gap-x-1 mt-2.5 text-[11px]">
              <div
                v-for="item in licenseLegend"
                :key="item.label"
                class="flex items-center gap-1 cursor-pointer hover:opacity-80 transition"
                @mouseenter="activeSlice = item.label"
                @mouseleave="activeSlice = null"
              >
                <span class="w-2.5 h-2.5 rounded-xs shrink-0" :style="{ backgroundColor: item.color }"></span>
                <span class="text-slate-600 truncate">{{ item.label }}</span>
              </div>
            </div>
          </div>

          <!-- Pie / Donut Chart with Leader Labels -->
          <div class="relative w-full h-[220px] flex items-center justify-center my-1">
            <svg viewBox="0 0 340 240" class="w-full h-full overflow-visible">
              <!-- Slices -->
              <g transform="translate(170, 118)">
                <path
                  v-for="(slice, idx) in pieSlices"
                  :key="idx"
                  :d="slice.d"
                  :fill="slice.color"
                  stroke="#ffffff"
                  stroke-width="1.8"
                  :opacity="activeSlice && activeSlice !== slice.label ? 0.45 : 1"
                  class="transition-all duration-200 cursor-pointer hover:scale-102 origin-center"
                  @mouseenter="activeSlice = slice.label"
                  @mouseleave="activeSlice = null"
                />
              </g>

              <!-- Annotation leader lines and text labels -->
              <!-- 1. 新办 1226 ... (Right upper) -->
              <polyline points="230,80 260,65 295,65" fill="none" stroke="#94a3b8" stroke-width="0.9" />
              <text x="300" y="68" fill="#475569" font-size="10" font-family="sans-serif">新办 1226 ...</text>

              <!-- 2. 延续 614 个 (18.08%) (Bottom right) -->
              <polyline points="215,160 245,185 275,185" fill="none" stroke="#94a3b8" stroke-width="0.9" />
              <text x="280" y="188" fill="#475569" font-size="10" font-family="sans-serif">延续 614 个 (18.08%)</text>

              <!-- 3. 临时 8 个 (0.24%) (Bottom center-right) -->
              <polyline points="180,185 180,205 160,205" fill="none" stroke="#94a3b8" stroke-width="0.9" />
              <text x="110" y="222" fill="#475569" font-size="9.5" font-family="sans-serif">临时 8 个 (0.24%)</text>

              <!-- 4. 过期 29 个 (0.85%) (Bottom center-left) -->
              <polyline points="160,188 150,208 90,208" fill="none" stroke="#94a3b8" stroke-width="0.9" />
              <text x="50" y="210" fill="#475569" font-size="9.5" font-family="sans-serif">过期 29 个 (0.85%)</text>

              <!-- 5. 变更 454 个 (... (Bottom left) -->
              <polyline points="120,165 90,175 60,175" fill="none" stroke="#94a3b8" stroke-width="0.9" />
              <text x="30" y="172" fill="#475569" font-size="10" font-family="sans-serif">变更 454 个 (...</text>

              <!-- 6. 注销 939 ... (Left upper) -->
              <polyline points="105,100 75,90 40,90" fill="none" stroke="#94a3b8" stroke-width="0.9" />
              <text x="25" y="86" fill="#475569" font-size="10" font-family="sans-serif">注销 939 ...</text>

              <!-- 7. 撤销 127 个 (3.74%) (Top left) -->
              <polyline points="150,55 130,40 100,40" fill="none" stroke="#94a3b8" stroke-width="0.9" />
              <text x="95" y="32" text-anchor="middle" fill="#475569" font-size="9.5" font-family="sans-serif">撤销 127 个 (3.74%)</text>
            </svg>
          </div>

          <!-- Bottom Right Pill: 有效证照总数: 2331个 -->
          <div class="flex justify-end pt-1">
            <div
              class="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-sky-400 bg-sky-50/60 text-sky-600 font-medium text-xs shadow-2xs hover:bg-sky-100 transition cursor-pointer"
              @click="handleNavigate('license_water_reporting')"
            >
              <span>有效证照总数: <strong class="font-mono font-bold">2331</strong>个</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>

      </div>

      <!-- ================= MIDDLE COLUMN: 取水许可审批余量分布 (青海省地图 & 市州统计柱状图) ================= -->
      <div class="lg:col-span-5 bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between min-h-[580px]">
        
        <!-- Header & 青海省 Switcher -->
        <div class="relative flex items-center justify-center pb-2">
          <button
            type="button"
            class="absolute left-0 top-0 bg-[#1890ff] hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md font-medium shadow-xs transition cursor-pointer flex items-center gap-1"
          >
            <span>青海省</span>
          </button>
          
          <h2 class="text-sm font-bold text-slate-800 text-center tracking-wide">
            取水许可审批余量分布
          </h2>
        </div>

        <!-- SVG Map of Qinghai Province with all 8 Prefectures/Cities -->
        <div class="relative w-full flex-1 min-h-[340px] flex items-center justify-center">
          
          <!-- Legend on Bottom Left -->
          <div class="absolute bottom-2 left-2 z-10 bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 text-xs shadow-2xs">
            <div class="font-bold text-slate-800 text-[11px] mb-1.5">审批余量区间 (万 m³)</div>
            <div class="space-y-1 text-[10px] text-slate-700 font-mono">
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-xs bg-[#7f1d2b] shrink-0"></span>
                <span>> 100</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-xs bg-[#b84d2a] shrink-0"></span>
                <span>70 - 100</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-xs bg-[#968025] shrink-0"></span>
                <span>50 - 70</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-xs bg-[#2e8258] shrink-0"></span>
                <span>0 - 50</span>
              </div>
            </div>
          </div>

          <!-- Hover Tooltip Floating Card -->
          <div
            v-if="hoveredPrefecture"
            class="absolute top-2 right-2 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-lg border border-sky-400 text-white shadow-xl text-xs min-w-[170px]"
          >
            <div class="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
              <span class="font-bold text-sky-300">{{ hoveredPrefecture.name }}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-200">
                余量: {{ hoveredPrefecture.margin }} 万m³
              </span>
            </div>
            <div class="space-y-1 text-[11px] text-slate-300">
              <div class="flex justify-between">
                <span>许可户数:</span>
                <span class="text-white font-mono">{{ hoveredPrefecture.permits }} 户</span>
              </div>
              <div class="flex justify-between">
                <span>计量点位:</span>
                <span class="text-emerald-400 font-mono">{{ hoveredPrefecture.meters }} 处</span>
              </div>
              <div class="flex justify-between">
                <span>在线率:</span>
                <span class="text-cyan-400 font-mono">{{ hoveredPrefecture.onlineRate }}%</span>
              </div>
            </div>
          </div>

          <!-- Interactive Qinghai Province SVG Map -->
          <svg viewBox="0 0 650 430" class="w-full h-full max-h-[360px] select-none">
            <defs>
              <filter id="map-drop-shadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.12" />
              </filter>
            </defs>

            <!-- 1. 海西蒙古族藏族自治州 (海西州 - Northwest vast block) -->
            <path
              d="M 60,185 L 75,160 L 105,145 L 140,150 L 180,120 L 220,115 L 265,130 L 290,140 L 320,165 L 340,195 L 330,225 L 300,240 L 265,245 L 235,270 L 190,265 L 145,260 L 110,230 L 80,225 Z"
              fill="#2e8258"
              stroke="#ffffff"
              stroke-width="1.6"
              stroke-linejoin="round"
              filter="url(#map-drop-shadow)"
              class="transition-colors duration-150 cursor-pointer hover:fill-[#389e6c]"
              @mouseenter="hoveredPrefecture = prefectureData['haixi']"
              @mouseleave="hoveredPrefecture = null"
              @click="handleSelectDistrict('海西州')"
            />
            <text x="195" y="195" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" pointer-events="none">
              海西州
            </text>

            <!-- 2. 海北藏族自治州 (海北州 - North of Qinghai Lake) -->
            <path
              d="M 290,140 L 330,125 L 380,120 L 420,135 L 435,165 L 415,185 L 380,180 L 340,195 L 320,165 Z"
              fill="#2e8258"
              stroke="#ffffff"
              stroke-width="1.6"
              stroke-linejoin="round"
              filter="url(#map-drop-shadow)"
              class="transition-colors duration-150 cursor-pointer hover:fill-[#389e6c]"
              @mouseenter="hoveredPrefecture = prefectureData['haibei']"
              @mouseleave="hoveredPrefecture = null"
              @click="handleSelectDistrict('海北州')"
            />
            <text x="375" y="155" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" pointer-events="none">
              海北州
            </text>

            <!-- 3. 西宁市 (Xining - Capital urban area) -->
            <path
              d="M 415,185 L 440,180 L 452,195 L 435,208 L 415,200 Z"
              fill="#2e8258"
              stroke="#ffffff"
              stroke-width="1.6"
              stroke-linejoin="round"
              filter="url(#map-drop-shadow)"
              class="transition-colors duration-150 cursor-pointer hover:fill-[#389e6c]"
              @mouseenter="hoveredPrefecture = prefectureData['xining']"
              @mouseleave="hoveredPrefecture = null"
              @click="handleSelectDistrict('西宁市')"
            />
            <text x="432" y="195" fill="#ffffff" font-size="10.5" font-weight="bold" text-anchor="middle" pointer-events="none">
              西宁市
            </text>

            <!-- 4. 海东市 (Haidong - East gate) -->
            <path
              d="M 440,180 L 475,185 L 485,215 L 465,235 L 445,225 L 435,208 L 452,195 Z"
              fill="#2e8258"
              stroke="#ffffff"
              stroke-width="1.6"
              stroke-linejoin="round"
              filter="url(#map-drop-shadow)"
              class="transition-colors duration-150 cursor-pointer hover:fill-[#389e6c]"
              @mouseenter="hoveredPrefecture = prefectureData['haidong']"
              @mouseleave="hoveredPrefecture = null"
              @click="handleSelectDistrict('海东市')"
            />
            <text x="462" y="212" fill="#ffffff" font-size="10.5" font-weight="bold" text-anchor="middle" pointer-events="none">
              海东市
            </text>

            <!-- 5. 海南藏族自治州 (海南州 - Central-east, around south of Qinghai lake) -->
            <path
              d="M 330,225 L 340,195 L 380,180 L 415,200 L 435,208 L 445,225 L 430,265 L 390,270 L 360,260 L 330,245 Z"
              fill="#2e8258"
              stroke="#ffffff"
              stroke-width="1.6"
              stroke-linejoin="round"
              filter="url(#map-drop-shadow)"
              class="transition-colors duration-150 cursor-pointer hover:fill-[#389e6c]"
              @mouseenter="hoveredPrefecture = prefectureData['hainan']"
              @mouseleave="hoveredPrefecture = null"
              @click="handleSelectDistrict('海南州')"
            />
            <text x="382" y="235" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" pointer-events="none">
              海南州
            </text>

            <!-- 6. 黄南藏族自治州 (黄南州 - South of Haidong) -->
            <path
              d="M 445,225 L 465,235 L 475,270 L 450,295 L 430,265 Z"
              fill="#378e63"
              stroke="#ffffff"
              stroke-width="1.6"
              stroke-linejoin="round"
              filter="url(#map-drop-shadow)"
              class="transition-colors duration-150 cursor-pointer hover:fill-[#3ea772]"
              @mouseenter="hoveredPrefecture = prefectureData['huangnan']"
              @mouseleave="hoveredPrefecture = null"
              @click="handleSelectDistrict('黄南州')"
            />
            <text x="452" y="260" fill="#ffffff" font-size="10.5" font-weight="bold" text-anchor="middle" pointer-events="none">
              黄南州
            </text>

            <!-- 7. 果洛藏族自治州 (果洛州 - Southeast region) -->
            <path
              d="M 360,260 L 390,270 L 430,265 L 450,295 L 465,335 L 420,385 L 380,350 L 345,305 Z"
              fill="#2e8258"
              stroke="#ffffff"
              stroke-width="1.6"
              stroke-linejoin="round"
              filter="url(#map-drop-shadow)"
              class="transition-colors duration-150 cursor-pointer hover:fill-[#389e6c]"
              @mouseenter="hoveredPrefecture = prefectureData['guoluo']"
              @mouseleave="hoveredPrefecture = null"
              @click="handleSelectDistrict('果洛州')"
            />
            <text x="405" y="325" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" pointer-events="none">
              果洛州
            </text>

            <!-- 8. 玉树藏族自治州 (玉树州 - Vast southern portion) -->
            <path
              d="M 190,265 L 235,270 L 265,245 L 300,240 L 330,245 L 345,305 L 380,350 L 420,385 L 390,415 L 350,405 L 295,390 L 230,350 L 170,305 Z"
              fill="#2e8258"
              stroke="#ffffff"
              stroke-width="1.6"
              stroke-linejoin="round"
              filter="url(#map-drop-shadow)"
              class="transition-colors duration-150 cursor-pointer hover:fill-[#389e6c]"
              @mouseenter="hoveredPrefecture = prefectureData['yushu']"
              @mouseleave="hoveredPrefecture = null"
              @click="handleSelectDistrict('玉树州')"
            />
            <text x="285" y="340" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" pointer-events="none">
              玉树州
            </text>
          </svg>
        </div>

        <!-- Bottom Section: 各市州取水许可审批余量统计(万m³) -->
        <div class="pt-3 border-t border-slate-100">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-1.5">
              <span class="w-1.5 h-3.5 bg-sky-500 rounded-full inline-block"></span>
              <span class="text-xs font-bold text-slate-800">各市州取水许可审批余量统计(万m³)</span>
            </div>
            <span class="text-[11px] text-slate-400">单位: 万m³</span>
          </div>

          <!-- Bar Chart Canvas -->
          <div class="relative w-full h-[140px] pt-1">
            <svg viewBox="0 0 540 130" class="w-full h-full overflow-visible">
              <!-- Horizontal grid lines for 0, 50, 100, 150, 200, 250, 300 -->
              <g stroke="#f1f5f9" stroke-width="1">
                <line x1="45" y1="15" x2="520" y2="15" />
                <line x1="45" y1="31" x2="520" y2="31" />
                <line x1="45" y1="47" x2="520" y2="47" />
                <line x1="45" y1="63" x2="520" y2="63" />
                <line x1="45" y1="79" x2="520" y2="79" />
                <line x1="45" y1="95" x2="520" y2="95" />
                <line x1="45" y1="110" x2="520" y2="110" stroke="#e2e8f0" />
              </g>

              <!-- Y Axis Labels -->
              <g fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="end">
                <text x="40" y="18">300</text>
                <text x="40" y="34">250</text>
                <text x="40" y="50">200</text>
                <text x="40" y="66">150</text>
                <text x="40" y="82">100</text>
                <text x="40" y="98">50</text>
                <text x="40" y="113">0</text>
              </g>

              <!-- Bars for each of the 8 prefectures -->
              <g v-for="(b, idx) in prefectureBarData" :key="b.name">
                <!-- Bar rect -->
                <rect
                  :x="70 + idx * 56"
                  :y="110 - (b.value / 300) * 95"
                  width="18"
                  :height="Math.max(2, (b.value / 300) * 95)"
                  :fill="b.isHighlight ? '#b39ddb' : '#38bdf8'"
                  rx="2"
                  class="transition-all duration-300 cursor-pointer hover:opacity-85"
                >
                  <title>{{ b.name }}: {{ b.value }} 万m³</title>
                </rect>

                <!-- X Axis Label -->
                <text
                  :x="79 + idx * 56"
                  y="124"
                  fill="#64748b"
                  font-size="9"
                  font-family="sans-serif"
                  text-anchor="middle"
                >
                  {{ b.name }}
                </text>
              </g>
            </svg>
          </div>
        </div>

      </div>

      <!-- ================= RIGHT COLUMN: 用水户类型及用水情况 & 重点取水户 ================= -->
      <div class="lg:col-span-4 flex flex-col gap-3.5">
        
        <!-- Box 1: 用水户类型及用水情况 -->
        <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col">
          <div class="flex items-center gap-1.5 mb-1">
            <span class="w-1.5 h-4 bg-sky-500 rounded-full inline-block"></span>
            <span class="text-xs font-bold text-slate-800">用水户类型及用水情况</span>
          </div>

          <div class="text-[11px] text-slate-500 mb-2">
            本年度已报名录总数: <strong class="font-bold font-mono text-slate-700">2819</strong> 个，用水总量 <strong class="font-bold font-mono text-slate-700">523.17</strong> 万m³
          </div>

          <!-- Chart Legend -->
          <div class="flex items-center justify-end gap-3 text-[11px] text-slate-600 mb-1">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-xs bg-[#22c55e]"></span>
              <span>用水户 (柱)</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-0.5 bg-[#8b5cf6] border-t-2 border-dashed border-[#8b5cf6]"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] -ml-2.5 mr-1"></span>
              <span>用水量 (折线)</span>
            </div>
          </div>

          <!-- Dual Axis Chart (Bars + Smooth Line) -->
          <div class="relative w-full h-[185px]">
            
            <!-- Tooltip Hover Overlay (Showing "鱼塘" as shown in screenshot) -->
            <div
              class="absolute left-[38%] top-[12%] z-20 bg-white/95 backdrop-blur-xs p-2 rounded-lg border border-slate-200 text-xs shadow-md pointer-events-none transition-all"
            >
              <div class="font-bold text-slate-800 text-[11px] mb-1">鱼塘</div>
              <div class="flex items-center gap-1.5 text-[10px] text-slate-700 font-medium">
                <span class="w-2 h-2 rounded-xs bg-[#22c55e]"></span>
                <span>用水户: <strong class="font-mono">14</strong> 个</span>
              </div>
              <div class="flex items-center gap-1.5 text-[10px] text-slate-700 font-medium mt-0.5">
                <span class="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
                <span>用水量: <strong class="font-mono text-purple-700">37.13</strong> 万m³</span>
              </div>
            </div>

            <!-- SVG Dual-Axis Chart -->
            <svg viewBox="0 0 420 180" class="w-full h-full overflow-visible">
              <!-- Left Y-Axis (用水户: 0, 300, 600, 900) -->
              <text x="15" y="15" fill="#94a3b8" font-size="8.5">用水户(个)</text>
              <g fill="#94a3b8" font-size="8.5" font-family="monospace">
                <text x="25" y="35" text-anchor="end">900</text>
                <text x="25" y="75" text-anchor="end">600</text>
                <text x="25" y="115" text-anchor="end">300</text>
                <text x="25" y="155" text-anchor="end">0</text>
              </g>

              <!-- Right Y-Axis (用水量: 0, 100, 200, 300, 400) -->
              <text x="375" y="15" fill="#94a3b8" font-size="8.5">用水量(万m³)</text>
              <g fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="end">
                <text x="415" y="35">400</text>
                <text x="415" y="65">300</text>
                <text x="415" y="95">200</text>
                <text x="415" y="125">100</text>
                <text x="415" y="155">0</text>
              </g>

              <!-- Baseline grid -->
              <line x1="30" y1="155" x2="385" y2="155" stroke="#e2e8f0" stroke-width="1" />

              <!-- Green Bars (Columns) -->
              <!-- 1. 城乡环境 (user count: 52) -->
              <rect x="52" y="148" width="16" height="7" fill="#22c55e" rx="3" />
              <!-- 2. 鱼塘 (user count: 14) -->
              <rect x="122" y="152" width="16" height="3" fill="#22c55e" rx="1.5" />
              <!-- 3. 公共供水 (user count: 245) -->
              <rect x="192" y="122" width="16" height="33" fill="#22c55e" rx="3" />
              <!-- 4. 灌区 (user count: 880) -->
              <rect x="262" y="38" width="16" height="117" fill="#22c55e" rx="3" />
              <!-- 5. 工业 (user count: 760) -->
              <rect x="332" y="52" width="16" height="103" fill="#22c55e" rx="3" />

              <!-- Purple Line Curve (用水量: 12.5, 37.13, 58.2, 348.6, 66.74) -->
              <!-- Points:
                   城乡环境: x=60, y=155 - (12.5/400)*120 = 151
                   鱼塘: x=130, y=155 - (37.13/400)*120 = 144
                   公共供水: x=200, y=155 - (58.2/400)*120 = 137
                   灌区: x=270, y=155 - (348.6/400)*120 = 50
                   工业: x=340, y=155 - (66.74/400)*120 = 135
              -->
              <path
                d="M 60,151 C 95,148 105,145 130,144 C 160,142 175,138 200,137 C 235,135 245,55 270,50 C 295,48 315,130 340,135"
                fill="none"
                stroke="#8b5cf6"
                stroke-width="2.2"
              />

              <!-- Nodes on line -->
              <circle cx="60" cy="151" r="3.5" fill="#ffffff" stroke="#8b5cf6" stroke-width="2" />
              <circle cx="130" cy="144" r="3.5" fill="#ffffff" stroke="#8b5cf6" stroke-width="2" />
              <circle cx="200" cy="137" r="3.5" fill="#ffffff" stroke="#8b5cf6" stroke-width="2" />
              <circle cx="270" cy="50" r="4" fill="#ffffff" stroke="#8b5cf6" stroke-width="2" />
              <circle cx="340" cy="135" r="3.5" fill="#ffffff" stroke="#8b5cf6" stroke-width="2" />

              <!-- X-Axis Labels -->
              <g fill="#64748b" font-size="9" text-anchor="middle" font-family="sans-serif">
                <text x="60" y="169">城乡环境</text>
                <text x="130" y="169">鱼塘</text>
                <text x="200" y="169">公共供水</text>
                <text x="270" y="169">灌区</text>
                <text x="340" y="169">工业</text>
              </g>
            </svg>
          </div>
        </div>

        <!-- Box 2: 重点取水户(万m³) -->
        <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex-1 flex flex-col">
          <div class="flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <span class="w-1.5 h-4 bg-sky-500 rounded-full inline-block"></span>
            <span class="text-xs font-bold text-slate-800">重点取水户(万m³)</span>
          </div>

          <!-- Table matching the screenshot exactly -->
          <div class="flex-1 overflow-x-auto custom-scrollbar mt-2">
            <table class="w-full text-[11px] leading-tight text-left">
              <thead>
                <tr class="text-slate-400 border-b border-slate-100">
                  <th class="py-1.5 text-center font-normal w-9">排序</th>
                  <th class="py-1.5 font-normal">取水户</th>
                  <th class="py-1.5 text-right font-normal">许可水量</th>
                  <th class="py-1.5 text-right font-normal">计划水量</th>
                  <th class="py-1.5 text-right font-normal">直报水量</th>
                  <th class="py-1.5 text-right font-normal">计量水量</th>
                  <th class="py-1.5 text-right font-normal">报税水量</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50 font-mono text-slate-700">
                <tr
                  v-for="row in keyWaterUsers"
                  :key="row.rank"
                  class="hover:bg-blue-50/50 transition cursor-pointer"
                  @click="openUserDetail(row)"
                >
                  <!-- Rank column -->
                  <td class="py-1.5 text-center">
                    <span
                      v-if="row.rank <= 3"
                      :class="[
                        'inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold text-white',
                        row.rank === 1 ? 'bg-amber-400' : row.rank === 2 ? 'bg-amber-300' : 'bg-orange-400'
                      ]"
                    >
                      {{ row.rank }}
                    </span>
                    <span v-else class="text-slate-500 font-sans text-xs">
                      {{ row.rank }}
                    </span>
                  </td>

                  <!-- User name (truncated with full tooltip) -->
                  <td class="py-1.5 font-sans text-slate-800 font-medium truncate max-w-[90px]" :title="row.fullName">
                    {{ row.name }}
                  </td>

                  <!-- Metrics -->
                  <td class="py-1.5 text-right font-medium">{{ row.permitAmount }}</td>
                  <td class="py-1.5 text-right font-medium">{{ row.planAmount }}</td>
                  <td class="py-1.5 text-right font-medium">{{ row.directAmount }}</td>
                  <td class="py-1.5 text-right text-slate-400 font-medium">{{ row.meterAmount }}</td>
                  <td class="py-1.5 text-right font-medium text-slate-800">{{ row.taxAmount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>

    <!-- Modal: 重点取水户详情弹窗 -->
    <div
      v-if="selectedUserDetail"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
    >
      <div class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-scale-in">
        <div class="px-5 py-3.5 bg-blue-600 text-white flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            </svg>
            <span class="font-bold text-sm">重点取水户水资源核定档案</span>
          </div>
          <button
            type="button"
            class="text-white/80 hover:text-white cursor-pointer"
            @click="selectedUserDetail = null"
          >
            ✕
          </button>
        </div>

        <div class="p-5 space-y-4 text-xs">
          <div>
            <div class="text-slate-400 text-[11px]">取水单位全称</div>
            <div class="text-sm font-bold text-slate-800 mt-0.5">{{ selectedUserDetail.fullName }}</div>
          </div>

          <div class="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div>
              <span class="text-slate-400">核定排序:</span>
              <span class="font-bold text-blue-600 ml-1.5">第 {{ selectedUserDetail.rank }} 位</span>
            </div>
            <div>
              <span class="text-slate-400">年度状态:</span>
              <span class="font-bold text-emerald-600 ml-1.5">正常取水</span>
            </div>
            <div>
              <span class="text-slate-400">许可水量:</span>
              <span class="font-mono font-bold text-slate-800 ml-1.5">{{ selectedUserDetail.permitAmount }} 万m³</span>
            </div>
            <div>
              <span class="text-slate-400">计划水量:</span>
              <span class="font-mono font-bold text-slate-800 ml-1.5">{{ selectedUserDetail.planAmount }} 万m³</span>
            </div>
            <div>
              <span class="text-slate-400">直报核算:</span>
              <span class="font-mono font-bold text-slate-800 ml-1.5">{{ selectedUserDetail.directAmount }} 万m³</span>
            </div>
            <div>
              <span class="text-slate-400">报税水量:</span>
              <span class="font-mono font-bold text-slate-800 ml-1.5">{{ selectedUserDetail.taxAmount }} 万m³</span>
            </div>
          </div>

          <div class="text-slate-500 text-[11px]">
            * 依照《青海省实施〈中华人民共和国水法〉办法》，本户实行用水双轨校验，已纳入全省实时监管大屏。
          </div>
        </div>

        <div class="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            type="button"
            class="px-4 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
            @click="selectedUserDetail = null"
          >
            关闭
          </button>
          <button
            type="button"
            class="px-4 py-1.5 text-xs rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer"
            @click="handleNavigate('enterprise_dossier')"
          >
            查看一户一档详情
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'navigate', menu: string): void;
  (e: 'select-district', district: string): void;
}>();

function handleNavigate(menu: string) {
  emit('navigate', menu);
}

function handleSelectDistrict(district: string) {
  emit('select-district', district);
}

// 许可证照统计 8 个状态及图例
const licenseLegend = [
  { label: '新办', color: '#0ea5e9' },
  { label: '延续', color: '#f59e0b' },
  { label: '吊销', color: '#06b6d4' },
  { label: '临时', color: '#8b5cf6' },
  { label: '过期', color: '#64748b' },
  { label: '变更', color: '#10b981' },
  { label: '注销', color: '#ef4444' },
  { label: '撤销', color: '#ec4899' },
];

const activeSlice = ref<string | null>(null);

// Donut/Pie slice paths calculation matching the exact breakdown from the screenshot
// Slices:
// 1. 新办: 1226 (36.09%) -> from angle 0 to 130
// 2. 延续: 614 (18.08%) -> from 130 to 195
// 3. 临时: 8 (0.24%) -> from 195 to 196
// 4. 过期: 29 (0.85%) -> from 196 to 199
// 5. 变更: 454 (13.37%) -> from 199 to 247
// 6. 注销: 939 (27.64%) -> from 247 to 346.5
// 7. 撤销: 127 (3.74%) -> from 346.5 to 360
function getDonutArc(startAngleDeg: number, endAngleDeg: number, innerR = 0, outerR = 64): string {
  const rad = Math.PI / 180;
  const startRad = (startAngleDeg - 90) * rad;
  const endRad = (endAngleDeg - 90) * rad;
  
  const x1 = outerR * Math.cos(startRad);
  const y1 = outerR * Math.sin(startRad);
  const x2 = outerR * Math.cos(endRad);
  const y2 = outerR * Math.sin(endRad);

  const largeArc = endAngleDeg - startAngleDeg > 180 ? 1 : 0;

  if (innerR === 0) {
    return `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
  }

  const ix1 = innerR * Math.cos(endRad);
  const iy1 = innerR * Math.sin(endRad);
  const ix2 = innerR * Math.cos(startRad);
  const iy2 = innerR * Math.sin(startRad);

  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L ${ix1.toFixed(2)} ${iy1.toFixed(2)} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2.toFixed(2)} ${iy2.toFixed(2)} Z`;
}

const pieSlices = [
  { label: '新办', count: 1226, percent: '36.09%', color: '#0ea5e9', d: getDonutArc(0, 130) },
  { label: '延续', count: 614, percent: '18.08%', color: '#f59e0b', d: getDonutArc(130, 195) },
  { label: '临时', count: 8, percent: '0.24%', color: '#8b5cf6', d: getDonutArc(195, 196.2) },
  { label: '过期', count: 29, percent: '0.85%', color: '#64748b', d: getDonutArc(196.2, 199.5) },
  { label: '变更', count: 454, percent: '13.37%', color: '#10b981', d: getDonutArc(199.5, 247) },
  { label: '注销', count: 939, percent: '27.64%', color: '#ef4444', d: getDonutArc(247, 346.5) },
  { label: '撤销', count: 127, percent: '3.74%', color: '#ec4899', d: getDonutArc(346.5, 360) },
];

// Prefecture Map Data for Qinghai 8 Regions
interface PrefectureInfo {
  name: string;
  margin: number;
  permits: number;
  meters: number;
  onlineRate: number;
}

const prefectureData: Record<string, PrefectureInfo> = {
  haixi: { name: '海西蒙古族藏族自治州', margin: 285.50, permits: 412, meters: 530, onlineRate: 99.1 },
  haibei: { name: '海北藏族自治州', margin: 3.50, permits: 188, meters: 210, onlineRate: 98.4 },
  xining: { name: '西宁市', margin: 2.15, permits: 820, meters: 1140, onlineRate: 99.4 },
  haidong: { name: '海东市', margin: 4.80, permits: 480, meters: 620, onlineRate: 98.7 },
  hainan: { name: '海南藏族自治州', margin: 2.40, permits: 215, meters: 270, onlineRate: 97.9 },
  huangnan: { name: '黄南藏族自治州', margin: 1.90, permits: 110, meters: 140, onlineRate: 98.0 },
  guoluo: { name: '果洛藏族自治州', margin: 1.20, permits: 65, meters: 80, onlineRate: 96.5 },
  yushu: { name: '玉树藏族自治州', margin: 1.80, permits: 92, meters: 115, onlineRate: 97.2 },
};

const hoveredPrefecture = ref<PrefectureInfo | null>(null);

// 各市州取水许可审批余量统计柱状图 (海西州突出，高达 ~285)
const prefectureBarData = [
  { name: '西宁市', value: 2.15, isHighlight: false },
  { name: '海东市', value: 4.80, isHighlight: false },
  { name: '海北州', value: 3.50, isHighlight: false },
  { name: '黄南州', value: 1.90, isHighlight: false },
  { name: '海南州', value: 2.40, isHighlight: false },
  { name: '果洛州', value: 1.20, isHighlight: false },
  { name: '玉树州', value: 1.80, isHighlight: false },
  { name: '海西州', value: 285.50, isHighlight: true },
];

// 重点取水户(万m³) 数据表
interface KeyUserRow {
  rank: number;
  name: string;
  fullName: string;
  permitAmount: string;
  planAmount: string;
  directAmount: string;
  meterAmount: string;
  taxAmount: string;
}

const keyWaterUsers: KeyUserRow[] = [
  {
    rank: 1,
    name: '青海汇信...',
    fullName: '青海汇信资产管理有限责任公司',
    permitAmount: '9,850.50',
    planAmount: '9,600.00',
    directAmount: '9,850.50',
    meterAmount: '9,812.35',
    taxAmount: '9,812.35',
  },
  {
    rank: 2,
    name: '湟源县湟...',
    fullName: '湟源县湟水河水务投资有限责任公司',
    permitAmount: '6,741.34',
    planAmount: '6,500.00',
    directAmount: '0.00',
    meterAmount: '-',
    taxAmount: '6,124.50',
  },
  {
    rank: 3,
    name: '贵德县水...',
    fullName: '贵德县水利工程运行服务中心',
    permitAmount: '5,988.18',
    planAmount: '5,200.00',
    directAmount: '4,024.06',
    meterAmount: '4,018.90',
    taxAmount: '4,024.06',
  },
  {
    rank: 4,
    name: '湟源县南...',
    fullName: '湟源县南川工业园区供水工程管理处',
    permitAmount: '4,242.08',
    planAmount: '4,000.00',
    directAmount: '0.00',
    meterAmount: '-',
    taxAmount: '3,892.00',
  },
  {
    rank: 5,
    name: '湟源县水...',
    fullName: '湟源县水利水电工程局',
    permitAmount: '2,718.30',
    planAmount: '2,700.00',
    directAmount: '2,718.30',
    meterAmount: '2,701.20',
    taxAmount: '2,718.30',
  },
  {
    rank: 6,
    name: '门源县黄...',
    fullName: '门源县黄金开发有限责任公司',
    permitAmount: '2,380.65',
    planAmount: '2,300.00',
    directAmount: '0.00',
    meterAmount: '-',
    taxAmount: '2,150.00',
  },
  {
    rank: 7,
    name: '同仁市隆...',
    fullName: '同仁市隆务镇集中供水服务站',
    permitAmount: '1,954.20',
    planAmount: '1,900.00',
    directAmount: '1,845.00',
    meterAmount: '1,842.30',
    taxAmount: '1,845.00',
  },
];

const selectedUserDetail = ref<KeyUserRow | null>(null);

function openUserDetail(row: KeyUserRow) {
  selectedUserDetail.value = row;
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
</style>
