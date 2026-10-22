<template>
  <t-dialog
    :visible="visible"
    :header="isEdit ? '编辑证照按月水量填报单' : '新增证照按月水量填报单（县级填报端）'"
    width="760px"
    :footer="null"
    @update:visible="$emit('update:visible', $event)"
  >
    <form @submit.prevent="handleSubmit('pending_city')" class="space-y-4 text-xs text-slate-700 py-1">
      <!-- 1. License Selection and Basic Info -->
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
        <div class="flex items-center justify-between border-b border-slate-200/70 pb-2">
          <span class="font-semibold text-slate-800 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>取水许可证照基本信息（填报维度）</span>
          </span>
          <span class="text-[11px] text-blue-600 font-medium">以证照为核心载体逐月归集</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- Select License -->
          <div>
            <label class="block text-slate-600 font-medium mb-1">
              选择取水许可证照 <span class="text-red-500">*</span>
            </label>
            <select
              v-model="formData.licenseId"
              @change="handleLicenseChange"
              :disabled="isEdit"
              class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 disabled:bg-slate-100"
              required
            >
              <option value="" disabled>-- 请选择纳入管理的取水许可证 --</option>
              <option
                v-for="lic in licenses"
                :key="lic.id"
                :value="lic.id"
              >
                [{{ lic.district }}] {{ lic.permitNumber }} - {{ lic.waterOwner }}
              </option>
            </select>
          </div>

          <!-- Selected License Quick Info -->
          <div class="grid grid-cols-2 gap-2 text-[11px] bg-white p-2 rounded-lg border border-slate-200/80">
            <div>
              <span class="text-slate-400 block">所属区县</span>
              <span class="font-semibold text-slate-800">{{ currentLicense?.district || '--' }}</span>
            </div>
            <div>
              <span class="text-slate-400 block">水源类型</span>
              <span class="font-semibold text-slate-800">{{ currentLicense?.waterSourceType || '--' }}</span>
            </div>
            <div>
              <span class="text-slate-400 block">年许可水量</span>
              <span class="font-bold font-mono text-blue-700">{{ currentLicense?.annualQuota ? currentLicense.annualQuota + ' 万m³' : '--' }}</span>
            </div>
            <div>
              <span class="text-slate-400 block">月度参考限额</span>
              <span class="font-bold font-mono text-emerald-700">{{ currentLicense?.monthlyRefQuota ? currentLicense.monthlyRefQuota + ' 万m³' : '--' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Reporting Period -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-slate-600 font-medium mb-1">
            填报核算年度 <span class="text-red-500">*</span>
          </label>
          <select
            v-model.number="formData.year"
            class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            required
          >
            <option :value="2026">2026年度（当前执行年）</option>
            <option :value="2025">2025年度（历史补报/追溯）</option>
          </select>
        </div>

        <div>
          <label class="block text-slate-600 font-medium mb-1">
            填报核算月份 <span class="text-red-500">*</span>
          </label>
          <select
            v-model.number="formData.month"
            class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            required
          >
            <option v-for="m in 12" :key="m" :value="m">{{ m }}月份 ({{ formData.year }}年{{ m < 10 ? '0' + m : m }}月)</option>
          </select>
        </div>
      </div>

      <!-- 3. Water Amount Breakdown -->
      <div class="p-3 rounded-xl bg-blue-50/40 border border-blue-200/80 space-y-3">
        <div class="flex items-center justify-between">
          <span class="font-semibold text-slate-800 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>当月取用水量分类填报 (单位：万m³)</span>
          </span>
          <span class="text-[11px] text-blue-700 font-mono">
            合计：<strong class="text-sm font-bold">{{ calculatedTotal.toFixed(2) }}</strong> 万m³
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-slate-600 mb-1">
              地表水取用水量 (万m³) <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="formData.surfaceWater"
              type="number"
              step="0.01"
              min="0"
              class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-blue-500"
              required
            />
            <span class="text-[10px] text-slate-400 mt-0.5 block">河道引水、水库提水等</span>
          </div>

          <div>
            <label class="block text-slate-600 mb-1">
              地下水取用水量 (万m³) <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="formData.groundwater"
              type="number"
              step="0.01"
              min="0"
              class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-blue-500"
              required
            />
            <span class="text-[10px] text-slate-400 mt-0.5 block">深浅层自备机电井取水</span>
          </div>

          <div>
            <label class="block text-slate-600 mb-1">
              非常规水 / 再生水 (万m³)
            </label>
            <input
              v-model.number="formData.unconventionalWater"
              type="number"
              step="0.01"
              min="0"
              class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-blue-500"
            />
            <span class="text-[10px] text-slate-400 mt-0.5 block">雨水集蓄、中水回用等</span>
          </div>
        </div>

        <!-- Quota warning check banner -->
        <div
          v-if="calculatedTotal > monthlyQuotaLimit"
          class="p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-1.5"
        >
          <div class="flex items-center gap-1.5 font-bold">
            <svg class="w-4 h-4 text-amber-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>月度配额超限预警提示：</span>
            <span>
              填报水量 ({{ calculatedTotal.toFixed(2) }}万m³) 超出月度参考限额 ({{ monthlyQuotaLimit.toFixed(2) }}万m³)
            </span>
          </div>
          <div>
            <label class="block text-[11px] text-amber-800 font-medium mb-1">
              请填写月度超额/水量大幅波动原因说明 <span class="text-red-500">*</span>：
            </label>
            <input
              v-model="formData.warningReason"
              type="text"
              placeholder="例如：因春灌抢墒灌溉需水量集中；或工业冷却循环系统集中换水..."
              class="w-full bg-white border border-amber-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-amber-600"
              required
            />
          </div>
        </div>
      </div>

      <!-- 4. Meter readings and calculation -->
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2.5">
        <div class="flex items-center justify-between">
          <span class="font-semibold text-slate-800 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>计量设施现场抄表校核（防虚报/比对支撑）</span>
          </span>
          <span class="text-[11px] text-slate-500">表计核算量：{{ calculatedMeterWater.toFixed(2) }} 万m³</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div>
            <label class="block text-slate-600 text-[11px] mb-1">上期水表底数 (m³)</label>
            <input
              v-model.number="formData.prevMeterReading"
              type="number"
              min="0"
              class="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-mono text-slate-800"
            />
          </div>
          <div>
            <label class="block text-slate-600 text-[11px] mb-1">本期水表底数 (m³)</label>
            <input
              v-model.number="formData.currentMeterReading"
              type="number"
              min="0"
              class="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-mono text-slate-800"
            />
          </div>
          <div>
            <label class="block text-slate-600 text-[11px] mb-1">互感/计量倍率</label>
            <input
              v-model.number="formData.meterMultiplier"
              type="number"
              min="1"
              class="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-mono text-slate-800"
            />
          </div>
          <div>
            <label class="block text-slate-600 text-[11px] mb-1">主要计量方式</label>
            <input
              v-model="formData.meteringMethod"
              type="text"
              class="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
            />
          </div>
        </div>
      </div>

      <!-- 5. Vouchers and Attachments -->
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-semibold text-slate-800 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-purple-600"></span>
            <span>佐证凭证文件 ({{ uploadedFiles.length }}份)</span>
          </span>
          <button
            type="button"
            @click="addSimulatedVoucher"
            class="text-[11px] text-blue-600 hover:text-blue-800 font-medium cursor-pointer flex items-center gap-1"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>添加现场抄表/电费折水凭证</span>
          </button>
        </div>

        <div v-if="uploadedFiles.length > 0" class="flex flex-wrap gap-2">
          <div
            v-for="(f, i) in uploadedFiles"
            :key="i"
            class="px-2.5 py-1 rounded bg-white border border-slate-200 text-[11px] flex items-center gap-2 shadow-2xs"
          >
            <svg class="w-3.5 h-3.5 text-blue-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span class="max-w-[200px] truncate text-slate-800">{{ f.name }}</span>
            <button
              type="button"
              @click="removeFile(i)"
              class="text-red-500 hover:text-red-700 cursor-pointer font-bold ml-1"
              title="移除"
            >
              ×
            </button>
          </div>
        </div>
        <div v-else class="text-[11px] text-slate-400 py-1">
          建议上传水表抄表相片、用电量结算清单或水利工程量水台账，作为市级审核和年度数据支撑的核心依据。
        </div>
      </div>

      <!-- 6. Reporter info & remarks -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div>
          <label class="block text-slate-600 mb-1">县级填报人姓名 <span class="text-red-500">*</span></label>
          <input
            v-model="formData.reporterName"
            type="text"
            class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            required
          />
        </div>
        <div>
          <label class="block text-slate-600 mb-1">联系电话 <span class="text-red-500">*</span></label>
          <input
            v-model="formData.reporterPhone"
            type="text"
            class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            required
          />
        </div>
        <div>
          <label class="block text-slate-600 mb-1">填报主管单位</label>
          <input
            v-model="formData.reporterUnit"
            type="text"
            class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
          />
        </div>
      </div>

      <div>
        <label class="block text-slate-600 mb-1">补充说明与填报备注</label>
        <textarea
          v-model="formData.remarks"
          rows="2"
          placeholder="可在此填写现场运行工况、水源切换或计量器具检定情况..."
          class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>

      <!-- Footer action buttons -->
      <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
        <button
          type="button"
          @click="$emit('update:visible', false)"
          class="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium transition cursor-pointer"
        >
          取消
        </button>

        <button
          type="button"
          @click="handleSubmit('draft')"
          class="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition cursor-pointer"
        >
          暂存为草稿
        </button>

        <button
          type="submit"
          class="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition cursor-pointer shadow-2xs flex items-center gap-1.5"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>立即提交市级审核</span>
        </button>
      </div>
    </form>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type {
  WaterPermitLicenseDimension,
  LicenseMonthlyWaterReport,
  LicenseVoucherFile,
} from '../../../../types';

const props = defineProps<{
  visible: boolean;
  licenses: WaterPermitLicenseDimension[];
  editRecord?: LicenseMonthlyWaterReport | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'submit', data: Partial<LicenseMonthlyWaterReport>, action: 'draft' | 'pending_city'): void;
}>();

const isEdit = computed(() => !!props.editRecord);

const formData = reactive({
  licenseId: '',
  year: 2026,
  month: 3,
  surfaceWater: 0,
  groundwater: 0,
  unconventionalWater: 0,
  meteringMethod: '表计计量',
  prevMeterReading: 0,
  currentMeterReading: 0,
  meterMultiplier: 1,
  warningReason: '',
  reporterName: '何晓峰',
  reporterPhone: '13897109823',
  reporterUnit: '湟中区水务局农水水资源股',
  remarks: '',
});

const uploadedFiles = ref<LicenseVoucherFile[]>([]);

const currentLicense = computed(() => {
  return props.licenses.find((l) => l.id === formData.licenseId);
});

const calculatedTotal = computed(() => {
  return +(Number(formData.surfaceWater || 0) + Number(formData.groundwater || 0) + Number(formData.unconventionalWater || 0)).toFixed(2);
});

const monthlyQuotaLimit = computed(() => {
  return currentLicense.value?.monthlyRefQuota || 15.0;
});

const calculatedMeterWater = computed(() => {
  const diff = Number(formData.currentMeterReading || 0) - Number(formData.prevMeterReading || 0);
  if (diff <= 0) return 0;
  return +((diff * Number(formData.meterMultiplier || 1)) / 10000).toFixed(2);
});

watch(
  () => props.visible,
  (val) => {
    if (val) {
      if (props.editRecord) {
        formData.licenseId = props.editRecord.licenseId;
        formData.year = props.editRecord.year;
        formData.month = props.editRecord.month;
        formData.surfaceWater = props.editRecord.surfaceWater;
        formData.groundwater = props.editRecord.groundwater;
        formData.unconventionalWater = props.editRecord.unconventionalWater || 0;
        formData.meteringMethod = props.editRecord.meteringMethod || '表计计量';
        formData.prevMeterReading = props.editRecord.prevMeterReading || 0;
        formData.currentMeterReading = props.editRecord.currentMeterReading || 0;
        formData.meterMultiplier = props.editRecord.meterMultiplier || 1;
        formData.warningReason = props.editRecord.warningReason || '';
        formData.reporterName = props.editRecord.reporter?.name || '何晓峰';
        formData.reporterPhone = props.editRecord.reporter?.phone || '13897109823';
        formData.reporterUnit = props.editRecord.reporter?.unit || '湟中区水务局';
        formData.remarks = props.editRecord.remarks || '';
        uploadedFiles.value = props.editRecord.voucherFiles ? [...props.editRecord.voucherFiles] : [];
      } else {
        // Reset defaults
        if (props.licenses.length > 0 && !formData.licenseId) {
          formData.licenseId = props.licenses[0].id;
          handleLicenseChange();
        }
        formData.year = 2026;
        formData.month = 3;
        formData.surfaceWater = 12.5;
        formData.groundwater = 2.0;
        formData.unconventionalWater = 0.0;
        formData.warningReason = '';
        formData.remarks = '';
        uploadedFiles.value = [
          { name: '现场抄表记录相片.jpg', size: '1.8 MB', type: 'image', uploadTime: '刚刚' },
          { name: '电网用电量折算核定单.pdf', size: '2.1 MB', type: 'pdf', uploadTime: '刚刚' }
        ];
      }
    }
  }
);

function handleLicenseChange() {
  if (currentLicense.value) {
    formData.meteringMethod = currentLicense.value.meteringMethod || '智能流量计';
    formData.reporterUnit = `${currentLicense.value.district}水务局水资源科`;
  }
}

function addSimulatedVoucher() {
  const options = [
    { name: `灌区${formData.month}月现场超声波流量计数据清单.pdf`, size: '2.3 MB', type: 'pdf' },
    { name: `抽水泵站电费发票及电折水单.jpg`, size: '1.9 MB', type: 'image' },
    { name: `取水口水位量水堰视频抓拍记录.jpg`, size: '2.5 MB', type: 'image' }
  ];
  const item = options[uploadedFiles.value.length % options.length];
  uploadedFiles.value.push({
    ...item,
    uploadTime: '刚刚'
  });
  MessagePlugin.success(`已添加佐证凭证：${item.name}`);
}

function removeFile(index: number) {
  uploadedFiles.value.splice(index, 1);
}

function handleSubmit(action: 'draft' | 'pending_city') {
  if (!formData.licenseId) {
    MessagePlugin.warning('请选择取水许可证照');
    return;
  }
  if (calculatedTotal.value <= 0) {
    MessagePlugin.warning('本月取用水量总计不能为0');
    return;
  }
  if (calculatedTotal.value > monthlyQuotaLimit.value && !formData.warningReason) {
    MessagePlugin.warning('当月水量超出月度参考限额，请务必填写超额原因说明');
    return;
  }

  const lic = currentLicense.value;
  const periodLabel = `${formData.year}年${formData.month < 10 ? '0' + formData.month : formData.month}月`;
  const periodKey = `${formData.year}-${formData.month < 10 ? '0' + formData.month : formData.month}`;

  let quotaWarning: 'normal' | 'near_limit' | 'exceeded' = 'normal';
  if (calculatedTotal.value > monthlyQuotaLimit.value) {
    quotaWarning = 'exceeded';
  } else if (calculatedTotal.value >= monthlyQuotaLimit.value * 0.9) {
    quotaWarning = 'near_limit';
  }

  const payload: Partial<LicenseMonthlyWaterReport> = {
    licenseId: formData.licenseId,
    permitNumber: lic?.permitNumber || '',
    licenseName: lic?.licenseName || '',
    waterOwner: lic?.waterOwner || '',
    district: lic?.district || '',
    waterSourceType: lic?.waterSourceType || '',
    industryType: lic?.industryType || '',
    annualQuota: lic?.annualQuota || 100,
    year: formData.year,
    month: formData.month,
    periodKey,
    periodLabel,
    surfaceWater: formData.surfaceWater,
    groundwater: formData.groundwater,
    unconventionalWater: formData.unconventionalWater,
    totalWater: calculatedTotal.value,
    meteringMethod: formData.meteringMethod,
    prevMeterReading: formData.prevMeterReading,
    currentMeterReading: formData.currentMeterReading,
    meterMultiplier: formData.meterMultiplier,
    meterComputedWater: calculatedMeterWater.value,
    meterDeviation: 0.0,
    monthlyQuota: monthlyQuotaLimit.value,
    quotaWarning,
    warningReason: formData.warningReason,
    voucherFiles: [...uploadedFiles.value],
    status: action,
    reporter: {
      name: formData.reporterName,
      phone: formData.reporterPhone,
      unit: formData.reporterUnit,
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
    },
    remarks: formData.remarks,
    isUsedForAnnualSummary: false,
  };

  emit('submit', payload, action);
  emit('update:visible', false);
}
</script>
