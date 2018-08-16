import React, { Component } from 'react'
import {
  Image,
  AppRegistry,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import {
  Container,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Text,
  Button,
  Icon
} from 'native-base'
import BarraLateral from '../components/BarraLateral'
import Viewloading from '../components/Viewloading'

//direccion ip del servidor
const ipBk = 'http://132.148.147.172:9999'
export default class Cupones extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: '',
      loading: true,
      vacio: false,
      imageSelected: 0,
      user: '',
      logeado: false
    }
  }
//Get de datos de las imagenes de los cupones
 fetchData = async () => {
   try {
     this.setState({loading: true})
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
 };

 async verificar(){ 
    let token = await AsyncStorage.getItem('userToken')
    if (token) {
      this.setState({logeado: true})
      this.fetchData()
    }else{
      this.setState({logeado: false})
      window.alert('Debe Iniciar Sesion para poder ver cupones')
      this.props.navigation.navigate('Login')
    }
  }
 //activar el fetchData
 componentDidMount () {
  if (this.state.logeado === false) {
    this.verificar()
  }

 }

 // Envia los IDs de las imagenes presionadas por el usuario
  async CouponClick (imageKey) {
    this.setState({ imageSelected: imageKey })
    // Obtiene el token del Storage
    let token = await AsyncStorage.getItem('userToken')
    this.setState({ user: token })
    if (this.state.imageSelected !== 0 && this.state.user !== '') {
      try {
        let url = ipBk + '/api/analytics/coupon/'+ this.state.imageSelected.toString() + '/'
        fetch (url, {
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

//renderizar la salida de datos
 render () {
   if (this.state.loading === false) {
     return (
       <Container>
         <BarraLateral {...this.props} title='Cupones' />
         <View style={styles.views}>
           <DeckSwiper
              ref={(c) => this._deckSwiper = c}
             dataSource={this.state.cards}
             renderItem={item =>
               <Card style={{ elevation: 3 }}>
                 <CardItem  cardBody button
                   onPress={ () =>
                    {
                      this.CouponClick(item.id)
                    }
                  }
                 >
                   <Image style={{ height: 300,flex: 1}} source={{uri: ipBk + item.image}} />
                 </CardItem>
               </Card>
             }
           />
         </View>
         <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button onPress={() => this._deckSwiper._root.swipeLeft()} rounded warning>
            <Icon name="arrow-back" />
          </Button>
          <Button style={styles.iconos} onPress={() => this._deckSwiper._root.swipeRight()} rounded warning>
            <Icon name="arrow-forward" />
          </Button>
        </View>
       </Container>
     )
   } else {
     return (<Viewloading />)
   }
 }
}

//estilos para componentes
const styles = StyleSheet.create({
  views: {
    flex: 1,
    paddingTop:60,
    paddingBottom: 0,
    paddingLeft: 15,
    paddingRight: 15

  },
   iconos: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

AppRegistry.registerComponent('Cupones', () => Cupones)