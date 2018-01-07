// pages/description/description.js
var util = require('../../../utils/MD5.js'); 
var UTF = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc: '',
    windowWidth: 0,
    fraction: 'fraction',
    hide: true,
    placeholder:'说点什么...',
    post:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var image = options.image
    var post = options.post
    console.log(image)
    that.setData({
      imgsrc: image,
      post: post
    })
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        that.setData({
          windowWidth: windowWidth,
        })
      }
    })
  },
  bindTextAreaBlur:function(e){
    var placeholder = e.detail.value
   
       this.setData({
         placeholder: placeholder
       }) 
       console.log(this.data.placeholder)
  },
  release:function(e){
    
    var that=this
    var imgsrc = that.data.imgsrc
    var say = that.data.placeholder
    console.log(say)
    var score = that.data.post
    var timestamp = Date.parse(new Date());
    var user_id = app.globalData.user_id
    var token = app.globalData.token
    var signs = 
      "say" + say+"score"+score+"timestamp" + timestamp+"user_id"+ user_id+token;
    console.log(encodeURIComponent(signs));
    var sign = util.hexMD5(encodeURIComponent(signs))
    console.log(sign);
    var data={
      "say" :say ,
      "score" : score ,
      "timestamp": timestamp ,
      "user_id":user_id ,
      "token": token,
      "sign": sign,
      "img": imgsrc
    }
    
    that.publish_upload(data)
  },
  publish_upload(data){
    wx.uploadFile({
      url: 'https://www.daodianwang.com/Tantou/Social/displayDyn', //上传api路径
      filePath: data.img,
      method: 'POST',
      name: 'img',
      formData:{
        user_id: data.user_id,
        timestamp: data.timestamp,
        sign: data.sign,
        score: data.score,
        say: data.say
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
             console.log(res)
             wx.navigateBack({
               url: '../health/health',
             })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function () {
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