import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Picker,
  AppRegistry,
  Image
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

const ipBk = 'http://132.148.147.172:9999'

// registro
export default class Registros extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      identification: '',
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
  fetchData=async () => {
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
        return (<Picker.Item label={data.name} value={data.id} />)
      })
    }
  }
  // imprimir las etiquetas de ciudad
  ciudad () {
    if (this.state.province !== '') {
      // if (this.state.province != this.state.oldprovince) {
      this.fechtCiudad(this.state.province)
      if (this.state.ciudad.length !== 0) {
        return this.state.ciudad.map((data) => {
          return (<Picker.Item label={data.name} value={data.id} />)
        })
        // }
      }
      // this.setState({oldprovince:this.state.province})
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
        identification: this.state.identification,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone: this.state.phone,
        province: this.state.province,
        city: this.state.city,
        sector: this.state.sector
      }
      /* let datas = []
      datas[0] = data; */
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
  }

  render () {
    if (this.state.loading === false) {
      return (
        <Container>
          <BarraLateral {...this.props} title='Registro' />
          <ScrollView keyboardDismissMode='interactive'>
            <Content>

              <Form>

                <Item inlineLabel style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Input placeholder={'Username'} onChangeText={(usuario) => this.setState({username: usuario})} />
                  </View>
                  <Text style={{color: 'red'}}>{this.state.errorUser}</Text>
                </Item>

                <Item inlineLabel style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Input placeholder={'Email'} onChangeText={(email) => this.setState({email: email})} />
                  </View>
                  <Text style={{color: 'red'}}>{this.state.errorEmail}</Text>
                </Item>

                <Item inlineLabel style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Input placeholder={'Password'} secureTextEntry={true} onChangeText={(pass) => this.setState({password: pass})} />
                  </View>
                  <Text style={{color: 'red'}}>{this.state.errorPass}</Text>
                </Item>

                <Item inlineLabel style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Input placeholder={'Cedula'} keyboardType={'numeric'} onChangeText={(cedula) => this.setState({identification: cedula})} />
                  </View>
                </Item>

                <Item inlineLabel style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Input placeholder={'Nombre'} onChangeText={(nombre) => this.setState({first_name: nombre})} />
                  </View>
                  <Text style={{color: 'red'}}>{this.state.errorNombre}</Text>
                </Item>

                <Item inlineLabel style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Input placeholder={'Apellido'} onChangeText={(apellido) => this.setState({last_name: apellido})} />
                  </View>
                  <Text style={{color: 'red'}}>{this.state.errorApellido}</Text>
                </Item>

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

                <Item inlineLabel style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Input placeholder={'Sector'} onChangeText={(sector) => this.setState({sector: sector})} />
                  </View>
                  <Text style={{color: 'red'}}>{this.state.errorSector}</Text>
                </Item>

                <Item inlineLabel style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Input placeholder={'Celular'} keyboardType={'numeric'} onChangeText={(cell) => this.setState({phone: cell})} />
                  </View>
                </Item>

                <TouchableOpacity onPress={this.Login.bind(this)} style={styles.button}>
                  <Text>Enviar</Text>
                </TouchableOpacity>
              </Form>
            </Content>
          </ScrollView>
        </Container>
      )
    } else {
      return (
        <Container>
          <Image style={styles.logo} source={require('../images/bk-logo.svg.png')} />
        </Container>
      )
    }
  }
}
const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    marginTop: '50%',
    marginRight: '30%',
    marginLeft: '30%'
  },
  button: {
    width: '40%',
    backgroundColor: 'rgba(24,84,148,0.9)',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    paddingVertical: 10,
    marginVertical: 10
  }
})

AppRegistry.registerComponent('Registros', () => Registros)
