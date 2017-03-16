import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
  Navigator,
  Text,
  View
} from 'react-native'
import Home from './containers/Home/Home'
import Details from './containers/Details/Details'

export default class App extends Component {
  state = {
    selectedTab: 'redTab',
  }

  routes = [
    {title: 'HomePage', index: 0},
    {title: 'DetailsPage', index: 1}
  ]

  render() {
    return (
      <Navigator
        initialRoute={this.routes[0]}
        initialRouteStack={this.routes}
        renderScene={this.renderScene.bind(this)}
       />
    );
  }

  renderScene(route, navigator) {
    switch (route.title) {
      case 'HomePage':
        return (<Home navigator={navigator} />);
      case 'DetailsPage':
        return (<Details navigator={navigator} />);
    }
  }
}


// navigationBar={
//   <Navigator.NavigationBar
//     routeMapper={{
//       LeftButton: (route, navigator, index, navState) =>
//         { return (<Text>Top Ranking</Text>); },
//       RightButton: (route, navigator, index, navState) =>
//         { return (<Text>Now Playing</Text>); },
//       Title: () => null,
//     }}
//     style={{
//       backgroundColor: 'purple',
//       bottom: 0,
//       top: null
//     }}
//   />
// }

