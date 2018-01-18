<template>
   <div>
       <subcomment :commentId="$route.query.goodsId"></subcomment>
   </div>
</template>
   
<style scoped>
   
</style>
   
<script>
   //导入评论子组件
   import subcomment from '../subcomponents/subcomment'

   export default {
       components:{
           subcomment
       }
   }
</script>