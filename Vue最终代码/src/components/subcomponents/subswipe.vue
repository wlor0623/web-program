<template>
   <div>
       <mt-swipe :auto="lunbo_time">
        <mt-swipe-item v-for="(item,index) in lunboArray" :key="index">
          <img :src="item.img" alt="">
        </mt-swipe-item>
      </mt-swipe>
   </div>
</template>
   
<style scoped>
    /** 轮播图的样式 */
   .mint-swipe {
    height: 250px;
    width: 100%;
  }

  img {
    width: 100%;
    height: 100%;
  }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       props:['lunbo_url','lunbo_time'],
       data() {
           return {
               lunboArray: [] //设置我们轮播图所需的模型
           }
       },
       created() {
           this.getLunboArrayData()
       },
       methods: {
            //定义了一个方法，用来获取轮播图需要的数据
            getLunboArrayData() {
                const url = `${common.apihost}${this.lunbo_url}`

                this.$http.get(url).then(response => {
                    response.body.message.forEach(item => {
                        if(item.src){
                            item.img = item.src
                        }
                    });
                    this.lunboArray = response.body.message;
                });
            }
       }
   }
</script>