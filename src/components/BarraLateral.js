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
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      title: 'Home'
    }
  }
  render () {
    return (
      <View style={{
        flex: 0
      }}>
        <Header style={{
          backgroundColor: '#ec7801'
        }}>
          <Left>
            <Button transparent onPress={() => { this.props.navigation.openDrawer() }}>
              <Icon type='FontAwesome' name='bars' style={{fontSize: 20}} />
            </Button>
          </Left>
          <Body>
            <Title style={{fontSize: 30, fontWeight: '500', color: 'white'}}>{this.props.title}</Title>
          </Body>
          <Right>
            <Button transparent
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Icon type='FontAwesome' name='sign-in' style={{fontSize: 20, color: 'white'}} />
              <Text>Login</Text>
            </Button>
          </Right>
        </Header>
      </View>
    )
  }
}
