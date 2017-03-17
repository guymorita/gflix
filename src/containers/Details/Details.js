import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'

class Details extends Component {
  constructor(props) {
    super(props)
    console.log('this.props', this.props)
  }

  render() {
    return (
      <View>
        <Text>
          Details
        </Text>
      </View>
    );
  }
}
function mapStateToProps(state) {
  const { details } = state

  return {
    details
  }
}

export default connect(mapStateToProps)(Details)
