// pages/sociality/MoveDetails/MoveDetails.js
var app=getApp()
var modify = require("../../../utils/modify.js");
var Api = require('../../../utils/util.js');
var util = require('../../../utils/MD5.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    p_number:0,
    card:false,
    details: wx.getStorageSync("details"),
    systemInfo: app.globalData.systemInfo,
    fen:"分",
    uid:"",
    num:0,
    placeholder: '',
    prompt:"添加评论",
    comment:[],
    to_nickname:"",
    to_comment:[],
    lower:"lower",
    page:1,
    attented:true,
    preloading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that=this
    if (options.attented){
      that.setData({ attented:false})
    }
      var details = JSON.parse(decodeURIComponent(options.details))
      console.log(options)
      var comment = details.comment
      var uid = app.globalData.user_id
      //var zaned = details.comment["0"].zaned
      that.setData({
        details: details,
        comment: comment,
        uid: uid
      })

  },
  preloading(even){
    console.log(even)
      this.setData({
        preloading:true
      })
  },
  //获取评论
  bindTextAreaBlur: function (e) {
    var placeholder = e.detail.value

    this.setData({
      placeholder: placeholder
    })
    console.log(this.data.placeholder)
  },
  //发送评论
  Send_out: function () {
    var that = this
    console.log(that.data.placeholder)
    var display = that.data.details.display_id
    var user_id = app.globalData.user_id
    var token = app.globalData.token
    var timestamp = Date.parse(new Date())
    
    var content = that.data.placeholder
    if (that.data.card==true){
      var display_id = that.data.to_comment.display_id
      var to_user_id = that.data.to_comment.user_id
      var comment_id = that.data.to_comment.id
      var signs = "comment_id" + comment_id +"content" + content + "display_id" + display_id + "timestamp" + timestamp +  "to_user_id" + to_user_id +"user_id" + user_id + token
      console.log(signs)
      var sign = util.hexMD5(encodeURIComponent(signs))
      wx.request({
        url: "https://www.daodianwang.com/Tantou/Social/comment",
        data: {
          user_id: user_id,
          timestamp: timestamp,
          sign: sign,
          display_id: display_id,
          content: content,
          comment_id: comment_id,
          to_user_id: to_user_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: res => {
          console.log(res)
        
          var rsign = "display_id" + display + "timestamp" + timestamp + "user_id" + user_id + token
          console.log(rsign)
          var refresh_sign = util.hexMD5(encodeURIComponent(rsign))
          this.particulars(display, user_id, timestamp, refresh_sign)

        }
      })
    }else{
      var display_id = that.data.details.display_id
      var signs = "content" + content + "display_id" + display_id + "timestamp" + timestamp + "user_id" + user_id + token
      console.log(signs)
      var sign = util.hexMD5(encodeURIComponent(signs))
      wx.request({
        url: "https://www.daodianwang.com/Tantou/Social/comment",
        data: {
          user_id: user_id,
          timestamp: timestamp,
          sign: sign,
          display_id: display_id,
          content: content
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: res => {
          console.log(res)
          
          var rsign = "display_id" + display + "timestamp" + timestamp  + "user_id" + user_id + token
          console.log(rsign)
          var refresh_sign = util.hexMD5(encodeURIComponent(rsign))
          this.particulars(display, user_id, timestamp, refresh_sign)
        
        }
      })
    }

  },
  reply:function(e){
    console.log(e)
    var that=this
    var name ="回复："+ e.currentTarget.dataset.comment.nickname
    var id = app.globalData.user_id
    if (id!= e.currentTarget.dataset.comment.user_id){
        that.setData({
          prompt: name,
          to_comment: e.currentTarget.dataset.comment,
          card: true
        })
      }else{
        console.log("不能回复自己")
      }
   
  },
  //点赞
  praise:function(e){
    var that=this
    var num=that.data.num
    num = num+1
    setInterval(function () {
      num = 0
    }, 5000) //循环时间 这里是1秒 
    that.setData({ num: num})
    console.log(num)
    if (num>10){
      wx.showToast({
        title: '操作太频繁',
        icon: 'success',
        duration: 1000
      })
    }else{
      var datas = that.data.details
      console.log(e.currentTarget.dataset.thumbuped)
      if (e.currentTarget.dataset.thumbuped == 1) {
        datas.zan_num--
        datas.thumbuped = 0
        that.setData({ details: datas })
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 1000
        })
      } else {
        datas.zan_num++
        datas.thumbuped = 1
        that.setData({ details: datas })
        wx.showToast({
          title: '点赞成功',
          icon: 'success',
          duration: 1000
        })
      }
      var user_id = app.globalData.user_id
      var timestamp = Date.parse(new Date())
      var display_id = e.currentTarget.dataset.uid
      var token = app.globalData.token
      var signs = "display_id" + display_id + "timestamp" + timestamp + "user_id" + user_id + token
      console.log(e)
      var sign = util.hexMD5(encodeURIComponent(signs))
      modify.praise(user_id, display_id, timestamp, sign)
    }
    
  },
  //收藏
  collect:function(e){
    var that = this
    var datas = that.data.details
    if (datas.collected==0){
      datas.collected = 1
    }else{
      datas.collected = 0
    }
    that.setData({
      details:datas
    })
    let id = e.currentTarget.id
    console.log(id)
    var user_id = app.globalData.user_id
    var timestamp = Date.parse(new Date())
    var display_id = e.currentTarget.dataset.uid
    var token = app.globalData.token
    var signs = "display_id" + display_id + "timestamp" + timestamp + "user_id" + user_id + token
    console.log(e)
    var sign = util.hexMD5(encodeURIComponent(signs))
    modify.collect(user_id, display_id, timestamp, sign)
  },
  //关注
  follows: function (e) {
    var that = this
    var datas = that.data.details
    if (e.currentTarget.dataset.attented == "1") {
      datas.attented = 0
      console.log("取消关注")
      that.setData({ details: datas })
    } else if (e.currentTarget.dataset.attented == "0") {
      datas.attented = 1
      console.log("关注了")
      that.setData({ details: datas })
    }

    var user_id = app.globalData.user_id
    var token = app.globalData.token
    var target_id = e.currentTarget.dataset.uid
    console.log(user_id)
    var timestamp = Date.parse(new Date())

    Api.follow(user_id, target_id, token, timestamp)
  },
  //评论点赞功能

  comment_praise:function(e){
    console.log(e)
    var that=this
    var user_id = app.globalData.user_id
    var token = app.globalData.token
    var comment_id = e.currentTarget.dataset.comment.id
   
    
    var timestamp = Date.parse(new Date())
    var signs = "comment_id" + comment_id  + "timestamp" + timestamp + "user_id" + user_id + token
    console.log(signs)
    var sign = util.hexMD5(encodeURIComponent(signs))
    wx.request({
      url: "https://www.daodianwang.com/Tantou/Social/zanComment",
      data: {
        user_id: user_id,
        timestamp: timestamp,
        sign: sign,
        comment_id: comment_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: res => {
        console.log(res)
        var id = e.target.id
        console.log(id)
        var comment = that.data.comment
        //var comment = e.currentTarget.dataset.comment
        //console.log(details.comment["0"].zan_num)
        if (res.data.msg=="点赞成功"){
          comment[id].zaned=1
           comment[id].zan_num++
                 that.setData({
                   comment: comment
                 })
         }else{
          comment[id].zaned = 0
         comment[id].zan_num--
          that.setData({
            comment: comment
          })
         } 
      }
    })
  },
  jump_homepage:function(e){
    console.log(e.currentTarget.dataset.uid)
    var user_id = app.globalData.user_id
    if (e.currentTarget.dataset.uid==user_id){
            wx.navigateTo({
              url: '../../index/index?personal=0',
            })
    }else{
      wx.navigateTo({
        url: '../../personal/HisHome/HisHome?his_id=' + e.currentTarget.dataset.uid,
      })
    }
  },
   particulars(display_id, user_id, timestamp, sign) {
     var that=this
    console.log(sign)
  wx.request({
      url: 'https://www.daodianwang.com/Tantou/Social/DynDetail',
      data: {
        display_id: display_id,
        user_id: user_id,
        timestamp: timestamp,
        sign: sign
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)

        res.data.result.add_time =
          Api.getDateDiff(res.data.result.add_time * 1000)

        console.log(res.data.result.add_time)
        //wx.setStorageSync('details', res.data.result)
        var details = res.data.result
        console.log(details)
        var comment = details.comment
        var uid = app.globalData.user_id
        var p_number = app.globalData.systemInfo.screenHeight + 100
        that.setData({
          details: details,
          comment: comment,
          uid: uid,
          placeholder:"",
          prompt:"添加评论",
          p_number: p_number,
          page:1
        })
        //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories

      },
      fail: function (err) {
        console.log(err)
      }

    })
  },
   lower : function (e) {
     var that = this
     console.log(e)
     if (that.data.lower =="lower"){
       var display_id = that.data.details.display_id
       var page = that.data.page + 1
       wx.request({
         url: 'https://www.daodianwang.com/Tantou/Social/moreComment',
         data: {
           display_id: display_id,
           page: page
         },
         method: 'POST',
         header: {
           'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
           console.log(res)
           if (res.data.msg == "获取成功") {
             var comment = that.data.comment.concat(res.data.result)
             console.log(comment)
             that.setData({
               page: page,
               comment: comment,
             })
           } else {
             that.setData({
               lower: "upper"
             })
           }
         }
       })
       var st = setTimeout(function () {
         that.setData({
           lower: "lower"
         })
         clearTimeout(st);
       }, 10000);
     }
     
    
     
   },
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
    var that=this
    that.setData({ attented: true })
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
     console.log(11111)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target.dataset.uid)
    }
    return {
      title: "健康分数:" + res.target.dataset.uid.score + "分 \n对焦食物 一探究竟",
      path: '/pages/index/index',
      imageUrl: res.target.dataset.uid.img_url,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})