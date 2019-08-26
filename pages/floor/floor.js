// pages/floor/floor.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:'',
    items: [
      {
        "floor": "01",
         "seats": [
           { "type": 1, "human": 1, "timet": "00:59:00" }, { "type": 1, "human": 0 }, { "type": 1, "human": 0 }, { "type": 1, "human": 1, "timet": "00:01:54" }
           ]
      },
      {
        "floor": "02",
        "seats": [
          { "type": 1, "human": 0 }, { "type": 1, "human": 0 }, { "type": 1, "human": 0 }, { "type": 1, "human": 1, "timet": "00:14:32"}
        ]
      },
      {
        "floor": "03",
        "seats": [
          { "type": 0, "human": 1, "timet": "00:10:40"}, { "type": 0, "human": 0 }, { "type": 0, "human": 0 }
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://findwc.cn?gender=' + options.gender,
    //   success: function(res) {
    //     console.log("请求数据成功");
    //   },
    //   fail: function(){
    //     console.log("请求数据失败");
    //   }
    // }),
    // this.setData({
    //   gender:options.gender
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //时间加1函数
    function strAddHandle(str){
      var timestr = str;
      var str = timestr.split(":")
      var hour = parseInt(str[0]);
      var minute = parseInt(str[1]);
      var second = parseInt(str[2]);
      second += 1;
      if (second >= 60) {
        minute += 1;
        second = 0;
        if (minute >= 60) {
          hour += 1;
          minute = 0;
        }
      }
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (minute < 10) {
        minute = '0' + minute;
      }
      if (second < 10) {
        second = '0' + second;
      }
      timestr = hour + ":" + minute + ":" + second;
      return timestr;
    }
    
    var that = this;
    //正计时函数
    function timeAddHandle(that) {
      var items = that.data.items;
      for(var i=0;i<items.length;i++){
        var seats = items[i].seats
        for (var j = 0; j < seats.length;j++){
          if(seats[j].human){
            seats[j].timet = strAddHandle(seats[j].timet)
          }
        }
      }
      that.setData({
        items: items
      })
    }
    timeAddHandle(that);
    wx.getStorage({
      key: 'timeID',
      success: function(res) {
        clearInterval(res.data)
        timer = null;
      },
    })
    var timer = setInterval(timeAddHandle, 1000,that);
    //将timer设置到缓存中 防止多次计时
    wx.setStorage({
      key: 'timeID',
      data: timer,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //当逻辑执行完后关闭刷新    
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //性别重选
  genderSelect: function () {
    wx.removeStorage({
      key: 'gender',
      success: function(res) {
        wx.redirectTo({
          url: '../index/index',
        })
      },
    })
  },
  //小程序分享
  onShareAppMessage: function () {
    window.onShareAppMessage = function (data) {
      return {
        title: 'test title',
        path: '/home/index', // 这里的 path 是页面 url，而不是小程序路由
      }
    }
  }
})