// 生成通用规则
function generalRules(msg, trigger = 'blur') {
  return {
    required: true,
    message: msg + '是必填项',
    trigger
  }
}

// 校验数字
function validatePrice(msg) {
  return [generalRules(msg)]
}

export const formOptions = {
  fields: [
    {
      label: '销售均价',
      prop: 'salePrice',
      type: 'input-number',
      placeholder: '请输入销售均价',
      required: true,
      rules: validatePrice('销售均价'),
      span: 24,
      show: true,
      props: {
        allowClear: true
      }
    },
    {
      label: '德康2系猪苗数量',
      placeholder: '输入猪苗数量',
      prop: 'dk2BuyNumber',
      type: 'input-number',
      span: 6,
      alias: 'dk2',
      show: true,
      tag: true, // 用来标记循环遍历的标记
      buyAverageKey: 'dk2BuyAverageWeight', // 对应均重的字段名
      salesAmountKey: 'dk2SaleAmount', // 对应销售数量的字段名
      props: {
        decimalSeparator: false
      }
    },
    {
      label: 'DLY猪苗数量',
      placeholder: '输入猪苗数量',
      prop: 'dlyBuyNumber',
      type: 'input-number',
      span: 6,
      alias: 'dly',
      show: true,
      tag: true,
      buyAverageKey: 'dlyBuyAverageWeight', // 对应均重的字段名
      salesAmountKey: 'dlySaleAmount', // 对应销售数量的字段名
      props: {
        decimalSeparator: false
      }
    },
    {
      label: '二元猪猪苗数量',
      placeholder: '输入猪苗数量',
      prop: 'binBuyNumber',
      type: 'input-number',
      span: 6,
      alias: 'bin',
      show: true,
      tag: true,
      buyAverageKey: 'binBuyAverageWeight', // 对应均重的字段名
      salesAmountKey: 'binSaleAmount', // 对应销售数量的字段名
      props: {
        decimalSeparator: false
      }
    },
    {
      label: '纯种猪猪苗数量',
      placeholder: '输入猪苗数量',
      prop: 'trdBuyNumber',
      type: 'input-number',
      span: 6,
      alias: 'trd',
      show: true,
      tag: true,
      buyAverageKey: 'trdBuyAverageWeight', // 对应均重的字段名
      salesAmountKey: 'trdSaleAmount', // 对应销售数量的字段名
      props: {
        decimalSeparator: false
      }
    },
    {
      label: '德康2系猪苗均重',
      placeholder: '输入猪苗均重',
      prop: 'dk2BuyAverageWeight',
      type: 'input-number',
      span: 6,
      show: false,
      dynamic: true, // 用来标记变动的字段
      props: {
        decimalSeparator: false
      }
    },
    {
      label: 'DLY猪苗均重',
      placeholder: '输入猪苗均重',
      prop: 'dlyBuyAverageWeight',
      type: 'input-number',
      span: 6,
      dynamic: true, // 用来标记变动的字段
      props: {
        decimalSeparator: false
      }
    },
    {
      label: '二元猪猪苗均重',
      placeholder: '输入猪苗均重',
      prop: 'binBuyAverageWeight',
      type: 'input-number',
      span: 6,
      dynamic: true, // 用来标记变动的字段
      show: false,
      props: {
        decimalSeparator: false
      }
    },
    {
      label: '纯种猪猪苗均重',
      placeholder: '输入猪苗均重',
      prop: 'trdBuyAverageWeight',
      type: 'input-number',
      span: 6,
      dynamic: true, // 用来标记变动的字段
      show: false,
      props: {
        decimalSeparator: false
      }
    },
    {
      label: '代乳康',
      prop: 'dairyConcentrate',
      type: 'input-number',
      span: 24,
      show: true,
      placeholder: '请输入代乳康耗用总重量',
      required: true,
      rules: validatePrice('代乳康耗用总重量'),
      props: {
        allowClear: true
      }
    },
    {
      label: '乳猪康',
      prop: 'pigletConcentrate',
      type: 'input-number',
      span: 24,
      show: true,
      placeholder: '请输入乳猪康耗用总重量',
      required: true,
      rules: validatePrice('乳猪康耗用总重量'),
      props: {
        allowClear: true
      }
    },
    {
      label: '仔猪康',
      prop: 'childrenPigConcentrate',
      type: 'input-number',
      span: 24,
      show: true,
      placeholder: '请输入仔猪康耗用总重量',
      required: true,
      rules: validatePrice('仔猪康耗用总重量'),
      props: {
        allowClear: true
      }
    },
    {
      label: '德康2号',
      prop: 'decon2Concentrate',
      type: 'input-number',
      placeholder: '请输入德康2号耗用总重量',
      required: true,
      span: 24,
      show: true,
      rules: validatePrice('德康2号耗用总重量'),
      props: {
        allowClear: true
      }
    },
    {
      label: '德康3号',
      prop: 'decon3Concentrate',
      type: 'input-number',
      placeholder: '请输入德康3号耗用总重量',
      required: true,
      span: 24,
      show: true,
      rules: validatePrice('德康3号耗用总重量'),
      props: {
        allowClear: true
      }
    },
    {
      label: '德康4号',
      prop: 'decon4Concentrate',
      type: 'input-number',
      placeholder: '请输入德康4号耗用总重量',
      required: true,
      span: 24,
      show: true,
      rules: validatePrice('德康4号耗用总重量'),
      props: {
        allowClear: true
      }
    },
    {
      label: '正品回收猪重量',
      placeholder: '输入总重量',
      prop: 'normalTypeWeight',
      type: 'input-number',
      span: 12,
      show: true,
      props: {
        decimalSeparator: false
      }
    },
    {
      label: '次品回收猪重量',
      placeholder: '输入总重量',
      prop: 'defectiveTypeWeight',
      type: 'input-number',
      span: 12,
      show: true,
      props: {
        decimalSeparator: false
      }
    },
    {
      label: '德康2系销售数量',
      placeholder: '输入销售数量',
      prop: 'dk2SaleAmount',
      type: 'input-number',
      span: 6,
      show: false,
      props: {
        decimalSeparator: false
      }
    },
    {
      label: 'DLY销售数量',
      placeholder: '输入销售数量',
      prop: 'dlySaleAmount',
      type: 'input-number',
      span: 6,
      show: false,
      props: {
        decimalSeparator: false
      }
    },
    {
      label: '二元猪销售数量',
      placeholder: '输入销售数量',
      prop: 'binSaleAmount',
      type: 'input-number',
      span: 6,
      show: false,
      props: {
        decimalSeparator: false
      }
    },
    {
      label: '纯种猪销售数量',
      placeholder: '输入销售数量',
      prop: 'trdSaleAmount',
      type: 'input-number',
      span: 6,
      show: false,
      props: {
        decimalSeparator: false
      }
    }
  ]
}

// 根据配置创建表单字段
function _createFormFields() {
  return formOptions.fields.reduce((form, field) => {
    form[field.prop] = null
    return form
  }, {})
}

// 表单初始字段
export const initialForm = _createFormFields()

// 猪苗类型
// 格式：[{label:'', pigType: '', buyNumberKey: '', buyAverageWeightKey: '', salesAmountKey: ''}]
export const breedType = formOptions.fields.reduce((list, field) => {
  const obj = {}
  if (field.tag) {
    obj.label = field.label
    obj.pigType = field.alias
    obj.buyNumberKey = field.prop
    obj.buyAverageWeightKey = field.buyAverageKey
    obj.salesAmountKey = field.salesAmountKey
  }
  if (Object.keys(obj).length > 0) {
    list.push(obj)
  }
  return list
}, [])

// 根据猪苗类型获取均重
// 格式 [{dk2BuyNumber: dk2BuyAverageWeight}]
export const numberToWeightMapper = breedType.map(item => ({
  [item.buyNumberKey]: item.buyAverageWeightKey
}))

// 生成用于计算总猪苗均重mapper
export const totalPigWeightMapper = formOptions.fields.reduce((list, field) => {
  const obj = {}
  if (field.tag) {
    obj.buyNumberKey = field.prop
    obj.buyAverageKey = field.buyAverageKey
  }
  if (Object.keys(obj).length > 0) {
    list.push(obj)
  }
  return list
}, [])
