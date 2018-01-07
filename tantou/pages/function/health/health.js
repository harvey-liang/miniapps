
var imageUtil = require('../../../utils/util.js');
var systemInfos = wx.getSystemInfoSync()
var app = getApp()
Page({

  data: {
    systemInfo: systemInfos,
    height: systemInfos.windowWidth * 1.208,
    path: "",
    open: true,
    hide: true,
    animationData: {},
    system:{},
    num:"",
    imgsrc:"",
    fraction:'fraction',
    post:'',
    windowWidth:0,
    windowHeight:0,
    sHeight:0,
    promptmessage:"分",
    //这不是食物哦！亲
    message_boxs:"bright789_view_hide",
    container:'bright789_view_hide',
    food: [],
    activeIndex: -1,
    dishes:'',
    hidden: true,
    nocancel: true,
    filePath:""
  },
onLoad: function(option) {
  // decodeURIComponent()
    var that = this;
    var models = decodeURIComponent(option.model);
   var model = JSON.parse(models)

  that.setData({
    imgsrc: option.image,
    filePath: option.path,
    dishes: model.status
  })
  
  if (model.status=="0"){
    this.setData({
      hide: false,
      promptmessage:"这不是食物哦！亲",
      fraction:"fractions"
    })
  }else{
    that.setData({
      food: model.result.food,
      post: model.result.score
    })
  }
 
  that.drawCanvas();
    
  
 
  // //调用应用实例的方法获取全局数据
  console.log(that.data.system)
  wx.getSystemInfo({
    success: function (res) {
      var system = res.model
      var windowWidth=res.windowWidth;
      var sHeight=res.windowHeight;
      var pixelRatio=res.pixelRatio;
      var Height = res.screenHeight;
      var Width = res.windowWidth;
      var model=res.model;
            that.setData({
              system: system,
              sHeight: sHeight,
              windowWidth: windowWidth,
              windowHeight: Height,
            })   
            console.log(system)     
       }
    }) 
  // console.log(that.data.imgsrc)
    

},
cancel: function () {
  this.setData({
    hidden: false
  });
},
cancels: function () {
  this.setData({
    hidden: true
  });
},
confirm: function () {
  this.cancels()
  wx.openSetting({
    success(settingdata) {

      console.log(settingdata)
      if (settingdata.authSetting['scope.writePhotosAlbum']) {
        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1000
        })
        
        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')

      } else {
        wx.showToast({
          title: '设置失败',
          image: '../image/cha.png',
          duration: 1000
        })
        this.setData({
          hidden: true
        });
        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
      }
      
    }
    
  })
},
active: function (e) {
  var index = this.data.activeIndex
  var active = e.currentTarget.id
  if (index == active) {
    this.setData({
      activeIndex: "-1"
    })
  } else {
    this.setData({
      activeIndex: e.currentTarget.id
    })
  }
},
  show_dishes:function(){
    var that=this;
    var dishes = that.data.dishes
    console.log(dishes)
    if (dishes=="1"){
      that.setData({
        container: 'container',
        open:true
      })
    }else{
      wx.showToast({
        title: '图中无食物',
        image: '../image/cha.png',
        duration: 1000
      })
    }
  },
 
  shut_down:function(){
    var that = this;
    that.setData({
      open:false,
      container: 'bright789_view_hide'
    })
  },
imageLoad: function (e) {
  var that=this
  var blank ="http://img2.ph.126.net/r057HhH8XQDRU8e9JEyquw==/2607584184265989311.png";
  var background = "http://www.daodianwang.com/App/xiaochengxu/lankuang123.png";
  var originalWidth = e.detail.width;//图片原始宽 
  var originalHeight = e.detail.height;//图片原始高 
  console.log(originalWidth + "图片原始宽" + originalHeight +"图片原始高")
  var originalScale = originalHeight / originalWidth;//图片高宽比 
  var originalScales = originalWidth / originalHeight; 
  },
   
  
 //图片自适应
  saves:function(e){
    var that = this 
    
    var system=that.data.system.substring(0, 1)
    console.log(system)
    var tempFilePaths = that.data.path
    var message_boxs = "message_boxs"
    var hide ="bright789_view_hide"
        console.log(tempFilePaths)
        wx.getSetting({
          success(res){
            console.log(res)
              if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({ 
                scope: 'scope.writePhotosAlbum',
                success(res) {    
                  console.log(res)
                  console.log("授权成功")
                  wx.saveImageToPhotosAlbum({
                    filePath: tempFilePaths,
                    success(res) {
                      console.log(res)
                    }
                  })
                }, 
                fail(){
                  that.cancel()
                  console.log("授权失败")
                }
              })
              }else{
                wx.saveImageToPhotosAlbum({
                  filePath: tempFilePaths,
                  success(res) {
                    console.log(res)
                  }
                })
                // 用户已经同意小程序使用保存图片功能，后续调用 wx.writePhotosAlbum 接口不会弹窗询问                             
                if (system == "i") {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 1000
                  });
                  console.log(system)
                  console.log("成功");
                }
              }
          }
        })   
        setTimeout(function () {
          that.setData({
            message_boxs: hide
          });
          that.update();
        }, 2000); 
       
},
  //  保存图片
  publish_event:function() {
    var that=this
    var dishes = that.data.dishes
   
    if (dishes=="1"){
      if (app.globalData.mobile == "") {
        wx.navigateTo({
          url: '../MobileBinding/MobileBinding',
        })
      }else{
        wx.navigateTo({
          url: '../description/description?image=' + that.data.imgsrc + "&post=" + that.data.post
        })
      }
    }else{
      wx.showToast({
        title: '无分数',
        image: '../image/cha.png',
        duration: 1000
      })
    }
   
  },
    //发布图片 
  previewImage:function(){
    var src = this.data.path
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  }, 
  //预览图片
  drawCanvas(){
    let that = this;
    var imgsrc=that.data.imgsrc
    var filePath = that.data.filePath
    var score=that.data.post
    var dishes = that.data.dishes
    const ctx = wx.createCanvasContext('attendCanvasId');
    var systemInfo = that.data.systemInfo
    var windowWidth = systemInfo.windowWidth
    var mWidth = windowWidth * 0.04
    var imgWidth = windowWidth * 0.7333
    var xWidth = windowWidth * 0.08
    var xHeight = windowWidth * 0.8133
    var Ximg = windowWidth / 3.75
    ctx.save();
    ctx.setFillStyle('#ffffff')
    ctx.fillRect(0, 0, windowWidth / 1.2295, windowWidth * 1.208)
    ctx.restore();
    ctx.drawImage(imgsrc, mWidth, mWidth, imgWidth, imgWidth);
    ctx.drawImage(filePath, xWidth, xHeight, Ximg, Ximg);
    if (dishes == "0") {
      ctx.setFontSize(22);
      ctx.setTextAlign('right');
      ctx.fillText('亲，这...', windowWidth / 1.4423, windowWidth / 1.1194);
      ctx.setFontSize(28);
      ctx.setTextBaseline('bottom')
      ctx.fillText("不 是", windowWidth * 0.65, windowWidth * 1.0)
      ctx.fillText("食 物", windowWidth * 0.65, windowWidth * 1.08)
    }else{
      ctx.setFontSize(22);
      ctx.setTextAlign('right');
      ctx.fillText('健康分数', windowWidth / 1.4423, windowWidth / 1.1194);
      ctx.setFontSize(50);
      ctx.setTextBaseline('bottom')
      ctx.fillText(score, windowWidth * 0.65, windowWidth * 1.08)
    }
   
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
  prodImageOpt: function () {// 获取生成图片路径
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
  //加载动画
onHide: function () {
  // 页面隐藏
},
onUnload: function () {
  // 页面关闭
},
/**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '对焦食物 一探究竟',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  jump_play: function () {
    wx.navigateTo
    ({
       url: '/pages/bounty/bounty',
     })
  }
})

  


