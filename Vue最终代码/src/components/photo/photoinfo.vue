<template>
   <div>
       <!-- 1.0 标题部分 -->
       <div class="titleStyle">
           <h4>{{photoInfo.title}}</h4>
           <p>{{photoInfo.add_time | fmtDate('YYYY-MM-DD')}}&nbsp;&nbsp;{{photoInfo.click}}次浏览</p>
       </div>

       <!-- 2.0 缩略图 -->
       <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li v-for="(item,index) in thumbImageList" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <img  @click="$preview.open(index, thumbImageList)" class="preview-img" height="100" :src="item.src" alt="">
            </li>
        </ul> 

       <!-- 3.0 内容 -->
       <div class="contentStyle">
           <p v-html="photoInfo.content"></p>
       </div>

       <!-- 4.0 评论子组件 -->
       <sub-comment :commentId="this.$route.params.photoId"></sub-comment>
   </div>
</template>
   
<style scoped>
   .titleStyle,.contentStyle{
       padding: 6px;
   }

   h4{
       font-size: 16px;
       color: #0094ff;
   }

   .contentStyle p{
       color: gray;
   }

   .mui-grid-view.mui-grid-9 .mui-table-view-cell{
       border:none;
   }

   .mui-grid-view.mui-grid-9{
       border: none;
   }
</style>
   
<script>
   import common from '../../common/common.js'
   
   //导入评论子组件
   import subComment from '../subcomponents/subcomment'

   export default {
       data() {
           return {
               photoInfo:{},
               thumbImageList:[]//缩略图数组
           }
       },
       created() {
           this.getPhotoInfoData(),
           this.getThumbImageListData()
       },
       methods: {
           //获取图片详情数据
           getPhotoInfoData(){
                const url = `${common.apihost}api/getimageInfo/${this.$route.params.photoId}` 
                
                this.$http.get(url).then(response=>{
                    this.photoInfo = response.body.message[0]
                })
           },
           //获取图片缩略图
           getThumbImageListData(){
               const url = `${common.apihost}api/getthumimages/${this.$route.params.photoId}`

               this.$http.get(url).then(response=>{
                   response.body.message.forEach(item => {
                       item.w = 600,
                       item.h = 600
                   });
                   this.thumbImageList = response.body.message
               })
           }
       },
       components:{
           subComment
       }
   }
</script>