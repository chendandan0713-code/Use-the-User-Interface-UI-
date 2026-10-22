<template>
  <div
    v-if="visible && facility"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs select-none"
    @click.self="handleClose"
  >
    <!-- 诊断弹窗主卡片 -->
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      <!-- 顶栏：深蓝背景与设施基本档案 -->
      <div class="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <!-- 分数或状态块 -->
          <div
            :class="[
              'w-11 h-11 rounded-xl flex flex-col items-center justify-center font-bold text-white shadow-md',
              facility.healthScore.level === '优' ? 'bg-emerald-600' :
              facility.healthScore.level === '良' ? 'bg-blue-600' :
              facility.healthScore.level === '中' ? 'bg-amber-600' :
              facility.healthScore.level === '差' ? 'bg-orange-600' :
              facility.healthScore.level === '极差' ? 'bg-rose-600' :
              facility.healthScore.level === '不可用' ? 'bg-purple-600' : 'bg-slate-600'
            ]"
          >
            <span v-if="!facility.healthScore.isDeactivated && !facility.healthScore.isUnavailable" class="text-sm font-extrabold leading-none">
              {{ facility.healthScore.totalScore }}
            </span>
            <span v-if="facility.healthScore.isUnavailable" class="text-[11px] leading-tight font-extrabold">
              不可用
            </span>
            <span v-if="facility.healthScore.isDeactivated" class="text-[11px] leading-tight font-extrabold">
              停用
            </span>
            <span class="text-[9px] font-normal mt-0.5 opacity-90">
              {{ facility.healthScore.level }}
            </span>
          </div>

          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-bold tracking-wide">{{ facility.facilityName }}</h3>
              <span
                :class="[
                  'px-2 py-0.5 rounded text-[10px] font-bold tracking-wider',
                  facility.healthScore.level === '优' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  facility.healthScore.level === '良' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                  facility.healthScore.level === '中' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  facility.healthScore.level === '差' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' :
                  facility.healthScore.level === '极差' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                  facility.healthScore.level === '不可用' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse' :
                  'bg-slate-500/20 text-slate-300 border border-slate-500/40'
                ]"
              >
                {{ facility.healthScore.level }}
              </span>
              <span class="px-2 py-0.5 rounded bg-white/10 text-[10px] text-blue-200">
                业务动作：{{ facility.healthScore.businessAction }}
              </span>
              <span class="text-[11px] text-slate-300 font-mono">{{ facility.facilityCode }}</span>
            </div>
            <p class="text-[11px] text-slate-300/90 mt-0.5">
              {{ facility.district }} · {{ facility.waterOwner }} · {{ facility.permitNumber }}
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="handleClose"
          class="w-7 h-7 rounded-lg text-white/70 hover:text-white hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 主体内容滚动区 -->
      <div class="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-4">
        <!-- 1. 顶层两大维度分值概览卡片 (运行健康度80分 + 检定20分) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- 维度 1: 运行健康度 (满分 80分) -->
          <div class="p-3 rounded-lg bg-blue-50/70 border border-blue-200 flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 font-bold text-xs text-blue-900">
                <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>运行健康度维度（核心：设备运行与数据可信度）</span>
              </div>
              <span class="text-xs font-mono font-bold text-blue-800">
                {{ facility.healthScore.isDeactivated ? '不计分' : `${facility.healthScore.operationScore} / 80 分` }}
              </span>
            </div>

            <div class="w-full bg-blue-200/80 h-2 rounded-full my-2 overflow-hidden">
              <div
                class="h-full bg-blue-600 rounded-full transition-all duration-300"
                :style="{ width: `${facility.healthScore.isDeactivated ? 0 : (facility.healthScore.operationScore / 80) * 100}%` }"
              ></div>
            </div>

            <div class="text-[11px] text-blue-800 flex items-center justify-between">
              <span>运行累计扣分：-{{ facility.healthScore.operationPenalty }} 分</span>
              <span class="text-slate-500">含A组单次(24分)、B组持续(40分)、C组待核实(16分)</span>
            </div>
          </div>

          <!-- 维度 2: 检定合规性 (满分 20分) -->
          <div class="p-3 rounded-lg bg-indigo-50/70 border border-indigo-200 flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 font-bold text-xs text-indigo-900">
                <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                <span>检定维度（合规性：检定周期与有效状态）</span>
              </div>
              <span class="text-xs font-mono font-bold text-indigo-800">
                {{ facility.healthScore.isDeactivated ? '不计分' : `${facility.healthScore.calibrationScore} / 20 分` }}
              </span>
            </div>

            <div class="w-full bg-indigo-200/80 h-2 rounded-full my-2 overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-300"
                :class="facility.healthScore.isUnavailable ? 'bg-purple-600' : 'bg-indigo-600'"
                :style="{ width: `${facility.healthScore.isDeactivated ? 0 : (facility.healthScore.calibrationScore / 20) * 100}%` }"
              ></div>
            </div>

            <div class="text-[11px] text-indigo-800 flex items-center justify-between">
              <span>
                检定扣分：-{{ facility.healthScore.calibrationPenalty }} 分
                <strong v-if="facility.healthScore.isUnavailable" class="text-purple-700 ml-1 font-bold">（检定超期·直接置不可用）</strong>
              </span>
              <span class="text-slate-500">有效期至: {{ facility.calibrationExpiryDate }}</span>
            </div>
          </div>
        </div>

        <!-- 2. 硬件运行工况与设备档案 -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div class="text-[11px] text-slate-500">瞬时流速 / 累计底数</div>
            <div class="text-sm font-bold font-mono text-slate-800 mt-0.5">
              {{ facility.currentReading }} <span class="text-[10px] font-normal text-slate-500">m³/h</span>
            </div>
            <div class="text-[10px] text-slate-400 font-mono mt-0.5">
              累计 {{ facility.accumulatedFlow }} m³
            </div>
          </div>

          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div class="text-[11px] text-slate-500">通信网络 / 最新到报</div>
            <div class="text-sm font-bold text-slate-800 mt-0.5 flex items-center gap-1.5">
              <span
                :class="[
                  'w-2 h-2 rounded-full',
                  facility.isOnline ? 'bg-emerald-500' : 'bg-rose-500'
                ]"
              ></span>
              <span>{{ facility.transmissionMethod }}</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-0.5 truncate">
              {{ facility.lastReportTime }}
            </div>
          </div>

          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div class="text-[11px] text-slate-500">供电电池 / 信号强度</div>
            <div class="text-sm font-bold font-mono text-slate-800 mt-0.5 flex items-center gap-2">
              <span :class="facility.batteryLevel < 20 ? 'text-rose-600' : 'text-slate-800'">
                🔋 {{ facility.batteryLevel }}%
              </span>
              <span :class="facility.signalStrength < 30 ? 'text-rose-600' : 'text-slate-800'">
                📶 {{ facility.signalStrength }}%
              </span>
            </div>
            <div class="text-[10px] text-slate-400 mt-0.5">
              {{ facility.batteryLevel < 20 ? '电池电量严重告警' : '供电工况良好' }}
            </div>
          </div>

          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div class="text-[11px] text-slate-500">维保单位及负责人</div>
            <div class="text-xs font-semibold text-slate-800 mt-0.5 truncate" :title="facility.maintainUnit">
              {{ facility.maintainUnit }}
            </div>
            <div class="text-[10px] text-blue-600 mt-0.5 truncate">
              {{ facility.maintainPerson }}
            </div>
          </div>
        </div>

        <!-- 3. 明细扣分项诊断展开卡片 (按照A组、B组、C组、检定A组/B组、停用分组呈现) -->
        <div class="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-slate-800">扣分诊断明细（依据明细扣分规则总表）</span>
              <span class="text-[11px] text-slate-500">总扣分：-{{ facility.healthScore.totalPenalty }} 分</span>
            </div>
            <span class="text-[11px] text-slate-400 font-mono">核算时间：{{ facility.healthScore.evaluatedAt }}</span>
          </div>

          <div class="space-y-2.5">
            <div
              v-for="item in Object.values(facility.healthScore.deductions)"
              :key="item.key"
              :class="[
                'p-2.5 rounded-lg border transition',
                item.actualDeduction > 0
                  ? 'bg-rose-50/40 border-rose-200'
                  : 'bg-slate-50/60 border-slate-200/80'
              ]"
            >
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2">
                  <span
                    :class="[
                      'w-2 h-2 rounded-full shrink-0',
                      item.actualDeduction > 0 ? 'bg-rose-500' : 'bg-emerald-500'
                    ]"
                  ></span>
                  <span class="text-xs font-bold text-slate-800">{{ item.name }}</span>
                  <span class="text-[10px] text-slate-400">[{{ item.group }} · 上限{{ item.maxPoints }}分]</span>
                  <span
                    v-if="item.actualDeduction > 0"
                    class="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 text-[10px] font-bold"
                  >
                    已扣 {{ item.actualDeduction }} 分
                  </span>
                  <span
                    v-else
                    class="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px]"
                  >
                    未触发 (0分)
                  </span>
                </div>

                <div class="text-[11px] flex items-center gap-2">
                  <span class="text-slate-500">联动动作：</span>
                  <span class="font-bold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {{ item.linkedAction }}
                  </span>
                </div>
              </div>

              <!-- 状态描述与恢复规则 -->
              <div class="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white/70 p-1.5 rounded border border-slate-200/50">
                <div>
                  <span class="text-slate-400">诊断工况：</span>
                  <span :class="item.actualDeduction > 0 ? 'text-rose-700 font-medium' : 'text-slate-700'">
                    {{ item.currentStatusDesc }}
                  </span>
                </div>
                <div>
                  <span class="text-slate-400">恢复机制：</span>
                  <span class="text-slate-700">{{ item.recoveryRule }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. 近24小时时序波动走势及异常特征标记 -->
        <div class="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-800">近24小时瞬时流量 (m³/h) 走势曲线与异动点标记</span>
            <div class="flex items-center gap-3 text-[11px] text-slate-500">
              <span class="flex items-center gap-1">
                <span class="w-2.5 h-0.5 bg-blue-600 inline-block"></span> 瞬时流速
              </span>
              <span class="flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-rose-500 inline-block"></span> 异动特征点
              </span>
            </div>
          </div>

          <!-- SVG 时序走势图 -->
          <div class="h-44 w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex flex-col justify-between">
            <div class="flex-1 relative">
              <svg class="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="500" y2="20" stroke="#e2e8f0" stroke-dasharray="2,2" stroke-width="1" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="#e2e8f0" stroke-dasharray="2,2" stroke-width="1" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#cbd5e1" stroke-width="1.5" />

                <polyline
                  :points="svgPoints"
                  fill="none"
                  stroke="#2563eb"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <circle
                  v-for="(pt, idx) in chartPoints"
                  :key="idx"
                  :cx="pt.x"
                  :cy="pt.y"
                  :r="pt.isAnomaly ? 4.5 : 2.5"
                  :fill="pt.isAnomaly ? '#ef4444' : '#2563eb'"
                  :stroke="pt.isAnomaly ? '#ffffff' : '#93c5fd'"
                  stroke-width="1.5"
                >
                  <title>{{ pt.time }} - {{ pt.instantFlow }} m³/h {{ pt.anomalyType ? `[${pt.anomalyType}]` : '' }}</title>
                </circle>
              </svg>
            </div>

            <div class="flex justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-200">
              <span v-for="pt in facility.recentTelemetry" :key="pt.time">{{ pt.time }}</span>
            </div>
          </div>
        </div>

        <!-- 5. 诊断结论与处置指引 -->
        <div class="p-3.5 bg-blue-50/60 rounded-lg border border-blue-200 text-xs">
          <div class="font-bold text-blue-900 flex items-center gap-1.5 mb-1.5">
            <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>综合诊断结论：{{ facility.healthScore.diagnosisText }}</span>
          </div>

          <div class="space-y-1 pl-5 list-disc text-blue-800 text-[11px] leading-relaxed">
            <div v-for="(adv, idx) in facility.healthScore.detailedAdvice" :key="idx" class="flex items-start gap-1.5">
              <span class="text-blue-500 font-bold">•</span>
              <span>{{ adv }}</span>
            </div>
          </div>
        </div>

        <!-- 6. 派发工单交互 -->
        <div v-if="!facility.workOrderPending" class="p-3 bg-amber-50/70 rounded-lg border border-amber-200 text-xs">
          <div class="font-bold text-amber-900 flex items-center justify-between mb-2">
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span>业务联动：下发{{ facility.healthScore.businessAction }}处置工单</span>
            </span>
            <span class="text-[11px] text-amber-700">根据扣分诊断与业务动作要求指派维保团队</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label class="text-[11px] text-slate-600">指派维保工程师</label>
              <input
                type="text"
                v-model="workOrderEngineer"
                class="w-full mt-0.5 px-2 py-1 text-xs border border-amber-300 rounded bg-white focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label class="text-[11px] text-slate-600">处置工单紧急程度</label>
              <select
                v-model="workOrderUrgency"
                class="w-full mt-0.5 px-2 py-1 text-xs border border-amber-300 rounded bg-white focus:outline-hidden focus:border-blue-500"
              >
                <option value="特急">特急（立即处理/高优先级故障）</option>
                <option value="紧急">紧急（48小时内复检修复）</option>
                <option value="常规">常规（纳入例行维护巡检）</option>
              </select>
            </div>

            <div>
              <label class="text-[11px] text-slate-600">消警处置截止期限</label>
              <input
                type="date"
                v-model="workOrderDeadline"
                class="w-full mt-0.5 px-2 py-1 text-xs border border-amber-300 rounded bg-white focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div v-else class="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs flex items-center justify-between">
          <div class="flex items-center gap-2 text-emerald-800">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>该设备已于近期派发运维工单：<strong>{{ facility.workOrderId }}</strong>（处理中）</span>
          </div>
          <span class="text-[11px] text-emerald-600 font-medium">工单处置中</span>
        </div>
      </div>

      <!-- 底栏按钮 -->
      <div class="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
        <div class="text-xs text-slate-500">
          水资源计量器具编号：<span class="font-mono">{{ facility.facilityCode }}</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            v-if="!facility.workOrderPending"
            @click="handleDispatchWorkOrder"
            class="px-4 py-1.5 rounded-md text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>立即下发处置工单</span>
          </button>
          
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-1.5 rounded-md text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition cursor-pointer"
          >
            关闭诊断
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { MeterFacilityHealthRecord } from '../../types';

const props = defineProps<{
  visible: boolean;
  facility: MeterFacilityHealthRecord | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'dispatch-work-order', payload: { facilityId: string; engineer: string; urgency: string; deadline: string }): void;
}>();

const workOrderEngineer = ref(props.facility?.maintainPerson || '李向东 13897118821');
const workOrderUrgency = ref(
  props.facility?.healthScore.businessAction === '立即处理' || props.facility?.healthScore.businessAction === '禁止使用'
    ? '特急'
    : props.facility?.healthScore.businessAction === '优先处理'
    ? '紧急'
    : '常规'
);
const workOrderDeadline = ref('2026-10-18');

// 坐标映射
const chartPoints = computed(() => {
  if (!props.facility || !props.facility.recentTelemetry || props.facility.recentTelemetry.length === 0) {
    return [];
  }
  const pts = props.facility.recentTelemetry;
  const n = pts.length;
  const width = 500;
  
  const flows = pts.map(p => p.instantFlow);
  const maxFlow = Math.max(10, ...flows);
  const minFlow = Math.min(0, ...flows);
  const range = maxFlow - minFlow || 10;

  return pts.map((pt, idx) => {
    const x = Number(((idx / (n - 1)) * (width - 40) + 20).toFixed(1));
    const normalized = (pt.instantFlow - minFlow) / range;
    const y = Number((100 - (normalized * 80)).toFixed(1));
    return {
      x,
      y,
      time: pt.time,
      instantFlow: pt.instantFlow,
      isAnomaly: pt.isAnomaly,
      anomalyType: pt.anomalyType
    };
  });
});

const svgPoints = computed(() => {
  return chartPoints.value.map(pt => `${pt.x},${pt.y}`).join(' ');
});

function handleDispatchWorkOrder() {
  if (!props.facility) return;
  emit('dispatch-work-order', {
    facilityId: props.facility.id,
    engineer: workOrderEngineer.value,
    urgency: workOrderUrgency.value,
    deadline: workOrderDeadline.value
  });
}

function handleClose() {
  emit('close');
}
</script>
