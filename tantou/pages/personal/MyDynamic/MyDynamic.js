// pages/personal/MyDynamic/MyDynamic.js
var util = require('../../../utils/MD5.js'); 
var Api = require('../../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:[],
    windowWidth: 0,
    userInfo: {},
    text:"卢本伟牛逼撒难受啊啊涛",
    fen:"分"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    
    this.setData({
      userInfo: app.globalData.userInfo,
      loginInfo:app.globalData.loginInfo
    })
    var that = this
    
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        var windowWidth = res.windowWidth;
        that.setData({
          windowWidth: windowWidth,
        })
      }
    })
     
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var user_id = app.globalData.user_id
    var token = app.globalData.token
    var timestamp = Date.parse(new Date())
    var signs = "page" + "1" + "target_id" + user_id+ "timestamp" + timestamp + "user_id" + user_id + token
    console.log(signs)
    var sign = util.hexMD5(encodeURIComponent(signs))
    wx.request({
      url: 'https://www.daodianwang.com/Tantou/Social/myDynamic',
      data: {
        page: "1",
        target_id: user_id,
        timestamp: timestamp,
        user_id: user_id,
        sign: sign
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        for (var i = 0; i < res.data.result.length; i++) {
          res.data.result[i].add_time =
            Api.getDateDiff(res.data.result[i].add_time * 1000)

        }
        that.setData({
          datas: res.data.result
        })
        //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        console.log(res.data.result)
      },
      fail: function (err) {
        console.log(err)
      }

    })     
  },
  look_up: function (e) {
    app.globalData.scene_value = 1
    console.log(e.currentTarget.dataset.information)
    var information = e.currentTarget.dataset.information
    var display_id = information.display_id
    var user_id = app.globalData.user_id
    var timestamp = Date.parse(new Date())
    var token = app.globalData.token
    var signs = "display_id" + display_id + "timestamp" + timestamp + "user_id" + user_id + token
    console.log(signs)
    var sign = util.hexMD5(encodeURIComponent(signs))
    Api.particulars(display_id, user_id, timestamp, sign)

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