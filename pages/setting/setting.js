var app = getApp()
Page({
  data:{
    cells: [
      
      [
        {title: '系统信息', text: '', access: true, fn: 'viewSystemInfo'},
        {title: '清除缓存', text: '', access: false, fn: 'clearStorage'}
      ],
      [{title: '版本信息', text: '', access: true, fn: 'viewAbount'}]
    ]
  },
  onLoad:function(options){},
  viewPersonInfo: function(){
		wx.redirectTo({
			url: "../userinfo/userinfo"
		})
  },
 
  viewSystemInfo: function(){
		wx.redirectTo({
			url: "../systemInfo/systemInfo"
		})
  },
  clearStorage: function() {
    wx.showModal({
      title: '确认要清除',
      content: '清除缓存会删除浏览历史和收藏及个人资料',
      success: function(res) {
        if (res.confirm) {
          wx.clearStorage()
          app.initStorage()
          wx.showToast({
            title: '清除成功',
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
  },
  viewAbount: function() {
		wx.redirectTo({
			url: "../version/version"
		})
  }
})