<template>
  <t-dialog
    :visible="visible"
    header="取水许可证月度水量填报明细与审核轨迹"
    width="780px"
    :footer="null"
    @update:visible="$emit('update:visible', $event)"
  >
    <div v-if="record" class="space-y-4 text-xs text-slate-700 py-1">
      <!-- 1. Top Banner: License & Month summary -->
      <div class="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 border border-blue-200/80 flex flex-wrap items-center justify-between gap-3">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="font-bold text-sm text-slate-800">{{ record.licenseName }}</span>
            <span
              :class="[
                'px-2 py-0.5 rounded-full text-[11px] font-semibold border',
                record.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
                record.status === 'pending_city' ? 'bg-amber-50 text-amber-700 border-amber-300 animate-pulse' :
                record.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-300' :
                'bg-slate-100 text-slate-700 border-slate-300'
              ]"
            >
              {{ statusLabel(record.status) }}
            </span>
            <span v-if="record.isUsedForAnnualSummary" class="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-800 font-bold border border-blue-300">
              已纳入年度数据支撑
            </span>
          </div>
          <div class="text-slate-500 text-[11px] flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>证照编号：<strong class="text-slate-700 font-mono">{{ record.permitNumber }}</strong></span>
            <span>取水权人：{{ record.waterOwner }}</span>
            <span>所属区县：{{ record.district }}</span>
            <span>行业分类：{{ record.industryType }}</span>
          </div>
        </div>

        <div class="text-right">
          <div class="text-[11px] text-slate-400">填报期次</div>
          <div class="text-base font-bold font-mono text-blue-700">{{ record.periodLabel }}</div>
        </div>
      </div>

      <!-- 2. Water Amount Breakdown Cards -->
      <div>
        <div class="font-semibold text-slate-800 text-xs mb-2 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-blue-600"></span>
          <span>本月取用水量核定指标 (单位：万m³)</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span class="text-slate-500 text-[11px] block">地表水取水量</span>
            <span class="text-base font-bold font-mono text-slate-800">{{ record.surfaceWater.toFixed(2) }}</span>
            <span class="text-[10px] text-slate-400 ml-1">万m³</span>
          </div>

          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span class="text-slate-500 text-[11px] block">地下水取水量</span>
            <span class="text-base font-bold font-mono text-cyan-700">{{ record.groundwater.toFixed(2) }}</span>
            <span class="text-[10px] text-slate-400 ml-1">万m³</span>
          </div>

          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span class="text-slate-500 text-[11px] block">非常规水/再生水</span>
            <span class="text-base font-bold font-mono text-indigo-700">{{ (record.unconventionalWater || 0).toFixed(2) }}</span>
            <span class="text-[10px] text-slate-400 ml-1">万m³</span>
          </div>

          <div class="p-2.5 rounded-lg bg-blue-50/80 border border-blue-200">
            <span class="text-blue-800 text-[11px] block font-medium">本月取水总量合计</span>
            <span class="text-lg font-bold font-mono text-blue-700">{{ record.totalWater.toFixed(2) }}</span>
            <span class="text-[10px] text-blue-600 ml-1">万m³</span>
          </div>
        </div>
      </div>

      <!-- 3. Meter Reading & Deviation Verification -->
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
        <div class="font-semibold text-slate-800 text-xs flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>表计底数核算与计量比对</span>
          </div>
          <span class="text-[11px] text-slate-500">计量方式：{{ record.meteringMethod }}</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11.5px]">
          <div>上期抄见底数：<strong class="font-mono text-slate-800">{{ record.prevMeterReading.toLocaleString() }} m³</strong></div>
          <div>本期抄见底数：<strong class="font-mono text-slate-800">{{ record.currentMeterReading.toLocaleString() }} m³</strong></div>
          <div>互感倍率：<span class="font-mono text-slate-700">{{ record.meterMultiplier }}x</span></div>
          <div>月度参考限额：<span class="font-mono text-slate-700">{{ record.monthlyQuota.toFixed(2) }} 万m³</span></div>
        </div>

        <div v-if="record.warningReason" class="p-2 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[11px]">
          <strong>超限/波动说明：</strong>{{ record.warningReason }}
        </div>
      </div>

      <!-- 4. Voucher files -->
      <div>
        <div class="font-semibold text-slate-800 text-xs mb-2 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>现场抄表与核算佐证附件 ({{ record.voucherFiles?.length || 0 }})</span>
        </div>

        <div v-if="record.voucherFiles && record.voucherFiles.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div
            v-for="(f, idx) in record.voucherFiles"
            :key="idx"
            class="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between hover:border-blue-400 transition"
          >
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg v-if="f.type === 'pdf'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <div class="min-w-0">
                <div class="truncate font-medium text-slate-800 text-xs" :title="f.name">{{ f.name }}</div>
                <div class="text-[10px] text-slate-400">{{ f.size }} · {{ f.uploadTime }}</div>
              </div>
            </div>

            <button
              type="button"
              class="px-2 py-1 text-[11px] text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded cursor-pointer"
              @click="handlePreviewFile(f.name)"
            >
              预览查验
            </button>
          </div>
        </div>
        <div v-else class="text-slate-400 text-center py-2 text-xs">暂无佐证附件</div>
      </div>

      <!-- 5. Audit logs timeline -->
      <div>
        <div class="font-semibold text-slate-800 text-xs mb-2 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-purple-600"></span>
          <span>县级填报与市级审核流转轨迹</span>
        </div>

        <div class="space-y-2 border-l-2 border-slate-200 ml-2 pl-3 py-1">
          <div
            v-for="(l, idx) in record.logs"
            :key="l.id || idx"
            class="relative space-y-0.5 text-[11.5px]"
          >
            <div class="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white"></div>
            <div class="flex items-center justify-between text-slate-500">
              <span class="font-semibold text-slate-800">{{ l.action }}</span>
              <span class="font-mono text-[10px]">{{ l.time }}</span>
            </div>
            <div class="text-slate-600">
              经办人：<strong>{{ l.operatorName }}</strong> ({{ l.roleName }})
            </div>
            <div v-if="l.comment" class="p-1.5 rounded bg-slate-100 text-slate-700 text-xs font-sans mt-0.5">
              批注意见：{{ l.comment }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import type { LicenseMonthlyWaterReport } from '../../../../types';

defineProps<{
  visible: boolean;
  record: LicenseMonthlyWaterReport | null;
}>();

defineEmits<{
  (e: 'update:visible', val: boolean): void;
}>();

function statusLabel(status: string) {
  switch (status) {
    case 'draft': return '县级草稿';
    case 'pending_city': return '待市级审核';
    case 'approved': return '市级已通过(已入库)';
    case 'rejected': return '市级已驳回';
    default: return status;
  }
}

function handlePreviewFile(fileName: string) {
  MessagePlugin.info(`已调阅凭证查验系统：${fileName}`);
}
</script>
