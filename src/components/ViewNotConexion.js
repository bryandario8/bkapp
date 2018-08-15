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
export default class ViewNotConexion extends Component {
  // retorna una vista de imagen de carga
  render () {
    return (
      <Container>
        <Content style={styles.contenedor}>
          <Image style={{flex: 1}} source={require('../images/cargando2.png')} />
        </Content>
      </Container>
    )
  }
}
// estilo de los componentes
const styles = StyleSheet.create({

  contenedor: {
    flex: 1
  }
})
