// 标准方案
export const standardPlan = {
  breed: {
    // 猪苗基础单价
    dk2: 400, // 德康Ⅱ系
    dly: 350, // DLY苗
    bin: 320, // 二元猪
    trd: 310 // 纯种猪
  },
  breedRange: {
    '<=10': 15,
    '<=15': 14,
    '<=20': 13,
    '<=30': 12,
    '>30': 11
  },
  feedPrice: {
    dairyConcentrate: 7.61, // 代乳康
    pigletConcentrate: 6.29, // 乳猪康
    childrenPigConcentrate: 4.95, // 仔猪康
    decon2Concentrate: 4.34, // 德康2号
    decon3Concentrate: 4.21, // 德康3号
    decon4Concentrate: 4.12 // 德康4号
  },
  recyclingPrice: {
    // 回收单价
    normalType: 15.5, // 正常回收
    defectiveType: 13.5 // 次品回收
  }
}
// 优价方案1
export const betterPlan1 = {
  breed: {
    // 猪苗基础单价
    dk2: 450, // 德康Ⅱ系
    dly: 400, // DLY苗
    bin: 370, // 二元猪
    trd: 360 // 纯种猪
  },
  breedRange: {
    '<=10': 18,
    '<=15': 16,
    '<=20': 15,
    '<=30': 14,
    '>30': 13
  },
  feedPrice: {
    dairyConcentrate: 8.76, // 代乳康
    pigletConcentrate: 7.24, // 乳猪康
    childrenPigConcentrate: 5.7, // 仔猪康
    decon2Concentrate: 4.99, // 德康2号
    decon3Concentrate: 4.85, // 德康3号
    decon4Concentrate: 4.71 // 德康4号
  },
  recyclingPrice: {
    // 回收单价
    normalType: 17.5, // 正常回收
    defectiveType: 15.5 // 次品回收
  }
}
// 优价方案2
export const betterPlan2 = {
  breed: {
    // 猪苗基础单价
    dk2: 500, // 德康Ⅱ系
    dly: 400, // DLY苗
    bin: 370, // 二元猪
    trd: 360 // 纯种猪
  },
  breedRange: {
    '<=10': 20,
    '<=15': 19,
    '<=20': 17,
    '<=30': 16,
    '>30': 14
  },
  feedPrice: {
    dairyConcentrate: 9.91, // 代乳康
    pigletConcentrate: 8.19, // 乳猪康
    childrenPigConcentrate: 6.45, // 仔猪康
    decon2Concentrate: 5.64, // 德康2号
    decon3Concentrate: 5.49, // 德康3号
    decon4Concentrate: 5.29 // 德康4号
  },
  recyclingPrice: {
    // 回收单价
    normalType: 19.5, // 正常回收
    defectiveType: 17.5 // 次品回收
  }
}
// 优价方案3
export const betterPlan3 = {
  breed: {
    // 猪苗基础单价
    dk2: 550, // 德康Ⅱ系
    dly: 450, // DLY苗
    bin: 420, // 二元猪
    trd: 410 // 纯种猪
  },
  breedRange: {
    '<=10': 22,
    '<=15': 21,
    '<=20': 19,
    '<=30': 18,
    '>30': 16
  },
  feedPrice: {
    dairyConcentrate: 11.06, // 代乳康
    pigletConcentrate: 9.14, // 乳猪康
    childrenPigConcentrate: 7.19, // 仔猪康
    decon2Concentrate: 6.3, // 德康2号
    decon3Concentrate: 6.12, // 德康3号
    decon4Concentrate: 5.88 // 德康4号
  },
  recyclingPrice: {
    // 回收单价
    normalType: 21.5, // 正常回收
    defectiveType: 19.5 // 次品回收
  }
}

// 基准料比
export const baseFeedRatio = {
  dk2: 2.45,
  dly: 2.55,
  bin: 2.55,
  trd: 2.55
}

export const allPlans = {
  standardPlan,
  betterPlan1,
  betterPlan2,
  betterPlan3
}
