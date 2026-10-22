<template>
  <div class="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs shrink-0 flex flex-col gap-2.5">
    <!-- Row 1: System Auto Dispatch Engine Status Bar -->
    <div class="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
      <!-- Left: Automatic Dispatch State & Timer Indicator -->
      <div class="flex flex-wrap items-center gap-2 text-xs">
        <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-900 font-semibold">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>系统自动任务引擎：</span>
          <span class="font-bold text-emerald-700">每月自动下发已启用</span>
        </div>

        <div class="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
          <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>下发规则：每月 <strong class="text-blue-700 font-mono">{{ taskRule.dispatchDay }}</strong> 日 00:00 自动下发</span>
          <span class="text-slate-300">|</span>
          <span>填报截止：每月 <strong class="text-amber-700 font-mono">{{ taskRule.deadlineDay }}</strong> 日 24:00</span>
        </div>

        <div class="hidden xl:flex items-center gap-1 text-[11px] text-slate-500">
          <span class="px-1.5 py-0.5 rounded bg-blue-100/60 text-blue-800 font-medium">当前考评期次：{{ currentPeriodLabel }}</span>
          <span>自动绑定全区小型灌区取水许可证</span>
        </div>
      </div>

      <!-- Right: Action & Trigger Controls -->
      <div class="flex items-center gap-2 text-xs">
        <!-- 手动模拟/补发指定月份任务 -->
        <button
          type="button"
          @click="showDispatchModal = true"
          class="px-2.5 py-1 rounded-md bg-white hover:bg-slate-50 text-blue-700 border border-blue-300 font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          title="系统支持按月定时自动生成，也可由市/省级管理员即时重发或下发补录任务"
        >
          <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          <span>下发/配置月度任务</span>
        </button>

        <!-- 一键催报未填报灌区 -->
        <button
          v-if="pendingCount > 0"
          type="button"
          @click="handleRemindAll"
          class="px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span>一键批量催报 ({{ pendingCount }})</span>
        </button>
      </div>
    </div>

    <!-- Row 2: 任务进度指标卡片 & 快捷按区县筛选 -->
    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
      <!-- Card 1: 当月已下发总任务 -->
      <div class="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500">本月自动下发任务</div>
          <div class="text-base font-bold font-mono text-slate-800 mt-0.5">
            {{ currentMonthTasks.length }} <span class="text-[11px] font-normal text-slate-500">笔</span>
          </div>
          <div class="text-[10px] text-blue-600 truncate">100%覆被持证灌区</div>
        </div>
        <div class="w-7 h-7 rounded-md bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
        </div>
      </div>

      <!-- Card 2: 待填报中 -->
      <div class="p-2 rounded-lg bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
        <div>
          <div class="text-[11px] text-amber-800">待县级录入填报</div>
          <div class="text-base font-bold font-mono text-amber-700 mt-0.5">
            {{ pendingCount }} <span class="text-[11px] font-normal text-amber-600">处</span>
          </div>
          <div class="text-[10px] text-amber-600 truncate">限期至25日</div>
        </div>
        <div class="w-7 h-7 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
      </div>

      <!-- Card 3: 已填报提交初审中 -->
      <div class="p-2 rounded-lg bg-blue-50/70 border border-blue-200/80 flex items-center justify-between">
        <div>
          <div class="text-[11px] text-blue-800">已填报·市审中</div>
          <div class="text-base font-bold font-mono text-blue-700 mt-0.5">
            {{ submittedCount }} <span class="text-[11px] font-normal text-blue-600">处</span>
          </div>
          <div class="text-[10px] text-blue-600 truncate">县级已完成填报</div>
        </div>
        <div class="w-7 h-7 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        </div>
      </div>

      <!-- Card 4: 终审入库归档 -->
      <div class="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
        <div>
          <div class="text-[11px] text-emerald-800">省终审通过·已入库</div>
          <div class="text-base font-bold font-mono text-emerald-700 mt-0.5">
            {{ approvedCount }} <span class="text-[11px] font-normal text-emerald-600">处</span>
          </div>
          <div class="text-[10px] text-emerald-600 truncate">计入全省台账</div>
        </div>
        <div class="w-7 h-7 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
      </div>

      <!-- Card 5: 当月按期填报履约率 -->
      <div class="p-2 rounded-lg bg-indigo-50/70 border border-indigo-200/80 flex items-center justify-between">
        <div>
          <div class="text-[11px] text-indigo-800">月度任务完成率</div>
          <div class="text-base font-bold font-mono text-indigo-700 mt-0.5">
            {{ completionRate }}%
          </div>
          <div class="w-16 bg-indigo-200/70 h-1.5 rounded-full overflow-hidden mt-1">
            <div class="bg-indigo-600 h-full rounded-full" :style="{ width: `${completionRate}%` }"></div>
          </div>
        </div>
        <div class="w-7 h-7 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 20V10"></path>
            <path d="M12 20V4"></path>
            <path d="M6 20v-6"></path>
          </svg>
        </div>
      </div>

      <!-- Card 6: 快捷切换查看任务抽屉 -->
      <div
        @click="showTaskListDrawer = !showTaskListDrawer"
        class="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between cursor-pointer transition"
      >
        <div>
          <div class="text-[11px] text-slate-500">任务明细抽屉</div>
          <div class="text-xs font-bold text-blue-600 mt-0.5 flex items-center gap-1">
            <span>{{ showTaskListDrawer ? '收起任务清单' : '展开月度任务' }}</span>
            <svg
              :class="['w-3.5 h-3.5 transition-transform duration-200', showTaskListDrawer ? 'rotate-180' : '']"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="text-[10px] text-slate-400">点击查看下发流转明细</div>
        </div>
        <div class="w-7 h-7 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </div>
      </div>
    </div>

    <!-- Collapsible Task List Table -->
    <div v-show="showTaskListDrawer" class="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50 mt-1">
      <div class="px-3 py-2 bg-slate-100/90 border-b border-slate-200 flex flex-wrap items-center justify-between text-xs">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-slate-800">系统每月定时任务下发明细清单</span>
          <span class="text-slate-400">|</span>
          <span class="text-slate-500">共 {{ filteredTasks.length }} 项任务</span>
        </div>
        <div class="flex items-center gap-2">
          <!-- 状态筛选 -->
          <div class="flex items-center gap-1 text-[11px]">
            <span class="text-slate-500">状态：</span>
            <select v-model="taskStatusFilter" class="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700">
              <option value="">全部</option>
              <option value="pending">待填报 (待办)</option>
              <option value="submitted">已提交 (审核中)</option>
              <option value="approved">已归档 (通过)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="max-h-48 overflow-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-slate-100 text-slate-600 text-[11px] sticky top-0 border-b border-slate-200">
            <tr>
              <th class="p-2 pl-3">任务编号</th>
              <th class="p-2">任务期次</th>
              <th class="p-2">关联取水许可证 / 小型灌区</th>
              <th class="p-2">负责行政区县</th>
              <th class="p-2">下发时间 / 截止期</th>
              <th class="p-2 text-center">状态</th>
              <th class="p-2 text-center pr-3">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 bg-white">
            <tr v-for="t in filteredTasks" :key="t.id" class="hover:bg-blue-50/40 transition">
              <td class="p-2 pl-3 font-mono font-semibold text-blue-700 text-[11px]">
                {{ t.taskId }}
              </td>
              <td class="p-2 font-medium text-slate-700">
                <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] border border-slate-200 font-mono">
                  {{ t.periodLabel }}
                </span>
              </td>
              <td class="p-2">
                <div class="font-medium text-slate-900">{{ t.irrigationName }}</div>
                <div class="text-[10px] text-slate-400 font-mono">{{ t.permitNumber }}</div>
              </td>
              <td class="p-2 text-slate-700">
                {{ t.district }}
              </td>
              <td class="p-2 text-[11px] text-slate-500">
                <div>下发: {{ t.dispatchTime.split(' ')[0] }}</div>
                <div class="text-amber-700">截止: {{ t.deadline.split(' ')[0] }}</div>
              </td>
              <td class="p-2 text-center">
                <span
                  v-if="t.status === 'pending'"
                  class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                >
                  待县级填报
                </span>
                <span
                  v-else-if="t.status === 'submitted'"
                  class="px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
                >
                  已填报·初审中
                </span>
                <span
                  v-else-if="t.status === 'approved'"
                  class="px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                >
                  终审通过·已入库
                </span>
              </td>
              <td class="p-2 text-center pr-3">
                <button
                  v-if="t.status === 'pending'"
                  type="button"
                  @click="$emit('fill-task', t)"
                  class="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium transition cursor-pointer"
                >
                  去填报
                </button>
                <button
                  v-else
                  type="button"
                  @click="$emit('view-task-record', t)"
                  class="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition cursor-pointer"
                >
                  查台账
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal: 下发规则设置 / 手动下发补录任务 -->
    <div
      v-if="showDispatchModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-2xs p-4"
    >
      <div class="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-4 flex flex-col gap-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100">
          <div class="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span>每月自动下发任务规则与手动触发</span>
          </div>
          <button
            type="button"
            @click="showDispatchModal = false"
            class="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            ✕
          </button>
        </div>

        <div class="space-y-2.5 text-xs text-slate-700">
          <div class="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div>
              <div class="font-semibold text-slate-800">开启系统每月定时自动下发</div>
              <div class="text-[11px] text-slate-500 mt-0.5">每逢每月1日凌晨00:00按西宁市小型灌区许可证库生成任务</div>
            </div>
            <input type="checkbox" v-model="localRule.enabled" class="rounded text-blue-600 h-4 w-4" />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-500 mb-1">自动下发日 (号):</label>
              <input
                type="number"
                min="1"
                max="28"
                v-model="localRule.dispatchDay"
                class="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs"
              />
            </div>
            <div>
              <label class="block text-slate-500 mb-1">填报截止日 (号):</label>
              <input
                type="number"
                min="5"
                max="31"
                v-model="localRule.deadlineDay"
                class="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs"
              />
            </div>
          </div>

          <div class="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-blue-900 text-[11px]">
            <strong>即时手动触发下发：</strong> 可针对选定月份即刻为西宁市全域区县（湟中区、湟源县、大通县等）下发当月农业用水核算任务。
          </div>

          <div class="flex items-center gap-2">
            <label class="text-slate-500 shrink-0">选择下发期次:</label>
            <select v-model="manualDispatchMonth" class="flex-1 bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs">
              <option value="2026-04">2026年04月 (春灌关键期)</option>
              <option value="2026-03">2026年03月 (重发/补发)</option>
              <option value="2026-05">2026年05月 (提前下发)</option>
            </select>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            @click="showDispatchModal = false"
            class="px-3 py-1.5 rounded-md border border-slate-200 text-slate-600 text-xs hover:bg-slate-50 cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            @click="handleManualDispatch"
            class="px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium cursor-pointer"
          >
            保存并立即下发任务
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { IrrigationMonthlyTask, IrrigationTaskRule, IrrigationLicense } from '../../../types';

const props = defineProps<{
  tasks: IrrigationMonthlyTask[];
  taskRule: IrrigationTaskRule;
  licenses: IrrigationLicense[];
  currentRole: string;
}>();

const emit = defineEmits<{
  (e: 'update:taskRule', rule: IrrigationTaskRule): void;
  (e: 'dispatch-month', monthKey: string): void;
  (e: 'fill-task', task: IrrigationMonthlyTask): void;
  (e: 'view-task-record', task: IrrigationMonthlyTask): void;
}>();

const showTaskListDrawer = ref(false);
const showDispatchModal = ref(false);
const taskStatusFilter = ref<string>('');
const manualDispatchMonth = ref('2026-04');

const localRule = reactive<IrrigationTaskRule>({ ...props.taskRule });

const currentPeriodLabel = computed(() => '2026年03月');

const currentMonthTasks = computed(() => {
  return props.tasks.filter((t) => t.periodKey === '2026-03');
});

const pendingCount = computed(() => {
  return currentMonthTasks.value.filter((t) => t.status === 'pending').length;
});

const submittedCount = computed(() => {
  return currentMonthTasks.value.filter((t) => t.status === 'submitted').length;
});

const approvedCount = computed(() => {
  return currentMonthTasks.value.filter((t) => t.status === 'approved').length;
});

const completionRate = computed(() => {
  if (currentMonthTasks.value.length === 0) return 100;
  const done = currentMonthTasks.value.filter((t) => t.status === 'submitted' || t.status === 'approved').length;
  return Math.round((done / currentMonthTasks.value.length) * 100);
});

const filteredTasks = computed(() => {
  if (!taskStatusFilter.value) return props.tasks;
  return props.tasks.filter((t) => t.status === taskStatusFilter.value);
});

const handleRemindAll = () => {
  MessagePlugin.success(`系统已向 ${pendingCount.value} 个待填报灌区的主管水务局与负责人发送自动催报提醒通知！`);
};

const handleManualDispatch = () => {
  emit('update:taskRule', { ...localRule });
  emit('dispatch-month', manualDispatchMonth.value);
  showDispatchModal.value = false;
  MessagePlugin.success(`【${manualDispatchMonth.value}】小型灌区核算填报任务已自动批量下发至全区各行政区县水务局！`);
};
</script>
