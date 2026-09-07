<template>
  <div
    v-if="visible && record"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none"
    @click.self="handleClose"
  >
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1120px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
    >
      <!-- 1. 顶部浅色标题栏 -->
      <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">用水计划申报与审批详情</h3>
              <span
                class="px-2 py-0.5 rounded text-[11px] font-medium border"
                :class="[
                  record.status === '审核通过'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : record.status === '审核驳回'
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-blue-50 text-blue-600 border-blue-200'
                ]"
              >
                {{ record.status }}
              </span>
              <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-50 text-purple-600 border border-purple-200">
                {{ record.itemType }}
              </span>
              <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-200">
                {{ record.year }}年度
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="handlePrint"
            class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
          >
            <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>打印核定通知书</span>
          </button>

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
      </div>

      <!-- 2. Tab 切换栏 -->
      <div class="bg-white border-b border-slate-200/90 px-6 flex items-center gap-3 overflow-x-auto no-scrollbar shrink-0 select-none">
        <button
          type="button"
          @click="activeTab = 'info'"
          class="py-2 px-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'info' ? 'border-[#1677ff] text-[#1677ff] font-semibold' : 'border-transparent text-slate-600 hover:text-slate-900'"
        >
          <span>基本信息与配额核对</span>
        </button>
        <button
          type="button"
          @click="activeTab = 'audit'"
          class="py-2 px-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'audit' ? 'border-[#1677ff] text-[#1677ff] font-semibold' : 'border-transparent text-slate-600 hover:text-slate-900'"
        >
          <span>全流程审批履历</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-600 font-mono">
            {{ (record.auditHistory || []).length }}
          </span>
        </button>
        <button
          type="button"
          @click="activeTab = 'document'"
          class="py-2 px-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'document' ? 'border-[#1677ff] text-[#1677ff] font-semibold' : 'border-transparent text-slate-600 hover:text-slate-900'"
        >
          <span>计划用水核定书（凭证）</span>
        </button>
        <button
          type="button"
          @click="activeTab = 'attachments'"
          class="py-2 px-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'attachments' ? 'border-[#1677ff] text-[#1677ff] font-semibold' : 'border-transparent text-slate-600 hover:text-slate-900'"
        >
          <span>佐证材料与附件</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-50 text-blue-600 font-mono">
            3
          </span>
        </button>
      </div>

      <!-- 3. 内容滚动区 -->
      <div class="p-3.5 overflow-y-auto space-y-2.5 text-xs text-slate-800 custom-scrollbar flex-1 bg-[#f8fafc]/50">
        
        <!-- Tab 1: 基本信息与配额核对 -->
        <div v-if="activeTab === 'info'" class="space-y-2.5 animate-in fade-in duration-150">
          <!-- 卡片 1.1: 基础登记参数 -->
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">申报单位及取水基本信息</span>
              </div>
              <span class="text-[11px] text-slate-400 font-mono">
                档案状态：<strong class="text-emerald-600 font-medium">指标档案完备</strong>
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-[12.5px]">
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">用水单位全称</span>
                <span class="text-slate-800 font-medium leading-relaxed truncate" :title="record.unitName">{{ record.unitName }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">统一社会信用代码</span>
                <span class="text-slate-800 font-mono font-medium">{{ record.creditCode }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">所属行政区划</span>
                <span class="text-slate-800 font-medium">{{ record.city }} · {{ record.district }}</span>
              </div>

              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">行业类型</span>
                <span class="text-slate-800 font-medium">{{ record.industryType }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水类型</span>
                <span class="text-slate-800 font-medium">{{ record.waterIntakeType }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">直管类型</span>
                <span class="text-slate-800 font-medium">{{ record.directManageType }}</span>
              </div>

              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">是否自备水源取水</span>
                <span :class="record.isSelfWaterSource === '是' ? 'text-emerald-600 font-semibold' : 'text-slate-600'">
                  {{ record.isSelfWaterSource === '是' ? '是（自备井取水）' : '否' }}
                </span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">公共管网取水</span>
                <span class="text-slate-800 font-medium">{{ record.isPublicPipeNetwork }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">是否规上企业</span>
                <span :class="record.isAboveDesignatedSize === '是' ? 'text-amber-600 font-semibold' : 'text-slate-500'">
                  {{ record.isAboveDesignatedSize === '是' ? '是（规上工业）' : '否' }}
                </span>
              </div>

              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">重点监督类型</span>
                <span class="text-slate-800 font-medium">{{ record.keyType }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水许可证编号</span>
                <span class="text-slate-800 font-mono font-medium">{{ record.permitNumber || '取水（青宁）字[2025]第0012号' }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">上级主管部门</span>
                <span class="text-slate-800 font-medium">{{ record.supervisorUnit || '西宁市水务局' }}</span>
              </div>
            </div>
          </div>

          <!-- 卡片 1.2: 水量指标申报与核定批复对照 -->
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-emerald-500 rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">水量指标申报与核定批复对照 (万m³)</span>
              </div>
              <span class="text-xs font-bold text-[#1677ff]">计量单位: 万m³</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="p-3.5 bg-[#f8fafc] rounded-lg border border-slate-200">
                <span class="text-slate-400 block mb-1">取水许可证年度许可额度</span>
                <div class="text-xl font-bold font-mono text-slate-800">
                  {{ record.permitVolume.toFixed(2) }} <span class="text-xs font-normal text-slate-500">万m³</span>
                </div>
                <span class="text-[11px] text-slate-400 mt-1 block">取水许可红线刚性控制值</span>
              </div>

              <div class="p-3.5 bg-blue-50/40 rounded-lg border border-blue-200">
                <span class="text-blue-600 font-medium block mb-1">企业申请填报计划水量</span>
                <div class="text-xl font-bold font-mono text-[#1677ff]">
                  {{ record.planVolume.toFixed(2) }} <span class="text-xs font-normal text-slate-500">万m³</span>
                </div>
                <span class="text-[11px] text-blue-500 mt-1 block">申请时间：{{ record.applyDate || '2025-01-15' }}</span>
              </div>

              <div class="p-3.5 bg-emerald-50/40 rounded-lg border border-emerald-200">
                <span class="text-emerald-700 font-medium block mb-1">最终核定批复计划总量</span>
                <div class="text-xl font-bold font-mono text-emerald-600">
                  {{ (record.approvedVolume || record.planVolume).toFixed(2) }} <span class="text-xs font-normal text-slate-500">万m³</span>
                </div>
                <span class="text-[11px] text-emerald-600 mt-1 block">
                  {{ record.status === '审核通过' ? '已正式批准下达' : '待最终审核批复' }}
                </span>
              </div>
            </div>

            <!-- 明细表格 -->
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr class="divide-x divide-slate-200">
                  <th class="px-3 py-2">水源构成</th>
                  <th class="px-3 py-2 text-right font-mono">申报水量 (万m³)</th>
                  <th class="px-3 py-2 text-right font-mono">核定水量 (万m³)</th>
                  <th class="px-3 py-2">水源调配与节水评价分析</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                <tr class="divide-x divide-slate-100">
                  <td class="px-3 py-2 font-medium text-slate-800">常规地表水</td>
                  <td class="px-3 py-2 text-right font-mono">{{ record.surfaceWater.toFixed(2) }}</td>
                  <td class="px-3 py-2 text-right font-mono text-emerald-700 font-semibold">{{ (record.approvedSurfaceWater || record.surfaceWater).toFixed(2) }}</td>
                  <td class="px-3 py-2 text-slate-600">按西宁市湟水河流域地表水取水指标配额下达</td>
                </tr>
                <tr class="divide-x divide-slate-100">
                  <td class="px-3 py-2 font-medium text-slate-800">承压地下水</td>
                  <td class="px-3 py-2 text-right font-mono">{{ record.groundwater.toFixed(2) }}</td>
                  <td class="px-3 py-2 text-right font-mono text-emerald-700 font-semibold">{{ (record.approvedGroundwater || record.groundwater).toFixed(2) }}</td>
                  <td class="px-3 py-2 text-slate-600">严格落实超采区地下水压采减量方案</td>
                </tr>
                <tr class="divide-x divide-slate-100 bg-slate-50/40">
                  <td class="px-3 py-2 font-medium text-emerald-700">非常规水总计</td>
                  <td class="px-3 py-2 text-right font-mono font-medium text-emerald-700">{{ record.unconventionalTotal.toFixed(2) }}</td>
                  <td class="px-3 py-2 text-right font-mono font-semibold text-emerald-700">{{ (record.approvedUnconventionalWater || record.unconventionalTotal).toFixed(2) }}</td>
                  <td class="px-3 py-2 text-emerald-600">包含中水利用、矿坑疏干水及雨水循环</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tab 2: 全流程审批履历 -->
        <div v-else-if="activeTab === 'audit'" class="space-y-2.5 animate-in fade-in duration-150">
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-blue-600 rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">审批流程轨迹跟踪</span>
              </div>
              <span class="text-[11px] text-slate-400">数字政务电子签章已备案</span>
            </div>

            <div class="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
              <div
                v-for="(item, idx) in record.auditHistory || []"
                :key="idx"
                class="relative flex flex-col gap-1 text-xs"
              >
                <div
                  class="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-white flex items-center justify-center"
                  :class="item.status === 'passed' ? 'border-emerald-500 text-emerald-500' : item.status === 'rejected' ? 'border-rose-500 text-rose-500' : 'border-blue-500 text-blue-500'"
                >
                  <div class="w-1.5 h-1.5 rounded-full" :class="item.status === 'passed' ? 'bg-emerald-500' : item.status === 'rejected' ? 'bg-rose-500' : 'bg-blue-500'"></div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-slate-800 text-[13px]">{{ item.stepName }}</span>
                  <span class="text-slate-400 font-mono text-[11px]">{{ item.time }}</span>
                  <span
                    class="px-2 py-0.5 rounded text-[10.5px] font-medium"
                    :class="item.status === 'passed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : item.status === 'rejected' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-blue-50 text-blue-600 border border-blue-200'"
                  >
                    {{ item.action }}
                  </span>
                </div>
                <div class="text-slate-700 text-xs leading-relaxed bg-[#f8fafc] p-3 rounded-lg border border-slate-200/80 space-y-1 mt-1">
                  <div class="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>办理人：{{ item.operator }}</span>
                    <span>所属部门：{{ item.department }}</span>
                  </div>
                  <p class="text-slate-800 font-medium">{{ item.opinion }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 3: 计划用水核定告知书凭证 (模版) -->
        <div v-else-if="activeTab === 'document'" class="space-y-2.5 animate-in fade-in duration-150">
          <div class="bg-white rounded-lg border border-slate-200/90 p-8 shadow-sm max-w-[800px] mx-auto text-slate-800 space-y-6 relative overflow-hidden">
            <!-- 红色官方公章水印模拟 -->
            <div class="absolute right-12 bottom-16 pointer-events-none opacity-85 select-none rotate-[-12deg]">
              <div class="w-32 h-32 rounded-full border-4 border-rose-600 flex flex-col items-center justify-center text-rose-600 text-[11px] font-bold p-2 text-center tracking-tight shadow-xs">
                <span>★</span>
                <span>西宁市水务局</span>
                <span class="text-[9px] font-normal">水资源管理专用章</span>
                <span class="text-[8px] font-mono mt-0.5">63010002891</span>
              </div>
            </div>

            <!-- 公文头 -->
            <div class="text-center space-y-1.5 border-b-2 border-rose-600 pb-4">
              <h2 class="text-xl font-bold tracking-widest text-rose-700 font-serif">西宁市水资源管理委员会办公室文件</h2>
              <div class="text-xs text-slate-500 font-mono">宁水资计〔{{ record.year }}〕第 0428 号</div>
            </div>

            <!-- 正文 -->
            <div class="space-y-3.5 text-xs leading-relaxed text-slate-800">
              <p class="font-bold text-sm">【{{ record.unitName }}】：</p>
              <p class="indent-6">
                贵单位报送的《{{ record.year }}年度计划用水申请表》（信用代码：{{ record.creditCode }}）收悉。
                依据《青海省节约用水条例》及《西宁市计划用水管理实施细则》，经组织专家与水行政主管部门严格核实，
                现核定下达贵单位 {{ record.year }} 年度用水计划指标如下：
              </p>

              <div class="bg-[#f8fafc] p-4 rounded border border-slate-200 space-y-2 my-2 font-mono text-[11.5px]">
                <div class="flex justify-between">
                  <span class="text-slate-500">一、年度计划总用水量：</span>
                  <strong class="text-slate-900 text-sm">{{ (record.approvedVolume || record.planVolume).toFixed(2) }} 万立方米 (万m³)</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">二、其中常规地表水取水指标：</span>
                  <span>{{ (record.approvedSurfaceWater || record.surfaceWater).toFixed(2) }} 万m³</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">三、其中承压地下水取水指标：</span>
                  <span>{{ (record.approvedGroundwater || record.groundwater).toFixed(2) }} 万m³</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">四、非常规水（中水/雨水等）配置指标：</span>
                  <span class="text-emerald-700">{{ (record.approvedUnconventionalWater || record.unconventionalTotal).toFixed(2) }} 万m³</span>
                </div>
              </div>

              <p class="indent-6">
                请贵单位严格按照批复的计划指标组织生产用水，健全内部用水台账，按期报送计量抄表数据。
                超计划、超定额取用水将严格按照《城镇供水价格管理办法》累进加价征收水资源费（税）。
              </p>
            </div>

            <!-- 落款 -->
            <div class="pt-8 text-right space-y-1 text-xs">
              <div class="font-bold text-slate-800">西宁市水务局（代章）</div>
              <div class="text-slate-500 font-mono">{{ record.auditDate || record.applyDate || '2025年02月15日' }}</div>
            </div>
          </div>
        </div>

        <!-- Tab 4: 申报佐证附件材料 (完全同计量设施档案列表查看与审核弹窗保持一致) -->
        <div v-else-if="activeTab === 'attachments'" class="space-y-2.5 animate-in fade-in duration-150">
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3 bg-[#1677ff] rounded-full"></span>
                <span class="text-[13px] font-bold text-slate-800">申报佐证附件材料列表</span>
                <span class="text-xs text-gray-400 font-mono">({{ attachments.length }} 个文件)</span>
              </div>
              <span class="text-[11px] text-gray-400">水利核验佐证凭据</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div
                v-for="(att, aIdx) in attachments"
                :key="aIdx"
                class="flex items-center justify-between p-2.5 rounded-lg border border-[#c4d8ee] bg-[#f9fbfe] hover:bg-[#f0f5fd] transition gap-2.5"
              >
                <div class="flex items-center gap-2.5 min-w-0 flex-1">
                  <!-- 1. 图片图标 (蓝底相机) -->
                  <div
                    v-if="att.type === 'image'"
                    class="w-7 h-7 rounded bg-[#e6f1fc] text-[#1677ff] flex items-center justify-center shrink-0"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>

                  <!-- 2. Word 图标 (蓝紫色底 W) -->
                  <div
                    v-else-if="att.type === 'word'"
                    class="w-7 h-7 rounded bg-[#eef0fe] text-[#2f54eb] flex items-center justify-center shrink-0 font-bold text-xs"
                  >
                    W
                  </div>

                  <!-- 3. PDF 图标 (红底文档) -->
                  <div
                    v-else
                    class="w-7 h-7 rounded bg-[#feebee] text-[#f5222d] flex items-center justify-center shrink-0"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </div>

                  <div class="truncate">
                    <span class="text-xs text-gray-800 font-medium truncate block" :title="att.name">
                      {{ att.name }}
                    </span>
                    <span class="text-[10.5px] text-gray-400 font-mono block">
                      {{ att.size }} · 计划申报佐证材料
                    </span>
                  </div>
                </div>

                <div class="flex items-center gap-1.5 shrink-0 text-gray-400">
                  <button
                    v-if="att.type === 'image' || att.type === 'pdf'"
                    type="button"
                    @click.stop="openPreview(att)"
                    class="hover:text-[#1677ff] p-1.5 cursor-pointer rounded transition"
                    title="预览附件"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button
                    type="button"
                    @click.stop="downloadAttachment(att)"
                    class="hover:text-[#1677ff] p-1.5 cursor-pointer rounded transition"
                    title="下载附件"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 4. 底部关闭按钮 -->
      <div class="px-5 py-2 bg-white border-t border-slate-200/90 flex items-center justify-end shrink-0">
        <button
          type="button"
          @click="handleClose"
          class="px-5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer text-xs font-medium"
        >
          关闭
        </button>
      </div>
    </div>

    <!-- 附件在线预览弹窗 (完全与计量设施档案列表查看一致) -->
    <t-dialog
      v-model:visible="previewVisible"
      :header="previewTitle"
      width="600px"
      :footer="false"
    >
      <div class="p-2 space-y-3 select-none">
        <div v-if="previewType === 'image'" class="flex flex-col items-center">
          <div class="w-full max-h-[360px] overflow-hidden rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center p-2">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="现场设备照片"
              class="max-h-[340px] object-contain rounded"
            />
          </div>
          <div class="mt-2 text-xs text-gray-500 flex items-center justify-between w-full px-1">
            <span>核验照片：{{ previewTitle }}</span>
            <span>拍摄时间：2026-03-05 10:24</span>
          </div>
        </div>
        <div v-else-if="previewType === 'pdf'" class="p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600 space-y-2">
          <div class="flex items-center gap-2 font-medium text-gray-900 border-b pb-2">
            <svg class="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span>{{ previewTitle }}</span>
          </div>
          <p>核验结论：经审核，该佐证材料符合西宁市计划用水管理实施细则规范标准，印章齐全。</p>
          <div class="pt-2 text-right text-gray-400 font-mono">西宁市水资源管理委员会办公室</div>
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { WaterPlanRecord } from '../../../types';

const props = defineProps<{
  visible: boolean;
  record: WaterPlanRecord | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
}>();

const activeTab = ref<'info' | 'audit' | 'document' | 'attachments'>('info');

const attachments = ref([
  {
    name: '2026年度计划用水申报书(盖章件).pdf',
    type: 'pdf',
    size: '2.4 MB'
  },
  {
    name: '企业水平衡测试与节水评价报告.docx',
    type: 'word',
    size: '5.8 MB'
  },
  {
    name: '取水口超声水表工况现场照片.jpg',
    type: 'image',
    size: '1.2 MB'
  }
]);

const previewVisible = ref(false);
const previewTitle = ref('');
const previewType = ref<'image' | 'pdf'>('image');

const openPreview = (att: { name: string; type: string }) => {
  previewTitle.value = att.name;
  previewType.value = att.type === 'image' ? 'image' : 'pdf';
  previewVisible.value = true;
};

const downloadAttachment = (att: { name: string }) => {
  MessagePlugin.success(`开始下载佐证附件：${att.name}`);
};

const handleClose = () => {
  emit('update:visible', false);
};

const handlePrint = () => {
  activeTab.value = 'document';
  setTimeout(() => {
    window.print();
  }, 200);
};
</script>
