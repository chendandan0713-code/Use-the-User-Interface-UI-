<template>
  <t-dialog
    v-model:visible="dialogVisible"
    header="小型灌区月度农业用水核算详情与审批台账"
    width="880px"
    :footer="false"
    :close-on-overlay-click="true"
  >
    <div v-if="record" class="space-y-4 max-h-[75vh] overflow-y-auto pr-1 text-xs select-none">
      <!-- Top Overview Header Card -->
      <div class="p-3.5 rounded-xl bg-gradient-to-r from-blue-50/90 via-slate-50 to-indigo-50/60 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-slate-900">{{ record.irrigationName }}</span>
              <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                {{ record.periodLabel }}核算
              </span>
            </div>
            <div class="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
              <span>取水许可证：<strong class="font-mono text-slate-800">{{ record.permitNumber }}</strong></span>
              <span>·</span>
              <span>所属区县：<strong>{{ record.district }}</strong></span>
            </div>
          </div>
        </div>

        <!-- Current Status Badge -->
        <div class="flex items-center gap-2">
          <span
            v-if="record.status === 'draft'"
            class="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200"
          >
            县级草稿
          </span>
          <span
            v-else-if="record.status === 'pending_city'"
            class="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse"
          >
            待市级初审
          </span>
          <span
            v-else-if="record.status === 'pending_province'"
            class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300 animate-pulse"
          >
            待省级终审
          </span>
          <span
            v-else-if="record.status === 'approved'"
            class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300"
          >
            已终审入库
          </span>
          <span
            v-else-if="record.status === 'rejected'"
            class="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300"
          >
            已驳回修改
          </span>
        </div>
      </div>

      <!-- Section 1: 取水许可证照基准参数 (证照维度) -->
      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div class="font-bold text-slate-800 text-xs flex items-center gap-1.5 mb-2">
          <span class="w-1.5 h-3.5 rounded-full bg-blue-600"></span>
          <span>取水许可证照档案与水源参数</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div>
            <span class="text-slate-400 block text-[11px]">取水权人</span>
            <span class="font-medium text-slate-800 truncate block" :title="record.waterOwner">{{ record.waterOwner }}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">取水水源类型</span>
            <span class="font-semibold text-blue-700">{{ record.waterSourceType }}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">年许可取水量</span>
            <span class="font-mono font-bold text-slate-800">{{ record.annualQuota }} <span class="text-[10px] font-normal text-slate-500">万m³</span></span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">核算计量方法</span>
            <span class="font-medium text-slate-800">{{ record.calculationMethod }}</span>
          </div>
        </div>
      </div>

      <!-- Section 2: 一、农业用水量 7项明细与其中地下水 -->
      <div class="bg-white p-3.5 rounded-xl border-2 border-slate-200 shadow-2xs space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-200">
          <div class="font-bold text-slate-900 text-xs flex items-center gap-1.5">
            <span class="w-1.5 h-3.5 rounded-full bg-blue-600"></span>
            <span>一、农业用水量分项核算成果 (万m³)</span>
          </div>
          <div class="text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            当月核算总小计：<strong class="font-mono text-blue-700 text-sm">{{ record.waterData.subtotal.toFixed(2) }}</strong> 万m³
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <!-- 1. 耕地灌溉 -->
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div class="text-[11px] text-slate-500">(一) 耕地灌溉</div>
            <div class="text-base font-bold font-mono text-slate-800 mt-0.5">
              {{ record.waterData.farmland.toFixed(2) }} <span class="text-xs font-normal text-slate-400">万m³</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1">占比 {{ calcShare(record.waterData.farmland) }}%</div>
          </div>

          <!-- 2. 林地灌溉 -->
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div class="text-[11px] text-slate-500">(二) 林地灌溉</div>
            <div class="text-base font-bold font-mono text-slate-800 mt-0.5">
              {{ record.waterData.woodland.toFixed(2) }} <span class="text-xs font-normal text-slate-400">万m³</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1">占比 {{ calcShare(record.waterData.woodland) }}%</div>
          </div>

          <!-- 3. 园地灌溉 -->
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div class="text-[11px] text-slate-500">(三) 园地灌溉</div>
            <div class="text-base font-bold font-mono text-slate-800 mt-0.5">
              {{ record.waterData.orchard.toFixed(2) }} <span class="text-xs font-normal text-slate-400">万m³</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1">占比 {{ calcShare(record.waterData.orchard) }}%</div>
          </div>

          <!-- 4. 牧草地灌溉 -->
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div class="text-[11px] text-slate-500">(四) 牧草地灌溉</div>
            <div class="text-base font-bold font-mono text-slate-800 mt-0.5">
              {{ record.waterData.pasture.toFixed(2) }} <span class="text-xs font-normal text-slate-400">万m³</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1">占比 {{ calcShare(record.waterData.pasture) }}%</div>
          </div>

          <!-- 5. 鱼塘补水 -->
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div class="text-[11px] text-slate-500">(五) 鱼塘补水</div>
            <div class="text-base font-bold font-mono text-slate-800 mt-0.5">
              {{ record.waterData.fishpond.toFixed(2) }} <span class="text-xs font-normal text-slate-400">万m³</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1">占比 {{ calcShare(record.waterData.fishpond) }}%</div>
          </div>

          <!-- 6. 畜禽用水 -->
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div class="text-[11px] text-slate-500">(六) 畜禽用水</div>
            <div class="text-base font-bold font-mono text-slate-800 mt-0.5">
              {{ record.waterData.livestock.toFixed(2) }} <span class="text-xs font-normal text-slate-400">万m³</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1">占比 {{ calcShare(record.waterData.livestock) }}%</div>
          </div>

          <!-- 7. (七) 小计 -->
          <div class="p-2.5 rounded-lg bg-blue-50/90 border border-blue-300">
            <div class="text-[11px] font-bold text-blue-800">(七) 小计 (自动汇总)</div>
            <div class="text-lg font-bold font-mono text-blue-700 mt-0.5">
              {{ record.waterData.subtotal.toFixed(2) }} <span class="text-xs font-normal text-blue-600">万m³</span>
            </div>
            <div class="text-[10px] text-blue-600 mt-1">
              折合 {{ (record.waterData.subtotal * 10000).toLocaleString() }} m³
            </div>
          </div>

          <!-- 其中: 取用地下 -->
          <div class="p-2.5 rounded-lg bg-cyan-50/90 border border-cyan-300">
            <div class="text-[11px] font-bold text-cyan-900">其中: 取用地下水</div>
            <div class="text-lg font-bold font-mono text-cyan-700 mt-0.5">
              {{ record.waterData.groundwater.toFixed(2) }} <span class="text-xs font-normal text-cyan-600">万m³</span>
            </div>
            <div class="text-[10px] text-cyan-700 mt-1">
              占小计 {{ calcGroundwaterRatio() }}%
            </div>
          </div>
        </div>

        <!-- Visual Proportion Bar -->
        <div class="pt-2">
          <div class="text-[11px] text-slate-500 mb-1 flex items-center justify-between">
            <span>农业用水结构占比条形图</span>
            <span>合计: 100%</span>
          </div>
          <div class="h-3 rounded-full bg-slate-100 overflow-hidden flex">
            <div :style="{ width: calcShare(record.waterData.farmland) + '%' }" class="bg-blue-600" title="耕地灌溉"></div>
            <div :style="{ width: calcShare(record.waterData.woodland) + '%' }" class="bg-emerald-500" title="林地灌溉"></div>
            <div :style="{ width: calcShare(record.waterData.orchard) + '%' }" class="bg-amber-500" title="园地灌溉"></div>
            <div :style="{ width: calcShare(record.waterData.pasture) + '%' }" class="bg-lime-500" title="牧草地灌溉"></div>
            <div :style="{ width: calcShare(record.waterData.fishpond) + '%' }" class="bg-cyan-500" title="鱼塘补水"></div>
            <div :style="{ width: calcShare(record.waterData.livestock) + '%' }" class="bg-purple-500" title="畜禽用水"></div>
          </div>
          <div class="flex flex-wrap items-center gap-3 mt-1.5 text-[10px] text-slate-500">
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-blue-600"></span>耕地 {{ calcShare(record.waterData.farmland) }}%</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-emerald-500"></span>林地 {{ calcShare(record.waterData.woodland) }}%</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-amber-500"></span>园地 {{ calcShare(record.waterData.orchard) }}%</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-lime-500"></span>牧草 {{ calcShare(record.waterData.pasture) }}%</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-cyan-500"></span>鱼塘 {{ calcShare(record.waterData.fishpond) }}%</span>
            <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-purple-500"></span>畜禽 {{ calcShare(record.waterData.livestock) }}%</span>
          </div>
        </div>
      </div>

      <!-- Section 3: 县级填报信息与附件 -->
      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div class="font-bold text-slate-800 text-xs flex items-center gap-1.5 mb-2">
          <span class="w-1.5 h-3.5 rounded-full bg-blue-600"></span>
          <span>县级填报凭证材料与经办人</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs mb-2">
          <div>
            <span class="text-slate-400 block text-[11px]">填报经办人</span>
            <span class="font-medium text-slate-800">{{ record.reporter.name }} ({{ record.reporter.phone }})</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">填报主管单位</span>
            <span class="font-medium text-slate-800">{{ record.reporter.unit }}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">填报提交时间</span>
            <span class="font-mono text-slate-800">{{ record.reporter.time }}</span>
          </div>
        </div>

        <div v-if="record.voucherFiles && record.voucherFiles.length > 0" class="pt-2 border-t border-slate-200/80">
          <span class="text-[11px] text-slate-500 block mb-1.5">填报附件凭证：</span>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(f, i) in record.voucherFiles"
              :key="i"
              class="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 text-[11px] flex items-center gap-1.5 shadow-2xs"
            >
              <svg class="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span>{{ f }}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Section 4: 县-市-省 三级审批流转轨迹 (业务闭环) -->
      <div class="p-3.5 bg-white rounded-xl border border-slate-200">
        <div class="font-bold text-slate-900 text-xs flex items-center gap-1.5 mb-3">
          <span class="w-1.5 h-3.5 rounded-full bg-indigo-600"></span>
          <span>县-市-省三级全流程审批轨迹台账</span>
        </div>

        <div class="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
          <!-- Step 1: 县级填报 -->
          <div class="relative flex items-start gap-3 pl-6">
            <span class="absolute left-1.5 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-white"></span>
            <div class="flex-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-800">1. 县级填报提交</span>
                <span class="text-slate-400 text-[11px] font-mono">{{ record.reporter.time }}</span>
              </div>
              <div class="text-slate-600 text-[11.5px] mt-0.5">
                经办人：{{ record.reporter.name }} · {{ record.reporter.unit }}
              </div>
              <div v-if="record.remarks" class="text-slate-500 text-[11px] mt-1 bg-white p-1.5 rounded border border-slate-200">
                填报备注：{{ record.remarks }}
              </div>
            </div>
          </div>

          <!-- Step 2: 市级审核 -->
          <div class="relative flex items-start gap-3 pl-6">
            <span
              :class="[
                'absolute left-1.5 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full ring-4 ring-white',
                record.cityAuditor ? (record.cityAuditor.result === 'pass' ? 'bg-amber-500' : 'bg-rose-500') : 'bg-slate-300'
              ]"
            ></span>
            <div class="flex-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-800">2. 西宁市水务局初审</span>
                <span v-if="record.cityAuditor" class="text-slate-400 text-[11px] font-mono">{{ record.cityAuditor.time }}</span>
                <span v-else class="text-amber-600 text-[11px] font-medium">待审核中...</span>
              </div>
              <div v-if="record.cityAuditor">
                <div class="text-slate-600 text-[11.5px] mt-0.5">
                  审核人：{{ record.cityAuditor.name }} · {{ record.cityAuditor.unit }}
                </div>
                <div
                  :class="[
                    'p-2 rounded mt-1.5 text-[11.5px] border leading-relaxed',
                    record.cityAuditor.result === 'pass'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  ]"
                >
                  <strong :class="record.cityAuditor.result === 'pass' ? 'text-amber-800' : 'text-rose-700'">
                    [{{ record.cityAuditor.result === 'pass' ? '初审通过' : '初审驳回' }}]：
                  </strong>
                  {{ record.cityAuditor.comment }}
                </div>
              </div>
              <div v-else class="text-slate-400 text-[11px] mt-1">
                等待西宁市水务局水资源管理科复核以电折水凭证与上报数据。
              </div>
            </div>
          </div>

          <!-- Step 3: 省级终审 -->
          <div class="relative flex items-start gap-3 pl-6">
            <span
              :class="[
                'absolute left-1.5 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full ring-4 ring-white',
                record.provinceAuditor ? (record.provinceAuditor.result === 'pass' ? 'bg-emerald-500' : 'bg-rose-500') : 'bg-slate-300'
              ]"
            ></span>
            <div class="flex-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-800">3. 青海省水利厅终审</span>
                <span v-if="record.provinceAuditor" class="text-slate-400 text-[11px] font-mono">{{ record.provinceAuditor.time }}</span>
                <span v-else-if="record.status === 'pending_province'" class="text-indigo-600 text-[11px] font-medium">待终审中...</span>
                <span v-else class="text-slate-400 text-[11px]">未流转至省厅</span>
              </div>
              <div v-if="record.provinceAuditor">
                <div class="text-slate-600 text-[11.5px] mt-0.5">
                  终审人：{{ record.provinceAuditor.name }} · {{ record.provinceAuditor.unit }}
                </div>
                <div
                  :class="[
                    'p-2 rounded mt-1.5 text-[11.5px] border leading-relaxed',
                    record.provinceAuditor.result === 'pass'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  ]"
                >
                  <strong :class="record.provinceAuditor.result === 'pass' ? 'text-emerald-800' : 'text-rose-700'">
                    [{{ record.provinceAuditor.result === 'pass' ? '终审通过并入库' : '终审驳回' }}]：
                  </strong>
                  {{ record.provinceAuditor.comment }}
                </div>
              </div>
              <div v-else class="text-slate-400 text-[11px] mt-1">
                {{ record.status === 'pending_province' ? '市级初审已通过，省水利厅水资源处正在终审核查中。' : '前序审核完成后自动进入省级终审。' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
        <button
          type="button"
          @click="handlePrintReceipt"
          class="px-3 py-1.5 rounded bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          <span>打印核算审批单</span>
        </button>

        <button
          type="button"
          @click="dialogVisible = false"
          class="px-4 py-1.5 rounded-md bg-[#2563EB] hover:bg-blue-700 text-white font-medium transition cursor-pointer shadow-2xs"
        >
          关闭
        </button>
      </div>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { IrrigationAccountingRecord } from '../../../types';

const props = defineProps<{
  visible: boolean;
  record: IrrigationAccountingRecord | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
}>();

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val),
});

const calcShare = (val: number) => {
  if (!props.record || props.record.waterData.subtotal <= 0) return '0.0';
  return ((val / props.record.waterData.subtotal) * 100).toFixed(1);
};

const calcGroundwaterRatio = () => {
  if (!props.record || props.record.waterData.subtotal <= 0) return '0.0';
  return ((props.record.waterData.groundwater / props.record.waterData.subtotal) * 100).toFixed(1);
};

const handlePrintReceipt = () => {
  MessagePlugin.success('已生成小型灌区月度农业用水核算回执单');
};
</script>
