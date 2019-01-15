//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    longitude:"",
    latitude:"",
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
      


      ]

  },
  onShow(){
    this.getLocation();
    
  },
  onReady(){
    this.mapCtx = wx.createMapContext('map')

  },
  getLocation(){
    wx.getLocation({
      type: 'gcj02',
      success:this.handleGetLocationSucc.bind(this)
      
    })
    

  },
  handleGetLocationSucc(res){
    this.setData({
      longitude:res.longitude,
      latitude:res.latitude
    })
  },
  controltap(e) {
    this.mapCtx.moveToLocation();
    console.log(e)
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
