// pages/goods_detail/index.js
// click to view big picture
import{request} from "../../request/index.js";
Page({

  /**
   * Page initial data
   */
  data: {
    goodsObj:{}
  },
  GoodsInfo:{},

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
  },
  // get goods detail
  async getGoodsDetail(goods_id){
    const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo=goodsObj;
    this.setData({goodsObj:{
      goods_name:goodsObj.goods_name,
      goods_price:goodsObj.goods_price,

      // some iphone products does not recognize webp image
      // ask back end to change it to jpg
      // temp fix: webp=>jpj 
      goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
      pics:goodsObj.pics


    }});
  },

  // click to view large pic of the swiper
  handlePreviewImage(e){
    // pics array
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    // use passed data as url
    const current = e.currentTarget.dataset.url;

    wx.previewImage({
      current: current,
      urls: urls,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });


  },

  // click to add to the cart
  /*
  1. get number in cart

  
  */ 
  handleCartAdd(){
    //  1. get number in cart
    let cart = wx.getStorageSync("cart")||[];
    // check if the item is already in cart
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if (index===-1){
      // not found
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);

    }else{
      cart[index].num++;
      // num++
    }
    // add cart back to storage
    wx.setStorageSync("cart", cart);

    // window pop up
    wx.showToast({
      title: 'Success',
      icon: 'success',
      image: '',
      duration: 1500,
      // prevent user click add contiousely 
      mask: true,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
 
})