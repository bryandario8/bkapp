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
  TouchableOpacity,
  Image
} from 'react-native';
import BarraLateral from '../components/BarraLateral';
import Logo from '../components/Logo';
import Form from '../components/Form';
const backgroundColor = '#0067a7';
// Clase de la vista Login
export default class Login extends Component<{}> {
static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Iniciar sesion';
        let drawerIcon = () => (
            <Image
                source={require('../images/home-icon.png')}
                style={{ width: 26, height: 26, tintColor: backgroundColor }}
            />
        );
        return {drawerLabel, drawerIcon};
    }
  
  render() {
    return (
      <View style={styles.container}>
      <BarraLateral {...this.props} /> 
        <Logo/>
        <Form type="Login"/>
          <View style={styles.signupTextCont}>
					  <Text style={styles.signupText}>Don't have an account yet?</Text>
					  <TouchableOpacity ><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
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