/**
 * @fileoverview Vista de Cupones
 * 
 * @version v1.0.1
 *
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';

// Se importa una libreria qu epermite la navegacion entre paginas
import {Actions} from 'react-native-router-flux';

// Clase de la vista Login
export default class Login extends Component<{}> {

  signup() {
		Actions.signup()
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <Form type="Login"/>
          <View style={styles.signupTextCont}>
					  <Text style={styles.signupText}>Don't have an account yet?</Text>
					  <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
				  </View>
      </View>
    );
  }
}

// Estilo de los componentes 
const styles = StyleSheet.create({
  container : {
    backgroundColor:'#ff833a',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  }
});