/**
 * @fileoverview Forma de botones
 * 
 * History
 * En este archivo se realiza los componente de la botonera de la pagina de login
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import {
  NavigationActions} from 'react-navigation';
//Clase del componente Form
export default class Form extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      username : '',
      password : '',
      devise : ''

    }
  }
  async Login() {
    if (this.state.username.length != 0 && this.state.password.length != 0) {
               var data = {
                "username" : this.state.username,
                "password" : this.state.password
               }
               alert(JSON.stringify(data))
              try {
                fetch('http://132.148.147.172:9999/api/login/',{
                    method: "post",
                    header: {
                      'Accept' : 'application/json',
                      'Content-type' :'application/json',
                    },
                    body :JSON.stringify(data)
                  })
                  .then((response) => response.json())
                    .then((responseJson) => {
                      if (responseJson['is_error'] == false ) {
                        alert(responseJson['msg']);
                      }else if(responseJson['is_error'] == true){
                        alert(responseJson['msg']);
                      }
                    })
                    .catch((error) =>{
                      console.error(error);
                    });
              }catch(error){
                console.log("Error" + error);
              }
       
        }else{
          alert("Debe llenar todos los campos")
        }
   
  }
  render() {
    return (      
      <View style={styles.container}>
     <KeyboardAvoidingView  behavior="padding" >
        <TextInput style = {styles.inputBox}
            underlineColorAndroid ='transparent'
            placeholder = 'Correo Electronico o username'
            placeholderTextColor = '#ffffff'
            selectionColor="#fff"
            keyboardType="email-address"
            onSubmitEditing={()=> this.password.focus()}
            onChangeText={(usuario) => this.setState({username:usuario}) }
        />
        <TextInput style = {styles.inputBox}
            underlineColorAndroid ='transparent'
            placeholder = 'Password'
            placeholderTextColor = '#ffffff'
            secureTextEntry={true}
            ref={(input) => this.password = input}
            onChangeText={(pass) => this.setState({password:pass})}
        />

        <TouchableOpacity  onPress={this.Login.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>
              {this.props.type}
            </Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      
    );
  }
}

//Estilos del componente
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(24,84,148,0.9)',
    borderRadius: 30,
    paddingHorizontal: 20,
    color: '#ffffff',
    marginVertical: 10,
  },
  button: {
      width: 100,
      backgroundColor: 'rgba(24,84,148,0.9)',
      borderRadius: 15,
      alignItems: 'center',
      paddingVertical: 10,
      marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color:'#ffffff',
    textAlign:'center',
  },
});