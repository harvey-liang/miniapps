// pages/probering/probering.js
var Api = require('../../../utils/util.js');
var util = require('../../../utils/MD5.js'); 
const ImgLoader = require('../img-loader/img-loader.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight:0,
    windowWidth:0,
    userInfo: {},
    text: "",
    datas: [],
    page:1,
    fen:"分",
    Loading:true,
    num:0,
    img_url:'',
    icon:[],
    follow:"",
    uid:"",
    
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      uid: app.globalData.user_id
    })
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var screenHeight = res.windowWidth * 1.6;
        that.setData({
          windowWidth: windowWidth ,
          screenHeight: screenHeight
        })
      }
    })
   
  },
 
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
 
  //监听图片加载
  imageOnLoad : function(e){
    var that = this
    var num=that.data.num+1
    var page = that.data.page*10
    if (num >= page || page<=10){
      that.setData({
        Loading: false
      })  
    }
    else{
      that.setData({
        num: num,
      })
    }
  },
  imageOnLoadError:function(e){
  
      console.log("获取数据失败")
  },
  praise:function(e){
    let id = e.currentTarget.id
    console.log(id)
    var user_id = app.globalData.user_id
    var timestamp = Date.parse(new Date())
    var display_id = e.currentTarget.dataset.uid
    var token = app.globalData.token
    var signs = "display_id" + display_id + "timestamp" + timestamp + "user_id" + user_id + token
    console.log(e)
    var sign = util.hexMD5(encodeURIComponent(signs))
    var that = this
    wx.request({
      url: 'https://www.daodianwang.com/Tantou/Social/thumbUp',
      data: {
        user_id:user_id,
        timestamp: timestamp,
        display_id: display_id,
        sign:sign,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var datas = that.data.datas
        if (res.data.result.thumbup==1){
          let zan_num = datas[id].zan_num++
          console.log(zan_num)
          that.setData({ datas: datas })
          wx.showToast({
            title: '点赞成功',
            icon: 'success',
            duration: 1000
          })
        }else{
          let zan_num = datas[id].zan_num--
          console.log(zan_num)
          that.setData({ datas: datas })
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1000
          })
        }
        console.log(res)
       
       
      },
      fail: function (err) {
        console.log(err)
      }

    })
  },
  //点赞功能
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var user_id = app.globalData.user_id
    var token = app.globalData.token
    var timestamp = Date.parse(new Date())
    var signs = "page" + "1" + "timestamp" + timestamp + "type" +"recom"+ "user_id" + user_id + token
    console.log(signs)
    var sign = util.hexMD5(encodeURIComponent(signs))
    wx.request({
      url: 'https://www.daodianwang.com/Tantou/Social/dynamic',
      data: {
        type: 'recom',
        page: "1",
        timestamp: timestamp,
        user_id: user_id,
        sign: sign
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
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
    app.globalData.scene_value = 2
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
    console.log('--------下拉刷新-------')
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    // wx.startPullDownRefresh()
    var that = this
    wx.request({
      url: 'https://www.daodianwang.com/Tantou/Social/dynamic',
      data: {
        type: 'recom',
        page: "1",
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
       // console.log(res.data.result)
        for (var i = 0; i < res.data.result.length; i++) {
         // console.log(res.data.result[i].add_time)
          res.data.result[i].add_time =
            Api.getDateDiff(res.data.result[i].add_time * 1000)

         // console.log(res.data.result[i].add_time)
        }
        that.setData({
          datas: res.data.result
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        console.log(111111111111)
        // complete
       

      }
    }) 
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var page = that.data.page + 1
    console.log((that.data.datas.length) % 10)
    if ((that.data.datas.length)%10==0){
      console.log('--------上拉刷新-------')
      wx.showNavigationBarLoading() //在标题栏中显示加载
      wx.request({
        url: 'https://www.daodianwang.com/Tantou/Social/dynamic',
        data: {
          type: 'recom',
          page: page,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
       //   console.log(res.data.result)
          for (var i = 0; i < res.data.result.length; i++) {
          //  console.log(res.data.result[i].add_time)
            res.data.result[i].add_time =
              Api.getDateDiff(res.data.result[i].add_time * 1000)

          //  console.log(res.data.result[i].add_time)
          }
          var result = res.data.result
        //  console.log(result)
          that.setData({
            page: page,
            datas: that.data.datas.concat(result)
          })
       //   console.log(that.data.datas)

          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        //  console.log(res.data.result)
        },
        fail: function (err) {
          console.log(err)
        },
        complete: function () {
          // complete
          wx.hideNavigationBarLoading() //完成停止加载
        }
      })
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that=this
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
  share:function(e){
    var that=this
    console.log(e.currentTarget.dataset.uid.img_url) 
   
  }
})