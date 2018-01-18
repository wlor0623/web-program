<template>
   <div>
       <!-- 1.0 展示购物车列表 -->
       <div class="shopCartItemStyle" v-for="(item,index) in shopCartList" :key="item.id">
           <!-- 开关 -->
           <mt-switch @change="statistics()" class="switchStyle" v-model="item.isSelect"></mt-switch>
           <!-- 商品缩略图 -->
           <div class="thumbImageStyle">
               <img :src="item.thumb_path" alt="">
           </div>
           <!-- 价格和数量 -->
           <div class="titleAndPriceStyle">
               <p>{{item.title}}</p>
               <p>
                   <span>{{item.sell_price}}</span>
                   <span>商品数量:{{item.count}}</span>
               </p>
           </div>
           <!-- 删除按钮 -->
           <mt-button @click="deleteGoods(index)" :disabled="!item.isSelect" class="deleteButtonStyle" size="small" type="danger">删除</mt-button>
       </div>

       <!-- 2.0 展示统计信息 -->
       <div class="statisticsStyle">
           <div>
               <h4>总计(不含运费)</h4>
               <p>已经勾选商品 <span>{{totalCount}}</span> 件,总价 <span>{{totalPrice}}</span> 元</p>
           </div>
           <mt-button class="goToPayStyle" size="normal" type="danger">去结算</mt-button>
       </div>
   </div>
</template>
   
<style scoped>
   .shopCartItemStyle{
       height: 100px;
       display: flex;
       align-items: center;
       border-bottom: 1px solid rgba(92,92,92,0.3);
   }

   .switchStyle{
       margin-left: 5px;
   }

   .thumbImageStyle{
       max-width:70px;
       height: 70px;
       border: 1px solid rgba(92,92,92,0.3);
       padding: 3px;
       border-radius: 5px;
       margin-left: 5px;
   }

   .thumbImageStyle img{
       width:100%;
       height: 100%;
   }

   .deleteButtonStyle{
       margin-right: 5px;
   }

   .titleAndPriceStyle{
       margin-left: 5px;
       flex: 1;
   }

   .titleAndPriceStyle p:first-child{
       color: #0094ff;
       font-size: 14px;
   }

   .titleAndPriceStyle p:last-child span:first-child{
       font-size: 16px;
       color: red;
   }

   .statisticsStyle{
       height: 100px;
       display: flex;
       background-color: rgba(92,92,92,0.3);
       justify-content: space-between;
       align-items: center;
   }

   .statisticsStyle div:first-child{
       margin-left: 5px;
   }

   .statisticsStyle div:first-child span{
       color: red;
       font-size: 18px;
   }

   .goToPayStyle{
       margin-right: 5px;
   }
</style>
   
<script>
   import common from '../../common/common.js'

   import { MessageBox } from 'mint-ui'
   
   export default {
       data() {
           return {
               shopCartList:[],
               totalCount:0,//总数量
               totalPrice:0//总价格
           }
       },
       created() {
           this.getShopCartListData()
       },
       methods: {
           //获取购物车展示信息
           getShopCartListData(){
               //1.从仓库中取出存在里面的数组 [{goodsId:87,count:2},{goodsId:88,count:3}, {goodsId:87,count:3}] 
               const goodsList = this.$store.getters.getGoodsList

               if(goodsList.length == 0) return

               //2.[{goodsId:87,count:2},{goodsId:88,count:3}, {goodsId:87,count:3}]  变成临时的对象
               //最终应该变成 const tempObj = {87:5,88:3}
               const tempObj = {}
               goodsList.forEach(goods => {
                   if(tempObj[goods.goodsId]){
                       tempObj[goods.goodsId] += goods.count
                   }else{
                       tempObj[goods.goodsId] = goods.count
                   }
               });

               //3.把 {87:5,88:3} 属性名称取出来放在一个临时的数组中 [87,88]
               const tempArray = []
               for(var key in tempObj){
                   tempArray.push(key)
               }

               //4.把  [87,88] 变成 87,88 让它符合发送网络请求的需要
               const idsString = tempArray.join(',')

               //5.发送网络请求
               const url = `${common.apihost}api/goods/getshopcarlist/${idsString}`
               this.$http.get(url).then(response=>{
                   response.body.message.forEach(item=>{
                       item.count = tempObj[item.id]
                       item.isSelect = true
                   })

                   this.shopCartList = response.body.message

                   //放在最后
                   this.statistics()
               })
           },
           //统计商品总数量和总价格
           statistics(){
               let tempCount = 0
               let tempPrice = 0
               this.shopCartList.forEach(item=>{
                   if(item.isSelect){
                       tempCount+=item.count
                       tempPrice+=item.count * item.sell_price
                   }
               })

               this.totalCount = tempCount
               this.totalPrice = tempPrice
           },
           deleteGoods(index){
               MessageBox.confirm('确定删除吗?').then(action => {
                 const id = this.shopCartList[index].id

                 //1.根据id去删除仓库里面的数据
                 this.$store.commit('deleteGoodsByGoodsId',id)

                 //2.干掉选中的那个
                 this.shopCartList.splice(index,1);

                 //3.重新渲染
                 this.statistics()
               },cancel=>{
                   
               });
           }
       }
   }
</script>