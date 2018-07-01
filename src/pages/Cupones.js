import React, { Component } from 'react'
import {
  Image,
  AppRegistry,
  StyleSheet,
  Modal
} from 'react-native'
import {
  Container,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Text,
  Button
} from 'native-base'
import BarraLateral from '../components/BarraLateral'

const ipBk = 'http://132.148.147.172:9999'
export default class Cupones extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: '',
      loading: true,
      vacio: false,
      modalVisible: false
    }
  }

  fetchData = async () => {
    try {
      this.setState({ loading: true })
      window.fetch(ipBk + '/api/catalogue/coupons/', {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.length !== 0) {
            this.setState({cards: response})
            this.setState({vacio: false})
            this.setState({loading: false})
          } else {
            this.setState({vacio: true})
            this.setState({loading: false})
          }
        })
    } catch (error) {
      this.setState({loading: false})
      console(error)
    }
  }
  componentDidMount () {
    this.fetchData()
  }
  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  render () {
    if (this.state.loading === false) {
      return (
        <Container>
          <Modal
            animationType='slide'
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              window.alert('Modal has been closed.')
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Button block info onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}><Text> Cerrar </Text>
                </Button>
              </View>
            </View>
          </Modal>
          <BarraLateral {...this.props} title='Cupones' />
          <View>
            <DeckSwiper
              dataSource={this.state.cards}
              renderItem={item =>
                <Card style={{ elevation: 3 }}>
                  <CardItem cardBody>
                    <Image style={{ height: 300, flex: 1 }} source={{uri: ipBk + item.image}} />
                  </CardItem>
                  <CardItem >
                    <Button block success onPress={() => { this.setModalVisible(true) }}>
                      <Text> info </Text>
                    </Button>
                  </CardItem>
                </Card>
              }
            />
          </View>
        </Container>
      )
    } else {
      return (
        <Container >
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
  }
})

AppRegistry.registerComponent('Cupones', () => Cupones)
