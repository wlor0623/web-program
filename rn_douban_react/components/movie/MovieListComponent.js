import React, { Component } from 'react'

import { 
    View, 
    Text, 
    ListView,
    ActivityIndicator,
    Image,
    TouchableOpacity 
} from 'react-native'

import {Actions} from 'react-native-router-flux'

export default class MovieListComponent extends Component {
    constructor() {
        super()

        this.state = {
            isLoading: true,//正在加载中
            movieList: [] //电影列表数据，充当的数据源这个角色
        }
    }

    componentWillMount() {
        const url = "https://api.douban.com/v2/movie/in_theaters"

        fetch(url).then(response => response.json()).then(data => {
            //创建数据源
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

            this.setState({
                isLoading: false,
                //这样写了之后，我们MovieList就不再仅仅是一个普通的数组了，现在它就是一个真正可以给ListView提供数据的数据源了
                movieList: ds.cloneWithRows(data.subjects)
            })
        })
    }

    render() {
        if (this.state.isLoading) {//正在加载
            return <ActivityIndicator
                size="large"
                color="green"
            />
        } else {
            return <ListView style={{backgroundColor:'#FFFFFF'}}
                dataSource={this.state.movieList}
                renderRow={(rowData) => {
                    return <TouchableOpacity onPress={()=>{this.goMovieDetail(rowData.id)}} activeOpacity={0.5} style={{padding:10,flexDirection:'row',borderBottomColor:'#eee',borderBottomWidth:1}}>
                        {/* 1.0左边的图片 */}
                        <Image style={{width:100,height:140,marginRight:15}} source={{uri:rowData.images.medium}} />
                        {/* 2.0 右边的文字描述 */}
                        <View style={{justifyContent:'space-between'}}>
                            {/* 电影名称 */}
                            <Text>电影名称:{rowData.title}</Text>
                            {/* 电影类型 */}
                            <Text>电影类型{rowData.genres.join(',')}</Text>
                            {/* 上映年份 */}
                            <Text>上映年份:{rowData.year}</Text>
                            {/* 豆瓣评分 */}
                            <Text>豆瓣评分:{rowData.rating.average}</Text>
                        </View>
                    </TouchableOpacity>
                }}
            />
        }
    }

    //跳转到电影详情组件中去,通过编程式导航触发路由
    goMovieDetail(movieId){
        //通过编程式导航触发路由，并且传递值过去
        Actions.movieDetail({movieId:movieId})
    }
}