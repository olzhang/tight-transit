import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput
} from 'react-native';

import Button from '../common/Button';
import * as Processor from '../../utils/parser';

class RouteList extends Component {

  constructor(props) {
    super(props);

    this.onPress.bind(this);
  }


  onPress() {
    this.props.navigator.immediatelyResetRouteStack([{name: 'routeSearch'}]);
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text>{JSON.stringify(this.props.transitData)}</Text>
        </ScrollView>

        <Button style={styles.buttonStyle} text={'Go Back'} onPress={() => this.onPress()} />
      </View>
    );
  }
}

function displayTransitData(dataList){

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#89cff0'
  },
  buttonStyle: {
    height: 40,
    width: 100
  }
});

export default RouteList;
