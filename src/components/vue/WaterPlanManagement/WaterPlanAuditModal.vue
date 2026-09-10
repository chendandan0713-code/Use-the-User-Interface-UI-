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
          <!-- 左栏标题导航 -->
          <div class="px-5 py-2.5 bg-white border-b border-slate-200/80 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-[13px] font-bold text-slate-800">申报指标核定与修改</span>
            </div>
          </div>

          <!-- 左侧滚动卡片表单区域 -->
          <div class="flex-1 overflow-y-auto p-3.5 space-y-2.5 custom-scrollbar">
            
            <!-- 卡片 1: 申报单位基础信息 (同计量设施管理编辑弹窗卡片规范) -->
            <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                  <span class="text-[13px] font-bold text-slate-800">申报主体基础信息</span>
                </div>
              </div>

              <!-- 基础信息输入栅格 (采用规整对齐的3列栅格布局) -->
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

            <!-- 两个表单的切换按钮 (仅展示填报年度和名称) -->
            <div class="grid grid-cols-2 gap-2.5">
              <!-- 表单 1: 本年实际用水填报表 -->
              <button
                type="button"
                @click="activeFormTab = 'actual'"
                class="py-2.5 px-3.5 rounded-lg border transition cursor-pointer flex items-center justify-between"
                :class="[
                  activeFormTab === 'actual'
                    ? 'bg-blue-50 border-[#1677ff] ring-1 ring-[#1677ff] shadow-2xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                ]"
              >
                <div class="flex items-center gap-2">
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="activeFormTab === 'actual' ? 'bg-[#1677ff]' : 'bg-slate-400'"
                  ></span>
                  <span
                    class="font-bold text-xs"
                    :class="activeFormTab === 'actual' ? 'text-blue-900' : 'text-slate-700'"
                  >
                    本年实际用水填报表
                  </span>
                </div>
                <span
                  class="px-2 py-0.5 rounded text-[11px] font-medium font-mono"
                  :class="activeFormTab === 'actual' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'"
                >
                  {{ currentYear }}年度
                </span>
              </button>

              <!-- 表单 2: 下年度计划用水填报表 -->
              <button
                type="button"
                @click="activeFormTab = 'plan'"
                class="py-2.5 px-3.5 rounded-lg border transition cursor-pointer flex items-center justify-between"
                :class="[
                  activeFormTab === 'plan'
                    ? 'bg-blue-50 border-[#1677ff] ring-1 ring-[#1677ff] shadow-2xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                ]"
              >
                <div class="flex items-center gap-2">
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="activeFormTab === 'plan' ? 'bg-[#1677ff]' : 'bg-slate-400'"
                  ></span>
                  <span
                    class="font-bold text-xs"
                    :class="activeFormTab === 'plan' ? 'text-blue-900' : 'text-slate-700'"
                  >
                    下年度计划用水填报表
                  </span>
                </div>
                <span
                  class="px-2 py-0.5 rounded text-[11px] font-medium font-mono"
                  :class="activeFormTab === 'plan' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'"
                >
                  {{ nextYear }}年度
                </span>
              </button>
            </div>

            <!-- 表单 1：本年实际用水填报表 (包含生活、工业、农业、发电四项核定) -->
            <WaterQuotaAuditForm
              v-show="activeFormTab === 'actual'"
              title="表单一：本年实际用水填报表"
              theme="blue"
              v-model="actualQuotaForm"
            />

            <!-- 表单 2：下年度计划用水填报表 (包含生活、工业、农业、发电四项核定) -->
            <WaterQuotaAuditForm
              v-show="activeFormTab === 'plan'"
              title="表单二：下年度计划用水填报表"
              theme="blue"
              v-model="planQuotaForm"
            />

            <!-- 卡片 4: 审核批注与核定结论 -->
            <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-1.5">
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
            
            <!-- Tab 1: 计划申请填报表 (完整预览卡片) -->
            <div v-if="activeRightTab === 'plan_application'" class="space-y-4">
              
              <!-- 基础信息只读网格卡片 -->
              <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[13px] font-bold text-slate-800">申请基础信息</span>
                  </div>
                  <span class="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 font-mono">
                    {{ form.year || 2026 }}年度申请
                  </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2.5 text-xs">
                  <!-- 第一行：取水权人 (跨2列) + 许可证号 (1列) -->
                  <div class="col-span-1 md:col-span-2 flex items-center">
                    <span class="w-20 text-slate-400 shrink-0 text-right pr-2.5">取水权人：</span>
                    <span class="font-medium text-slate-800 truncate" :title="form.waterOwner">{{ form.waterOwner }}</span>
                  </div>

                  <div class="col-span-1 flex items-center">
                    <span class="w-20 text-slate-400 shrink-0 text-right pr-2.5">许可证号：</span>
                    <span class="font-mono text-slate-800">{{ form.permitNumber }}</span>
                  </div>

                  <!-- 第二行：许可水量 + 年产值 + 邮政编码 -->
                  <div class="col-span-1 flex items-center">
                    <span class="w-20 text-slate-400 shrink-0 text-right pr-2.5">许可水量：</span>
                    <span class="font-mono font-medium text-slate-800">{{ (form.permitVolume ?? 0).toFixed(2) }} <span class="text-slate-500 font-sans text-[11px]">万m³</span></span>
                  </div>

                  <div class="col-span-1 flex items-center">
                    <span class="w-20 text-slate-400 shrink-0 text-right pr-2.5">年产值：</span>
                    <span class="font-mono font-medium text-slate-800">{{ form.annualOutputValue }} <span class="text-slate-500 font-sans text-[11px]">万元</span></span>
                  </div>

                  <div class="col-span-1 flex items-center">
                    <span class="w-20 text-slate-400 shrink-0 text-right pr-2.5">邮政编码：</span>
                    <span class="font-mono text-slate-800">{{ form.postalCode }}</span>
                  </div>

                  <!-- 第三行：联系人 + 联系电话 + 电子邮箱 -->
                  <div class="col-span-1 flex items-center">
                    <span class="w-20 text-slate-400 shrink-0 text-right pr-2.5">联系人：</span>
                    <span class="text-slate-800">{{ form.contactPerson }}</span>
                  </div>

                  <div class="col-span-1 flex items-center">
                    <span class="w-20 text-slate-400 shrink-0 text-right pr-2.5">联系电话：</span>
                    <span class="font-mono text-slate-800">{{ form.contactPhone }}</span>
                  </div>

                  <div class="col-span-1 flex items-center">
                    <span class="w-20 text-slate-400 shrink-0 text-right pr-2.5">电子邮箱：</span>
                    <span class="text-slate-800">{{ form.email }}</span>
                  </div>

                  <!-- 第四行：详细地址 (跨3列) -->
                  <div class="col-span-1 md:col-span-3 flex items-center pt-1 border-t border-slate-100">
                    <span class="w-20 text-slate-400 shrink-0 text-right pr-2.5">详细地址：</span>
                    <span class="text-slate-800">{{ form.detailedAddress }}</span>
                  </div>
                </div>
              </div>

              <!-- 生活用水表格 (只读卡片) -->
              <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[13px] font-bold text-slate-800">生活用水申报明细</span>
                  </div>
                  <span class="text-slate-400 font-mono text-[11px]">单位: 万m³</span>
                </div>

                <div class="border border-[#b8cde6] rounded-md bg-white shadow-2xs overflow-x-auto custom-scrollbar">
                  <table class="w-full text-xs text-center border-collapse">
                    <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6]">
                      <tr class="divide-x divide-[#b8cde6]">
                        <th class="py-2 px-3 border-r border-[#b8cde6]">供水人口(人)</th>
                        <th class="py-2 px-3 border-r border-[#b8cde6]">人均定额(L/人·天)</th>
                        <th class="py-2 px-3 border-r border-[#b8cde6]">地表水</th>
                        <th class="py-2 px-3 border-r border-[#b8cde6]">地下水</th>
                        <th class="py-2 px-3 font-semibold text-slate-800">总计</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#b8cde6] font-mono text-slate-800">
                      <tr
                        v-for="(row, idx) in declaredLivingRows"
                        :key="idx"
                        class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
                      >
                        <td class="py-2 px-3 text-slate-800">{{ row.population }}</td>
                        <td class="py-2 px-3 text-slate-800">{{ (row.quota ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-3 text-slate-800">{{ (row.surfaceWater ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-3 text-slate-800">{{ (row.groundwater ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-3 font-semibold text-slate-800">
                          {{ ((Number(row.surfaceWater) || 0) + (Number(row.groundwater) || 0)).toFixed(2) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 工业用水表格 (只读多级表头卡片) -->
              <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[13px] font-bold text-slate-800">工业用水申报明细</span>
                  </div>
                  <span class="text-slate-400 font-mono text-[11px]">单位: 万m³</span>
                </div>

                <div class="border border-[#b8cde6] rounded-md bg-white shadow-2xs overflow-x-auto custom-scrollbar">
                  <table class="w-full text-xs text-center border-collapse min-w-[700px]">
                    <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6]">
                      <tr class="divide-x divide-[#b8cde6]">
                        <th rowspan="2" class="py-2 px-2 border-r border-[#b8cde6]">主要产品</th>
                        <th rowspan="2" class="py-2 px-2 border-r border-[#b8cde6]">产品定额</th>
                        <th rowspan="2" class="py-2 px-2 border-r border-[#b8cde6]">年产量</th>
                        <th rowspan="2" class="py-2 px-2 border-r border-[#b8cde6]">产品水量</th>
                        <th rowspan="2" class="py-2 px-2 border-r border-[#b8cde6]">地表水</th>
                        <th rowspan="2" class="py-2 px-2 border-r border-[#b8cde6]">地下水</th>
                        <th colspan="5" class="py-1 px-2 border-b border-r border-[#b8cde6]">非常规水</th>
                        <th rowspan="2" class="py-2 px-2 font-semibold text-slate-800">总计</th>
                      </tr>
                      <tr class="divide-x divide-[#b8cde6] text-[11px]">
                        <th class="py-1 px-1.5 border-r border-[#b8cde6]">再生水</th>
                        <th class="py-1 px-1.5 border-r border-[#b8cde6]">雨水</th>
                        <th class="py-1 px-1.5 border-r border-[#b8cde6]">矿井水</th>
                        <th class="py-1 px-1.5 border-r border-[#b8cde6]">微咸水</th>
                        <th class="py-1 px-1.5 font-semibold border-r border-[#b8cde6] text-slate-800">非常规计</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#b8cde6] font-mono text-[11.5px] text-slate-800">
                      <tr
                        v-for="(row, idx) in declaredIndustryRows"
                        :key="idx"
                        class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
                      >
                        <td class="py-2 px-2 text-slate-800">{{ row.productName }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ (row.quota ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ row.output }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ row.productVolume }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ (row.surfaceWater ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ (row.groundwater ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-1.5 text-slate-800">{{ (row.recycledWater ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-1.5 text-slate-800">{{ (row.rainWater ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-1.5 text-slate-800">{{ (row.mineWater ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-1.5 text-slate-800">{{ (row.brackishWater ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 font-semibold text-slate-800">
                          {{ ((Number(row.recycledWater) || 0) + (Number(row.rainWater) || 0) + (Number(row.mineWater) || 0) + (Number(row.brackishWater) || 0)).toFixed(2) }}
                        </td>
                        <td class="py-2 px-2 font-semibold text-slate-800">
                          {{ ((Number(row.surfaceWater) || 0) + (Number(row.groundwater) || 0)).toFixed(2) }}
                        </td>
                      </tr>

                      <!-- 合计行 -->
                      <tr class="bg-[#f0f5fc] font-semibold divide-x divide-[#b8cde6] text-slate-800">
                        <td class="py-2 px-2 font-sans text-slate-800">合计</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="py-2 px-2 text-slate-800">{{ (declaredIndustrySurfaceTotal ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ (declaredIndustryGroundTotal ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-1.5 text-slate-800">{{ (declaredIndustryRecycledTotal ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-1.5 text-slate-800">{{ (declaredIndustryRainTotal ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-1.5 text-slate-800">{{ (declaredIndustryMineTotal ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-1.5 text-slate-800">{{ (declaredIndustryBrackishTotal ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-800 font-bold">{{ (declaredIndustryUnconventionalTotal ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-800 font-bold">{{ ((declaredIndustrySurfaceTotal || 0) + (declaredIndustryGroundTotal || 0)).toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 农业用水表格 (只读卡片) -->
              <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[13px] font-bold text-slate-800">农业灌溉用水明细</span>
                  </div>
                  <span class="text-slate-400 font-mono text-[11px]">单位: 万m³</span>
                </div>

                <div class="border border-[#b8cde6] rounded-md bg-white shadow-2xs overflow-x-auto custom-scrollbar">
                  <table class="w-full text-xs text-center border-collapse">
                    <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6] text-[11px]">
                      <tr class="divide-x divide-[#b8cde6]">
                        <th class="py-2 px-2 border-r border-[#b8cde6]">实际灌溉面积(亩)</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">年内灌溉次数</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">定额(m³/亩·次)</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">主要作物</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">灌溉方式</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">地表水</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">地下水</th>
                        <th class="py-2 px-2 font-semibold text-slate-800">总计</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#b8cde6] font-mono text-[11.5px] text-slate-800">
                      <tr
                        v-for="(row, idx) in declaredAgriRows"
                        :key="idx"
                        class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
                      >
                        <td class="py-2 px-2 text-slate-800">{{ (row.area ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ row.times }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ row.quota }}</td>
                        <td class="py-2 px-2 font-sans text-slate-800">{{ row.crops }}</td>
                        <td class="py-2 px-2 font-sans text-slate-800">{{ row.method }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ (row.surfaceWater ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ (row.groundwater ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 font-semibold text-slate-800">{{ ((row.total ?? ((row.surfaceWater || 0) + (row.groundwater || 0)))).toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 发电用水表格 (只读卡片) -->
              <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[13px] font-bold text-slate-800">水力/火力发电用水明细</span>
                  </div>
                  <span class="text-slate-400 font-mono text-[11px]">单位: 万m³</span>
                </div>

                <div class="border border-[#b8cde6] rounded-md bg-white shadow-2xs overflow-x-auto custom-scrollbar">
                  <table class="w-full text-xs text-center border-collapse">
                    <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6] text-[11px]">
                      <tr class="divide-x divide-[#b8cde6]">
                        <th class="py-2 px-2 border-r border-[#b8cde6]">机组台数</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">降级容量</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">年发电量</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">年利用小时</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">地表水</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">地下水</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">水电最小机组流量</th>
                        <th class="py-2 px-2 border-r border-[#b8cde6]">火电最高小时用水</th>
                        <th class="py-2 px-2 font-semibold text-slate-800">总计</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#b8cde6] font-mono text-[11.5px] text-slate-800">
                      <tr
                        v-for="(row, idx) in declaredPowerRows"
                        :key="idx"
                        class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
                      >
                        <td class="py-2 px-2 text-slate-800">{{ row.units }}台</td>
                        <td class="py-2 px-2 text-slate-800">{{ row.capacity }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ row.generation }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ row.hours }}h</td>
                        <td class="py-2 px-2 text-slate-800">{{ (row.surfaceWater ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ (row.groundwater ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ (row.hydroMinFlow ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-800">{{ (row.thermalMaxHourly ?? 0).toFixed(2) }}</td>
                        <td class="py-2 px-2 font-semibold text-slate-800">{{ ((row.total ?? ((row.surfaceWater || 0) + (row.groundwater || 0)))).toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 5. 申报1至12月用水总结表 -->
              <div class="bg-white p-4 rounded-lg border border-[#b8cde6] shadow-2xs space-y-2">
                <div class="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                    <span class="font-bold text-slate-800 text-xs">5. 用水总结表（1至12月）</span>
                  </div>
                  <span class="text-[11px] font-mono text-slate-500">单位: 万m³</span>
                </div>
                <div class="overflow-x-auto custom-scrollbar border border-[#b8cde6] rounded-md">
                  <table class="w-full text-xs text-center border-collapse min-w-[720px]">
                    <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6]">
                      <tr class="divide-x divide-[#b8cde6]">
                        <th rowspan="2" class="py-1.5 px-2 w-14 border-r border-[#b8cde6]">月份</th>
                        <th rowspan="2" class="py-1.5 px-2 min-w-[65px] border-r border-[#b8cde6]">地表水</th>
                        <th rowspan="2" class="py-1.5 px-2 min-w-[65px] border-r border-[#b8cde6]">地下水</th>
                        <th colspan="5" class="py-1 px-2 border-b border-r border-[#b8cde6]">非常规水</th>
                        <th rowspan="2" class="py-1.5 px-2 min-w-[70px] font-semibold text-slate-800">总计</th>
                      </tr>
                      <tr class="divide-x divide-[#b8cde6] text-[11px]">
                        <th class="py-1 px-1.5 min-w-[55px] border-r border-[#b8cde6]">再生水</th>
                        <th class="py-1 px-1.5 min-w-[55px] border-r border-[#b8cde6]">雨水</th>
                        <th class="py-1 px-1.5 min-w-[55px] border-r border-[#b8cde6]">矿井水</th>
                        <th class="py-1 px-1.5 min-w-[55px] border-r border-[#b8cde6]">微咸水</th>
                        <th class="py-1 px-1.5 min-w-[65px] font-semibold border-r border-[#b8cde6] text-slate-800">非常规计</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#b8cde6] font-mono text-[11.5px] text-slate-800">
                      <tr
                        v-for="(row, idx) in declaredMonthlyRows"
                        :key="idx"
                        class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
                      >
                        <td class="py-1 px-2 font-sans font-medium text-slate-800 bg-slate-50/50">{{ row.month }}</td>
                        <td class="py-1 px-2 text-slate-800">{{ Number(row.surfaceWater || 0).toFixed(2) }}</td>
                        <td class="py-1 px-2 text-slate-800">{{ Number(row.groundwater || 0).toFixed(2) }}</td>
                        <td class="py-1 px-2 text-slate-800">{{ Number(row.recycledWater || 0).toFixed(2) }}</td>
                        <td class="py-1 px-2 text-slate-800">{{ Number(row.rainWater || 0).toFixed(2) }}</td>
                        <td class="py-1 px-2 text-slate-800">{{ Number(row.mineWater || 0).toFixed(2) }}</td>
                        <td class="py-1 px-2 text-slate-800">{{ Number(row.brackishWater || 0).toFixed(2) }}</td>
                        <td class="py-1 px-2 text-slate-800 font-semibold">{{ ((Number(row.recycledWater) || 0) + (Number(row.rainWater) || 0) + (Number(row.mineWater) || 0) + (Number(row.brackishWater) || 0)).toFixed(2) }}</td>
                        <td class="py-1 px-2 font-semibold text-slate-800">{{ ((Number(row.surfaceWater) || 0) + (Number(row.groundwater) || 0) + (Number(row.recycledWater) || 0) + (Number(row.rainWater) || 0) + (Number(row.mineWater) || 0) + (Number(row.brackishWater) || 0)).toFixed(2) }}</td>
                      </tr>
                      <tr class="bg-[#f0f5fc] font-semibold divide-x divide-[#b8cde6] text-slate-800">
                        <td class="py-1.5 px-2 font-sans text-slate-800">合计</td>
                        <td class="py-1.5 px-1.5 font-mono text-slate-800">{{ declaredMonthlySurfaceTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5 font-mono text-slate-800">{{ declaredMonthlyGroundTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5 font-mono text-slate-800">{{ declaredMonthlyRecycledTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5 font-mono text-slate-800">{{ declaredMonthlyRainTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5 font-mono text-slate-800">{{ declaredMonthlyMineTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5 font-mono text-slate-800">{{ declaredMonthlyBrackishTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5 font-mono text-slate-800 font-bold">{{ declaredMonthlyUnconvTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5 font-mono text-slate-800 font-bold">{{ declaredMonthlyGrandTotal.toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            <!-- Tab 2: 取水总结填报表 -->
            <div v-else-if="activeRightTab === 'summary'" class="space-y-4">
              <div class="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs space-y-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                    <span class="font-bold text-slate-800 text-sm">全项取用水指标汇总</span>
                  </div>
                  <span class="text-xs font-mono text-[#1677ff]">单位: 万m³</span>
                </div>

                <div class="grid grid-cols-3 gap-3.5">
                  <div class="p-3.5 bg-slate-50 rounded-lg border border-slate-200/90">
                    <span class="text-slate-500 text-[11px] block mb-1">取水许可证年许可量</span>
                    <span class="text-base font-bold font-mono text-slate-800">{{ (form.permitVolume ?? 0).toFixed(2) }}</span>
                  </div>

                  <div class="p-3.5 bg-blue-50/50 rounded-lg border border-blue-200">
                    <span class="text-blue-600 text-[11px] font-medium block mb-1">申报核定计划总用水量</span>
                    <span class="text-base font-bold font-mono text-[#1677ff]">
                      {{ (planTotalVolume ?? 0).toFixed(2) }}
                    </span>
                  </div>

                  <div class="p-3.5 bg-emerald-50/50 rounded-lg border border-emerald-200">
                    <span class="text-emerald-700 text-[11px] font-medium block mb-1">非常规水源综合利用量</span>
                    <span class="text-base font-bold font-mono text-emerald-600">{{ (planUnconventionalVolume ?? 0).toFixed(2) }}</span>
                  </div>
                </div>

                <div class="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-3.5 rounded-lg border border-slate-200/80 space-y-1">
                  <p class="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#1677ff]"></span>
                    水资源红线刚性约束合规性分析：
                  </p>
                  <p>1. 本次申报年度用水计划总量未超出取水许可证红线额度，具备充足水资源承载力；</p>
                  <p>2. 工业取水结构中非常规水源配置比例合理，符合国家节水行动西宁实施方案技术要求。</p>
                </div>
              </div>
            </div>

            <!-- Tab 3: 电子证照信息 -->
            <div v-else-if="activeRightTab === 'electronic_license'" class="space-y-4">
              <div class="bg-white p-6 rounded-lg border border-slate-200/80 shadow-2xs space-y-4 max-w-[680px] mx-auto">
                <div class="text-center space-y-1 pb-3 border-b-2 border-[#1677ff]">
                  <span class="text-base font-bold tracking-widest text-slate-900">中华人民共和国取水许可证</span>
                  <div class="text-xs font-mono text-slate-500">{{ form.permitNumber }}</div>
                </div>

                <div class="grid grid-cols-2 gap-y-3 text-xs">
                  <div><span class="text-slate-400">取水权人：</span><span class="font-medium text-slate-800">{{ form.waterOwner }}</span></div>
                  <div><span class="text-slate-400">法定代表人：</span><span class="font-medium text-slate-800">{{ form.contactPerson }}</span></div>
                  <div><span class="text-slate-400">有效期限：</span><span class="font-mono text-slate-800">2023-01-01 至 2028-12-31</span></div>
                  <div><span class="text-slate-400">年许可取水量：</span><span class="font-mono font-semibold text-blue-600">{{ form.permitVolume }} 万m³</span></div>
                  <div class="col-span-2"><span class="text-slate-400">取水地点：</span><span class="text-slate-800">{{ form.detailedAddress }}</span></div>
                  <div><span class="text-slate-400">发证机关：</span><span class="text-slate-800">西宁市水务局</span></div>
                  <div><span class="text-slate-400">证照防伪码：</span><span class="font-mono text-emerald-600">QHQ-2026-XN-VALID</span></div>
                </div>
              </div>
            </div>

            <!-- Tab 4: 用水定额标签页 (根据最新标准要求高保真重构) -->
            <div v-else-if="activeRightTab === 'water_quota'" class="space-y-4">
              
              <!-- 模块 1: 近三年用水计划 -->
              <div class="space-y-2">
                <h4 class="text-sm font-bold text-slate-800 tracking-tight">近三年用水计划</h4>
                
                <div class="border border-[#b8cde6] rounded-md overflow-hidden bg-white shadow-2xs">
                  <table class="w-full text-xs text-center border-collapse">
                    <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6]">
                      <tr class="divide-x divide-[#b8cde6] text-xs">
                        <th class="py-2.5 px-3 border-r border-[#b8cde6]">年份</th>
                        <th class="py-2.5 px-3 border-r border-[#b8cde6]">地表水</th>
                        <th class="py-2.5 px-3 border-r border-[#b8cde6]">地下水</th>
                        <th class="py-2.5 px-3 border-r border-[#b8cde6]">再生水</th>
                        <th class="py-2.5 px-3 border-r border-[#b8cde6]">集蓄雨水</th>
                        <th class="py-2.5 px-3 border-r border-[#b8cde6]">矿坑（井）水</th>
                        <th class="py-2.5 px-3 border-r border-[#b8cde6]">微咸水</th>
                        <th class="py-2.5 px-3 font-semibold text-slate-800">总计</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#b8cde6] font-mono text-xs">
                      <tr
                        v-for="row in recentThreeYearsPlan"
                        :key="row.year"
                        class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
                      >
                        <td class="py-2.5 px-3 text-slate-800 font-sans font-medium">{{ row.year }}</td>
                        <td class="py-2.5 px-3 text-slate-800">{{ row.surfaceWater }}</td>
                        <td class="py-2.5 px-3 text-slate-800">{{ row.groundwater }}</td>
                        <td class="py-2.5 px-3 text-slate-800">{{ row.recycledWater }}</td>
                        <td class="py-2.5 px-3 text-slate-800">{{ row.rainWater }}</td>
                        <td class="py-2.5 px-3 text-slate-800">{{ row.mineWater }}</td>
                        <td class="py-2.5 px-3 text-slate-800">{{ row.brackishWater }}</td>
                        <td class="py-2.5 px-3 text-slate-800 font-semibold">{{ row.total }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 模块 2: 用水定额工具栏与定额卡片列表 -->
              <div class="space-y-3 pt-1">
                <!-- 工具栏：用水定额标题 + 填报说明按钮 + 筛选项 -->
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <!-- 左侧标题与填报说明按钮 -->
                  <div class="flex items-center gap-2.5">
                    <span class="text-sm font-bold text-slate-800">用水定额</span>
                    <button
                      type="button"
                      @click="quotaGuideModalVisible = true"
                      class="px-2.5 py-0.5 rounded bg-[#1677ff] hover:bg-blue-600 text-white text-xs font-medium transition cursor-pointer shadow-2xs"
                    >
                      填报说明
                    </button>
                  </div>

                  <!-- 右侧检索筛选区 (与截图 100% 对应) -->
                  <div class="flex items-center gap-2">
                    <!-- 灌溉方式 -->
                    <div class="relative w-28">
                      <select
                        v-model="quotaFilter.method"
                        class="w-full h-7 pl-2.5 pr-6 bg-white border border-slate-300 rounded text-xs text-slate-700 focus:outline-none focus:border-[#1677ff] appearance-none cursor-pointer"
                      >
                        <option value="全部">全部方式</option>
                        <option value="常规灌溉">常规灌溉</option>
                        <option value="喷灌">喷灌</option>
                        <option value="微灌">微灌</option>
                        <option value="滴灌">滴灌</option>
                      </select>
                      <svg class="w-3.5 h-3.5 absolute right-2 top-2 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>

                    <!-- 效率值 -->
                    <div class="relative w-24">
                      <select
                        v-model="quotaFilter.efficiency"
                        class="w-full h-7 pl-2.5 pr-6 bg-white border border-slate-300 rounded text-xs text-slate-700 focus:outline-none focus:border-[#1677ff] appearance-none cursor-pointer"
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

                    <!-- 产品名称输入框 -->
                    <div class="relative w-36">
                      <input
                        type="text"
                        v-model="quotaFilter.keyword"
                        placeholder="产品名称"
                        class="w-full h-7 pl-2.5 pr-7 bg-white border border-slate-300 rounded text-xs text-slate-700 focus:outline-none focus:border-[#1677ff] transition"
                      />
                      <svg class="w-3.5 h-3.5 absolute right-2 top-1.5 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- 定额卡片列表 (与截图排版完全一致) -->
                <div class="space-y-2.5">
                  <div
                    v-for="item in displayedQuotaList"
                    :key="item.id"
                    class="bg-[#f8fafc]/50 rounded-xl border border-slate-200/90 p-3.5 space-y-2.5 transition-all hover:border-[#bfdbfe] hover:bg-white shadow-2xs"
                  >
                    <!-- 顶部标题与浅绿药丸标签 -->
                    <div class="flex flex-wrap items-center gap-2.5">
                      <span class="font-normal text-slate-800 text-xs tracking-tight">
                        {{ item.code }}【{{ item.category }}】：{{ item.productName }}
                      </span>
                      
                      <!-- 标签组 -->
                      <div v-if="item.efficiency || item.topography || item.altitude" class="flex items-center gap-2">
                        <span
                          v-if="item.efficiency"
                          class="px-2.5 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] font-normal text-[11px]"
                        >
                          效率值: {{ item.efficiency }}
                        </span>
                        <span
                          v-if="item.topography"
                          class="px-2.5 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] font-normal text-[11px]"
                        >
                          地貌分区: {{ item.topography }}
                        </span>
                        <span
                          v-if="item.altitude"
                          class="px-2.5 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] font-normal text-[11px]"
                        >
                          海拔: {{ item.altitude }}
                        </span>
                      </div>
                    </div>

                    <!-- 属性网格：单位用水定额 / 灌溉方式 / 水资源分区 -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-400">
                      <div>
                        单位用水定额：<span class="text-slate-600 font-mono">{{ item.quotaValue }}</span>
                      </div>
                      <div>
                        灌溉方式：<span class="text-slate-600">{{ item.method }}</span>
                      </div>
                      <div>
                        水资源分区：<span class="text-slate-600">{{ item.waterRegion }}</span>
                      </div>
                    </div>

                    <!-- 分区范围 -->
                    <div class="text-xs text-slate-400">
                      分区范围：<span class="text-slate-600">{{ item.regionScope }}</span>
                    </div>
                  </div>

                  <!-- 空状态 -->
                  <div v-if="displayedQuotaList.length === 0" class="py-8 text-center text-slate-400 text-xs">
                    暂无符合筛选条件的用水定额信息
                  </div>
                </div>

                <!-- 底部翻页组件 (与截图中的 < 1 [2] 3 4 5 > 样式完全一致) -->
                <div class="flex items-center justify-end pt-2">
                  <div class="flex items-center gap-1.5 text-xs text-slate-600 select-none">
                    <!-- 上一页 -->
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

                    <!-- 页码 1 到 5 (第2页高亮选中蓝框) -->
                    <button
                      v-for="page in quotaTotalPages"
                      :key="page"
                      type="button"
                      @click="quotaCurrentPage = page"
                      class="w-7 h-7 rounded border text-xs font-normal transition cursor-pointer flex items-center justify-center"
                      :class="quotaCurrentPage === page
                        ? 'border-[#1677ff] text-[#1677ff] bg-white font-medium shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'"
                    >
                      {{ page }}
                    </button>

                    <!-- 下一页 -->
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

            </div>

            <!-- Tab 5: 申报材料与佐证附件 (完全与计量设施档案列表查看附件样式一致) -->
            <div v-else-if="activeRightTab === 'attachments'" class="space-y-4">
              <div class="bg-white rounded-lg border border-slate-200/80 p-5 shadow-2xs space-y-3.5">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[13px] font-bold text-slate-800">申报佐证附件材料列表</span>
                    <span class="text-xs text-gray-400 font-mono">({{ attachments.length }} 个文件)</span>
                  </div>
                  <span class="text-[11px] text-gray-400">水利核验佐证凭据</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div
                    v-for="(att, aIdx) in attachments"
                    :key="aIdx"
                    class="flex items-center justify-between p-2.5 rounded-lg border border-[#c4d8ee] bg-[#f9fbfe] hover:bg-[#f0f5fd] transition gap-2.5"
                  >
                    <div class="flex items-center gap-2.5 min-w-0 flex-1">
                      <!-- 1. 图片图标 (蓝底相机) -->
                      <div
                        v-if="att.type === 'image'"
                        class="w-7 h-7 rounded bg-[#e6f1fc] text-[#1677ff] flex items-center justify-center shrink-0"
                      >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </div>

                      <!-- 2. Word 图标 (蓝紫色底 W) -->
                      <div
                        v-else-if="att.type === 'word'"
                        class="w-7 h-7 rounded bg-[#eef0fe] text-[#2f54eb] flex items-center justify-center shrink-0 font-bold text-xs"
                      >
                        W
                      </div>

                      <!-- 3. PDF 图标 (红底文档) -->
                      <div
                        v-else
                        class="w-7 h-7 rounded bg-[#feebee] text-[#f5222d] flex items-center justify-center shrink-0"
                      >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                      </div>

                      <div class="truncate">
                        <span class="text-xs text-gray-800 font-medium truncate block" :title="att.name">
                          {{ att.name }}
                        </span>
                        <span class="text-[10.5px] text-gray-400 font-mono block">
                          {{ att.size }} · 计划申请佐证文件
                        </span>
                      </div>
                    </div>

                    <div class="flex items-center gap-1.5 shrink-0 text-gray-400">
                      <button
                        v-if="att.type === 'image' || att.type === 'pdf'"
                        type="button"
                        @click.stop="openPreview(att)"
                        class="hover:text-[#1677ff] p-1.5 cursor-pointer rounded transition"
                        title="预览附件"
                      >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                      <button
                        type="button"
                        @click.stop="downloadAttachment(att)"
                        class="hover:text-[#1677ff] p-1.5 cursor-pointer rounded transition"
                        title="下载附件"
                      >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- 3. 全局底部操作栏 (右侧取消/驳回/通过按钮) -->
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

          <button
            type="button"
            @click="handleApprove"
            class="px-6 py-2 rounded-md bg-[#1677ff] hover:bg-blue-600 text-white text-xs font-medium transition cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>同意并通过</span>
          </button>
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { WaterPlanRecord, FormQuotaData, MonthlySummaryRow } from '../../../types';
import WaterQuotaAuditForm from './WaterQuotaAuditForm.vue';

const props = defineProps<{
  visible: boolean;
  record: WaterPlanRecord | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'submit-audit', updatedRecord: WaterPlanRecord): void;
}>();

const rightTabs = [
  { key: 'plan_application', label: '计划申请填报表' },
  { key: 'summary', label: '取水总结填报表' },
  { key: 'electronic_license', label: '电子证照信息' },
  { key: 'water_quota', label: '用水定额' },
  { key: 'attachments', label: '佐证材料与附件' },
];

const activeRightTab = ref<'summary' | 'plan_application' | 'electronic_license' | 'water_quota' | 'attachments'>('plan_application');
const auditOpinion = ref('经审查，该单位用水计划指标符合西宁市刚性约束管控方案与行业定额，予以审核通过。');

// 近三年用水计划数据 (与截图完全一致)
const recentThreeYearsPlan = ref([
  { year: '2025', surfaceWater: '0.00', groundwater: '0.01', recycledWater: '0.02', rainWater: '0.00', mineWater: '0.01', brackishWater: '0.00', total: '0.01' },
  { year: '2024', surfaceWater: '0.03', groundwater: '0.04', recycledWater: '0.05', rainWater: '0.03', mineWater: '0.04', brackishWater: '0.03', total: '0.04' },
  { year: '2023', surfaceWater: '0.06', groundwater: '0.07', recycledWater: '0.08', rainWater: '0.06', mineWater: '0.07', brackishWater: '0.06', total: '0.07' },
]);

// 填报说明弹窗
const quotaGuideModalVisible = ref(false);

// 用水定额卡片数据项接口
interface QuotaCardItem {
  id: string;
  code: string;
  category: string;
  productName: string;
  efficiency?: string;
  topography?: string;
  altitude?: string;
  quotaValue: string;
  method: string;
  waterRegion: string;
  regionScope: string;
}

// 用水定额筛选条件
const quotaFilter = reactive({
  method: '常规灌溉',
  efficiency: '50%',
  keyword: '',
});

// 当前激活页码 (第2页高亮选中，与截图一致)
const quotaCurrentPage = ref(2);
const quotaTotalPages = 5;

// 用水定额卡片基础数据 (与截图 100% 对应)
const allQuotaList = ref<QuotaCardItem[]>([
  {
    id: 'q-1',
    code: 'A019283',
    category: '小麦种植类',
    productName: '小麦',
    efficiency: '50%',
    topography: '浅山',
    altitude: '高',
    quotaValue: '<=280L/(人·d))',
    method: '常规灌溉',
    waterRegion: '湟水',
    regionScope: '湟源、西宁、大通、湟中、互助、平安、乐都、民和(川口地区)',
  },
  {
    id: 'q-2',
    code: 'A019283',
    category: '小麦种植类',
    productName: '小麦',
    efficiency: '50%',
    topography: '浅山',
    altitude: '高',
    quotaValue: '<=280L/(人·d))',
    method: '常规灌溉',
    waterRegion: '玛曲龙羊峡',
    regionScope: '湟源、西宁、大通、湟中、互助、平安、乐都、民和(川口地区)',
  },
  {
    id: 'q-3',
    code: 'A019283',
    category: '小麦种植类',
    productName: '小麦',
    quotaValue: '<=280L/(人·d))',
    method: '常规灌溉',
    waterRegion: '柴达木盆地',
    regionScope: '湟源、西宁、大通、湟中、互助、平安、乐都、民和(川口地区)',
  },
  {
    id: 'q-4',
    code: 'A019284',
    category: '小麦种植类',
    productName: '冬小麦',
    efficiency: '50%',
    topography: '川水',
    altitude: '中',
    quotaValue: '<=260L/(人·d))',
    method: '常规灌溉',
    waterRegion: '湟水',
    regionScope: '西宁、大通、湟中、互助、平安',
  },
  {
    id: 'q-5',
    code: 'A019285',
    category: '杂粮种植类',
    productName: '高原青稞',
    efficiency: '60%',
    topography: '脑山',
    altitude: '高',
    quotaValue: '<=220L/(人·d))',
    method: '喷灌',
    waterRegion: '玛曲龙羊峡',
    regionScope: '湟源、大通、湟中',
  },
]);

// 过滤后的定额列表
const displayedQuotaList = computed(() => {
  return allQuotaList.value.filter((item) => {
    if (quotaFilter.method !== '全部' && item.method !== quotaFilter.method) {
      return false;
    }
    if (quotaFilter.efficiency !== '全部' && item.efficiency && item.efficiency !== quotaFilter.efficiency) {
      return false;
    }
    if (quotaFilter.keyword.trim()) {
      const kw = quotaFilter.keyword.trim();
      return (
        item.productName.includes(kw) ||
        item.category.includes(kw) ||
        item.code.includes(kw) ||
        item.waterRegion.includes(kw)
      );
    }
    return true;
  });
});

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

// 监听选中的 record 初始化基础信息与双表单
watch(
  () => props.record,
  (rec) => {
    if (rec) {
      form.value.waterOwner = rec.unitName || '青海亚洲硅业高纯材料有限公司';
      form.value.permitNumber = rec.permitNumber || 'B630121G2026-0055';
      form.value.permitVolume = rec.permitVolume || 2345.87;
      form.value.year = rec.year || '2026';
      form.value.detailedAddress = `青海省西宁市${rec.district}重点产业园区`;
      activeRightTab.value = 'plan_application';
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
