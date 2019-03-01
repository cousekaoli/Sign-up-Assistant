//app.js

// var config = require('comm/script/config')
//var config = require('comm/script/config')
App({
  //登录后可从后台获得的信息
  serverUrl: "https://1aad74f2.ngrok.io", // 服务器地址
  userInfo: null, // 用户信息
  userId: null, // 用户认证编号

  /*设置用户ID */
  setGlobalUserId: function (userId) {
    wx.setStorageSync("userId", userId);
  },

  /*获取用户ID*/
  getGlobalUserId: function (userId) {
    return wx.getStorageSync("userId");
  },

  /*设置用户信息 */
  setGlobalUserInfo: function (user) {
    wx.setStorageSync("userInfo", user);
  },

  /*获取用户信息 */
  getGlobalUserInfo: function () {
    return wx.getStorageSync("userInfo");
  },

  globalData:{
    userInfo: null

    
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
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      
    }
  },
  
  initStorage: function(){
    wx.getStorageInfo({
      success: function (res) {
        
        var personInfo = {
          name: '',
          nickName: '',
          gender: '',
          age: '',
          birthday: '',
          constellation: '',
          company: '',
          school: '',
          tel: '',
          email: '',
          intro: ''
        }
        // 判断个人信息是否存在，没有则创建
        if (!('person_info' in res.keys)) {
          wx.setStorage({
            key: 'person_info',
            data: personInfo
          })
        }
       
       
      }
    })
  
  }
 
})