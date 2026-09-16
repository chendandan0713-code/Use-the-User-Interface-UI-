<template>
  <div class="bg-white rounded-lg border border-slate-200/90 shadow-2xs">
    <!-- 顶部吸顶固定展示区：表单切换栏(如果有)、表单名称栏、用水类型勾选栏 (向上滑动时顶部固定展示) -->
    <div
      class="sticky top-0 z-20 bg-white border-b border-slate-200/90 p-3 pb-2.5 space-y-2 rounded-t-lg shadow-2xs"
    >
      <!-- 1. 表单切换栏 (由外部传入，若有) -->
      <div v-if="$slots.tabs">
        <slot name="tabs"></slot>
      </div>

      <!-- 2. 表单名称栏 (表单顶部名称摘要与右侧核定总计) -->
      <div class="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-3.5 bg-[#1677ff] rounded-full"></span>
          <h4 class="text-[13px] font-bold text-slate-800 tracking-tight">
            {{ title }}
          </h4>
          <span v-if="badgeText" class="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-200">
            {{ badgeText }}
          </span>
        </div>

        <!-- 右侧核定总计（增加地表、地下、非常规、总计四个，单位展示一个） -->
        <div class="flex items-center gap-1.5 font-mono text-xs text-slate-600 shrink-0 flex-wrap justify-end">
          <span class="text-slate-400 font-sans text-[11px]">核定总计:</span>
          <span class="text-slate-500 font-sans text-[11px]">地表</span>
          <strong class="font-semibold text-slate-800">{{ allSurfaceTotal.toFixed(2) }}</strong>
          <span class="text-slate-300">/</span>
          <span class="text-slate-500 font-sans text-[11px]">地下</span>
          <strong class="font-semibold text-slate-800">{{ allGroundTotal.toFixed(2) }}</strong>
          <span class="text-slate-300">/</span>
          <span class="text-slate-500 font-sans text-[11px]">非常规</span>
          <strong class="font-semibold text-slate-800">{{ allUnconventionalTotal.toFixed(2) }}</strong>
          <span class="text-slate-300">/</span>
          <span class="text-slate-700 font-sans font-medium text-[11px]">总计</span>
          <strong class="text-sm font-bold text-[#1677ff]">{{ grandTotalVolume.toFixed(2) }}</strong>
          <span class="text-slate-400 text-[11px] font-sans">万m³</span>
        </div>
      </div>

      <!-- 3. 用水类型勾选栏（生活用水、工业用水、农业用水、牲畜饲养用水、发电用水、服务业用水六个，前面带复选框，勾选表示必填） -->
      <div class="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-200/80 overflow-x-auto custom-scrollbar">
        <div
          v-for="cat in categoryList"
          :key="cat.key"
          @click="activeCategory = cat.key"
          class="px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-2 whitespace-nowrap border select-none"
          :class="[
            activeCategory === cat.key
              ? 'bg-white text-[#1677ff] font-semibold border-blue-300 shadow-xs ring-1 ring-blue-100'
              : 'bg-white/70 text-slate-600 hover:text-slate-900 hover:bg-white border-slate-200/60'
          ]"
        >
          <!-- 复选框：勾选表示一定要填写内容 -->
          <label class="flex items-center gap-1 cursor-pointer" @click.stop>
            <input
              type="checkbox"
              :checked="isCategoryRequired(cat.key)"
              :disabled="readonly"
              @change="toggleCategoryRequired(cat.key)"
              class="w-3.5 h-3.5 rounded border-slate-300 text-[#1677ff] focus:ring-blue-200 cursor-pointer accent-[#1677ff]"
              title="勾选表示一定要填写内容"
            />
          </label>
          <span class="flex items-center gap-0.5">
            <span>{{ cat.label }}</span>
            <span
              v-if="isCategoryRequired(cat.key)"
              class="text-[11px] text-rose-500 font-bold ml-0.5"
              title="必填项目"
            >*</span>
          </span>
          <!-- 切换按钮中的数值 -->
          <span
            class="text-[10.5px] font-mono px-1 py-0.2 rounded"
            :class="activeCategory === cat.key ? 'bg-blue-50 text-[#1677ff]' : 'bg-slate-100 text-slate-500'"
          >
            {{ cat.total }}
          </span>
        </div>
      </div>
    </div>

    <!-- 4. 表单主体核定内容 (在吸顶栏下方流畅滚动) -->
    <div class="p-3.5 space-y-4">
      
      <!-- ================= 1. 生活用水核定 ================= -->
      <div
        v-show="activeCategory === 'living'"
        class="space-y-2 pt-1"
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
        v-show="activeCategory === 'industry'"
        class="space-y-2 pt-1"
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
        v-show="activeCategory === 'agriculture'"
        class="space-y-2 pt-1"
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

      <!-- ================= 4. 牲畜饲养用水核定 ================= -->
      <div
        v-show="activeCategory === 'livestock'"
        class="space-y-2 pt-1"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-3 bg-rose-500 rounded-full"></span>
            <span class="text-xs font-semibold text-slate-800">牲畜饲养用水核定</span>
          </div>
        </div>

        <div class="overflow-x-auto custom-scrollbar border border-[#b8cde6] rounded-md bg-white shadow-2xs">
          <table class="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6] text-center text-[11px]">
              <tr class="divide-x divide-[#b8cde6]">
                <th class="py-2 px-2 min-w-[110px] border-r border-b border-[#b8cde6]">畜禽种类/品种</th>
                <th class="py-2 px-2 min-w-[90px] border-r border-b border-[#b8cde6]">饲养规模(头/只)</th>
                <th class="py-2 px-2 min-w-[80px] border-r border-b border-[#b8cde6]">用水定额</th>
                <th class="py-2 px-2 min-w-[70px] border-r border-b border-[#b8cde6]">饲养天数</th>
                <th class="py-2 px-2 min-w-[75px] border-r border-b border-[#b8cde6]">地表水</th>
                <th class="py-2 px-2 min-w-[75px] border-r border-b border-[#b8cde6]">地下水</th>
                <th class="py-2 px-2 min-w-[75px] font-semibold text-slate-800 border-r border-b border-[#b8cde6]">总计</th>
                <th v-if="!readonly" class="py-2 px-1 w-9 text-slate-600 font-semibold border-b border-[#b8cde6]">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#b8cde6] text-center font-mono text-[11.5px] bg-white">
              <tr
                v-for="(row, idx) in formData.livestockWaterRows"
                :key="idx"
                class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
              >
                <!-- 种类 -->
                <td class="p-0.5 font-sans border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="text"
                    v-model="row.livestockType"
                    placeholder="例: 肉牛/生猪"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.livestockType }}</span>
                </td>
                <!-- 规模 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="1"
                    v-model.number="row.count"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.count }}</span>
                </td>
                <!-- 定额 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="0.1"
                    v-model.number="row.quota"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.quota }}</span>
                </td>
                <!-- 天数 -->
                <td class="p-0.5 border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="number"
                    step="1"
                    v-model.number="row.days"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.days }}</span>
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
                <!-- 单项总计 -->
                <td class="px-2 py-1 font-semibold text-slate-800 border-r border-b border-[#b8cde6]">
                  {{ ((Number(row.surfaceWater) || 0) + (Number(row.groundwater) || 0)).toFixed(2) }}
                </td>
                <!-- 删除操作 -->
                <td v-if="!readonly" class="p-0.5 text-center border-b border-[#b8cde6]">
                  <button
                    type="button"
                    @click="deleteLivestockRow(idx)"
                    :disabled="formData.livestockWaterRows.length <= 1"
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

              <!-- 牲畜合计行 -->
              <tr class="bg-[#f0f5fc] font-semibold divide-x divide-[#b8cde6] text-center text-slate-800 border-b border-[#b8cde6]">
                <td class="px-2 py-2 font-sans border-r border-[#b8cde6]">合计</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (livestockCountTotal ?? 0).toLocaleString() }}</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (livestockSurfaceTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (livestockGroundTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono text-slate-800 font-bold border-r border-[#b8cde6]">
                  {{ ((livestockSurfaceTotal || 0) + (livestockGroundTotal || 0)).toFixed(2) }}
                </td>
                <td v-if="!readonly"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!readonly" class="pt-0.5">
          <button
            type="button"
            @click="addLivestockRow"
            class="text-[#1677ff] hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer text-xs"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>添加牲畜饲养用水行</span>
          </button>
        </div>
      </div>

      <!-- ================= 5. 发电用水核定 ================= -->
      <div
        v-show="activeCategory === 'power'"
        class="space-y-2 pt-1"
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

      <!-- ================= 6. 服务业用水核定 ================= -->
      <div
        v-show="activeCategory === 'service'"
        class="space-y-2 pt-1"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-3 bg-teal-500 rounded-full"></span>
            <span class="text-xs font-semibold text-slate-800">服务业用水核定</span>
          </div>
        </div>

        <div class="overflow-x-auto custom-scrollbar border border-[#b8cde6] rounded-md bg-white shadow-2xs">
          <table class="w-full text-xs text-left border-collapse min-w-[720px]">
            <thead class="bg-[#eaf1fb] text-slate-800 font-semibold border-b border-[#b8cde6] text-center text-[11px]">
              <tr class="divide-x divide-[#b8cde6]">
                <th class="py-2 px-2 min-w-[120px] border-r border-b border-[#b8cde6]">经营行业/类型</th>
                <th class="py-2 px-2 min-w-[100px] border-r border-b border-[#b8cde6]">营业规模/面积</th>
                <th class="py-2 px-2 min-w-[80px] border-r border-b border-[#b8cde6]">用水定额</th>
                <th class="py-2 px-2 min-w-[75px] border-r border-b border-[#b8cde6]">地表水</th>
                <th class="py-2 px-2 min-w-[75px] border-r border-b border-[#b8cde6]">地下水</th>
                <th class="py-2 px-2 min-w-[75px] border-r border-b border-[#b8cde6]">再生水/非常规</th>
                <th class="py-2 px-2 min-w-[75px] font-semibold text-slate-800 border-r border-b border-[#b8cde6]">总计</th>
                <th v-if="!readonly" class="py-2 px-1 w-9 text-slate-600 font-semibold border-b border-[#b8cde6]">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#b8cde6] text-center font-mono text-[11.5px] bg-white">
              <tr
                v-for="(row, idx) in formData.serviceWaterRows"
                :key="idx"
                class="divide-x divide-[#b8cde6] hover:bg-[#f5f8fd] transition-colors"
              >
                <!-- 行业类型 -->
                <td class="p-0.5 font-sans border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="text"
                    v-model="row.industryName"
                    placeholder="例: 宾馆餐饮/商场物业"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.industryName }}</span>
                </td>
                <!-- 规模 -->
                <td class="p-0.5 font-sans border-r border-b border-[#b8cde6]">
                  <input
                    v-if="!readonly"
                    type="text"
                    v-model="row.scale"
                    placeholder="例: 15000㎡ / 200床"
                    class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100"
                  />
                  <span v-else class="text-slate-800">{{ row.scale }}</span>
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
                <!-- 服务业单项总计 -->
                <td class="px-2 py-1 font-semibold text-slate-800 border-r border-b border-[#b8cde6]">
                  {{ ((Number(row.surfaceWater) || 0) + (Number(row.groundwater) || 0) + (Number(row.recycledWater) || 0)).toFixed(2) }}
                </td>
                <!-- 删除操作 -->
                <td v-if="!readonly" class="p-0.5 text-center border-b border-[#b8cde6]">
                  <button
                    type="button"
                    @click="deleteServiceRow(idx)"
                    :disabled="formData.serviceWaterRows.length <= 1"
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

              <!-- 服务业合计行 -->
              <tr class="bg-[#f0f5fc] font-semibold divide-x divide-[#b8cde6] text-center text-slate-800 border-b border-[#b8cde6]">
                <td class="px-2 py-2 font-sans border-r border-[#b8cde6]">合计</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="border-r border-[#b8cde6]">-</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (serviceSurfaceTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (serviceGroundTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono border-r border-[#b8cde6]">{{ (serviceRecycledTotal ?? 0).toFixed(2) }}</td>
                <td class="px-1.5 py-2 font-mono text-slate-800 font-bold border-r border-[#b8cde6]">
                  {{ ((serviceSurfaceTotal || 0) + (serviceGroundTotal || 0) + (serviceRecycledTotal || 0)).toFixed(2) }}
                </td>
                <td v-if="!readonly"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!readonly" class="pt-0.5">
          <button
            type="button"
            @click="addServiceRow"
            class="text-[#1677ff] hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer text-xs"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>添加服务业用水行</span>
          </button>
        </div>
      </div>

      <!-- ================= 7. 总结表（1至12月用水量汇总表 - 始终单独展示在下方） ================= -->
      <div
        class="space-y-2 pt-4 border-t border-slate-200"
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
  LivestockWaterRow,
  PowerWaterRow,
  ServiceWaterRow,
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

export type WaterCategoryKey = 'living' | 'industry' | 'agriculture' | 'livestock' | 'power' | 'service';

const activeCategory = ref<WaterCategoryKey>('living');

const formData = computed(() => {
  return props.modelValue || {
    livingWaterRows: [],
    industryWaterRows: [],
    agricultureWaterRows: [],
    livestockWaterRows: [],
    powerWaterRows: [],
    serviceWaterRows: []
  };
});

// 确保默认必填分类
if (!formData.value.requiredCategories) {
  formData.value.requiredCategories = ['living', 'industry'];
}

// 确保牲畜用水与服务业用水数组存在
if (!formData.value.livestockWaterRows) {
  formData.value.livestockWaterRows = [
    {
      livestockType: '肉牛/生猪',
      count: 200,
      quota: 45.0,
      days: 365,
      surfaceWater: 0.05,
      groundwater: 0.08
    }
  ];
}

if (!formData.value.serviceWaterRows) {
  formData.value.serviceWaterRows = [
    {
      industryName: '综合办公与餐饮接待',
      scale: '建筑面积 12000㎡',
      quota: 3.5,
      surfaceWater: 0.15,
      groundwater: 0.12,
      recycledWater: 0.08
    }
  ];
}

// 判断某分类是否已勾选必填
const isCategoryRequired = (key: WaterCategoryKey) => {
  return formData.value.requiredCategories?.includes(key) ?? false;
};

// 切换分类必填勾选状态
const toggleCategoryRequired = (key: WaterCategoryKey) => {
  if (props.readonly) return;
  if (!formData.value.requiredCategories) {
    formData.value.requiredCategories = [];
  }
  const idx = formData.value.requiredCategories.indexOf(key);
  if (idx >= 0) {
    formData.value.requiredCategories.splice(idx, 1);
  } else {
    formData.value.requiredCategories.push(key);
    // 勾选后自动定位查看
    activeCategory.value = key;
  }
  emit('update:modelValue', formData.value);
};

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

// 牲畜饲养用水合计计算
const livestockCountTotal = computed(() => {
  return (formData.value.livestockWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.count) || 0),
    0
  );
});

const livestockSurfaceTotal = computed(() => {
  return (formData.value.livestockWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.surfaceWater) || 0),
    0
  );
});

const livestockGroundTotal = computed(() => {
  return (formData.value.livestockWaterRows || []).reduce(
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

// 服务业用水合计计算
const serviceSurfaceTotal = computed(() => {
  return (formData.value.serviceWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.surfaceWater) || 0),
    0
  );
});

const serviceGroundTotal = computed(() => {
  return (formData.value.serviceWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.groundwater) || 0),
    0
  );
});

const serviceRecycledTotal = computed(() => {
  return (formData.value.serviceWaterRows || []).reduce(
    (acc, row) => acc + (Number(row.recycledWater) || 0),
    0
  );
});

// 全表综合常规取用水量计算 (生活 + 工业 + 农业 + 牲畜 + 发电 + 服务业常规地表/地下水)
const totalVolume = computed(() => {
  const living = livingSurfaceTotal.value + livingGroundTotal.value;
  const industry = industrySurfaceTotal.value + industryGroundTotal.value;
  const agriculture = agriSurfaceTotal.value + agriGroundTotal.value;
  const livestock = livestockSurfaceTotal.value + livestockGroundTotal.value;
  const power = powerSurfaceTotal.value + powerGroundTotal.value;
  const service = serviceSurfaceTotal.value + serviceGroundTotal.value;
  return living + industry + agriculture + livestock + power + service;
});

// 核定总计：地表水全部分类加总
const allSurfaceTotal = computed(() => {
  return (
    (livingSurfaceTotal.value || 0) +
    (industrySurfaceTotal.value || 0) +
    (agriSurfaceTotal.value || 0) +
    (livestockSurfaceTotal.value || 0) +
    (powerSurfaceTotal.value || 0) +
    (serviceSurfaceTotal.value || 0)
  );
});

// 核定总计：地下水全部分类加总
const allGroundTotal = computed(() => {
  return (
    (livingGroundTotal.value || 0) +
    (industryGroundTotal.value || 0) +
    (agriGroundTotal.value || 0) +
    (livestockGroundTotal.value || 0) +
    (powerGroundTotal.value || 0) +
    (serviceGroundTotal.value || 0)
  );
});

// 核定总计：非常规水（工业非常规 + 服务业再生水）全部分类加总
const allUnconventionalTotal = computed(() => {
  return (
    (industryUnconventionalTotal.value || 0) +
    (serviceRecycledTotal.value || 0)
  );
});

// 核定总计：全部水源总和
const grandTotalVolume = computed(() => {
  return allSurfaceTotal.value + allGroundTotal.value + allUnconventionalTotal.value;
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

// 六大分类快捷 Tab 列表（去掉全部核定项、去掉总结表）
const categoryList = computed(() => [
  {
    key: 'living' as const,
    label: '生活用水',
    total: ((livingSurfaceTotal.value || 0) + (livingGroundTotal.value || 0)).toFixed(2)
  },
  {
    key: 'industry' as const,
    label: '工业用水',
    total: ((industrySurfaceTotal.value || 0) + (industryGroundTotal.value || 0) + (industryUnconventionalTotal.value || 0)).toFixed(2)
  },
  {
    key: 'agriculture' as const,
    label: '农业用水',
    total: ((agriSurfaceTotal.value || 0) + (agriGroundTotal.value || 0)).toFixed(2)
  },
  {
    key: 'livestock' as const,
    label: '牲畜饲养用水',
    total: ((livestockSurfaceTotal.value || 0) + (livestockGroundTotal.value || 0)).toFixed(2)
  },
  {
    key: 'power' as const,
    label: '发电用水',
    total: ((powerSurfaceTotal.value || 0) + (powerGroundTotal.value || 0)).toFixed(2)
  },
  {
    key: 'service' as const,
    label: '服务业用水',
    total: ((serviceSurfaceTotal.value || 0) + (serviceGroundTotal.value || 0) + (serviceRecycledTotal.value || 0)).toFixed(2)
  }
]);

// 快捷操作：根据分项年核定指标，按12个月均摊拆分至总结表
const autoDistributeByAnnual = () => {
  const totalSurf =
    livingSurfaceTotal.value +
    industrySurfaceTotal.value +
    agriSurfaceTotal.value +
    livestockSurfaceTotal.value +
    powerSurfaceTotal.value +
    serviceSurfaceTotal.value;

  const totalGrd =
    livingGroundTotal.value +
    industryGroundTotal.value +
    agriGroundTotal.value +
    livestockGroundTotal.value +
    powerGroundTotal.value +
    serviceGroundTotal.value;

  const totalRec = industryRecycledTotal.value + serviceRecycledTotal.value;
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

// 操作：牲畜饲养用水行操作
const addLivestockRow = () => {
  if (!formData.value.livestockWaterRows) {
    formData.value.livestockWaterRows = [];
  }
  formData.value.livestockWaterRows.push({
    livestockType: '',
    count: 100,
    quota: 40.0,
    days: 365,
    surfaceWater: 0.0,
    groundwater: 0.0
  });
  emit('update:modelValue', formData.value);
};

const deleteLivestockRow = (idx: number) => {
  if (formData.value.livestockWaterRows && formData.value.livestockWaterRows.length > 1) {
    formData.value.livestockWaterRows.splice(idx, 1);
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

// 操作：服务业用水行操作
const addServiceRow = () => {
  if (!formData.value.serviceWaterRows) {
    formData.value.serviceWaterRows = [];
  }
  formData.value.serviceWaterRows.push({
    industryName: '',
    scale: '',
    quota: 0.0,
    surfaceWater: 0.0,
    groundwater: 0.0,
    recycledWater: 0.0
  });
  emit('update:modelValue', formData.value);
};

const deleteServiceRow = (idx: number) => {
  if (formData.value.serviceWaterRows && formData.value.serviceWaterRows.length > 1) {
    formData.value.serviceWaterRows.splice(idx, 1);
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
  livestockSurfaceTotal,
  livestockGroundTotal,
  powerSurfaceTotal,
  powerGroundTotal,
  serviceSurfaceTotal,
  serviceGroundTotal,
  serviceRecycledTotal,
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
