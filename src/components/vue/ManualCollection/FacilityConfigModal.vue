<template>
  <t-dialog
    :visible="visible"
    header="非在线计量设施 - 填报周期与责任人配置"
    width="560px"
    :footer="false"
    @close="handleClose"
    top="12vh"
    destroy-on-close
  >
    <div v-if="facility" class="space-y-4 text-xs select-none">
      <div class="bg-blue-50/60 p-3 rounded-lg border border-blue-200/80">
        <div class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
          <span>{{ facility.name }}</span>
          <span class="font-mono text-[11px] text-blue-700">({{ facility.code }})</span>
        </div>
        <div class="text-[11px] text-slate-600 mt-1 flex flex-wrap gap-x-3">
          <span>取水权人：{{ facility.waterOwner }}</span>
          <span>区县：{{ facility.district }}</span>
          <span>计量方式：{{ facility.meteringMethod }}</span>
        </div>
      </div>

      <div class="space-y-3">
        <!-- 填报周期配置 -->
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">
            填报周期配置 (根据计量设施特征与考核要求选择) <span class="text-rose-500">*</span>
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              type="button"
              @click="formCycle = 'month'"
              :class="[
                'p-2.5 rounded-lg border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1',
                formCycle === 'month'
                  ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold ring-1 ring-blue-500'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              ]"
            >
              <span class="text-xs">按月填报</span>
              <span class="text-[10px] text-slate-400 font-normal">重点工业/生活井</span>
            </button>

            <button
              type="button"
              @click="formCycle = 'quarter'"
              :class="[
                'p-2.5 rounded-lg border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1',
                formCycle === 'quarter'
                  ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold ring-1 ring-blue-500'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              ]"
            >
              <span class="text-xs">按季度填报</span>
              <span class="text-[10px] text-slate-400 font-normal">农业灌溉/生态渠道</span>
            </button>

            <button
              type="button"
              @click="formCycle = 'year'"
              :class="[
                'p-2.5 rounded-lg border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1',
                formCycle === 'year'
                  ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold ring-1 ring-blue-500'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              ]"
            >
              <span class="text-xs">按年填报</span>
              <span class="text-[10px] text-slate-400 font-normal">战略应急/低频水点</span>
            </button>
          </div>
        </div>

        <!-- 填报责任人 -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] text-slate-600 mb-1">抄表/填报责任人姓名 <span class="text-rose-500">*</span></label>
            <input
              type="text"
              v-model="formReporterName"
              placeholder="如：张建军"
              class="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-blue-500"
            />
          </div>
          <div>
            <label class="block text-[11px] text-slate-600 mb-1">联系电话 <span class="text-rose-500">*</span></label>
            <input
              type="text"
              v-model="formReporterPhone"
              placeholder="如：13897210088"
              class="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-blue-500"
            />
          </div>
        </div>

        <!-- 考核时限说明 -->
        <div>
          <label class="block text-[11px] text-slate-600 mb-1">考核填报时限说明</label>
          <input
            type="text"
            v-model="formDeadlineDesc"
            placeholder="如：每月5日前填报上月数据"
            class="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-blue-500"
          />
        </div>

        <!-- 核定计划水量配额 -->
        <div>
          <label class="block text-[11px] text-slate-600 mb-1">年度取水计划核定额度 (万m³)</label>
          <input
            type="number"
            v-model.number="formQuotaVolume"
            placeholder="如：12.5"
            class="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-blue-500"
          />
        </div>
      </div>

      <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
        <button
          type="button"
          @click="handleClose"
          class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition cursor-pointer"
        >
          取消
        </button>
        <button
          type="button"
          @click="handleSave"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition cursor-pointer shadow-sm"
        >
          保存配置
        </button>
      </div>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { NonOnlineFacility, ReportCycleType } from '../../../types';

const props = defineProps<{
  visible: boolean;
  facility: NonOnlineFacility | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'save', payload: {
    facilityId: string;
    reportCycle: ReportCycleType;
    reporterName: string;
    reporterPhone: string;
    deadlineDesc: string;
    quotaVolume: number;
  }): void;
}>();

const formCycle = ref<ReportCycleType>('month');
const formReporterName = ref('');
const formReporterPhone = ref('');
const formDeadlineDesc = ref('');
const formQuotaVolume = ref(10.0);

watch(
  () => props.facility,
  (fac) => {
    if (fac) {
      formCycle.value = fac.reportCycle || 'month';
      formReporterName.value = fac.reporterName || '';
      formReporterPhone.value = fac.reporterPhone || '';
      formDeadlineDesc.value = fac.deadlineDesc || (formCycle.value === 'month' ? '每月5日前填报上月数据' : (formCycle.value === 'quarter' ? '每季度初10日前填报上一季度数据' : '每年1月15日前填报上一年度数据'));
      formQuotaVolume.value = fac.quotaVolume || 10.0;
    }
  },
  { immediate: true }
);

watch(
  () => formCycle.value,
  (cycle) => {
    if (cycle === 'month') {
      formDeadlineDesc.value = '每月5日前填报上月数据';
    } else if (cycle === 'quarter') {
      formDeadlineDesc.value = '每季度初10日前填报上一季度数据';
    } else {
      formDeadlineDesc.value = '每年1月15日前填报上一年度累计数据';
    }
  }
);

const handleClose = () => {
  emit('update:visible', false);
};

const handleSave = () => {
  if (!props.facility) return;

  emit('save', {
    facilityId: props.facility.id,
    reportCycle: formCycle.value,
    reporterName: formReporterName.value.trim(),
    reporterPhone: formReporterPhone.value.trim(),
    deadlineDesc: formDeadlineDesc.value.trim(),
    quotaVolume: Number(formQuotaVolume.value) || 0,
  });

  MessagePlugin.success(`设施【${props.facility.name}】填报周期配置已更新为【${formCycle.value === 'month' ? '按月' : (formCycle.value === 'quarter' ? '按季度' : '按年')}】！`);
  handleClose();
};
</script>
