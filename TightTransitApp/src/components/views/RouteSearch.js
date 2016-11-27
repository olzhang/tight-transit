import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import ParseRoutes from '../../utils/parser';
var moment = require('moment');

//import GoogleMapsService from '@google/maps';

import InputField from '../common/InputField';
import Button from '../common/Button';

class RouteSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      from: 'UBC Bus Loop, Vancouver, BC V6T',
      to: '9500 Glenlyon Parkway, Burnaby, BC',
      startTime: moment().format("YYYY-MM-DD HH:mm"),
      errorMessage: ''
    };
    this.onGetRouteButtonPress.bind(this);
  }

  // urlConstructor(to, from) {
  //   thi
  // }

  onGetRouteButtonPress() {
    gMapsUrl = "https://maps.googleapis.com/maps/api/directions/json?mode=transit&alternatives=true&key=AIzaSyC4BkkqZ8fH08EVBPgQQ0GRBNG0dQxZFNY&origin=";
    gMapsUrl = gMapsUrl + `${this.state.from}&destination=${this.state.to}&departure_time=${moment(this.state.startTime, "YYYY-MM-DD HH:mm").unix()}`;
    gMapsUrl = gMapsUrl.replace(new RegExp(" ", 'g'), "+");
    fetch(gMapsUrl)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(responseJson => {
          // console.log(responseJson);
          var routeList = [];
          ParseRoutes(responseJson, routeList);
          this.props.navigator.push({
            name: 'routeList',
            passProps: {
              transitData: routeList
            }
          });
// ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.LONG))
        })
      .catch((error) => {
        error => this.setState({errorMessage: error.message});
      });
    ToastAndroid.show('Getting Route ....', ToastAndroid.SHORT)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Get Route</Text>
        <InputField
          name={"From"}

          onChangeText={text => this.setState({from: text})}
          value={this.state.from} />
{/* placeholder="From" */}
        <InputField
          name={"To"}
          onChangeText={text => this.setState({to: text})}
          value={this.state.to}  />
{/* placeholder="To" */}
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
