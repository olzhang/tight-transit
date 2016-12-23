import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ListView
} from 'react-native';

import Button from '../common/Button';
import * as Parser from '../../utils/parser';

var moment = require('moment');

class RouteList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.transitData)
    };
    this.onPress.bind(this);
  }


  onPress() {
    this.props.navigator.immediatelyResetRouteStack([{name: 'routeSearch'}]);
  }

  renderRow(rowData) {
      return (
        //TODO: change it to a touchablehighlight
        <View style={styles.row}>
          <View style={styles.startTime}>
            <Text>{moment.unix(Parser.getTransitStartTime(rowData)).format("HH:mm")}</Text>
          </View>
          <Text>{Parser.getRouteStepsAsString(rowData)}</Text>
          {/*<Text>{moment.unix(Parser.getTransitEndTime(rowData)).format("HH:mm")}</Text>
          <Text>{moment.unix(Parser.getFirstLegStartTime(rowData)).format("HH:mm")}</Text>
          <Text>{moment.unix(Parser.getLastLegEndTime(rowData)).format("HH:mm")}</Text>*/}
        </View>
      );
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => this.renderRow(rowData)}
          />
          <View style={styles.footerContainer}>
            <Button style={styles.buttonStyle} text={'Go Back'} onPress={() => this.onPress()} />
          </View>
      </ScrollView>
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
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    margin: 10,

  },
  rowTimeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    margin: 10,
  },
  rowText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RouteList;
