import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import App from './containers/App/App';

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
