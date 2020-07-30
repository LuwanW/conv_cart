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
    currentIndex:0

  },



  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getCates();
  },

  getCates(){
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"})
      .then(res=>{
        console.log(res);
        this.Cates=res.data.message;
        let leftMenuList=this.Cates.map(v=>v.cat_name);

        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,rightContent
        })
      })
  },

  // on click menu
  handleItemTab(e){
    const{index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent
    })

  } 

 
})