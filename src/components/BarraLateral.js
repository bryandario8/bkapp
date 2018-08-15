import React, { Component } from 'react'
import {
  View,
  AsyncStorage
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
  constructor (props) {
    super(props)
    this.state = {
      icon: 'sign-in'
    }
  }
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      title: 'Home'
    }
  }

  async Log (action) {
    let token = await AsyncStorage.getItem('userToken')
    if (token) {
      AsyncStorage.removeItem('userToken')
    }
    this.props.navigation.navigate('Login')
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
              onPress={() => this.Log('sign-out')}
            >
              <Icon type='FontAwesome' name={this.state.icon} style={{fontSize: 18, color: 'white'}} />
              <Text style={{fontSize: 10, paddingLeft: 8, top: 0}} >Login</Text>
            </Button>
          </Right>
        </Header>
      </View>
    )
  }
}
