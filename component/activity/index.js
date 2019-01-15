// component/activity/avtivity.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    act_title:{
      type:String,
      value:"活动标题1"
    },
    act_content: {
      type: String,
      value: "活动内容1"
    },
    act_publisher: {
      type: String,
      value: "活动发起人1"
    },
    act_date: {
      type: String,
      value: "2019.1.1"
    }
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    act_title:"title1",
    act_content:"content1",
    act_publisher:"publisher1",
    act_date:"2019/1/1"

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
