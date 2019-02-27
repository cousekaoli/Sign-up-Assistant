// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean,
      // value:false,
      // observer:function(){

      // }
    },
    count:{
      type:Number,
      value:99
      }
      },

  /**
   * 组件的初始数据
   */
  data: {

    // 数据绑定
    // 三元表达式
    // 封装性，开放性
    like:true,
    // count:99,
    yesSrc: '/resources/like.png',
    noSrc:'/resources/like@dis.png'

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event){
      let like = this.properties.like
      let count = this.properties.count
      
      count = like?count-1:count+1 
      this.setData({
        count:count,
        like:!like
      })
        console.log(event)
    }

  }
})
