import React,{Component} from 'react'

import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image
} from 'react-native'

export default class MovieDetailComponent extends Component{
    constructor(){
        super()

        this.state = {
            isLoading:true,//正在加载
            movieInfo:{}
        }
    }

    componentWillMount(){
        const url = `https://api.douban.com/v2/movie/subject/${this.props.movieId}`

        fetch(url).then(response => response.json()).then(data=>{
            this.setState({
                isLoading:false,
                movieInfo:data
            })
        })
    }

    render(){
        if(this.state.isLoading){ //加载完毕
            return <ActivityIndicator
                size="large"
                color="green"
            />
        }else{
            return <ScrollView style={{padding:10}}>
                {/* 电影标题 */}
                <Text style={{textAlign:'center',fontSize:26}}>{this.state.movieInfo.title}</Text>
                {/* 图片 */}
                <View style={{alignItems:'center',marginTop:10}}>
                    <Image style={{width:300,height:350}} source={{uri:this.state.movieInfo.images.large}} />
                </View>
                {/* 主要演员 */}
                <Text style={{fontSize:20,marginTop:10,marginBottom:10}}>主要演员:</Text>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    {
                        this.state.movieInfo.casts.map((item,i)=>{
                            return <View key={i}>
                                <Image style={{width:60,height:90}} source={{uri:item.avatars.small}} />
                                <Text style={{textAlign:'center',marginTop:5}}>{item.name}</Text>
                            </View>
                        })
                    }
                </View>
                {/* 剧情简介 */}
                <Text style={{fontSize:20,marginTop:10}}>剧情简介:</Text>
                <Text style={{fontSize:16,marginBottom:30,lineHeight:35}}>    {this.state.movieInfo.summary}</Text>
            </ScrollView>
        }
    }
}