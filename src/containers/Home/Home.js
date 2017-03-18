
import React, { Component } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  TabBarIOS,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import { fetchMoviesIfNeeded } from '../../redux/actions/movies'
import MovieList from '../../components/MovieList/MovieList'

class Home extends Component {
  state = {
    selectedTab: 'topRanking',
    filterText: ''
  }

  _filterTextChange(filterText) {
    this.setState({
      filterText
    })
  }

  componentDidMount() {
    const { dispatch, selectedCategory } = this.props
    dispatch(fetchMoviesIfNeeded(selectedCategory))
  }

  _renderTabBarIOS(tabs) {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          systemIcon="top-rated"
          title="Top Ranking"
          selected={this.state.selectedTab === tabs[0].key}
          onPress={() => {
            this.setState({
              selectedTab: tabs[0].key,
            });
          }}>
          {this._renderTabBarContent(tabs[0].key)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="most-recent"
          selected={this.state.selectedTab === tabs[1].key}
          title="Now Playing"
          onPress={() => {
            this.setState({
              selectedTab: tabs[1].key,
            });
          }}>
          {this._renderTabBarContent(tabs[1].key)}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

  _renderTabBarContent = (selectedTab) => {
    const { movies, navigator } = this.props

    return(
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.searchBar}
            onChangeText={(filterText) => this._filterTextChange(filterText)}
            placeholder='Search here...'
            value={this.state.filterText}
          />
        </View>

        <View>
          {movies.length > 0 &&
            <MovieList
              movies={movies}
              navigator={navigator}
              filterText={this.state.filterText}
              selectedTab={selectedTab}
            />
          }
        </View>
      </View>
    );
  }

  _renderTabBarAndroid(tabs) {
    return (
      <ScrollableTabView renderTabBar={() => <DefaultTabBar />} ref={(tabView) => { this.tabView = tabView; }}>
        <ScrollView tabLabel={tabs[0].name} style={styles.tabView}>
          {this._renderTabBarContent(tabs[0].key)}
        </ScrollView>
        <ScrollView tabLabel={tabs[1].name} style={styles.tabView}>
          {this._renderTabBarContent(tabs[1].key)}
        </ScrollView>
      </ScrollableTabView>
    );
  }

  render() {
    const tabs = [
      {
        key: 'topRanking',
        name: 'Top Ranking'
      },
      {
        key: 'nowPlaying',
        name: 'Now Playing'
      }
    ]

    if (Platform.OS == 'ios') {
      return this._renderTabBarIOS(tabs)
    } else if (Platform.OS == 'android') {
      return this._renderTabBarAndroid(tabs)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2544',
    flex: 1
  },
  tabView: {
    flex: 1,
    backgroundColor: '#2A2544',
  },
  searchBar: {
    height: 40,
    backgroundColor: 'white',
    color: 'purple',
    opacity: 0.9,
    borderRadius: 5,
    margin: 4
  }
})

function mapStateToProps(state) {
  const { moviesByCategory } = state
  const selectedCategory = moviesByCategory.selectedCategory
  const {
    isFetching,
    lastUpdated,
    movies: movies
  } = moviesByCategory[moviesByCategory.selectedCategory] || {
    isFetching: true,
    movies: []
  }

  return {
    selectedCategory,
    movies,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Home)
