import axios from 'axios';//引入axios组件

const req = axios.create({
    //baseURL: 'http://172.16.14.253:3000/',//公共地址
    baseURL: 'http://localhost:3000/',//家里ip地址
    timeout:10000//延迟时间
})

//获取商家信息
export const getMerchant =()=>{
      return  req.get('/api/seller')
}
//商家列表
export const listMerchant =()=>{
        return req.get('/api/goods')
}
//商品评价
export const Merchantevaluate =()=>{
    return req.get('/api/ratings')
}