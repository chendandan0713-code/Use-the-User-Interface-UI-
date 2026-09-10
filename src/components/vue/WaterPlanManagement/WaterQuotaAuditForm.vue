<template>
  <div class="bg-white rounded-lg border border-slate-200/90 p-3.5 space-y-3">
    <!-- 1. 表单顶部摘要与分类切换标签 -->
    <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-3.5 bg-[#1677ff] rounded-full"></span>
        <h4 class="text-[13px] font-bold text-slate-800 tracking-tight">
          {{ title }}
        </h4>
        <span v-if="badgeText" class="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-200">
          {{ badgeText }}
        </span>
      </div>

      <!-- 右侧核定总计 -->
      <div class="flex items-center gap-1.5 font-mono text-xs">
        <span class="text-slate-400 font-sans">核定总计:</span>
        <strong class="text-sm font-bold text-[#1677ff]">{{ (totalVolume ?? 0).toFixed(2) }}</strong>
        <span class="text-slate-400 text-[11px] font-sans">万m³</span>
      </div>
    </div>

    <!-- 2. 分类快速过滤 Tab (全部 / 生活 / 工业 / 农业 / 发电) 避免大篇幅混杂 -->
    <div class="flex items-center gap-1 bg-slate-50 p-1 rounded-md border border-slate-200/70 overflow-x-auto no-scrollbar">
      <button
        v-for="cat in categoryList"
        :key="cat.key"
        type="button"
        @click="activeCategory = cat.key"
        class="px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
        :class="activeCategory === cat.key ? 'bg-white text-[#1677ff] font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'"
      >
        <span>{{ cat.label }}</span>
      </button>
    </div>

    <!-- 3. 表单主体核定内容 (扁平化层次，移除卡片套卡片) -->
    <div class="space-y-4 pt-1">
      
      <!-- ================= 1. 生活用水核定 ================= -->
      <div
        v-show="activeCategory === 'all' || activeCategory === 'living'"
        class="space-y-2 pt-1"
        :class="{ 'border-t border-slate-100 pt-3': activeCategory === 'all' }"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-3 bg-[#1677ff] rounded-full"></span>
            <span class="text-xs font-semibold text-slate-800">生活用水核定</span>
          </div>
        </div>

        <div class="overflow-x-auto custom-scrollbar border border-[#b8cde6] rounded-md bg-white shadow-2xs">
          <table class="w-full text-xs text-left border-collapse">
            <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6]">
              <tr class="divide-x divide-[#b8cde6] text-center">
                <th class="px-2 py-2 min-w-[110px] text-slate-800 font-semibold border-r border-[#b8cde6]">供水类型</th>
                <th class="px-2 py-2 min-w-[80px] font-semibold border-r border-[#b8cde6]">人均定额</th>
                <th class="px-2 py-2 min-w-[75px] font-semibold border-r border-[#b8cde6]">供水人口</th>
                <th class="px-2 py-2 min-w-[75px] font-semibold border-r border-[#b8cde6]">地表水</th>
                <th class="px-2 py-2 min-w-[75px] font-semibold border-r border-[#b8cde6]">地下水</th>
                <th class="px-2 py-2 min-w-[80px] font-semibold text-slate-800 border-r border-[#b8cde6]">总计</th>
                <th v-if="!readonly" class="px-1.5 py-2 w-10 text-slate-600 font-semibold">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#b8cde6] text-center bg-white">
              <tr
                v-for="(row, idx) in formData.livingWaterRows"
                :key="idx"
                class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
              >
                <!-- 供水类型 -->
                <td class="p-1 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="text"
                    v-model="row.type"
                    placeholder="例: 城镇居民生活"
                    class="w-full h-7 px-2 bg-white border border-[#dce6f5] rounded text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                  <span v-else class="text-slate-800 px-1">{{ row.type }}</span>
                </td>
                <!-- 人均定额 -->
                <td class="p-1 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.quota"
                    class="w-full h-7 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                  <span v-else class="font-mono text-slate-800">{{ Number(row.quota || 0).toFixed(2) }}</span>
                </td>
                <!-- 供水人口 -->
                <td class="p-1 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="1"
                    v-model.number="row.population"
                    class="w-full h-7 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                  <span v-else class="font-mono text-slate-800">{{ row.population }}</span>
                </td>
                <!-- 地表水 -->
                <td class="p-1 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.surfaceWater"
                    class="w-full h-7 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                  <span v-else class="font-mono text-slate-800">{{ Number(row.surfaceWater || 0).toFixed(2) }}</span>
                </td>
                <!-- 地下水 -->
                <td class="p-1 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.groundwater"
                    class="w-full h-7 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                  <span v-else class="font-mono text-slate-800">{{ Number(row.groundwater || 0).toFixed(2) }}</span>
                </td>
                <!-- 行总计 -->
                <td class="px-2 py-1 font-mono font-semibold text-slate-800 text-center border-r border-b border-[#b8cde6]">
                  {{ ((Number(row.surfaceWater) || 0) + (Number(row.groundwater) || 0)).toFixed(2) }}
                </td>
                <!-- 删除操作 -->
                <td v-if="!readonly" class="p-1 text-center border-b border-[#b8cde6]">
                  <button
                    type="button"
                    @click="deleteLivingRow(idx)"
                    :disabled="formData.livingWaterRows.length <= 1"
                    class="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition disabled:opacity-30 disabled:cursor-not-allowed"
                    title="删除行"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>

              <!-- 合计行 -->
              <tr class="bg-[#f0f5fc] font-semibold divide-x divide-[#b8cde6] text-center text-slate-800 border-b border-[#b8cde6]">
                <td class="px-2 py-2 border-r border-[#b8cde6]">合计</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="px-2 py-2 font-mono border-r border-[#b8cde6]">{{ (livingSurfaceTotal ?? 0).toFixed(2) }}</td>
                <td class="px-2 py-2 font-mono border-r border-[#b8cde6]">{{ (livingGroundTotal ?? 0).toFixed(2) }}</td>
                <td class="px-2 py-2 font-mono text-slate-800 font-bold border-r border-[#b8cde6]">{{ ((livingSurfaceTotal || 0) + (livingGroundTotal || 0)).toFixed(2) }}</td>
                <td v-if="!readonly"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!readonly" class="pt-0.5">
          <button
            type="button"
            @click="addLivingRow"
            class="text-[#1677ff] hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer text-xs"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>添加生活用水行</span>
          </button>
        </div>
      </div>

      <!-- ================= 2. 工业用水核定 ================= -->
      <div
        v-show="activeCategory === 'all' || activeCategory === 'industry'"
        class="space-y-2 pt-1"
        :class="{ 'border-t border-slate-100 pt-3': activeCategory === 'all' }"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-3 bg-emerald-500 rounded-full"></span>
            <span class="text-xs font-semibold text-slate-800">工业用水核定</span>
          </div>
        </div>

        <div class="overflow-x-auto custom-scrollbar border border-[#b8cde6] rounded-md bg-white shadow-2xs">
          <table class="w-full text-xs text-left border-collapse min-w-[720px]">
            <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6] text-center text-[11px]">
              <tr class="divide-x divide-[#b8cde6]">
                <th rowspan="2" class="px-1.5 py-1.5 min-w-[75px] border-r border-b border-[#b8cde6] text-slate-800 font-semibold">主要产品</th>
                <th rowspan="2" class="px-1.5 py-1.5 min-w-[65px] border-r border-b border-[#b8cde6] text-slate-800 font-semibold">定额</th>
                <th rowspan="2" class="px-1.5 py-1.5 min-w-[60px] border-r border-b border-[#b8cde6] text-slate-800 font-semibold">年产量</th>
                <th rowspan="2" class="px-1.5 py-1.5 min-w-[60px] border-r border-b border-[#b8cde6] text-slate-800 font-semibold">产品水量</th>
                <th rowspan="2" class="px-1.5 py-1.5 min-w-[60px] border-r border-b border-[#b8cde6] text-slate-800 font-semibold">地表水</th>
                <th rowspan="2" class="px-1.5 py-1.5 min-w-[60px] border-r border-b border-[#b8cde6] text-slate-800 font-semibold">地下水</th>
                <th colspan="5" class="px-2 py-1 border-b border-[#b8cde6] bg-[#dbe8fa] text-slate-800 font-semibold">非常规水配置</th>
                <th rowspan="2" class="px-1.5 py-1.5 min-w-[65px] font-semibold text-slate-800 border-r border-b border-[#b8cde6]">常规总计</th>
                <th v-if="!readonly" rowspan="2" class="px-1 py-1.5 w-9 text-slate-600 font-semibold border-b border-[#b8cde6]">操作</th>
              </tr>
              <tr class="divide-x divide-[#b8cde6] text-[10px]">
                <th class="px-1 py-1 min-w-[45px] border-r border-b border-[#b8cde6] text-slate-800">再生水</th>
                <th class="px-1 py-1 min-w-[45px] border-r border-b border-[#b8cde6] text-slate-800">雨水</th>
                <th class="px-1 py-1 min-w-[45px] border-r border-b border-[#b8cde6] text-slate-800">矿井水</th>
                <th class="px-1 py-1 min-w-[45px] border-r border-b border-[#b8cde6] text-slate-800">微咸水</th>
                <th class="px-1 py-1 font-semibold min-w-[55px] border-r border-b border-[#b8cde6] text-slate-800">非常规计</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#b8cde6] text-center font-mono text-[11.5px] bg-white">
              <tr
                v-for="(row, idx) in formData.industryWaterRows"
                :key="idx"
                class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
              >
                <!-- 主要产品 -->
                <td class="p-0.5 font-sans border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="text"
                    v-model="row.productName"
                    placeholder="产品名称"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.productName }}</span>
                </td>
                <!-- 产品定额 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.quota"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.quota || 0).toFixed(2) }}</span>
                </td>
                <!-- 年产量 -->
                <td class="p-0.5 font-sans border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="text"
                    v-model="row.output"
                    placeholder="产量"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.output }}</span>
                </td>
                <!-- 产品水量 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="text"
                    v-model="row.productVolume"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.productVolume }}</span>
                </td>
                <!-- 地表水 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.surfaceWater"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.surfaceWater || 0).toFixed(2) }}</span>
                </td>
                <!-- 地下水 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.groundwater"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.groundwater || 0).toFixed(2) }}</span>
                </td>
                <!-- 再生水 -->
                <td class="p-0.5 bg-blue-50/20 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.recycledWater"
                    class="w-full h-6.5 px-0.5 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.recycledWater || 0).toFixed(2) }}</span>
                </td>
                <!-- 雨水 -->
                <td class="p-0.5 bg-blue-50/20 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.rainWater"
                    class="w-full h-6.5 px-0.5 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.rainWater || 0).toFixed(2) }}</span>
                </td>
                <!-- 矿井水 -->
                <td class="p-0.5 bg-blue-50/20 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.mineWater"
                    class="w-full h-6.5 px-0.5 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.mineWater || 0).toFixed(2) }}</span>
                </td>
                <!-- 微咸水 -->
                <td class="p-0.5 bg-blue-50/20 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.brackishWater"
                    class="w-full h-6.5 px-0.5 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.brackishWater || 0).toFixed(2) }}</span>
                </td>
                <!-- 非常规计 -->
                <td class="px-1 font-semibold text-slate-800 border-r border-b border-[#b8cde6]">
                  {{
                    (
                      (Number(row.recycledWater) || 0) +
                      (Number(row.rainWater) || 0) +
                      (Number(row.mineWater) || 0) +
                      (Number(row.brackishWater) || 0)
                    ).toFixed(2)
                  }}
                </td>
                <!-- 常规水总计 -->
                <td class="px-1 font-semibold text-slate-800 border-r border-b border-[#b8cde6]">
                  {{ ((Number(row.surfaceWater) || 0) + (Number(row.groundwater) || 0)).toFixed(2) }}
                </td>
                <!-- 删除操作 -->
                <td v-if="!readonly" class="p-0.5 text-center border-b border-[#b8cde6]">
                  <button
                    type="button"
                    @click="deleteIndustryRow(idx)"
                    :disabled="formData.industryWaterRows.length <= 1"
                    class="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition disabled:opacity-30 disabled:cursor-not-allowed"
                    title="删除行"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>

              <!-- 工业合计行 -->
              <tr class="bg-[#f0f5fc] font-semibold divide-x divide-[#b8cde6] text-center text-slate-800 border-b border-[#b8cde6]">
                <td class="px-2 py-2 border-r border-[#b8cde6]">合计</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (industrySurfaceTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (industryGroundTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1 py-2 font-mono text-slate-800 border-r border-[#b8cde6]">{{ (industryRecycledTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1 py-2 font-mono text-slate-800 border-r border-[#b8cde6]">{{ (industryRainTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1 py-2 font-mono text-slate-800 border-r border-[#b8cde6]">{{ (industryMineTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1 py-2 font-mono text-slate-800 border-r border-[#b8cde6]">{{ (industryBrackishTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1 py-2 font-mono text-slate-800 font-bold border-r border-[#b8cde6]">{{ (industryUnconventionalTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1 py-2 font-mono text-slate-800 font-bold border-r border-[#b8cde6]">
                  {{ ((industrySurfaceTotal || 0) + (industryGroundTotal || 0)).toFixed(2) }}
                </td>
                <td v-if="!readonly"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!readonly" class="pt-0.5">
          <button
            type="button"
            @click="addIndustryRow"
            class="text-[#1677ff] hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer text-xs"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>添加工业用水行</span>
          </button>
        </div>
      </div>

      <!-- ================= 3. 农业用水核定 ================= -->
      <div
        v-show="activeCategory === 'all' || activeCategory === 'agriculture'"
        class="space-y-2 pt-1"
        :class="{ 'border-t border-slate-100 pt-3': activeCategory === 'all' }"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-3 bg-amber-500 rounded-full"></span>
            <span class="text-xs font-semibold text-slate-800">农业用水核定</span>
          </div>
        </div>

        <div class="overflow-x-auto custom-scrollbar border border-[#b8cde6] rounded-md bg-white shadow-2xs">
          <table class="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6] text-center text-[11px]">
              <tr class="divide-x divide-[#b8cde6]">
                <th class="py-2 px-2 min-w-[90px] border-r border-b border-[#b8cde6]">实际灌溉面积</th>
                <th class="py-2 px-2 min-w-[75px] border-r border-b border-[#b8cde6]">年灌溉次数</th>
                <th class="py-2 px-2 min-w-[80px] border-r border-b border-[#b8cde6]">定额</th>
                <th class="py-2 px-2 min-w-[85px] border-r border-b border-[#b8cde6]">主要作物</th>
                <th class="py-2 px-2 min-w-[80px] border-r border-b border-[#b8cde6]">灌溉方式</th>
                <th class="py-2 px-2 min-w-[70px] border-r border-b border-[#b8cde6]">地表水</th>
                <th class="py-2 px-2 min-w-[70px] border-r border-b border-[#b8cde6]">地下水</th>
                <th class="py-2 px-2 min-w-[75px] font-semibold text-slate-800 border-r border-b border-[#b8cde6]">总计</th>
                <th v-if="!readonly" class="py-2 px-1 w-9 text-slate-600 font-semibold border-b border-[#b8cde6]">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#b8cde6] text-center font-mono text-[11.5px] bg-white">
              <tr
                v-for="(row, idx) in formData.agricultureWaterRows"
                :key="idx"
                class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
              >
                <!-- 灌溉面积 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.area"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.area }}</span>
                </td>
                <!-- 灌溉次数 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="1"
                    v-model.number="row.times"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.times }}</span>
                </td>
                <!-- 定额 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.quota"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.quota }}</span>
                </td>
                <!-- 主要作物 -->
                <td class="p-0.5 font-sans border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="text"
                    v-model="row.crops"
                    placeholder="例: 小麦"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.crops }}</span>
                </td>
                <!-- 灌溉方式 -->
                <td class="p-0.5 font-sans border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="text"
                    v-model="row.method"
                    placeholder="喷灌/滴灌"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.method }}</span>
                </td>
                <!-- 地表水 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.surfaceWater"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.surfaceWater || 0).toFixed(2) }}</span>
                </td>
                <!-- 地下水 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.groundwater"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.groundwater || 0).toFixed(2) }}</span>
                </td>
                <!-- 农业单项总计 -->
                <td class="px-2 py-1 font-semibold text-slate-800 border-r border-b border-[#b8cde6]">
                  {{ ((Number(row.surfaceWater) || 0) + (Number(row.groundwater) || 0)).toFixed(2) }}
                </td>
                <!-- 删除操作 -->
                <td v-if="!readonly" class="p-0.5 text-center border-b border-[#b8cde6]">
                  <button
                    type="button"
                    @click="deleteAgricultureRow(idx)"
                    :disabled="formData.agricultureWaterRows.length <= 1"
                    class="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition disabled:opacity-30 disabled:cursor-not-allowed"
                    title="删除行"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>

              <!-- 农业合计行 -->
              <tr class="bg-[#f0f5fc] font-semibold divide-x divide-[#b8cde6] text-center text-slate-800 border-b border-[#b8cde6]">
                <td class="px-2 py-2 font-mono border-r border-[#b8cde6]">{{ (agriAreaTotal ?? 0).toFixed(2) }}</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (agriSurfaceTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (agriGroundTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono text-slate-800 font-bold border-r border-[#b8cde6]">
                  {{ ((agriSurfaceTotal || 0) + (agriGroundTotal || 0)).toFixed(2) }}
                </td>
                <td v-if="!readonly"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!readonly" class="pt-0.5">
          <button
            type="button"
            @click="addAgricultureRow"
            class="text-[#1677ff] hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer text-xs"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>添加农业用水行</span>
          </button>
        </div>
      </div>

      <!-- ================= 4. 发电用水核定 ================= -->
      <div
        v-show="activeCategory === 'all' || activeCategory === 'power'"
        class="space-y-2 pt-1"
        :class="{ 'border-t border-slate-100 pt-3': activeCategory === 'all' }"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-3 bg-indigo-500 rounded-full"></span>
            <span class="text-xs font-semibold text-slate-800">发电用水核定</span>
          </div>
        </div>

        <div class="overflow-x-auto custom-scrollbar border border-[#b8cde6] rounded-md bg-white shadow-2xs">
          <table class="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6] text-center text-[11px]">
              <tr class="divide-x divide-[#b8cde6]">
                <th class="py-2 px-2 min-w-[70px] border-r border-b border-[#b8cde6]">机组台数</th>
                <th class="py-2 px-2 min-w-[80px] border-r border-b border-[#b8cde6]">装机容量</th>
                <th class="py-2 px-2 min-w-[80px] border-r border-b border-[#b8cde6]">年发电量</th>
                <th class="py-2 px-2 min-w-[80px] border-r border-b border-[#b8cde6]">利用小时</th>
                <th class="py-2 px-2 min-w-[75px] border-r border-b border-[#b8cde6]">地表水</th>
                <th class="py-2 px-2 min-w-[75px] border-r border-b border-[#b8cde6]">地下水</th>
                <th class="py-2 px-2 min-w-[75px] font-semibold text-slate-800 border-r border-b border-[#b8cde6]">总计</th>
                <th v-if="!readonly" class="py-2 px-1 w-9 text-slate-600 font-semibold border-b border-[#b8cde6]">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#b8cde6] text-center font-mono text-[11.5px] bg-white">
              <tr
                v-for="(row, idx) in formData.powerWaterRows"
                :key="idx"
                class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
              >
                <!-- 机组台数 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="1"
                    v-model.number="row.units"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.units }}台</span>
                </td>
                <!-- 容量 -->
                <td class="p-0.5 font-sans border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="text"
                    v-model="row.capacity"
                    placeholder="例: 600MW"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.capacity }}</span>
                </td>
                <!-- 年发电量 -->
                <td class="p-0.5 font-sans border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="text"
                    v-model="row.generation"
                    placeholder="例: 35.4亿"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.generation }}</span>
                </td>
                <!-- 利用小时 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="1"
                    v-model.number="row.hours"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.hours }}h</span>
                </td>
                <!-- 地表水 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.surfaceWater"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.surfaceWater || 0).toFixed(2) }}</span>
                </td>
                <!-- 地下水 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.groundwater"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.groundwater || 0).toFixed(2) }}</span>
                </td>
                <!-- 发电单项总计 -->
                <td class="px-2 py-1 font-semibold text-slate-800 border-r border-b border-[#b8cde6]">
                  {{ ((Number(row.surfaceWater) || 0) + (Number(row.groundwater) || 0)).toFixed(2) }}
                </td>
                <!-- 删除操作 -->
                <td v-if="!readonly" class="p-0.5 text-center border-b border-[#b8cde6]">
                  <button
                    type="button"
                    @click="deletePowerRow(idx)"
                    :disabled="formData.powerWaterRows.length <= 1"
                    class="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition disabled:opacity-30 disabled:cursor-not-allowed"
                    title="删除行"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>

              <!-- 发电合计行 -->
              <tr class="bg-[#f0f5fc] font-semibold divide-x divide-[#b8cde6] text-center text-slate-800 border-b border-[#b8cde6]">
                <td class="px-2 py-2 border-r border-[#b8cde6]">-</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (powerSurfaceTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (powerGroundTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono text-slate-800 font-bold border-r border-[#b8cde6]">
                  {{ ((powerSurfaceTotal || 0) + (powerGroundTotal || 0)).toFixed(2) }}
                </td>
                <td v-if="!readonly"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!readonly" class="pt-0.5">
          <button
            type="button"
            @click="addPowerRow"
            class="text-[#1677ff] hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer text-xs"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>添加发电用水行</span>
          </button>
        </div>
      </div>

      <!-- ================= 5. 总结表（1至12月用水量汇总表） ================= -->
      <div
        v-show="activeCategory === 'all' || activeCategory === 'summary'"
        class="space-y-2 pt-1"
        :class="{ 'border-t border-slate-100 pt-3': activeCategory === 'all' }"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-3 bg-[#1677ff] rounded-full"></span>
            <span class="text-xs font-semibold text-slate-800">用水总结表（1至12月）</span>
          </div>
          <div v-if="!readonly" class="flex items-center gap-2">
            <button
              type="button"
              @click="autoDistributeByAnnual"
              class="text-[11px] text-[#1677ff] hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-2 py-0.5 rounded border border-blue-200 inline-flex items-center gap-1 cursor-pointer transition"
              title="根据上方各分项年核定总量按12个月均衡拆分填入"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              <span>按各分项年总量均衡拆分</span>
            </button>
          </div>
        </div>

        <div class="overflow-x-auto custom-scrollbar border border-[#b8cde6] rounded-md bg-white shadow-2xs">
          <table class="w-full text-xs text-center border-collapse min-w-[760px]">
            <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6]">
              <tr class="divide-x divide-[#b8cde6]">
                <th rowspan="2" class="py-2 px-2 w-14 min-w-[52px] border-r border-[#b8cde6]">月份</th>
                <th rowspan="2" class="py-2 px-2 min-w-[75px] border-r border-[#b8cde6]">地表水</th>
                <th rowspan="2" class="py-2 px-2 min-w-[75px] border-r border-[#b8cde6]">地下水</th>
                <th colspan="5" class="py-1 px-2 border-b border-r border-[#b8cde6]">非常规水</th>
                <th rowspan="2" class="py-2 px-2 min-w-[80px] font-semibold text-slate-800">总计</th>
              </tr>
              <tr class="divide-x divide-[#b8cde6] text-[11px]">
                <th class="py-1 px-1.5 min-w-[65px] border-r border-[#b8cde6]">再生水</th>
                <th class="py-1 px-1.5 min-w-[65px] border-r border-[#b8cde6]">雨水</th>
                <th class="py-1 px-1.5 min-w-[65px] border-r border-[#b8cde6]">矿井水</th>
                <th class="py-1 px-1.5 min-w-[65px] border-r border-[#b8cde6]">微咸水</th>
                <th class="py-1 px-1.5 min-w-[70px] font-semibold border-r border-[#b8cde6] text-slate-800">非常规计</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#b8cde6] text-center font-mono text-[11.5px] bg-white">
              <tr
                v-for="(row, idx) in formData.monthlySummaryRows"
                :key="idx"
                class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
              >
                <!-- 月份 -->
                <td class="py-1.5 px-2 font-sans font-medium text-slate-800 border-r border-b border-[#b8cde6] bg-slate-50/50">
                  {{ row.month }}
                </td>

                <!-- 地表水 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.surfaceWater"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.surfaceWater || 0).toFixed(2) }}</span>
                </td>

                <!-- 地下水 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.groundwater"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.groundwater || 0).toFixed(2) }}</span>
                </td>

                <!-- 非常规水: 再生水 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.recycledWater"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.recycledWater || 0).toFixed(2) }}</span>
                </td>

                <!-- 非常规水: 雨水 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.rainWater"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.rainWater || 0).toFixed(2) }}</span>
                </td>

                <!-- 非常规水: 矿井水 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.mineWater"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.mineWater || 0).toFixed(2) }}</span>
                </td>

                <!-- 非常规水: 微咸水 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.01"
                    v-model.number="row.brackishWater"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ Number(row.brackishWater || 0).toFixed(2) }}</span>
                </td>

                <!-- 非常规计 -->
                <td class="px-2 py-1 font-semibold text-slate-800 border-r border-b border-[#b8cde6]">
                  {{ ((Number(row.recycledWater) || 0) + (Number(row.rainWater) || 0) + (Number(row.mineWater) || 0) + (Number(row.brackishWater) || 0)).toFixed(2) }}
                </td>

                <!-- 月度总计 -->
                <td class="px-2 py-1 font-bold text-slate-800 border-b border-[#b8cde6]">
                  {{ ((Number(row.surfaceWater) || 0) + (Number(row.groundwater) || 0) + (Number(row.recycledWater) || 0) + (Number(row.rainWater) || 0) + (Number(row.mineWater) || 0) + (Number(row.brackishWater) || 0)).toFixed(2) }}
                </td>
              </tr>

              <!-- 总结表最后一行：合计 -->
              <tr class="bg-[#f0f5fc] font-semibold divide-x divide-[#b8cde6] text-center text-slate-800 border-b border-[#b8cde6]">
                <td class="px-2 py-2 font-sans text-slate-800 border-r border-[#b8cde6]">合计</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (summarySurfaceTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (summaryGroundTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (summaryRecycledTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (summaryRainTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (summaryMineTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (summaryBrackishTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono text-slate-800 font-bold border-r border-[#b8cde6]">{{ (summaryUnconventionalTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono text-slate-800 font-bold">{{ (summaryGrandTotal ?? 0).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type {
  FormQuotaData,
  LivingWaterRow,
  IndustryWaterRow,
  AgricultureWaterRow,
  PowerWaterRow,
  MonthlySummaryRow
} from '../../../types';

defineOptions({
  name: 'WaterQuotaAuditForm'
});

const props = withDefaults(
  defineProps<{
    title: string;
    badgeText?: string;
    theme?: 'amber' | 'blue';
    modelValue: FormQuotaData;
    readonly?: boolean;
    defaultExpanded?: boolean;
  }>(),
  {
    badgeText: '',
    theme: 'blue',
    readonly: false,
    defaultExpanded: true
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: FormQuotaData): void;
}>();

const activeCategory = ref<'all' | 'living' | 'industry' | 'agriculture' | 'power' | 'summary'>('all');

const formData = computed(() => {
  return props.modelValue || {
    livingWaterRows: [],
    industryWaterRows: [],
    agricultureWaterRows: [],
    powerWaterRows: []
  };
});

// 生活用水合计计算
const livingSurfaceTotal = computed(() => {
  return (formData.value.livingWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.surfaceWater) || 0),
    0
  );
});

const livingGroundTotal = computed(() => {
  return (formData.value.livingWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.groundwater) || 0),
    0
  );
});

// 工业用水合计计算
const industrySurfaceTotal = computed(() => {
  return (formData.value.industryWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.surfaceWater) || 0),
    0
  );
});

const industryGroundTotal = computed(() => {
  return (formData.value.industryWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.groundwater) || 0),
    0
  );
});

const industryRecycledTotal = computed(() => {
  return (formData.value.industryWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.recycledWater) || 0),
    0
  );
});

const industryRainTotal = computed(() => {
  return (formData.value.industryWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.rainWater) || 0),
    0
  );
});

const industryMineTotal = computed(() => {
  return (formData.value.industryWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.mineWater) || 0),
    0
  );
});

const industryBrackishTotal = computed(() => {
  return (formData.value.industryWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.brackishWater) || 0),
    0
  );
});

const industryUnconventionalTotal = computed(() => {
  return (
    industryRecycledTotal.value +
    industryRainTotal.value +
    industryMineTotal.value +
    industryBrackishTotal.value
  );
});

// 农业用水合计计算
const agriAreaTotal = computed(() => {
  return (formData.value.agricultureWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.area) || 0),
    0
  );
});

const agriSurfaceTotal = computed(() => {
  return (formData.value.agricultureWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.surfaceWater) || 0),
    0
  );
});

const agriGroundTotal = computed(() => {
  return (formData.value.agricultureWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.groundwater) || 0),
    0
  );
});

// 发电用水合计计算
const powerSurfaceTotal = computed(() => {
  return (formData.value.powerWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.surfaceWater) || 0),
    0
  );
});

const powerGroundTotal = computed(() => {
  return (formData.value.powerWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.groundwater) || 0),
    0
  );
});

// 全表综合取用水量计算 (生活常规 + 工业常规 + 农业常规 + 发电常规)
const totalVolume = computed(() => {
  const living = livingSurfaceTotal.value + livingGroundTotal.value;
  const industry = industrySurfaceTotal.value + industryGroundTotal.value;
  const agriculture = agriSurfaceTotal.value + agriGroundTotal.value;
  const power = powerSurfaceTotal.value + powerGroundTotal.value;
  return living + industry + agriculture + power;
});

// 总结表（1至12月）各列垂直加总计算
const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

// 确保 monthlySummaryRows 至少有完整的12个月
if (!formData.value.monthlySummaryRows || formData.value.monthlySummaryRows.length === 0) {
  formData.value.monthlySummaryRows = MONTH_NAMES.map((month) => ({
    month,
    surfaceWater: 0,
    groundwater: 0,
    recycledWater: 0,
    rainWater: 0,
    mineWater: 0,
    brackishWater: 0
  }));
}

const summarySurfaceTotal = computed(() => {
  return (formData.value.monthlySummaryRows || []).reduce(
    (acc, r) => acc + (Number(r.surfaceWater) || 0),
    0
  );
});

const summaryGroundTotal = computed(() => {
  return (formData.value.monthlySummaryRows || []).reduce(
    (acc, r) => acc + (Number(r.groundwater) || 0),
    0
  );
});

const summaryRecycledTotal = computed(() => {
  return (formData.value.monthlySummaryRows || []).reduce(
    (acc, r) => acc + (Number(r.recycledWater) || 0),
    0
  );
});

const summaryRainTotal = computed(() => {
  return (formData.value.monthlySummaryRows || []).reduce(
    (acc, r) => acc + (Number(r.rainWater) || 0),
    0
  );
});

const summaryMineTotal = computed(() => {
  return (formData.value.monthlySummaryRows || []).reduce(
    (acc, r) => acc + (Number(r.mineWater) || 0),
    0
  );
});

const summaryBrackishTotal = computed(() => {
  return (formData.value.monthlySummaryRows || []).reduce(
    (acc, r) => acc + (Number(r.brackishWater) || 0),
    0
  );
});

const summaryUnconventionalTotal = computed(() => {
  return (
    summaryRecycledTotal.value +
    summaryRainTotal.value +
    summaryMineTotal.value +
    summaryBrackishTotal.value
  );
});

const summaryGrandTotal = computed(() => {
  return (
    summarySurfaceTotal.value +
    summaryGroundTotal.value +
    summaryUnconventionalTotal.value
  );
});

// 分类快捷 Tab 列表
const categoryList = computed(() => [
  { key: 'all' as const, label: '全部核定项', total: (totalVolume.value ?? 0).toFixed(2) },
  { key: 'living' as const, label: '生活用水', total: ((livingSurfaceTotal.value || 0) + (livingGroundTotal.value || 0)).toFixed(2) },
  { key: 'industry' as const, label: '工业用水', total: ((industrySurfaceTotal.value || 0) + (industryGroundTotal.value || 0) + (industryUnconventionalTotal.value || 0)).toFixed(2) },
  { key: 'agriculture' as const, label: '农业用水', total: ((agriSurfaceTotal.value || 0) + (agriGroundTotal.value || 0)).toFixed(2) },
  { key: 'power' as const, label: '发电用水', total: ((powerSurfaceTotal.value || 0) + (powerGroundTotal.value || 0)).toFixed(2) },
  { key: 'summary' as const, label: '总结表', total: (summaryGrandTotal.value ?? 0).toFixed(2) },
]);

// 快捷操作：根据分项年核定指标，按12个月均摊拆分至总结表
const autoDistributeByAnnual = () => {
  const totalSurf = livingSurfaceTotal.value + industrySurfaceTotal.value + agriSurfaceTotal.value + powerSurfaceTotal.value;
  const totalGrd = livingGroundTotal.value + industryGroundTotal.value + agriGroundTotal.value + powerGroundTotal.value;
  const totalRec = industryRecycledTotal.value;
  const totalRain = industryRainTotal.value;
  const totalMine = industryMineTotal.value;
  const totalBrk = industryBrackishTotal.value;

  if (!formData.value.monthlySummaryRows || formData.value.monthlySummaryRows.length < 12) {
    formData.value.monthlySummaryRows = MONTH_NAMES.map((month) => ({
      month,
      surfaceWater: 0,
      groundwater: 0,
      recycledWater: 0,
      rainWater: 0,
      mineWater: 0,
      brackishWater: 0
    }));
  }

  formData.value.monthlySummaryRows.forEach((row, idx) => {
    const isLast = idx === 11;
    const avgSurf = Number((totalSurf / 12).toFixed(2));
    const avgGrd = Number((totalGrd / 12).toFixed(2));
    const avgRec = Number((totalRec / 12).toFixed(2));
    const avgRain = Number((totalRain / 12).toFixed(2));
    const avgMine = Number((totalMine / 12).toFixed(2));
    const avgBrk = Number((totalBrk / 12).toFixed(2));

    if (!isLast) {
      row.surfaceWater = avgSurf;
      row.groundwater = avgGrd;
      row.recycledWater = avgRec;
      row.rainWater = avgRain;
      row.mineWater = avgMine;
      row.brackishWater = avgBrk;
    } else {
      row.surfaceWater = Number((totalSurf - avgSurf * 11).toFixed(2));
      row.groundwater = Number((totalGrd - avgGrd * 11).toFixed(2));
      row.recycledWater = Number((totalRec - avgRec * 11).toFixed(2));
      row.rainWater = Number((totalRain - avgRain * 11).toFixed(2));
      row.mineWater = Number((totalMine - avgMine * 11).toFixed(2));
      row.brackishWater = Number((totalBrk - avgBrk * 11).toFixed(2));
    }
  });
  emit('update:modelValue', formData.value);
};

// 操作：生活用水行操作
const addLivingRow = () => {
  formData.value.livingWaterRows.push({
    type: '综合生活用水',
    quota: 30.0,
    population: 100,
    surfaceWater: 0.0,
    groundwater: 0.0
  });
  emit('update:modelValue', formData.value);
};

const deleteLivingRow = (idx: number) => {
  if (formData.value.livingWaterRows.length > 1) {
    formData.value.livingWaterRows.splice(idx, 1);
    emit('update:modelValue', formData.value);
  }
};

// 操作：工业用水行操作
const addIndustryRow = () => {
  formData.value.industryWaterRows.push({
    productName: '',
    quota: 0.0,
    output: '',
    productVolume: '',
    surfaceWater: 0.0,
    groundwater: 0.0,
    recycledWater: 0.0,
    rainWater: 0.0,
    mineWater: 0.0,
    brackishWater: 0.0
  });
  emit('update:modelValue', formData.value);
};

const deleteIndustryRow = (idx: number) => {
  if (formData.value.industryWaterRows.length > 1) {
    formData.value.industryWaterRows.splice(idx, 1);
    emit('update:modelValue', formData.value);
  }
};

// 操作：农业用水行操作
const addAgricultureRow = () => {
  formData.value.agricultureWaterRows.push({
    area: 5000.0,
    times: 3,
    quota: 90,
    crops: '耐旱农作物',
    method: '喷灌/滴灌',
    surfaceWater: 0.0,
    groundwater: 0.0
  });
  emit('update:modelValue', formData.value);
};

const deleteAgricultureRow = (idx: number) => {
  if (formData.value.agricultureWaterRows.length > 1) {
    formData.value.agricultureWaterRows.splice(idx, 1);
    emit('update:modelValue', formData.value);
  }
};

// 操作：发电用水行操作
const addPowerRow = () => {
  formData.value.powerWaterRows.push({
    units: 1,
    capacity: '300MW',
    generation: '15亿',
    hours: 5000,
    surfaceWater: 0.0,
    groundwater: 0.0,
    hydroMinFlow: 0.0,
    thermalMaxHourly: 80.0
  });
  emit('update:modelValue', formData.value);
};

const deletePowerRow = (idx: number) => {
  if (formData.value.powerWaterRows.length > 1) {
    formData.value.powerWaterRows.splice(idx, 1);
    emit('update:modelValue', formData.value);
  }
};

defineExpose({
  livingSurfaceTotal,
  livingGroundTotal,
  industrySurfaceTotal,
  industryGroundTotal,
  industryUnconventionalTotal,
  agriSurfaceTotal,
  agriGroundTotal,
  powerSurfaceTotal,
  powerGroundTotal,
  totalVolume,
  summarySurfaceTotal,
  summaryGroundTotal,
  summaryRecycledTotal,
  summaryRainTotal,
  summaryMineTotal,
  summaryBrackishTotal,
  summaryUnconventionalTotal,
  summaryGrandTotal
});
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
