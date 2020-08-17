import {request} from "../../request/index.js";
/*
auto load next page when the roller reach bottom
1. on reach bottom
2. check if there is next page
  a:get all pages
  b: get current page：
  if currentpage >= totalpage: 
    no next page
3. if no next page: print
4. if there is next page:
  a: page++
  b: new requesy
  c: data append


pull down to refresh
  1. pull down to refresh
  2. reset data
  3. reset pagenum

*/

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



    ],
    goodsList:[]

  },

  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  /**
   * Lifecycle function--Called when page load
   */

  totalPages:1,

  onLoad: function (options) {
    this.getGoodsList();
  },


  async getGoodsList(){
    const res=await request({url:"/goods/search", data:this.QueryParams});
    const total = res.total;

    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    console.log(this.totalPages)
    console.log(res);
    this.setData({
      // append data
      goodsList:[...this.data.goodsList,...res.goods]
    })

    // close pull down
    wx.stopPullDownRefresh();
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

  },

  // roller reach bottom
  onReachBottom(){
    // check is there is next page
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.wx.showToast({
        title: 'no next page',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      console.log("Bottom reached")
    }else{
      // there is next page
      this.QueryParams.pagenum++;
      this.getGoodsList();
      //console.log("there is next page")
    }
    console.log('bottom')

  },

  // pull down refresh, reset data, reset pagenum
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList();
    console.log('pull down')
  }
})