import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  AsyncStorage
} from 'react-native'
import ImageSlider from 'react-native-image-slider'
import BarraLateral from '../components/BarraLateral'
import Viewloading from '../components/Viewloading'

var {width} = Dimensions.get('window').width
const ipBk = 'http://132.148.147.172:9999'

export default class Propanganda extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      images: [],
      loading: false,
      iterarYa: false,
      imageSelected: 0,
      user: ''
    }
  }

  iterator (uri) {
    let images1 = []
    if (this.state.iterarYa === true) {
      let sizeData = this.state.data.length
      let img = ''
      for (var i = 0; i < sizeData; i++) {
        img = this.state.data[i].image
        images1.push(uri + img)
      }
    }

    this.setState({images: images1})
    this.setState({loading: false})
  }

  fetchData = async () => {
    try {
      this.setState({loading: true})
      window.fetch(ipBk + '/api/catalogue/offers', {
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
            this.iterator(ipBk)
          } else {
            this.setState({loading: false})
          }
        })
    } catch (error) {
      this.setState({loading: false})
      console.log(error)
    }
  };
  componentDidMount () {
    this.fetchData()
  }

  // Envia los IDs de las imagenes presionadas por el usuario
  async OfferClick (imageKey) {
    this.setState({ imageSelected: imageKey })
    // Obtiene el token del Storage
    let token = await AsyncStorage.getItem('userToken')
    this.setState({ user: token })
    if (this.state.imageSelected !== 0 && this.state.user !== '') {
      try {
        let url = ipBk + '/api/analytics/offer/' + this.state.imageSelected.toString() + '/'
        fetch(url, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // envio el token del usuario al servidor para su autenticacion
            'Authorization': 'Token ' + this.state.user
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  static navigationOptions = {
    header: null
  }
  render () {
    if (this.state.loading === false) {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'column'
        }}>
          <BarraLateral {...this.props} title='Home' />
          <View style={styles.pantalla} >
            <ImageSlider
              autoPlayWithInterval={3000}
              style={{flex: 1, height: 510, width: width}}
              images={this.state.images}
              onPress={() => { this.OfferClick(5) }} />
          </View>
        </View>
      )
    } else {
      return (<Viewloading />)
    }
  }
}

const styles = StyleSheet.create({
  imagen: {
    flex: 0
  },
  pantalla: {
    flex: 1,
    // margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
AppRegistry.registerComponent('Propanganda', () => Propanganda)
