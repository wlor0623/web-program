<template>
  <div>
      <!-- 1.0 头部 -->
      <mt-header fixed title="Vue_Project"></mt-header>
      <div @click="goBack()" v-show="isShowBack" class="backStyle">&lt;返回</div>

      <!-- 2.0 中间内容 -->
      <router-view class="routerViewStyle"></router-view>

      <!-- 3.0 底部TabBar -->
      <mt-tabbar :class="isShowTabBar ? '' : 'hiddenTabBarStyle' " :fixed="true">
        <mt-tab-item>
          <router-link to="/home">
            <img src="http://img08.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <router-link to="/category">
            <img src="http://img07.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <router-link to="/shopcart">
            <img src="http://img08.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
            <span v-show="this.badge" class="mui-badge">{{this.badge}}</span>
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <img src="http://img09.jiuxian.com/bill/2016/0224/cba9029a8f4444a989a2ab5aa84c6538.png">
        </mt-tab-item>
      </mt-tabbar>
  </div>
</template>

<!-- scoed代表样式私有，只能在当前组件中起作用 -->
<style scoped>
  .mint-tabbar > .mint-tab-item.is-selected{
    background-color: #fafafa;
  }

  img{
    width:42px;
    height: 35px;
  }

  .routerViewStyle{
    margin-top: 40px;
  }

  /**返回按钮的样式*/
  .backStyle{
    position: fixed;
    left: 8px;
    top: 10px;
    z-index: 2;
    color: white;
    font-size: 16px;
    font-weight: 900;
  }

  /**
    隐藏TabBar的样式
  */
  .hiddenTabBarStyle{
    display: none;
  }

  .mui-badge{
    position: absolute;
    top: 5px;
    right: 120px;
    background-color: red;
    color: white;
  }
</style>

<script>

  export default{
    data(){
      return {
        isShowBack:false, //是否显示返回按钮
        isShowTabBar:true, //是否显示TabBar
        badge:0
      }
    },
    created(){
      this.isShowOrHidden(this.$route.path)
    },
    updated(){
      //从仓库中取出加入购物车中的总数，然后赋值给徽标显示
      this.badge = this.$store.getters.getGoodsTotalCount
    },
    methods:{
      //返回
      goBack(){
        this.$router.go(-1)
      },
      isShowOrHidden(path){
        if(path!='/home'){
          this.isShowBack = true
          this.isShowTabBar = false
        }else{
          this.isShowBack = false
          this.isShowTabBar = true
        }
      }
    },
    watch:{
      /**
       * 属性名称，代表要监控的对象
       * 值，是处理函数，但是不要写箭头函数
       * 
       * $route只有路由发生变化的时候，才会触发该处理函数
       */
      //es5
      // $route:function(newValue,oldValue){
      //   console.log(newValue)
      // }

      //es6
      $route(newValue,oldValue){
        this.isShowOrHidden(newValue.path)
      }
    }
  }
</script>

