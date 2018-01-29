/**
 * @fileoverview Forma de botones
 * 
 * History
 * En este archivo se realiza los componente de la botonera de la pagina de login
 */
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

//Clase del componente Form
export default class Form extends Component<{}> {

  /*home() {
		Actions.home()
  }*/

  coupons() {
    Actions.coupons()
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

        <TouchableOpacity onPress={this.coupons} style={styles.button}>
            <Text style={styles.buttonText}>
              {this.props.type}
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//Estilos del componente
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