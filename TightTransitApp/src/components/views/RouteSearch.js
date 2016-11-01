import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid
} from 'react-native';


import InputField from '../common/InputField';
import Button from '../common/Button';

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

  onGetRouteButtonPress() {
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
