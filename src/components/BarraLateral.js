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
  constructor (props) {
    super(props)
    this.state = {
      icon: 'sign-in',
      letra: ' '
    }
  }
  //opciones para la navegacion entre pantallas
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      title: 'Home'
    }
  }

  async Log () {
    let token = await AsyncStorage.getItem('userToken')
    if (token) {
      AsyncStorage.removeItem('userToken')
      this.setState({icon: 'sign-in'})
      this.setState({letra: 'Login'})
       window.alert('Sesion Cerrada Exitosamente')
      this.props.navigation.navigate('Login')
    }else{
      this.setState({icon: 'sign-out'})
      this.setState({letra: 'Cerrar Sesion'})
      this.props.navigation.navigate('Login')
    }
    
  }

  async verificar(){ 
    let token = await AsyncStorage.getItem('userToken')
    if (token) {
      this.setState({icon: 'sign-out'})
      this.setState({letra: 'Cerrar Sesion'})
    }else{
      this.setState({icon: 'sign-in'})
      this.setState({letra: 'Login'})
    }
  }
  componentDidMount () {
   this.verificar()
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
              onPress={() => this.Log()}
            >
              <Icon type='FontAwesome' name={this.state.icon} style={{fontSize: 18, color: 'white'}} />
              <Text style={{fontSize: 10, paddingLeft: 8, top: 0}} >{this.state.letra}</Text>
            </Button>
          </Right>
        </Header>
      </View>
    )
  }
}