<template>
  <div class="bg-white rounded-lg border border-[#b4c7e0] shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden select-none">
    <!-- Table Container with distinct deeper grid lines & grayish-blue header (#eaf1fb) matching WaterFacilityTable -->
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

            <!-- 2. 市(州) -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[70px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              市(州)
            </th>

            <!-- 3. 县(区) -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[80px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              县(区)
            </th>

            <!-- 4. 用水单位名称 -->
            <th class="py-3 px-2.5 whitespace-nowrap min-w-[190px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              用水单位名称
            </th>

            <!-- 5. 统一社会信用代码 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[140px] font-mono border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              统一社会信用代码
            </th>

            <!-- 6. 行业类型 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[85px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              行业类型
            </th>

            <!-- 7. 是否公共管网取水 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[90px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              是否公共管网取水
            </th>

            <!-- 8. 自备水源取水 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[80px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              自备水源取水
            </th>

            <!-- 9. 是否规上 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[70px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              是否规上
            </th>

            <!-- 10. 重点类型 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[75px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              重点类型
            </th>

            <!-- 11. 直管类型 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[90px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              直管类型
            </th>

            <!-- 12. 取水类型 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[110px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              取水类型
            </th>

            <!-- 13. 事项类型 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[85px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              事项类型
            </th>

            <!-- 14. 状态 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[95px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              状态
            </th>

            <!-- 15. 佐证附件 (完全一致的附件查看气泡弹窗) -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[90px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              佐证附件
            </th>

            <!-- 16. 许可水量 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-right min-w-[85px] font-mono border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              许可水量
            </th>

            <!-- 17. 计划水量 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-right min-w-[85px] font-mono border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              计划水量
            </th>

            <!-- 18. 地表水 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-right min-w-[80px] font-mono border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              地表水
            </th>

            <!-- 19. 地下水 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-right min-w-[80px] font-mono border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              地下水
            </th>

            <!-- 20. 非常规水总计 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-right min-w-[95px] font-mono border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              非常规水总计
            </th>

            <!-- 21. 操作 (固定在第一行和最右侧) -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[130px] border-r border-b border-[#b8cde6] sticky top-0 right-0 z-30 bg-[#eaf1fb] shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.08)]">
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

        <!-- Table Body: 行高加高 (py-3.5) 且自带浅淡细边框与柔和悬浮态 -->
        <tbody class="text-gray-800 bg-white">
          <tr
            v-for="(record, idx) in paginatedRecords"
            :key="record.id"
            class="group"
            :class="[
              'hover:bg-[#f5f8fd] transition-colors',
              selectedIds.includes(record.id) ? 'bg-[#eef4fe]' : ''
            ]"
          >
            <!-- 1. 序号与选项框合并一列 (固定在最左侧) -->
            <td
              class="py-3.5 px-2 text-center border-r border-b border-[#b8cde6] whitespace-nowrap sticky left-0 z-10 transition-colors shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]"
              :class="selectedIds.includes(record.id) ? 'bg-[#eef4fe]' : 'bg-white group-hover:bg-[#f5f8fd]'"
            >
              <div class="flex items-center justify-center gap-1.5">
                <input
                  type="checkbox"
                  :checked="selectedIds.includes(record.id)"
                  @change="toggleSelect(record.id)"
                  class="rounded border-gray-300 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                />
                <span class="font-mono text-gray-500 text-xs">{{ (currentPage - 1) * pageSize + idx + 1 }}</span>
              </div>
            </td>

            <!-- 2. 市(州) -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center text-gray-700 border-r border-b border-[#b8cde6]">
              {{ record.city }}
            </td>

            <!-- 3. 县(区) -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center font-medium text-gray-800 border-r border-b border-[#b8cde6]">
              {{ record.district }}
            </td>

            <!-- 4. 用水单位名称 -->
            <td class="py-3.5 px-2.5 font-medium text-gray-900 truncate max-w-[220px] border-r border-b border-[#b8cde6]" :title="record.unitName">
              {{ record.unitName }}
            </td>

            <!-- 5. 统一社会信用代码 -->
            <td class="py-3.5 px-2.5 text-center font-mono border-r border-b border-[#b8cde6]">
              <span
                @click="$emit('view-detail', record)"
                class="text-[#1677ff] hover:underline cursor-pointer font-medium tracking-tight"
                title="点击查看详细信息"
              >
                {{ record.creditCode }}
              </span>
            </td>

            <!-- 6. 行业类型 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center text-gray-700 border-r border-b border-[#b8cde6]">
              {{ record.industryType }}
            </td>

            <!-- 7. 是否公共管网取水 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6]">
              <span
                v-if="record.isPublicPipeNetwork === '是'"
                class="w-5 h-5 rounded-full bg-blue-100 text-[#1677ff] text-[11px] font-medium inline-flex items-center justify-center"
              >
                是
              </span>
              <span
                v-else
                class="w-5 h-5 rounded-full bg-gray-100 text-gray-400 text-[11px] font-medium inline-flex items-center justify-center"
              >
                否
              </span>
            </td>

            <!-- 8. 自备水源取水 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6]">
              <span
                v-if="record.isSelfWaterSource === '是'"
                class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-[11px] font-medium inline-flex items-center justify-center"
              >
                是
              </span>
              <span
                v-else
                class="w-5 h-5 rounded-full bg-gray-100 text-gray-400 text-[11px] font-medium inline-flex items-center justify-center"
              >
                否
              </span>
            </td>

            <!-- 9. 是否规上 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6]">
              <span
                v-if="record.isAboveDesignatedSize === '是'"
                class="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-medium inline-flex items-center justify-center"
              >
                是
              </span>
              <span
                v-else
                class="w-5 h-5 rounded-full bg-gray-100 text-gray-400 text-[11px] font-medium inline-flex items-center justify-center"
              >
                否
              </span>
            </td>

            <!-- 10. 重点类型 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6]">
              <span
                :class="[
                  'px-1.5 py-0.5 rounded text-[11px] font-medium border',
                  record.keyType === '重点'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                ]"
              >
                {{ record.keyType }}
              </span>
            </td>

            <!-- 11. 直管类型 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center text-gray-700 border-r border-b border-[#b8cde6]">
              {{ record.directManageType }}
            </td>

            <!-- 12. 取水类型 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center text-gray-800 font-medium border-r border-b border-[#b8cde6]">
              {{ record.waterIntakeType }}
            </td>

            <!-- 13. 事项类型 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6]">
              <span
                :class="[
                  'px-1.5 py-0.5 rounded text-[11px] font-medium border',
                  record.itemType === '首次填报'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : record.itemType === '年计划调整'
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                ]"
              >
                {{ record.itemType }}
              </span>
            </td>

            <!-- 14. 状态 (采用计量设施管理的圆点胶囊风格) -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6]">
              <span
                v-if="record.status.includes('待审核')"
                @click="$emit('audit-record', record)"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-200 cursor-pointer hover:underline"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                {{ record.status }}
              </span>
              <span
                v-else-if="record.status === '审核通过'"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {{ record.status }}
              </span>
              <span
                v-else-if="record.status === '报备中'"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-600 border border-amber-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                {{ record.status }}
              </span>
              <span
                v-else-if="record.status === '审核驳回'"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-600 border border-rose-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                {{ record.status }}
              </span>
              <span
                v-else
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-500 border border-gray-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                {{ record.status }}
              </span>
            </td>

            <!-- 15. 佐证附件字段 (同计量设施管理完全一致的气泡弹窗) -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6]">
              <t-popup
                trigger="click"
                placement="bottom"
                show-arrow
                :overlay-inner-style="{ padding: '0px' }"
              >
                <button
                  type="button"
                  class="px-2.5 py-0.5 rounded bg-[#eef4fe] text-[#1677ff] hover:bg-blue-100 font-normal text-xs transition cursor-pointer"
                >
                  查看
                </button>

                <!-- 气泡弹窗内容 (完全按照计量设施档案列表查看一致) -->
                <template #content>
                  <div class="w-[320px] p-3 bg-white rounded-xl shadow-xl border border-gray-200 text-left select-none">
                    <div class="flex items-center justify-between pb-2 mb-2.5 border-b border-gray-200">
                      <div class="flex items-center gap-1.5">
                        <span class="font-medium text-gray-900 text-xs">计划申报佐证材料</span>
                        <span class="text-gray-400 text-xs">(3)</span>
                      </div>
                      <span class="text-[11px] text-gray-400">计划核验佐证</span>
                    </div>

                    <div class="space-y-2">
                      <!-- 1. PDF 申报书 -->
                      <div class="flex items-center justify-between p-2 rounded-lg border border-[#c4d8ee] bg-[#f9fbfe] hover:bg-[#f0f5fd] transition gap-2">
                        <div class="flex items-center gap-2 min-w-0 flex-1">
                          <div class="w-6 h-6 rounded bg-[#feebee] text-[#f5222d] flex items-center justify-center shrink-0">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                            </svg>
                          </div>
                          <span class="text-xs text-gray-800 truncate font-normal">
                            2026年度计划用水申报书(盖章件).pdf
                          </span>
                        </div>
                        <div class="flex items-center gap-1.5 shrink-0 text-gray-400">
                          <button
                            type="button"
                            @click.stop="openPreviewModal('pdf', '2026年度计划用水申报书(盖章件).pdf')"
                            class="hover:text-[#1677ff] p-1 cursor-pointer rounded transition"
                            title="预览文件"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                          <button
                            type="button"
                            @click.stop="downloadFile('2026年度计划用水申报书(盖章件).pdf')"
                            class="hover:text-[#1677ff] p-1 cursor-pointer rounded transition"
                            title="下载文件"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <!-- 2. Word 评价报告 -->
                      <div class="flex items-center justify-between p-2 rounded-lg border border-[#c4d8ee] bg-[#f9fbfe] hover:bg-[#f0f5fd] transition gap-2">
                        <div class="flex items-center gap-2 min-w-0 flex-1">
                          <div class="w-6 h-6 rounded bg-[#eef0fe] text-[#2f54eb] flex items-center justify-center shrink-0 font-bold text-[11px]">
                            W
                          </div>
                          <span class="text-xs text-gray-800 truncate font-normal">
                            企业水平衡测试与节水评价报告.docx
                          </span>
                        </div>
                        <div class="flex items-center gap-1.5 shrink-0 text-gray-400">
                          <button
                            type="button"
                            @click.stop="downloadFile('企业水平衡测试与节水评价报告.docx')"
                            class="hover:text-[#1677ff] p-1 cursor-pointer rounded transition"
                            title="下载文件"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <!-- 3. 图片 计量水表照片 -->
                      <div class="flex items-center justify-between p-2 rounded-lg border border-[#c4d8ee] bg-[#f9fbfe] hover:bg-[#f0f5fd] transition gap-2">
                        <div class="flex items-center gap-2 min-w-0 flex-1">
                          <div class="w-6 h-6 rounded bg-[#e6f1fc] text-[#1677ff] flex items-center justify-center shrink-0">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                          </div>
                          <span class="text-xs text-gray-800 truncate font-normal">
                            取水口超声水表工况现场照片.jpg
                          </span>
                        </div>
                        <div class="flex items-center gap-1.5 shrink-0 text-gray-400">
                          <button
                            type="button"
                            @click.stop="openPreviewModal('image', '取水口超声水表工况现场照片.jpg')"
                            class="hover:text-[#1677ff] p-1 cursor-pointer rounded transition"
                            title="预览照片"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                          <button
                            type="button"
                            @click.stop="downloadFile('取水口超声水表工况现场照片.jpg')"
                            class="hover:text-[#1677ff] p-1 cursor-pointer rounded transition"
                            title="下载文件"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </t-popup>
            </td>

            <!-- 16. 许可水量 -->
            <td class="py-3.5 px-2.5 text-right font-mono font-medium text-gray-800 border-r border-b border-[#b8cde6]">
              {{ (record.permitVolume ?? 0).toFixed(2) }}
            </td>

            <!-- 17. 计划水量 -->
            <td class="py-3.5 px-2.5 text-right font-mono font-bold text-[#1677ff] border-r border-b border-[#b8cde6]">
              {{ (record.planVolume ?? 0).toFixed(2) }}
            </td>

            <!-- 18. 地表水 -->
            <td class="py-3.5 px-2.5 text-right font-mono text-gray-700 border-r border-b border-[#b8cde6]">
              {{ (record.surfaceWater ?? 0).toFixed(2) }}
            </td>

            <!-- 19. 地下水 -->
            <td class="py-3.5 px-2.5 text-right font-mono text-gray-700 border-r border-b border-[#b8cde6]">
              {{ (record.groundwater ?? 0).toFixed(2) }}
            </td>

            <!-- 20. 非常规水总计 -->
            <td class="py-3.5 px-2.5 text-right font-mono font-medium text-emerald-600 border-r border-b border-[#b8cde6]">
              {{ (record.unconventionalTotal ?? 0).toFixed(2) }}
            </td>

            <!-- 21. 操作 (固定在最右侧，与计量设施管理风格完全一致) -->
            <td
              class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6] sticky right-0 z-10 transition-colors shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.08)]"
              :class="selectedIds.includes(record.id) ? 'bg-[#eef4fe]' : 'bg-white group-hover:bg-[#f5f8fd]'"
            >
              <div class="flex items-center justify-center gap-2.5 text-xs text-[#1677ff]">
                <button
                  v-if="record.status.includes('待审核')"
                  type="button"
                  @click="$emit('audit-record', record)"
                  class="hover:underline cursor-pointer font-medium text-emerald-600"
                >
                  审核
                </button>
                <button
                  v-else-if="record.status === '报备中'"
                  type="button"
                  @click="$emit('confirm-record', record)"
                  class="hover:underline cursor-pointer font-medium text-amber-600"
                >
                  确认
                </button>
                <button
                  type="button"
                  @click="$emit('view-detail', record)"
                  class="hover:underline cursor-pointer"
                >
                  详情
                </button>
              </div>
            </td>
          </tr>

          <!-- 空状态 -->
          <tr v-if="paginatedRecords.length === 0">
            <td colspan="21" class="text-center py-16 text-gray-400 border-r border-b border-[#b8cde6]">
              <div class="flex flex-col items-center justify-center gap-2">
                <svg class="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <span>未检索到匹配的计划用水申报记录</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer: 完全同计量设施管理底栏 -->
    <div class="px-3 py-2 border-t border-[#b4c7e0] flex flex-wrap items-center justify-between gap-2 shrink-0 bg-white">
      <div class="flex items-center gap-3 text-xs text-gray-500">
        <div>
          共 <strong class="text-gray-800 font-mono font-medium">{{ records.length }}</strong> 条申报数据
        </div>
        <span v-if="selectedIds.length > 0" class="text-blue-600 font-medium">
          已选中 {{ selectedIds.length }} 条
        </span>
        <div class="flex items-center gap-1.5 text-rose-500 font-medium select-none text-[11.5px] ml-2">
          <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>只能审核自己下发的数据，但可查看所有下级填报数据</span>
        </div>
      </div>

      <t-pagination
        v-model:current="currentPage"
        v-model:pageSize="pageSize"
        :total="records.length"
        :pageSizeOptions="[10, 20, 50, 100]"
        :total-content="false"
        size="small"
        showJumper
      />
    </div>

    <!-- 附件在线预览弹窗 (与计量设施档案列表查看完全一致) -->
    <t-dialog
      v-model:visible="previewVisible"
      :header="previewTitle"
      width="600px"
      :footer="false"
    >
      <div class="p-2 space-y-3">
        <div v-if="previewType === 'image'" class="flex flex-col items-center">
          <div class="w-full max-h-[360px] overflow-hidden rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center p-2">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="现场设备照片"
              class="max-h-[340px] object-contain rounded"
            />
          </div>
          <div class="mt-2 text-xs text-gray-500 flex items-center justify-between w-full px-1">
            <span>现场核验附件：{{ previewTitle }}</span>
            <span>核验时间：2026-03-05 10:24</span>
          </div>
        </div>
        <div v-else-if="previewType === 'pdf'" class="p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600 space-y-2">
          <div class="flex items-center gap-2 font-medium text-gray-900 border-b pb-2">
            <svg class="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span>{{ previewTitle }}</span>
          </div>
          <p>检验依据：西宁市计划用水管理实施细则、水资源刚性约束管控与行业定额核定规程</p>
          <p>核验结论：经初核，该申报单位填报资料齐全有效，符合申报核验要求。</p>
          <div class="pt-2 text-right text-gray-400 font-mono">西宁市水资源管理委员会办公室</div>
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { WaterPlanRecord } from '../../../types';

const props = defineProps<{
  records: WaterPlanRecord[];
}>();

const emit = defineEmits<{
  (e: 'audit-record', record: WaterPlanRecord): void;
  (e: 'view-detail', record: WaterPlanRecord): void;
  (e: 'confirm-record', record: WaterPlanRecord): void;
}>();

const selectedIds = ref<string[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);

const previewVisible = ref(false);
const previewTitle = ref('');
const previewType = ref<'image' | 'pdf'>('image');

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return props.records.slice(start, start + pageSize.value);
});

const isAllSelected = computed(() => {
  if (paginatedRecords.value.length === 0) return false;
  return paginatedRecords.value.every(r => selectedIds.value.includes(r.id));
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedIds.value = selectedIds.value.filter(
      id => !paginatedRecords.value.some(r => r.id === id)
    );
  } else {
    const currentIds = paginatedRecords.value.map(r => r.id);
    selectedIds.value = Array.from(new Set([...selectedIds.value, ...currentIds]));
  }
};

const toggleSelect = (id: string) => {
  const index = selectedIds.value.indexOf(id);
  if (index > -1) {
    selectedIds.value.splice(index, 1);
  } else {
    selectedIds.value.push(id);
  }
};

const openPreviewModal = (type: 'image' | 'pdf', title: string) => {
  previewType.value = type;
  previewTitle.value = title;
  previewVisible.value = true;
};

const downloadFile = (name: string) => {
  MessagePlugin.success(`开始下载佐证附件：${name}`);
};
</script>
