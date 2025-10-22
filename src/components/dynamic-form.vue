<template>
  <div class="dynamic-wrap">
    <a-form
      ref="formRef"
      autocomplete="off"
      :model="formValue"
      layout="inline"
    >
      <a-row :gutter="[0, 20]">
        <template
          v-for="field in config.fields"
          :key="field.prop"
        >
          <a-col
            v-if="field.show"
            :span="field.span"
          >
            <a-form-item
              :label="field.label"
              :name="field.prop"
              :rules="field.rules"
              :required="field.required"
            >
              <!-- 根据类型条件渲染表单控件 -->
              <a-input
                v-if="field.type === 'input'"
                v-model:value.number="formValue[field.prop]"
                :placeholder="field.placeholder"
                v-bind="field.props"
              />
              <a-input-number
                v-if="field.type === 'input-number'"
                v-model:value="formValue[field.prop]"
                :placeholder="field.placeholder"
                style="width: 100%"
                :min="0"
              />
              <a-radio-group
                v-if="field.type === 'radio'"
                v-model:value="formValue[field.prop]"
                :name="field.prop"
              >
                <a-radio
                  v-for="opt in field.props.options"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </a-radio>
              </a-radio-group>
              <a-checkbox-group
                v-if="field.type === 'checkbox'"
                v-model:value="formValue[field.prop]"
                :options="field.props.options"
              />
            </a-form-item>
          </a-col>
        </template>
        <!-- 表单提交/重置按钮 -->
        <a-col :span="24">
          <a-form-item>
            <div class="flex gap-5">
              <a-button
                type="primary"
                @click="emits('onSubmit')"
              >
                提交
              </a-button>
              <a-button
                type="primary"
                html-type="reset"
                @click="handleReset"
              >
                重置
              </a-button>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const formRef = ref(null)
const emits = defineEmits(['onSubmit'])
const formValue = defineModel('value', {
  type: Object,
  default: () => ({})
})

const props = defineProps({
  // 表单配置
  config: {
    type: Object,
    default: () => ({})
  }
})
console.log('props========', props)

function handleReset() {
  formRef.value.resetFields()
}

defineExpose({
  formRef
})
</script>

<style scoped lang="scss"></style>
