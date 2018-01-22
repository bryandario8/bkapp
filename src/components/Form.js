import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class Form extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <TextInput style = {styles.inputBox}
            underlineColorAndroid ='transparent'
            placeholder = 'User'
            placeholderTextColor = '#ffffff'
        />
        <TextInput style = {styles.inputBox}
            underlineColorAndroid ='transparent'
            placeholder = 'Password'
            placeholderTextColor = '#ffffff'
        />

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
                Login
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    margin: 10,
  },
  button: {
      width: 100,
      backgroundColor: 'rgba(24,84,148,0.9)',
      borderRadius: 15,
      alignItems: 'center',
      paddingVertical: 10,
      //marginVetical: 10,
  },
  buttonText: {
    //FontSize: 16,
    fontWeight: '500',

  },
});