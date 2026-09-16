<template>
  <div class="flex-1 flex min-h-0 overflow-hidden p-3 gap-3 bg-[#edf3fb] select-none">
    <!-- 左侧：行政区划树 -->
    <WaterDistrictTree
      :selected-district="selectedDistrict"
      @select-district="handleDistrictSelect"
    />

    <!-- 右侧：一户一档主工作区 -->
    <div class="flex-1 flex flex-col min-w-0 min-h-0 gap-2.5 overflow-hidden">
      <!-- 1. 顶部指标概览栏 (一户一档全域关键数据) -->
      <div class="grid grid-cols-2 lg:grid-cols-6 gap-2.5 shrink-0">
        <!-- 指标 1: 档案总数 -->
        <div class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">一户一档总数</div>
            <div class="text-lg font-bold font-mono text-slate-800 mt-0.5">
              {{ totalCount }} <span class="text-xs font-normal text-slate-400">户</span>
            </div>
            <div class="text-[10px] text-blue-600 mt-0.5">全域规范建档</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-[#1677ff] flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
        </div>

        <!-- 指标 2: 国控重点户 -->
        <div class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">国控取水户</div>
            <div class="text-lg font-bold font-mono text-blue-700 mt-0.5">
              {{ nationalControlCount }} <span class="text-xs font-normal text-slate-400">户</span>
            </div>
            <div class="text-[10px] text-blue-600 mt-0.5">国家重点监控</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
        </div>

        <!-- 指标 3: 省控取水户 -->
        <div class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">省控取水户</div>
            <div class="text-lg font-bold font-mono text-teal-700 mt-0.5">
              {{ provincialControlCount }} <span class="text-xs font-normal text-slate-400">户</span>
            </div>
            <div class="text-[10px] text-teal-600 mt-0.5">省级骨干监管</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
        </div>

        <!-- 指标 4: 中央资金扶持 -->
        <div class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">中央资金项目</div>
            <div class="text-lg font-bold font-mono text-amber-700 mt-0.5">
              {{ centralFundCount }} <span class="text-xs font-normal text-slate-400">户</span>
            </div>
            <div class="text-[10px] text-amber-600 mt-0.5">专项资金扶持</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
              <line x1="12" y1="6" x2="12" y2="8"></line>
              <line x1="12" y1="16" x2="12" y2="18"></line>
            </svg>
          </div>
        </div>

        <!-- 指标 5: 规模以上户数 -->
        <div class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">规模以上户数</div>
            <div class="text-lg font-bold font-mono text-emerald-700 mt-0.5">
              {{ aboveScaleCount }} <span class="text-xs font-normal text-slate-400">户</span>
            </div>
            <div class="text-[10px] text-emerald-600 mt-0.5">重点规上用水大户</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
          </div>
        </div>

        <!-- 指标 6: 计量在线率 -->
        <div class="bg-white rounded-lg p-2.5 px-3 border border-[#b8cde6] shadow-2xs flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-500 font-medium">计量点在线率</div>
            <div class="text-lg font-bold font-mono text-blue-600 mt-0.5">
              {{ onlineRate }} <span class="text-xs font-normal text-slate-400">%</span>
            </div>
            <div class="text-[10px] text-slate-500 mt-0.5">{{ totalOnlinePoints }}/{{ totalPoints }} 处在线</div>
          </div>
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
              <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
              <line x1="12" y1="20" x2="12.01" y2="20"></line>
            </svg>
          </div>
        </div>
      </div>

      <!-- 2. 右侧上面：搜索栏 (Filter Bar) -->
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

          <!-- 搜索项 2: 发证机关 -->
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
              <option value="海北州水利局">海北州水利局</option>
              <option value="海南州水利局">海南州水利局</option>
              <option value="黄南州水利局">黄南州水利局</option>
            </select>
          </div>

          <!-- 搜索项 3: 数据来源类型 -->
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

          <!-- 搜索项 4: 规模以上 -->
          <div class="flex items-center">
            <label class="w-16 shrink-0 text-gray-600 font-normal text-right pr-2">规模以上</label>
            <select
              v-model="filterParams.aboveDesignatedScale"
              class="flex-1 h-8 px-2 bg-[#f8fafc] border border-[#b8cde6] rounded text-gray-800 focus:bg-white focus:outline-none focus:border-[#1677ff] transition cursor-pointer"
            >
              <option value="">全部规模</option>
              <option value="是">是 (规上)</option>
              <option value="否">否 (规下)</option>
            </select>
          </div>

          <!-- 搜索项 5: 水源类型 -->
          <div class="flex items-center">
            <label class="w-16 shrink-0 text-gray-600 font-normal text-right pr-2">水源类型</label>
            <select
              v-model="filterParams.waterSourceType"
              class="flex-1 h-8 px-2 bg-[#f8fafc] border border-[#b8cde6] rounded text-gray-800 focus:bg-white focus:outline-none focus:border-[#1677ff] transition cursor-pointer"
            >
              <option value="">全部水源</option>
              <option value="地表水">地表水</option>
              <option value="地下水">地下水</option>
              <option value="非常规水">非常规水</option>
              <option value="矿井水">矿井水</option>
              <option value="混合水源">混合水源</option>
            </select>
          </div>

          <!-- 搜索项 6: 证照状态 -->
          <div class="flex items-center">
            <label class="w-16 shrink-0 text-gray-600 font-normal text-right pr-2">证照状态</label>
            <select
              v-model="filterParams.licenseStatus"
              class="flex-1 h-8 px-2 bg-[#f8fafc] border border-[#b8cde6] rounded text-gray-800 focus:bg-white focus:outline-none focus:border-[#1677ff] transition cursor-pointer"
            >
              <option value="">全部证照状态</option>
              <option value="正常">正常</option>
              <option value="临期">临期预警</option>
              <option value="变更中">变更中</option>
              <option value="延续审批中">延续审批中</option>
              <option value="已过期">已过期</option>
              <option value="已注销">已注销</option>
            </select>
          </div>

          <!-- 搜索项 7: 状态 -->
          <div class="flex items-center">
            <label class="w-16 shrink-0 text-gray-600 font-normal text-right pr-2">运行状态</label>
            <select
              v-model="filterParams.status"
              class="flex-1 h-8 px-2 bg-[#f8fafc] border border-[#b8cde6] rounded text-gray-800 focus:bg-white focus:outline-none focus:border-[#1677ff] transition cursor-pointer"
            >
              <option value="">全部状态</option>
              <option value="正常">正常</option>
              <option value="启用">启用</option>
              <option value="停运">停运</option>
              <option value="在建">在建</option>
            </select>
          </div>
        </div>

        <!-- 按钮操作区 (规整靠右对齐) -->
        <div class="flex items-center justify-between border-t border-gray-100 mt-2.5 pt-2">
          <div class="text-slate-500 text-[11px] flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-[#1677ff]"></span>
            <span>当前筛选辖区：<strong class="text-blue-700">{{ selectedDistrictLabel }}</strong></span>
            <span class="text-slate-300 mx-1">|</span>
            <span>筛选结果：<strong class="font-mono text-slate-800">{{ filteredDossiers.length }}</strong> 户</span>
          </div>

          <div class="flex items-center gap-2">
            <!-- 查询按钮 -->
            <button
              type="button"
              @click="handleSearch"
              class="px-3.5 h-7.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>查询</span>
            </button>

            <!-- 重置按钮 -->
            <button
              type="button"
              @click="handleReset"
              class="px-3 h-7.5 bg-white hover:bg-gray-50 text-gray-700 border border-[#b8cde6] rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <svg class="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M3 21v-5h5"></path>
              </svg>
              <span>重置</span>
            </button>

            <!-- 导出数据按钮 -->
            <button
              type="button"
              @click="handleExport"
              class="px-3 h-7.5 bg-white hover:bg-gray-50 text-gray-700 border border-[#b8cde6] rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <svg class="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>导出台账</span>
            </button>

            <!-- 刷新按钮 -->
            <button
              type="button"
              @click="handleRefresh"
              class="p-1.5 text-gray-500 hover:text-[#1677ff] rounded hover:bg-gray-100 transition cursor-pointer"
              title="刷新数据"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 3. 右侧下面：列表 (Table & Pagination) -->
      <div class="bg-white rounded-lg border border-[#b4c7e0] shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden select-none">
        <!-- 表格容器 (横向纵向自适应滚动，表头吸顶) -->
        <div class="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
          <table class="w-full text-left border-collapse text-xs border-l border-t border-[#b8cde6]">
            <!-- 表头：统一深灰蓝底与深色边框 -->
            <thead class="sticky top-0 z-20">
              <tr class="bg-[#eaf1fb] text-gray-800 font-semibold border-b border-[#a6c1e2]">
                <!-- 0. 序号 & 多选 (固定最左) -->
                <th class="py-2.5 px-2 whitespace-nowrap w-14 text-center border-r border-b border-[#b8cde6] sticky top-0 left-0 z-30 bg-[#eaf1fb] shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]">
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

                <!-- 1. 发证机关 -->
                <th class="py-2.5 px-3 whitespace-nowrap min-w-[120px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  发证机关
                </th>

                <!-- 2. 统一信用代码 -->
                <th class="py-2.5 px-3 whitespace-nowrap min-w-[160px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  统一信用代码
                </th>

                <!-- 3. 取水权人名称 (关键列，加宽) -->
                <th class="py-2.5 px-3 whitespace-nowrap min-w-[210px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  取水权人名称
                </th>

                <!-- 4. 取水许可证 -->
                <th class="py-2.5 px-3 whitespace-nowrap min-w-[165px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  取水许可证
                </th>

                <!-- 5. 数据来源类型（国控、省控、中央资金） -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[110px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  数据来源类型
                </th>

                <!-- 6. 规模以上 -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[80px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  规模以上
                </th>

                <!-- 7. 水源类型 -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[90px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  水源类型
                </th>

                <!-- 8. 证照状态 -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[95px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  证照状态
                </th>

                <!-- 9. 取水口工程数量 -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[100px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  取水口工程数量
                </th>

                <!-- 10. 取水口数据 -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[95px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  取水口数据
                </th>

                <!-- 11. 计量点数量 -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[95px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  计量点数量
                </th>

                <!-- 12. 在线计量点 -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[95px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  在线计量点
                </th>

                <!-- 13. 非在线计量点 -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[105px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  非在线计量点
                </th>

                <!-- 14. 状态 -->
                <th class="py-2.5 px-2.5 whitespace-nowrap text-center min-w-[80px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  状态
                </th>

                <!-- 15. 操作（档案查看、拓扑图） (固定在右侧) -->
                <th class="py-2.5 px-3 whitespace-nowrap text-center min-w-[160px] border-r border-b border-[#b8cde6] sticky top-0 right-0 z-30 bg-[#eaf1fb] shadow-[-2px_0_6px_-2px_rgba(0,0,0,0.06)]">
                  操作
                </th>
              </tr>
            </thead>

            <!-- 表体 -->
            <tbody>
              <!-- 空状态提示 -->
              <tr v-if="paginatedList.length === 0">
                <td colspan="16" class="py-16 text-center text-slate-400 bg-white border-b border-[#b8cde6]">
                  <div class="flex flex-col items-center justify-center gap-2">
                    <svg class="w-10 h-10 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    <span class="text-xs">暂无符合筛选条件的一户一档数据</span>
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
                :key="row.id"
                class="hover:bg-[#f2f7fe] transition-colors border-b border-[#cde0f5]"
                :class="selectedRowKeys.includes(row.id) ? 'bg-[#edf4fe]' : idx % 2 === 1 ? 'bg-[#fafcff]' : 'bg-white'"
              >
                <!-- 0. 序号 & 选择框 (固定在最左侧) -->
                <td class="py-2.5 px-2 text-center border-r border-[#cde0f5] sticky left-0 z-10 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]"
                    :class="selectedRowKeys.includes(row.id) ? 'bg-[#edf4fe]' : idx % 2 === 1 ? 'bg-[#fafcff]' : 'bg-white'">
                  <div class="flex items-center justify-center gap-1.5">
                    <input
                      type="checkbox"
                      :checked="selectedRowKeys.includes(row.id)"
                      @change="toggleSelectRow(row.id)"
                      class="rounded border-gray-400 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                    />
                    <span class="font-mono text-gray-500 text-[11px]">{{ (currentPage - 1) * pageSize + idx + 1 }}</span>
                  </div>
                </td>

                <!-- 1. 发证机关 -->
                <td class="py-2.5 px-3 border-r border-[#cde0f5] text-gray-700 whitespace-nowrap">
                  <div class="flex items-center gap-1">
                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4"></path>
                    </svg>
                    <span class="truncate" :title="row.issuingAuthority">{{ row.issuingAuthority }}</span>
                  </div>
                </td>

                <!-- 2. 统一信用代码 -->
                <td class="py-2.5 px-3 border-r border-[#cde0f5] font-mono text-gray-700 whitespace-nowrap text-[11.5px]">
                  <span class="bg-slate-100/90 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                    {{ row.creditCode }}
                  </span>
                </td>

                <!-- 3. 取水权人名称 -->
                <td class="py-2.5 px-3 border-r border-[#cde0f5] whitespace-nowrap">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="font-bold text-slate-800 hover:text-[#1677ff] transition truncate cursor-pointer" :title="row.waterOwnerName" @click="handleViewArchive(row)">
                      {{ row.waterOwnerName }}
                    </span>
                    <span class="text-[10px] px-1 py-0.2 rounded bg-blue-50 text-blue-600 shrink-0 font-normal">
                      {{ row.district }}
                    </span>
                  </div>
                </td>

                <!-- 4. 取水许可证 -->
                <td class="py-2.5 px-3 border-r border-[#cde0f5] font-mono text-blue-700 font-medium whitespace-nowrap text-[11.5px]">
                  <span class="hover:underline cursor-pointer" :title="row.permitNumber" @click="handleViewArchive(row)">
                    {{ row.permitNumber }}
                  </span>
                </td>

                <!-- 5. 数据来源类型（国控、省控、中央资金） -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#cde0f5] whitespace-nowrap">
                  <span
                    v-if="row.dataSourceType === '国控'"
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    国控
                  </span>
                  <span
                    v-else-if="row.dataSourceType === '省控'"
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                    省控
                  </span>
                  <span
                    v-else-if="row.dataSourceType === '中央资金'"
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    中央资金
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600"
                  >
                    {{ row.dataSourceType }}
                  </span>
                </td>

                <!-- 6. 规模以上 -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#cde0f5] whitespace-nowrap">
                  <span
                    v-if="row.aboveDesignatedScale"
                    class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    是
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-normal bg-slate-100 text-slate-500 border border-slate-200"
                  >
                    否
                  </span>
                </td>

                <!-- 7. 水源类型 -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#cde0f5] text-gray-700 whitespace-nowrap">
                  <span class="px-1.5 py-0.5 rounded text-[11px] bg-sky-50 text-sky-800 border border-sky-200">
                    {{ row.waterSourceType }}
                  </span>
                </td>

                <!-- 8. 证照状态 -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#cde0f5] whitespace-nowrap">
                  <span
                    v-if="row.licenseStatus === '正常'"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    正常
                  </span>
                  <span
                    v-else-if="row.licenseStatus === '临期'"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                  >
                    临期
                  </span>
                  <span
                    v-else-if="row.licenseStatus === '变更中' || row.licenseStatus === '延续审批中'"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {{ row.licenseStatus }}
                  </span>
                  <span
                    v-else-if="row.licenseStatus === '已过期' || row.licenseStatus === '已注销'"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200"
                  >
                    {{ row.licenseStatus }}
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600"
                  >
                    {{ row.licenseStatus }}
                  </span>
                </td>

                <!-- 9. 取水口工程数量 -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#cde0f5] font-mono text-gray-800 whitespace-nowrap">
                  <span class="font-semibold">{{ row.intakeProjectCount }}</span> <span class="text-[10px] text-gray-400">个</span>
                </td>

                <!-- 10. 取水口数据 (数量) -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#cde0f5] font-mono text-gray-800 whitespace-nowrap">
                  <span class="font-semibold">{{ row.intakeCount }}</span> <span class="text-[10px] text-gray-400">处</span>
                </td>

                <!-- 11. 计量点数量 -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#cde0f5] font-mono text-gray-800 whitespace-nowrap">
                  <span class="font-semibold text-slate-900">{{ row.meteringPointCount }}</span> <span class="text-[10px] text-gray-400">处</span>
                </td>

                <!-- 12. 在线计量点 -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#cde0f5] font-mono whitespace-nowrap">
                  <span class="font-bold text-emerald-600">{{ row.onlineMeteringCount }}</span> <span class="text-[10px] text-emerald-500">处</span>
                </td>

                <!-- 13. 非在线计量点 -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#cde0f5] font-mono whitespace-nowrap">
                  <span :class="row.offlineMeteringCount > 0 ? 'font-semibold text-amber-600' : 'text-gray-400'">
                    {{ row.offlineMeteringCount }}
                  </span>
                  <span class="text-[10px] text-gray-400 ml-0.5">处</span>
                </td>

                <!-- 14. 状态 -->
                <td class="py-2.5 px-2.5 text-center border-r border-[#cde0f5] whitespace-nowrap">
                  <span
                    v-if="row.status === '正常' || row.status === '启用'"
                    class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium text-emerald-700 bg-emerald-50"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {{ row.status }}
                  </span>
                  <span
                    v-else-if="row.status === '在建'"
                    class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium text-blue-700 bg-blue-50"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    在建
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium text-slate-500 bg-slate-100"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    {{ row.status }}
                  </span>
                </td>

                <!-- 15. 操作（档案查看、拓扑图） (固定在最右侧) -->
                <td class="py-2 px-3 text-center border-r border-[#cde0f5] whitespace-nowrap sticky right-0 z-10 shadow-[-2px_0_6px_-2px_rgba(0,0,0,0.06)]"
                    :class="selectedRowKeys.includes(row.id) ? 'bg-[#edf4fe]' : idx % 2 === 1 ? 'bg-[#fafcff]' : 'bg-white'">
                  <div class="flex items-center justify-center gap-2">
                    <!-- 档案查看按钮 (只执行操作提示，不打开弹窗) -->
                    <button
                      type="button"
                      @click="handleViewArchive(row)"
                      class="px-2 py-1 text-xs font-medium text-[#1677ff] hover:text-blue-800 hover:bg-blue-50 rounded transition cursor-pointer flex items-center gap-1"
                      title="查看一户一档电子台账"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <span>档案查看</span>
                    </button>

                    <span class="text-slate-200">|</span>

                    <!-- 拓扑图按钮 (只执行操作提示，不打开弹窗) -->
                    <button
                      type="button"
                      @click="handleViewTopology(row)"
                      class="px-2 py-1 text-xs font-medium text-teal-700 hover:text-teal-900 hover:bg-teal-50 rounded transition cursor-pointer flex items-center gap-1"
                      title="查看取用水网络拓扑图"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                      <span>拓扑图</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 4. 底部分页与统计栏 -->
        <div class="px-3.5 py-2.5 border-t border-[#b8cde6] bg-[#f8fafc] flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs text-gray-600">
          <div class="flex items-center gap-3">
            <span>共 <strong class="font-mono text-gray-900">{{ filteredDossiers.length }}</strong> 条记录</span>
            <span class="text-gray-300">|</span>
            <span v-if="selectedRowKeys.length > 0" class="text-blue-600 font-medium">
              已选中 <strong class="font-mono">{{ selectedRowKeys.length }}</strong> 条
            </span>
            <span v-else class="text-gray-400">未选择项</span>
          </div>

          <div class="flex items-center gap-2">
            <!-- 每页条数 -->
            <div class="flex items-center gap-1">
              <span>每页</span>
              <select
                v-model.number="pageSize"
                @change="currentPage = 1"
                class="h-7 px-1.5 bg-white border border-[#b8cde6] rounded text-gray-800 text-xs focus:outline-none focus:border-[#1677ff] cursor-pointer"
              >
                <option :value="10">10 条</option>
                <option :value="15">15 条</option>
                <option :value="20">20 条</option>
                <option :value="50">50 条</option>
              </select>
            </div>

            <!-- 分页按钮 -->
            <div class="flex items-center gap-1">
              <button
                type="button"
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-2 h-7 bg-white border border-[#b8cde6] rounded text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                上一页
              </button>

              <div class="flex items-center gap-1 font-mono">
                <button
                  v-for="p in totalPages"
                  :key="p"
                  type="button"
                  @click="currentPage = p"
                  class="w-7 h-7 rounded text-xs transition cursor-pointer flex items-center justify-center font-medium"
                  :class="currentPage === p ? 'bg-[#1677ff] text-white font-bold' : 'bg-white border border-[#b8cde6] text-gray-700 hover:bg-gray-50'"
                >
                  {{ p }}
                </button>
              </div>

              <button
                type="button"
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage >= totalPages"
                class="px-2 h-7 bg-white border border-[#b8cde6] rounded text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                下一页
              </button>
            </div>

            <!-- 跳转输入框 -->
            <div class="flex items-center gap-1 ml-1 text-gray-500">
              <span>前往</span>
              <input
                type="number"
                min="1"
                :max="totalPages"
                v-model.number="jumpPageInput"
                @keyup.enter="handleJumpPage"
                class="w-12 h-7 px-1 text-center bg-white border border-[#b8cde6] rounded font-mono text-gray-800 text-xs focus:outline-none focus:border-[#1677ff]"
              />
              <span>页</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 档案查看弹窗组件 (严格参考用户截图设计，去除【一共有取水许可证】字段，支持电子证照预览与9个Tab深度展示) -->
    <EnterpriseDossierDetailModal
      v-if="currentDossier"
      v-model:visible="archiveModalVisible"
      :dossier-data="currentDossier"
      @close="archiveModalVisible = false"
    />

    <!-- 拓扑图弹窗组件 (严格参考用户截图设计：户 -> 证 -> 工程/口 -> 计量点) -->
    <EnterpriseDossierTopologyModal
      v-if="currentDossier"
      v-model:visible="topologyModalVisible"
      :dossier-data="currentDossier"
      @close="topologyModalVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import WaterDistrictTree from './WaterDistrictTree.vue';
import EnterpriseDossierDetailModal from './EnterpriseDossierDetailModal.vue';
import EnterpriseDossierTopologyModal from './EnterpriseDossierTopologyModal.vue';
import { mockEnterpriseDossiers } from '../../mockEnterpriseDossierData';
import { EnterpriseDossier, EnterpriseDossierFilterParams } from '../../types';

// 档案查看弹窗状态
const archiveModalVisible = ref(false);
const topologyModalVisible = ref(false);
const currentDossier = ref<EnterpriseDossier | null>(null);

// 当前选中的行政区划
const selectedDistrict = ref<string>('全部');

const selectedDistrictLabel = computed(() => {
  if (selectedDistrict.value === '全部' || selectedDistrict.value === '青海省') {
    return '全省全域';
  }
  return selectedDistrict.value;
});

// 处理行政区划树点击联动
const handleDistrictSelect = (district: string) => {
  selectedDistrict.value = district;
  currentPage.value = 1;
};

// 搜索栏过滤参数
const filterParams = reactive<EnterpriseDossierFilterParams>({
  keyword: '',
  issuingAuthority: '',
  dataSourceType: '',
  aboveDesignatedScale: '',
  waterSourceType: '',
  licenseStatus: '',
  status: '',
});

// 本地可响应列表数据源
const dossiersList = ref<EnterpriseDossier[]>([...mockEnterpriseDossiers]);

// 选中的行 ID
const selectedRowKeys = ref<string[]>([]);

// 分页状态
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const jumpPageInput = ref<number>(1);

// 核心多维筛选过滤逻辑
const filteredDossiers = computed(() => {
  return dossiersList.value.filter((item) => {
    // 1. 行政区划联动过滤
    if (selectedDistrict.value && selectedDistrict.value !== '全部' && selectedDistrict.value !== '青海省') {
      const matchDistrict = item.district.includes(selectedDistrict.value) || selectedDistrict.value.includes(item.district);
      const isXining = selectedDistrict.value.includes('西宁') && ['城东区', '城中区', '城西区', '城北区', '大通县', '湟中区', '湟源县'].includes(item.district);
      const isHaidong = selectedDistrict.value.includes('海东') && ['平安区', '乐都区', '互助县', '民和县', '化隆县', '循化县'].includes(item.district);
      const isHaixi = selectedDistrict.value.includes('海西') && ['格尔木市', '德令哈市', '茫崖市', '乌兰县', '都兰县', '天峻县'].includes(item.district);
      const isHaibei = selectedDistrict.value.includes('海北') && ['门源县', '祁连县', '海晏县', '刚察县'].includes(item.district);
      const isHainan = selectedDistrict.value.includes('海南') && ['共和县', '同德县', '贵德县', '兴海县', '贵南县'].includes(item.district);
      const isHuangnan = selectedDistrict.value.includes('黄南') && ['同仁市', '尖扎县', '泽库县', '河南县'].includes(item.district);

      if (!matchDistrict && !isXining && !isHaidong && !isHaixi && !isHaibei && !isHainan && !isHuangnan) {
        return false;
      }
    }

    // 2. 关键字搜索 (取水权人、许可证号、统一社会信用代码)
    if (filterParams.keyword.trim()) {
      const kw = filterParams.keyword.trim().toLowerCase();
      const matchName = item.waterOwnerName.toLowerCase().includes(kw);
      const matchPermit = item.permitNumber.toLowerCase().includes(kw);
      const matchCredit = item.creditCode.toLowerCase().includes(kw);
      if (!matchName && !matchPermit && !matchCredit) {
        return false;
      }
    }

    // 3. 发证机关
    if (filterParams.issuingAuthority && item.issuingAuthority !== filterParams.issuingAuthority) {
      return false;
    }

    // 4. 数据来源类型（国控、省控、中央资金）
    if (filterParams.dataSourceType && item.dataSourceType !== filterParams.dataSourceType) {
      return false;
    }

    // 5. 规模以上
    if (filterParams.aboveDesignatedScale) {
      const isAbove = filterParams.aboveDesignatedScale === '是';
      if (item.aboveDesignatedScale !== isAbove) {
        return false;
      }
    }

    // 6. 水源类型
    if (filterParams.waterSourceType && item.waterSourceType !== filterParams.waterSourceType) {
      return false;
    }

    // 7. 证照状态
    if (filterParams.licenseStatus && item.licenseStatus !== filterParams.licenseStatus) {
      return false;
    }

    // 8. 状态
    if (filterParams.status && item.status !== filterParams.status) {
      return false;
    }

    return true;
  });
});

// 分页数据
const totalPages = computed(() => Math.max(1, Math.ceil(filteredDossiers.value.length / pageSize.value)));

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredDossiers.value.slice(start, start + pageSize.value);
});

// 统计指标计算
const totalCount = computed(() => dossiersList.value.length);
const nationalControlCount = computed(() => dossiersList.value.filter(d => d.dataSourceType === '国控').length);
const provincialControlCount = computed(() => dossiersList.value.filter(d => d.dataSourceType === '省控').length);
const centralFundCount = computed(() => dossiersList.value.filter(d => d.dataSourceType === '中央资金').length);
const aboveScaleCount = computed(() => dossiersList.value.filter(d => d.aboveDesignatedScale).length);

const totalPoints = computed(() => dossiersList.value.reduce((acc, cur) => acc + cur.meteringPointCount, 0));
const totalOnlinePoints = computed(() => dossiersList.value.reduce((acc, cur) => acc + cur.onlineMeteringCount, 0));
const onlineRate = computed(() => {
  if (totalPoints.value === 0) return '0.0';
  return ((totalOnlinePoints.value / totalPoints.value) * 100).toFixed(1);
});

// 多选处理
const isAllSelected = computed(() => {
  if (paginatedList.value.length === 0) return false;
  return paginatedList.value.every((row) => selectedRowKeys.value.includes(row.id));
});

const toggleSelectAll = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    const pageIds = paginatedList.value.map((r) => r.id);
    selectedRowKeys.value = Array.from(new Set([...selectedRowKeys.value, ...pageIds]));
  } else {
    const pageIds = new Set(paginatedList.value.map((r) => r.id));
    selectedRowKeys.value = selectedRowKeys.value.filter((id) => !pageIds.has(id));
  }
};

const toggleSelectRow = (id: string) => {
  const idx = selectedRowKeys.value.indexOf(id);
  if (idx > -1) {
    selectedRowKeys.value.splice(idx, 1);
  } else {
    selectedRowKeys.value.push(id);
  }
};

// 搜索与重置
const handleSearch = () => {
  currentPage.value = 1;
  MessagePlugin.success(`检索完成，共找到 ${filteredDossiers.value.length} 户匹配档案`);
};

const handleReset = () => {
  filterParams.keyword = '';
  filterParams.issuingAuthority = '';
  filterParams.dataSourceType = '';
  filterParams.aboveDesignatedScale = '';
  filterParams.waterSourceType = '';
  filterParams.licenseStatus = '';
  filterParams.status = '';
  selectedDistrict.value = '全部';
  currentPage.value = 1;
  selectedRowKeys.value = [];
  MessagePlugin.info('搜索条件与辖区已全部重置');
};

const handleRefresh = () => {
  MessagePlugin.success('一户一档数据与计量点状态已刷新');
};

const handleExport = () => {
  MessagePlugin.success(`正在导出【${selectedDistrictLabel.value}】一户一档电子台账数据（共 ${filteredDossiers.value.length} 项）...`);
};

// 分页跳转
const handleJumpPage = () => {
  if (jumpPageInput.value >= 1 && jumpPageInput.value <= totalPages.value) {
    currentPage.value = jumpPageInput.value;
  } else {
    MessagePlugin.warning(`请输入有效页码 (1-${totalPages.value})`);
  }
};

// 操作：档案查看 (打开一户一档全景档案查看弹窗，功能参照用户原型截图)
const handleViewArchive = (row: EnterpriseDossier) => {
  currentDossier.value = row;
  archiveModalVisible.value = true;
};

// 操作：拓扑图 (打开水资源全链路实体拓扑图弹窗，功能参照用户原型截图)
const handleViewTopology = (row: EnterpriseDossier) => {
  currentDossier.value = row;
  topologyModalVisible.value = true;
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
}
</style>
