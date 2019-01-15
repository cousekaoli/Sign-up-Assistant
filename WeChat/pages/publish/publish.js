

Page({
  
  
    data: {
      items:[
        {name:"name1",value:"类型1"},
        {name: "name2", value: "类型2"},
        {name: "name3", value: "类型3"},
        {name: "name4", value: "类型4"},
        {name: "name5", value: "类型5"},
        {name: "name6", value: "类型6"},
      ],
      address:"点击选择地址",
      activityTitle:"请填写活动标题"
    },
 
    //staticData用于存放和后端进行交互的活动的信息，包括活动标题，内容，类型，联系方式等
      staticData:{
        type:""
      },
   
    handleAddressClick(){
      wx.chooseLocation({
        success:this.handleChooseLocationSucc.bind(this)
      })
    },
    
    handleChooseLocationSucc(res){
      this.setData({
        address:res.name
      });
      Object.assign(this.staticData,{
        latitude:res.latitude,
        longitude:res.longitude
      })

      console.log(res)

    },
    
    
  
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '发起活动',
      path: '/pages/index/index'
    }
  },
  onPullDownRefresh() {
    console.log("主页下拉刷新时使用的函数")
  },

  checkboxChange(e){
    this.staticData.type = e.detail.value
    console.log(e.detail.value)
    console.log(this.data)


  },
  handleTitle(e){
    this.staticData.title = e.detail.value;
    this.setData({
      activityTitle:e.detail.value
    })
    //console.log(this.data.activityTitle)
    //console.log(this.staticData.title)

  },
  handleContent(e){
    this.staticData.content = e.detail.value;
    console.log(this.staticData.content)

  },
  handleContact(e){
    this.staticData.contact = e.detail.value;
    console.log(this. staticData)

  },

  handleSubmit(){
    if(this.data.address=="点击选择地址"||!this.data.address)
    wx.showToast({
      title: '请选择活动地址',
      icon:'info',
      duration:2000
    })
    return;
    if(!this.staticData.title)
    wx.showToast({
      title: '请填写活动标题',
      icon:'info',
      duration:2000
    })
    return;
  }

 
})
