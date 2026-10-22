<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    @click.self="handleClose"
  >
    <div class="bg-white rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800">
      <!-- Modal Header -->
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            :class="record?.pushStatus === '推送成功' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'"
          >
            <svg v-if="record?.pushStatus === '推送成功'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-bold text-slate-900">国家平台推送明细与原因剖析</h3>
              <span
                class="px-2 py-0.5 rounded text-[11px] font-semibold"
                :class="statusBadgeClass"
              >
                {{ record?.pushStatus }}
              </span>
              <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                {{ record?.receiveMethod }}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">
              {{ record?.facilityName }}（编号：{{ record?.facilityCode }}）· 水量时间：{{ record?.waterDate }}
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="handleClose"
          class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Modal Body (Scrollable) -->
      <div class="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
        <!-- 1. Key Summary Alert Banner -->
        <div
          class="p-3.5 rounded-xl border flex items-start gap-3"
          :class="record?.pushStatus === '推送成功' ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-rose-50/70 border-rose-200 text-rose-950'"
        >
          <div class="mt-0.5 shrink-0">
            <svg v-if="record?.pushStatus === '推送成功'" class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <svg v-else class="w-4 h-4 text-rose-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <div class="flex-1 space-y-1">
            <div class="font-bold text-sm flex items-center justify-between">
              <span>{{ reasonData.summary || '国家水资源信息管理平台数据交互记录' }}</span>
              <span v-if="reasonData.code" class="text-xs font-mono font-normal opacity-85 px-1.5 py-0.5 rounded bg-black/5">
                响应码: {{ reasonData.code }}
              </span>
            </div>
            <div class="text-[11.5px] leading-relaxed opacity-90">
              {{ reasonData.diagnostics || (record?.pushStatus === '推送成功' ? '数据已成功同步至国家水资源信息管理平台并完成对账。' : '推送过程发生异常，请核实网络链路与点位配置。') }}
            </div>
            <div v-if="reasonData.solution" class="mt-2 pt-2 border-t border-rose-200/60 text-[11px] font-medium text-rose-800 flex items-start gap-1.5">
              <span class="px-1.5 py-0.2 rounded bg-rose-200/80 text-rose-900 text-[10px] shrink-0 font-bold">排查建议</span>
              <span>{{ reasonData.solution }}</span>
            </div>
          </div>
        </div>

        <!-- 2. Essential Metadata Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
          <div>
            <div class="text-[10.5px] text-slate-400">取水权人</div>
            <div class="font-semibold text-slate-800 truncate mt-0.5">{{ record?.waterOwner }}</div>
          </div>
          <div>
            <div class="text-[10.5px] text-slate-400">取水许可证号</div>
            <div class="font-mono text-slate-800 truncate mt-0.5">{{ record?.permitNumber }}</div>
          </div>
          <div>
            <div class="text-[10.5px] text-slate-400">核定水量</div>
            <div class="font-mono font-bold text-blue-600 mt-0.5">
              {{ (record?.waterVolume ?? 0).toLocaleString() }} <span class="text-[10px] font-normal text-slate-500">m³</span>
            </div>
          </div>
          <div>
            <div class="text-[10.5px] text-slate-400">国家平台回执单号</div>
            <div class="font-mono text-slate-800 truncate mt-0.5" :title="record?.nationalReceiptNo || '-'">
              {{ record?.nationalReceiptNo || '未生成回执' }}
            </div>
          </div>
          <div>
            <div class="text-[10.5px] text-slate-400">推送计划与调度</div>
            <div class="text-slate-700 mt-0.5">{{ record?.pushPlan }}</div>
          </div>
          <div>
            <div class="text-[10.5px] text-slate-400">同步完成时间</div>
            <div class="font-mono text-slate-700 mt-0.5">{{ record?.syncTime }}</div>
          </div>
          <div>
            <div class="text-[10.5px] text-slate-400">汇集状态</div>
            <div class="font-semibold mt-0.5" :class="record?.aggregationStatus === '汇集成功' ? 'text-emerald-600' : 'text-rose-600'">
              {{ record?.aggregationStatus }}
            </div>
          </div>
          <div>
            <div class="text-[10.5px] text-slate-400">推送网络延迟</div>
            <div class="font-mono text-slate-700 mt-0.5">
              {{ reasonData.latencyMs ? `${reasonData.latencyMs} ms` : '-' }}
            </div>
          </div>
        </div>

        <!-- 3. Lifecycle Timeline -->
        <div class="bg-white rounded-xl border border-slate-200/80 p-3.5 space-y-2">
          <div class="font-bold text-slate-800 text-xs flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              全链路节点流转时序跟踪
            </span>
            <span class="text-[10.5px] text-slate-400 font-normal">国家专网通道链路</span>
          </div>

          <div class="space-y-2 pt-1 pl-1">
            <div
              v-for="(item, idx) in timelineList"
              :key="idx"
              class="relative flex items-start gap-3 pl-5 pb-2 last:pb-0"
            >
              <!-- vertical line -->
              <div
                v-if="idx < timelineList.length - 1"
                class="absolute left-1.5 top-3 bottom-0 w-0.5 bg-slate-200"
              ></div>
              <!-- circle dot -->
              <div
                class="absolute left-0 top-1 w-3.5 h-3.5 rounded-full flex items-center justify-center border-2 bg-white"
                :class="item.status === 'success' ? 'border-emerald-500 text-emerald-500' : item.status === 'error' ? 'border-rose-500 text-rose-500' : 'border-amber-500 text-amber-500'"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full"
                  :class="item.status === 'success' ? 'bg-emerald-500' : item.status === 'error' ? 'bg-rose-500' : 'bg-amber-500'"
                ></div>
              </div>

              <!-- text -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-800 text-xs">{{ item.step }}</span>
                  <span class="font-mono text-[10.5px] text-slate-400">{{ item.time }}</span>
                </div>
                <div class="text-[11px] text-slate-600 mt-0.5 leading-normal">
                  {{ item.detail }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Interactive Technical Payloads (Tabs) -->
        <div class="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
          <div class="flex items-center justify-between border-b border-slate-200 px-3 py-1.5 bg-slate-50/70">
            <div class="flex items-center gap-1">
              <button
                type="button"
                @click="activePayloadTab = 'request'"
                :class="[
                  'px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer',
                  activePayloadTab === 'request'
                    ? 'bg-blue-600 text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                ]"
              >
                推送报文负载 (Request JSON)
              </button>
              <button
                type="button"
                @click="activePayloadTab = 'response'"
                :class="[
                  'px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer',
                  activePayloadTab === 'response'
                    ? 'bg-blue-600 text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                ]"
              >
                国平台应答报文 (Response ACK)
              </button>
            </div>
            <button
              type="button"
              @click="handleCopyPayload"
              class="text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer font-medium"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>{{ copyTip }}</span>
            </button>
          </div>

          <!-- JSON Viewer -->
          <div class="p-3 bg-slate-950 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-48 leading-relaxed">
            <pre>{{ formattedPayload }}</pre>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-5 py-3 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between shrink-0">
        <div class="text-[11px] text-slate-500 flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>国家水资源平台专线 (IPv6/VPN) 连接正常</span>
        </div>

        <div class="flex items-center gap-2.5">
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs transition cursor-pointer"
          >
            关闭窗口
          </button>

          <button
            type="button"
            @click="handleRepushFromModal"
            :disabled="isPushing"
            class="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <svg v-if="isPushing" class="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            <span>{{ isPushing ? '重新推送中...' : '立即重新推送' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { PushPipelineRecord } from '../../../types';

const props = defineProps<{
  visible: boolean;
  record: PushPipelineRecord | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'repush', record: PushPipelineRecord): void;
}>();

const activePayloadTab = ref<'request' | 'response'>('request');
const copyTip = ref('复制报文');
const isPushing = ref(false);

const reasonData = computed(() => {
  return props.record?.pushReason || {
    summary: props.record?.pushStatus === '推送成功' ? '推送成功，国家平台已接收入库' : '推送未完成',
    code: props.record?.pushStatus === '推送成功' ? '200 OK' : 'UNKNOWN',
    category: '常规推送',
    targetUrl: 'https://szy.mwr.gov.cn/gateway/v2/telemetry/daily-water-report',
    nationalReceiptNo: props.record?.nationalReceiptNo,
    pushTime: props.record?.syncTime || '-',
    latencyMs: 142,
    requestPayload: {
      facilityCode: props.record?.facilityCode,
      waterVolume: props.record?.waterVolume,
      waterDate: props.record?.waterDate,
      receiveMethod: props.record?.receiveMethod,
    },
    responsePayload: {
      status: props.record?.pushStatus === '推送成功' ? 200 : 500,
      receiptNo: props.record?.nationalReceiptNo,
    },
    timeline: [
      { time: '02:00:00', step: '日水量汇集核定', status: 'success', detail: '本地完成前置归集校验' },
      { time: '02:14:00', step: '国家平台网关推送', status: props.record?.pushStatus === '推送成功' ? 'success' : 'error', detail: props.record?.pushStatus === '推送成功' ? '下发回执确认' : '网关返回异常' },
    ],
    diagnostics: '常规推送记录',
    solution: '',
  };
});

const timelineList = computed(() => {
  return reasonData.value.timeline || [];
});

const statusBadgeClass = computed(() => {
  switch (props.record?.pushStatus) {
    case '推送成功':
      return 'bg-emerald-100 text-emerald-800 border border-emerald-300/50';
    case '推送失败':
      return 'bg-rose-100 text-rose-800 border border-rose-300/50';
    case '待推送':
      return 'bg-amber-100 text-amber-800 border border-amber-300/50';
    default:
      return 'bg-slate-100 text-slate-700';
  }
});

const formattedPayload = computed(() => {
  const target = activePayloadTab.value === 'request'
    ? reasonData.value.requestPayload
    : reasonData.value.responsePayload;
  try {
    return JSON.stringify(target || {}, null, 2);
  } catch {
    return '{}';
  }
});

const handleClose = () => {
  emit('update:visible', false);
};

const handleCopyPayload = () => {
  navigator.clipboard.writeText(formattedPayload.value);
  copyTip.value = '已复制!';
  MessagePlugin.success('报文内容已成功复制到剪贴板');
  setTimeout(() => {
    copyTip.value = '复制报文';
  }, 2000);
};

const handleRepushFromModal = () => {
  if (!props.record) return;
  isPushing.value = true;
  emit('repush', props.record);
  setTimeout(() => {
    isPushing.value = false;
  }, 1200);
};
</script>
