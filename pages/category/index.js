import {request} from "../../request/index.js";
// pages/category/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    rightContent:[],
    leftMenuList:[],
    //onlick menu
    currentIndex:0,
    scrollTop:0

  },



  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //this.getCates();
    // upgrade to use local storatge data -> faster loading

    // get local storage
    const Cates = wx.getStorageSync("cates");
    if (!Cates){
      this.getCates();
    }else{
      // define date
      if(Date.now()-Cates.time>1000*10){
        this.getCates();
      }else{
        //console.log("use old data!!!!");
        this.Cates=Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,rightContent
        })
      }
    }
  },

  async getCates(){
    // request({
    //   url:"/categories"})
    //   .then(res=>{
    //     this.Cates=res.data.message;

    //     // store the data into local storage
    //     wx.setStorageSync("cates",{time:Date.now(), data:this.Cates});

    //     let leftMenuList=this.Cates.map(v=>v.cat_name);
    //     let rightContent=this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,rightContent
    //     })
    //   })
    // // use async, await to use es7 sent request
    const res=await request({url:"/categories"});
    this.Cates = res;
    wx.setStorageSync("cates",{time:Date.now(), data:this.Cates});

    let leftMenuList=this.Cates.map(v=>v.cat_name);
    let rightContent=this.Cates[0].children;
    this.setData({leftMenuList,rightContent})
  },

  // on click menu
  handleItemTab(e){
    const{index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
    
  } 

 
})