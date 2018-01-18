<template>
  <div>
      <ul class="mui-table-view">
        <li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
            <router-link :to="'/news/newsinfo/'+item.id">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body">
                    <p class="titleStyle">{{item.title}}</p>
                    <p class='mui-ellipsis'>
                        <span>{{item.add_time | fmtDate('YYYY-MM-DD HH:mm')}}</span>
                        <span>点击数{{item.click}}次</span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
  </div>
</template>

<style scoped>
    .mui-table-view-cell{
        height: 80px;
    }

    .mui-table-view .mui-media-object{
        height:65px;
        max-width: 65px;;
    }

    img{
        width: 100%;
        height: 100%;
    }

    .titleStyle{
        font-size: 14px;
        color: gray;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .mui-ellipsis{
        color: #0094ff;
        font-size: 12px;
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
    }
</style>


<script>
    //导入公共对象
    import common from '../../common/common.js'

    export default {
        data(){
            return {
                newsList:[],
                firstInTime : 0
            }
        },
        created(){
            this.getNewsListData()

            this.firstInTime = new Date() - 0
            //console.log("记录下进来的时间...",this.firstInTime)
        },
        // beforeDestroy(){
        //     console.log("进入的时间...",this.firstInTime)
        //     const timeInterval =  (new Date() - 0) - this.firstInTime
        //     console.log("记录下离开的时间...停留了多长时间.... ",timeInterval)
        //     console.log("现在调用后台接口，把时间，newslist.vue传递给后台服务器保存")
        // },
        methods:{
            //获取新闻列表数据的方法
            getNewsListData(){
                const url = common.apihost+"api/getnewslist"
                
                // this.$http.get(url).then(response=>{
                //     this.newsList = response.body.message
                // })

                this.$axios.get(url).then(response=>{
                    this.newsList = response.data.message
                })
            }
        }
    }
</script>
