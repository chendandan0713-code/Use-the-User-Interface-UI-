<template>
  <div
    v-if="visible && item"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none"
    @click.self="handleClose"
  >
    <!-- 弹窗主体容器：浅色顶栏、精致边框与投影、适度圆角与自适应布局 -->
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1240px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
    >
      <!-- 1. 浅色顶部标题栏 (Light Header)：浅灰蓝背景、精致微光与底边分割线 -->
      <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">违规问题处理详情</h3>
              <span
                class="px-2 py-0.5 rounded text-[11px] font-medium border"
                :class="item.status === '已归档' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-blue-50 text-blue-600 border-blue-200'"
              >
                {{ item.status }}
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

      <!-- 2. 内容主体：两块区域（问题详情、问题排查流程） -->
      <div class="p-3.5 overflow-y-auto space-y-2.5 text-xs text-slate-800 custom-scrollbar flex-1 bg-white">
        <!-- 2.1 问题详情卡片 -->
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

        <!-- 2.2 问题排查流程卡片 (高端企业级多阶段时序轴，视觉精致、信息层次清晰) -->
        <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">问题排查流转流程</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#1677ff] border border-blue-100 font-medium text-[11px]">
                <span class="w-1.5 h-1.5 rounded-full bg-[#1677ff] animate-ping"></span>
                当前进度：第 2 / 8 阶段（排查复核中）
              </span>
            </div>
          </div>

          <!-- 横向流程步骤条区域：带精美流转动效与卡片化节点详情 -->
          <div class="overflow-x-auto horizontal-scrollbar pb-3 pt-2">
            <div class="min-w-[1080px] px-2">
              <!-- 流程步骤容器 -->
              <div class="relative flex items-start justify-between">
                <!-- 步骤 1 ~ 步骤 8 -->
                <div
                  v-for="(step, idx) in processSteps"
                  :key="step.title"
                  class="flex-1 relative flex flex-col items-center"
                >
                  <!-- 步骤连接横线：完成为绿色/蓝色连线，未完成为柔和浅灰 -->
                  <div
                    v-if="idx < processSteps.length - 1"
                    class="absolute top-4 left-1/2 w-full h-[2px] -z-0 transition-colors"
                    :class="step.isCompleted ? 'bg-[#10b981]' : 'bg-slate-200'"
                  ></div>

                  <!-- 步骤圆形节点图标 -->
                  <div class="relative z-10 bg-white p-1">
                    <!-- 1. 已完成步骤 (翠绿圆圈配白勾，精致高级) -->
                    <div
                      v-if="step.isCompleted"
                      class="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center font-bold text-sm shadow-xs transition-transform hover:scale-105"
                      title="已完成"
                    >
                      <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>

                    <!-- 2. 当前处理中步骤 (纯正水利蓝 + 呼吸光环，醒目自然) -->
                    <div
                      v-else-if="step.isCurrent"
                      class="w-8 h-8 rounded-full bg-[#1677ff] text-white flex items-center justify-center font-bold text-xs shadow-md ring-4 ring-blue-100 transition-transform hover:scale-105"
                      title="处理中"
                    >
                      {{ idx + 1 }}
                    </div>

                    <!-- 3. 待处理步骤 (浅灰底边框柔和节点) -->
                    <div
                      v-else
                      class="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 text-slate-400 flex items-center justify-center font-medium text-xs transition-transform"
                      title="待处理"
                    >
                      {{ idx + 1 }}
                    </div>
                  </div>

                  <!-- 步骤内容展示卡片：取代杂乱平铺，使用现代微卡片封装各步骤状态与经办信息 -->
                  <div class="mt-3 flex flex-col items-center w-full px-1.5">
                    <!-- 步骤主标题 -->
                    <div
                      class="text-[12.5px] font-semibold transition-colors"
                      :class="step.isCompleted ? 'text-emerald-700' : step.isCurrent ? 'text-[#1677ff]' : 'text-slate-600'"
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
                        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-[#1677ff] border border-blue-200/60"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-[#1677ff] animate-pulse"></span>
                        处理中
                      </span>
                      <span
                        v-else
                        class="inline-block px-2 py-0.5 rounded-full text-[10px] font-normal bg-slate-50 text-slate-400 border border-slate-200/50"
                      >
                        待启动
                      </span>
                    </div>

                    <!-- 步骤具体流转详情卡片 (已办结显示完整记录，当前步显示时限提醒) -->
                    <div class="mt-2.5 w-full">
                      <!-- 已完成：精巧的信息小面板 -->
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

                      <!-- 当前处理中：专属聚焦卡片 -->
                      <div
                        v-else-if="step.isCurrent"
                        class="p-2.5 rounded-lg bg-blue-50/50 border border-blue-200/80 text-[11px] text-slate-600 space-y-1 text-left shadow-2xs"
                      >
                        <div class="text-blue-600 font-medium flex items-center gap-1">
                          <svg class="w-3 h-3 text-blue-500 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="2" x2="12" y2="6"></line>
                            <line x1="12" y1="18" x2="12" y2="22"></line>
                            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                            <line x1="2" y1="12" x2="6" y2="12"></line>
                            <line x1="18" y1="12" x2="22" y2="12"></line>
                            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                          </svg>
                          属地核查中...
                        </div>
                        <div class="text-slate-500 truncate" :title="item.handleUnit">
                          单位: {{ item.handleUnit }}
                        </div>
                        <div class="text-amber-600">
                          时限: 剩余 7 工作日
                        </div>
                      </div>

                      <!-- 待处理：浅淡的占位提示 -->
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

      <!-- 3. 底部操作栏 (Light Footer)：提供状态提示与操作按钮 -->
      <div class="px-5 py-2.5 bg-[#f8fafc] border-t border-slate-200/80 flex items-center justify-between shrink-0">
        <div class="text-xs text-slate-500 flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#1677ff]"></span>
          <span>提示：该记录已进入排查核实阶段，排查单位需在处置时限要求内提交现场核实卷宗与整改记录。</span>
        </div>
        <div class="flex items-center gap-2.5">
          <button
            v-if="item.status === '待排查' && !item.isUrged"
            type="button"
            @click="handleUrge"
            class="px-3.5 py-1.5 rounded-md text-xs font-medium text-white bg-[#1677ff] hover:bg-blue-600 transition shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            督促催办
          </button>
          <button
            v-if="item.status === '排查-省级待审核' || item.checkStatus === '省级待审核'"
            type="button"
            @click="handleAudit"
            class="px-3.5 py-1.5 rounded-md text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 transition shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            省级审核
          </button>
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-1.5 rounded-md text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-800 transition cursor-pointer"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ViolationItem } from '../../mockViolationData';

const props = defineProps<{
  visible: boolean;
  item: ViolationItem | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'urged', item: ViolationItem): void;
  (e: 'audit', item: ViolationItem): void;
}>();

const handleClose = () => {
  emit('update:visible', false);
};

const handleUrge = () => {
  if (props.item) {
    emit('urged', props.item);
  }
};

const handleAudit = () => {
  if (props.item) {
    emit('update:visible', false);
    emit('audit', props.item);
  }
};

// 处置时限回显
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

// 动态计算流转步骤状态，严格契合业务逻辑与视觉层级
const processSteps = computed(() => {
  const currentStatus = props.item?.status || '待排查';

  // 判定当前步骤下标 (0-based)
  // 0: 问题下发
  // 1: 问题排查
  // 2: 排查-市级审核
  // 3: 排查-省级审核
  // 4: 问题整改
  // 5: 整改-市级审核
  // 6: 整改-省级审核
  // 7: 办结归档
  let currentStepIdx = 1;

  if (currentStatus === '排查-省级待审核') {
    currentStepIdx = 3;
  } else if (currentStatus === '整改中') {
    currentStepIdx = 4;
  } else if (currentStatus === '已完成' || currentStatus === '已归档') {
    currentStepIdx = 7;
  }

  const stepsList = [
    {
      title: '问题下发',
      info: {
        time: '2026-08-28 11:18:33',
        user: 'admin',
        dept: '青海省水利厅',
        phone: '13612345678',
      },
    },
    {
      title: '问题排查',
      info: null,
    },
    {
      title: '排查-市级审核',
      info: null,
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
    const isCompleted = index < currentStepIdx;
    const isCurrent = index === currentStepIdx;
    return {
      title: st.title,
      isCompleted,
      isCurrent,
      info: isCompleted ? (st.info || {
        time: '2026-08-28 11:18:33',
        user: 'admin',
        dept: '青海省水利厅',
        phone: '13612345678',
      }) : null,
    };
  });
});
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
