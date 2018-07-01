import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SectionList,
  Image,
  ScrollView
} from 'react-native'
import BarraLateral from '../components/BarraLateral'
import OfflineNotice from '../components/OfflineNotice'

const backgroundColor = '#0067a7'
const ipBk = 'http://132.148.147.172:9999'

class SectionListItem extends Component {
  render () {
    return (
      <View style={styles.productBox}>
        <Image style={{height: 250, width: '100%'}} source={{uri: ipBk + this.props.item.image}} />
      </View>
    )
  }
}

// Clase Vista de Nombres de Categoría de productos
class SectionHeader extends Component {
  render () {
    return (
      <View style={{
        flex: 1,
        // backgroundColor: 'rgb(77, 120, 140)'
        backgroundColor: '#185494'
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: 'white',
          margin: 8,
          marginLeft: 10
        }}>
          {this.props.section.name}
        </Text>
      </View>
    )
  }
}

// Clase  la vista Products
export default class Products extends Component {
  static navigationOptions = ({ navigation }) => {
    let drawerLabel = 'Menu'
    let drawerIcon = () => (
      <Image
        source={require('../images/home-icon.png')}
        style={{ width: 26, height: 26, tintColor: backgroundColor }}
      />
    )
    return {drawerLabel, drawerIcon}
  }

  state={
    sections: [],
    isConnected: true
  }

  fetchData = async () => {
    try {
      const response = await window.fetch(ipBk + '/api/catalogue/products/')
      const products = await response.json() // products have array data
      this.setState({sections: products}) // filled data with dynamic array
    } catch (error) {
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
        /* NOTE: React native often reacts strangely to offline uses and as such,
        it may be necessary to directly set state here rather than to rely on a callback */
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
    if (!this.state.isConnected) {
      return (
        <View style={{ flex: 1 }}>
          <BarraLateral {...this.props} title='Menu' />
          <OfflineNotice />
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor='#ec7801' barStyle='light-content' />
          <BarraLateral {...this.props} title='Menu' />
          <ScrollView>
            <SectionList
              sections={this.state.sections}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => {
                return (
                  <SectionListItem item={item} index={index} />
                )
              }}
              renderSectionHeader={({section}) => {
                return (
                  <SectionHeader section={section} />
                )
              }}
            />
          </ScrollView>
        </View>
      )
    }
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

AppRegistry.registerComponent('Products', () => Products)
