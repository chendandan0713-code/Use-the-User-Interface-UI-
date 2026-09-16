<template>
  <t-dialog
    :visible="visible"
    header="非在线计量设施 - 人工数据填报"
    width="920px"
    :footer="false"
    @close="handleClose"
    top="5vh"
    destroy-on-close
  >
    <div v-if="facility" class="space-y-4 text-xs select-none max-h-[80vh] overflow-y-auto pr-1">
      <!-- 1. 设施基础属性卡片 -->
      <div class="bg-blue-50/60 border border-blue-200/80 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div class="space-y-1 min-w-[280px]">
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold text-slate-800">{{ facility.name }}</span>
            <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-700 border border-blue-200">
              {{ facility.code }}
            </span>
            <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
              非在线设施
            </span>
          </div>
          <div class="text-[11px] text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>取水权人：<strong class="text-slate-700">{{ facility.waterOwner }}</strong></span>
            <span>所属区县：{{ facility.district }}</span>
            <span>取水用途：{{ facility.waterUsage }}</span>
            <span>计量方式：{{ facility.meteringMethod }} ({{ facility.specModel }})</span>
          </div>
        </div>

        <div class="flex items-center gap-3 bg-white/90 px-3.5 py-2 rounded-lg border border-blue-200/60 shadow-2xs">
          <div>
            <div class="text-[10px] text-slate-500">当前填报周期配置</div>
            <div class="text-xs font-bold text-blue-700 mt-0.5 flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{{ cycleLabel }}</span>
            </div>
          </div>
          <div class="border-l border-slate-200 pl-3">
            <div class="text-[10px] text-slate-500">最新在册表底数</div>
            <div class="text-xs font-bold font-mono text-slate-800 mt-0.5">
              {{ facility.currentBaseReading.toLocaleString() }} <span class="text-[10px] font-normal text-slate-500">m³</span>
            </div>
          </div>
          <div class="border-l border-slate-200 pl-3">
            <div class="text-[10px] text-slate-500">最近填报期次</div>
            <div class="text-xs font-semibold text-emerald-700 mt-0.5">
              {{ facility.lastReportPeriod || '暂无填报' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 填报期次选择矩阵与规则说明 -->
      <div class="bg-white border border-slate-200/90 rounded-xl p-3.5 space-y-3 shadow-2xs">
        <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-blue-600"></div>
            <span class="text-xs font-bold text-slate-800">
              选择填报期次 (当前基准年份: 2026年9月)
            </span>
            <span class="text-[11px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              业务规则：已填报并通过或待审期次不可重复填报；支持批量提交当前及历史未报期次
            </span>
          </div>

          <!-- 快速辅助操作 -->
          <div class="flex items-center gap-2">
            <button
              v-if="unreportedPeriods.length > 1"
              type="button"
              @click="handleSelectAllUnreported"
              class="px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded text-[11px] font-medium transition cursor-pointer border border-blue-200"
            >
              一键全选未报期次 ({{ unreportedPeriods.length }}期)
            </button>
            <button
              v-if="selectedPeriodKeys.length > 0"
              type="button"
              @click="selectedPeriodKeys = []"
              class="px-2 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded text-[11px] transition cursor-pointer"
            >
              清空已选 ({{ selectedPeriodKeys.length }})
            </button>
          </div>
        </div>

        <!-- 按月 (Month) 期次网格: 1月至9月 (当前月为9月，10/11/12为未来月份不可选) -->
        <div v-if="facility.reportCycle === 'month'" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <div
            v-for="item in monthPeriods"
            :key="item.key"
            @click="handlePeriodClick(item)"
            :class="[
              'p-2.5 rounded-lg border text-center transition flex flex-col justify-between h-[72px]',
              item.disabled
                ? 'bg-slate-50/80 border-slate-200 cursor-not-allowed opacity-75'
                : selectedPeriodKeys.includes(item.key)
                ? 'bg-blue-50/90 border-blue-500 shadow-xs ring-1 ring-blue-400 cursor-pointer'
                : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer'
            ]"
          >
            <div class="flex items-center justify-between">
              <span class="font-bold text-xs" :class="selectedPeriodKeys.includes(item.key) ? 'text-blue-700' : 'text-slate-700'">
                {{ item.label }}
              </span>
              <!-- Checkbox indicator for active items -->
              <div
                v-if="!item.disabled"
                class="w-3.5 h-3.5 rounded flex items-center justify-center border transition"
                :class="selectedPeriodKeys.includes(item.key) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'"
              >
                <svg v-if="selectedPeriodKeys.includes(item.key)" class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>

            <!-- Status tag -->
            <div class="mt-1">
              <span
                v-if="item.status === 'reported_approved'"
                class="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                title="该月份已完成归集审核，禁止重复填报"
              >
                已填报(已通过)
              </span>
              <span
                v-else-if="item.status === 'reported_pending'"
                class="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200"
                title="该月份已提交，正在审核中，暂不能重复填报"
              >
                审核中(已提交)
              </span>
              <span
                v-else-if="item.status === 'rejected'"
                class="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-rose-50 text-rose-700 border border-rose-200"
                title="前次填报已驳回，可重新填报"
              >
                已驳回(可重报)
              </span>
              <span
                v-else-if="item.status === 'future'"
                class="inline-block px-1.5 py-0.5 rounded text-[10px] text-slate-400 bg-slate-100"
              >
                未到填报期
              </span>
              <span
                v-else
                class="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium"
                :class="selectedPeriodKeys.includes(item.key) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'"
              >
                待填报
              </span>
            </div>
          </div>
        </div>

        <!-- 按季度 (Quarter) 期次网格: Q1至Q3 (Q3为当前季度，Q4未到期) -->
        <div v-else-if="facility.reportCycle === 'quarter'" class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div
            v-for="item in quarterPeriods"
            :key="item.key"
            @click="handlePeriodClick(item)"
            :class="[
              'p-3 rounded-lg border text-center transition flex flex-col justify-between h-[80px]',
              item.disabled
                ? 'bg-slate-50/80 border-slate-200 cursor-not-allowed opacity-75'
                : selectedPeriodKeys.includes(item.key)
                ? 'bg-blue-50/90 border-blue-500 shadow-xs ring-1 ring-blue-400 cursor-pointer'
                : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer'
            ]"
          >
            <div class="flex items-center justify-between">
              <span class="font-bold text-xs" :class="selectedPeriodKeys.includes(item.key) ? 'text-blue-700' : 'text-slate-700'">
                {{ item.label }}
              </span>
              <div
                v-if="!item.disabled"
                class="w-4 h-4 rounded flex items-center justify-center border transition"
                :class="selectedPeriodKeys.includes(item.key) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'"
              >
                <svg v-if="selectedPeriodKeys.includes(item.key)" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <div>
              <span
                v-if="item.status === 'reported_approved'"
                class="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                已填报(已审核通过)
              </span>
              <span
                v-else-if="item.status === 'reported_pending'"
                class="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200"
              >
                审核中(已提交)
              </span>
              <span
                v-else-if="item.status === 'rejected'"
                class="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-rose-50 text-rose-700 border border-rose-200"
              >
                已驳回(可重报)
              </span>
              <span
                v-else-if="item.status === 'future'"
                class="inline-block px-2 py-0.5 rounded text-[10px] text-slate-400 bg-slate-100"
              >
                未到填报期
              </span>
              <span
                v-else
                class="inline-block px-2 py-0.5 rounded text-[10px] font-medium"
                :class="selectedPeriodKeys.includes(item.key) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'"
              >
                待填报
              </span>
            </div>
          </div>
        </div>

        <!-- 按年 (Year) 期次网格 -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <div
            v-for="item in yearPeriods"
            :key="item.key"
            @click="handlePeriodClick(item)"
            :class="[
              'p-3 rounded-lg border text-center transition flex flex-col justify-between h-[80px]',
              item.disabled
                ? 'bg-slate-50/80 border-slate-200 cursor-not-allowed opacity-75'
                : selectedPeriodKeys.includes(item.key)
                ? 'bg-blue-50/90 border-blue-500 shadow-xs ring-1 ring-blue-400 cursor-pointer'
                : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer'
            ]"
          >
            <div class="flex items-center justify-between">
              <span class="font-bold text-xs" :class="selectedPeriodKeys.includes(item.key) ? 'text-blue-700' : 'text-slate-700'">
                {{ item.label }}
              </span>
              <div
                v-if="!item.disabled"
                class="w-4 h-4 rounded flex items-center justify-center border transition"
                :class="selectedPeriodKeys.includes(item.key) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'"
              >
                <svg v-if="selectedPeriodKeys.includes(item.key)" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <div>
              <span
                v-if="item.status === 'reported_approved'"
                class="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                已填报(已通过)
              </span>
              <span
                v-else-if="item.status === 'reported_pending'"
                class="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200"
              >
                审核中
              </span>
              <span
                v-else
                class="inline-block px-2 py-0.5 rounded text-[10px] font-medium"
                :class="selectedPeriodKeys.includes(item.key) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'"
              >
                待填报
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 数据填报明细录入区域 -->
      <div v-if="sortedSelectedPeriods.length > 0" class="bg-white border border-slate-200/90 rounded-xl p-3.5 space-y-3 shadow-2xs">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-800 text-xs">
              填报数据表 (已选择 {{ sortedSelectedPeriods.length }} 个期次，支持批量填报)
            </span>
            <span v-if="sortedSelectedPeriods.length > 1" class="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded text-[10px] font-semibold">
              当前为批量补报模式
            </span>
          </div>

          <div class="text-[11px] text-slate-500 flex items-center gap-3">
            <span>总填报水量：<strong class="text-blue-600 font-mono text-xs">{{ totalCalculatedWater.toLocaleString() }}</strong> m³</span>
            <button
              type="button"
              @click="handleAutoChainReadings"
              class="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] transition cursor-pointer"
              title="根据基础底数和各期水量自动递推计算各期底数"
            >
              自动链式递推底数
            </button>
          </div>
        </div>

        <!-- 录入表格 -->
        <div class="overflow-x-auto border border-slate-200 rounded-lg">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-slate-50 text-slate-600 border-b border-slate-200 font-medium text-[11px]">
                <th class="py-2 px-3 w-10 text-center">序号</th>
                <th class="py-2 px-3 w-28">填报期次</th>
                <th class="py-2 px-3 w-28">上期底数 (m³)</th>
                <th class="py-2 px-3 w-32">本期底数 (m³) <span class="text-rose-500">*</span></th>
                <th class="py-2 px-3 w-28">本期水量 (m³)</th>
                <th class="py-2 px-3 w-32">抄表日期 <span class="text-rose-500">*</span></th>
                <th class="py-2 px-3">备注说明</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200/80">
              <tr
                v-for="(row, idx) in formDataRows"
                :key="row.periodKey"
                class="hover:bg-blue-50/20 transition"
              >
                <td class="py-2.5 px-3 text-center text-slate-400 font-mono">{{ idx + 1 }}</td>
                <td class="py-2.5 px-3">
                  <span class="font-bold text-slate-800">{{ row.periodLabel }}</span>
                </td>
                <td class="py-2.5 px-3">
                  <input
                    type="number"
                    v-model.number="row.startReading"
                    @input="recalculateRow(row)"
                    class="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-mono text-slate-700 focus:outline-blue-500"
                  />
                </td>
                <td class="py-2.5 px-3">
                  <input
                    type="number"
                    v-model.number="row.endReading"
                    @input="recalculateRow(row)"
                    placeholder="请输入本期底数"
                    class="w-full px-2 py-1 bg-white border border-blue-300 rounded text-xs font-mono font-bold text-blue-700 focus:outline-blue-500"
                  />
                </td>
                <td class="py-2.5 px-3">
                  <span
                    class="font-mono font-bold text-xs"
                    :class="row.waterVolume < 0 ? 'text-rose-600' : 'text-emerald-700'"
                  >
                    {{ (row.waterVolume || 0).toLocaleString() }}
                  </span>
                  <span v-if="row.waterVolume < 0" class="block text-[10px] text-rose-500">底数不能倒退</span>
                </td>
                <td class="py-2.5 px-3">
                  <input
                    type="date"
                    v-model="row.readingDate"
                    class="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 focus:outline-blue-500"
                  />
                </td>
                <td class="py-2.5 px-3">
                  <input
                    type="text"
                    v-model="row.notes"
                    placeholder="如例行抄见/增产用水等"
                    class="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 focus:outline-blue-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else class="bg-amber-50/80 border border-amber-200 rounded-xl p-6 text-center text-xs text-amber-800">
        <svg class="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <div class="font-bold text-sm">请先在上方点击选择需要填报的期次</div>
        <div class="text-[11px] text-amber-700 mt-1">支持选择单期，或同时勾选多个历史未报月份/季度进行批量填报提交。</div>
      </div>

      <!-- 4. 责任人信息与抄表附件上传 -->
      <div v-if="sortedSelectedPeriods.length > 0" class="bg-white border border-slate-200/90 rounded-xl p-3.5 space-y-3 shadow-2xs">
        <div class="font-bold text-slate-800 text-xs pb-1.5 border-b border-slate-100 flex items-center justify-between">
          <span>填报人信息与现场抄表凭据上传</span>
          <span class="text-[11px] font-normal text-slate-400">提交后数据将直接转入水务局审核流程</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label class="block text-[11px] text-slate-500 mb-1">抄表/填报人姓名 <span class="text-rose-500">*</span></label>
            <input
              type="text"
              v-model="commonReporterName"
              placeholder="如：张建军"
              class="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-blue-500"
            />
          </div>

          <div>
            <label class="block text-[11px] text-slate-500 mb-1">联系电话 <span class="text-rose-500">*</span></label>
            <input
              type="tel"
              v-model="commonReporterPhone"
              placeholder="如：13897210088"
              class="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-blue-500"
            />
          </div>

          <div class="sm:col-span-2">
            <label class="block text-[11px] text-slate-500 mb-1">抄表凭证附件 (支持上传现场水表表盘照片、签到单)</label>
            <div class="flex items-center gap-2">
              <button
                type="button"
                @click="triggerFileUpload"
                class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer border border-slate-200"
              >
                <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span>点击上传水表照片</span>
              </button>
              <input
                ref="fileInputRef"
                type="file"
                multiple
                accept="image/*,.pdf"
                class="hidden"
                @change="handleFilesSelected"
              />

              <!-- Pre-attached vouchers -->
              <div class="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                <span
                  v-for="(file, fIdx) in attachedFiles"
                  :key="fIdx"
                  class="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[11px] flex items-center gap-1 border border-blue-200"
                >
                  <svg class="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span class="truncate max-w-[140px]">{{ file }}</span>
                  <button
                    type="button"
                    @click="removeAttachedFile(fIdx)"
                    class="text-blue-400 hover:text-rose-600 ml-0.5 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. 底部操作栏 -->
      <div class="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
        <div class="text-[11px] text-slate-500 flex items-center gap-1">
          <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>数据提交后状态将转为【待审核】，需西宁市或对应区县水务局水资源管理科复核通过后正式归集入库。</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            @click="handleSubmit"
            :disabled="sortedSelectedPeriods.length === 0 || isSubmitting"
            :class="[
              'px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer',
              sortedSelectedPeriods.length === 0 || isSubmitting
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            ]"
          >
            <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
              <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
            </svg>
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>
              {{ sortedSelectedPeriods.length > 1 ? `批量提交 ${sortedSelectedPeriods.length} 个期次数据 (待审核)` : '确认提交填报 (待审核)' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { NonOnlineFacility, ManualReportRecord } from '../../../types';

interface PeriodItem {
  key: string;
  label: string;
  status: 'unreported' | 'reported_approved' | 'reported_pending' | 'rejected' | 'future';
  disabled: boolean;
  order: number;
}

interface FormRow {
  periodKey: string;
  periodLabel: string;
  startReading: number;
  endReading: number;
  waterVolume: number;
  readingDate: string;
  notes: string;
}

const props = defineProps<{
  visible: boolean;
  facility: NonOnlineFacility | null;
  existingRecords: ManualReportRecord[];
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'submit', records: ManualReportRecord[]): void;
}>();

const selectedPeriodKeys = ref<string[]>([]);
const formDataRows = ref<FormRow[]>([]);
const commonReporterName = ref('');
const commonReporterPhone = ref('');
const attachedFiles = ref<string[]>([]);
const fileInputRef = ref<HTMLInputElement | null>(null);
const isSubmitting = ref(false);

const cycleLabel = computed(() => {
  if (!props.facility) return '';
  switch (props.facility.reportCycle) {
    case 'month': return '按月填报 (每月一期)';
    case 'quarter': return '按季度填报 (每季度一期)';
    case 'year': return '按年填报 (每年一期)';
    default: return '按月填报';
  }
});

// 计算按月可选期次 (1月 - 9月为当前及历史，10-12为未来)
const monthPeriods = computed<PeriodItem[]>(() => {
  if (!props.facility) return [];
  const list: PeriodItem[] = [];
  const months = [
    { num: 1, label: '2026年01月', key: '2026-01' },
    { num: 2, label: '2026年02月', key: '2026-02' },
    { num: 3, label: '2026年03月', key: '2026-03' },
    { num: 4, label: '2026年04月', key: '2026-04' },
    { num: 5, label: '2026年05月', key: '2026-05' },
    { num: 6, label: '2026年06月', key: '2026-06' },
    { num: 7, label: '2026年07月', key: '2026-07' },
    { num: 8, label: '2026年08月', key: '2026-08' },
    { num: 9, label: '2026年09月', key: '2026-09' }, // 当前月
    { num: 10, label: '2026年10月', key: '2026-10' },
    { num: 11, label: '2026年11月', key: '2026-11' },
    { num: 12, label: '2026年12月', key: '2026-12' },
  ];

  months.forEach((m) => {
    // 匹配该设施此期次的记录
    const rec = props.existingRecords.find(
      (r) => r.facilityId === props.facility?.id && r.periodKey === m.key
    );

    let status: PeriodItem['status'] = 'unreported';
    let disabled = false;

    if (m.num > 9) {
      status = 'future';
      disabled = true; // 未来月份不能提前填报
    } else if (rec) {
      if (rec.auditStatus === '已通过') {
        status = 'reported_approved';
        disabled = true; // 已经填报审核通过的，不能再填报
      } else if (rec.auditStatus === '待审核') {
        status = 'reported_pending';
        disabled = true; // 审核中的也不能重复填报
      } else if (rec.auditStatus === '已驳回') {
        status = 'rejected';
        disabled = false; // 驳回的可以重新填报
      }
    }

    list.push({
      key: m.key,
      label: m.label,
      status,
      disabled,
      order: m.num,
    });
  });

  return list;
});

// 计算按季度可选期次 (Q1, Q2, Q3为当前季度，Q4为未来季度)
const quarterPeriods = computed<PeriodItem[]>(() => {
  if (!props.facility) return [];
  const quarters = [
    { num: 1, label: '2026年第一季度', key: '2026-Q1' },
    { num: 2, label: '2026年第二季度', key: '2026-Q2' },
    { num: 3, label: '2026年第三季度', key: '2026-Q3' },
    { num: 4, label: '2026年第四季度', key: '2026-Q4' },
  ];

  return quarters.map((q) => {
    const rec = props.existingRecords.find(
      (r) => r.facilityId === props.facility?.id && r.periodKey === q.key
    );
    let status: PeriodItem['status'] = 'unreported';
    let disabled = false;

    if (q.num > 3) {
      status = 'future';
      disabled = true;
    } else if (rec) {
      if (rec.auditStatus === '已通过') {
        status = 'reported_approved';
        disabled = true;
      } else if (rec.auditStatus === '待审核') {
        status = 'reported_pending';
        disabled = true;
      } else if (rec.auditStatus === '已驳回') {
        status = 'rejected';
        disabled = false;
      }
    }

    return {
      key: q.key,
      label: q.label,
      status,
      disabled,
      order: q.num,
    };
  });
});

// 计算按年可选期次
const yearPeriods = computed<PeriodItem[]>(() => {
  if (!props.facility) return [];
  const years = [
    { num: 2025, label: '2025年度', key: '2025-Y' },
    { num: 2026, label: '2026年度', key: '2026-Y' },
  ];

  return years.map((y) => {
    const rec = props.existingRecords.find(
      (r) => r.facilityId === props.facility?.id && r.periodKey === y.key
    );
    let status: PeriodItem['status'] = 'unreported';
    let disabled = false;

    if (rec) {
      if (rec.auditStatus === '已通过') {
        status = 'reported_approved';
        disabled = true;
      } else if (rec.auditStatus === '待审核') {
        status = 'reported_pending';
        disabled = true;
      } else if (rec.auditStatus === '已驳回') {
        status = 'rejected';
        disabled = false;
      }
    }

    return {
      key: y.key,
      label: y.label,
      status,
      disabled,
      order: y.num,
    };
  });
});

// 当前所有未报期次列表
const unreportedPeriods = computed(() => {
  if (!props.facility) return [];
  let all: PeriodItem[] = [];
  if (props.facility.reportCycle === 'month') all = monthPeriods.value;
  else if (props.facility.reportCycle === 'quarter') all = quarterPeriods.value;
  else all = yearPeriods.value;

  return all.filter((p) => !p.disabled);
});

// 排序后的已选期次
const sortedSelectedPeriods = computed(() => {
  if (!props.facility) return [];
  let all: PeriodItem[] = [];
  if (props.facility.reportCycle === 'month') all = monthPeriods.value;
  else if (props.facility.reportCycle === 'quarter') all = quarterPeriods.value;
  else all = yearPeriods.value;

  return all.filter((p) => selectedPeriodKeys.value.includes(p.key)).sort((a, b) => a.order - b.order);
});

// 总水量计算
const totalCalculatedWater = computed(() => {
  return formDataRows.value.reduce((sum, r) => sum + (r.waterVolume || 0), 0);
});

// 点击选择期次
const handlePeriodClick = (item: PeriodItem) => {
  if (item.disabled) {
    if (item.status === 'reported_approved') {
      MessagePlugin.warning(`【${item.label}】已填报并通过审核，按规则不得重复填报！`);
    } else if (item.status === 'reported_pending') {
      MessagePlugin.warning(`【${item.label}】已提交并正在水务局审核中，不能重复填报！`);
    } else if (item.status === 'future') {
      MessagePlugin.info(`【${item.label}】尚未到达填报期，不能提前填报！`);
    }
    return;
  }

  const idx = selectedPeriodKeys.value.indexOf(item.key);
  if (idx > -1) {
    selectedPeriodKeys.value.splice(idx, 1);
  } else {
    selectedPeriodKeys.value.push(item.key);
  }
};

// 一键全选未报期次（批量补报）
const handleSelectAllUnreported = () => {
  selectedPeriodKeys.value = unreportedPeriods.value.map((p) => p.key);
  MessagePlugin.success(`已全选当前月/季度之前的 ${selectedPeriodKeys.value.length} 个未报期次，已自动生成批量填报表格！`);
};

// 重新计算某行水量
const recalculateRow = (row: FormRow) => {
  if (row.endReading !== undefined && row.startReading !== undefined) {
    row.waterVolume = Number((row.endReading - row.startReading).toFixed(2));
  }
};

// 自动链式递推底数
const handleAutoChainReadings = () => {
  if (formDataRows.value.length === 0) return;
  let runningBase = props.facility?.currentBaseReading || 10000;
  
  formDataRows.value.forEach((row, idx) => {
    row.startReading = runningBase;
    // 假设根据核定月均配额递增或保留合理读数
    const avgStep = Math.round(500 + Math.random() * 400);
    if (!row.endReading || row.endReading <= row.startReading) {
      row.endReading = runningBase + avgStep;
    }
    row.waterVolume = row.endReading - row.startReading;
    runningBase = row.endReading;
  });

  MessagePlugin.success('已自动按时间序列链式推算并填充起止底数');
};

// 监听已选期次，生成并同步录入表行
watch(
  () => sortedSelectedPeriods.value,
  (newSelected) => {
    let baseReading = props.facility?.currentBaseReading || 10000;
    const newRows: FormRow[] = [];

    newSelected.forEach((item, index) => {
      // 检查原先是否已经有录入的数据
      const existing = formDataRows.value.find((r) => r.periodKey === item.key);
      if (existing) {
        newRows.push(existing);
        baseReading = existing.endReading || baseReading;
      } else {
        const start = baseReading;
        const typicalStep = props.facility?.reportCycle === 'quarter' ? 2800 : (props.facility?.reportCycle === 'year' ? 12000 : 750);
        const end = start + typicalStep;
        
        // 自动计算对应期次的抄表日期（如每月末或季度末）
        let rDate = '2026-09-05';
        if (props.facility?.reportCycle === 'month') {
          const monthNum = String(item.order).padStart(2, '0');
          rDate = `2026-${monthNum}-28`;
        } else if (props.facility?.reportCycle === 'quarter') {
          if (item.order === 1) rDate = '2026-03-31';
          else if (item.order === 2) rDate = '2026-06-30';
          else if (item.order === 3) rDate = '2026-09-08';
        }

        newRows.push({
          periodKey: item.key,
          periodLabel: item.label,
          startReading: start,
          endReading: end,
          waterVolume: end - start,
          readingDate: rDate,
          notes: newSelected.length > 1 ? `批量补报${item.label}取用水量` : '常规例行抄表归集申报',
        });

        baseReading = end;
      }
    });

    formDataRows.value = newRows;
  },
  { deep: true }
);

// 打开弹窗初始化
watch(
  () => props.visible,
  (val) => {
    if (val && props.facility) {
      commonReporterName.value = props.facility.reporterName || '张建军';
      commonReporterPhone.value = props.facility.reporterPhone || '13897210088';
      attachedFiles.value = [
        `${props.facility.name}现场水表读数清晰照片.jpg`,
        '巡检人员抄表记录登记表.pdf'
      ];
      // 默认选中第一个未报期次
      const unrep = unreportedPeriods.value;
      if (unrep.length > 0) {
        selectedPeriodKeys.value = [unrep[0].key];
      } else {
        selectedPeriodKeys.value = [];
      }
    }
  },
  { immediate: true }
);

const triggerFileUpload = () => {
  fileInputRef.value?.click();
};

const handleFilesSelected = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    for (let i = 0; i < target.files.length; i++) {
      attachedFiles.value.push(target.files[i].name);
    }
    MessagePlugin.success(`已添加 ${target.files.length} 份水表抄表凭证附件`);
  }
};

const removeAttachedFile = (idx: number) => {
  attachedFiles.value.splice(idx, 1);
};

const handleClose = () => {
  emit('update:visible', false);
};

const handleSubmit = () => {
  if (formDataRows.value.length === 0) {
    MessagePlugin.warning('请至少选择一个填报期次！');
    return;
  }

  if (!commonReporterName.value.trim()) {
    MessagePlugin.warning('请输入填报人姓名！');
    return;
  }

  if (!commonReporterPhone.value.trim()) {
    MessagePlugin.warning('请输入填报人联系电话！');
    return;
  }

  // 校验每行数据有效性
  for (const row of formDataRows.value) {
    if (row.endReading === undefined || row.endReading === null || row.endReading === ('' as unknown as number)) {
      MessagePlugin.warning(`【${row.periodLabel}】本期底数不能为空！`);
      return;
    }
    if (row.waterVolume < 0) {
      MessagePlugin.error(`【${row.periodLabel}】本期底数 (${row.endReading}) 小于上期底数 (${row.startReading})，水量不能为负数！`);
      return;
    }
    if (!row.readingDate) {
      MessagePlugin.warning(`【${row.periodLabel}】请选择抄表日期！`);
      return;
    }
  }

  isSubmitting.value = true;

  setTimeout(() => {
    if (!props.facility) return;

    const newRecords: ManualReportRecord[] = formDataRows.value.map((row, idx) => {
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
      const randomSeq = Math.floor(100 + Math.random() * 900);
      return {
        id: `rec-${Date.now()}-${idx}`,
        recordNo: `RG202609-${randomSeq}`,
        facilityId: props.facility!.id,
        facilityCode: props.facility!.code,
        facilityName: props.facility!.name,
        waterOwner: props.facility!.waterOwner,
        permitNumber: props.facility!.permitNumber,
        district: props.facility!.district,
        waterUsage: props.facility!.waterUsage,
        meteringMethod: props.facility!.meteringMethod,
        reportCycle: props.facility!.reportCycle,
        year: 2026,
        periodKey: row.periodKey,
        periodLabel: row.periodLabel,
        startReading: row.startReading,
        endReading: row.endReading,
        waterVolume: row.waterVolume,
        readingDate: row.readingDate,
        submitTime: nowStr,
        reporterName: commonReporterName.value.trim(),
        reporterPhone: commonReporterPhone.value.trim(),
        auditStatus: '待审核', // 提交后必须进入待审核状态
        voucherFiles: [...attachedFiles.value],
        notes: row.notes || '人工填报归集数据',
        isBatch: formDataRows.value.length > 1,
      };
    });

    isSubmitting.value = false;
    emit('submit', newRecords);
    handleClose();

    MessagePlugin.success({
      content: `成功提交 ${newRecords.length} 期人工归集数据（总水量 ${totalCalculatedWater.value.toLocaleString()} m³），已转入【水务主管部门待审核】列表！`,
      duration: 4000,
    });
  }, 400);
};
</script>
