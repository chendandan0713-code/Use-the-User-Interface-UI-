<template>
  <t-dialog
    v-model:visible="visible"
    header="故障报修工单处理流转全景"
    width="640px"
    :footer="null"
  >
    <div v-if="record" class="space-y-4 text-xs select-none py-1">
      <div class="bg-amber-50 p-3 rounded-lg border border-amber-200">
        <div class="flex items-center justify-between">
          <span class="font-bold text-slate-800 text-sm">{{ record.facilityName }}</span>
          <t-tag theme="warning" variant="light">{{ record.status }}</t-tag>
        </div>
        <div class="text-slate-500 font-mono mt-1">器具编号: {{ record.facilityCode }} · 取水权人: {{ record.waterOwner }}</div>
      </div>

      <!-- Audit timeline using TDesign Timeline -->
      <div class="p-4 bg-white rounded-xl border border-slate-200">
        <div class="text-xs font-bold text-slate-800 mb-3">多级审批流转时序</div>
        <t-timeline layout="vertical">
          <t-timeline-item dot-color="primary">
            <template #label>
              <span class="font-bold text-slate-800">1. 取水单位线上报修</span>
              <div class="text-[11px] text-slate-400 font-mono mt-0.5">{{ record.faultTime }}</div>
            </template>
            <div class="text-slate-600 mt-1">
              由【{{ record.reporter }}】提交故障情况说明，底数记录 {{ record.faultWaterMeterReading }} m³。
            </div>
          </t-timeline-item>

          <t-timeline-item :dot-color="record.status === '故障待审' ? 'warning' : 'primary'">
            <template #label>
              <span class="font-bold text-slate-800">2. 西宁市水政监察初审</span>
              <div class="text-[11px] text-slate-400 font-mono mt-0.5">2026-09-02 10:30</div>
            </template>
            <div class="text-slate-600 mt-1">
              水政监管科已完成现场相片审核，确认传感器硬件损坏，派发维修工单。
            </div>
          </t-timeline-item>

          <t-timeline-item :dot-color="record.status === '已完成' ? 'success' : 'default'">
            <template #label>
              <span class="font-bold text-slate-800">3. 现场维保与解除校核</span>
              <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                {{ record.handleTime || '维保处理中...' }}
              </div>
            </template>
            <div class="text-slate-600 mt-1">
              {{ record.resolvedDesc || '检修团队正前往现场排查电磁感应电极，校准后提交复测解除凭据。' }}
            </div>
          </t-timeline-item>
        </t-timeline>
      </div>

      <div class="flex justify-end pt-2">
        <t-button theme="primary" size="small" @click="visible = false">
          关闭
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
