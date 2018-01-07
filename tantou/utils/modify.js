//设置昵称
function nickname(user_id, token, nickname){
  var util = require('MD5.js'); 
  var timestamp = Date.parse(new Date())
  var signs = "nickname" + nickname + "timestamp" + timestamp
    + "user_id" + user_id + token
  console.log(signs)
  var sign = util.hexMD5(encodeURIComponent(signs))
  wx.request({
    url: 'https://www.daodianwang.com/Tantou/Account/editMyInfo',
    data: {
      nickname: nickname,
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
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
//更换头像
function headpic(user_id, token, headpic){
  
  wx.downloadFile({
    url: headpic, //仅为示例，并非真实的资源
    success: function (res) {
      console.log(res.tempFilePath)
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      var util = require('MD5.js');
      var timestamp = Date.parse(new Date())
      var signs = "timestamp" + timestamp
        + "user_id" + user_id + token
      console.log(signs)
      var sign = util.hexMD5(encodeURIComponent(signs))
            wx.uploadFile({
              url: 'https://www.daodianwang.com/Tantou/Account/headPic',
              filePath: res.tempFilePath,
              name: "headpic",
              formData: {
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
              },
              fail: function (err) {
                console.log(err)
              }
            })
          }
        })
}
function praise(user_id, display_id, timestamp, sign){
  wx.request({
    url: 'https://www.daodianwang.com/Tantou/Social/thumbUp',
    data: {
      user_id: user_id,
      timestamp: timestamp,
      display_id: display_id,
      sign: sign,
    },
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res)
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
function collect(user_id, display_id, timestamp, sign){
  wx.request({
    url: 'https://www.daodianwang.com/Tantou/Social/collect',
    data: {
      user_id: user_id,
      timestamp: timestamp,
      display_id: display_id,
      sign: sign,
    },
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res)
      if (res.data.result.collect==1){
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 1000
        })
      }else{
        wx.showToast({
          title: '已取消收藏',
          icon: 'success',
          duration: 1000
        })
      }
   
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
function particulars(display_id, user_id, timestamp, sign) {
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
        getDateDiff(res.data.result.add_time * 1000)


      console.log(res.data.result.add_time)
      //wx.setStorageSync('details', res.data.result)
      wx.navigateTo({
        url: '../sociality/MoveDetails/MoveDetails?details=' + encodeURIComponent(JSON.stringify(res.data.result)),
      })

      //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories

    },
    fail: function (err) {
      console.log(err)
    }

  })
};
module.exports = {
  headpic: headpic,
  nickname: nickname,
  praise: praise,
  collect: collect
}