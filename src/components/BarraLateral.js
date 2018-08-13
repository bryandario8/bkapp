import React, { Component } from 'react'
import {
  View
} from 'react-native'
import {
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Text
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class BarraLateral extends Component {
  //opciones para la navegacion entre pantallas
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      title: 'Home'
    }
  }
  //renderizar componentes
  render () {
    return (
      <View style={{
        flex: 0,
        height: 45
      }}>
        <Header style={{
          backgroundColor: '#ec7801',
          height: 45
        }}>
          <Left>
            <Button transparent onPress={() => { this.props.navigation.openDrawer() }}>
              <Icon type='FontAwesome' name='bars' style={{fontSize: 20}} />
            </Button>
          </Left>
          <Body>
            <Title style={{fontSize: 22, fontWeight: '400', color: 'white'}}>{this.props.title}</Title>
          </Body>
          <Right>
            <Button transparent
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Icon type='FontAwesome' name='sign-in' style={{fontSize: 18, color: 'white'}} />
              <Text style={{fontSize: 10, paddingLeft: 8, top: 0}} >Login</Text>
            </Button>
          </Right>
        </Header>
      </View>
    )
  }
}
