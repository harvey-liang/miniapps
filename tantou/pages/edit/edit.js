// pages/edit/edit.js
const app = getApp()
var imageUtil = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pHeight: app.globalData.systemInfo.windowWidth,
    IWidth:0,
    IHeight:0,
    imgsrc:'',
    num:'',
    scroll_x:'true',
    scroll_y:'true',
    x:0,
    y:0,
    newmark: 0,
    startmark: 0,
    endmark: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      num: options.image,
    });
    var num = this.data.num;
    var imgsrc = num.substring(2, num.length - 2);
    var data = data;
    this.setData({
      imgsrc: imgsrc,
    }); 
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
  imageLoad:function(e){
    var that = this
    var windowWidth = app.globalData.systemInfo.windowWidth
    console.log(windowWidth)
    var originalWidth = e.detail.width;//图片原始宽 
    var originalHeight = e.detail.height;//图片原始高  
    console.log(originalWidth + "图片原始宽" + originalHeight + "图片原始高")
    var originalScale = originalHeight / originalWidth;//图片高宽比 
    var originalScales = originalWidth / originalHeight;
    console.log(originalScale + "图片原始宽" + originalScales + "图片原始高")
    if (originalScale < 1){
      console.log(windowWidth+"1")
      if (originalHeight > windowWidth){
        console.log(windowWidth + "2")
        that.setData({
          IHeight: windowWidth,
          IWidth: windowWidth / originalScale,
          scroll_x:'false'
        }) 
      } else{
        console.log(windowWidth + "3")
        that.setData({
          IHeight: windowWidth,
          IWidth: windowWidth / originalScale,
          scroll_x: 'false'
        }) 
      }
    
    } else if (originalScales < 1){
      console.log(windowWidth + "4")
      if (originalWidth > windowWidth){
        console.log(windowWidth + "5")
        that.setData({
          IWidth: windowWidth,
          IHeight: windowWidth / originalScales,
          scroll_y: 'false'
        }) 
      } else{
        console.log(windowWidth + "6")
        that.setData({
          IWidth: windowWidth,
          IHeight: windowWidth / originalScales,
          scroll_y: 'false'
        }) 
      }
     
      
    }
  },
  tap_start: function (e) {
    var that = this
    var mark = e.currentTarget.scroll-top.scrollY.toString
    this.data.startmark = e.touches[0].clientY;
    console.log(mark)
  },

  tap_drag: function (e) {
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].clientY;
    console.log(this.data.newmark)
    
  },

  tap_end: function (e) {
  
    if (this.data.newmark - this.data.startmark>0){
      this.data.endmark = this.data.newmark - this.data.startmark
      this.setData({
        endmark: this.data.endmark
      })
      console.log(this.data.endmark)
    }else{
      this.data.endmark = this.data.startmark - this.data.newmark
      this.setData({
        endmark: this.data.endmark
      })
      console.log(this.data.endmark)
    }
    
   
   
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