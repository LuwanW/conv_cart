// pages/pay/index.js
import {getSetting, chooseAddress, openSetting, showModal, showToast} from "../../utils/asyncWx.js";

Page({

  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){

    const address = wx.getStorageSync('address');

    const cart = wx.getStorageSync('cart')||[];

    let checkedCart = cart.filter(v=>v.checked);

    this.setData({address});
    this.setCart(checkedCart);
  },
  

  // select an item in the cart
  handleItemChange(e){
    const goods_id=e.currentTarget.dataset.id;
    console.log(goods_id);
    let {cart}=this.data;
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked=!cart[index].checked;
    this.setCart(cart);
  },

  setCart(cart){

    let totalPrice=0;
    let totalNum=0;

    cart.forEach(v=>{
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;


    })

    this.setData({
      cart,
      totalNum, totalPrice
    });




  },


  async payment(){
    //token is a id of the user, payment needs a actually company account to get user token, skip here

    await showToast({title:"You have paied sucessfully"});
    let newCart=wx.getStorageSync("cart");
    newCart=newCart.filter(v=>!v.checked);
    wx.setStorageSync("cart", newCart);
    wx.navigateTo({
      url: '/pages/order/index',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });


  }
  


  


  
})