import React, { Component } from 'react'
import {
  Container,
  Header,
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
        <Header />
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
    height: 150
  },
  contenedor: {
    flex: 1
  }
})
