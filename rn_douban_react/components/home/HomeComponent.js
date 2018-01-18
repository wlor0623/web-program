import React, { Component } from 'react'

import { View, Text, StyleSheet,Image } from 'react-native'

import Swiper from 'react-native-swiper';

import {Actions} from 'react-native-router-flux'

var styles = StyleSheet.create({
    images: {
        width: '100%',
        height: '100%'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navigationBar:{
        height:50,
        backgroundColor:'orange',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    }
})

export default class HomeComponent extends Component {
    render() {
        return <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            {/* 1.0 轮播图 */}
            <View style={{ height: 260 }}>
                <Swiper width='100%' showsButtons={true} autoplay={true}>
                    <View style={styles.slide1}>
                        <Image style={styles.images}
                            source={{ uri: 'http://www.itcast.cn/images/slidead/BEIJING/2017410109413000.jpg' }}
                        />
                    </View>
                    <View style={styles.slide2}>
                        <Image style={styles.images}
                            source={{ uri: 'http://www.itcast.cn/images/slidead/BEIJING/2017440109442800.jpg' }}
                        />
                    </View>
                    <View style={styles.slide3}>
                        <Image style={styles.images}
                            source={{ uri: 'http://www.itcast.cn/images/slidead/BEIJING/2017441409442800.jpg' }}
                        />
                    </View>
                </Swiper>
            </View>

            {/* 2.0 导航 */}
            <View style={styles.navigationBar}>
                <Text>首 页</Text>
                <Text onPress={Actions.movieList}>电 影</Text>
                <Text onPress={Actions.about}>关 于</Text>
            </View>
        </View>
    }
}