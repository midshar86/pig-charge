<template>
  <div class="flex gap-10">
    <div class="flex-1">
      <div class="flex my-4 flex-col gap-10 border-2 box-border p-4 rounded-2xl border-orange-500">
        <div class="font-bold text-red-700 text-3xl">苗种及饲料总成本计算:</div>
        <DynamicForm
          ref="dyFormRef1"
          v-model:value="formValue1"
          :config="config"
          @on-submit="handleSubmit"
        />
      </div>
      <div class="flex my-4 flex-col gap-10 border-2 box-border p-4 rounded-2xl border-orange-500">
        <div class="font-bold text-red-700 text-3xl">饲料运费总成本计算:</div>
        <EditableTable
          v-model:data-source="tableSource"
          :columns="tableColumns"
        />
      </div>
    </div>
    <div class="flex-1">
      <DetailInfo
        ref="infoRef"
        :form-value="formValue1"
        :table-data="tableSource"
        :validate-status="validateStatus"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import DynamicForm from '@/components/dynamic-form.vue'
import DetailInfo from '@/components/detail-info.vue'
import EditableTable from '@/components/editable-table.vue'
import { formOptions, initialForm, breedType } from './form-fields'
import { tableColumns, distanceType, dataSource } from './transport-fields'
import { cloneDeep } from 'lodash'
import { message } from 'ant-design-vue'
const formValue1 = ref(cloneDeep(initialForm))
const dyFormRef1 = ref(null)
const infoRef = ref(null)
const validateStatus = ref(false)

const tableSource = ref(cloneDeep(dataSource))

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
  } = formValue1.value
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
    return false
  }
  for (let i = 0; i < breedType.length; i++) {
    const item = breedType[i]
    if (formValue1.value[item.buyNumberKey] < formValue1.value[item.salesAmountKey]) {
      message.error(`${item.label}销售数量不能大于进苗数量`)
      return false
    }
  }
  if (infoRef.value.saleWeight < Number(infoRef.value.totalBuyPigWeight.totalWeight)) {
    message.error(`销售重量不能小于总进苗重量`)
    return false
  }
  message.success('苗种及饲料成本校验通过!')
  return true
}

function handleSubmit() {
  console.log('表单数据=======', formValue1.value, validateStatus.value)
  const res = validateForm()
  res &&
    dyFormRef1.value.formRef
      .validate()
      .then(() => {
        validateStatus.value = true
        console.log('校验通过')
      })
      .catch(err => {
        validateStatus.value = false
        message.error('校验失败')
      })
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
      formValue1.value[buyAverageWeightKey] = null
      formValue1.value[salesAmountKey] = null
    }
  })
}
watch(
  () => formValue1.value,
  nv => {
    dynamicAverageWeight(nv)
  },
  { deep: true }
)
</script>

<style scoped lang="scss"></style>
