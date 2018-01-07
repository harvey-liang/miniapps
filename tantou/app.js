//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)
              this.globalData.userInfo = res.userInfo
              this.globalData.avatarUrl = res.userInfo.avatarUrl

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function () {
    console.log("生命周期函数-监听小程序显示的时候触发");
    var that = this

    wx.getSystemInfo({
      success: function (res) {

        that.globalData.systemInfo = res
        typeof cb == "function" && cb(that.globalData.systemInfo)
      }
    })


  },

  getSystemInfo: function (cb) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = res
        typeof cb == "function" && cb(that.globalData.systemInfo)
        console.log(res.system)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        console.log(res.screenWidth)
        console.log(res.screenHeight)
      }
    })
  },

  globalData: {
    mobile:"",
    Login_identifier:false,
    social:null,
    loginInfo: {},
    code: null,
    user_id: null,
    token: null,
    userInfo: null,
    avatarUrl: null,
    system: {},
    systemInfo: {},
    scene_value:0,
    filter: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATsAAAE7CAYAAACi3CbHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA0NTUyNzVBQjU2MTExRTc5MDkxRThDRDZDRkY3MjA2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA0NTUyNzVCQjU2MTExRTc5MDkxRThDRDZDRkY3MjA2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDQ1NTI3NThCNTYxMTFFNzkwOTFFOENENkNGRjcyMDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDQ1NTI3NTlCNTYxMTFFNzkwOTFFOENENkNGRjcyMDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7O2cbwAAADL0lEQVR42uzUQREAMAjAsDGFkzStYAQdcImEPhqv8h+A5a4EgNkBmB2A2QGYHYDZAZgdgNkBmB1gdgBmB2B2AGYHYHYAZgdgdgBmB2B2gNkBmB2A2QGYHYDZAZgdgNkBmB2A2QFmB2B2AGYHYHYAZgdgdgBmB2B2AGYHmB2A2QGYHYDZAZgdgNkBmB2A2QGYHWB2AGYHYHYAZgdgdgBmB2B2AGYHYHaA2QGYHYDZAZgdgNkBmB2A2QGYHYDZAWYHYHYAZgdgdgBmB2B2AGYHYHYAZgeYHYDZAZgdgNkBmB2A2QGYHYDZAZgdYHYAZgdgdgBmB2B2AGYHYHYAZgeYHYDZAZgdgNkBmB2A2QGYHYDZAZgdYHYAZgdgdgBmB2B2AGYHYHYAZgdgdoDZAZgdgNkBmB2A2QGYHYDZAZgdgNkBZgdgdgBmB2B2AGYHYHYAZgdgdgBmB5gdgNkBmB2A2QGYHYDZAZgdgNkBmB1gdgBmB2B2AGYHYHYAZgdgdgBmB2B2gNkBmB2A2QGYHYDZAZgdgNkBmB2A2QFmB2B2AGYHYHYAZgdgdgBmB2B2AGYHmB2A2QGYHYDZAZgdgNkBmB2A2QGYHWB2AGYHYHYAZgdgdgBmB2B2AGYHmB2A2QGYHYDZAZgdgNkBmB2A2QGYHWB2AGYHYHYAZgdgdgBmB2B2AGYHYHaA2QGYHYDZAZgdgNkBmB2A2QGYHYDZAWYHYHYAZgdgdgBmB2B2AGYHYHYAZgeYHYDZAZgdgNkBmB2A2QGYHYDZAZgdYHYAZgdgdgBmB2B2AGYHYHYAZgdgdoDZAZgdgNkBmB2A2QGYHYDZAZgdgNkBZgdgdgBmB2B2AGYHYHYAZgdgdgBmB5gdgNkBmB2A2QGYHYDZAZgdgNkBZicBYHYAZgdgdgBmB2B2AGYHYHYAZgeYHYDZAZgdgNkBmB2A2QGYHYDZAZgdYHYAZgdgdgBmB2B2AGYHYHYAZgdgdoDZAZgdgNkBmB2A2QGYHYDZAZgdgNkBZgdgdgBmB2B2AGYHYHYAZgdgdgBmB5gdgNkBmB2A2QGYHYDZAZgdgNkBmB1gdgBmBzBSCzAA8hEFC6Q+tAwAAAAASUVORK5CYII="
  }
  

})