// page/component/new-pages/user/user.js
// 本页面中，与后台的数据要实时更新，发起，参加的活动数量
const app = getApp();
Page({
  data: {
    thumb: '', //微信头像地址
    nickname: '', //微信昵称
    orders: [],
    hasAddress: false, //
    address: {}, // 地址信息
    addActivityNum: 0, //用户发起的活动数量，从后台交互获得
    takePartNum: 0, //用户参加的活动数量，通过与后台交互获得
    isLogIn: false, // 判断用户是否登录

    backUserInfo: {}//后台得到的微信用户信息
  },
  onLoad() {
    var self = this;
    /**
     * 获取用户信息
     */
    /*
    wx.getUserInfo({
      success: function (res) {
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    })
    */
      /**
       * 发起请求获取订单列表信息
       */
  },   
  
  /*点击登录状态 */
  doLogIn: function (e) {
    var me = this;

    this.setData({
      isLogIn: true,
      thumb: e.detail.userInfo.avatarUrl,
      nickname: e.detail.userInfo.nickName
    })
    //console.log(this.data.thumb);
    //后面还要调用wx.logIn()进行后台交互,要显示交互过程
    wx.login({
      success: function (res) {
        console.log("登录信息res:")
        console.log(res)
        //获取登录临时凭证
        var code = res.code;

        wx.showLoading({
          title: '请等待...',
        });

        wx.getUserInfo({

          success: function (ures) {
            console.log("用户信息ures:")
            console.log(ures)
            //调用后端获得微信的session_key,secret
            wx.request({
              url: app.serverUrl+"/applet/user/wxLogin2",
              method: "GET",
              data: {
                encryptedData: ures.encryptedData,
                iv: ures.iv,
                code: code
              },
              header: {
                'content-type': 'application/json', // 默认值
                // 'headerOpenId': "ogZ4u1DH0sQZPtXjLqMpt6GxhL6A"
              },
              success: function (result) {
                console.log('后端返回result: ');
                console.log(result)
                wx.hideLoading();

                if (result.statusCode == 200) {
                  //登录成功
                  wx.showToast({
                    title: '登录成功',
                    icon: 'none',
                    duration: 2000
                  });

                  //将后台返回的数据赋值给backUserInfo
                  me.setData({
                    backUserInfo: result
                  })

                  //保存用户信息到本地缓存，可用作小程序端的拦截器
                  app.setGlobalUserInfo(result.data.extend.dec_userInfo);
                  app.setGlobalUserId(result.data.extend.userId);
                  // wx.redirectTo({
                  //   url: '../index/index',
                  // })

                } else if (result.statusCode == 500) {
                  //登录失败
                  wx.showToast({
                    title: '登录失败',
                    icon: 'none',
                    duration: 3000
                  })
                }

              }
            })
          }
        })

      }
    })
  },

  onShow() {
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function (res) {
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  // payOrders() {
  //   wx.requestPayment({
  //     timeStamp: 'String1',
  //     nonceStr: 'String2',
  //     package: 'String3',
  //     signType: 'MD5',
  //     paySign: 'String4',
  //     success: function (res) {
  //       console.log(res)
  //     },
  //     fail: function (res) {
  //       wx.showModal({
  //         title: '支付提示',
  //         content: '<text>',
  //         showCancel: false
  //       })
  //     }
  //   })
  // }
})