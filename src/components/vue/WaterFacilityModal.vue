<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none overflow-y-auto"
    @click.self="handleClose"
  >
    <!-- Modal Card (与详情弹窗设计规范、尺寸层级及基本信息卡片网格布局 100% 保持一致) -->
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1140px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
    >
      <!-- 1. 浅色顶部标题栏 (Light Header)：浅灰蓝背景、精致微标与底边分割线，完全统一 -->
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
                {{ isEdit ? '编辑计量设施档案' : '新增计量设施档案' }}
              </h3>
              <span
                class="px-2 py-0.5 rounded text-[11px] font-medium border"
                :class="isEdit ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-blue-50 text-blue-600 border-blue-200'"
              >
                {{ isEdit ? '修改维护' : '初次建档' }}
              </span>
              <span v-if="formData.code" class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-200">
                {{ formData.code }}
              </span>
            </div>
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

      <!-- 2. 内容滚动区：与详情页基本信息卡片及 3 列布局完全一致 -->
      <div class="p-3.5 overflow-y-auto space-y-2.5 text-xs text-slate-800 custom-scrollbar flex-1 bg-[#f8fafc]/50">
        
        <!-- 卡片 1：计量设施基本参数及安装位置 (同详情页 Tab 1 第一张大卡片完全同构) -->
        <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">计量设施基本参数及安装位置</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[11px] text-slate-400">
                档案状态：
                <span class="text-emerald-600 font-medium">完善建档中</span>
              </span>
              <span v-if="formData.code" class="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 font-mono">
                器具编码: {{ formData.code }}
              </span>
            </div>
          </div>

          <!-- 3 列网格布局，与详情页完全一致 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-2 text-[12.5px]">
            
            <!-- 1. 行政区划 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">
                <span class="text-red-500 mr-0.5">*</span>行政区划
              </span>
              <CustomSelect
                v-model="formData.district"
                :options="[
                  { value: '城东区', label: '城东区' },
                  { value: '城中区', label: '城中区' },
                  { value: '城西区', label: '城西区' },
                  { value: '城北区', label: '城北区' },
                  { value: '湟中区', label: '湟中区' },
                  { value: '大通县', label: '大通县' },
                  { value: '湟源县', label: '湟源县' },
                ]"
                prefix="青海省 · 西宁市 · "
                :clearable="false"
                customClass="flex-1"
              />
            </div>

            <!-- 2. 取水权人 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">
                <span class="text-red-500 mr-0.5">*</span>取水权人
              </span>
              <input
                type="text"
                v-model="formData.waterOwner"
                placeholder="如：西宁市东川供水有限责任公司"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 3. 关联证照 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">
                <span class="text-red-500 mr-0.5">*</span>关联证照
              </span>
              <input
                type="text"
                v-model="formData.permitNumber"
                placeholder="如：取水（青宁）字[2026]第0021号"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 4. 计量设施(器具)编号 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">
                <span class="text-red-500 mr-0.5">*</span>计量设施编号
              </span>
              <input
                type="text"
                v-model="formData.code"
                placeholder="如：241017001536"
                class="flex-1 h-8 px-2.5 bg-[#f8fafc] border border-slate-200 rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 5. 计量设施名称 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">
                <span class="text-red-500 mr-0.5">*</span>计量设施名称
              </span>
              <input
                type="text"
                v-model="formData.name"
                placeholder="如：日村人畜饮水工程"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 6. 监测点编码 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">监测点编码</span>
              <input
                type="text"
                v-model="formData.monitorPointCode"
                placeholder="如：MP-6301-0082"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 7. 监测站名称 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">监测站名称</span>
              <input
                type="text"
                v-model="formData.stationName"
                placeholder="如：日村人畜饮水工程遥测监测站"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 8. 取水口 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">取水口</span>
              <input
                type="text"
                v-model="formData.waterIntake"
                placeholder="如：1号引水泵站进水口"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 9. 规格型号 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">规格型号</span>
              <input
                type="text"
                v-model="formData.specModel"
                placeholder="如：DN150-W4"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 10. 计量器具类型 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">计量器具类型</span>
              <CustomSelect
                v-model="formData.facilityType"
                :options="[
                  { value: '超声波流量计', label: '超声波流量计' },
                  { value: '电磁流量计', label: '电磁流量计' },
                  { value: '机械水表', label: '机械水表' },
                  { value: '雷达波流速仪', label: '雷达波流速仪' },
                  { value: '多普勒超声流量计', label: '多普勒超声流量计' },
                ]"
                :clearable="false"
                customClass="flex-1"
              />
            </div>

            <!-- 11. 计量方式 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">计量方式</span>
              <CustomSelect
                v-model="formData.meteringMethod"
                :options="[
                  { value: '管道计量', label: '管道计量' },
                  { value: '明渠计量', label: '明渠计量' },
                  { value: '槽堰计量', label: '槽堰计量' },
                  { value: '电磁流量计', label: '电磁流量计' },
                  { value: '超声波流量计', label: '超声波流量计' },
                  { value: '机械水表', label: '机械水表' },
                ]"
                :clearable="false"
                customClass="flex-1"
              />
            </div>

            <!-- 12. 管径大小 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">管径大小</span>
              <input
                type="text"
                v-model="formData.pipeDiameter"
                placeholder="如：DN150 (150mm)"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 13. 测量范围 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">测量范围</span>
              <input
                type="text"
                v-model="formData.measuringRange"
                placeholder="如：0.8 ~ 360 m³/h"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 14. 一次性计量纲 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">一次性计量纲</span>
              <CustomSelect
                v-model="formData.meteringDimension"
                :options="[
                  { value: 'm³ (立方米)', label: 'm³ (立方米)' },
                  { value: 'L (升)', label: 'L (升)' },
                  { value: '万m³ (万立方米)', label: '万m³ (万立方米)' },
                ]"
                :clearable="false"
                customClass="flex-1"
              />
            </div>

            <!-- 15. 水源类型 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">水源类型</span>
              <CustomSelect
                v-model="formData.waterSourceType"
                :options="[
                  { value: '地表水', label: '地表水' },
                  { value: '地下水', label: '地下水' },
                  { value: '水库水', label: '水库水' },
                  { value: '泉水', label: '泉水' },
                  { value: '自备井', label: '自备井' },
                ]"
                :clearable="false"
                customClass="flex-1"
              />
            </div>

            <!-- 16. 取水用途 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">取水用途</span>
              <CustomSelect
                v-model="formData.waterUsage"
                :options="[
                  { value: '生活饮用', label: '生活饮用' },
                  { value: '工业用水', label: '工业用水' },
                  { value: '农业灌溉', label: '农业灌溉' },
                  { value: '生态环境', label: '生态环境' },
                  { value: '特种行业', label: '特种行业' },
                ]"
                :clearable="false"
                customClass="flex-1"
              />
            </div>

            <!-- 17. 日最大取水量 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">日最大取水量</span>
              <input
                type="text"
                v-model="formData.maxDailyWater"
                placeholder="如：4,500 m³/d"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 18. 安装类型 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">安装类型</span>
              <CustomSelect
                v-model="formData.installType"
                :options="[
                  { value: '井下管道法兰连接', label: '井下管道法兰连接' },
                  { value: '地面管道法兰连接', label: '地面管道法兰连接' },
                  { value: '明渠水槽安装', label: '明渠水槽安装' },
                  { value: '泵房管道嵌入', label: '泵房管道嵌入' },
                ]"
                :clearable="false"
                customClass="flex-1"
              />
            </div>

            <!-- 19. 安装形式 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">安装形式</span>
              <CustomSelect
                v-model="formData.installForm"
                :options="[
                  { value: '水平安装', label: '水平安装' },
                  { value: '垂直安装', label: '垂直安装' },
                  { value: '倾斜安装', label: '倾斜安装' },
                ]"
                :clearable="false"
                customClass="flex-1"
              />
            </div>

            <!-- 20. 传输方式 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">传输方式</span>
              <CustomSelect
                v-model="formData.transmissionMethod"
                :options="[
                  { value: '在线', label: '在线 (无线4G)' },
                  { value: 'NB-IoT', label: '在线 (NB-IoT)' },
                  { value: '非在线', label: '非在线 (人工抄表)' },
                  { value: '无线4G', label: '无线4G直传' },
                ]"
                :clearable="false"
                customClass="flex-1"
              />
            </div>

            <!-- 21. 上报方式 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">上报方式</span>
              <CustomSelect
                v-model="formData.reportMethod"
                :options="[
                  { value: '在线', label: '在线' },
                  { value: '接口', label: '接口' },
                  { value: '非在线', label: '非在线' },
                ]"
                :clearable="false"
                customClass="flex-1"
              />
            </div>

            <!-- 22. 数据来源类型 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">数据来源类型</span>
              <CustomSelect
                v-model="formData.dataSourceType"
                :options="[
                  { value: '自建遥测物联直传', label: '自建遥测物联直传' },
                  { value: '监测数据自动汇聚', label: '监测数据自动汇聚' },
                  { value: '第三方平台共享', label: '第三方平台共享' },
                  { value: '人工抄表录入', label: '人工抄表录入' },
                ]"
                :clearable="false"
                customClass="flex-1"
              />
            </div>

            <!-- 23. 安装时间 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">安装时间</span>
              <input
                type="date"
                v-model="formData.installDate"
                class="flex-1 h-8 px-2 bg-white border border-[#dce6f5] rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 24. 经纬度 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">经纬度</span>
              <input
                type="text"
                v-model="formData.coordinates"
                placeholder="如：东经 101°48′22.4″, 北纬 36°38′15.1″"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 25. 安装具体位置 (占2~3列整行，与详情页完全一致) -->
            <div class="md:col-span-2 lg:col-span-3 flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">
                <span class="text-red-500 mr-0.5">*</span>安装位置
              </span>
              <input
                type="text"
                v-model="formData.address"
                placeholder="如：青海省西宁市东川工业园区开元路水表监测井（支持电子地图联动定位）"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>
          </div>
        </div>

        <!-- 卡片 2：管理及运维单位 (同详情页 Tab 1 第二张大卡片完全同构) -->
        <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">管理及运维单位</span>
            </div>
            <span class="text-[11px] text-slate-400 font-mono">
              中央资金年份：{{ formData.fundingYear || '2024' }} 年
            </span>
          </div>

          <!-- 3 列网格布局，与详情页完全一致 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-2 text-[12.5px]">
            <!-- 1. 管理单位 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">管理单位</span>
              <input
                type="text"
                v-model="formData.manageUnit"
                placeholder="如：西宁市水务局城东区水务所"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 2. 承建单位 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">承建单位</span>
              <input
                type="text"
                v-model="formData.builderUnit"
                placeholder="如：中水北方勘测设计水利水工工程局"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 3. 运维单位 (带设置单位按钮，联动选择) -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">
                <span class="text-red-500 mr-0.5">*</span>运维单位
              </span>
              <div class="flex-1 flex items-center gap-1.5">
                <input
                  type="text"
                  v-model="formData.maintainUnit"
                  placeholder="选择运维单位"
                  class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
                />
                <button
                  type="button"
                  @click="unitModalVisible = true"
                  class="h-8 px-2 bg-blue-50 hover:bg-blue-100 text-[#1677ff] rounded-md text-xs font-medium border border-blue-200 shrink-0 transition cursor-pointer flex items-center gap-1 active:scale-98"
                  title="点击打开运维单位与责任人选定弹窗"
                >
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                  </svg>
                  <span>设置单位</span>
                </button>
              </div>
            </div>

            <!-- 4. 运维截止日期 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">运维截止日期</span>
              <input
                type="date"
                v-model="formData.maintainExpiryDate"
                class="flex-1 h-8 px-2 bg-white border border-[#dce6f5] rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 5. 中央资金年份 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">中央资金年份</span>
              <input
                type="text"
                v-model="formData.fundingYear"
                placeholder="如：2024"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 6. 最新检定时间 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">最新检定时间</span>
              <input
                type="date"
                v-model="formData.lastCalibrationTime"
                class="flex-1 h-8 px-2 bg-white border border-[#dce6f5] rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 7. 下次检定日期 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">下次检定日期</span>
              <input
                type="date"
                v-model="formData.nextCalibrationDate"
                class="flex-1 h-8 px-2 bg-white border border-[#dce6f5] rounded-md text-slate-800 font-mono text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 8. 运维责任人 -->
            <div class="flex items-center">
              <span class="w-32 shrink-0 text-slate-500 font-normal">运维责任人</span>
              <input
                type="text"
                v-model="formData.maintainPerson"
                placeholder="如：丁曼容 (19729922849)"
                class="flex-1 h-8 px-2.5 bg-white border border-[#dce6f5] rounded-md text-slate-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>
          </div>
        </div>

        <!-- 卡片 3：佐证材料与凭证附件 -->
        <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">佐证材料与凭证附件</span>
            </div>
            <span class="text-[11px] text-slate-400">
              已上传 <span class="font-mono font-medium text-blue-600">{{ uploadedFiles.length }}</span> 份材料附件
            </span>
          </div>

          <div class="space-y-2.5">
            <!-- 上传按钮 & 格式说明 -->
            <div class="flex items-center gap-3">
              <label class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer shadow-2xs transition">
                <svg class="w-3.5 h-3.5 text-[#1677ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span>上传照片/附件</span>
                <input type="file" multiple class="hidden" @change="handleFileUpload" />
              </label>
              <span class="text-slate-400 text-xs">
                支持 JPG、PNG、PDF 格式，建议包含表盘特写及现场环境照片，单个文件不超过 10MB
              </span>
            </div>

            <!-- 已上传附件列表卡片 (与计量设施档案列表查看附件样式完全一致) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
              <div
                v-for="(file, fIdx) in uploadedFiles"
                :key="fIdx"
                class="flex items-center justify-between p-2 rounded-lg border border-[#c4d8ee] bg-[#f9fbfe] hover:bg-[#f0f5fd] transition gap-2"
              >
                <div class="flex items-center gap-2 min-w-0 flex-1">
                  <!-- 1. 图片图标 (蓝底相机) -->
                  <div
                    v-if="getFileType(file.name) === 'image'"
                    class="w-6 h-6 rounded bg-[#e6f1fc] text-[#1677ff] flex items-center justify-center shrink-0"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>

                  <!-- 2. Word 图标 (蓝紫色底 W) -->
                  <div
                    v-else-if="getFileType(file.name) === 'word'"
                    class="w-6 h-6 rounded bg-[#eef0fe] text-[#2f54eb] flex items-center justify-center shrink-0 font-bold text-[11px]"
                  >
                    W
                  </div>

                  <!-- 3. PDF 图标 (红底文档) -->
                  <div
                    v-else
                    class="w-6 h-6 rounded bg-[#feebee] text-[#f5222d] flex items-center justify-center shrink-0"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </div>

                  <!-- 文件名与大小 -->
                  <div class="truncate">
                    <span class="text-xs text-gray-800 truncate font-normal block" :title="file.name">
                      {{ file.name }}
                    </span>
                    <span class="text-[10px] text-gray-400 font-mono block">
                      {{ file.size }}
                    </span>
                  </div>
                </div>

                <!-- 动作图标 (眼睛预览 / 箭头下载 / 垃圾桶删除) -->
                <div class="flex items-center gap-1.5 shrink-0 text-gray-400">
                  <button
                    type="button"
                    @click.stop="previewFile(file)"
                    class="hover:text-[#1677ff] p-1 cursor-pointer rounded transition"
                    title="预览附件"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button
                    type="button"
                    @click.stop="downloadFile(file)"
                    class="hover:text-[#1677ff] p-1 cursor-pointer rounded transition"
                    title="下载附件"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                  <button
                    type="button"
                    @click.stop="removeFile(fIdx)"
                    class="hover:text-rose-500 p-1 cursor-pointer rounded transition"
                    title="删除附件"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 卡片 4：说明通知卡片 -->
        <div class="p-2.5 rounded-xl bg-[#f0f7ff] border border-[#bae0ff] text-xs space-y-1">
          <div class="flex items-center gap-1.5 text-[#1677ff] font-semibold">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>填报规范与说明</span>
          </div>
          <ol class="list-decimal list-inside text-slate-600 space-y-0.5 leading-relaxed pl-1 text-[11px]">
            <li>计量器具编号须与现场表盘铭牌实拍出厂编号严格一致，作为水资源监控接入唯一核验标识。</li>
            <li>佐证材料建议包含水表表盘读数特写、铭牌信息及现场工况照片，支持上传 JPG、PNG、PDF 格式。</li>
            <li>档案提交后将即时流转至西宁市水利水务监管部门审核，核验通过后正式录入全市水资源台账。</li>
          </ol>
        </div>

      </div>

      <!-- 3. 浅色底部操作栏 (Light Footer)：提示说明与操作按钮，样式与详情弹窗完全一致 -->
      <div class="px-5 py-2.5 bg-[#f8fafc] border-t border-slate-200/80 flex items-center justify-between shrink-0">
        <div class="text-xs text-slate-500 flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#1677ff]"></span>
          <span>提示：标注 <span class="text-red-500 font-medium">*</span> 为必填项，提交申报后将自动同步至西宁市水资源监管台账。</span>
        </div>
        <div class="flex items-center gap-2.5">
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-1.5 rounded-md text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-800 transition cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            @click="handleSubmit"
            class="px-4 py-1.5 rounded-md text-xs font-medium text-white bg-[#1677ff] hover:bg-blue-600 transition shadow-xs cursor-pointer flex items-center gap-1.5 active:scale-98"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>{{ isEdit ? '保存档案修改' : '确认提交申报' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 凭证材料放大预览子弹窗 (同详情弹窗一致的精美弹窗) -->
    <div
      v-if="previewVisible"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4"
      @click.self="previewVisible = false"
    >
      <div class="bg-white rounded-xl shadow-2xl max-w-xl w-full p-5 space-y-3 animate-in fade-in zoom-in-95">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
          <div class="font-bold text-sm text-slate-800">附件预览 - {{ previewFileName }}</div>
          <button type="button" @click="previewVisible = false" class="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer">
            ✕
          </button>
        </div>
        <div v-if="getFileType(previewFileName) === 'image'" class="rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center min-h-[260px] p-2">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
            :alt="previewFileName"
            class="max-h-[360px] w-auto object-contain rounded"
            referrerpolicy="no-referrer"
          />
        </div>
        <div v-else class="p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600 space-y-2">
          <div class="flex items-center gap-2 font-medium text-gray-900 border-b pb-2">
            <svg class="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span>{{ previewFileName }}</span>
          </div>
          <p>核验规程：JJG 162-2019 《冷水水表检定规程》、SL 426-2008 《水资源监控设备技术条件》</p>
          <p>检验结论：合格，符合取水计量国家一级标准与省水资源综合监控接入技术规范。</p>
          <div class="pt-2 text-right text-gray-400 font-mono">西宁市水资源监管核验中心（电子回执）</div>
        </div>
        <div class="flex items-center justify-between pt-1">
          <div class="text-xs text-slate-400 font-mono">
            青海省西宁市城东区水资源监控现场核验实拍
          </div>
          <button
            type="button"
            @click="previewVisible = false"
            class="px-4 py-1.5 bg-[#1677ff] text-white rounded text-xs hover:bg-blue-600 transition cursor-pointer"
          >
            关闭预览
          </button>
        </div>
      </div>
    </div>

    <!-- 设置单位与人员统一弹窗 -->
    <UnitSelectModal
      v-model:visible="unitModalVisible"
      :initial-unit="formData.maintainUnit"
      :initial-person="formData.maintainPerson"
      @confirm="handleUnitConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { WaterFacility } from '../../types';
import UnitSelectModal from './UnitSelectModal.vue';
import CustomSelect from './CustomSelect.vue';

const props = defineProps<{
  visible: boolean;
  facility: WaterFacility | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'save', data: Partial<WaterFacility>): void;
}>();

const isEdit = computed(() => !!props.facility);

const uploadedFiles = ref([
  { name: '现场水表表盘读数特写实拍.jpg', size: '1.8 MB' },
  { name: '出厂铭牌与检定证书扫描件.pdf', size: '2.4 MB' }
]);

const previewVisible = ref(false);
const previewFileName = ref('');

// 运维单位弹窗状态
const unitModalVisible = ref(false);

const getInitialFormData = (): Partial<WaterFacility> => ({
  name: '',
  code: '',
  district: '城东区',
  waterOwner: '',
  permitNumber: '',
  monitorPointCode: 'MP-6301-0082',
  stationName: '日村人畜饮水工程遥测监测站',
  waterIntake: '1号引水泵站进水口',
  specModel: 'DN150-W4',
  facilityType: '超声波流量计',
  meteringMethod: '管道计量',
  pipeDiameter: 'DN150 (150mm)',
  measuringRange: '0.8 ~ 360 m³/h',
  meteringDimension: 'm³ (立方米)',
  waterSourceType: '地表水',
  waterUsage: '工业用水',
  maxDailyWater: '4,500 m³/d',
  installType: '井下管道法兰连接',
  installForm: '水平安装',
  transmissionMethod: '在线',
  reportMethod: '在线',
  dataSourceType: '自建遥测物联直传',
  installDate: '2024-09-15',
  coordinates: '东经 101°48′22.4″, 北纬 36°38′15.1″',
  address: '',
  manageUnit: '西宁市水务局城东区水务所',
  builderUnit: '中水北方勘测设计水利水工工程局',
  maintainUnit: '贵州智水运维保障有限公司',
  maintainPerson: '丁曼容 (19729922849)',
  maintainExpiryDate: '2027-12-31',
  fundingYear: '2024',
  lastCalibrationTime: '2025-05-18',
  nextCalibrationDate: '2027-05-17',
  status: '正常',
  isArchived: true,
});

const formData = ref<Partial<WaterFacility>>(getInitialFormData());

const handleUnitConfirm = (data: { unitName: string; personName: string; phone: string; displayString: string }) => {
  formData.value.maintainUnit = data.unitName;
  formData.value.maintainPerson = `${data.personName} (${data.phone})`;
};

watch(
  () => props.facility,
  (newVal) => {
    if (newVal) {
      formData.value = {
        ...getInitialFormData(),
        ...newVal,
        maintainUnit: newVal.maintainUnit || '贵州智水运维保障有限公司',
        maintainPerson: newVal.maintainPerson || '丁曼容 (19729922849)',
      };
      uploadedFiles.value = [
        { name: `${newVal.name}_现场安装实拍.jpg`, size: '2.1 MB' },
        { name: `${newVal.code}_出厂检定校准证书.pdf`, size: '3.4 MB' },
      ];
    } else {
      formData.value = getInitialFormData();
      uploadedFiles.value = [
        { name: '现场水表表盘读数特写实拍.jpg', size: '1.8 MB' },
        { name: '出厂铭牌与检定证书扫描件.pdf', size: '2.4 MB' }
      ];
    }
  },
  { immediate: true }
);

const getFileType = (fileName: string) => {
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.webp')) return 'image';
  if (lower.endsWith('.doc') || lower.endsWith('.docx')) return 'word';
  return 'pdf';
};

const downloadFile = (file: { name: string }) => {
  MessagePlugin.success(`已开始下载材料附件：${file.name}`);
};

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      uploadedFiles.value.push({
        name: file.name,
        size: `${sizeMB} MB`,
      });
    }
    MessagePlugin.success(`成功添加 ${target.files.length} 个附件材料`);
    target.value = '';
  }
};

const removeFile = (index: number) => {
  const file = uploadedFiles.value[index];
  uploadedFiles.value.splice(index, 1);
  MessagePlugin.info(`已移除附件：${file.name}`);
};

const previewFile = (file: { name: string; size: string }) => {
  previewFileName.value = file.name;
  previewVisible.value = true;
};

const handleClose = () => {
  emit('update:visible', false);
};

const handleSubmit = () => {
  if (!formData.value.name?.trim()) {
    MessagePlugin.warning('请输入计量设施全称');
    return;
  }
  if (!formData.value.code?.trim()) {
    MessagePlugin.warning('请输入计量器具编号');
    return;
  }
  if (!formData.value.waterOwner?.trim()) {
    MessagePlugin.warning('请输入取水权人');
    return;
  }
  if (!formData.value.permitNumber?.trim()) {
    MessagePlugin.warning('请输入关联取水许可证编号');
    return;
  }

  emit('save', {
    ...formData.value,
    isArchived: true,
  });
  emit('update:visible', false);
  MessagePlugin.success(isEdit.value ? '计量设施档案已更新' : '新增计量设施档案申报成功');
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
}
</style>
