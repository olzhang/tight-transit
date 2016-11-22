import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid
} from 'react-native';
import DatePicker from 'react-native-datepicker';
var moment = require('moment');

//import GoogleMapsService from '@google/maps';

import InputField from '../common/InputField';
import Button from '../common/Button';

class RouteSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: '',
      startTime: moment().format("YYYY-MM-DD HH:mm"),
      errorMessage: ''
    };
    this.onGetRouteButtonPress.bind(this);
  }

  // urlConstructor(to, from) {
  //   thi
  // }

  onGetRouteButtonPress() {
    gMapsUrl = "https://maps.googleapis.com/maps/api/directions/json?mode=transit&departure_time=1478461704&alternatives=true&key=AIzaSyC4BkkqZ8fH08EVBPgQQ0GRBNG0dQxZFNY&origin=";
    gMapsUrl = gMapsUrl + `${this.from}&destination=${this.to}`
    fetch(gMapsUrl)
      .then(response => response.json())
      .then(responseJson => {
          this.props.navigator.push({
            name: 'routeList',
            passProps: {
              transitData: responseJson
            }
          });
//          ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.LONG))
        })
      .catch((error) => {
        error => this.setState({errorMessage: error.message});
      });
    ToastAndroid.show('Getting Route ....', ToastAndroid.SHORT)
  }

  render() {

    // this.setState({
    //   unixStartTime: moment(this.state.startTime, "YYYY-MM-DD HH:mm").unix()
    // });

    return (
      <View style={styles.container}>
        <Text>Get Route</Text>
        <InputField
          name={"From"}
          placeholder="From"
          onChangeText={text => this.setState({from: text})} />

        <InputField
          name={"To"}
          placeholder="To"
          onChangeText={text => this.setState({to: text})} />

        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>

        <DatePicker
          style={{width: 200}}
          date={this.state.startTime}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          minuteInterval={10}
          onDateChange={(datetime) => {this.setState({startTime: datetime});}}
        />
        <Button style={styles.buttonStyle} text={'Get Route'} onPress={() => this.onGetRouteButtonPress()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMessage: {
    color: '#e34234',
    textAlign: 'center'
  },
  buttonStyle: {
    height: 40,
    width: 100
  }
});

export default RouteSearch;
