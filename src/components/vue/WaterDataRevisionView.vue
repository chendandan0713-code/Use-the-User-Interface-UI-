<template>
  <div class="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden p-3 gap-3 bg-[#edf3fb] select-none">
    <!-- Top Metrics Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
      <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500 font-medium">待审核修订申请</div>
          <div class="text-xl font-bold font-mono text-amber-600 mt-0.5">
            {{ revisions.filter(r => r.status === '待审核').length }} <span class="text-xs font-normal text-slate-400">单</span>
          </div>
          <div class="text-[10px] text-amber-600 mt-1">需水政科核对校表佐证</div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500 font-medium">本月核准调减水量</div>
          <div class="text-xl font-bold font-mono text-emerald-600 mt-0.5">
            -5.12 <span class="text-xs font-normal text-slate-400">万m³</span>
          </div>
          <div class="text-[10px] text-emerald-600 mt-1">扣减管网爆管与仪表漂移</div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500 font-medium">本月核准调增补录</div>
          <div class="text-xl font-bold font-mono text-blue-600 mt-0.5">
            +2.85 <span class="text-xs font-normal text-slate-400">万m³</span>
          </div>
          <div class="text-[10px] text-blue-500 mt-1">断线丢包与SCADA平差</div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
            <polyline points="17 18 23 18 23 12"></polyline>
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500 font-medium">累计修订合规率</div>
          <div class="text-xl font-bold font-mono text-slate-800 mt-0.5">
            98.5 <span class="text-xs font-normal text-slate-400">%</span>
          </div>
          <div class="text-[10px] text-slate-400 mt-1">均通过国家校准规程凭证</div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <polyline points="9 15 11 17 15 13"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <!-- Filter & Action Bar -->
    <div class="bg-white rounded-xl p-3 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-2.5 shrink-0 text-xs">
      <div class="flex flex-wrap items-center gap-2">
        <div class="w-48">
          <t-input
            v-model="keyword"
            placeholder="搜索单号/权人/设施"
            clearable
            size="small"
          >
            <template #prefix-icon>
              <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </template>
          </t-input>
        </div>

        <div class="w-36">
          <t-select
            v-model="selectedReason"
            placeholder="修订原因类型"
            clearable
            size="small"
            :options="reasonOptions"
          />
        </div>

        <div class="w-28">
          <t-select
            v-model="selectedStatus"
            placeholder="审核状态"
            clearable
            size="small"
            :options="statusOptions"
          />
        </div>

        <button
          type="button"
          @click="resetFilters"
          class="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer flex items-center gap-1"
        >
          <svg class="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
          重置
        </button>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="handleExport"
          class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5 font-medium"
        >
          <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          导出台账
        </button>

        <button
          type="button"
          @click="openCreateModal"
          class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer flex items-center gap-1.5 font-medium shadow-xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          发起水量修订申请
        </button>
      </div>
    </div>

    <!-- Table Container -->
    <div class="flex-1 min-h-0 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col overflow-hidden">
      <div class="flex-1 overflow-auto custom-scrollbar">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-slate-50/90 text-slate-600 sticky top-0 z-10 border-b border-slate-200 font-medium">
            <tr>
              <th class="py-2.5 px-3 w-12 text-center">序号</th>
              <th class="py-2.5 px-3 min-w-[130px]">修订申请单号</th>
              <th class="py-2.5 px-3 min-w-[180px]">取水权人 & 设施</th>
              <th class="py-2.5 px-3 min-w-[160px]">涉及水量核算周期</th>
              <th class="py-2.5 px-3 min-w-[90px] text-right">原读数(万m³)</th>
              <th class="py-2.5 px-3 min-w-[90px] text-right">修订后(万m³)</th>
              <th class="py-2.5 px-3 min-w-[90px] text-right">增减差额</th>
              <th class="py-2.5 px-3 min-w-[130px]">修订依据类型</th>
              <th class="py-2.5 px-3 min-w-[120px]">申请经办人</th>
              <th class="py-2.5 px-3 min-w-[80px] text-center">状态</th>
              <th class="py-2.5 px-3 min-w-[110px] text-center">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="(item, idx) in filteredRevisions"
              :key="item.id"
              class="hover:bg-blue-50/40 transition-colors"
            >
              <td class="py-2.5 px-3 text-center text-slate-400 font-mono">{{ idx + 1 }}</td>
              <td class="py-2.5 px-3 font-mono font-medium text-blue-600 cursor-pointer hover:underline" @click="viewDetail(item)">
                {{ item.revisionNo }}
              </td>
              <td class="py-2.5 px-3">
                <div class="font-medium text-slate-800 line-clamp-1" :title="item.waterOwner">{{ item.waterOwner }}</div>
                <div class="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <span>{{ item.district }}</span>
                  <span>·</span>
                  <span class="truncate max-w-[140px]" :title="item.facilityName">{{ item.facilityName }}</span>
                </div>
              </td>
              <td class="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                {{ item.period }}
              </td>
              <td class="py-2.5 px-3 text-right font-mono text-slate-600">
                {{ item.originalAmount.toFixed(2) }}
              </td>
              <td class="py-2.5 px-3 text-right font-mono font-bold text-slate-800">
                {{ item.revisedAmount.toFixed(2) }}
              </td>
              <td class="py-2.5 px-3 text-right font-mono font-semibold">
                <span :class="item.diffAmount < 0 ? 'text-emerald-600' : 'text-blue-600'">
                  {{ item.diffAmount > 0 ? '+' + item.diffAmount.toFixed(2) : item.diffAmount.toFixed(2) }}
                </span>
              </td>
              <td class="py-2.5 px-3 text-slate-700">
                <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] inline-block font-medium">
                  {{ item.reasonType }}
                </span>
              </td>
              <td class="py-2.5 px-3 text-slate-600 text-[11px]">
                {{ item.applicant }}
              </td>
              <td class="py-2.5 px-3 text-center">
                <span
                  :class="[
                    'px-2 py-0.5 rounded text-[11px] font-medium inline-block',
                    item.status === '待审核' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                    item.status === '已通过' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                    'bg-rose-50 text-rose-600 border border-rose-200'
                  ]"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="py-2.5 px-3 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    @click="viewDetail(item)"
                    class="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    详情
                  </button>
                  <button
                    v-if="item.status === '待审核'"
                    type="button"
                    @click="handleAudit(item)"
                    class="text-amber-600 hover:text-amber-800 font-medium cursor-pointer"
                  >
                    审核
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-4 py-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0 bg-slate-50/50">
        <div>共 <span class="font-mono font-medium text-slate-700">{{ filteredRevisions.length }}</span> 笔水量数据修订台账</div>
        <div class="flex items-center gap-1 font-mono">
          <button class="px-2 py-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40" disabled>上一页</button>
          <span class="px-2 py-1 bg-blue-600 text-white rounded font-bold">1</span>
          <button class="px-2 py-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40" disabled>下一页</button>
        </div>
      </div>
    </div>

    <!-- Detail & Audit Modal -->
    <t-dialog
      v-model:visible="detailModalVisible"
      header="水量数据修订审核详情"
      width="680px"
      :footer="null"
    >
      <div v-if="selectedRevision" class="p-3.5 space-y-3 text-xs">
        <div class="p-3 rounded-lg bg-blue-50/60 border border-blue-200 flex items-center justify-between">
          <div>
            <div class="text-sm font-bold text-slate-800">{{ selectedRevision.reasonType }}</div>
            <div class="text-slate-500 font-mono mt-1">单号: {{ selectedRevision.revisionNo }} · 申请时间: {{ selectedRevision.applyTime }}</div>
          </div>
          <span
            :class="[
              'px-2.5 py-1 rounded text-xs font-bold',
              selectedRevision.status === '待审核' ? 'bg-amber-100 text-amber-700' :
              selectedRevision.status === '已通过' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            ]"
          >
            {{ selectedRevision.status }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2.5">
          <div class="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
            <div class="text-slate-400 text-[11px]">取水权人</div>
            <div class="font-medium text-slate-800">{{ selectedRevision.waterOwner }}</div>
            <div class="text-slate-500 text-[11px]">区域: {{ selectedRevision.district }}</div>
          </div>
          <div class="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
            <div class="text-slate-400 text-[11px]">计量设施</div>
            <div class="font-medium text-slate-800">{{ selectedRevision.facilityName }}</div>
            <div class="text-slate-500 font-mono text-[11px]">编码: {{ selectedRevision.facilityCode }}</div>
          </div>
        </div>

        <!-- 水量对比卡片 -->
        <div class="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <div class="font-bold text-slate-800 text-xs mb-2">核算水量对比 (万m³)</div>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="p-2 bg-white rounded border border-slate-200">
              <div class="text-slate-400 text-[11px]">原系统采集水量</div>
              <div class="text-base font-bold font-mono text-slate-700 mt-0.5">{{ selectedRevision.originalAmount }}</div>
            </div>
            <div class="p-2 bg-white rounded border border-slate-200">
              <div class="text-slate-400 text-[11px]">修订后核定水量</div>
              <div class="text-base font-bold font-mono text-blue-600 mt-0.5">{{ selectedRevision.revisedAmount }}</div>
            </div>
            <div class="p-2 bg-white rounded border border-slate-200">
              <div class="text-slate-400 text-[11px]">增减调整净值</div>
              <div :class="['text-base font-bold font-mono mt-0.5', selectedRevision.diffAmount < 0 ? 'text-emerald-600' : 'text-blue-600']">
                {{ selectedRevision.diffAmount > 0 ? '+' + selectedRevision.diffAmount : selectedRevision.diffAmount }}
              </div>
            </div>
          </div>
        </div>

        <!-- 依据与说明 -->
        <div class="p-3 rounded-lg bg-white border border-slate-200 space-y-1.5">
          <div class="font-bold text-slate-800 text-xs">修订充分性依据与说明</div>
          <p class="text-slate-600 text-[12px] leading-relaxed">{{ selectedRevision.reasonDetail }}</p>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span class="text-slate-400 text-[11px]">支撑佐证文件:</span>
            <span class="font-medium text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              {{ selectedRevision.proofDoc }}
            </span>
          </div>
        </div>

        <div v-if="selectedRevision.auditor" class="p-2.5 rounded bg-emerald-50/60 border border-emerald-200 text-[11.5px] text-emerald-800">
          已于 {{ selectedRevision.auditTime }} 由【{{ selectedRevision.auditor }}】完成水政处合规审核入库。
        </div>

        <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <t-button theme="default" size="small" @click="detailModalVisible = false">关闭</t-button>
          <template v-if="selectedRevision.status === '待审核'">
            <t-button theme="danger" variant="outline" size="small" @click="confirmAuditReject">驳回申请</t-button>
            <t-button theme="primary" size="small" @click="confirmAuditApprove">审核通过并入库</t-button>
          </template>
        </div>
      </div>
    </t-dialog>

    <!-- Create Revision Modal -->
    <t-dialog
      v-model:visible="createModalVisible"
      header="发起水量数据修订申请"
      width="600px"
      :footer="null"
    >
      <div class="p-3.5 space-y-3 text-xs">
        <div>
          <label class="block text-slate-600 mb-1 font-medium">取水权人 / 计量设施</label>
          <t-select
            v-model="newRecord.facilityCode"
            placeholder="请选择需修订的测站与取水户"
            :options="facilitySelectOptions"
            size="small"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-slate-600 mb-1 font-medium">核算周期</label>
            <t-input v-model="newRecord.period" placeholder="如 2026年08月" size="small" />
          </div>
          <div>
            <label class="block text-slate-600 mb-1 font-medium">修订原因类型</label>
            <t-select
              v-model="newRecord.reasonType"
              :options="reasonOptions.filter(o => o.value !== '')"
              size="small"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-slate-600 mb-1 font-medium">原系统水量 (万m³)</label>
            <t-input-number v-model="newRecord.originalAmount" :step="0.1" size="small" class="w-full" />
          </div>
          <div>
            <label class="block text-slate-600 mb-1 font-medium">修订后核算水量 (万m³)</label>
            <t-input-number v-model="newRecord.revisedAmount" :step="0.1" size="small" class="w-full" />
          </div>
        </div>

        <div>
          <label class="block text-slate-600 mb-1 font-medium">修订原因说明与核准依据</label>
          <t-textarea
            v-model="newRecord.reasonDetail"
            :rows="3"
            placeholder="请详述现场校表、SCADA平差、或爆管抢修的具体事实及法定计算依据..."
          />
        </div>

        <div>
          <label class="block text-slate-600 mb-1 font-medium">上传检定报告 / 现场校准单</label>
          <div class="border border-dashed border-slate-300 rounded-lg p-3 text-center text-slate-500 hover:border-blue-400 cursor-pointer transition">
            点击或拖拽上传检定证书 (PDF/JPG/DOCX)
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <t-button theme="default" size="small" @click="createModalVisible = false">取消</t-button>
          <t-button theme="primary" size="small" @click="submitCreateRevision">提交修订审批</t-button>
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { initialRevisionRecords, type WaterDataRevision } from '../../mockRevisionData';

const revisions = ref<WaterDataRevision[]>([...initialRevisionRecords]);
const keyword = ref('');
const selectedReason = ref('');
const selectedStatus = ref('');

const detailModalVisible = ref(false);
const createModalVisible = ref(false);
const selectedRevision = ref<WaterDataRevision | null>(null);

const newRecord = ref({
  facilityCode: 'XN-630104-W001',
  period: '2026年08月01日 - 2026年08月31日',
  originalAmount: 10.0,
  revisedAmount: 8.5,
  reasonType: '仪表漂移误差调平',
  reasonDetail: '',
});

const facilitySelectOptions = [
  { label: '西宁特殊钢股份有限公司 - 2号提水泵房主计量电磁流量计', value: 'XN-630104-W001' },
  { label: '西宁市多巴自来水供水有限公司 - 多巴水厂配水管网出口电磁水表', value: 'XN-630122-W009' },
  { label: '青海青铜峡铝业大通分公司 - 大通铝业1号自备井超声波流量计', value: 'XN-630121-W003' },
  { label: '西宁南川水务投资运营有限公司 - 南川园区4号取水泵井智能流量传感器', value: 'XN-630102-W016' },
];

const reasonOptions = [
  { label: '全部类型', value: '' },
  { label: '仪表漂移误差调平', value: '仪表漂移误差调平' },
  { label: '通信中断丢包补录', value: '通信中断丢包补录' },
  { label: '管网爆管折算剔除', value: '管网爆管折算剔除' },
  { label: '现场人工抄表校核', value: '现场人工抄表校核' },
  { label: '倒流脉冲数据修正', value: '倒流脉冲数据修正' },
];

const statusOptions = [
  { label: '全部状态', value: '' },
  { label: '待审核', value: '待审核' },
  { label: '已通过', value: '已通过' },
  { label: '已驳回', value: '已驳回' },
];

const filteredRevisions = computed(() => {
  return revisions.value.filter((r) => {
    if (keyword.value.trim()) {
      const kw = keyword.value.trim().toLowerCase();
      const match =
        r.revisionNo.toLowerCase().includes(kw) ||
        r.waterOwner.toLowerCase().includes(kw) ||
        r.facilityName.toLowerCase().includes(kw);
      if (!match) return false;
    }
    if (selectedReason.value && r.reasonType !== selectedReason.value) return false;
    if (selectedStatus.value && r.status !== selectedStatus.value) return false;
    return true;
  });
});

const resetFilters = () => {
  keyword.value = '';
  selectedReason.value = '';
  selectedStatus.value = '';
};

const viewDetail = (item: WaterDataRevision) => {
  selectedRevision.value = { ...item };
  detailModalVisible.value = true;
};

const handleAudit = (item: WaterDataRevision) => {
  selectedRevision.value = { ...item };
  detailModalVisible.value = true;
};

const confirmAuditApprove = () => {
  if (!selectedRevision.value) return;
  const idx = revisions.value.findIndex((r) => r.id === selectedRevision.value?.id);
  if (idx !== -1) {
    selectedRevision.value.status = '已通过';
    selectedRevision.value.auditor = '西宁市水务局水资源管理科 / 王文斌';
    selectedRevision.value.auditTime = '2026-09-07 10:50';
    revisions.value[idx] = { ...selectedRevision.value };
  }
  MessagePlugin.success('水量修订申请已审核通过并入库');
  detailModalVisible.value = false;
};

const confirmAuditReject = () => {
  if (!selectedRevision.value) return;
  const idx = revisions.value.findIndex((r) => r.id === selectedRevision.value?.id);
  if (idx !== -1) {
    selectedRevision.value.status = '已驳回';
    selectedRevision.value.auditor = '西宁市水务局水资源管理科 / 王文斌';
    selectedRevision.value.auditTime = '2026-09-07 10:50';
    revisions.value[idx] = { ...selectedRevision.value };
  }
  MessagePlugin.warning('水量修订申请已驳回，需申请单位补充佐证');
  detailModalVisible.value = false;
};

const openCreateModal = () => {
  createModalVisible.value = true;
};

const submitCreateRevision = () => {
  const newId = `rev-${Date.now()}`;
  const diff = Number((newRecord.value.revisedAmount - newRecord.value.originalAmount).toFixed(2));
  revisions.value.unshift({
    id: newId,
    revisionNo: `REV-202609-00${revisions.value.length + 1}`,
    facilityCode: newRecord.value.facilityCode,
    facilityName: '西宁特钢2号提水泵房主计量电磁流量计',
    waterOwner: '西宁特殊钢股份有限公司',
    district: '西宁市·城北区',
    period: newRecord.value.period,
    originalAmount: newRecord.value.originalAmount,
    revisedAmount: newRecord.value.revisedAmount,
    diffAmount: diff,
    reasonType: newRecord.value.reasonType as any,
    reasonDetail: newRecord.value.reasonDetail || '检定报告标定结果显示零漂，提交核减。',
    applicant: '西宁特钢能源保卫处 / 郭强',
    applyTime: '2026-09-07 10:52',
    status: '待审核',
    proofDoc: '校表检测规程报告.pdf',
  });
  MessagePlugin.success('已成功提交水量数据修订申请');
  createModalVisible.value = false;
};

const handleExport = () => {
  MessagePlugin.success('已导出水量数据修订台账报表 Excel');
};
</script>
