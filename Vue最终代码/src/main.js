//导入第三方包
import Vue from 'vue'
import Mint from 'mint-ui'
import VueResource from 'vue-resource'
import moment from 'moment'
import VuePreview from 'vue-preview'
import axios from 'axios'

//基于Vue的第三方包，需要通过Vue.use(xxx)集成进来
Vue.use(Mint) //它只是导入组件，并且注册
Vue.use(VueResource) //Vue.prototype.$http = VueResource对象
Vue.use(VuePreview) //Vue.$preview
Vue.prototype.$axios = axios

//导入css样式
//todo:上线的时候换成style.min.css
import 'mint-ui/lib/style.min.css'
import './statics/mui/css/mui.min.css'
import './statics/css/site.css'

//导入App.vue
//var App = require('./App.vue') //es5
import App from './App.vue' //es6

//全局的过滤器
Vue.filter('fmtDate',(input,formatString)=>{
    const lastFormatString = formatString || "YYYY-MM-DD HH:mm:ss"

    /**
     * moment里面接的参数，要过滤的原始时间，比如2015-04-16T03:50:28.000Z
     * format里面接的参数，要格式化成的字符串
     */
    return moment(input).format(lastFormatString)
})

//导入路由对象
import router from './routers/router.js'
import store from './vuex/store.js'

//创建根实例（View-Model），让根实例显示App.vue
new Vue({
    el:'#app',
    store,//把vuex仓库注入到根实例，整个项目就拥有的仓库，就可以往里面存取值了
    router,//把路由对象注入到根实例中，这样我们整个项目，就拥有路由的功能了
    // render:function(createElement){
    //     return createElement(App)
    // }
    render:h=>h(App)
})