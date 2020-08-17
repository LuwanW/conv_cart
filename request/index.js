// times of sending request
let requestTime=0;
export const request=(params)=>{
    requestTime++;

    // show loading

    wx.showLoading({
        title: "loading",
        mask: true,
        success: (result)=>{
            
        },
        fail: ()=>{},
        complete: ()=>{}
    });
    // define public url
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result.data.message);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                requestTime--;

                if (requestTime===0){
                // close loading
                wx.hideLoading();
                }

            }
        })

    )
}