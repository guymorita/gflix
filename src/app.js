import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
  Navigator
} from 'react-native'
import Home from './containers/Home/Home'
import Details from './containers/Details/Details'

export default class App extends Component {
  render() {
    const routes = [
      {title: 'HomePage', index: 0},
      {title: 'DetailsPage', index: 1}
    ];

    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
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

// {/*navigationBar={CustomNavBar}*/}
