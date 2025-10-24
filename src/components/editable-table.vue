<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    bordered
    :pagination="false"
  >
    <template #bodyCell="{ column, index, record }">
      <a-input
        v-if="column.dataIndex === 'type'"
        v-model:value="dataSource[index][column.dataIndex]"
        disabled
      />
      <a-input-number
        v-else-if="column.dataIndex !== 'totalPrice'"
        v-model:value="dataSource[index][column.dataIndex]"
        style="margin: 5px 0"
        :disabled="disabledInput(column, index)"
        :min="minMaxInput(column, index).min"
        :max="minMaxInput(column, index).max"
      />
      <a-input
        v-else-if="column.calc"
        :value="column.calc(record, total => (dataSource[index][column.dataIndex] = total))"
        disabled
      />
    </template>
    <!-- 总结行 -->
    <template #summary>
      <a-table-summary-row>
        <a-table-summary-cell :col-span="3">
          总计
        </a-table-summary-cell>
        <a-table-summary-cell>
          <span class="text-red-500">{{ totalStatistics.totalWeight }}</span>
        </a-table-summary-cell>
        <a-table-summary-cell>
          <span class="text-red-500">{{ totalStatistics.totalPrice }}</span>
        </a-table-summary-cell>
      </a-table-summary-row>
    </template>
  </a-table>
</template>

<script setup>
import { computed } from 'vue'
import { disabledIndex } from '@/views/Home/transport-fields'
const dataSource = defineModel('dataSource', {
  type: Array
})
defineProps({
  columns: {
    type: Array,
    default: () => []
  }
})

// 计算哪些单元格不能修改
function disabledInput(column, index) {
  const cond1 = column.dataIndex === 'type'
  const cond2 = column.dataIndex === 'distance' && disabledIndex.includes(index)
  const cond3 = column.dataIndex === 'totalPrice'
  return cond1 || cond2 || cond3
}

function minMaxInput(column, index) {
  const { dataIndex } = column
  if (dataIndex === 'distance') {
    switch (index) {
      case 1:
        return {
          min: 40,
          max: 80
        }
      case 3:
        return {
          min: 120,
          max: 9999999
        }
      default:
        return {
          min: 0,
          max: 9999999
        }
    }
  } else {
    return {
      min: 0
    }
  }
}

console.log('dataSource======', dataSource.value)

// 计算总结栏数据
const totalStatistics = computed(() => {
  const res = {
    totalWeight: 0,
    totalPrice: 0
  }
  dataSource.value.reduce((acc, { weight, totalPrice }) => {
    acc.totalWeight += weight
    acc.totalPrice += totalPrice
    return acc
  }, res)
  return res
})
</script>

<style scoped lang="scss"></style>
