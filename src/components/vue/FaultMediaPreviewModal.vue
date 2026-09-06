<template>
  <t-dialog
    v-model:visible="visible"
    header="故障现场佐证照片与材料详情"
    width="580px"
    :footer="null"
  >
    <div v-if="record" class="space-y-3 text-xs select-none py-1">
      <div class="text-slate-600">
        设施名称：<strong class="text-slate-800">{{ record.facilityName }}</strong>（{{ record.facilityCode }}）
      </div>

      <!-- Preview image canvas -->
      <div class="space-y-2">
        <div class="font-medium text-slate-700">现场故障仪表特写相片:</div>
        <div class="bg-slate-100 rounded-xl p-4 border border-slate-200 flex flex-col items-center justify-center min-h-[220px]">
          <!-- Simulated realistic meter display -->
          <div class="w-full max-w-sm bg-slate-900 rounded-lg p-4 text-white border-2 border-slate-700 shadow-md">
            <div class="flex items-center justify-between text-[11px] text-cyan-300 font-mono pb-2 border-b border-white/10">
              <span>XINING WATER METER #{{ record.facilityCode }}</span>
              <span class="text-red-400 font-bold">ERROR: E-04</span>
            </div>
            <div class="py-4 text-center font-mono">
              <div class="text-3xl font-bold tracking-wider text-amber-400">
                {{ record.faultWaterMeterReading }} <span class="text-sm font-normal text-slate-400">m³</span>
              </div>
              <div class="text-[10px] text-slate-400 mt-1">
                瞬时流量异常中断 · 传感器线圈阻抗超标
              </div>
            </div>
            <div class="text-[10px] text-slate-400 text-right font-mono">
              拍摄于 {{ record.faultTime }} · GPS水印校核通过
            </div>
          </div>
        </div>
      </div>

      <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-600">
        <span class="font-semibold text-slate-800">故障具体情况描述:</span>
        <div class="mt-1 leading-relaxed">{{ record.faultDesc }}</div>
      </div>

      <div class="flex justify-end pt-2">
        <t-button theme="primary" size="small" @click="visible = false">
          返回
        </t-button>
      </div>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FaultRecord } from '../../types';

const props = defineProps<{
  visible: boolean;
  record: FaultRecord | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
}>();

const visible = computed({
  get: () => props.visible,
  set: (val: boolean) => emit('update:visible', val),
});
</script>
