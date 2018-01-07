
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function gbkUTF8(gbk) {
  if (!gbk) { return ''; }
  var utf8 = [];
  for (var i = 0; i < gbk.length; i++) {
    var s_str = gbk.charAt(i);
    if (!(/^%u/i.test(escape(s_str)))) { utf8.push(s_str); continue; }
    var s_char = gbk.charCodeAt(i);
    var b_char = s_char.toString(2).split('');
    var c_char = (b_char.length == 15) ? [0].concat(b_char) : b_char;
    var a_b = [];
    a_b[0] = '1110' + c_char.splice(0, 4).join('');
    a_b[1] = '10' + c_char.splice(0, 6).join('');
    a_b[2] = '10' + c_char.splice(0, 6).join('');
    for (var n = 0; n < a_b.length; n++) {
      utf8.push('%' + parseInt(a_b[n], 2).toString(16).toUpperCase());
    }
  }
  return utf8.join('');
};  
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function CollectPictures(e) {
  wx.navigateTo({
    url: '../personal/CollectPictures/CollectPictures'
  })
}
function MyDynamic(e) {
  wx.navigateTo({
    url: '../personal/MyDynamic/MyDynamic'
  })
}
function Visitor(e){
  wx.navigateTo({
    url: '../personal/Visitor/Visitor',
  })
}
//util.js 
function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width;//图片原始宽 
  var originalHeight = e.detail.height;//图片原始高 
  var originalScale = originalHeight / originalWidth;//图片高宽比 
  console.log('originalWidth: ' + originalWidth)
  console.log('originalHeight: ' + originalHeight)
  //获取屏幕宽高 
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth;//屏幕高宽比 
      console.log('windowWidth: ' + windowWidth)
      console.log('windowHeight: ' + windowHeight)
      if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比 
        //图片缩放后的宽为屏幕宽 
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      } else {//图片高宽比大于屏幕高宽比 
        //图片缩放后的高为屏幕高 
        imageSize.imageHeight = windowHeight;
        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }

    }
  })
  console.log('缩放后的宽: ' + imageSize.imageWidth)
  console.log('缩放后的高: ' + imageSize.imageHeight)
  return imageSize;
}
 
//数据转化  
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimes(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
} 

// util.js  
//时间戳转换成日期时间  
function getDateDiff(dateTimeStamp) {
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  

  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    if (monthC <= 12)
      // var dateta = new Date(dateTimeStamp)
      // var month = dateta.getMonth() + 1;
      // var date = dateta.getDate();

      // dateta = month + "月" + date + "日";

      // console.log(dateta)
      result = "" + parseInt(monthC) + "月前";
    else {
      // var dateta = new Date(dateTimeStamp)
      // var year = dateta.getFullYear();
      // var month = dateta.getMonth() + 1;
      // var date = dateta.getDate();
      // var hour = dateta.getHours();
      // var minute = dateta.getMinutes();
      // var second = dateta.getSeconds();

      // dateta = year + "年" + month + "月" + date + "日";

      // console.log(dateta)
      result = "" + parseInt(monthC / 12) + "年前";
    }
  }
  else if (weekC >= 1) {
     var dateta = new Date(dateTimeStamp)
      var month = dateta.getMonth() + 1;
      var date = dateta.getDate();

      dateta = month + "月" + date + "日";

      console.log(dateta)
      result = dateta;
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }

  return result;
};
function follow(user_id, target_id, token, timestamp) {
  var util = require('MD5.js'); 
  var signs = "target_id" + target_id + "timestamp" + timestamp + "user_id" + user_id + token
  console.log(signs)
  var sign = util.hexMD5(encodeURIComponent(signs))
  var data = {
    "target_id": target_id,
    "timestamp": timestamp,
    "user_id": user_id,
    "sign": sign,
  }
  wx.request({
    url: 'https://www.daodianwang.com/Tantou/Social/attent',
    data: {
      user_id: data.user_id,
      timestamp: data.timestamp,
      target_id: data.target_id,
      sign: data.sign,
    },
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
    
    },
    fail: function (err) {
      console.log(err)
    }

  })
};
// 热门列表信息获取
function Hot_access(){
  var app=getApp()
  var util = require('MD5.js'); 
  var user_id = app.globalData.user_id
  var token = app.globalData.token
  var timestamp = Date.parse(new Date())
  var signs = "page" + "1" + "timestamp" + timestamp + "type" + "recom" + "user_id" + user_id + token
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
      console.log(res)
      for (var i = 0; i < res.data.result.length; i++) {
        res.data.result[i].add_time =
          getDateDiff(res.data.result[i].add_time * 1000)

      }
      console.log(res.data.result)
      wx.setStorageSync('datas', res.data.result)
   
      
      //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
     
    },
    fail: function (err) {
      console.log(err)
    }

  })
};

// 动态详情
function particulars(display_id, user_id, timestamp, sign){
  console.log(sign)
  var app=getApp()
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
        try{
          res.data.result.add_time =
            getDateDiff(res.data.result.add_time * 1000)
        }catch(e){
          res.data.result.add_time =""
        }
       wx.setStorageSync('details', res.data.result)
       if (app.globalData.scene_value == 0){
         wx.navigateTo({
           url: '../sociality/MoveDetails/MoveDetails?details=' + encodeURIComponent(JSON.stringify(res.data.result)),
         })
       } else if (app.globalData.scene_value == 1){
        wx.navigateTo({
          url: '../../sociality/MoveDetails/MoveDetails?details=' + encodeURIComponent(JSON.stringify(res.data.result)),
        })
        }else{
         wx.navigateTo({
           url: '../MoveDetails/MoveDetails?details=' + encodeURIComponent(JSON.stringify(res.data.result)) +"&attented=0",
         })
        }

      //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories

    },
    fail: function (err) {
      console.log(err)
    }

  })
};
module.exports = {
  formatTime: formatTime,
  imageUtil: imageUtil,
  CollectPictures: CollectPictures,
  MyDynamic: MyDynamic,
  gbkUTF8: gbkUTF8,
  getDateDiff: getDateDiff,
  formatTimes: formatTimes,
  Visitor: Visitor,
  follow: follow,
  Hot_access: Hot_access,
  particulars: particulars
}
