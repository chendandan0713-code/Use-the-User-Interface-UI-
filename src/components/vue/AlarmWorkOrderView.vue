<template>
  <div class="flex-1 flex gap-2.5 min-w-0 min-h-0 overflow-hidden p-2.5 bg-[#edf3fb] select-none text-xs">
    <!-- ==================== 左侧：行政区划树 ==================== -->
    <div class="w-56 flex flex-col shrink-0 min-h-0">
      <!-- 行政区划卡片与树结构 -->
      <div class="flex-1 bg-white rounded-lg border border-[#b4c7e0] shadow-2xs flex flex-col min-h-0 overflow-hidden">
        <!-- 1. 统一顶部标题栏 -->
        <div class="px-3.5 py-2.5 border-b border-[#b8cde6] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <!-- Blue map pin icon -->
            <svg class="w-4 h-4 text-[#1677ff] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
            </svg>
            <span class="text-xs font-bold text-gray-800 tracking-wide">行政区划</span>
          </div>
          <button
            type="button"
            @click="selectDistrictNode('全部')"
            class="text-[11px] text-[#1677ff] hover:text-blue-700 cursor-pointer font-medium hover:underline"
            title="重置为全省"
          >
            全部
          </button>
        </div>

        <!-- 2. 统一搜索过滤框 -->
        <div class="p-2.5 pb-1.5 shrink-0 border-b border-[#e5e9f2]">
          <div class="relative flex items-center">
            <svg class="w-3.5 h-3.5 text-gray-400 absolute left-2.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              v-model="treeSearchKey"
              type="text"
              placeholder="搜索区县名称..."
              class="w-full pl-8 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
            />
            <button
              v-if="treeSearchKey"
              type="button"
              @click="treeSearchKey = ''"
              class="absolute right-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
              title="清空搜索"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- 树结构区域 -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1 text-xs">
          <!-- 全部/全省根项快捷切换 -->
          <div
            @click="selectDistrictNode('全部')"
            :class="[
              'flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition',
              selectedDistrictNode === '全部'
                ? 'bg-[#eef4fe] text-[#1677ff] font-semibold'
                : 'text-gray-700 hover:bg-[#f5f8fd]'
            ]"
          >
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-[#1677ff]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
              </svg>
              <span>青海省全省</span>
            </div>
            <span class="text-[10px] text-gray-400 font-mono">{{ orders.length }}</span>
          </div>

          <!-- 各市州树节点 -->
          <div v-for="city in filteredDistrictTree" :key="city.name" class="space-y-0.5">
            <!-- 城市父节点 -->
            <div
              @click="toggleCity(city)"
              :class="[
                'flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition select-none',
                selectedDistrictNode === city.name
                  ? 'bg-[#eef4fe] text-[#1677ff] font-semibold'
                  : 'text-gray-800 hover:bg-[#f5f8fd]'
              ]"
            >
              <div class="flex items-center gap-1.5 truncate">
                <!-- 下拉折叠箭头 -->
                <svg
                  class="w-3.5 h-3.5 text-gray-500 transition-transform shrink-0"
                  :class="city.expanded ? 'rotate-90 text-[#1677ff]' : ''"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="6 4 18 12 6 20 6 4"></polygon>
                </svg>
                <!-- 文件夹图标 (统一为蓝色文件夹) -->
                <svg class="w-3.5 h-3.5 text-[#1677ff] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
                </svg>
                <span class="truncate font-medium">{{ city.name }}</span>
              </div>
            </div>

            <!-- 子区县节点 -->
            <div v-if="city.expanded" class="pl-4 space-y-0.5">
              <div
                v-for="district in city.children"
                :key="district"
                @click="selectDistrictNode(district)"
                :class="[
                  'flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition text-xs',
                  selectedDistrictNode === district
                    ? 'bg-[#eef4fe] text-[#1677ff] font-semibold'
                    : 'text-gray-700 hover:bg-[#f5f8fd]'
                ]"
              >
                <div class="flex items-center gap-2 truncate">
                  <svg class="w-3.5 h-3.5 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span class="truncate">{{ district }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== 右侧：主内容区域 (搜索栏 + 表格 + 分页) ==================== -->
    <div class="flex-1 flex flex-col min-w-0 min-h-0 gap-2.5 overflow-hidden">
      <!-- 1. 顶部搜索过滤栏 (严格统一为设施管理 WaterFilterBar 风格：微灰底色、柔和边框、内嵌清除按钮) -->
      <div class="bg-white rounded-lg p-3 border border-[#b4c7e0] shadow-2xs text-xs select-none space-y-3 shrink-0">
        <div class="flex flex-wrap items-center gap-2.5">
          <!-- 工单单号 -->
          <div class="relative w-[180px] shrink-0">
            <input
              v-model="filters.orderNo"
              type="text"
              placeholder="请输入工单单号"
              class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
              @keydown.enter="handleSearch"
            />
            <button
              v-if="filters.orderNo"
              type="button"
              @click="filters.orderNo = ''"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
              title="清空"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- 计量设施名称 -->
          <div class="relative w-[190px] shrink-0">
            <input
              v-model="filters.facilityName"
              type="text"
              placeholder="请输入计量设施名称"
              class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
              @keydown.enter="handleSearch"
            />
            <button
              v-if="filters.facilityName"
              type="button"
              @click="filters.facilityName = ''"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
              title="清空"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- 计量设施编码 -->
          <div class="relative w-[180px] shrink-0">
            <input
              v-model="filters.facilityCode"
              type="text"
              placeholder="请输入计量设施编码"
              class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
              @keydown.enter="handleSearch"
            />
            <button
              v-if="filters.facilityCode"
              type="button"
              @click="filters.facilityCode = ''"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
              title="清空"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- 监控级别 -->
          <select
            v-model="filters.monitorLevel"
            class="px-2.5 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] text-gray-700 cursor-pointer w-[140px] shrink-0"
          >
            <option value="">监控级别: 全部</option>
            <option value="部级">部级</option>
            <option value="省级">省级</option>
            <option value="市级">市级</option>
            <option value="县级">县级</option>
          </select>

          <!-- 特殊情形备案 -->
          <select
            v-model="filters.specialCase"
            class="px-2.5 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] text-gray-700 cursor-pointer w-[150px] shrink-0"
          >
            <option value="">特殊情形备案: 全部</option>
            <option value="停用">停用</option>
            <option value="检修">检修</option>
            <option value="报废">报废</option>
            <option value="应急">应急</option>
            <option value="-">未备案(-)</option>
          </select>

          <!-- 工单状态 -->
          <select
            v-model="filters.orderStatus"
            class="px-2.5 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] text-gray-700 cursor-pointer w-[140px] shrink-0"
          >
            <option value="">工单状态: 全部</option>
            <option value="待处置">待处置</option>
            <option value="工单处理中">工单处理中</option>
            <option value="待修订水量">待修订水量</option>
            <option value="待审核">待审核</option>
            <option value="工单处置完成">工单处置完成</option>
          </select>

          <!-- 告警标识 -->
          <select
            v-model="filters.alarmBadge"
            class="px-2.5 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] text-gray-700 cursor-pointer w-[140px] shrink-0"
          >
            <option value="">告警标识: 全部</option>
            <option value="红色告警">红色告警</option>
            <option value="黄色告警">黄色告警</option>
            <option value="蓝色告警">蓝色告警</option>
          </select>

          <!-- 超时情况 -->
          <select
            v-model="filters.timeoutStatus"
            class="px-2.5 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] text-gray-700 cursor-pointer w-[140px] shrink-0"
          >
            <option value="">超时情况: 全部</option>
            <option value="未超时">未超时</option>
            <option value="已超时">已超时</option>
          </select>

          <!-- 工单生成时间区间 -->
          <div class="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] text-gray-700 shrink-0">
            <span class="text-gray-500 whitespace-nowrap">工单生成时间:</span>
            <input
              v-model="filters.startDate"
              type="date"
              class="bg-transparent text-xs text-gray-700 focus:outline-none cursor-pointer"
            />
            <span class="text-gray-400">-</span>
            <input
              v-model="filters.endDate"
              type="date"
              class="bg-transparent text-xs text-gray-700 focus:outline-none cursor-pointer"
            />
          </div>
        </div>

        <!-- 操作按钮栏 (严格与设施管理 WaterFilterBar 保持一致：纯蓝查询、淡蓝重置、翠绿导出) -->
        <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#f0f4fa]">
          <div class="flex flex-wrap items-center gap-2">
            <!-- 查询 (纯蓝 #1677ff) -->
            <button
              type="button"
              @click="handleSearch"
              class="px-4 py-1.5 rounded bg-[#1677ff] hover:bg-blue-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>查询</span>
            </button>

            <!-- 重置 (统一为设施管理标准：淡蓝底 #f0f5fe、蓝字 #1677ff、边框 #d2e2fa) -->
            <button
              type="button"
              @click="handleReset"
              class="px-3.5 py-1.5 rounded bg-[#f0f5fe] text-[#1677ff] border border-[#d2e2fa] hover:bg-blue-100/50 font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
              </svg>
              <span>重置</span>
            </button>

            <!-- 导出 (设施管理统一翠绿 #00a854) -->
            <button
              type="button"
              @click="handleExport"
              class="px-3.5 py-1.5 rounded bg-[#00a854] hover:bg-emerald-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>导出</span>
            </button>

            <!-- 包含下级区域 (统一为设施管理标准滑动开关 Switch) -->
            <div
              class="flex items-center gap-2 ml-1 text-gray-700 cursor-pointer select-none"
              @click="filters.includeSubordinates = !filters.includeSubordinates"
            >
              <span>包含下级区域</span>
              <div
                :class="[
                  'w-8 h-4 rounded-full transition-colors relative flex items-center px-0.5',
                  filters.includeSubordinates ? 'bg-[#1677ff]' : 'bg-gray-300'
                ]"
              >
                <div
                  :class="[
                    'w-3 h-3 rounded-full bg-white transition-transform',
                    filters.includeSubordinates ? 'translate-x-4' : 'translate-x-0'
                  ]"
                ></div>
              </div>
              <span class="text-gray-500 text-[11px]">{{ filters.includeSubordinates ? '已开启' : '已关闭' }}</span>
            </div>
          </div>

          <!-- 右侧：当前区划标签 (如果有选择) -->
          <div v-if="selectedDistrictNode !== '全部'" class="flex items-center gap-1.5 text-xs text-gray-500">
            <span>已选区划:</span>
            <span class="px-2 py-0.5 rounded bg-blue-50 text-[#1677ff] font-medium border border-blue-200">
              {{ selectedDistrictNode }}
            </span>
            <button
              type="button"
              @click="selectDistrictNode('全部')"
              class="text-gray-400 hover:text-gray-600 underline cursor-pointer text-[11px]"
            >
              清除
            </button>
          </div>
        </div>
      </div>

      <!-- 2. 数据表格 (与设施管理 WaterFacilityTable 样式完全统一：灰蓝吸顶表头 #eaf1fb、左侧序号复选框固定、右侧操作列固定、清晰网格线、微淡蓝悬浮行) -->
      <div class="bg-white rounded-lg border border-[#b4c7e0] shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden select-none">
        <div class="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
          <table class="w-full text-left border-collapse text-xs border-l border-t border-[#b8cde6]">
            <!-- 表头 (柔和灰蓝底 #eaf1fb，清晰分列深细边框，第一行吸顶固定) -->
            <thead class="sticky top-0 z-20">
              <tr class="bg-[#eaf1fb] text-gray-800 font-semibold border-b border-[#a6c1e2]">
                <!-- 1. 序号与选项框合并一列 (固定在第一行和最左侧) -->
                <th class="py-3 px-2 whitespace-nowrap w-16 text-center border-r border-b border-[#b8cde6] sticky top-0 left-0 z-30 bg-[#eaf1fb] shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]">
                  <div class="flex items-center justify-center gap-1.5">
                    <input
                      type="checkbox"
                      :checked="isAllSelected"
                      @change="toggleSelectAll"
                      class="rounded border-gray-400 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                    />
                    <span>序号</span>
                  </div>
                </th>

                <!-- 2. 告警标识 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[90px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  告警标识
                </th>

                <!-- 3. 单号 -->
                <th class="py-3 px-2.5 whitespace-nowrap min-w-[140px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  单号
                </th>

                <!-- 4. 工单生成时间 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[130px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  工单生成时间
                </th>

                <!-- 5. 计量设施名称 -->
                <th class="py-3 px-2.5 whitespace-nowrap min-w-[180px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  计量设施名称
                </th>

                <!-- 6. 计量设施编码 -->
                <th class="py-3 px-2.5 whitespace-nowrap min-w-[130px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  计量设施编码
                </th>

                <!-- 7. 传输方式 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[80px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  传输方式
                </th>

                <!-- 8. 数据建设来源 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[110px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  数据建设来源
                </th>

                <!-- 9. 特殊情形备案 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[100px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  特殊情形备案
                </th>

                <!-- 10. 恢复时间 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[120px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  恢复时间
                </th>

                <!-- 11. 告警数量 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[80px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  告警数量
                </th>

                <!-- 12. 工单状态 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[100px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  工单状态
                </th>

                <!-- 13. 超时情况 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[80px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  超时情况
                </th>

                <!-- 14. 操作 (固定在最右侧) -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[120px] border-r border-b border-[#b8cde6] sticky top-0 right-0 z-30 bg-[#eaf1fb] shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.08)]">
                  <div class="inline-flex items-center gap-1">
                    <span>操作</span>
                    <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>

            <!-- 表体 -->
            <tbody class="text-gray-800 bg-white">
              <tr
                v-for="(item, idx) in paginatedOrders"
                :key="item.id"
                class="group hover:bg-[#f5f8fd] transition-colors"
                :class="selectedRowKeys.includes(item.id) ? 'bg-[#eef4fe]' : ''"
              >
                <!-- 1. 序号与选项框 (固定最左侧) -->
                <td
                  class="py-3.5 px-2 text-center border-r border-b border-[#b8cde6] whitespace-nowrap sticky left-0 z-10 transition-colors shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]"
                  :class="selectedRowKeys.includes(item.id) ? 'bg-[#eef4fe]' : 'bg-white group-hover:bg-[#f5f8fd]'"
                >
                  <div class="flex items-center justify-center gap-1.5">
                    <input
                      type="checkbox"
                      :checked="selectedRowKeys.includes(item.id)"
                      @change="toggleSelectRow(item.id)"
                      class="rounded border-gray-300 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                    />
                    <span class="font-mono text-gray-500 text-xs">{{ (currentPage - 1) * pageSize + idx + 1 }}</span>
                  </div>
                </td>

                <!-- 2. 告警标识 (美化：呼吸动态光标、精致微边框与柔和底色) -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-2xs transition-all border',
                      item.alarmBadge === '红色告警' ? 'bg-red-50 text-red-700 border-red-200/90 shadow-red-100/50' :
                      item.alarmBadge === '黄色告警' ? 'bg-amber-50 text-amber-700 border-amber-200/90 shadow-amber-100/50' :
                      'bg-sky-50 text-sky-700 border-sky-200/90 shadow-sky-100/50'
                    ]"
                  >
                    <span class="relative flex h-2 w-2 items-center justify-center shrink-0">
                      <span
                        v-if="item.alarmBadge === '红色告警'"
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                      ></span>
                      <span
                        :class="[
                          'relative inline-flex rounded-full h-1.5 w-1.5',
                          item.alarmBadge === '红色告警' ? 'bg-red-600' :
                          item.alarmBadge === '黄色告警' ? 'bg-amber-500' :
                          'bg-sky-500'
                        ]"
                      ></span>
                    </span>
                    <span class="tracking-wide">{{ item.alarmBadge }}</span>
                  </span>
                </td>

                <!-- 3. 单号 -->
                <td class="py-3.5 px-2.5 font-mono text-gray-900 border-r border-b border-[#b8cde6]">
                  {{ item.orderNo }}
                </td>

                <!-- 4. 工单生成时间 -->
                <td class="py-3.5 px-2.5 text-center text-gray-600 font-mono text-[11px] border-r border-b border-[#b8cde6]">
                  {{ item.createTime }}
                </td>

                <!-- 5. 计量设施名称 -->
                <td class="py-3.5 px-2.5 font-medium text-gray-900 border-r border-b border-[#b8cde6]" :title="item.facilityName">
                  <span class="hover:text-[#1677ff] cursor-pointer" @click="viewDetail(item)">
                    {{ item.facilityName }}
                  </span>
                </td>

                <!-- 6. 计量设施编码 (可复制) -->
                <td class="py-3.5 px-2.5 font-mono border-r border-b border-[#b8cde6]">
                  <div class="flex items-center gap-1 text-[#1677ff]">
                    <span class="hover:underline cursor-pointer" @click="viewDetail(item)">
                      {{ item.facilityCode }}
                    </span>
                    <button
                      type="button"
                      @click="copyCode(item.facilityCode)"
                      title="复制编号"
                      class="text-gray-400 hover:text-[#1677ff] p-0.5 cursor-pointer rounded"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                </td>

                <!-- 7. 传输方式 -->
                <td class="py-3.5 px-2.5 text-center text-gray-700 border-r border-b border-[#b8cde6]">
                  {{ item.transmissionMode }}
                </td>

                <!-- 8. 数据建设来源 -->
                <td class="py-3.5 px-2.5 text-center text-gray-700 border-r border-b border-[#b8cde6]">
                  {{ item.constructionSource }}
                </td>

                <!-- 9. 特殊情形备案 -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6]">
                  <span :class="item.specialCase === '停用' ? 'text-amber-700 font-medium' : 'text-gray-600'">
                    {{ item.specialCase }}
                  </span>
                </td>

                <!-- 10. 恢复时间 -->
                <td class="py-3.5 px-2.5 text-center text-gray-600 font-mono text-[11px] border-r border-b border-[#b8cde6]">
                  {{ item.recoverTime }}
                </td>

                <!-- 11. 告警数量 (蓝色链接) -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6]">
                  <button
                    type="button"
                    @click="viewAlarmList(item)"
                    class="text-[#1677ff] hover:text-blue-800 font-mono font-medium hover:underline cursor-pointer"
                    title="点击查看告警明细"
                  >
                    {{ item.alarmCount }}
                  </button>
                </td>

                <!-- 12. 工单状态 -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-medium border whitespace-nowrap',
                      item.orderStatus === '待处置' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                      item.orderStatus === '工单处理中' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                      item.orderStatus === '待修订水量' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                      item.orderStatus === '待审核' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                      item.orderStatus === '工单处置完成' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                      'bg-gray-50 text-gray-600 border-gray-200'
                    ]"
                  >
                    {{ item.orderStatus }}
                  </span>
                </td>

                <!-- 13. 超时情况 -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6]">
                  <span :class="item.timeoutStatus === '已超时' ? 'text-[#dc2626] font-bold' : 'text-[#ea580c] font-medium'">
                    {{ item.timeoutStatus }}
                  </span>
                </td>

                <!-- 14. 操作 (固定在最右侧) -->
                <td
                  class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6] sticky right-0 z-10 transition-colors shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.08)]"
                  :class="selectedRowKeys.includes(item.id) ? 'bg-[#eef4fe]' : 'bg-white group-hover:bg-[#f5f8fd]'"
                >
                  <div class="flex items-center justify-center gap-2.5 text-xs text-[#1677ff]">
                    <!-- 当工单状态为 '待修订水量' 时，操作栏按钮改为 '修订水量' -->
                    <button
                      v-if="item.orderStatus === '待修订水量'"
                      type="button"
                      @click="openWaterRevisionModal(item)"
                      class="hover:underline cursor-pointer font-medium text-[#1677ff]"
                    >
                      修订水量
                    </button>
                    <button
                      v-else
                      type="button"
                      @click="handleWorkOrder(item)"
                      class="hover:underline cursor-pointer"
                    >
                      工单处理
                    </button>
                    <button
                      type="button"
                      @click="viewDetail(item)"
                      class="hover:underline cursor-pointer"
                    >
                      详情
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty State (与设施管理一致) -->
              <tr v-if="paginatedOrders.length === 0">
                <td colspan="14" class="text-center py-16 text-gray-400 border-r border-b border-[#b8cde6]">
                  <div class="flex flex-col items-center justify-center gap-2">
                    <svg class="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>暂无符合条件的告警工单记录</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 3. 分页栏：完全统一为设施管理 WaterFacilityTable 的 t-pagination 样式，文字说明已全部去掉 -->
        <div class="px-3 py-2 border-t border-[#b4c7e0] flex flex-wrap items-center justify-between gap-2 shrink-0 bg-white">
          <div class="text-xs text-gray-500">
            共 <strong class="text-gray-800 font-mono font-medium">{{ filteredOrders.length }}</strong> 条数据
          </div>
          <t-pagination
            v-model:current="currentPage"
            v-model:pageSize="pageSize"
            :total="filteredOrders.length"
            :pageSizeOptions="[10, 20, 50, 100]"
            :total-content="false"
            size="small"
            showJumper
          />
        </div>
      </div>
    </div>

    <!-- ==================== 模态框 1：告警工单处置与核销 (同计量设施管理弹窗规范 100% 保持一致) ==================== -->
    <div
      v-if="handleModalVisible && currentSelectedOrder"
      class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none overflow-y-auto"
      @click.self="handleModalVisible = false"
    >
      <div
        class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1160px] h-[720px] max-h-[92vh] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col"
      >
        <!-- 1. 浅色顶部标题栏 (Light Header)：浅灰蓝背景、精致徽标与底边分割线，完全统一计量设施管理风格 -->
        <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">
                  工单处置
                </h3>
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border shadow-2xs',
                    currentSelectedOrder.alarmBadge === '红色告警' ? 'bg-red-50 text-red-700 border-red-200' :
                    currentSelectedOrder.alarmBadge === '黄色告警' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-sky-50 text-sky-700 border-sky-200'
                  ]"
                >
                  <span class="relative flex h-1.5 w-1.5 items-center justify-center shrink-0">
                    <span
                      v-if="currentSelectedOrder.alarmBadge === '红色告警'"
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                    ></span>
                    <span
                      :class="[
                        'relative inline-flex rounded-full h-1.5 w-1.5',
                        currentSelectedOrder.alarmBadge === '红色告警' ? 'bg-red-600' :
                        currentSelectedOrder.alarmBadge === '黄色告警' ? 'bg-amber-500' :
                        'bg-sky-500'
                      ]"
                    ></span>
                  </span>
                  <span>{{ currentSelectedOrder.alarmBadge }}</span>
                </span>
                <span
                  :class="[
                    'px-2 py-0.5 rounded text-[11px] font-medium border',
                    currentSelectedOrder.timeoutStatus === '已超时' ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  ]"
                >
                  {{ currentSelectedOrder.timeoutStatus }}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="handleModalVisible = false"
            class="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer p-1.5 rounded-lg -mr-1"
            title="关闭"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 2. 内容滚动区：与计量设施管理卡片及网格布局完全同构 -->
        <div class="p-4 overflow-y-auto space-y-3.5 text-xs text-slate-800 custom-scrollbar flex-1 bg-[#f8fafc]/50">
          <div class="grid grid-cols-12 gap-4">
            <!-- 左侧卡片：工单基本参数及设施信息 -->
            <div class="col-span-5 bg-white rounded-lg border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between space-y-3">
              <div>
                <div class="flex items-center border-b border-slate-100 pb-2.5 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[14px] font-bold text-slate-800">工单基本信息</span>
                  </div>
                </div>

                <div class="space-y-2.5 text-[12px]">
                  <!-- 工单编号 -->
                  <div class="flex items-center">
                    <span class="w-24 shrink-0 text-slate-400 font-normal">工单编号</span>
                    <span class="font-mono text-slate-800 font-semibold select-all">
                      {{ currentSelectedOrder.orderNo }}
                    </span>
                  </div>

                  <!-- 超时情况 -->
                  <div class="flex items-center">
                    <span class="w-24 shrink-0 text-slate-400 font-normal">超时情况</span>
                    <div>
                      <span
                        :class="[
                          'px-2 py-0.5 rounded text-[11px] font-medium border',
                          currentSelectedOrder.timeoutStatus === '已超时' ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        ]"
                      >
                        {{ currentSelectedOrder.timeoutStatus }}
                      </span>
                    </div>
                  </div>

                  <!-- 工单类型 -->
                  <div class="flex items-center">
                    <span class="w-24 shrink-0 text-slate-400 font-normal">工单类型</span>
                    <div>
                      <span
                        :class="[
                          'px-2 py-0.5 rounded text-[11px] font-medium border',
                          (currentSelectedOrder.level || '紧急') === '紧急' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                          (currentSelectedOrder.level || '紧急') === '高危' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                          'bg-blue-50 text-blue-600 border-blue-200'
                        ]"
                      >
                        {{ currentSelectedOrder.level || '紧急' }}
                      </span>
                    </div>
                  </div>

                  <!-- 已超时时间 -->
                  <div class="flex items-center">
                    <span class="w-24 shrink-0 text-slate-400 font-normal">已超时时间</span>
                    <span class="text-rose-600 font-medium font-mono">
                      {{ currentSelectedOrder.timeoutDuration || (currentSelectedOrder.timeoutStatus === '已超时' ? '40天' : '-') }}
                    </span>
                  </div>

                  <!-- 计量设施名称 -->
                  <div class="flex items-start">
                    <span class="w-24 shrink-0 text-slate-400 font-normal pt-0.5">计量设施名称</span>
                    <span class="text-slate-800 font-medium leading-relaxed">
                      {{ currentSelectedOrder.facilityName }}
                    </span>
                  </div>

                  <!-- 计量设施编码 -->
                  <div class="flex items-center">
                    <span class="w-24 shrink-0 text-slate-400 font-normal">计量设施编码</span>
                    <span class="text-slate-800 font-mono">
                      {{ currentSelectedOrder.facilityCode }}
                    </span>
                  </div>

                  <!-- 传输方式 -->
                  <div class="flex items-center">
                    <span class="w-24 shrink-0 text-slate-400 font-normal">传输方式</span>
                    <span
                      :class="[
                        'font-medium inline-flex items-center gap-1.5',
                        currentSelectedOrder.transmissionMode === '在线' ? 'text-emerald-600' : 'text-slate-600'
                      ]"
                    >
                      <span class="w-1.5 h-1.5 rounded-full" :class="currentSelectedOrder.transmissionMode === '在线' ? 'bg-emerald-500' : 'bg-slate-400'"></span>
                      {{ currentSelectedOrder.transmissionMode }}
                    </span>
                  </div>

                  <!-- 工单处置时间 -->
                  <div class="flex items-start">
                    <span class="w-24 shrink-0 text-slate-400 font-normal pt-0.5">工单处置时间</span>
                    <span class="text-slate-700 font-mono leading-relaxed text-[11.5px]">
                      {{ currentSelectedOrder.disposalTimeRange || '2026-06-26 08:00:00 至 2026-07-03 08:00:00' }}
                    </span>
                  </div>

                  <!-- 告警类型 -->
                  <div class="flex items-center">
                    <span class="w-24 shrink-0 text-slate-400 font-normal">告警类型</span>
                    <span class="text-slate-800 font-medium">
                      {{ currentSelectedOrder.alarmTypeDesc || '未上报,缺报' }}
                    </span>
                  </div>

                  <!-- 告警内容 -->
                  <div class="flex items-start">
                    <span class="w-24 shrink-0 text-slate-400 font-normal pt-0.5">告警内容</span>
                    <span class="text-slate-700 leading-relaxed text-[11.5px] bg-[#f8fafc] p-2.5 rounded border border-slate-200/80 w-full">
                      {{ currentSelectedOrder.alarmContentDesc || '未上报、系统自动补0;缺报、系统自动补空' }}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <!-- 右侧卡片：处理信息与业务表单联动 (根据产生告警原因动态切换) -->
            <div class="col-span-7 bg-white rounded-lg border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between space-y-3.5">
              <div class="space-y-3">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[14px] font-bold text-slate-800">工单处置信息</span>
                  </div>
                  <span class="text-[11px] text-slate-400">
                    处理责任人：
                    <span class="text-slate-700 font-medium">{{ currentSelectedOrder.assignee || '马建国' }}</span>
                  </span>
                </div>

                <!-- 产生告警原因下拉框 -->
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1 font-medium text-xs text-slate-700">
                      <span class="text-red-500">*</span>
                      <span>产生告警原因</span>
                    </div>
                    <span class="text-[11px] text-slate-400 font-normal">切换原因联动对应处置表单</span>
                  </div>
                  <select
                    v-model="handleForm.alarmReason"
                    @change="onAlarmReasonChange"
                    class="w-full h-9 px-3 rounded-lg border border-[#dce6f5] text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 bg-white transition cursor-pointer font-medium"
                  >
                    <option value="用户水户停产未报">1、用户水户停产未报（需提交停用申请）</option>
                    <option value="计量设施故障">2、计量设施故障（需提交故障上报）</option>
                    <option value="传输设备故障">3、传输设备故障（需提交故障上报）</option>
                    <option value="传输网络中断">4、传输网络中断（需提交故障上报）</option>
                    <option value="供电故障或停电检修">5、供电故障或停电检修（需提交故障上报）</option>
                    <option value="产能减少、阶段性取水">6、产能减少、阶段性取水（需填写处理情况+证明图片）</option>
                    <option value="产能增大、用水量增加">7、产能增大、用水量增加（需填写处理情况+证明图片）</option>
                    <option value="计量设备安装不当">8、计量设备安装不当（需填写处理情况+证明图片）</option>
                    <option value="管道未安装止回阀">9、管道未安装止回阀（需填写处理情况+证明图片）</option>
                    <option value="其他">10、其他（需填写原因）</option>
                  </select>
                </div>

                <!-- ================= 1. 用户水户停产未报 -> 停用申请 ================= -->
                <div v-if="handleForm.alarmReason === '用户水户停产未报'" class="pt-0.5">
                  <div v-if="decommissionRecords.length === 0" class="py-12 flex flex-col items-center justify-center">
                    <button
                      type="button"
                      @click="openDecommissionModal"
                      class="px-5 py-2.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded-md text-xs cursor-pointer font-medium shadow-xs transition flex items-center gap-2 active:scale-98"
                    >
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <span>停用申请</span>
                    </button>
                  </div>

                  <div v-else class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                        <span>停用申请记录列表</span>
                        <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-600 font-mono border border-blue-200">
                          {{ decommissionRecords.length }} 条
                        </span>
                      </span>
                      <button
                        type="button"
                        @click="openDecommissionModal"
                        class="px-3 py-1 bg-[#1677ff] hover:bg-blue-600 text-white rounded-md text-xs cursor-pointer font-medium shadow-2xs transition flex items-center gap-1 active:scale-98"
                      >
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>停用申请</span>
                      </button>
                    </div>

                    <!-- 停用申请表格 (样式同列表一致) -->
                    <div class="border border-[#b4c7e0] rounded overflow-hidden">
                      <table class="w-full text-[11px] border-collapse border-l border-t border-[#b8cde6]">
                        <thead class="bg-[#eaf1fb] text-gray-800 font-semibold border-b border-[#a6c1e2]">
                          <tr>
                            <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">申请单号</th>
                            <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">停用类型</th>
                            <th class="py-2 px-2.5 text-left border-r border-b border-[#b8cde6] bg-[#eaf1fb]">停产说明</th>
                            <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">起止日期</th>
                            <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">申请人</th>
                            <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">状态</th>
                            <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">操作</th>
                          </tr>
                        </thead>
                        <tbody class="text-gray-800 bg-white">
                          <tr
                            v-for="dec in decommissionRecords"
                            :key="dec.id"
                            class="hover:bg-[#f5f8fd] transition-colors"
                          >
                            <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] font-mono text-slate-600 whitespace-nowrap">
                              {{ dec.applyNo }}
                            </td>
                            <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] text-slate-700 whitespace-nowrap">
                              {{ dec.stopType }}
                            </td>
                            <td class="py-2 px-2.5 border-r border-b border-[#b8cde6] text-slate-600 truncate max-w-[120px]" :title="dec.reasonDesc">
                              {{ dec.reasonDesc }}
                            </td>
                            <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] font-mono text-slate-600 whitespace-nowrap">
                              {{ dec.startDate }} ~ {{ dec.expectedEndDate || '长期' }}
                            </td>
                            <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] text-slate-700 whitespace-nowrap">
                              {{ dec.applicant }}
                            </td>
                            <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                              <span class="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
                                {{ dec.status }}
                              </span>
                            </td>
                            <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                              <button
                                type="button"
                                @click="viewDecommissionDetail(dec)"
                                class="text-[#1677ff] hover:text-blue-800 cursor-pointer hover:underline font-medium"
                              >
                                详情
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <!-- ================= 2-5. 故障类：计量/传输/网络/供电 -> 故障上报 ================= -->
                <div v-else-if="['计量设施故障', '传输设备故障', '传输网络中断', '供电故障或停电检修'].includes(handleForm.alarmReason)" class="pt-0.5">
                  <div v-if="currentFaultRecords.length === 0" class="py-12 flex flex-col items-center justify-center">
                    <button
                      type="button"
                      @click="openFaultReportModal"
                      class="px-5 py-2.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded-md text-xs cursor-pointer font-medium shadow-xs transition flex items-center gap-2 active:scale-98"
                    >
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <span>故障上报</span>
                    </button>
                  </div>

                  <div v-else class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                        <span>故障记录列表</span>
                        <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-mono">
                          {{ currentFaultRecords.length }} 条
                        </span>
                      </span>
                      <button
                        type="button"
                        @click="openFaultReportModal"
                        class="px-3 py-1 bg-[#1677ff] hover:bg-blue-600 text-white rounded-md text-xs cursor-pointer font-medium shadow-2xs transition flex items-center gap-1 active:scale-98"
                      >
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>故障上报</span>
                      </button>
                    </div>

                    <!-- 故障记录表格 (样式同列表一致) -->
                    <div class="border border-[#b4c7e0] rounded overflow-hidden">
                      <table class="w-full text-[11px] border-collapse border-l border-t border-[#b8cde6]">
                        <thead class="bg-[#eaf1fb] text-gray-800 font-semibold border-b border-[#a6c1e2]">
                          <tr>
                            <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">序号</th>
                            <th class="py-2 px-2.5 text-left border-r border-b border-[#b8cde6] bg-[#eaf1fb]">计量设施名称</th>
                            <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">故障类型</th>
                            <th class="py-2 px-2.5 text-left border-r border-b border-[#b8cde6] bg-[#eaf1fb]">故障情况</th>
                            <th class="py-2 px-1.5 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">佐证照片</th>
                            <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">上报人</th>
                            <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">上报时间</th>
                            <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">状态</th>
                            <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">流程</th>
                          </tr>
                        </thead>
                        <tbody class="text-gray-800 bg-white">
                          <tr
                            v-for="(rec, rIdx) in currentFaultRecords"
                            :key="rec.id"
                            class="hover:bg-[#f5f8fd] transition-colors"
                          >
                            <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] text-gray-500 font-mono">{{ rIdx + 1 }}</td>
                            <td class="py-2 px-2.5 text-slate-800 border-r border-b border-[#b8cde6] truncate max-w-[105px]" :title="rec.facilityName">
                              {{ rec.facilityName }}
                            </td>
                            <td class="py-2 px-2 text-center text-slate-700 border-r border-b border-[#b8cde6] whitespace-nowrap">
                              {{ rec.faultType }}
                            </td>
                            <td class="py-2 px-2.5 text-slate-600 border-r border-b border-[#b8cde6] truncate max-w-[105px]" :title="rec.faultDesc">
                              {{ rec.faultDesc }}
                            </td>
                            <td class="py-2 px-1.5 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                              <button
                                v-if="rec.faultImage"
                                type="button"
                                class="text-[#1677ff] hover:text-blue-700 cursor-pointer font-medium hover:underline"
                                @click="previewImage(rec.faultImage)"
                              >
                                [查看]
                              </button>
                              <span v-else class="text-slate-400">-</span>
                            </td>
                            <td class="py-2 px-2 text-center text-slate-700 border-r border-b border-[#b8cde6] whitespace-nowrap">
                              {{ rec.reporter }}
                            </td>
                            <td class="py-2 px-2 text-center font-mono text-slate-600 border-r border-b border-[#b8cde6] whitespace-nowrap">
                              {{ rec.faultTime }}
                            </td>
                            <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                              <span
                                :class="[
                                  'px-1.5 py-0.5 rounded text-[10px] font-medium border',
                                  rec.status === '已修复' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                  rec.status === '处理中' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                                  'bg-rose-50 text-rose-600 border-rose-200'
                                ]"
                              >
                                {{ rec.status }}
                              </span>
                            </td>
                            <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                              <button
                                type="button"
                                @click="viewProcess(rec)"
                                class="text-[#1677ff] hover:text-blue-800 cursor-pointer hover:underline font-medium"
                              >
                                流程
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <!-- ================= 6-9. 填写原因（处理情况 + 证明图片） ================= -->
                <div v-else-if="['产能减少、阶段性取水', '产能增大、用水量增加', '计量设备安装不当', '管道未安装止回阀'].includes(handleForm.alarmReason)" class="space-y-3 pt-0.5">
                  <!-- 处理情况 -->
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <label class="font-medium text-xs text-slate-700 flex items-center gap-1">
                        <span class="text-red-500">*</span>
                        <span>处理情况</span>
                      </label>
                      <button
                        type="button"
                        @click="insertTemplateDesc"
                        class="text-[#1677ff] hover:underline cursor-pointer text-[11px] flex items-center gap-1 font-medium"
                      >
                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>填入参考说明</span>
                      </button>
                    </div>
                    <textarea
                      v-model="handleForm.handlingDesc"
                      rows="3"
                      placeholder="请详细记录现场核查的处理情况、用水特征分析及整改防范措施..."
                      class="w-full p-2.5 rounded-lg border border-[#dce6f5] focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 text-slate-800 text-xs bg-white outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  <!-- 证明图片 -->
                  <div class="space-y-1.5">
                    <div class="flex items-center justify-between">
                      <label class="font-medium text-xs text-slate-700 flex items-center gap-1">
                        <span class="text-red-500">*</span>
                        <span>证明图片 (现场工况照片/生产排班表/管网整改照片)</span>
                      </label>
                      <span class="text-[11px] text-slate-400">已上传 {{ handleForm.proofImages.length }} 张照片</span>
                    </div>

                    <div class="grid grid-cols-4 gap-2.5">
                      <!-- 已上传图片 -->
                      <div
                        v-for="(img, idx) in handleForm.proofImages"
                        :key="idx"
                        class="group relative h-20 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center shadow-2xs"
                      >
                        <img :src="img" alt="佐证照片" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
                        <div class="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            @click.stop="previewProofImage(img)"
                            class="p-1 rounded bg-white/90 text-slate-800 hover:bg-white text-xs cursor-pointer"
                            title="放大查验"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              <line x1="11" y1="8" x2="11" y2="14"></line>
                              <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                          </button>
                          <button
                            type="button"
                            @click.stop="removeProofImage(idx)"
                            class="p-1 rounded bg-white/90 text-rose-600 hover:bg-white text-xs cursor-pointer"
                            title="删除"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 bg-slate-900/60 text-white text-[9.5px] px-1 py-0.5 truncate text-center pointer-events-none">
                          佐证图片 {{ idx + 1 }}
                        </div>
                      </div>

                      <!-- 上传照片卡片 -->
                      <div
                        @click="triggerUploadProofImage"
                        class="h-20 border-2 border-dashed border-[#b8cde6] hover:border-[#1677ff] rounded-lg flex flex-col items-center justify-center p-1.5 text-center bg-blue-50/20 hover:bg-blue-50/40 cursor-pointer transition group"
                      >
                        <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span class="text-[11px] font-medium text-blue-600">点击上传佐证</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ================= 10. 其他：填写原因 ================= -->
                <div v-else-if="handleForm.alarmReason === '其他'" class="space-y-3 pt-0.5">
                  <!-- 原因及处理情况说明 -->
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <label class="font-medium text-xs text-slate-700 flex items-center gap-1">
                        <span class="text-red-500">*</span>
                        <span>原因及处置情况说明</span>
                      </label>
                      <button
                        type="button"
                        @click="insertTemplateDesc"
                        class="text-[#1677ff] hover:underline cursor-pointer text-[11px] flex items-center gap-1 font-medium"
                      >
                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>填入参考说明</span>
                      </button>
                    </div>
                    <textarea
                      v-model="handleForm.handlingDesc"
                      rows="4"
                      placeholder="请详细填写其他产生告警的具体原因、现场排查结论及处理情况..."
                      class="w-full p-2.5 rounded-lg border border-[#dce6f5] focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 text-slate-800 text-xs bg-white outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  <!-- 证明图片（选填） -->
                  <div class="space-y-1.5">
                    <div class="flex items-center justify-between">
                      <label class="font-medium text-xs text-slate-700 flex items-center gap-1">
                        <span>证明图片 / 佐证材料 (选填)</span>
                      </label>
                      <span class="text-[11px] text-slate-400">已上传 {{ handleForm.proofImages.length }} 张照片</span>
                    </div>

                    <div class="grid grid-cols-4 gap-2.5">
                      <div
                        v-for="(img, idx) in handleForm.proofImages"
                        :key="idx"
                        class="group relative h-20 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center shadow-2xs"
                      >
                        <img :src="img" alt="佐证照片" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
                        <div class="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            @click.stop="previewProofImage(img)"
                            class="p-1 rounded bg-white/90 text-slate-800 hover:bg-white text-xs cursor-pointer"
                            title="放大查验"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              <line x1="11" y1="8" x2="11" y2="14"></line>
                              <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                          </button>
                          <button
                            type="button"
                            @click.stop="removeProofImage(idx)"
                            class="p-1 rounded bg-white/90 text-rose-600 hover:bg-white text-xs cursor-pointer"
                            title="删除"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 bg-slate-900/60 text-white text-[9.5px] px-1 py-0.5 truncate text-center pointer-events-none">
                          佐证图片 {{ idx + 1 }}
                        </div>
                      </div>

                      <div
                        @click="triggerUploadProofImage"
                        class="h-20 border-2 border-dashed border-[#b8cde6] hover:border-[#1677ff] rounded-lg flex flex-col items-center justify-center p-1.5 text-center bg-blue-50/20 hover:bg-blue-50/40 cursor-pointer transition group"
                      >
                        <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span class="text-[11px] font-medium text-blue-600">点击上传佐证</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. 浅色底部操作栏 (Light Footer)：操作按钮，样式与计量设施管理完全一致 -->
        <div class="px-5 py-3 bg-[#f8fafc] border-t border-slate-200/80 flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            @click="handleModalVisible = false"
            class="px-4 py-1.5 rounded-md text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-800 transition cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            @click="submitWorkOrderResolution"
            class="px-4.5 py-1.5 rounded-md text-xs font-medium text-white bg-[#1677ff] hover:bg-blue-600 transition shadow-xs cursor-pointer flex items-center gap-1.5 active:scale-98"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>确认提交处置</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== 子模态框：提交停用申请 (同计量设施管理统一风格) ==================== -->
    <div
      v-if="decommissionModalVisible && currentSelectedOrder"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none overflow-y-auto"
      @click.self="decommissionModalVisible = false"
    >
      <div
        class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[620px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col"
      >
        <!-- 头部 -->
        <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
            </div>
            <div>
              <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">
                提交水户停产停用申请
              </h3>
              <div class="text-[11px] text-slate-500 font-mono">
                关联设施: {{ currentSelectedOrder.facilityCode }}
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="decommissionModalVisible = false"
            class="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer p-1.5 rounded-lg -mr-1"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 表单内容 -->
        <div class="p-4 overflow-y-auto space-y-3 text-xs text-slate-800 bg-[#f8fafc]/50 flex-1">
          <div class="bg-white rounded-lg border border-slate-200/80 p-4 shadow-2xs space-y-3">
            <div>
              <label class="block text-slate-600 mb-1 font-medium">计量设施名称</label>
              <input
                type="text"
                :value="currentSelectedOrder.facilityName"
                disabled
                class="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-100 text-slate-600 cursor-not-allowed text-xs font-medium"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-medium"><span class="text-red-500 mr-0.5">*</span>停用类型</label>
                <select
                  v-model="decommissionForm.stopType"
                  class="w-full h-9 px-3 rounded-lg border border-[#dce6f5] focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 text-slate-800 text-xs bg-white outline-none font-medium cursor-pointer"
                >
                  <option value="季节性停工/停产">季节性停工/停产</option>
                  <option value="设备检修停产">设备检修停产</option>
                  <option value="水质或环保整治停产">水质或环保整治停产</option>
                  <option value="企业注销或停业">企业注销或停业</option>
                </select>
              </div>

              <div>
                <label class="block text-slate-600 mb-1 font-medium"><span class="text-red-500 mr-0.5">*</span>申请填报人</label>
                <input
                  v-model="decommissionForm.applicant"
                  type="text"
                  class="w-full h-9 px-3 rounded-lg border border-[#dce6f5] focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 text-slate-800 text-xs bg-white outline-none"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-medium"><span class="text-red-500 mr-0.5">*</span>停产起始日期</label>
                <input
                  v-model="decommissionForm.startDate"
                  type="date"
                  class="w-full h-9 px-3 rounded-lg border border-[#dce6f5] focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 text-slate-800 text-xs bg-white outline-none cursor-pointer"
                />
              </div>

              <div>
                <label class="block text-slate-600 mb-1 font-medium">预计复产日期（选填）</label>
                <input
                  v-model="decommissionForm.expectedEndDate"
                  type="date"
                  class="w-full h-9 px-3 rounded-lg border border-[#dce6f5] focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 text-slate-800 text-xs bg-white outline-none cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-medium"><span class="text-red-500 mr-0.5">*</span>停产停用原因详细说明</label>
              <textarea
                v-model="decommissionForm.reasonDesc"
                rows="3"
                placeholder="详细说明水户停产停工原因、现场阀门铅封状态及后续复产备案安排..."
                class="w-full p-2.5 rounded-lg border border-[#dce6f5] focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 text-slate-800 text-xs bg-white outline-none leading-relaxed"
              ></textarea>
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-medium">停产证明材料 / 现场铅封照片</label>
              <div
                @click="mockUploadDecommissionProof"
                class="border-2 border-dashed border-[#b8cde6] hover:border-[#1677ff] rounded-lg p-3 text-center bg-blue-50/20 hover:bg-blue-50/40 cursor-pointer transition"
              >
                <div v-if="decommissionForm.proofImage" class="flex items-center justify-center gap-2 text-emerald-600 font-medium">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>已上传证明材料：水户停产批文及铅封照片</span>
                </div>
                <div v-else>
                  <svg class="w-6 h-6 text-slate-400 mx-auto mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <div class="text-[11px] text-slate-500">点击上传停产通知书或现场铅封留档材料</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部栏 -->
        <div class="px-5 py-2.5 bg-[#f8fafc] border-t border-slate-200/80 flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            @click="decommissionModalVisible = false"
            class="px-4 py-1.5 rounded-md text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            @click="submitDecommissionApplication"
            class="px-4.5 py-1.5 rounded-md text-xs font-medium text-white bg-[#1677ff] hover:bg-blue-600 transition shadow-xs cursor-pointer flex items-center gap-1.5 active:scale-98"
          >
            <span>确认提交申请</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== 子模态框：上报故障记录 (同计量设施管理统一风格) ==================== -->
    <div
      v-if="faultReportModalVisible && currentSelectedOrder"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none overflow-y-auto"
      @click.self="faultReportModalVisible = false"
    >
      <div
        class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[620px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col"
      >
        <!-- 头部 -->
        <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">
                上报计量设施故障
              </h3>
              <div class="text-[11px] text-slate-500 font-mono">
                关联设施: {{ currentSelectedOrder.facilityCode }}
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="faultReportModalVisible = false"
            class="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer p-1.5 rounded-lg -mr-1"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 表单内容 -->
        <div class="p-4 overflow-y-auto space-y-3 text-xs text-slate-800 bg-[#f8fafc]/50 flex-1">
          <div class="bg-white rounded-lg border border-slate-200/80 p-4 shadow-2xs space-y-3">
            <div>
              <label class="block text-slate-600 mb-1 font-medium">计量设施名称</label>
              <input
                type="text"
                :value="currentSelectedOrder.facilityName"
                disabled
                class="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-100 text-slate-600 cursor-not-allowed text-xs font-medium"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-medium"><span class="text-red-500 mr-0.5">*</span>故障类型</label>
                <select
                  v-model="faultForm.faultType"
                  class="w-full h-9 px-3 rounded-lg border border-[#dce6f5] focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 text-slate-800 text-xs bg-white outline-none font-medium cursor-pointer"
                >
                  <option value="超声波流量探头损坏">超声波流量探头损坏</option>
                  <option value="计量主板或传感器故障">计量主板或传感器故障</option>
                  <option value="DTU通信模块断线">DTU通信模块断线</option>
                  <option value="DTU通信模块硬件损坏">DTU通信模块硬件损坏</option>
                  <option value="运营商无线通信网络中断">运营商无线通信网络中断</option>
                  <option value="现场变压器停电检修">现场变压器停电检修</option>
                  <option value="蓄电池馈电停机">蓄电池馈电停机</option>
                  <option value="主板雷击击穿">主板雷击击穿</option>
                  <option value="计量管道结垢或机械卡死">计量管道结垢或机械卡死</option>
                  <option value="其他硬件故障">其他硬件故障</option>
                </select>
              </div>

              <div>
                <label class="block text-slate-600 mb-1 font-medium"><span class="text-red-500 mr-0.5">*</span>上报人</label>
                <input
                  v-model="faultForm.reporter"
                  type="text"
                  class="w-full h-9 px-3 rounded-lg border border-[#dce6f5] focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 text-slate-800 text-xs bg-white outline-none"
                />
              </div>
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-medium"><span class="text-red-500 mr-0.5">*</span>故障情况描述</label>
              <textarea
                v-model="faultForm.faultDesc"
                rows="3"
                placeholder="详细记录现场故障现象、初步排查原因及现场工况..."
                class="w-full p-2.5 rounded-lg border border-[#dce6f5] focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 text-slate-800 text-xs bg-white outline-none"
              ></textarea>
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-medium">现场佐证照片 / 检修单据</label>
              <div class="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center bg-slate-50/70 hover:border-blue-400 cursor-pointer transition">
                <svg class="w-6 h-6 text-slate-400 mx-auto mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <div class="text-[11px] text-slate-500">点击上传现场照片（支持 JPG、PNG 图片）</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部栏 -->
        <div class="px-5 py-2.5 bg-[#f8fafc] border-t border-slate-200/80 flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            @click="faultReportModalVisible = false"
            class="px-4 py-1.5 rounded-md text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            @click="submitFaultReport"
            class="px-4.5 py-1.5 rounded-md text-xs font-medium text-white bg-[#1677ff] hover:bg-blue-600 transition shadow-xs cursor-pointer flex items-center gap-1.5 active:scale-98"
          >
            <span>确认上报</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== 模态框 2：详情查看 (与计量设施管理详情弹窗样式规范 100% 统一) ==================== -->
    <div
      v-if="detailModalVisible && currentSelectedOrder"
      class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none overflow-y-auto"
      @click.self="detailModalVisible = false"
    >
      <div
        class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1360px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
      >
        <!-- 1. 浅色顶部标题栏 (Light Header)：浅灰蓝背景、精致微光与底边分割线，与计量设施管理保持一致 -->
        <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">
                  详情查看
                </h3>
                <span class="px-2 py-0.5 rounded text-[11px] font-medium border bg-blue-50 text-blue-600 border-blue-200">
                  告警工单
                </span>
                <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-200">
                  {{ currentSelectedOrder.orderNo || '202607150600410610' }}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="detailModalVisible = false"
            class="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer p-1.5 rounded-lg -mr-1"
            title="关闭"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 2. 内容滚动区：与计量设施管理基本信息卡片及布局风格保持完全一致 -->
        <div class="p-4 overflow-y-auto flex gap-4 text-xs text-slate-800 custom-scrollbar flex-1 bg-[#f8fafc]/50">
          <!-- 左侧区域：两大卡片信息 (工单处理信息[含工单处置两列展示与故障记录] / 水量修订记录) -->
          <div class="flex-1 min-w-0 space-y-4">
            <!-- 卡片 1：工单处理信息 (包含工单处置两列信息展示与故障记录，合并为一个完整的工单处理信息模块) -->
            <div class="bg-white rounded-lg border border-slate-200/80 p-4 shadow-2xs space-y-3.5">
              <!-- 模块顶栏 -->
              <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                  <span class="text-[14px] font-bold text-slate-800">工单处理信息</span>
                </div>
              </div>

              <!-- 子区块 1：工单处置基础信息 (严格使用两列栅格展示) -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 text-[12.5px]">
                <!-- 1. 工单编号 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">工单编号</span>
                  <span class="text-slate-800 font-mono font-medium">{{ currentSelectedOrder.orderNo || '202607150600410610' }}</span>
                </div>

                <!-- 2. 工单状态 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">工单状态</span>
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-[#1677ff] border border-blue-200">
                    {{ currentSelectedOrder.orderStatus || '工单处理完成' }}
                  </span>
                </div>

                <!-- 3. 超时情况 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">超时情况</span>
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-[#f5222d] border border-rose-200">
                    已超时
                  </span>
                </div>

                <!-- 4. 工单类型 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">工单类型</span>
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-[#fa8c16] border border-amber-200">
                    紧急
                  </span>
                </div>

                <!-- 5. 计量设施名称 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">计量设施名称</span>
                  <span class="text-slate-800 font-medium truncate" :title="currentSelectedOrder.facilityName || '乌当区东郊水厂汪家大井取水口2#管'">
                    {{ currentSelectedOrder.facilityName || '乌当区东郊水厂汪家大井取水口2#管' }}
                  </span>
                </div>

                <!-- 6. 计量设施编码 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">计量设施编码</span>
                  <span class="text-slate-800 font-mono font-medium">{{ currentSelectedOrder.facilityCode || '5201010001002' }}</span>
                </div>

                <!-- 7. 告警类型 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">告警类型</span>
                  <span class="text-slate-800 font-medium">{{ currentSelectedOrder.alarmTypeDesc || '缺报,未上报' }}</span>
                </div>

                <!-- 8. 最新告警时间 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">最新告警时间</span>
                  <span class="text-slate-800 font-mono">2026-07-15 09:21:33</span>
                </div>

                <!-- 9. 运维单位 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">运维单位</span>
                  <span class="text-slate-800 font-medium">{{ currentSelectedOrder.assignUnit || '贵阳市水文水资源局' }}</span>
                </div>

                <!-- 10. 运维人员 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">运维人员</span>
                  <span class="text-slate-800 font-medium">{{ currentSelectedOrder.assignee || '测试单点登录' }}</span>
                </div>

                <!-- 11. 运维人员电话 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">运维人员电话</span>
                  <span class="text-slate-800 font-mono">15681852381</span>
                </div>

                <!-- 12. 产生告警原因 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">产生告警原因</span>
                  <span class="text-slate-800 font-medium">--</span>
                </div>

                <!-- 13. 处理情况 -->
                <div class="flex items-baseline">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">处理情况</span>
                  <span class="text-slate-800 font-medium">已复核</span>
                </div>

                <!-- 14. 告警内容 (跨2列自适应) -->
                <div class="flex items-baseline md:col-span-2">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">告警内容</span>
                  <span class="text-slate-800 font-medium leading-relaxed">{{ currentSelectedOrder.alarmContentDesc || '乌当区东郊水厂数据缺报或连续零流量超期' }}</span>
                </div>

                <!-- 15. 现场及设备照片 (跨2列自适应) -->
                <div class="flex items-center md:col-span-2">
                  <span class="w-28 shrink-0 text-slate-400 font-normal">现场及设备照片</span>
                  <span class="text-slate-400 text-xs italic">暂未上传现场照片</span>
                </div>
              </div>

              <!-- 子区块 2：故障记录 (置于工单处理信息卡片内，与处置信息整合在一起，表格样式同列表一致) -->
              <div class="pt-3.5 border-t border-slate-100 space-y-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[13px] font-bold text-slate-800">故障记录</span>
                  </div>
                  <span class="text-[11px] text-slate-400 font-mono">共 1 条记录</span>
                </div>
                <div class="border border-[#b4c7e0] rounded overflow-x-auto">
                  <table class="w-full text-left border-collapse text-xs border-l border-t border-[#b8cde6]">
                    <thead>
                      <tr class="bg-[#eaf1fb] text-gray-800 font-semibold border-b border-[#a6c1e2]">
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">计量器具编号</th>
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">故障水表底数</th>
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">故障情况说明</th>
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">故障图片</th>
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">上报人</th>
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">故障时间</th>
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">故障解除底数</th>
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">故障解除说明</th>
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">解除证明材料</th>
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">处理人</th>
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">处理时间</th>
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">状态</th>
                        <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">流程</th>
                      </tr>
                    </thead>
                    <tbody class="text-gray-800 bg-white">
                      <tr class="hover:bg-[#f5f8fd] transition-colors">
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] font-mono text-gray-900 whitespace-nowrap">241017001024</td>
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] font-mono text-gray-900 whitespace-nowrap">12343</td>
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] text-gray-600 whitespace-nowrap">--</td>
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                          <button type="button" @click="previewImage()" class="text-[#1677ff] hover:text-blue-800 hover:underline cursor-pointer">查看</button>
                        </td>
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] text-gray-800 whitespace-nowrap">段问薇</td>
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] font-mono text-gray-600 whitespace-nowrap">2025-03-06</td>
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] font-mono text-gray-900 whitespace-nowrap">12343</td>
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] text-gray-600 whitespace-nowrap">--</td>
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                          <button type="button" @click="previewImage()" class="text-[#1677ff] hover:text-blue-800 hover:underline cursor-pointer">查看</button>
                        </td>
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] text-gray-800 whitespace-nowrap">段问薇</td>
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] font-mono text-gray-600 whitespace-nowrap">2025-03-06</td>
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                          <span class="inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-600 border border-amber-200">待审核</span>
                        </td>
                        <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                          <button type="button" @click="MessagePlugin.info('查看故障处置流程进度')" class="text-[#1677ff] hover:text-blue-800 hover:underline cursor-pointer">进度</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- 卡片 3：水量修订记录 (表格样式同列表一致) -->
            <div class="bg-white rounded-lg border border-slate-200/80 p-4 shadow-2xs space-y-2.5">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                  <span class="text-[13px] font-bold text-slate-800">水量修订记录</span>
                </div>
              </div>
              <div class="border border-[#b4c7e0] rounded overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs border-l border-t border-[#b8cde6]">
                  <thead>
                    <tr class="bg-[#eaf1fb] text-gray-800 font-semibold border-b border-[#a6c1e2]">
                      <th rowspan="2" class="py-2 px-3 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] w-16 whitespace-nowrap">序号</th>
                      <th rowspan="2" class="py-2 px-3 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] w-28 whitespace-nowrap">水量时间</th>
                      <th colspan="3" class="py-2 px-3 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">观测流量</th>
                      <th rowspan="2" class="py-2 px-3 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] w-28 whitespace-nowrap">修订人员</th>
                    </tr>
                    <tr class="bg-[#eaf1fb] text-gray-800 font-semibold border-b border-[#a6c1e2]">
                      <th class="py-2 px-3 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] w-28 whitespace-nowrap">原始值</th>
                      <th class="py-2 px-3 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] whitespace-nowrap">告警内容</th>
                      <th class="py-2 px-3 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] w-28 whitespace-nowrap">修订值</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-800 bg-white">
                    <tr class="hover:bg-[#f5f8fd] transition-colors">
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-500">1</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-800">2026-8</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-800">234</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] text-gray-800">日水量数据超许可</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-800">234</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] text-gray-800">刘大大</td>
                    </tr>
                    <tr class="hover:bg-[#f5f8fd] transition-colors">
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-500">2</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-800">2026-7</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-800">234</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] text-gray-400">-</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-800">234</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] text-gray-800">李天泽</td>
                    </tr>
                    <tr class="hover:bg-[#f5f8fd] transition-colors">
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-500">3</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-800">2026-6</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-800">234</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] text-gray-400">-</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-800">234</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] text-gray-800">王笑天</td>
                    </tr>
                    <tr class="hover:bg-[#f5f8fd] transition-colors">
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-500">4</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-800">2026-5</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-800">234</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] text-gray-400">-</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] font-mono text-gray-800">234</td>
                      <td class="py-2 px-3 text-center border-r border-b border-[#b8cde6] text-gray-800">段问薇</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 水量修订记录底部：图例与分页控制 -->
              <div class="flex items-center justify-between mt-3 text-xs">
                <div class="flex items-center gap-4">
                  <span class="text-[#f5222d] font-normal">红色：异常未修订</span>
                  <span class="text-[#1677ff] font-normal">蓝色：自动修订</span>
                  <span class="text-[#52c41a] font-normal">绿色：人工修订</span>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    @click="waterRevisionPage = Math.max(1, waterRevisionPage - 1)"
                    class="px-2.5 py-1 border border-slate-300 rounded bg-white hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                  >
                    上一页
                  </button>
                  <span class="px-2 text-slate-700 font-mono">{{ waterRevisionPage }}/5</span>
                  <button
                    type="button"
                    @click="waterRevisionPage = Math.min(5, waterRevisionPage + 1)"
                    class="px-2.5 py-1 border border-slate-300 rounded bg-white hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                  >
                    下一页
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧卡片：告警处置流程 (美化样式，清晰展示已完成状态与当前节点) -->
          <div class="w-[410px] shrink-0 bg-white rounded-lg border border-slate-200/80 p-4 shadow-2xs flex flex-col space-y-3.5">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">告警处置流程</span>
              </div>
              <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                已推进至第 2 步
              </span>
            </div>

            <!-- 垂直流程时间轴 -->
            <div class="relative flex-1 pt-1 space-y-3.5">
              <!-- 节点 1：转工单 (展示为已完成状态) -->
              <div class="relative flex items-start gap-3">
                <!-- 纵向导轨连线 (绿色完成态) -->
                <div class="absolute top-[26px] bottom-[-14px] left-[11px] w-[2px] bg-emerald-500 z-0"></div>

                <!-- 左列：序号与状态徽标 + 节点标题 -->
                <div class="w-[96px] shrink-0 z-10">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0 ring-3 ring-emerald-100">
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10.5px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-200 whitespace-nowrap">
                      已完成
                    </span>
                  </div>
                  <div class="pl-8 mt-1 text-slate-800 font-semibold text-xs">
                    转工单
                  </div>
                </div>

                <!-- 右列：属性明细卡片 -->
                <div class="flex-1 bg-slate-50/90 rounded-md p-2.5 border border-slate-200/70 text-[11.5px] text-slate-600 space-y-1 shadow-2xs">
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">转工单时间</span>
                    <span class="font-mono text-slate-700">2026-06-26 08:00:00</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">告警时间</span>
                    <span class="font-mono text-slate-700">2026-06-24 05:00:00</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">告警类型</span>
                    <span class="text-slate-700 font-medium">缺报,未上报</span>
                  </div>
                </div>
              </div>

              <!-- 节点 2：工单处置 (展示为已完成状态) -->
              <div class="relative flex items-start gap-3">
                <!-- 纵向导轨连线 (过渡至下一步未进行) -->
                <div class="absolute top-[26px] bottom-[-14px] left-[11px] w-[2px] bg-slate-200 z-0"></div>

                <!-- 左列：序号与状态徽标 + 节点标题 -->
                <div class="w-[96px] shrink-0 z-10">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0 ring-3 ring-emerald-100">
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10.5px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-200 whitespace-nowrap">
                      已完成
                    </span>
                  </div>
                  <div class="pl-8 mt-1 text-slate-800 font-semibold text-xs">
                    工单处置
                  </div>
                </div>

                <!-- 右列：属性明细卡片 -->
                <div class="flex-1 bg-slate-50/90 rounded-md p-2.5 border border-slate-200/70 text-[11.5px] text-slate-600 space-y-1 shadow-2xs">
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">处置时间</span>
                    <span class="font-mono text-slate-700">2026-09-07 08:00:00</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">运维单位</span>
                    <span class="text-slate-700 font-medium">北京金水</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">处置人员</span>
                    <span class="text-slate-700 font-medium">罗杰</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">联系电话</span>
                    <span class="font-mono text-slate-700">18888888888</span>
                  </div>
                </div>
              </div>

              <!-- 节点 3：水量数据修订 (未进行) -->
              <div class="relative flex items-start gap-3">
                <!-- 纵向导轨连线 -->
                <div class="absolute top-[26px] bottom-[-14px] left-[11px] w-[2px] bg-slate-200 z-0"></div>

                <!-- 左列：序号与状态 + 节点标题 -->
                <div class="w-[96px] shrink-0 z-10">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full border border-slate-300 text-slate-400 bg-slate-50 flex items-center justify-center text-xs font-sans shrink-0">3</span>
                    <span class="text-slate-400 text-[11px] whitespace-nowrap">未进行</span>
                  </div>
                  <div class="pl-8 mt-1 text-slate-600 font-medium text-xs">
                    水量数据修订
                  </div>
                </div>

                <!-- 右列：属性明细 -->
                <div class="flex-1 bg-white rounded-md p-2.5 border border-dashed border-slate-200 text-[11.5px] text-slate-500 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">修订时间</span>
                    <span class="font-mono text-slate-600">2026-09-07 08:00:00</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">运维单位</span>
                    <span class="text-slate-600">北京金水</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">处置人员</span>
                    <span class="text-slate-600">罗杰</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">联系电话</span>
                    <span class="font-mono text-slate-600">18888888888</span>
                  </div>
                </div>
              </div>

              <!-- 节点 4：数据修订审核 (未进行) -->
              <div class="relative flex items-start gap-3">
                <!-- 纵向导轨连线 -->
                <div class="absolute top-[26px] bottom-[-14px] left-[11px] w-[2px] bg-slate-200 z-0"></div>

                <!-- 左列：序号与状态 + 节点标题 -->
                <div class="w-[96px] shrink-0 z-10">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full border border-slate-300 text-slate-400 bg-slate-50 flex items-center justify-center text-xs font-sans shrink-0">4</span>
                    <span class="text-slate-400 text-[11px] whitespace-nowrap">未进行</span>
                  </div>
                  <div class="pl-8 mt-1 text-slate-600 font-medium text-xs">
                    数据修订审核
                  </div>
                </div>

                <!-- 右列：属性明细 -->
                <div class="flex-1 bg-white rounded-md p-2.5 border border-dashed border-slate-200 text-[11.5px] text-slate-500 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">审核时间</span>
                    <span class="font-mono text-slate-600">2026-09-07 08:00:00</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">审核单位</span>
                    <span class="text-slate-600">北京金水</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">审核人员</span>
                    <span class="text-slate-600">罗杰</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">联系电话</span>
                    <span class="font-mono text-slate-600">18888888888</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-400">审核意见</span>
                    <span class="text-slate-400">--</span>
                  </div>
                </div>
              </div>

              <!-- 节点 5：告警数据处理完成 (未进行) -->
              <div class="relative flex items-start gap-3">
                <!-- 左列：序号与状态 + 节点标题 -->
                <div class="w-full z-10">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full border border-slate-300 text-slate-400 bg-slate-50 flex items-center justify-center text-xs font-sans shrink-0">5</span>
                    <span class="text-slate-400 text-[11px] whitespace-nowrap">未进行</span>
                  </div>
                  <div class="pl-8 mt-1 text-slate-600 font-medium text-xs">
                    告警数据处理完成
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. 浅色底部操作栏 (Light Footer)：右对齐简洁操作按钮，去除了工单编号 -->
        <div class="px-5 py-2.5 bg-[#f8fafc] border-t border-slate-200/80 flex items-center justify-end shrink-0">
          <div class="flex items-center gap-2.5">
            <button
              type="button"
              @click="detailModalVisible = false"
              class="px-5 py-1.5 rounded-md text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-800 transition cursor-pointer shadow-2xs"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== 模态框 3：告警明细列表 (统一使用计量设施管理弹窗风格) ==================== -->
    <div
      v-if="alarmListModalVisible && currentSelectedOrder"
      class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none overflow-y-auto"
      @click.self="alarmListModalVisible = false"
    >
      <div
        class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[760px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
      >
        <!-- 头部 -->
        <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">
                  关联告警明细列表
                </h3>
                <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-50 text-blue-600 border border-blue-200">
                  共 {{ currentSelectedOrder.alarmCount || 323 }} 条
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="alarmListModalVisible = false"
            class="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer p-1.5 rounded-lg -mr-1"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 内容 -->
        <div class="p-4 overflow-y-auto space-y-3 text-xs text-slate-800 custom-scrollbar flex-1 bg-[#f8fafc]/50">
          <div class="bg-white rounded-lg border border-slate-200/80 p-4 shadow-2xs space-y-3">
            <div class="text-slate-600">
              计量设施：<b class="text-slate-900">{{ currentSelectedOrder.facilityName }}</b>
              （编码: <span class="font-mono">{{ currentSelectedOrder.facilityCode }}</span>）共包含 <span class="text-[#1677ff] font-bold">323</span> 条瞬时告警事件。
            </div>

            <div class="max-h-80 overflow-y-auto custom-scrollbar border border-[#b4c7e0] rounded overflow-hidden">
              <table class="w-full text-left text-xs border-collapse border-l border-t border-[#b8cde6]">
                <thead class="bg-[#eaf1fb] text-gray-800 font-semibold sticky top-0 border-b border-[#a6c1e2]">
                  <tr>
                    <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] w-12 whitespace-nowrap">序号</th>
                    <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] min-w-[130px] whitespace-nowrap">触发时间</th>
                    <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] min-w-[120px] whitespace-nowrap">告警规则</th>
                    <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] min-w-[90px] whitespace-nowrap">实测数值</th>
                    <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] min-w-[90px] whitespace-nowrap">配置阈值</th>
                    <th class="py-2.5 px-2 text-center border-r border-b border-[#b8cde6] bg-[#eaf1fb] min-w-[70px] whitespace-nowrap">状态</th>
                  </tr>
                </thead>
                <tbody class="text-gray-800 bg-white">
                  <tr v-for="i in 8" :key="i" class="hover:bg-[#f5f8fd] transition-colors">
                    <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] text-gray-500 font-mono">{{ i }}</td>
                    <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] font-mono text-gray-600">2026-06-26 08:{{ 30 + i }}:12</td>
                    <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] font-medium text-gray-800">仪表掉线或遥测丢包</td>
                    <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] font-mono text-rose-600">心跳中断</td>
                    <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6] font-mono text-gray-500">> 120min</td>
                    <td class="py-2 px-2 text-center border-r border-b border-[#b8cde6]">
                      <span class="inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-600 border border-amber-200">已并入工单</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 底部 -->
        <div class="px-5 py-2.5 bg-[#f8fafc] border-t border-slate-200/80 flex items-center justify-end shrink-0">
          <button
            type="button"
            @click="alarmListModalVisible = false"
            class="px-4 py-1.5 rounded-md text-xs font-medium text-white bg-[#1677ff] hover:bg-blue-600 transition shadow-xs cursor-pointer"
          >
            关闭
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== 凭证佐证照片大图预览弹窗 (同计量设施管理弹窗完全一致) ==================== -->
    <div
      v-if="previewModalVisible"
      class="fixed inset-0 z-80 flex items-center justify-center bg-black/60 p-4"
      @click.self="previewModalVisible = false"
    >
      <div class="bg-white rounded-xl shadow-2xl max-w-xl w-full p-5 space-y-3 animate-in fade-in zoom-in-95">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
          <div class="font-bold text-sm text-slate-800">{{ previewTitle }}</div>
          <button type="button" @click="previewModalVisible = false" class="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer">
            ✕
          </button>
        </div>
        <div class="rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center min-h-[260px]">
          <img
            :src="previewImgUrl"
            :alt="previewTitle"
            class="max-h-[380px] w-auto object-contain"
            referrerpolicy="no-referrer"
          />
        </div>
        <div class="flex justify-end pt-1">
          <button
            type="button"
            @click="previewModalVisible = false"
            class="px-4 py-1.5 bg-[#1677ff] text-white rounded text-xs hover:bg-blue-600 transition cursor-pointer"
          >
            关闭预览
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== 模态框 5：水量数据修订 (与计量设施管理弹窗样式 100% 保持一致) ==================== -->
    <div
      v-if="waterRevisionModalVisible && waterRevisionOrder"
      class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none overflow-y-auto"
      @click.self="waterRevisionModalVisible = false"
    >
      <div
        class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1240px] h-[720px] max-h-[92vh] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col"
      >
        <!-- 1. 浅色典雅头部 (Light Header)：同计量设施管理弹窗规范完全一致 -->
        <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">
                  水量数据修订
                </h3>
                <span class="px-2 py-0.5 rounded text-[11px] font-medium border bg-purple-50 text-purple-600 border-purple-200">
                  待修订水量
                </span>
                <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-50 text-blue-600 border border-blue-200">
                  {{ waterRevisionOrder.facilityCode }}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="waterRevisionModalVisible = false"
            class="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer p-1.5 rounded-lg -mr-1"
            title="关闭"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 2. 内容滚动区：浅灰蓝底色 (#f8fafc/50) + 卡片化架构 -->
        <div class="p-3.5 overflow-y-auto custom-scrollbar flex-1 flex flex-col gap-3 bg-[#f8fafc]/50 text-xs text-slate-800">
          
          <!-- 2.1 计量设施基本信息卡片 (同设施管理顶栏卡片规范) -->
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700 shrink-0">
            <div class="flex flex-wrap items-center gap-x-8 gap-y-2">
              <div class="flex items-center gap-1.5">
                <span class="text-slate-400">计量设施名称：</span>
                <span class="font-medium text-slate-900">{{ waterRevisionOrder.facilityName }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="text-slate-400">计量设施编码：</span>
                <div class="flex items-center gap-1 text-[#1677ff]">
                  <span class="font-mono font-medium">{{ waterRevisionOrder.facilityCode }}</span>
                  <button
                    type="button"
                    @click="copyCode(waterRevisionOrder.facilityCode)"
                    title="复制编码"
                    class="text-gray-400 hover:text-[#1677ff] p-0.5 cursor-pointer rounded"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="text-slate-400">日水量阈值：</span>
                <span class="font-mono text-slate-800 font-medium">0.00 m³  0.00 立方米</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-slate-400 text-[11px]">关联工单编号：</span>
              <span class="font-mono text-slate-700 font-medium text-[11px]">{{ waterRevisionOrder.orderNo }}</span>
            </div>
          </div>

          <!-- 2.2 左右双卡片工作台 -->
          <div class="grid grid-cols-12 gap-3.5 flex-1 items-start">
            <!-- 左侧卡片：告警信息 (占 4 列，约 32%) -->
            <div class="col-span-4 bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs flex flex-col gap-2.5">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                  <span class="text-[13.5px] font-bold text-slate-800">告警信息</span>
                </div>
                <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-50 text-blue-600 border border-blue-200">
                  共 {{ alarmInfoList.length }} 项
                </span>
              </div>

              <div class="border border-[#b8cde6] rounded overflow-hidden">
                <table class="w-full text-left text-xs border-collapse">
                  <thead class="bg-[#eaf1fb] text-gray-800 font-semibold border-b border-[#a6c1e2]">
                    <tr>
                      <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] w-10"></th>
                      <th class="py-2 px-2 text-center border-r border-b border-[#b8cde6] w-12 whitespace-nowrap">序号</th>
                      <th class="py-2 px-3 text-center border-r border-b border-[#b8cde6] min-w-[90px] whitespace-nowrap">告警类型</th>
                      <th class="py-2 px-3 text-center border-b border-[#b8cde6] min-w-[100px] whitespace-nowrap">告警内容</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-800 bg-white divide-y divide-[#b8cde6]">
                    <tr
                      v-for="alarm in alarmInfoList"
                      :key="alarm.id"
                      @click="selectAlarm(alarm.id)"
                      :class="[
                        'cursor-pointer transition-colors',
                        selectedAlarmId === alarm.id ? 'bg-[#eef4fe]' : 'hover:bg-[#f5f8fd]'
                      ]"
                    >
                      <td class="py-2 px-2 text-center border-r border-[#b8cde6]">
                        <input
                          type="radio"
                          :name="'alarm-item-radio'"
                          :checked="selectedAlarmId === alarm.id"
                          @change="selectAlarm(alarm.id)"
                          class="w-3.5 h-3.5 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                        />
                      </td>
                      <td class="py-2 px-2 text-center font-mono text-gray-600 border-r border-[#b8cde6]">
                        {{ alarm.orderIndex }}
                      </td>
                      <td class="py-2 px-3 text-center text-gray-800 border-r border-[#b8cde6]">
                        {{ alarm.alarmType }}
                      </td>
                      <td class="py-2 px-3 text-center text-gray-600">
                        {{ alarm.alarmContent || '' }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 右侧卡片：异常数据修订 (占 8 列，约 68%) -->
            <div class="col-span-8 bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs flex flex-col gap-2.5">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                  <span class="text-[13.5px] font-bold text-slate-800">异常数据修订</span>
                </div>

                <!-- 右上角批量操作栏：系统修订 + 步进器 + 批量填入 -->
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    @click="applySystemRevision"
                    class="px-3 py-1 bg-[#1677ff] hover:bg-blue-600 text-white rounded text-xs font-medium cursor-pointer shadow-2xs transition active:scale-98"
                  >
                    系统修订
                  </button>

                  <div class="inline-flex items-center justify-center border border-slate-300 rounded overflow-hidden shadow-2xs bg-white">
                    <button
                      type="button"
                      @click="batchInputValue > 0 ? batchInputValue-- : null"
                      class="w-6 h-6 flex items-center justify-center bg-white hover:bg-slate-100 text-slate-600 border-r border-slate-300 text-xs cursor-pointer active:bg-slate-200"
                    >
                      －
                    </button>
                    <input
                      type="number"
                      v-model.number="batchInputValue"
                      class="w-10 h-6 text-center text-xs font-mono outline-none bg-white text-slate-800"
                    />
                    <button
                      type="button"
                      @click="batchInputValue++"
                      class="w-6 h-6 flex items-center justify-center bg-white hover:bg-slate-100 text-slate-600 border-l border-slate-300 text-xs cursor-pointer active:bg-slate-200"
                    >
                      ＋
                    </button>
                  </div>

                  <button
                    type="button"
                    @click="applyBatchFill"
                    class="px-3 py-1 bg-[#1677ff] hover:bg-blue-600 text-white rounded text-xs font-medium cursor-pointer shadow-2xs transition active:scale-98"
                  >
                    批量填入
                  </button>
                </div>
              </div>

              <!-- 多级表头异常数据修订表格 -->
              <div class="border border-[#b8cde6] rounded overflow-hidden">
                <table class="w-full text-left text-xs border-collapse">
                  <thead class="bg-[#eaf1fb] text-gray-800 font-semibold border-b border-[#a6c1e2]">
                    <tr>
                      <th rowspan="2" class="py-2 px-2 text-center border-r border-b border-[#b8cde6] w-12 whitespace-nowrap">序号</th>
                      <th rowspan="2" class="py-2 px-3 text-center border-r border-b border-[#b8cde6] w-28 whitespace-nowrap">数据时间</th>
                      <th colspan="3" class="py-1.5 px-3 text-center border-b border-[#b8cde6]">观测流量</th>
                    </tr>
                    <tr>
                      <th class="py-1.5 px-3 text-center border-r border-b border-[#b8cde6] w-24 whitespace-nowrap">原始值</th>
                      <th class="py-1.5 px-3 text-center border-r border-b border-[#b8cde6] min-w-[140px] whitespace-nowrap">告警内容</th>
                      <th class="py-1.5 px-3 text-center border-b border-[#b8cde6] w-36 whitespace-nowrap">修订值</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-800 bg-white divide-y divide-[#b8cde6]">
                    <tr
                      v-for="row in currentPagedRevisionList"
                      :key="row.id"
                      class="hover:bg-[#f5f8fd] transition-colors"
                    >
                      <td class="py-2 px-2 text-center font-mono text-gray-600 border-r border-[#b8cde6]">
                        {{ row.index }}
                      </td>
                      <td class="py-2 px-3 text-center font-mono text-gray-700 border-r border-[#b8cde6]">
                        {{ row.dataTime }}
                      </td>
                      <td class="py-2 px-3 text-center font-mono font-medium text-gray-800 border-r border-[#b8cde6]">
                        {{ row.originalValue }}
                      </td>
                      <td class="py-2 px-3 text-center text-gray-600 border-r border-[#b8cde6]">
                        {{ row.alarmContent || '' }}
                      </td>
                      <td class="py-1.5 px-3 text-center">
                        <div class="inline-flex items-center justify-center border border-slate-300 rounded overflow-hidden shadow-2xs bg-white">
                          <button
                            type="button"
                            @click="decrementRowValue(row)"
                            class="w-6 h-6 flex items-center justify-center bg-white hover:bg-slate-100 text-slate-600 border-r border-slate-300 text-xs cursor-pointer active:bg-slate-200"
                          >
                            －
                          </button>
                          <input
                            type="number"
                            v-model.number="row.revisedValue"
                            @input="row.status = 'manual'"
                            :class="[
                              'w-12 h-6 text-center text-xs font-mono outline-none bg-white font-medium',
                              row.status === 'unrevised' ? 'text-red-500' :
                              row.status === 'auto' ? 'text-blue-600 font-bold' :
                              'text-emerald-600 font-bold'
                            ]"
                          />
                          <button
                            type="button"
                            @click="incrementRowValue(row)"
                            class="w-6 h-6 flex items-center justify-center bg-white hover:bg-slate-100 text-slate-600 border-l border-slate-300 text-xs cursor-pointer active:bg-slate-200"
                          >
                            ＋
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 底部图例说明与分页栏 -->
              <div class="flex items-center justify-between pt-1 px-1">
                <div class="flex items-center gap-4 text-xs font-medium">
                  <span class="text-red-500">红色：异常未修订</span>
                  <span class="text-blue-600">蓝色：自动修订</span>
                  <span class="text-emerald-600">绿色：人工修订</span>
                </div>

                <div class="flex items-center gap-2 text-xs text-slate-600">
                  <button
                    type="button"
                    @click="revisionPage > 1 ? revisionPage-- : null"
                    :disabled="revisionPage <= 1"
                    class="px-2.5 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer transition shadow-2xs"
                  >
                    上一页
                  </button>
                  <span class="font-mono text-slate-800">
                    <span class="text-[#1677ff] font-bold">{{ revisionPage }}</span> / {{ revisionTotalPages }}
                  </span>
                  <button
                    type="button"
                    @click="revisionPage < revisionTotalPages ? revisionPage++ : null"
                    :disabled="revisionPage >= revisionTotalPages"
                    class="px-2.5 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer transition shadow-2xs"
                  >
                    下一页
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. 浅色底部操作栏 (Light Footer)：同计量设施管理规范 -->
        <div class="px-5 py-2.5 bg-[#f8fafc] border-t border-slate-200/80 flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            @click="waterRevisionModalVisible = false"
            class="px-5 py-1.5 rounded-md text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-800 transition cursor-pointer shadow-2xs"
          >
            取消
          </button>
          <button
            type="button"
            @click="submitWaterRevisionAudit"
            class="px-5 py-1.5 rounded-md text-xs font-medium text-white bg-[#1677ff] hover:bg-blue-600 transition shadow-xs cursor-pointer active:scale-98"
          >
            提交审核
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { initialAlarmOrders, type AlarmWorkOrder, type AlarmOrderStatus, type FaultRecord } from '../../mockAlarmData';

// 表格多选行状态 (与计量设施管理保持一致)
const selectedRowKeys = ref<string[]>([]);

const isAllSelected = computed(() => {
  return (
    paginatedOrders.value.length > 0 &&
    paginatedOrders.value.every((row) => selectedRowKeys.value.includes(row.id))
  );
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedRowKeys.value = [];
  } else {
    selectedRowKeys.value = paginatedOrders.value.map((row) => row.id);
  }
};

const toggleSelectRow = (id: string) => {
  const index = selectedRowKeys.value.indexOf(id);
  if (index >= 0) {
    selectedRowKeys.value.splice(index, 1);
  } else {
    selectedRowKeys.value.push(id);
  }
};

// 复制编码功能 (与计量设施管理保持一致)
const copyCode = (code: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code);
    MessagePlugin.success(`编码 ${code} 已复制到剪贴板`);
  } else {
    MessagePlugin.info(`编码: ${code}`);
  }
};

// 行政区划树展开与选中
const selectedDistrictNode = ref<string>('全部');
const treeSearchKey = ref<string>('');

// 行政区划数据 (与青海省及截图保持一致：西宁市 -> 城东区、城中区、城西区、城北区、湟中区、大通县、湟源县)
interface CityTreeNode {
  name: string;
  expanded: boolean;
  children: string[];
}

const districtTreeData = ref<CityTreeNode[]>([
  {
    name: '西宁市',
    expanded: true, // 截图默认展开
    children: [
      '城东区',
      '城中区',
      '城西区',
      '城北区',
      '湟中区',
      '大通县',
      '湟源县',
    ],
  },
  {
    name: '海南藏族自治州',
    expanded: true, // 包含兴海县
    children: [
      '兴海县',
      '共和县',
      '贵德县',
      '同德县',
      '贵南县',
    ],
  },
  {
    name: '海东市',
    expanded: false,
    children: ['乐都区', '平安区', '民和县', '互助县', '化隆县', '循化县'],
  },
  {
    name: '海北藏族自治州',
    expanded: false,
    children: ['门源县', '祁连县', '海晏县', '刚察县'],
  },
  {
    name: '黄南藏族自治州',
    expanded: false,
    children: ['同仁市', '尖扎县', '泽库县', '河南县'],
  },
  {
    name: '果洛藏族自治州',
    expanded: false,
    children: ['玛沁县', '班玛县', '甘德县', '达日县', '久治县', '玛多县'],
  },
  {
    name: '玉树藏族自治州',
    expanded: false,
    children: ['玉树市', '杂多县', '称多县', '治多县', '囊谦县', '曲麻莱县'],
  },
  {
    name: '海西蒙古族藏族自治州',
    expanded: false,
    children: ['德令哈市', '格尔木市', '茫崖市', '乌兰县', '都兰县', '天峻县'],
  },
]);

// 过滤行政区划树
const filteredDistrictTree = computed(() => {
  if (!treeSearchKey.value.trim()) return districtTreeData.value;
  const kw = treeSearchKey.value.trim().toLowerCase();
  return districtTreeData.value
    .map((city) => {
      const matchCity = city.name.toLowerCase().includes(kw);
      const matchedChildren = city.children.filter((c) => c.toLowerCase().includes(kw));
      if (matchCity || matchedChildren.length > 0) {
        return {
          ...city,
          expanded: true,
          children: matchCity ? city.children : matchedChildren,
        };
      }
      return null;
    })
    .filter(Boolean) as CityTreeNode[];
});

const toggleCity = (city: CityTreeNode) => {
  city.expanded = !city.expanded;
  selectedDistrictNode.value = city.name;
};

const selectDistrictNode = (nodeName: string) => {
  selectedDistrictNode.value = nodeName;
};

// 筛选表单 (严格对应截图输入项)
const filters = reactive({
  orderNo: '',
  facilityName: '',
  facilityCode: '',
  monitorLevel: '',
  specialCase: '',
  orderStatus: '',
  alarmBadge: '',
  timeoutStatus: '',
  startDate: '',
  endDate: '',
  includeSubordinates: true,
});

// 数据集
const orders = ref<AlarmWorkOrder[]>([...initialAlarmOrders]);

// 综合过滤计算属性
const filteredOrders = computed(() => {
  return orders.value.filter((item) => {
    // 行政区划联动
    if (selectedDistrictNode.value !== '全部') {
      const target = selectedDistrictNode.value;
      const matchDistrict = item.district.includes(target) || item.facilityName.includes(target);
      if (!matchDistrict) return false;
    }

    // 单号
    if (filters.orderNo.trim() && !item.orderNo.toLowerCase().includes(filters.orderNo.trim().toLowerCase())) {
      return false;
    }

    // 计量设施名称
    if (filters.facilityName.trim() && !item.facilityName.toLowerCase().includes(filters.facilityName.trim().toLowerCase())) {
      return false;
    }

    // 计量设施编码
    if (filters.facilityCode.trim() && !item.facilityCode.toLowerCase().includes(filters.facilityCode.trim().toLowerCase())) {
      return false;
    }

    // 监控级别
    if (filters.monitorLevel && item.monitorLevel !== filters.monitorLevel) {
      return false;
    }

    // 特殊情形备案
    if (filters.specialCase && item.specialCase !== filters.specialCase) {
      return false;
    }

    // 工单状态
    if (filters.orderStatus && item.orderStatus !== filters.orderStatus) {
      return false;
    }

    // 告警标识
    if (filters.alarmBadge && item.alarmBadge !== filters.alarmBadge) {
      return false;
    }

    // 超时情况
    if (filters.timeoutStatus && item.timeoutStatus !== filters.timeoutStatus) {
      return false;
    }

    return true;
  });
});

// 分页控制
const currentPage = ref(1);
const pageSize = ref(20);

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredOrders.value.slice(start, start + pageSize.value);
});

// 按钮操作
const handleSearch = () => {
  currentPage.value = 1;
  MessagePlugin.success(`查询成功，共检索到 ${filteredOrders.value.length} 条工单`);
};

const handleReset = () => {
  filters.orderNo = '';
  filters.facilityName = '';
  filters.facilityCode = '';
  filters.monitorLevel = '';
  filters.specialCase = '';
  filters.orderStatus = '';
  filters.alarmBadge = '';
  filters.timeoutStatus = '';
  filters.startDate = '';
  filters.endDate = '';
  filters.includeSubordinates = true;
  selectedDistrictNode.value = '全部';
  currentPage.value = 1;
  MessagePlugin.info('搜索条件已重置');
};

const handleExport = () => {
  MessagePlugin.success('已启动告警工单台账导出任务，正在生成 Excel 报表...');
};

// 模态框控制
const handleModalVisible = ref(false);
const detailModalVisible = ref(false);
const alarmListModalVisible = ref(false);
const waterRevisionPage = ref(2);

const currentSelectedOrder = ref<AlarmWorkOrder | null>(null);

// 告警处理表单 (支持 10 类产生告警原因的差异化填报)
const handleForm = reactive({
  alarmReason: '计量设施故障',
  remarks: '',
  handlingDesc: '',
  proofImages: [] as string[],
});

// 6~10 类原因参考说明模版字典
const reasonTemplates: Record<string, string> = {
  '产能减少、阶段性取水': '经现场核实，该用水户受季节性生产调控影响，近期取水量明显下降，水量数据正常波动，已核实现场生产排班表与实际用水负荷一致。',
  '产能增大、用水量增加': '经现场核验，水户新增生产线投入生产，实际用水负荷增加，瞬时流量与日累计水量符合扩产实际情况，数据真实有效。',
  '计量设备安装不当': '现场排查发现上游直管段长度不足导致水流扰动偏差，已协调施工单位重新调整管道直管段距离并校准流量计水平度。',
  '管道未安装止回阀': '现场核实排查发现管道停泵时存在回流倒吸现象导致反向读数告警，已于现场加装单向止回阀，目前运行正常。',
  '其他': '现场已完成全面工况排查，告警属于临时性调试波动，表具计量与网络通讯已恢复正常运行。',
};

// 6~10 类预置佐证照片示例
const defaultProofImages: Record<string, string[]> = {
  '产能减少、阶段性取水': [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&auto=format&fit=crop',
  ],
  '产能增大、用水量增加': [
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=300&auto=format&fit=crop',
  ],
  '计量设备安装不当': [
    'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=300&auto=format&fit=crop',
  ],
  '管道未安装止回阀': [
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=300&auto=format&fit=crop',
  ],
  '其他': [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop',
  ],
};

// 填入预设参考说明
const insertTemplateDesc = () => {
  const reason = handleForm.alarmReason;
  if (reasonTemplates[reason]) {
    handleForm.handlingDesc = reasonTemplates[reason];
    MessagePlugin.success('已填入预设参考说明');
  }
};

// 切换告警原因时的自动联动
const onAlarmReasonChange = () => {
  const reason = handleForm.alarmReason;
  if (reasonTemplates[reason]) {
    handleForm.handlingDesc = reasonTemplates[reason];
  }
  if (defaultProofImages[reason]) {
    handleForm.proofImages = [...defaultProofImages[reason]];
  }
};

// 证明照片管理
const triggerUploadProofImage = () => {
  const mockImages = [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=400&auto=format&fit=crop',
  ];
  const nextImg = mockImages[handleForm.proofImages.length % mockImages.length];
  handleForm.proofImages.push(nextImg);
  MessagePlugin.success(`证明图片上传成功（当前共 ${handleForm.proofImages.length} 张）`);
};

const removeProofImage = (idx: number) => {
  handleForm.proofImages.splice(idx, 1);
  MessagePlugin.info('已移除该证明照片');
};

const previewProofImage = (imgUrl: string) => {
  previewTitle.value = '现场佐证证明图片查验';
  previewImgUrl.value = imgUrl;
  previewModalVisible.value = true;
};

// 停用申请记录数据结构与状态
interface DecommissionRecord {
  id: string;
  applyNo: string;
  facilityName: string;
  stopType: string;
  startDate: string;
  expectedEndDate: string;
  applicant: string;
  applyTime: string;
  status: string;
  reasonDesc: string;
  proofImage?: string;
}

const decommissionRecords = ref<DecommissionRecord[]>([]);
const decommissionModalVisible = ref(false);
const decommissionForm = reactive({
  stopType: '季节性停工/停产',
  startDate: '2026-06-26',
  expectedEndDate: '2026-09-30',
  applicant: '马建国',
  reasonDesc: '',
  proofImage: '',
});

const openDecommissionModal = () => {
  if (!currentSelectedOrder.value) return;
  decommissionForm.applicant = currentSelectedOrder.value.assignee || '马建国';
  decommissionForm.startDate = '2026-06-26';
  decommissionForm.expectedEndDate = '2026-09-30';
  decommissionForm.stopType = '季节性停工/停产';
  decommissionForm.reasonDesc = '水户受生产淡季与例行设备停工检修影响，已停止取水作业，已报请县水利局审批并完成闸门铅封。';
  decommissionForm.proofImage = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop';
  decommissionModalVisible.value = true;
};

const mockUploadDecommissionProof = () => {
  decommissionForm.proofImage = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop';
  MessagePlugin.success('停产证明材料上传成功');
};

const submitDecommissionApplication = () => {
  if (!currentSelectedOrder.value) return;
  if (!decommissionForm.reasonDesc.trim()) {
    MessagePlugin.warning('请填写停产停用原因详细说明');
    return;
  }
  const orderNoPrefix = currentSelectedOrder.value.orderNo ? currentSelectedOrder.value.orderNo.substring(0, 8) : '20260626';
  const newDec: DecommissionRecord = {
    id: 'dec-' + Date.now(),
    applyNo: 'TY' + orderNoPrefix + String(Math.floor(10 + Math.random() * 90)),
    facilityName: currentSelectedOrder.value.facilityName,
    stopType: decommissionForm.stopType,
    startDate: decommissionForm.startDate,
    expectedEndDate: decommissionForm.expectedEndDate,
    applicant: decommissionForm.applicant || '马建国',
    applyTime: '2026-06-26 10:15',
    status: '审核中',
    reasonDesc: decommissionForm.reasonDesc,
    proofImage: decommissionForm.proofImage,
  };
  decommissionRecords.value.unshift(newDec);
  decommissionModalVisible.value = false;
  MessagePlugin.success('停用申请提交成功！已生成停用备案并与工单绑定');
};

const viewDecommissionDetail = (dec: DecommissionRecord) => {
  MessagePlugin.info(`停用申请 [${dec.applyNo}]：${dec.stopType}，${dec.reasonDesc}`);
};

// 当前处理工单绑定的故障记录列表
const currentFaultRecords = ref<FaultRecord[]>([]);

// 上报故障子弹窗
const faultReportModalVisible = ref(false);
const faultForm = reactive({
  faultType: '超声波流量探头损坏',
  reporter: '马建国',
  faultDesc: '',
  faultImage: '',
});

// 打开“上报故障”弹窗 (智能联动所选故障原因)
const openFaultReportModal = () => {
  if (!currentSelectedOrder.value) return;
  faultForm.reporter = currentSelectedOrder.value.assignee || '马建国';
  const reason = handleForm.alarmReason;
  if (reason === '传输设备故障') {
    faultForm.faultType = 'DTU通信模块硬件损坏';
    faultForm.faultDesc = '现场排查DTU传输模块电源指示灯异常，通信模组无响应，需返厂或更换新模组。';
  } else if (reason === '传输网络中断') {
    faultForm.faultType = '运营商无线通信网络中断';
    faultForm.faultDesc = '现场周边基站检修维护导致无线网络信号微弱掉线，已报请运营商协调恢复。';
  } else if (reason === '供电故障或停电检修') {
    faultForm.faultType = '现场变压器停电检修';
    faultForm.faultDesc = '取水口供电变压器停电检修，备用太阳能与蓄电池电量耗尽，已通知电工恢复供电。';
  } else {
    faultForm.faultType = '超声波流量探头损坏';
    faultForm.faultDesc = '现场流量计供电正常但无脉冲信号输出，疑似传感器探头损坏或受潮。';
  }
  faultReportModalVisible.value = true;
};

// 提交故障上报
const submitFaultReport = () => {
  if (!currentSelectedOrder.value) return;
  if (!faultForm.faultDesc.trim()) {
    MessagePlugin.warning('请填写故障情况描述');
    return;
  }
  const newRecord: FaultRecord = {
    id: 'flt-' + Date.now(),
    facilityName: currentSelectedOrder.value.facilityName,
    faultType: faultForm.faultType,
    faultDesc: faultForm.faultDesc,
    faultImage: faultForm.faultImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=120&auto=format&fit=crop',
    reporter: faultForm.reporter || '马建国',
    faultTime: '2026-06-26 09:30',
    status: '处理中',
    processStep: '工单已派发至运维检修组，等待现场人员更换排查',
  };
  currentFaultRecords.value.unshift(newRecord);
  faultReportModalVisible.value = false;
  MessagePlugin.success('故障上报成功！已与当前告警工单自动绑定');
};

// 查看故障流程
const viewProcess = (rec: FaultRecord) => {
  MessagePlugin.info(`故障记录 [${rec.faultType}]：${rec.processStep || '工单已下派检修组现场排查修复中'}`);
};

// 查验现场照片
const previewImage = (_imgUrl?: string) => {
  previewTitle.value = '现场佐证照片查验';
  previewImgUrl.value = _imgUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop';
  previewModalVisible.value = true;
};

// 大图预览控制
const previewModalVisible = ref(false);
const previewTitle = ref('凭证佐证查验');
const previewImgUrl = ref('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop');

// 点击“工单处理”
const handleWorkOrder = (order: AlarmWorkOrder) => {
  currentSelectedOrder.value = order;
  handleForm.alarmReason = '计量设施故障';
  handleForm.remarks = '';
  handleForm.handlingDesc = '';
  handleForm.proofImages = [];
  // 如果该工单已存在故障记录，载入；否则赋空数组
  currentFaultRecords.value = order.faultRecords && order.faultRecords.length > 0 ? [...order.faultRecords] : [];
  
  // 停用申请初始化：若当前工单已有停用记录则载入，否则置空（无记录时仅显示提交按钮）
  decommissionRecords.value = (order as any).decommissionRecords && (order as any).decommissionRecords.length > 0
    ? [...(order as any).decommissionRecords]
    : [];

  handleModalVisible.value = true;
};

// 提交工单处理 (按 10 类产生告警原因的严格业务要求执行)
const submitWorkOrderResolution = () => {
  if (!currentSelectedOrder.value) return;
  const reason = handleForm.alarmReason;

  // 1. 用户水户停产未报 -> 必须提交停用申请
  if (reason === '用户水户停产未报' && decommissionRecords.value.length === 0) {
    MessagePlugin.warning('“用户水户停产未报”需提交停用申请，请点击「提交停用申请」完善报备！');
    return;
  }

  // 2~5. 故障类 -> 必须提交故障上报
  if (['计量设施故障', '传输设备故障', '传输网络中断', '供电故障或停电检修'].includes(reason) && currentFaultRecords.value.length === 0) {
    MessagePlugin.warning(`“${reason}”需要提交故障上报处理记录，请点击「提交故障上报」进行登记！`);
    return;
  }

  // 6~9. 填写原因（处理情况 + 证明图片）
  if (['产能减少、阶段性取水', '产能增大、用水量增加', '计量设备安装不当', '管道未安装止回阀'].includes(reason)) {
    if (!handleForm.handlingDesc.trim()) {
      MessagePlugin.warning(`“${reason}”需如实填写现场核查的处理情况！`);
      return;
    }
    if (handleForm.proofImages.length === 0) {
      MessagePlugin.warning(`“${reason}”需上传至少一张现场证明图片！`);
      return;
    }
  }

  // 10. 其他 -> 填写原因
  if (reason === '其他' && !handleForm.handlingDesc.trim()) {
    MessagePlugin.warning('“其他”原因需填写原因及处置情况说明！');
    return;
  }

  const targetId = currentSelectedOrder.value.id;
  const idx = orders.value.findIndex((o) => o.id === targetId);
  if (idx !== -1) {
    orders.value[idx].orderStatus = '工单处理中';
    orders.value[idx].faultRecords = [...currentFaultRecords.value];
    (orders.value[idx] as any).decommissionRecords = [...decommissionRecords.value];
    orders.value[idx].feedback = `已登记产生告警原因：${handleForm.alarmReason}；${handleForm.handlingDesc ? '处置说明：' + handleForm.handlingDesc : '已自动关联现场报备及处置记录。'}`;
    orders.value[idx].recoverTime = '2026-06-26 12:00';
  }
  handleModalVisible.value = false;
  MessagePlugin.success(`工单 ${currentSelectedOrder.value.orderNo} 处置成功！状态流转为【工单处理中】。`);
};

// 点击“详情”
const viewDetail = (order: AlarmWorkOrder) => {
  currentSelectedOrder.value = order;
  detailModalVisible.value = true;
};

// 点击“告警数量”
const viewAlarmList = (order: AlarmWorkOrder) => {
  currentSelectedOrder.value = order;
  alarmListModalVisible.value = true;
};

// ==================== 水量数据修订相关状态与方法 (严格对应用户截图) ====================
const waterRevisionModalVisible = ref(false);
const waterRevisionOrder = ref<AlarmWorkOrder | null>(null);

interface AlarmInfoItem {
  id: number;
  orderIndex: number;
  alarmType: string;
  alarmContent: string;
}

const alarmInfoList = ref<AlarmInfoItem[]>([
  { id: 1, orderIndex: 1, alarmType: '未上报', alarmContent: '连续多日未上报' },
  { id: 2, orderIndex: 2, alarmType: '日水量超阈值', alarmContent: '' },
  { id: 3, orderIndex: 3, alarmType: '日水量为0', alarmContent: '' },
  { id: 4, orderIndex: 4, alarmType: '当月累计达到10天及以上未上传水量数据', alarmContent: '' },
  { id: 5, orderIndex: 5, alarmType: '连续20天累计水量为0', alarmContent: '' },
  { id: 7, orderIndex: 7, alarmType: '连续15天为同一数', alarmContent: '' },
]);

const selectedAlarmId = ref<number>(1);

interface RevisionRowItem {
  id: string;
  alarmId: number;
  index: number;
  dataTime: string;
  originalValue: number;
  alarmContent: string;
  revisedValue: number;
  status: 'unrevised' | 'auto' | 'manual';
}

const batchInputValue = ref<number>(0);
const revisionPage = ref<number>(2); // 截图默认展示第 2 页 (2/5)
const revisionTotalPages = ref<number>(5);

// 异常数据修订全量列表
const allRevisionData = ref<RevisionRowItem[]>([]);

// 初始化生成 5 页 (共 50 条) 异常测报记录
const initRevisionData = (order: AlarmWorkOrder) => {
  const list: RevisionRowItem[] = [];
  // 按照截图真实数据时间：2026-8-18 至 2026-8-9 等
  const sampleDates = [
    '2026-8-18', '2026-8-17', '2026-8-16', '2026-8-15', '2026-8-14',
    '2026-8-13', '2026-8-12', '2026-8-11', '2026-8-10', '2026-8-9',
  ];

  for (let p = 1; p <= 5; p++) {
    for (let i = 0; i < 10; i++) {
      const idx = (p - 1) * 10 + (i + 1);
      const dateStr = p === 2 ? sampleDates[i] : `2026-8-${Math.max(1, 31 - idx)}`;
      list.push({
        id: `rev-${idx}`,
        alarmId: 1,
        index: p === 2 && i === 9 ? 19 : (i + 1), // 对应截图中第2页第10行标号为19
        dataTime: dateStr,
        originalValue: 234,
        alarmContent: (p === 2 && i === 0) || (p === 1 && i === 0) ? '日水量数据超许可' : '',
        revisedValue: 0,
        status: 'unrevised',
      });
    }
  }
  allRevisionData.value = list;
};

// 当前页表格数据切片 (每页10条)
const currentPagedRevisionList = computed(() => {
  const start = (revisionPage.value - 1) * 10;
  return allRevisionData.value.slice(start, start + 10);
});

// 切换告警项
const selectAlarm = (id: number) => {
  selectedAlarmId.value = id;
  const target = alarmInfoList.value.find((a) => a.id === id);
  if (target) {
    MessagePlugin.info(`已切换至告警项【${target.alarmType}】的异常测报数据`);
  }
};

// 打开水量数据修订模态框
const openWaterRevisionModal = (order: AlarmWorkOrder) => {
  waterRevisionOrder.value = order;
  batchInputValue.value = 0;
  revisionPage.value = 2; // 按照截图展示 2/5
  selectedAlarmId.value = 1;
  initRevisionData(order);
  waterRevisionModalVisible.value = true;
};

// 步进控制：单个减少
const decrementRowValue = (row: RevisionRowItem) => {
  if (row.revisedValue > 0) {
    row.revisedValue--;
    row.status = 'manual';
  }
};

// 步进控制：单个增加
const incrementRowValue = (row: RevisionRowItem) => {
  row.revisedValue++;
  row.status = 'manual';
};

// 系统修订按钮：自动通过系统插值推算并标记为蓝色
const applySystemRevision = () => {
  currentPagedRevisionList.value.forEach((row) => {
    row.revisedValue = 185; // 系统推荐计算值
    row.status = 'auto';
  });
  MessagePlugin.success('已应用系统智能补测模型完成自动修订（蓝色标记）！');
};

// 批量填入按钮：应用上方步进器的数值并标记为绿色
const applyBatchFill = () => {
  const val = batchInputValue.value;
  currentPagedRevisionList.value.forEach((row) => {
    row.revisedValue = val;
    row.status = 'manual';
  });
  MessagePlugin.success(`已将修订值 ${val} 批量填入当前观测流量记录（绿色标记）！`);
};

// 提交审核
const submitWaterRevisionAudit = () => {
  if (!waterRevisionOrder.value) return;
  const targetId = waterRevisionOrder.value.id;
  const idx = orders.value.findIndex((o) => o.id === targetId);
  if (idx !== -1) {
    orders.value[idx].orderStatus = '待审核';
    orders.value[idx].feedback = '异常水量数据已完成人工核实与修订，已提交上级水行政主管单位审核。';
  }
  waterRevisionModalVisible.value = false;
  MessagePlugin.success(`工单 ${waterRevisionOrder.value.orderNo} 水量数据修订成功！工单状态已流转为【待审核】。`);
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
