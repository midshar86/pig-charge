<template>
  <div class="flex gap-10">
    <div class="flex-1">
      <DynamicForm
        ref="dyFormRef"
        v-model:value="formValue"
        :config="config"
        @on-submit="handleSubmit"
      />
    </div>
    <div class="flex-1">
      <DetailInfo :form-value="formValue" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import DynamicForm from '@/components/dynamic-form.vue'
import DetailInfo from '@/components/detail-info.vue'
import { formOptions, initialForm, breedType } from './form-fields'
import { cloneDeep } from 'lodash'
import { message } from 'ant-design-vue'
const formValue = ref(cloneDeep(initialForm))
const dyFormRef = ref(null)

const config = ref(cloneDeep(formOptions))

// 执行校验函数
function validateForm() {
  const {
    dk2BuyNumber,
    dlyBuyNumber,
    binBuyNumber,
    trdBuyNumber,
    dk2BuyAverageWeight,
    dlyBuyAverageWeight,
    binBuyAverageWeight,
    trdBuyAverageWeight,
    normalTypeWeight,
    defectiveTypeWeight,
    dk2SaleAmount,
    dlySaleAmount,
    binSaleAmount,
    trdSaleAmount
  } = formValue.value
  if (!dk2BuyNumber && !dlyBuyNumber && !binBuyNumber && !trdBuyNumber) {
    message.error('至少有一个猪苗数量不为空!')
    return false
  } else if (
    !dk2BuyAverageWeight &&
    !dlyBuyAverageWeight &&
    !binBuyAverageWeight &&
    !trdBuyAverageWeight
  ) {
    message.error('至少有一个进苗平均重量不为空!')
    return false
  } else if (!normalTypeWeight && !defectiveTypeWeight) {
    message.error('至少有一个回收重量不为空!')
    return false
  } else if (!dk2SaleAmount && !dlySaleAmount && !binSaleAmount && !trdSaleAmount) {
    message.error('至少有一个销售数量不为空!')
  } else {
    return true
  }
}

function handleSubmit() {
  console.log('表单数据=======', formValue.value)
  const res = validateForm()
  res && dyFormRef.value.formRef.validate()
}

// 动态显示隐藏input
function dynamicAverageWeight(nv) {
  // 根据苗种调整
  const { dk2BuyNumber, dlyBuyNumber, binBuyNumber, trdBuyNumber } = nv
  const mp = {
    dk2BuyNumber,
    dlyBuyNumber,
    binBuyNumber,
    trdBuyNumber
  }
  const tempList = [...cloneDeep(breedType)].map(li => ({
    ...li,
    value: mp[li.buyNumberKey]
  }))
  config.value.fields = config.value.fields.map(itm => {
    const matched = tempList.find(
      it => itm.prop === it.buyAverageWeightKey || itm.prop === it.salesAmountKey
    )
    if (matched) {
      return { ...itm, show: !!matched.value }
    }
    return itm
  })
  // 清空数量时，清空进苗均重与销售重量与销售数量
  tempList.forEach(({ buyAverageWeightKey, value, salesAmountKey }) => {
    if (!value) {
      formValue.value[buyAverageWeightKey] = null
      formValue.value[salesAmountKey] = null
    }
  })
}
watch(
  () => formValue.value,
  nv => {
    dynamicAverageWeight(nv)
  },
  { deep: true }
)
</script>

<style scoped lang="scss"></style>
