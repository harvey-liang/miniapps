// pages/personal/CollectPictures/CollectPictures.js
var util = require('../../../utils/MD5.js'); 
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      array:[],
      transparent: app.globalData.filter,
      img_url:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(app.globalData.loginInfo)
    var loginInfo = app.globalData.loginInfo
   
    var timestamp = Date.parse(new Date())
    var signs = "page" + "1" + "target_id" + loginInfo.user_id+ "timestamp" + timestamp + "user_id" + loginInfo.user_id + loginInfo.token
    console.log(signs)
    var sign = util.hexMD5(encodeURIComponent(signs))
    wx.request({
      url: 'https://www.daodianwang.com/Tantou/Social/myCollection',
      data: {
        page:"1",
        user_id: loginInfo.user_id,
        timestamp: timestamp,
        target_id: loginInfo.user_id,
        sign: sign,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          array:res.data.result
        })
        
      },
      fail: function (err) {
        console.log(err)
      }

    })
  },
  previewImage:function(e){
    var array = this.data.img_url
    console.log(e)
    var img_url = e.currentTarget.dataset.img
    array = array.concat(img_url)
    console.log(img_url)
    wx.previewImage({
      current: img_url, // 当前显示图片的http链接
      urls: array // 需要预览的图片http链接列表
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