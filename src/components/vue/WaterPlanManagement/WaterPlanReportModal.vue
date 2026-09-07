<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none"
    @click.self="handleClose"
  >
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1080px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
    >
      <!-- 1. 顶部浅色标题栏 (与全系统新增/编辑/详情统一) -->
      <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">
              {{ isEdit ? '修改计划用水申报' : '新增计划用水申报填报' }}
            </h3>
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

      <!-- 2. 内容滚动区：严格三列栅格表单与详情页结构完全统一 -->
      <div class="p-3.5 overflow-y-auto space-y-2.5 text-xs text-slate-800 custom-scrollbar flex-1 bg-[#f8fafc]/40">
        
        <!-- 卡片 1: 申报主体基本信息 (3-column grid) -->
        <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">申报单位及取水基本信息</span>
            </div>
            <span class="text-slate-400 text-[11px]"><span class="text-rose-500 font-bold">*</span> 为必填项</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-2">
            <!-- 用水单位全称 -->
            <div class="space-y-1">
              <label class="font-medium text-slate-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 用水单位名称
              </label>
              <input
                type="text"
                v-model="form.unitName"
                placeholder="请输入企业或单位全称"
                class="w-full h-8 px-2.5 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 统一社会信用代码 -->
            <div class="space-y-1">
              <label class="font-medium text-slate-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 统一社会信用代码
              </label>
              <input
                type="text"
                v-model="form.creditCode"
                placeholder="18位统一社会信用代码"
                class="w-full h-8 px-2.5 bg-white border border-slate-300 rounded font-mono text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 所属行政区划 -->
            <div class="space-y-1">
              <label class="font-medium text-slate-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 所属县(区)
              </label>
              <CustomSelect
                v-model="form.district"
                :options="[
                  { value: '大通县', label: '大通回族土族自治县' },
                  { value: '城东区', label: '城东区' },
                  { value: '城中区', label: '城中区' },
                  { value: '城西区', label: '城西区' },
                  { value: '城北区', label: '城北区' },
                  { value: '湟中区', label: '湟中区' },
                  { value: '湟源县', label: '湟源县' },
                ]"
                placeholder="请选择行政区县"
                customClass="w-full"
              />
            </div>

            <!-- 行业类型 -->
            <div class="space-y-1">
              <label class="font-medium text-slate-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 行业类型
              </label>
              <CustomSelect
                v-model="form.industryType"
                :options="[
                  { value: '4.有色', label: '4.有色金属冶炼及压延' },
                  { value: '工业', label: '制造业/常规工业' },
                  { value: '电力', label: '电力热力生产和供应' },
                  { value: '建筑业', label: '建筑与市政工程' },
                  { value: '农业', label: '现代高原生态农业' },
                  { value: '服务业', label: '综合商业服务业' },
                  { value: '交通', label: '交通仓储物流' },
                ]"
                placeholder="请选择行业类型"
                customClass="w-full"
              />
            </div>

            <!-- 取水类型 (橙色强调) -->
            <div class="space-y-1">
              <label class="font-medium text-amber-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 取水类型
              </label>
              <CustomSelect
                v-model="form.waterIntakeType"
                :options="[
                  { value: '水资源配置类', label: '水资源配置类' },
                  { value: '河道内生产类', label: '河道内生产类' },
                  { value: '基础设施或公用事业类', label: '基础设施或公用事业类' },
                  { value: '自备水源类', label: '自备水源类' },
                ]"
                placeholder="请选择取水类型"
                customClass="w-full"
              />
            </div>

            <!-- 直管类型 (橙色强调) -->
            <div class="space-y-1">
              <label class="font-medium text-amber-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 直管类型
              </label>
              <CustomSelect
                v-model="form.directManageType"
                :options="[
                  { value: '流域管理机构', label: '流域管理机构' },
                  { value: '省级', label: '省级直接监管' },
                  { value: '市级', label: '市级主管审批' },
                  { value: '县级', label: '县级主管审批' },
                ]"
                placeholder="请选择直管类型"
                customClass="w-full"
              />
            </div>

            <!-- 是否自备水源取水 -->
            <div class="space-y-1">
              <label class="font-medium text-slate-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 自备水源取水
              </label>
              <CustomSelect
                v-model="form.isSelfWaterSource"
                :options="[
                  { value: '是', label: '是 (含自备井/深水井取水)' },
                  { value: '否', label: '否' },
                ]"
                placeholder="请选择"
                customClass="w-full"
              />
            </div>

            <!-- 是否公共管网取水 -->
            <div class="space-y-1">
              <label class="font-medium text-slate-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 是否公共管网取水
              </label>
              <CustomSelect
                v-model="form.isPublicPipeNetwork"
                :options="[
                  { value: '是', label: '是' },
                  { value: '否', label: '否' },
                ]"
                placeholder="请选择"
                customClass="w-full"
              />
            </div>

            <!-- 是否规上企业 (橙色强调) -->
            <div class="space-y-1">
              <label class="font-medium text-amber-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 是否规上
              </label>
              <CustomSelect
                v-model="form.isAboveDesignatedSize"
                :options="[
                  { value: '是', label: '是 (规上重点工业)' },
                  { value: '否', label: '否' },
                ]"
                placeholder="请选择"
                customClass="w-full"
              />
            </div>

            <!-- 重点类型 (橙色强调) -->
            <div class="space-y-1">
              <label class="font-medium text-amber-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 重点监督单位
              </label>
              <CustomSelect
                v-model="form.keyType"
                :options="[
                  { value: '重点', label: '重点监督单位' },
                  { value: '非重点', label: '非重点单位' },
                ]"
                placeholder="请选择"
                customClass="w-full"
              />
            </div>

            <!-- 取水许可证编号 -->
            <div class="space-y-1">
              <label class="font-medium text-slate-700">取水许可证编号</label>
              <input
                type="text"
                v-model="form.permitNumber"
                placeholder="例: 取水（青宁大）字[2025]第0001号"
                class="w-full h-8 px-2.5 bg-white border border-slate-300 rounded font-mono text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            <!-- 上级主管部门 -->
            <div class="space-y-1">
              <label class="font-medium text-slate-700">上级主管部门</label>
              <input
                type="text"
                v-model="form.supervisorUnit"
                placeholder="例: 大通回族土族自治县水务局"
                class="w-full h-8 px-2.5 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>
          </div>
        </div>

        <!-- 卡片 2: 填报事项与申报年份 -->
        <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-purple-500 rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">申报事项类别与申请年度</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="space-y-1">
              <label class="font-medium text-slate-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 计划用水户类型
              </label>
              <CustomSelect
                v-model="form.userType"
                :options="[
                  { value: 'permit', label: '取水许可的计划用水单位' },
                  { value: 'public_supply', label: '公共供水的计划用水单位' },
                ]"
                placeholder="请选择"
                customClass="w-full"
              />
            </div>

            <div class="space-y-1">
              <label class="font-medium text-slate-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 事项类型
              </label>
              <CustomSelect
                v-model="form.itemType"
                :options="[
                  { value: '首次填报', label: '首次填报' },
                  { value: '年计划调整', label: '年计划调整' },
                  { value: '月计划调整', label: '月计划调整' },
                ]"
                placeholder="请选择"
                customClass="w-full"
              />
            </div>

            <div class="space-y-1">
              <label class="font-medium text-slate-700 flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 申报年度
              </label>
              <CustomSelect
                v-model="form.year"
                :options="[
                  { value: '2026', label: '2026年度' },
                  { value: '2025', label: '2025年度' },
                  { value: '2024', label: '2024年度' },
                ]"
                placeholder="请选择"
                customClass="w-full"
              />
            </div>
          </div>
        </div>

        <!-- 卡片 3: 水量指标申报明细 (单位: 万m³) -->
        <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1 h-3.5 bg-emerald-500 rounded-full"></span>
              <span class="text-[14px] font-bold text-slate-800">水量指标填报 (单位: 万m³)</span>
            </div>
            <span class="text-[#1677ff] font-bold text-xs">水量单位: 万m³</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- 许可水量上限 -->
            <div class="space-y-1 p-3 bg-[#f8fafc] rounded-md border border-slate-200">
              <label class="font-medium text-slate-700">取水许可证许可水量 (万m³)</label>
              <input
                type="number"
                step="0.01"
                v-model.number="form.permitVolume"
                placeholder="0.00"
                class="w-full h-8 px-2.5 bg-white border border-slate-300 rounded font-mono text-xs text-slate-800 focus:outline-none focus:border-[#1677ff]"
              />
            </div>

            <!-- 申报计划总量 -->
            <div class="space-y-1 p-3 bg-blue-50/30 rounded-md border border-blue-200">
              <label class="font-medium text-[#1677ff] flex items-center gap-0.5">
                <span class="text-rose-500">*</span> 申报计划总水量 (万m³)
              </label>
              <input
                type="number"
                step="0.01"
                v-model.number="form.planVolume"
                placeholder="0.00"
                class="w-full h-8 px-2.5 bg-white border border-blue-300 rounded font-mono font-bold text-blue-700 text-xs focus:outline-none focus:border-[#1677ff]"
              />
            </div>

            <!-- 常规地表水 -->
            <div class="space-y-1 p-3 bg-white rounded-md border border-slate-200">
              <label class="font-medium text-slate-700">常规地表水量 (万m³)</label>
              <input
                type="number"
                step="0.01"
                v-model.number="form.surfaceWater"
                placeholder="0.00"
                class="w-full h-8 px-2.5 bg-white border border-slate-300 rounded font-mono text-xs text-slate-800 focus:outline-none focus:border-[#1677ff]"
              />
            </div>

            <!-- 承压地下水 -->
            <div class="space-y-1 p-3 bg-white rounded-md border border-slate-200">
              <label class="font-medium text-slate-700">承压地下水量 (万m³)</label>
              <input
                type="number"
                step="0.01"
                v-model.number="form.groundwater"
                placeholder="0.00"
                class="w-full h-8 px-2.5 bg-white border border-slate-300 rounded font-mono text-xs text-slate-800 focus:outline-none focus:border-[#1677ff]"
              />
            </div>
          </div>

          <!-- 非常规水细分填报 -->
          <div class="bg-emerald-50/25 p-3.5 rounded-lg border border-emerald-200/80 space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-semibold text-emerald-800 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                非常规水源综合利用分解填报 (单位: 万m³)
              </span>
              <span class="text-emerald-700 font-mono text-xs">
                非常规水总计: <strong>{{ computedUnconventionalTotal.toFixed(2) }}</strong> 万m³
              </span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div class="space-y-1">
                <label class="text-slate-600">再生水利用量</label>
                <input
                  type="number"
                  step="0.01"
                  v-model.number="form.recycledWater"
                  placeholder="0.00"
                  class="w-full h-8 px-2 bg-white border border-slate-200 rounded font-mono text-xs text-slate-800"
                />
              </div>

              <div class="space-y-1">
                <label class="text-slate-600">矿坑(井)水回用量</label>
                <input
                  type="number"
                  step="0.01"
                  v-model.number="form.mineWater"
                  placeholder="0.00"
                  class="w-full h-8 px-2 bg-white border border-slate-200 rounded font-mono text-xs text-slate-800"
                />
              </div>

              <div class="space-y-1">
                <label class="text-slate-600">集蓄雨水量</label>
                <input
                  type="number"
                  step="0.01"
                  v-model.number="form.rainWater"
                  placeholder="0.00"
                  class="w-full h-8 px-2 bg-white border border-slate-200 rounded font-mono text-xs text-slate-800"
                />
              </div>

              <div class="space-y-1">
                <label class="text-slate-600">微咸水淡化量</label>
                <input
                  type="number"
                  step="0.01"
                  v-model.number="form.brackishWater"
                  placeholder="0.00"
                  class="w-full h-8 px-2 bg-white border border-slate-200 rounded font-mono text-xs text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 卡片 4: 填报依据与补充说明 -->
        <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-1.5">
          <label class="font-medium text-slate-700">计划指标编制依据与工艺说明</label>
          <textarea
            v-model="form.remark"
            rows="2"
            placeholder="请简要阐明本年度排产负荷、工艺节水技改、水平衡测试或非常规水配置情况..."
            class="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-blue-100 transition resize-none leading-relaxed"
          ></textarea>
        </div>

      </div>

      <!-- 3. 底部操作按钮栏 -->
      <div class="px-5 py-2 bg-white border-t border-slate-200/90 flex items-center justify-between shrink-0">
        <span class="text-slate-400 text-xs">
          点击【提交申报】后将流转至 {{ form.district }} 水务局初审
        </span>

        <div class="flex items-center gap-2.5">
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer text-xs font-medium"
          >
            取消
          </button>

          <button
            type="button"
            @click="handleSubmit"
            class="px-5 py-1.5 rounded-lg bg-[#1677ff] hover:bg-blue-600 text-white font-medium transition cursor-pointer shadow-2xs text-xs flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>提交申报</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { WaterPlanRecord, WaterPlanUserType, WaterPlanItemType } from '../../../types';
import CustomSelect from '../CustomSelect.vue';

const props = defineProps<{
  visible: boolean;
  initialData?: WaterPlanRecord | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'submit-report', record: WaterPlanRecord): void;
}>();

const isEdit = computed(() => !!props.initialData);

const form = ref({
  unitName: '',
  creditCode: '',
  city: '西宁市',
  district: '大通县',
  industryType: '4.有色',
  waterIntakeType: '水资源配置类',
  directManageType: '流域管理机构',
  isSelfWaterSource: '是' as '是' | '否',
  isPublicPipeNetwork: '否' as '是' | '否',
  isAboveDesignatedSize: '是' as '是' | '否',
  keyType: '重点' as '重点' | '非重点',
  userType: 'permit' as WaterPlanUserType,
  itemType: '首次填报' as WaterPlanItemType,
  year: '2025',
  permitNumber: '',
  supervisorUnit: '',
  permitVolume: 123.45,
  planVolume: 123.45,
  surfaceWater: 12.34,
  groundwater: 23.45,
  recycledWater: 24.50,
  mineWater: 5.06,
  rainWater: 5.00,
  brackishWater: 0.00,
  remark: ''
});

const computedUnconventionalTotal = computed(() => {
  return Number(
    (
      (form.value.recycledWater || 0) +
      (form.value.mineWater || 0) +
      (form.value.rainWater || 0) +
      (form.value.brackishWater || 0)
    ).toFixed(2)
  );
});

watch(
  () => props.initialData,
  (rec) => {
    if (rec) {
      form.value = {
        unitName: rec.unitName,
        creditCode: rec.creditCode,
        city: rec.city,
        district: rec.district,
        industryType: rec.industryType,
        waterIntakeType: rec.waterIntakeType,
        directManageType: rec.directManageType as any,
        isSelfWaterSource: rec.isSelfWaterSource,
        isPublicPipeNetwork: rec.isPublicPipeNetwork,
        isAboveDesignatedSize: rec.isAboveDesignatedSize,
        keyType: rec.keyType,
        userType: rec.userType,
        itemType: rec.itemType,
        year: rec.year,
        permitNumber: rec.permitNumber || '',
        supervisorUnit: rec.supervisorUnit || '',
        permitVolume: rec.permitVolume,
        planVolume: rec.planVolume,
        surfaceWater: rec.surfaceWater,
        groundwater: rec.groundwater,
        recycledWater: rec.recycledWater || 0,
        mineWater: rec.mineWater || 0,
        rainWater: rec.rainWater || 0,
        brackishWater: rec.brackishWater || 0,
        remark: ''
      };
    } else {
      // Default reset
      form.value.unitName = '';
      form.value.creditCode = '';
      form.value.permitNumber = '';
      form.value.supervisorUnit = '';
      form.value.remark = '';
    }
  },
  { immediate: true }
);

const handleClose = () => {
  emit('update:visible', false);
};

const handleSubmit = () => {
  if (!form.value.unitName.trim()) {
    alert('请输入用水单位名称');
    return;
  }
  if (!form.value.creditCode.trim()) {
    alert('请输入统一社会信用代码');
    return;
  }

  const record: WaterPlanRecord = {
    id: props.initialData?.id || `WP-${form.value.year}-${Date.now().toString().slice(-4)}`,
    city: form.value.city,
    district: form.value.district,
    unitName: form.value.unitName,
    creditCode: form.value.creditCode,
    industryType: form.value.industryType,
    isPublicPipeNetwork: form.value.isPublicPipeNetwork,
    isSelfWaterSource: form.value.isSelfWaterSource,
    isAboveDesignatedSize: form.value.isAboveDesignatedSize,
    keyType: form.value.keyType,
    directManageType: form.value.directManageType as any,
    waterIntakeType: form.value.waterIntakeType as any,
    itemType: form.value.itemType,
    status: '县级待审核',
    permitVolume: form.value.permitVolume,
    planVolume: form.value.planVolume,
    surfaceWater: form.value.surfaceWater,
    groundwater: form.value.groundwater,
    unconventionalTotal: computedUnconventionalTotal.value,
    recycledWater: form.value.recycledWater,
    mineWater: form.value.mineWater,
    rainWater: form.value.rainWater,
    brackishWater: form.value.brackishWater,
    year: form.value.year,
    userType: form.value.userType,
    permitNumber: form.value.permitNumber || `取水（青宁）字[${form.value.year}]第${Math.floor(1000 + Math.random() * 9000)}号`,
    supervisorUnit: form.value.supervisorUnit || `${form.value.district}水务局`,
    applyDate: new Date().toISOString().slice(0, 10),
    auditHistory: [
      {
        stepName: '企业年度申报',
        operator: '申报填报员',
        department: form.value.unitName,
        action: '提交申报',
        time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        opinion: form.value.remark || '依据2025年度计划用水管控指标与定额规范提交申报。',
        status: 'passed'
      },
      {
        stepName: '县级水行政主管初审',
        operator: '待指派审查专员',
        department: `${form.value.district}水务局水资源管理科`,
        action: '待初审',
        time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        opinion: '已进入初审流程，待水资源管理科进行刚性约束指标比对与定额审核。',
        status: 'pending'
      }
    ]
  };

  emit('submit-report', record);
  emit('update:visible', false);
};
</script>
