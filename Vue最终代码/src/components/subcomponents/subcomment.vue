<template>
  <div>
      <!-- 1.0 提交评论区域 -->
      <div class="postCommentStyle">
          <h4>提交评论</h4>
          <textarea name="" ref="textAreaRef" cols="30" rows="7" placeholder="请输入评论内容"></textarea>
          <mt-button @click="postComment()" type="primary" size="large">提交评论</mt-button>
      </div>

      <!-- 2.0 展示评论列表区域 -->
      <div class="commentListStyle">
          <h4>评论列表</h4>
          <div v-for="(item,index) in commentList" :key="index" class="commentItemStyle">
              <p>{{item.content}}</p>
              <p>
                  <span>{{item.user_name}}</span>
                  <span>{{item.add_time | fmtDate}}</span>
              </p>
          </div>
          <mt-button @click="loadMore()" class="loadMoreStyle" type="danger" plain size="large">加载更加</mt-button>
      </div>
  </div>
</template>

<style scoped>
    .postCommentStyle,.commentListStyle{
        padding: 6px;
    }

    h4{
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }

    .commentItemStyle{
        height: 100px;
        overflow-y: auto;
        border-bottom:  1px solid rgba(92,92,92,0.3);
    }

    .loadMoreStyle{
        margin-top: 15px;
        margin-bottom: 10px;
    }

    .commentItemStyle p:first-child{
        margin-top: 5px;
        color: black;
        font-size: 14px;
    }

    .commentItemStyle p:last-child{
        margin-top: 40px;
        color: #0094ff;
        display: flex;
        justify-content: space-between;
    }
</style>

<script>
    //导入公共的对象
    import common from '../../common/common.js'

    // import $ from 'jquery'

    import { Toast } from 'mint-ui';

    export default{
        data(){
            return {
                commentList:[],
                pageIndex:1
            }
        },
        props:['commentId'],
        created(){
            // console.log("----subcomment---create---")
            // console.log(this.commentId)
            this.getCommontListData()
        },
        // beforeCreate(){
        //     console.log("---subcomment---beforeCreate")
        // },
        // beforeMount(){
        //     console.log("---subcomment---beforeMount")
        // },
        // mounted(){
        //     console.log("---subcomment---mounted")
        // },
        // beforeUpdate(){
        //     console.log("---subcomment---beforeUpdate")
        // },
        // updated(){
        //     console.log("---subcomment---update")
        // },
        // beforeDestroy(){
        //     console.log("---subcomment---beforeDestroy")
        // },
        // destroyed(){
        //     console.log("---subcomment---destroyed")
        // },
        methods:{
            //加载评论列表数据
            getCommontListData(){
                const url = common.apihost+"api/getcomments/"+this.commentId+"?pageindex="+this.pageIndex

                this.$http.get(url).then(response=>{
                    if(this.pageIndex == 1){
                        this.commentList = response.body.message
                    }else{
                        this.commentList = this.commentList.concat(response.body.message)
                    }
                })
            },
            //加载更多
            loadMore(){
                this.pageIndex++
                this.getCommontListData()
            },
            //提交评论
            postComment(){
                //1.获取评论的内容
                const content = this.$refs.textAreaRef.value

                if(content=='' || content.trim().lenght==0){
                    Toast({
                        message: '内容不能为空',
                        position: 'middle',
                        duration: 3000
                    });
                    return
                }

                //2.发送post请求，提交评论
                const url = common.apihost+"api/postcomment/"+this.commentId
                this.$http.post(url,{content:content},{emulateJSON:true}).then(response=>{
                    //清空textarea中的内容
                    this.$refs.textAreaRef.value = ''
                    //提示用户
                    Toast({
                        message: response.body.message,
                        position: 'middle',
                        duration: 3000
                    });
                    //重新加载第一页
                    this.pageIndex = 1
                    this.getCommontListData()
                })
            }
        }
    }
</script>
