<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    @click.self="handleClose"
  >
    <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl flex flex-col overflow-hidden text-slate-800">
      <!-- Header -->
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-900">批量推送到国家水资源平台</h3>
            <p class="text-xs text-slate-500 mt-0.5">
              已选定 {{ records.length }} 处计量设施日水量数据执行合并上报
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="handleClose"
          :disabled="isProcessing"
          class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer disabled:opacity-40"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-5 space-y-4 text-xs">
        <!-- Target & Scope Summary -->
        <div class="bg-blue-50/60 border border-blue-200/70 rounded-xl p-3.5 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-slate-600">目标接收端：</span>
            <span class="font-bold text-blue-900 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              国家水资源信息管理平台 (部级数据中心)
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-600">本次拟推送设施总数：</span>
            <span class="font-mono font-bold text-slate-900 text-sm">{{ records.length }} 处</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-600">合并核定日水量：</span>
            <span class="font-mono font-bold text-blue-700 text-sm">
              {{ totalWaterVolume.toLocaleString() }} m³
            </span>
          </div>
          <div class="flex items-center justify-between pt-1 border-t border-blue-200/50 text-[11px] text-slate-500">
            <span>接口协议规范：SL651/SZY206 标准规约</span>
            <span>加密方式：SM2国密国标双向验签</span>
          </div>
        </div>

        <!-- Progress Bar when processing -->
        <div v-if="isProcessing || isFinished" class="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-700">
              {{ isFinished ? '批量推送完成!' : '正在执行批量传输与国家平台校验...' }}
            </span>
            <span class="font-mono font-bold text-blue-600">{{ progress }}%</span>
          </div>
          <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              class="h-2.5 rounded-full transition-all duration-300"
              :class="isFinished ? 'bg-emerald-500' : 'bg-blue-600'"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <div class="text-[11px] text-slate-500 flex items-center justify-between">
            <span>当前处理：{{ currentItemName }}</span>
            <span>已成功：<strong class="text-emerald-600">{{ successCount }}</strong> / 异常：<strong class="text-rose-600">{{ failedCount }}</strong></span>
          </div>
        </div>

        <!-- Selected Facility Preview List (Scrollable) -->
        <div class="space-y-1.5">
          <div class="font-bold text-slate-700 flex items-center justify-between text-[11.5px]">
            <span>待推送清单明细预览</span>
            <span class="text-slate-400 font-normal">支持按当前勾选批量处理</span>
          </div>
          <div class="max-h-40 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 bg-white">
            <div
              v-for="item in records"
              :key="item.id"
              class="px-3 py-2 flex items-center justify-between text-[11.5px] hover:bg-slate-50"
            >
              <div class="min-w-0 pr-2">
                <div class="font-semibold text-slate-800 truncate">{{ item.facilityName }}</div>
                <div class="text-[10.5px] text-slate-400 font-mono">{{ item.facilityCode }} · {{ item.district }}</div>
              </div>
              <div class="text-right shrink-0">
                <div class="font-mono font-bold text-slate-800">{{ item.waterVolume }} m³</div>
                <div class="text-[10.5px]" :class="item.pushStatus === '推送成功' ? 'text-emerald-600' : 'text-slate-400'">
                  {{ item.pushStatus }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-5 py-3 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <span class="text-[11px] text-slate-400">
          每日定时自动上报未成功的点位可随时通过本功能补发
        </span>
        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="handleClose"
            :disabled="isProcessing"
            class="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs transition cursor-pointer disabled:opacity-40"
          >
            {{ isFinished ? '完成并退出' : '取消' }}
          </button>
          <button
            v-if="!isFinished"
            type="button"
            @click="startBatchPush"
            :disabled="isProcessing || records.length === 0"
            class="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <svg v-if="isProcessing" class="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            <span>{{ isProcessing ? '正在批量报送...' : '确认启动批量推送' }}</span>
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
  records: PushPipelineRecord[];
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'completed', updatedRecords: PushPipelineRecord[]): void;
}>();

const isProcessing = ref(false);
const isFinished = ref(false);
const progress = ref(0);
const currentItemName = ref('');
const successCount = ref(0);
const failedCount = ref(0);

const totalWaterVolume = computed(() => {
  return props.records.reduce((acc, cur) => acc + (cur.waterVolume || 0), 0);
});

const handleClose = () => {
  if (isProcessing.value) return;
  emit('update:visible', false);
  isFinished.value = false;
  progress.value = 0;
};

const startBatchPush = () => {
  if (props.records.length === 0) return;
  isProcessing.value = true;
  isFinished.value = false;
  progress.value = 0;
  successCount.value = 0;
  failedCount.value = 0;

  const total = props.records.length;
  let idx = 0;

  const timer = setInterval(() => {
    if (idx < total) {
      const item = props.records[idx];
      currentItemName.value = item.facilityName;
      // Almost all succeed in retry
      successCount.value++;
      idx++;
      progress.value = Math.min(100, Math.round((idx / total) * 100));
    } else {
      clearInterval(timer);
      isProcessing.value = false;
      isFinished.value = true;
      currentItemName.value = '全部处理完成，回执已自动对齐归档';
      MessagePlugin.success(`批量推送成功完成！共上报 ${total} 处计量设施日水量数据`);
      emit('completed', props.records);
    }
  }, 180);
};
</script>
