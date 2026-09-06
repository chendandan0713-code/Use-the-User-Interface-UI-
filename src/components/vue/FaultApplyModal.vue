<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none overflow-y-auto"
    @click.self="handleClose"
  >
    <!-- Modal Card (完全 1:1 像素级复刻截图: 发起故障申报) -->
    <div
      class="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-[760px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
    >
      <!-- Header: 发起故障申报 标题与 X 关闭按钮 -->
      <div class="px-6 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
        <h3 class="text-[17px] font-bold text-gray-900 tracking-tight">
          发起故障申报
        </h3>
        <button
          type="button"
          @click="handleClose"
          class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition cursor-pointer"
          title="关闭"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Body: 表单内容 -->
      <div class="p-6 overflow-y-auto space-y-4 text-xs flex-1 custom-scrollbar">
        <!-- 1. 计量设施 (全宽行，下拉带清空与箭头) -->
        <div class="flex items-center gap-3">
          <label class="w-[96px] text-right font-normal text-gray-700 shrink-0">
            <span class="text-red-500 mr-1">*</span>计量设施
          </label>
          <div class="flex-1 relative">
            <input
              type="text"
              v-model="facilityDisplayText"
              placeholder="请选择或输入计量设施"
              class="w-full h-9 px-3 pr-16 bg-white border border-[#dce6f5] rounded-lg text-gray-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 transition"
            />
            <div class="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-gray-400">
              <button
                v-if="facilityDisplayText"
                type="button"
                @click="facilityDisplayText = ''"
                class="hover:text-gray-600 cursor-pointer p-0.5"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <svg class="w-4 h-4 text-gray-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <!-- 2. 双列：器具编号 & 取水权人 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- 器具编号 (只读深色灰底) -->
          <div class="flex items-center gap-3">
            <label class="w-[96px] text-right font-normal text-gray-700 shrink-0">
              器具编号
            </label>
            <input
              type="text"
              v-model="formData.facilityCode"
              readonly
              class="flex-1 h-9 px-3 bg-[#f0f3f8] border border-[#e2e8f0] rounded-lg text-gray-800 font-mono text-xs focus:outline-none cursor-default"
            />
          </div>

          <!-- 取水权人 (只读深色灰底) -->
          <div class="flex items-center gap-3">
            <label class="w-[84px] text-right font-normal text-gray-700 shrink-0">
              取水权人
            </label>
            <input
              type="text"
              v-model="formData.waterOwner"
              readonly
              class="flex-1 h-9 px-3 bg-[#f0f3f8] border border-[#e2e8f0] rounded-lg text-gray-800 text-xs focus:outline-none cursor-default truncate"
            />
          </div>
        </div>

        <!-- 3. 双列：故障底数(m³) & 故障时间 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- 故障底数(m³) -->
          <div class="flex items-center gap-3">
            <label class="w-[96px] text-right font-normal text-gray-700 shrink-0">
              <span class="text-red-500 mr-1">*</span>故障底数(m³)
            </label>
            <input
              type="text"
              v-model="formData.faultWaterMeterReading"
              placeholder="12343"
              class="flex-1 h-9 px-3 bg-white border border-[#dce6f5] rounded-lg text-gray-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 transition font-mono"
            />
          </div>

          <!-- 故障时间 (带日历图标) -->
          <div class="flex items-center gap-3">
            <label class="w-[84px] text-right font-normal text-gray-700 shrink-0">
              <span class="text-red-500 mr-1">*</span>故障时间
            </label>
            <div class="flex-1 relative">
              <input
                type="text"
                v-model="faultTimeStr"
                placeholder="2026/09/04"
                class="w-full h-9 px-3 pr-8 bg-white border border-[#dce6f5] rounded-lg text-gray-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 transition font-mono"
              />
              <svg class="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
          </div>
        </div>

        <!-- 4. 双列：上报人员 & 所属区县 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- 上报人员 -->
          <div class="flex items-center gap-3">
            <label class="w-[96px] text-right font-normal text-gray-700 shrink-0">
              上报人员
            </label>
            <input
              type="text"
              v-model="formData.reporter"
              placeholder="段问薇"
              class="flex-1 h-9 px-3 bg-white border border-[#dce6f5] rounded-lg text-gray-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 transition"
            />
          </div>

          <!-- 所属区县 (灰底只读) -->
          <div class="flex items-center gap-3">
            <label class="w-[84px] text-right font-normal text-gray-700 shrink-0">
              所属区县
            </label>
            <input
              type="text"
              v-model="formData.district"
              readonly
              class="flex-1 h-9 px-3 bg-[#f0f3f8] border border-[#e2e8f0] rounded-lg text-gray-800 text-xs focus:outline-none cursor-default"
            />
          </div>
        </div>

        <!-- 5. 故障说明 (多行文本框，完全还原截图占位提示) -->
        <div class="flex items-start gap-3">
          <label class="w-[96px] text-right font-normal text-gray-700 shrink-0 pt-2">
            <span class="text-red-500 mr-1">*</span>故障说明
          </label>
          <textarea
            v-model="formData.faultDesc"
            rows="3"
            placeholder="详细说明水表故障表象（如表盘黑屏、机械齿轮卡阻、瞬时流量跳变、漏水）、产生原因及已采取的应急措施..."
            class="flex-1 p-3 bg-white border border-[#dce6f5] rounded-lg text-gray-800 text-xs focus:outline-none focus:border-[#1677ff] focus:ring-2 focus:ring-blue-50 transition leading-relaxed resize-none"
          ></textarea>
        </div>

        <!-- 6. 材料附件 (上传按钮与附件列表，完全对照截图样式) -->
        <div class="flex items-start gap-3">
          <label class="w-[96px] text-right font-normal text-gray-700 shrink-0 pt-2">
            <span class="text-red-500 mr-1">*</span>材料附件
          </label>
          <div class="flex-1 space-y-2.5">
            <!-- 上传按钮 & 格式大小提示 -->
            <div class="flex items-center gap-3">
              <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium cursor-pointer shadow-2xs transition">
                <svg class="w-3.5 h-3.5 text-[#1677ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span>上传照片/附件</span>
                <input type="file" multiple class="hidden" @change="handleFileUpload" />
              </label>
              <span class="text-gray-400 text-xs">
                支持 JPG、PNG、PDF 格式，单个文件不超过 10MB
              </span>
            </div>

            <!-- 已上传附件列表条目 (截图中的浅灰蓝背景圆角卡片) -->
            <div class="space-y-1.5">
              <div
                v-for="(file, fIdx) in uploadedFiles"
                :key="fIdx"
                class="flex items-center justify-between p-2.5 rounded-lg border border-[#e2ebf7] bg-[#f8fafc] hover:bg-[#f0f5fd] transition"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <!-- 蓝色小相机图标框 -->
                  <div class="w-7 h-7 rounded-md bg-[#e6f1fc] text-[#1677ff] flex items-center justify-center shrink-0">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                  <span class="text-xs text-gray-800 font-medium truncate">{{ file.name }}</span>
                  <span class="text-xs text-gray-400 font-mono">({{ file.size }})</span>
                </div>

                <!-- 右侧动作按钮：预览 & 删除 (完全对应截图文字与颜色) -->
                <div class="flex items-center gap-3 shrink-0 text-xs">
                  <button
                    type="button"
                    @click="previewFile(file)"
                    class="inline-flex items-center gap-1 text-[#1677ff] hover:underline cursor-pointer"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>预览</span>
                  </button>
                  <button
                    type="button"
                    @click="removeFile(fIdx)"
                    class="inline-flex items-center gap-1 text-[#f5222d] hover:underline cursor-pointer"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    <span>删除</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 7. 说明通知区域 (浅蓝底色 + 细蓝框 + 圆角，完全还原截图 1、2、3 条) -->
        <div class="p-3.5 rounded-xl bg-[#f0f7ff] border border-[#bae0ff] text-xs space-y-1.5">
          <div class="flex items-center gap-1.5 text-[#1677ff] font-semibold">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>说明</span>
          </div>
          <ol class="list-decimal list-inside text-slate-600 space-y-1 leading-relaxed pl-1 text-[11.5px]">
            <li>故障水表底数须与现场表盘实拍照片记录一致，作为故障停运期水量核算与台账追补依据。</li>
            <li>佐证材料建议包含水表表盘读数特写、铭牌信息及现场工况照片，支持上传 JPG、PNG、PDF 格式。</li>
            <li>申报提交后将即时流转至水利水务监管部门审核，核验通过后开展维修置换与水量追补。</li>
          </ol>
        </div>
      </div>

      <!-- Footer: 取消与确认提交申报按钮 -->
      <div class="px-6 py-3.5 bg-white border-t border-gray-100 flex items-center justify-end gap-3 shrink-0">
        <button
          type="button"
          @click="handleClose"
          class="px-5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition cursor-pointer"
        >
          取消
        </button>
        <button
          type="button"
          @click="handleSubmit"
          class="px-5 py-2 rounded-lg bg-[#1677ff] hover:bg-blue-600 text-white text-sm font-medium shadow-sm transition cursor-pointer flex items-center gap-1.5"
        >
          <span>确认提交申报</span>
        </button>
      </div>
    </div>

    <!-- 附件照片大图预览弹窗 -->
    <t-dialog
      v-model:visible="previewVisible"
      :header="`附件照片预览 - ${previewFileName}`"
      width="580px"
      :footer="false"
    >
      <div class="p-2 flex flex-col items-center">
        <div class="w-full max-h-[360px] overflow-hidden rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center p-2">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
            alt="现场照片"
            class="max-h-[340px] object-contain rounded"
          />
        </div>
        <div class="mt-2 text-xs text-gray-500 flex items-center justify-between w-full px-1">
          <span>照片文件：{{ previewFileName }}</span>
          <span>拍摄地点：青海省西宁市城东区 日村人畜饮水工程</span>
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { FaultRecord } from '../../types';

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'submit', record: Partial<FaultRecord>): void;
}>();

const facilityDisplayText = ref('日村人畜饮水工程 (241017001536)');
const faultTimeStr = ref('2026/09/04');

const uploadedFiles = ref([
  { name: '现场水表表盘裂损实拍.jpg', size: '1.8 MB' }
]);

const previewVisible = ref(false);
const previewFileName = ref('');

const formData = ref<Partial<FaultRecord>>({
  facilityName: '日村人畜饮水工程',
  facilityCode: '241017001536',
  waterOwner: '西宁市东川供水有限责任公司',
  faultWaterMeterReading: '12343',
  reporter: '段问薇',
  district: '城东区',
  faultDesc: '',
  status: '故障待审',
});

const handleClose = () => {
  emit('update:visible', false);
};

const handleFileUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      uploadedFiles.value.push({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      });
    }
    MessagePlugin.success(`已添加 ${input.files.length} 个材料附件`);
    input.value = '';
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

const handleSubmit = () => {
  if (!formData.value.faultWaterMeterReading?.trim()) {
    MessagePlugin.error('请输入故障底数');
    return;
  }
  emit('submit', {
    ...formData.value,
    id: `fault-${Date.now()}`,
    faultTime: faultTimeStr.value,
    permitNumber: '取水（青宁）字[2026]第0021号',
    faultImages: uploadedFiles.value.map(f => f.name),
  });
  emit('update:visible', false);
  MessagePlugin.success('故障申报工单已提交至西宁市水务监管部门审核');
};
</script>
