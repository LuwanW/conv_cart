import {request} from "../../request/index.js"
//Page Object
Page({
  data: {
    swiperList:[],
    cateList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  
  getSwiperList(){
      request({url:"/home/swiperdata"})
      .then(result=>{
        this.setData({swiperList:result})
      })
  },
  getCateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({cateList:result})
    })
  },
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({floorList:result})
    })
  }
  
});