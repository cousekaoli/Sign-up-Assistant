const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    var userId = app.getGlobalUserId();
    that.setData({
      userId: userId
    });
    wx.request({
      // url: 'http://localhost:8080/applet/user/lookOverUserCreation/' + userId,
      url: app.serverUrl +'/applet/user/lookOverUserCreation/' + userId,
      method: "GET",
      data: {},
      success: function (res) {
        console.log(res)
        console.log(res.data)
        console.log(res.data.extend.userCreateActList)
        var list = res.data.extend.userCreateActList
        if (list == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: "",
            duration: 2000
          });
        }
        else {
          that.setData({
            list: list
          });
        }
      }
    })
    console.log(that.data.list)
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
  shareAct: function () {

  },
  onShareAppMessage: function () {

  },
  deleteAct: function (e) {
    var that = this;
    var userId = that.data.userId
    var actId = e.target.dataset.actid
    console.log(actId)
    console.log(userId)
    wx.showModal({
      title: '提示',
      content: '是否删除活动' + e.target.dataset.acttitle,
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'http://localhost:8080/applet/activity/delete/activity/' + actId,
            data: {},
            method: "GET",
            success: function (res) {
              var result = res.data.code;
              console.log(res)
              console.log(res.data)
              console.log(result)
              var toastText = "删除成功";
              if (result != 200) {
                toastText = "删除失败";
              }
              else {
                //缓存发起活动-1
                var addActivityNum = wx.getStorageSync("addActivityNum");
                wx.setStorageSync("addActivityNum", addActivityNum - 1);

                that.data.list.splice(e.target.dataset.index, 1)
                that.setData({
                  list: that.data.list
                });
              }
              wx.showToast({
                title: toastText,
                icon: "",
                duration: 2000
              })
            }
          })
        }
      }
    })
  },
  actDetails:function(){

  }
})