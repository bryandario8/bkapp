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
      cambioProvincia: false
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
  //Valida en tiempo real los campos ingresados
  validador(valor,tipo){
    switch(tipo){
      case 'usernam':
        this.setState({errorUser: ''})
        this.setState({username: valor})
         if(this.state.username.length >= 4 ) { 
            if(/^[A-Za-z][A-Za-z0-9._%+-]+/i.test(this.state.username) ) { 
                this.setState({errorUser: ''})
            }else{
              this.setState({errorUser: 'Ingrese un usuario valido'})
            }
         }else if(this.state.username == '' ){ 
                this.setState({errorUser: 'Obligatorio'})
         }else{
            this.setState({errorUser: 'Invalido'})
         }
         break
       case 'correo':
        this.setState({errorEmail: ''})
        this.setState({email: valor})
         if(/^[A-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) { 
            this.setState({errorEmail: ''})
         }else if(this.state.email == '' ){ 
                this.setState({errorEmail: 'Obligatorio'})
         }else{
            this.setState({errorEmail: 'Ingrese un correo valido'})
         }
          break
        case 'nombre':
          this.setState({errorNombre: ''})
          this.setState({first_name: valor})
           if(/[A-Za-z]+/i.test(this.state.first_name) ) { 
            if (this.state.first_name.length >= 3) {
              this.setState({errorNombre: ''})
            }else{ 
              this.setState({errorNombre: 'Ingrese un nombre valido'})
            }
              
           }else if(this.state.first_name == '' ){ 
                  this.setState({errorNombre: 'Obligatorio'})
           }else{
              this.setState({errorNombre: 'Ingrese un nombre valido'})
           }
          break
        case 'apellido':
            this.setState({errorApellido: ''})
            this.setState({last_name: valor})
             if(/[A-Za-z]+/i.test(this.state.last_name) ) { 
              if (this.state.last_name.length >= 3) {
                this.setState({errorApellido: ''})
              }else{ 
                this.setState({errorApellido: 'Ingrese un apellido valido'})
              }
                
             }else if(this.state.last_name == '' ){ 
                    this.setState({errorApellido: 'Obligatorio'})
             }else{
                this.setState({errorApellido: 'Ingrese un apellido valido'})
             }
          break
        case 'sectors':
            this.setState({errorSector: ''})
            this.setState({sector: valor})
             if(/[A-Za-z0-9.#-]+\s/i.test(this.state.sector) ) { 
              if (this.state.sector.length >= 3) {
                this.setState({errorSector: ''})
              }else{ 
                this.setState({errorSector: 'Ingrese un sector valido'})
              }
                
             }else if(this.state.sector == '' ){ 
                    this.setState({errorSector: 'Obligatorio'})
             }else{
                this.setState({errorSector: 'Ingrese un sector valido'})
             }
          break
        case 'celular':
          this.setState({errorPhone: ''})
           this.setState({phone: valor})
           if (/[0-9]{10}/i.test(this.state.phone)) {
              this.setState({errorPhone: ''})
           }else{
              this.setState({errorPhone: 'Ingrese un numero valido'})
           }
          break
        case 'passs':
           this.setState({errorPass: ''})
           this.setState({password: valor})
           if (this.state.password.length >= 6 ) {
              if (/[A-Za-z._%+-]+[0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.password)) {
                this.setState({errorPass: ''})
              }else {
                this.setState({errorPass: 'Ingrese numero, letra y un caracter especial'})
               }
           }else if (this.state.password == '') {
              this.setState({errorPass: 'Obligatorio'})
           }else{
              this.setState({errorPass: 'Ingrese numero, letra y un caracter especial'})
              
           }
          break
    }
     
  }

  async Login () {
    // validar usuario
    if (this.state.username === '') {
      this.setState({errorUser: 'Obligatorio'})
    } else {
      
      this.setState({errorUser: ''})
    }
    // validar email
    if (this.state.email === '') {
      this.setState({errorEmail: 'Obligatorio'})
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
      this.setState({errorEmail: 'Ingrese un correo valido'})
    } else {
      this.setState({errorEmail: ''})
    }
    // validar contrasenia
    if (this.state.password === '') {
      this.setState({errorPass: 'Obligatorio'})
    } else if (this.state.password.length < 6) {
      this.setState({errorPass: 'Ingrese numero, letra y un caracter especial'})
    } else {
      this.setState({errorPass: ''})
    }
    // validar nombre
    if (this.state.first_name === '') {
      this.setState({errorNombre: 'Obligatorio'})
    } else {
      this.setState({errorNombre: ''})
    }
    // validar apellido
    if (this.state.last_name === '') {
      this.setState({errorApellido: 'Obligatorio'})
    } else {
      this.setState({errorApellido: ''})
    }
    // validar provincia
    if (this.state.province === '') {
      this.setState({errorProvincia: 'Obligatorio'})
    } else {
      this.setState({errorProvincia: ''})
    }
    // validar ciudad
    if (this.state.city === '') {
      this.setState({errorCiudad: 'Obligatorio'})
    } else {
      this.setState({errorCiudad: ''})
    }
    // validar sector
    if (this.state.sector === '') {
      this.setState({errorSector: 'Obligatorio'})
    } else {
      this.setState({errorSector: ''})
    }

    // validar sector
    if (this.state.phone != '') {
      if (/[0-9]{10}/i.test(this.state.phone)) {
        this.setState({errorPhone: ''})
      }
    } else {
      this.setState({errorPhone: 'Ingrese un numero valido'})
    }

    // envio de datos al servidor
    if (this.state.username.length !== 0 && this.state.email.length !== 0 &&
      this.state.password.length !== 0 && this.state.first_name.length !== 0 &&
      this.state.last_name.length !== 0 && this.state.province.length !== 0 &&
      this.state.city.length !== 0 && this.state.sector.length !== 0) {
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
              window.alert(response['msg'])
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
  static navigationOptions = {
    header: null
  }
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
                  <Input  onChangeText={(usuario) => this.validador(usuario,'usernam')} maxLength={20}/>
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
                  <Input onChangeText={(sector) => this.validador(sector,'sectors')} />
                </Item>
                <Text style={{color: 'red'}}>{this.state.errorSector}</Text>

                <Item stackedLabel >
                  <Label>Celular</Label>
                  <Input keyboardType={'numeric'} onChangeText={(cell) => this.validador(cell,'celular')} maxLength={10}/>
                </Item>
                <TouchableOpacity onPress={this.Login.bind(this)} style={styles.button}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
              </Form>
            </Content>
          </ScrollView>
        </Container>
      )
    } else {
      return (<Viewloading />)
    }
  }
}
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
