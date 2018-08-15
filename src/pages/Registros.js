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
        })
    } catch (error) {
      this.setState({loading: false})
      console(error)
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
        this.setState({username: valor})
         if(this.state.username.length > 2) { 
            if(/[A-Za-z0-9._%+-]+/i.test(this.state.username) ) { 
                this.setState({errorUser: ''})
                this.setState({correctoUsername: true})
            }else{
              this.setState({correctoUsername: false})
              this.setState({errorUser: 'Ingrese un usuario valido'})
            }
         }else if(this.state.username == '' ){ 
              this.setState({correctoUsername: false})
              this.setState({errorUser: 'Obligatorio'})
         }else{
            this.setState({correctoUsername: false})
            this.setState({errorUser: 'Invalido'})
         }
         break
       case 'correo':
        this.setState({errorEmail: ''})
        this.setState({email: valor})
         if(/[A-Za-z0-9._%+-]+@[A-Za-z]+\.*[A-Za-z]*\.[A-Za-z]{2,4}$/i.test(this.state.email)) { 
            this.setState({errorEmail: ''})
            this.setState({correctoEmail: true})
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
          this.setState({first_name: valor})
           if(/[A-Za-z]+\s*/i.test(this.state.first_name) ) { 
            if (this.state.first_name.length > 2) {
              this.setState({errorNombre: ''})
              this.setState({correctoNombre: true})
            }else{ 
              this.setState({correctoNombre: false})
              this.setState({errorNombre: 'Ingrese un nombre valido'})
            }
              
           }else if(this.state.first_name == '' ){ 
              this.setState({correctoNombre: false})
                  this.setState({errorNombre: 'Obligatorio'})
           }else{
            this.setState({correctoNombre: false})
              this.setState({errorNombre: 'Ingrese un nombre valido'})
           }
          break
        case 'apellido':
            this.setState({errorApellido: ''})
            this.setState({last_name: valor})
             if(/[A-Za-z]+\s*/i.test(this.state.last_name) ) { 
              if (this.state.last_name.length > 2) {
                this.setState({errorApellido: ''})
                this.setState({correctoApellido: true})
              }else{ 
                this.setState({correctoApellido: false})
                this.setState({errorApellido: 'Ingrese un apellido valido'})
              }
                
             }else if(this.state.last_name == '' ){ 
              this.setState({correctoApellido: false})
                    this.setState({errorApellido: 'Obligatorio'})
             }else{
              this.setState({correctoApellido: false})
                this.setState({errorApellido: 'Ingrese un apellido valido'})
             }
          break
        case 'sectors':
            this.setState({errorSector: ''})
            this.setState({sector: valor})
             if(/[A-Za-z0-9.#-]+\s*/i.test(this.state.sector) ) { 
              if (this.state.sector.length > 2) {
                this.setState({errorSector: ''})
                this.setState({correctoSector: true})
              }else{ 
                 this.setState({correctoSector: false})
                this.setState({errorSector: 'Ingrese un sector valido'})
              }
                
             }else if(this.state.sector == '' ){ 
              this.setState({correctoSector: false})
                    this.setState({errorSector: 'Obligatorio'})
             }else{
              this.setState({correctoSector: false})
                this.setState({errorSector: 'Ingrese un sector valido'})
             }
          break
        case 'passs':
           this.setState({errorPass: ''})
           this.setState({password: valor})
           if (this.state.password.length > 5 ) {
              if (/[A-Za-z._%+-0-9.-]+/i.test(this.state.password)) {
                this.setState({errorPass: ''})
                this.setState({correctoPassword: true})
              }else {
                this.setState({correctoPassword: false})
                this.setState({errorPass: 'Contraseña debil'})
               }
           }else if (this.state.password == '') {
              this.setState({correctoPassword: false})
              this.setState({errorPass: 'Obligatorio'})
           }else{
            this.setState({correctoPassword: false})
              this.setState({errorPass: 'Contraseña debil'})
           }
          break
    }
     
  }

  validarCell(valor){
      this.setState({errorPhone: ''})
      this.setState({phone: valor})
      if (/[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/i.test(this.state.phone)) {
        this.setState({errorPhone: ''})
        this.setState({correctPhone: true})
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
      
      if (this.state.correctPhone == true) {
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
      }else{
        var data = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone: this.state.phone,
          province: this.state.province,
          city: this.state.city,
          sector: this.state.sector
        }
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
              window.alert(response['msg'])
              this.props.navigation.navigate('Login')
            } else if (response['is_error'] === true) {
              window.alert(response['msg'])
            }
          }).catch((error) => {
            console.error(error)
          })
      } catch (error) {
        console.log('Error' + error)
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
    if (this.state.loading === false) {
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
                    onValueChange={(itemValue, itemIndex) => this.setState({province: itemValue,cambioProvincia: true})}>
                    {this.provincias()}
                  </Picker>
                  <Text style={{color: 'red'}}>{this.state.errorProvincia}</Text>
                </Item>

                <Item stackedLabel>
                  <Label>Ciudad</Label>
                  <Picker
                    selectedValue={this.state.city}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}>
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
    } else {
      //si no se carga el contenido devuelve esta pantalla
      return (<Viewloading />)
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
