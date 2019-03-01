const app = getApp(); // 引入全局的变量
Page({
  data: {
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
    //此次为创建活动还是修改活动信息
    isEdit: false,
    activity: {

      activityHead: { /* 活动标题与活动内容，活动类型，活动的选择类型*/
        title: "",
        content: "",
        type: [],
        selectedIndex: 0 //活动类型选择
      },
      actId: '', // 活动编号
      requiredItemId: '', /*为每个活动的报名表单编号 */
      isLimitNum: false, /*是否有最大人数限制 */
      maxNum: '', /*设置最大人数，上限人数为1200*/
      isPrivate: false, /*是否需要密码访问*/
      actPassword: "", /* 设置密码*/
      location: { /*活动位置和经纬度*/
        address: "请输入活动地址",
        latitude: '',
        longitude: ''
      },
      /*必填信息选择表*/
      infoNeed: [ // 与上一个页面存在区别，多一项info
        {
          id: "姓名",
          tag: true,
          info: "阿飞"
        },
        {
          id: "性别",
          tag: true,
          info: "男"
        },
        {
          id: "年龄",
          tag: false,
          info: "18"
        },
        {
          id: "地址",
          tag: false,
          info: ""
        },
        {
          id: "手机号",
          tag: true,
          info: "1306666"
        },
        {
          id: "微信号",
          tag: false,
          info: ""
        },
        {
          id: "QQ号",
          tag: false,
          info: ""
        },
        {
          id: "邮箱",
          tag: false,
          info: ""
        },
        {
          id: "学校",
          tag: false,
          info: ""
        },
        {
          id: "年级",
          tag: false,
          info: ""
        },
        {
          id: "班级",
          tag: false,
          info: ""
        },
        {
          id: "学号",
          tag: false,
          info: ""
        },
        {
          id: "工作单位",
          tag: false,
          info: ""
        },
        {
          id: "部门",
          tag: false,
          info: ""
        },
        {
          id: "职位",
          tag: false,
          info: ""
        },
        {
          id: "工号",
          tag: false,
          info: ""
        },
        {
          id: "省份",
          tag: false,
          info: ""
        },
        {
          id: "城市",
          tag: false,
          info: ""
        }
      ]
    }

  },


  /*设置活动类型*/
  chooseActivityType: function (e) {
    this.setData({
      "activity.activityHead.selectedIndex": e.detail.value
    })
  },


  /*改变人数限制*/
  changeNum: function () {
    this.setData({
      "activity.isLimitNum": !this.data.activity.isLimitNum /*注意此处的写法*/
    })
  },


  /*改变权限设置*/
  changePrivate: function () {
    this.setData({
      "activity.isPrivate": !this.data.activity.isPrivate
    })
  },


  /*报名信息选择*/
  infoSelected: function (event) {
    var index = parseInt(event.currentTarget.dataset.infoIndex);
    if (index == 0 || index == 1) {
      wx.showToast({
        title: '必填信息',
        duration: 800
      });
      return;
    }
    else {
      var inform = this.data.activity.infoNeed[index];
      inform.tag = !inform.tag;
      var key = "activity.infoNeed[" + index + "]"; /* key为变量所以要加[] */
      this.setData({
        [key]: inform
      })
    }
    //console.log(index + " " + this.data.infoNeed[index].tag);
  },


  /*处理地图定位的函数 */
  handleAddressClick() {
    wx.chooseLocation({
      success: this.handleChooseLocationSucc.bind(this)
    })
  },
  handleChooseLocationSucc(res) {
    this.setData({
      'activity.location.address': res.name,
      'activity.location.latitude': res.latitude,
      'activity.location.longitude': res.longitude
    })
  },


  /*选择日期 */
  chooseDate: function (e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        "dateSet1.selectDate": e.detail.value
      })
    }
    else {
      this.setData({
        "dateSet2.selectDate": e.detail.value
      })
    }
  },


  /*选择时间 */
  chooseTime: function (e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        "timeSet1.selectTime": e.detail.value
      })
    }
    else {
      this.setData({
        "timeSet2.selectTime": e.detail.value
      })
    }
  },


  /*活动主题*/
  activityTitle: function (e) {
    if (e.detail.value == "") {
      wx.showToast({
        title: '主题非空 ',
        duration: 800
      });
      return;
    }
    else {
      this.setData({

        "activity.activityHead.title": e.detail.value
      })
    }
  },


  /*活动内容 */
  activityContent: function (e) {
    if (e.detail.value == "") {
      wx.showToast({
        title: '内容非空',
        duration: 800
      });
      return;
    }
    else {
      this.setData({
        "activity.activityHead.content": e.detail.value
      })
    }
  },


  /* 设置报名人数*/
  selectMaxNum: function (e) {
    if (e.detail.value == "") {
      wx.showToast({
        title: '人数非空',
        duration: 800
      });
      return;
    }
    if (this.data.activity.isLimitNum) {
      this.setData({
        "activity.maxNum": parseInt(e.detail.value)
      })
    }
  },


  /*设置权限密码*/
  selectPassword: function (e) {
    if (e.detail.value == "") {
      wx.showToast({
        title: '密码非空',
        duration: 800
      });
      return;
    }
    if (this.data.activity.isPrivate) {
      this.setData({
        "activity.actPassword": e.detail.value
      })
    }
  },


  /*提交信息*/
  submitActivity: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否发布活动',
      success(res) {
        if (res.confirm) {
          that.create();
        }
        else if (res.cancel) {
        }
      }
    })
  },


  /*向后台提交数据，并跳转*/
  create: function () {
    //判断表的填写内容正确
    var that = this.data;
    if (this.data.activity.activityHead.title == "") {
      wx.showToast({
        title: '主题非空 ',
        duration: 800
      });
    }
    else if (that.activity.activityHead.content == "") {
      wx.showToast({
        title: '内容非空 ',
        duration: 800
      });
    }
    else if (that.activity.location.address == "请输入活动地址") {
      wx.showToast({
        title: '地址非空 ',
        duration: 800
      });
    }
    else if (that.activity.isLimitNum && (that.maxNum < 2 || that.activity.maxNum > 1200)) {
      wx.showToast({
        title: '人数在2到1200 ',
        duration: 800
      });
    }
    else if (that.activity.isPrivate && that.activity.password == "") {
      wx.showToast({
        title: '密码非空',
        duration: 800
      });
    }
    //当各项填写正确时
    else {
      var activitys = wx.getStorageSync('activitys') || [];
      var info = this.data.activity.infoNeed;
      var infoNeed = {
        "requiredItemId": this.data.activity.requiredItemId,
        "name": info[0].tag,
        "sex": info[1].tag,
        "age": info[2].tag,
        "address": info[4].tag,
        "phone": info[3].tag,
        "wechatNumber": info[5].tag,
        "qqNumber": info[6].tag,
        "email": info[7].tag,
        "school": info[8].tag,
        "grade": info[9].tag,
        "classNumber": info[10].tag,
        "studentId": info[11].tag,
        "workPlace": info[12].tag,
        "department": info[13].tag,
        "position": info[14].tag,
        "jobNumber": info[15].tag,
        "province": info[16].tag,
        "city": info[17].tag
      };
      //console.log(this.data.activity.activityHead.selectedIndex);
      var userId = app.getGlobalUserId(); // 抽取用户编号
      var activitInfo = {
        actTitle: this.data.activity.activityHead.title,
        actDetailInfo: this.data.activity.activityHead.content,
        actStartTime: this.data.dateSet1.selectDate + ' ' + this.data.timeSet1.selectTime + ':00', // 活动时间开始时间
        actSignupDeadline: this.data.dateSet2.selectDate + ' ' + this.data.timeSet2.selectTime + ':00', // 活动报名截止时间
        actAddress: this.data.activity.location.address,
        categoryType: this.data.activity.activityHead.selectedIndex,
        latitude: this.data.activity.location.latitude,
        longitude: this.data.activity.location.longitude,
        isLimitNum: this.data.activity.isLimitNum,
        maxNum: this.data.activity.maxNum,
        isPrivate: this.data.activity.isPrivate,
        actPassword: this.data.activity.actPassword,
        activityRequiredItem: infoNeed,
        userId: userId,
        actId: this.data.activity.actId,
      };


      activitys.push(activitInfo);
      wx.setStorageSync('activitys', activitys);
      console.log(activitInfo);
      var that = this;

      //当为第一次发起活动时
      if (that.data.isEdit == false) {
        wx.request({
          // url: 'http://localhost:8080/applet/activity/creation',
          url: app.serverUrl +'/applet/activity/creation',
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(activitInfo),
          success: function (res) {
            //缓存发起活动+1
            var addActivityNum = wx.getStorageSync("addActivityNum");
            wx.setStorageSync("addActivityNum", addActivityNum+1);
            /*
            var time = {
              dateSet1: that.data.dateSet1.selectDate,
              timeSet1: that.data.timeSet1.selectTime,
              dateSet2: that.data.dateSet2.selectDate,
              timeSet2: that.data.timeSet2.selectTime
            };
            */
            // console.log("addActivity Time:");
            // console.log(time);
            console.log("actid"),
            console.log(res),
            /*跳转到报名页*/
            wx.navigateTo({
              // url: '/pages/takePart/takePart?actId=' + res.data.extend.actId,
              url: '/pages/takePart/takePart?actId=' + res.data.extend.actId,
            });
          }
        })
      }
      // 当修改活动信息时
      else {
        console.log("当修改活动信息时");
        console.log(activitInfo);
        console.log("修改活动ID")
        console.log(that.data.activity.actId)
        wx.request({
          // url: 'http://localhost:8080/applet/activity/edit/',
          url: app.serverUrl +'/applet/activity/edit/',
          method: 'Put',
          header: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(activitInfo),

          success: function (res) {
            /*
            var time = {
              dateSet1: that.data.dateSet1.selectDate,
              timeSet1: that.data.timeSet1.selectTime,
              dateSet2: that.data.dateSet2.selectDate,
              timeSet2: that.data.timeSet2.selectTime
            };
            */
            console.log("addActivity Time:");
            //console.log(time);
            /*跳转到报名页*/
            wx.navigateTo({
              url: '/pages/takePart/takePart?actId=' + that.data.activity.actId /*+ "&time=" + JSON.stringify(time)*/,
            });
          }
        })
      }


    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*从活动详情页跳转过来 */
    var that = this;
    if (options.activityAfter != undefined) {
      var activity = JSON.parse(options.activityAfter);
      console.log("修改信息传回");
      console.log(activity);
      //分割时间字符串
      var actStartTime = activity.actStartTime.split(" ");
      var actSignupDeadline = activity.actSignupDeadline.split(" ");
      var timeSet1 = actStartTime[1].split(":");
      var timeSet2 = actSignupDeadline[1].split(":");
      timeSet1 = timeSet1[0] + ":" + timeSet1[1];
      timeSet2 = timeSet2[0] + ":" + timeSet2[1];
      that.setData({
        "activity.actId": activity.actId,
        "activity.activityHead": activity.activityHead,
        "activity.location": activity.location,
        "activity.isLimitNum": activity.isLimitNum,
        "activity.maxNum": activity.maxNum,
        "activity.isPrivate": activity.isPrivate,
        "activity.actPassword": activity.actPassword,
        "activity.infoNeed": activity.infoNeed,
        "activity.requiredItemId": activity.requiredItemId,
        isEdit: true,
        "activity.actId": activity.actId,
        "dateSet1.selectDate": actStartTime[0],
        "timeSet1.selectTime": timeSet1,
        "dateSet2.selectDate": actSignupDeadline[0],
        "timeSet2.selectDate": timeSet2
      })
      console.log("this.data.activity.actId");
      console.log(that.data.activity.actId);
      console.log("activity.actId");
      console.log(activity.actId);
    }
    else{
      that.setData({
        isEdit:false
      })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    var that = this;
    // 与后台交互活动的类型，类型由后台决定
    wx.request({
      // url: 'http://localhost:8080/applet/activity/actCategories',
      url: app.serverUrl +'/applet/activity/actCategories',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var categories = res.data.extend.categories;
        var i = 0;
        var newArr = [];
        for (var i = 0; i < categories.length; i++) {
          newArr.push(categories[i].categoryName);
        }
        that.setData({
          "activity.activityHead.type": newArr
        })
      }
    })
  }

})