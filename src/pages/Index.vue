<template>
  <div class="container">
            <!-- 头部 -->
            <div class="header">
                <!-- 脑壳 -->
                <div class="header-header">
                  <div class="header-img"><img :src="datamerchant.avatar"></div>
                  <div class="header-main">
                      <div><img src="../assets/images/brand@2x.png" alt="">{{datamerchant.name}}</div>
                      <p>{{datamerchant.description}} / {{datamerchant.deliveryTime}} 分钟送达</p>
                      <p class="p"><img src="../assets/images/decrease_2@2x.png" >在线支付满28减5,满30减10</p>
                  </div>
                  <span class="span">5个></span>
                </div>
                <!-- 底部 -->
                <div class="header-bottom">
                  <img src="../assets/images/bulletin@2x.png" alt="">
                 <p class="header-bottom-p">{{datamerchant.bulletin}}</p>
                </div>
            </div>
            <!-- 中间 -->
          <div class="router-box">
              <router-link to="/" :class="{selected:curSelectedLab==0}"><span @click="clickTitle(0)">商品</span></router-link>
              <router-link to="/evaluate" :class="{selected:curSelectedLab==1}"><span @click="clickTitle(1)">评价</span></router-link>
              <router-link to="/business" :class="{selected:curSelectedLab==2}"><span @click="clickTitle(2)">商家</span></router-link>
          </div>
          <!-- 路由出口 -->
          <div class="center">
            <router-view/>
          </div>
          <!-- 底部 -->
          <transition name="slide-fade">
          <div class="shopcar-board" v-show="showBoard">
             <Shopcar/>
          </div>
          </transition>
          <!-- vue事件支持直接写js代码，简写方式 -->
          <div class="footer" @click="showBoard=!showBoard">
              <span class="footer-span"><Icon type="md-cart" size='30' :color=" getIconUrl ? '#f60':'#ccc'"/></span>
              <p>总价￥{{getTotalPrice}} </p>
              <span style="font-size:14px;color:#ccc;line-height: 60px;">另需配送费￥4元</span>
              <div>￥20起送</div>
          </div>
  </div>
</template>

<script>
import {getMerchant} from '@/api/apis.js'
import Shopcar from './modules/Shopcar'
  export default {
      data() {
        return {
            curSelectedLab:0,
            //数据列表
            datamerchant:{},
            showBoard:false
        }
      },
      methods:{
       clickTitle(val){
          this.curSelectedLab=val;
       }
      },
      created(){
        //一进入页面，立即初始化vuex的列表数据
         this.$store.dispatch('initdatamerchant')
        //获取商家信息
        getMerchant().then((data)=>{
            this.datamerchant=data.data.data;
        })
        
      },
      components:{
        Shopcar
      },
      computed:{
        getIconUrl(){
          // 判断购物车的长度大于0的时候执行
          if(this.$store.getters.getshopCarlist.length>0){
              return true
          }else{
              return false
          }
          
           
        },
        //计算总价
        getTotalPrice(){
          let price = 0;
          for(let obj of this.$store.getters.getshopCarlist){
            price +=obj.price *obj.count
          }
          return price;
        }
      }
  }
</script>

<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
  .header{
      position: relative;
       background-image: linear-gradient(#3E3025,#444243);
      height: 130px;
      color: #fff;
    .header-header{
       padding-top: 25px;
      padding-left: 20px;
      display: flex;
      .header-img{
        img{width: 60px;height: 60px;}
      };
      .header-main{
        margin-left: 20px;  
        line-height: 28px;
        div{
          display: flex;
          align-items: center;
          vertical-align:middle;
          line-height: 20px;
          img{width: 30px;height: 18px;margin-right: 5px;};
          height: 18px;
          font-size: 18px;
          font-weight: bolder;
        };
        .p{
          display: flex;
            font-size: 12px;
            line-height: 15px;
            img{width: 15px;height: 15px;margin-right: 5px;};
        }
      };
      .span{display: inline-block;
      width: 40px;height: 22px;
      background-color: red;
      text-align: center;line-height: 25px;
      border-radius: 20px 20px;
       background-image: linear-gradient(rgb(190, 113, 54),#7a5266);
       position: absolute;
       right: 10px;
       bottom: 40px;
      }
    };
    .header-bottom{
      width: 100%;
      height: 30px;
      line-height: 32px;
      position: absolute;
      bottom: 0;
      background-color: rgba(62,42,60,0.8);
      color: #fff;
      display: flex;
      align-items:center;
      img{width: 25px;height: 14px;margin-left: 5px;margin-right: 5px;};
        .header-bottom-p{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
          }
     
    }
  }
  // 头部底部
  .router-box{
      display: flex;
      justify-content:space-around;
      .selected{color:red;}
      line-height: 42px;
      border-bottom: 1px solid #ccc;
  }
  .center{
      flex: 1;
      background-color: #fff;
  }
  .shopcar-board{
    width: 100%;
    background: #fff;
    position: absolute;
    bottom:60px;
  }
  .footer{
       height: 60px;
       width: 100%;
       position: fixed;
       bottom: 0; 
       background-color: #141C27; 
       display: flex;
       justify-content: space-between;
       .footer-span{
         margin-top: -5px;
        display:inline-block;
        width: 50px;height: 50px;
        background: #2B343D;
        text-align: center;
        line-height: 50px;
        border-radius: 50%;
        margin-left: 20px;
       };
       p{line-height: 60px;font-size: 16px;color: #fff;}
       div{width: 90px;height: 100%;
       background-color:#2B343B;color:#808589;line-height: 60px;
       font-size: 14px;
       text-align: center;
       }
  }

}

</style>