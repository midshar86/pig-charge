<template>
  <div class="wrap">
    <p class="flex items-center justify-between">
      <span>结算方案: {{ settlementPlan.text }}</span>
      <a-button
        type="primary"
        @click="handleExport"
      >
        导出计算数据
      </a-button>
    </p>
    <DetailInfoBox>
      <RangePrice
        ref="smallRef"
        :form-value="formValue"
        :settlement-plan="settlementPlan"
      />
    </DetailInfoBox>
    <DetailInfoBox>
      <p>代乳康金额: {{ dairyConcentrateMoney }}元</p>
      <p>乳猪康金额: {{ pigletConcentrateMoney }}元</p>
      <p>仔猪康金额: {{ childrenPigConcentrateMoney }}元</p>
      <p>德康2号金额: {{ decon2ConcentrateMoney }}元</p>
      <p>德康3号金额: {{ decon3ConcentrateMoney }}元</p>
      <p>德康4号金额: {{ decon4ConcentrateMoney }}元</p>
      <p class="text-red-700">
        饲料总成本: {{ totalConcentrateMoney }}
      </p>
    </DetailInfoBox>
    <DetailInfoBox>
      <p>回收正价: {{ normolRecyclePrice }}</p>
      <p>回收次价: {{ defectiveRecyclePrice }}</p>
      <p class="text-red-700">
        回收总价: {{ totalRecyclePrice }}
      </p>
    </DetailInfoBox>
    <DetailInfoBox>
      <p>饲料总重量: {{ totalConcentrateWeight }}kg</p>
      <p>进苗总重量: {{ totalBuyPigWeight.totalWeight }}kg</p>
      <p>进苗总头数: {{ totalBuyPigWeight.totalNum }}头</p>
      <p>进苗均重: {{ totalSalePigWeight }}kg</p>
      <p>销售总重量: {{ saleWeight.toFixed(5) }}kg</p>
      <p>销售均重: {{ saleAverageWeight }}kg</p>
      <p>基准加权料比: {{ weightedFeedRatio }}</p>
      <p>调整之后标准料比: {{ standardFeedRatio }}</p>
      <p>实际料比: {{ actualFeedRatio }}</p>
      <p class="text-red-700">
        料比奖励金额: {{ feedRatioReward ? feedRatioReward : '无料比奖励' }}
      </p>
    </DetailInfoBox>
    <DetailInfoBox>
      <p>饲料运费: {{ totalTransportMoney }}元</p>
      <p>猪苗运费: {{ totalPigTranspotMoney }}元</p>
      <p class="text-red-700">
        总运费: {{ totalTranportMoney }}元
      </p>
    </DetailInfoBox>
    <DetailInfoBox>
      <p
        v-for="(itm, idx) in otherCostMapper"
        :key="idx"
      >
        {{ itm.label }}: {{ otherCost[itm.key] ? otherCost[itm.key].toFixed(5) : (0).toFixed(5) }}元
      </p>
      <p class="text-red-700">
        其他扣除费用总额: {{ totalOtherCost }}元
      </p>
    </DetailInfoBox>
    <DetailInfoBox>
      <p
        v-for="(itm, idx) in otherRewardMapper"
        :key="idx"
      >
        {{ itm.label }}:
        {{ otherReward[itm.key] ? otherReward[itm.key].toFixed(5) : (0).toFixed(5) }}元
      </p>
      <p class="text-red-700">
        其他奖补费用总额: {{ totalOtherReward }}元
      </p>
    </DetailInfoBox>
    <div class="m-5">
      <a-button
        type="primary"
        @click="handleCulate"
      >
        计算结算总金额
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { computed, watchEffect, ref } from 'vue'
import { exportToExcel } from '@/utils/createSheet'
import DetailInfoBox from './detail-info-box.vue'
import { otherCostMapper, otherRewardMapper } from '@/views/Home/other-fields'
import { allPlans, baseFeedRatio } from '@/config/contract-info'
import RangePrice from '@/components/range-price.vue'
import { breedType, totalPigWeightMapper } from '@/views/Home/form-fields'
const emits = defineEmits(['onCulate'])
const smallRef = ref(null)
const props = defineProps({
  // 苗种及饲料总成本
  formValue: {
    type: Object,
    default: () => ({})
  },
  // 饲料运费及猪苗运费
  tableData: {
    type: Array,
    default: () => []
  },
  // 苗种及饲料总成本表单校验逻辑
  validateStatus: {
    type: Boolean,
    default: false
  },
  // 其他扣除费用
  otherCost: {
    type: Object,
    default: () => ({})
  },
  // 其他奖补费用
  otherReward: {
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
  return saleAverageWeight.value ? res.toFixed(5) : (0).toFixed(5)
})

// 计算实际料比
const actualFeedRatio = computed(() => {
  // const { saleWeight } = props.formValue
  const { totalWeight } = totalBuyPigWeight.value
  const res =
    saleWeight.value && totalWeight
      ? totalConcentrateWeight.value / (saleWeight.value - totalWeight)
      : 0
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
    return 0
  }
})

// 计算饲料总运费
const totalTransportMoney = computed(() => {
  console.log('表格数据=======》', props.tableData)

  const res = props.tableData.reduce((total, item) => {
    return total + item.totalPrice
  }, 0)
  return res.toFixed(5)
})

// 计算猪苗总运费
const totalPigTranspotMoney = computed(() => {
  const res = Number(totalBuyPigWeight.value.totalNum) * 2
  return res.toFixed(5)
})

// 计算总运费
const totalTranportMoney = computed(() => {
  return Number(Number(totalTransportMoney.value) + Number(totalPigTranspotMoney.value)).toFixed(5)
})

// 计算其他扣除费用总金额
const totalOtherCost = computed(() => {
  const copyOtherForm = Object.entries(props.otherCost).map(([_, val]) => {
    return val ? val : 0
  })
  return Number(copyOtherForm.reduce((total, item) => {
    return total + item
  }, 0)).toFixed(5)
})
// 计算其他奖励总金额
const totalOtherReward = computed(() => {
  const copyOtherForm = Object.entries(props.otherReward).map(([_, val]) => {
    return val ? val.toFixed(5) : (0).toFixed(5)
  })
  return Number(copyOtherForm.reduce((total, item) => {
    return total + Number(item)
  }, 0)).toFixed(5)
})

// 计算结算总金额
const finallyTotalMoney = ref(0)
function handleCulate() {
  const finallyMoney =
    Number(totalRecyclePrice.value) -
    Number(smallRef.value.totalBreedCost) -
    Number(totalConcentrateMoney.value) +
    Number(feedRatioReward.value) -
    Number(totalTranportMoney.value) -
    Number(totalOtherCost.value) +
    Number(totalOtherReward.value)
  finallyTotalMoney.value = finallyMoney
  const payload = {
    transportFee: Number(totalTransportMoney.value),
    finallyMoney
  }
  emits('onCulate', payload)
}

// 点击导出数据
function handleExport() {
  const data = [
    { name: '总猪苗成本', value: smallRef.value.totalBreedCost },
    { name: '代乳康金额', value: dairyConcentrateMoney.value },
    { name: '乳猪康金额', value: pigletConcentrateMoney.value },
    { name: '仔猪康金额', value: childrenPigConcentrateMoney.value },
    { name: '德康2号金额', value: decon2ConcentrateMoney.value },
    { name: '德康3号金额', value: decon3ConcentrateMoney.value },
    { name: '德康4号金额', value: decon4ConcentrateMoney.value },
    { name: '饲料总成本', value: totalConcentrateMoney.value },
    { name: '回收正价', value: normolRecyclePrice.value },
    { name: '回收次价', value: defectiveRecyclePrice.value },
    { name: '回收总价', value: totalRecyclePrice.value },
    { name: '饲料总重量', value: totalConcentrateWeight.value },
    { name: '进苗总重量', value: totalBuyPigWeight.value.totalWeight },
    { name: '进苗总头数', value: totalBuyPigWeight.value.totalNum },
    { name: '进苗均重', value: totalSalePigWeight.value },
    { name: '销售总重量', value: saleWeight.value.toFixed(5) },
    { name: '销售均重', value: saleAverageWeight.value },
    { name: '基准加权料比', value: weightedFeedRatio.value },
    { name: '调整之后标准料比', value: standardFeedRatio.value },
    { name: '实际料比', value: actualFeedRatio.value },
    { name: '料比奖励金额', value: feedRatioReward.value },
    { name: '饲料运费', value: totalTransportMoney.value },
    { name: '猪苗运费', value: totalPigTranspotMoney.value },
    { name: '总运费', value: totalTranportMoney.value },
    { name: '疫苗总成本', value: props.otherCost.vaccineCost },
    { name: '保证金', value: props.otherCost.deposit },
    { name: '违约金', value: props.otherCost.penalty },
    { name: '赔偿款', value: props.otherCost.compensation },
    { name: '其他运输费用', value: props.otherCost.otherTransportationCost },
    { name: '补贴扣回', value: props.otherCost.subsidyRecovery },
    { name: '借款本息', value: props.otherCost.loanInterest },
    { name: '其他扣除费用总额', value: totalOtherCost.value },
    { name: '其他奖励', value: props.otherReward.otherReward },
    { name: '其他补贴', value: props.otherReward.otherSubsidy },
    { name: '其他奖补费用总额', value: totalOtherReward.value },
    { name: '结算总金额', value: finallyTotalMoney.value }
  ]
  const headerOption = [
    { name: '类别', key: 'name' },
    { name: '金额', key: 'value' }
  ]
  const formatData = data.reduce((arr, item) => {
    const newItem = {}
    headerOption.forEach((_, idx) => {
      newItem[headerOption[idx].name] = item[headerOption[idx].key]
    })
    arr.push(newItem)
    return arr
  }, [])

  exportToExcel(formatData)
}

watchEffect(() => {
  console.log('totalSaleNum', totalSaleNum.value)
})

defineExpose({
  totalBuyPigWeight,
  saleWeight
})
</script>

<style scoped lang="scss">
p {
  margin: 0;
}
</style>
