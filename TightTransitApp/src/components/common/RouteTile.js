import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    ToastAndroid
} from 'react-native';

import * as Parser from '../../utils/parser';
import moment from 'moment';

class RouteTile extends Component {

  constructor(props) {
    super(props);
  }

  onPressRouteTile(startTime, steps, duration) {

    this.props.navigator.push({
      name: 'routeDetail',
      passProps: {
        startTime: startTime,
        steps: steps,
        duration: duration
      }
    });
  }

  render() {
    const { data } = this.props;
    const startTime = moment.unix(Parser.getTransitStartTime(data)).format("HH:mm");
    const steps = Parser.getRouteStepsAsString(data);
    const duration = moment().utc().hours(data[0].duration / 3600 | 0).minutes(data[0].duration / 60 | 0).format("HH:mm");
    return (
      <TouchableHighlight underlayColor={'#d3d3d3'} onPress={() => this.onPressRouteTile(startTime, steps, duration)}>
        <View style={styles.tile}>
          <Text>{startTime}</Text>
          <Text>{steps}</Text>
            {/*<Text>{moment.unix(Parser.getTransitEndTime(rowData)).format("HH:mm")}</Text>
            <Text>{moment.unix(Parser.getFirstLegStartTime(rowData)).format("HH:mm")}</Text>
            <Text>{moment.unix(Parser.getLastLegEndTime(rowData)).format("HH:mm")}</Text>*/}
        </View>
      </TouchableHighlight>

    );
  }
}

const styles = StyleSheet.create({
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black'
  }
});

export default RouteTile;
  