// pages/function/MobileBinding/MobileBinding.js
const app = getApp()
var util = require('../../../utils/MD5.js'); 
var modify = require('../../../utils/modify.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    text:"发送验证码"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  mobile:function(e){
    console.log(e.detail.value)
    var that=this
    that.setData({
      mobile:e.detail.value
    })
  },
  Obtain:function(e){
    var that=this
    that.setData({ 
      text:"已发送"
      })
    var mobile = that.data.mobile
    console.log(mobile)
     wx.request({
       url:"https://www.daodianwang.com/Tantou/Account/getMobCode",
       data:{
         type:"bind",
         mobile: mobile
       },
       method: 'GET',
       success: res => {
          console.log(res)
       }
     })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this
    var mobile = e.detail.value.mobile
    var code = e.detail.value.code
    var user_id = app.globalData.user_id
    var token = app.globalData.token
    var timestamp = Date.parse(new Date())
    var signs = "code" + code + "mobile" + mobile + "timestamp" + timestamp + "user_id" + user_id + token
    console.log(signs)
    var sign = util.hexMD5(encodeURIComponent(signs))
    wx.request({
      url: "https://www.daodianwang.com/Tantou/Account/mobileBind",
      data:{
        user_id: user_id,
        timestamp: timestamp,
        sign: sign,
        mobile: mobile,
        code:code
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: res => {
        console.log(res)
        var loginInfo = app.globalData.loginInfo
        var userInfo = app.globalData.userInfo
        if (loginInfo.nickname == "" || loginInfo.headpic == "") {
          
          modify.nickname(loginInfo.user_id, loginInfo.token, userInfo.nickName)
          modify.headpic(loginInfo.user_id, loginInfo.token, userInfo.avatarUrl)
        }
        app.globalData.Login_identifier = true
        wx.redirectTo({
          url: '../../index/index',
        })
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