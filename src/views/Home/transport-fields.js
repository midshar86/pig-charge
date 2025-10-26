export const tableColumns = [
  {
    title: '类型',
    dataIndex: 'type',
    width: '40%'
  },
  {
    title: '计算里程(km)',
    dataIndex: 'distance',
    width: '10%'
  },
  {
    title: '运输单价(元/t/km)',
    dataIndex: 'price',
    width: '10%'
  },
  {
    title: '运输重量(t)',
    dataIndex: 'weight',
    width: '10%'
  },
  {
    title: '计算价格(元)',
    dataIndex: 'totalPrice',
    width: '30%',
    calc: (col, cb = () => {}) => {
      const res = col.price * col.weight * col.distance
      cb(res)
      return res
    }
  }
]

export const distanceType = ['40km以内', '40km~80km', '80km~120km', '120km以上']
export const disabledIndex = [0, 2]
export const dataSource = Array.from({ length: 4 }).map((_, idx) => {
  const key = crypto.randomUUID()
  const type = distanceType[idx]
  const distance = idx === 0 ? 40 : idx === 2 ? 80 : 0
  return {
    key,
    type,
    distance,
    price: 0,
    weight: 0,
    totalPrice: 0
  }
})
