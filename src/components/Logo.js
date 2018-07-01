/**
 * @fileOverview Componente del logo de Burger King
 *
 * @version v1.0.1
 *
 * History
 * Se presenta la llamada a la imagen del logo d ela empresa
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

// Clase del componente Logo
export default class Logo extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Image style={{width: 100, height: 100}}
          source={require('../images/bk-logo.svg.png')}
        />
      </View>
    )
  }
}

// Estilo del componente
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})
