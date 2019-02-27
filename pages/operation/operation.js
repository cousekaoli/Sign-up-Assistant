// pages/operation/operation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaId: undefined,
    areaName: '',
    priority: '',
    addUrl: "http://10.12.137.151:8080/demo/superadmin/addarea",
    modifyUrl: "http://10.12.137.151:8080/demo/superadmin/modifyarea"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var that = this;
    this.setData({
      areaId: options.areaId
    });
    if (options.areaId == undefined) {
      return;
    }
    wx.request({
      url: 'http://10.12.137.151:8080/demo/superadmin/getareabyid',
      data: {
        "areaId": options.areaId
      },
      method: 'GET',
      success: function success(res) {
        var area = res.data.area;
        if (area == undefined) {
          var toastText = "fail to get info" + res.data.errMsg;
          wx.showToast({
            title: 'toastText',
            icon: '',
            duration: 2000
          });
        }
        else {
          that.setData({
            areaName: area.areaName,
            priority: area.priority
          });
        }
      }

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

  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    console.log(formData)
    var url = that.data.addUrl;
    if (that.data.areaId != undefined) {
      formData.areaId = that.data.areaId;
      url = that.data.modifyUrl;
    }
    wx.request({    
      url: url,
      data: JSON.stringify(formData),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var reslut = res.data.success
        var toastText = "success";
        if (reslut != true) {
          toastText = "fail" + res.data.errMsg;
        }
        wx.showToast({

          title: toastText,
          icon: '',
          duration: 2000
        });

        if (that.data.areaId == undefined) {
          wx.redirectTo({
            url: '../hotacti/hotacti',
          })
        }

      }
    })
  }

})