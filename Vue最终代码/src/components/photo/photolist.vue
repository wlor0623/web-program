<template>
  <div>
      <!-- 1.0 图片分类 -->
      <div class="photoCategoryStyle">
          <ul>
              <li @click="getPhotoListByCategoryId(0)">全部</li>
              <li @click="getPhotoListByCategoryId(item.id)" v-for="item in categoryList" :key="item.id">{{item.title}}</li>
          </ul>
      </div>

      <!-- 2.0 图片列表 -->
      <div class="photoListStyle">
          <ul>
              <li v-for="item in photoList" :key="item.id">
                  <router-link :to="'/photo/photoinfo/'+item.id">
                    <img :src="item.img_url" alt="">
                    <p class="titleAndZhaiyaoStyle">
                        <span>{{item.title}}</span><br/>
                        {{item.zhaiyao}}
                    </p>
                  </router-link>
              </li>
          </ul>
      </div>
  </div>
</template>

<style scoped>
    .photoCategoryStyle{
        overflow-x: auto;
    }

    /** 图片分类的样式 */
    .photoCategoryStyle ul{
        margin: 3px 2px;
        padding: 0px 0px 12px 0px;
        white-space: nowrap;
    }

    .photoCategoryStyle ul li{
        list-style: none;
        display: inline-block;
        font-size: 16px;
        color: #0094ff;
        margin: 0px 3px;
    }

    /**
        图片列表的样式
    */
    .photoListStyle ul{
        margin: 2px;
        padding: 0px 2px;
    }

    .photoListStyle ul li{
        list-style: none;
        position: relative;
    }

    img{
        width: 100%;
        height: 400px;
    }

    .titleAndZhaiyaoStyle{
        position: absolute;
        left: 2px;
        bottom: 2px;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .titleAndZhaiyaoStyle span {
        font-size: 16px;
        font-weight: 600;
    }
</style>


<script>
    //导入common
    import common from '../../common/common.js'

    import { Indicator } from 'mint-ui'

    export default{
        data(){
            return {
                categoryList:[],//图片分类的数组
                photoList:[]//图片列表数组
            }
        },
        created(){
            this.getCategoryListData()
            this.getPhotoListByCategoryId(0) //刚开始进来的时候，加载全部数据
        },
        methods:{
            //获取图片分类数据
            getCategoryListData(){
                const url = `${common.apihost}api/getimgcategory`

                this.$http.get(url).then(response=>{
                    this.categoryList = response.body.message
                })
            },
            //根据图片的分类id去获取对应的图片列表数据
            getPhotoListByCategoryId(categoryId){
                const url = `${common.apihost}api/getimages/${categoryId}` 
                Indicator.open({
                    text: '哥正在加载中...',
                    spinnerType: 'triple-bounce'
                });

                this.$http.get(url).then(response=>{
                    Indicator.close()
                    this.photoList = response.body.message
                }).catch(err=>{
                    Indicator.close()
                })
            }
        }
    }
</script>