//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    girlselected : false,
    boyselected : false
  },
  SelectHandle: function (e) {
    var gender = e.currentTarget.dataset.index
    if (gender === 'boy') {
      var girlselected = false;
      var boyselected = true;
    } else if (gender === 'girl') {
      var girlselected = true;
      var boyselected = false;
    }
    this.setData({
      girlselected: girlselected, boyselected: boyselected
    })
  }
})
