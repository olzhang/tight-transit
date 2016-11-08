import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';

import RouteSearch from './components/views/RouteSearch';
import RouteList from './components/views/RouteList';

const ROUTES = {
  routeSearch: RouteSearch,
  routeList: RouteList
}

class Main extends Component {


  renderScene(route, navigator) {
    const RouteComponent = ROUTES[route.name];
    return <RouteComponent route={route} navigator={navigator} {...route.passProps} />
  }

  render() {
    return (
      <Navigator 
        style={styles.container}
        initialRoute={{name: 'routeSearch'}}
        renderScene={this.renderScene}
        configureScene={() => {return Navigator.SceneConfigs.FloatFromRight; }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  }
});

export default Main;
