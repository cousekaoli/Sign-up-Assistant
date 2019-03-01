const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {

    isActivityStart: false, // 活动是否开始
    isTakePartEnd: false, // 报名是否结束
    isDelete: false, // 活动是否被删除
    isSponsor: true, //  是否为发起者
    isTakePart: false, // 是否已报名活动
    isAuthorized: true, // 是否审核通过
    time: '', //未知？
    isChangeTakePart: false, // 点击修改报名信息来改变,内部控制
    numTakePart: 0, //已经参加的人数
    userId:"", //用户编号
    activity: { /*报名所需要的信息 */
      isTakePart: false, // 是否已报名活动
      userId:"", // 活动发起者ID
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
          info: "HUST"
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
      ],
      //修改的信息变化 活动信息
      activityHead: { /* 活动标题与活动内容，活动类型，活动的选择类型*/
        title: "",
        content: "",
        type: [],
        selectedIndex: 0 //活动类型选择
      },
      isPass: "", //
      actStartTime: "", //
      actSignupDeadline: "", //
      location: { /*活动位置和经纬度*/
        address: "请输入活动地址",
        latitude: '',
        longitude: ''
      },
      participantsNumber: "", //活动参与人数
      actRunStatus: "",  
      actStatus: "", // 由活动状态来判断，是否删除
      actId: "", // 活动编号
      isLimitNum: "", 
      maxNum: "", // 最大限制人数
      requiredItemId: '', // 活动报名编号表 
      isPrivate: false,
      actPassword: "",
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    //从报名活动页面传来的活动编号
    var actId = options.actId;
    //var time = JSON.parse(options.time);
    //获取用户ID
    var userId = app.getGlobalUserId();
    console.log("从活动页修改传回活动ID");
    //console.log(time);
    console.log(actId);
    this.setData({
      "activity.actId": actId,
      /*"time": time,*/
      userId: userId
    })
  },
  


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    var that = this;
    wx.request({
      // url: 'http://localhost:8080/applet/activity/' + this.data.activity.actId + '/usersignupWithAllStatus/' + this.data.userId,
      url: app.serverUrl +'/applet/activity/' + this.data.activity.actId + '/usersignupWithAllStatus/' + this.data.userId,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("查看活动信息，报名详情:");
        console.log(res)
        var act = res.data.extend.act;
        var detail = res.data.extend.detail;
        var infoNeed = res.data.extend.requiredItem;
        var isTakePart = res.data.extend.isTakePart;
        if (detail != '0') {
          that.setData({
            "activity.infoNeed[0].info": detail.name,
            "activity.infoNeed[1].info": detail.sex,
            "activity.infoNeed[2].info": detail.age,
            "activity.infoNeed[3].info": detail.address,
            "activity.infoNeed[4].info": detail.phone,
            "activity.infoNeed[5].info": detail.wechatNumber,
            "activity.infoNeed[6].info": detail.qqNumber,
            "activity.infoNeed[7].info": detail.email,
            "activity.infoNeed[8].info": detail.school,
            "activity.infoNeed[9].info": detail.grade,
            "activity.infoNeed[10].info": detail.classNumber,
            "activity.infoNeed[11].info": detail.studentId,
            "activity.infoNeed[12].info": detail.workPlace,
            "activity.infoNeed[13].info": detail.department,
            "activity.infoNeed[14].info": detail.position,
            "activity.infoNeed[15].info": detail.jobNumber,
            "activity.infoNeed[16].info": detail.province,
            "activity.infoNeed[17].info": detail.city,
          })
        }


        //如果requiredItem此项为true则在界面显示input
        if (infoNeed['name'] == true) {
          that.setData({
            'activity.infoNeed[0].tag': true
          })
        }
        if (infoNeed['sex'] == true) {
          that.setData({
            'activity.infoNeed[1].tag': true
          })
        }
        if (infoNeed['age'] == true) {
          that.setData({
            'activity.infoNeed[2].tag': true
          })
        }
        if (infoNeed['address'] == true) {
          that.setData({
            'activity.infoNeed[3].tag': true
          })
        }
        if (infoNeed['phone'] == true) {
          that.setData({
            'activity.infoNeed[4].tag': true
          })
        }
        if (infoNeed['wechatNumber'] == true) {
          that.setData({
            'activity.infoNeed[5].tag': true
          })
        }
        if (infoNeed['qqNumber'] == true) {
          that.setData({
            'activity.infoNeed[6].tag': true
          })
        }
        if (infoNeed['email'] == true) {
          that.setData({
            'activity.infoNeed[7].tag': true
          })
        }
        if (infoNeed['school'] == true) {
          that.setData({
            'activity.infoNeed[8].tag': true
          })
        }
        if (infoNeed['grade'] == true) {
          that.setData({
            'activity.infoNeed[9].tag': true
          })
        }
        if (infoNeed['classNumber'] == true) {
          that.setData({
            'activity.infoNeed[10].tag': true
          })
        }
        if (infoNeed['studentId'] == true) {
          that.setData({
            'activity.infoNeed[11].tag': true
          })
        }
        if (infoNeed['workPlace'] == true) {
          that.setData({
            'activity.infoNeed[12].tag': true
          })
        }
        if (infoNeed['department'] == true) {
          that.setData({
            'activity.infoNeed[13].tag': true
          })
        }
        if (infoNeed['position'] == true) {
          that.setData({
            'activity.infoNeed[14].tag': true
          })
        }
        if (infoNeed['jobNumber'] == true) {
          that.setData({
            'activity.infoNeed[15].tag': true
          })
        }
        if (infoNeed['province'] == true) {
          that.setData({
            'activity.infoNeed[16].tag': true
          })
        }
        if (infoNeed['city'] == true) {
          that.setData({
            'activity.infoNeed[17].tag': true
          })
        }
        console.log(act);
        //活动须知
        that.setData({
          "activity.userId": act.userId,
          "activity.activityHead.title": act.actTitle,
          "activity.activityHead.content": act.actDetailInfo,
          "activity.activityHead.type": act.category,
          "activity.activityHead.selectedIndex": act.type, // 活动类型标记?
          "activity.actStartTime": act.actStartTime,
          "activity.actSignupDeadline": act.actSignupDeadline,
          "activity.isLimitNum": act.isLimitNum,
          "activity.maxNum": act.maxNum,
          "activity.isPrivate": act.isPrivate,
          "activity.actPassword": act.actPassword,
          "activity.location.address": act.actAddress,
          "activity.location.longitude": act.longitude,
          "activity.location.latitude": act.latitude,
          "activity.participantsNumber": act.participantsNumber,
          numTakePart: act.participantsNumber,
          "activity.actRunStatus": act.actRunStatus == 0 ? "活动正常进行" : "活动失效",
          "activity.actStatus": act.actStatus,
          "activity.activityHead.selectedIndex": act.type,
          "activity.requiredItemId": act.requiredItemId, // 报名信息填写表格
          isActivityStart: act.isActivityStart,// 报名是否结束
          isTakePartEnd: act.isTakePartEnd, // 报名是否结束
          isDelete: act.isDelete, // 活动是否被删除
          isSponsor: act.isSponsor, //  是否为发起者
          isAuthorized: act.isAuthorized, // 是否审核通过
          isTakePart: isTakePart // 是否参加活动
        });
      }
    })
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
  onShareAppMessage: function (object) {
    if (object.from == "button") {
      //若存在人数限制，当人数小于最大人数限制时才能分享

      return {
        title: this.data.activity.actHead.title,
        path: '/pages/takePart/takePart',
        /*imageUrl: ""*/ //留给图片的位置
      }
    }
  },
  /*删除活动 */
  deleteActivity: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除活动',
      success(res) {
        if (res.confirm) {
          //与后台交互，删除活动
          wx.request({
            // url: 'http://localhost:8080/applet/activity/delete/activity/' + that.data.activity.actId,
            url: app.serverUrl +'/applet/activity/delete/activity/' + that.data.activity.actId,
            method: 'GET',
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              //缓存发起活动-1
              var addActivityNum = wx.getStorageSync("addActivityNum");
              wx.setStorageSync("addActivityNum", addActivityNum - 1);
              
              console.log("删除成功");
              that.setData({
                isDelete: true
              });
            }
          })
        }
        else if (res.cancel) {
        }
      }
    })
  },

  /*修改活动信息*/
  changeActivity: function () {

    console.log("before time");
    console.log(this.data.time);
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否修改活动',
      success(res) {
        if (res.confirm) {
          var activityAfter = JSON.stringify(that.data.activity);
          //var time = JSON.stringify(that.data.time);
          wx.reLaunch({
            url: '/pages/addActivity/addActivity?activityAfter=' + activityAfter
          });
        }
        else if (res.cancel) {
        }
      }
    })

  },

  /*填写报名信息 */
  writerInfo: function (e) {
    if (e.detail.value == "") {
      wx.showToast({
        title: '必填项目 ',
        duration: 800
      });
      return;
    }
    else {
      var index = parseInt(e.currentTarget.dataset.infoIndex);
      //console.log(index + "  " + e.detail.value);
      var key = "activity.infoNeed[" + index + "].info";
      this.setData({
        [key]: e.detail.value
      })
    }
  },


  /*提交报名信息 */
  takePartActivity: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否加入活动',
      success(res) {
        if (res.confirm) {
          for (var i = 0; i < that.data.activity.infoNeed.length; ++i) {
            if (that.data.activity.infoNeed[i].tag == true) {
              if (that.data.activity.infoNeed[i].info == "") {
                wx.showToast({
                  title: '必填项目 ',
                  duration: 800
                });
                return;
              }
            }
          }
          //打包报名信息
          var infoNeed = {
            actId: parseInt(that.data.activity.actId),
            requiredItemDetailModel:{
              address: "",
              age: 0,
              city: "",
              classNumber: "",
              department: "",
              email: "",
              fieldOne: "",
              fieldThree: "",
              fieldTwo: "",
              grade: "",
              jobNumber: "",
              name: "",
              phone: "",
              position: "",
              province: "",
              qqNumber: "",
              school: "",
              sex: 0, // 
              studentId: "",
              wechatNumber: "",
              workPlace: ""
            },
            userId: that.data.userId
          };
          // 对信息进行处理和导出
          var info = that.data.activity.infoNeed;
          if (info[0].tag == true) {
            infoNeed.requiredItemDetailModel["name"] = info[0].info;
          }
          if (info[1].tag == true) {
            
            // 为男生时
            if (info[1].info == "男") {
              infoNeed.requiredItemDetailModel["sex"] = 0;
            }
            // 为女生时
            else {
              infoNeed.requiredItemDetailModel["sex"] = 1;
            }
          }
          // 对年龄的转化
          if (info[2].tag == true) {
            infoNeed.requiredItemDetailModel["age"] = info[2].info;
          }
          
          if (info[3].tag == true) {
            infoNeed.requiredItemDetailModel["address"] = info[3].info;
          }
          if (info[4].tag == true) {
            infoNeed.requiredItemDetailModel["phone"] = info[4].info;
          }
          if (info[5].tag == true) {
            infoNeed.requiredItemDetailModel["wechatNumber"] = info[5].info;
          }
          if (info[6].tag == true) {
            infoNeed.requiredItemDetailModel["qqNumber"] = info[6].info;
          }
          if (info[7].tag == true) {
            infoNeed.requiredItemDetailModel["email"] = info[7].info;
          }
          if (info[8].tag == true) {
            infoNeed.requiredItemDetailModel["school"] = info[8].info;
          }
          if (info[9].tag == true) {
            infoNeed.requiredItemDetailModel["grade"] = info[9].info;
          }
          if (info[10].tag == true) {
            infoNeed.requiredItemDetailModel["classNumber"] = info[10].info;
          }
          if (info[11].tag == true) {
            infoNeed.requiredItemDetailModel["studentId"] = info[11].info;
          }
          if (info[12].tag == true) {
            infoNeed.requiredItemDetailModel["workPlace"] = info[12].info;
          }
          if (info[13].tag == true) {
            infoNeed.requiredItemDetailModel["department"] = info[13].info;
          }
          if (info[14].tag == true) {
              infoNeed.requiredItemDetailModel["position"] = info[14].info;
          }
          if (info[15].tag == true) {
            infoNeed.requiredItemDetailModel["jobNumber"] = info[15].info;
          }
          if (info[16].tag == true) {
            infoNeed.requiredItemDetailModel["province"] = info[16].info;
          }
          if (info[17].tag == true) {
            infoNeed.requiredItemDetailModel["city"] = info[17].info;
          }
          

          // 报名信息和用户ID提交给后台，并更新本地的numTakePart（已参加人数
          wx.request({
            // url: 'http://localhost:8080/applet/activitySignUp/creation/Sigup',
            url: app.serverUrl +'/applet/activitySignUp/creation/Sigup',
            method: 'Post',
            header: {
              'Content-Type': 'application/json'
            },
            data: JSON.stringify(infoNeed),
            success: function (res) {
              console.log(infoNeed);
              if(res.statusCode == 200){
                //缓存参与活动+1
                var takePartNum = wx.getStorageSync("takePartNum");
                wx.setStorageSync("takePartNum", takePartNum + 1);
                //成功提示
                wx.showToast({
                  title: '报名成功',
                  icon: 'success',
                  duration: 1000
                });
                console.log("报名成功");
                that.setData({
                  isTakePart: true,
                  // 更新numTakePart(参加活动人数)
                  numTakePart: that.data.numTakePart + 1 
                })
              }
              else{
                console.log("报名失败");
              }
            }
          })
        }
        else if (res.cancel) {
        }
      }
    })
  },


  /*修改报名信息 */
  changeTakePart: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否修改报名信息',
      success(res) {
        if (res.confirm) {
          that.setData({
            isChangeTakePart: true
          });
        }
        else if (res.cancel) {
        }
      }
    })
  },


  /*提交修改信息 */
  submitChange: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否提交修改信息',
      success(res) {
        if (res.confirm) {
          //与后台交互
          for (var i = 0; i < that.data.activity.infoNeed.length; ++i) {
            if (that.data.activity.infoNeed[i].tag == true) {
              if (that.data.activity.infoNeed[i].info == "") {
                wx.showToast({
                  title: '必填项目 ',
                  duration: 800
                });
                return;
              }
            }
          }
          //打包报名信息
          var infoNeed = {
            actId: parseInt(that.data.activity.actId),
            requiredItemDetailModel: {
              address: "",
              age: 0,
              city: "",
              classNumber: "",
              department: "",
              email: "",
              fieldOne: "",
              fieldThree: "",
              fieldTwo: "",
              grade: "",
              jobNumber: "",
              name: "",
              phone: "",
              position: "",
              province: "",
              qqNumber: "",
              school: "",
              sex: 0, // 
              studentId: "",
              wechatNumber: "",
              workPlace: ""
            },
            userId: that.data.userId
          };
          // 对信息进行处理和导出--------------要改infoNeed顺序
          var info = that.data.activity.infoNeed;
          if (info[0].tag == true) {
            infoNeed.requiredItemDetailModel["name"] = info[0].info;
          }
          if (info[1].tag == true) {

            // 为男生时
            if (info[1].info == "男") {
              infoNeed.requiredItemDetailModel["sex"] = 0;
            }
            // 为女生时
            else {
              infoNeed.requiredItemDetailModel["sex"] = 1;
            }
          }
          // 对年龄的转化
          if (info[2].tag == true) {
            infoNeed.requiredItemDetailModel["age"] = info[2].info;
          }

          if (info[3].tag == true) {
            infoNeed.requiredItemDetailModel["address"] = info[3].info;
          }
          if (info[4].tag == true) {
            infoNeed.requiredItemDetailModel["phone"] = info[4].info;
          }
          if (info[5].tag == true) {
            infoNeed.requiredItemDetailModel["wechatNumber"] = info[5].info;
          }
          if (info[6].tag == true) {
            infoNeed.requiredItemDetailModel["qqNumber"] = info[6].info;
          }
          if (info[7].tag == true) {
            infoNeed.requiredItemDetailModel["email"] = info[7].info;
          }
          if (info[8].tag == true) {
            infoNeed.requiredItemDetailModel["school"] = info[8].info;
          }
          if (info[9].tag == true) {
            infoNeed.requiredItemDetailModel["grade"] = info[9].info;
          }
          if (info[10].tag == true) {
            infoNeed.requiredItemDetailModel["classNumber"] = info[10].info;
          }
          if (info[11].tag == true) {
            infoNeed.requiredItemDetailModel["studentId"] = info[11].info;
          }
          if (info[12].tag == true) {
            infoNeed.requiredItemDetailModel["workPlace"] = info[12].info;
          }
          if (info[13].tag == true) {
            infoNeed.requiredItemDetailModel["department"] = info[13].info;
          }
          if (info[14].tag == true) {
            infoNeed.requiredItemDetailModel["position"] = info[14].info;
          }
          if (info[15].tag == true) {
            infoNeed.requiredItemDetailModel["jobNumber"] = info[15].info;
          }
          if (info[16].tag == true) {
            infoNeed.requiredItemDetailModel["province"] = info[16].info;
          }
          if (info[17].tag == true) {
            infoNeed.requiredItemDetailModel["city"] = info[17].info;
          }
          console.log("修改报名信息")
          console.log(infoNeed)
          console.log("input");
          console.log(info);
          // 与后台交互信息
          wx.request({
            // url: 'http://localhost:8080/applet/activitySignUp/altering/Sigup',
            url: app.serverUrl +'/applet/activitySignUp/altering/Sigup',
            method: 'Post',
            header: {
              'Content-Type': 'application/json'
            },
            data: JSON.stringify(infoNeed),
            success: function (res) {
              console.log("修改报名后后端返回：")
              console.log(res);
              if (res.statusCode == 200) {
                wx.showToast({
                  title: '修改报名成功',
                  icon: 'success',
                  duration: 1000
                });
                console.log("修改报名成功");
                that.setData({
                  isChangeTakePart: false // 更新提交与修改的按钮控制
                });
              }
              else {
                console.log("修改报名失败");
              }
            }
          })
        }
        else if (res.cancel) {
        }
      }
    })
  },


  /*删除报名信息 */
  cancelTakePart: function () {
    //提交后台，删除报名信息，成功后修改isTakePart,并给出提示
    // 同时清空本页面中的infoTakePart.info信息, 修改本地numTakePart(参加活动人数)
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否撤销报名',
      success(res) {
        if (res.confirm) {
          // 提交到后台 
          wx.request({
            // 注意此处对其存在修改
            // url: 'http://localhost:8080/applet/activitySignUp/deleteSigup',
            url: app.serverUrl +'/applet/activitySignUp/deleteSigup',
            method: 'Get',
            data:{
              userId: that.data.userId,
              actId: that.data.activity.actId
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              if (res.statusCode == 200) {
                //缓存参与活动-1
                var takePartNum = wx.getStorageSync("takePartNum");
                wx.setStorageSync("takePartNum", takePartNum - 1);
                //成功提示
                console.log("取消报名成功");
                console.log(res.statusCode);
                that.setData({
                  isTakePart: false // 修改是否报名按钮
                });
              }
              else {
                console.log("取消报名失败");
              }
            }
          })
        }
        else if (res.cancel) {
        }
      }
    })
  }
})

