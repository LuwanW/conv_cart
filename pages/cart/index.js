// pages/cart/index.js
import {getSetting, chooseAddress, openSetting, showModal, showToast} from "../../utils/asyncWx.js";

Page({

  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){

    const address = wx.getStorageSync('address');

    const cart = wx.getStorageSync('cart')||[];

    this.setData({address});
    this.setCart(cart);
  },
  async handleChooseAddress(e){
    // //1. get permittion
    // wx.getSetting({
    //   success: (result)=>{
    //     // use [] to get inner data when the naming is weired or there is too many layer
    //     const scopeAddress=result.authSetting['scope.address']
    //     // if user aggreed for getting address or the user was never asked for address=> get address
    //     if(scopeAddress===true||scopeAddress===undefined){
    //       wx.chooseAddress({
    //         success: (r1)=>{
    //           console.log(r1)
    //         },
    //         fail: ()=>{},
    //         complete: ()=>{}
    //       });
    //     }else{
    //       // the user has refused the authtication of giving address, ask the user to go to setting to give authentification
    //       wx.openSetting({
    //         success: (r2)=>{
    //           wx.chooseAddress({
    //             success: (r1)=>{
    //               console.log(1)
    //             },
    //             fail: ()=>{},
    //             complete: ()=>{}
    //           });
    //         },
    //         fail: ()=>{},
    //         complete: ()=>{}
    //       });

    //     }
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });


    try{
      // using promise es7 updated version
      // 1 get authentification 
      const res1=await getSetting();
      const scopeAddress=res1.authSetting["scope.address"];
      // 2if user aggreed for getting address or the user was never asked for address=> get address
      if(scopeAddress===false){
        // ask the user to change the setting
        await openSetting();
      }
      //4 use get address api
      let address=await chooseAddress();
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
      console.log(address);

      // save address to storage
      wx.setStorageSync("address", address);

    }catch(error){
      console.log(error)
    }


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

    let allChecked = true
    let totalPrice=0;
    let totalNum=0;

    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
        allChecked=false;
      }

    })

    allChecked=cart.length!=0?allChecked:false;
    wx.setStorageSync("cart", cart);

    this.setData({
      cart,
      totalNum, totalPrice, allChecked
    });



  },

  // seclect all function 
  asynchandleItemAllCheck(){
    let {cart,allChecked}=this.data;

    // change value
    allChecked=!allChecked;
    cart.forEach(v=>v.checked=allChecked);

    // save back to storage
    this.setCart(cart);
  },
  
  async handleItemNumEdit(e){
    // if cart.num=1 and the user click -1, pop up window(wx-showModel) to ask user if they want to delete the item
    const {operation,id}=e.currentTarget.dataset;
    
    let {cart}=this.data;
    const index = cart.findIndex(v=>v.goods_id===id);


    // check if delete
    if (cart[index].num===1&&operation===-1){

      const result=await showModal({content:"Do you want to delete this item?"});
      if(result.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else{

      cart[index].num+=operation;
      this.setCart(cart);
    }


    },

  async handlePay(){
    // check if address is saved
    const {address, totalNum}= this.data;
    if(!address.userName){
      await showToast({title:"You have not select your address"})
      return;
    }

    // check if item in cart has been selected 
    if(totalNum===0){
      await showToast({title:"You have not select any item to check out"})
      return;
    }

    // go to pay page 
    wx.navigateTo({
      url: '/pages/pay/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  }


  
})