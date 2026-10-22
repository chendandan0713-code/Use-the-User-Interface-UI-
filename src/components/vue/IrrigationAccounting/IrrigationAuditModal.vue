<template>
  <t-dialog
    v-model:visible="dialogVisible"
    :header="auditTitle"
    width="1080px"
    :footer="false"
    :close-on-overlay-click="false"
  >
    <div v-if="record" class="flex flex-col md:flex-row gap-4 max-h-[80vh] overflow-hidden text-xs select-none py-1">
      <!-- ==================== LEFT COLUMN: 待审灌区核算明细与凭证 (60%) ==================== -->
      <div class="flex-1 min-w-0 overflow-y-auto pr-1 space-y-3.5">
        <!-- Top banner indicating current stage -->
        <div
          :class="[
            'p-3 rounded-xl border flex items-center justify-between gap-3',
            auditLevel === 'city'
              ? 'bg-amber-50/90 border-amber-200 text-amber-900'
              : 'bg-indigo-50/90 border-indigo-200 text-indigo-900'
          ]"
        >
          <div class="flex items-center gap-2.5">
            <div
              :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                auditLevel === 'city' ? 'bg-amber-200 text-amber-800' : 'bg-indigo-200 text-indigo-800'
              ]"
            >
              <svg v-if="auditLevel === 'city'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div>
              <div class="font-bold text-xs">
                {{ auditLevel === 'city' ? '【市级初审阶段】西宁市水务局 水资源管理科' : '【省级终审阶段】青海省水利厅 水资源处' }}
              </div>
              <div class="text-[11px] opacity-80 mt-0.5">
                {{ auditLevel === 'city'
                  ? '审核县级水务局填报的农业用水核算数据及折水凭证，初审通过后转呈省级水利厅终审'
                  : '对市级初审通过的核算成果进行省水利厅终审，审核通过后正式计入全省农业用水入库台账'
                }}
              </div>
            </div>
          </div>

          <span
            :class="[
              'px-2.5 py-1 rounded-full text-xs font-bold shrink-0',
              auditLevel === 'city' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
            ]"
          >
            待{{ auditLevel === 'city' ? '市级初审' : '省级终审' }}
          </span>
        </div>

        <!-- Record Base Info -->
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div>
            <span class="text-slate-400 block text-[11px]">取水许可证号</span>
            <span class="font-mono font-semibold text-slate-800">{{ record.permitNumber }}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">小型灌区名称</span>
            <span class="font-bold text-slate-800">{{ record.irrigationName }}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">所属行政区县</span>
            <span class="text-slate-800 font-medium">{{ record.district }}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">核算期次</span>
            <span class="font-bold text-blue-700 font-mono">{{ record.periodLabel }}</span>
          </div>
        </div>

        <!-- Comparison & Data Audit Table: 一、农业用水量 7 项明细 -->
        <div class="bg-white rounded-xl border-2 border-slate-200 p-3 shadow-2xs">
          <div class="font-bold text-slate-900 text-xs flex items-center justify-between pb-2 border-b border-slate-200 mb-2.5">
            <div class="flex items-center gap-1.5">
              <span class="w-1.5 h-3.5 rounded-full bg-blue-600"></span>
              <span>申报核算数据复核：一、农业用水量 (万m³)</span>
            </div>
            <div class="text-[11px] text-slate-500">
              核算方法：<strong class="text-slate-800">{{ record.calculationMethod }}</strong>
            </div>
          </div>

          <!-- 7 items grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div class="p-2 rounded bg-slate-50 border border-slate-200">
              <div class="text-slate-500 text-[10.5px]">(一) 耕地灌溉</div>
              <div class="text-sm font-bold font-mono text-slate-800 mt-0.5">
                {{ record.waterData.farmland.toFixed(2) }} <span class="text-[10px] text-slate-400">万m³</span>
              </div>
            </div>

            <div class="p-2 rounded bg-slate-50 border border-slate-200">
              <div class="text-slate-500 text-[10.5px]">(二) 林地灌溉</div>
              <div class="text-sm font-bold font-mono text-slate-800 mt-0.5">
                {{ record.waterData.forest.toFixed(2) }} <span class="text-[10px] text-slate-400">万m³</span>
              </div>
            </div>

            <div class="p-2 rounded bg-slate-50 border border-slate-200">
              <div class="text-slate-500 text-[10.5px]">(三) 园地灌溉</div>
              <div class="text-sm font-bold font-mono text-slate-800 mt-0.5">
                {{ record.waterData.orchard.toFixed(2) }} <span class="text-[10px] text-slate-400">万m³</span>
              </div>
            </div>

            <div class="p-2 rounded bg-slate-50 border border-slate-200">
              <div class="text-slate-500 text-[10.5px]">(四) 草地灌溉</div>
              <div class="text-sm font-bold font-mono text-slate-800 mt-0.5">
                {{ record.waterData.grassland.toFixed(2) }} <span class="text-[10px] text-slate-400">万m³</span>
              </div>
            </div>

            <div class="p-2 rounded bg-slate-50 border border-slate-200">
              <div class="text-slate-500 text-[10.5px]">(五) 畜禽养殖</div>
              <div class="text-sm font-bold font-mono text-slate-800 mt-0.5">
                {{ record.waterData.livestock.toFixed(2) }} <span class="text-[10px] text-slate-400">万m³</span>
              </div>
            </div>

            <div class="p-2 rounded bg-slate-50 border border-slate-200">
              <div class="text-slate-500 text-[10.5px]">(六) 水产养殖</div>
              <div class="text-sm font-bold font-mono text-slate-800 mt-0.5">
                {{ record.waterData.fishery.toFixed(2) }} <span class="text-[10px] text-slate-400">万m³</span>
              </div>
            </div>

            <div class="p-2 rounded bg-cyan-50/70 border border-cyan-200">
              <div class="text-cyan-800 text-[10.5px] font-semibold">其中: 地下水量</div>
              <div class="text-sm font-bold font-mono text-cyan-700 mt-0.5">
                {{ record.waterData.groundwater.toFixed(2) }} <span class="text-[10px] text-cyan-600">万m³</span>
              </div>
            </div>

            <div class="p-2 rounded bg-blue-50 border border-blue-300">
              <div class="text-blue-800 text-[10.5px] font-bold">农业用水小计</div>
              <div class="text-sm font-bold font-mono text-blue-700 mt-0.5">
                {{ record.waterData.subtotal.toFixed(2) }} <span class="text-[10px] text-blue-600">万m³</span>
              </div>
            </div>
          </div>

          <!-- Metric Insights Bar -->
          <div class="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
            <div class="flex items-center gap-4">
              <span>年核准许可总量: <strong>{{ record.annualQuota }}万m³</strong></span>
              <span>本月占许可量: <strong class="text-blue-600">{{ monthQuotaRatio }}%</strong></span>
              <span>地下水占本月小计: <strong class="text-cyan-600">{{ groundwaterRatio }}%</strong></span>
            </div>
            <div class="text-slate-400">
              县级填报提交人：{{ record.reporter.name }} ({{ record.reporter.unit }})
            </div>
          </div>
        </div>

        <!-- Supporting Voucher Documents -->
        <div v-if="record.voucherFiles && record.voucherFiles.length > 0" class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div class="font-bold text-slate-700 text-xs flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span>申报核算佐证附件材料 ({{ record.voucherFiles.length }}份)</span>
            </span>
            <span class="text-[10.5px] text-slate-500">点击调阅现场查验</span>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(f, idx) in record.voucherFiles"
              :key="idx"
              @click="handlePreviewVoucher(f)"
              class="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 text-[11px] flex items-center gap-1 shadow-2xs hover:text-blue-600 hover:border-blue-300 cursor-pointer transition"
            >
              <svg class="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
              <span>{{ f }}</span>
            </span>
          </div>
        </div>

        <!-- Prior City Audit Record if currently in Provincial level -->
        <div v-if="auditLevel === 'province' && record.cityAuditor" class="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
          <div class="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
            <svg class="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>前序【西宁市水务局初审记录】</span>
            <span class="text-[10px] text-amber-600 font-normal">({{ record.cityAuditor.time }})</span>
          </div>
          <div class="text-amber-800 text-[11.5px] leading-relaxed">
            {{ record.cityAuditor.comment }}
          </div>
          <div class="text-[10.5px] text-amber-700/80 mt-1">
            初审人：{{ record.cityAuditor.name }} · {{ record.cityAuditor.unit }}
          </div>
        </div>
      </div>

      <!-- ==================== RIGHT COLUMN: 审核流程节点与操作区 (40%) ==================== -->
      <div class="w-full md:w-[440px] shrink-0 border-t md:border-t-0 md:border-l border-slate-200/90 bg-slate-50/80 p-3.5 rounded-xl flex flex-col justify-between overflow-y-auto space-y-4">
        <!-- TOP: 审核流程节点展示 (Workflow Timeline Nodes) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <span class="font-bold text-xs text-slate-800">审核流转全景节点</span>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
              {{ auditLevel === 'city' ? '市级初审阶段' : '省级终审阶段' }}
            </span>
          </div>

          <!-- Vertical Timeline Nodes -->
          <div class="relative pl-6 space-y-3.5 text-[11px] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            <!-- Node 1: 县级填报提交 -->
            <div class="relative group">
              <div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                ✓
              </div>
              <div class="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs space-y-0.5">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-900 text-xs">1. 县级填报初验</span>
                  <span class="px-1.5 py-0.2 rounded text-[9.5px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">已提交</span>
                </div>
                <div class="text-slate-600 text-[10.5px]">
                  单位：{{ record.reporter?.unit }}
                </div>
                <div class="text-slate-400 text-[10px] flex items-center justify-between">
                  <span>填报人：{{ record.reporter?.name }}</span>
                  <span class="font-mono">{{ record.reporter?.time }}</span>
                </div>
              </div>
            </div>

            <!-- Node 2: 市级初审核定 -->
            <div class="relative group">
              <div
                :class="[
                  'absolute -left-6 top-0.5 w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-bold shadow-xs',
                  auditLevel === 'city' ? 'bg-amber-500 ring-4 ring-amber-100 animate-pulse' : 'bg-emerald-600'
                ]"
              >
                {{ auditLevel === 'city' ? '2' : '✓' }}
              </div>
              <div
                :class="[
                  'p-2.5 rounded-lg border shadow-2xs space-y-0.5',
                  auditLevel === 'city' ? 'bg-amber-50/80 border-amber-300' : 'bg-white border-slate-200'
                ]"
              >
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs" :class="auditLevel === 'city' ? 'text-amber-950' : 'text-slate-900'">
                    2. 市级水务局初审
                  </span>
                  <span
                    :class="[
                      'px-1.5 py-0.2 rounded text-[9.5px] font-bold',
                      auditLevel === 'city' ? 'bg-amber-200 text-amber-900' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    ]"
                  >
                    {{ auditLevel === 'city' ? '当前节点·待初审' : '初审已通过' }}
                  </span>
                </div>
                <div class="text-[10.5px]" :class="auditLevel === 'city' ? 'text-amber-900' : 'text-slate-600'">
                  审核机构：西宁市水务局水资源管理科
                </div>
                <div v-if="record.cityAuditor" class="text-slate-500 text-[10px] flex items-center justify-between">
                  <span>经办：{{ record.cityAuditor.name }}</span>
                  <span class="font-mono">{{ record.cityAuditor.time }}</span>
                </div>
              </div>
            </div>

            <!-- Node 3: 省级终审归档入库 -->
            <div class="relative group">
              <div
                :class="[
                  'absolute -left-6 top-0.5 w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-bold shadow-xs',
                  auditLevel === 'province' ? 'bg-indigo-600 ring-4 ring-indigo-100 animate-pulse' : 'bg-slate-300 text-slate-700'
                ]"
              >
                3
              </div>
              <div
                :class="[
                  'p-2.5 rounded-lg border shadow-2xs space-y-0.5',
                  auditLevel === 'province' ? 'bg-indigo-50/80 border-indigo-300' : 'bg-white border-slate-200'
                ]"
              >
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs" :class="auditLevel === 'province' ? 'text-indigo-950' : 'text-slate-700'">
                    3. 省水利厅终审入库
                  </span>
                  <span
                    :class="[
                      'px-1.5 py-0.2 rounded text-[9.5px] font-bold',
                      auditLevel === 'province' ? 'bg-indigo-200 text-indigo-900' : 'bg-slate-100 text-slate-500'
                    ]"
                  >
                    {{ auditLevel === 'province' ? '当前节点·终审中' : '待市审后呈报' }}
                  </span>
                </div>
                <div class="text-[10.5px]" :class="auditLevel === 'province' ? 'text-indigo-900' : 'text-slate-500'">
                  终审机构：青海省水利厅水资源处
                </div>
                <div class="text-slate-400 text-[10px]">
                  作用：终审通过后正式计入青海省农业取用水统计入库台账
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM: 审核操作区 (Audit Operations Action Form) -->
        <div class="space-y-3 pt-2 border-t border-slate-200">
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>{{ auditLevel === 'city' ? '市级初审审批操作' : '省级终审审批操作' }} <span class="text-rose-500">*</span></span>
            </span>
            <span class="text-[10px] text-slate-400">操作后即时推进</span>
          </div>

          <!-- Result radio buttons (Tiles) -->
          <div class="grid grid-cols-2 gap-2">
            <label
              :class="[
                'flex flex-col p-2.5 rounded-xl border cursor-pointer transition select-none',
                auditResult === 'pass'
                  ? 'border-emerald-500 bg-emerald-50/80 text-emerald-900 font-bold shadow-2xs ring-1 ring-emerald-400'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100/70'
              ]"
            >
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5">
                  <input
                    type="radio"
                    value="pass"
                    v-model="auditResult"
                    class="text-emerald-600 focus:ring-0 cursor-pointer"
                  />
                  <span>{{ auditLevel === 'city' ? '初审通过' : '终审通过' }}</span>
                </span>
                <span v-if="auditResult === 'pass'" class="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <span class="text-[10px] font-normal text-emerald-700 mt-1">
                {{ auditLevel === 'city' ? '转呈省水利厅终审' : '准予正式入库归档' }}
              </span>
            </label>

            <label
              :class="[
                'flex flex-col p-2.5 rounded-xl border cursor-pointer transition select-none',
                auditResult === 'reject'
                  ? 'border-rose-500 bg-rose-50/80 text-rose-900 font-bold shadow-2xs ring-1 ring-rose-400'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100/70'
              ]"
            >
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5">
                  <input
                    type="radio"
                    value="reject"
                    v-model="auditResult"
                    class="text-rose-600 focus:ring-0 cursor-pointer"
                  />
                  <span>驳回退回</span>
                </span>
                <span v-if="auditResult === 'reject'" class="w-2 h-2 rounded-full bg-rose-500"></span>
              </div>
              <span class="text-[10px] font-normal text-rose-700 mt-1">
                退回县级修改重报
              </span>
            </label>
          </div>

          <!-- Quick comment templates -->
          <div>
            <div class="text-slate-500 text-[10.5px] mb-1 flex items-center justify-between">
              <span>快捷审核批注模板：</span>
              <span class="text-[10px] text-blue-600 cursor-pointer" @click="applyTemplate(quickTemplates[0])">
                填入首项
              </span>
            </div>
            <div class="flex flex-wrap gap-1">
              <button
                v-for="(tpl, idx) in quickTemplates"
                :key="idx"
                type="button"
                @click="applyTemplate(tpl)"
                class="px-2 py-0.8 rounded bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-[10px] cursor-pointer transition text-left truncate max-w-full"
                :title="tpl"
              >
                {{ tpl }}
              </button>
            </div>
          </div>

          <!-- Detailed comment textarea -->
          <div>
            <label class="block text-slate-700 font-medium mb-1 flex items-center justify-between">
              <span>审核批注意见 <span class="text-rose-500">*</span></span>
              <span class="text-[10px] font-normal text-slate-400">{{ auditComment.length }} 字</span>
            </label>
            <textarea
              v-model="auditComment"
              rows="2"
              class="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
              placeholder="请输入审核审批意见..."
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              @click="dialogVisible = false"
              class="px-4 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition cursor-pointer text-xs"
            >
              取消
            </button>

            <button
              type="button"
              @click="handleAuditSubmit"
              :class="[
                'px-4 py-1.5 rounded-lg font-bold transition cursor-pointer text-xs flex items-center gap-1.5 shadow-2xs text-white',
                auditResult === 'pass'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-rose-600 hover:bg-rose-700'
              ]"
            >
              <svg v-if="auditResult === 'pass'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span>{{ auditResult === 'pass' ? '确认审核通过' : '确认驳回' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { IrrigationAccountingRecord } from '../../../types';

const props = defineProps<{
  visible: boolean;
  record: IrrigationAccountingRecord | null;
  auditLevel: 'city' | 'province';
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'audit-complete', recordId: string, result: 'pass' | 'reject', comment: string, auditor: { name: string; unit: string }): void;
}>();

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val),
});

const auditTitle = computed(() => {
  if (props.auditLevel === 'city') {
    return '西宁市水务局 · 小型灌区核算市级初审';
  }
  return '青海省水利厅 · 小型灌区核算省级终审';
});

const auditResult = ref<'pass' | 'reject'>('pass');
const auditComment = ref('');
const auditorName = ref('');
const auditorUnit = ref('');

const monthQuotaRatio = computed(() => {
  if (!props.record || props.record.annualQuota <= 0) return '0.0';
  return ((props.record.waterData.subtotal / props.record.annualQuota) * 100).toFixed(1);
});

const groundwaterRatio = computed(() => {
  if (!props.record || props.record.waterData.subtotal <= 0) return '0.0';
  return ((props.record.waterData.groundwater / props.record.waterData.subtotal) * 100).toFixed(1);
});

const quickTemplates = computed(() => {
  if (props.auditLevel === 'city') {
    return [
      '经核对以电折水凭证与现场水量抄表台账，数据真实准确，符合农业灌溉用水实际，初审通过。',
      '申报各项农业分类用水比例合理，灌区无超指标取水，市级初审通过，转呈省水利厅终审。',
      '【初审驳回】：耕地灌溉用水量折算系数有误，且未附电力结算单，请县级核实后重新填报。',
    ];
  } else {
    return [
      '省级水利厅水资源处复核无误，符合青海省农业灌溉定额标准，准予入库归档。',
      '同意市级初审意见，灌区水资源核算台账要素完整，终审通过。',
      '【省级终审驳回】：地下水取用比例超过区域压采红线，需提供专项节水论证报告后重报。',
    ];
  }
});

const applyTemplate = (tpl: string) => {
  auditComment.value = tpl;
  if (tpl.includes('驳回')) {
    auditResult.value = 'reject';
  } else {
    auditResult.value = 'pass';
  }
};

const handlePreviewVoucher = (fileName: string) => {
  MessagePlugin.info(`已调阅凭证查验系统：${fileName}`);
};

watch(
  () => props.visible,
  (val) => {
    if (val) {
      auditResult.value = 'pass';
      if (props.auditLevel === 'city') {
        auditorName.value = '刘洪涛';
        auditorUnit.value = '西宁市水务局水资源管理科';
        auditComment.value = '经核查，该小型灌区月度农业用水申报材料齐全，以电折水数据真实，初审通过。';
      } else {
        auditorName.value = '马延庆';
        auditorUnit.value = '青海省水利厅水资源处';
        auditComment.value = '经青海省水利厅水资源处终审核定，符合农业用水统筹台账要求，准予入库归档。';
      }
    }
  }
);

const handleAuditSubmit = () => {
  if (!auditComment.value.trim()) {
    MessagePlugin.error('请输入审核审批意见');
    return;
  }
  if (!props.record) return;

  emit(
    'audit-complete',
    props.record.id,
    auditResult.value,
    auditComment.value,
    {
      name: auditorName.value,
      unit: auditorUnit.value,
    }
  );
  dialogVisible.value = false;
};
</script>
