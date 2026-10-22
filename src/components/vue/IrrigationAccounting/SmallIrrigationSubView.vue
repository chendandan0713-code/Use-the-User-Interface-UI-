<template>
  <div class="space-y-3">
    <!-- Filter & Action Bar -->
    <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-2.5 text-xs">
      <div class="flex flex-wrap items-center gap-2">
        <!-- District filter -->
        <div class="flex items-center gap-1.5">
          <span class="text-slate-500 font-medium">所属区县：</span>
          <select
            v-model="filterDistrict"
            class="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="全部">全部区县</option>
            <option value="湟中区">湟中区</option>
            <option value="湟源县">湟源县</option>
            <option value="大通县">大通县</option>
            <option value="城北区">城北区</option>
            <option value="城东区">城东区</option>
          </select>
        </div>

        <!-- Status filter -->
        <div class="flex items-center gap-1.5">
          <span class="text-slate-500 font-medium">审核状态：</span>
          <select
            v-model="filterStatus"
            class="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="全部">全部状态</option>
            <option value="draft">县级草稿</option>
            <option value="pending_city">待市级审核</option>
            <option value="approved">审核通过(已入库)</option>
            <option value="rejected">已退回</option>
          </select>
        </div>

        <!-- Keyword search -->
        <div class="relative">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索灌区名称 / 许可证号..."
            class="w-56 bg-slate-50 border border-slate-300 rounded-md pl-7 pr-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          />
          <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- 小型灌区填报与修改入口 -->
        <button
          type="button"
          @click="openAddModal"
          class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>区县填报小型灌区核算</span>
        </button>

        <!-- 市级审核批量处理按钮 -->
        <button
          v-if="currentRole === 'city' || currentRole === 'province'"
          type="button"
          @click="openCityAuditRuleGuide"
          class="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-medium flex items-center gap-1.5 transition cursor-pointer"
        >
          <svg class="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>市级审核规则指南</span>
        </button>
      </div>
    </div>

    <!-- Overview Metrics Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">纳入核算小型灌区</span>
        <div class="text-xl font-bold font-mono text-slate-800 mt-0.5">
          {{ list.length }} <span class="text-xs font-normal text-slate-500">座</span>
        </div>
        <div class="text-[10px] text-slate-400 mt-0.5">涵盖湟中/大通/湟源等辖区</div>
      </div>

      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">有效 / 实际灌溉面积</span>
        <div class="text-xl font-bold font-mono text-blue-700 mt-0.5">
          {{ totalActualArea.toLocaleString() }} <span class="text-xs font-normal text-slate-500">/ {{ totalEffectiveArea.toLocaleString() }} 亩</span>
        </div>
        <div class="text-[10px] text-blue-600 mt-0.5">整体灌溉履约保障率 {{ areaCoverageRate }}%</div>
      </div>

      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">取用水量合计（万m³）</span>
        <div class="text-xl font-bold font-mono text-emerald-700 mt-0.5">
          {{ totalWaterSum.toFixed(2) }} <span class="text-xs font-normal text-slate-500">万m³</span>
        </div>
        <div class="text-[10px] text-slate-500 mt-0.5">
          地表水 {{ totalSurfaceWaterSum.toFixed(2) }} | 地下水 {{ totalGroundwaterSum.toFixed(2) }}
        </div>
      </div>

      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">审核通过入库情况</span>
        <div class="text-xl font-bold font-mono text-indigo-700 mt-0.5">
          {{ approvedCount }} <span class="text-xs font-normal text-slate-500">/ {{ list.length }} 已通过</span>
        </div>
        <div class="text-[10px] text-amber-600 font-medium mt-0.5">待市级审核 {{ pendingCityCount }} 家</div>
      </div>
    </div>

    <!-- Main Table: 符合需求规范的小型灌区取用水量核算统计表 -->
    <div class="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
      <div class="p-2.5 px-3.5 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="font-bold text-slate-800 flex items-center gap-1.5">
          <span class="w-1.5 h-3.5 rounded-full bg-blue-600"></span>
          <span>小型灌区取用水量核算统计表（规范模板）</span>
        </div>
        <div class="text-[11px] text-slate-500">
          包含：基础信息完整性/合理性审核比对、地表水/地下水/其他水源拆分核算、定额偏差20%与直报系统±10%核验
        </div>
      </div>

      <div class="overflow-x-auto no-scrollbar">
        <table class="w-full text-left text-xs border-collapse border-spacing-0">
          <thead class="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200 text-[11px]">
            <!-- Grouped Header -->
            <tr>
              <th rowspan="2" class="p-2.5 text-center w-12 border-r border-slate-200">序号</th>
              <th colspan="5" class="p-2 text-center bg-blue-50/80 border-r border-blue-200 text-blue-900 font-bold border-b border-blue-200">
                灌区基础信息
              </th>
              <th colspan="4" class="p-2 text-center bg-emerald-50/80 border-r border-emerald-200 text-emerald-900 font-bold border-b border-emerald-200">
                取用水量 (万m³)
              </th>
              <th rowspan="2" class="p-2.5 min-w-[120px] text-center border-r border-slate-200 bg-amber-50/50">
                市级审核指标 (定额/直报比对)
              </th>
              <th rowspan="2" class="p-2.5 min-w-[95px] text-center border-r border-slate-200">审核状态</th>
              <th rowspan="2" class="p-2.5 min-w-[130px] text-center sticky right-0 bg-slate-100 z-10 shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.06)]">
                业务操作
              </th>
            </tr>
            <!-- Sub Header -->
            <tr class="bg-slate-50/90 text-[10.5px]">
              <th class="p-1.5 px-2 border-r border-slate-200">小型灌区名称</th>
              <th class="p-1.5 px-2 text-right border-r border-slate-200">有效灌溉面积(亩)</th>
              <th class="p-1.5 px-2 text-right border-r border-slate-200">实际灌溉面积(亩)</th>
              <th class="p-1.5 px-2 border-r border-slate-200">主要作物类型</th>
              <th class="p-1.5 px-2 text-right border-r border-blue-200">亩均用水量(m³/亩)</th>

              <th class="p-1.5 px-2 text-right border-r border-slate-200 text-slate-600">地表水(万m³)</th>
              <th class="p-1.5 px-2 text-right border-r border-slate-200 text-slate-600">地下水(万m³)</th>
              <th class="p-1.5 px-2 text-right border-r border-slate-200 text-slate-600">其他水源(万m³)</th>
              <th class="p-1.5 px-2 text-right border-r border-emerald-200 text-emerald-800 font-bold bg-emerald-100/40">合计(万m³)</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="(item, idx) in filteredList"
              :key="item.id"
              class="transition hover:bg-blue-50/30"
            >
              <td class="p-2.5 text-center text-slate-400 font-mono border-r border-slate-100">
                {{ idx + 1 }}
              </td>

              <!-- 小型灌区名称 -->
              <td class="p-2.5 border-r border-slate-100">
                <div class="font-bold text-slate-900">{{ item.name }}</div>
                <div class="text-[10.5px] text-slate-400 font-mono">{{ item.permitNumber }} · {{ item.district }}</div>
              </td>

              <!-- 有效灌溉面积 (亩) -->
              <td class="p-2.5 text-right font-mono text-slate-700 border-r border-slate-100">
                {{ item.effectiveArea.toLocaleString() }}
              </td>

              <!-- 实际灌溉面积 (亩) + 合理性比对警示 -->
              <td class="p-2.5 text-right font-mono border-r border-slate-100">
                <div :class="item.areaRatioAlert ? 'text-amber-600 font-bold' : 'text-slate-800 font-medium'">
                  {{ item.actualArea.toLocaleString() }}
                </div>
                <span
                  v-if="item.areaRatioAlert"
                  class="inline-block mt-0.5 px-1 py-0.2 rounded text-[9.5px] bg-amber-100 text-amber-800 border border-amber-200"
                  title="实际灌溉面积低于有效灌溉面积10%及以上或超出，需核实"
                >
                  面积匹配待核实
                </span>
              </td>

              <!-- 主要作物类型 (前3类) -->
              <td class="p-2.5 border-r border-slate-100">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="(crop, cIdx) in item.mainCropTypes"
                    :key="cIdx"
                    class="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 text-slate-700"
                  >
                    {{ crop }}
                  </span>
                </div>
              </td>

              <!-- 亩均用水量 (m³/亩) -->
              <td class="p-2.5 text-right font-mono border-r border-blue-100">
                <div class="font-bold text-blue-700">{{ item.quotaPerMu.toFixed(1) }}</div>
                <div class="text-[10px] text-slate-400">
                  {{ item.hasDirectMeter ? '实际计量测算' : '直报系统典型' }}
                </div>
              </td>

              <!-- 地表水 (万m³) -->
              <td class="p-2.5 text-right font-mono text-slate-700 border-r border-slate-100">
                {{ item.surfaceWater.toFixed(2) }}
              </td>

              <!-- 地下水 (万m³) -->
              <td class="p-2.5 text-right font-mono text-cyan-700 font-semibold border-r border-slate-100">
                {{ item.groundwater.toFixed(2) }}
              </td>

              <!-- 其他水源 (万m³) -->
              <td class="p-2.5 text-right font-mono text-slate-500 border-r border-slate-100">
                {{ item.otherWater.toFixed(2) }}
              </td>

              <!-- 合计 (万m³) -->
              <td class="p-2.5 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30 border-r border-emerald-100">
                {{ item.totalWater.toFixed(2) }}
              </td>

              <!-- 市级审核比对指标 -->
              <td class="p-2.5 border-r border-slate-100 text-[10.5px]">
                <div class="flex items-center justify-between gap-1">
                  <span class="text-slate-500">定额偏差:</span>
                  <span :class="Math.abs(item.quotaDeviation) > 20 ? 'text-rose-600 font-bold' : 'text-slate-700 font-mono'">
                    {{ item.quotaDeviation > 0 ? '+' : '' }}{{ item.quotaDeviation.toFixed(1) }}%
                  </span>
                </div>
                <div class="flex items-center justify-between gap-1 mt-0.5">
                  <span class="text-slate-500">直报对比:</span>
                  <span :class="Math.abs(item.directReportDeviation) > 10 ? 'text-amber-600 font-bold' : 'text-emerald-700 font-mono'">
                    {{ item.directReportDeviation > 0 ? '+' : '' }}{{ item.directReportDeviation.toFixed(1) }}%
                  </span>
                </div>
              </td>

              <!-- 审核状态 -->
              <td class="p-2.5 text-center border-r border-slate-100">
                <span
                  v-if="item.status === 'draft'"
                  class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-slate-100 text-slate-700"
                >
                  县级草稿
                </span>
                <span
                  v-else-if="item.status === 'pending_city'"
                  class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse"
                >
                  待市级审核
                </span>
                <span
                  v-else-if="item.status === 'approved'"
                  class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300"
                >
                  审核通过
                </span>
                <span
                  v-else-if="item.status === 'rejected'"
                  class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-100 text-rose-800 border border-rose-300"
                >
                  已退回修正
                </span>
              </td>

              <!-- 业务操作 -->
              <td class="p-2.5 text-center sticky right-0 bg-white z-10 shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.06)]">
                <div class="flex items-center justify-center gap-1.5">
                  <button
                    type="button"
                    @click="viewDetail(item)"
                    class="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    查看详情
                  </button>

                  <!-- 修改填报 (对齐需求: 小型灌区核算修改页面) -->
                  <button
                    type="button"
                    @click="editItem(item)"
                    class="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    修改
                  </button>

                  <!-- 县级操作 -->
                  <template v-if="currentRole === 'county'">
                    <button
                      v-if="item.status === 'draft' || item.status === 'rejected'"
                      type="button"
                      @click="submitToCity(item)"
                      class="text-emerald-600 hover:text-emerald-800 font-medium cursor-pointer"
                    >
                      提交市审
                    </button>
                  </template>

                  <!-- 市级审核操作 -->
                  <template v-if="currentRole === 'city' || currentRole === 'province'">
                    <button
                      v-if="item.status === 'pending_city'"
                      type="button"
                      @click="openAuditModal(item)"
                      class="px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-600 text-white font-medium cursor-pointer"
                    >
                      审核
                    </button>
                  </template>
                </div>
              </td>
            </tr>

            <tr v-if="filteredList.length === 0">
              <td colspan="13" class="p-8 text-center text-slate-400">
                暂无符合条件的小型灌区核算记录
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 全新小型灌区月度水量核算填报/修改弹窗（完全根据截图实现） -->
    <SmallIrrigationReportModal
      v-model:visible="reportCatalogModalVisible"
      :is-edit="isEdit"
      :edit-item="editingItem"
      :district="editingItem ? editingItem.district : (filterDistrict === '全部' ? '大通县' : filterDistrict)"
      @save-draft="handleCatalogSaveDraft"
      @submit="handleCatalogSubmit"
    />

    <!-- 县级填报/修改弹窗 -->
    <t-dialog
      v-model:visible="modalVisible"
      :header="isEdit ? '修改小型灌区核算填报' : '区、县级小型灌区取用水量核算填报'"
      width="820px"
      :footer="false"
      :close-on-overlay-click="false"
    >
      <div class="space-y-4 max-h-[75vh] overflow-y-auto pr-1 text-xs select-none">
        <div class="bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-blue-900 text-[11.5px] leading-relaxed">
          <strong>填报须知：</strong>请完整填报基础信息（有效面积、实际面积、前3类作物类型、亩均用水量），并按地表水、地下水、其他水源拆分取用水量。系统将自动比对用水定额（偏差超20%需说明）与直报系统（偏差超±10%需核对）。
        </div>

        <!-- 基础信息填报 -->
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div class="font-bold text-slate-800 text-xs mb-2.5 flex items-center gap-1.5">
            <span class="w-1.5 h-3.5 bg-blue-600 rounded-full"></span>
            <span>一、灌区基础信息填报</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label class="block text-slate-600 mb-1 font-medium">小型灌区名称 <span class="text-rose-500">*</span></label>
              <input
                v-model="formData.name"
                type="text"
                placeholder="例如：湟中区群加小型灌区"
                class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-medium">所属区县 <span class="text-rose-500">*</span></label>
              <select
                v-model="formData.district"
                class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="湟中区">湟中区</option>
                <option value="湟源县">湟源县</option>
                <option value="大通县">大通县</option>
                <option value="城北区">城北区</option>
                <option value="城东区">城东区</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-medium">取水许可证号 <span class="text-rose-500">*</span></label>
              <input
                v-model="formData.permitNumber"
                type="text"
                placeholder="取水（青宁...）字[...]"
                class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-medium">有效灌溉面积 (亩) <span class="text-rose-500">*</span></label>
              <input
                v-model.number="formData.effectiveArea"
                type="number"
                placeholder="耕地、林地、园地、牧草地"
                class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-medium">实际灌溉面积 (亩) <span class="text-rose-500">*</span></label>
              <input
                v-model.number="formData.actualArea"
                type="number"
                placeholder="实际开展灌溉面积"
                class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-medium">主要作物类型（前3类） <span class="text-rose-500">*</span></label>
              <input
                v-model="cropsInput"
                type="text"
                placeholder="逗号分隔，如：小麦, 油菜, 马铃薯"
                class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-medium">是否有实际计量取水</label>
              <select
                v-model="formData.hasDirectMeter"
                class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option :value="true">有实际取水计量数据（按实际计量）</option>
                <option :value="false">无计量数据（采用直报系统典型亩均）</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-medium">亩均用水量 (m³/亩) <span class="text-rose-500">*</span></label>
              <input
                v-model.number="formData.quotaPerMu"
                type="number"
                step="0.1"
                placeholder="m³/亩"
                class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 font-bold text-blue-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-medium">所属农业灌溉定额标准</label>
              <input
                v-model.number="formData.quotaStandard"
                type="number"
                class="w-full bg-slate-100 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-600"
                disabled
              />
            </div>
          </div>
        </div>

        <!-- 取用水量填报 (按水源类型拆分) -->
        <div class="bg-white p-3.5 rounded-xl border-2 border-blue-200">
          <div class="font-bold text-slate-900 text-xs mb-2.5 flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="w-1.5 h-3.5 bg-emerald-600 rounded-full"></span>
              <span>二、取用水量填报（按水源类型拆分，单位：万m³）</span>
            </div>
            <span class="text-[11px] text-blue-600 font-medium">
              合计将自动汇总求和
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <label class="block text-slate-700 font-medium mb-1">地表水取用水量 (万m³)</label>
              <input
                v-model.number="formData.surfaceWater"
                type="number"
                step="0.01"
                class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div class="p-2.5 rounded-lg bg-cyan-50/70 border border-cyan-200">
              <label class="block text-cyan-950 font-medium mb-1">地下水取用水量 (万m³)</label>
              <input
                v-model.number="formData.groundwater"
                type="number"
                step="0.01"
                class="w-full bg-white border border-cyan-300 rounded px-2.5 py-1.5 text-xs text-cyan-900 font-mono font-bold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <label class="block text-slate-700 font-medium mb-1">其他水源水量 (万m³)</label>
              <input
                v-model.number="formData.otherWater"
                type="number"
                step="0.01"
                placeholder="雨水集蓄等非常规水"
                class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div class="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300">
              <label class="block text-emerald-900 font-bold mb-1">取用水量合计 (万m³)</label>
              <div class="h-8 flex items-center text-lg font-mono font-bold text-emerald-700">
                {{ calculatedTotal.toFixed(2) }} 万m³
              </div>
            </div>
          </div>
        </div>

        <!-- 直报系统与偏差说明 -->
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2.5">
          <div class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
            <span class="w-1.5 h-3.5 bg-amber-600 rounded-full"></span>
            <span>三、直报系统对比与偏差说明（审核关键指标）</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-600 mb-1">县级用水统计调查直报系统填报量 (万m³)</label>
              <input
                v-model.number="formData.directReportWater"
                type="number"
                step="0.01"
                class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label class="block text-slate-600 mb-1">偏差原因说明（偏差超标时必填）</label>
              <input
                v-model="formData.directReportExplain"
                type="text"
                placeholder="若与定额偏差超20%或直报偏差超10%，请填写核实原因..."
                class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- Footer Buttons -->
        <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
          <button
            type="button"
            @click="modalVisible = false"
            class="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition cursor-pointer font-medium"
          >
            取消
          </button>
          <button
            type="button"
            @click="saveRecord(false)"
            class="px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition cursor-pointer font-medium"
          >
            保存草稿
          </button>
          <button
            type="button"
            @click="saveRecord(true)"
            class="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition cursor-pointer shadow-2xs"
          >
            提交市级审核
          </button>
        </div>
      </div>
    </t-dialog>

    <!-- 市级审核弹窗 (严格按照需求A、B、C项处理) -->
    <t-dialog
      v-model:visible="auditModalVisible"
      header="市级水行政主管部门审核 - 小型灌区核算"
      width="780px"
      :footer="false"
      :close-on-overlay-click="false"
    >
      <div v-if="currentAuditItem" class="space-y-4 max-h-[75vh] overflow-y-auto pr-1 text-xs select-none">
        <div class="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center justify-between">
          <div>
            <div class="font-bold text-amber-950 text-xs">
              【市级审核】西宁市水务局 水资源管理科
            </div>
            <div class="text-[11px] text-amber-800 mt-0.5">
              严格执行基础信息完整性、实际与有效面积匹配度（偏差10%预警）、数据来源合规性、定额（20%）及直报（±10%）对比审核
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            待市级审核
          </span>
        </div>

        <!-- 审核检查清单 -->
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2.5">
          <div class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
            <span class="w-1.5 h-3.5 bg-blue-600 rounded-full"></span>
            <span>审核核验关键项与逻辑一致性</span>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-2.5 rounded bg-white border border-slate-200">
              <span class="text-slate-400 block text-[11px]">灌区与区县</span>
              <div class="font-bold text-slate-800 mt-0.5">{{ currentAuditItem.name }} ({{ currentAuditItem.district }})</div>
              <div class="text-[10.5px] text-slate-500 font-mono">{{ currentAuditItem.permitNumber }}</div>
            </div>

            <div class="p-2.5 rounded bg-white border border-slate-200">
              <span class="text-slate-400 block text-[11px]">面积匹配度核查 (合理性)</span>
              <div class="font-bold text-slate-800 mt-0.5">
                实际 {{ currentAuditItem.actualArea }} / 有效 {{ currentAuditItem.effectiveArea }} 亩
              </div>
              <div :class="currentAuditItem.areaRatioAlert ? 'text-amber-600 font-medium' : 'text-emerald-600 font-medium'" class="text-[10.5px] mt-0.5">
                {{ currentAuditItem.areaRatioAlert ? '⚠ 实际面积偏差超10%，需核查' : '✓ 面积匹配合理' }}
              </div>
            </div>

            <div class="p-2.5 rounded bg-white border border-slate-200">
              <span class="text-slate-400 block text-[11px]">定额比对 (偏差20%预警)</span>
              <div class="font-bold text-slate-800 mt-0.5">
                填报亩均: {{ currentAuditItem.quotaPerMu }} m³/亩 (定额标准: {{ currentAuditItem.quotaStandard }})
              </div>
              <div :class="Math.abs(currentAuditItem.quotaDeviation) > 20 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-medium'" class="text-[10.5px] mt-0.5">
                偏差率: {{ currentAuditItem.quotaDeviation.toFixed(1) }}%
              </div>
            </div>

            <div class="p-2.5 rounded bg-white border border-slate-200">
              <span class="text-slate-400 block text-[11px]">直报系统比对 (偏差±10%预警)</span>
              <div class="font-bold text-slate-800 mt-0.5">
                直报量: {{ currentAuditItem.directReportWater }} 万m³ (核算合计: {{ currentAuditItem.totalWater }} 万m³)
              </div>
              <div :class="Math.abs(currentAuditItem.directReportDeviation) > 10 ? 'text-amber-600 font-bold' : 'text-emerald-600 font-medium'" class="text-[10.5px] mt-0.5">
                偏差率: {{ currentAuditItem.directReportDeviation.toFixed(1) }}%
              </div>
            </div>
          </div>
        </div>

        <!-- 审核批注输入 -->
        <div>
          <label class="block text-slate-700 font-bold mb-1">市级审核意见 / 批注说明 <span class="text-rose-500">*</span></label>
          <textarea
            v-model="auditComment"
            rows="3"
            placeholder="若审核通过，填写合规归档意见；若审核退回，请明确指出信息缺失、数据不合理或逻辑错误等具体问题..."
            class="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <!-- 审核操作按钮 -->
        <div class="flex items-center justify-between pt-2 border-t border-slate-200">
          <button
            type="button"
            @click="auditModalVisible = false"
            class="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            取消关闭
          </button>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="submitAuditResult('reject')"
              class="px-4 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-semibold transition cursor-pointer"
            >
              审核退回 (要求县级重报)
            </button>
            <button
              type="button"
              @click="submitAuditResult('pass')"
              class="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition cursor-pointer shadow-2xs"
            >
              审核通过 (纳入市级汇总)
            </button>
          </div>
        </div>
      </div>
    </t-dialog>

    <!-- 详情弹窗 -->
    <t-dialog
      v-model:visible="detailModalVisible"
      header="小型灌区取用水量核算详情与台账"
      width="700px"
      :footer="false"
    >
      <div v-if="currentDetailItem" class="space-y-3.5 max-h-[70vh] overflow-y-auto pr-1 text-xs">
        <div class="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <div class="font-bold text-slate-900 text-sm">{{ currentDetailItem.name }}</div>
            <div class="text-[11px] text-slate-500 mt-0.5">许可证号：{{ currentDetailItem.permitNumber }} · {{ currentDetailItem.district }}</div>
          </div>
          <span
            :class="[
              'px-2.5 py-1 rounded-full text-xs font-bold',
              currentDetailItem.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            ]"
          >
            {{ currentDetailItem.status === 'approved' ? '审核通过(已入库)' : '待市级审核' }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2 rounded bg-slate-50 border border-slate-200">
            <span class="text-slate-400">有效灌溉面积:</span>
            <span class="ml-1 font-bold">{{ currentDetailItem.effectiveArea }} 亩</span>
          </div>
          <div class="p-2 rounded bg-slate-50 border border-slate-200">
            <span class="text-slate-400">实际灌溉面积:</span>
            <span class="ml-1 font-bold">{{ currentDetailItem.actualArea }} 亩</span>
          </div>
          <div class="p-2 rounded bg-slate-50 border border-slate-200">
            <span class="text-slate-400">地表水水量:</span>
            <span class="ml-1 font-bold text-blue-700">{{ currentDetailItem.surfaceWater }} 万m³</span>
          </div>
          <div class="p-2 rounded bg-slate-50 border border-slate-200">
            <span class="text-slate-400">地下水水量:</span>
            <span class="ml-1 font-bold text-cyan-700">{{ currentDetailItem.groundwater }} 万m³</span>
          </div>
          <div class="p-2 rounded bg-slate-50 border border-slate-200">
            <span class="text-slate-400">其他水源水量:</span>
            <span class="ml-1 font-bold">{{ currentDetailItem.otherWater }} 万m³</span>
          </div>
          <div class="p-2 rounded bg-emerald-50 border border-emerald-200">
            <span class="text-emerald-800 font-bold">总取用水量合计:</span>
            <span class="ml-1 font-bold text-emerald-700">{{ currentDetailItem.totalWater }} 万m³</span>
          </div>
        </div>

        <div v-if="currentDetailItem.cityAuditor" class="p-3 rounded-lg bg-blue-50/70 border border-blue-200 space-y-1">
          <div class="font-bold text-blue-900">市级审核记录</div>
          <div class="text-[11px] text-slate-700">审核人：{{ currentDetailItem.cityAuditor.name }} ({{ currentDetailItem.cityAuditor.unit }})</div>
          <div class="text-[11px] text-slate-700">审核时间：{{ currentDetailItem.cityAuditor.time }}</div>
          <div class="text-[11px] text-slate-800 font-medium">意见：{{ currentDetailItem.cityAuditor.comment }}</div>
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { SmallIrrigationRecord, IrrigationRoleLevel } from '../../../types';
import { initialSmallIrrigationRecords } from '../../../data/mockAccountingCategoriesData';
import SmallIrrigationReportModal from './SmallIrrigationReportModal.vue';

const props = defineProps<{
  currentRole: IrrigationRoleLevel;
}>();

const list = ref<SmallIrrigationRecord[]>([...initialSmallIrrigationRecords]);

// 全新名录选取与实时汇总填报弹窗控制
const reportCatalogModalVisible = ref(false);
const editingItem = ref<SmallIrrigationRecord | null>(null);

function handleCatalogSaveDraft(payload: any) {
  if (payload.isEdit && payload.editId) {
    const idx = list.value.findIndex((i) => i.id === payload.editId);
    if (idx !== -1) {
      const block = payload.blocks && payload.blocks[0];
      if (block) {
        const blockTotalArea = block.rows.reduce((sum: number, r: any) => sum + (Number(r.actualArea) || 0), 0);
        const blockEffectiveArea = block.rows.reduce((sum: number, r: any) => sum + (Number(r.effectiveArea) || 0), 0);
        const blockSurfaceWater = block.rows.reduce((sum: number, r: any) => sum + (Number(r.surfaceWater) || 0), 0);
        const blockGroundwater = block.rows.reduce((sum: number, r: any) => sum + (Number(r.groundwater) || 0), 0);
        const blockOtherWater = block.rows.reduce((sum: number, r: any) => sum + (Number(r.otherWater) || 0), 0);
        const blockTotalWater = Number(((blockSurfaceWater + blockGroundwater + blockOtherWater) / 10000).toFixed(2));
        const cropList = Array.from(new Set(block.rows.map((r: any) => r.crop).filter(Boolean))) as string[];

        list.value[idx] = {
          ...list.value[idx],
          name: block.name || list.value[idx].name,
          district: payload.district || list.value[idx].district,
          permitNumber: block.permitNumber || list.value[idx].permitNumber,
          effectiveArea: blockEffectiveArea || list.value[idx].effectiveArea,
          actualArea: blockTotalArea || list.value[idx].actualArea,
          mainCropTypes: cropList.length ? cropList : list.value[idx].mainCropTypes,
          surfaceWater: Number((blockSurfaceWater / 10000).toFixed(2)) || list.value[idx].surfaceWater,
          groundwater: Number((blockGroundwater / 10000).toFixed(2)) || list.value[idx].groundwater,
          otherWater: Number((blockOtherWater / 10000).toFixed(2)) || list.value[idx].otherWater,
          totalWater: blockTotalWater || list.value[idx].totalWater,
          directReportWater: blockTotalWater || list.value[idx].directReportWater,
          status: 'draft',
        };
      }
    }
    return;
  }

  if (payload.blocks && payload.blocks.length > 0) {
    payload.blocks.forEach((block: any) => {
      const blockTotalArea = block.rows.reduce((sum: number, r: any) => sum + (Number(r.actualArea) || 0), 0);
      const blockEffectiveArea = block.rows.reduce((sum: number, r: any) => sum + (Number(r.effectiveArea) || 0), 0);
      const blockSurfaceWater = block.rows.reduce((sum: number, r: any) => sum + (Number(r.surfaceWater) || 0), 0);
      const blockGroundwater = block.rows.reduce((sum: number, r: any) => sum + (Number(r.groundwater) || 0), 0);
      const blockOtherWater = block.rows.reduce((sum: number, r: any) => sum + (Number(r.otherWater) || 0), 0);
      const blockTotalWater = Number(((blockSurfaceWater + blockGroundwater + blockOtherWater) / 10000).toFixed(2));
      const cropList = Array.from(new Set(block.rows.map((r: any) => r.crop).filter(Boolean))) as string[];

      const newRec: SmallIrrigationRecord = {
        id: `small-irr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: block.name,
        district: payload.district || '大通县',
        permitNumber: block.permitNumber,
        year: 2024,
        periodLabel: payload.period || '2024年10月',
        effectiveArea: blockEffectiveArea || 10000,
        actualArea: blockTotalArea || 9000,
        mainCropTypes: cropList.length ? cropList : ['马铃薯', '小麦'],
        quotaPerMu: 200,
        hasDirectMeter: true,
        surfaceWater: Number((blockSurfaceWater / 10000).toFixed(2)) || 12.0,
        groundwater: Number((blockGroundwater / 10000).toFixed(2)) || 5.0,
        otherWater: Number((blockOtherWater / 10000).toFixed(2)) || 0.0,
        totalWater: blockTotalWater || 17.0,
        quotaStandard: 200,
        quotaDeviation: 0,
        directReportWater: blockTotalWater || 17.0,
        directReportDeviation: 0,
        status: 'draft',
      };
      list.value.unshift(newRec);
    });
  }
}

function handleCatalogSubmit(payload: any) {
  if (payload.isEdit && payload.editId) {
    const idx = list.value.findIndex((i) => i.id === payload.editId);
    if (idx !== -1) {
      const block = payload.blocks && payload.blocks[0];
      if (block) {
        const blockTotalArea = block.rows.reduce((sum: number, r: any) => sum + (Number(r.actualArea) || 0), 0);
        const blockEffectiveArea = block.rows.reduce((sum: number, r: any) => sum + (Number(r.effectiveArea) || 0), 0);
        const blockSurfaceWater = block.rows.reduce((sum: number, r: any) => sum + (Number(r.surfaceWater) || 0), 0);
        const blockGroundwater = block.rows.reduce((sum: number, r: any) => sum + (Number(r.groundwater) || 0), 0);
        const blockOtherWater = block.rows.reduce((sum: number, r: any) => sum + (Number(r.otherWater) || 0), 0);
        const blockTotalWater = Number(((blockSurfaceWater + blockGroundwater + blockOtherWater) / 10000).toFixed(2));
        const cropList = Array.from(new Set(block.rows.map((r: any) => r.crop).filter(Boolean))) as string[];

        list.value[idx] = {
          ...list.value[idx],
          name: block.name || list.value[idx].name,
          district: payload.district || list.value[idx].district,
          permitNumber: block.permitNumber || list.value[idx].permitNumber,
          effectiveArea: blockEffectiveArea || list.value[idx].effectiveArea,
          actualArea: blockTotalArea || list.value[idx].actualArea,
          mainCropTypes: cropList.length ? cropList : list.value[idx].mainCropTypes,
          surfaceWater: Number((blockSurfaceWater / 10000).toFixed(2)) || list.value[idx].surfaceWater,
          groundwater: Number((blockGroundwater / 10000).toFixed(2)) || list.value[idx].groundwater,
          otherWater: Number((blockOtherWater / 10000).toFixed(2)) || list.value[idx].otherWater,
          totalWater: blockTotalWater || list.value[idx].totalWater,
          directReportWater: blockTotalWater || list.value[idx].directReportWater,
          status: 'pending_city',
        };
      }
    }
    return;
  }

  if (payload.blocks && payload.blocks.length > 0) {
    payload.blocks.forEach((block: any) => {
      const blockTotalArea = block.rows.reduce((sum: number, r: any) => sum + (Number(r.actualArea) || 0), 0);
      const blockEffectiveArea = block.rows.reduce((sum: number, r: any) => sum + (Number(r.effectiveArea) || 0), 0);
      const blockSurfaceWater = block.rows.reduce((sum: number, r: any) => sum + (Number(r.surfaceWater) || 0), 0);
      const blockGroundwater = block.rows.reduce((sum: number, r: any) => sum + (Number(r.groundwater) || 0), 0);
      const blockOtherWater = block.rows.reduce((sum: number, r: any) => sum + (Number(r.otherWater) || 0), 0);
      const blockTotalWater = Number(((blockSurfaceWater + blockGroundwater + blockOtherWater) / 10000).toFixed(2));
      const cropList = Array.from(new Set(block.rows.map((r: any) => r.crop).filter(Boolean))) as string[];

      const newRec: SmallIrrigationRecord = {
        id: `small-irr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: block.name,
        district: payload.district || '大通县',
        permitNumber: block.permitNumber,
        year: 2024,
        periodLabel: payload.period || '2024年10月',
        effectiveArea: blockEffectiveArea || 10000,
        actualArea: blockTotalArea || 9000,
        mainCropTypes: cropList.length ? cropList : ['马铃薯', '小麦'],
        quotaPerMu: 200,
        hasDirectMeter: true,
        surfaceWater: Number((blockSurfaceWater / 10000).toFixed(2)) || 12.0,
        groundwater: Number((blockGroundwater / 10000).toFixed(2)) || 5.0,
        otherWater: Number((blockOtherWater / 10000).toFixed(2)) || 0.0,
        totalWater: blockTotalWater || 17.0,
        quotaStandard: 200,
        quotaDeviation: 0,
        directReportWater: blockTotalWater || 17.0,
        directReportDeviation: 0,
        status: 'pending_city',
      };
      list.value.unshift(newRec);
    });
  }
}

// Filters
const filterDistrict = ref<string>('全部');
const filterStatus = ref<string>('全部');
const searchKeyword = ref<string>('');

const filteredList = computed(() => {
  return list.value.filter((item) => {
    if (filterDistrict.value !== '全部' && item.district !== filterDistrict.value) return false;
    if (filterStatus.value !== '全部' && item.status !== filterStatus.value) return false;
    if (searchKeyword.value.trim()) {
      const q = searchKeyword.value.trim().toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchPermit = item.permitNumber.toLowerCase().includes(q);
      if (!matchName && !matchPermit) return false;
    }
    return true;
  });
});

// Summary metrics
const totalEffectiveArea = computed(() => list.value.reduce((acc, c) => acc + c.effectiveArea, 0));
const totalActualArea = computed(() => list.value.reduce((acc, c) => acc + c.actualArea, 0));
const areaCoverageRate = computed(() => {
  if (totalEffectiveArea.value <= 0) return '0.0';
  return ((totalActualArea.value / totalEffectiveArea.value) * 100).toFixed(1);
});
const totalWaterSum = computed(() => list.value.reduce((acc, c) => acc + c.totalWater, 0));
const totalSurfaceWaterSum = computed(() => list.value.reduce((acc, c) => acc + c.surfaceWater, 0));
const totalGroundwaterSum = computed(() => list.value.reduce((acc, c) => acc + c.groundwater, 0));
const approvedCount = computed(() => list.value.filter((i) => i.status === 'approved').length);
const pendingCityCount = computed(() => list.value.filter((i) => i.status === 'pending_city').length);

// Modal states
const modalVisible = ref(false);
const isEdit = ref(false);
const editingId = ref('');
const cropsInput = ref('小麦, 油菜, 马铃薯');

const formData = reactive({
  name: '',
  district: '湟中区',
  permitNumber: '',
  effectiveArea: 10000,
  actualArea: 9500,
  mainCropTypes: ['小麦', '油菜', '马铃薯'],
  hasDirectMeter: true,
  quotaPerMu: 150.0,
  quotaStandard: 160.0,
  surfaceWater: 140.0,
  groundwater: 12.5,
  otherWater: 0.0,
  directReportWater: 152.0,
  directReportExplain: '',
});

const calculatedTotal = computed(() => {
  return Number((formData.surfaceWater + formData.groundwater + formData.otherWater).toFixed(2));
});

function openAddModal() {
  isEdit.value = false;
  editingId.value = '';
  editingItem.value = null;
  reportCatalogModalVisible.value = true;
}

function editItem(item: SmallIrrigationRecord) {
  isEdit.value = true;
  editingId.value = item.id;
  editingItem.value = item;
  reportCatalogModalVisible.value = true;
}

function saveRecord(submitDirectly: boolean) {
  if (!formData.name.trim()) {
    MessagePlugin.warning('请输入小型灌区名称');
    return;
  }
  if (!formData.permitNumber.trim()) {
    MessagePlugin.warning('请输入取水许可证号');
    return;
  }

  const crops = cropsInput.value.split(/[,，、]/).map((s) => s.trim()).filter(Boolean);
  const total = Number((formData.surfaceWater + formData.groundwater + formData.otherWater).toFixed(2));
  const quotaDev = Number((((formData.quotaPerMu - formData.quotaStandard) / formData.quotaStandard) * 100).toFixed(1));
  const drDev = formData.directReportWater > 0
    ? Number((((total - formData.directReportWater) / formData.directReportWater) * 100).toFixed(1))
    : 0;

  // 面积匹配度合理性校验: 实际灌溉面积超出有效面积或低于10%以上
  const areaRatio = formData.actualArea / formData.effectiveArea;
  const areaRatioAlert = areaRatio > 1 || areaRatio < 0.9;

  if (isEdit.value && editingId.value) {
    const idx = list.value.findIndex((i) => i.id === editingId.value);
    if (idx !== -1) {
      list.value[idx] = {
        ...list.value[idx],
        name: formData.name,
        district: formData.district,
        permitNumber: formData.permitNumber,
        effectiveArea: formData.effectiveArea,
        actualArea: formData.actualArea,
        mainCropTypes: crops.length ? crops : ['小麦'],
        quotaPerMu: formData.quotaPerMu,
        hasDirectMeter: formData.hasDirectMeter,
        areaRatioAlert,
        surfaceWater: formData.surfaceWater,
        groundwater: formData.groundwater,
        otherWater: formData.otherWater,
        totalWater: total,
        quotaDeviation: quotaDev,
        directReportWater: formData.directReportWater,
        directReportDeviation: drDev,
        directReportExplain: formData.directReportExplain,
        status: submitDirectly ? 'pending_city' : 'draft',
      };
    }
  } else {
    const newRecord: SmallIrrigationRecord = {
      id: `sm-irr-${Date.now()}`,
      name: formData.name,
      district: formData.district,
      permitNumber: formData.permitNumber,
      year: 2026,
      periodLabel: '2026年度',
      effectiveArea: formData.effectiveArea,
      actualArea: formData.actualArea,
      mainCropTypes: crops.length ? crops : ['小麦'],
      quotaPerMu: formData.quotaPerMu,
      hasDirectMeter: formData.hasDirectMeter,
      areaRatioAlert,
      surfaceWater: formData.surfaceWater,
      groundwater: formData.groundwater,
      otherWater: formData.otherWater,
      totalWater: total,
      quotaStandard: formData.quotaStandard,
      quotaDeviation: quotaDev,
      directReportWater: formData.directReportWater,
      directReportDeviation: drDev,
      directReportExplain: formData.directReportExplain,
      sourceLegitimate: true,
      sourceVouchers: ['小型灌区用水核算原始凭证.pdf'],
      status: submitDirectly ? 'pending_city' : 'draft',
      reporter: {
        name: '县级填报员',
        unit: `${formData.district}水务局`,
        time: new Date().toLocaleString(),
      },
      logs: [
        {
          id: `log-${Date.now()}`,
          action: submitDirectly ? '县级提交市审' : '县级保存草稿',
          operatorName: '县级填报员',
          roleName: `${formData.district}水务局`,
          time: new Date().toLocaleString(),
          statusAfter: submitDirectly ? 'pending_city' : 'draft',
        },
      ],
    };
    list.value.unshift(newRecord);
  }

  modalVisible.value = false;
  MessagePlugin.success(submitDirectly ? '填报数据已提交至市级水行政主管部门审核' : '填报数据草稿已保存');
}

function submitToCity(item: SmallIrrigationRecord) {
  item.status = 'pending_city';
  item.logs.push({
    id: `log-${Date.now()}`,
    action: '县级提交市级审核',
    operatorName: '何晓峰',
    roleName: `${item.district}水务局`,
    time: new Date().toLocaleString(),
    statusAfter: 'pending_city',
  });
  MessagePlugin.success(`【${item.name}】已成功上报市水务局审核`);
}

// Audit
const auditModalVisible = ref(false);
const currentAuditItem = ref<SmallIrrigationRecord | null>(null);
const auditComment = ref('');

function openAuditModal(item: SmallIrrigationRecord) {
  currentAuditItem.value = item;
  auditComment.value = item.areaRatioAlert
    ? '经核实，实际灌溉面积与有效灌溉面积匹配度存在合理休耕解释，准予审核通过。'
    : '基础信息完整，取用水量数据来源凭证齐全，定额与直报比对逻辑一致，审核通过。';
  auditModalVisible.value = true;
}

function submitAuditResult(result: 'pass' | 'reject') {
  if (!currentAuditItem.value) return;
  if (!auditComment.value.trim()) {
    MessagePlugin.warning('请填写审核意见');
    return;
  }

  currentAuditItem.value.status = result === 'pass' ? 'approved' : 'rejected';
  currentAuditItem.value.cityAuditor = {
    name: '刘洪涛',
    unit: '西宁市水务局水资源管理科',
    time: new Date().toLocaleString(),
    result,
    comment: auditComment.value,
  };
  currentAuditItem.value.logs.push({
    id: `log-${Date.now()}`,
    action: result === 'pass' ? '市级审核通过' : '市级审核退回',
    operatorName: '刘洪涛',
    roleName: '西宁市水务局',
    time: new Date().toLocaleString(),
    result,
    comment: auditComment.value,
    statusAfter: result === 'pass' ? 'approved' : 'rejected',
  });

  auditModalVisible.value = false;
  MessagePlugin.success(result === 'pass' ? '审核通过，已纳入市级小型灌区汇总数据库' : '审核退回，已退回县级部门修改重报');
}

// Detail
const detailModalVisible = ref(false);
const currentDetailItem = ref<SmallIrrigationRecord | null>(null);

function viewDetail(item: SmallIrrigationRecord) {
  currentDetailItem.value = item;
  detailModalVisible.value = true;
}

function openCityAuditRuleGuide() {
  MessagePlugin.info('市级审核依据：①基础信息完整性与合理性(面积比对) ②数据来源凭证 ③亩均与分区定额偏差(20%)及直报系统比对(±10%)');
}
</script>
