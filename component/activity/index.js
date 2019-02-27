// component/activity/avtivity.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    act_id:{
      type:String,
      value:null
    },
    act_title:{
      type:String,
      value:"活动标题"
    },
    act_content: {
      type: String,
      value: "活动内容"
    },
    act_publisher: {
      type: String,
      value: "活动发起人"
    },
    act_date: {
      type: String,
      value: "2019.1.1"
    },
    //活动的参与人数
    act_join:{
       type:Number,
       value:0
    },
    act_like:{
      type:Number,
      value:0
    }
    
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    act_id:0,
    act_title:"title1",
    act_content:"content1",
    act_publisher:"publisher1",
    act_date:"2019/1/1",
    act_like:1,
    act_join:10
  },

  /**
   * 组件的方法列表
   */
  methods: {
    

  }
})
