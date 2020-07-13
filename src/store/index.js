import Vue from 'vue'
import Vuex from 'vuex';
import {listMerchant} from '@/api/apis'
Vue.use(Vuex);

export default new Vuex.Store({
    state :{
        data:[]//商品数组
    },
    mutations:{
        initdatamerchant(state,val){
            state.data=val;//保存数据
        },
        //改变商品数量
        changcount(state,val){
            for(var obj of state.data){
                for(let food of obj.foods){
                    //如果food商品名字等于传过来的商品名字相匹配
                    if(food.name==val.name){
                        //找到了对应的商品
                        food.count +=val.count
                        return
                    }
                }
            }
        }
    },
    //发送请求axios的地方
    actions:{
        initdatamerchant(context){
            // 发送请求通过commit传到上面mutations里面
            listMerchant().then(res=>{
                //前端自己添加字段
                for(let obj of res.data.data){
                    for(let food of obj.foods){
                        food.count=0;
                    }
                }
                context.commit('initdatamerchant',res.data.data)
            })
        }
    },
    //计算属性
    getters:{
        //获取购物车列表
        getshopCarlist(state){
            let arr=[];
            for(let obj of state.data){
                for(let food of obj.foods){
                    if(food.count>0){
                        arr.push(food)//把商品数量>0的数据放入购物车
                    }
                }
            }
        //   arr.push(
        //       state.data.filter((val)=>{
        //        return val.foods.count.filter((res)=>{
        //             return res.count > 0
        //          })
        //     }) 
        //   ) 
            return arr;
        }
     }
})

