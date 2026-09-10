<template>
  <div class="flex-1 flex min-h-0 overflow-hidden p-3 gap-3 bg-[#edf3fb] select-none text-xs">
    <!-- ==================== 左侧：行政区划搜索树 (同计量设施管理一致位于左侧) ==================== -->
    <div class="w-56 shrink-0 h-full flex flex-col">
      <WaterDistrictTree
        :selected-district="selectedDistrict"
        @select-district="handleDistrictSelect"
      />
    </div>

    <!-- ==================== 右侧主体：检索栏 + 告警明细列表 + 分页 (样式完全同计量设施管理一致) ==================== -->
    <div class="flex-1 flex flex-col min-w-0 min-h-0 gap-3 overflow-hidden">
      <!-- 1. 顶部搜索栏 (严格按照计量设施管理样式复刻) -->
      <div class="bg-white rounded-lg p-3 border border-[#b4c7e0] shadow-2xs text-xs select-none space-y-3 shrink-0">
        <div class="flex flex-wrap items-center gap-2.5">
          <!-- 1.1 设施名称 -->
          <div class="relative w-[180px] shrink-0">
            <input
              v-model="filterParams.facilityName"
              type="text"
              placeholder="请输入设施名称"
              class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
              @keydown.enter="handleSearch"
            />
            <button
              v-if="filterParams.facilityName"
              type="button"
              @click="filterParams.facilityName = ''; handleSearch()"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
              title="清空"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- 1.2 设施编码 -->
          <div class="relative w-[180px] shrink-0">
            <input
              v-model="filterParams.facilityCode"
              type="text"
              placeholder="请输入计量设施编码"
              class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
              @keydown.enter="handleSearch"
            />
            <button
              v-if="filterParams.facilityCode"
              type="button"
              @click="filterParams.facilityCode = ''; handleSearch()"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
              title="清空"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- 1.3 告警类型 -->
          <div class="relative w-[150px] shrink-0">
            <select
              v-model="filterParams.alarmType"
              class="w-full px-2.5 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] text-gray-700 cursor-pointer"
              @change="handleSearch"
            >
              <option value="">全部告警类型</option>
              <option value="未上报">未上报</option>
              <option value="日水量超阈值">日水量超阈值</option>
              <option value="缺报">缺报</option>
              <option value="连续零流量">连续零流量</option>
              <option value="流量突增">流量突增</option>
              <option value="传感器异常">传感器异常</option>
            </select>
          </div>

          <!-- 1.4 告警状态 -->
          <div class="relative w-[130px] shrink-0">
            <select
              v-model="filterParams.alarmStatus"
              class="w-full px-2.5 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] text-gray-700 cursor-pointer"
              @change="handleSearch"
            >
              <option value="">全部告警状态</option>
              <option value="未处理">未处理</option>
              <option value="已处理">已处理</option>
            </select>
          </div>

          <!-- 1.5 告警标识 -->
          <div class="relative w-[140px] shrink-0">
            <select
              v-model="filterParams.alarmBadge"
              class="w-full px-2.5 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] text-gray-700 cursor-pointer"
              @change="handleSearch"
            >
              <option value="">全部告警标识</option>
              <option value="红色告警异常">红色告警异常</option>
              <option value="黄色告警">黄色告警</option>
              <option value="蓝色告警">蓝色告警</option>
              <option value="普通告警">普通告警</option>
            </select>
          </div>

          <!-- 1.6 数据来源类型 (中央发展资金、自计量/金额、国控水资源、省级发展资金) -->
          <div class="relative w-[160px] shrink-0">
            <select
              v-model="filterParams.sourceType"
              class="w-full px-2.5 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] text-gray-700 cursor-pointer"
              @change="handleSearch"
            >
              <option value="">全部数据来源类型</option>
              <option value="中央发展资金">中央发展资金</option>
              <option value="自计量">自计量/金额</option>
              <option value="国控水资源">国控水资源</option>
              <option value="省级发展资金">省级发展资金</option>
            </select>
          </div>

          <!-- 1.7 是否规模上 -->
          <div class="relative w-[130px] shrink-0">
            <select
              v-model="filterParams.isAboveScale"
              class="w-full px-2.5 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] text-gray-700 cursor-pointer"
              @change="handleSearch"
            >
              <option value="">是否规模上: 全部</option>
              <option value="是">规模上: 是</option>
              <option value="否">规模上: 否</option>
            </select>
          </div>

          <!-- 1.8 是否违规问题排查底数 -->
          <div class="relative w-[170px] shrink-0">
            <select
              v-model="filterParams.isViolationBasis"
              class="w-full px-2.5 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] text-gray-700 cursor-pointer"
              @change="handleSearch"
            >
              <option value="">是否违规排查底数: 全部</option>
              <option value="是">排查底数: 是</option>
              <option value="否">排查底数: 否</option>
            </select>
          </div>

          <!-- 查询 / 重置 / 导出 按钮组 (对齐计量设施管理) -->
          <div class="flex items-center gap-2 ml-auto shrink-0">
            <button
              type="button"
              @click="handleSearch"
              class="px-4 py-1.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded text-xs cursor-pointer font-medium flex items-center gap-1.5 shadow-2xs transition active:scale-98"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>查询</span>
            </button>
            <button
              type="button"
              @click="handleReset"
              class="px-4 py-1.5 bg-white border border-[#b8cde6] hover:bg-gray-50 text-gray-700 rounded text-xs cursor-pointer font-medium flex items-center gap-1.5 transition active:scale-98"
            >
              <svg class="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
              <span>重置</span>
            </button>
            <button
              type="button"
              @click="handleExport"
              class="px-3.5 py-1.5 bg-white border border-[#b8cde6] hover:bg-gray-50 text-gray-700 rounded text-xs cursor-pointer font-medium flex items-center gap-1.5 transition active:scale-98"
              title="导出告警明细表格数据"
            >
              <svg class="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>导出</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 2. 列表区域 (同计量设施管理完全一致的表格容器、表头 #eaf1fb、边框与交互) -->
      <div class="bg-white rounded-lg border border-[#b4c7e0] shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden select-none">
        <div class="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar min-h-[460px]">
          <table class="w-full text-left border-collapse text-xs border-l border-t border-[#b8cde6]">
            <!-- Header: 柔和灰蓝底 (#eaf1fb) 与深灰标题字，加深边框清晰分列 (第一行吸顶固定) -->
            <thead class="sticky top-0 z-20">
              <tr class="bg-[#eaf1fb] text-gray-800 font-semibold border-b border-[#a6c1e2]">
                <!-- 1. 序号与选项框合并为一列 (固定在第一行和最左侧) -->
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
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[110px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  告警标识
                </th>

                <!-- 3. 计量设施名称 -->
                <th class="py-3 px-2.5 whitespace-nowrap min-w-[170px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  计量设施名称
                </th>

                <!-- 4. 计量设施编码 -->
                <th class="py-3 px-2.5 whitespace-nowrap min-w-[130px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  计量设施编码
                </th>

                <!-- 5. 传输方式 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[80px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  传输方式
                </th>

                <!-- 6. 数据来源类型 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[110px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  数据来源类型
                </th>

                <!-- 7. 告警事件 -->
                <th class="py-3 px-2.5 whitespace-nowrap min-w-[160px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  告警事件
                </th>

                <!-- 8. 数据采集开始事件 -->
                <th class="py-3 px-2.5 whitespace-nowrap min-w-[145px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  数据采集开始事件
                </th>

                <!-- 9. 告警类型 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[105px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  告警类型
                </th>

                <!-- 10. 告警内容 -->
                <th class="py-3 px-2.5 whitespace-nowrap min-w-[220px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  告警内容
                </th>

                <!-- 11. 告警状态 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[85px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  告警状态
                </th>

                <!-- 12. 是否规模上 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[85px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  是否规模上
                </th>

                <!-- 13. 是否违规问题排查底数 -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[140px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
                  是否违规问题排查底数
                </th>

                <!-- 14. 操作 (固定在第一行和最右侧) -->
                <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[80px] border-r border-b border-[#b8cde6] sticky top-0 right-0 z-30 bg-[#eaf1fb] shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.08)]">
                  操作
                </th>
              </tr>
            </thead>

            <!-- Table Body: 行高加高 (py-3.5) 且自带浅淡细边框与柔和悬浮态 -->
            <tbody class="text-gray-800 bg-white">
              <tr
                v-for="(item, idx) in paginatedList"
                :key="item.id"
                :class="[
                  'group transition-colors',
                  selectedIds.includes(item.id) ? 'bg-[#eef4fe]' : 'hover:bg-[#f5f8fd]'
                ]"
              >
                <!-- 1. 序号/选择框 (左侧吸附) -->
                <td class="py-3.5 px-2 text-center border-r border-b border-[#b8cde6] sticky left-0 z-10 bg-white group-hover:bg-[#f5f8fd] shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]">
                  <div class="flex items-center justify-center gap-1.5">
                    <input
                      type="checkbox"
                      :checked="selectedIds.includes(item.id)"
                      @change="toggleSelect(item.id)"
                      class="rounded border-gray-400 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                    />
                    <span class="font-mono text-gray-500">{{ (currentPage - 1) * pageSize + idx + 1 }}</span>
                  </div>
                </td>

                <!-- 2. 告警标识 (精细胶囊与微光指示点：红色告警异常、黄色告警、蓝色告警、普通告警) -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-2xs border transition-all',
                      item.alarmBadge === '红色告警异常' ? 'bg-red-50 text-red-700 border-red-200/90 shadow-red-100/50' :
                      item.alarmBadge === '黄色告警' ? 'bg-amber-50 text-amber-700 border-amber-200/90 shadow-amber-100/50' :
                      item.alarmBadge === '蓝色告警' ? 'bg-sky-50 text-sky-700 border-sky-200/90 shadow-sky-100/50' :
                      'bg-slate-50 text-slate-700 border-slate-200/90'
                    ]"
                  >
                    <span class="relative flex h-2 w-2 items-center justify-center shrink-0">
                      <span
                        v-if="item.alarmBadge === '红色告警异常'"
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                      ></span>
                      <span
                        :class="[
                          'relative inline-flex rounded-full h-1.5 w-1.5',
                          item.alarmBadge === '红色告警异常' ? 'bg-red-600' :
                          item.alarmBadge === '黄色告警' ? 'bg-amber-500' :
                          item.alarmBadge === '蓝色告警' ? 'bg-sky-500' :
                          'bg-slate-400'
                        ]"
                      ></span>
                    </span>
                    <span class="tracking-wide">{{ item.alarmBadge }}</span>
                  </span>
                </td>

                <!-- 3. 计量设施名称 -->
                <td class="py-3.5 px-2.5 border-r border-b border-[#b8cde6] font-medium text-gray-900">
                  <div class="line-clamp-2" :title="item.facilityName">
                    {{ item.facilityName }}
                  </div>
                  <div class="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                    <span>{{ item.district }}</span>
                    <span>·</span>
                    <span class="truncate max-w-[120px]">{{ item.waterOwner }}</span>
                  </div>
                </td>

                <!-- 4. 计量设施编码 -->
                <td class="py-3.5 px-2.5 font-mono text-gray-700 border-r border-b border-[#b8cde6] whitespace-nowrap">
                  {{ item.facilityCode }}
                </td>

                <!-- 5. 传输方式 -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border',
                      item.transmissionMode === '在线'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    ]"
                  >
                    <span
                      :class="[
                        'w-1.5 h-1.5 rounded-full',
                        item.transmissionMode === '在线' ? 'bg-emerald-500' : 'bg-slate-400'
                      ]"
                    ></span>
                    <span>{{ item.transmissionMode }}</span>
                  </span>
                </td>

                <!-- 6. 数据来源类型 -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                  <span class="text-gray-700 font-medium">{{ item.sourceType }}</span>
                </td>

                <!-- 7. 告警事件 -->
                <td class="py-3.5 px-2.5 border-r border-b border-[#b8cde6] font-medium text-slate-800">
                  <div class="line-clamp-1" :title="item.alarmEvent">{{ item.alarmEvent }}</div>
                </td>

                <!-- 8. 数据采集开始事件 -->
                <td class="py-3.5 px-2.5 font-mono text-gray-600 border-r border-b border-[#b8cde6] whitespace-nowrap">
                  {{ item.collectStartTime }}
                </td>

                <!-- 9. 告警类型 -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                  <span
                    class="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {{ item.alarmType }}
                  </span>
                </td>

                <!-- 10. 告警内容 -->
                <td class="py-3.5 px-2.5 border-r border-b border-[#b8cde6] text-gray-600">
                  <div class="line-clamp-2 leading-relaxed" :title="item.alarmContent">
                    {{ item.alarmContent }}
                  </div>
                </td>

                <!-- 11. 告警状态 -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border',
                      item.alarmStatus === '已处理'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                    ]"
                  >
                    {{ item.alarmStatus }}
                  </span>
                </td>

                <!-- 12. 是否规模上 -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                  <span
                    v-if="item.isAboveScale === '是'"
                    class="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    是
                  </span>
                  <span v-else class="text-gray-400 font-medium">否</span>
                </td>

                <!-- 13. 是否违规问题排查底数 -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6] whitespace-nowrap">
                  <span
                    v-if="item.isViolationBasis === '是'"
                    class="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200"
                  >
                    是
                  </span>
                  <span v-else class="text-gray-400 font-medium">否</span>
                </td>

                <!-- 14. 操作 (右侧吸附) -->
                <td class="py-3.5 px-2.5 text-center border-r border-b border-[#b8cde6] sticky right-0 z-10 bg-white group-hover:bg-[#f5f8fd] shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.08)] whitespace-nowrap">
                  <button
                    type="button"
                    @click="viewDetail(item)"
                    class="text-[#1677ff] hover:text-blue-800 font-medium cursor-pointer transition flex items-center justify-center gap-1 mx-auto"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>详情</span>
                  </button>
                </td>
              </tr>

              <!-- 空状态提示 -->
              <tr v-if="filteredList.length === 0">
                <td colspan="14" class="py-12 text-center text-gray-400 border-b border-[#b8cde6]">
                  <div class="flex flex-col items-center justify-center gap-2">
                    <svg class="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>暂无符合条件的告警明细记录</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 3. 底部分页控制栏 (同计量设施管理一致) -->
        <div class="px-3 py-2 border-t border-[#b4c7e0] flex flex-wrap items-center justify-between gap-2 shrink-0 bg-white text-xs">
          <div class="text-gray-500 flex items-center gap-2">
            <span>共 <b class="text-gray-800 font-mono">{{ filteredList.length }}</b> 条记录</span>
            <span v-if="selectedIds.length > 0" class="text-blue-600 font-medium">
              (已选中 {{ selectedIds.length }} 项)
            </span>
          </div>

          <t-pagination
            v-model:current="currentPage"
            v-model:pageSize="pageSize"
            :total="filteredList.length"
            :pageSizeOptions="[10, 20, 50, 100]"
            :total-content="false"
            size="small"
            showJumper
          />
        </div>
      </div>
    </div>

    <!-- ==================== 告警明细事件详情弹窗 (完全复刻 WaterFacilityModal.vue 样式规范) ==================== -->
    <div
      v-if="modalVisible && currentItem"
      class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none overflow-y-auto"
      @click.self="modalVisible = false"
    >
      <div
        class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[880px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
      >
        <!-- 1. 浅色顶部标题栏 (Light Header) -->
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
                  告警事件快照与核验详情
                </h3>
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border shadow-2xs',
                    currentItem.alarmBadge === '红色告警异常' ? 'bg-red-50 text-red-700 border-red-200' :
                    currentItem.alarmBadge === '黄色告警' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    currentItem.alarmBadge === '蓝色告警' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                    'bg-slate-50 text-slate-700 border-slate-200'
                  ]"
                >
                  <span
                    :class="[
                      'w-1.5 h-1.5 rounded-full',
                      currentItem.alarmBadge === '红色告警异常' ? 'bg-red-600 animate-pulse' :
                      currentItem.alarmBadge === '黄色告警' ? 'bg-amber-500' :
                      currentItem.alarmBadge === '蓝色告警' ? 'bg-sky-500' :
                      'bg-slate-400'
                    ]"
                  ></span>
                  <span>{{ currentItem.alarmBadge }}</span>
                </span>
                <span
                  :class="[
                    'px-2 py-0.5 rounded text-[11px] font-medium border',
                    currentItem.alarmStatus === '已处理' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'
                  ]"
                >
                  {{ currentItem.alarmStatus }}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="modalVisible = false"
            class="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer p-1.5 rounded-lg -mr-1"
            title="关闭"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 2. 内容主体：卡片式呈现 -->
        <div class="p-4 overflow-y-auto space-y-3 text-xs text-slate-800 custom-scrollbar flex-1 bg-[#f8fafc]/50">
          <!-- 2.1 设施及区划基本属性 -->
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2.5">
            <div class="flex items-center gap-2 border-b border-slate-100 pb-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">计量设施与权属信息</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11.5px]">
              <div>
                <span class="text-slate-400">设施名称：</span>
                <span class="font-medium text-slate-800">{{ currentItem.facilityName }}</span>
              </div>
              <div>
                <span class="text-slate-400">设施编码：</span>
                <span class="font-mono text-slate-800">{{ currentItem.facilityCode }}</span>
              </div>
              <div>
                <span class="text-slate-400">所属行政区划：</span>
                <span class="text-slate-700">{{ currentItem.district }}</span>
              </div>
              <div>
                <span class="text-slate-400">取水权属人：</span>
                <span class="text-slate-700">{{ currentItem.waterOwner }}</span>
              </div>
              <div>
                <span class="text-slate-400">数据传输方式：</span>
                <span class="text-slate-700 font-medium">{{ currentItem.transmissionMode }}</span>
              </div>
              <div>
                <span class="text-slate-400">数据来源类型：</span>
                <span class="text-slate-700 font-medium">{{ currentItem.sourceType }}</span>
              </div>
              <div>
                <span class="text-slate-400">是否规模上：</span>
                <span class="text-slate-700 font-semibold">{{ currentItem.isAboveScale }}</span>
              </div>
              <div>
                <span class="text-slate-400">违规排查底数：</span>
                <span class="text-slate-700 font-semibold">{{ currentItem.isViolationBasis }}</span>
              </div>
              <div>
                <span class="text-slate-400">采集开始时间：</span>
                <span class="font-mono text-slate-700">{{ currentItem.collectStartTime }}</span>
              </div>
            </div>
          </div>

          <!-- 2.2 告警详情与事件特征比对 -->
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2.5">
            <div class="flex items-center gap-2 border-b border-slate-100 pb-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">告警触发特征量与分析</span>
            </div>

            <div class="grid grid-cols-2 gap-3 p-2.5 bg-rose-50/40 rounded-lg border border-rose-100">
              <div>
                <div class="text-[11px] text-slate-500">实测特征值</div>
                <div class="text-base font-bold font-mono text-rose-600 mt-0.5">
                  {{ currentItem.currentValue || '数值异常波动' }}
                </div>
              </div>
              <div>
                <div class="text-[11px] text-slate-500">设定安全基准阈值</div>
                <div class="text-base font-bold font-mono text-slate-700 mt-0.5">
                  {{ currentItem.threshold || '按规程判定' }}
                </div>
              </div>
            </div>

            <div class="space-y-1.5 pt-1">
              <div class="text-slate-500 text-[11px]">告警事件定义：</div>
              <div class="font-semibold text-slate-800 bg-slate-50 p-2 rounded border border-slate-200">
                {{ currentItem.alarmEvent }}
              </div>
            </div>

            <div class="space-y-1.5 pt-1">
              <div class="text-slate-500 text-[11px]">告警完整报文内容：</div>
              <div class="text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 leading-relaxed font-mono text-[11.5px]">
                {{ currentItem.alarmContent }}
              </div>
            </div>
          </div>
        </div>

        <!-- 3. 底部操作栏 -->
        <div class="px-5 py-2.5 bg-[#f8fafc] border-t border-slate-200/80 flex items-center justify-between shrink-0">
          <div class="text-xs text-slate-500 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#1677ff]"></span>
            <span>事件编号：<span class="font-mono text-slate-700 font-semibold">{{ currentItem.eventId }}</span></span>
          </div>
          <button
            type="button"
            @click="modalVisible = false"
            class="px-4 py-1.5 rounded-md text-xs font-medium text-white bg-[#1677ff] hover:bg-blue-600 transition shadow-xs cursor-pointer"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { initialAlarmDetails, type AlarmDetail } from '../../mockAlarmData';
import WaterDistrictTree from './WaterDistrictTree.vue';
import { MessagePlugin } from 'tdesign-vue-next';

// 列表数据源
const list = ref<AlarmDetail[]>([...initialAlarmDetails]);

// 检索过滤项
const filterParams = reactive({
  facilityName: '',
  facilityCode: '',
  alarmType: '',
  alarmStatus: '',
  alarmBadge: '',
  sourceType: '',
  isAboveScale: '',
  isViolationBasis: '',
});

// 右侧行政区划树选中值 (需求 1)
const selectedDistrict = ref('全部');

// 分页配置
const currentPage = ref(1);
const pageSize = ref(10);

// 表格多选
const selectedIds = ref<string[]>([]);

// 详情弹窗控制
const modalVisible = ref(false);
const currentItem = ref<AlarmDetail | null>(null);

// 行政区划树节点选择联动
const handleDistrictSelect = (district: string) => {
  selectedDistrict.value = district;
  currentPage.value = 1;
};

// 综合过滤后数据
const filteredList = computed(() => {
  return list.value.filter((item) => {
    // 1. 行政区划树过滤
    if (selectedDistrict.value && selectedDistrict.value !== '全部' && selectedDistrict.value !== '青海省') {
      const target = selectedDistrict.value.trim();
      if (!item.district.includes(target)) {
        return false;
      }
    }

    // 2. 设施名称
    if (filterParams.facilityName.trim()) {
      const q = filterParams.facilityName.trim().toLowerCase();
      if (!item.facilityName.toLowerCase().includes(q)) return false;
    }

    // 3. 设施编码
    if (filterParams.facilityCode.trim()) {
      const q = filterParams.facilityCode.trim().toLowerCase();
      if (!item.facilityCode.toLowerCase().includes(q)) return false;
    }

    // 4. 告警类型
    if (filterParams.alarmType && item.alarmType !== filterParams.alarmType) {
      return false;
    }

    // 5. 告警状态
    if (filterParams.alarmStatus && item.alarmStatus !== filterParams.alarmStatus) {
      return false;
    }

    // 6. 告警标识
    if (filterParams.alarmBadge && item.alarmBadge !== filterParams.alarmBadge) {
      return false;
    }

    // 7. 数据来源类型
    if (filterParams.sourceType && item.sourceType !== filterParams.sourceType) {
      return false;
    }

    // 8. 是否规模上
    if (filterParams.isAboveScale && item.isAboveScale !== filterParams.isAboveScale) {
      return false;
    }

    // 9. 是否违规问题排查底数
    if (filterParams.isViolationBasis && item.isViolationBasis !== filterParams.isViolationBasis) {
      return false;
    }

    return true;
  });
});

// 分页切片数据
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredList.value.slice(start, start + pageSize.value);
});

// 全选判断
const isAllSelected = computed(() => {
  if (paginatedList.value.length === 0) return false;
  return paginatedList.value.every((item) => selectedIds.value.includes(item.id));
});

// 切换单选
const toggleSelect = (id: string) => {
  const index = selectedIds.value.indexOf(id);
  if (index > -1) {
    selectedIds.value.splice(index, 1);
  } else {
    selectedIds.value.push(id);
  }
};

// 切换本页全选
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    const currentIds = paginatedList.value.map((item) => item.id);
    selectedIds.value = selectedIds.value.filter((id) => !currentIds.includes(id));
  } else {
    paginatedList.value.forEach((item) => {
      if (!selectedIds.value.includes(item.id)) {
        selectedIds.value.push(item.id);
      }
    });
  }
};

// 查询
const handleSearch = () => {
  currentPage.value = 1;
};

// 重置
const handleReset = () => {
  filterParams.facilityName = '';
  filterParams.facilityCode = '';
  filterParams.alarmType = '';
  filterParams.alarmStatus = '';
  filterParams.alarmBadge = '';
  filterParams.sourceType = '';
  filterParams.isAboveScale = '';
  filterParams.isViolationBasis = '';
  selectedDistrict.value = '全部';
  selectedIds.value = [];
  currentPage.value = 1;
  MessagePlugin.success('检索过滤条件已恢复初始状态');
};

// 导出
const handleExport = () => {
  MessagePlugin.success(`正在导出 ${filteredList.value.length} 条告警明细数据至 Excel...`);
};

// 查看详情
const viewDetail = (item: AlarmDetail) => {
  currentItem.value = item;
  modalVisible.value = true;
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
