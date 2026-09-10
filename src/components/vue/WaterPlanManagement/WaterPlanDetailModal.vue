<template>
  <div
    v-if="visible && record"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-3 backdrop-blur-2xs select-none"
    @click.self="handleClose"
  >
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1340px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[94vh]"
    >
      <!-- 1. 顶部标题栏 (简洁清爽) -->
      <div class="px-6 py-3 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          </div>
          <div class="flex items-center gap-2">
            <h3 class="text-[15px] font-bold text-slate-800 tracking-wide">用水计划详情</h3>
            <span class="text-slate-400">·</span>
            <span class="text-xs text-slate-700 font-semibold truncate max-w-md" :title="record.unitName">
              {{ record.unitName }}
            </span>
            <span
              class="px-2 py-0.5 rounded text-[11px] font-medium border"
              :class="[
                record.status === '审核通过'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : record.status === '审核驳回'
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-blue-50 text-blue-600 border-blue-200'
              ]"
            >
              {{ record.status }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
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

      <!-- 2. 用水单位基础信息条 (简洁 3 列) -->
      <div class="bg-[#f8fafc]/90 border-b border-slate-200/80 px-6 py-2.5 shrink-0 text-xs">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5">
          <div class="flex items-baseline gap-2">
            <span class="w-24 shrink-0 text-slate-400 font-normal">统一社会信用代码</span>
            <span class="text-slate-800 font-mono">{{ record.creditCode }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="w-24 shrink-0 text-slate-400 font-normal">所属行政区划</span>
            <span class="text-slate-800 font-medium">{{ record.city }} · {{ record.district }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="w-24 shrink-0 text-slate-400 font-normal">行业类型</span>
            <span class="text-slate-800 font-medium">{{ record.industryType }}</span>
          </div>

          <div class="flex items-baseline gap-2">
            <span class="w-24 shrink-0 text-slate-400 font-normal">取水类型</span>
            <span class="text-slate-800 font-medium">{{ record.waterIntakeType }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="w-24 shrink-0 text-slate-400 font-normal">直管类型</span>
            <span class="text-slate-800 font-medium">{{ record.directManageType }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="w-24 shrink-0 text-slate-400 font-normal">自备水源取水</span>
            <span :class="record.isSelfWaterSource === '是' ? 'text-emerald-600 font-medium' : 'text-slate-600'">
              {{ record.isSelfWaterSource === '是' ? '是（自备井取水）' : '否（公共管网供水）' }}
            </span>
          </div>
        </div>
      </div>

      <!-- 3. 主体内容区：左右分栏布局（左侧：3个标签页内容，右侧：用水计划审核流程） -->
      <div class="flex-1 flex overflow-hidden">
        
        <!-- 左侧区域：标签页与内容区 (flex-1) -->
        <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
          
          <!-- 标签切换栏：按照要求【只需要名称即可】，去除所有多余徽标与点缀 -->
          <div class="bg-white border-b border-slate-200/90 px-6 flex items-center gap-8 shrink-0 select-none">
            <button
              type="button"
              @click="activeTab = 'actual'"
              class="py-3 px-1 text-xs transition-all cursor-pointer border-b-2"
              :class="activeTab === 'actual' ? 'border-[#1677ff] text-[#1677ff] font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 font-medium'"
            >
              本年度实际用水表
            </button>

            <button
              type="button"
              @click="activeTab = 'plan'"
              class="py-3 px-1 text-xs transition-all cursor-pointer border-b-2"
              :class="activeTab === 'plan' ? 'border-[#1677ff] text-[#1677ff] font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 font-medium'"
            >
              下年度计划用水表
            </button>

            <button
              type="button"
              @click="activeTab = 'documents'"
              class="py-3 px-1 text-xs transition-all cursor-pointer border-b-2"
              :class="activeTab === 'documents' ? 'border-[#1677ff] text-[#1677ff] font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 font-medium'"
            >
              用水计划文件
            </button>
          </div>

          <!-- 标签内容区 (可纵向滚动) -->
          <div class="p-4 overflow-y-auto space-y-3 text-xs text-slate-800 custom-scrollbar flex-1 bg-[#f8fafc]/50">
            
            <!-- 标签 1: 本年度实际用水表 (只读呈现) -->
            <div v-show="activeTab === 'actual'" class="space-y-3 animate-in fade-in duration-150">
              <WaterQuotaAuditForm
                title="本年度实际用水填报与核定明细"
                theme="blue"
                :modelValue="actualQuotaData"
                :readonly="true"
                :defaultExpanded="true"
              />
            </div>

            <!-- 标签 2: 下年度计划用水表 (只读呈现) -->
            <div v-show="activeTab === 'plan'" class="space-y-3 animate-in fade-in duration-150">
              <WaterQuotaAuditForm
                title="下年度计划用水申报与核定明细"
                theme="blue"
                :modelValue="planQuotaData"
                :readonly="true"
                :defaultExpanded="true"
              />
            </div>

            <!-- 标签 3: 用水计划文件 (按照要求【用表格简单展示下就行了，附件的查看用小弹窗，点击之后有所有的附件】) -->
            <div v-show="activeTab === 'documents'" class="space-y-3 animate-in fade-in duration-150">
              <div class="overflow-x-auto custom-scrollbar bg-white rounded-lg border border-[#b8cde6] shadow-2xs">
                <table class="w-full text-xs border-collapse min-w-[980px]">
                  <thead class="bg-[#f0f5fc] text-slate-700 font-semibold border-b border-[#b8cde6]">
                    <tr>
                      <th class="py-2.5 px-3 text-center w-12 shrink-0">序号</th>
                      <th class="py-2.5 px-4 text-left min-w-[360px]">通知名称</th>
                      <th class="py-2.5 px-3 text-center w-32 shrink-0">通知类型</th>
                      <th class="py-2.5 px-3 text-left w-44 shrink-0">下发单位</th>
                      <th class="py-2.5 px-3 text-left min-w-[180px]">下发事件</th>
                      <th class="py-2.5 px-3 text-center w-36 shrink-0">下发时间</th>
                      <th class="py-2.5 px-3 text-center w-28 shrink-0">通知文件</th>
                      <th class="py-2.5 px-3 text-center w-24 shrink-0">操作</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    <tr
                      v-for="(issue, index) in documentIssues"
                      :key="issue.id"
                      class="hover:bg-blue-50/40 transition"
                    >
                      <td class="py-2.5 px-3 text-center text-slate-500 font-mono">{{ index + 1 }}</td>
                      <td class="py-2.5 px-4 font-medium text-slate-800 leading-normal" :title="issue.title">
                        {{ issue.title }}
                      </td>
                      <td class="py-2.5 px-3 text-center whitespace-nowrap">
                        <span
                          class="px-2 py-0.5 rounded text-[11px] font-medium border inline-block"
                          :class="[
                            issue.noticeType === '正式用水计划通知'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          ]"
                        >
                          {{ issue.noticeType }}
                        </span>
                      </td>
                      <td class="py-2.5 px-3 text-slate-600 truncate" :title="issue.issuerUnit">
                        {{ issue.issuerUnit }}
                      </td>
                      <td class="py-2.5 px-3 text-slate-600 truncate" :title="issue.issueEvent">
                        {{ issue.issueEvent }}
                      </td>
                      <td class="py-2.5 px-3 text-center text-slate-500 font-mono whitespace-nowrap">
                        {{ issue.issueTime }}
                      </td>
                      <td class="py-2.5 px-3 text-center whitespace-nowrap">
                        <button
                          type="button"
                          @click="openAttachmentModal(issue)"
                          class="text-[#1677ff] hover:underline font-medium cursor-pointer inline-flex items-center gap-1"
                        >
                          <svg class="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                            <polyline points="13 2 13 9 20 9"></polyline>
                          </svg>
                          <span>查看附件 ({{ issue.files.length }})</span>
                        </button>
                      </td>
                      <td class="py-2.5 px-3 text-center whitespace-nowrap">
                        <button
                          type="button"
                          @click="openAttachmentModal(issue)"
                          class="text-[#1677ff] hover:text-blue-800 font-medium cursor-pointer text-xs"
                        >
                          查看附件
                        </button>
                      </td>
                    </tr>

                    <tr v-if="documentIssues.length === 0">
                      <td colspan="8" class="py-8 text-center text-slate-400">
                        暂无用水计划文件下发记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        <!-- 右侧区域：用水计划审核流程 (严格参考用户截图设计) -->
        <div class="w-[260px] shrink-0 border-l border-slate-200 bg-white flex flex-col overflow-hidden select-none">
          <!-- 流程标题 -->
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <h4 class="text-[14px] font-bold text-slate-800 tracking-wide">用水计划审核流程</h4>
          </div>

          <!-- 流程垂直时间轴 (完全匹配截图节点、样式、图标与文案) -->
          <div class="p-5 overflow-y-auto flex-1 custom-scrollbar space-y-0">
            <div
              v-for="(step, sIdx) in workflowSteps"
              :key="step.id"
              class="relative flex items-start gap-3 pb-6 last:pb-2 group"
            >
              <!-- 垂直连接线 (最后一个节点不画线) -->
              <div
                v-if="sIdx < workflowSteps.length - 1"
                class="absolute left-3 top-6 bottom-0 w-[2px] bg-slate-200"
              ></div>

              <!-- 节点圆圈图标：蓝色圆圈带勾 或 红色圆圈带叉 -->
              <div class="relative z-10 shrink-0 mt-0.5">
                <!-- 审核驳回：红色圆圈 + 红色叉 -->
                <div
                  v-if="step.status === 'rejected'"
                  class="w-6 h-6 rounded-full border-2 border-[#f5222d] bg-white flex items-center justify-center text-[#f5222d] shadow-2xs"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                <!-- 审核通过 / 正常节点：蓝色圆圈 + 蓝色勾 -->
                <div
                  v-else
                  class="w-6 h-6 rounded-full border-2 border-[#1677ff] bg-white flex items-center justify-center text-[#1677ff] shadow-2xs"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>

              <!-- 节点文字信息：标题与操作人/单位及时间 -->
              <div class="min-w-0 flex-1 pt-0.5">
                <div
                  class="text-[13px] font-semibold leading-tight"
                  :class="step.status === 'rejected' ? 'text-slate-800' : 'text-slate-800'"
                >
                  {{ step.title }}
                </div>
                <div class="text-[11px] text-slate-400 mt-1 leading-normal">
                  {{ step.subtitle }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 4. 底部操作栏 -->
      <div class="px-6 py-2.5 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0">
        <div class="text-xs text-slate-400 flex items-center gap-2">
          <span>档案编号：<span class="font-mono text-slate-600">{{ record.id }}</span></span>
        </div>

        <button
          type="button"
          @click="handleClose"
          class="px-5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer text-xs font-medium"
        >
          关闭
        </button>
      </div>
    </div>

    <!-- ================= 附件查看小弹窗 (点击之后有所有的附件) ================= -->
    <div
      v-if="attachmentModalVisible && currentNoticeForAttachments"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/50 p-4 backdrop-blur-2xs select-none"
      @click.self="attachmentModalVisible = false"
    >
      <div class="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-[620px] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <!-- 弹窗顶部 -->
        <div class="px-5 py-3 bg-[#f8fafc] border-b border-slate-200 flex items-center justify-between">
          <div class="flex items-center gap-2 min-w-0 flex-1 pr-2">
            <div class="w-6 h-6 rounded-md bg-blue-50 text-[#1677ff] flex items-center justify-center shrink-0">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
            </div>
            <div class="min-w-0">
              <h4 class="text-xs font-bold text-slate-800 truncate" :title="currentNoticeForAttachments.title">
                {{ currentNoticeForAttachments.title }}
              </h4>
              <p class="text-[11px] text-slate-400 mt-0.5 truncate">
                下发单位：{{ currentNoticeForAttachments.issuerUnit }} · 共 {{ currentNoticeForAttachments.files.length }} 个附件
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="attachmentModalVisible = false"
            class="text-slate-400 hover:text-slate-700 p-1 rounded transition cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 附件清单列表展示 -->
        <div class="p-4 overflow-y-auto space-y-2.5 text-xs text-slate-800 custom-scrollbar flex-1 bg-slate-50/50">
          <div
            v-for="(file, fIdx) in currentNoticeForAttachments.files"
            :key="file.id || fIdx"
            class="flex items-center justify-between p-2.5 rounded-lg border border-[#c4d8ee] bg-white hover:bg-blue-50/30 transition gap-3"
          >
            <div class="flex items-center gap-2.5 min-w-0 flex-1">
              <!-- 文件类型徽标 -->
              <div
                v-if="file.type === 'pdf'"
                class="w-8 h-8 rounded bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 font-bold text-[10.5px] border border-rose-100"
              >
                PDF
              </div>
              <div
                v-else-if="file.type === 'excel'"
                class="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-[10.5px] border border-emerald-100"
              >
                XLS
              </div>
              <div
                v-else-if="file.type === 'word'"
                class="w-8 h-8 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-[10.5px] border border-indigo-100"
              >
                DOC
              </div>
              <div
                v-else
                class="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>

              <!-- 文件名称与文件大小 -->
              <div class="truncate">
                <span class="text-xs text-slate-800 font-medium truncate block" :title="file.name">
                  {{ file.name }}
                </span>
                <div class="flex items-center gap-2 text-[10.5px] text-slate-400 font-mono mt-0.5">
                  <span>{{ file.size }}</span>
                  <span v-if="file.uploadTime">· {{ file.uploadTime }}</span>
                </div>
              </div>
            </div>

            <!-- 操作按钮：预览与下载 -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                @click="openFilePreview(file, currentNoticeForAttachments)"
                class="px-2.5 py-1 rounded bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 text-xs font-medium flex items-center gap-1 cursor-pointer transition shadow-2xs"
              >
                <span>预览</span>
              </button>
              <button
                type="button"
                @click="downloadFile(file)"
                class="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium flex items-center gap-1 cursor-pointer transition shadow-2xs"
              >
                <span>下载</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 弹窗底部 -->
        <div class="px-5 py-2.5 bg-[#f8fafc] border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            @click="downloadAllFiles(currentNoticeForAttachments)"
            class="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 text-xs font-medium cursor-pointer transition flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>打包下载所有附件</span>
          </button>

          <button
            type="button"
            @click="attachmentModalVisible = false"
            class="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium cursor-pointer transition"
          >
            关闭
          </button>
        </div>
      </div>
    </div>

    <!-- ================= 附件文件在线预览小弹窗 ================= -->
    <div
      v-if="filePreviewVisible && activePreviewFile"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/55 p-4 backdrop-blur-2xs select-none"
      @click.self="filePreviewVisible = false"
    >
      <div class="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-[640px] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div class="flex items-center gap-2 truncate">
            <span class="w-2 h-2 rounded-full bg-blue-500"></span>
            <span class="text-xs font-bold text-slate-800 truncate" :title="activePreviewFile.name">{{ activePreviewFile.name }}</span>
          </div>
          <button
            type="button"
            @click="filePreviewVisible = false"
            class="text-slate-400 hover:text-slate-700 p-1 rounded transition cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="p-5 overflow-y-auto space-y-3 text-xs text-slate-700 flex-1">
          <div class="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2.5">
            <div class="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-200 pb-2">
              <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span>{{ activePreviewFile.name }}</span>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              文件核验证明：该文件为水行政主管部门签发的计划用水核定正式附件，文件备案信息完整，可用于取水核验与计量台账管理。
            </p>
            <div class="pt-2 text-right text-slate-400 font-mono text-[11px]">
              文件大小：{{ activePreviewFile.size }} · 格式：{{ activePreviewFile.type.toUpperCase() }}
            </div>
          </div>
        </div>

        <div class="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            @click="filePreviewVisible = false"
            class="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium cursor-pointer transition"
          >
            关闭
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type {
  WaterPlanRecord,
  FormQuotaData,
  WaterPlanDocumentIssue,
  WaterPlanNoticeFile
} from '../../../types';
import {
  createActualWaterQuotaForRecord,
  createPlanWaterQuotaForRecord,
  createDocumentIssuesForRecord
} from '../../../data/mockWaterPlanData';
import WaterQuotaAuditForm from './WaterQuotaAuditForm.vue';

const props = defineProps<{
  visible: boolean;
  record: WaterPlanRecord | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
}>();

// 三个核心标签栏：只保留名称切换
const activeTab = ref<'actual' | 'plan' | 'documents'>('actual');

// 表单一数据：本年度实际用水表
const actualQuotaData = ref<FormQuotaData>(createActualWaterQuotaForRecord(props.record));

// 表单二数据：下年度计划用水表
const planQuotaData = ref<FormQuotaData>(createPlanWaterQuotaForRecord(props.record));

// 表单三数据：用水计划文件 (表格数据源)
const documentIssues = ref<WaterPlanDocumentIssue[]>(createDocumentIssuesForRecord(props.record));

// 附件查看小弹窗状态
const attachmentModalVisible = ref(false);
const currentNoticeForAttachments = ref<WaterPlanDocumentIssue | null>(null);

// 在线预览小弹窗状态
const filePreviewVisible = ref(false);
const activePreviewFile = ref<WaterPlanNoticeFile | null>(null);

// 审核流程时间轴数据 (完全严格参考用户截图设计)
interface WorkflowStep {
  id: string;
  title: string;
  subtitle: string;
  status: 'passed' | 'rejected';
}

const workflowSteps = computed<WorkflowStep[]>(() => {
  const supervisor = props.record?.supervisorUnit || '城西宁市水务局';
  const unit = props.record?.unitName ? `${props.record.unitName.slice(0, 4)}***公司` : '********公司';
  const district = props.record?.district || '城西区';

  return [
    {
      id: 'step-1',
      title: '用水计划通知下达',
      subtitle: `${supervisor} 2026-06-25 8:00`,
      status: 'passed'
    },
    {
      id: 'step-2',
      title: '用水计划填报提交',
      subtitle: `${unit}填写 2026-06-25 8:00`,
      status: 'passed'
    },
    {
      id: 'step-3',
      title: '用水计划县级复核',
      subtitle: `********县级已复核通过 2026-06-25 8:00`,
      status: 'passed'
    },
    {
      id: 'step-4',
      title: '用水计划审批',
      subtitle: '西宁市水利局审核通过 2026-06-25 8:00',
      status: 'passed'
    },
    {
      id: 'step-5',
      title: '正式计划下达',
      subtitle: '***水利局已下达正式用水计划 2026-06-25 8:00',
      status: 'passed'
    },
    {
      id: 'step-6',
      title: '取水计划调整提交',
      subtitle: `${unit}申请年计划调整 2026-06-25 8:00`,
      status: 'passed'
    },
    {
      id: 'step-7',
      title: '取水计划调整审批驳回',
      subtitle: '********申报驳回 2026-06-25 8:00',
      status: 'rejected'
    },
    {
      id: 'step-8',
      title: '取水计划调整提交',
      subtitle: '西宁市水务局审核通过 2026-06-25 8:00',
      status: 'passed'
    },
    {
      id: 'step-9',
      title: '省级水行政主管部门报备',
      subtitle: '已报备省级管理员 2026-06-25 8:00',
      status: 'passed'
    }
  ];
});

// 监听选中的 record 变化，实时更新
watch(
  () => props.record,
  (newRec) => {
    if (newRec) {
      actualQuotaData.value = createActualWaterQuotaForRecord(newRec);
      planQuotaData.value = createPlanWaterQuotaForRecord(newRec);
      documentIssues.value = createDocumentIssuesForRecord(newRec);
      activeTab.value = 'actual';
    }
  },
  { immediate: true }
);

// 打开附件查看小弹窗 (点击之后有所有的附件)
const openAttachmentModal = (issue: WaterPlanDocumentIssue) => {
  currentNoticeForAttachments.value = issue;
  attachmentModalVisible.value = true;
};

// 在线预览附件
const openFilePreview = (file: WaterPlanNoticeFile, issue?: WaterPlanDocumentIssue | null) => {
  activePreviewFile.value = file;
  filePreviewVisible.value = true;
};

// 单个下载
const downloadFile = (file: WaterPlanNoticeFile) => {
  MessagePlugin.success(`正在下载通知文件：${file.name}`);
};

// 打包下载全部附件
const downloadAllFiles = (issue: WaterPlanDocumentIssue) => {
  MessagePlugin.success(`正在打包下载【${issue.title}】的全部附件（共 ${issue.files.length} 个文件）`);
};

const handleClose = () => {
  emit('update:visible', false);
};
</script>

<style scoped>
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
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}
</style>
