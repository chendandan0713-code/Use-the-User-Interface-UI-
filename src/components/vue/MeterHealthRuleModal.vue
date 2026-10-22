<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs select-none"
    @click.self="handleClose"
  >
    <!-- 模态框主体卡片 -->
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      <!-- 弹窗顶栏 -->
      <div class="px-5 py-3.5 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-bold tracking-wide">水资源在线计量设备健康度评分与诊断规则总表</h3>
            <p class="text-[11px] text-blue-100/90 mt-0.5">
              依据最新评分与诊断规范：运行健康度（80分）+ 检定合规（20分）+ 停用状态覆盖 · 七级等级与业务动作映射
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="handleClose"
          class="w-7 h-7 rounded-lg text-white/80 hover:text-white hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
          title="关闭窗口"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Tab 切换头 -->
      <div class="px-5 pt-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
        <div class="flex gap-2">
          <button
            type="button"
            @click="activeTab = 'rules'"
            :class="[
              'px-3.5 py-1.5 text-xs font-semibold rounded-t-lg transition border-t border-x cursor-pointer flex items-center gap-1.5',
              activeTab === 'rules'
                ? 'bg-white text-blue-700 border-slate-200 -mb-px'
                : 'bg-transparent text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            ]"
          >
            <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>明细扣分规则总表与等级映射</span>
          </button>

          <button
            type="button"
            @click="activeTab = 'weights'"
            :class="[
              'px-3.5 py-1.5 text-xs font-semibold rounded-t-lg transition border-t border-x cursor-pointer flex items-center gap-1.5',
              activeTab === 'weights'
                ? 'bg-white text-indigo-700 border-slate-200 -mb-px'
                : 'bg-transparent text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            ]"
          >
            <svg class="w-3.5 h-3.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
              <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
            </svg>
            <span>维度权重与分层架构</span>
          </button>

          <button
            type="button"
            @click="activeTab = 'permission'"
            :class="[
              'px-3.5 py-1.5 text-xs font-semibold rounded-t-lg transition border-t border-x cursor-pointer flex items-center gap-1.5',
              activeTab === 'permission'
                ? 'bg-white text-indigo-700 border-slate-200 -mb-px'
                : 'bg-transparent text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            ]"
          >
            <svg class="w-3.5 h-3.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>多级监管角色权限规则</span>
          </button>
        </div>

        <div class="text-[11px] text-slate-500 pb-1.5 flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>规则标准：基准分100分 · 联动业务动作执行</span>
        </div>
      </div>

      <!-- 模态框滚动内容主体 -->
      <div class="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-4">
        <!-- ==================== Tab 1: 明细扣分规则总表与等级映射 ==================== -->
        <div v-if="activeTab === 'rules'" class="space-y-4">
          <!-- 四、健康度等级映射总表（PDF 第四部分） -->
          <div class="p-3.5 bg-gradient-to-r from-blue-50/90 to-indigo-50/90 rounded-lg border border-blue-200">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>四、健康度等级与业务动作映射规范</span>
              </span>
              <span class="text-[11px] text-blue-700 font-medium">业务动作与管理闭环严格对应</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              <!-- 优 -->
              <div class="bg-white p-2.5 rounded-lg border border-emerald-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-extrabold text-emerald-700">优</span>
                    <span class="font-mono text-[11px] font-bold text-emerald-800">90–100分</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-1">状态优良稳定</div>
                </div>
                <div class="mt-2 pt-1 border-t border-slate-100">
                  <span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold block text-center">
                    正常巡检
                  </span>
                </div>
              </div>

              <!-- 良 -->
              <div class="bg-white p-2.5 rounded-lg border border-blue-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-extrabold text-blue-700">良</span>
                    <span class="font-mono text-[11px] font-bold text-blue-800">70–89分</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-1">偶发轻度异常</div>
                </div>
                <div class="mt-2 pt-1 border-t border-slate-100">
                  <span class="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold block text-center">
                    关注
                  </span>
                </div>
              </div>

              <!-- 中 -->
              <div class="bg-white p-2.5 rounded-lg border border-amber-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-extrabold text-amber-700">中</span>
                    <span class="font-mono text-[11px] font-bold text-amber-800">50–69分</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-1">中度数据异常</div>
                </div>
                <div class="mt-2 pt-1 border-t border-slate-100">
                  <span class="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold block text-center">
                    生成维护工单
                  </span>
                </div>
              </div>

              <!-- 差 -->
              <div class="bg-white p-2.5 rounded-lg border border-orange-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-extrabold text-orange-700">差</span>
                    <span class="font-mono text-[11px] font-bold text-orange-800">30–49分</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-1">持续严重异常</div>
                </div>
                <div class="mt-2 pt-1 border-t border-slate-100">
                  <span class="px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 text-[10px] font-bold block text-center">
                    优先处理
                  </span>
                </div>
              </div>

              <!-- 极差 -->
              <div class="bg-white p-2.5 rounded-lg border border-rose-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-extrabold text-rose-700">极差</span>
                    <span class="font-mono text-[11px] font-bold text-rose-800">0–29分</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-1">长周期多重故障</div>
                </div>
                <div class="mt-2 pt-1 border-t border-slate-100">
                  <span class="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-bold block text-center">
                    立即处理
                  </span>
                </div>
              </div>

              <!-- 不可用 -->
              <div class="bg-white p-2.5 rounded-lg border border-purple-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-extrabold text-purple-700">不可用</span>
                    <span class="font-mono text-[11px] font-bold text-purple-800">—</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-1">检定超过有效期</div>
                </div>
                <div class="mt-2 pt-1 border-t border-slate-100">
                  <span class="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-bold block text-center">
                    禁止使用
                  </span>
                </div>
              </div>

              <!-- 停用 -->
              <div class="bg-white p-2.5 rounded-lg border border-slate-300 shadow-2xs flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-extrabold text-slate-700">停用</span>
                    <span class="font-mono text-[11px] font-bold text-slate-500">—</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-1">人工停用覆盖</div>
                </div>
                <div class="mt-2 pt-1 border-t border-slate-100">
                  <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold block text-center">
                    不参与评分
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 三、明细扣分规则总表（严格按 PDF 表格完整字段展示） -->
          <div class="border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
            <div class="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800">三、明细扣分规则总表（完整字段）</span>
              <span class="text-[11px] text-slate-500">涵盖触发条件、扣分规则、恢复机制与联动动作</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-[11px]">
                    <th class="py-2.5 px-2.5 min-w-[70px] border-r border-slate-200">大维度</th>
                    <th class="py-2.5 px-2 text-center w-14 border-r border-slate-200">组别</th>
                    <th class="py-2.5 px-2.5 min-w-[90px] border-r border-slate-200">异常/状态</th>
                    <th class="py-2.5 px-2 text-center w-16 border-r border-slate-200">内部权重</th>
                    <th class="py-2.5 px-2 text-center w-16 border-r border-slate-200">折算分</th>
                    <th class="py-2.5 px-2.5 min-w-[90px] border-r border-slate-200">触发条件</th>
                    <th class="py-2.5 px-2.5 min-w-[130px] border-r border-slate-200">扣分规则</th>
                    <th class="py-2.5 px-2 text-center w-16 border-r border-slate-200">扣分上限</th>
                    <th class="py-2.5 px-2 text-center w-16 border-r border-slate-200">是否恢复</th>
                    <th class="py-2.5 px-3 min-w-[180px] border-r border-slate-200">恢复规则</th>
                    <th class="py-2.5 px-2 text-center w-14 border-r border-slate-200">记录保留</th>
                    <th class="py-2.5 px-2.5 min-w-[110px]">联动动作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-[11px]">
                  <tr
                    v-for="(rule, idx) in defaultHealthScoringConfig.rules"
                    :key="rule.key"
                    :class="[
                      'hover:bg-blue-50/40 transition',
                      rule.dimension === '运行健康度' && rule.group === 'B组' ? 'bg-amber-50/20' : '',
                      rule.dimension === '运行健康度' && rule.group === 'C组' ? 'bg-amber-100/30' : '',
                      rule.dimension === '检定' ? 'bg-indigo-50/20' : '',
                      rule.dimension === '停用' ? 'bg-slate-50' : ''
                    ]"
                  >
                    <!-- 大维度 -->
                    <td class="py-2.5 px-2.5 font-bold border-r border-slate-200 text-slate-800">
                      {{ rule.dimension }}
                    </td>

                    <!-- 组别 -->
                    <td class="py-2.5 px-2 text-center font-medium border-r border-slate-200 text-slate-700">
                      {{ rule.group }}
                    </td>

                    <!-- 异常/状态 -->
                    <td class="py-2.5 px-2.5 font-bold border-r border-slate-200">
                      <span
                        :class="[
                          'px-1.5 py-0.5 rounded text-[11px]',
                          rule.group === 'A组' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          rule.group === 'B组' ? 'bg-rose-50 text-rose-700 border border-rose-200 font-bold' :
                          rule.group === 'C组' ? 'bg-amber-50 text-amber-700 border border-amber-200 font-bold' :
                          rule.key === 'calib_overdue' ? 'bg-purple-50 text-purple-700 border border-purple-200 font-bold' :
                          rule.dimension === '检定' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                          'bg-slate-100 text-slate-600 border border-slate-300'
                        ]"
                      >
                        {{ rule.name }}
                      </span>
                    </td>

                    <!-- 内部权重 -->
                    <td class="py-2.5 px-2 text-center font-mono border-r border-slate-200 text-slate-600">
                      {{ rule.internalWeight }}
                    </td>

                    <!-- 折算分 -->
                    <td class="py-2.5 px-2 text-center font-mono font-bold text-blue-700 border-r border-slate-200">
                      {{ rule.maxPoints > 0 ? `${rule.maxPoints}分` : '—' }}
                    </td>

                    <!-- 触发条件 -->
                    <td class="py-2.5 px-2.5 border-r border-slate-200 text-slate-800">
                      {{ rule.triggerCondition }}
                    </td>

                    <!-- 扣分规则 -->
                    <td class="py-2.5 px-2.5 font-mono text-slate-800 border-r border-slate-200 bg-slate-50/60">
                      {{ rule.penaltyRule }}
                    </td>

                    <!-- 扣分上限 -->
                    <td class="py-2.5 px-2 text-center font-mono font-bold text-rose-600 border-r border-slate-200">
                      {{ rule.maxPoints > 0 ? `${rule.maxPoints}分` : '—' }}
                    </td>

                    <!-- 是否可恢复 -->
                    <td class="py-2.5 px-2 text-center border-r border-slate-200">
                      <span
                        :class="[
                          'font-medium',
                          rule.isRecoverable === '可恢复' ? 'text-emerald-600' :
                          rule.isRecoverable === '视结论' ? 'text-amber-600' : 'text-slate-400'
                        ]"
                      >
                        {{ rule.isRecoverable }}
                      </span>
                    </td>

                    <!-- 恢复规则 -->
                    <td class="py-2.5 px-3 text-slate-600 border-r border-slate-200 leading-relaxed text-[10px]">
                      {{ rule.recoveryRule }}
                    </td>

                    <!-- 记录保留 -->
                    <td class="py-2.5 px-2 text-center border-r border-slate-200 text-slate-600">
                      保留
                    </td>

                    <!-- 联动动作 -->
                    <td class="py-2.5 px-2.5 font-bold">
                      <span
                        :class="[
                          'px-1.5 py-0.5 rounded text-[10px]',
                          rule.linkedAction.includes('高优先级') ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                          rule.linkedAction.includes('禁止使用') ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                          rule.linkedAction.includes('工单') ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                          rule.linkedAction.includes('预警') ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                          'bg-slate-100 text-slate-700'
                        ]"
                      >
                        {{ rule.linkedAction }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ==================== Tab 2: 维度权重与分层架构 ==================== -->
        <div v-else-if="activeTab === 'weights'" class="space-y-4">
          <!-- 一、整体维度权重（PDF 第一部分） -->
          <div class="border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
            <div class="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800">一、整体维度权重</span>
              <span class="text-[11px] text-slate-500">满分100分（运行健康度80分 + 检定20分）</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-[11px]">
                    <th class="py-2.5 px-3 min-w-[120px] border-r border-slate-200">大维度</th>
                    <th class="py-2.5 px-3 w-28 text-center border-r border-slate-200">权重分值</th>
                    <th class="py-2.5 px-3">说明</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr class="hover:bg-slate-50 transition">
                    <td class="py-2.5 px-3 font-bold border-r border-slate-200 text-slate-800">运行健康度</td>
                    <td class="py-2.5 px-3 text-center font-mono font-bold text-blue-700 border-r border-slate-200">80分</td>
                    <td class="py-2.5 px-3 text-slate-600 text-[11px]">核心，反映设备运行与数据可信度</td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition">
                    <td class="py-2.5 px-3 font-bold border-r border-slate-200 text-slate-800">检定</td>
                    <td class="py-2.5 px-3 text-center font-mono font-bold text-indigo-700 border-r border-slate-200">20分</td>
                    <td class="py-2.5 px-3 text-slate-600 text-[11px]">合规性</td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition">
                    <td class="py-2.5 px-3 font-bold border-r border-slate-200 text-slate-800">停用</td>
                    <td class="py-2.5 px-3 text-center font-mono text-slate-400 border-r border-slate-200">不计分</td>
                    <td class="py-2.5 px-3 text-slate-600 text-[11px]">状态覆盖，不占权重</td>
                  </tr>
                  <tr class="bg-slate-50/80 font-bold">
                    <td class="py-2 px-3 border-r border-slate-200 text-slate-900">合计</td>
                    <td class="py-2 px-3 text-center font-mono text-blue-900 border-r border-slate-200">100分</td>
                    <td class="py-2 px-3 text-slate-500">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 二、运行健康度内部权重（80分）（PDF 第二部分） -->
          <div class="border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
            <div class="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800">二、运行健康度内部权重（80分）</span>
              <span class="text-[11px] text-slate-500">A组单次 (30%) + B组持续 (50%) + C组待核实 (20%)</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-[11px]">
                    <th class="py-2.5 px-3 min-w-[150px] border-r border-slate-200">组别</th>
                    <th class="py-2.5 px-3 w-32 text-center border-r border-slate-200">占运行健康度</th>
                    <th class="py-2.5 px-3 w-28 text-center border-r border-slate-200">折算总分</th>
                    <th class="py-2.5 px-3">说明</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr class="hover:bg-slate-50 transition">
                    <td class="py-2.5 px-3 font-bold border-r border-slate-200 text-slate-800">A组：单次数据异常</td>
                    <td class="py-2.5 px-3 text-center font-mono border-r border-slate-200 text-slate-700">30%</td>
                    <td class="py-2.5 px-3 text-center font-mono font-bold text-blue-700 border-r border-slate-200">24分</td>
                    <td class="py-2.5 px-3 text-slate-600 text-[11px]">偶发，轻扣，快恢复</td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition">
                    <td class="py-2.5 px-3 font-bold border-r border-slate-200 text-slate-800">B组：持续数据异常</td>
                    <td class="py-2.5 px-3 text-center font-mono border-r border-slate-200 text-slate-700">50%</td>
                    <td class="py-2.5 px-3 text-center font-mono font-bold text-rose-700 border-r border-slate-200">40分</td>
                    <td class="py-2.5 px-3 text-slate-600 text-[11px]">持续，重扣，联动工单</td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition">
                    <td class="py-2.5 px-3 font-bold border-r border-slate-200 text-slate-800">C组：待核实异常</td>
                    <td class="py-2.5 px-3 text-center font-mono border-r border-slate-200 text-slate-700">20%</td>
                    <td class="py-2.5 px-3 text-center font-mono font-bold text-amber-700 border-r border-slate-200">16分</td>
                    <td class="py-2.5 px-3 text-slate-600 text-[11px]">存疑，中间扣，核实后调整</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ==================== Tab 3: 权限规则 ==================== -->
        <div v-else-if="activeTab === 'permission'" class="space-y-4">
          <div class="p-3.5 bg-indigo-50/80 rounded-lg border border-indigo-200">
            <div class="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>水资源计量健康监管四级权限访问与控制架构</span>
            </div>
            <p class="text-[11px] text-indigo-800 leading-relaxed mt-1">
              遵循国家及水行政规范，按管理属地划分权限角色：
              <strong>省级管理员</strong>（顶层规则设定与全省态势审计）、<strong>市级监管员</strong>（各区县穿透监管与工单督办）、
              <strong>县级水管所</strong>（属地现场核验、初查与消警归档）、<strong>取水权人/运维企业</strong>（仅限查看本单位设施体检诊断报告）。
            </p>
          </div>

          <!-- 四级角色权限矩阵对比表 -->
          <div class="border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
            <div class="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800">四级监管角色权限功能矩阵对照</span>
              <span class="text-[11px] text-slate-500">基于RBAC精细化权限模型</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-[11px]">
                    <th class="py-2.5 px-3 min-w-[140px] border-r border-slate-200">角色名称</th>
                    <th class="py-2.5 px-3 min-w-[160px] border-r border-slate-200">业务管辖范围</th>
                    <th class="py-2.5 px-2 text-center w-20 border-r border-slate-200">全域总览</th>
                    <th class="py-2.5 px-2 text-center w-24 border-r border-slate-200">权重规则微调</th>
                    <th class="py-2.5 px-2 text-center w-24 border-r border-slate-200">全网一键重算</th>
                    <th class="py-2.5 px-2 text-center w-20 border-r border-slate-200">报表导出</th>
                    <th class="py-2.5 px-2 text-center w-24 border-r border-slate-200">下发运维工单</th>
                    <th class="py-2.5 px-2 text-center w-24 border-r border-slate-200">核验消警闭环</th>
                    <th class="py-2.5 px-2 text-center w-20">时序明细</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr
                    v-for="roleItem in roleList"
                    :key="roleItem.role"
                    :class="[
                      'hover:bg-slate-50/80 transition',
                      currentRole === roleItem.role ? 'bg-indigo-50/50' : ''
                    ]"
                  >
                    <td class="py-3 px-3 font-bold border-r border-slate-200">
                      <div class="flex items-center gap-1.5">
                        <span
                          v-if="currentRole === roleItem.role"
                          class="px-1 py-0.2 rounded bg-indigo-600 text-white text-[10px] font-normal"
                        >
                          当前
                        </span>
                        <span class="text-slate-800">{{ roleItem.roleName }}</span>
                      </div>
                    </td>

                    <td class="py-3 px-3 text-slate-600 text-[11px] border-r border-slate-200">
                      {{ roleItem.scopeDesc }}
                    </td>

                    <td class="py-3 px-2 text-center border-r border-slate-200">
                      <span v-if="roleItem.canViewProvinceSummary" class="text-emerald-600 font-bold">✓</span>
                      <span v-else class="text-slate-300">-</span>
                    </td>

                    <td class="py-3 px-2 text-center border-r border-slate-200">
                      <span v-if="roleItem.canModifyRuleWeights" class="text-emerald-600 font-bold">✓</span>
                      <span v-else class="text-rose-400 font-semibold text-[11px]">无权</span>
                    </td>

                    <td class="py-3 px-2 text-center border-r border-slate-200">
                      <span v-if="roleItem.canRecalculateAll" class="text-emerald-600 font-bold">✓</span>
                      <span v-else class="text-slate-300">-</span>
                    </td>

                    <td class="py-3 px-2 text-center border-r border-slate-200">
                      <span v-if="roleItem.canExportReports" class="text-emerald-600 font-bold">✓</span>
                      <span v-else class="text-slate-300">-</span>
                    </td>

                    <td class="py-3 px-2 text-center border-r border-slate-200">
                      <span v-if="roleItem.canDispatchWorkOrder" class="text-emerald-600 font-bold">✓</span>
                      <span v-else class="text-slate-300">-</span>
                    </td>

                    <td class="py-3 px-2 text-center border-r border-slate-200">
                      <span v-if="roleItem.canVerifyAndResolve" class="text-emerald-600 font-bold">✓</span>
                      <span v-else class="text-slate-300">-</span>
                    </td>

                    <td class="py-3 px-2 text-center">
                      <span v-if="roleItem.canViewRawTelemetry" class="text-emerald-600 font-bold">✓</span>
                      <span v-else class="text-slate-300">-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 模拟切换当前权限身份交互 -->
          <div class="p-3 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-between">
            <div class="text-xs text-slate-700 flex items-center gap-2">
              <span class="font-bold">体验当前登录身份模拟：</span>
              <div class="flex items-center gap-1.5">
                <button
                  type="button"
                  v-for="roleItem in roleList"
                  :key="roleItem.role"
                  @click="$emit('change-role', roleItem.role)"
                  :class="[
                    'px-2.5 py-1 rounded text-xs transition cursor-pointer font-medium',
                    currentRole === roleItem.role
                      ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                  ]"
                >
                  {{ roleItem.roleName.split(' ')[0] }}
                </button>
              </div>
            </div>

            <span class="text-[11px] text-slate-500">支持即时切换校验页面各按钮权限</span>
          </div>
        </div>
      </div>

      <!-- 模态框底栏操作 -->
      <div class="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
        <div class="text-xs text-slate-500">
          水资源计量健康管理评分规范 · 运行健康度(80分) + 检定(20分)
        </div>

        <button
          type="button"
          @click="handleClose"
          class="px-5 py-1.5 rounded-md text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer shadow-2xs"
        >
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { HealthUserRole } from '../../types';
import { defaultHealthScoringConfig, healthRolePermissions } from '../../data/mockMeterHealthData';

defineProps<{
  visible: boolean;
  currentRole: HealthUserRole;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'change-role', role: HealthUserRole): void;
}>();

const activeTab = ref<'rules' | 'weights' | 'permission'>('rules');

const roleList = computed(() => {
  return Object.values(healthRolePermissions);
});

function handleClose() {
  emit('close');
}
</script>
