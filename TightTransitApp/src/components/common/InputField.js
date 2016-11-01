import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';

export default class InputField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      borderColor: "#d3d3d3"
    }
  }

  onFocus() {
    this.setState({
        borderColor: '#79c879'
    })
  }

  onBlur() {
    this.setState({
      borderColor: '#d3d3d3'
    })
  }

  render() {

    return (
      <View style={[styles.container, {borderColor: this.state.borderColor}]}>
        <TextInput 
          style={styles.input} 
          underlineColorAndroid='rgba(0,0,0,0)'
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 4,
    height: 40,
    margin: 5,
    width: 200,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  input: {
    flex: 1,
  }
});