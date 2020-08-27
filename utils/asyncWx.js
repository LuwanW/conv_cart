// promise getSetting 
export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            },
            complete: ()=>{}
        });
    })
}

// promise chooseAddress 
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            },
            complete: ()=>{}
        });
    })
}


// promise openSetting  
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            },
            complete: ()=>{}
        });
    })
}


// promise openSetting  
export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '',
            content: content,
            showCancel: true,
            cancelText: 'No',
            cancelColor: '#000000',
            confirmText: 'Yes',
            confirmColor: '#3CC51F',
            success: (result) => {
              if(result.confirm){
                resolve(result);
              }
            },
            fail: (err)=>{
                reject(err);
            },
            complete: ()=>{}
          });
    })
}