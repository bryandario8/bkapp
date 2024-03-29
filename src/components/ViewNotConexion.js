import React, { Component } from 'react'
import {
  Container,
  Content
} from 'native-base'
import {
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'
var {width} = Dimensions.get('window').width
var {height} = Dimensions.get('window').height
// Clase de la pantalla de carga
export default class ViewNotConexion extends Component {
  // retorna una vista de imagen de carga
  render () {
    return (
      <Container>
        <Content style={styles.contenedor}>
          <Image style={{flex: 1}} source={require('../images/conexion21.png')} />
        </Content>
      </Container>
    )
  }
}
// estilo de los componentes
const styles = StyleSheet.create({

  contenedor: {
    flex: 1,
    width: width,
    height: height
  }
})
