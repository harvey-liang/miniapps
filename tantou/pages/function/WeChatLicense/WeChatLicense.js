// pages/function/WeChatLicense/WeChatLicense.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  refuse:function(e){
    var that=this
    wx.navigateBack({
      url: '../../index/index',
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          if (app.globalData.mobile == "") {
            wx.navigateTo({
              url: '../MobileBinding/MobileBinding',
            })
          }else{
            app.globalData.userInfo = e.detail.userInfo
            app.globalData.Login_identifier = true
            this.setData({
              userInfo: e.detail.userInfo,
              hasUserInfo: false,
            })
            wx.redirectTo({
              url: '../../sociality/probering/probering',
            })
          }
          //console.log(e.detail.userInfo)
        } else {
          this.setData({
          hasUserInfo: false
          })
        }
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