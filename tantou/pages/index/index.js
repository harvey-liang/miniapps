//index.js
//获取应用实例
var Api = require('../../utils/util.js');
var util = require('../../utils/MD5.js'); 
var modify = require('../../utils/modify.js'); 
var app=getApp()
Page({
  data: {
    preloading: false,
    datas: [],
    headpic:false,
    Loading: false,
    fen: "分",
    windowWidth: 0,
    disjunctor: false,
    social:"my",
    circle:'circle',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    attention:0,
    fans:0,
    currentTab: 1,
    page: 1,
    navbar: ['../image/remen.png', '../image/shouyez.png', '../image/wode.png'],
    icon0: ['../image/remenz.png', '../image/shouye.png', '../image/wode.png'],
    icon1: ['../image/remen.png', '../image/shouyez.png', '../image/wode.png'],
    icon2: ['../image/remen.png', '../image/shouye.png', '../image/wodez.png'],
    arrow: "../image/jiantou.png",
    functions: [
      {
        icon: '../image/guanyutantou.png',
        text: "关于探头"
      },
      {
        icon: '../image/lianxikefu.png',
        text: "联系客服"
      },
      {
        icon: '../image/tuichudenglu.png',
        text: "退出登录"
      }
    ]
  },
  onLoad: function (options) {
    var that = this
    var Login_identifier = app.globalData.Login_identifier
    wx.getSetting({
      success: res => {
     
          if (Login_identifier == true || res.authSetting['scope.userInfo']) {
          console.log(1)
          that.setData({
            social: "my"
          })
          //没有登录，跳转到授权登录页面
        } else {
          //已经登录了，直接跳转探头圈页面
          console.log(2)

            that.setData({
              social: "authorize"
            })
        }
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res)
        app.globalData.systemInfo = res
        var windowWidth = res.windowWidth;
        that.setData({
          windowWidth: windowWidth,
        })
      }
    })
    if (options.personal==0){
      wx.setNavigationBarTitle({
        title: "我的"
      })
      that.setData({
        navbar: that.data.icon2,
        currentTab:2

      })
    }
  },
  preloading(even) {
    console.log(even)
    this.setData({
      preloading: true
    })
  },
  onShow:function(){
    var that=this
    var Login_identifier = app.globalData.Login_identifier
    if (Login_identifier==true){
      that.setData({
        social: "my"
      })
    }else{

        that.setData({
          social: "authorize"
        })
      
    }
     
  },
  onReady: function () {
    var that = this
    that.my_social()
    //探头后台自动登录调取用户信息
    wx.login({
      success: res => {
        console.log(res.code)
        wx.request({
          url: 'https://www.daodianwang.com/Tantou/Account/login',
          data: {
            login_type: "xiaochengxu",
            code: res.code
          },
          method: 'GET',
          success: res => {
            console.log(res)
            if (res.data.result.mobile==""){
              app.globalData.user_id = res.data.result.user_id
              app.globalData.token = res.data.result.token
              Api.Hot_access()
                   wx.navigateTo({
                     url: '../function/MobileBinding/MobileBinding',
                   })
            } else{

              app.globalData.loginInfo = res.data.result
              app.globalData.Login_identifier = true
              app.globalData.user_id = res.data.result.user_id
              app.globalData.token = res.data.result.token
              app.globalData.mobile = res.data.result.mobile
              Api.Hot_access()
              var loginInfo = res.data.result
              var userInfo = app.globalData.userInfo
              
              if (loginInfo.nickname == "" || loginInfo.headpic == "") {
                console.log("hahaahaah")
                modify.nickname(loginInfo.user_id, loginInfo.token, userInfo.nickName)
                modify.headpic(loginInfo.user_id, loginInfo.token, userInfo.avatarUrl)
              }
            }
           
            that.setData({
              attention: res.data.result.attention,
              fans: res.data.result.fans,
              Loading: false
            })
          }
        })
      }
    })

  },
  cancel:function(e){
        this.setData({
          disjunctor:false
        })
  },
  confirm:function(e){
    this.setData({
      disjunctor: false
    })
  },
  //我的动态跳转
  MyDynamic:function(e){
    Api.MyDynamic()
  },
  //收藏图片跳转
  collection:function(e){
    Api.CollectPictures()
  },
  Visitor:function(){
    Api.Visitor()
  },
  //事件处理函数
  bindViewTap: function() {

  },

  //导航按钮事件
  navbarTap: function (e) {
    var that=this
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    switch (e.currentTarget.dataset.idx) {
      case 0:
        
        var datas = wx.getStorageSync('datas')
        console.log(datas)
        wx.setNavigationBarTitle({
          title: "热门"
        })
        that.setData({
          datas: datas,
          navbar: that.data.icon0,
          disjunctor: false
        })
        
        console.log("0");
        break;
      case 1:
        wx.setNavigationBarTitle({
          title: "首页"
        })
        that.setData({
          navbar: that.data.icon1,
          disjunctor: false
        })
        
        console.log("1");
        break;
      case 2:
        wx.setNavigationBarTitle({
          title: "我的"
        })
        that.setData({
          navbar: that.data.icon2

        })
       
        console.log("2");
        break;
      default:
        console.log("default");
    }
  },
  //退出登录，客服，关于探头的选择器事件
  polynomeTap:function(e){
    var that = this
    var idx = e.currentTarget.dataset.idx
    switch (e.currentTarget.dataset.idx) {
      case 0:
       
        console.log("0");
        break;
      case 1:
        that.setData({
          disjunctor: true
        })
        console.log("1");
        break;
      case 2:
        app.globalData.Login_identifier=false
        wx.setNavigationBarTitle({
          title: "首页"
        })
        that.setData({
          social: "authorize",
          currentTab:1,
          navbar: that.data.icon1
        })
        console.log("2");
        break;
      default:
        console.log("default");
    }
  },
  //点击按钮获取用户信息
  getUserInfo: function (e) {
    var loginInfo = app.globalData.loginInfo
    var data = e.detail.userInfo
    var that = this
    console.log(e)
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']  ) {
            if (app.globalData.mobile == ""){
              wx.navigateTo({
                url: '../function/MobileBinding/MobileBinding',
              })
            }else{
              
              if (loginInfo.nickname == "" || loginInfo.headpic == "")                            {
                modify.nickname(loginInfo.user_id, loginInfo.token, data.nickName)
                modify.headpic(loginInfo.user_id, loginInfo.token, data.avatarUrl)
              }
              app.globalData.Login_identifier = true
              app.globalData.userInfo = e.detail.userInfo
              that.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: false,
                social: "my"
              })
            }
            //console.log(e.detail.userInfo)
          } else {
            this.setData({
              hasUserInfo: false,
              social: "authorize"
            })
            
          }
        }
      })
  },
  //拒绝授权返回
  refuse: function (e) {
    wx.setNavigationBarTitle({
      title: "首页"
    })
    this.setData({
      navbar: this.data.icon1,
      currentTab:1
    })
  },
  //查看详情
  look_up:function (e) {
    app.globalData.scene_value = 0
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

   my_social(){
  var that = this
  //获取用户信息的多方案处理
  if (app.globalData.userInfo) {
    console.log(app.globalData.userInfo)
    that.setData({
      userInfo: app.globalData.userInfo,
    })
  } else if (this.data.canIUse) {
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    app.userInfoReadyCallback = res => {
      console.log(res)
      that.setData({
        userInfo: res.userInfo,
      })
    }
  } else {
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        that.setData({
          userInfo: res.userInfo,
        })
      }
    })
  }
   },
  //授权登录和跳转
  jump_social(){
    var that = this
    var social = that.data.social
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userInfo'])
        if (!res.authSetting['scope.userInfo'] || app.globalData.Login_identifier==false) {
          console.log(1)
          wx.navigateTo({
            url: '../function/WeChatLicense/WeChatLicense',
          })
          //没有登录，跳转到授权登录页面
        }else {
          that.setData({
             social:"my"
          })
             //已经登录了，直接跳转探头圈页面
          wx.navigateTo({
            url: '../sociality/attention_circle/attention_circle',
          })
        }
      }
    })
  },

  //跳转裁剪页面调取相机
  camera_retrieval:function(e){
    wx.navigateTo({
      url: '../we-cropper-master/example/normal/normal?number=2',
      success: function (res) {

      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },
    //跳转裁剪页面调取相册
  album_retrieval: function (e) {
    wx.navigateTo({
      url: '../we-cropper-master/example/normal/normal?number=1',
      success: function (res) {
          
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },
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
    if ((that.data.datas.length) % 10 == 0) {
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
            //console.log(res.data.result)
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
  jump_homepage: function (e) {
    console.log(e.currentTarget.dataset.uid)
    var that=this
    var user_id = app.globalData.user_id
    if (e.currentTarget.dataset.uid == user_id) {
      wx.setNavigationBarTitle({
        title: "我的"
      })
      that.setData({
        navbar: that.data.icon2,
        currentTab:2
      })
    } else {

      wx.navigateTo({
        url: '../personal/HisHome/HisHome?his_id=' + e.currentTarget.dataset.uid,
      })
    }
  },
  jump_attention:function(){
    wx.navigateTo({
      url: '../personal/attention_page/attention_page',
    })
  },
  jump_vermicelli: function () {
    wx.navigateTo({
      url: '../personal/vermicelli_page/vermicelli_page',
    })
  }
})
