// pages/personal/Visitor/Visitor.js
const app = getApp()
var util = require('../../../utils/MD5.js');
var Api = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userInfo:{},
     array:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    var that = this
    console.log(app.globalData.loginInfo)
    var loginInfo = app.globalData.loginInfo

    var timestamp = Date.parse(new Date())
    var signs = "page" + "1" + "timestamp" + timestamp + "user_id" + loginInfo.user_id + loginInfo.token
    console.log(signs)
    var sign = util.hexMD5(encodeURIComponent(signs))
    wx.request({
      url: 'https://www.daodianwang.com/Tantou/Social/visiteRecord',
      data: {
        page: "1",
        user_id: loginInfo.user_id,
        timestamp: timestamp,
        sign: sign,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        
        for (var i = 0; i < res.data.result.length; i++) {
          res.data.result[i].add_time =
            that.getDateDiff(res.data.result[i].add_time * 1000)
        }
        console.log(res)
        that.setData({
          array: res.data.result
        })

      },
      fail: function (err) {
        console.log(err)
      }

    })
  },
  getDateDiff: function(time) {
      var result;
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();


      var diffValue = now - time;
      if (diffValue < 0) {
        return;
      }
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;
      if (monthC >= 1) {
        if (monthC <= 12){
          var dateta = new Date(time)
          var month = dateta.getMonth() + 1;
          var date = dateta.getDate();

          dateta = month + "月" + date + "日";

          console.log(dateta)
          result = dateta;
        }
         
        else {
          var dateta = new Date(time)
          var year = dateta.getFullYear();
          var month = dateta.getMonth() + 1;
          var date = dateta.getDate();
          var hour = dateta.getHours();
          var minute = dateta.getMinutes();
          var second = dateta.getSeconds();

          dateta = year + "年" + month + "月" + date + "日";

          // console.log(dateta)
          result = dateta;
        }
      }
      else if (weekC >= 1) {
        var dateta = new Date(time)
        var month = dateta.getMonth() + 1;
        var date = dateta.getDate();

        dateta = month + "月" + date + "日";

        console.log(dateta)
        result = dateta;
      }
      else if (dayC >= 1) {
        var dateta = new Date(time)
       
        var month = dateta.getMonth() + 1;
        var date = dateta.getDate();
        var hour = dateta.getHours();
        var minute = dateta.getMinutes();
        var second = dateta.getSeconds();

        dateta = month + "月" + date + "日" + hour + ":" + minute
        result = dateta;
      }
      else if (hourC >= 1) {
        var dateta = new Date(time)

        var hour = dateta.getHours();
        var minute = dateta.getMinutes();


        dateta =  hour + ":" + minute
        result = dateta;
      }
      else if (minC >= 1) {
        var dateta = new Date(time)

        var hour = dateta.getHours();
        var minute = dateta.getMinutes();
        dateta = hour + ":" + minute
        result = dateta;
      } else {
        result = "刚刚";
      }

      return result;
     
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
  
  }
})