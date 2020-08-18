// pages/cart/index.js


Page({

  handleChooseAddress(){
    //1. get permittion
    wx.getSetting({
      success: (result)=>{
        // use [] to get inner data when the naming is weired or there is too many layer
        const scopeAddress=result.authSetting['scope.address']
        // if user aggreed for getting address or the user was never asked for address=> get address
        if(scopeAddress===true||scopeAddress===undefined){
          wx.chooseAddress({
            success: (r1)=>{
              console.log(r1)
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }else{
          // the user has refused the authtication of giving address, ask the user to go to setting to give authentification
          wx.openSetting({
            success: (r2)=>{
              wx.chooseAddress({
                success: (r1)=>{
                  console.log(1)
                },
                fail: ()=>{},
                complete: ()=>{}
              });
            },
            fail: ()=>{},
            complete: ()=>{}
          });

        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})