import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid
} from 'react-native';

//import GoogleMapsService from '@google/maps';

import InputField from '../common/InputField';
import Button from '../common/Button';

const googleMapsUrl = 'https://maps.googleapis.com/maps/api/directions/json?origin=UBC+Bus+Loop,+Vancouver,+BC V6T&destination=9500+Glenlyon+Parkway,+Burnaby,+BC&region=es&mode=transit&departure_time= 1478461704&alternatives=true&key=AIzaSyC4BkkqZ8fH08EVBPgQQ0GRBNG0dQxZFNY';

class RouteSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: '',
      errorMessage: ''
    };
    this.onGetRouteButtonPress.bind(this);
  }

  // urlConstructor(to, from) {
  //   thi
  // }

  onGetRouteButtonPress() {
    fetch(googleMapsUrl)
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
