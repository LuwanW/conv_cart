// pages/goods_list/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    tabs:[
      { 
        id:0,
        value:"overall",
        isActive:true
      },
      {
        id:1,
        value:"sales",
        isActive:false
      },
      {
        id2:2,
        value:"price",
        isActive:false

      }



    ]

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
  },
  // e is passed from component.tabs
  handleTabsItemChange(e){
    // get index
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  }
})