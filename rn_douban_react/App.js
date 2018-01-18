/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {Router,Scene,Stack} from 'react-native-router-flux'

//导入子组件
import HomeComponent from './components/home/HomeComponent.js'
import MovieListComponent from './components/movie/MovieListComponent.js'
import AboutComponent from './components/about/AboutComponent.js'
import MovieDetailComponent from './components/movie/MovieDetailComponent.js'

export default class App extends Component<{}> {
  render() {
    return (
      <Router>
        {/* 堆栈 */}
        <Stack key="root">
          {/* key是必须的，到时候就是根据可以去触发 */}
          <Scene key="home" component={HomeComponent} title="首 页"  initial={true}/>
          <Scene key="movieList" component={MovieListComponent} title="电影列表"/>
          <Scene key="movieDetail" component={MovieDetailComponent} title="电影详情"/>
          <Scene key="about" component={AboutComponent} title="关 于"/>
        </Stack>
      </Router>
    );
  }
}
