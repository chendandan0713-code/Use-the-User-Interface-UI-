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
            <span>{{ tab.label }}</span>
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

            <!-- 模块 2: 当前取水许可证信息 -->
            <div class="bg-white rounded-lg border border-[#cde0f5] overflow-hidden shadow-2xs">
              <!-- 模块标题栏 -->
              <div class="bg-[#f0f6ff] px-4 py-2.5 border-b border-[#cde0f5] flex items-center justify-between">
                <span class="text-xs font-bold text-[#1677ff]">当前取水许可证信息</span>
                <span class="text-[11px] text-slate-400">有效期限：2025-1-30 ~ 2030-1-30</span>
              </div>

              <!-- 许可证指标表 (严格按截图呈现 2x4 格结构) -->
              <table class="w-full text-left text-xs border-collapse">
                <tbody>
                  <!-- 行 1: 水源类型 + 许可水量 -->
                  <tr class="border-b border-slate-200">
                    <td class="w-36 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200 text-center">
                      水源类型
                    </td>
                    <td class="py-2.5 px-4 text-slate-800 text-center border-r border-slate-200">
                      {{ dossierData.waterSourceType || '地表水/地下水' }}
                    </td>
                    <td class="w-40 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200 text-center">
                      许可水量
                    </td>
                    <td class="py-2.5 px-4 font-mono text-slate-900 font-semibold text-center">
                      {{ dossierData.annualPermitVolume ? dossierData.annualPermitVolume + ' 万方' : '1200 万方' }}
                    </td>
                  </tr>

                  <!-- 行 2: 取水工程 + 取水口 -->
                  <tr class="border-b border-slate-200">
                    <td class="w-36 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200 text-center">
                      取水工程
                    </td>
                    <td class="py-2.5 px-4 font-mono text-slate-800 text-center border-r border-slate-200">
                      {{ dossierData.intakeProjectCount }} 个
                    </td>
                    <td class="w-40 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200 text-center">
                      取水口
                    </td>
                    <td class="py-2.5 px-4 font-mono text-slate-800 text-center">
                      {{ dossierData.intakeCount }} 个
                    </td>
                  </tr>

                  <!-- 行 3: 在线计量设施 + 非在线计量设施 -->
                  <tr class="border-b border-slate-200">
                    <td class="w-36 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200 text-center">
                      在线计量设施
                    </td>
                    <td class="py-2.5 px-4 font-mono text-emerald-700 font-bold text-center border-r border-slate-200">
                      {{ dossierData.onlineMeteringCount }} 个
                    </td>
                    <td class="w-40 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200 text-center">
                      非在线计量设施
                    </td>
                    <td class="py-2.5 px-4 font-mono text-slate-500 text-center">
                      {{ dossierData.offlineMeteringCount }} 个
                    </td>
                  </tr>

                  <!-- 行 4: 今年年计划水量 + 历年平均计量水量 -->
                  <tr>
                    <td class="w-36 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200 text-center">
                      今年年计划水量
                    </td>
                    <td class="py-2.5 px-4 font-mono text-slate-800 text-center border-r border-slate-200">
                      {{ dossierData.annualPermitVolume ? dossierData.annualPermitVolume + ' 万方' : '1200 万方' }}
                    </td>
                    <td class="w-40 py-2.5 px-4 bg-slate-50/80 text-slate-600 font-normal border-r border-slate-200 text-center">
                      历年平均计量水量
                    </td>
                    <td class="py-2.5 px-4 font-mono text-slate-800 text-center">
                      1020 万方
                    </td>
                  </tr>
                </tbody>
              </table>
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

          <!-- ==================== Tab 3: 计量设施(6) ==================== -->
          <div v-show="activeTabKey === 'meter'" class="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>计量点与计量设施清单 (共 6 处设施，在线率 100%)</span>
              </h4>
              <span class="text-[11px] text-emerald-600 font-medium">全域远程 RTU 遥测在线</span>
            </div>

            <table class="w-full text-left text-xs border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
                  <th class="py-2 px-2.5 border-r border-slate-200">序号</th>
                  <th class="py-2 px-3 border-r border-slate-200">计量设施编码</th>
                  <th class="py-2 px-3 border-r border-slate-200">计量点名称</th>
                  <th class="py-2 px-2.5 border-r border-slate-200">仪表规格型号</th>
                  <th class="py-2 px-2.5 border-r border-slate-200 text-center">采集方式</th>
                  <th class="py-2 px-2.5 border-r border-slate-200 text-center">通信状态</th>
                  <th class="py-2 px-3 border-r border-slate-200">最新表底 (m³)</th>
                  <th class="py-2 px-3 border-r border-slate-200">最近遥测时间</th>
                  <th class="py-2 px-2.5 text-center">检定周期</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 font-mono">
                <tr v-for="i in 6" :key="i" class="hover:bg-slate-50 text-[11.5px]">
                  <td class="py-2 px-2.5 border-r border-slate-200 text-center text-slate-500">{{ i }}</td>
                  <td class="py-2 px-3 border-r border-slate-200 text-blue-700 font-medium">JL-XN-2026-0{{ i }}</td>
                  <td class="py-2 px-3 border-r border-slate-200 font-sans font-medium text-slate-800">
                    {{ ['1#厂区进水总管超声计量点', '2#化验车间支管电磁计量点', '3#动力站冷凝回水点', '4#备用水源深井计量点', '5#尾矿回用水回流监测点', '6#厂区绿化非常规水计量点'][i - 1] }}
                  </td>
                  <td class="py-2 px-2.5 border-r border-slate-200 font-sans text-slate-600">
                    {{ ['电磁流量计 DN400', '超声波流量计 DN250', '涡轮流量计 DN150', '多声道超声计 DN300', '电磁流量计 DN200', '智能机械水表 DN80'][i - 1] }}
                  </td>
                  <td class="py-2 px-2.5 border-r border-slate-200 text-center font-sans">
                    <span class="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[10.5px]">4G RTU 远传</span>
                  </td>
                  <td class="py-2 px-2.5 border-r border-slate-200 text-center font-sans">
                    <span class="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10.5px] font-medium flex items-center justify-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      在线正常
                    </span>
                  </td>
                  <td class="py-2 px-3 border-r border-slate-200 text-slate-900 font-bold">
                    {{ (124050 + i * 1845.2).toFixed(1) }}
                  </td>
                  <td class="py-2 px-3 border-r border-slate-200 text-slate-500 text-[11px]">
                    2026-09-14 17:50:00
                  </td>
                  <td class="py-2 px-2.5 text-center font-sans">
                    <span class="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10.5px]">有效期内</span>
                  </td>
                </tr>
              </tbody>
            </table>
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
          <div v-show="activeTabKey === 'files'" class="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
            <h4 class="text-xs font-bold text-slate-800">一户一档扫描件与电子附件资料库</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div
                v-for="(doc, idx) in [
                  { name: '取水许可电子证书正本.pdf', size: '2.4 MB', time: '2025-01-30' },
                  { name: '水资源论证报告书及审查意见.pdf', size: '18.6 MB', time: '2024-11-12' },
                  { name: '节水评价专项审查表.pdf', size: '1.8 MB', time: '2024-12-05' },
                  { name: '取水工程竣工验收合格批复文件.pdf', size: '3.1 MB', time: '2025-01-20' },
                  { name: '计量设施检定合格证书(全套).pdf', size: '5.2 MB', time: '2026-03-10' },
                  { name: '水资源税纳税完税凭证电子存根.pdf', size: '920 KB', time: '2026-07-15' },
                ]"
                :key="idx"
                class="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-[#1677ff] hover:bg-blue-50/30 transition flex items-center justify-between"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <div class="w-8 h-8 rounded bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </div>
                  <div class="min-w-0">
                    <div class="font-medium text-slate-800 truncate" :title="doc.name">{{ doc.name }}</div>
                    <div class="text-[11px] text-slate-400 font-mono">{{ doc.size }} · {{ doc.time }}</div>
                  </div>
                </div>
                <button
                  type="button"
                  @click="handlePreviewFile(doc.name)"
                  class="text-[#1677ff] hover:underline text-xs font-medium shrink-0 ml-2 cursor-pointer"
                >
                  预览
                </button>
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

    <!-- 拓扑图弹窗组件 -->
    <EnterpriseDossierTopologyModal
      v-if="dossierData"
      v-model:visible="showTopologyModal"
      :dossier-data="dossierData"
      @close="showTopologyModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import EnterpriseDossierTopologyModal from './EnterpriseDossierTopologyModal.vue';
import { EnterpriseDossier } from '../../types';

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
