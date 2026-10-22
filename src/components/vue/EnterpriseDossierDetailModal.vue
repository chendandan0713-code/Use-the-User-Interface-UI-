<template>
  <!-- 模态背景层 -->
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs select-none"
    @click.self="handleClose"
  >
    <!-- 弹窗主容器 (尺寸宽敞，全屏自适应，最大高度控制并支持内容顺畅滚动) -->
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      <!-- 1. 弹窗顶部标题栏 -->
      <div class="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-[#1677ff]"></div>
          <h3 class="text-base font-bold text-slate-900 tracking-tight">档案查看</h3>
          <span class="text-xs text-slate-400 font-normal ml-2">取水权人一户一档全景数据台账</span>
        </div>

        <button
          type="button"
          @click="handleClose"
          class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          title="关闭弹窗"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 弹窗可滚动主体区 -->
      <div class="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4 bg-[#f8fafc]">
        <!-- 2. 顶部企业基本信息与生命周期流程卡片 (参考截图样式) -->
        <div class="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs">
          <!-- 第一行：企业名称、状态标签与电子证照预览按钮 -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3">
            <div class="flex items-center gap-3 flex-wrap">
              <!-- 企业建筑图标 -->
              <div class="w-9 h-9 rounded-lg bg-blue-50 text-[#1677ff] flex items-center justify-center shrink-0">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 2h2v2h-2V5zm0 4h2v2h-2V9zm0 4h2v2h-2v-2zm-4-8h2v2H8V5zm0 4h2v2H8V9zm0 4h2v2H8v-2zm-4-8h2v2H4V5zm0 4h2v2H4V9zm0 4h2v2H4v-2zm16 14H4v-2h16v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2z"/>
                </svg>
              </div>

              <!-- 企业/取水权人全称 -->
              <h2 class="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
                {{ dossierData.waterOwnerName }}
              </h2>

              <!-- 状态徽标 (如：新发 / 正常 / 延续) -->
              <span
                class="px-2.5 py-0.5 rounded-full text-xs font-medium border"
                :class="
                  dossierData.licenseStatus === '正常'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : dossierData.licenseStatus === '临期'
                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                    : 'bg-blue-50 text-blue-700 border-blue-300'
                "
              >
                {{ dossierData.licenseStatus === '正常' ? '新发' : dossierData.licenseStatus }}
              </span>

              <span
                v-if="dossierData.dataSourceType"
                class="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
              >
                {{ dossierData.dataSourceType }}
              </span>
            </div>

            <!-- 右上角：电子证照预览按钮 -->
            <button
              type="button"
              @click="showLicensePreview = true"
              class="px-4 py-1.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs hover:shadow-xs shrink-0"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <line x1="7" y1="8" x2="17" y2="8"></line>
                <line x1="7" y1="12" x2="17" y2="12"></line>
                <line x1="7" y1="16" x2="12" y2="16"></line>
              </svg>
              <span>电子证照预览</span>
            </button>
          </div>

          <!-- 第二行：信用代码、许可证编号、有效期限 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-y-1.5 gap-x-4 text-xs text-slate-600 pt-1">
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400">信用代码：</span>
              <span class="font-mono text-slate-800 font-medium">{{ dossierData.creditCode }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400">许可证：</span>
              <span class="font-mono text-blue-700 font-medium">{{ dossierData.permitNumber }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400">许可证有效期：</span>
              <span class="font-mono text-slate-800">2025-1-30 ~ 2030-1-30</span>
            </div>
          </div>

          <!-- 第三行：发证机关 -->
          <div class="text-xs text-slate-600 pt-1.5 flex items-center gap-1.5">
            <span class="text-slate-400">发证机关：</span>
            <span class="text-slate-800 font-medium">{{ dossierData.issuingAuthority }}水资源管理处</span>
          </div>

          <!-- 第四行：许可生命周期进度轴 (8 个节点：水许可申请 -> 下发决定书 -> 提交验收申请 -> 现场验收 -> 发证 -> 延续 -> 变更 -> 注销) -->
          <div class="mt-6 pt-2 pb-1 overflow-x-auto no-scrollbar">
            <div class="min-w-[700px] flex items-center justify-between relative px-4">
              <!-- 贯穿水平进度连接线 -->
              <div class="absolute left-7 right-7 top-3 h-0.5 bg-blue-200 z-0"></div>

              <!-- 节点 1: 水许可申请 -->
              <div class="flex flex-col items-center relative z-10 text-center w-24">
                <div class="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                  1
                </div>
                <span class="text-xs font-medium text-slate-800 mt-1.5">水许可申请</span>
                <span class="text-[11px] text-slate-400 font-mono mt-0.5">2025-1-31</span>
              </div>

              <!-- 节点 2: 下发决定书 -->
              <div class="flex flex-col items-center relative z-10 text-center w-24">
                <div class="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                  2
                </div>
                <span class="text-xs font-medium text-slate-800 mt-1.5">下发决定书</span>
                <span class="text-[11px] text-slate-400 font-mono mt-0.5">2025-1-31</span>
              </div>

              <!-- 节点 3: 提交验收申请 -->
              <div class="flex flex-col items-center relative z-10 text-center w-24">
                <div class="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                  3
                </div>
                <span class="text-xs font-medium text-slate-800 mt-1.5">提交验收申请</span>
                <span class="text-[11px] text-slate-400 font-mono mt-0.5">2025-1-31</span>
              </div>

              <!-- 节点 4: 现场验收 -->
              <div class="flex flex-col items-center relative z-10 text-center w-24">
                <div class="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                  4
                </div>
                <span class="text-xs font-medium text-slate-800 mt-1.5">现场验收</span>
                <span class="text-[11px] text-slate-400 font-mono mt-0.5">2025-1-31</span>
              </div>

              <!-- 节点 5: 发证 -->
              <div class="flex flex-col items-center relative z-10 text-center w-24">
                <div class="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                  5
                </div>
                <span class="text-xs font-medium text-slate-800 mt-1.5">发证</span>
                <span class="text-[11px] text-slate-400 font-mono mt-0.5">2025-1-31</span>
              </div>

              <!-- 节点 6: 延续 -->
              <div class="flex flex-col items-center relative z-10 text-center w-24">
                <div class="w-6 h-6 rounded-full bg-blue-400 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                  6
                </div>
                <span class="text-xs font-medium text-slate-700 mt-1.5">延续</span>
                <span class="text-[11px] text-slate-400 font-mono mt-0.5">2025-1-31</span>
              </div>

              <!-- 节点 7: 变更 -->
              <div class="flex flex-col items-center relative z-10 text-center w-24">
                <div class="w-6 h-6 rounded-full bg-blue-300 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                  7
                </div>
                <span class="text-xs font-medium text-slate-600 mt-1.5">变更</span>
                <span class="text-[11px] text-slate-400 font-mono mt-0.5">2025-1-31</span>
              </div>

              <!-- 节点 8: 注销 -->
              <div class="flex flex-col items-center relative z-10 text-center w-24">
                <div class="w-6 h-6 rounded-full bg-slate-300 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                  8
                </div>
                <span class="text-xs font-medium text-slate-500 mt-1.5">注销</span>
                <span class="text-[11px] text-slate-400 font-mono mt-0.5">2025-1-31</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 虚线分割线 (严格对应截图) -->
        <div class="border-b border-dashed border-slate-300 my-1"></div>

        <!-- 3. 功能 Tab 导航栏 (9个选项卡，包含带闪电/标识的小角标) -->
        <div class="flex items-center gap-1 border-b border-slate-200 overflow-x-auto no-scrollbar bg-white rounded-t-lg px-2 pt-1 shrink-0">
          <button
            v-for="tab in tabList"
            :key="tab.key"
            type="button"
            @click="activeTabKey = tab.key"
            class="relative px-3.5 py-2.5 text-xs font-medium transition cursor-pointer flex items-center gap-1 whitespace-nowrap"
            :class="
              activeTabKey === tab.key
                ? 'text-[#1677ff] font-bold border-b-2 border-[#1677ff] bg-blue-50/40'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-b-2 border-transparent'
            "
          >
            <span>{{ tab.key === 'meter' ? `计量设施(${meterFacilities.length})` : tab.label }}</span>
            <!-- 闪电小角标 (如截图样式) -->
            <svg
              v-if="tab.hasBadge"
              class="w-3 h-3 text-blue-500 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </button>
        </div>

        <!-- 4. Tab 页面内容区 -->
        <div class="space-y-4">
          <!-- ==================== Tab 1: 基础信息 (对应截图主视图) ==================== -->
          <div v-show="activeTabKey === 'basic'" class="space-y-4">
            <!-- 模块 1: 取水权人基础信息 -->
            <div class="bg-white rounded-lg border border-[#cde0f5] overflow-hidden shadow-2xs">
              <!-- 模块标题栏 (浅蓝底、加粗深蓝文字) -->
              <div class="bg-[#f0f6ff] px-4 py-2.5 border-b border-[#cde0f5] flex items-center justify-between">
                <span class="text-xs font-bold text-[#1677ff]">取水权人基础信息</span>
                <span class="text-[11px] text-slate-400">登记状态：正常建档</span>
              </div>

              <!-- 基础信息表格 (严格去除用户用红笔圈出的"一共有取水许可证") -->
              <table class="w-full text-left text-xs border-collapse">
                <tbody>
                  <!-- 行 1: 取水权人名称 + 统一社会信用代码 -->
                  <tr class="border-b border-slate-200">
                    <td class="w-36 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200">
                      取水权人名称
                    </td>
                    <td class="py-2.5 px-4 text-slate-800 font-medium border-r border-slate-200">
                      {{ dossierData.waterOwnerName }}
                    </td>
                    <td class="w-40 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200">
                      统一社会信用代码
                    </td>
                    <td class="py-2.5 px-4 font-mono text-slate-800 font-medium">
                      {{ dossierData.creditCode }}
                    </td>
                  </tr>

                  <!-- 行 2: 取水代表人 + 注册地址 -->
                  <tr class="border-b border-slate-200">
                    <td class="w-36 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200">
                      取水代表人
                    </td>
                    <td class="py-2.5 px-4 text-slate-800 border-r border-slate-200">
                      {{ dossierData.legalPerson || '张三' }}
                    </td>
                    <td class="w-40 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200">
                      注册地址
                    </td>
                    <td class="py-2.5 px-4 text-slate-800">
                      {{ dossierData.address || `青海省-西宁市-${dossierData.district}-谢家沟乡-南村` }}
                    </td>
                  </tr>

                  <!-- 行 3: 法定代表人 + 联系人及联系方式 -->
                  <tr class="border-b border-slate-200">
                    <td class="w-36 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200">
                      法定代表人
                    </td>
                    <td class="py-2.5 px-4 text-slate-800 border-r border-slate-200">
                      {{ dossierData.legalPerson || '张三' }}
                    </td>
                    <td class="w-40 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200">
                      联系人及联系方式
                    </td>
                    <td class="py-2.5 px-4 font-mono text-slate-800">
                      {{ dossierData.contactPhone || '13800138000' }}
                    </td>
                  </tr>

                  <!-- 行 4: 取水用途 + 行业类型 -->
                  <tr class="border-b border-slate-200">
                    <td class="w-36 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200">
                      取水用途
                    </td>
                    <td class="py-2.5 px-4 text-slate-800 border-r border-slate-200">
                      工业用水
                    </td>
                    <td class="w-40 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200">
                      行业类型
                    </td>
                    <td class="py-2.5 px-4 text-slate-800">
                      工业
                    </td>
                  </tr>

                  <!-- 行 5: 当前取水许可证编号 (注意：按用户红字标注，原左侧"一共有取水许可证 2个"已严格去掉) -->
                  <tr>
                    <td class="w-36 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200">
                      当前取水许可证编号
                    </td>
                    <td colspan="3" class="py-2.5 px-4 font-mono text-blue-700 font-semibold">
                      {{ dossierData.permitNumber }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 模块 2: 当权取水许可证信息 (不用表格展示，采用现代卡片看板样式展现7项核心指标) -->
            <div class="bg-white rounded-lg border border-[#cde0f5] overflow-hidden shadow-2xs">
              <!-- 模块标题栏与当权证照身份标识 -->
              <div class="bg-[#f0f6ff] px-4 py-2.5 border-b border-[#cde0f5] flex flex-wrap items-center justify-between gap-2.5">
                <div class="flex items-center gap-2">
                  <div class="w-2.5 h-2.5 rounded-full bg-[#1677ff]"></div>
                  <span class="text-xs font-bold text-[#1677ff] tracking-tight">当权取水许可证信息</span>
                  <span
                    class="px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 border"
                    :class="
                      dossierData.licenseStatus === '正常'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : dossierData.licenseStatus === '临期'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    "
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{{ dossierData.licenseStatus === '正常' ? '当前有效执业证照' : dossierData.licenseStatus }}</span>
                  </span>
                </div>

                <!-- 证照核心元信息提示条 -->
                <div class="flex flex-wrap items-center gap-2.5 text-xs text-slate-600">
                  <span class="flex items-center gap-1">
                    <span class="text-slate-400">许可证号：</span>
                    <strong class="font-mono text-blue-700 font-semibold">{{ dossierData.permitNumber }}</strong>
                  </span>
                  <span class="text-slate-300">|</span>
                  <span class="flex items-center gap-1">
                    <span class="text-slate-400">有效期限：</span>
                    <span class="font-mono text-slate-700 font-medium">2025-01-30 ~ 2030-01-30</span>
                  </span>
                  <span class="text-slate-300">|</span>
                  <span class="flex items-center gap-1">
                    <span class="text-slate-400">水源类型：</span>
                    <span class="px-1.5 py-0.2 rounded text-[11px] bg-sky-50 text-sky-700 font-medium border border-sky-200">
                      {{ dossierData.waterSourceType || '地表水/地下水' }}
                    </span>
                  </span>
                  <span class="text-slate-300">|</span>
                  <span class="flex items-center gap-1">
                    <span class="text-slate-400">年许可水量：</span>
                    <strong class="font-mono text-slate-900 font-semibold">
                      {{ dossierData.annualPermitVolume ? dossierData.annualPermitVolume.toFixed(2) + ' 万m³' : '1200.00 万m³' }}
                    </strong>
                  </span>
                </div>
              </div>

              <!-- 7项指标卡片矩阵 (非表格展示：响应式网格卡片组，视觉高亮、层级鲜明、支持快速穿透跳转) -->
              <div class="p-3.5 bg-[#f8fafc]">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2.5">
                  <!-- 1. 取水工程数量 -->
                  <div
                    @click="navigateToTab('intake')"
                    class="bg-white rounded-xl p-3 border border-blue-200/90 hover:border-blue-500 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all flex flex-col justify-between group cursor-pointer"
                    title="点击跳转查看【取水工程/取水口】明细台账"
                  >
                    <div class="flex items-center justify-between">
                      <div class="w-8 h-8 rounded-lg bg-blue-50 text-[#1677ff] flex items-center justify-center shrink-0">
                        <!-- 水利提水工程图标 -->
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M3 21h18"></path>
                          <path d="M5 21V7l7-4 7 4v14"></path>
                          <path d="M9 10a3 3 0 0 1 6 0v11"></path>
                        </svg>
                      </div>
                      <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                        工程设施
                      </span>
                    </div>

                    <div class="mt-2.5">
                      <div class="text-[11px] font-medium text-slate-500">取水工程数量</div>
                      <div class="mt-1 flex items-baseline gap-1">
                        <span class="font-mono text-2xl font-extrabold text-blue-700 tracking-tight group-hover:text-blue-600 transition-colors">
                          {{ dossierData.intakeProjectCount || 2 }}
                        </span>
                        <span class="text-xs text-slate-500 font-medium">处</span>
                      </div>
                    </div>

                    <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span class="truncate">关联取水口 {{ dossierData.intakeCount || 3 }} 个</span>
                      <span class="text-blue-600 font-medium group-hover:translate-x-0.5 transition-transform shrink-0">明细&gt;</span>
                    </div>
                  </div>

                  <!-- 2. 在线计量设施 -->
                  <div
                    @click="navigateToTab('meter')"
                    class="bg-white rounded-xl p-3 border border-emerald-200/90 hover:border-emerald-500 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all flex flex-col justify-between group cursor-pointer"
                    title="点击跳转查看【计量设施】监控清单"
                  >
                    <div class="flex items-center justify-between">
                      <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <!-- 智能仪表信号图标 -->
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="12" r="9"></circle>
                          <path d="M12 7v5l3 3"></path>
                          <circle cx="12" cy="12" r="1"></circle>
                        </svg>
                      </div>
                      <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>RTU在线</span>
                      </span>
                    </div>

                    <div class="mt-2.5">
                      <div class="text-[11px] font-medium text-slate-500">在线计量设施</div>
                      <div class="mt-1 flex items-baseline gap-1">
                        <span class="font-mono text-2xl font-extrabold text-emerald-700 tracking-tight group-hover:text-emerald-800 transition-colors">
                          {{ dossierData.onlineMeteringCount || 6 }}
                        </span>
                        <span class="text-xs text-slate-500 font-medium">套</span>
                      </div>
                    </div>

                    <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span class="text-emerald-700 font-medium truncate">在线率 {{ getOnlineRate(dossierData) }}%</span>
                      <span class="text-emerald-600 font-medium group-hover:translate-x-0.5 transition-transform shrink-0">清单&gt;</span>
                    </div>
                  </div>

                  <!-- 3. 今年年计划水量 -->
                  <div
                    @click="navigateToTab('water_data')"
                    class="bg-white rounded-xl p-3 border border-indigo-200/90 hover:border-indigo-500 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all flex flex-col justify-between group cursor-pointer"
                    title="点击跳转查看【水量数据】年度月度计划分析"
                  >
                    <div class="flex items-center justify-between">
                      <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <!-- 日历计划水滴图标 -->
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                        2026年指标
                      </span>
                    </div>

                    <div class="mt-2.5">
                      <div class="text-[11px] font-medium text-slate-500">今年年计划水量</div>
                      <div class="mt-1 flex items-baseline gap-1">
                        <span class="font-mono text-xl font-extrabold text-indigo-700 tracking-tight group-hover:text-indigo-800 transition-colors">
                          {{ getDossierPlanVolume(dossierData) }}
                        </span>
                        <span class="text-[11px] text-slate-500 font-medium">万m³</span>
                      </div>
                    </div>

                    <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span class="truncate">按月计划分解下达</span>
                      <span class="text-indigo-600 font-medium group-hover:translate-x-0.5 transition-transform shrink-0">台账&gt;</span>
                    </div>
                  </div>

                  <!-- 4. 历年平均计量水量 -->
                  <div
                    @click="navigateToTab('water_data')"
                    class="bg-white rounded-xl p-3 border border-sky-200/90 hover:border-sky-500 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all flex flex-col justify-between group cursor-pointer"
                    title="点击跳转查看【水量数据】历史折线走势"
                  >
                    <div class="flex items-center justify-between">
                      <div class="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                        <!-- 折线走势趋势图标 -->
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                      </div>
                      <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100">
                        5年均值
                      </span>
                    </div>

                    <div class="mt-2.5">
                      <div class="text-[11px] font-medium text-slate-500">历年平均计量水量</div>
                      <div class="mt-1 flex items-baseline gap-1">
                        <span class="font-mono text-xl font-extrabold text-sky-800 tracking-tight group-hover:text-sky-900 transition-colors">
                          {{ getDossierHistoricalAvg(dossierData) }}
                        </span>
                        <span class="text-[11px] text-slate-500 font-medium">万m³</span>
                      </div>
                    </div>

                    <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span class="truncate">历史实际核算均值</span>
                      <span class="text-sky-600 font-medium group-hover:translate-x-0.5 transition-transform shrink-0">对标&gt;</span>
                    </div>
                  </div>

                  <!-- 5. 今年已纳税 -->
                  <div
                    @click="navigateToTab('tax')"
                    class="bg-white rounded-xl p-3 border border-amber-200/90 hover:border-amber-500 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all flex flex-col justify-between group cursor-pointer"
                    title="点击跳转查看【缴税信息】完税凭证与税期申报"
                  >
                    <div class="flex items-center justify-between">
                      <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <!-- 货币纳税水资源税印章图标 -->
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                          <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                      </div>
                      <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100">
                        水资源税
                      </span>
                    </div>

                    <div class="mt-2.5">
                      <div class="text-[11px] font-medium text-slate-500">今年已纳税</div>
                      <div class="mt-1 flex items-baseline gap-1">
                        <span class="font-mono text-xl font-extrabold text-amber-700 tracking-tight group-hover:text-amber-800 transition-colors">
                          {{ getDossierTaxPaid(dossierData) }}
                        </span>
                        <span class="text-[11px] text-slate-500 font-medium">万元</span>
                      </div>
                    </div>

                    <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span class="text-amber-800 font-medium truncate">完税凭证正常归集</span>
                      <span class="text-amber-600 font-medium group-hover:translate-x-0.5 transition-transform shrink-0">完税&gt;</span>
                    </div>
                  </div>

                  <!-- 6. 违规问题的次数取水口 -->
                  <div
                    @click="navigateToTab('violation')"
                    class="bg-white rounded-xl p-3 border shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all flex flex-col justify-between group cursor-pointer"
                    :class="
                      getDossierViolationCount(dossierData) === 0
                        ? 'border-emerald-200/90 hover:border-emerald-500'
                        : 'border-rose-200/90 hover:border-rose-500'
                    "
                    title="点击跳转查看【违法违规】排查督办工单"
                  >
                    <div class="flex items-center justify-between">
                      <div
                        class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        :class="getDossierViolationCount(dossierData) === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'"
                      >
                        <!-- 合规盾牌安全图标 -->
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          <path v-if="getDossierViolationCount(dossierData) === 0" d="m9 12 2 2 4-4"></path>
                          <line v-else x1="12" y1="8" x2="12" y2="12"></line>
                        </svg>
                      </div>
                      <span
                        class="text-[10px] font-medium px-1.5 py-0.5 rounded border"
                        :class="
                          getDossierViolationCount(dossierData) === 0
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-rose-50 text-rose-700 border-rose-100'
                        "
                      >
                        {{ getDossierViolationCount(dossierData) === 0 ? '合规在控' : '异常警示' }}
                      </span>
                    </div>

                    <div class="mt-2.5">
                      <div class="text-[11px] font-medium text-slate-500">违规问题的次数取水口</div>
                      <div class="mt-1 flex items-baseline gap-1">
                        <span
                          class="font-mono text-xl font-extrabold tracking-tight transition-colors"
                          :class="getDossierViolationCount(dossierData) === 0 ? 'text-emerald-700' : 'text-rose-600'"
                        >
                          {{ getDossierViolationCount(dossierData) }}
                        </span>
                        <span class="text-[11px] text-slate-500 font-medium">
                          次 / {{ getDossierViolationIntake(dossierData) }}处口
                        </span>
                      </div>
                    </div>

                    <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span
                        class="truncate"
                        :class="getDossierViolationCount(dossierData) === 0 ? 'text-emerald-700' : 'text-rose-600 font-medium'"
                      >
                        {{ getDossierViolationCount(dossierData) === 0 ? '全域取水口合规' : '工单已核销闭环' }}
                      </span>
                      <span class="text-rose-600 font-medium group-hover:translate-x-0.5 transition-transform shrink-0">排查&gt;</span>
                    </div>
                  </div>

                  <!-- 7. 证照变更次数 -->
                  <div
                    @click="navigateToTab('permit')"
                    class="bg-white rounded-xl p-3 border border-purple-200/90 hover:border-purple-500 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all flex flex-col justify-between group cursor-pointer"
                    title="点击跳转查看【取水许可】证照流转变更履历"
                  >
                    <div class="flex items-center justify-between">
                      <div class="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <!-- 证照批文变更历史图标 -->
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="12" y1="18" x2="12" y2="12"></line>
                          <line x1="9" y1="15" x2="15" y2="15"></line>
                        </svg>
                      </div>
                      <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100">
                        变更流转
                      </span>
                    </div>

                    <div class="mt-2.5">
                      <div class="text-[11px] font-medium text-slate-500">证照变更次数</div>
                      <div class="mt-1 flex items-baseline gap-1">
                        <span class="font-mono text-2xl font-extrabold text-purple-700 tracking-tight group-hover:text-purple-800 transition-colors">
                          {{ getDossierLicenseChangeCount(dossierData) }}
                        </span>
                        <span class="text-xs text-slate-500 font-medium">次</span>
                      </div>
                    </div>

                    <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span class="truncate">延续换证/信息变更</span>
                      <span class="text-purple-600 font-medium group-hover:translate-x-0.5 transition-transform shrink-0">履历&gt;</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 底部便捷穿透与比对说明 -->
              <div class="px-4 py-2 bg-white border-t border-slate-200/90 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
                <div class="flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span>提示：点击各指标卡片可快捷穿透至对应的工程口台账、计量设施、水量核算、完税凭证或违规工单明细。</span>
                </div>
                <div class="flex items-center gap-2 font-mono text-[10.5px] text-slate-400">
                  <span>国控/省控水资源数据实时同步核验</span>
                  <span>·</span>
                  <span class="text-emerald-600 font-sans font-medium">指标核查无异常</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ==================== Tab 2: 取水工程/取水口(3) ==================== -->
          <div v-show="activeTabKey === 'intake'" class="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>取水工程及取水口台账明细 (共 3 处工程，5 处取水口)</span>
              </h4>
              <span class="text-[11px] text-slate-400">水源类型：地表水/地下水</span>
            </div>

            <table class="w-full text-left text-xs border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
                  <th class="py-2 px-3 border-r border-slate-200">序号</th>
                  <th class="py-2 px-3 border-r border-slate-200">工程名称</th>
                  <th class="py-2 px-3 border-r border-slate-200">取水口名称</th>
                  <th class="py-2 px-3 border-r border-slate-200">取水方式</th>
                  <th class="py-2 px-3 border-r border-slate-200">设计取水能力</th>
                  <th class="py-2 px-3 border-r border-slate-200">经纬度坐标</th>
                  <th class="py-2 px-3 border-r border-slate-200">所在水系/河流</th>
                  <th class="py-2 px-3">运行状态</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 border-r border-slate-200 font-mono text-center">1</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-medium text-slate-800">一号泵站提水工程</td>
                  <td class="py-2 px-3 border-r border-slate-200">1# 湟水河地表取水口</td>
                  <td class="py-2 px-3 border-r border-slate-200">泵站提水</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-mono">1.2 万 m³/d</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-mono text-[11px]">101.7821°E, 36.6214°N</td>
                  <td class="py-2 px-3 border-r border-slate-200">黄河水系-湟水干流</td>
                  <td class="py-2 px-3"><span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">正常运行</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 border-r border-slate-200 font-mono text-center">2</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-medium text-slate-800">二号自流引水工程</td>
                  <td class="py-2 px-3 border-r border-slate-200">2# 渠道分水口</td>
                  <td class="py-2 px-3 border-r border-slate-200">管道自流</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-mono">0.8 万 m³/d</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-mono text-[11px]">101.7942°E, 36.6331°N</td>
                  <td class="py-2 px-3 border-r border-slate-200">黄河水系-大通河支流</td>
                  <td class="py-2 px-3"><span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">正常运行</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 border-r border-slate-200 font-mono text-center">3</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-medium text-slate-800">应急地下水井群工程</td>
                  <td class="py-2 px-3 border-r border-slate-200">3# 深水水源机井</td>
                  <td class="py-2 px-3 border-r border-slate-200">深井潜水泵</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-mono">0.5 万 m³/d</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-mono text-[11px]">101.7611°E, 36.6025°N</td>
                  <td class="py-2 px-3 border-r border-slate-200">西宁盆地孔隙地下水</td>
                  <td class="py-2 px-3"><span class="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px]">备用状态</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ==================== Tab 3: 计量设施 ==================== -->
          <div v-show="activeTabKey === 'meter'" class="space-y-4">
            <!-- 1. 计量设施列表选择卡片 -->
            <div class="bg-white rounded-lg border border-[#cde0f5] p-4 shadow-2xs space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div class="flex items-center gap-2">
                  <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <h4 class="text-xs font-bold text-slate-800">
                    计量点与计量设施清单 (共 {{ meterFacilities.length }} 处设施)
                  </h4>
                  <span class="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                    在线率 {{ getOnlineRate(dossierData) }}% · 全域远程 RTU 遥测在线
                  </span>
                </div>

                <div class="flex items-center gap-2 text-xs text-slate-500">
                  <span class="inline-flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                    <svg class="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <span>点击表格中任意计量设施行，下方即可联动查看该设施的基础信息及各类生命周期记录</span>
                  </span>
                </div>
              </div>

              <!-- 计量设施表格 -->
              <div class="overflow-x-auto rounded border border-slate-200">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
                      <th class="py-2.5 px-3 border-r border-slate-200 text-center w-12">选择</th>
                      <th class="py-2.5 px-2.5 border-r border-slate-200 text-center w-12">序号</th>
                      <th class="py-2.5 px-3 border-r border-slate-200">计量设施编码</th>
                      <th class="py-2.5 px-3 border-r border-slate-200">计量点名称</th>
                      <th class="py-2.5 px-2.5 border-r border-slate-200">仪表规格型号</th>
                      <th class="py-2.5 px-2.5 border-r border-slate-200 text-center">采集传输方式</th>
                      <th class="py-2.5 px-2.5 border-r border-slate-200 text-center">通信状态</th>
                      <th class="py-2.5 px-3 border-r border-slate-200 text-right">最新表底 (m³)</th>
                      <th class="py-2.5 px-2.5 border-r border-slate-200 text-right">瞬时流量 (m³/h)</th>
                      <th class="py-2.5 px-3 border-r border-slate-200">最近遥测时间</th>
                      <th class="py-2.5 px-2.5 border-r border-slate-200 text-center">检定周期</th>
                      <th class="py-2.5 px-3 text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 font-mono">
                    <tr
                      v-for="(meter, mIdx) in meterFacilities"
                      :key="meter.id"
                      @click="handleSelectMeterFacility(meter)"
                      class="transition cursor-pointer select-none text-[11.5px]"
                      :class="[
                        selectedMeterFacility?.id === meter.id
                          ? 'bg-blue-50/90 font-medium text-blue-900 border-l-4 border-l-[#1677ff]'
                          : 'hover:bg-slate-50 text-slate-700'
                      ]"
                    >
                      <!-- 单选指示圆点 -->
                      <td class="py-2.5 px-3 border-r border-slate-200 text-center font-sans">
                        <div class="flex items-center justify-center">
                          <span
                            class="w-4 h-4 rounded-full border flex items-center justify-center transition-all"
                            :class="
                              selectedMeterFacility?.id === meter.id
                                ? 'border-[#1677ff] bg-[#1677ff] text-white shadow-xs'
                                : 'border-slate-300 bg-white hover:border-slate-400'
                            "
                          >
                            <svg
                              v-if="selectedMeterFacility?.id === meter.id"
                              class="w-2.5 h-2.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="3"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                        </div>
                      </td>

                      <!-- 序号 -->
                      <td class="py-2.5 px-2.5 border-r border-slate-200 text-center text-slate-500">
                        {{ mIdx + 1 }}
                      </td>

                      <!-- 设施编码 -->
                      <td class="py-2.5 px-3 border-r border-slate-200 font-bold"
                          :class="selectedMeterFacility?.id === meter.id ? 'text-[#1677ff]' : 'text-blue-700'">
                        {{ meter.code }}
                      </td>

                      <!-- 计量点名称 -->
                      <td class="py-2.5 px-3 border-r border-slate-200 font-sans font-medium text-slate-800">
                        <div class="flex items-center gap-1.5">
                          <span>{{ meter.name }}</span>
                          <span
                            v-if="selectedMeterFacility?.id === meter.id"
                            class="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#1677ff] text-white shrink-0"
                          >
                            当前查看
                          </span>
                        </div>
                      </td>

                      <!-- 仪表规格型号 -->
                      <td class="py-2.5 px-2.5 border-r border-slate-200 font-sans text-slate-600">
                        {{ meter.specModel }}
                      </td>

                      <!-- 采集方式 -->
                      <td class="py-2.5 px-2.5 border-r border-slate-200 text-center font-sans">
                        <span class="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[10.5px]">
                          {{ meter.transmissionMethod }}
                        </span>
                      </td>

                      <!-- 运行通信状态 -->
                      <td class="py-2.5 px-2.5 border-r border-slate-200 text-center font-sans">
                        <span
                          class="px-1.5 py-0.5 rounded text-[10.5px] font-medium inline-flex items-center gap-1"
                          :class="
                            meter.status === '正常'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : meter.status === '停用'
                              ? 'bg-slate-100 text-slate-600 border border-slate-200'
                              : 'bg-rose-50 text-rose-600 border border-rose-200'
                          "
                        >
                          <span
                            class="w-1.5 h-1.5 rounded-full"
                            :class="
                              meter.status === '正常'
                                ? 'bg-emerald-500 animate-pulse'
                                : meter.status === '停用'
                                ? 'bg-slate-400'
                                : 'bg-rose-500'
                            "
                          ></span>
                          <span>{{ meter.status === '正常' ? '在线正常' : meter.status }}</span>
                        </span>
                      </td>

                      <!-- 最新表底 -->
                      <td class="py-2.5 px-3 border-r border-slate-200 text-right text-slate-900 font-bold">
                        {{ meter.currentReading.toFixed(1) }}
                      </td>

                      <!-- 瞬时流量 -->
                      <td class="py-2.5 px-2.5 border-r border-slate-200 text-right text-blue-700 font-semibold">
                        {{ meter.instantFlow.toFixed(1) }}
                      </td>

                      <!-- 最近遥测时间 -->
                      <td class="py-2.5 px-3 border-r border-slate-200 text-slate-500 text-[11px]">
                        {{ meter.lastReportTime }}
                      </td>

                      <!-- 检定周期 -->
                      <td class="py-2.5 px-2.5 border-r border-slate-200 text-center font-sans">
                        <span class="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10.5px]">
                          {{ meter.calibrationStatus }}
                        </span>
                      </td>

                      <!-- 操作按钮 -->
                      <td class="py-2.5 px-3 text-center font-sans">
                        <button
                          type="button"
                          @click.stop="handleSelectMeterFacility(meter)"
                          class="px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer"
                          :class="
                            selectedMeterFacility?.id === meter.id
                              ? 'bg-[#1677ff] text-white shadow-2xs font-semibold'
                              : 'text-[#1677ff] bg-blue-50 hover:bg-blue-100'
                          "
                        >
                          {{ selectedMeterFacility?.id === meter.id ? '当前查看' : '选择查看' }}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 2. 下方：选中的计量设施基础信息与各类记录容器 -->
            <div
              v-if="selectedMeterFacility"
              class="bg-white rounded-lg border border-[#cde0f5] shadow-xs overflow-hidden animate-in fade-in duration-150"
            >
              <!-- 顶部选中设施名称横条 -->
              <div class="bg-[#f0f6ff] px-4 py-3 border-b border-[#cde0f5] flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-[#1677ff] text-white flex items-center justify-center shadow-xs shrink-0">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M12 7v5l3 3"></path>
                      <circle cx="12" cy="12" r="1"></circle>
                    </svg>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs font-bold text-slate-800 tracking-tight">
                        {{ selectedMeterFacility.name }}
                      </span>
                      <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold border border-blue-200">
                        {{ selectedMeterFacility.code }}
                      </span>
                      <span
                        class="px-2 py-0.5 rounded text-[11px] font-medium border"
                        :class="
                          selectedMeterFacility.status === '正常'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : selectedMeterFacility.status === '停用'
                            ? 'bg-slate-100 text-slate-700 border-slate-300'
                            : 'bg-rose-50 text-rose-700 border-rose-300'
                        "
                      >
                        {{ selectedMeterFacility.status }}
                      </span>
                      <span class="px-2 py-0.5 rounded text-[11px] bg-sky-50 text-sky-700 border border-sky-200">
                        {{ selectedMeterFacility.specModel }}
                      </span>
                    </div>
                    <div class="text-[11px] text-slate-500 mt-0.5">
                      安装位置：{{ selectedMeterFacility.address }} · 关联取水口：{{ selectedMeterFacility.intakeName }}
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2 text-xs">
                  <span class="text-slate-400">最新底数：</span>
                  <span class="font-mono font-bold text-base text-blue-700">{{ selectedMeterFacility.currentReading.toFixed(1) }}</span>
                  <span class="text-slate-400">m³</span>
                  <span class="text-slate-300">|</span>
                  <span class="text-slate-400">瞬时流量：</span>
                  <span class="font-mono font-bold text-base text-slate-800">{{ selectedMeterFacility.instantFlow.toFixed(1) }}</span>
                  <span class="text-slate-400">m³/h</span>
                </div>
              </div>

              <!-- 选中的计量设施二级 Tab 导航条 (包含基本信息、故障记录、停用记录、换表记录、人工填报记录) -->
              <div class="bg-white border-b border-slate-200 px-4 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 select-none">
                <button
                  v-for="subTab in meterSubTabList"
                  :key="subTab.key"
                  type="button"
                  @click="meterSubTab = subTab.key as any"
                  class="flex items-center gap-1.5 py-2.5 px-3.5 text-xs font-medium border-b-2 transition cursor-pointer whitespace-nowrap"
                  :class="[
                    meterSubTab === subTab.key
                      ? 'border-[#1677ff] text-[#1677ff] font-bold bg-blue-50/50'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  ]"
                >
                  <span>{{ subTab.label }}</span>
                  <span
                    v-if="subTab.count !== undefined"
                    class="px-1.5 py-0.2 rounded-full text-[10px] font-mono"
                    :class="meterSubTab === subTab.key ? 'bg-blue-100 text-[#1677ff] font-bold' : 'bg-slate-100 text-slate-500'"
                  >
                    {{ subTab.count }}
                  </span>
                </button>
              </div>

              <!-- 二级 Tab 内容区 -->
              <div class="p-4 bg-[#f8fafc]/50">
                <!-- 1. 基础信息基本信息 -->
                <div v-show="meterSubTab === 'basic'" class="space-y-3">
                  <!-- 网格卡片布局 -->
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
                    <!-- 卡片 1: 计量器具与技术参数 -->
                    <div class="bg-white rounded-lg border border-slate-200 p-3.5 space-y-2.5 shadow-2xs">
                      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div class="flex items-center gap-1.5 font-bold text-slate-800">
                          <span class="w-1.5 h-3.5 bg-[#1677ff] rounded-full"></span>
                          <span>计量器具与技术参数</span>
                        </div>
                        <span class="text-[11px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                          {{ selectedMeterFacility.accuracy }}
                        </span>
                      </div>

                      <div class="grid grid-cols-2 gap-y-2 gap-x-4">
                        <div><span class="text-slate-400">设施编号：</span><span class="font-mono font-medium text-slate-800">{{ selectedMeterFacility.code }}</span></div>
                        <div><span class="text-slate-400">设施名称：</span><span class="font-medium text-slate-800">{{ selectedMeterFacility.name }}</span></div>
                        <div><span class="text-slate-400">器具类型：</span><span class="text-slate-800">{{ selectedMeterFacility.facilityType }}</span></div>
                        <div><span class="text-slate-400">规格型号：</span><span class="font-medium text-slate-800">{{ selectedMeterFacility.specModel }}</span></div>
                        <div><span class="text-slate-400">公称口径：</span><span class="font-mono text-slate-800">{{ selectedMeterFacility.caliber }}</span></div>
                        <div><span class="text-slate-400">采集方式：</span><span class="text-blue-700 font-medium">{{ selectedMeterFacility.transmissionMethod }}</span></div>
                        <div><span class="text-slate-400">供电方式：</span><span class="text-slate-800">{{ selectedMeterFacility.powerSupply }}</span></div>
                        <div><span class="text-slate-400">监测点编码：</span><span class="font-mono text-slate-800">{{ selectedMeterFacility.monitorPointCode }}</span></div>
                        <div class="col-span-2"><span class="text-slate-400">通信规约：</span><span class="text-slate-700 font-mono text-[11px]">{{ selectedMeterFacility.protocol }}</span></div>
                      </div>
                    </div>

                    <!-- 卡片 2: 安装与管网位置信息 -->
                    <div class="bg-white rounded-lg border border-slate-200 p-3.5 space-y-2.5 shadow-2xs">
                      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div class="flex items-center gap-1.5 font-bold text-slate-800">
                          <span class="w-1.5 h-3.5 bg-[#1677ff] rounded-full"></span>
                          <span>安装与管网位置信息</span>
                        </div>
                        <span class="text-[11px] text-slate-400">地理测绘基准</span>
                      </div>

                      <div class="grid grid-cols-2 gap-y-2 gap-x-4">
                        <div><span class="text-slate-400">行政区划：</span><span class="text-slate-800">青海省 · 西宁市 · {{ dossierData.district }}</span></div>
                        <div><span class="text-slate-400">关联取水权人：</span><span class="text-slate-800 truncate" :title="dossierData.waterOwnerName">{{ dossierData.waterOwnerName }}</span></div>
                        <div><span class="text-slate-400">取水许可证：</span><span class="font-mono text-blue-700 font-medium">{{ dossierData.permitNumber }}</span></div>
                        <div><span class="text-slate-400">关联取水口：</span><span class="text-slate-800 font-medium">{{ selectedMeterFacility.intakeName }}</span></div>
                        <div class="col-span-2"><span class="text-slate-400">安装具体位置：</span><span class="text-slate-800 font-medium">{{ selectedMeterFacility.address }}</span></div>
                        <div class="col-span-2"><span class="text-slate-400">经纬度坐标：</span><span class="font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">{{ selectedMeterFacility.coordinates }}</span></div>
                        <div class="col-span-2"><span class="text-slate-400">遥测站名称：</span><span class="text-slate-800">{{ selectedMeterFacility.stationName }}</span></div>
                      </div>
                    </div>

                    <!-- 卡片 3: 实时工况与运行状态 -->
                    <div class="bg-white rounded-lg border border-slate-200 p-3.5 space-y-2.5 shadow-2xs">
                      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div class="flex items-center gap-1.5 font-bold text-slate-800">
                          <span class="w-1.5 h-3.5 bg-emerald-500 rounded-full"></span>
                          <span>实时工况与遥测数据</span>
                        </div>
                        <span class="text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-medium flex items-center gap-1">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>数据实时到报</span>
                        </span>
                      </div>

                      <div class="grid grid-cols-2 gap-y-2 gap-x-4">
                        <div><span class="text-slate-400">当前运行状态：</span><span class="font-bold text-emerald-600">{{ selectedMeterFacility.status }}</span></div>
                        <div><span class="text-slate-400">最新累计读数：</span><span class="font-mono font-bold text-blue-700">{{ selectedMeterFacility.currentReading.toFixed(1) }} m³</span></div>
                        <div><span class="text-slate-400">安装初始底数：</span><span class="font-mono text-slate-800">{{ selectedMeterFacility.initialReading.toFixed(1) }} m³</span></div>
                        <div><span class="text-slate-400">瞬时取水流量：</span><span class="font-mono font-bold text-slate-800">{{ selectedMeterFacility.instantFlow.toFixed(1) }} m³/h</span></div>
                        <div><span class="text-slate-400">通信信号强度：</span><span class="font-mono text-emerald-600 font-medium">{{ selectedMeterFacility.signalStrength }}% (良好)</span></div>
                        <div><span class="text-slate-400">电池/备电状态：</span><span class="font-mono text-emerald-600 font-medium">{{ selectedMeterFacility.batteryLevel }}% (满电)</span></div>
                        <div class="col-span-2"><span class="text-slate-400">最近遥测上报：</span><span class="font-mono text-slate-700 font-medium">{{ selectedMeterFacility.lastReportTime }}</span></div>
                      </div>
                    </div>

                    <!-- 卡片 4: 运维保障与周期检定 -->
                    <div class="bg-white rounded-lg border border-slate-200 p-3.5 space-y-2.5 shadow-2xs">
                      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div class="flex items-center gap-1.5 font-bold text-slate-800">
                          <span class="w-1.5 h-3.5 bg-indigo-500 rounded-full"></span>
                          <span>管理运维与法定检定</span>
                        </div>
                        <span class="text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-medium">
                          法定强检合格
                        </span>
                      </div>

                      <div class="grid grid-cols-2 gap-y-2 gap-x-4">
                        <div><span class="text-slate-400">管理责任单位：</span><span class="text-slate-800">{{ selectedMeterFacility.manageUnit }}</span></div>
                        <div><span class="text-slate-400">承建施工单位：</span><span class="text-slate-800 truncate" :title="selectedMeterFacility.builderUnit">{{ selectedMeterFacility.builderUnit }}</span></div>
                        <div><span class="text-slate-400">日常运维单位：</span><span class="text-slate-800">{{ selectedMeterFacility.maintainUnit }}</span></div>
                        <div><span class="text-slate-400">现场运维责任人：</span><span class="text-slate-800">{{ selectedMeterFacility.maintainPerson }}</span></div>
                        <div><span class="text-slate-400">检定周期：</span><span class="font-mono text-slate-800">{{ selectedMeterFacility.calibrationPeriod }}</span></div>
                        <div><span class="text-slate-400">检定结论：</span><span class="text-emerald-700 font-bold">合格</span></div>
                        <div><span class="text-slate-400">最近检定日期：</span><span class="font-mono text-slate-800">{{ selectedMeterFacility.lastCalibrationTime }}</span></div>
                        <div><span class="text-slate-400">有效期截止日：</span><span class="font-mono text-emerald-700 font-medium">{{ selectedMeterFacility.calibrationExpiryDate }}</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 2. 故障记录 -->
                <div v-show="meterSubTab === 'fault'" class="space-y-3">
                  <div class="bg-blue-50/60 p-2.5 rounded border border-blue-100 flex items-center justify-between text-xs text-blue-900">
                    <div class="flex items-center gap-2">
                      <span class="font-bold">【{{ selectedMeterFacility.name }}】历史报修与排故履历：</span>
                      <span>累计上报故障 <strong class="text-blue-700 font-mono">{{ selectedMeterFacility.faultRecords.length }}</strong> 次 · 闭环修复率 100%</span>
                    </div>
                    <span class="text-[11px] text-blue-600">全部工单均已核销闭环归档</span>
                  </div>

                  <div class="overflow-x-auto rounded border border-slate-200 bg-white">
                    <table class="w-full text-left text-xs border-collapse">
                      <thead class="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
                        <tr>
                          <th class="py-2.5 px-2.5 text-center w-12 border-r border-slate-200">序号</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">故障工单号</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">发生时间</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">故障类型</th>
                          <th class="py-2.5 px-3 border-r border-slate-200 text-right">故障表底数</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">故障现象及排查</th>
                          <th class="py-2.5 px-2.5 border-r border-slate-200 text-center">处理状态</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">修复时间</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">维修责任人</th>
                          <th class="py-2.5 px-3 text-center">佐证材料</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-200">
                        <tr v-for="(fault, fIdx) in selectedMeterFacility.faultRecords" :key="fault.id" class="hover:bg-slate-50 text-[11.5px]">
                          <td class="py-2.5 px-2.5 text-center font-mono text-slate-500 border-r border-slate-200">{{ fIdx + 1 }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono font-medium text-blue-700">{{ fault.code }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-600">{{ fault.faultTime }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200">
                            <span class="px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200 text-[11px] font-medium">
                              {{ fault.faultType }}
                            </span>
                          </td>
                          <td class="py-2.5 px-3 border-r border-slate-200 text-right font-mono font-bold text-slate-800">{{ fault.faultReading }} m³</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 text-slate-700 max-w-[240px] truncate" :title="fault.faultDesc">{{ fault.faultDesc }}</td>
                          <td class="py-2.5 px-2.5 border-r border-slate-200 text-center">
                            <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                              {{ fault.status }}
                            </span>
                          </td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-500">{{ fault.finishTime }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 text-slate-700">{{ fault.engineer }}</td>
                          <td class="py-2.5 px-3 text-center">
                            <button
                              type="button"
                              @click="handlePreviewMeterMedia(`故障维修材料 - ${fault.code}`, fault.images[0])"
                              class="text-[#1677ff] hover:underline cursor-pointer font-medium"
                            >
                              查看照片
                            </button>
                          </td>
                        </tr>
                        <tr v-if="selectedMeterFacility.faultRecords.length === 0">
                          <td colspan="10" class="py-8 text-center text-slate-400">该计量设施暂无故障记录，工况平稳</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- 3. 停用记录 -->
                <div v-show="meterSubTab === 'disable'" class="space-y-3">
                  <div class="bg-amber-50/60 p-2.5 rounded border border-amber-200 flex items-center justify-between text-xs text-amber-900">
                    <div class="flex items-center gap-2">
                      <span class="font-bold">【{{ selectedMeterFacility.name }}】停用/启封流转历史履历：</span>
                      <span>共记录 <strong class="text-amber-800 font-mono">{{ selectedMeterFacility.disableRecords.length }}</strong> 次流转 · 关阀铅封受水利法监督</span>
                    </div>
                    <span class="text-[11px] text-amber-700">任何启闭操作均经现场铅封与水务局备案</span>
                  </div>

                  <div class="overflow-x-auto rounded border border-slate-200 bg-white">
                    <table class="w-full text-left text-xs border-collapse">
                      <thead class="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
                        <tr>
                          <th class="py-2.5 px-2.5 text-center w-12 border-r border-slate-200">序号</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">申请单号</th>
                          <th class="py-2.5 px-3 border-r border-slate-200 text-center">变更类型</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">申请时间</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">生效停水时间</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">恢复启用时间</th>
                          <th class="py-2.5 px-3 border-r border-slate-200 text-right">停用表底 (m³)</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">停用/启用原因说明</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">关阀铅封编号</th>
                          <th class="py-2.5 px-3 border-r border-slate-200 text-center">审批状态</th>
                          <th class="py-2.5 px-3 text-center">铅封材料</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-200">
                        <tr v-for="(dis, dIdx) in selectedMeterFacility.disableRecords" :key="dis.id" class="hover:bg-slate-50 text-[11.5px]">
                          <td class="py-2.5 px-2.5 text-center font-mono text-slate-500 border-r border-slate-200">{{ dIdx + 1 }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-blue-700 font-medium">{{ dis.code }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 text-center">
                            <span
                              class="px-2 py-0.5 rounded text-[11px] font-medium border"
                              :class="
                                dis.changeType === '恢复启用'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              "
                            >
                              {{ dis.changeType }}
                            </span>
                          </td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-600">{{ dis.applyTime }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-600">{{ dis.effectiveTime }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-600">{{ dis.resumeTime }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono font-bold text-slate-800 text-right">{{ dis.stopReading }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 text-slate-700 max-w-[220px] truncate" :title="dis.reason">{{ dis.reason }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-600">{{ dis.sealCode }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 text-center text-emerald-700 font-medium">{{ dis.auditStatus }}</td>
                          <td class="py-2.5 px-3 text-center">
                            <button
                              type="button"
                              @click="handlePreviewMeterMedia(`铅封/启封核验单 - ${dis.sealCode}`, dis.vouchers[0])"
                              class="text-[#1677ff] hover:underline cursor-pointer font-medium"
                            >
                              查看单据
                            </button>
                          </td>
                        </tr>
                        <tr v-if="selectedMeterFacility.disableRecords.length === 0">
                          <td colspan="11" class="py-8 text-center text-slate-400">该计量设施暂无停用停运记录</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- 4. 换表记录 -->
                <div v-show="meterSubTab === 'replace'" class="space-y-3">
                  <div class="bg-purple-50/60 p-2.5 rounded border border-purple-200 flex items-center justify-between text-xs text-purple-900">
                    <div class="flex items-center gap-2">
                      <span class="font-bold">【{{ selectedMeterFacility.name }}】水表轮换与新旧交接台账：</span>
                      <span>已服役轮换 <strong class="text-purple-800 font-mono">{{ selectedMeterFacility.replaceRecords.length }}</strong> 次 · 现役表具正常运行</span>
                    </div>
                    <span class="text-[11px] text-purple-700">严格执行水利部门6年强制轮换检定要求</span>
                  </div>

                  <div class="overflow-x-auto rounded border border-slate-200 bg-white">
                    <table class="w-full text-left text-xs border-collapse">
                      <thead class="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
                        <tr>
                          <th class="py-2.5 px-2.5 text-center w-12 border-r border-slate-200">序号</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">换表工单号</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">实施换表日期</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">换表原因</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">旧表编号</th>
                          <th class="py-2.5 px-3 border-r border-slate-200 text-right">旧表拆除止码</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">新表编号</th>
                          <th class="py-2.5 px-3 border-r border-slate-200 text-right">新表安装起码</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">施工负责人</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">水利验收人</th>
                          <th class="py-2.5 px-3 text-center">交接凭据</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-200">
                        <tr v-for="(rep, rIdx) in selectedMeterFacility.replaceRecords" :key="rep.id" class="hover:bg-slate-50 text-[11.5px]">
                          <td class="py-2.5 px-2.5 text-center font-mono text-slate-500 border-r border-slate-200">{{ rIdx + 1 }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono font-medium text-blue-700">{{ rep.code }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-600">{{ rep.replaceDate }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 text-slate-700 max-w-[200px] truncate" :title="rep.reason">{{ rep.reason }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-500">{{ rep.oldMeterCode }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono font-bold text-slate-800 text-right">{{ rep.oldMeterStopReading }} m³</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono font-bold text-emerald-700">{{ rep.newMeterCode }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono font-bold text-emerald-700 text-right">{{ rep.newMeterStartReading.toFixed(2) }} m³</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 text-slate-700">{{ rep.constructor }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 text-slate-700">{{ rep.inspector }}</td>
                          <td class="py-2.5 px-3 text-center">
                            <button
                              type="button"
                              @click="handlePreviewMeterMedia(`换表交接验收单 - ${rep.code}`, rep.documents[0])"
                              class="text-[#1677ff] hover:underline cursor-pointer font-medium"
                            >
                              查看单据
                            </button>
                          </td>
                        </tr>
                        <tr v-if="selectedMeterFacility.replaceRecords.length === 0">
                          <td colspan="11" class="py-8 text-center text-slate-400">该计量设施暂无换表记录</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- 5. 人工填报记录 -->
                <div v-show="meterSubTab === 'manual'" class="space-y-3">
                  <div class="bg-emerald-50/60 p-2.5 rounded border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                    <div class="flex items-center gap-2">
                      <span class="font-bold">【{{ selectedMeterFacility.name }}】现场人工抄表与核销台账：</span>
                      <span>已归集填报 <strong class="text-emerald-800 font-mono">{{ selectedMeterFacility.manualRecords.length }}</strong> 期 · 审核合格率 100%</span>
                    </div>
                    <span class="text-[11px] text-emerald-700">支持人工抄见读数与RTU遥测自动比对校验</span>
                  </div>

                  <div class="overflow-x-auto rounded border border-slate-200 bg-white">
                    <table class="w-full text-left text-xs border-collapse">
                      <thead class="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
                        <tr>
                          <th class="py-2.5 px-2.5 text-center w-12 border-r border-slate-200">序号</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">填报单号</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">核定周期/月份</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">抄表日期</th>
                          <th class="py-2.5 px-3 border-r border-slate-200 text-right">上期起码 (m³)</th>
                          <th class="py-2.5 px-3 border-r border-slate-200 text-right">本期止码 (m³)</th>
                          <th class="py-2.5 px-3 border-r border-slate-200 text-right">本期用水量 (m³)</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">抄表人/电话</th>
                          <th class="py-2.5 px-2.5 border-r border-slate-200 text-center">审核状态</th>
                          <th class="py-2.5 px-3 border-r border-slate-200">审核人及意见</th>
                          <th class="py-2.5 px-3 text-center">现场凭证</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-200">
                        <tr v-for="(man, mIdx) in selectedMeterFacility.manualRecords" :key="man.id" class="hover:bg-slate-50 text-[11.5px]">
                          <td class="py-2.5 px-2.5 text-center font-mono text-slate-500 border-r border-slate-200">{{ mIdx + 1 }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono font-medium text-blue-700">{{ man.recordNo }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-semibold text-slate-800">{{ man.periodLabel }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-600">{{ man.readingDate }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-700 text-right">{{ man.startReading }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono font-bold text-slate-900 text-right">{{ man.endReading }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 font-mono font-bold text-blue-700 text-right">{{ man.waterVolume }}</td>
                          <td class="py-2.5 px-3 border-r border-slate-200 text-slate-700">
                            <div>{{ man.reporterName }}</div>
                            <div class="text-[10.5px] font-mono text-slate-400">{{ man.reporterPhone }}</div>
                          </td>
                          <td class="py-2.5 px-2.5 border-r border-slate-200 text-center">
                            <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                              {{ man.auditStatus }}
                            </span>
                          </td>
                          <td class="py-2.5 px-3 border-r border-slate-200 text-slate-600 max-w-[200px] truncate" :title="man.auditComment">
                            {{ man.auditComment }}
                          </td>
                          <td class="py-2.5 px-3 text-center">
                            <button
                              type="button"
                              @click="handlePreviewMeterMedia(`现场表盘照片 - ${man.periodLabel}`, man.vouchers[0])"
                              class="text-[#1677ff] hover:underline cursor-pointer font-medium"
                            >
                              查看照片
                            </button>
                          </td>
                        </tr>
                        <tr v-if="selectedMeterFacility.manualRecords.length === 0">
                          <td colspan="11" class="py-8 text-center text-slate-400">该计量设施暂无人工填报记录</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ==================== Tab 4: 取水许可 ==================== -->
          <div v-show="activeTabKey === 'permit'" class="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
            <h4 class="text-xs font-bold text-slate-800">取水许可证书及流转档案</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
                <div class="font-bold text-slate-800 text-sm">许可证正式核发信息</div>
                <div class="flex justify-between"><span class="text-slate-500">取水许可证号：</span><span class="font-mono font-medium">{{ dossierData.permitNumber }}</span></div>
                <div class="flex justify-between"><span class="text-slate-500">年最大许可水量：</span><span class="font-mono font-bold text-blue-700">{{ dossierData.annualPermitVolume || 1200 }} 万 m³</span></div>
                <div class="flex justify-between"><span class="text-slate-500">日最大取水量：</span><span class="font-mono">4.2 万 m³/d</span></div>
                <div class="flex justify-between"><span class="text-slate-500">退水水质要求：</span><span>GB 8978-1996 一级A标</span></div>
                <div class="flex justify-between"><span class="text-slate-500">发证日期：</span><span class="font-mono">2025-01-30</span></div>
                <div class="flex justify-between"><span class="text-slate-500">截止有效日期：</span><span class="font-mono">2030-01-30</span></div>
              </div>
              <div class="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
                <div class="font-bold text-slate-800 text-sm">水资源论证与批文</div>
                <div class="flex justify-between"><span class="text-slate-500">水资源论证报告书：</span><span class="text-blue-600 hover:underline cursor-pointer">《取水水资源综合论证批复》(青水资[2024]12号)</span></div>
                <div class="flex justify-between"><span class="text-slate-500">节水评价结论：</span><span class="text-emerald-600 font-medium">符合重点工业节水定额先进值</span></div>
                <div class="flex justify-between"><span class="text-slate-500">验收评估专家组：</span><span>西宁市水资源综合专家评估组</span></div>
                <div class="flex justify-between"><span class="text-slate-500">复审周期：</span><span>每 5 年延续申请一次</span></div>
                <div class="flex justify-between"><span class="text-slate-500">档案管理密级：</span><span>内部公开档案</span></div>
              </div>
            </div>
          </div>

          <!-- ==================== Tab 5: 日常管理 ==================== -->
          <div v-show="activeTabKey === 'routine'" class="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
            <h4 class="text-xs font-bold text-slate-800">日常巡查与监管台账</h4>
            <table class="w-full text-left text-xs border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
                  <th class="py-2 px-3 border-r border-slate-200">巡查日期</th>
                  <th class="py-2 px-3 border-r border-slate-200">巡查类型</th>
                  <th class="py-2 px-3 border-r border-slate-200">检查执法人员</th>
                  <th class="py-2 px-3 border-r border-slate-200">巡查要点与内容</th>
                  <th class="py-2 px-3 border-r border-slate-200">检查结论</th>
                  <th class="py-2 px-3 text-center">状态</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 border-r border-slate-200 font-mono">2026-08-15</td>
                  <td class="py-2 px-3 border-r border-slate-200">双随机现场执法抽查</td>
                  <td class="py-2 px-3 border-r border-slate-200">王海峰、李建军</td>
                  <td class="py-2 px-3 border-r border-slate-200">核对取水许可证执行情况、计量设施封印及数据远传稳定性</td>
                  <td class="py-2 px-3 border-r border-slate-200 text-emerald-700">设施运行正常，计量数据与水表底数一致</td>
                  <td class="py-2 px-3 text-center"><span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">已办结</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 border-r border-slate-200 font-mono">2026-05-20</td>
                  <td class="py-2 px-3 border-r border-slate-200">季度水资源常规巡查</td>
                  <td class="py-2 px-3 border-r border-slate-200">张晓东</td>
                  <td class="py-2 px-3 border-r border-slate-200">厂区节水工艺复核、非常规水回用管道巡查</td>
                  <td class="py-2 px-3 border-r border-slate-200 text-emerald-700">台账规范完整</td>
                  <td class="py-2 px-3 text-center"><span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">已办结</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ==================== Tab 6: 水量数据 ==================== -->
          <div v-show="activeTabKey === 'water_data'" class="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-800">2026 年度月度取用水量统计与超欠计划比对</h4>
              <span class="text-xs font-mono text-slate-500">累计用水：640.50 万 m³ / 年计划：1200.00 万 m³</span>
            </div>

            <!-- 月度用水数据表 -->
            <table class="w-full text-left text-xs border-collapse border border-slate-200 font-mono">
              <thead>
                <tr class="bg-slate-50 text-slate-700 font-medium font-sans border-b border-slate-200">
                  <th class="py-2 px-3 border-r border-slate-200 text-center">月份</th>
                  <th class="py-2 px-3 border-r border-slate-200">月度计划(万m³)</th>
                  <th class="py-2 px-3 border-r border-slate-200">实际计量(万m³)</th>
                  <th class="py-2 px-3 border-r border-slate-200">执行比率</th>
                  <th class="py-2 px-3 border-r border-slate-200">上期底数</th>
                  <th class="py-2 px-3 border-r border-slate-200">本期底数</th>
                  <th class="py-2 px-3 text-center font-sans">状态</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-[11.5px]">
                <tr v-for="m in 8" :key="m" class="hover:bg-slate-50">
                  <td class="py-2 px-3 border-r border-slate-200 text-center font-sans font-medium text-slate-800">2026年0{{ m }}月</td>
                  <td class="py-2 px-3 border-r border-slate-200 text-slate-600">100.00</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-bold text-slate-900">{{ (75.2 + m * 1.3).toFixed(2) }}</td>
                  <td class="py-2 px-3 border-r border-slate-200 text-emerald-600 font-bold">{{ ((75.2 + m * 1.3) / 100 * 100).toFixed(1) }}%</td>
                  <td class="py-2 px-3 border-r border-slate-200 text-slate-500">{{ (120000 + (m-1) * 760).toFixed(1) }}</td>
                  <td class="py-2 px-3 border-r border-slate-200 text-slate-800">{{ (120000 + m * 760).toFixed(1) }}</td>
                  <td class="py-2 px-3 text-center font-sans">
                    <span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10.5px]">正常未超额</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ==================== Tab 7: 违法违规(3) ==================== -->
          <div v-show="activeTabKey === 'violation'" class="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>违法违规监管与排查记录 (共 3 条核查工单)</span>
              </h4>
              <span class="text-[11px] text-amber-600">全国/省级取水系统定期核验</span>
            </div>

            <table class="w-full text-left text-xs border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
                  <th class="py-2 px-3 border-r border-slate-200">工单编号</th>
                  <th class="py-2 px-3 border-r border-slate-200">排查来源</th>
                  <th class="py-2 px-3 border-r border-slate-200">违规类型</th>
                  <th class="py-2 px-3 border-r border-slate-200">异常详细描述</th>
                  <th class="py-2 px-3 border-r border-slate-200">核查处置结论</th>
                  <th class="py-2 px-3 text-center">闭环状态</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 border-r border-slate-200 font-mono text-blue-700">WG-2026-0012</td>
                  <td class="py-2 px-3 border-r border-slate-200">全国水资源违规排查</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-medium text-slate-800">计量设施疑似突发离线</td>
                  <td class="py-2 px-3 border-r border-slate-200">1#超声流量计于8月3日连续离线超24小时</td>
                  <td class="py-2 px-3 border-r border-slate-200 text-slate-600">现场核验为基站雷击断电，电力恢复后数据补传完整</td>
                  <td class="py-2 px-3 text-center"><span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">已核销闭环</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 border-r border-slate-200 font-mono text-blue-700">WG-2026-0045</td>
                  <td class="py-2 px-3 border-r border-slate-200">省级水资源监管比对</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-medium text-slate-800">阶段性用水波动异常</td>
                  <td class="py-2 px-3 border-r border-slate-200">单日用水量较上周环比突增 145%</td>
                  <td class="py-2 px-3 border-r border-slate-200 text-slate-600">经查系新生产线试车注水，已报备水务局</td>
                  <td class="py-2 px-3 text-center"><span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">已核销闭环</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 border-r border-slate-200 font-mono text-blue-700">WG-2026-0078</td>
                  <td class="py-2 px-3 border-r border-slate-200">系统智能预警</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-medium text-slate-800">许可证临期预警</td>
                  <td class="py-2 px-3 border-r border-slate-200">取水许可证距到期不足6个月，触发延续申报提示</td>
                  <td class="py-2 px-3 border-r border-slate-200 text-blue-700">企业已提交延续申请材料，正处于审核中</td>
                  <td class="py-2 px-3 text-center"><span class="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px]">流转处理中</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ==================== Tab 8: 缴税信息 ==================== -->
          <div v-show="activeTabKey === 'tax'" class="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
            <h4 class="text-xs font-bold text-slate-800">水资源税申报与完税证明记录</h4>
            <table class="w-full text-left text-xs border-collapse border border-slate-200 font-mono">
              <thead>
                <tr class="bg-slate-50 text-slate-700 font-medium font-sans border-b border-slate-200">
                  <th class="py-2 px-3 border-r border-slate-200">所属税期</th>
                  <th class="py-2 px-3 border-r border-slate-200">计税取水量(万m³)</th>
                  <th class="py-2 px-3 border-r border-slate-200">适用税额(元/m³)</th>
                  <th class="py-2 px-3 border-r border-slate-200">应纳税额(元)</th>
                  <th class="py-2 px-3 border-r border-slate-200">完税凭证号</th>
                  <th class="py-2 px-3 text-center font-sans">完税状态</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 border-r border-slate-200 font-sans">2026年第二季度</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-bold">245.50</td>
                  <td class="py-2 px-3 border-r border-slate-200">0.80</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-bold text-slate-900">196,400.00</td>
                  <td class="py-2 px-3 border-r border-slate-200 text-blue-700">WS-6301-202607-0098</td>
                  <td class="py-2 px-3 text-center font-sans"><span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">已全额缴纳</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 border-r border-slate-200 font-sans">2026年第一季度</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-bold">231.20</td>
                  <td class="py-2 px-3 border-r border-slate-200">0.80</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-bold text-slate-900">184,960.00</td>
                  <td class="py-2 px-3 border-r border-slate-200 text-blue-700">WS-6301-202604-0042</td>
                  <td class="py-2 px-3 text-center font-sans"><span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">已全额缴纳</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ==================== Tab 9: 附件档案 ==================== -->
          <div v-show="activeTabKey === 'files'" class="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
            <!-- 头部概览条 -->
            <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <div class="w-2 h-4 bg-[#1677ff] rounded-xs"></div>
                <h4 class="text-sm font-bold text-slate-800">一户一档电子附件资料库与流转档案</h4>
                <span class="text-xs text-slate-500 font-mono">
                  (已收录 <strong class="text-blue-700 font-bold">{{ filteredAttachmentList.length }}</strong> 份文档 · 规范合规归档)
                </span>
              </div>

              <!-- 右侧快速操作按钮 -->
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  @click="openUploadAttachmentModal"
                  class="px-3 py-1.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>上传附件</span>
                </button>
                <button
                  type="button"
                  @click="handleBatchDownloadFiles"
                  :disabled="selectedFileIds.length === 0"
                  class="px-3 py-1.5 border rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                  :class="selectedFileIds.length > 0 ? 'bg-white border-blue-300 text-blue-700 hover:bg-blue-50' : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>批量下载 {{ selectedFileIds.length > 0 ? `(${selectedFileIds.length})` : '' }}</span>
                </button>
              </div>
            </div>

            <!-- 主展示区：左右分栏布局（左侧文件表格+筛选，右侧一级/二级分类目录树） -->
            <div class="flex flex-col lg:flex-row gap-4 items-start">
              <!-- 左侧主内容区：检索栏 + 附件数据表格 + 分页 -->
              <div class="flex-1 min-w-0 space-y-3 w-full">
                <!-- 筛选工具条 -->
                <div class="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div class="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
                    <!-- 关键字输入 -->
                    <div class="relative flex-1 min-w-[180px] max-w-[260px]">
                      <input
                        type="text"
                        v-model="fileFilterKeyword"
                        placeholder="搜索附件名称/业务单号/经办人..."
                        class="w-full pl-7 pr-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1677ff]"
                      />
                      <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>

                    <!-- 年份筛选 -->
                    <select
                      v-model="fileFilterYear"
                      class="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#1677ff] cursor-pointer"
                    >
                      <option value="ALL">全部年份</option>
                      <option value="2026">2026 年度</option>
                      <option value="2025">2025 年度</option>
                      <option value="2024">2024 年度</option>
                    </select>

                    <!-- 格式筛选 -->
                    <select
                      v-model="fileFilterFormat"
                      class="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#1677ff] cursor-pointer"
                    >
                      <option value="ALL">全部格式</option>
                      <option value="PDF">PDF 文档</option>
                      <option value="DOC">Word 文档</option>
                      <option value="XLS">Excel 报表</option>
                      <option value="DWG">工程图纸</option>
                    </select>

                    <button
                      type="button"
                      @click="handleResetFileFilters"
                      class="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded text-xs font-medium transition cursor-pointer"
                    >
                      重置
                    </button>
                  </div>

                  <!-- 当前分类路径指示徽章 -->
                  <div class="text-[11.5px] text-slate-500 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-slate-200">
                    <span class="text-slate-400">当前分类:</span>
                    <strong class="text-blue-700 font-medium">{{ currentCategoryPathText }}</strong>
                  </div>
                </div>

                <!-- 附件数据表格 -->
                <div class="overflow-x-auto rounded-lg border border-slate-200">
                  <table class="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr class="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 select-none">
                        <th class="py-2.5 px-3 border-r border-slate-200 text-center w-10">
                          <input
                            type="checkbox"
                            :checked="isAllFilesSelected"
                            @change="toggleSelectAllFiles"
                            class="rounded border-slate-300 text-[#1677ff] focus:ring-0 cursor-pointer"
                          />
                        </th>
                        <th class="py-2.5 px-2.5 border-r border-slate-200 text-center w-12 font-mono">序号</th>
                        <th class="py-2.5 px-3 border-r border-slate-200">附件名称</th>
                        <th class="py-2.5 px-3 border-r border-slate-200">所属分类</th>
                        <th class="py-2.5 px-3 border-r border-slate-200">关联业务编号</th>
                        <th class="py-2.5 px-2.5 border-r border-slate-200 text-right">文件大小</th>
                        <th class="py-2.5 px-3 border-r border-slate-200">经办人/归档机构</th>
                        <th class="py-2.5 px-3 border-r border-slate-200">归档时间</th>
                        <th class="py-2.5 px-2.5 border-r border-slate-200 text-center">状态</th>
                        <th class="py-2.5 px-3 text-center w-28">操作</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                      <tr
                        v-for="(file, idx) in paginatedFiles"
                        :key="file.id"
                        class="hover:bg-blue-50/40 transition"
                        :class="selectedFileIds.includes(file.id) ? 'bg-blue-50/60' : ''"
                      >
                        <!-- 选择框 -->
                        <td class="py-2.5 px-3 border-r border-slate-200 text-center">
                          <input
                            type="checkbox"
                            :checked="selectedFileIds.includes(file.id)"
                            @change="toggleSelectFile(file.id)"
                            class="rounded border-slate-300 text-[#1677ff] focus:ring-0 cursor-pointer"
                          />
                        </td>

                        <!-- 序号 -->
                        <td class="py-2.5 px-2.5 border-r border-slate-200 text-center text-slate-500 font-mono">
                          {{ (currentPage - 1) * pageSize + idx + 1 }}
                        </td>

                        <!-- 附件名称 (带格式颜色图标，点击可预览) -->
                        <td class="py-2.5 px-3 border-r border-slate-200 font-medium">
                          <div class="flex items-center gap-2">
                            <!-- 格式图标 -->
                            <span
                              class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0"
                              :class="{
                                'bg-rose-50 text-rose-600 border border-rose-200': file.fileFormat === 'PDF',
                                'bg-blue-50 text-blue-600 border border-blue-200': file.fileFormat === 'DOC',
                                'bg-emerald-50 text-emerald-600 border border-emerald-200': file.fileFormat === 'XLS',
                                'bg-purple-50 text-purple-600 border border-purple-200': file.fileFormat === 'DWG',
                              }"
                            >
                              {{ file.fileFormat }}
                            </span>
                            <span
                              @click="handleOpenPreviewModal(file)"
                              class="text-slate-800 hover:text-[#1677ff] cursor-pointer hover:underline truncate max-w-[220px]"
                              :title="file.name"
                            >
                              {{ file.name }}
                            </span>
                          </div>
                        </td>

                        <!-- 所属分类 -->
                        <td class="py-2.5 px-3 border-r border-slate-200">
                          <div class="flex items-center gap-1.5">
                            <span class="text-slate-500">{{ file.primaryCategory }}</span>
                            <span class="text-slate-300">/</span>
                            <span class="font-medium text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                              {{ file.secondaryCategory }}
                            </span>
                          </div>
                        </td>

                        <!-- 关联业务编号 -->
                        <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-blue-700 text-[11.5px]">
                          {{ file.businessCode }}
                        </td>

                        <!-- 大小 -->
                        <td class="py-2.5 px-2.5 border-r border-slate-200 text-right font-mono text-slate-600 text-[11px]">
                          {{ file.size }}
                        </td>

                        <!-- 经办人/归档机构 -->
                        <td class="py-2.5 px-3 border-r border-slate-200 text-slate-700">
                          {{ file.uploader }}
                        </td>

                        <!-- 归档时间 -->
                        <td class="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-500 text-[11px]">
                          {{ file.uploadTime }}
                        </td>

                        <!-- 状态 -->
                        <td class="py-2.5 px-2.5 border-r border-slate-200 text-center">
                          <span
                            class="px-2 py-0.5 rounded text-[10.5px] font-medium"
                            :class="
                              file.status === '生效中'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : file.status === '已核验'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            "
                          >
                            {{ file.status }}
                          </span>
                        </td>

                        <!-- 操作 -->
                        <td class="py-2.5 px-3 text-center">
                          <div class="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              @click="handleOpenPreviewModal(file)"
                              class="text-[#1677ff] hover:text-blue-700 font-medium hover:underline cursor-pointer"
                            >
                              预览
                            </button>
                            <span class="text-slate-300">|</span>
                            <button
                              type="button"
                              @click="handleDownloadSingleFile(file)"
                              class="text-slate-600 hover:text-slate-900 font-medium hover:underline cursor-pointer"
                            >
                              下载
                            </button>
                          </div>
                        </td>
                      </tr>

                      <!-- 空状态 -->
                      <tr v-if="paginatedFiles.length === 0">
                        <td colspan="10" class="py-12 text-center text-slate-400">
                          <div class="flex flex-col items-center justify-center space-y-1.5">
                            <svg class="w-8 h-8 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                            <p class="text-xs">暂无匹配的电子附件档案</p>
                            <button
                              type="button"
                              @click="handleResetFileFilters"
                              class="text-[#1677ff] text-xs hover:underline cursor-pointer mt-1"
                            >
                              清除筛选条件
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- 分页栏 -->
                <div class="flex items-center justify-between pt-1 text-xs text-slate-500">
                  <div class="flex items-center gap-2">
                    <span>共 <strong class="text-slate-800">{{ filteredAttachmentList.length }}</strong> 条记录</span>
                    <span>·</span>
                    <span>已选 <strong class="text-[#1677ff]">{{ selectedFileIds.length }}</strong> 项</span>
                  </div>

                  <div class="flex items-center gap-1.5" v-if="totalPages > 1">
                    <button
                      type="button"
                      :disabled="currentPage <= 1"
                      @click="currentPage--"
                      class="px-2.5 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      上一页
                    </button>
                    <span class="px-2 font-mono text-slate-700">{{ currentPage }} / {{ totalPages }}</span>
                    <button
                      type="button"
                      :disabled="currentPage >= totalPages"
                      @click="currentPage++"
                      class="px-2.5 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      下一页
                    </button>
                  </div>
                </div>
              </div>

              <!-- 右侧分类目录导航树 (严格按需求展示一级分类：取水许可、取水计划、计量监管、违法违规，以及取水许可二级菜单) -->
              <div class="w-full lg:w-68 shrink-0 bg-slate-50 rounded-xl border border-slate-200 p-3 space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div class="flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span class="text-xs font-bold text-slate-800">附件档案分类</span>
                  </div>
                  <span class="text-[11px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    全库 {{ allDossierAttachments.length }} 份
                  </span>
                </div>

                <!-- 全部附件快捷选择 -->
                <button
                  type="button"
                  @click="handleSelectCategory('ALL', '')"
                  class="w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition cursor-pointer"
                  :class="selectedPrimaryCategory === 'ALL' ? 'bg-[#1677ff] text-white shadow-2xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'"
                >
                  <div class="flex items-center gap-2">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    <span>全部附件资料</span>
                  </div>
                  <span
                    class="px-1.5 py-0.5 rounded text-[10.5px] font-mono"
                    :class="selectedPrimaryCategory === 'ALL' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'"
                  >
                    {{ allDossierAttachments.length }}
                  </span>
                </button>

                <!-- 一级分类列表 (含可折叠二级菜单) -->
                <div class="space-y-1.5">
                  <div
                    v-for="cat in attachmentCategoryTree"
                    :key="cat.name"
                    class="bg-white rounded-lg border border-slate-200 overflow-hidden"
                  >
                    <!-- 一级分类项标题 -->
                    <div
                      class="px-2.5 py-2 flex items-center justify-between text-xs font-medium cursor-pointer transition select-none"
                      :class="
                        selectedPrimaryCategory === cat.name && !selectedSecondaryCategory
                          ? 'bg-blue-50/80 text-blue-700 font-bold'
                          : 'hover:bg-slate-50 text-slate-800'
                      "
                      @click="handlePrimaryCategoryClick(cat.name)"
                    >
                      <div class="flex items-center gap-1.5 min-w-0">
                        <!-- 展开/折叠箭头 -->
                        <svg
                          class="w-3 h-3 text-slate-400 transition-transform duration-150 shrink-0"
                          :class="expandedCategories[cat.name] ? 'rotate-90' : ''"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.5"
                          @click.stop="toggleCategoryExpand(cat.name)"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>

                        <!-- 分类图标 -->
                        <span class="text-blue-600">📁</span>

                        <!-- 分类名称 (一级分类) -->
                        <span class="truncate">{{ cat.name }}</span>
                      </div>

                      <div class="flex items-center gap-1.5 shrink-0">
                        <span class="text-[10.5px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-500">
                          {{ getCategoryFileCount(cat.name) }}
                        </span>
                      </div>
                    </div>

                    <!-- 二级菜单列表 (例如取水许可二级菜单：许可申请、许可核查、许可变更、许可延续、许可注销) -->
                    <div
                      v-show="expandedCategories[cat.name]"
                      class="border-t border-slate-100 bg-slate-50/60 divide-y divide-slate-100 text-xs"
                    >
                      <div
                        v-for="sub in cat.children"
                        :key="sub.name"
                        @click="handleSelectCategory(cat.name, sub.name)"
                        class="pl-7 pr-2.5 py-1.5 flex items-center justify-between cursor-pointer transition select-none"
                        :class="
                          selectedPrimaryCategory === cat.name && selectedSecondaryCategory === sub.name
                            ? 'bg-blue-100/70 text-blue-700 font-semibold border-r-2 border-blue-600'
                            : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                        "
                      >
                        <div class="flex items-center gap-1.5 min-w-0">
                          <span class="text-slate-400 text-[10px]">└</span>
                          <span class="truncate text-[11.5px]">{{ sub.name }}</span>
                        </div>
                        <span
                          class="text-[10px] font-mono px-1.5 py-0.2 rounded"
                          :class="
                            selectedPrimaryCategory === cat.name && selectedSecondaryCategory === sub.name
                              ? 'bg-blue-200/80 text-blue-800'
                              : 'bg-white text-slate-400 border border-slate-200'
                          "
                        >
                          {{ getSubCategoryFileCount(cat.name, sub.name) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 底部提示信息 -->
                <div class="p-2.5 bg-blue-50/60 rounded-lg border border-blue-100 text-[11px] text-blue-700 leading-relaxed">
                  <div class="font-medium flex items-center gap-1">
                    <span>💡</span>
                    <span>归档说明</span>
                  </div>
                  <p class="text-blue-600/90 mt-0.5">
                    档案按业务流转闭环归类，点击右侧分类可快速检索对应的电子扫描件与审批文书。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. 弹窗底部操作条 -->
      <div class="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
        <div class="text-xs text-slate-500 flex items-center gap-2">
          <span>档案编号：<strong class="font-mono text-slate-800">{{ dossierData.id }}</strong></span>
          <span class="text-slate-300">|</span>
          <span>建档辖区：<strong class="text-blue-700">{{ dossierData.district }}</strong></span>
        </div>

        <div class="flex items-center gap-2.5">
          <button
            type="button"
            @click="showTopologyModal = true"
            class="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1677ff] border border-blue-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
          >
            <svg class="w-3.5 h-3.5 text-[#1677ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span>查看拓扑图</span>
          </button>

          <button
            type="button"
            @click="handlePrintDossier"
            class="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
          >
            <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>打印台账</span>
          </button>

          <button
            type="button"
            @click="handleClose"
            class="px-5 py-1.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition cursor-pointer shadow-2xs"
          >
            关闭
          </button>
        </div>
      </div>
    </div>

    <!-- 6. 嵌入式电子证照预览卡片 (当点击【电子证照预览】时展开) -->
    <div
      v-if="showLicensePreview"
      class="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs select-none"
      @click.self="showLicensePreview = false"
    >
      <div class="bg-[#fffdf8] rounded-xl border-2 border-amber-300/80 shadow-2xl w-full max-w-3xl overflow-hidden p-6 relative animate-in zoom-in-95 duration-150">
        <!-- 关闭按钮 -->
        <button
          type="button"
          @click="showLicensePreview = false"
          class="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-amber-100 transition cursor-pointer"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- 国徽与证书标题 -->
        <div class="text-center space-y-1 pb-4 border-b-2 border-amber-700/30">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-800 mx-auto">
            <svg class="w-8 h-8 text-amber-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-amber-950 tracking-wider">中华人民共和国取水许可证</h2>
          <div class="text-xs text-amber-800 font-mono font-medium">（电子证照副本 · 具备同等法律效力）</div>
          <div class="text-xs text-blue-800 font-mono font-bold mt-1">证号：{{ dossierData.permitNumber }}</div>
        </div>

        <!-- 证书正文信息 -->
        <div class="grid grid-cols-2 gap-3.5 text-xs text-amber-950 py-5">
          <div class="flex items-center gap-2"><span class="text-amber-800/80 w-28">取水权人：</span><span class="font-bold">{{ dossierData.waterOwnerName }}</span></div>
          <div class="flex items-center gap-2"><span class="text-amber-800/80 w-28">统一社会信用代码：</span><span class="font-mono font-medium">{{ dossierData.creditCode }}</span></div>
          <div class="flex items-center gap-2"><span class="text-amber-800/80 w-28">法定代表人：</span><span>{{ dossierData.legalPerson || '张三' }}</span></div>
          <div class="flex items-center gap-2"><span class="text-amber-800/80 w-28">水源类型：</span><span>{{ dossierData.waterSourceType }}</span></div>
          <div class="flex items-center gap-2"><span class="text-amber-800/80 w-28">年许可取水量：</span><span class="font-mono font-bold text-blue-700">{{ dossierData.annualPermitVolume || 1200 }} 万 m³</span></div>
          <div class="flex items-center gap-2"><span class="text-amber-800/80 w-28">发证机关：</span><span>{{ dossierData.issuingAuthority }}</span></div>
          <div class="flex items-center gap-2"><span class="text-amber-800/80 w-28">有效期限：</span><span class="font-mono">2025年01月30日 至 2030年01月30日</span></div>
          <div class="flex items-center gap-2"><span class="text-amber-800/80 w-28">证照状态：</span><span class="text-emerald-700 font-bold">有效（正常）</span></div>
        </div>

        <!-- 证书防伪印章与二维码区域 -->
        <div class="flex items-end justify-between pt-4 border-t border-amber-200">
          <div class="flex items-center gap-2 text-[11px] text-amber-800">
            <div class="w-14 h-14 bg-white border border-amber-300 p-1 flex items-center justify-center">
              <div class="w-full h-full bg-slate-800 flex items-center justify-center text-white text-[8px] font-mono text-center">
                QR CODE VERIFY
              </div>
            </div>
            <div>
              <div>青海省水资源管理厅电子证照核验系统</div>
              <div class="font-mono text-slate-500">验证码：6301-A98B-77CD-2026</div>
            </div>
          </div>

          <!-- 模拟公章 -->
          <div class="relative flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-rose-600 text-rose-600 p-2 text-center rotate-[-12deg] select-none opacity-90">
            <div class="text-[9px] font-bold">青海省水利厅</div>
            <div class="text-[8px] mt-0.5">水资源行政审批专用章</div>
            <div class="text-[8px] font-mono mt-0.5">2025.01.30</div>
          </div>
        </div>

        <div class="mt-4 flex justify-end gap-2">
          <button
            type="button"
            @click="showLicensePreview = false"
            class="px-4 py-1.5 bg-amber-900 text-white rounded text-xs hover:bg-amber-950 transition cursor-pointer"
          >
            返回台账
          </button>
        </div>
      </div>
    </div>

    <!-- 7. 附件档案电子文档高保真全屏预览弹窗 -->
    <div
      v-if="showAttachmentPreviewModal && previewingFile"
      class="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs select-none"
      @click.self="showAttachmentPreviewModal = false"
    >
      <div class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        <!-- 弹窗标题与工具栏 -->
        <div class="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div class="flex items-center gap-2.5 min-w-0">
            <span
              class="px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase shrink-0"
              :class="{
                'bg-rose-50 text-rose-600 border border-rose-200': previewingFile.fileFormat === 'PDF',
                'bg-blue-50 text-blue-600 border border-blue-200': previewingFile.fileFormat === 'DOC',
                'bg-emerald-50 text-emerald-600 border border-emerald-200': previewingFile.fileFormat === 'XLS',
                'bg-purple-50 text-purple-600 border border-purple-200': previewingFile.fileFormat === 'DWG',
              }"
            >
              {{ previewingFile.fileFormat }}
            </span>
            <h3 class="text-sm font-bold text-slate-800 truncate" :title="previewingFile.name">
              {{ previewingFile.name }}
            </h3>
            <span class="text-xs text-slate-400 font-mono hidden sm:inline">
              ({{ previewingFile.size }} · {{ previewingFile.uploadTime }})
            </span>
          </div>

          <div class="flex items-center gap-2">
            <!-- 缩放与打印控制 -->
            <div class="hidden sm:flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 text-xs text-slate-600 font-mono">
              <button
                type="button"
                @click="previewZoomLevel = Math.max(0.7, previewZoomLevel - 0.1)"
                class="hover:text-blue-600 px-1 cursor-pointer"
                title="缩小"
              >
                -
              </button>
              <span class="w-12 text-center">{{ Math.round(previewZoomLevel * 100) }}%</span>
              <button
                type="button"
                @click="previewZoomLevel = Math.min(1.5, previewZoomLevel + 0.1)"
                class="hover:text-blue-600 px-1 cursor-pointer"
                title="放大"
              >
                +
              </button>
              <button
                type="button"
                @click="previewZoomLevel = 1.0"
                class="text-[10px] text-slate-400 hover:text-slate-600 ml-1 cursor-pointer"
              >
                还原
              </button>
            </div>

            <button
              type="button"
              @click="handlePrintAttachment(previewingFile)"
              class="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-xs font-medium flex items-center gap-1 transition cursor-pointer"
            >
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span class="hidden sm:inline">打印</span>
            </button>

            <button
              type="button"
              @click="handleDownloadSingleFile(previewingFile)"
              class="px-2.5 py-1 bg-[#1677ff] hover:bg-blue-600 text-white rounded text-xs font-medium flex items-center gap-1 transition cursor-pointer shadow-2xs"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>下载原件</span>
            </button>

            <button
              type="button"
              @click="showAttachmentPreviewModal = false"
              class="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer ml-1"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- 预览主体区（带水印与高保真政务档案正文预览） -->
        <div class="flex-1 overflow-y-auto bg-slate-100 p-6 flex justify-center custom-scrollbar">
          <div
            class="bg-white shadow-lg border border-slate-300 rounded p-8 sm:p-10 w-full max-w-2xl min-h-[580px] relative transition-transform duration-150 origin-top flex flex-col justify-between"
            :style="{ transform: `scale(${previewZoomLevel})` }"
          >
            <!-- 倾斜仿伪水印背景 -->
            <div class="absolute inset-0 pointer-events-none flex flex-col items-center justify-around opacity-[0.06] select-none rotate-[-25deg] overflow-hidden">
              <span class="text-2xl font-bold text-slate-900 tracking-widest whitespace-nowrap">青海省水资源一户一档 电子档案受控凭证</span>
              <span class="text-2xl font-bold text-slate-900 tracking-widest whitespace-nowrap">统一业务单号：{{ previewingFile.businessCode }}</span>
              <span class="text-2xl font-bold text-slate-900 tracking-widest whitespace-nowrap">{{ props.dossierData.waterOwnerName }}</span>
            </div>

            <!-- 正文头部 -->
            <div class="relative z-10 space-y-4">
              <div class="border-b-2 border-red-600 pb-3 text-center">
                <div class="text-xs font-semibold text-red-600 tracking-widest">西宁市水行政审批与水资源电子档案库</div>
                <h2 class="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  {{ previewingFile.primaryCategory }} · {{ previewingFile.secondaryCategory }}档案文件
                </h2>
                <div class="text-[11px] font-mono text-slate-500 mt-1">
                  档案卷宗流水号：{{ previewingFile.businessCode }} · 涉密级别：{{ previewingFile.securityLevel }}
                </div>
              </div>

              <!-- 文档元数据表格 -->
              <div class="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded border border-slate-200">
                <div><span class="text-slate-400">取水权人：</span><span class="font-medium text-slate-800">{{ props.dossierData.waterOwnerName }}</span></div>
                <div><span class="text-slate-400">许可证号：</span><span class="font-mono text-blue-700">{{ props.dossierData.permitNumber }}</span></div>
                <div><span class="text-slate-400">所属分类：</span><span class="font-medium text-slate-700">{{ previewingFile.primaryCategory }} / {{ previewingFile.secondaryCategory }}</span></div>
                <div><span class="text-slate-400">归档机构：</span><span>{{ previewingFile.uploader }}</span></div>
                <div><span class="text-slate-400">归档时间：</span><span class="font-mono">{{ previewingFile.uploadTime }}</span></div>
                <div><span class="text-slate-400">文件校验值：</span><span class="font-mono text-slate-500">SHA256: 7F9A...B82C</span></div>
              </div>

              <!-- 模拟文件正文摘要内容 -->
              <div class="text-xs text-slate-700 leading-relaxed space-y-2 pt-2">
                <p class="font-semibold text-slate-800">【档案摘要与审核说明】</p>
                <p>
                  依据《中华人民共和国水法》、《取水许可和水资源费征收管理条例》以及青海省实施细则相关规定，本文件《{{ previewingFile.name }}》已通过省、市水行政审批综合系统复核。经审查，相关取水指标、论证评价及现场勘查核验材料齐全合规，特归入取水权人<strong>【{{ props.dossierData.waterOwnerName }}】</strong>永久电子业务档案。
                </p>
                <div class="p-3 bg-blue-50/50 rounded border border-blue-100 text-[11.5px] text-blue-900 space-y-1">
                  <div>· 关联工程/取水口：二号自流引水工程（黄河水系-大通河支流）</div>
                  <div>· 年最大许可水量核准值：{{ props.dossierData.annualPermitVolume || 1200 }} 万 m³</div>
                  <div>· 远程计量设施：JL-XN-2026 系列多声道超声/电磁流量计数据实时核验一致</div>
                </div>
              </div>
            </div>

            <!-- 印章与签署区 -->
            <div class="relative z-10 pt-8 flex items-end justify-between border-t border-slate-200 mt-6">
              <div class="text-[11px] text-slate-400 space-y-0.5 font-mono">
                <div>电子签章核验：有效生效中</div>
                <div>验证节点：青海水利政务云节点 #04</div>
              </div>

              <!-- 模拟电子印章 -->
              <div class="relative flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-red-500 text-red-600 p-1 text-center rotate-[-10deg] select-none opacity-85">
                <div class="text-[8px] font-bold">青海省水行政审批</div>
                <div class="text-[7.5px] mt-0.5">电子档案专用章</div>
                <div class="text-[7px] font-mono mt-0.5">{{ previewingFile.uploadTime.slice(0, 10) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 预览底部操作 -->
        <div class="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>共 1 页 / 第 1 页 · 电子正本已存档</span>
          <button
            type="button"
            @click="showAttachmentPreviewModal = false"
            class="px-4 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-xs font-medium cursor-pointer"
          >
            关闭预览
          </button>
        </div>
      </div>
    </div>

    <!-- 8. 上传附件档案弹窗 -->
    <div
      v-if="showUploadModal"
      class="fixed inset-0 z-70 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs select-none"
      @click.self="showUploadModal = false"
    >
      <div class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
        <div class="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-[#1677ff]"></div>
            <h3 class="text-sm font-bold text-slate-800">上传附件归档至一户一档</h3>
          </div>
          <button
            type="button"
            @click="showUploadModal = false"
            class="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmitUploadFile" class="p-5 space-y-3.5 text-xs">
          <!-- 一级分类 -->
          <div>
            <label class="block font-medium text-slate-700 mb-1">
              一级分类 <span class="text-red-500">*</span>
            </label>
            <select
              v-model="uploadForm.primaryCategory"
              @change="handleUploadPrimaryCategoryChange"
              class="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-slate-800 focus:outline-none focus:border-[#1677ff]"
              required
            >
              <option value="取水许可">取水许可</option>
              <option value="取水计划">取水计划</option>
              <option value="计量监管">计量监管</option>
              <option value="违法违规">违法违规</option>
            </select>
          </div>

          <!-- 二级菜单 (联动) -->
          <div>
            <label class="block font-medium text-slate-700 mb-1">
              二级分类 <span class="text-red-500">*</span>
            </label>
            <select
              v-model="uploadForm.secondaryCategory"
              class="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-slate-800 focus:outline-none focus:border-[#1677ff]"
              required
            >
              <option
                v-for="sub in currentUploadSubCategories"
                :key="sub.name"
                :value="sub.name"
              >
                {{ sub.name }}
              </option>
            </select>
          </div>

          <!-- 附件名称 -->
          <div>
            <label class="block font-medium text-slate-700 mb-1">
              附件名称 <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              v-model="uploadForm.fileName"
              placeholder="例如：2026年取水许可核查现场笔录.pdf"
              class="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-slate-800 focus:outline-none focus:border-[#1677ff]"
              required
            />
          </div>

          <!-- 业务单号 -->
          <div>
            <label class="block font-medium text-slate-700 mb-1">
              关联业务编号 / 审批单号
            </label>
            <input
              type="text"
              v-model="uploadForm.businessCode"
              placeholder="例如：HC-2026-0089"
              class="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-slate-800 focus:outline-none focus:border-[#1677ff]"
            />
          </div>

          <!-- 模拟拖拽上传区 -->
          <div>
            <label class="block font-medium text-slate-700 mb-1">选择附件文件</label>
            <div class="border-2 border-dashed border-slate-300 hover:border-[#1677ff] rounded-lg p-5 text-center bg-slate-50 transition cursor-pointer">
              <svg class="w-8 h-8 text-slate-400 mx-auto mb-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p class="text-slate-600 font-medium">点击选择或将文件拖曳至此上传</p>
              <p class="text-[11px] text-slate-400 mt-0.5">支持 PDF、Word(doc/docx)、Excel(xls/xlsx)、DWG 格式，单文件小于 50MB</p>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              @click="showUploadModal = false"
              class="px-4 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-xs font-medium cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-5 py-1.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded text-xs font-medium transition cursor-pointer shadow-2xs"
            >
              确认归档
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 拓扑图弹窗组件 -->
    <EnterpriseDossierTopologyModal
      v-if="dossierData"
      v-model:visible="showTopologyModal"
      :dossier-data="dossierData"
      @close="showTopologyModal = false"
    />

    <!-- 计量设施各类记录佐证照片/单据高保真全景预览弹窗 -->
    <div
      v-if="showMeterMediaModal"
      class="fixed inset-0 z-80 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs select-none"
      @click.self="showMeterMediaModal = false"
    >
      <div class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-150">
        <div class="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-[#1677ff]"></div>
            <h3 class="text-sm font-bold text-slate-800">{{ meterMediaTitle }}</h3>
          </div>
          <button
            type="button"
            @click="showMeterMediaModal = false"
            class="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="p-5 flex flex-col items-center">
          <img
            :src="meterMediaUrl"
            :alt="meterMediaTitle"
            class="max-h-[360px] w-auto rounded-lg shadow-xs border border-slate-200 object-cover"
          />
          <div class="mt-3 text-xs text-slate-500 text-center">
            青海省水资源一户一档现场监督凭证 · 电子档案已校验归档
          </div>
        </div>
        <div class="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            @click="showMeterMediaModal = false"
            class="px-4 py-1.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded text-xs font-medium cursor-pointer shadow-2xs"
          >
            关闭预览
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import EnterpriseDossierTopologyModal from './EnterpriseDossierTopologyModal.vue';
import { EnterpriseDossier } from '../../types';
import {
  getDossierMeterFacilities,
  DossierMeterFacility,
} from '../../data/mockDossierMeterFacilities';

const props = defineProps<{
  visible: boolean;
  dossierData: EnterpriseDossier;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'close'): void;
}>();

// 9个标签页配置 (严格参照截图与业务逻辑)
const tabList = [
  { key: 'basic', label: '基础信息', hasBadge: false },
  { key: 'intake', label: '取水工程/取水口(3)', hasBadge: true },
  { key: 'meter', label: '计量设施(6)', hasBadge: true },
  { key: 'permit', label: '取水许可', hasBadge: false },
  { key: 'routine', label: '日常管理', hasBadge: true },
  { key: 'water_data', label: '水量数据', hasBadge: true },
  { key: 'violation', label: '违法违规(3)', hasBadge: true },
  { key: 'tax', label: '缴税信息', hasBadge: true },
  { key: 'files', label: '附件档案', hasBadge: true },
];

const activeTabKey = ref<string>('basic');
const showLicensePreview = ref<boolean>(false);
const showTopologyModal = ref<boolean>(false);

// ==================== 计量设施与各类记录管理 (Tab 3) ====================
const selectedMeterFacilityId = ref<string>('');

const meterFacilities = computed<DossierMeterFacility[]>(() => {
  if (!props.dossierData) return [];
  return getDossierMeterFacilities(
    props.dossierData.id,
    props.dossierData.waterOwnerName,
    props.dossierData.permitNumber,
    props.dossierData.district || '湟中区'
  );
});

const selectedMeterFacility = computed<DossierMeterFacility | null>(() => {
  if (meterFacilities.value.length === 0) return null;
  const found = meterFacilities.value.find((f) => f.id === selectedMeterFacilityId.value);
  return found || meterFacilities.value[0];
});

// 下方子Tab标签 (基本信息 / 故障记录 / 停用记录 / 换表记录 / 人工填报记录)
const meterSubTab = ref<'basic' | 'fault' | 'disable' | 'replace' | 'manual'>('basic');

const meterSubTabList = computed(() => {
  const cur = selectedMeterFacility.value;
  return [
    { key: 'basic', label: '基本信息', count: undefined },
    { key: 'fault', label: '故障记录', count: cur ? cur.faultRecords.length : 0 },
    { key: 'disable', label: '停用记录', count: cur ? cur.disableRecords.length : 0 },
    { key: 'replace', label: '换表记录', count: cur ? cur.replaceRecords.length : 0 },
    { key: 'manual', label: '人工填报记录', count: cur ? cur.manualRecords.length : 0 },
  ];
});

const handleSelectMeterFacility = (facility: DossierMeterFacility) => {
  selectedMeterFacilityId.value = facility.id;
  MessagePlugin.success(`已载入【${facility.name}】基础参数与各类记录`);
};

// 计量设施佐证凭据与现场照片弹窗
const showMeterMediaModal = ref<boolean>(false);
const meterMediaTitle = ref<string>('');
const meterMediaUrl = ref<string>('');

const handlePreviewMeterMedia = (title: string, url?: string) => {
  meterMediaTitle.value = title;
  meterMediaUrl.value = url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800';
  showMeterMediaModal.value = true;
};

// 当权取水许可证核心指标与计算辅助方法
const getDossierPlanVolume = (item: EnterpriseDossier) => {
  if (item.currentYearPlanVolume !== undefined) return item.currentYearPlanVolume.toFixed(2);
  if (item.annualPermitVolume) return (item.annualPermitVolume * 0.98).toFixed(2);
  return '1200.00';
};

const getDossierHistoricalAvg = (item: EnterpriseDossier) => {
  if (item.historicalAvgWaterVolume !== undefined) return item.historicalAvgWaterVolume.toFixed(2);
  if (item.annualPermitVolume) return (item.annualPermitVolume * 0.85).toFixed(2);
  return '1020.00';
};

const getDossierTaxPaid = (item: EnterpriseDossier) => {
  if (item.currentYearTaxPaid !== undefined) return item.currentYearTaxPaid.toFixed(2);
  const vol = item.annualPermitVolume || 1200;
  return ((vol * 0.8 * 0.8) / 10).toFixed(2);
};

const getDossierViolationCount = (item: EnterpriseDossier) => {
  if (item.violationIssueCount !== undefined) return item.violationIssueCount;
  return item.id === 'DOS-002' ? 1 : item.id === 'DOS-005' ? 1 : 0;
};

const getDossierViolationIntake = (item: EnterpriseDossier) => {
  if (item.violationIntakeCount !== undefined) return item.violationIntakeCount;
  return item.id === 'DOS-002' ? 1 : item.id === 'DOS-005' ? 1 : 0;
};

const getDossierLicenseChangeCount = (item: EnterpriseDossier) => {
  if (item.licenseChangeCount !== undefined) return item.licenseChangeCount;
  return item.id === 'DOS-001' ? 2 : item.id === 'DOS-002' ? 3 : item.id === 'DOS-004' ? 4 : 1;
};

const getOnlineRate = (item: EnterpriseDossier) => {
  const total = item.meteringPointCount || (item.onlineMeteringCount + item.offlineMeteringCount) || 1;
  return Math.round((item.onlineMeteringCount / total) * 100);
};

const navigateToTab = (tabKey: string) => {
  activeTabKey.value = tabKey;
};

const handleClose = () => {
  emit('update:visible', false);
  emit('close');
};

const handlePreviewFile = (name: string) => {
  MessagePlugin.info(`正在调阅电子附件：${name}`);
};

const handlePrintDossier = () => {
  MessagePlugin.success(`已生成【${props.dossierData.waterOwnerName}】一户一档全景档案打印报表`);
};

// ==================== 附件档案（Tab 9）专属数据与分类树逻辑 ====================

interface DossierAttachmentItem {
  id: string;
  name: string;
  primaryCategory: string; // 一级分类: 取水许可、取水计划、计量监管、违法违规
  secondaryCategory: string; // 二级菜单: 许可申请、许可核查、许可变更、许可延续、许可注销 等
  businessCode: string;
  fileFormat: 'PDF' | 'DOC' | 'XLS' | 'DWG';
  size: string;
  uploader: string;
  uploadTime: string;
  year: string;
  status: '生效中' | '已核验' | '归档备查';
  securityLevel: '内部公开' | '受控档案' | '核心文书';
}

// 附件档案分类目录树（一级分类：取水许可、取水计划、计量监管、违法违规，取水许可二级菜单：许可申请、许可核查、许可变更、许可延续、许可注销）
const attachmentCategoryTree = [
  {
    name: '取水许可',
    children: [
      { name: '许可申请' },
      { name: '许可核查' },
      { name: '许可变更' },
      { name: '许可延续' },
      { name: '许可注销' },
    ],
  },
  {
    name: '取水计划',
    children: [
      { name: '年度计划申报' },
      { name: '月度用水核定' },
      { name: '计划追加与调整' },
      { name: '超计划加价记录' },
    ],
  },
  {
    name: '计量监管',
    children: [
      { name: '设施安装验收' },
      { name: '计量检定证书' },
      { name: 'RTU数据远传台账' },
      { name: '异常排查报告' },
    ],
  },
  {
    name: '违法违规',
    children: [
      { name: '违规线索核查' },
      { name: '责令整改通知书' },
      { name: '行政处罚与复核' },
    ],
  },
];

// 分类展开收起状态
const expandedCategories = ref<Record<string, boolean>>({
  '取水许可': true,
  '取水计划': true,
  '计量监管': true,
  '违法违规': true,
});

// 当前选中分类
const selectedPrimaryCategory = ref<string>('取水许可');
const selectedSecondaryCategory = ref<string>('');

// 筛选检索状态
const fileFilterKeyword = ref<string>('');
const fileFilterYear = ref<string>('ALL');
const fileFilterFormat = ref<string>('ALL');
const selectedFileIds = ref<string[]>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);

// 预览弹窗与缩放
const showAttachmentPreviewModal = ref<boolean>(false);
const previewingFile = ref<DossierAttachmentItem | null>(null);
const previewZoomLevel = ref<number>(1.0);

// 上传弹窗与表单
const showUploadModal = ref<boolean>(false);
const uploadForm = ref<{
  primaryCategory: string;
  secondaryCategory: string;
  fileName: string;
  businessCode: string;
}>({
  primaryCategory: '取水许可',
  secondaryCategory: '许可申请',
  fileName: '',
  businessCode: '',
});

// 电子附件完整数据池
const allDossierAttachments = ref<DossierAttachmentItem[]>([
  // ----- 取水许可 - 许可申请 -----
  {
    id: 'ATT-001',
    name: '取水许可申请书原件(企业法人盖章版).pdf',
    primaryCategory: '取水许可',
    secondaryCategory: '许可申请',
    businessCode: 'XK-SQ-20250102',
    fileFormat: 'PDF',
    size: '3.4 MB',
    uploader: '企业经办人-李明',
    uploadTime: '2025-01-10 09:30',
    year: '2025',
    status: '生效中',
    securityLevel: '核心文书',
  },
  {
    id: 'ATT-002',
    name: '水资源综合论证报告书(专家终审批复版).pdf',
    primaryCategory: '取水许可',
    secondaryCategory: '许可申请',
    businessCode: 'XK-SQ-20250102',
    fileFormat: 'PDF',
    size: '28.5 MB',
    uploader: '青海水利水电勘测设计院',
    uploadTime: '2025-01-12 14:15',
    year: '2025',
    status: '生效中',
    securityLevel: '核心文书',
  },
  {
    id: 'ATT-003',
    name: '重点工业节水评价专项审查意见书.pdf',
    primaryCategory: '取水许可',
    secondaryCategory: '许可申请',
    businessCode: 'XK-SQ-20250102',
    fileFormat: 'PDF',
    size: '1.8 MB',
    uploader: '西宁节水评价评估专家组',
    uploadTime: '2025-01-15 11:20',
    year: '2025',
    status: '生效中',
    securityLevel: '受控档案',
  },

  // ----- 取水许可 - 许可核查 -----
  {
    id: 'ATT-004',
    name: '取水工程现场勘验及水源论证核查笔录.pdf',
    primaryCategory: '取水许可',
    secondaryCategory: '许可核查',
    businessCode: 'XK-HC-20250018',
    fileFormat: 'PDF',
    size: '4.2 MB',
    uploader: '西宁水政监察支队-王海峰',
    uploadTime: '2025-01-18 16:40',
    year: '2025',
    status: '已核验',
    securityLevel: '受控档案',
  },
  {
    id: 'ATT-005',
    name: '取水工程竣工验收合格核验意见批文.pdf',
    primaryCategory: '取水许可',
    secondaryCategory: '许可核查',
    businessCode: 'XK-HC-20250018',
    fileFormat: 'PDF',
    size: '2.1 MB',
    uploader: '西宁市水务局验收专家组',
    uploadTime: '2025-01-20 10:10',
    year: '2025',
    status: '生效中',
    securityLevel: '核心文书',
  },

  // ----- 取水许可 - 许可变更 -----
  {
    id: 'ATT-006',
    name: '企业法定代表人及取水口变更申请表.pdf',
    primaryCategory: '取水许可',
    secondaryCategory: '许可变更',
    businessCode: 'XK-BG-20250004',
    fileFormat: 'PDF',
    size: '1.5 MB',
    uploader: '企业法规部',
    uploadTime: '2025-06-12 10:00',
    year: '2025',
    status: '生效中',
    securityLevel: '受控档案',
  },
  {
    id: 'ATT-007',
    name: '取水管道改造工程图纸与调整批复.dwg',
    primaryCategory: '取水许可',
    secondaryCategory: '许可变更',
    businessCode: 'XK-BG-20250004',
    fileFormat: 'DWG',
    size: '8.6 MB',
    uploader: '市政工程设计院',
    uploadTime: '2025-06-15 15:30',
    year: '2025',
    status: '已核验',
    securityLevel: '内部公开',
  },

  // ----- 取水许可 - 许可延续 -----
  {
    id: 'ATT-008',
    name: '取水许可证期满延续申请报告书.pdf',
    primaryCategory: '取水许可',
    secondaryCategory: '许可延续',
    businessCode: 'XK-YX-20250031',
    fileFormat: 'PDF',
    size: '3.8 MB',
    uploader: '企业法规部',
    uploadTime: '2025-01-25 09:00',
    year: '2025',
    status: '生效中',
    securityLevel: '核心文书',
  },
  {
    id: 'ATT-009',
    name: '水资源综合论证延续审查意见决定书.pdf',
    primaryCategory: '取水许可',
    secondaryCategory: '许可延续',
    businessCode: 'XK-YX-20250031',
    fileFormat: 'PDF',
    size: '5.4 MB',
    uploader: '青海省水利厅行政审批处',
    uploadTime: '2025-01-28 11:20',
    year: '2025',
    status: '生效中',
    securityLevel: '核心文书',
  },
  {
    id: 'ATT-010',
    name: '取水许可证书电子正本及防伪二维码副本.pdf',
    primaryCategory: '取水许可',
    secondaryCategory: '许可延续',
    businessCode: 'XK-YX-20250031',
    fileFormat: 'PDF',
    size: '2.6 MB',
    uploader: '青海省水资源管理厅',
    uploadTime: '2025-01-30 16:00',
    year: '2025',
    status: '生效中',
    securityLevel: '核心文书',
  },

  // ----- 取水许可 - 许可注销 -----
  {
    id: 'ATT-011',
    name: '旧厂区备用深井取水许可注销决定书.pdf',
    primaryCategory: '取水许可',
    secondaryCategory: '许可注销',
    businessCode: 'XK-ZX-20240011',
    fileFormat: 'PDF',
    size: '1.2 MB',
    uploader: '西宁市水务局水政科',
    uploadTime: '2024-11-20 14:10',
    year: '2024',
    status: '归档备查',
    securityLevel: '核心文书',
  },
  {
    id: 'ATT-012',
    name: '备用机井规范封填及现场销号验收凭证.pdf',
    primaryCategory: '取水许可',
    secondaryCategory: '许可注销',
    businessCode: 'XK-ZX-20240011',
    fileFormat: 'PDF',
    size: '2.8 MB',
    uploader: '水政监察一大队',
    uploadTime: '2024-11-25 15:45',
    year: '2024',
    status: '归档备查',
    securityLevel: '受控档案',
  },

  // ----- 取水计划 -----
  {
    id: 'ATT-013',
    name: '2026年度重点工业取用水计划申报表.xls',
    primaryCategory: '取水计划',
    secondaryCategory: '年度计划申报',
    businessCode: 'JH-SB-20260001',
    fileFormat: 'XLS',
    size: '450 KB',
    uploader: '生产调度科',
    uploadTime: '2025-12-20 10:00',
    year: '2025',
    status: '生效中',
    securityLevel: '内部公开',
  },
  {
    id: 'ATT-014',
    name: '生产工艺产值与单位产品用水定额测算表.doc',
    primaryCategory: '取水计划',
    secondaryCategory: '年度计划申报',
    businessCode: 'JH-SB-20260001',
    fileFormat: 'DOC',
    size: '1.1 MB',
    uploader: '技术开发中心',
    uploadTime: '2025-12-22 14:20',
    year: '2025',
    status: '生效中',
    securityLevel: '内部公开',
  },
  {
    id: 'ATT-015',
    name: '2026年半年度月度取水限额核定下达通知书.pdf',
    primaryCategory: '取水计划',
    secondaryCategory: '月度用水核定',
    businessCode: 'JH-HD-20260610',
    fileFormat: 'PDF',
    size: '890 KB',
    uploader: '水务局节水办',
    uploadTime: '2026-06-10 16:30',
    year: '2026',
    status: '生效中',
    securityLevel: '受控档案',
  },
  {
    id: 'ATT-016',
    name: '月度水量在线抄表与计划核定台账表(1-8月).xls',
    primaryCategory: '取水计划',
    secondaryCategory: '月度用水核定',
    businessCode: 'JH-HD-20260831',
    fileFormat: 'XLS',
    size: '620 KB',
    uploader: '节水管理专员',
    uploadTime: '2026-08-31 17:00',
    year: '2026',
    status: '生效中',
    securityLevel: '内部公开',
  },
  {
    id: 'ATT-017',
    name: '新增高纯硅产线试车用水计划追加申请.pdf',
    primaryCategory: '取水计划',
    secondaryCategory: '计划追加与调整',
    businessCode: 'JH-TJ-20260708',
    fileFormat: 'PDF',
    size: '1.6 MB',
    uploader: '生产调度中心',
    uploadTime: '2026-07-08 09:15',
    year: '2026',
    status: '已核验',
    securityLevel: '内部公开',
  },
  {
    id: 'ATT-018',
    name: '计划水量调整追加审核批准决定文书.pdf',
    primaryCategory: '取水计划',
    secondaryCategory: '计划追加与调整',
    businessCode: 'JH-TJ-20260708',
    fileFormat: 'PDF',
    size: '980 KB',
    uploader: '省水利厅水资源处',
    uploadTime: '2026-07-15 15:40',
    year: '2026',
    status: '生效中',
    securityLevel: '核心文书',
  },
  {
    id: 'ATT-019',
    name: '年度超定额累进加价征收核定通知与完税说明.pdf',
    primaryCategory: '取水计划',
    secondaryCategory: '超计划加价记录',
    businessCode: 'JH-JJ-20250002',
    fileFormat: 'PDF',
    size: '750 KB',
    uploader: '计财水费征收科',
    uploadTime: '2025-12-28 10:20',
    year: '2025',
    status: '归档备查',
    securityLevel: '受控档案',
  },

  // ----- 计量监管 -----
  {
    id: 'ATT-020',
    name: '1#进水管超声波流量计工程安装施工蓝图.dwg',
    primaryCategory: '计量监管',
    secondaryCategory: '设施安装验收',
    businessCode: 'JL-YS-20250105',
    fileFormat: 'DWG',
    size: '12.3 MB',
    uploader: '自动化工程设计院',
    uploadTime: '2025-01-05 14:00',
    year: '2025',
    status: '归档备查',
    securityLevel: '内部公开',
  },
  {
    id: 'ATT-021',
    name: '全厂取水计量设施数据采集传输终验合格报告.pdf',
    primaryCategory: '计量监管',
    secondaryCategory: '设施安装验收',
    businessCode: 'JL-YS-20250122',
    fileFormat: 'PDF',
    size: '3.4 MB',
    uploader: '现场监理工程师',
    uploadTime: '2025-01-22 11:30',
    year: '2025',
    status: '生效中',
    securityLevel: '核心文书',
  },
  {
    id: 'ATT-022',
    name: '国家法定计量检定机构校准合格证书(6套仪表).pdf',
    primaryCategory: '计量监管',
    secondaryCategory: '计量检定证书',
    businessCode: 'JL-JD-20260310',
    fileFormat: 'PDF',
    size: '6.8 MB',
    uploader: '青海省计量测试研究院',
    uploadTime: '2026-03-10 10:00',
    year: '2026',
    status: '生效中',
    securityLevel: '核心文书',
  },
  {
    id: 'ATT-023',
    name: '电磁流量计定期标定与相对误差复核单.doc',
    primaryCategory: '计量监管',
    secondaryCategory: '计量检定证书',
    businessCode: 'JL-JD-20260312',
    fileFormat: 'DOC',
    size: '1.4 MB',
    uploader: '仪表检定技术所',
    uploadTime: '2026-03-12 15:20',
    year: '2026',
    status: '已核验',
    securityLevel: '内部公开',
  },
  {
    id: 'ATT-024',
    name: '4G水资源遥测终端RTU通信组网及封印台账.pdf',
    primaryCategory: '计量监管',
    secondaryCategory: 'RTU数据远传台账',
    businessCode: 'JL-RTU-20250210',
    fileFormat: 'PDF',
    size: '880 KB',
    uploader: '信息运维技术部',
    uploadTime: '2025-02-10 09:30',
    year: '2025',
    status: '生效中',
    securityLevel: '受控档案',
  },
  {
    id: 'ATT-025',
    name: '1#计量点雷击断线突发故障现场处置工单.pdf',
    primaryCategory: '计量监管',
    secondaryCategory: '异常排查报告',
    businessCode: 'JL-YC-20260804',
    fileFormat: 'PDF',
    size: '1.9 MB',
    uploader: '智慧水务运维运维组',
    uploadTime: '2026-08-04 16:00',
    year: '2026',
    status: '归档备查',
    securityLevel: '内部公开',
  },

  // ----- 违法违规 -----
  {
    id: 'ATT-026',
    name: '国家水资源监控系统异常疑点线索核查反馈单.pdf',
    primaryCategory: '违法违规',
    secondaryCategory: '违规线索核查',
    businessCode: 'WG-HC-20260012',
    fileFormat: 'PDF',
    size: '1.2 MB',
    uploader: '水利部督查专员组',
    uploadTime: '2026-08-05 09:30',
    year: '2026',
    status: '已核验',
    securityLevel: '受控档案',
  },
  {
    id: 'ATT-027',
    name: '西宁水政监察责令限期整改通知书及企业回执.pdf',
    primaryCategory: '违法违规',
    secondaryCategory: '责令整改通知书',
    businessCode: 'WG-ZG-2026003',
    fileFormat: 'PDF',
    size: '980 KB',
    uploader: '西宁水政监察大队',
    uploadTime: '2026-08-06 14:00',
    year: '2026',
    status: '归档备查',
    securityLevel: '核心文书',
  },
  {
    id: 'ATT-028',
    name: '整改复查合格结论与疑点销号申请审批批复.pdf',
    primaryCategory: '违法违规',
    secondaryCategory: '行政处罚与复核',
    businessCode: 'WG-XH-2026001',
    fileFormat: 'PDF',
    size: '1.7 MB',
    uploader: '西宁市水务局',
    uploadTime: '2026-08-10 11:20',
    year: '2026',
    status: '生效中',
    securityLevel: '核心文书',
  },
]);

// 计算各分类下文件总数
const getCategoryFileCount = (catName: string) => {
  return allDossierAttachments.value.filter(item => item.primaryCategory === catName).length;
};

const getSubCategoryFileCount = (catName: string, subName: string) => {
  return allDossierAttachments.value.filter(
    item => item.primaryCategory === catName && item.secondaryCategory === subName
  ).length;
};

// 当前选中的路径名称
const currentCategoryPathText = computed(() => {
  if (selectedPrimaryCategory.value === 'ALL') {
    return '全部附件档案资料 (全库)';
  }
  if (!selectedSecondaryCategory.value) {
    return `${selectedPrimaryCategory.value} (全部二级子项)`;
  }
  return `${selectedPrimaryCategory.value} > ${selectedSecondaryCategory.value}`;
});

// 折叠展开一级分类
const toggleCategoryExpand = (catName: string) => {
  expandedCategories.value[catName] = !expandedCategories.value[catName];
};

// 点击一级分类标题
const handlePrimaryCategoryClick = (catName: string) => {
  selectedPrimaryCategory.value = catName;
  selectedSecondaryCategory.value = '';
  expandedCategories.value[catName] = true;
  currentPage.value = 1;
};

// 点击二级分类
const handleSelectCategory = (primary: string, secondary: string) => {
  selectedPrimaryCategory.value = primary;
  selectedSecondaryCategory.value = secondary;
  if (primary !== 'ALL') {
    expandedCategories.value[primary] = true;
  }
  currentPage.value = 1;
};

// 筛选过滤后的附件列表
const filteredAttachmentList = computed(() => {
  return allDossierAttachments.value.filter(item => {
    // 分类筛选
    if (selectedPrimaryCategory.value !== 'ALL') {
      if (item.primaryCategory !== selectedPrimaryCategory.value) return false;
      if (selectedSecondaryCategory.value && item.secondaryCategory !== selectedSecondaryCategory.value) {
        return false;
      }
    }

    // 年份筛选
    if (fileFilterYear.value !== 'ALL' && item.year !== fileFilterYear.value) {
      return false;
    }

    // 格式筛选
    if (fileFilterFormat.value !== 'ALL' && item.fileFormat !== fileFilterFormat.value) {
      return false;
    }

    // 关键字搜索
    if (fileFilterKeyword.value.trim()) {
      const kw = fileFilterKeyword.value.trim().toLowerCase();
      const matchName = item.name.toLowerCase().includes(kw);
      const matchCode = item.businessCode.toLowerCase().includes(kw);
      const matchUploader = item.uploader.toLowerCase().includes(kw);
      const matchSub = item.secondaryCategory.toLowerCase().includes(kw);
      if (!matchName && !matchCode && !matchUploader && !matchSub) return false;
    }

    return true;
  });
});

// 分页数据
const totalPages = computed(() => {
  return Math.ceil(filteredAttachmentList.value.length / pageSize.value) || 1;
});

const paginatedFiles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredAttachmentList.value.slice(start, start + pageSize.value);
});

// 表格多选逻辑
const isAllFilesSelected = computed(() => {
  if (paginatedFiles.value.length === 0) return false;
  return paginatedFiles.value.every(f => selectedFileIds.value.includes(f.id));
});

const toggleSelectAllFiles = () => {
  if (isAllFilesSelected.value) {
    const pageIds = paginatedFiles.value.map(f => f.id);
    selectedFileIds.value = selectedFileIds.value.filter(id => !pageIds.includes(id));
  } else {
    paginatedFiles.value.forEach(f => {
      if (!selectedFileIds.value.includes(f.id)) {
        selectedFileIds.value.push(f.id);
      }
    });
  }
};

const toggleSelectFile = (fileId: string) => {
  const idx = selectedFileIds.value.indexOf(fileId);
  if (idx > -1) {
    selectedFileIds.value.splice(idx, 1);
  } else {
    selectedFileIds.value.push(fileId);
  }
};

const handleResetFileFilters = () => {
  fileFilterKeyword.value = '';
  fileFilterYear.value = 'ALL';
  fileFilterFormat.value = 'ALL';
  selectedPrimaryCategory.value = 'ALL';
  selectedSecondaryCategory.value = '';
  currentPage.value = 1;
  MessagePlugin.info('已重置所有检索条件，展示全部附件档案');
};

// 预览附件
const handleOpenPreviewModal = (file: DossierAttachmentItem) => {
  previewingFile.value = file;
  previewZoomLevel.value = 1.0;
  showAttachmentPreviewModal.value = true;
};

// 下载单个文件
const handleDownloadSingleFile = (file: DossierAttachmentItem) => {
  MessagePlugin.success(`开始安全下载档案文件：【${file.name}】`);
};

// 批量下载
const handleBatchDownloadFiles = () => {
  if (selectedFileIds.value.length === 0) return;
  MessagePlugin.success(`已打包 ${selectedFileIds.value.length} 份选中附件档案，正在生成 ZIP 压缩包下载`);
};

// 打印附件
const handlePrintAttachment = (file: DossierAttachmentItem) => {
  MessagePlugin.info(`正在调起政务档案打印机，输出【${file.name}】副本`);
};

// 打开上传弹窗
const openUploadAttachmentModal = () => {
  uploadForm.value = {
    primaryCategory: selectedPrimaryCategory.value !== 'ALL' ? selectedPrimaryCategory.value : '取水许可',
    secondaryCategory: selectedSecondaryCategory.value || '许可申请',
    fileName: '',
    businessCode: `XK-GD-${new Date().getFullYear()}${String(Math.floor(Math.random() * 9000 + 1000))}`,
  };
  showUploadModal.value = true;
};

// 联动上传二级菜单
const currentUploadSubCategories = computed(() => {
  const matched = attachmentCategoryTree.find(c => c.name === uploadForm.value.primaryCategory);
  return matched ? matched.children : [];
});

const handleUploadPrimaryCategoryChange = () => {
  if (currentUploadSubCategories.value.length > 0) {
    uploadForm.value.secondaryCategory = currentUploadSubCategories.value[0].name;
  }
};

// 提交上传新附件
const handleSubmitUploadFile = () => {
  if (!uploadForm.value.fileName.trim()) {
    MessagePlugin.warning('请输入附件名称');
    return;
  }

  const newDoc: DossierAttachmentItem = {
    id: `ATT-${Date.now().toString().slice(-4)}`,
    name: uploadForm.value.fileName.trim(),
    primaryCategory: uploadForm.value.primaryCategory,
    secondaryCategory: uploadForm.value.secondaryCategory,
    businessCode: uploadForm.value.businessCode.trim() || `XK-GD-2026-${Math.floor(Math.random() * 900 + 100)}`,
    fileFormat: uploadForm.value.fileName.toLowerCase().endsWith('.dwg')
      ? 'DWG'
      : uploadForm.value.fileName.toLowerCase().endsWith('.xls') || uploadForm.value.fileName.toLowerCase().endsWith('.xlsx')
      ? 'XLS'
      : uploadForm.value.fileName.toLowerCase().endsWith('.doc') || uploadForm.value.fileName.toLowerCase().endsWith('.docx')
      ? 'DOC'
      : 'PDF',
    size: '2.5 MB',
    uploader: '系统在线上传经办',
    uploadTime: new Date().toISOString().slice(0, 16).replace('T', ' '),
    year: '2026',
    status: '生效中',
    securityLevel: '核心文书',
  };

  allDossierAttachments.value.unshift(newDoc);
  showUploadModal.value = false;
  MessagePlugin.success(`附件【${newDoc.name}】已成功归档至【${newDoc.primaryCategory} / ${newDoc.secondaryCategory}】！`);
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
}
</style>
