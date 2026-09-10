<template>
  <div
    v-if="visible && item"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none"
    @click.self="handleClose"
  >
    <!-- 弹窗主体容器：保持与详情弹窗一致的大方布局 (max-w-[1240px], max-h-[92vh]) -->
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1240px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
    >
      <!-- 1. 顶部标题栏 (Light Header)：浅灰蓝背景、精致微光与底边分割线 -->
      <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-2xs">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">违规问题处理审核</h3>
              <span
                class="px-2 py-0.5 rounded text-[11px] font-medium border"
                :class="item.status === '排查-省级待审核' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-600 border-blue-200'"
              >
                {{ item.status || '排查-省级待审核' }}
              </span>
              <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200">
                省级审核复核认定
              </span>
            </div>
          </div>
        </div>

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

      <!-- 2. 内容主体 -->
      <!-- 结构顺序：
           1) 问题详情卡片（完整复用详情）
           2) 问题排查详情信息（简洁呈现3个字段：原因说明、作证材料、是否确认为问题）
           3) 审核意见（简洁操作栏：是否审核通过、审核意见）
           4) 问题排查流转流程（流程卡片在最后）
      -->
      <div class="p-4 overflow-y-auto space-y-3.5 text-xs text-slate-800 custom-scrollbar flex-1 bg-[#fcfdff]">
        
        <!-- 卡片 1：【问题详情】(完全复制详情内容) -->
        <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">问题详情</span>
            </div>
            <div class="text-[11px] text-slate-400">
              问题发现时间：<span class="font-mono text-slate-600">{{ item.reportDate || '2026-08-28' }}</span>
            </div>
          </div>

          <!-- 两列网格结构，排版舒展大方，标签与值层级分明 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[12.5px]">
            <!-- 问题排查单位 -->
            <div class="flex items-baseline">
              <span class="w-32 shrink-0 text-slate-400 font-normal">问题排查单位</span>
              <span class="text-slate-800 font-medium leading-relaxed">{{ item.handleUnit || '--' }}</span>
            </div>

            <!-- 问题整改单位 -->
            <div class="flex items-baseline">
              <span class="w-32 shrink-0 text-slate-400 font-normal">问题整改单位</span>
              <span class="text-slate-800 font-medium">{{ item.rectificationUnit || '--' }}</span>
            </div>

            <!-- 处置时限 -->
            <div class="flex items-baseline">
              <span class="w-32 shrink-0 text-slate-400 font-normal">处置时限</span>
              <div class="flex items-center gap-1.5 text-slate-800 font-medium">
                <span class="inline-flex items-center gap-1 text-amber-600 bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/60 text-[11.5px]">
                  <svg class="w-3 h-3 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {{ displayDeadline }}
                </span>
              </div>
            </div>

            <!-- 证照编码 -->
            <div class="flex items-baseline">
              <span class="w-32 shrink-0 text-slate-400 font-normal">证照编码</span>
              <span class="text-slate-800 font-medium font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">{{ item.permitNumber || '--' }}</span>
            </div>

            <!-- 统一社会信用代码 -->
            <div class="flex items-baseline">
              <span class="w-32 shrink-0 text-slate-400 font-normal">统一社会信用代码</span>
              <span class="text-slate-800 font-medium font-mono">{{ displayCreditCode }}</span>
            </div>

            <!-- 取水许可审批机关 -->
            <div class="flex items-baseline">
              <span class="w-32 shrink-0 text-slate-400 font-normal">取水许可审批机关</span>
              <span class="text-slate-800 font-medium">{{ item.approvalAuthority || '--' }}</span>
            </div>

            <!-- 取水权人名称 (跨列保证长文本完整展示) -->
            <div class="md:col-span-2 flex items-baseline">
              <span class="w-32 shrink-0 text-slate-400 font-normal">取水权人名称</span>
              <span class="text-slate-800 font-medium leading-relaxed">{{ item.waterOwner || '--' }}</span>
            </div>

            <!-- 问题类型 -->
            <div class="flex items-baseline">
              <span class="w-32 shrink-0 text-slate-400 font-normal">问题类型</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-medium border border-blue-200/60 text-[11.5px]">
                {{ displayViolationType }}
              </span>
            </div>

            <!-- 资料上传 -->
            <div class="flex items-baseline">
              <span class="w-32 shrink-0 text-slate-400 font-normal">资料上传</span>
              <span class="text-slate-600 font-normal flex items-center gap-1">
                <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
                {{ item.attachmentInfo || '暂无附件' }}
              </span>
            </div>

            <!-- 问题描述 (跨列展示) -->
            <div class="md:col-span-2 flex items-start pt-1">
              <span class="w-32 shrink-0 text-slate-400 font-normal pt-1">问题描述</span>
              <div class="flex-1 bg-[#f8fafc] p-3 rounded-lg border border-slate-200/70 text-slate-700 leading-relaxed text-[12px]">
                {{ item.description || item.violationReason || '现场监测计量器具超许可核定年许可量取水，已通过自动预警研判触发排查工单，请属地主管部门立即派员实地复核并上传整改方案。' }}
              </div>
            </div>
          </div>
        </div>

        <!-- 卡片 2：【问题排查详情信息】(放在问题详情之后，简洁展示：原因说明、作证材料、是否确认为问题 三个字段) -->
        <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-teal-600 rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">问题排查详情信息</span>
            </div>
            <div class="text-[11.5px] text-slate-500">
              排查单位：<span class="text-slate-700 font-medium">{{ item.handleUnit || '--' }}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 text-[12.5px]">
            <!-- 字段 1：是否确认为问题 -->
            <div class="md:col-span-2 flex items-center">
              <span class="w-32 shrink-0 text-slate-400 font-normal">是否确认为问题</span>
              <div>
                <span
                  class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-medium text-[12px] border"
                  :class="isConfirmedProblemDisplay === '是'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : isConfirmedProblemDisplay === '否'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="isConfirmedProblemDisplay === '是' ? 'bg-rose-500' : isConfirmedProblemDisplay === '否' ? 'bg-emerald-500' : 'bg-amber-500'"
                  ></span>
                  {{ isConfirmedProblemDisplay }}
                </span>
              </div>
            </div>

            <!-- 字段 2：原因说明 -->
            <div class="md:col-span-2 flex items-start">
              <span class="w-32 shrink-0 text-slate-400 font-normal pt-1">原因说明</span>
              <div class="flex-1 bg-[#f8fafc] p-2.5 rounded-lg border border-slate-200/70 text-slate-700 leading-relaxed text-[12px]">
                {{ displayInvestigationReason }}
              </div>
            </div>

            <!-- 字段 3：作证材料 -->
            <div class="md:col-span-2 flex items-start">
              <span class="w-32 shrink-0 text-slate-400 font-normal pt-1">作证材料</span>
              <div class="flex-1 space-y-1.5">
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="doc in evidenceList"
                    :key="doc.id"
                    class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 transition text-slate-700 shadow-2xs group"
                  >
                    <svg class="w-3.5 h-3.5 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                    <span class="text-[12px] font-medium max-w-[320px] truncate" :title="doc.name">{{ doc.name }}</span>
                    <span class="text-[10.5px] text-slate-400 font-mono">({{ doc.size }})</span>
                    <button
                      type="button"
                      @click="handlePreviewEvidence(doc)"
                      class="ml-1 text-[11px] text-[#1677ff] hover:underline cursor-pointer font-normal"
                    >
                      预览
                    </button>
                    <button
                      type="button"
                      @click="handleDownloadEvidence(doc)"
                      class="text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer font-normal"
                    >
                      下载
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 卡片 3：【审核意见操作栏】(放在流转流程之前，简洁设计：仅包含“是否审核通过”与“审核意见”) -->
        <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-blue-600 rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">审核意见</span>
            </div>
            <div class="text-[11px] text-slate-400">
              省级审核复核认定
            </div>
          </div>

          <div class="space-y-3 pt-1">
            <!-- 1. 是否审核通过 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-600 font-medium text-[12.5px]">
                <span class="text-red-500 font-bold mr-1">*</span>是否审核通过
              </span>
              <div class="flex items-center gap-4">
                <label
                  class="flex items-center gap-2 px-3.5 py-1.5 rounded-md border cursor-pointer transition text-xs font-medium"
                  :class="auditPassed === true ? 'bg-emerald-50 border-emerald-300 text-emerald-700 ring-1 ring-emerald-200' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'"
                >
                  <input
                    type="radio"
                    name="auditPassedChoice"
                    :value="true"
                    v-model="auditPassed"
                    class="accent-emerald-600"
                  />
                  <span>通过</span>
                </label>

                <label
                  class="flex items-center gap-2 px-3.5 py-1.5 rounded-md border cursor-pointer transition text-xs font-medium"
                  :class="auditPassed === false ? 'bg-rose-50 border-rose-300 text-rose-700 ring-1 ring-rose-200' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'"
                >
                  <input
                    type="radio"
                    name="auditPassedChoice"
                    :value="false"
                    v-model="auditPassed"
                    class="accent-rose-600"
                  />
                  <span>不通过</span>
                </label>
              </div>
            </div>

            <!-- 2. 审核意见 -->
            <div class="flex items-start">
              <span class="w-32 shrink-0 text-slate-600 font-medium text-[12.5px] pt-1.5">
                <span class="text-red-500 font-bold mr-1">*</span>审核意见
              </span>
              <div class="flex-1 space-y-1.5">
                <textarea
                  v-model="auditRemark"
                  rows="2"
                  placeholder="请输入审核意见..."
                  class="w-full p-2.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 leading-relaxed focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                ></textarea>
                <div class="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span>快捷填入：</span>
                  <button
                    type="button"
                    @click="auditRemark = '同意基层排查结论，审核通过。'"
                    class="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-[#1677ff] text-slate-600 transition cursor-pointer"
                  >
                    同意排查结论，审核通过
                  </button>
                  <button
                    type="button"
                    @click="auditRemark = '排查证据材料不充分，退回属地水利局重新核实。'"
                    class="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-[#1677ff] text-slate-600 transition cursor-pointer"
                  >
                    证据材料不充分，退回重新核实
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 卡片 4：【问题排查流转流程】(流程卡片放在最后) -->
        <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">问题排查流转流程</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-medium text-[11px]">
                <span class="w-1.5 h-1.5 rounded-full bg-teal-600 animate-ping"></span>
                当前环节：第 4 阶段（排查-省级审核）
              </span>
            </div>
          </div>

          <!-- 横向流程步骤条区域 -->
          <div class="overflow-x-auto horizontal-scrollbar pb-3 pt-2">
            <div class="min-w-[1080px] px-2">
              <div class="relative flex items-start justify-between">
                <!-- 步骤 1 ~ 步骤 8 -->
                <div
                  v-for="(step, idx) in auditProcessSteps"
                  :key="step.title"
                  class="flex-1 relative flex flex-col items-center"
                >
                  <!-- 步骤连接横线 -->
                  <div
                    v-if="idx < auditProcessSteps.length - 1"
                    class="absolute top-4 left-1/2 w-full h-[2px] -z-0 transition-colors"
                    :class="step.isCompleted ? 'bg-[#10b981]' : 'bg-slate-200'"
                  ></div>

                  <!-- 步骤圆形节点图标 -->
                  <div class="relative z-10 bg-white p-1">
                    <!-- 1. 已完成步骤 -->
                    <div
                      v-if="step.isCompleted"
                      class="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center font-bold text-sm shadow-xs transition-transform hover:scale-105"
                      title="已完成"
                    >
                      <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>

                    <!-- 2. 当前处理中步骤 -->
                    <div
                      v-else-if="step.isCurrent"
                      class="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-md ring-4 ring-teal-100 transition-transform hover:scale-105"
                      title="当前正在省级审核中"
                    >
                      {{ idx + 1 }}
                    </div>

                    <!-- 3. 待处理步骤 -->
                    <div
                      v-else
                      class="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 text-slate-400 flex items-center justify-center font-medium text-xs transition-transform"
                      title="待处理"
                    >
                      {{ idx + 1 }}
                    </div>
                  </div>

                  <!-- 步骤内容展示卡片 -->
                  <div class="mt-3 flex flex-col items-center w-full px-1.5">
                    <div
                      class="text-[12.5px] font-semibold transition-colors"
                      :class="step.isCompleted ? 'text-emerald-700' : step.isCurrent ? 'text-teal-700' : 'text-slate-600'"
                    >
                      {{ step.title }}
                    </div>

                    <!-- 状态胶囊标签 -->
                    <div class="mt-1.5">
                      <span
                        v-if="step.isCompleted"
                        class="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                      >
                        已完成
                      </span>
                      <span
                        v-else-if="step.isCurrent"
                        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-teal-50 text-teal-700 border border-teal-200/60"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
                        审核中
                      </span>
                      <span
                        v-else
                        class="inline-block px-2 py-0.5 rounded-full text-[10px] font-normal bg-slate-50 text-slate-400 border border-slate-200/50"
                      >
                        待启动
                      </span>
                    </div>

                    <!-- 步骤具体流转详情卡片 -->
                    <div class="mt-2.5 w-full">
                      <div
                        v-if="step.info"
                        class="p-2.5 rounded-lg bg-emerald-50/40 border border-emerald-100 text-[11px] text-slate-600 space-y-1 text-left shadow-2xs"
                      >
                        <div class="flex items-center gap-1 text-slate-500">
                          <svg class="w-3 h-3 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span class="truncate font-mono">{{ step.info.time }}</span>
                        </div>
                        <div class="truncate">
                          <span class="text-slate-400">经办:</span> {{ step.info.user }} ({{ step.info.dept }})
                        </div>
                        <div class="text-slate-400 font-mono">
                          电话: {{ step.info.phone }}
                        </div>
                      </div>

                      <div
                        v-else-if="step.isCurrent"
                        class="p-2.5 rounded-lg bg-teal-50/50 border border-teal-200 text-[11px] text-slate-600 space-y-1 text-left shadow-2xs"
                      >
                        <div class="text-teal-700 font-medium flex items-center gap-1">
                          <svg class="w-3 h-3 text-teal-600 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="2" x2="12" y2="6"></line>
                            <line x1="12" y1="18" x2="12" y2="22"></line>
                            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                            <line x1="2" y1="12" x2="6" y2="12"></line>
                            <line x1="18" y1="12" x2="22" y2="12"></line>
                            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                          </svg>
                          省级专家复核中
                        </div>
                        <div class="text-slate-500 truncate" title="青海省水资源管理中心">
                          审核机构: 省水资源中心
                        </div>
                        <div class="text-amber-600 font-mono">
                          办理时限: 剩余 3 工作日
                        </div>
                      </div>

                      <div
                        v-else
                        class="p-2 rounded-lg bg-slate-50/60 border border-dashed border-slate-200 text-[11px] text-slate-400 text-center"
                      >
                        等待上游流转
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 3. 底部操作栏 (Light Footer)：提供确定/取消操作 -->
      <div class="px-6 py-3 bg-[#f8fafc] border-t border-slate-200/80 flex items-center justify-between shrink-0">
        <div class="text-xs text-slate-500 flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full" :class="auditPassed ? 'bg-emerald-500' : 'bg-rose-500'"></span>
          <span v-if="auditPassed">
            审核通过后，该工单将流转至【整改落实】阶段。
          </span>
          <span v-else>
            审核不通过时，该工单将退回属地水利部门重新排查。
          </span>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-md text-xs font-medium transition cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            @click="handleSubmitAudit"
            class="px-5 py-1.5 text-white rounded-md text-xs font-medium transition cursor-pointer shadow-xs flex items-center gap-1.5"
            :class="auditPassed ? 'bg-[#1677ff] hover:bg-blue-600' : 'bg-rose-600 hover:bg-rose-700'"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {{ auditPassed ? '确认审核通过' : '确认审核不通过' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 4. 作证材料在线预览弹窗 -->
    <div
      v-if="previewDoc"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs select-none"
      @click.self="previewDoc = null"
    >
      <div class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-[760px] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95">
        <div class="px-5 py-3 bg-[#f8fafc] border-b border-slate-200 flex items-center justify-between">
          <div class="flex items-center gap-2 text-slate-800 font-semibold text-sm">
            <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span>作证材料预览 - {{ previewDoc.name }}</span>
          </div>
          <button
            type="button"
            @click="previewDoc = null"
            class="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto flex-1 bg-slate-50 flex flex-col items-center justify-center text-center">
          <div class="bg-white p-6 rounded-lg border border-slate-200 shadow-sm w-full max-w-[620px] text-left space-y-4 font-sans">
            <div class="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h4 class="text-base font-bold text-slate-900">{{ previewDoc.name.replace('.pdf', '').replace('.jpg', '') }}</h4>
                <p class="text-xs text-slate-500 mt-1">发证/核查机关：{{ item.handleUnit }}</p>
              </div>
              <div class="w-16 h-16 rounded-full border-2 border-red-500/80 text-red-500 flex items-center justify-center text-[10px] font-bold rotate-[-15deg] select-none pointer-events-none">
                水政核实专用章
              </div>
            </div>

            <div class="text-xs text-slate-700 leading-relaxed space-y-2">
              <p><strong>取水权人：</strong>{{ item.waterOwner }}</p>
              <p><strong>许可证号：</strong><span class="font-mono">{{ item.permitNumber }}</span></p>
              <p><strong>核查时间：</strong><span class="font-mono">{{ previewDoc.date }}</span></p>
              <p><strong>勘查核实摘要：</strong>执法人员现场核验水表瞬时流量与年度累计取水量，取水计量设施运行正常，经与国家取用水监管系统数据比对一致。相关取水事实已与当事人当面核实并制作笔录。</p>
            </div>

            <div class="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>文件大小：<strong class="font-mono text-slate-800">{{ previewDoc.size }}</strong></span>
              <span class="text-emerald-600 font-medium">✓ 数字指纹已上链校验通过</span>
            </div>
          </div>
        </div>

        <div class="px-5 py-2.5 bg-white border-t border-slate-200 flex items-center justify-end gap-2.5">
          <button
            type="button"
            @click="handleDownloadEvidence(previewDoc)"
            class="px-3.5 py-1.5 rounded text-xs font-medium text-white bg-[#1677ff] hover:bg-blue-600 transition cursor-pointer"
          >
            下载电子卷宗
          </button>
          <button
            type="button"
            @click="previewDoc = null"
            class="px-3.5 py-1.5 rounded text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
          >
            关闭预览
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { ViolationItem } from '../../mockViolationData';

const props = defineProps<{
  visible: boolean;
  item: ViolationItem | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'audit-complete', item: ViolationItem, conclusion: string, resultData?: {
    passed: boolean;
    conclusion: string;
    opinion: string;
    isConfirmedProblem: '是' | '否' | '待研判';
    investigationReason: string;
  }): void;
}>();

// 1. 审核意见操作状态（仅保留：是否审核通过、审核意见）
const auditPassed = ref<boolean>(true);
const auditRemark = ref('同意基层排查结论，审核通过。');

// 2. 预览作证材料
const previewDoc = ref<{ id: string; name: string; size: string; type: string; date: string } | null>(null);

// 当 item 变化或弹窗打开时，初始化
watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      auditPassed.value = true;
      auditRemark.value = '同意基层排查结论，审核通过。';
    }
  },
  { immediate: true }
);

// 处置时限回显 (与详情保持 100% 一致)
const displayDeadline = computed(() => {
  if (!props.item) return '--';
  if (props.item.disposalDeadline) return props.item.disposalDeadline;
  return `10个工作日，截止时间为2026年09月17日`;
});

// 统一社会信用代码回显
const displayCreditCode = computed(() => {
  if (!props.item) return '--';
  if (props.item.creditCode) return props.item.creditCode;
  return `12632324MB1K21792Q`;
});

// 问题类型回显
const displayViolationType = computed(() => {
  if (!props.item) return '--';
  if (props.item.violationType) return props.item.violationType;
  if (props.item.category === 'meter_exceed') return '超许可取水';
  if (props.item.category === 'direct_exceed') return '超计划取水';
  if (props.item.category === 'illegal_new_permit') return '无证取水';
  if (props.item.category === 'expired_permit_water') return '逾期未换证取水';
  return '超许可取水';
});

// 问题排查详情展示计算 (3个字段)
// 1) 是否确认为问题
const isConfirmedProblemDisplay = computed(() => {
  if (!props.item) return '是';
  return props.item.isConfirmedProblem || '是';
});

// 2) 原因说明
const displayInvestigationReason = computed(() => {
  if (!props.item) return '--';
  return (
    props.item.investigationReason ||
    `经【${props.item.handleUnit}】派员现场实地核查，该取水权人近期因生产规模扩大，未经水行政主管部门批准擅自加大抽取负荷，导致水量超出许可限量。现场核验水表铅封完好，超量取水事实清楚。`
  );
});

// 3) 作证材料
const evidenceList = computed(() => {
  if (!props.item) return [];
  if (props.item.evidenceMaterials && props.item.evidenceMaterials.length > 0) {
    return props.item.evidenceMaterials;
  }
  return [
    {
      id: 'ev-1',
      name: `${props.item.county || '互助土族自治县'}水利局现场勘查取证单.pdf`,
      size: '2.6 MB',
      type: 'pdf',
      date: '2026-09-02 14:15',
    },
    {
      id: 'ev-2',
      name: '智能水表与取水现场实拍照.jpg',
      size: '3.4 MB',
      type: 'image',
      date: '2026-09-02 14:30',
    },
    {
      id: 'ev-3',
      name: '现场询问笔录(签字盖章版).pdf',
      size: '1.2 MB',
      type: 'pdf',
      date: '2026-09-02 15:35',
    },
  ];
});

// 审核流转节点计算 (8大完整节点，第4步省级审核高亮办理中)
const auditProcessSteps = computed(() => {
  const stepsList = [
    {
      title: '问题下发',
      info: {
        time: '2026-08-28 11:18:33',
        user: 'admin',
        dept: '水利部全国取用水监管系统',
        phone: '010-63202114',
      },
    },
    {
      title: '问题排查',
      info: {
        time: '2026-09-01 16:40:12',
        user: props.item?.investigator || '包文海',
        dept: props.item?.handleUnit || '县水利局执法大队',
        phone: '13897103482',
      },
    },
    {
      title: '排查-市级审核',
      info: {
        time: '2026-09-02 09:30:45',
        user: '刘主任',
        dept: `${props.item?.city || '海东市'}水务局`,
        phone: '0972-8612308',
      },
    },
    {
      title: '排查-省级审核',
      info: null,
    },
    {
      title: '问题整改',
      info: null,
    },
    {
      title: '整改-市级审核',
      info: null,
    },
    {
      title: '整改-省级审核',
      info: null,
    },
    {
      title: '办结归档',
      info: null,
    },
  ];

  return stepsList.map((st, index) => {
    // 0, 1, 2 为已完成
    const isCompleted = index < 3;
    // 3 (排查-省级审核) 为当前进行中
    const isCurrent = index === 3;
    return {
      title: st.title,
      isCompleted,
      isCurrent,
      info: isCompleted ? st.info : null,
    };
  });
});

const handleClose = () => {
  emit('update:visible', false);
};

// 预览作证材料
const handlePreviewEvidence = (doc: { id: string; name: string; size: string; type: string; date: string }) => {
  previewDoc.value = doc;
};

// 下载作证材料
const handleDownloadEvidence = (doc: { id: string; name: string; size: string; type: string; date: string }) => {
  MessagePlugin.success(`正在下载作证材料：【${doc.name}】`);
};

// 提交审核
const handleSubmitAudit = () => {
  if (!props.item) return;

  if (!auditRemark.value.trim()) {
    MessagePlugin.warning('请填写审核意见！');
    return;
  }

  const conclusionStr = auditPassed.value
    ? `审核通过（${isConfirmedProblemDisplay.value === '是' ? '确认违规属实' : '属实'}，下达整改）`
    : `审核不通过`;

  const resultData = {
    passed: auditPassed.value,
    conclusion: conclusionStr,
    opinion: auditRemark.value,
    isConfirmedProblem: (isConfirmedProblemDisplay.value as '是' | '否' | '待研判') || '是',
    investigationReason: displayInvestigationReason.value,
  };

  emit('audit-complete', props.item, conclusionStr, resultData);

  if (auditPassed.value) {
    MessagePlugin.success(`【${props.item.waterOwner}】省级审核通过，已流转至整改落实阶段`);
  } else {
    MessagePlugin.warning(`【${props.item.waterOwner}】审核不通过，已退回属地重新排查`);
  }

  handleClose();
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
}

.horizontal-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.horizontal-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 6px;
}
.horizontal-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
}
</style>
