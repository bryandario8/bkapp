import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
  AppRegistry
} from 'react-native'
import {
  Container,
  Input,
  Item,
  Label,
  Form,
  Text,
  Content
} from 'native-base'
import BarraLateral from '../components/BarraLateral'
import Viewloading from '../components/Viewloading'
import ViewNotConexion from '../components/ViewNotConexion'
//ip de la base
const ipBk = 'http://132.148.147.172:9999'

// registro
export default class Registros extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      phone: '',
      province: '',
      city: '',
      sector: '',
      provincia: [],
      ciudad: [],
      loading: true,
      failsConexion:false,
      cambioProvincia: false,
      correctoUsername: false,
      correctoEmail: false,
      correctoPassword: false,
      correctoNombre: false,
      correctoApellido: false,
      correctoSector: false,
      correctPhone: false
    }
  }
  // get de ciudad
  async fechtCiudad (provinces) {
    try {
      window.fetch(ipBk + '/api/address/cities/?province=' + provinces, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((response) => {
          this.setState({ciudad: response})
        })
    } catch (error) {
      console(error)
    }
  }
  // get provincias
  fetchData = async () => {
    try {
      window.fetch(ipBk + '/api/address/provinces/', {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((response) => {
          this.setState({provincia: response})
          this.setState({loading: false})
          this.setState({failsConexion: false})
        })
    } catch (error) {
      this.setState({loading: true})
      this.setState({failsConexion: true})
    }
  }
  // activar el get
  componentDidMount () {
    this.fetchData()
  }
  // imprimir las etiquetas de provincia
  provincias () {
    if (this.state.provincia.length !== 0) {
      return this.state.provincia.map((data) => {
        return (<Picker.Item label={data.name} value={data.id} key={data.id} />)
      })
    }
  }

  // imprimir las etiquetas de ciudad
  ciudad () {
    switch (this.state.cambioProvincia) {
        case true:
          this.fechtCiudad(this.state.province)
          this.setState({cambioProvincia: false})
          break
        case false:
          if (this.state.ciudad.length !== 0) {
              return this.state.ciudad.map((data) => {
                return (<Picker.Item label={data.name} value={data.id} key={data.id} />)
              })
            }
            break
          }
  }
  //Valida datos de los campos en tiempo real 
  validador(valor,tipo){
    switch(tipo){
      case 'usernam':
        this.setState({errorUser: ''})
         if(valor.length > 2) { 
            if(/[A-Za-z0-9]+/i.test(valor) ) { 
                this.setState({errorUser: ''})
                this.setState({username: valor})
                this.setState({correctoUsername: true})
            }else{
              this.setState({correctoUsername: false})
              this.setState({errorUser: 'Ingrese un usuario valido'})
            }
         }else{
            this.setState({correctoUsername: false})
            this.setState({errorUser: 'Invalido'})
         }
         if(this.state.username == '' ){ 
              this.setState({correctoUsername: false})
              this.setState({errorUser: 'Obligatorio'})
         }
         break
       case 'correo':
        this.setState({errorEmail: ''})
         if(/[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+$/i.test(valor)) { 
            this.setState({errorEmail: ''})
            this.setState({correctoEmail: true})
            this.setState({email: valor})
         }else{
          this.setState({correctoEmail: false})
          this.setState({errorEmail: 'Ingrese un correo valido'})
         }

         if(this.state.email == '' ){ 
            this.setState({correctoEmail: false})
            this.setState({errorEmail: 'Obligatorio'})
         }
          break
        case 'nombre':
          this.setState({errorNombre: ''})
           if(/[A-Za-z\s]+/i.test(valor) ) { 
            if (valor.length > 2) {
              this.setState({errorNombre: ''})
              this.setState({correctoNombre: true})
              this.setState({first_name: valor})
            }else{ 
              this.setState({correctoNombre: false})
              this.setState({errorNombre: 'Ingrese un nombre valido'})
            }
              
           }else{
            this.setState({correctoNombre: false})
              this.setState({errorNombre: 'Ingrese un nombre valido'})
           }

           if(this.state.first_name == '' ){ 
              this.setState({correctoNombre: false})
              this.setState({errorNombre: 'Obligatorio'})
           }
          break
        case 'apellido':
            this.setState({errorApellido: ''})
             if(/[A-Za-z\s]+/i.test(valor) ) { 
              if (valor.length > 2) {
                this.setState({errorApellido: ''})
                this.setState({correctoApellido: true})
                this.setState({last_name: valor})
              }else{ 
                this.setState({correctoApellido: false})
                this.setState({errorApellido: 'Ingrese un apellido valido'})
              }
                
             }else{
              this.setState({correctoApellido: false})
                this.setState({errorApellido: 'Ingrese un apellido valido'})
             }
             if(this.state.last_name == '' ){ 
              this.setState({correctoApellido: false})
                    this.setState({errorApellido: 'Obligatorio'})
             }
          break
        case 'sectors':
            this.setState({errorSector: ''})
             if(/[A-Za-z0-9.#-\s]+/i.test(valor) ) { 
              if (valor.length > 2) {
                this.setState({errorSector: ''})
                this.setState({correctoSector: true})
                this.setState({sector: valor})
              }else{ 
                 this.setState({correctoSector: false})
                this.setState({errorSector: 'Ingrese un sector valido'})
              }
                
             }else{
              this.setState({correctoSector: false})
                this.setState({errorSector: 'Ingrese un sector valido'})
             }
             if(this.state.sector == '' ){ 
                this.setState({correctoSector: false})
                this.setState({errorSector: 'Obligatorio'})
             }
          break
        case 'passs':
           this.setState({errorPass: ''})
           
           if (valor.length > 4 ) {
              if (/[A-Za-z._%+-0-9.-]+/i.test(valor)) {
                this.setState({errorPass: ''})
                this.setState({correctoPassword: true})
                this.setState({password: valor})
              }else {
                this.setState({correctoPassword: false})
                this.setState({errorPass: 'Contraseña debil'})
               }
           }else{
            this.setState({correctoPassword: false})
              this.setState({errorPass: 'Contraseña debil'})
           }
           if (this.state.password == '') {
              this.setState({correctoPassword: false})
              this.setState({errorPass: 'Obligatorio'})
           }
          break
    }
     
  }

  validarCell(valor){
      this.setState({errorPhone: ''})
      if (/[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/i.test(valor)) {
        this.setState({errorPhone: ''})
        this.setState({correctPhone: true})
        this.setState({phone: valor})
      }else{
        this.setState({correctPhone: false})
        this.setState({errorPhone: 'Ingrese un numero valido'})
      }
  }
//Validacion y envio de datos
  async Login () {
    if(this.state.username == '' ){ 
      this.setState({correctoUsername: false})
      this.setState({errorUser: 'Obligatorio'})
    }
    if(this.state.email == '' ){ 
            this.setState({correctoEmail: false})
            this.setState({errorEmail: 'Obligatorio'})
         }
    if (this.state.password == '') {
      this.setState({correctoPassword: false})
      this.setState({errorPass: 'Obligatorio'})
    }
    if(this.state.first_name == '' ){ 
      this.setState({correctoNombre: false})
      this.setState({errorNombre: 'Obligatorio'})
    }
    if(this.state.last_name == '' ){ 
       this.setState({correctoApellido: false})
       this.setState({errorApellido: 'Obligatorio'})
    }
    if(this.state.city == '' ){ 
       this.setState({errorCiudad: 'Obligatorio'})
    }else{ 
      this.setState({errorCiudad: ''})
    }
    if(this.state.province == '' ){ 
       this.setState({errorProvincia: 'Obligatorio'})
    }else{ 
      this.setState({errorProvincia: ''})
    }
    if(this.state.sector == '' ){ 
       this.setState({correctoSector: false})
       this.setState({errorSector: 'Obligatorio'})
    }
    // envio de datos al servidor
    if (this.state.correctoUsername === true && this.state.correctoEmail === true &&
      this.state.correctoPassword === true && this.state.correctoNombre === true &&
      this.state.correctoApellido === true && this.state.province.length !== 0 &&
      this.state.city.length !== 0 && this.state.correctoSector === true) {
      
      var data = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone: this.state.phone,
          province: this.state.province,
          city: this.state.city,
          sector: this.state.sector,
          phone: this.state.phone
        }
      
      try {
        window.fetch(ipBk + '/api/signup/', {
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
              this.setState({failsConexion: false})
              window.alert(response['msg'])
              this.props.navigation.navigate('Login')
            } else if (response['is_error'] === true) {
              this.setState({failsConexion: false})
              window.alert(response['msg'])
            }
          }).catch((error) => {
            this.setState({failsConexion: true})
          })
      } catch (error) {
        this.setState({failsConexion: true})
      }
    } else {
      window.alert('Debe llenar los campos obligatorios')
    }
  };
  //opciones de la cabecera de la pantalla
  static navigationOptions = {
    header: null
  }

  //renderizar la salida de los campos
  render () {
    if (this.state.loading === false && this.state.failsConexion == false) {
      return (
        <Container > 
          <BarraLateral {...this.props} title='Registro' />
          <ScrollView keyboardDismissMode='interactive'>
            <Content style={styles.contenido}>
              <Form>
                <Item stackedLabel>
                  <Label>Username</Label>
                  <Input onChangeText={(usuario) => this.validador(usuario,'usernam')} maxLength={20}/>
                </Item>
                <Text style={{color: 'red', marginLeft: 20}}>{this.state.errorUser}</Text>
                <Item stackedLabel >
                  <Label>Email</Label>
                  <Input onChangeText={(email) => this.validador(email,'correo')} maxLength={30}/>
                </Item>
                <Text style={{color: 'red'}}>{this.state.errorEmail}</Text>

                <Item stackedLabel >
                  <Label>Password</Label>
                  <Input secureTextEntry onChangeText={(pass) => this.validador(pass,'passs')} maxLength={20}/>
                </Item>
                <Text style={{color: 'red'}}>{this.state.errorPass}</Text>
                <Item stackedLabel >
                  <Label>Nombre</Label>
                  <Input onChangeText={(nombre) => this.validador(nombre,'nombre')} maxLength={20}/>
                </Item>
                <Text style={{color: 'red'}}>{this.state.errorNombre}</Text>

                <Item stackedLabel >
                  <Label>Apellido</Label>
                  <Input onChangeText={(apellido) => this.validador(apellido,'apellido')} maxLength={20}/>
                </Item>
                <Text style={{color: 'red'}}>{this.state.errorApellido}</Text>

                <Item stackedLabel>
                  <Label>Provincia</Label>
                  <Picker
                    selectedValue={this.state.province}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => this.setState({province: itemValue,cambioProvincia: true,errorProvincia: ''})}>
                    {this.provincias()}
                  </Picker>
                  <Text style={{color: 'red'}}>{this.state.errorProvincia}</Text>
                </Item>

                <Item stackedLabel>
                  <Label>Ciudad</Label>
                  <Picker
                    selectedValue={this.state.city}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue,errorCiudad: ''})}>
                    {this.ciudad()}
                  </Picker>
                  <Text style={{color: 'red'}}>{this.state.errorCiudad}</Text>
                </Item>

                <Item stackedLabel >
                  <Label>Sector</Label>
                  <Input onChangeText={(sector) => this.validador(sector,'sectors')} maxLength={20}/>
                </Item>
                <Text style={{color: 'red'}}>{this.state.errorSector}</Text>

                <Item stackedLabel >
                  <Label>Celular</Label>
                  <Input keyboardType={'numeric'} onChangeText={(cell) => this.validarCell(cell)} maxLength={10}/>
                </Item>
                <Text style={{color: 'red'}}>{this.state.errorPhone}</Text>
                <TouchableOpacity onPress={this.Login.bind(this)} style={styles.button}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
              </Form>
            </Content>
          </ScrollView>
        </Container>
      )
    } else if (this.state.loading === true) {
      //si no se carga el contenido devuelve esta pantalla
      return (<Viewloading />)
    }else if (this.state.failsConexion === true) {
      //si no se carga el contenido devuelve esta pantalla
      return (<ViewNotConexion />)
    }
  }
}

//estilos de componentes
const styles = StyleSheet.create({
  contenido: {
    marginLeft: '2%',
    marginRight: '2%'
  },
  button: {
    width: '100%',
    backgroundColor: '#ec7801',
    borderRadius: 5,
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

AppRegistry.registerComponent('Registros', () => Registros)
