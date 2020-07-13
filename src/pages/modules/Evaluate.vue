<template>
    <div class="evaluate">
        <!-- 头部 -->
        <div class="evaluate-header">
            <div class="left">
                <div class="left-box">
                    <h1>3.9</h1>
                    <h3>综合评分</h3>
                    <h4 style="color:#8F9092">高于周边商家69.2%</h4>
                </div>
            </div>
            <div class="right">
                <div>
                   <p>
                       服务态度
                        <Rate show-text allow-half v-model="valueCustomText" style="margin-left:5px">
                            <span style="color: #f5a623">{{ valueCustomText }}</span>
                        </Rate>  
                   </p>
                   <p>服务态度
                        <Rate show-text allow-half v-model="valueCustomText1" style="margin-left:5px">
                            <span style="color: #f5a623">{{ valueCustomText1 }}</span>
                        </Rate> 
                   </p>
                   <p>
                       送达时间 <span style="color:#A9ADB0;margin-left:8px">44分钟</span>
                   </p>
                </div>
            </div>
        </div>
        <!-- 主体 -->
        <div class="evaluate-main">
            <!-- 评价数量 -->
            <div class="evaluate-main-span">
                <span style="background:#00A0DC">全部 57</span>
                <span style="background:#CCECF7">满意47</span>
                <span style="background:#EAEBED">不满意10</span>
            </div>
            <!-- 只看有内容的评价 -->
            <div style="border-bottom:1px solid #E8E8E8;width:96%;margin:8px auto;"></div>
            <div style="border-bottom:1px solid #ccc">
                <span  style="margin:10px 10px;display:inline-block;font-size:14px;color:#B7BABF">  
                    <Icon type="md-checkmark-circle" size='20' />
                    只看有内容的评价
                </span>
            </div>
            <!-- 评论列表 -->
            <div class="evaluate-main-list" v-for="(item,i) in Merchantevaluate" :key="i">
                    <!-- 头像 -->
                    <div class="evaluate-main-list-left">
                        <img :src="item.avatar" alt="" width="40px" height="40px">
                    </div>
                    <!-- 中间 -->
                    <div class="evaluate-main-center">
                        <div style="margin-left:12px">
                            <p>{{item.username}}</p>
                            <p style="font-size:12px;">
                                <Rate :value='item.score' style="font-size:14px;"/> 
                                {{item.deliveryTime}}分钟送达
                            </p>
                            <p>{{item.text}}</p>
                            <div class="evaluate-main-cente-div">
                                <Icon type="md-thumbs-up" size='16' style="color:blue;margin-right:5px"/>
                                    <div v-for="(k,i) in item.recommend" :key="i">{{k}}</div>
                            </div>
            
                        </div>
                    </div>
                    <!-- 时间 -->
                    <div class="evaluate-main-right">2016-1-11 20:22</div>
            </div>
        </div>
    </div>
</template>

<script>
import {Merchantevaluate} from '@/api/apis.js'
    export default {
        data() {
            return {
               valueCustomText: 3.9,
               valueCustomText1:4.0,
               value:3,
               Merchantevaluate:[],
            }
        },
        created(){
            Merchantevaluate().then((res)=>{
               this.Merchantevaluate=res.data.data;
               
            })
        }
    }
</script>

<style lang="less" scoped>
.evaluate{
    height: 100%;
    width: 100%;
    .evaluate-header{
        display: flex;
        border-bottom: 13px solid#F4F5F7;
        .left{  
            flex: 0 0 130px;
            background-color: #fff;
            .left-box{
                margin: 20px 0px;
            height: 80px;
            border-right: 1px solid #ccc;
             text-align: center;
                h1{color: #FBB86A;font-weight: normal;font-size: 30px;};
            }
            
        };
        .right{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 30px;
            color:#091114;
            font-weight: bolder;
        };
    };
      .evaluate-main{
          line-height: 20px;
          height: 500px;
          overflow: auto;
            .evaluate-main-span{
                display: flex;
                margin: 15px 10px;
                span{
                width: 70px;
                height: 40px;
                display: inline-block;
                text-align: center;
                line-height: 40px;
                margin-right: 10px;
                }
            };
            .evaluate-main-list{
                 margin: 15px 10px;
                 display: flex;
                 overflow: auto;
                 border-bottom: 1px solid #ccc;
                 .evaluate-main-right{
                     text-align: right;
                 }
                 .evaluate-main-list-left{
                     img{
                         border-radius: 100%;
                     };
                  
                 };
                    .evaluate-main-cente-div{
                    margin: 5px 0; 
                    display: flex;
                    div{
                        border: 1px solid #ccc;
                        height: 22px;
                        width: 60px;
                        overflow: auto;
                        text-align: center;
                        margin: 0 5px;
                        }
                };
               
            };
            .evaluate-main-cente{
                font-size: 16px;
            };
          
    }


}
</style>