import { validatePrice, _createFormFields } from './form-fields'
// 其他成本
export const otherCostFields = {
  fields: [
    {
      label: '疫苗总成本',
      prop: 'vaccineCost',
      type: 'input-number',
      placeholder: '请输入疫苗总成本',
      required: true,
      rules: validatePrice('疫苗总成本'),
      span: 6,
      show: true,
      props: {
        allowClear: true
      }
    },
    {
      label: '保证金',
      prop: 'deposit',
      type: 'input-number',
      placeholder: '请输入保证金',
      required: false,
      span: 6,
      show: true,
      props: {
        allowClear: true
      }
    },
    {
      label: '违约金',
      prop: 'penalty',
      type: 'input-number',
      placeholder: '请输入违约金',
      required: false,
      span: 6,
      show: true,
      props: {
        allowClear: true
      }
    },
    {
      label: '赔偿款',
      prop: 'compensation',
      type: 'input-number',
      placeholder: '请输入赔偿款',
      required: false,
      span: 6,
      show: true,
      props: {
        allowClear: true
      }
    },
    {
      label: '其他运输费用',
      prop: 'otherTransportationCost',
      type: 'input-number',
      placeholder: '请输入其他运输费用',
      required: false,
      span: 6,
      show: true,
      props: {
        allowClear: true
      }
    },
    {
      label: '补贴扣回',
      prop: 'subsidyRecovery',
      type: 'input-number',
      placeholder: '请输入补贴扣回',
      required: false,
      span: 6,
      show: true,
      props: {
        allowClear: true
      }
    },
    {
      label: '借款本息',
      prop: 'loanInterest',
      type: 'input-number',
      placeholder: '请输入借款本息',
      required: false,
      span: 6,
      show: true,
      props: {
        allowClear: true
      }
    }
  ]
}
export const otherCostMapper=[
  {key: 'vaccineCost', label: '疫苗总成本'},
  {key: 'deposit', label: '保证金'},
  {key: 'penalty', label: '违约金'},
  {key: 'compensation', label: '赔偿款'},
  {key: 'otherTransportationCost', label: '其他运输费用'},
  {key: 'subsidyRecovery', label: '补贴扣回'},
  {key: 'loanInterest', label: '借款本息'}
]
// 其他成本表单初始字段
export const otherCostFormData = _createFormFields(otherCostFields)

// 其他奖励
export const otherRewardFields = {
  fields: [
    {
      label: '其他奖励',
      prop: 'otherReward',
      type: 'input-number',
      placeholder: '请输入其他奖励',
      required: false,
      span: 12,
      show: true,
      props: {
        allowClear: true
      }
    },
    {
      label: '其他补贴',
      prop: 'otherSubsidy',
      type: 'input-number',
      placeholder: '请输入其他补贴',
      required: false,
      span: 12,
      show: true,
      props: {
        allowClear: true
      }
    }
  ]
}
export const otherRewardMapper=[
  {key: 'otherReward', label: '其他奖励'},
  {key: 'otherSubsidy', label: '其他补贴'}
]
// 其他奖励表单初始字段
export const otherRewardFormData = _createFormFields(otherRewardFields)
