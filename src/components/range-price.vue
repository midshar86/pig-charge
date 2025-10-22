<template>
  <div>
    <header class="my-3">
      猪苗品种单价及调整价格详情:
    </header>
    <template
      v-for="(item, index) in breedPriceList"
      :key="index"
    >
      <div v-if="item.number">
        <p class="my-3 flex gap-3 indent-8 text-sm">
          <span>种类:{{ item.name }}</span> <span>数量:{{ item.number }}头</span>
          <span>基础单价:{{ item.singlePrice }}元/头</span>
          <span>猪苗均重:{{ item.averageWeight }}kg/头</span>
          <span>调整价格:{{ item.range }}元/kg</span>
        </p>
      </div>
    </template>
    <footer class="my-3">
      <p class="text-red-700">
        总猪苗成本: {{ totalBreedCost }} 元
      </p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { breedType } from '@/views/Home/form-fields'
const props = defineProps({
  formValue: {
    type: Object,
    default: () => ({})
  },
  settlementPlan: {
    type: Object,
    default: () => {}
  }
})

// 计算调整单价
function breedRangeKey(averageWeight) {
  let res = ''
  if (averageWeight <= 10) res = '<=10'
  else if (averageWeight <= 15) res = '<=15'
  else if (averageWeight <= 20) res = '<=20'
  else if (averageWeight <= 25) res = '<=25'
  else if (averageWeight <= 30) res = '<=30'
  else res = '>30'
  return res
}
function rangeTotal(averageWeight) {
  const plan = props.settlementPlan.plan
  const res = (plan.breedRange[breedRangeKey(averageWeight)] * (averageWeight - 6.5)).toFixed(5)
  return averageWeight ? Number(res) : 0
}
function priceRangeList() {
  const { salePrice } = props.formValue

  const plan = props.settlementPlan.plan
  const res = breedType.map(itm => {
    const res = {
      name: itm.label,
      singlePrice: plan.breed?.[itm.pigType] ?? 0,
      number: props.formValue[itm.buyNumberKey],
      averageWeight: props.formValue[itm.buyAverageWeightKey],
      range:
        salePrice &&
        props.formValue[itm.buyNumberKey] &&
        rangeTotal(props.formValue[itm.buyAverageWeightKey])
    }
    return res
  })
  return res
}
// 不同品种的猪苗单价及计算
const breedPriceList = computed(() => {
  return priceRangeList()
})

// 计算总猪苗成本
const totalBreedCost = computed(() => {
  const res = breedPriceList.value.reduce((total, cate) => {
    const acc = cate.number * (cate.singlePrice + cate.range)
    return total + acc
  }, 0)
  return res.toFixed(5)
})
</script>

<style scoped lang="scss"></style>
