<template>
  <!-- 遮罩层：样式与计量设施管理编辑/详情弹窗 100% 保持一致 -->
  <div
    v-if="visible && record"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none overflow-y-auto"
    @click.self="handleClose"
  >
    <!-- 弹窗主体容器：浅色顶栏、精致圆角与边框阴影、居中自适应双栏布局 -->
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1520px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[94vh] h-[92vh]"
    >
      <!-- 1. 浅色顶部标题栏 (Light Header)：浅灰蓝背景、精致微标与底边分割线，与计量设施管理编辑/详情统一 -->
      <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">
                取水计划审核 · {{ record.userType === 'public_supply' ? '公共供水单位' : '自备取水单位' }}
              </h3>
              <span
                class="px-2 py-0.5 rounded text-[11px] font-medium border"
                :class="record.status === '审核通过' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-blue-50 text-blue-600 border-blue-200'"
              >
                {{ record.status }}
              </span>
              <span v-if="form.permitNumber" class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-200">
                {{ form.permitNumber }}
              </span>
            </div>
            <p class="text-[11px] text-slate-400 font-mono mt-0.5">
              申报单位: {{ form.waterOwner || record.unitName }} · 申报年度: {{ form.year || 2026 }}年 · 行政区划: {{ form.detailedAddress || record.district }}
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="handleClose"
          class="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer p-1.5 rounded-lg -mr-1"
          title="关闭"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 2. 主体左右分栏布局 (左边可编辑修改，右边完整表单展示)，统一浅色背景与卡片系统 -->
      <div class="flex-1 flex min-h-0 overflow-hidden text-xs text-slate-800 divide-x divide-slate-200/80 bg-[#f8fafc]/40">
        
        <!-- ====================== 左侧：填报内容可修改 ====================== -->
        <div class="w-1/2 flex flex-col min-h-0 bg-[#f8fafc]/30">
          <!-- 左栏标题导航 -->
          <div class="px-5 py-2.5 bg-white border-b border-slate-200/80 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-[13px] font-bold text-slate-800">申报指标核定与修改</span>
            </div>
            <span class="text-[11px] text-slate-400 font-mono">支持核实修正并自动计算联动</span>
          </div>

          <!-- 左侧滚动卡片表单区域 -->
          <div class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            
            <!-- 卡片 1: 申报单位基础信息 (同计量设施管理编辑弹窗卡片规范) -->
            <div class="bg-white rounded-lg border border-slate-200/80 p-4.5 shadow-2xs space-y-3.5">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                  <span class="text-[13px] font-bold text-slate-800">申报主体基础信息</span>
                </div>
                <span class="text-[11px] text-slate-400 font-mono">可修改</span>
              </div>

              <!-- 基础信息输入栅格 (2列自适应) -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-[12px]">
                <!-- 取水权人名称 -->
                <div class="flex items-center">
                  <label class="w-24 shrink-0 text-slate-500 font-normal text-right pr-2">取水权人名称</label>
                  <input
                    type="text"
                    v-model="form.waterOwner"
                    placeholder="请输入取水权人全称"
                    class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                </div>

                <!-- 取水许可编号 -->
                <div class="flex items-center">
                  <label class="w-24 shrink-0 text-slate-500 font-normal text-right pr-2">取水许可编号</label>
                  <input
                    type="text"
                    v-model="form.permitNumber"
                    placeholder="请输入许可证编号"
                    class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md font-mono text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                </div>

                <!-- 取水许可量 -->
                <div class="flex items-center">
                  <label class="w-24 shrink-0 text-slate-500 font-normal text-right pr-2">许可水量(万m³)</label>
                  <input
                    type="number"
                    step="0.01"
                    v-model.number="form.permitVolume"
                    class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md font-mono text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                </div>

                <!-- 联系人 -->
                <div class="flex items-center">
                  <label class="w-24 shrink-0 text-slate-500 font-normal text-right pr-2">
                    <span class="text-rose-500 mr-0.5">*</span>联系人
                  </label>
                  <input
                    type="text"
                    v-model="form.contactPerson"
                    placeholder="填报经办人"
                    class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                </div>

                <!-- 联系电话 -->
                <div class="flex items-center">
                  <label class="w-24 shrink-0 text-slate-500 font-normal text-right pr-2">
                    <span class="text-rose-500 mr-0.5">*</span>联系电话
                  </label>
                  <input
                    type="text"
                    v-model="form.contactPhone"
                    placeholder="手机或办公电话"
                    class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md font-mono text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                </div>

                <!-- 邮政编码 -->
                <div class="flex items-center">
                  <label class="w-24 shrink-0 text-slate-500 font-normal text-right pr-2">邮政编码</label>
                  <input
                    type="text"
                    v-model="form.postalCode"
                    placeholder="6位邮编"
                    class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md font-mono text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                </div>

                <!-- 电子邮箱 -->
                <div class="flex items-center">
                  <label class="w-24 shrink-0 text-slate-500 font-normal text-right pr-2">电子邮箱</label>
                  <input
                    type="email"
                    v-model="form.email"
                    placeholder="电子邮箱地址"
                    class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                </div>

                <!-- 年产值(万元) -->
                <div class="flex items-center">
                  <label class="w-24 shrink-0 text-slate-500 font-normal text-right pr-2 flex items-center justify-end gap-1">
                    <span>年产值(万元)</span>
                    <span
                      class="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-600 text-[10px] cursor-help"
                      title="年产值大于2000万为规上企业"
                    >?</span>
                  </label>
                  <div class="relative flex-1">
                    <input
                      type="number"
                      step="1"
                      v-model.number="form.annualOutputValue"
                      class="w-full h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md font-mono text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                    />
                    <span
                      v-if="form.annualOutputValue >= 2000"
                      class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-600 font-medium border border-emerald-200 pointer-events-none"
                    >
                      规上企业
                    </span>
                  </div>
                </div>

                <!-- 详细地址 (整行跨列) -->
                <div class="flex items-center col-span-1 md:col-span-2">
                  <label class="w-24 shrink-0 text-slate-500 font-normal text-right pr-2">
                    <span class="text-rose-500 mr-0.5">*</span>详细地址
                  </label>
                  <input
                    type="text"
                    v-model="form.detailedAddress"
                    placeholder="请输入详细地址"
                    class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                  />
                </div>
              </div>
            </div>

            <!-- 卡片 2: 生活用水申报项 -->
            <div class="bg-white rounded-lg border border-slate-200/80 p-4.5 shadow-2xs space-y-3.5">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                  <span class="text-[13px] font-bold text-slate-800">生活用水核定</span>
                </div>
                <span class="text-slate-400 font-mono text-[11px]">单位: 万m³</span>
              </div>

              <div class="overflow-x-auto custom-scrollbar border border-slate-200/90 rounded-md bg-white shadow-2xs">
                <table class="w-full text-xs text-left border-collapse">
                  <thead class="bg-[#f8fafc] text-slate-700 font-medium border-b border-slate-200">
                    <tr class="divide-x divide-slate-200 text-center">
                      <th class="px-2 py-2 min-w-[110px] text-blue-600 font-semibold">供水类型</th>
                      <th class="px-2 py-2 min-w-[80px]">人均定额</th>
                      <th class="px-2 py-2 min-w-[80px]">供水人口</th>
                      <th class="px-2 py-2 min-w-[75px]">地表水</th>
                      <th class="px-2 py-2 min-w-[75px]">地下水</th>
                      <th class="px-2 py-2 min-w-[80px]">总计</th>
                      <th class="px-2 py-2 w-12">操作</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    <tr
                      v-for="(row, idx) in form.livingWaterRows"
                      :key="idx"
                      class="divide-x divide-slate-100 text-center hover:bg-slate-50/70 transition-colors"
                    >
                      <!-- 供水类型 -->
                      <td class="p-1">
                        <div class="relative">
                          <input
                            type="text"
                            v-model="row.type"
                            class="w-full h-7 pl-2 pr-6 bg-white border border-[#dce6f5] rounded text-xs focus:outline-none focus:border-[#1677ff]"
                          />
                          <svg class="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </div>
                      </td>
                      <!-- 人均用水定额 -->
                      <td class="p-1">
                        <input
                          type="number"
                          step="0.01"
                          v-model.number="row.quota"
                          class="w-full h-7 px-1.5 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono focus:outline-none focus:border-[#1677ff]"
                        />
                      </td>
                      <!-- 供水人口 -->
                      <td class="p-1">
                        <input
                          type="number"
                          step="1"
                          v-model.number="row.population"
                          class="w-full h-7 px-1.5 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono focus:outline-none focus:border-[#1677ff]"
                        />
                      </td>
                      <!-- 地表水 -->
                      <td class="p-1">
                        <input
                          type="number"
                          step="0.01"
                          v-model.number="row.surfaceWater"
                          class="w-full h-7 px-1.5 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono focus:outline-none focus:border-[#1677ff]"
                        />
                      </td>
                      <!-- 地下水 -->
                      <td class="p-1">
                        <input
                          type="number"
                          step="0.01"
                          v-model.number="row.groundwater"
                          class="w-full h-7 px-1.5 bg-white border border-[#dce6f5] rounded text-center text-xs font-mono focus:outline-none focus:border-[#1677ff]"
                        />
                      </td>
                      <!-- 总计 (自动计算) -->
                      <td class="px-2 py-1 font-mono font-semibold text-slate-800 text-center">
                        {{ ((row.surfaceWater || 0) + (row.groundwater || 0)).toFixed(2) }}
                      </td>
                      <!-- 删除操作 -->
                      <td class="p-1 text-center">
                        <button
                          type="button"
                          @click="deleteLivingRow(idx)"
                          class="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition"
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
                    <tr class="bg-blue-50/50 font-semibold divide-x divide-slate-200 text-center text-slate-800">
                      <td class="px-2 py-1.5">合计</td>
                      <td></td>
                      <td></td>
                      <td class="px-2 py-1.5 font-mono">{{ livingSurfaceTotal.toFixed(2) }}</td>
                      <td class="px-2 py-1.5 font-mono">{{ livingGroundTotal.toFixed(2) }}</td>
                      <td class="px-2 py-1.5 font-mono text-[#1677ff] font-bold">{{ (livingSurfaceTotal + livingGroundTotal).toFixed(2) }}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 新增一行链接 -->
              <div class="pt-0.5">
                <button
                  type="button"
                  @click="addLivingRow"
                  class="text-[#1677ff] hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer text-xs"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>新增一行生活用水</span>
                </button>
              </div>
            </div>

            <!-- 卡片 3: 工业用水申报项 -->
            <div class="bg-white rounded-lg border border-slate-200/80 p-4.5 shadow-2xs space-y-3.5">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                  <span class="text-[13px] font-bold text-slate-800">工业用水核定</span>
                </div>
                <span class="text-slate-400 font-mono text-[11px]">单位: 万m³</span>
              </div>

              <div class="overflow-x-auto custom-scrollbar border border-slate-200/90 rounded-md bg-white shadow-2xs">
                <table class="w-full text-xs text-left border-collapse min-w-[720px]">
                  <thead class="bg-[#f8fafc] text-slate-700 font-medium border-b border-slate-200 text-center">
                    <tr class="divide-x divide-slate-200">
                      <th rowspan="2" class="px-1.5 py-1.5 min-w-[70px]">主要产品</th>
                      <th rowspan="2" class="px-1.5 py-1.5 min-w-[70px]">产品定额</th>
                      <th rowspan="2" class="px-1.5 py-1.5 min-w-[60px]">年产量</th>
                      <th rowspan="2" class="px-1.5 py-1.5 min-w-[60px]">产品水量</th>
                      <th rowspan="2" class="px-1.5 py-1.5 min-w-[60px]">地表水</th>
                      <th rowspan="2" class="px-1.5 py-1.5 min-w-[60px]">地下水</th>
                      <th colspan="5" class="px-2 py-1 border-b border-slate-200">非常规水</th>
                      <th rowspan="2" class="px-2 py-1.5 min-w-[65px]">总计</th>
                      <th rowspan="2" class="px-1.5 py-1.5 w-10">操作</th>
                    </tr>
                    <tr class="divide-x divide-slate-200 text-[10.5px]">
                      <th class="px-1 py-1 min-w-[50px]">再生水</th>
                      <th class="px-1 py-1 min-w-[50px]">雨水</th>
                      <th class="px-1 py-1 min-w-[50px]">矿井水</th>
                      <th class="px-1 py-1 min-w-[50px]">微咸水</th>
                      <th class="px-1.5 py-1 text-emerald-700 min-w-[65px]">非常规计</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 text-center font-mono">
                    <tr
                      v-for="(row, idx) in form.industryWaterRows"
                      :key="idx"
                      class="divide-x divide-slate-100 hover:bg-slate-50/70 transition-colors"
                    >
                      <td class="p-1">
                        <input type="text" v-model="row.productName" class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs focus:outline-none focus:border-[#1677ff]" />
                      </td>
                      <td class="p-1">
                        <input type="number" step="0.01" v-model.number="row.quota" class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs focus:outline-none focus:border-[#1677ff]" />
                      </td>
                      <td class="p-1">
                        <input type="text" v-model="row.output" class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs focus:outline-none focus:border-[#1677ff]" />
                      </td>
                      <td class="p-1">
                        <input type="text" v-model="row.productVolume" class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs focus:outline-none focus:border-[#1677ff]" />
                      </td>
                      <td class="p-1">
                        <input type="number" step="0.01" v-model.number="row.surfaceWater" class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs focus:outline-none focus:border-[#1677ff]" />
                      </td>
                      <td class="p-1">
                        <input type="number" step="0.01" v-model.number="row.groundwater" class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs focus:outline-none focus:border-[#1677ff]" />
                      </td>
                      <td class="p-1">
                        <input type="number" step="0.01" v-model.number="row.recycledWater" class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs focus:outline-none focus:border-[#1677ff]" />
                      </td>
                      <td class="p-1">
                        <input type="number" step="0.01" v-model.number="row.rainWater" class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs focus:outline-none focus:border-[#1677ff]" />
                      </td>
                      <td class="p-1">
                        <input type="number" step="0.01" v-model.number="row.mineWater" class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs focus:outline-none focus:border-[#1677ff]" />
                      </td>
                      <td class="p-1">
                        <input type="number" step="0.01" v-model.number="row.brackishWater" class="w-full h-6.5 px-1 bg-white border border-[#dce6f5] rounded text-center text-xs focus:outline-none focus:border-[#1677ff]" />
                      </td>
                      <!-- 非常规水小计 -->
                      <td class="px-1.5 py-1 text-emerald-700 font-semibold">
                        {{ ((row.recycledWater || 0) + (row.rainWater || 0) + (row.mineWater || 0) + (row.brackishWater || 0)).toFixed(2) }}
                      </td>
                      <!-- 地表水+地下水总计 -->
                      <td class="px-1.5 py-1 text-slate-800 font-semibold">
                        {{ ((row.surfaceWater || 0) + (row.groundwater || 0)).toFixed(2) }}
                      </td>
                      <!-- 删除操作 -->
                      <td class="p-1 text-center">
                        <button
                          type="button"
                          @click="deleteIndustryRow(idx)"
                          class="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition"
                          title="删除"
                        >
                          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>

                    <!-- 合计行 -->
                    <tr class="bg-blue-50/50 font-semibold divide-x divide-slate-200 text-center text-slate-800">
                      <td class="px-1.5 py-1.5 font-sans">合计</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td class="px-1 py-1.5 font-mono">{{ industrySurfaceTotal.toFixed(2) }}</td>
                      <td class="px-1 py-1.5 font-mono">{{ industryGroundTotal.toFixed(2) }}</td>
                      <td class="px-1 py-1.5 font-mono">{{ industryRecycledTotal.toFixed(2) }}</td>
                      <td class="px-1 py-1.5 font-mono">{{ industryRainTotal.toFixed(2) }}</td>
                      <td class="px-1 py-1.5 font-mono">{{ industryMineTotal.toFixed(2) }}</td>
                      <td class="px-1 py-1.5 font-mono">{{ industryBrackishTotal.toFixed(2) }}</td>
                      <td class="px-1.5 py-1.5 font-mono text-emerald-700 font-bold">{{ industryUnconventionalTotal.toFixed(2) }}</td>
                      <td class="px-1.5 py-1.5 font-mono text-[#1677ff] font-bold">{{ (industrySurfaceTotal + industryGroundTotal).toFixed(2) }}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 新增一行链接 -->
              <div class="pt-0.5">
                <button
                  type="button"
                  @click="addIndustryRow"
                  class="text-[#1677ff] hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer text-xs"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>新增一行工业用水</span>
                </button>
              </div>
            </div>

            <!-- 卡片 4: 审核批注与核定结论 -->
            <div class="bg-white rounded-lg border border-slate-200/80 p-4.5 shadow-2xs space-y-2.5">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                  <span class="text-[13px] font-bold text-slate-800">审批核实意见与批注</span>
                </div>
                <span class="text-[11px] text-slate-400">核定结论将记入审批历史</span>
              </div>
              <textarea
                v-model="auditOpinion"
                rows="2"
                placeholder="请输入核定结论及审核意见..."
                class="w-full p-2.5 bg-slate-50 border border-[#dce6f5] rounded-md text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:bg-white resize-none transition"
              ></textarea>
            </div>

          </div>
        </div>

        <!-- ====================== 右侧：填报完整的表单展示 ====================== -->
        <div class="w-1/2 flex flex-col min-h-0 bg-[#f8fafc]/30">
          
          <!-- 顶部 Tab 切换组 (完全同计量设施管理详情页 Tab 风格) -->
          <div class="bg-white border-b border-slate-200/80 px-5 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0 select-none">
            <button
              v-for="tab in rightTabs"
              :key="tab.key"
              type="button"
              @click="activeRightTab = tab.key"
              class="flex items-center gap-1.5 py-3 px-3.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer"
              :class="[
                activeRightTab === tab.key
                  ? 'border-[#1677ff] text-[#1677ff] font-semibold bg-blue-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              ]"
            >
              <span>{{ tab.label }}</span>
            </button>
          </div>

          <!-- 右侧内容滚动区域 -->
          <div class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            
            <!-- Tab 1: 计划申请填报表 (完整预览卡片) -->
            <div v-if="activeRightTab === 'plan_application'" class="space-y-4">
              
              <!-- 基础信息只读网格卡片 -->
              <div class="bg-white rounded-lg border border-slate-200/80 p-4.5 shadow-2xs space-y-3">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[13px] font-bold text-slate-800">申请基础信息</span>
                  </div>
                  <span class="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 font-mono">
                    {{ form.year || 2026 }}年度申请
                  </span>
                </div>

                <div class="grid grid-cols-3 gap-x-4 gap-y-2.5 text-xs">
                  <div class="flex items-baseline">
                    <span class="w-24 text-slate-400 shrink-0">取水权人：</span>
                    <span class="font-medium text-slate-800 truncate" :title="form.waterOwner">{{ form.waterOwner }}</span>
                  </div>

                  <div class="flex items-baseline">
                    <span class="w-24 text-slate-400 shrink-0">取水许可编号：</span>
                    <span class="font-mono text-slate-800">{{ form.permitNumber }}</span>
                  </div>

                  <div class="flex items-baseline">
                    <span class="w-24 text-slate-400 shrink-0">许可水量：</span>
                    <span class="font-mono font-semibold text-slate-800">{{ form.permitVolume.toFixed(2) }} 万m³</span>
                  </div>

                  <div class="flex items-baseline">
                    <span class="w-24 text-slate-400 shrink-0">填报联系人：</span>
                    <span class="text-slate-800">{{ form.contactPerson }}</span>
                  </div>

                  <div class="flex items-baseline">
                    <span class="w-24 text-slate-400 shrink-0">联系电话：</span>
                    <span class="font-mono text-slate-800">{{ form.contactPhone }}</span>
                  </div>

                  <div class="flex items-baseline">
                    <span class="w-24 text-slate-400 shrink-0">邮政编码：</span>
                    <span class="font-mono text-slate-800">{{ form.postalCode }}</span>
                  </div>

                  <div class="flex items-baseline">
                    <span class="w-24 text-slate-400 shrink-0">电子邮箱：</span>
                    <span class="text-slate-800">{{ form.email }}</span>
                  </div>

                  <div class="flex items-baseline">
                    <span class="w-24 text-slate-400 shrink-0">年产值：</span>
                    <span class="font-mono text-slate-800">{{ form.annualOutputValue }} 万元</span>
                  </div>

                  <div class="flex items-baseline col-span-3 pt-1 border-t border-slate-50">
                    <span class="w-24 text-slate-400 shrink-0">详细地址：</span>
                    <span class="text-slate-800">{{ form.detailedAddress }}</span>
                  </div>
                </div>
              </div>

              <!-- 生活用水表格 (只读卡片) -->
              <div class="bg-white rounded-lg border border-slate-200/80 p-4.5 shadow-2xs space-y-3">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[13px] font-bold text-slate-800">生活用水申报明细</span>
                  </div>
                  <span class="text-slate-400 font-mono text-[11px]">单位: 万m³</span>
                </div>

                <div class="border border-slate-200/90 rounded-md bg-white shadow-2xs overflow-x-auto custom-scrollbar">
                  <table class="w-full text-xs text-center border-collapse">
                    <thead class="bg-[#f8fafc] text-slate-700 font-medium border-b border-slate-200">
                      <tr class="divide-x divide-slate-200">
                        <th class="py-2 px-3">供水人口(人)</th>
                        <th class="py-2 px-3">人均定额(L/人·天)</th>
                        <th class="py-2 px-3">地表水</th>
                        <th class="py-2 px-3">地下水</th>
                        <th class="py-2 px-3 font-semibold text-slate-800">总计</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 font-mono">
                      <tr
                        v-for="(row, idx) in form.livingWaterRows"
                        :key="idx"
                        class="divide-x divide-slate-100 hover:bg-slate-50/50"
                      >
                        <td class="py-2 px-3 text-slate-700">{{ row.population }}</td>
                        <td class="py-2 px-3 text-slate-700">{{ row.quota.toFixed(2) }}</td>
                        <td class="py-2 px-3 text-slate-700">{{ row.surfaceWater.toFixed(2) }}</td>
                        <td class="py-2 px-3 text-slate-700">{{ row.groundwater.toFixed(2) }}</td>
                        <td class="py-2 px-3 font-semibold text-[#1677ff]">
                          {{ ((row.surfaceWater || 0) + (row.groundwater || 0)).toFixed(2) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 工业用水表格 (只读多级表头卡片) -->
              <div class="bg-white rounded-lg border border-slate-200/80 p-4.5 shadow-2xs space-y-3">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[13px] font-bold text-slate-800">工业用水申报明细</span>
                  </div>
                  <span class="text-slate-400 font-mono text-[11px]">单位: 万m³</span>
                </div>

                <div class="border border-slate-200/90 rounded-md bg-white shadow-2xs overflow-x-auto custom-scrollbar">
                  <table class="w-full text-xs text-center border-collapse min-w-[700px]">
                    <thead class="bg-[#f8fafc] text-slate-700 font-medium border-b border-slate-200">
                      <tr class="divide-x divide-slate-200">
                        <th rowspan="2" class="py-1.5 px-2">主要产品</th>
                        <th rowspan="2" class="py-1.5 px-2">产品定额</th>
                        <th rowspan="2" class="py-1.5 px-2">年产量</th>
                        <th rowspan="2" class="py-1.5 px-2">产品水量</th>
                        <th rowspan="2" class="py-1.5 px-2">地表水</th>
                        <th rowspan="2" class="py-1.5 px-2">地下水</th>
                        <th colspan="5" class="py-1 px-2 border-b border-slate-200">非常规水</th>
                        <th rowspan="2" class="py-1.5 px-2 font-semibold">总计</th>
                      </tr>
                      <tr class="divide-x divide-slate-200 text-[10.5px]">
                        <th class="py-1 px-1.5">再生水</th>
                        <th class="py-1 px-1.5">雨水</th>
                        <th class="py-1 px-1.5">矿井水</th>
                        <th class="py-1 px-1.5">微咸水</th>
                        <th class="py-1 px-1.5 text-emerald-700 font-semibold">非常规计</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 font-mono text-[11.5px]">
                      <tr
                        v-for="(row, idx) in form.industryWaterRows"
                        :key="idx"
                        class="divide-x divide-slate-100 hover:bg-slate-50/50"
                      >
                        <td class="py-1.5 px-2">{{ row.productName }}</td>
                        <td class="py-1.5 px-2">{{ row.quota.toFixed(2) }}</td>
                        <td class="py-1.5 px-2">{{ row.output }}</td>
                        <td class="py-1.5 px-2">{{ row.productVolume }}</td>
                        <td class="py-1.5 px-2">{{ row.surfaceWater.toFixed(2) }}</td>
                        <td class="py-1.5 px-2">{{ row.groundwater.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5">{{ row.recycledWater.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5">{{ row.rainWater.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5">{{ row.mineWater.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5">{{ row.brackishWater.toFixed(2) }}</td>
                        <td class="py-1.5 px-2 font-semibold text-emerald-700">
                          {{ ((row.recycledWater || 0) + (row.rainWater || 0) + (row.mineWater || 0) + (row.brackishWater || 0)).toFixed(2) }}
                        </td>
                        <td class="py-1.5 px-2 font-semibold text-[#1677ff]">
                          {{ ((row.surfaceWater || 0) + (row.groundwater || 0)).toFixed(2) }}
                        </td>
                      </tr>

                      <!-- 合计行 -->
                      <tr class="bg-blue-50/40 font-semibold divide-x divide-slate-200">
                        <td class="py-1.5 px-2 font-sans">合计</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="py-1.5 px-2">{{ industrySurfaceTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-2">{{ industryGroundTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5">{{ industryRecycledTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5">{{ industryRainTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5">{{ industryMineTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-1.5">{{ industryBrackishTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-2 text-emerald-700">{{ industryUnconventionalTotal.toFixed(2) }}</td>
                        <td class="py-1.5 px-2 text-[#1677ff] font-bold">{{ (industrySurfaceTotal + industryGroundTotal).toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 农业用水表格 (只读卡片) -->
              <div class="bg-white rounded-lg border border-slate-200/80 p-4.5 shadow-2xs space-y-3">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[13px] font-bold text-slate-800">农业灌溉用水明细</span>
                  </div>
                  <span class="text-slate-400 font-mono text-[11px]">单位: 万m³</span>
                </div>

                <div class="border border-slate-200/90 rounded-md bg-white shadow-2xs overflow-x-auto custom-scrollbar">
                  <table class="w-full text-xs text-center border-collapse">
                    <thead class="bg-[#f8fafc] text-slate-700 font-medium border-b border-slate-200 text-[11px]">
                      <tr class="divide-x divide-slate-200">
                        <th class="py-1.5 px-2">实际灌溉面积(亩)</th>
                        <th class="py-1.5 px-2">年内灌溉次数</th>
                        <th class="py-1.5 px-2">定额(m³/亩·次)</th>
                        <th class="py-1.5 px-2">主要作物</th>
                        <th class="py-1.5 px-2">灌溉方式</th>
                        <th class="py-1.5 px-2">地表水</th>
                        <th class="py-1.5 px-2">地下水</th>
                        <th class="py-1.5 px-2 font-semibold">总计</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 font-mono text-[11.5px]">
                      <tr
                        v-for="(row, idx) in form.agricultureWaterRows"
                        :key="idx"
                        class="divide-x divide-slate-100 hover:bg-slate-50/50"
                      >
                        <td class="py-2 px-2 text-slate-700">{{ row.area.toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-700">{{ row.times }}</td>
                        <td class="py-2 px-2 text-slate-700">{{ row.quota }}</td>
                        <td class="py-2 px-2 font-sans text-slate-800">{{ row.crops }}</td>
                        <td class="py-2 px-2 font-sans text-slate-700">{{ row.method }}</td>
                        <td class="py-2 px-2 text-slate-700">{{ row.surfaceWater.toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-700">{{ row.groundwater.toFixed(2) }}</td>
                        <td class="py-2 px-2 font-semibold text-[#1677ff]">{{ row.total.toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 发电用水表格 (只读卡片) -->
              <div class="bg-white rounded-lg border border-slate-200/80 p-4.5 shadow-2xs space-y-3">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                    <span class="text-[13px] font-bold text-slate-800">水力/火力发电用水明细</span>
                  </div>
                  <span class="text-slate-400 font-mono text-[11px]">单位: 万m³</span>
                </div>

                <div class="border border-slate-200/90 rounded-md bg-white shadow-2xs overflow-x-auto custom-scrollbar">
                  <table class="w-full text-xs text-center border-collapse">
                    <thead class="bg-[#f8fafc] text-slate-700 font-medium border-b border-slate-200 text-[11px]">
                      <tr class="divide-x divide-slate-200">
                        <th class="py-1.5 px-2">机组台数</th>
                        <th class="py-1.5 px-2">降级容量</th>
                        <th class="py-1.5 px-2">年发电量</th>
                        <th class="py-1.5 px-2">年利用小时</th>
                        <th class="py-1.5 px-2">地表水</th>
                        <th class="py-1.5 px-2">地下水</th>
                        <th class="py-1.5 px-2">水电最小机组流量</th>
                        <th class="py-1.5 px-2">火电最高小时用水</th>
                        <th class="py-1.5 px-2 font-semibold">总计</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 font-mono text-[11.5px]">
                      <tr
                        v-for="(row, idx) in form.powerWaterRows"
                        :key="idx"
                        class="divide-x divide-slate-100 hover:bg-slate-50/50"
                      >
                        <td class="py-2 px-2 text-slate-700">{{ row.units }}台</td>
                        <td class="py-2 px-2 text-slate-700">{{ row.capacity }}</td>
                        <td class="py-2 px-2 text-slate-700">{{ row.generation }}</td>
                        <td class="py-2 px-2 text-slate-700">{{ row.hours }}h</td>
                        <td class="py-2 px-2 text-slate-700">{{ row.surfaceWater.toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-700">{{ row.groundwater.toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-700">{{ row.hydroMinFlow.toFixed(2) }}</td>
                        <td class="py-2 px-2 text-slate-700">{{ row.thermalMaxHourly.toFixed(2) }}</td>
                        <td class="py-2 px-2 font-semibold text-[#1677ff]">{{ row.total.toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            <!-- Tab 2: 取水总结填报表 -->
            <div v-else-if="activeRightTab === 'summary'" class="space-y-4">
              <div class="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs space-y-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                    <span class="font-bold text-slate-800 text-sm">全项取用水指标汇总</span>
                  </div>
                  <span class="text-xs font-mono text-[#1677ff]">单位: 万m³</span>
                </div>

                <div class="grid grid-cols-3 gap-3.5">
                  <div class="p-3.5 bg-slate-50 rounded-lg border border-slate-200/90">
                    <span class="text-slate-500 text-[11px] block mb-1">取水许可证年许可量</span>
                    <span class="text-base font-bold font-mono text-slate-800">{{ form.permitVolume.toFixed(2) }}</span>
                  </div>

                  <div class="p-3.5 bg-blue-50/50 rounded-lg border border-blue-200">
                    <span class="text-blue-600 text-[11px] font-medium block mb-1">申报核定计划总用水量</span>
                    <span class="text-base font-bold font-mono text-[#1677ff]">
                      {{ (livingSurfaceTotal + livingGroundTotal + industrySurfaceTotal + industryGroundTotal).toFixed(2) }}
                    </span>
                  </div>

                  <div class="p-3.5 bg-emerald-50/50 rounded-lg border border-emerald-200">
                    <span class="text-emerald-700 text-[11px] font-medium block mb-1">非常规水源综合利用量</span>
                    <span class="text-base font-bold font-mono text-emerald-600">{{ industryUnconventionalTotal.toFixed(2) }}</span>
                  </div>
                </div>

                <div class="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-3.5 rounded-lg border border-slate-200/80 space-y-1">
                  <p class="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#1677ff]"></span>
                    水资源红线刚性约束合规性分析：
                  </p>
                  <p>1. 本次申报年度用水计划总量未超出取水许可证红线额度，具备充足水资源承载力；</p>
                  <p>2. 工业取水结构中非常规水源配置比例合理，符合国家节水行动西宁实施方案技术要求。</p>
                </div>
              </div>
            </div>

            <!-- Tab 3: 电子证照信息 -->
            <div v-else-if="activeRightTab === 'electronic_license'" class="space-y-4">
              <div class="bg-white p-6 rounded-lg border border-slate-200/80 shadow-2xs space-y-4 max-w-[680px] mx-auto">
                <div class="text-center space-y-1 pb-3 border-b-2 border-[#1677ff]">
                  <span class="text-base font-bold tracking-widest text-slate-900">中华人民共和国取水许可证</span>
                  <div class="text-xs font-mono text-slate-500">{{ form.permitNumber }}</div>
                </div>

                <div class="grid grid-cols-2 gap-y-3 text-xs">
                  <div><span class="text-slate-400">取水权人：</span><span class="font-medium text-slate-800">{{ form.waterOwner }}</span></div>
                  <div><span class="text-slate-400">法定代表人：</span><span class="font-medium text-slate-800">{{ form.contactPerson }}</span></div>
                  <div><span class="text-slate-400">有效期限：</span><span class="font-mono text-slate-800">2023-01-01 至 2028-12-31</span></div>
                  <div><span class="text-slate-400">年许可取水量：</span><span class="font-mono font-semibold text-blue-600">{{ form.permitVolume }} 万m³</span></div>
                  <div class="col-span-2"><span class="text-slate-400">取水地点：</span><span class="text-slate-800">{{ form.detailedAddress }}</span></div>
                  <div><span class="text-slate-400">发证机关：</span><span class="text-slate-800">西宁市水务局</span></div>
                  <div><span class="text-slate-400">证照防伪码：</span><span class="font-mono text-emerald-600">QHQ-2026-XN-VALID</span></div>
                </div>
              </div>
            </div>

            <!-- Tab 4: 用水定额及参考 -->
            <div v-else-if="activeRightTab === 'water_quota'" class="space-y-4">
              <div class="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs space-y-3.5">
                <div class="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                  <span class="font-bold text-slate-800 text-xs">青海省工业及城镇用水定额标准参考（西宁市现行实施版）</span>
                </div>
                <div class="space-y-2.5 text-xs text-slate-700">
                  <div class="p-3 bg-slate-50/80 rounded-lg border border-slate-200/80">
                    <strong class="text-slate-800 block mb-1">多晶硅与高纯半导体材料制造：</strong>
                    <span class="text-slate-600">单位产品取水定额：≤ 18.5 m³/t，超纯水回收率要求 ≥ 80%。</span>
                  </div>
                  <div class="p-3 bg-slate-50/80 rounded-lg border border-slate-200/80">
                    <strong class="text-slate-800 block mb-1">有色金属冶炼（电解铝）：</strong>
                    <span class="text-slate-600">单位产品取水定额：≤ 4.20 m³/t，循环利用率要求 ≥ 95%。</span>
                  </div>
                  <div class="p-3 bg-slate-50/80 rounded-lg border border-slate-200/80">
                    <strong class="text-slate-800 block mb-1">城镇综合生活居民人均定额：</strong>
                    <span class="text-slate-600">城镇居民生活用水综合定额标准：120 - 150 L/(人·天)。</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- 3. 全局底部操作栏 (完全同计量设施管理编辑/详情弹窗，左侧信息、右侧取消/驳回/通过按钮) -->
      <div class="px-6 py-3.5 bg-white border-t border-slate-200/80 flex items-center justify-between shrink-0">
        <!-- 左侧状态与计算统计信息 -->
        <div class="flex items-center gap-3 text-xs text-slate-500">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            当前审批节点: <strong class="text-slate-800">{{ record.status }}</strong>
          </span>
          <span class="text-slate-300">|</span>
          <span>核定计划总量: <strong class="text-[#1677ff] font-mono font-bold">{{ (livingSurfaceTotal + livingGroundTotal + industrySurfaceTotal + industryGroundTotal).toFixed(2) }}</strong> 万m³</span>
          <span class="text-slate-300">|</span>
          <span>非常规水利用: <strong class="text-emerald-600 font-mono font-bold">{{ industryUnconventionalTotal.toFixed(2) }}</strong> 万m³</span>
        </div>

        <!-- 右侧操作按钮组 -->
        <div class="flex items-center gap-2.5">
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-2 rounded-md bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition cursor-pointer border border-slate-200 shadow-2xs"
          >
            取消
          </button>

          <button
            type="button"
            @click="handleReject"
            class="px-5 py-2 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs font-medium transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span>不同意 (驳回)</span>
          </button>

          <button
            type="button"
            @click="handleApprove"
            class="px-6 py-2 rounded-md bg-[#1677ff] hover:bg-blue-600 text-white text-xs font-medium transition cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>同意并通过</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { WaterPlanRecord } from '../../../types';

const props = defineProps<{
  visible: boolean;
  record: WaterPlanRecord | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'submit-audit', updatedRecord: WaterPlanRecord): void;
}>();

const rightTabs = [
  { key: 'plan_application', label: '计划申请填报表' },
  { key: 'summary', label: '取水总结填报表' },
  { key: 'electronic_license', label: '电子证照信息' },
  { key: 'water_quota', label: '用水定额及参考' },
];

const activeRightTab = ref<'summary' | 'plan_application' | 'electronic_license' | 'water_quota'>('plan_application');
const auditOpinion = ref('经审查，该单位用水计划指标符合西宁市刚性约束管控方案与行业定额，予以审核通过。');

// 可编辑表单核心数据模型
const form = ref({
  waterOwner: '青海亚洲硅业高纯材料有限公司',
  permitNumber: 'B630121G2026-0055',
  permitVolume: 2345.87,
  contactPerson: '张工',
  contactPhone: '13897216688',
  postalCode: '810000',
  email: 'water_plan@asia-silicon.com',
  annualOutputValue: 2800,
  detailedAddress: '青海省西宁市东川工业园区金牛路18号',
  year: '2026',

  // 生活用水行
  livingWaterRows: [
    {
      type: '城镇居民生活',
      quota: 32.0,
      population: 324,
      surfaceWater: 234.0,
      groundwater: 232.0
    }
  ],

  // 工业用水行
  industryWaterRows: [
    {
      productName: '高纯多晶硅',
      quota: 14.50,
      output: '2.5万吨',
      productVolume: '36.25',
      surfaceWater: 8.0,
      groundwater: 9.0,
      recycledWater: 10.0,
      rainWater: 11.0,
      mineWater: 0.0,
      brackishWater: 0.0
    },
    {
      productName: '单晶硅拉棒',
      quota: 8.20,
      output: '1.2万吨',
      productVolume: '9.84',
      surfaceWater: 4.5,
      groundwater: 3.5,
      recycledWater: 5.0,
      rainWater: 2.0,
      mineWater: 0.0,
      brackishWater: 0.0
    }
  ],

  // 农业用水行
  agricultureWaterRows: [
    {
      area: 23243.87,
      times: 4,
      quota: 98,
      crops: '小麦、青稞、油菜',
      method: '喷灌/滴灌',
      surfaceWater: 0.20,
      groundwater: 0.21,
      total: 23.66
    }
  ],

  // 发电用水行
  powerWaterRows: [
    {
      units: 2,
      capacity: '600MW',
      generation: '35.4亿',
      hours: 5800,
      surfaceWater: 12.50,
      groundwater: 0.00,
      hydroMinFlow: 0.00,
      thermalMaxHourly: 145.00,
      total: 12.50
    }
  ]
});

// 监听选中的 record 初始化表单
watch(
  () => props.record,
  (rec) => {
    if (rec) {
      form.value.waterOwner = rec.unitName || '青海亚洲硅业高纯材料有限公司';
      form.value.permitNumber = rec.permitNumber || 'B630121G2026-0055';
      form.value.permitVolume = rec.permitVolume || 2345.87;
      form.value.year = rec.year || '2026';
      form.value.detailedAddress = `青海省西宁市${rec.district}重点产业园区`;
      activeRightTab.value = 'plan_application';
      auditOpinion.value = `经对【${rec.unitName}】${rec.year}年度用水计划进行合规核查，指标测算合理，准予核定通过。`;
    }
  },
  { immediate: true }
);

// 生活用水自动计算合计
const livingSurfaceTotal = computed(() => {
  return form.value.livingWaterRows.reduce((acc, row) => acc + (Number(row.surfaceWater) || 0), 0);
});

const livingGroundTotal = computed(() => {
  return form.value.livingWaterRows.reduce((acc, row) => acc + (Number(row.groundwater) || 0), 0);
});

// 工业用水自动计算合计
const industrySurfaceTotal = computed(() => {
  return form.value.industryWaterRows.reduce((acc, row) => acc + (Number(row.surfaceWater) || 0), 0);
});

const industryGroundTotal = computed(() => {
  return form.value.industryWaterRows.reduce((acc, row) => acc + (Number(row.groundwater) || 0), 0);
});

const industryRecycledTotal = computed(() => {
  return form.value.industryWaterRows.reduce((acc, row) => acc + (Number(row.recycledWater) || 0), 0);
});

const industryRainTotal = computed(() => {
  return form.value.industryWaterRows.reduce((acc, row) => acc + (Number(row.rainWater) || 0), 0);
});

const industryMineTotal = computed(() => {
  return form.value.industryWaterRows.reduce((acc, row) => acc + (Number(row.mineWater) || 0), 0);
});

const industryBrackishTotal = computed(() => {
  return form.value.industryWaterRows.reduce((acc, row) => acc + (Number(row.brackishWater) || 0), 0);
});

const industryUnconventionalTotal = computed(() => {
  return industryRecycledTotal.value + industryRainTotal.value + industryMineTotal.value + industryBrackishTotal.value;
});

// 操作函数：生活用水增删行
const addLivingRow = () => {
  form.value.livingWaterRows.push({
    type: '综合生活用水',
    quota: 30.0,
    population: 100,
    surfaceWater: 0.0,
    groundwater: 0.0
  });
};

const deleteLivingRow = (idx: number) => {
  if (form.value.livingWaterRows.length > 1) {
    form.value.livingWaterRows.splice(idx, 1);
  }
};

// 操作函数：工业用水增删行
const addIndustryRow = () => {
  form.value.industryWaterRows.push({
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
};

const deleteIndustryRow = (idx: number) => {
  if (form.value.industryWaterRows.length > 1) {
    form.value.industryWaterRows.splice(idx, 1);
  }
};

const handleClose = () => {
  emit('update:visible', false);
};

// 审核通过
const handleApprove = () => {
  if (!props.record) return;

  const calculatedTotal = Number(
    (livingSurfaceTotal.value + livingGroundTotal.value + industrySurfaceTotal.value + industryGroundTotal.value).toFixed(2)
  );

  const updated: WaterPlanRecord = {
    ...props.record,
    unitName: form.value.waterOwner,
    permitNumber: form.value.permitNumber,
    permitVolume: form.value.permitVolume,
    planVolume: calculatedTotal > 0 ? calculatedTotal : props.record.planVolume,
    surfaceWater: Number((livingSurfaceTotal.value + industrySurfaceTotal.value).toFixed(2)),
    groundwater: Number((livingGroundTotal.value + industryGroundTotal.value).toFixed(2)),
    unconventionalTotal: Number(industryUnconventionalTotal.value.toFixed(2)),
    status: '审核通过',
    auditor: '审核专员（西宁水务局）',
    auditDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
    auditOpinion: auditOpinion.value,
    approvedVolume: calculatedTotal > 0 ? calculatedTotal : props.record.planVolume,
    auditHistory: [
      ...(props.record.auditHistory || []),
      {
        stepName: props.record.status,
        operator: '水资源审批主管',
        department: '西宁市水资源管理委员会',
        action: '审核通过',
        time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        opinion: auditOpinion.value,
        status: 'passed'
      }
    ]
  };

  emit('submit-audit', updated);
  emit('update:visible', false);
};

// 审核驳回 / 不同意
const handleReject = () => {
  if (!props.record) return;

  const updated: WaterPlanRecord = {
    ...props.record,
    status: '审核驳回',
    auditor: '审核专员（西宁水务局）',
    auditDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
    auditOpinion: auditOpinion.value || '核定申报表用水指标超出管控范围，予以驳回整改。',
    auditHistory: [
      ...(props.record.auditHistory || []),
      {
        stepName: props.record.status,
        operator: '水资源审批主管',
        department: '西宁市水资源管理委员会',
        action: '审核驳回',
        time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        opinion: auditOpinion.value || '核定申报表用水指标超出管控范围，予以驳回整改。',
        status: 'rejected'
      }
    ]
  };

  emit('submit-audit', updated);
  emit('update:visible', false);
};
</script>

<style scoped>
/* 自定义弹窗内横向及纵向滚动条，保证横向滑动条与纵向滑动条完全一致，细腻精致 */
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
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
  transition: background-color 0.2s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: transparent;
}

.no-scrollbar::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
.no-scrollbar {
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}
</style>
