import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Alert,
  AsyncStorage
} from 'react-native'
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from 'native-base'
import BarraLateral from '../components/BarraLateral'
// ip de la base
const ipBk = 'http://132.148.147.172:9999'
// Clase de la vista Signup
export default class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      tokens: '',
      device: {name: 'Samsung J2',
        registration_id: '123n213bjhh23hv124jb213j213',
        type: 'android'
      }
    }
  }

  // post para enviar datos
  async Login () {
    if (this.state.username === '') {
      this.setState({vacioname: 'Obligatorio'})
    } else {
      this.setState({vacioname: ''})
    }

    if (this.state.password === '') {
      this.setState({vaciopass: 'Obligatorio'})
    } else {
      this.setState({vaciopass: ''})
    }

    if (this.state.username.length !== 0 && this.state.password.length !== 0) {
      var data = {
        username: this.state.username,
        password: this.state.password,
        device: {
          name: 'Samsung J2',
          registration_id: '123n213bjhh23hv124jb213j213',
          type: 'android'
        }
      }
      try {
        // const fetch = require('node-fetch')
        window.fetch(ipBk + '/api/login/', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .then((response) => {
            if (response['is_error'] === false) {
              this.setState({ tokens: response['data'].token })
              AsyncStorage.setItem('userToken', this.state.tokens)
              Alert.alert(
                '¡Exito!',
                response['msg'],
                [
                  {text: 'OK', onPress: () =>
                    this.props.navigation.navigate('Home')
                  }
                ],
                { cancelable: false })
              this.setState({errorUserPass: ''})
            } else if (response['is_error'] === true) {
              window.alert(response['msg'])
              this.setState({errorUserPass: response['msg']})
            }
          })
          .catch((error) => {
            console.error(error)
          })
      } catch (error) {
        console.log('Error' + error)
      }
    } else {
      window.alert('Debe llenar todos los campos')
    }
  }
  render () {
    return (
      <View style={styles.container} >
        <BarraLateral {...this.props} title='Login' />
        <Content style={styles.contenedor}>
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Image style={{marginLeft: '25%', marginRight: '25%', width: 150, height: 150, justifyContent: 'center'}} source={require('../images/bk-logo.svg.png')} />
          </View>
          <Form >
            <Item stackedLabel>
              <Label>Username o Correo Electronico</Label>
              <Input onSubmitEditing={() => this.password.focus()}
                onChangeText={(usuario) => this.setState({username: usuario})}
                maxLength={30} />
              <Text style={{color: 'red'}}>{this.state.vacioname}</Text>
            </Item>

            <Item stackedLabel>
              <Label>Password</Label>
              <Input ref={(input) => { this.password = input }}
                onChangeText={(pass) => this.setState({password: pass})}
                secureTextEntry
                maxLength={20} />
              <Text style={{color: 'red'}}>{this.state.vaciopass}</Text>
            </Item>
          </Form>
          <Text style={{color: 'red'}}>{this.state.errorUserPass}</Text>
          <Button style={styles.botones} onPress={this.Login.bind(this)} block>
            <Text>Entrar</Text>
          </Button>
          <View style={{ justifyContent: 'center', flex: 1, marginTop: 10}}>
            <Text>¿No tienes cuenta? Registrate aqui</Text>
            <Button style={styles.botones} info onPress={() => this.props.navigation.navigate('Register')} block>
              <Text>Registrar</Text>
            </Button>
          </View>
        </Content>
      </View>
    )
  }
}

// Estilos de los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  contenedor: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  botones: {
    marginTop: 10
  }
})
