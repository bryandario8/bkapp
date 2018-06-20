
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'

// ip de la base
const ipBk = 'http://132.148.147.172:9999'
// formulario del login
export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      device: {name: 'Samsung J2',
        registration_id: '123n213bjhh23hv124jb213j213',
        type: 'android'
      }
    }
  }
  // post para enviar datos
  async Login () {
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
        fetch(ipBk + '/api/login/', {
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
                        alert(response['msg'])
                      } else if (response['is_error'] === true) {
                        alert(response['msg'])
                      }
                    })
                    .catch((error) => {
                      console.error(error)
                    })
      } catch (error) {
        console.log('Error' + error)
      }
    } else {
      alert('Debe llenar todos los campos')
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding' >
          <TextInput style={styles.inputBox}
            underlineColorAndroid='transparent'
            placeholder='Correo Electronico o username'
            placeholderTextColor='#ffffff'
            selectionColor='#fff'
            keyboardType='email-address'
            onSubmitEditing={() => this.password.focus()}
            onChangeText={(usuario) => this.setState({username: usuario})}
          />
          <TextInput style={styles.inputBox}
            underlineColorAndroid='transparent'
            placeholder='Password'
            placeholderTextColor='#ffffff'
            secureTextEntry={true}
            ref={(input) => this.password = input}
            onChangeText={(pass) => this.setState({password: pass})}
          />

          <TouchableOpacity onPress={this.Login.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>
              {this.props.type}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(24,84,148,0.9)',
    borderRadius: 30,
    paddingHorizontal: 20,
    color: '#ffffff',
    marginVertical: 10
  },
  button: {
    width: 100,
    backgroundColor: 'rgba(24,84,148,0.9)',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
})
