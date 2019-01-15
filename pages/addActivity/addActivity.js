Page({
  data:{
    dateSet1: { /* 设置活动日期*/
      startDate: "2000-01-01",
      endDate: "2050-01-01",
      selectDate: "2019-01-01"
    },
    timeSet1: { /*设置活动时间*/
      selectTime: "10:30",
      startTime: "00:00",
      endTime: "12:00"
    },
    dateSet2: { /* 设置报名截止日期*/
      startDate: "2000-01-01",
      endDate: "2050-01-01",
      selectDate: "2019-01-01"
    },
    timeSet2: { /*设置报名截止时间*/
      selectTime: "10:30",
      startTime: "00:00",
      endTime: "12:00"
    },
    activityInfo: { /* 活动标题与活动内容 */
      title: "",
      content: ""
    },
    isLimitNum:false, /*是否有最大人数限制 */
    maxNum:1000, /*设置最大人数*/
    isPrivate:false, /*是否需要密码访问*/
    password: "", /* 设置密码*/
    location:{ /*活动位置和经纬度*/
      address: "请输入活动地址"
    },
    /*必填信息选择表*/
    infoNeed:[
      { id:"姓名",
        tag: true
      },
      {
        id: "手机号",
        tag: true
      },
      {
        id: "年龄",
        tag: false
      },
      {
        id: "地址",
        tag: false
      },
      {
        id: "微信号",
        tag: false
      },
      {
        id:"QQ号",
        tag: false
      },
      {
        id: "学校",
        tag: false
      },
      {
        id: "学院",
        tag: false
      },
      {
        id: "学号",
        tag: false
      },
      {
        id: "工号",
        tag: false
      },
      {
        id: "工作单位",
        tag: false
      },
      {
        id: "部门" ,
        tag: false
      }
    ]
  },
  /*改变人数限制*/
  changeNum:function(){ 
    this.setData({
      isLimitNum:!this.data.isLimitNum /*注意此处的写法*/
    })
  },
  /*改变权限设置*/
  changePrivate:function(){ 
    this.setData({
      isPrivate:!this.data.isPrivate
    })
  },
  /*报名信息选择*/
  infoSelected:function(event){
    var index = parseInt(event.currentTarget.dataset.infoIndex);
    if(index == 0 || index == 1){
      wx.showToast({
        title: '必填信息',
        duration: 800
      });
      return;
    }
    else{
      var inform = this.data.infoNeed[index];
      inform.tag = !inform.tag;
      var key = "infoNeed["+index+"]"; /* key为变量所以要加[] */
      this.setData({
        [key]:inform
      })
    }
    console.log(index + " " + this.data.infoNeed[index].tag);
  },
  /*处理地图定位的函数 */
  handleAddressClick() {
    wx.chooseLocation({
      success: this.handleChooseLocationSucc.bind(this)
    })
  },
  handleChooseLocationSucc(res) {
    this.setData({
      'location.address': res.name,
      'location.latitude': res.latitude,
      'location.longitude': res.longitude
    })
    },
    /*选择日期 */
    chooseDate:function(e){
      var id= e.currentTarget.dataset.id;
      if(id == 1){
        this.setData({
          "dateSet1.selectDate": e.detail.value
        })
      }
      else{
        this.setData({
          "dateSet2.selectDate": e.detail.value
        })
      }
    },
    /*选择时间 */
    chooseTime:function(e){
      var id = e.currentTarget.dataset.id;
      if(id == 1){
        this.setData({
          "timeSet1.selectTime": e.detail.value
        })
      }
      else{
        this.setData({
          "timeSet2.selectTime": e.detail.value
        })
      }
    },
    /*活动主题*/
    activityTitle:function(e){
      if(e.detail.value == ""){
        wx.showToast({
          title: '主题非空 ',
          duration: 800
        });
        return;
      }
      else{
        this.setData({
          "activityInfo.title": e.detail.value
        })
      }
    },
    /*活动内容 */ 
    activityContent:function(e){
      if (e.detail.value == "") {
        wx.showToast({
          title: '内容非空',
          duration: 800
        });
        return;
      }
      else{
        this.setData({
          "activityInfo.content": e.detail.value
        })
      }
    },
    /* 设置报名人数*/
    selectMaxNum:function(e){
      if(e.detail.value == ""){
        wx.showToast({
          title: '人数非空',
          duration: 800
        });
        return;
      }
      if(this.data.isLimitNum){
        this.setData({
          maxNum: parseInt(e.detail.value)
        })
      }
    },
    /*设置权限密码*/
    selectPassword:function(e){
      if (e.detail.value == "") {
        wx.showToast({
          title: '密码非空',
          duration: 800
        });
        return;
      }
      if(this.data.isPrivate){
        this.setData({
          password: e.detail.value
        })
      }
    },
    /*提交信息*/
    creat:function(){
      /*将表单信息添加到缓存*/
      var activitys = wx.getStorageSync('activitys') || [];
      var activity = {
        activityInfo: this.data.activityInfo,
        time:{
          dateSet1: this.data.dateSet1.selectDate,
          timeSet1: this.data.timeSet1.selectTime,
          dateSet2: this.data.dateSet2.selectDate,
          timeSet2: this.data.timeSet2.selectTime
        },
        location: this.data.location,
        isLimitNum: this.data.isLimitNum,
        maxNum: this.data.maxNum,
        isPrivate: this.data.isPrivate,
        password: this.data. password,
        infoNeed: this.data.infoNeed
      };
      /*console.log(activity)*/;
      activitys.push(activity);
      wx.setStorageSync('activitys', activitys);
      var activity = JSON.stringify(activity);
      /*跳转到报名页*/
     wx.redirectTo({
        url: '/pages/takePart/takePart?activity='+ activity,
      });
    }
})