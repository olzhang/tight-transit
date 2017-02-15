import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  ListView
} from 'react-native';

import Button from '../common/Button';

class RouteDetail extends Component {

  renderLeaveBy(leaveByTime) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.headerStyle}>Leave By</Text>
        <Text style={styles.bodyStyle}>{leaveByTime}</Text>
      </View>
    );
  }

  renderSteps(steps) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.headerStyle}>Steps</Text>
        <Text style={styles.bodyStyle}>{steps}</Text>
      </View>
    );
  }

  renderTripDuration(duration) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.headerStyle}>Duration</Text>
        <Text style={styles.bodyStyle}>{duration}</Text>
      </View>
    );
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
    const { startTime, steps, duration } = this.props; 
    return (
      <View style={styles.container}>
        {this.renderLeaveBy(startTime)}
        {this.renderSteps(steps)}
        {this.renderTripDuration(duration)}
        {this.renderFooter()}
      </View>
    );
  }
}



styles = {
  container: {
    flex: 1
  },
  sectionContainer: {
    flex: 2,
    backgroundColor: 'white'
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttonStyle: {
    height: 40,
    width: 100
  },
  headerStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 36
  },
  bodyStyle: {
    color: 'black',
    fontSize: 24,
    padding: 15
  }
}

export default RouteDetail;
