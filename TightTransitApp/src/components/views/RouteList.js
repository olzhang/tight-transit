import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ListView
} from 'react-native';

import Button from '../common/Button';
import RouteTile from '../common/RouteTile';
import * as Parser from '../../utils/parser';

var moment = require('moment');

class RouteList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.transitData)
    };
  }

  onPressGoBack() {
    this.props.navigator.pop(0);
  }

  renderFooter() {
    return (  
      <View style={styles.footerContainer}>
        <Button style={styles.buttonStyle} text={'Go Back'} onPress={() => this.onPressGoBack()} />
      </View>
    );
}

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={rowData => <RouteTile data={rowData} navigator={this.props.navigator} />}
        renderFooter={() => this.renderFooter()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  scrollView: {
    flex: 1
  },
  buttonStyle: {
    height: 40,
    width: 100
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RouteList;
