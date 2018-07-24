import React, { Component } from 'react'
import {
  Container,
  Content
} from 'native-base'
import {
  Image,
  StyleSheet
} from 'react-native'
export default class Viewloading extends Component {
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
