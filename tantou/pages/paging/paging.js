// pages/test/test.js
const app=getApp()
var systemInfos = wx.getSystemInfoSync()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: systemInfos,
    height: systemInfos.windowWidth*1.208,
    path:"",
    imgsrc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(that.data.systemInfo)
    
     that.drawCanvas()
  },
  drawCanvas() {  
    let that = this;

    var imgsrc = that.data.imgsrc
    const ctx = wx.createCanvasContext('attendCanvasId');
    var systemInfo = that.data.systemInfo
    var windowWidth = systemInfo.windowWidth
    var mWidth = windowWidth * 0.04
    var imgWidth =windowWidth * 0.7333
    var xWidth =windowWidth * 0.08
    var xHeight =windowWidth * 0.8133
    var Ximg = windowWidth / 3.75
    ctx.save();
    ctx.setFillStyle('#ffffff')
    ctx.fillRect(0, 0, windowWidth / 1.2295, windowWidth * 1.208)
    ctx.restore()
    ctx.drawImage("../image/test.jpg", mWidth, mWidth, imgWidth, imgWidth);
    ctx.drawImage("../image/xiaochengxu.jpg", xWidth, xHeight, Ximg, Ximg);
    ctx.setFontSize(22);
    ctx.setTextAlign('right');
    ctx.fillText('健康分数', windowWidth /1.4423, windowWidth/1.1194);
    ctx.setFontSize(50);
    ctx.setTextBaseline('bottom')
    ctx.fillText('66', windowWidth * 0.65, windowWidth*1.08)
    ctx.setFontSize(13);
    ctx.setTextAlign('center');
    ctx.setTextBaseline('bottom')
    ctx.fillText('探头  |  长按识别二维码  |  对焦食物  一探究竟', windowWidth * 0.4, windowWidth * 1.16)
    ctx.draw();
    //等待压缩图片生成
    var st = setTimeout(function () {

      that.prodImageOpt();
      clearTimeout(st);
    }, 3000);

  },
  prodImageOpt: function () {// 获取压缩图片路径
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      success: function success(res) {
        console.log(res)
        that.setData({
          path: res.tempFilePath
        })
          console.log(that.data.path)
      },
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