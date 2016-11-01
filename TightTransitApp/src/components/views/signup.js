import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';


import InputField from '../common/InputField';
import Button from '../common/Button';

class Signup extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    };
    this.onSigninPress.bind(this);
    this.onPress.bind(this);
  }

  onSigninPress() {
    this.props.navigator.pop();
  }

  onPress() {
    if (this.state.password !== this.state.confirmPassword)
      return this.setState({errorMessage: "Passwords don't match"});

    this.props.firebaseAuthObj.createUserWithEmailAndPassword(this.state.username, this.state.password)
      .then(user => this.props.navigator.immediatelyResetRouteStack([
        {
          name: 'tweets',
          passProps: {
            firebaseAuthObj: this.props.firebaseAuthObj
          }
        }
      ]))
      .catch(error => this.setState({errorMessage: error.message}));
  }
  
  render() {

    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>

        <InputField
          name={"username"}
          placeholder="username"
          onChangeText={text => this.setState({username: text})} />

        <InputField
          name={"password"}
          placeholder="password" 
          secureTextEntry={true} 
          onChangeText={text => this.setState({password: text})} />

        <InputField
          name={"confirmPassword"}
          placeholder="confirm password"
          secureTextEntry={true} 
          onChangeText={text => this.setState({confirmPassword: text})} />

        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>

        <Button text={'Sign Up'} onPress={() => this.onPress()} />
        <Button 
          style={styles.backToSigninButton} 
          buttonTextSyle={{fontSize: 20, color: "#c3a7e7"}} 
          text={'I have an account...'} 
          onPress={() => this.onSigninPress()} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  backToSigninButton: {
    borderWidth: 0
  },
  errorMessage: {
    color: '#e34234',
    textAlign: 'center'
  }
});

export default Signup;
