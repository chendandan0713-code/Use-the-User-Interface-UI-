<template>
  <div class="flex-1 h-full overflow-y-auto bg-slate-100/80 p-3 sm:p-4 text-slate-800 flex flex-col gap-3.5 custom-scrollbar select-none">
    <!-- Top MES KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500 font-medium">今日排产工单总量</div>
          <div class="text-xl font-bold font-mono text-slate-900 mt-1">
            48 <span class="text-xs font-normal text-slate-500">单</span>
          </div>
          <div class="text-[10px] text-emerald-600 mt-1">
            达成率 96.4% · 交付平稳
          </div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500 font-medium">智能产线综合稼动率 (OEE)</div>
          <div class="text-xl font-bold font-mono text-indigo-600 mt-1">
            89.2 <span class="text-xs font-normal text-slate-500">%</span>
          </div>
          <div class="text-[10px] text-indigo-500 mt-1">
            6条柔性产线全速运转
          </div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500 font-medium">首件一次检验合格率 (FPY)</div>
          <div class="text-xl font-bold font-mono text-emerald-600 mt-1">
            99.15 <span class="text-xs font-normal text-slate-500">%</span>
          </div>
          <div class="text-[10px] text-slate-400 mt-1">
            本月不良品率 0.85%
          </div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500 font-medium">关键工序能耗与水耗</div>
          <div class="text-xl font-bold font-mono text-cyan-600 mt-1">
            184.2 <span class="text-xs font-normal text-slate-500">m³/日</span>
          </div>
          <div class="text-[10px] text-emerald-600 mt-1">
            ↓ 节水闭环回用率 42%
          </div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Production Work Order Table -->
    <div class="bg-white rounded-xl border border-slate-200/80 shadow-xs flex-1 flex flex-col min-h-0 overflow-hidden">
      <div class="p-3.5 border-b border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
          <span class="font-bold text-xs text-slate-800">车间现场工单制造进度与排产追踪</span>
        </div>
        <div class="flex items-center gap-2">
          <t-button theme="primary" size="small" @click="handleDispatch">
            下发新工单
          </t-button>
        </div>
      </div>

      <div class="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
        <table class="w-full text-left border-collapse text-xs">
          <thead class="bg-slate-50/80 text-slate-600 font-semibold sticky top-0 z-10 border-b border-slate-200">
            <tr>
              <th class="p-3 whitespace-nowrap">工单编码 / 批次</th>
              <th class="p-3 whitespace-nowrap min-w-[180px]">产品名称 / 规格</th>
              <th class="p-3 whitespace-nowrap">优先级</th>
              <th class="p-3 whitespace-nowrap">当前工序 / 车间</th>
              <th class="p-3 whitespace-nowrap min-w-[140px]">制造生产进度</th>
              <th class="p-3 whitespace-nowrap">计划产出</th>
              <th class="p-3 whitespace-nowrap">状态</th>
              <th class="p-3 whitespace-nowrap text-right pr-4">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr v-for="order in workOrders" :key="order.id" class="hover:bg-indigo-50/20 transition">
              <td class="p-3">
                <div class="font-bold font-mono text-slate-800">{{ order.orderCode }}</div>
                <div class="text-[11px] text-slate-400 font-mono mt-0.5">{{ order.orderTag }}</div>
              </td>

              <td class="p-3">
                <div class="font-medium text-slate-800">{{ order.productName }}</div>
                <div class="text-[11px] text-slate-400 font-mono">{{ order.spec }} · {{ order.materialGrade }}</div>
              </td>

              <td class="p-3 whitespace-nowrap">
                <t-tag
                  :theme="order.priority === '特急' ? 'danger' : order.priority === '高' ? 'warning' : 'primary'"
                  variant="light"
                  size="small"
                >
                  {{ order.priority }}
                </t-tag>
              </td>

              <td class="p-3 whitespace-nowrap">
                <div class="font-medium text-slate-800">{{ order.currentProcess }}</div>
                <div class="text-[10px] text-slate-400">{{ order.workshop }}</div>
              </td>

              <td class="p-3">
                <div class="flex items-center gap-2">
                  <div class="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-indigo-600 rounded-full"
                      :style="{ width: `${order.progress}%` }"
                    ></div>
                  </div>
                  <span class="font-mono text-[11px] font-bold text-slate-700">{{ order.progress }}%</span>
                </div>
              </td>

              <td class="p-3 font-mono">
                <span class="font-bold text-slate-800">{{ order.completedQuantity }}</span>
                <span class="text-slate-400"> / {{ order.plannedQuantity }} {{ order.unit }}</span>
              </td>

              <td class="p-3 whitespace-nowrap">
                <t-tag
                  :theme="order.status === '已完工' ? 'success' : order.status === '生产中' ? 'primary' : 'warning'"
                  variant="light"
                  size="small"
                >
                  {{ order.status }}
                </t-tag>
              </td>

              <td class="p-3 whitespace-nowrap text-right pr-4">
                <t-button theme="primary" variant="text" size="small" @click="handleInspectOrder(order)">
                  工序报工
                </t-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { initialWorkOrders } from '../../mockData';

const workOrders = ref([...initialWorkOrders]);

const handleDispatch = () => {
  MessagePlugin.success('智能MES协同排产引擎已触发，工单自动调度完成');
};

const handleInspectOrder = (order: any) => {
  MessagePlugin.info(`已调出工单【${order.orderCode}】工序扫码报工界面`);
};
</script>
