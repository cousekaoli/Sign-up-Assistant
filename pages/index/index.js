//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    longitude: "",
    latitude: "",
    controls: [

      {
        id: 1,
        iconPath: '/resources/loc.png',
        position: {
          left: 10,
          top: 30,
          width: 40,
          height: 40,
        },
        clickable: true
      },
    ],
    // 地图标点参数
    markers: [],
    actIds: []
  },



  onShow() {
    this.getLocation();
  },


  onReady() {
    this.mapCtx = wx.createMapContext('map')

  },


  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: this.handleGetLocationSucc.bind(this)

    })


  },


  handleGetLocationSucc(res) {
    this.setData({
      longitude: res.longitude,
      latitude: res.latitude
    })
    var longitude = this.data.longitude;
    var latitude = this.data.latitude;
    var myPositon = {
      longitude,
      latitude
    }
    myPositon = JSON.stringify(myPositon);
    console.log(myPositon);
    var location = {
      longitude: this.data.longitude,
      latitude: this.data.latitude
    }
    console.log("location:")
    console.log(location);
    var that = this;
    // 与后台交互，地图上标点
    wx.request({
      // url: 'http://localhost:8080/applet/activityLocation/getLocations',
      url: app.serverUrl +'/applet/activityLocation/getLocations',
      method: "Post",
      header: {
        'Content-Type': 'application/json'
      },
      data: location,
      
      success: function (res) {
        console.log("res");
        console.log(res);
        if (res.statusCode == 200) {
          console.log("附件活动查询成功");
          var address = res.data.extend.addressNear;
          var markers = [];
          var marker = {};
          var actIds = [];
          for (var i = 0; i < address.length; ++i) {
            actIds.push(address[i].actId);
            // 活动的标点信息
            marker = {
              iconPath: '/resources/location.png',
              id: i,
              latitude: address[i].latitude,
              longitude: address[i].longitude,
              width: 50,
              height: 50,
              callout: {
                content: address[i].actTitle + "\n" + address[i].category,
                padding: 10,
                display: 'ALWAYS',
                textAlign: 'center',
                fontSize: 15,
                borderRadius: 10
              }
            }
            markers.push(marker);
          }
          that.setData({
            markers: markers,
            actIds: actIds
          })
        }
      }
    })
  },


  controltap(e) {
    this.mapCtx.moveToLocation();
    console.log(e)
  },


  // 点击活动图标跳转到活动详情页面 
  markertap: function (e) {
    console.log(e.markerId);
    var actId = this.data.actIds[e.markerId]
    wx.navigateTo({
      // 跳转到活动详情页面
      url: '/pages/takePart/takePart?actId=' + actId,
    })
  },

  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '活动报名小助手',
      path: '/pages/index/index'
    }
  },






})
