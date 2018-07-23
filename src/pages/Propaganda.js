import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native'
import ImageSlider from 'react-native-image-slider'
import BarraLateral from '../components/BarraLateral'
import Viewloading from '../components/Viewloading'

var {width} = Dimensions.get('window').width
const ipBk = 'http://192.168.1.15:8000' // 'http://132.148.147.172:9999'

export default class Propanganda extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      images: [],
      loading: false,
      iterarYa: false
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
              style={{flex: 0, height: 510, width: width}}
              images={this.state.images} />
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
