import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  Image,
  ScrollView,
  YellowBox
} from 'react-native'
import {
  Content,
  Card,
  CardItem,
  Text,
  Right,
  Left,
  Button,
  Icon,
  Body
} from 'native-base'
import { createStackNavigator } from 'react-navigation'
import BarraLateral from '../components/BarraLateral'
import Viewloading from '../components/Viewloading'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

const backgroundColor = '#0067a7'
const ipBk = 'http://192.168.43.233:8000' // 'http://132.148.147.172:9999'

// Screen con Productos de la Categoría seleccionada
class FlatListProduct extends Component {
  render () {
    return (
      <Content>
        <Card>
          <CardItem header style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Body>
              <Text>
                {this.props.item.title}
              </Text>
            </Body>
          </CardItem>
          <CardItem cardBody>
            <Body>
              <Image
                style={{
                  height: 250,
                  width: '90%',
                  flex: 1,
                  alignItems: 'center'
                }}
                source={{
                  uri: ipBk + this.props.item.image
                }}
              />
            </Body>
          </CardItem>
          <CardItem footer>
            <Body>
              <Text>
                {this.props.item.description}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    )
  }
}

// Screen con Nombres de Categoría de productos
class FlatListCategory extends Component {
  render () {
    return (
      <Content>
        <Card>
          <CardItem
            button onPress={() => {
              this.props.navigation.navigate('Products', {
                categoryName: this.props.item.name,
                products: this.props.item.data
              })
            }}
            style={{
              margin: 2,
              justifyContent: 'center'
            }}
          >
            <Left>
              <Image
                source={{
                  uri: ipBk + this.props.item.image
                }}
                style={{
                  height: 100,
                  width: '50%',
                  flex: 1
                }}
              />
            </Left>
            <Body>
              <Text
                style={{
                  margin: 10,
                  textAlignVertical: 'center'
                }}
              >
                {this.props.item.name}
              </Text>
            </Body>
            <Right>
              <Icon name='arrow-forward' />
            </Right>
          </CardItem>
        </Card>
      </Content>
    )
  }
}

// Screen Contenedor de las Categorías y Miembro del Stack de Products
class Categories extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      title: 'Categorías'
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      names: [],
      loading: false,
      iterarYa: false
    }
  }

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
    xhr.open('GET', 'http://132.148.147.172:9999/admin')
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState !== 4) { // code for completed request
        return
      }
      console.log('--- STATUS ---')
      console.log(xhr.status)
      if (xhr.status === 200) { // successful response
        callback(true)
        this.setState({isConnected: true})
        console.log('result goes here: ' + true)
      } else { // unsuccessful response
        // NOTE: React native often reacts strangely to offline uses and as such,
        // it may be necessary to directly set state here rather than to rely on a callback
        callback(false) // OR: this.state.splash = false
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
class Products extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state

    return {
      title: params ? params.categoryName : 'Products'
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
        backgroundColor: '#993300',
        margin: 4
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
)

// Screen principal y total: Barra Superior + Contenedores
export default class Menu extends Component {
  static navigationOptions = ({ navigation }) => {
    let drawerLabel = 'Prueba'
    let drawerIcon = () => (
      <Image
        source={require('../images/home-icon.png')}
        style={{ width: 26, height: 26, tintColor: backgroundColor }}
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

// Estilos de los componentes
const styles = StyleSheet.create({
  flatListItem: {
    color: 'gray',
    padding: 5,
    fontSize: 12
  },
  productBox: {
    padding: 5,
    marginHorizontal: 10,
    borderColor: '#faaf18',
    borderBottomWidth: 2
  },
  pageName: {
    margin: 10,
    color: '#185494',
    textAlign: 'center'
  }
})

AppRegistry.registerComponent('Menu', () => Menu)
