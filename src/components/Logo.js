/**
 * @fileOverview Componente del logo de Burger King
 * 
 * @version v1.0.1
 * 
 * History
 * Se presenta la llamada a la imagen del logo d ela empresa
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

// Clase del componente Logo
export default class Logo extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: 100, height: 100}}
          source={require('../images/bk-logo.svg.png')}
          //source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
        <Text style={styles.welcome}>
          Welcome to Burger King's App!
        </Text>
        
      </View>
    );
  }
}

//Estilo del componente
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: 'rgba(0,0,0,0.7)',
  },
});