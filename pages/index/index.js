//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    girlselected : false,
    boyselected : false
  },
  onLoad: function() {
    //判断用户是否设置性别
    wx.getStorage({
      key: 'gender',
      success: function (res) {
        //如果设置直接跳转到floor
        wx.redirectTo({
          url: '../floor/floor',
        })
      },
      fail: function () {
        wx.setStorage({
          key: 'gender',
          data: 'boy',
        }),
        console.log("设置缓存成功");
      }
    })     
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
