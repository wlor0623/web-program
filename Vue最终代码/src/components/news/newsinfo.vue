<template>
  <div>
      <!-- 1.0 标题部分 -->
      <div class="titleStyle">
        <h4>{{this.newsInfo.title}}</h4>
        <p>{{newsInfo.add_time | fmtDate}}&nbsp;&nbsp;{{newsInfo.click}}次浏览&nbsp;&nbsp;分类:民生经济</p>
      </div>

      <!-- 2.0 内容部分 -->
      <div class="contentStyle">
        <p v-html="newsInfo.content"></p>
      </div>

      <!-- 3.0 评论子组件 -->
      <subcomment v-if="newsInfo.id" :commentId="newsInfo.id"></subcomment>
  </div>
</template>

<style scoped>
  .titleStyle,.contentStyle{
    padding: 6px;
  }

  .titleStyle{
    border-bottom: 1px solid rgba(92,92,92,0.3);
  }

  h4{
    font-size: 16px;
    color:#0094ff
  }
</style>


<script>
  //导入公共的对象
  import common from '../../common/common.js'

  //导入评论子组件
  import subcomment from '../subcomponents/subcomment'

  export default {
    data(){
      return {
        newsInfo:{}
      }
    },
    created(){
      this.getNewsInfoData()
      console.log("------newsinfo created-----")
    },
    beforeCreate(){
      console.log("---newsinfo---beforeCreate")
    },
    beforeMount(){
      console.log("---newsinfo---beforeMount")
    },
    mounted(){
      console.log("---newsinfo---mounted")
    },
    beforeUpdate(){
      console.log("---newsinfo---beforeUpdate")
    },
    updated(){
      console.log("---newsinfo---update")
    },
    beforeDestroy(){
      console.log("---newsinfo---beforeDestroy")
    },
    destroyed(){
      console.log("---newsinfo---destroyed")
    },
    methods:{
      //获取新闻详情数据
      getNewsInfoData(){
        const url = common.apihost+"api/getnew/"+this.$route.params.newsId

        // this.$http.get(url).then(response=>{
        //   this.newsInfo = response.body.message[0]
        // })

        this.$axios.get(url).then(response=>{
          this.newsInfo = response.data.message[0]
        })
      }
    },
    components:{
      subcomment:subcomment
    }
  }
</script>