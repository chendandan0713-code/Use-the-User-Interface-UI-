<template>
  <t-dialog
    :visible="visible"
    header="水量填报与核对审核（市级审核端）"
    width="1080px"
    :footer="null"
    :close-on-overlay-click="false"
    @update:visible="$emit('update:visible', $event)"
  >
    <div v-if="record" class="flex flex-col md:flex-row gap-4 max-h-[80vh] overflow-hidden text-xs text-slate-700 py-1">
      <!-- ==================== LEFT COLUMN: 待审数据与核对区 (60%) ==================== -->
      <div class="flex-1 min-w-0 overflow-y-auto pr-1 space-y-3.5">
        <!-- 1. Audit Target Summary Card -->
        <div class="p-3.5 rounded-xl bg-gradient-to-r from-blue-50/80 via-slate-50 to-indigo-50/60 border border-blue-200/80 space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="font-bold text-sm text-slate-900">{{ record.licenseName }}</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                <span>待市级复核审核</span>
              </span>
            </div>
            <span class="font-mono font-bold text-blue-700 text-sm bg-blue-100/70 px-2 py-0.5 rounded-md">
              {{ record.periodLabel }}
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600 pt-1.5 border-t border-blue-100/80">
            <div>证照编号：<span class="font-mono text-slate-800 font-semibold">{{ record.permitNumber }}</span></div>
            <div>所属区县：<strong class="text-slate-800">{{ record.district }}</strong></div>
            <div>取水权人：<span class="text-slate-800 font-medium">{{ record.waterOwner }}</span></div>
            <div>水源类型：<span class="text-slate-800">{{ record.waterSourceType }}</span></div>
          </div>
        </div>

        <!-- 2. Water Amount Verification & Breakdown -->
        <div class="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div class="font-semibold text-slate-800 text-xs flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>申报水量及指标核对 (单位：万m³)</span>
            </span>
            <span class="text-[11px] text-slate-500">
              年核准总额：<strong class="font-mono text-blue-700 font-bold">{{ record.annualQuota }} 万m³</strong>
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span class="text-[10.5px] text-slate-500 block">地表水水量</span>
              <span class="text-base font-bold font-mono text-slate-800">{{ record.surfaceWater.toFixed(2) }}</span>
              <span class="text-[10px] text-slate-400"> 万m³</span>
              <div class="text-[10px] text-slate-400 mt-0.5">
                占比 {{ record.totalWater > 0 ? ((record.surfaceWater / record.totalWater) * 100).toFixed(1) : 0 }}%
              </div>
            </div>

            <div class="p-2.5 rounded-xl bg-cyan-50/50 border border-cyan-200">
              <span class="text-[10.5px] text-cyan-800 block font-medium">地下水(机井)</span>
              <span class="text-base font-bold font-mono text-cyan-700">{{ record.groundwater.toFixed(2) }}</span>
              <span class="text-[10px] text-cyan-600"> 万m³</span>
              <div class="text-[10px] text-cyan-600 mt-0.5">
                占比 {{ record.totalWater > 0 ? ((record.groundwater / record.totalWater) * 100).toFixed(1) : 0 }}%
              </div>
            </div>

            <div class="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-200">
              <span class="text-[10.5px] text-indigo-800 block font-medium">非常规水/再生水</span>
              <span class="text-base font-bold font-mono text-indigo-700">{{ (record.unconventionalWater || 0).toFixed(2) }}</span>
              <span class="text-[10px] text-indigo-600"> 万m³</span>
              <div class="text-[10px] text-indigo-600 mt-0.5">
                占比 {{ record.totalWater > 0 ? (((record.unconventionalWater || 0) / record.totalWater) * 100).toFixed(1) : 0 }}%
              </div>
            </div>

            <div class="p-2.5 rounded-xl bg-blue-50 border border-blue-300">
              <span class="text-[10.5px] text-blue-800 font-bold block">本期申报总水量</span>
              <span class="text-lg font-bold font-mono text-blue-700">{{ record.totalWater.toFixed(2) }}</span>
              <span class="text-[10px] text-blue-600"> 万m³</span>
              <div class="text-[10px] text-blue-600 font-semibold mt-0.5">
                月度核准限额 {{ record.monthlyQuota.toFixed(2) }}
              </div>
            </div>
          </div>

          <!-- Quota Indicator Progress Bar -->
          <div class="p-2.5 rounded-lg bg-slate-50/80 border border-slate-200 text-[11px] space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-slate-600">
                当月限额占用比率：
                <strong
                  :class="[
                    record.totalWater > record.monthlyQuota ? 'text-red-600 font-bold' :
                    record.totalWater >= record.monthlyQuota * 0.9 ? 'text-amber-600 font-bold' : 'text-emerald-700'
                  ]"
                >
                  {{ ((record.totalWater / record.monthlyQuota) * 100).toFixed(1) }}%
                </strong>
              </span>
              <span
                v-if="record.quotaWarning === 'exceeded'"
                class="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200"
              >
                ● 申报超出月度配额
              </span>
              <span
                v-else-if="record.quotaWarning === 'near_limit'"
                class="px-1.5 py-0.2 rounded text-[10px] font-medium bg-amber-100 text-amber-800 border border-amber-200"
              >
                ▲ 接近月度限额
              </span>
              <span v-else class="text-[10px] text-emerald-600 font-medium">✓ 指标在合规安全区间</span>
            </div>

            <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                class="h-1.5 rounded-full transition-all"
                :class="record.totalWater > record.monthlyQuota ? 'bg-red-500' : record.totalWater >= record.monthlyQuota * 0.9 ? 'bg-amber-500' : 'bg-emerald-500'"
                :style="{ width: `${Math.min(100, (record.totalWater / record.monthlyQuota) * 100)}%` }"
              ></div>
            </div>

            <!-- Warning check banner if exceeded -->
            <div v-if="record.quotaWarning === 'exceeded'" class="p-2 rounded bg-red-50 border border-red-200 text-red-800 text-[11px] mt-1.5 flex items-start gap-1.5">
              <svg class="w-4 h-4 text-red-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <div>
                <strong>超额预警：</strong>申报水量超出月均参考限额（{{ record.monthlyQuota.toFixed(2) }} 万m³）。
                <div v-if="record.warningReason" class="mt-0.5 text-slate-700">
                  县级填报说明：{{ record.warningReason }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Meter Readings & Calibration Check -->
        <div class="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div class="font-semibold text-slate-800 text-xs flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-cyan-600"></span>
              <span>计量表计底数与以电折水校核</span>
            </span>
            <span class="text-[11px] text-slate-500">
              计量方式：<strong class="text-slate-700">{{ record.meteringMethod }}</strong>
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
            <div class="p-2 rounded bg-slate-50 border border-slate-200">
              <div class="text-slate-400 text-[10px]">上期表底读数</div>
              <div class="font-mono font-bold text-slate-700 mt-0.5">{{ record.prevMeterReading }} m³</div>
            </div>
            <div class="p-2 rounded bg-slate-50 border border-slate-200">
              <div class="text-slate-400 text-[10px]">本期抄见表底</div>
              <div class="font-mono font-bold text-blue-700 mt-0.5">{{ record.currentMeterReading }} m³</div>
            </div>
            <div class="p-2 rounded bg-slate-50 border border-slate-200">
              <div class="text-slate-400 text-[10px]">计量倍率 / 系数</div>
              <div class="font-mono font-bold text-slate-700 mt-0.5">{{ record.meterMultiplier }}x</div>
            </div>
            <div class="p-2 rounded bg-slate-50 border border-slate-200">
              <div class="text-slate-400 text-[10px]">表底推算与申报偏差</div>
              <div class="font-mono font-bold text-emerald-700 mt-0.5">
                {{ record.meterDeviation ? record.meterDeviation + '%' : '0.0% (相符)' }}
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Supporting Vouchers Files -->
        <div class="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div class="font-semibold text-slate-800 text-xs flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-purple-600"></span>
              <span>佐证凭证材料查验 ({{ record.voucherFiles?.length || 0 }}份)</span>
            </span>
            <span class="text-[11px] text-purple-700 font-medium">现场水尺/抄表照片/电量缴费单</span>
          </div>

          <div v-if="record.voucherFiles && record.voucherFiles.length > 0" class="space-y-1.5">
            <div
              v-for="(f, i) in record.voucherFiles"
              :key="i"
              class="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-blue-50/40 border border-slate-200 transition"
            >
              <div class="flex items-center gap-2 min-w-0">
                <svg class="w-4 h-4 text-purple-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <div class="truncate">
                  <div class="font-medium text-slate-800 truncate text-[11px]">{{ f.name }}</div>
                  <div class="text-[10px] text-slate-400">{{ f.size }} · 上传于 {{ f.uploadTime }}</div>
                </div>
              </div>

              <button
                type="button"
                @click="previewFile(f.name)"
                class="px-2 py-0.8 rounded text-[11px] text-blue-600 hover:text-blue-800 hover:bg-blue-100/60 font-semibold cursor-pointer shrink-0 transition"
              >
                查看查验
              </button>
            </div>
          </div>
          <div v-else class="text-slate-400 text-center py-2 text-xs">
            暂无上传附件，市级复核需提示县级提供抄表核查凭据
          </div>
        </div>

        <!-- 5. County Reporter Metadata Card -->
        <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] flex items-center justify-between text-slate-600">
          <div>
            <span>填报经办：</span>
            <strong class="text-slate-800">{{ record.reporter?.name }}</strong>
            <span class="text-slate-400 ml-1">({{ record.reporter?.phone }})</span>
            <span class="ml-2 px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-[10px]">
              {{ record.reporter?.unit }}
            </span>
          </div>
          <div class="font-mono text-slate-500 text-[10.5px]">
            报送时间：{{ record.reporter?.time }}
          </div>
        </div>
      </div>

      <!-- ==================== RIGHT COLUMN: 审核流程节点与审核操作区 (40%) ==================== -->
      <div class="w-full md:w-[440px] shrink-0 border-t md:border-t-0 md:border-l border-slate-200/90 bg-slate-50/80 p-3.5 rounded-xl flex flex-col justify-between overflow-y-auto space-y-4">
        <!-- TOP PART: 审核流程节点 (Process / Workflow Nodes Timeline) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <span class="font-bold text-xs text-slate-800">审核流转全景节点</span>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
              3级流转链路
            </span>
          </div>

          <!-- Vertical Timeline Nodes -->
          <div class="relative pl-6 space-y-4 text-[11px] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            <!-- Node 1: 县级填报提交 (已完成) -->
            <div class="relative group">
              <div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                ✓
              </div>
              <div class="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-900 text-xs">1. 县级按月填报提交</span>
                  <span class="px-1.5 py-0.2 rounded text-[9.5px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    已提交
                  </span>
                </div>
                <div class="text-slate-600">
                  填报机构：<span class="text-slate-800 font-medium">{{ record.reporter?.unit || record.district + '水务局' }}</span>
                </div>
                <div class="text-slate-500 text-[10px] flex items-center justify-between">
                  <span>经办人：{{ record.reporter?.name }}</span>
                  <span class="font-mono">{{ record.reporter?.time }}</span>
                </div>
              </div>
            </div>

            <!-- Node 2: 市级复核核对 (当前处理节点) -->
            <div class="relative group">
              <div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-amber-100 animate-pulse">
                2
              </div>
              <div class="bg-amber-50/70 p-2.5 rounded-lg border border-amber-300 shadow-2xs space-y-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-amber-950 text-xs flex items-center gap-1">
                    <span>2. 市级核算复核审核</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                  </span>
                  <span class="px-1.5 py-0.2 rounded text-[9.5px] bg-amber-200 text-amber-900 font-bold">
                    当前处理节点
                  </span>
                </div>
                <div class="text-amber-900">
                  审核机构：<span class="font-semibold">西宁市水务局水资源科</span>
                </div>
                <div class="text-slate-600 text-[10px]">
                  复核重点：核查表底抄见数、以电折水依据与月度限额
                </div>
                <div class="text-[10px] text-amber-800 font-medium pt-0.5 border-t border-amber-200/60">
                  当前状态：等待审核处理
                </div>
              </div>
            </div>

            <!-- Node 3: 年度汇总数据支撑入库 (后续节点) -->
            <div class="relative group">
              <div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                3
              </div>
              <div class="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-700 text-xs">3. 年度汇总数据支撑入库</span>
                  <span class="px-1.5 py-0.2 rounded text-[9.5px] bg-slate-100 text-slate-500 font-medium">
                    待生效
                  </span>
                </div>
                <div class="text-slate-500 text-[10px]">
                  数据用途：市级审核通过后，该水量正式写入《证照年度数据支撑大盘》，用于最严格水资源年度考核核算。
                </div>
              </div>
            </div>
          </div>

          <!-- History Audit Logs Toggle -->
          <div v-if="record.logs && record.logs.length > 0" class="pt-1">
            <button
              type="button"
              @click="showHistoryLogs = !showHistoryLogs"
              class="w-full flex items-center justify-between text-[11px] text-slate-600 hover:text-blue-700 bg-white p-2 rounded-lg border border-slate-200 cursor-pointer transition"
            >
              <span class="flex items-center gap-1 font-medium">
                <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>查看流转历史轨迹 ({{ record.logs.length }}条记录)</span>
              </span>
              <svg :class="['w-3.5 h-3.5 transition-transform duration-200', showHistoryLogs ? 'rotate-180' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <div v-if="showHistoryLogs" class="mt-2 p-2.5 rounded-lg bg-white border border-slate-200 space-y-2 text-[10.5px]">
              <div
                v-for="(l, idx) in record.logs"
                :key="l.id || idx"
                class="pb-1.5 border-b border-slate-100 last:border-b-0 space-y-0.5"
              >
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-800">{{ l.action }}</span>
                  <span class="font-mono text-slate-400">{{ l.time }}</span>
                </div>
                <div class="text-slate-500">
                  经办人：{{ l.operatorName }} ({{ l.roleName }})
                </div>
                <div v-if="l.comment" class="text-blue-700 bg-blue-50/60 p-1 rounded font-sans">
                  批注意见：{{ l.comment }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM PART: 审核操作区 (只保留：审核结果[通过/驳回] 与 审核意见) -->
        <form @submit.prevent="handleConfirmAudit" class="space-y-3 pt-3 border-t border-slate-200">
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
              <span class="w-1.5 h-3.5 rounded-full bg-blue-600"></span>
              <span>审核操作</span>
            </span>
            <span class="text-[10px] text-slate-400">仅需选择结果并填写意见</span>
          </div>

          <!-- 1. 审核结果：审核通过 / 驳回 -->
          <div>
            <label class="block text-slate-700 font-medium mb-1.5 text-xs">
              审核结果 <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-2 gap-2">
              <label
                :class="[
                  'flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition select-none',
                  auditResult === 'pass'
                    ? 'border-emerald-500 bg-emerald-50/80 text-emerald-900 font-bold ring-1 ring-emerald-400 shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                ]"
              >
                <div class="flex items-center gap-2">
                  <input
                    type="radio"
                    name="auditResult"
                    value="pass"
                    v-model="auditResult"
                    class="text-emerald-600 focus:ring-0 cursor-pointer w-4 h-4"
                  />
                  <span class="text-xs">审核通过</span>
                </div>
                <svg v-if="auditResult === 'pass'" class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </label>

              <label
                :class="[
                  'flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition select-none',
                  auditResult === 'reject'
                    ? 'border-rose-500 bg-rose-50/80 text-rose-900 font-bold ring-1 ring-rose-400 shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                ]"
              >
                <div class="flex items-center gap-2">
                  <input
                    type="radio"
                    name="auditResult"
                    value="reject"
                    v-model="auditResult"
                    class="text-rose-600 focus:ring-0 cursor-pointer w-4 h-4"
                  />
                  <span class="text-xs">驳回</span>
                </div>
                <svg v-if="auditResult === 'reject'" class="w-4 h-4 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </label>
            </div>
          </div>

          <!-- 2. 审核意见 -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-slate-700 font-medium text-xs">
                审核意见 <span class="text-red-500">*</span>
              </label>
              <div class="flex items-center gap-1.5 text-[10.5px]">
                <span class="text-slate-400">快速填入：</span>
                <span
                  v-for="(phrase, i) in currentPresetPhrases"
                  :key="i"
                  @click="auditComment = phrase"
                  class="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  {{ i === 0 ? '标准批注' : i === 1 ? '定额说明' : '简述' }}
                </span>
              </div>
            </div>
            <textarea
              v-model="auditComment"
              rows="3"
              required
              :placeholder="auditResult === 'pass' ? '请输入审核通过意见（例如：经核验，填报水量与水表及电折水台账一致，佐证材料完整，同意审核通过入库）...' : '请输入驳回原因（例如：表计底数与申报量存在核算偏差，缺少现场抄表凭证，退回县级重报）...'"
              class="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition"
            ></textarea>
          </div>

          <!-- Modal Action Buttons -->
          <div class="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              @click="$emit('update:visible', false)"
              class="px-4 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-medium cursor-pointer transition text-xs"
            >
              取消
            </button>

            <button
              type="submit"
              :class="[
                'px-4 py-1.5 rounded-lg font-bold text-white transition cursor-pointer flex items-center gap-1.5 shadow-2xs text-xs',
                auditResult === 'pass' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
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
        </form>
      </div>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { LicenseMonthlyWaterReport } from '../../../../types';

const props = defineProps<{
  visible: boolean;
  record: LicenseMonthlyWaterReport | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'audit', recordId: string, result: 'pass' | 'reject', comment: string, auditorName: string): void;
}>();

const auditResult = ref<'pass' | 'reject'>('pass');
const auditComment = ref('');
const auditorName = ref('刘洪涛');
const showHistoryLogs = ref(false);

const passPhrases = [
  '核验通过，现场抄表及电折水佐证材料齐全，水量在许可指标范围内，准予入库作为年度数据支撑。',
  '经复核，地表水与地下水配比符合水资源分区调度要求，初审合格。',
  '春灌抢墒引水符合农时用水定额，已核验超声波量水堰底数，同意通过。',
];

const rejectPhrases = [
  '表计底数与申报取水量存在较大核算偏差，请退回县级核实重报。',
  '佐证材料中缺少现场抄表照片及水质检验合格证明，退回补充。',
  '当月取水量超出月均配额且未说明详细用途，请补充说明后重新提交。',
];

const currentPresetPhrases = computed(() => {
  return auditResult.value === 'pass' ? passPhrases : rejectPhrases;
});

watch(
  () => props.visible,
  (val) => {
    if (val) {
      auditResult.value = 'pass';
      auditComment.value = passPhrases[0];
      auditorName.value = '刘洪涛';
      showHistoryLogs.value = false;
    }
  }
);

watch(auditResult, (newVal) => {
  if (newVal === 'pass') {
    auditComment.value = passPhrases[0];
  } else {
    auditComment.value = rejectPhrases[0];
  }
});

function previewFile(name: string) {
  MessagePlugin.info(`已调阅档案凭证查验系统：${name}`);
}

function handleConfirmAudit() {
  if (!props.record) return;
  if (!auditComment.value.trim()) {
    MessagePlugin.warning('请填写审核意见');
    return;
  }

  emit('audit', props.record.id, auditResult.value, auditComment.value.trim(), auditorName.value);
  emit('update:visible', false);
}
</script>
