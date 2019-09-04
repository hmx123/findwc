// pages/floor/floor.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:'',
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://findwc.cn/front?gender=' + options.gender,
      success: function(res) {
        this.setData({
          gender: options.gender,
          items: res
        })
      },
      fail: function(){
      }
    })
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
    var timer = setInterval(timeAddHandle, 1000, that);
    //将timer设置到缓存中 防止多次计时
    wx.setStorage({
      key: 'timeID',
      data: timer,
    })

    //设置定时刷新任务 刷新坑位状态
    function requestTiem(that){
      wx.request({
        url: 'https://findwc.cn/front?gender=' + this.data.gender,
        success: function(res) {
          this.setData({
            gender: options.gender,
            items: res
          })
        },
        fail: function(){
          console.log("请求数据失败");
        }
      })
      
    }
    
    //从缓存中获取是否有请求时间id
    wx.getStorage({
      key: 'requID',
      success: function(res) {
        clearInterval(res.data)
        requtimer = null;
      },
    })
    var requtimer = setInterval(requestTiem, 20000, that);
    //将timer设置到缓存中 防止多次计时
    wx.setStorage({
      key: 'requID',
      data: requtimer,
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
    wx.request({
      url: 'https://findwc.cn?gender=' + options.gender,
      success: function(res) {
        this.setData({
          gender: options.gender,
          items: res
        })
      },
      fail: function(){
        console.log("请求数据失败");
      }
    }),
    
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
 
})