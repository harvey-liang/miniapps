// pages/personal/personals/personals.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    arrow:"../image/jiantou.png",
    functions:[
        {
          icon:'../image/guanyutantou.png',
          text:"关于探头"
        },
        {
          icon: '../image/lianxikefu.png',
          text: "联系客服"
        },
        {
          icon: '../image/tuichudenglu.png',
          text: "退出登录"
        }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //导航按钮事件
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    switch (e.currentTarget.dataset.idx) {
      case 0:
        this.setData({
          navbar: this.data.icon0
        })
        console.log("0");
        break;
      case 1:
        this.setData({
          navbar: this.data.icon1
        })
        console.log("1");
        break;
      case 2:
        this.setData({
          navbar: this.data.icon2
        })
        console.log("2");
        break;
      default:
        console.log("default");
    }
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