import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import {
  Button
} from 'native-base'
import BarraLateral from '../components/BarraLateral'
import Logo from '../components/Logo'
import Form from '../components/Form'

// Clase de la vista Signup
export default class Signup extends Component {
  render () {
    return (
      <View style={styles.container} >
        <BarraLateral {...this.props} title='Login' />
        <Logo />
        <Form type='Ingresar' />
        <Button
          title='Registrese aqui'
          onPress={() => this.props.navigation.navigate('Register')}
        />
      </View>
    )
  }
}

// Estilos de los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16
  }
})
