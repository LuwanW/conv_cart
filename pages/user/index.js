// pages/user/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo:{}
  },

  onShow(){
    const userInfo=wx.getStorageSync("userInfo");
    this.setData({userInfo});
  }

  
})