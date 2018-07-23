import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import BarraLateral from '../components/BarraLateral'
import Form from '../components/Form'

// Clase de la vista Signup
export default class Signup extends Component {
  render () {
    return (
      <View style={styles.container} >
        <BarraLateral {...this.props} title='Login' />
        <Form type='Ingresar' />

      </View>
    )
  }
}

// Estilos de los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
