import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //Vue.$store

//创建仓库
const store = new Vuex.Store({
    state:{
        goodsList:[]//数组中存的是一个一个用户加入的商品对象
        //[{goodsId:87,count:2},{goodsId:88,count:3},{goodsId:87,count:3}]
    },
    getters:{
        //返回购物车中加入商品的总数
        getGoodsTotalCount(state){
            let totalCount = 0
            state.goodsList.forEach(goods=>{
                totalCount+=goods.count
            })

            return totalCount
        },
        //获取购物车中所有的数据
        getGoodsList(state){
            return state.goodsList
        }
    },
    mutations:{
        /**
         * 这个方法，将来是goodsinfo.vue调用，把商品信息传递过来保存到仓库中的goodsList去
         * goods应该是  {goodsId:87,count:3}
         */
        addGoods(state,goods){
            state.goodsList.push(goods)
        },
        //根据商品id去删除对应的数据
        deleteGoodsByGoodsId(state,goodsId){
            for(var i=state.goodsList.length-1;i>=0;i--){
                const everyGoodsItem = state.goodsList[i]
                if(goodsId == everyGoodsItem.goodsId){
                    state.goodsList.splice(i,1)
                }
            }
        }
    },
    actions:{
        //context 有点类似于 $store的感觉
        addGoodsAsync(context,goods){
            setTimeout(()=>{
                context.commit('addGoods',goods)
            },2000)
        }
    }
})

export default store
