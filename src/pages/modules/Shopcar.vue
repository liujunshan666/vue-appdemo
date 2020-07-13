<template>
    <div class="Shopcar">
        <!-- 标题 -->
        <h3>购物车聚划算</h3>
        <!-- 商品列表 -->
        <div class="main" v-for="(item,i) in getshopCarlist" :key="i">
            <h5 style='font-size:18px;'>{{item.name}}</h5>
            <span style="font-size:16px;color:red">￥{{item.price * item.count}}</span>
           <div>
                <span @click="clickadd(-1,item.name)"><Icon type="md-remove-circle" size='24' style="color:#ccc;"/></span>
                <span>{{item.count}}</span>
                <span @click="clickadd(1,item.name)"><Icon type="md-add-circle" size='24' style="color:#FFC133;"/></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        created(){
             
        },
        computed:{
            getshopCarlist(){
                return this.$store.getters.getshopCarlist
            }
        },
        methods:{
            clickadd(count,name){
                this.$store.commit('changcount',{count,name})
            }
        }
    }
</script>

<style lang="less" scoped>
.Shopcar{
    height: 100%;
    h3{text-align: center;font-size: 14px;background-color: #FFF1D0;}
 .main{
     display: flex;
     justify-content: space-around;
     line-height: 30px;
     border: 1px solid #ccc;
 }
}
</style>