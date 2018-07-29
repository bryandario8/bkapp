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

const ipBk = 'http://192.168.1.3:8000' // 'http://132.148.147.172:9999'

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
      oldprovince: '',
      city: '',
      sector: '',
      provincia: [],
      ciudad: [],
      loading: true
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
    if (this.state.province !== this.state.oldprovince) {
      this.fechtCiudad(this.state.province)
      if (this.state.ciudad.length !== 0) {
        return this.state.ciudad.map((data) => {
          return (<Picker.Item label={data.name} value={data.id} key={data.id} />)
        })
        this.setState({oldprovince: this.state.province})
      }
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
    } else if (this.state.password.length < 4) {
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
        sector: this.state.sector
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
                <Item inlineLabel >
                  <Label>Username</Label>
                  <Input onChangeText={(usuario) => this.setState({username: usuario})} />
                </Item>
                <Text style={{color: 'red', marginLeft: 20}}>{this.state.errorUser}</Text>

                <Item inlineLabel >
                  <Label>Email</Label>
                  <Input onChangeText={(email) => this.setState({email: email})} />
                </Item>
                <Text style={{color: 'red'}}>{this.state.errorEmail}</Text>

                <Item inlineLabel >
                  <Label>Password</Label>
                  <Input secureTextEntry onChangeText={(pass) => this.setState({password: pass})} />
                </Item>
                <Text style={{color: 'red'}}>{this.state.errorPass}</Text>

                <Item inlineLabel >
                  <Label>Nombre</Label>
                  <Input onChangeText={(nombre) => this.setState({first_name: nombre})} />
                </Item>
                <Text style={{color: 'red'}}>{this.state.errorNombre}</Text>

                <Item inlineLabel >
                  <Label>Apellido</Label>
                  <Input onChangeText={(apellido) => this.setState({last_name: apellido})} />
                </Item>
                <Text style={{color: 'red'}}>{this.state.errorApellido}</Text>

                <Item inlineLabel>
                  <Label>Provincia</Label>
                  <Picker
                    selectedValue={this.state.province}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => this.setState({province: itemValue})}>
                    {this.provincias()}
                  </Picker>
                  <Text style={{color: 'red'}}>{this.state.errorProvincia}</Text>
                </Item>

                <Item inlineLabel>
                  <Label>Ciudad</Label>
                  <Picker
                    selectedValue={this.state.city}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}>
                    {this.ciudad()}
                  </Picker>
                  <Text style={{color: 'red'}}>{this.state.errorCiudad}</Text>
                </Item>

                <Item inlineLabel >
                  <Label>Sector</Label>
                  <Input onChangeText={(sector) => this.setState({sector: sector})} />
                </Item>
                <Text style={{color: 'red'}}>{this.state.errorSector}</Text>

                <Item inlineLabel >
                  <Label>Celular</Label>
                  <Input keyboardType={'numeric'} onChangeText={(cell) => this.setState({phone: cell})} />
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
