import weCropper from '../../dist/weCropper.js'
const device = wx.getSystemInfoSync()
var wHeight=wx.getSystemInfoSync().windowHeight * 0.38
Page({
  data: {
  	cropperOpt: {
			id: 'cropper',
			width: device.windowWidth,
			height: device.windowWidth,
      windowWidth: device.windowWidth / 3.75,
			scale: 2.5,
			zoom: 8,
      num:'',
      imgsrc:'',
      model:"",
      path:""
		}
	},
  onLoad: function (options) {
    var that=this
    var Ximg = device.windowWidth / 3.75
    console.log(Ximg)
    const ctx = wx.createCanvasContext('attendCanvasId');
    ctx.drawImage("../image/xiaochengxu.jpg", 0, 0, Ximg, Ximg);
    ctx.draw();
    var st = setTimeout(function () {

      that.prodImageOpt();
      clearTimeout(st);
    }, 3000);
    console.log(options.number)
    var num = options.number
    this.setData({
      num: num,
      wHeight: wHeight,
      duration: 20000
    });

    console.log(this.data.duration)

    const { cropperOpt } = this.data

    new weCropper(cropperOpt)
      .on('ready', function (ctx) {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 2000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })
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
  onReady: function () {
    var id = this.data.num
    if (id == "1") {
      console.log("相册")
      this.uploadTap()
    } else {
      console.log("相机")
      this.upload()
    }
  },
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage () {
   
    var that=this
    this.wecropper.getCropperImage((src) => {
      if (src) {
        that.setData({
          imgsrc:src
        })
        console.log(that.data.imgsrc)
        that.uploadFileOpt(src);        
  
     
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  uploadFileOpt: function (path) {//上传图片
    console.log("开始上传" + path)
    let that = this;
    var st = setTimeout(function () {
    wx.showToast({
      title: '识别中',
      icon: 'loading',
      duration: 20000
      })
    clearTimeout(st);
    }, 100);
    //const uploadTask =
    wx.uploadFile({
        url: 'https://www.daodianwang.com/Tantou/Core/score', //后台上传api路径
        filePath: path,
        method: 'POST',
        name: 'image',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
         
          wx.redirectTo({
            url: '../../../function/health/health?image=' + that.data.imgsrc +"&path="+that.data.path+ '&model=' + encodeURIComponent(res.data),
            success: function (res) {
              wx.hideToast()
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })
           console.log(that.data.model)
         
        },
        fail: function (res) {
          
        },
        complete: function () {
        }
      })
    // uploadTask.onProgressUpdate((res) => {
    //   console.log('上传进度', res.progress)
    //   console.log('已经上传的数据长度', res.totalBytesSent)
    //   console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    // })

  },
  uploadTap: function () {
    const self = this
    
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        console.log(src)
        self.wecropper.pushOrign(src)
     },
     fail(){
       wx.navigateBack({
         url: '../../../index/index',
       })
     }
    })
  },
  upload: function() {
    const self = this
    
    wx.chooseImage({
      count: 1, // 默认9 , 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        console.log(src)
        self.wecropper.pushOrign(src)
      },
      fail() {
        wx.navigateBack({
          url: '../../../index/index',
        })
      }
    })
  }
})
