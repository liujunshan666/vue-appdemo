<template>
    <div class="goods">
            <!-- 左边 -->
            <div class="goodsLeft">
                <ul class="content">
                    <!--要滚动的 -->
                    <div v-for="(item,index) in data" :key="index" @click="nanclick(index)" :class="{goodsLeftNav:true,setnav:curSelectedLab===index}">
                        {{item.name}} 
                    </div>
                </ul>
            </div>
            <!-- 右边    -->
            <div class="goodsRight"> 
                <ul class="content">
                    <div  v-for="(val,i) in data" :key="val.name" :id="i">
                            <!-- 标题 -->
                        <p class="right-p">{{val.name}}</p>
                        <!-- 盒子 -->
                        <div class="right-main" v-for="child in val.foods" :key="child.name">
                                <!-- 内容 -->
                            <div>
                                <img :src="child.icon" alt="" width="60px" height="60px">
                            </div>
                            <div>
                            <h3>{{child.name}}</h3>
                            <p>{{child.description}}</p>
                            <p>月售{{child.sellCount}}份 好评率{{child.rating}}%</p>
                            <p style="color:#ED5557">￥{{child.price}} <del style="color:#CACCD0">￥{{child.oldPrice}}</del></p>
                            </div>
                            <!-- 按钮 -->
                            <p class="right-main-span">
                            <span v-show="child.count > 0" @click="clickadd(-1,child.name)"><Icon type="md-remove-circle" size='24' style="color:#ccc;"/></span>
                            <span v-show="child.count > 0" >{{child.count}}</span>
                            <span @click="clickadd(1,child.name)"><Icon type="md-add-circle" size='24' style="color:#00A2DD;"/></span>
                            </p>
                        </div>
                    </div>
                </ul>
            </div>
    </div>
</template>

<script>
//import {listMerchant} from '@/api/apis.js'
import BScroll from 'better-scroll'
    export default {
        data() {
            return {
                // data:{},
                curSelectedLab:0,
            }
        },
        created(){
            //一进入页面触发vuex中的actions属性
            this.$store.dispatch('initdatamerchant')
            // listMerchant().then(data=>{
            //        this.data=data.data.data;
            //     //    console.log(this.data);
            // })
        },
         mounted(){
             this.leftScroll = new BScroll('.goodsLeft',{
                click:true//点击事件开启;
            });
            this.RightScroll = new BScroll('.goodsRight',{
                probeType:3,  //让BetterScroll实时派发事件
                 click:true
            });
            //监听滚动事件,使用示例对象.on('事件名')
            this.RightScroll.on('scroll',(obj)=>{
                   var _y= Math.abs(obj.y)
                //    console.log(_y); 
               for(let obj of this.getDivHeight){
                   if(_y<obj.max &&_y>=obj.min){
                       this.curSelectedLab = obj.index
                       break;
                   }
               }
                   
                    
                    
            })
        },
        methods:{
            nanclick(val){
               this.curSelectedLab=val;
               this.RightScroll.scrollToElement(document.getElementById(val),800)
            },
            clickadd(count,name){
                this.$store.commit('changcount',{count,name})
            }
        },
        computed:{
            //计算每个商品的高度
            getDivHeight(){
                let arr=[]
                //计算高度
                for(let i=0;i<this.data.length;i++){
                    arr.push(document.getElementById(i).offsetHeight)
                }
                 //可以先计算出我想要的区间段，累加高度 { max, min, index }
                 let totalHeight =0//累加高度
                 let newarr=[]
                 for(let n=0;n<arr.length;n++){
                    newarr.push({max:arr[n]+totalHeight,min:totalHeight,index:n})
                    totalHeight += arr[n] //每循环一次就把高度加到总高度上
                 }
                return newarr;
            },
            //拿到vuex里面的数据
            data(){
                return this.$store.state.data
            }
        }
    }
</script>

<style lang="less" scoped>
.goods{
   
    width: 100%;
    height: 100%;
    display: flex;
    overflow: auto;
    flex-direction: row;
    // 左边
    .goodsLeft{
        width: 90px;
        height: 420px;
        overflow: auto;
        background-color: #F4F5F7;
       .goodsLeftNav{
            display: flex;
            align-items: center;
            padding: 0 20px;
            height: 60px;;
            border-bottom: 1px solid #ccc;
        }
             .setnav{background-color: #fff;}//左侧标题选中效果
    };
    //右边
    .goodsRight{
        flex:1;
        background-color:#fff;
        overflow: auto;
        height: 420px;
        .right-p{
                background-color: #F4F5F7;
                line-height: 25px;
                height: 25px;
                border-left: 2px solid #ccc;
                text-indent: 5px;
        };
        .right-main{
            display: flex;
            line-height: 20px;
            padding-left: 10px;
            padding-top: 10px;
            text-indent: 10px;
            position: relative;
            .right-main-span{position: absolute;bottom: 2px;right: 3px;}
        }
    };
}
</style>