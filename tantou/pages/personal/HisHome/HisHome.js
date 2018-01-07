// pages/personal/HisHome/HisHome.js
var util = require('../../../utils/MD5.js'); 
var Api = require('../../../utils/util.js');

var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headpic: true,
    userInfo:{},
    datas: [],
    Loading: false,
    fen: "分",
    windowWidth: 0,
    dyn:[],
    preloading:false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.his_id)
    var that=this
    var page="1"
    var target_id = options.his_id
    var user_id = app.globalData.user_id
    var timestamp = Date.parse(new Date())
    var token = app.globalData.token
    console.log(token)
    var signs = "target_id" + target_id + "timestamp" + timestamp + "user_id" + user_id + token
    var sign = util.hexMD5(encodeURIComponent(signs))
    that.get_list(target_id, user_id, timestamp, sign)
    that.dynamic_loading(user_id,target_id, token,
      timestamp, page)
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        that.setData({
          windowWidth: windowWidth,
        })
      }
    })
  },
  preloading(even) {
    console.log(even)
    this.setData({
      preloading: true
    })
  },
  get_list(target_id, user_id, timestamp, sign){
    var that=this
    wx.request({
      url: "https://www.daodianwang.com/Tantou/Social/userInfo",
      data: {
        target_id: target_id,
        user_id: user_id,
        timestamp: timestamp,
        sign: sign,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: res => {
        console.log("用户信息")
        console.log(res)
        that.setData({
           userInfo: res.data.result
        })
      }
    })
    
  },
  Attention:function(e){
    console.log(e)
    var that = this
    var userInfo = that.data.userInfo
    if (e.currentTarget.dataset.attented == "1") {
      userInfo.attented = 0
      console.log("取消关注")
      that.setData({ userInfo: userInfo })
    } else if (e.currentTarget.dataset.attented == "0") {
      userInfo.attented = 1
      console.log("关注了")
      that.setData({ userInfo: userInfo })
    }

    var user_id = app.globalData.user_id
    var token = app.globalData.token
    var target_id = e.currentTarget.dataset.uid
    console.log(user_id)
    var timestamp = Date.parse(new Date())

    Api.follow(user_id, target_id, token, timestamp)
  },
  dynamic_loading(user_id,target_id, token,timestamp, page)
    {
      var that=this
      var signs = "page" + page + "target_id" + target_id + "timestamp" + timestamp + "user_id" + user_id+ token
      console.log(signs)
      var sign = util.hexMD5(encodeURIComponent(signs))
      
      wx.request({
        url: "https://www.daodianwang.com/Tantou/Social/myDynamic",
        data: {
          page: page,
          target_id: target_id,
          user_id: user_id,
          timestamp: timestamp,
          sign: sign,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method:'POST',
        success: res => {
          console.log("我的动态")
          console.log(res)
          var userInfo = that.data.userInfo
          var datas = res.data.result
          // var newData = {
          //   headpic: userInfo.headpic, nickname: userInfo.nickname
          // };
          for (var i = 0; i< datas.length; i++){
           
            datas[i].add_time =
          Api.getDateDiff(datas[i].add_time * 1000)
          }
          console.log(datas)
          that.setData({
            datas: datas
          })
         
        }
      })
  },
  look_up: function (e) {
    app.globalData.scene_value=1
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