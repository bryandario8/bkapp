import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';

export default class Form extends Component<{}> {

  principal() {
		Actions.principal()
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style = {styles.inputBox}
            underlineColorAndroid ='transparent'
            placeholder = 'User'
            placeholderTextColor = '#ffffff'
            selectionColor="#fff"
            keyboardType="email-address"
            onSubmitEditing={()=> this.password.focus()}
        />
        <TextInput style = {styles.inputBox}
            underlineColorAndroid ='transparent'
            placeholder = 'Password'
            placeholderTextColor = '#ffffff'
            secureTextEntry={true}
            ref={(input) => this.password = input}
        />

        <TouchableOpacity onPress={this.signup} style={styles.button}>
            <Text style={styles.buttonText}>
              {this.props.type}
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff833a',
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(24,84,148,0.9)',
    borderRadius: 30,
    paddingHorizontal: 20,
    color: '#ffffff',
    marginVertical: 10,
  },
  button: {
      width: 100,
      backgroundColor: 'rgba(24,84,148,0.9)',
      borderRadius: 15,
      alignItems: 'center',
      paddingVertical: 10,
      marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color:'#ffffff',
    textAlign:'center',
  },
});