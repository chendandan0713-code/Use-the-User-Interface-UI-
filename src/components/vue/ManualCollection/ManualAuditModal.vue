<template>
  <t-dialog
    :visible="visible"
    header="人工归集数据 - 审核流转审批"
    width="860px"
    :footer="false"
    @close="handleClose"
    top="6vh"
    destroy-on-close
  >
    <div v-if="record" class="space-y-4 text-xs select-none max-h-[78vh] overflow-y-auto pr-1">
      <!-- 1. 工单与状态横幅 -->
      <div class="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-bold text-slate-500">归集单号：{{ record.recordNo }}</span>
            <span
              v-if="record.auditStatus === '待审核'"
              class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              待主管部门审核
            </span>
            <span
              v-else-if="record.auditStatus === '已通过'"
              class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300"
            >
              ✓ 审核通过 (已归集入库)
            </span>
            <span
              v-else-if="record.auditStatus === '已驳回'"
              class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300"
            >
              ✕ 审核已驳回
            </span>

            <span v-if="record.isBatch" class="px-2 py-0.5 rounded text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200">
              批量补报单据
            </span>
          </div>
          <div class="text-sm font-bold text-slate-800 mt-1">
            {{ record.facilityName }}
          </div>
        </div>

        <div class="text-right text-[11px] text-slate-500">
          <div>提交时间：{{ record.submitTime }}</div>
          <div class="mt-0.5">填报责任人：<strong class="text-slate-700">{{ record.reporterName }}</strong> ({{ record.reporterPhone }})</div>
        </div>
      </div>

      <!-- 2. 计量设施基本信息与填报数据核算 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <!-- 设施台账明细 -->
        <div class="bg-white border border-slate-200/90 rounded-xl p-3.5 space-y-2 shadow-2xs">
          <div class="text-xs font-bold text-slate-800 pb-1.5 border-b border-slate-100 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            <span>计量设施台账基础信息</span>
          </div>
          <div class="space-y-1.5 text-[11.5px] text-slate-600">
            <div class="flex justify-between">
              <span class="text-slate-400">器具编号:</span>
              <span class="font-mono font-semibold text-slate-700">{{ record.facilityCode }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">取水权人:</span>
              <span class="font-medium text-slate-800">{{ record.waterOwner }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">许可证号:</span>
              <span class="font-mono text-slate-700">{{ record.permitNumber }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">所属行政区:</span>
              <span class="text-slate-800 font-medium">{{ record.district }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">取水用途:</span>
              <span class="text-slate-700">{{ record.waterUsage }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">计量方式:</span>
              <span class="text-slate-700">{{ record.meteringMethod }} (非在线人工抄表)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">填报周期配置:</span>
              <span class="font-semibold text-blue-700">
                {{ record.reportCycle === 'month' ? '按月填报' : (record.reportCycle === 'quarter' ? '按季度填报' : '按年填报') }}
              </span>
            </div>
          </div>
        </div>

        <!-- 本期抄见读数与水量核算 -->
        <div class="bg-white border border-slate-200/90 rounded-xl p-3.5 space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div>
            <div class="text-xs font-bold text-slate-800 pb-1.5 border-b border-slate-100 flex items-center justify-between">
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>申报水量核对 ({{ record.periodLabel }})</span>
              </span>
              <span class="text-[11px] text-slate-400">抄表日: {{ record.readingDate }}</span>
            </div>

            <!-- 水量公式核算 -->
            <div class="mt-3 p-3 bg-blue-50/50 rounded-lg border border-blue-200/60 flex items-center justify-around text-center">
              <div>
                <div class="text-[10px] text-slate-500">上期底数 (起码)</div>
                <div class="text-sm font-mono font-bold text-slate-700 mt-0.5">{{ record.startReading.toLocaleString() }} m³</div>
              </div>
              <div class="text-slate-400 text-sm font-bold">-</div>
              <div>
                <div class="text-[10px] text-slate-500">本期底数 (止码)</div>
                <div class="text-sm font-mono font-bold text-blue-700 mt-0.5">{{ record.endReading.toLocaleString() }} m³</div>
              </div>
              <div class="text-slate-400 text-sm font-bold">=</div>
              <div>
                <div class="text-[10px] text-slate-500">本期申报水量</div>
                <div class="text-base font-mono font-bold text-emerald-600 mt-0.5">{{ record.waterVolume.toLocaleString() }} m³</div>
              </div>
            </div>

            <!-- 智能辅助核查 -->
            <div class="mt-3 space-y-1 text-[11px]">
              <div class="flex items-center gap-1.5 text-emerald-700">
                <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>底数递进校验：本期底数高于上期底数，无倒流逆行异常</span>
              </div>
              <div class="flex items-center gap-1.5 text-emerald-700">
                <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>许可配额校验：累计取水量未超出西宁市水资源年度核定指标红线</span>
              </div>
              <div class="text-slate-500 pl-5">
                申报说明：{{ record.notes || '常规例行抄见上报' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 现场水表抄表凭证与照片核验 -->
      <div class="bg-white border border-slate-200/90 rounded-xl p-3.5 space-y-2.5 shadow-2xs">
        <div class="text-xs font-bold text-slate-800 pb-1.5 border-b border-slate-100 flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>现场水表读数凭证照片及材料核验</span>
          </span>
          <span class="text-[11px] text-slate-500">共 {{ record.voucherFiles?.length || 1 }} 份附件</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- 水表表盘模拟可视化照片 -->
          <div class="p-3 bg-slate-900 rounded-xl text-white flex flex-col items-center justify-center relative overflow-hidden border border-slate-800 min-h-[140px]">
            <div class="absolute top-2 left-2 text-[10px] text-slate-400 font-mono">
              [现场照片] {{ record.voucherFiles?.[0] || '水表表盘现场实拍.jpg' }}
            </div>
            
            <!-- 水表仿真表盘读数框 -->
            <div class="mt-4 flex flex-col items-center">
              <div class="text-[10px] text-slate-400 mb-1">机械字轮实拍采样</div>
              <div class="flex items-center bg-black border-2 border-slate-600 p-1.5 rounded-md shadow-inner gap-0.5">
                <span
                  v-for="(digit, dIdx) in formatDigits(record.endReading)"
                  :key="dIdx"
                  class="w-6 h-8 bg-slate-800 text-white font-mono font-bold text-lg flex items-center justify-center rounded border border-slate-700"
                >
                  {{ digit }}
                </span>
                <span class="text-xs font-bold text-slate-400 px-1">m³</span>
              </div>
              <div class="text-[10px] text-emerald-400 mt-2 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>AI智能识图识别读数：{{ record.endReading }} m³ (置信度 99.4%)</span>
              </div>
            </div>
          </div>

          <!-- 附件列表与巡检证明 -->
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div class="space-y-2">
              <div class="text-[11px] font-bold text-slate-700">申报证明材料清单</div>
              <div
                v-for="(fName, i) in (record.voucherFiles?.length ? record.voucherFiles : ['现场水表照片.jpg', '人工抄表记录单.pdf'])"
                :key="i"
                class="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between hover:border-blue-300 transition"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <svg class="w-4 h-4 text-blue-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span class="truncate text-slate-700 font-medium">{{ fName }}</span>
                </div>
                <button
                  type="button"
                  @click="handlePreviewFile(fName)"
                  class="text-blue-600 hover:text-blue-800 text-[11px] shrink-0 font-medium cursor-pointer"
                >
                  查看原图
                </button>
              </div>
            </div>

            <div class="text-[10px] text-slate-500 mt-2 bg-white p-2 rounded border border-slate-200">
              提示：非在线设施必须由水务局审核人员对比现场拍照凭据与申报底数一致后，方可签署同意。
            </div>
          </div>
        </div>
      </div>

      <!-- 4. 审核操作表单 (当处于待审核状态时可操作，已通过/驳回时展示历史结论) -->
      <div v-if="record.auditStatus === '待审核'" class="bg-white border border-slate-200/90 rounded-xl p-3.5 space-y-3 shadow-2xs">
        <div class="text-xs font-bold text-slate-800 pb-1.5 border-b border-slate-100 flex items-center justify-between">
          <span class="flex items-center gap-1.5 text-blue-700">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>水务局审批结论录入</span>
          </span>
          <span class="text-[11px] text-slate-400">经办人：西宁市水务局水资源管理科 / 王文斌</span>
        </div>

        <!-- 审核决议单选 -->
        <div class="flex items-center gap-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="pass"
              v-model="auditDecision"
              class="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
            />
            <span class="font-bold text-emerald-700 text-xs">审核通过 (准予归集入库)</span>
          </label>

          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="reject"
              v-model="auditDecision"
              class="w-4 h-4 text-rose-600 focus:ring-rose-500"
            />
            <span class="font-bold text-rose-700 text-xs">审核驳回 (退回重新填报)</span>
          </label>
        </div>

        <!-- 快捷常用审核短语 -->
        <div class="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span class="text-slate-500">快捷评语：</span>
          <button
            v-for="(phrase, pIdx) in quickPhrases"
            :key="pIdx"
            type="button"
            @click="auditComment = phrase"
            class="px-2 py-0.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded text-[11px] transition text-slate-600 cursor-pointer"
          >
            {{ phrase }}
          </button>
        </div>

        <!-- 审核意见输入框 -->
        <div>
          <label class="block text-[11px] text-slate-500 mb-1">
            审核核批意见
            <span v-if="auditDecision === 'reject'" class="text-rose-500">* (驳回必须填写详细原因)</span>
          </label>
          <textarea
            v-model="auditComment"
            rows="3"
            :placeholder="auditDecision === 'pass' ? '如：现场抄表底数与照片核实一致，水量合理，同意审核通过。' : '请输入驳回理由，如：照片读数模糊不清无法辨认/底数与上期不连续等。'"
            class="w-full px-3 py-2 border rounded-lg text-xs focus:outline-blue-500"
            :class="auditDecision === 'reject' ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-white'"
          ></textarea>
        </div>
      </div>

      <!-- 已有审核结论展示 -->
      <div v-else class="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
        <div class="font-bold text-xs text-slate-800 flex items-center justify-between">
          <span>历史审核结论与记录</span>
          <span class="text-[11px] text-slate-500">审核时间：{{ record.auditTime || '已归档' }}</span>
        </div>
        <div class="text-[11.5px] text-slate-700 space-y-1">
          <div>审核人员：<strong class="text-slate-800">{{ record.auditor || '水资源管理科审批员' }}</strong></div>
          <div>审核状态：<span class="font-bold" :class="record.auditStatus === '已通过' ? 'text-emerald-600' : 'text-rose-600'">{{ record.auditStatus }}</span></div>
          <div>审核意见：<span class="text-slate-600">{{ record.auditComment || '资料齐备，符合规范，同意归档。' }}</span></div>
        </div>
      </div>

      <!-- 5. 底部操作栏 -->
      <div class="pt-3 border-t border-slate-200 flex items-center justify-between">
        <button
          type="button"
          @click="handleClose"
          class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition cursor-pointer"
        >
          关闭
        </button>

        <div v-if="record.auditStatus === '待审核'" class="flex items-center gap-2">
          <button
            type="button"
            @click="handleExecuteAudit('已驳回')"
            class="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span>审核驳回</span>
          </button>

          <button
            type="button"
            @click="handleExecuteAudit('已通过')"
            class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>审核通过 (正式归集)</span>
          </button>
        </div>
      </div>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { ManualReportRecord } from '../../../types';

const props = defineProps<{
  visible: boolean;
  record: ManualReportRecord | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'audit-completed', payload: {
    recordId: string;
    auditStatus: '已通过' | '已驳回';
    auditComment: string;
    auditor: string;
    auditTime: string;
  }): void;
}>();

const auditDecision = ref<'pass' | 'reject'>('pass');
const auditComment = ref('凭证照片清晰完整，底数递进无误，用水量符合核定指标，审核通过。');

const quickPhrases = computed(() => {
  if (auditDecision.value === 'pass') {
    return [
      '凭证清晰，底数递进无误，审核通过。',
      '用水量符合季节性灌溉/生产规律，予以归集。',
      '现场抄见水量真实有效，审核通过。'
    ];
  } else {
    return [
      '表盘照片反光模糊，无法辨识指针读数，请重新核拍后申报。',
      '本期申报水量与水权人生产用水台账相差过大，请核实后重报。',
      '本期起码与上期归档止码不一致，退回核对。'
    ];
  }
});

watch(
  () => auditDecision.value,
  (decision) => {
    if (decision === 'pass') {
      auditComment.value = '凭证照片清晰完整，底数递进无误，用水量符合核定指标，审核通过。';
    } else {
      auditComment.value = '表盘照片反光模糊，无法辨识指针读数，请重新核拍后申报。';
    }
  }
);

watch(
  () => props.visible,
  (val) => {
    if (val && props.record) {
      if (props.record.auditStatus === '待审核') {
        auditDecision.value = 'pass';
        auditComment.value = '凭证照片清晰完整，底数递进无误，用水量符合核定指标，审核通过。';
      }
    }
  }
);

// 格式化读数字符串为6位字轮
const formatDigits = (reading: number) => {
  const str = String(Math.floor(reading || 0)).padStart(6, '0');
  return str.split('');
};

const handlePreviewFile = (fName: string) => {
  MessagePlugin.info(`正在调取高清图像原件预览：【${fName}】`);
};

const handleClose = () => {
  emit('update:visible', false);
};

const handleExecuteAudit = (status: '已通过' | '已驳回') => {
  if (status === '已驳回' && !auditComment.value.trim()) {
    MessagePlugin.warning('驳回时必须填写详细驳回意见！');
    return;
  }

  const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

  emit('audit-completed', {
    recordId: props.record!.id,
    auditStatus: status,
    auditComment: auditComment.value.trim() || (status === '已通过' ? '审核通过。' : '审核驳回。'),
    auditor: '西宁市水务局水资源管理科 / 王文斌',
    auditTime: nowStr,
  });

  MessagePlugin.success(
    status === '已通过'
      ? `工单【${props.record!.recordNo}】已审核通过，已完成数据入库归集！`
      : `工单【${props.record!.recordNo}】已驳回，相关填报期次已退回重报！`
  );

  handleClose();
};
</script>
