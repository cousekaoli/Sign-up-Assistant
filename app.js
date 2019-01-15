//app.js

// var config = require('comm/script/config')

App({
  globalData:{

    
  },
  onLaunch: function () {

    // 获取用户信息
    this.getUserInfo()
    //初始化缓存
    this.initStorage()
    try {
      const res = wx.getSystemInfoSync()
      this.globalData.windowHeight = res.windowHeight,
      this.globalData.windowWidth = res.windowWidth
    } catch (e) {
      // Do something when catch error
    }
   
  },

  getUserInfo: function (cb) {
    var that = this
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
  },
 
})