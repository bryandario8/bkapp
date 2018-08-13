import React, { Component } from 'react'
import {
  Container,
  Content
} from 'native-base'
import {
  Image,
  StyleSheet
} from 'react-native'

// Clase de la pantalla de carga
export default class Viewloading extends Component {
 // retorna una vista de imagen de carga
  render () {
    return (
      <Container>
        <Content style={styles.contenedor}>
          <Image style={styles.logo} source={require('../images/bk-logo.svg.png')} />
        </Content>
      </Container>
    )
  }
}
// estilo de los componentes
const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    alignItems: 'center'
  },
  contenedor: {
    flex: 1,
    width: null
  }
})
