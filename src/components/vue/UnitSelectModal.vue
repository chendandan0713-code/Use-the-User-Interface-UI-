<template>
  <!-- 外层遮罩层 -->
  <div
    v-if="visible"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4 backdrop-blur-2xs select-none"
    @click.self="handleClose"
  >
    <!-- 主弹窗卡片 (尺寸优化为 940px，左右两栏规整对称) -->
    <div
      class="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-[940px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col h-[650px] max-h-[92vh]"
    >
      <!-- 弹窗 Header -->
      <div class="px-5 py-3 flex items-center justify-between border-b border-slate-100 bg-[#f8fafc] shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff]">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-[15px] font-bold text-slate-800 tracking-tight">
              设置运维单位与人员
            </h3>
          </div>
        </div>

        <button
          type="button"
          @click="handleClose"
          class="text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 p-1.5 rounded-lg transition cursor-pointer"
          title="关闭"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Main Body: 左右双分栏容器 (左边运维单位，右边运维人员，布局统一) -->
      <div class="p-3.5 grid grid-cols-1 md:grid-cols-12 gap-3 flex-1 overflow-hidden bg-slate-50/50">
        
        <!-- 左侧面板：设置运维单位 (占 5 列) -->
        <div class="md:col-span-5 rounded-xl border border-slate-200 bg-white p-3 flex flex-col shadow-2xs overflow-hidden">
          <!-- 1. 顶部标题栏 + 创建单位按钮 (与右侧创建人员完全对称) -->
          <div class="flex items-center justify-between mb-3 shrink-0 pb-2.5 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-xs font-bold text-slate-800">设置运维单位</span>
            </div>
            <!-- 创建单位按钮 -->
            <button
              type="button"
              @click="openCreateUnitModal"
              class="h-7 px-2.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1 shadow-2xs shrink-0 active:scale-98"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>创建单位</span>
            </button>
          </div>

          <!-- 2. 搜索框 (与右侧人员搜索框统一高度、边框、图标) -->
          <div class="relative mb-3 shrink-0">
            <input
              type="text"
              v-model="searchUnitKeyword"
              placeholder="搜索单位名称..."
              class="w-full h-8 px-3 pl-8 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 transition"
            />
            <svg
              class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <button
              v-if="searchUnitKeyword"
              @click="searchUnitKeyword = ''"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- 3. 单位树形列表 -->
          <div class="flex-1 overflow-y-auto space-y-1.5 text-xs text-slate-700 custom-scrollbar pr-1">
            <div
              v-for="item in filteredUnitTree"
              :key="item.id"
              class="select-none"
            >
              <!-- 一级父分类节点 (如：贵州省水利厅 / 第三方单位) -->
              <div
                @click="toggleNode(item)"
                class="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-slate-100/80 cursor-pointer transition border border-transparent"
                :class="selectedUnitId === item.id ? 'bg-blue-50/70 border-blue-200 text-[#1677ff] font-semibold' : 'text-slate-700'"
              >
                <div class="flex items-center gap-1.5 truncate">
                  <svg
                    class="w-3.5 h-3.5 text-slate-400 transition-transform shrink-0"
                    :class="item.expanded ? 'rotate-90 text-blue-600' : ''"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="6 4 18 12 6 20 6 4"></polygon>
                  </svg>
                  <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span class="truncate font-medium">{{ item.name }}</span>
                </div>
                <span class="text-[10px] text-slate-400 shrink-0 font-mono">
                  {{ item.children ? item.children.length : 0 }}
                </span>
              </div>

              <!-- 二级子单位列表 -->
              <div
                v-if="item.expanded && item.children && item.children.length > 0"
                class="pl-4 space-y-1 mt-1 border-l-2 border-slate-100 ml-3.5 py-0.5"
              >
                <div
                  v-for="child in item.children"
                  :key="child.id"
                  @click.stop="selectUnit(child)"
                  class="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-slate-50 cursor-pointer transition border"
                  :class="selectedUnitId === child.id 
                    ? 'bg-[#e6f1fc] text-[#1677ff] font-semibold border-blue-200 shadow-2xs' 
                    : 'text-slate-600 border-transparent hover:border-slate-200/50'"
                >
                  <div class="flex items-center gap-2 truncate">
                    <span 
                      class="w-1.5 h-1.5 rounded-full shrink-0"
                      :class="selectedUnitId === child.id ? 'bg-[#1677ff]' : 'bg-slate-300'"
                    ></span>
                    <span class="truncate">{{ child.name }}</span>
                  </div>

                  <span
                    v-if="selectedUnitId === child.id"
                    class="text-[10px] bg-blue-100 text-[#1677ff] px-1.5 py-0.2 rounded font-normal shrink-0"
                  >
                    当前选中
                  </span>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-if="filteredUnitTree.length === 0" class="py-8 text-center text-slate-400">
              <p class="text-xs">未搜索到匹配的运维单位</p>
              <button
                type="button"
                @click="openCreateUnitModal"
                class="text-xs text-[#1677ff] hover:underline mt-1.5 inline-block cursor-pointer"
              >
                立即创建该单位
              </button>
            </div>
          </div>
        </div>

        <!-- 右侧面板：设置运维人员 (占 7 列) -->
        <div class="md:col-span-7 rounded-xl border border-slate-200 bg-white p-3 flex flex-col shadow-2xs overflow-hidden">
          <!-- 1. 顶部标题栏 + 创建人员按钮 (与左侧创建单位完全对称) -->
          <div class="flex items-center justify-between mb-3 shrink-0 pb-2.5 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-xs font-bold text-slate-800">设置运维人员</span>
            </div>
            <!-- 创建人员按钮 -->
            <button
              type="button"
              @click="openCreatePersonModal"
              class="h-7 px-2.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1 shadow-2xs shrink-0 active:scale-98"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>创建人员</span>
            </button>
          </div>

          <!-- 2. 搜索框 (与左侧单位搜索框统一高度、边框、图标) -->
          <div class="relative mb-3 shrink-0">
            <input
              type="text"
              v-model="searchPersonKeyword"
              placeholder="搜索人员姓名、电话或角色..."
              class="w-full h-8 px-3 pl-8 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 transition"
            />
            <svg
              class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <button
              v-if="searchPersonKeyword"
              @click="searchPersonKeyword = ''"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- 3. 人员数据表格 -->
          <div class="flex-1 overflow-y-auto border border-slate-200 rounded-lg custom-scrollbar">
            <table class="w-full text-xs text-left border-collapse">
              <thead class="bg-[#f1f5f9] text-slate-700 font-medium sticky top-0 z-10">
                <tr>
                  <th class="w-12 py-2 px-3 text-center">选择</th>
                  <th class="py-2 px-3 font-semibold text-slate-700">姓名</th>
                  <th class="py-2 px-3 font-semibold text-slate-700">联系电话</th>
                  <th class="py-2 px-3 font-semibold text-slate-700">角色职责</th>
                  <th class="py-2 px-3 font-semibold text-slate-700">状态</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr
                  v-for="person in filteredPersonnelList"
                  :key="person.id"
                  @click="selectedPersonId = person.id"
                  class="hover:bg-blue-50/50 cursor-pointer transition select-none"
                  :class="selectedPersonId === person.id ? 'bg-[#f0f7ff]' : ''"
                >
                  <!-- 单选圆圈 (Radio) -->
                  <td class="py-2 px-3 text-center">
                    <div class="flex items-center justify-center">
                      <div
                        class="w-4 h-4 rounded-full border flex items-center justify-center transition"
                        :class="selectedPersonId === person.id ? 'border-[#1677ff] bg-white' : 'border-slate-300 bg-white'"
                      >
                        <div
                          v-if="selectedPersonId === person.id"
                          class="w-2 h-2 rounded-full bg-[#1677ff]"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <!-- 姓名与头像字标 -->
                  <td class="py-2 px-3 text-slate-900 font-medium whitespace-nowrap">
                    <div class="flex items-center gap-1.5">
                      <span class="w-5 h-5 rounded-full bg-blue-100 text-[#1677ff] text-[10px] font-bold flex items-center justify-center shrink-0">
                        {{ person.name.slice(0, 1) }}
                      </span>
                      <span>{{ person.name }}</span>
                    </div>
                  </td>
                  <!-- 电话 -->
                  <td class="py-2 px-3 text-slate-600 font-mono whitespace-nowrap">
                    {{ person.phone }}
                  </td>
                  <!-- 角色职责 -->
                  <td class="py-2 px-3 text-slate-600 whitespace-nowrap">
                    <span
                      class="px-2 py-0.5 rounded text-[11px] font-normal"
                      :class="person.role === '管理员' || person.role === '项目负责人'
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-slate-100 text-slate-600 border border-slate-200/60'"
                    >
                      {{ person.role || '运维工程师' }}
                    </span>
                  </td>
                  <!-- 状态 -->
                  <td class="py-2 px-3 whitespace-nowrap">
                    <span class="inline-flex items-center gap-1 text-[11px] text-emerald-600">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      在岗
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- 无人员空状态 -->
            <div v-if="filteredPersonnelList.length === 0" class="py-12 text-center text-slate-400">
              <svg class="w-8 h-8 mx-auto mb-2 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <p class="text-xs">该单位下暂无匹配的运维人员</p>
              <button
                type="button"
                @click="openCreatePersonModal"
                class="text-xs text-[#1677ff] hover:underline mt-1.5 inline-block cursor-pointer"
              >
                立即为该单位添加人员
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer: 右侧确认与取消按钮 -->
      <div class="px-5 py-2.5 bg-white border-t border-slate-200/80 flex items-center justify-end gap-3 shrink-0">
        <button
          type="button"
          @click="handleClose"
          class="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition cursor-pointer"
        >
          取消
        </button>
        <button
          type="button"
          @click="handleConfirm"
          class="px-5 py-2 rounded-lg bg-[#1677ff] hover:bg-blue-600 text-white text-xs font-medium shadow-sm transition cursor-pointer flex items-center gap-1.5 active:scale-98"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>确定应用</span>
        </button>
      </div>
    </div>

    <!-- ==================== 子弹窗 1：创建运维单位 (与创建人员统一对称规范) ==================== -->
    <div
      v-if="createUnitModalVisible"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/40 p-4 select-none animate-in fade-in duration-100"
      @click.self="createUnitModalVisible = false"
    >
      <div class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-[460px] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        <!-- 统一标题 -->
        <div class="px-5 py-3.5 border-b border-slate-100 bg-[#f8fafc] flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
            <h4 class="text-sm font-bold text-slate-800">创建运维单位</h4>
          </div>
          <button
            type="button"
            @click="createUnitModalVisible = false"
            class="text-slate-400 hover:text-slate-600 p-1 rounded-md transition cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 统一表单区域 -->
        <div class="p-3.5 space-y-2.5 text-xs">
          <!-- 上级类别 -->
          <div>
            <label class="block text-slate-700 font-medium mb-1">
              <span class="text-red-500 mr-1">*</span>上级归属分类
            </label>
            <CustomSelect
              v-model="newUnitForm.category"
              :options="[
                { value: 'u-3', label: '第三方单位 (社会化运维服务机构)' },
                { value: 'u-1', label: '水务直属处室与水利工程局' },
                { value: 'u-2', label: '水文水资源局及监测网络中心' },
              ]"
              :clearable="false"
              placeholder="请选择上级归属分类"
            />
          </div>

          <!-- 单位名称 -->
          <div>
            <label class="block text-slate-700 font-medium mb-1">
              <span class="text-red-500 mr-1">*</span>单位全称
            </label>
            <input
              type="text"
              v-model="newUnitForm.name"
              placeholder="如：西宁中水智能测控工程有限公司"
              class="w-full h-8 px-3 bg-white border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
            />
          </div>

          <!-- 统一社会信用代码 -->
          <div>
            <label class="block text-slate-600 mb-1">统一社会信用代码 / 组织代码 (选填)</label>
            <input
              type="text"
              v-model="newUnitForm.code"
              placeholder="91630100MA7XXXXX88"
              class="w-full h-8 px-3 bg-white border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition font-mono"
            />
          </div>

          <!-- 资质等级 -->
          <div>
            <label class="block text-slate-600 mb-1">运维服务资质 / 业务等级</label>
            <CustomSelect
              v-model="newUnitForm.level"
              :options="[
                { value: '甲级水资源监测与工控运维', label: '甲级水资源监测与工控运维' },
                { value: '乙级水利信息化运行维护', label: '乙级水利信息化运行维护' },
                { value: '通用仪器仪表技术服务商', label: '通用仪器仪表技术服务商' },
              ]"
              :clearable="false"
              placeholder="请选择资质等级"
            />
          </div>
        </div>

        <!-- 统一 Footer -->
        <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            @click="createUnitModalVisible = false"
            class="px-3.5 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs transition cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            @click="submitCreateUnit"
            class="px-4 py-1.5 rounded-md bg-[#1677ff] hover:bg-blue-600 text-white text-xs font-medium transition cursor-pointer"
          >
            保存并添加
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== 子弹窗 2：创建运维人员 (与创建单位统一对称规范) ==================== -->
    <div
      v-if="createPersonModalVisible"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/40 p-4 select-none animate-in fade-in duration-100"
      @click.self="createPersonModalVisible = false"
    >
      <div class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-[460px] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        <!-- 统一标题 -->
        <div class="px-5 py-3.5 border-b border-slate-100 bg-[#f8fafc] flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
            <h4 class="text-sm font-bold text-slate-800">创建运维人员</h4>
          </div>
          <button
            type="button"
            @click="createPersonModalVisible = false"
            class="text-slate-400 hover:text-slate-600 p-1 rounded-md transition cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 统一表单区域 -->
        <div class="p-3.5 space-y-2.5 text-xs">
          <!-- 所属单位 (自动绑定并可确认) -->
          <div>
            <label class="block text-slate-700 font-medium mb-1">
              所属运维单位
            </label>
            <div class="w-full h-8 px-3 bg-slate-100 border border-slate-200 rounded-md text-slate-700 flex items-center font-medium truncate">
              {{ currentUnitName }}
            </div>
          </div>

          <!-- 人员姓名 -->
          <div>
            <label class="block text-slate-700 font-medium mb-1">
              <span class="text-red-500 mr-1">*</span>人员姓名
            </label>
            <input
              type="text"
              v-model="newPersonForm.name"
              placeholder="如：张工、李明"
              class="w-full h-8 px-3 bg-white border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
            />
          </div>

          <!-- 联系电话 -->
          <div>
            <label class="block text-slate-700 font-medium mb-1">
              <span class="text-red-500 mr-1">*</span>联系电话
            </label>
            <input
              type="tel"
              v-model="newPersonForm.phone"
              placeholder="如：13897128841"
              class="w-full h-8 px-3 bg-white border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition font-mono"
            />
          </div>

          <!-- 角色职责 -->
          <div>
            <label class="block text-slate-600 mb-1">岗位与角色职责</label>
            <CustomSelect
              v-model="newPersonForm.role"
              :options="[
                { value: '项目负责人', label: '项目负责人 / 第一联系人' },
                { value: '主责工程师', label: '主责工程师' },
                { value: '现场运维员', label: '现场运维员' },
                { value: '管理员', label: '系统管理员' },
              ]"
              :clearable="false"
              placeholder="请选择岗位职责"
            />
          </div>
        </div>

        <!-- 统一 Footer -->
        <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            @click="createPersonModalVisible = false"
            class="px-3.5 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs transition cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            @click="submitCreatePerson"
            class="px-4 py-1.5 rounded-md bg-[#1677ff] hover:bg-blue-600 text-white text-xs font-medium transition cursor-pointer"
          >
            保存并添加
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import CustomSelect from './CustomSelect.vue';

interface UnitNode {
  id: string;
  name: string;
  expanded?: boolean;
  children?: UnitNode[];
}

interface Personnel {
  id: string;
  name: string;
  phone: string;
  role?: string;
  unitId: string;
}

const props = defineProps<{
  visible: boolean;
  initialUnit?: string;
  initialPerson?: string;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'confirm', data: { unitName: string; personName: string; phone: string; displayString: string }): void;
}>();

// 搜索关键词
const searchUnitKeyword = ref('');
const searchPersonKeyword = ref('');

// 单位树数据 (标准水务运维机构分类树)
const unitTree = ref<UnitNode[]>([
  {
    id: 'u-3',
    name: '第三方运维单位',
    expanded: true,
    children: [
      { id: 'u-3-1', name: '贵州智水运维保障有限公司' },
      { id: 'u-3-2', name: '中水北方工程技术服务部' },
      { id: 'u-3-3', name: '天禹水电测控运维中心' },
      { id: 'u-3-4', name: '西宁市东川水务技术有限公司' },
      { id: 'u-3-5', name: '青海华远自动化水表保障中心' },
    ],
  },
  {
    id: 'u-1',
    name: '水利水务管理处室',
    expanded: false,
    children: [
      { id: 'u-1-1', name: '西宁市水务局水资源管理处' },
      { id: 'u-1-2', name: '水利工程建设与运维处' },
      { id: 'u-1-3', name: '城东区水务局水政监察大队' },
    ],
  },
  {
    id: 'u-2',
    name: '水文水资源监测局',
    expanded: false,
    children: [
      { id: 'u-2-1', name: '青海省水文水资源监测中心' },
      { id: 'u-2-2', name: '水文自动化信息网络中心' },
    ],
  },
]);

// 当前选中的单位 ID，默认选中第三方单位
const selectedUnitId = ref('u-3-1');

// 人员列表数据
const personnelList = ref<Personnel[]>([
  { id: 'p-1', name: '丁曼容', phone: '19729922849', role: '项目负责人', unitId: 'u-3-1' },
  { id: 'p-2', name: '王笑天', phone: '19533319000', role: '主责工程师', unitId: 'u-3-1' },
  { id: 'p-3', name: '潘夏彤', phone: '19333312231', role: '现场运维员', unitId: 'u-3-1' },
  { id: 'p-4', name: '段问薇', phone: '19113212388', role: '现场运维员', unitId: 'u-3-2' },
  { id: 'p-5', name: '王五', phone: '19434129071', role: '管理员', unitId: 'u-3-2' },
  { id: 'p-6', name: '李运维', phone: '13897128841', role: '主责工程师', unitId: 'u-3-3' },
  { id: 'p-7', name: '马建国', phone: '13997015523', role: '现场运维员', unitId: 'u-3-4' },
  { id: 'p-8', name: '赵宏博', phone: '13709786612', role: '管理员', unitId: 'u-1-1' },
]);

// 当前选中的人员 ID
const selectedPersonId = ref('p-1');

// 统计总单位数量
const totalUnitsCount = computed(() => {
  let count = 0;
  for (const group of unitTree.value) {
    if (group.children) {
      count += group.children.length;
    } else {
      count += 1;
    }
  }
  return count;
});

// 计算当前选中的单位名称
const currentUnitName = computed(() => {
  const findName = (nodes: UnitNode[]): string => {
    for (const node of nodes) {
      if (node.id === selectedUnitId.value) return node.name;
      if (node.children) {
        const found = findName(node.children);
        if (found) return found;
      }
    }
    return '';
  };
  const name = findName(unitTree.value);
  return name || '贵州智水运维保障有限公司';
});

// 过滤单位列表
const filteredUnitTree = computed(() => {
  if (!searchUnitKeyword.value.trim()) return unitTree.value;
  const kw = searchUnitKeyword.value.trim().toLowerCase();
  return unitTree.value
    .map((group) => {
      const matchedChildren = group.children?.filter((c) => c.name.toLowerCase().includes(kw));
      if (group.name.toLowerCase().includes(kw)) {
        return { ...group, expanded: true };
      }
      if (matchedChildren && matchedChildren.length > 0) {
        return { ...group, expanded: true, children: matchedChildren };
      }
      return null;
    })
    .filter(Boolean) as UnitNode[];
});

// 过滤人员列表 (优先显示当前选中单位的人员，如果没有则展示全部或提示添加)
const filteredPersonnelList = computed(() => {
  // 基础过滤：匹配当前选中单位或无专属单位
  let list = personnelList.value.filter((p) => p.unitId === selectedUnitId.value);
  
  // 如果当前二级单位暂无人员，为了方便用户快速选用或指派，可退回展示同系统或全部人员
  if (list.length === 0) {
    list = personnelList.value;
  }

  // 搜索关键字过滤
  if (searchPersonKeyword.value.trim()) {
    const kw = searchPersonKeyword.value.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(kw) ||
        p.phone.includes(kw) ||
        (p.role && p.role.toLowerCase().includes(kw))
    );
  }
  return list;
});

// 当前选中人员显示文案
const currentSelectedPersonDisplay = computed(() => {
  const person = personnelList.value.find((p) => p.id === selectedPersonId.value);
  if (!person) return '未指定人员';
  return `${person.name} (${person.phone})`;
});

// 切换单位展开/收起
const toggleNode = (node: UnitNode) => {
  node.expanded = !node.expanded;
  if (node.children && node.children.length > 0) {
    selectedUnitId.value = node.children[0].id;
  } else {
    selectedUnitId.value = node.id;
  }
  syncFirstPerson();
};

// 选中某个具体单位
const selectUnit = (node: UnitNode) => {
  selectedUnitId.value = node.id;
  syncFirstPerson();
};

// 切换单位时，若当前单位有人，自动将单选框对齐到该单位第一个人员
const syncFirstPerson = () => {
  const matched = personnelList.value.filter((p) => p.unitId === selectedUnitId.value);
  if (matched.length > 0) {
    selectedPersonId.value = matched[0].id;
  }
};

// ==================== 创建运维单位 ====================
const createUnitModalVisible = ref(false);
const newUnitForm = reactive({
  category: 'u-3',
  name: '',
  code: '',
  level: '甲级水资源监测与工控运维',
});

const openCreateUnitModal = () => {
  newUnitForm.name = '';
  newUnitForm.code = '';
  createUnitModalVisible.value = true;
};

const submitCreateUnit = () => {
  if (!newUnitForm.name.trim()) {
    MessagePlugin.warning('请输入运维单位名称');
    return;
  }
  const parent = unitTree.value.find((g) => g.id === newUnitForm.category);
  const newId = `u-custom-${Date.now()}`;
  const newUnit: UnitNode = {
    id: newId,
    name: newUnitForm.name.trim(),
  };

  if (parent) {
    if (!parent.children) parent.children = [];
    parent.children.unshift(newUnit);
    parent.expanded = true;
  } else {
    unitTree.value[0].children?.unshift(newUnit);
  }

  selectedUnitId.value = newId;
  createUnitModalVisible.value = false;
  MessagePlugin.success(`已成功创建运维单位【${newUnit.name}】并已选中`);
};

// ==================== 创建运维人员 ====================
const createPersonModalVisible = ref(false);
const newPersonForm = reactive({
  name: '',
  phone: '',
  role: '项目负责人',
});

const openCreatePersonModal = () => {
  newPersonForm.name = '';
  newPersonForm.phone = '';
  createPersonModalVisible.value = true;
};

const submitCreatePerson = () => {
  if (!newPersonForm.name.trim()) {
    MessagePlugin.warning('请输入运维人员姓名');
    return;
  }
  if (!newPersonForm.phone.trim()) {
    MessagePlugin.warning('请输入联系电话');
    return;
  }

  const newId = `p-custom-${Date.now()}`;
  const person: Personnel = {
    id: newId,
    name: newPersonForm.name.trim(),
    phone: newPersonForm.phone.trim(),
    role: newPersonForm.role,
    unitId: selectedUnitId.value,
  };

  personnelList.value.unshift(person);
  selectedPersonId.value = newId;
  createPersonModalVisible.value = false;
  MessagePlugin.success(`已成功创建人员【${person.name}】并已自动关联到【${currentUnitName.value}】`);
};

// 关闭与确定
const handleClose = () => {
  emit('update:visible', false);
};

const handleConfirm = () => {
  const person = personnelList.value.find((p) => p.id === selectedPersonId.value);
  const pName = person ? person.name : '丁曼容';
  const phone = person ? person.phone : '19729922849';
  const unit = currentUnitName.value;
  const display = `${unit} - ${pName} (${phone})`;

  emit('confirm', {
    unitName: unit,
    personName: pName,
    phone: phone,
    displayString: display,
  });
  emit('update:visible', false);
  MessagePlugin.success(`已选定运维单位：${unit}，负责人：${pName}`);
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
}
</style>
