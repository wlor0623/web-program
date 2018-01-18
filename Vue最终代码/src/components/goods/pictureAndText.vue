<template>
   <div>
       <!-- 标题部分 -->
       <div class="titleStyle">
           <h4>{{pictureAndText.title}}</h4>
       </div>

       <!-- 内容部分 -->
       <div class="contentStyle">
           <p v-html="pictureAndText.content"></p>
       </div>
   </div>
</template>
   
<style>
   .titleStyle,.contentStyle{
       padding: 6px;
   }

   h4{
       font-size: 16px;
       color: #0094ff;
       border-bottom: 1px solid rgba(92, 92, 92, 0.3);
       padding-bottom: 6px;
   }

   /* img{
       width:100%;
   } */

   .gomeImgLoad{
       width: 100%;
    }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               pictureAndText:{}
           }
       },
       created() {
           this.getPictureAndTextData()
       },
       methods: {
           //获取图文介绍的图片
           getPictureAndTextData(){
               const url = `${common.apihost}api/goods/getdesc/${this.$route.params.goodsId}`

               this.$http.get(url).then(response=>{
                   this.pictureAndText = response.body.message[0]
                   console.log(this.pictureAndText)
               })
           }
       }
   }
</script>