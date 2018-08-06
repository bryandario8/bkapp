import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  StatusBar,
  FlatList,
  Image,
  ScrollView,
  YellowBox,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import {
  Content,
  Card,
  CardItem,
  Text,
  Right,
  Left,
  Body,
  Thumbnail,
  ListItem,
  List
} from 'native-base'
import { createStackNavigator } from 'react-navigation'
import BarraLateral from '../components/BarraLateral'
import Viewloading from '../components/Viewloading'
import Icon from 'react-native-vector-icons/FontAwesome'

// Desactiva la alerta del warning producido por un metodo no utilizado
// de react-navigation en la actual version de react. En produccion esto no se reflejado.
// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

const colorMenu = '#993300'
const ipBk = 'http://192.168.1.3:8000' // 'http://132.148.147.172:9999'

// Screen con Productos de la Categoría seleccionada
class FlatListProduct extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isSelected: false,
      imageSelected: 0
    }
  }

  handleSelectImage (imageKey) {
    this.setState({ imageSelected: imageKey })
    window.alert(this.state.imageSelected)
  }
  
  // Envia los IDs de las imagenes presionadas por el usuario
  fetchId = async () => {
    try {
      fetch (ipBk, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.imageSelected
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 5 }}>
        <ImageBackground source={require('../images/wooden.jpg')}
          style={{
            justifyContent: 'center',
            height: '98%',
            width: null,
            flexGrow: 1,
            alignItems: 'center',
            position: 'relative',
            top: 10
          }}
        >
          <Card style={{ width: '80%', backgroundColor: 'transparent' }}>
            <CardItem bordered header
              style={{
                alignItems: 'center',
                height: 30,
                backgroundColor: 'transparent'
              }}
            >
              <View>
                <Text style={{ color: colorMenu, fontSize: 12 }}>
                  {this.props.item.title.toUpperCase()}
                </Text>
              </View>
            </CardItem>
            <CardItem bordered cardBody button
              onPress={ () =>
                {
                  this.handleSelectImage(this.props.item.id)
                  
                }
              }
            >
              <Image
                style={{
                  height: 125,
                  width: 200,
                  flex: 1
                  // alignItems: 'center'
                }}
                source={{
                  uri: ipBk + this.props.item.image
                }}
              />
            </CardItem>
            <CardItem bordered footer 
              style={{
                alignItems: 'center',
                backgroundColor: 'transparent'
              }}
            >
              <View>
                <Text note style={{ fontSize: 10 }}>
                  {this.props.item.description}
                </Text>
              </View>
            </CardItem>
          </Card>
        </ImageBackground>
      </View>
    )
  }
}

// Screen con Nombres de Categoría de productos
class FlatListCategory extends Component {
  render () {
    return (
      <Content>
        <List>
          <ListItem thumbnail
            button onPress={() => {
              this.props.navigation.navigate('Products', {
                categoryName: this.props.item.name.toUpperCase(),
                products: this.props.item.data,
                navigation: this.props.navigation
              })
            }}
          >
            <Left>
              <Thumbnail square
                source={{
                  uri: ipBk + this.props.item.image
                }}
              />
            </Left>
            <Body>
              <Text
                style={{
                  marginLeft: 15,
                  textAlignVertical: 'center',
                  fontWeight: 'bold',
                  color: colorMenu
                }}
              >
                {this.props.item.name.toUpperCase()}
              </Text>
            </Body>
            <Right>
              <Icon type='FontAwesome' name='chevron-right'
                style={{
                  fontSize: 20,
                  color: colorMenu
                }}
              />
            </Right>
          </ListItem>
        </List>
      </Content>
    )
  }
}

// Screen Contenedor de las Categorías y Miembro del Stack de Products
export class Categories extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      title: 'CATEGORIAS',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 20
      }
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      names: [],
      loading: false,
      iterarYa: false,
      isConnected: false
    }
  }

  // Recupera el json de productos listados por categoria
  // {
  //   name = nombre de categoria
  //   data : {
  //     id = id del producto,
  //     title = nombre del producto,
  //     description = descripcion del producto
  //   }
  // }
  fetchData = async () => {
    try {
      this.setState({loading: true})
      window.fetch(ipBk + '/api/catalogue/products', {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.length !== 0) {
            this.setState({data: response})
            this.setState({iterarYa: true})
            this.setState({loading: false})
          } else {
            this.setState({loading: false})
            this.refresh()
          }
        })
    } catch (error) {
      this.setState({loading: false})
      console.log('No se pudo conectar con la red')
    }
  }
  // LOGIC: Send a http request and use the response to determine the connectivity state
  refresh (callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://www.google.com' ) //'http://132.148.147.172:9999/admin')
    xhr.onreadystatechange = (e) => {  // para probar conectividad con internet
      if (xhr.readyState !== 4) { // code for completed request
        // alert(xhr.readyState)
        return
      }
      console.log('--- STATUS ---')
      console.log(xhr.status)
      // alert(xhr.status)
      if (xhr.status === 200) { // successful response
        // callback(true)
        this.setState({isConnected: true})
        console.log('result goes here: ' + true)
      } else { // unsuccessful response
        // NOTE: React native often reacts strangely to offline uses and as such,
        // it may be necessary to directly set state here rather than to rely on a callback
        // callback(false) // OR: this.state.splash = false
        this.setState({isConnected: false})
        console.log('result goes here: ' + false)
      }
    }
    xhr.send()
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    if (this.state.loading === false) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <FlatList
              data={this.state.data}
              keyExtractor={(item, index) => index + item}
              renderItem={({item, index}) => {
                return (
                  <FlatListCategory
                    item={item}
                    index={index}
                    navigation={this.props.navigation}
                  />
                )
              }}
            />
          </ScrollView>
        </View>
      )
    } else {
      return (
        <Viewloading />
      )
    }
  }
}

// Screen Contenedor de los productos y Miembro del Stack de Products
export class Products extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state

    return {
      title: params ? params.categoryName : 'Products',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 0
      },
      headerLeft:
        <TouchableOpacity
          style={{marginLeft: 20}}
          onPress={() => { navigation.goBack() }}
        >
          <Icon type='FontAwesome' name='chevron-left'
            style={{
              fontSize: 15,
              color: '#fff'
            }}
          />
        </TouchableOpacity>
    }
  }

  render () {
    const { params } = this.props.navigation.state
    const products = params ? params.products : null

    return (
      <View>
        <FlatList
          data={products}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => {
            return (
              <FlatListProduct
                item={item}
                index={index}
              />
            )
          }}
        />
      </View>
    )
  }
}

// Stack del Menu
const StackProduct = createStackNavigator(
  {
    Categories: Categories,
    Products: Products
  },
  {
    initialRouteName: 'Categories',
    navigationOptions: {
      headerStyle: {
        backgroundColor: colorMenu, // marrón tambien para flechas
        marginBottom: 5,
        height: 40
      },
      headerTintColor: '#fff'
    }
  }
)

// Screen principal y total: Barra Superior + Contenedores
export default class Menu extends Component {
  static navigationOptions = ({ navigation }) => {
    let drawerLabel = 'Menu'
    let drawerIcon = () => (
      <Image
        source={require('../images/home-icon.png')}
        style={{ width: 26, height: 26, tintColor: colorMenu }}
      />
    )
    return {drawerLabel, drawerIcon}
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor='#ec7801' barStyle='light-content' />
        <BarraLateral {...this.props} title='Menu' />
        <StackProduct />
      </View>
    )
  }
}

AppRegistry.registerComponent('Menu', () => Menu)
