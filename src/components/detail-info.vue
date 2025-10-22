<template>
  <div class="wrap">
    <p>结算方案: {{ settlementPlan.text }}</p>
    <div class="border-amber-300 border-2 my-5 p-3 rounded-2xl flex flex-col gap-4">
      <RangePrice
        :form-value="formValue"
        :settlement-plan="settlementPlan"
      />
    </div>
    <div class="border-amber-300 border-2 my-5 p-3 rounded-2xl flex flex-col gap-4">
      <p>代乳康金额: {{ dairyConcentrateMoney }}元</p>
      <p>乳猪康金额: {{ pigletConcentrateMoney }}元</p>
      <p>仔猪康金额: {{ childrenPigConcentrateMoney }}元</p>
      <p>德康2号金额: {{ decon2ConcentrateMoney }}元</p>
      <p>德康3号金额: {{ decon3ConcentrateMoney }}元</p>
      <p>德康4号金额: {{ decon4ConcentrateMoney }}元</p>
      <p class="text-red-700">饲料总成本: {{ totalConcentrateMoney }}</p>
    </div>
    <div class="border-amber-300 border-2 my-5 p-3 rounded-2xl flex flex-col gap-4">
      <p>回收正价: {{ normolRecyclePrice }}</p>
      <p>回收次价: {{ defectiveRecyclePrice }}</p>
      <p class="text-red-700">回收总价: {{ totalRecyclePrice }}</p>
    </div>
    <div class="border-amber-300 border-2 my-5 p-3 rounded-2xl flex flex-col gap-4">
      <p>饲料总重量: {{ totalConcentrateWeight }}kg</p>
      <p>进苗总重量: {{ totalBuyPigWeight.totalWeight }}kg</p>
      <p>进苗总头数: {{ totalBuyPigWeight.totalNum }}kg</p>
      <p>进苗均重: {{ totalSalePigWeight }}kg</p>
      <p>销售总重量: {{ saleWeight }}kg</p>
      <p>销售均重: {{ saleAverageWeight }}kg</p>
      <p>基准加权料比: {{ weightedFeedRatio }}</p>
      <p>调整之后标准料比: {{ standardFeedRatio }}</p>
      <p>实际料比: {{ actualFeedRatio }}</p>
      <p class="text-red-700">料比奖励金额: {{ feedRatioReward }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { allPlans, baseFeedRatio } from '@/config/contract-info'
import RangePrice from '@/components/range-price.vue'
import { breedType, totalPigWeightMapper } from '@/views/Home/form-fields'
const props = defineProps({
  formValue: {
    type: Object,
    default: () => ({})
  }
})

// 计算结算方案
const settlementPlan = computed(() => {
  const { salePrice } = props.formValue
  const res = {}
  if (salePrice <= 0) {
    res.text = '-'
    res.plan = {}
  } else if (salePrice <= 15.5) {
    res.text = '使用标准方案'
    res.plan = allPlans.standardPlan
  } else if (salePrice <= 17.5) {
    res.text = '使用优价方案1'
    res.plan = allPlans.betterPlan1
  } else if (salePrice <= 19.5) {
    res.text = '使用优价方案2'
    res.plan = allPlans.betterPlan2
  } else {
    res.text = '使用优价方案3'
    res.plan = allPlans.betterPlan3
  }
  return res
})

// 饲料计算辅助函数
function concentrate(type) {
  const { salePrice } = props.formValue
  const singlePrice = props.formValue[type]
  const res =
    salePrice > 0 && singlePrice > 0 ? singlePrice * settlementPlan.value.plan?.feedPrice[type] : 0
  return res.toFixed(5)
}

// 代乳康金额
const dairyConcentrateMoney = computed(() => {
  return concentrate('dairyConcentrate')
})

// 乳猪康金额
const pigletConcentrateMoney = computed(() => {
  return concentrate('pigletConcentrate')
})

// 仔猪康金额
const childrenPigConcentrateMoney = computed(() => {
  return concentrate('childrenPigConcentrate')
})

// 德康2号金额
const decon2ConcentrateMoney = computed(() => {
  return concentrate('decon2Concentrate')
})

// 德康3号金额
const decon3ConcentrateMoney = computed(() => {
  return concentrate('decon3Concentrate')
})

// 德康4号金额
const decon4ConcentrateMoney = computed(() => {
  return concentrate('decon4Concentrate')
})

// 饲料总成本
const totalConcentrateMoney = computed(() => {
  const arr = [
    dairyConcentrateMoney.value,
    pigletConcentrateMoney.value,
    childrenPigConcentrateMoney.value,
    decon2ConcentrateMoney.value,
    decon3ConcentrateMoney.value,
    decon4ConcentrateMoney.value
  ]
  const res = arr.reduce((total, num) => total + Number(num), 0)
  return res.toFixed(5)
})

// 回收正价
const normolRecyclePrice = computed(() => {
  const { salePrice, normalTypeWeight } = props.formValue
  const res =
    salePrice > 0 ? settlementPlan.value.plan.recyclingPrice.normalType * normalTypeWeight : 0
  return res.toFixed(5)
})

// 回收次价
const defectiveRecyclePrice = computed(() => {
  const { salePrice, defectiveTypeWeight } = props.formValue
  const res =
    salePrice > 0 ? settlementPlan.value.plan.recyclingPrice.defectiveType * defectiveTypeWeight : 0
  return res.toFixed(5)
})

// 回收总价
const totalRecyclePrice = computed(() => {
  const res = Number(normolRecyclePrice.value) + Number(defectiveRecyclePrice.value)
  return res.toFixed(5)
})

// 饲料总重量
const totalConcentrateWeight = computed(() => {
  const {
    dairyConcentrate,
    pigletConcentrate,
    childrenPigConcentrate,
    decon2Concentrate,
    decon3Concentrate,
    decon4Concentrate
  } = props.formValue
  const res =
    dairyConcentrate +
    pigletConcentrate +
    childrenPigConcentrate +
    decon2Concentrate +
    decon3Concentrate +
    decon4Concentrate
  return res.toFixed(5)
})

// 计算猪苗总体重量与总体头数
const totalBuyPigWeight = computed(() => {
  const total = totalPigWeightMapper.reduce((obj, { buyNumberKey, buyAverageKey }) => {
    const iNum = Number(props.formValue[buyNumberKey])
    const iAve = Number(props.formValue[buyAverageKey])
    obj.totalWeight = (Number(obj.totalWeight ?? 0) + iNum * iAve).toFixed(5)
    obj.totalNum = (obj.totalNum ?? 0) + iNum
    return obj
  }, {})
  return total
})

// 计算猪苗总体均重
const totalSalePigWeight = computed(() => {
  const { totalWeight, totalNum } = totalBuyPigWeight.value
  const res = totalWeight / totalNum
  return totalNum ? res.toFixed(5) : 0
})

// 计算销售总数量
const totalSaleNum = computed(() => {
  return breedType.reduce((total, item) => {
    return total + Number(props.formValue[item.salesAmountKey])
  }, 0)
})

// 计算销售总重
const saleWeight = computed(() => {
  const { normalTypeWeight, defectiveTypeWeight } = props.formValue
  return Number(normalTypeWeight + defectiveTypeWeight)
})

// 计算销售均重
const saleAverageWeight = computed(() => {
  const res = saleWeight.value / totalSaleNum.value
  return totalSaleNum.value ? res.toFixed(5) : 0
})

// 计算销售猪只占比
const salePigWeightRatio = computed(() => {
  return breedType.reduce((obj, item) => {
    const res = props.formValue[item.salesAmountKey] / totalSaleNum.value
    obj[item.pigType] = totalSaleNum.value ? res.toFixed(5) : 0
    return obj
  }, {})
})

// 计算加权基准料比
const weightedFeedRatio = computed(() => {
  return breedType.reduce((ratio, item) => {
    ratio =
      Number(ratio) + Number(salePigWeightRatio.value[item.pigType]) * baseFeedRatio[item.pigType]
    return ratio.toFixed(5)
  }, 0)
})

// 计算标准料比
const standardFeedRatio = computed(() => {
  const range = (Number(saleAverageWeight.value) - 120) * 0.005
  const res = Number(weightedFeedRatio.value) + range
  return saleAverageWeight.value ? res.toFixed(5) : 0
})

// 计算实际料比
const actualFeedRatio = computed(() => {
  // const { saleWeight } = props.formValue
  const { totalWeight } = totalBuyPigWeight.value
  const res =
    saleWeight.value && totalWeight ? totalConcentrateWeight.value / (saleWeight.value - totalWeight) : 0
  return Number(res).toFixed(5)
})

// 计算料比奖励金额
const feedRatioReward = computed(() => {
  const actual = Number(actualFeedRatio.value)
  const standard = Number(standardFeedRatio.value)
  const totalSaleWeight = Number(saleWeight.value)
  const buyTotalWeight = Number(totalBuyPigWeight.value.totalWeight)
  if (actual < standard) {
    // 推算标准饲料耗用量
    const standardFeed = standard * (totalSaleWeight - buyTotalWeight)
    // 计算少耗用饲料量
    const lessFeed = standardFeed - Number(totalConcentrateWeight.value)
    const res = lessFeed * 2.5
    return actual && standard && totalSaleWeight && buyTotalWeight ? res.toFixed(5) : 0
  } else {
    return '无料比奖励'
  }
})

watchEffect(() => {
  console.log('totalSaleNum', totalSaleNum.value)
})
</script>

<style scoped lang="scss">
p {
  margin: 0;
}
</style>
