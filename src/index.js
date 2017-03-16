import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import App from './app';

const store = configureStore()

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
