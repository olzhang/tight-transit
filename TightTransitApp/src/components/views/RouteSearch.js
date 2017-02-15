import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  ListView
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import ParseRoutes, { isSameRoute, sumLegTimes } from '../../utils/parser';
import moment from 'moment';
import uniqWith from 'lodash/uniqWith';
import sortBy from 'lodash/sortBy';
//import GoogleMapsService from '@google/maps';

import InputField from '../common/InputField';
import Button from '../common/Button';

class RouteSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // from: 'UBC Bus Loop, Vancouver, BC V6T',
      from: 'Sperling / Burnaby Lake, Burnaby, BC',
      // from: 'Downtown Vancouver, Vancouver, BC',
      // to: '9500 Glenlyon Parkway, Burnaby, BC',
      to: '8888 University Dr, Burnaby, BC V5A 1S6',
      startTime: moment().format("YYYY-MM-DD HH:mm"),
      deltaMins: '10',
      nextMinutes: '120',
      errorMessage: ''
    };
    this.onGetRouteButtonPress.bind(this);
  }

  onGetRouteButtonPress() {
    let baseGMapsUrl = "https://maps.googleapis.com/maps/api/directions/json?mode=transit&alternatives=true&key=AIzaSyCXaTxwsc4s2MPCY8xFIwclCUzg5u6TEkY&origin=";
    baseGMapsUrl = baseGMapsUrl + `${this.state.from}&destination=${this.state.to}`;
    baseGMapsUrl = baseGMapsUrl.replace(new RegExp(" ", 'g'), "+");
    gMapsUrl = baseGMapsUrl + `&departure_time=${moment(this.state.startTime, "YYYY-MM-DD HH:mm").unix()}`;

    let gMapsUrlArray = [];
    let beginTime = moment(this.state.startTime, "YYYY-MM-DD HH:mm").unix();
    let endTime = moment.unix(beginTime).add(parseInt(this.state.nextMinutes), 'minutes').unix();
    let increment = parseInt(this.state.deltaMins) * 60;
    for(var i = beginTime; i <= endTime; i += increment){
      let pushGMapsUrl = baseGMapsUrl + `&departure_time=${i}`;
      gMapsUrlArray.push(pushGMapsUrl);
    }

    // let numQueries = timesArray.length;

    console.log(gMapsUrlArray);

    let routeList = [];

    let promise = gMapsUrlArray.reduce((acc, currentValue) => {
      return acc.then(function (res) {
        return fetch(currentValue).then(response => {
          return response.json();
        }).then(responseJson => {
          // console.log(JSON.stringify(responseJson));
          ParseRoutes(responseJson, routeList);
        }).catch(error => {
          console.log(error);
          ToastAndroid.show(error, ToastAndroid.LONG);
        });
      });
    }, Promise.resolve([]));

    promise.then(() => {
      console.log("done");
      uniqueRoutes = uniqWith(routeList, isSameRoute);
      uniqueRoutesSortedByTime = sortBy(uniqueRoutes, sumLegTimes);
      ToastAndroid.show('Found Route!', ToastAndroid.SHORT);
      this.props.navigator.push({
        name: 'routeList',
        passProps: {
          transitData: uniqueRoutesSortedByTime
        }
      });
    })
    .catch(console.log);

    ToastAndroid.show('Getting Route ....', ToastAndroid.LONG);

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
        <InputField
          name={"Next Minutes"}
          onChangeText={text => this.setState({nextMinutes: text})}
          placeholder="next minutes"
          keyboardType = 'numeric'
          value={this.state.nextMinutes}  />
        <InputField
          name={"Minute Interval"}
          onChangeText={text => this.setState({deltaMins: text})}
          placeholder="minute interval"
          keyboardType = 'numeric'
          value={this.state.deltaMins} />
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
