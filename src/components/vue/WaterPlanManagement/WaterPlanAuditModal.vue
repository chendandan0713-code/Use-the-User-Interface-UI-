<template>
  <!-- 遮罩层：样式与计量设施管理编辑/详情弹窗 100% 保持一致 -->
  <div
    v-if="visible && record"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none overflow-y-auto"
    @click.self="handleClose"
  >
    <!-- 弹窗主体容器：浅色顶栏、精致圆角与边框阴影、居中自适应双栏布局 -->
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1520px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[94vh] h-[92vh]"
    >
      <!-- 1. 浅色顶部标题栏 (Light Header)：浅灰蓝背景、精致微标与底边分割线，与计量设施管理编辑/详情统一 -->
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
                取水计划审核 · {{ record.userType === 'public_supply' ? '公共供水单位' : '自备取水单位' }}
              </h3>
              <span
                class="px-2 py-0.5 rounded text-[11px] font-medium border"
                :class="record.status === '审核通过' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-blue-50 text-blue-600 border-blue-200'"
              >
                {{ record.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Header 右侧工具区：附件查看 (同计量设施档案列表查看一致) 与关闭按钮 -->
        <div class="flex items-center gap-2.5">
          <t-popup trigger="click" placement="bottom-end" show-arrow :overlay-inner-style="{ padding: '0px' }">
            <button
              type="button"
              class="px-2.5 py-1 rounded bg-[#eef4fe] text-[#1677ff] hover:bg-blue-100 font-normal text-xs transition cursor-pointer flex items-center gap-1.5 border border-blue-200"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
              <span>佐证材料 ({{ attachments.length }})</span>
            </button>

            <!-- 附件弹出卡片 (完全与计量设施档案列表查看样式一致) -->
            <template #content>
              <div class="w-[320px] p-3 bg-white rounded-xl shadow-xl border border-gray-200 text-left select-none">
                <div class="flex items-center justify-between pb-2 mb-2.5 border-b border-gray-200">
                  <div class="flex items-center gap-1.5">
                    <span class="font-medium text-gray-900 text-xs">计划申报佐证附件</span>
                    <span class="text-gray-400 text-xs">({{ attachments.length }})</span>
                  </div>
                  <span class="text-[11px] text-gray-400">计划核验材料</span>
                </div>

                <div class="space-y-2">
                  <div
                    v-for="(att, aIdx) in attachments"
                    :key="aIdx"
                    class="flex items-center justify-between p-2 rounded-lg border border-[#c4d8ee] bg-[#f9fbfe] hover:bg-[#f0f5fd] transition gap-2"
                  >
                    <div class="flex items-center gap-2 min-w-0 flex-1">
                      <!-- 1. 图片图标 (蓝底相机) -->
                      <div
                        v-if="att.type === 'image'"
                        class="w-6 h-6 rounded bg-[#e6f1fc] text-[#1677ff] flex items-center justify-center shrink-0"
                      >
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </div>

                      <!-- 2. Word 图标 (蓝紫色底 W) -->
                      <div
                        v-else-if="att.type === 'word'"
                        class="w-6 h-6 rounded bg-[#eef0fe] text-[#2f54eb] flex items-center justify-center shrink-0 font-bold text-[11px]"
                      >
                        W
                      </div>

                      <!-- 3. PDF 图标 (红底文档) -->
                      <div
                        v-else
                        class="w-6 h-6 rounded bg-[#feebee] text-[#f5222d] flex items-center justify-center shrink-0"
                      >
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                      </div>

                      <span class="text-xs text-gray-800 truncate font-normal" :title="att.name">
                        {{ att.name }}
                      </span>
                    </div>

                    <div class="flex items-center gap-1.5 shrink-0 text-gray-400">
                      <button
                        v-if="att.type === 'image' || att.type === 'pdf'"
                        type="button"
                        @click.stop="openPreview(att)"
                        class="hover:text-[#1677ff] p-1 cursor-pointer rounded transition"
                        title="预览附件"
                      >
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                      <button
                        type="button"
                        @click.stop="downloadAttachment(att)"
                        class="hover:text-[#1677ff] p-1 cursor-pointer rounded transition"
                        title="下载附件"
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

          <button
            type="button"
            @click="handleClose"
            class="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer p-1.5 rounded-lg -mr-1"
            title="关闭"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- 2. 主体左右分栏布局 (左边可编辑修改，右边完整表单展示)，统一浅色背景与卡片系统 -->
      <div class="flex-1 flex min-h-0 overflow-hidden text-xs text-slate-800 divide-x divide-slate-200/80 bg-[#f8fafc]/40">
        
        <!-- ====================== 左侧：填报内容可修改 ====================== -->
        <div class="w-1/2 flex flex-col min-h-0 bg-[#f8fafc]/30">
          <!-- 左侧滚动卡片表单区域 (向上滑动时收起基础信息，表单切换栏、表单名称栏、用水类型勾选栏顶部固定展示) -->
          <div
            ref="leftScrollContainer"
            @scroll="handleLeftScroll"
            class="flex-1 overflow-y-auto p-3.5 custom-scrollbar"
          >
            <!-- 卡片 1: 申报主体基础信息 (向上滑动自动折叠收起，支持手动展开/收起) -->
            <div class="bg-white rounded-lg border border-slate-200/80 shadow-2xs mb-2.5 transition-all duration-300 overflow-hidden">
              <div class="flex items-center justify-between px-3.5 py-2.5 bg-slate-50/70 border-b border-slate-100">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="w-1 h-3.5 bg-[#1677ff] rounded-full shrink-0"></span>
                  <span class="text-[13px] font-bold text-slate-800 shrink-0">申报主体基础信息</span>

                  <!-- 收起时显示的精简摘要标签 -->
                  <div v-if="isBaseInfoCollapsed" class="flex items-center gap-2 text-xs text-slate-500 font-normal truncate ml-1">
                    <span class="truncate max-w-[180px]" :title="form.waterOwner">
                      <span class="text-slate-400">权人: </span>{{ form.waterOwner || '--' }}
                    </span>
                    <span class="text-slate-300">|</span>
                    <span class="font-mono">
                      <span class="text-slate-400">证号: </span>{{ form.permitNumber || '--' }}
                    </span>
                    <span class="text-slate-300">|</span>
                    <span class="font-mono">
                      <span class="text-slate-400">许可: </span>{{ (form.permitVolume ?? 0).toFixed(2) }}万m³
                    </span>
                  </div>
                </div>

                <!-- 收起/展开切换按钮 -->
                <button
                  type="button"
                  @click="toggleBaseInfo"
                  class="text-xs text-[#1677ff] hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer px-2 py-1 rounded hover:bg-blue-50 transition shrink-0 select-none"
                  :title="isBaseInfoCollapsed ? '展开基础信息' : '收起基础信息'"
                >
                  <span>{{ isBaseInfoCollapsed ? '展开信息' : '收起信息' }}</span>
                  <svg
                    class="w-3.5 h-3.5 transition-transform duration-200"
                    :class="isBaseInfoCollapsed ? '' : 'rotate-180'"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>

              <!-- 基础信息输入栅格 (采用规整对齐的3列栅格布局，折叠动画过渡) -->
              <div
                class="transition-all duration-300 ease-in-out overflow-hidden"
                :class="isBaseInfoCollapsed ? 'max-h-0 opacity-0 p-0' : 'max-h-[600px] opacity-100 p-3.5'"
              >
                <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2.5 text-xs">
                  <!-- 第一行：取水权人 (跨2列) + 取水许可编号 (1列) -->
                  <div class="col-span-1 md:col-span-2 flex items-center">
                    <label class="w-20 shrink-0 text-slate-500 font-normal text-right pr-2.5">取水权人</label>
                    <input
                      type="text"
                      v-model="form.waterOwner"
                      placeholder="请输入取水权人全称"
                      class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                    />
                  </div>

                  <div class="col-span-1 flex items-center">
                    <label class="w-20 shrink-0 text-slate-500 font-normal text-right pr-2.5">许可证号</label>
                    <input
                      type="text"
                      v-model="form.permitNumber"
                      placeholder="请输入许可证编号"
                      class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md font-mono text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                    />
                  </div>

                  <!-- 第二行：许可水量 + 年产值 + 邮政编码 -->
                  <div class="col-span-1 flex items-center">
                    <label class="w-20 shrink-0 text-slate-500 font-normal text-right pr-2.5">许可水量</label>
                    <div class="relative flex-1">
                      <input
                        type="number"
                        step="0.01"
                        v-model.number="form.permitVolume"
                        class="w-full h-8 pl-2.5 pr-12 bg-white border border-[#dce6f5] rounded-md font-mono text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                      />
                      <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 font-sans pointer-events-none">万m³</span>
                    </div>
                  </div>

                  <div class="col-span-1 flex items-center">
                    <label class="w-20 shrink-0 text-slate-500 font-normal text-right pr-2.5">年产值</label>
                    <div class="relative flex-1">
                      <input
                        type="number"
                        step="1"
                        v-model.number="form.annualOutputValue"
                        class="w-full h-8 pl-2.5 pr-11 bg-white border border-[#dce6f5] rounded-md font-mono text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                      />
                      <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 font-sans pointer-events-none">万元</span>
                    </div>
                  </div>

                  <div class="col-span-1 flex items-center">
                    <label class="w-20 shrink-0 text-slate-500 font-normal text-right pr-2.5">邮政编码</label>
                    <input
                      type="text"
                      v-model="form.postalCode"
                      placeholder="6位邮编"
                      class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md font-mono text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                    />
                  </div>

                  <!-- 第三行：联系人 + 联系电话 + 电子邮箱 -->
                  <div class="col-span-1 flex items-center">
                    <label class="w-20 shrink-0 text-slate-500 font-normal text-right pr-2.5">
                      <span class="text-rose-500 mr-0.5">*</span>联系人
                    </label>
                    <input
                      type="text"
                      v-model="form.contactPerson"
                      placeholder="填报联系人"
                      class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                    />
                  </div>

                  <div class="col-span-1 flex items-center">
                    <label class="w-20 shrink-0 text-slate-500 font-normal text-right pr-2.5">
                      <span class="text-rose-500 mr-0.5">*</span>联系电话
                    </label>
                    <input
                      type="text"
                      v-model="form.contactPhone"
                      placeholder="手机或办公电话"
                      class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md font-mono text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                    />
                  </div>

                  <div class="col-span-1 flex items-center">
                    <label class="w-20 shrink-0 text-slate-500 font-normal text-right pr-2.5">电子邮箱</label>
                    <input
                      type="email"
                      v-model="form.email"
                      placeholder="电子邮箱地址"
                      class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                    />
                  </div>

                  <!-- 第四行：详细地址 (跨3列) -->
                  <div class="col-span-1 md:col-span-3 flex items-center pt-0.5">
                    <label class="w-20 shrink-0 text-slate-500 font-normal text-right pr-2.5">
                      <span class="text-rose-500 mr-0.5">*</span>详细地址
                    </label>
                    <input
                      type="text"
                      v-model="form.detailedAddress"
                      placeholder="请输入详细地址"
                      class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- 表单 1：本年实际用水填报表 (表单切换栏通过 slot 插入吸顶区域固定展示) -->
            <WaterQuotaAuditForm
              v-show="activeFormTab === 'actual'"
              ref="actualFormRef"
              theme="blue"
              v-model="actualQuotaForm"
              :activeCategory="currentCategory"
              :activeProductName="currentProduct"
              @update:activeCategory="handleCategoryChanged"
              @category-change="handleCategoryChanged"
              @product-select="handleProductSelected"
              @open-quota-bubble="handleOpenQuotaBubble"
            >
              <template #tabs>
                <!-- 表单切换栏：固定在最顶部 -->
                <div class="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    @click="activeFormTab = 'actual'"
                    class="py-2 px-3 rounded-lg border transition cursor-pointer flex items-center justify-between select-none"
                    :class="[
                      activeFormTab === 'actual'
                        ? 'bg-blue-50 border-[#1677ff] text-[#1677ff] ring-1 ring-[#1677ff] shadow-2xs font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/80'
                    ]"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span
                        class="w-2 h-2 rounded-full shrink-0"
                        :class="activeFormTab === 'actual' ? 'bg-[#1677ff]' : 'bg-slate-400'"
                      ></span>
                      <span class="text-xs truncate">本年实际用水填报表</span>
                    </div>
                    <span
                      class="px-1.5 py-0.5 rounded text-[11px] font-mono shrink-0 ml-1"
                      :class="activeFormTab === 'actual' ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-slate-200/70 text-slate-600'"
                    >
                      {{ currentYear }}年度
                    </span>
                  </button>

                  <button
                    type="button"
                    @click="activeFormTab = 'plan'"
                    class="py-2 px-3 rounded-lg border transition cursor-pointer flex items-center justify-between select-none"
                    :class="[
                      activeFormTab === 'plan'
                        ? 'bg-blue-50 border-[#1677ff] text-[#1677ff] ring-1 ring-[#1677ff] shadow-2xs font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/80'
                    ]"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span
                        class="w-2 h-2 rounded-full shrink-0"
                        :class="activeFormTab === 'plan' ? 'bg-[#1677ff]' : 'bg-slate-400'"
                      ></span>
                      <span class="text-xs truncate">下年度计划用水填报表</span>
                    </div>
                    <span
                      class="px-1.5 py-0.5 rounded text-[11px] font-mono shrink-0 ml-1"
                      :class="activeFormTab === 'plan' ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-slate-200/70 text-slate-600'"
                    >
                      {{ nextYear }}年度
                    </span>
                  </button>
                </div>
              </template>
            </WaterQuotaAuditForm>

            <!-- 表单 2：下年度计划用水填报表 (表单切换栏通过 slot 插入吸顶区域固定展示) -->
            <WaterQuotaAuditForm
              v-show="activeFormTab === 'plan'"
              ref="planFormRef"
              theme="blue"
              v-model="planQuotaForm"
              :activeCategory="currentCategory"
              :activeProductName="currentProduct"
              @update:activeCategory="handleCategoryChanged"
              @category-change="handleCategoryChanged"
              @product-select="handleProductSelected"
              @open-quota-bubble="handleOpenQuotaBubble"
            >
              <template #tabs>
                <!-- 表单切换栏：固定在最顶部 -->
                <div class="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    @click="activeFormTab = 'actual'"
                    class="py-2 px-3 rounded-lg border transition cursor-pointer flex items-center justify-between select-none"
                    :class="[
                      activeFormTab === 'actual'
                        ? 'bg-blue-50 border-[#1677ff] text-[#1677ff] ring-1 ring-[#1677ff] shadow-2xs font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/80'
                    ]"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span
                        class="w-2 h-2 rounded-full shrink-0"
                        :class="activeFormTab === 'actual' ? 'bg-[#1677ff]' : 'bg-slate-400'"
                      ></span>
                      <span class="text-xs truncate">本年实际用水填报表</span>
                    </div>
                    <span
                      class="px-1.5 py-0.5 rounded text-[11px] font-mono shrink-0 ml-1"
                      :class="activeFormTab === 'actual' ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-slate-200/70 text-slate-600'"
                    >
                      {{ currentYear }}年度
                    </span>
                  </button>

                  <button
                    type="button"
                    @click="activeFormTab = 'plan'"
                    class="py-2 px-3 rounded-lg border transition cursor-pointer flex items-center justify-between select-none"
                    :class="[
                      activeFormTab === 'plan'
                        ? 'bg-blue-50 border-[#1677ff] text-[#1677ff] ring-1 ring-[#1677ff] shadow-2xs font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/80'
                    ]"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span
                        class="w-2 h-2 rounded-full shrink-0"
                        :class="activeFormTab === 'plan' ? 'bg-[#1677ff]' : 'bg-slate-400'"
                      ></span>
                      <span class="text-xs truncate">下年度计划用水填报表</span>
                    </div>
                    <span
                      class="px-1.5 py-0.5 rounded text-[11px] font-mono shrink-0 ml-1"
                      :class="activeFormTab === 'plan' ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-slate-200/70 text-slate-600'"
                    >
                      {{ nextYear }}年度
                    </span>
                  </button>
                </div>
              </template>
            </WaterQuotaAuditForm>

            <!-- 卡片 4: 审核批注与核定结论 -->
            <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-1.5 mt-2.5">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                  <span class="text-[13px] font-bold text-slate-800">审批意见</span>
                </div>
              </div>
              <textarea
                v-model="auditOpinion"
                rows="2"
                placeholder="请输入核定结论及审核意见..."
                class="w-full p-2.5 bg-slate-50 border border-[#dce6f5] rounded-md text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:bg-white resize-none transition"
              ></textarea>
            </div>

          </div>
        </div>

        <!-- ====================== 右侧：填报完整的表单展示 ====================== -->
        <div class="w-1/2 flex flex-col min-h-0 bg-[#f8fafc]/30">
          
          <!-- 顶部 Tab 切换组 (完全同计量设施管理详情页 Tab 风格) -->
          <div class="bg-white border-b border-slate-200/80 px-5 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0 select-none">
            <button
              v-for="tab in rightTabs"
              :key="tab.key"
              type="button"
              @click="activeRightTab = tab.key"
              class="flex items-center gap-1.5 py-3 px-3.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer"
              :class="[
                activeRightTab === tab.key
                  ? 'border-[#1677ff] text-[#1677ff] font-semibold bg-blue-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              ]"
            >
              <span>{{ tab.label }}</span>
            </button>
          </div>

          <!-- 右侧内容滚动区域 -->
          <div class="flex-1 overflow-y-auto p-3.5 space-y-2.5 custom-scrollbar">
            
            <!-- Tab: 用水定额 (全联动对应类型查看，与左侧填报无缝融合) -->
            <div v-if="activeRightTab === 'water_quota'" class="space-y-3.5">
              
              <!-- 工业产品定额智能检索与匹配结果（气泡推荐面板 / 点击一键填充左侧当前行） -->
              <div
                v-if="currentCategory === 'industry'"
                class="bg-gradient-to-br from-blue-50/90 via-white to-sky-50/50 rounded-xl border-2 border-blue-400/80 p-3.5 shadow-sm space-y-3 relative overflow-hidden"
              >
                <!-- 发光与气泡装饰背景 -->
                <div class="absolute -right-8 -top-8 w-28 h-28 bg-blue-100/50 rounded-full blur-xl pointer-events-none"></div>

                <div class="flex items-center justify-between gap-2 relative">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#1677ff] ring-4 ring-blue-100 animate-pulse"></span>
                    <div>
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-xs font-bold text-slate-900">
                          【{{ currentProduct || quotaFilter.keyword || '高纯多晶硅' }}】用水定额检索匹配
                        </span>
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1677ff] text-white">
                          匹配 {{ matchedIndustrialQuotas.length }} 个定额标准
                        </span>
                      </div>
                      <div class="text-[11px] text-slate-500 mt-0.5">
                        正在为左侧【工业用水第 <strong class="text-[#1677ff] font-mono">{{ currentActiveRowIndex + 1 }}</strong> 行】核定定额指标，点击任意一项直接填充当前行
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      @click="quotaBubbleModalVisible = true"
                      class="px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 text-[#1677ff] border border-blue-300 text-xs font-medium transition cursor-pointer flex items-center gap-1 shadow-2xs"
                      title="打开大图浮动气泡弹窗查看并选用"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <span>气泡弹窗</span>
                    </button>
                  </div>
                </div>

                <!-- 匹配定额卡片列表（清晰展示：行业编码、行业名称、产品名称、用水定额参数、分区范围 5项核心数值） -->
                <div class="space-y-2 relative">
                  <div
                    v-for="(qItem, qIdx) in matchedIndustrialQuotas"
                    :key="qItem.id || qIdx"
                    @click="handleApplyQuota(qItem, currentActiveRowIndex)"
                    class="group bg-white rounded-lg border border-blue-200/90 hover:border-[#1677ff] p-2.5 hover:shadow-md transition-all cursor-pointer space-y-2 relative"
                  >
                    <div class="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 pb-1.5">
                      <div class="flex flex-wrap items-center gap-1.5">
                        <!-- 1. 行业编码 -->
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-50 text-[#1677ff] border border-blue-200">
                          <span class="text-slate-400 font-normal text-[10px]">行业编码:</span>
                          {{ qItem.industryCode }}
                        </span>
                        <!-- 2. 行业名称 -->
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          <span class="text-slate-400 font-normal text-[10px]">行业名称:</span>
                          {{ qItem.industryName }}
                        </span>
                        <!-- 3. 产品名称 -->
                        <span class="font-bold text-xs text-slate-900 group-hover:text-[#1677ff] transition">
                          {{ qItem.productName }}
                        </span>
                      </div>

                      <div class="flex items-center gap-1 shrink-0">
                        <span
                          v-if="qItem.waterEfficiencyGrade"
                          class="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          :class="qItem.waterEfficiencyGrade.includes('领跑') || qItem.waterEfficiencyGrade.includes('先进') ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'"
                        >
                          {{ qItem.waterEfficiencyGrade }}
                        </span>
                        <span class="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200">
                          {{ qItem.standardDoc }}
                        </span>
                      </div>
                    </div>

                    <!-- 核心数值指标栏：定额参数 与 分区范围 -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <!-- 4. 用水定额参数 -->
                      <div class="flex items-center justify-between p-2 rounded-md bg-blue-50/50 border border-blue-100">
                        <div class="space-y-0.5">
                          <div class="text-[11px] text-blue-700 font-medium">用水定额参数</div>
                          <div class="text-[10px] text-slate-400 font-sans">标准指标 / 领跑值</div>
                        </div>
                        <div class="font-mono font-bold text-base text-[#1677ff]">
                          {{ qItem.quotaParam }}
                        </div>
                      </div>

                      <!-- 5. 分区范围 -->
                      <div class="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-200/70">
                        <div class="space-y-0.5">
                          <div class="text-[11px] text-slate-600 font-medium">分区范围</div>
                          <div class="text-xs text-slate-700 font-sans truncate max-w-[190px]" :title="qItem.regionScope">
                            {{ qItem.regionScope }}
                          </div>
                        </div>
                        <div class="text-[11px] text-slate-500 font-mono shrink-0">
                          {{ qItem.waterRegion }}
                        </div>
                      </div>
                    </div>

                    <!-- 工艺与填充按钮 -->
                    <div class="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                      <span class="truncate max-w-[340px] text-slate-500" :title="qItem.processType">
                        工艺: {{ qItem.processType || '标准生产工艺' }}
                      </span>

                      <button
                        type="button"
                        @click.stop="handleApplyQuota(qItem, currentActiveRowIndex)"
                        class="px-2.5 py-1 rounded bg-[#1677ff] hover:bg-blue-700 text-white font-medium text-xs flex items-center gap-1 shadow-2xs transition cursor-pointer group-hover:ring-2 group-hover:ring-blue-300"
                      >
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>选用填充第 {{ currentActiveRowIndex + 1 }} 行</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 1. 近三年用水计划量参考（展示地表水、地下水、非常规水四类指标） -->
              <div class="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs space-y-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-3.5 bg-[#1677ff] rounded-full"></span>
                    <span class="text-xs font-bold text-slate-800">近三年用水计划量参考</span>
                    <span class="text-[11px] text-slate-400">（地表水、地下水、非常规水分类参考指标）</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-[11px] text-slate-400 font-mono">单位: 万m³</span>
                    <button
                      type="button"
                      @click="quotaGuideModalVisible = true"
                      class="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium transition cursor-pointer flex items-center gap-1"
                    >
                      <svg class="w-3.5 h-3.5 text-[#1677ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                      <span>核定依据说明</span>
                    </button>
                  </div>
                </div>

                <div class="overflow-x-auto custom-scrollbar border border-[#b8cde6] rounded-md bg-white">
                  <table class="w-full text-xs text-center border-collapse">
                    <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6]">
                      <tr class="divide-x divide-[#b8cde6]">
                        <th class="py-1.5 px-3">年份</th>
                        <th class="py-1.5 px-3">地表水</th>
                        <th class="py-1.5 px-3">地下水</th>
                        <th class="py-1.5 px-3">非常规水</th>
                        <th class="py-1.5 px-3 font-semibold text-slate-800">合计</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#b8cde6] font-mono">
                      <tr
                        v-for="row in recentThreeYearsPlan"
                        :key="row.year"
                        class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
                      >
                        <td class="py-1.5 px-3 text-slate-800 font-sans font-medium">{{ row.year }}年度</td>
                        <td class="py-1.5 px-3 text-slate-700">{{ row.surfaceWater }}</td>
                        <td class="py-1.5 px-3 text-slate-700">{{ row.groundwater }}</td>
                        <td class="py-1.5 px-3 text-slate-700">{{ row.unconventionalWater }}</td>
                        <td class="py-1.5 px-3 text-slate-800 font-bold">{{ row.total }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 2. 定额分类多标签切换栏 (支持直接点击切换) -->
              <div class="bg-white rounded-xl border border-slate-200/80 p-1.5 shadow-2xs flex items-center gap-1 overflow-x-auto no-scrollbar select-none">
                <button
                  v-for="catTab in quotaCategoryTabs"
                  :key="catTab.key"
                  type="button"
                  @click="handleCategoryTabClick(catTab.key)"
                  class="py-1.5 px-3 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0"
                  :class="[
                    quotaFilter.category === catTab.key
                      ? 'bg-[#1677ff] text-white font-medium shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                  ]"
                >
                  <span>{{ catTab.label }}</span>
                  <span
                    class="px-1.5 py-0.2 rounded-full text-[10px] font-mono"
                    :class="quotaFilter.category === catTab.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'"
                  >
                    {{ catTab.count }}
                  </span>
                </button>
              </div>

              <!-- 3. 动态属性检索筛选条 (根据工业/农业/通用自动自适应) -->
              <div class="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs space-y-2.5">
                <div class="flex flex-wrap items-center justify-between gap-2.5">
                  <div class="flex flex-wrap items-center gap-2">
                    
                    <!-- 工业专用筛选项 -->
                    <template v-if="quotaFilter.category === 'industry'">
                      <!-- 行业门类 -->
                      <div class="flex items-center gap-1 text-xs text-slate-600">
                        <span class="text-slate-400">门类:</span>
                        <div class="relative">
                          <select
                            v-model="quotaFilter.industryCategory"
                            @change="quotaCurrentPage = 1"
                            class="h-7 pl-2 pr-6 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#1677ff] appearance-none cursor-pointer"
                          >
                            <option value="全部">全部行业</option>
                            <option value="光伏制造">光伏制造</option>
                            <option value="锂电材料">锂电材料</option>
                            <option value="有色金属">有色金属</option>
                            <option value="黑色金属">黑色金属</option>
                            <option value="建材水泥">建材水泥</option>
                            <option value="食品轻工">食品轻工</option>
                            <option value="化工原料">化工原料</option>
                          </select>
                          <svg class="w-3.5 h-3.5 absolute right-1.5 top-2 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>

                      <!-- 定额等级 -->
                      <div class="flex items-center gap-1 text-xs text-slate-600">
                        <span class="text-slate-400">等级:</span>
                        <div class="relative">
                          <select
                            v-model="quotaFilter.efficiencyGrade"
                            @change="quotaCurrentPage = 1"
                            class="h-7 pl-2 pr-6 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#1677ff] appearance-none cursor-pointer"
                          >
                            <option value="全部">全部等级</option>
                            <option value="先进领跑者">先进领跑者</option>
                            <option value="地方通用">地方通用</option>
                          </select>
                          <svg class="w-3.5 h-3.5 absolute right-1.5 top-2 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                    </template>

                    <!-- 农业专用筛选项 -->
                    <template v-else-if="quotaFilter.category === 'agriculture'">
                      <!-- 灌溉方式 -->
                      <div class="flex items-center gap-1 text-xs text-slate-600">
                        <span class="text-slate-400">灌溉:</span>
                        <div class="relative">
                          <select
                            v-model="quotaFilter.method"
                            @change="quotaCurrentPage = 1"
                            class="h-7 pl-2 pr-6 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#1677ff] appearance-none cursor-pointer"
                          >
                            <option value="全部">全部方式</option>
                            <option value="常规灌溉">常规灌溉</option>
                            <option value="喷灌">喷灌</option>
                            <option value="微灌">微灌</option>
                            <option value="滴灌">滴灌</option>
                          </select>
                          <svg class="w-3.5 h-3.5 absolute right-1.5 top-2 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>

                      <!-- 效率值 -->
                      <div class="flex items-center gap-1 text-xs text-slate-600">
                        <span class="text-slate-400">效率:</span>
                        <div class="relative">
                          <select
                            v-model="quotaFilter.efficiency"
                            @change="quotaCurrentPage = 1"
                            class="h-7 pl-2 pr-6 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#1677ff] appearance-none cursor-pointer"
                          >
                            <option value="全部">全部效率</option>
                            <option value="50%">50%</option>
                            <option value="60%">60%</option>
                            <option value="70%">70%</option>
                          </select>
                          <svg class="w-3.5 h-3.5 absolute right-2 top-2 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>

                      <!-- 地貌分区 -->
                      <div class="flex items-center gap-1 text-xs text-slate-600">
                        <span class="text-slate-400">地貌:</span>
                        <div class="relative">
                          <select
                            v-model="quotaFilter.topography"
                            @change="quotaCurrentPage = 1"
                            class="h-7 pl-2 pr-6 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#1677ff] appearance-none cursor-pointer"
                          >
                            <option value="全部">全部地貌</option>
                            <option value="川水">川水</option>
                            <option value="浅山">浅山</option>
                            <option value="脑山">脑山</option>
                          </select>
                          <svg class="w-3.5 h-3.5 absolute right-1.5 top-2 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                    </template>

                  </div>

                  <!-- 关键词搜索输入框 -->
                  <div class="relative w-48">
                    <input
                      type="text"
                      v-model="quotaFilter.keyword"
                      @input="quotaCurrentPage = 1"
                      :placeholder="quotaFilter.category === 'industry' ? '搜索工业产品/材料...' : quotaFilter.category === 'agriculture' ? '搜索农作物/品种...' : '搜索产品名称或标准...'"
                      class="w-full h-7 pl-2.5 pr-7 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#1677ff] focus:bg-white transition"
                    />
                    <svg class="w-3.5 h-3.5 absolute right-2 top-1.5 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
              </div>



              <!-- 5. 定额标准卡片列表 (高保真工业/农业/生活规范卡片) -->
              <div class="space-y-2.5">
                <div class="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>共找到 <strong class="text-[#1677ff] font-semibold">{{ filteredQuotaList.length }}</strong> 条对应的标准定额</span>
                  <span v-if="currentProduct" class="text-[11px] text-blue-600">
                    高亮蓝框项为与左侧当前申报项精准匹配的标准
                  </span>
                </div>

                <div
                  v-for="item in displayedQuotaList"
                  :key="item.id"
                  class="rounded-xl border p-3.5 space-y-2.5 transition-all shadow-2xs"
                  :class="[
                    currentProduct && (item.productName.toLowerCase().includes(currentProduct.toLowerCase()) || currentProduct.toLowerCase().includes(item.productName.toLowerCase()))
                      ? 'bg-blue-50/30 border-[#1677ff] ring-1 ring-[#1677ff]/30'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  ]"
                >
                  <!-- 顶部标题与药丸标签组 -->
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex flex-wrap items-center gap-2">
                      <span class="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-50 text-[#1677ff] border border-blue-200">
                        <span class="text-slate-400 font-normal text-[10px]">行业编码:</span> {{ item.industryCode }}
                      </span>
                      <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        <span class="text-slate-400 font-normal text-[10px]">行业名称:</span> {{ item.industryName }}
                      </span>
                      <span class="font-bold text-slate-900 text-xs">
                        {{ item.productName }}
                      </span>
                      <span
                        v-if="currentProduct && (item.productName.toLowerCase().includes(currentProduct.toLowerCase()) || currentProduct.toLowerCase().includes(item.productName.toLowerCase()))"
                        class="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-[#1677ff] flex items-center gap-1"
                      >
                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        左侧申报匹配
                      </span>
                    </div>

                    <!-- 等级或技术标签 -->
                    <div class="flex items-center gap-1.5 shrink-0">
                      <span
                        v-if="item.waterEfficiencyGrade"
                        class="px-2 py-0.5 rounded-full text-[11px] font-medium"
                        :class="item.waterEfficiencyGrade.includes('领跑') || item.waterEfficiencyGrade.includes('先进') ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'"
                      >
                        {{ item.waterEfficiencyGrade }}
                      </span>
                      <span
                        v-if="item.efficiency"
                        class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px]"
                      >
                        效率: {{ item.efficiency }}
                      </span>
                      <span class="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200">
                        {{ item.standardDoc }}
                      </span>
                    </div>
                  </div>

                  <!-- 属性网格：单位用水定额参数 / 领跑者先进值 / 分区范围 -->
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div class="p-2 rounded-lg bg-blue-50/50 border border-blue-100">
                      <div class="text-blue-700 text-[11px] font-medium">用水定额参数</div>
                      <div class="text-[#1677ff] font-bold font-mono text-sm mt-0.5">{{ item.quotaParam }}</div>
                    </div>

                    <div v-if="item.advancedQuotaStr" class="p-2 rounded-lg bg-amber-50/50 border border-amber-100/80">
                      <div class="text-amber-700 text-[11px]">节水领跑者先进值</div>
                      <div class="text-amber-900 font-bold font-mono text-sm mt-0.5">{{ item.advancedQuotaStr }}</div>
                    </div>

                    <div v-else-if="item.method" class="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100/80">
                      <div class="text-emerald-700 text-[11px]">核定灌溉方式</div>
                      <div class="text-emerald-900 font-semibold text-xs mt-1">{{ item.method }}</div>
                    </div>

                    <div class="p-2 rounded-lg bg-slate-50/80 border border-slate-200">
                      <div class="text-slate-600 text-[11px] font-medium">分区范围</div>
                      <div class="text-slate-700 font-medium text-xs mt-1 truncate" :title="item.regionScope">{{ item.regionScope }}</div>
                    </div>
                  </div>

                  <!-- 详细参数行：生产工艺 / 非常规水替代 / 分区适用范围 -->
                  <div class="text-xs text-slate-500 space-y-1 bg-slate-50/50 rounded-lg p-2.5 border border-slate-100">
                    <div v-if="item.processType" class="flex items-start gap-1">
                      <span class="text-slate-400 shrink-0">生产工艺：</span>
                      <span class="text-slate-700">{{ item.processType }}</span>
                    </div>
                    <div v-if="item.unconvWaterReq" class="flex items-start gap-1">
                      <span class="text-slate-400 shrink-0">水源要求：</span>
                      <span class="text-slate-700 font-medium text-blue-700">{{ item.unconvWaterReq }}</span>
                    </div>
                    <div class="flex items-start gap-1">
                      <span class="text-slate-400 shrink-0">适用范围：</span>
                      <span class="text-slate-700">{{ item.regionScope }}</span>
                    </div>
                    <div v-if="item.notes" class="flex items-start gap-1">
                      <span class="text-slate-400 shrink-0">核定备注：</span>
                      <span class="text-slate-600">{{ item.notes }}</span>
                    </div>
                  </div>

                  <!-- 卡片底部操作栏：一键采用此定额 -->
                  <div class="flex items-center justify-between pt-1 border-t border-slate-100">
                    <span class="text-[11px] text-slate-400">
                      标准依据：青海省水利厅·西宁市水资源管理委员会
                    </span>
                    <button
                      type="button"
                      @click="handleApplyQuota(item, currentActiveRowIndex)"
                      class="py-1 px-3 rounded bg-blue-50 hover:bg-[#1677ff] text-[#1677ff] hover:text-white border border-blue-200 hover:border-[#1677ff] text-xs font-medium transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>选用填充至第 {{ currentActiveRowIndex + 1 }} 行 ({{ item.quotaParam }})</span>
                    </button>
                  </div>
                </div>

                <!-- 空状态 -->
                <div v-if="displayedQuotaList.length === 0" class="py-10 text-center space-y-2 bg-white rounded-xl border border-slate-200">
                  <svg class="w-8 h-8 text-slate-300 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <p class="text-slate-500 text-xs">未搜索到与“{{ quotaFilter.keyword || getCategoryName(quotaFilter.category) }}”匹配的定额标准</p>
                  <button
                    type="button"
                    @click="clearKeyword"
                    class="px-3 py-1 text-xs text-[#1677ff] hover:underline cursor-pointer"
                  >
                    查看该类全部定额
                  </button>
                </div>
              </div>

              <!-- 6. 底部翻页组件 -->
              <div class="flex items-center justify-between pt-1 text-xs text-slate-500 select-none">
                <span>第 {{ quotaCurrentPage }} / {{ quotaTotalPages }} 页 (共 {{ filteredQuotaList.length }} 项)</span>
                <div class="flex items-center gap-1.5">
                  <button
                    type="button"
                    :disabled="quotaCurrentPage === 1"
                    @click="quotaCurrentPage > 1 && quotaCurrentPage--"
                    class="w-7 h-7 rounded border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>

                  <button
                    v-for="page in quotaTotalPages"
                    :key="page"
                    type="button"
                    @click="quotaCurrentPage = page"
                    class="w-7 h-7 rounded border text-xs transition cursor-pointer flex items-center justify-center"
                    :class="quotaCurrentPage === page
                      ? 'border-[#1677ff] text-[#1677ff] bg-white font-semibold shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'"
                  >
                    {{ page }}
                  </button>

                  <button
                    type="button"
                    :disabled="quotaCurrentPage === quotaTotalPages"
                    @click="quotaCurrentPage < quotaTotalPages && quotaCurrentPage++"
                    class="w-7 h-7 rounded border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>

            </div>

            <!-- Tab 4: 业务流程 (竖向流程图，仅展示流程图) -->
            <div v-else-if="activeRightTab === 'business_process'" class="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs">
              <div class="max-w-md mx-auto py-2">
                <div
                  v-for="(node, nIdx) in businessProcessNodes"
                  :key="node.id"
                  class="relative flex items-start gap-4 pb-8 last:pb-2"
                >
                  <!-- 竖向流向连接线 -->
                  <div
                    v-if="nIdx !== businessProcessNodes.length - 1"
                    class="absolute left-5 top-10 bottom-0 w-0.5"
                    :class="node.status === 'completed' ? 'bg-[#1677ff]' : 'bg-slate-200'"
                  ></div>

                  <!-- 节点圆形指示器 (完成/当前/未流转) -->
                  <div
                    class="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs shadow-2xs transition"
                    :class="[
                      node.status === 'completed'
                        ? 'bg-emerald-500 text-white shadow-emerald-100'
                        : node.status === 'current'
                        ? 'bg-[#1677ff] text-white ring-4 ring-blue-100 shadow-blue-100 animate-pulse'
                        : 'bg-slate-50 border-2 border-slate-300 text-slate-400'
                    ]"
                  >
                    <svg v-if="node.status === 'completed'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span v-else>{{ node.id }}</span>
                  </div>

                  <!-- 节点流程信息卡片 -->
                  <div
                    class="flex-1 rounded-lg border p-3.5 shadow-2xs transition"
                    :class="[
                      node.status === 'current'
                        ? 'border-[#1677ff] ring-1 ring-blue-100 bg-blue-50/20'
                        : node.status === 'completed'
                        ? 'border-emerald-200 bg-emerald-50/10'
                        : 'border-slate-200 bg-white'
                    ]"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-slate-800">{{ node.shortName }}</span>
                        <span class="text-[11px] text-slate-400">（{{ node.name }}）</span>
                      </div>
                      <span
                        class="px-2 py-0.5 rounded text-[11px] font-medium"
                        :class="[
                          node.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : node.status === 'current'
                            ? 'bg-blue-50 text-[#1677ff] border border-blue-200'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        ]"
                      >
                        {{ node.statusText }}
                      </span>
                    </div>

                    <div v-if="nIdx !== businessProcessNodes.length - 1" class="pt-2 text-[11px] text-slate-400 flex items-center gap-1">
                      <svg class="w-3.5 h-3.5 text-[#1677ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </svg>
                      <span class="text-slate-500">流转至下一节点</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- 3. 全局底部操作栏 (右侧取消/驳回/审核气泡按钮) -->
      <div class="px-5 py-2.5 bg-white border-t border-slate-200/80 flex items-center justify-end shrink-0">
        <!-- 右侧操作按钮组 -->
        <div class="flex items-center gap-2.5">
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-2 rounded-md bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition cursor-pointer border border-slate-200 shadow-2xs"
          >
            取消
          </button>

          <button
            type="button"
            @click="handleReject"
            class="px-5 py-2 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs font-medium transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span>不同意 (驳回)</span>
          </button>

          <!-- 审核气泡弹窗 -->
          <t-popup
            trigger="click"
            placement="top-end"
            v-model:visible="auditPopupVisible"
          >
            <template #content>
              <div class="p-4 w-[380px] bg-white rounded-lg shadow-xl border border-slate-200 text-xs space-y-3 text-left">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div class="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
                    <span class="w-1.5 h-3 bg-[#1677ff] rounded-full"></span>
                    <span>填写审核意见</span>
                  </div>
                  <span class="text-[11px] text-[#1677ff] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono">
                    {{ form.year || 2026 }}年度计划
                  </span>
                </div>

                <!-- 审核核定结论 -->
                <div class="space-y-1.5">
                  <label class="text-slate-500 text-[11px] font-medium block">审核核定结论</label>
                  <div class="grid grid-cols-2 gap-2">
                    <label
                      class="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded border cursor-pointer transition text-xs select-none"
                      :class="auditDecision === 'approve' ? 'bg-blue-50 border-[#1677ff] text-[#1677ff] font-semibold ring-1 ring-blue-100' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'"
                    >
                      <input type="radio" value="approve" v-model="auditDecision" class="hidden" />
                      <span class="w-2 h-2 rounded-full" :class="auditDecision === 'approve' ? 'bg-[#1677ff]' : 'bg-slate-300'"></span>
                      <span>同意审核通过</span>
                    </label>
                    <label
                      class="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded border cursor-pointer transition text-xs select-none"
                      :class="auditDecision === 'reject' ? 'bg-rose-50 border-rose-500 text-rose-600 font-semibold ring-1 ring-rose-100' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'"
                    >
                      <input type="radio" value="reject" v-model="auditDecision" class="hidden" />
                      <span class="w-2 h-2 rounded-full" :class="auditDecision === 'reject' ? 'bg-rose-500' : 'bg-slate-300'"></span>
                      <span>不同意并驳回</span>
                    </label>
                  </div>
                </div>

                <!-- 常用快捷评语 -->
                <div class="space-y-1">
                  <label class="text-slate-500 text-[11px] font-medium block">快捷常用评语</label>
                  <div class="flex flex-wrap gap-1">
                    <button
                      type="button"
                      v-for="(phrase, pIdx) in quickAuditOpinions"
                      :key="pIdx"
                      @click="auditOpinion = phrase"
                      class="text-[10.5px] px-2 py-0.5 rounded bg-slate-50 hover:bg-blue-50 hover:text-[#1677ff] text-slate-600 border border-slate-200 transition text-left truncate max-w-full"
                      :title="phrase"
                    >
                      {{ phrase }}
                    </button>
                  </div>
                </div>

                <!-- 审核意见多行输入框 -->
                <div class="space-y-1">
                  <div class="flex items-center justify-between">
                    <label class="text-slate-500 text-[11px] font-medium">审核意见说明</label>
                    <span class="text-[10.5px] text-slate-400">必填</span>
                  </div>
                  <textarea
                    v-model="auditOpinion"
                    rows="3"
                    placeholder="请输入核定结论及审核意见..."
                    class="w-full p-2.5 bg-slate-50 border border-[#dce6f5] rounded-md text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:bg-white resize-none transition"
                  ></textarea>
                </div>

                <!-- 弹窗底部操作按钮：取消 与 确认审核 -->
                <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    @click="auditPopupVisible = false"
                    class="px-3 py-1.5 rounded bg-white hover:bg-slate-100 text-slate-600 text-xs border border-slate-200 transition cursor-pointer"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    @click="handleConfirmAuditFromPopup"
                    class="px-4 py-1.5 rounded bg-[#1677ff] hover:bg-blue-600 text-white font-medium text-xs shadow-2xs transition cursor-pointer flex items-center gap-1.5"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>确认审核</span>
                  </button>
                </div>
              </div>
            </template>

            <!-- 触发按钮：审核 -->
            <button
              type="button"
              class="px-6 py-2 rounded-md bg-[#1677ff] hover:bg-blue-600 text-white text-xs font-medium transition cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>审核</span>
            </button>
          </t-popup>
        </div>
      </div>
    </div>

    <!-- 填报说明弹窗 -->
    <t-dialog
      v-model:visible="quotaGuideModalVisible"
      header="用水定额填报与审核说明"
      width="560px"
      :footer="false"
    >
      <div class="p-3 text-xs text-slate-700 space-y-3">
        <div class="p-3 bg-blue-50/60 rounded-lg border border-blue-100 space-y-1">
          <div class="font-semibold text-[#1677ff] flex items-center gap-1.5">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>定额执行标准依据</span>
          </div>
          <p class="text-slate-600 leading-relaxed pl-5.5">
            依据青海省水利厅现行《青海省主要工业及农业用水定额标准》、《西宁市实行最严格水资源管理制度考核实施方案》，对辖区内重点用水户实施刚性定额约束管控。
          </p>
        </div>

        <div class="space-y-2">
          <h5 class="font-semibold text-slate-800">一、农作物与经济作物定额说明</h5>
          <p class="text-slate-600 leading-relaxed">
            1. <strong>灌溉方式划分：</strong>常规灌溉定额标准基准值按 50% 效率设定，采用喷灌、微灌、滴灌等高效节水灌溉技术时，相应定额核减 15%~30%。
          </p>
          <p class="text-slate-600 leading-relaxed">
            2. <strong>地貌与海拔修正：</strong>浅山、脑山、川水等不同分区由于降雨蒸发差异，定额区间按流域分区标准严格核验。
          </p>
        </div>

        <div class="space-y-2 pt-1 border-t border-slate-100">
          <h5 class="font-semibold text-slate-800">二、近三年用水计划比对规则</h5>
          <p class="text-slate-600 leading-relaxed">
            审批人员需根据申请主体近三年实际用水台账、历史结余指标及节水型载体创建情况，综合核定本年度水源结构配比。
          </p>
        </div>
      </div>
    </t-dialog>

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
              :alt="previewTitle"
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
          <p>检验依据：JJG 162-2019 《冷水水表检定规程》、西宁市水务局年度用水计划核定实施办法</p>
          <p>申报核验结论：符合青海省节约用水评价及取水许可刚性指标要求，附件材料有效合规。</p>
          <div class="pt-2 text-right text-gray-400 font-mono">西宁市水资源管理委员会办公室</div>
        </div>
      </div>
    </t-dialog>

    <!-- 工业用水定额大图智能检索与匹配（气泡弹窗浮窗模式） -->
    <t-dialog
      v-model:visible="quotaBubbleModalVisible"
      header="工业用水定额检索与智能匹配（气泡弹窗）"
      width="820px"
      :footer="false"
      top="7vh"
    >
      <div class="p-1 space-y-3">
        <!-- 弹窗说明与目标行提示 -->
        <div class="p-3 bg-gradient-to-r from-blue-50/90 to-sky-50/40 rounded-xl border border-blue-200 flex items-center justify-between gap-3 flex-wrap">
          <div class="space-y-0.5">
            <div class="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span>检索关键词：【{{ currentProduct || quotaFilter.keyword || '高纯多晶硅' }}】</span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#1677ff] text-white">
                匹配到 {{ matchedIndustrialQuotas.length }} 个定额标准
              </span>
            </div>
            <p class="text-[11px] text-slate-500">
              当前填报目标：左侧表单【工业用水第 <strong class="text-[#1677ff] font-mono">{{ currentActiveRowIndex + 1 }}</strong> 行】。点击下方任一定额卡片，即可自动填充至该行。
            </p>
          </div>
          <div class="relative w-64 shrink-0">
            <input
              type="text"
              v-model="quotaFilter.keyword"
              placeholder="输入产品名、行业名称或编码过滤..."
              class="w-full h-8 pl-7 pr-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
            />
            <svg class="w-3.5 h-3.5 absolute left-2 top-2.5 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <!-- 匹配定额卡片/表格展示 -->
        <div class="max-h-[58vh] overflow-y-auto space-y-2.5 custom-scrollbar pr-1">
          <div
            v-for="(qItem, qIdx) in matchedIndustrialQuotas"
            :key="qItem.id || qIdx"
            @click="handleApplyQuotaAndCloseBubble(qItem, currentActiveRowIndex)"
            class="p-3 bg-white rounded-xl border border-slate-200 hover:border-[#1677ff] hover:bg-blue-50/20 transition-all cursor-pointer shadow-2xs space-y-2.5 group relative"
          >
            <!-- 头部：行业编码、行业名称、产品名称 -->
            <div class="flex items-center justify-between gap-2 flex-wrap border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2 flex-wrap">
                <!-- 1. 行业编码 -->
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-50 text-[#1677ff] border border-blue-200">
                  <span class="text-slate-400 font-normal text-[10px]">行业编码:</span>
                  {{ qItem.industryCode }}
                </span>
                <!-- 2. 行业名称 -->
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  <span class="text-slate-400 font-normal text-[10px]">行业名称:</span>
                  {{ qItem.industryName }}
                </span>
                <!-- 3. 产品名称 -->
                <span class="font-bold text-xs text-slate-900 group-hover:text-[#1677ff] transition">
                  {{ qItem.productName }}
                </span>
              </div>

              <div class="flex items-center gap-1.5 shrink-0">
                <span
                  v-if="qItem.waterEfficiencyGrade"
                  class="px-2 py-0.5 rounded-full text-[10px] font-medium"
                  :class="qItem.waterEfficiencyGrade.includes('领跑') || qItem.waterEfficiencyGrade.includes('先进') ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'"
                >
                  {{ qItem.waterEfficiencyGrade }}
                </span>
                <span class="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200">
                  {{ qItem.standardDoc }}
                </span>
              </div>
            </div>

            <!-- 数值参数网格：用水定额参数 与 分区范围 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <!-- 4. 用水定额参数 -->
              <div class="flex items-center justify-between p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
                <div class="space-y-0.5">
                  <div class="text-[11px] text-blue-700 font-medium">用水定额参数</div>
                  <div class="text-[10px] text-slate-400 font-sans">地方标准通用/领跑指标</div>
                </div>
                <div class="font-mono font-bold text-base text-[#1677ff]">
                  {{ qItem.quotaParam }}
                </div>
              </div>

              <!-- 5. 分区范围 -->
              <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div class="space-y-0.5 truncate max-w-[260px]">
                  <div class="text-[11px] text-slate-600 font-medium">分区范围</div>
                  <div class="text-xs text-slate-700 truncate" :title="qItem.regionScope">
                    {{ qItem.regionScope }}
                  </div>
                </div>
                <div class="text-[10px] text-slate-500 font-mono shrink-0">
                  {{ qItem.waterRegion }}
                </div>
              </div>
            </div>

            <!-- 工艺与选用按钮 -->
            <div class="flex items-center justify-between pt-1 text-xs text-slate-500">
              <span class="truncate max-w-[460px] text-[11px]">
                生产工艺：{{ qItem.processType || '标准成熟工艺' }}
              </span>
              <button
                type="button"
                @click.stop="handleApplyQuotaAndCloseBubble(qItem, currentActiveRowIndex)"
                class="px-3 py-1.5 rounded-lg bg-[#1677ff] hover:bg-blue-700 text-white font-medium text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>选用填充到第 {{ currentActiveRowIndex + 1 }} 行</span>
              </button>
            </div>
          </div>
        </div>

        <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>提示：点击任意定额卡片可直接将数值填充至左侧表单对应行，并自动关闭气泡弹窗。</span>
          <button
            type="button"
            @click="quotaBubbleModalVisible = false"
            class="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer transition"
          >
            关闭
          </button>
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { WaterPlanRecord, FormQuotaData, MonthlySummaryRow } from '../../../types';
import WaterQuotaAuditForm, { type WaterCategoryKey } from './WaterQuotaAuditForm.vue';

const props = defineProps<{
  visible: boolean;
  record: WaterPlanRecord | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'submit-audit', updatedRecord: WaterPlanRecord): void;
}>();

// 右侧标签栏：仅保留“用水定额”和“业务流程”
const rightTabs = [
  { key: 'water_quota', label: '用水定额' },
  { key: 'business_process', label: '业务流程' },
];

const activeRightTab = ref<'water_quota' | 'business_process'>('water_quota');

// 左右表单与定额数据联动状态
const actualFormRef = ref<any>(null);
const planFormRef = ref<any>(null);
const currentCategory = ref<WaterCategoryKey>('industry');
const currentProduct = ref<string>('高纯多晶硅');
const currentActiveRowIndex = ref<number>(0);

const getCategoryName = (cat: WaterCategoryKey | 'all') => {
  switch (cat) {
    case 'industry': return '工业用水';
    case 'agriculture': return '农业用水';
    case 'living': return '生活用水';
    case 'livestock': return '牲畜饲养';
    case 'power': return '水力与火力发电';
    case 'service': return '现代服务业';
    case 'all': return '全部定额';
    default: return '用水定额';
  }
};

const auditOpinion = ref('经审查，该单位用水计划指标符合西宁市刚性约束管控方案与行业定额，予以审核通过。');

// 审核气泡弹窗状态与快捷评语
const auditPopupVisible = ref(false);
const auditDecision = ref<'approve' | 'reject'>('approve');
const quickAuditOpinions = [
  '经审查，用水计划指标符合西宁市刚性约束管控方案与行业定额，予以审核通过。',
  '指标测算合理规范，符合节约用水刚性约束指标要求，核定通过。',
  '水资源配置符合黄河流域刚性管控指标方案，同意下达年度计划指标。',
  '申报用水指标测算依据不足，请结合近三年实际取水台账重新核定后上报。'
];

// 业务流程流转节点（从提交到审核的每一个节点）
const businessProcessNodes = computed(() => {
  const currentRecord = props.record;
  const isApproved = currentRecord?.status === '审核通过';
  const isRejected = currentRecord?.status === '审核驳回';
  const isInAudit = !isApproved && !isRejected;

  return [
    {
      id: 1,
      shortName: '申报提交',
      name: '用水户计划填报与佐证材料提交',
      tag: '企业申报',
      tagColor: 'bg-blue-50 text-blue-600 border-blue-200',
      status: 'completed',
      statusText: '已提交',
      handler: form.value.contactPerson || '张工',
      handlerRole: '申报经办人',
      department: form.value.waterOwner || currentRecord?.unitName || '青海亚洲硅业高纯材料有限公司',
      time: '2026-01-10 09:30:18',
      duration: '历时 30 分钟',
      desc: `完成了${form.value.year || 2026}年度用水计划指标申报，填报了计划申请表、取水总结表，关联电子取水许可证（${form.value.permitNumber || 'B630121G2026-0055'}），并上传相关资质佐证材料。`,
      hasAttachments: true,
      resultText: `申报计划用水总量: ${(declaredMonthlyGrandTotal.value || 0).toFixed(2)} 万m³（其中地表水 ${(declaredMonthlySurfaceTotal.value || 0).toFixed(2)} 万m³，地下水 ${(declaredMonthlyGroundTotal.value || 0).toFixed(2)} 万m³，非常规水 ${(declaredMonthlyUnconvTotal.value || 0).toFixed(2)} 万m³）`
    },
    {
      id: 2,
      shortName: '窗口受理',
      name: '政务服务窗口初审与材料受理',
      tag: '行政初审',
      tagColor: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      status: 'completed',
      statusText: '初审受理通过',
      handler: '赵秀芬',
      handlerRole: '政务窗口受理专员 (工号: XN-042)',
      department: '西宁市政务服务中心水务局综合窗口',
      time: '2026-01-11 11:20:45',
      duration: '用时 1.2 工作日',
      desc: '对企业提交的取水许可电子证照有效性、取水申请表填写规范性及佐证材料完整度进行查验核验，材料齐全合规，符合受理条件。',
      hasAttachments: false,
      resultText: '正式受理（受理编号：XN-SL-20260111-008），业务流转至属地区县水务局现场复验。'
    },
    {
      id: 3,
      shortName: '现场核查',
      name: '属地区县水政水资源科现场核查与计量复验',
      tag: '现场核验',
      tagColor: 'bg-teal-50 text-teal-600 border-teal-200',
      status: 'completed',
      statusText: '现场核验通过',
      handler: '李文华',
      handlerRole: '现场核查组长 · 副科长',
      department: `${currentRecord?.district || '城东区'}水务局水政水资源科`,
      time: '2026-01-13 14:40:22',
      duration: '用时 2.0 工作日',
      desc: '赴取水现场实地核查计量设施运行工况，查验远传水表数采仪在线传输状态，校核历史取水台账，取水规模与申报口径吻合。',
      hasAttachments: false,
      resultText: '现场核验合格，超声波与电磁流量计运行正常，未发现私开旁通及超采行为。'
    },
    {
      id: 4,
      shortName: '定额比对',
      name: '水资源刚性约束智能比对与定额评审',
      tag: '定额合规',
      tagColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      status: 'completed',
      statusText: '定额核算合格',
      handler: '王明远',
      handlerRole: '市级节水工程师',
      department: '西宁市节约用水办公室',
      time: '2026-01-14 16:15:30',
      duration: '用时 1.0 工作日',
      desc: '对照青海省用水定额地方标准及黄河流域水资源刚性约束指标，利用模型算法比对行业先进定额值与非常规水源配置比例。',
      hasAttachments: false,
      resultText: '定额合规比对通过（综合节水评级：A级，工业非常规水配置率达标）。'
    },
    {
      id: 5,
      shortName: '指标审核',
      name: '市水务局水资源管理科审批审核',
      tag: '指标审核',
      tagColor: isInAudit ? 'bg-blue-50 text-[#1677ff] border-blue-300 font-semibold' : (isApproved ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'),
      status: isInAudit ? 'current' : 'completed',
      statusText: isInAudit ? '当前审核中' : (isApproved ? '审核通过' : '审核驳回'),
      handler: currentRecord?.auditor || '张建军 (审批主管)',
      handlerRole: '水资源核定主管 / 当前审批员',
      department: '西宁市水务局水资源管理科',
      time: isInAudit ? '办理中（当前节点）' : (currentRecord?.auditDate || '2026-01-16 10:30:00'),
      duration: isInAudit ? '当前待办节点' : '已完成',
      desc: isInAudit
        ? '正在通过本审核窗口对生活、工业、农业、牲畜、发电、服务业等各项用水定额进行逐项校核，核定地表水、地下水与非常规水源计划量，出具审核意见。'
        : `审核结论：${currentRecord?.auditOpinion || auditOpinion.value}`,
      hasAttachments: false,
      resultText: isInAudit
        ? '待确认审核下达'
        : (isApproved ? '已同意并通过核定指标' : '已驳回整改')
    },
    {
      id: 6,
      shortName: '批文下达',
      name: '年度计划用水批复下达与电子证照签发',
      tag: '批文送达',
      tagColor: 'bg-slate-100 text-slate-500 border-slate-200',
      status: isApproved ? 'completed' : 'pending',
      statusText: isApproved ? '已发文下达' : '待流转',
      handler: '发文归档中心 / 系统服务',
      handlerRole: '电子证照签章系统',
      department: '西宁市水务局综合行政发文办',
      time: isApproved ? currentRecord?.auditDate || '2026-01-16 10:35:00' : '待审批通过后触发',
      duration: '系统即时',
      desc: '生成正式带红色电子公章的《西宁市年度计划用水核定批复通知书》，通过青海政务服务网推送至企业端并同步至税务及水资源实时监控系统。',
      hasAttachments: false,
      resultText: isApproved ? '已生成红头盖章批复件，完成全流程闭环归档。' : '前置审批通过后自动触发签发流程。'
    }
  ];
});

// 弹窗确认审核逻辑
const handleConfirmAuditFromPopup = () => {
  if (!auditOpinion.value.trim()) {
    MessagePlugin.warning('请填写审核意见');
    return;
  }
  if (auditDecision.value === 'reject') {
    handleReject();
  } else {
    handleApprove();
  }
  auditPopupVisible.value = false;
};

// 近三年用水计划数据（展示地表水、地下水、非常规水四类指标参考）
const recentThreeYearsPlan = ref([
  { year: '2025', surfaceWater: '18.50', groundwater: '5.20', unconventionalWater: '4.30', total: '28.00' },
  { year: '2024', surfaceWater: '17.80', groundwater: '5.60', unconventionalWater: '3.80', total: '27.20' },
  { year: '2023', surfaceWater: '16.90', groundwater: '6.00', unconventionalWater: '3.20', total: '26.10' },
]);

// 填报说明弹窗
const quotaGuideModalVisible = ref(false);
const quotaBubbleModalVisible = ref(false);

// 用水定额卡片数据项接口
export interface QuotaCardItem {
  id: string;
  code: string;
  type: WaterCategoryKey;
  industryCode: string; // 行业编码 (如 C3824)
  industryName: string; // 行业名称 (如 光伏设备及元器件制造)
  cleanProductName: string; // 基础产品名称 (如 高纯多晶硅)
  category: string;
  productName: string; // 细分产品/标准定额项
  standardQuota: number;
  quotaUnit: string;
  quotaValue: string;
  quotaParam: string; // 用水定额参数 (如 12.00 m³/t)
  standardDoc: string;
  // 农业专用
  efficiency?: string;
  topography?: string;
  altitude?: string;
  method?: string;
  // 工业专用
  industryCategory?: string;
  advancedQuota?: number;
  advancedQuotaStr?: string;
  processType?: string;
  unconvWaterReq?: string;
  waterEfficiencyGrade?: string;
  // 通用
  waterRegion: string;
  regionScope: string; // 分区范围
  notes?: string;
}

// 用水定额筛选条件（支持行业门类、农业灌溉、关键字及分类联动）
const quotaFilter = reactive({
  category: 'industry' as WaterCategoryKey | 'all',
  industryCategory: '全部',
  efficiencyGrade: '全部',
  method: '全部',
  efficiency: '全部',
  topography: '全部',
  keyword: '高纯多晶硅',
});

// 当前激活页码与分页
const quotaCurrentPage = ref(1);
const quotaPageSize = 6;

// 用水定额全部基础数据（包含工业、农业、生活、畜牧、发电、服务业等地方标准；同一工业产品具备多档不同定额）
const allQuotaList = ref<QuotaCardItem[]>([
  // ==================== 1. 工业用水定额（一个产品有多个用水定额，全量具备5项核心数值） ====================
  // 【高纯多晶硅】多档定额
  {
    id: 'ind-1-1',
    code: 'GB/T 31435',
    type: 'industry',
    industryCode: 'C3824',
    industryName: '光伏设备及元器件制造',
    cleanProductName: '高纯多晶硅',
    category: '光伏材料制造',
    industryCategory: '光伏制造',
    productName: '高纯多晶硅 (先进领跑者指标)',
    standardQuota: 12.00,
    quotaUnit: 'm³/t',
    quotaValue: '≤12.00 m³/t',
    quotaParam: '12.00 m³/t',
    advancedQuota: 12.00,
    advancedQuotaStr: '12.00 m³/t',
    waterEfficiencyGrade: '先进领跑者',
    processType: '改良西门子法闭环循环还原+母液全蒸发',
    unconvWaterReq: '非常规水替代率 ≥35%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '西宁经济技术开发区(东川、南川、甘河工业园区)',
    notes: '优先配置再生水用于循环冷却系统补水'
  },
  {
    id: 'ind-1-2',
    code: 'DB63/T 1429',
    type: 'industry',
    industryCode: 'C3824',
    industryName: '光伏设备及元器件制造',
    cleanProductName: '高纯多晶硅',
    category: '光伏材料制造',
    industryCategory: '光伏制造',
    productName: '高纯多晶硅 (青海地方通用标准)',
    standardQuota: 14.50,
    quotaUnit: 'm³/t',
    quotaValue: '≤14.50 m³/t',
    quotaParam: '14.50 m³/t',
    advancedQuota: 12.00,
    advancedQuotaStr: '12.00 m³/t',
    waterEfficiencyGrade: '地方通用标准',
    processType: '常规氢化提纯闭环生产',
    unconvWaterReq: '非常规水替代率 ≥25%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '西宁市及海东市重点工业区',
    notes: '符合青海省节水评价基准指标'
  },
  {
    id: 'ind-1-3',
    code: 'GB/T 31435',
    type: 'industry',
    industryCode: 'C3824',
    industryName: '电子专用材料制造',
    cleanProductName: '高纯多晶硅',
    category: '电子级高纯材料',
    industryCategory: '电子材料',
    productName: '高纯多晶硅 (冷氢化全循环闭式法)',
    standardQuota: 13.20,
    quotaUnit: 'm³/t',
    quotaValue: '≤13.20 m³/t',
    quotaParam: '13.20 m³/t',
    advancedQuota: 11.50,
    advancedQuotaStr: '11.50 m³/t',
    waterEfficiencyGrade: '先进级',
    processType: '冷氢化高效低水耗闭路循环',
    unconvWaterReq: '冷却循环回用率 ≥98.5%',
    standardDoc: 'GB/T 31435-2023',
    waterRegion: '湟水流域',
    regionScope: '青海省各国家级高新技术产业园区',
    notes: '电子级多晶硅生产先进线执行此标准'
  },
  {
    id: 'ind-1-4',
    code: 'GB/T 18916.35',
    type: 'industry',
    industryCode: 'C3824',
    industryName: '光伏设备及元器件制造',
    cleanProductName: '高纯多晶硅',
    category: '光伏材料制造',
    industryCategory: '光伏制造',
    productName: '高纯多晶硅 (国家准入基准限额)',
    standardQuota: 16.00,
    quotaUnit: 'm³/t',
    quotaValue: '≤16.00 m³/t',
    quotaParam: '16.00 m³/t',
    advancedQuota: 13.00,
    advancedQuotaStr: '13.00 m³/t',
    waterEfficiencyGrade: '基准通用',
    processType: '常规西门子还原法',
    unconvWaterReq: '中水回用率 ≥80%',
    standardDoc: 'GB/T 18916.35-2021',
    waterRegion: '黄河流域青海段',
    regionScope: '黄河流域生态刚性管控重点区',
    notes: '既有装置技术改造上限指标'
  },

  // 【单晶硅棒】多档定额
  {
    id: 'ind-2-1',
    code: 'DB63/T 1429',
    type: 'industry',
    industryCode: 'C3824',
    industryName: '光伏设备及元器件制造',
    cleanProductName: '单晶硅棒',
    category: '光伏材料制造',
    industryCategory: '光伏制造',
    productName: '单晶硅棒 (先进领跑者指标)',
    standardQuota: 0.14,
    quotaUnit: 'm³/kg',
    quotaValue: '≤0.14 m³/kg',
    quotaParam: '0.14 m³/kg',
    advancedQuota: 0.14,
    advancedQuotaStr: '0.14 m³/kg',
    waterEfficiencyGrade: '先进领跑者',
    processType: '连续加料直拉单晶(CCZ)+微细切片工艺',
    unconvWaterReq: '切片冷却闭式回用率 ≥98%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '西宁经济技术开发区(南川工业园区)',
    notes: '切片废砂浆中水完全实现闭环再生利用'
  },
  {
    id: 'ind-2-2',
    code: 'DB63/T 1429',
    type: 'industry',
    industryCode: 'C3824',
    industryName: '光伏设备及元器件制造',
    cleanProductName: '单晶硅棒',
    category: '光伏材料制造',
    industryCategory: '光伏制造',
    productName: '单晶硅棒 (地方通用标准)',
    standardQuota: 0.18,
    quotaUnit: 'm³/kg',
    quotaValue: '≤0.18 m³/kg',
    quotaParam: '0.18 m³/kg',
    advancedQuota: 0.14,
    advancedQuotaStr: '0.14 m³/kg',
    waterEfficiencyGrade: '地方通用标准',
    processType: '常规直拉单晶法(CZ)+金刚线切片',
    unconvWaterReq: '中水回用率 ≥85%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '湟水流域西宁段工业集中区',
    notes: '通用规模化单晶制造企业基准核定依据'
  },
  {
    id: 'ind-2-3',
    code: 'DB63/T 1429',
    type: 'industry',
    industryCode: 'C3824',
    industryName: '光伏设备及元器件制造',
    cleanProductName: '单晶硅棒',
    category: '光伏材料制造',
    industryCategory: '光伏制造',
    productName: '单晶硅棒 (大尺寸N型超薄片)',
    standardQuota: 0.16,
    quotaUnit: 'm³/kg',
    quotaValue: '≤0.16 m³/kg',
    quotaParam: '0.16 m³/kg',
    advancedQuota: 0.13,
    advancedQuotaStr: '0.13 m³/kg',
    waterEfficiencyGrade: '先进级',
    processType: 'N型大尺寸210mm硅棒超细线切割',
    unconvWaterReq: '纯水浓水100%梯级回用',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '南川高新技术产业集聚区',
    notes: '210/182高规格硅片生产基准'
  },

  // 【太阳能电池片】多档定额
  {
    id: 'ind-3-1',
    code: 'DB63/T 1429',
    type: 'industry',
    industryCode: 'C3825',
    industryName: '光伏设备及元器件制造',
    cleanProductName: '太阳能电池片',
    category: '光伏电池制造',
    industryCategory: '光伏制造',
    productName: '太阳能电池片 (TOPCon高效双面电池)',
    standardQuota: 0.06,
    quotaUnit: 'm³/片',
    quotaValue: '≤0.06 m³/片',
    quotaParam: '0.06 m³/片',
    advancedQuota: 0.05,
    advancedQuotaStr: '0.05 m³/片',
    waterEfficiencyGrade: '先进领跑者',
    processType: 'TOPCon高效双面钝化接触工艺',
    unconvWaterReq: '纯水制备浓水回用率 ≥90%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '西宁经济技术开发区(南川工业园区)',
    notes: '酸洗洗涤水多级逆流漂洗回用'
  },
  {
    id: 'ind-3-2',
    code: 'DB63/T 1429',
    type: 'industry',
    industryCode: 'C3825',
    industryName: '光伏设备及元器件制造',
    cleanProductName: '太阳能电池片',
    category: '光伏电池制造',
    industryCategory: '光伏制造',
    productName: '太阳能电池片 (地方通用标准)',
    standardQuota: 0.08,
    quotaUnit: 'm³/片',
    quotaValue: '≤0.08 m³/片',
    quotaParam: '0.08 m³/片',
    advancedQuota: 0.06,
    advancedQuotaStr: '0.06 m³/片',
    waterEfficiencyGrade: '地方通用标准',
    processType: '常规PERC高效单晶电池线',
    unconvWaterReq: '纯水制备浓水回用率 ≥80%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '青海省全省各工业园区通用',
    notes: '地方规模化产线申报定额'
  },
  {
    id: 'ind-3-3',
    code: 'DB63/T 1429',
    type: 'industry',
    industryCode: 'C3825',
    industryName: '光伏设备及元器件制造',
    cleanProductName: '太阳能电池片',
    category: '光伏电池制造',
    industryCategory: '光伏制造',
    productName: '太阳能电池片 (HJT异质结超低水耗)',
    standardQuota: 0.05,
    quotaUnit: 'm³/片',
    quotaValue: '≤0.05 m³/片',
    quotaParam: '0.05 m³/片',
    advancedQuota: 0.045,
    advancedQuotaStr: '0.045 m³/片',
    waterEfficiencyGrade: '先进领跑者',
    processType: 'HJT异质结低温等离子沉积工艺',
    unconvWaterReq: '纯水闭路循环率 ≥95%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '东川工业园区、南川工业园区',
    notes: '下一代光伏电池低碳节水示范线'
  },

  // 【锂电池正极材料】多档定额
  {
    id: 'ind-4-1',
    code: 'DB63/T 1429',
    type: 'industry',
    industryCode: 'C3841',
    industryName: '锂离子电池材料制造',
    cleanProductName: '动力及储能锂电池材料',
    category: '锂电储能材料',
    industryCategory: '锂电材料',
    productName: '动力及储能锂电池材料 (先进标杆)',
    standardQuota: 6.80,
    quotaUnit: 'm³/t',
    quotaValue: '≤6.80 m³/t',
    quotaParam: '6.80 m³/t',
    advancedQuota: 6.80,
    advancedQuotaStr: '6.80 m³/t',
    waterEfficiencyGrade: '先进领跑者',
    processType: '高镍三元前驱体/磷酸铁锂共沉淀+MVR蒸发',
    unconvWaterReq: '洗涤母液蒸发中水全回用',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '西宁经济技术开发区(南川、东川园区)',
    notes: '洗涤母液蒸发冷凝液100%返洗'
  },
  {
    id: 'ind-4-2',
    code: 'DB63/T 1429',
    type: 'industry',
    industryCode: 'C3841',
    industryName: '锂离子电池材料制造',
    cleanProductName: '动力及储能锂电池材料',
    category: '锂电储能材料',
    industryCategory: '锂电材料',
    productName: '动力及储能锂电池材料 (地方通用标准)',
    standardQuota: 8.50,
    quotaUnit: 'm³/t',
    quotaValue: '≤8.50 m³/t',
    quotaParam: '8.50 m³/t',
    advancedQuota: 6.80,
    advancedQuotaStr: '6.80 m³/t',
    waterEfficiencyGrade: '地方通用标准',
    processType: '湿法合成母液回收工艺',
    unconvWaterReq: '非常规水使用率 ≥30%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '湟水流域工业区',
    notes: '正极材料规模化制造基础指标'
  },

  // 【重熔铝锭】多档定额
  {
    id: 'ind-5-1',
    code: 'GB/T 18916.14',
    type: 'industry',
    industryCode: 'C3216',
    industryName: '常用有色金属冶炼',
    cleanProductName: '重熔铝锭',
    category: '有色金属冶炼',
    industryCategory: '有色金属',
    productName: '重熔铝锭 (先进标杆指标)',
    standardQuota: 1.35,
    quotaUnit: 'm³/t',
    quotaValue: '≤1.35 m³/t',
    quotaParam: '1.35 m³/t',
    advancedQuota: 1.35,
    advancedQuotaStr: '1.35 m³/t',
    waterEfficiencyGrade: '先进领跑者',
    processType: '500kA及以上大型预焙电解槽+烟气干法净化',
    unconvWaterReq: '工业废水零直排',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '甘河工业园区',
    notes: '循环水排污水全量梯级利用'
  },
  {
    id: 'ind-5-2',
    code: 'GB/T 18916.14',
    type: 'industry',
    industryCode: 'C3216',
    industryName: '常用有色金属冶炼',
    cleanProductName: '重熔铝锭',
    category: '有色金属冶炼',
    industryCategory: '有色金属',
    productName: '重熔铝锭 (地方通用标准)',
    standardQuota: 1.80,
    quotaUnit: 'm³/t',
    quotaValue: '≤1.80 m³/t',
    quotaParam: '1.80 m³/t',
    advancedQuota: 1.35,
    advancedQuotaStr: '1.35 m³/t',
    waterEfficiencyGrade: '地方通用标准',
    processType: '常规大型电解铝及铸锭工艺',
    unconvWaterReq: '循环冷却水回用率 ≥96%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '湟水流域及黄河流域工业集中区',
    notes: '电解铝骨干企业核定标准'
  },

  // 【硅铁合金】多档定额
  {
    id: 'ind-6-1',
    code: 'DB63/T 1429',
    type: 'industry',
    industryCode: 'C3140',
    industryName: '铁合金冶炼',
    cleanProductName: '硅铁合金',
    category: '黑色金属合金',
    industryCategory: '黑色金属',
    productName: '硅铁合金 (先进标杆指标)',
    standardQuota: 1.60,
    quotaUnit: 'm³/t',
    quotaValue: '≤1.60 m³/t',
    quotaParam: '1.60 m³/t',
    advancedQuota: 1.60,
    advancedQuotaStr: '1.60 m³/t',
    waterEfficiencyGrade: '先进领跑者',
    processType: '全密闭矿热炉冶炼+余热闭路发电',
    unconvWaterReq: '密闭循环率 ≥99%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '大通北川工业园、甘河工业园区',
    notes: '高纯度硅铁绿色冶炼示范企业执行'
  },
  {
    id: 'ind-6-2',
    code: 'DB63/T 1429',
    type: 'industry',
    industryCode: 'C3140',
    industryName: '铁合金冶炼',
    cleanProductName: '硅铁合金',
    category: '黑色金属合金',
    industryCategory: '黑色金属',
    productName: '硅铁合金 (地方通用标准)',
    standardQuota: 2.20,
    quotaUnit: 'm³/t',
    quotaValue: '≤2.20 m³/t',
    quotaParam: '2.20 m³/t',
    advancedQuota: 1.60,
    advancedQuotaStr: '1.60 m³/t',
    waterEfficiencyGrade: '地方通用标准',
    processType: '常规半密闭矿热炉冶炼',
    unconvWaterReq: '冷却水闭路循环',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '青海省全省各铁合金冶炼企业',
    notes: '通用铁合金生产核定依据'
  },

  // 【通用硅酸盐水泥】多档定额
  {
    id: 'ind-7-1',
    code: 'GB/T 18916.8',
    type: 'industry',
    industryCode: 'C3011',
    industryName: '水泥制造',
    cleanProductName: '通用硅酸盐水泥',
    category: '非金属建材',
    industryCategory: '建材水泥',
    productName: '通用硅酸盐水泥 (先进标杆指标)',
    standardQuota: 0.38,
    quotaUnit: 'm³/t',
    quotaValue: '≤0.38 m³/t',
    quotaParam: '0.38 m³/t',
    advancedQuota: 0.38,
    advancedQuotaStr: '0.38 m³/t',
    waterEfficiencyGrade: '先进标杆',
    processType: '新型干法窑外分解+低温余热发电闭式循环',
    unconvWaterReq: '生产过程废水零外排',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '湟中区、大通县水泥集聚区',
    notes: '绿色矿山配套熟料线'
  },
  {
    id: 'ind-7-2',
    code: 'GB/T 18916.8',
    type: 'industry',
    industryCode: 'C3011',
    industryName: '水泥制造',
    cleanProductName: '通用硅酸盐水泥',
    category: '非金属建材',
    industryCategory: '建材水泥',
    productName: '通用硅酸盐水泥 (地方通用标准)',
    standardQuota: 0.45,
    quotaUnit: 'm³/t',
    quotaValue: '≤0.45 m³/t',
    quotaParam: '0.45 m³/t',
    advancedQuota: 0.38,
    advancedQuotaStr: '0.38 m³/t',
    waterEfficiencyGrade: '地方通用标准',
    processType: '常规干法窑水泥磨机工艺',
    unconvWaterReq: '降温水循环回用',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '青海省全省各水泥生产企业',
    notes: '全省水泥熟料生产通用限额'
  },

  // 【青稞原浆啤酒】多档定额
  {
    id: 'ind-8-1',
    code: 'GB/T 18916.2',
    type: 'industry',
    industryCode: 'C1512',
    industryName: '啤酒制造',
    cleanProductName: '青稞原浆啤酒',
    category: '食品饮料制造',
    industryCategory: '食品轻工',
    productName: '青稞原浆啤酒 (先进领跑者指标)',
    standardQuota: 3.20,
    quotaUnit: 'm³/kL',
    quotaValue: '≤3.20 m³/kL',
    quotaParam: '3.20 m³/kL',
    advancedQuota: 3.20,
    advancedQuotaStr: '3.20 m³/kL',
    waterEfficiencyGrade: '先进领跑者',
    processType: '高原精酿糖化冷萃发酵+CIP就地清洗水多级梯级回收',
    unconvWaterReq: '洗瓶冲洗水梯级回用率 ≥85%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '城北区生物科技产业园区',
    notes: '精品酿造产业节水示范'
  },
  {
    id: 'ind-8-2',
    code: 'GB/T 18916.2',
    type: 'industry',
    industryCode: 'C1512',
    industryName: '啤酒制造',
    cleanProductName: '青稞原浆啤酒',
    category: '食品饮料制造',
    industryCategory: '食品轻工',
    productName: '青稞原浆啤酒 (地方通用标准)',
    standardQuota: 3.80,
    quotaUnit: 'm³/kL',
    quotaValue: '≤3.80 m³/kL',
    quotaParam: '3.80 m³/kL',
    advancedQuota: 3.20,
    advancedQuotaStr: '3.20 m³/kL',
    waterEfficiencyGrade: '地方通用标准',
    processType: '常规啤酒糖化发酵及灌装',
    unconvWaterReq: '中水用于绿化厂区冲洗',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '湟水流域酿造产业集中区',
    notes: '青稞酒与啤酒酿造核算基础'
  },

  // 【烧碱】多档定额
  {
    id: 'ind-9-1',
    code: 'GB/T 18916.17',
    type: 'industry',
    industryCode: 'C2612',
    industryName: '无机碱制造',
    cleanProductName: '烧碱',
    category: '化学原料制造',
    industryCategory: '化工原料',
    productName: '烧碱 (先进标杆指标)',
    standardQuota: 3.90,
    quotaUnit: 'm³/t',
    quotaValue: '≤3.90 m³/t',
    quotaParam: '3.90 m³/t',
    advancedQuota: 3.90,
    advancedQuotaStr: '3.90 m³/t',
    waterEfficiencyGrade: '先进标杆',
    processType: '零极距高电流密度离子膜电解+蒸汽冷凝液全封闭回用',
    unconvWaterReq: '冷凝水回用率 ≥98%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '甘河工业园区',
    notes: '盐化工高水效标杆项目'
  },
  {
    id: 'ind-9-2',
    code: 'GB/T 18916.17',
    type: 'industry',
    industryCode: 'C2612',
    industryName: '无机碱制造',
    cleanProductName: '烧碱',
    category: '化学原料制造',
    industryCategory: '化工原料',
    productName: '烧碱 (地方通用标准)',
    standardQuota: 4.80,
    quotaUnit: 'm³/t',
    quotaValue: '≤4.80 m³/t',
    quotaParam: '4.80 m³/t',
    advancedQuota: 3.90,
    advancedQuotaStr: '3.90 m³/t',
    waterEfficiencyGrade: '地方通用标准',
    processType: '标准复极离子膜法电解',
    unconvWaterReq: '生产中水梯级利用',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '青海省各化工园区通用',
    notes: '基础化工品行业准入基准'
  },

  // 【特殊钢及合金线材】
  {
    id: 'ind-10-1',
    code: 'GB/T 18916.3',
    type: 'industry',
    industryCode: 'C3120',
    industryName: '钢压延加工',
    cleanProductName: '特殊钢及合金线材',
    category: '特种钢压延',
    industryCategory: '黑色金属',
    productName: '特殊钢及合金线材 (先进领跑者)',
    standardQuota: 2.10,
    quotaUnit: 'm³/t',
    quotaValue: '≤2.10 m³/t',
    quotaParam: '2.10 m³/t',
    advancedQuota: 2.10,
    advancedQuotaStr: '2.10 m³/t',
    waterEfficiencyGrade: '先进领跑者',
    processType: '超高功率电炉短流程+全连铸连轧微水冷',
    unconvWaterReq: '浊环水沉淀过滤闭路循环',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '南川工业园区、城北区特钢基地',
    notes: '特种合金钢高品质生产线'
  },
  {
    id: 'ind-10-2',
    code: 'GB/T 18916.3',
    type: 'industry',
    industryCode: 'C3120',
    industryName: '钢压延加工',
    cleanProductName: '特殊钢及合金线材',
    category: '特种钢压延',
    industryCategory: '黑色金属',
    productName: '特殊钢及合金线材 (地方通用标准)',
    standardQuota: 2.80,
    quotaUnit: 'm³/t',
    quotaValue: '≤2.80 m³/t',
    quotaParam: '2.80 m³/t',
    advancedQuota: 2.10,
    advancedQuotaStr: '2.10 m³/t',
    waterEfficiencyGrade: '地方通用标准',
    processType: '电炉炼钢及棒线材热轧工艺',
    unconvWaterReq: '冷却循环水率 ≥97%',
    standardDoc: 'DB63/T 1429-2025',
    waterRegion: '湟水流域',
    regionScope: '青海省全省各特钢企业',
    notes: '通用钢铁压延基准定额'
  },

  // ==================== 2. 农业用水定额 (DB63/T 1428-2025) ====================
  {
    id: 'agr-1',
    code: 'DB63/T 1428',
    type: 'agriculture',
    industryCode: 'A0111',
    industryName: '谷物种植业',
    cleanProductName: '小麦',
    category: '粮食作物种植',
    productName: '小麦 (常规灌溉-浅山高海拔)',
    standardQuota: 280,
    quotaUnit: 'm³/亩·次',
    quotaValue: '≤280 m³/亩·次',
    quotaParam: '280 m³/亩·次',
    method: '常规灌溉',
    efficiency: '50%',
    topography: '浅山',
    altitude: '高',
    standardDoc: 'DB63/T 1428-2025',
    waterRegion: '湟水流域',
    regionScope: '湟源、西宁、大通、湟中、互助、平安、乐都、民和(川口地区)',
  },
  {
    id: 'agr-2',
    code: 'DB63/T 1428',
    type: 'agriculture',
    industryCode: 'A0111',
    industryName: '谷物种植业',
    cleanProductName: '小麦',
    category: '粮食作物种植',
    productName: '小麦 (喷灌节水-川水中海拔)',
    standardQuota: 210,
    quotaUnit: 'm³/亩·次',
    quotaValue: '≤210 m³/亩·次',
    quotaParam: '210 m³/亩·次',
    method: '喷灌',
    efficiency: '60%',
    topography: '川水',
    altitude: '中',
    standardDoc: 'DB63/T 1428-2025',
    waterRegion: '湟水流域',
    regionScope: '西宁、湟中、大通川水灌区',
  },
  {
    id: 'agr-3',
    code: 'DB63/T 1428',
    type: 'agriculture',
    industryCode: 'A0111',
    industryName: '谷物种植业',
    cleanProductName: '冬小麦',
    category: '粮食作物种植',
    productName: '冬小麦 (常规灌溉-川水中海拔)',
    standardQuota: 260,
    quotaUnit: 'm³/亩·次',
    quotaValue: '≤260 m³/亩·次',
    quotaParam: '260 m³/亩·次',
    method: '常规灌溉',
    efficiency: '50%',
    topography: '川水',
    altitude: '中',
    standardDoc: 'DB63/T 1428-2025',
    waterRegion: '湟水流域',
    regionScope: '西宁、大通、湟中、互助、平安',
  },
  {
    id: 'agr-4',
    code: 'DB63/T 1428',
    type: 'agriculture',
    industryCode: 'A0119',
    industryName: '杂粮种植业',
    cleanProductName: '高原青稞',
    category: '杂粮作物种植',
    productName: '高原青稞 (喷灌节水-浅山高海拔)',
    standardQuota: 190,
    quotaUnit: 'm³/亩·次',
    quotaValue: '≤190 m³/亩·次',
    quotaParam: '190 m³/亩·次',
    method: '喷灌',
    efficiency: '60%',
    topography: '浅山',
    altitude: '高',
    standardDoc: 'DB63/T 1428-2025',
    waterRegion: '玛曲龙羊峡',
    regionScope: '湟源、大通、湟中、海晏高寒片区',
  },
  {
    id: 'agr-5',
    code: 'DB63/T 1428',
    type: 'agriculture',
    industryCode: 'A0141',
    industryName: '油料种植业',
    cleanProductName: '春油菜',
    category: '油料作物种植',
    productName: '春油菜 (微灌节水-浅山中海拔)',
    standardQuota: 175,
    quotaUnit: 'm³/亩·次',
    quotaValue: '≤175 m³/亩·次',
    quotaParam: '175 m³/亩·次',
    method: '微灌',
    efficiency: '70%',
    topography: '浅山',
    altitude: '中',
    standardDoc: 'DB63/T 1428-2025',
    waterRegion: '湟水流域',
    regionScope: '大通、湟中、门源浅山农业带',
  },
  {
    id: 'agr-6',
    code: 'DB63/T 1428',
    type: 'agriculture',
    industryCode: 'A0121',
    industryName: '蔬菜种植业',
    cleanProductName: '温室蔬菜',
    category: '设施蔬菜种植',
    productName: '温室蔬菜 (水肥一体化高效滴灌)',
    standardQuota: 140,
    quotaUnit: 'm³/亩·次',
    quotaValue: '≤140 m³/亩·次',
    quotaParam: '140 m³/亩·次',
    method: '滴灌',
    efficiency: '70%',
    topography: '川水',
    altitude: '中',
    standardDoc: 'DB63/T 1428-2025',
    waterRegion: '湟水流域',
    regionScope: '城北区莫家泉湾、湟中多巴设施农业园区',
  },
  {
    id: 'agr-7',
    code: 'DB63/T 1428',
    type: 'agriculture',
    industryCode: 'A0131',
    industryName: '薯类种植业',
    cleanProductName: '优质马铃薯',
    category: '薯类作物种植',
    productName: '优质马铃薯 (节水喷灌-脑山高海拔)',
    standardQuota: 180,
    quotaUnit: 'm³/亩·次',
    quotaValue: '≤180 m³/亩·次',
    quotaParam: '180 m³/亩·次',
    method: '喷灌',
    efficiency: '60%',
    topography: '脑山',
    altitude: '高',
    standardDoc: 'DB63/T 1428-2025',
    waterRegion: '湟水流域',
    regionScope: '大通县、湟中区脑山片区',
  },
  {
    id: 'agr-8',
    code: 'DB63/T 1428',
    type: 'agriculture',
    industryCode: 'A0171',
    industryName: '中药材种植业',
    cleanProductName: '高原枸杞',
    category: '经济林果种植',
    productName: '高原枸杞 (水肥一体滴灌)',
    standardQuota: 150,
    quotaUnit: 'm³/亩·次',
    quotaValue: '≤150 m³/亩·次',
    quotaParam: '150 m³/亩·次',
    method: '滴灌',
    efficiency: '70%',
    topography: '川水',
    altitude: '中',
    standardDoc: 'DB63/T 1428-2025',
    waterRegion: '柴达木盆地',
    regionScope: '都兰、德令哈、格尔木绿洲农区',
  },

  // ==================== 3. 生活用水定额 (DB63/T 1430-2025) ====================
  {
    id: 'liv-1',
    code: 'DB63/T 1430',
    type: 'living',
    industryCode: 'O8111',
    industryName: '公共服务与居民服务',
    cleanProductName: '城镇居民生活用水',
    category: '城镇生活',
    productName: '城镇居民生活用水 (西宁市区基准指标)',
    standardQuota: 120,
    quotaUnit: 'L/(人·d)',
    quotaValue: '≤120 L/(人·d)',
    quotaParam: '120 L/(人·d)',
    standardDoc: 'DB63/T 1430-2025',
    waterRegion: '西宁市区',
    regionScope: '城中区、城西区、城东区、城北区建成区',
  },
  {
    id: 'liv-2',
    code: 'DB63/T 1430',
    type: 'living',
    industryCode: 'O8111',
    industryName: '公共服务与居民服务',
    cleanProductName: '农村居民生活用水',
    category: '农村生活',
    productName: '农村居民生活用水 (三县乡村自来水管网)',
    standardQuota: 85,
    quotaUnit: 'L/(人·d)',
    quotaValue: '≤85 L/(人·d)',
    quotaParam: '85 L/(人·d)',
    standardDoc: 'DB63/T 1430-2025',
    waterRegion: '湟水流域',
    regionScope: '湟中区、大通县、湟源县村镇管网覆盖区',
  },

  // ==================== 4. 牲畜饲养定额 (DB63/T 1431-2025) ====================
  {
    id: 'stk-1',
    code: 'DB63/T 1431',
    type: 'livestock',
    industryCode: 'A0311',
    industryName: '牛饲养业',
    cleanProductName: '肉牛/奶牛舍饲',
    category: '规模化畜禽养殖',
    productName: '肉牛/奶牛舍饲 (自动化饮水及冲栏)',
    standardQuota: 65,
    quotaUnit: 'L/(头·d)',
    quotaValue: '≤65 L/(头·d)',
    quotaParam: '65 L/(头·d)',
    standardDoc: 'DB63/T 1431-2025',
    waterRegion: '湟水流域',
    regionScope: '湟源县、大通县现代畜牧养殖示范园区',
  },
  {
    id: 'stk-2',
    code: 'DB63/T 1431',
    type: 'livestock',
    industryCode: 'A0321',
    industryName: '生猪饲养业',
    cleanProductName: '生猪育肥期饲养',
    category: '生猪规模养殖',
    productName: '生猪育肥期饲养 (节水式鸭嘴饮水系统)',
    standardQuota: 30,
    quotaUnit: 'L/(头·d)',
    quotaValue: '≤30 L/(头·d)',
    quotaParam: '30 L/(头·d)',
    standardDoc: 'DB63/T 1431-2025',
    waterRegion: '湟水流域',
    regionScope: '湟中区规模化生猪养殖场',
  },

  // ==================== 5. 水力与火力发电 (GB/T 18916.1) ====================
  {
    id: 'pow-1',
    code: 'GB/T 18916.1',
    type: 'power',
    industryCode: 'D4411',
    industryName: '火力发电',
    cleanProductName: '燃煤热电联产机组',
    category: '火力发电',
    productName: '燃煤热电联产机组 (空冷高效发电机组)',
    standardQuota: 0.85,
    quotaUnit: 'm³/MWh',
    quotaValue: '≤0.85 m³/MWh',
    quotaParam: '0.85 m³/MWh',
    standardDoc: 'GB/T 18916.1-2021',
    waterRegion: '湟水流域',
    regionScope: '大通电厂、桥头电厂及其周边工业集聚区',
  },

  // ==================== 6. 现代服务业 (DB63/T 1432-2025) ====================
  {
    id: 'ser-1',
    code: 'DB63/T 1432',
    type: 'service',
    industryCode: 'H6110',
    industryName: '住宿业',
    cleanProductName: '星级宾馆饭店',
    category: '商务服务',
    productName: '星级宾馆饭店 (涉外高档酒店定额)',
    standardQuota: 180,
    quotaUnit: 'L/(床位·d)',
    quotaValue: '≤180 L/(床位·d)',
    quotaParam: '180 L/(床位·d)',
    standardDoc: 'DB63/T 1432-2025',
    waterRegion: '西宁市区',
    regionScope: '城西区、城东区涉外星级酒店及接待中心',
  },
  {
    id: 'ser-2',
    code: 'DB63/T 1432',
    type: 'service',
    industryCode: 'P8231',
    industryName: '普通高等教育',
    cleanProductName: '大中专院校综合用水',
    category: '科教文卫',
    productName: '大中专院校综合用水 (教学科研及学生生活)',
    standardQuota: 95,
    quotaUnit: 'L/(生·d)',
    quotaValue: '≤95 L/(生·d)',
    quotaParam: '95 L/(生·d)',
    standardDoc: 'DB63/T 1432-2025',
    waterRegion: '西宁市区',
    regionScope: '大学城片区(青海大学、师范大学、青海民族大学等)',
  },
]);

// 顶部定额分类选项卡（统计各类条数）
const quotaCategoryTabs = computed(() => {
  const counts: Record<string, number> = {
    all: allQuotaList.value.length,
    industry: allQuotaList.value.filter((q) => q.type === 'industry').length,
    agriculture: allQuotaList.value.filter((q) => q.type === 'agriculture').length,
    living: allQuotaList.value.filter((q) => q.type === 'living').length,
    livestock: allQuotaList.value.filter((q) => q.type === 'livestock').length,
    power: allQuotaList.value.filter((q) => q.type === 'power').length,
    service: allQuotaList.value.filter((q) => q.type === 'service').length,
  };
  return [
    { key: 'industry' as const, label: '工业用水定额', count: counts.industry },
    { key: 'agriculture' as const, label: '农业用水定额', count: counts.agriculture },
    { key: 'living' as const, label: '生活用水定额', count: counts.living },
    { key: 'livestock' as const, label: '牲畜饲养定额', count: counts.livestock },
    { key: 'power' as const, label: '发电用水定额', count: counts.power },
    { key: 'service' as const, label: '现代服务业', count: counts.service },
    { key: 'all' as const, label: '全部定额', count: counts.all },
  ];
});

// 根据分类及条件计算出的定额列表
const filteredQuotaList = computed(() => {
  return allQuotaList.value.filter((item) => {
    // 1. 类型筛选
    if (quotaFilter.category !== 'all' && item.type !== quotaFilter.category) {
      return false;
    }
    // 2. 工业专用筛选
    if (quotaFilter.category === 'industry' || item.type === 'industry') {
      if (quotaFilter.industryCategory !== '全部' && item.industryCategory !== quotaFilter.industryCategory) {
        return false;
      }
      if (quotaFilter.efficiencyGrade !== '全部' && item.waterEfficiencyGrade !== quotaFilter.efficiencyGrade) {
        return false;
      }
    }
    // 3. 农业专用筛选
    if (quotaFilter.category === 'agriculture' || item.type === 'agriculture') {
      if (quotaFilter.method !== '全部' && item.method !== quotaFilter.method) {
        return false;
      }
      if (quotaFilter.efficiency !== '全部' && item.efficiency && item.efficiency !== quotaFilter.efficiency) {
        return false;
      }
      if (quotaFilter.topography !== '全部' && item.topography && item.topography !== quotaFilter.topography) {
        return false;
      }
    }
    // 4. 关键字筛选（匹配产品名、分类、标准号、行业类别、分区范围）
    if (quotaFilter.keyword && quotaFilter.keyword.trim()) {
      const kw = quotaFilter.keyword.trim().toLowerCase();
      const match =
        (item.productName && item.productName.toLowerCase().includes(kw)) ||
        (item.category && item.category.toLowerCase().includes(kw)) ||
        (item.code && item.code.toLowerCase().includes(kw)) ||
        (item.industryCategory && item.industryCategory.toLowerCase().includes(kw)) ||
        (item.standardDoc && item.standardDoc.toLowerCase().includes(kw)) ||
        (item.waterRegion && item.waterRegion.toLowerCase().includes(kw)) ||
        (item.regionScope && item.regionScope.toLowerCase().includes(kw));
      if (!match) return false;
    }
    return true;
  });
});

// 分页总数
const quotaTotalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredQuotaList.value.length / quotaPageSize));
});

// 分页后的展示数据
const displayedQuotaList = computed(() => {
  const start = (quotaCurrentPage.value - 1) * quotaPageSize;
  return filteredQuotaList.value.slice(start, start + quotaPageSize);
});

// 切换定额分类
const handleCategoryTabClick = (catKey: WaterCategoryKey | 'all') => {
  quotaFilter.category = catKey;
  quotaCurrentPage.value = 1;
  if (catKey !== 'all') {
    currentCategory.value = catKey;
    const targetFormRef = activeFormTab.value === 'actual' ? actualFormRef.value : planFormRef.value;
    if (targetFormRef && typeof targetFormRef.selectCategory === 'function') {
      targetFormRef.selectCategory(catKey);
    }
    if (catKey === 'industry') {
      quotaFilter.keyword = currentProduct.value || '高纯多晶硅';
    } else if (catKey === 'agriculture') {
      quotaFilter.keyword = '小麦';
    } else {
      quotaFilter.keyword = '';
    }
  } else {
    quotaFilter.keyword = '';
  }
};

// 清空当前筛选词，查看该类型全部
const clearKeyword = () => {
  quotaFilter.keyword = '';
  quotaFilter.industryCategory = '全部';
  quotaFilter.efficiencyGrade = '全部';
  quotaFilter.method = '全部';
  quotaFilter.efficiency = '全部';
  quotaFilter.topography = '全部';
  quotaCurrentPage.value = 1;
};

// 左侧表单分类改变时，右侧定额面板同步切换
const handleCategoryChanged = (cat: WaterCategoryKey) => {
  currentCategory.value = cat;
  quotaFilter.category = cat;
  activeRightTab.value = 'water_quota';
  quotaCurrentPage.value = 1;
  if (cat === 'industry') {
    quotaFilter.keyword = currentProduct.value || '高纯多晶硅';
  } else if (cat === 'agriculture') {
    quotaFilter.keyword = '小麦';
  } else if (cat === 'living') {
    quotaFilter.keyword = '生活';
  } else if (cat === 'livestock') {
    quotaFilter.keyword = '牛';
  } else if (cat === 'power') {
    quotaFilter.keyword = '发电';
  } else if (cat === 'service') {
    quotaFilter.keyword = '服务';
  }
};

// 左侧表单选择产品/作物时，右侧定额面板联动搜索并高亮对应条目
const handleProductSelected = (payload: { category: WaterCategoryKey; productName: string; rowIndex: number; row: any }) => {
  currentCategory.value = payload.category;
  quotaFilter.category = payload.category;
  currentProduct.value = payload.productName || '';
  currentActiveRowIndex.value = payload.rowIndex ?? 0;
  quotaFilter.keyword = payload.productName || '';
  activeRightTab.value = 'water_quota';
  quotaCurrentPage.value = 1;
};

// 弹窗中针对当前激活产品或搜索词智能匹配出的工业用水定额列表（一个产品对应多个定额）
const matchedIndustrialQuotas = computed(() => {
  const kw = (quotaFilter.keyword || currentProduct.value || '').trim().toLowerCase();
  const industrialItems = allQuotaList.value.filter((q) => q.type === 'industry');
  if (!kw) {
    return industrialItems;
  }
  const matched = industrialItems.filter(
    (item) =>
      (item.cleanProductName && item.cleanProductName.toLowerCase().includes(kw)) ||
      (item.productName && item.productName.toLowerCase().includes(kw)) ||
      (item.category && item.category.toLowerCase().includes(kw)) ||
      (item.industryCode && item.industryCode.toLowerCase().includes(kw)) ||
      (item.industryName && item.industryName.toLowerCase().includes(kw)) ||
      (item.regionScope && item.regionScope.toLowerCase().includes(kw))
  );
  return matched.length > 0 ? matched : industrialItems;
});

// 打开定额气泡弹窗
const handleOpenQuotaBubble = (payload?: { productName?: string; rowIndex?: number; category?: WaterCategoryKey }) => {
  if (payload) {
    if (payload.category) {
      currentCategory.value = payload.category;
      quotaFilter.category = payload.category;
    }
    if (payload.productName) {
      currentProduct.value = payload.productName;
      quotaFilter.keyword = payload.productName;
    }
    if (typeof payload.rowIndex === 'number') {
      currentActiveRowIndex.value = payload.rowIndex;
    }
  }
  quotaBubbleModalVisible.value = true;
};

// 右侧定额或弹窗定额一键回填到左侧表单指定行
const handleApplyQuota = (item: QuotaCardItem, targetRowIndex?: number) => {
  const rowIdx = typeof targetRowIndex === 'number' ? targetRowIndex : currentActiveRowIndex.value;
  const targetFormRef = activeFormTab.value === 'actual' ? actualFormRef.value : planFormRef.value;
  if (targetFormRef && typeof targetFormRef.applyQuotaToActiveRow === 'function') {
    targetFormRef.applyQuotaToActiveRow({
      category: item.type,
      productName: item.cleanProductName || item.productName,
      quota: item.standardQuota,
      method: item.method,
      rowIndex: rowIdx,
      quotaParam: item.quotaParam,
      industryCode: item.industryCode,
      industryName: item.industryName,
      regionScope: item.regionScope
    });
    MessagePlugin.success(`已选用【${item.productName}】定额 (${item.quotaParam}) 并填充至第 ${(rowIdx ?? 0) + 1} 行工业定额！`);
  } else {
    // 兼容回退
    const targetForm = activeFormTab.value === 'actual' ? actualQuotaForm.value : planQuotaForm.value;
    if (item.type === 'industry' && targetForm.industryWaterRows?.length) {
      const idx = rowIdx >= 0 && rowIdx < targetForm.industryWaterRows.length ? rowIdx : 0;
      targetForm.industryWaterRows[idx].productName = item.cleanProductName || item.productName;
      targetForm.industryWaterRows[idx].quota = item.standardQuota;
    } else if (item.type === 'agriculture' && targetForm.agricultureWaterRows?.length) {
      const idx = rowIdx >= 0 && rowIdx < targetForm.agricultureWaterRows.length ? rowIdx : 0;
      targetForm.agricultureWaterRows[idx].crops = item.cleanProductName || item.productName;
      targetForm.agricultureWaterRows[idx].quota = item.standardQuota;
      if (item.method) {
        targetForm.agricultureWaterRows[idx].method = item.method;
      }
    }
    MessagePlugin.success(`已将【${item.productName}】核定标准 (${item.quotaValue}) 快捷填入左侧申报表格！`);
  }
};

// 气泡弹窗中选择定额并关闭弹窗
const handleApplyQuotaAndCloseBubble = (item: QuotaCardItem, targetRowIndex?: number) => {
  handleApplyQuota(item, targetRowIndex);
  quotaBubbleModalVisible.value = false;
};

// 附件列表与在线预览 (与计量设施档案列表查看一致)
const attachments = ref([
  { name: '2026年度用水计划申请核定申报书(盖章扫描件).pdf', type: 'pdf', size: '3.2 MB' },
  { name: '青海亚洲硅业水平衡测试与节水评价报告.docx', type: 'word', size: '5.8 MB' },
  { name: '进水口DN150超声波水表铭牌与现场工况照片.jpg', type: 'image', size: '1.9 MB' },
  { name: '西宁市水资源刚性约束管控落实承诺书(签署版).pdf', type: 'pdf', size: '2.1 MB' },
]);

const previewVisible = ref(false);
const previewTitle = ref('');
const previewType = ref<'image' | 'pdf'>('image');

const openPreview = (att: { name: string; type: string }) => {
  previewTitle.value = att.name;
  previewType.value = (att.type === 'pdf' ? 'pdf' : 'image') as 'image' | 'pdf';
  previewVisible.value = true;
};

const downloadAttachment = (att: { name: string }) => {
  MessagePlugin.success(`已开始下载附件：${att.name}`);
};

// 视图模式与双表单切换
const formsViewMode = ref<'tab' | 'stacked'>('tab');
const activeFormTab = ref<'actual' | 'plan'>('actual');

// 可编辑表单核心数据模型（基础信息）
const form = ref({
  waterOwner: '青海亚洲硅业高纯材料有限公司',
  permitNumber: 'B630121G2026-0055',
  permitVolume: 2345.87,
  contactPerson: '张工',
  contactPhone: '13897216688',
  postalCode: '810000',
  email: 'water_plan@asia-silicon.com',
  annualOutputValue: 2800,
  detailedAddress: '青海省西宁市东川工业园区金牛路18号',
  year: '2026'
});

const currentYear = computed(() => {
  const y = Number(form.value.year) || 2026;
  return `${y - 1}`;
});

const nextYear = computed(() => {
  return form.value.year || '2026';
});

// 表单一：本年实际用水填报数据工厂 (生活、工业、农业、发电)
const createInitialActualData = (): FormQuotaData => ({
  livingWaterRows: [
    {
      type: '城镇居民生活',
      quota: 30.0,
      population: 320,
      surfaceWater: 210.5,
      groundwater: 205.2
    }
  ],
  industryWaterRows: [
    {
      productName: '高纯多晶硅',
      quota: 14.5,
      output: '2.4万吨',
      productVolume: '34.80',
      surfaceWater: 7.5,
      groundwater: 8.6,
      recycledWater: 9.5,
      rainWater: 10.2,
      mineWater: 0.0,
      brackishWater: 0.0
    },
    {
      productName: '单晶硅拉棒',
      quota: 8.2,
      output: '1.1万吨',
      productVolume: '9.02',
      surfaceWater: 4.2,
      groundwater: 3.2,
      recycledWater: 4.8,
      rainWater: 1.8,
      mineWater: 0.0,
      brackishWater: 0.0
    }
  ],
  agricultureWaterRows: [
    {
      area: 21500.0,
      times: 4,
      quota: 95,
      crops: '小麦、青稞',
      method: '喷灌',
      surfaceWater: 0.18,
      groundwater: 0.19,
      total: 21.85
    }
  ],
  powerWaterRows: [
    {
      units: 2,
      capacity: '600MW',
      generation: '34.2亿',
      hours: 5700,
      surfaceWater: 11.8,
      groundwater: 0.0,
      hydroMinFlow: 0.0,
      thermalMaxHourly: 140.0,
      total: 11.8
    }
  ],
  monthlySummaryRows: [
    { month: '1月', surfaceWater: 18.20, groundwater: 16.80, recycledWater: 1.10, rainWater: 0.10, mineWater: 0.0, brackishWater: 0.0 },
    { month: '2月', surfaceWater: 17.50, groundwater: 16.20, recycledWater: 1.05, rainWater: 0.15, mineWater: 0.0, brackishWater: 0.0 },
    { month: '3月', surfaceWater: 19.10, groundwater: 17.50, recycledWater: 1.15, rainWater: 0.35, mineWater: 0.0, brackishWater: 0.0 },
    { month: '4月', surfaceWater: 19.80, groundwater: 18.20, recycledWater: 1.20, rainWater: 0.60, mineWater: 0.0, brackishWater: 0.0 },
    { month: '5月', surfaceWater: 20.50, groundwater: 19.10, recycledWater: 1.25, rainWater: 1.10, mineWater: 0.0, brackishWater: 0.0 },
    { month: '6月', surfaceWater: 21.20, groundwater: 19.80, recycledWater: 1.30, rainWater: 1.80, mineWater: 0.0, brackishWater: 0.0 },
    { month: '7月', surfaceWater: 21.80, groundwater: 20.10, recycledWater: 1.35, rainWater: 2.60, mineWater: 0.0, brackishWater: 0.0 },
    { month: '8月', surfaceWater: 21.50, groundwater: 19.90, recycledWater: 1.30, rainWater: 2.50, mineWater: 0.0, brackishWater: 0.0 },
    { month: '9月', surfaceWater: 20.10, groundwater: 18.60, recycledWater: 1.25, rainWater: 1.50, mineWater: 0.0, brackishWater: 0.0 },
    { month: '10月', surfaceWater: 19.40, groundwater: 17.80, recycledWater: 1.20, rainWater: 0.80, mineWater: 0.0, brackishWater: 0.0 },
    { month: '11月', surfaceWater: 18.00, groundwater: 16.90, recycledWater: 1.10, rainWater: 0.30, mineWater: 0.0, brackishWater: 0.0 },
    { month: '12月', surfaceWater: 17.08, groundwater: 16.29, recycledWater: 1.05, rainWater: 0.20, mineWater: 0.0, brackishWater: 0.0 }
  ]
});

// 表单二：下年度计划用水填报数据工厂 (生活、工业、农业、发电、总结表)
const createInitialPlanData = (): FormQuotaData => ({
  livingWaterRows: [
    {
      type: '城镇居民生活',
      quota: 32.0,
      population: 324,
      surfaceWater: 234.0,
      groundwater: 232.0
    }
  ],
  industryWaterRows: [
    {
      productName: '高纯多晶硅',
      quota: 14.5,
      output: '2.5万吨',
      productVolume: '36.25',
      surfaceWater: 8.0,
      groundwater: 9.0,
      recycledWater: 10.0,
      rainWater: 11.0,
      mineWater: 0.0,
      brackishWater: 0.0
    },
    {
      productName: '单晶硅拉棒',
      quota: 8.2,
      output: '1.2万吨',
      productVolume: '9.84',
      surfaceWater: 4.5,
      groundwater: 3.5,
      recycledWater: 5.0,
      rainWater: 2.0,
      mineWater: 0.0,
      brackishWater: 0.0
    }
  ],
  agricultureWaterRows: [
    {
      area: 23243.87,
      times: 4,
      quota: 98,
      crops: '小麦、青稞、油菜',
      method: '喷灌/滴灌',
      surfaceWater: 0.2,
      groundwater: 0.21,
      total: 23.66
    }
  ],
  powerWaterRows: [
    {
      units: 2,
      capacity: '600MW',
      generation: '35.4亿',
      hours: 5800,
      surfaceWater: 12.5,
      groundwater: 0.0,
      hydroMinFlow: 0.0,
      thermalMaxHourly: 145.0,
      total: 12.5
    }
  ],
  monthlySummaryRows: [
    { month: '1月', surfaceWater: 20.10, groundwater: 19.00, recycledWater: 1.15, rainWater: 0.10, mineWater: 0.0, brackishWater: 0.0 },
    { month: '2月', surfaceWater: 19.50, groundwater: 18.30, recycledWater: 1.10, rainWater: 0.15, mineWater: 0.0, brackishWater: 0.0 },
    { month: '3月', surfaceWater: 21.00, groundwater: 19.80, recycledWater: 1.20, rainWater: 0.40, mineWater: 0.0, brackishWater: 0.0 },
    { month: '4月', surfaceWater: 21.80, groundwater: 20.50, recycledWater: 1.25, rainWater: 0.70, mineWater: 0.0, brackishWater: 0.0 },
    { month: '5月', surfaceWater: 22.70, groundwater: 21.40, recycledWater: 1.30, rainWater: 1.20, mineWater: 0.0, brackishWater: 0.0 },
    { month: '6月', surfaceWater: 23.50, groundwater: 22.20, recycledWater: 1.35, rainWater: 1.95, mineWater: 0.0, brackishWater: 0.0 },
    { month: '7月', surfaceWater: 24.20, groundwater: 22.80, recycledWater: 1.40, rainWater: 2.80, mineWater: 0.0, brackishWater: 0.0 },
    { month: '8月', surfaceWater: 23.90, groundwater: 22.50, recycledWater: 1.35, rainWater: 2.70, mineWater: 0.0, brackishWater: 0.0 },
    { month: '9月', surfaceWater: 22.30, groundwater: 21.00, recycledWater: 1.30, rainWater: 1.60, mineWater: 0.0, brackishWater: 0.0 },
    { month: '10月', surfaceWater: 21.50, groundwater: 20.20, recycledWater: 1.25, rainWater: 0.90, mineWater: 0.0, brackishWater: 0.0 },
    { month: '11月', surfaceWater: 20.00, groundwater: 18.90, recycledWater: 1.20, rainWater: 0.30, mineWater: 0.0, brackishWater: 0.0 },
    { month: '12月', surfaceWater: 18.70, groundwater: 18.11, recycledWater: 1.15, rainWater: 0.20, mineWater: 0.0, brackishWater: 0.0 }
  ]
});

const actualQuotaForm = ref<FormQuotaData>(createInitialActualData());
const planQuotaForm = ref<FormQuotaData>(createInitialPlanData());

// 左侧表单区域：向上滑动时自动收起基础信息，并支持手动切换展开/收起
const isBaseInfoCollapsed = ref(false);
const userManuallyToggled = ref(false);
const leftScrollContainer = ref<HTMLElement | null>(null);

const toggleBaseInfo = () => {
  userManuallyToggled.value = true;
  isBaseInfoCollapsed.value = !isBaseInfoCollapsed.value;
};

const handleLeftScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  if (!target) return;
  // 向上滑动内容（向下滚动浏览表单，scrollTop > 40）时，自动收起基础信息
  if (target.scrollTop > 40 && !isBaseInfoCollapsed.value && !userManuallyToggled.value) {
    isBaseInfoCollapsed.value = true;
  } else if (target.scrollTop <= 5 && isBaseInfoCollapsed.value && !userManuallyToggled.value) {
    // 回到最顶部时，若未被手动固定收起，可自动还原展开
    isBaseInfoCollapsed.value = false;
  }
};

// 监听弹窗显示与选中的 record 初始化基础信息与双表单
watch(
  () => props.visible,
  (val) => {
    if (val) {
      isBaseInfoCollapsed.value = false;
      userManuallyToggled.value = false;
      if (leftScrollContainer.value) {
        leftScrollContainer.value.scrollTop = 0;
      }
    }
  }
);

watch(
  () => props.record,
  (rec) => {
    if (rec) {
      isBaseInfoCollapsed.value = false;
      userManuallyToggled.value = false;
      if (leftScrollContainer.value) {
        leftScrollContainer.value.scrollTop = 0;
      }
      form.value.waterOwner = rec.unitName || '青海亚洲硅业高纯材料有限公司';
      form.value.permitNumber = rec.permitNumber || 'B630121G2026-0055';
      form.value.permitVolume = rec.permitVolume || 2345.87;
      form.value.year = rec.year || '2026';
      form.value.detailedAddress = `青海省西宁市${rec.district}重点产业园区`;
      activeRightTab.value = 'water_quota';
      auditOpinion.value = `经对【${rec.unitName}】${rec.year}年度用水计划进行合规核查，指标测算合理，准予核定通过。`;

      // 重置或自适应数据
      actualQuotaForm.value = createInitialActualData();
      planQuotaForm.value = createInitialPlanData();
      if (rec.planVolume) {
        // 如果有已有指标，做微调匹配
        const diffRatio = rec.planVolume > 0 ? rec.planVolume / 500 : 1;
        if (diffRatio > 0 && Math.abs(diffRatio - 1) > 0.1) {
          planQuotaForm.value.livingWaterRows[0].surfaceWater = Number((234 * diffRatio * 0.5).toFixed(2));
          planQuotaForm.value.livingWaterRows[0].groundwater = Number((232 * diffRatio * 0.5).toFixed(2));
        }
      }
    }
  },
  { immediate: true }
);

// 统计核算工具函数
const calcQuotaFormTotals = (formData: FormQuotaData) => {
  const livingSurface = (formData.livingWaterRows || []).reduce((acc, r) => acc + (Number(r.surfaceWater) || 0), 0);
  const livingGround = (formData.livingWaterRows || []).reduce((acc, r) => acc + (Number(r.groundwater) || 0), 0);

  const industrySurface = (formData.industryWaterRows || []).reduce((acc, r) => acc + (Number(r.surfaceWater) || 0), 0);
  const industryGround = (formData.industryWaterRows || []).reduce((acc, r) => acc + (Number(r.groundwater) || 0), 0);
  const industryUnconv = (formData.industryWaterRows || []).reduce(
    (acc, r) =>
      acc +
      (Number(r.recycledWater) || 0) +
      (Number(r.rainWater) || 0) +
      (Number(r.mineWater) || 0) +
      (Number(r.brackishWater) || 0),
    0
  );

  const agriSurface = (formData.agricultureWaterRows || []).reduce((acc, r) => acc + (Number(r.surfaceWater) || 0), 0);
  const agriGround = (formData.agricultureWaterRows || []).reduce((acc, r) => acc + (Number(r.groundwater) || 0), 0);

  const powerSurface = (formData.powerWaterRows || []).reduce((acc, r) => acc + (Number(r.surfaceWater) || 0), 0);
  const powerGround = (formData.powerWaterRows || []).reduce((acc, r) => acc + (Number(r.groundwater) || 0), 0);

  const surfaceTotal = livingSurface + industrySurface + agriSurface + powerSurface;
  const groundTotal = livingGround + industryGround + agriGround + powerGround;
  const totalVolume = surfaceTotal + groundTotal;

  return {
    surfaceTotal,
    groundTotal,
    unconventionalTotal: industryUnconv,
    totalVolume
  };
};

const actualTotals = computed(() => calcQuotaFormTotals(actualQuotaForm.value));
const planTotals = computed(() => calcQuotaFormTotals(planQuotaForm.value));

const actualTotalVolume = computed(() => actualTotals.value.totalVolume);
const planTotalVolume = computed(() => planTotals.value.totalVolume);
const planUnconventionalVolume = computed(() => planTotals.value.unconventionalTotal);

const declaredLivingRows = computed(() => planQuotaForm.value?.livingWaterRows || []);
const declaredIndustryRows = computed(() => planQuotaForm.value?.industryWaterRows || []);
const declaredAgriRows = computed(() => planQuotaForm.value?.agricultureWaterRows || []);
const declaredPowerRows = computed(() => planQuotaForm.value?.powerWaterRows || []);

const declaredIndustrySurfaceTotal = computed(() =>
  declaredIndustryRows.value.reduce((acc, r) => acc + (Number(r.surfaceWater) || 0), 0)
);
const declaredIndustryGroundTotal = computed(() =>
  declaredIndustryRows.value.reduce((acc, r) => acc + (Number(r.groundwater) || 0), 0)
);
const declaredIndustryRecycledTotal = computed(() =>
  declaredIndustryRows.value.reduce((acc, r) => acc + (Number(r.recycledWater) || 0), 0)
);
const declaredIndustryRainTotal = computed(() =>
  declaredIndustryRows.value.reduce((acc, r) => acc + (Number(r.rainWater) || 0), 0)
);
const declaredIndustryMineTotal = computed(() =>
  declaredIndustryRows.value.reduce((acc, r) => acc + (Number(r.mineWater) || 0), 0)
);
const declaredIndustryBrackishTotal = computed(() =>
  declaredIndustryRows.value.reduce((acc, r) => acc + (Number(r.brackishWater) || 0), 0)
);
const declaredIndustryUnconventionalTotal = computed(() =>
  declaredIndustryRecycledTotal.value +
  declaredIndustryRainTotal.value +
  declaredIndustryMineTotal.value +
  declaredIndustryBrackishTotal.value
);

const declaredMonthlyRows = computed(() => planQuotaForm.value?.monthlySummaryRows || []);

const declaredMonthlySurfaceTotal = computed(() =>
  declaredMonthlyRows.value.reduce((acc, r) => acc + (Number(r.surfaceWater) || 0), 0)
);
const declaredMonthlyGroundTotal = computed(() =>
  declaredMonthlyRows.value.reduce((acc, r) => acc + (Number(r.groundwater) || 0), 0)
);
const declaredMonthlyRecycledTotal = computed(() =>
  declaredMonthlyRows.value.reduce((acc, r) => acc + (Number(r.recycledWater) || 0), 0)
);
const declaredMonthlyRainTotal = computed(() =>
  declaredMonthlyRows.value.reduce((acc, r) => acc + (Number(r.rainWater) || 0), 0)
);
const declaredMonthlyMineTotal = computed(() =>
  declaredMonthlyRows.value.reduce((acc, r) => acc + (Number(r.mineWater) || 0), 0)
);
const declaredMonthlyBrackishTotal = computed(() =>
  declaredMonthlyRows.value.reduce((acc, r) => acc + (Number(r.brackishWater) || 0), 0)
);
const declaredMonthlyUnconvTotal = computed(() =>
  declaredMonthlyRecycledTotal.value +
  declaredMonthlyRainTotal.value +
  declaredMonthlyMineTotal.value +
  declaredMonthlyBrackishTotal.value
);
const declaredMonthlyGrandTotal = computed(() =>
  declaredMonthlySurfaceTotal.value +
  declaredMonthlyGroundTotal.value +
  declaredMonthlyUnconvTotal.value
);

const handleClose = () => {
  emit('update:visible', false);
};

// 审核通过
const handleApprove = () => {
  if (!props.record) return;

  const calculatedTotal = Number(planTotals.value.totalVolume.toFixed(2));

  const updated: WaterPlanRecord = {
    ...props.record,
    unitName: form.value.waterOwner,
    permitNumber: form.value.permitNumber,
    permitVolume: form.value.permitVolume,
    planVolume: calculatedTotal > 0 ? calculatedTotal : props.record.planVolume,
    surfaceWater: Number(planTotals.value.surfaceTotal.toFixed(2)),
    groundwater: Number(planTotals.value.groundTotal.toFixed(2)),
    unconventionalTotal: Number(planTotals.value.unconventionalTotal.toFixed(2)),
    status: '审核通过',
    auditor: '审核专员（西宁水务局）',
    auditDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
    auditOpinion: auditOpinion.value,
    approvedVolume: calculatedTotal > 0 ? calculatedTotal : props.record.planVolume,
    actualWaterQuota: JSON.parse(JSON.stringify(actualQuotaForm.value)),
    planWaterQuota: JSON.parse(JSON.stringify(planQuotaForm.value)),
    documentIssues: [
      {
        id: `issue-${Date.now()}`,
        title: `关于下达${form.value.waterOwner}${form.value.year}年度计划用水指标核定批复的通知`,
        noticeType: '正式用水计划通知',
        issuerUnit: '西宁市水资源管理委员会办公室',
        issueTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        issueEvent: `${form.value.year}年度计划用水审批核定通过下发`,
        docNumber: `宁水资审〔${form.value.year}〕第 ${Math.floor(100 + Math.random() * 900)} 号`,
        approvedTotalVolume: calculatedTotal > 0 ? calculatedTotal : props.record.planVolume,
        remarks: auditOpinion.value,
        files: [
          {
            id: `f-${Date.now()}-1`,
            name: `${form.value.year}年度计划用水指标正式核定通知书(红头盖章件).pdf`,
            type: 'pdf',
            size: '3.8 MB',
            uploadTime: new Date().toISOString().slice(0, 16).replace('T', ' ')
          },
          {
            id: `f-${Date.now()}-2`,
            name: `${form.value.waterOwner}核定用水定额分项明细表.xlsx`,
            type: 'excel',
            size: '1.4 MB',
            uploadTime: new Date().toISOString().slice(0, 16).replace('T', ' ')
          },
          {
            id: `f-${Date.now()}-3`,
            name: `计划用水监督管理告知承诺回执单.docx`,
            type: 'word',
            size: '560 KB',
            uploadTime: new Date().toISOString().slice(0, 16).replace('T', ' ')
          }
        ]
      },
      ...(props.record.documentIssues || [])
    ],
    auditHistory: [
      ...(props.record.auditHistory || []),
      {
        stepName: props.record.status,
        operator: '水资源审批主管',
        department: '西宁市水资源管理委员会',
        action: '审核通过',
        time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        opinion: auditOpinion.value,
        status: 'passed'
      }
    ]
  };

  emit('submit-audit', updated);
  emit('update:visible', false);
};

// 审核驳回 / 不同意
const handleReject = () => {
  if (!props.record) return;

  const updated: WaterPlanRecord = {
    ...props.record,
    status: '审核驳回',
    auditor: '审核专员（西宁水务局）',
    auditDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
    auditOpinion: auditOpinion.value || '核定申报表用水指标超出管控范围，予以驳回整改。',
    auditHistory: [
      ...(props.record.auditHistory || []),
      {
        stepName: props.record.status,
        operator: '水资源审批主管',
        department: '西宁市水资源管理委员会',
        action: '审核驳回',
        time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        opinion: auditOpinion.value || '核定申报表用水指标超出管控范围，予以驳回整改。',
        status: 'rejected'
      }
    ]
  };

  emit('submit-audit', updated);
  emit('update:visible', false);
};
</script>

<style scoped>
/* 自定义弹窗内横向及纵向滚动条，保证横向滑动条与纵向滑动条完全一致，细腻精致 */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
  transition: background-color 0.2s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: transparent;
}

.no-scrollbar::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
.no-scrollbar {
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}
</style>
