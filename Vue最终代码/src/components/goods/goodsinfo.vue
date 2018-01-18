<template>
   <div>
       <!-- 1.0 轮播子组件 -->
       <div class="lunboStyle">
           <subswipe :lunbo_url="'api/getthumimages/'+this.$route.params.goodsId" :lunbo_time="1000"></subswipe>
       </div>

       <!-- 2.0 商品信息 -->
       <div class="goodsInfoStyle">
           <h5>{{goodsInfo.title}}</h5>
           <p>
                市场价:<s>￥{{goodsInfo.market_price}}</s> &nbsp;&nbsp;销售价:￥<span>{{goodsInfo.sell_price}}</span>
            </p>
            <subnumber v-on:countChange="getSubNumberCount" v-if="goodsInfo.stock_quantity" :stock_quantity="goodsInfo.stock_quantity"></subnumber>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button @click="addToShopCart()" type="danger" size="small">加入购物车</mt-button>
       </div>

       <!-- 3.0 商品参数 -->
       <div class="goodsParamsStyle">
           <h6>商品参数</h6>
           <ul>
               <li>商品货号:{{goodsInfo.goods_no}}</li>
               <li>库存情况:剩余{{goodsInfo.stock_quantity}}件</li>
               <li>上架时间:{{goodsInfo.add_time | fmtDate}}</li>
           </ul>
       </div>

       <!-- 4.0 图文介绍&商品评论 -->
       <div class="pictureAndTextStyle">
           <mt-button @click="goToPictureAndText()" size="large" type="primary" :plain="true">图文介绍</mt-button>
           <mt-button @click="goToGoodsComment()" size="large" class="goodsCommentStyle" type="danger" :plain="true">商品评论</mt-button>
       </div>
   </div>
</template>
   
<style scoped>
   .lunboStyle,.goodsInfoStyle,.goodsParamsStyle,.pictureAndTextStyle{
       margin: 8px;
       border: 1px solid rgba(92, 92, 92, 0.3);
       border-radius: 5px;
       padding: 6px;
   }

   h5{
       color: #0094ff;
       font-size: 16px;
       border-bottom: 1px solid rgba(92, 92, 92, 0.3);
       padding-bottom: 8px;
   }

   .goodsInfoStyle p span{
       color: red;
       font-size: 16px;
   }

   h6{
       border-bottom: 1px solid rgba(92, 92, 92, 0.3);
       padding-bottom: 8px;
   }

   .goodsParamsStyle ul{
       margin: 0px;
       padding: 0px;
   }

   .goodsParamsStyle ul li{
       list-style: none;
       font-size: 14px;
   }

   .goodsCommentStyle{
       margin-top: 10px;
   }
</style>
   
<script>
   import common from '../../common/common.js'

   //导入轮播子组件
   import subswipe from '../subcomponents/subswipe'
   import subnumber from '../subcomponents/subnumber'

   import { Toast } from 'mint-ui';
    
   export default {
       data(){
           return {
               goodsInfo:{},
               goodsCount:1
           }
       },
       created(){
           this.getGoodsInfoData()
       },
       methods:{
           //获取商品详情的数据
           getGoodsInfoData(){
               const url = `${common.apihost}api/goods/getinfo/${this.$route.params.goodsId}`

               this.$http.get(url).then(response=>{
                   this.goodsInfo = response.body.message[0]
               })
           },
           //跳转到图文介绍中去
           goToPictureAndText(){
                // this.$router.push({ path: `/goods/pictureAndText/${this.$route.params.goodsId}` })
                //如果不需要带参数，name还是可以使用的嘛
                // this.$router.push({ name: 'pictureAndText', params: { goodsId: this.$route.params.goodsId }})
                this.$router.push({ name: "pictureAndText",params: { goodsId: this.$route.params.goodsId } })
           },
           //跳转到商品评论组件
           goToGoodsComment(){
               // 带查询参数，变成 //goods/goodscomment?goodsId=87
               this.$router.push({ path: '/goods/goodscomment', query: {  goodsId: this.$route.params.goodsId  }})
           },
           //接收子组件传递过来值的处理函数
           getSubNumberCount(count){
               this.goodsCount = count
           },
           //加入购物车
           addToShopCart(){
               Toast({
                    message: '加入购物车成功',
                    position: 'middle',
                    duration: 2000
               });

               //2.0 把用户点击加入购物车的商品信息存储到仓库中，方便shopcart.vue和App.vue取出数据进行操作
               const goods = {goodsId:this.$route.params.goodsId,count:this.goodsCount}

               //同步的往仓库中去存储数据
               this.$store.commit('addGoods',goods)

               //异步的往仓库中去存储数据
               //this.$store.dispatch('addGoodsAsync',goods)
           }
       },
       components:{
           subswipe,
           subnumber
       }
   }
</script>