import React, { Component } from 'react'
import {
  Image,
  AppRegistry,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback
} from 'react-native'
import {
  Container,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Text
} from 'native-base'
import BarraLateral from '../components/BarraLateral'
import Viewloading from '../components/Viewloading'

const ipBk = 'http: 192.168.43.233:8000' //'http://132.148.147.172:9999'
export default class Cupones extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: '',
      loading: true,
      vacio: false,
      modalVisible: false,
      modalImage: ''
    }
  }

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
 componentDidMount () {
   this.fetchData()
 }
 setModalVisible (visible, imageuri) {
   this.setState({modalImage: imageuri})
   this.setState({modalVisible: visible})
 }

 render () {
   if (this.state.loading === false) {
     return (
       <Container>
         <Modal
           animationType='fade'
           transparent
           visible={this.state.modalVisible}
           onRequestClose={() => {}}>
           <View style={styles.modal}>
             <Text onPress={() => {
               this.setModalVisible(!this.state.modalVisible)
             }} style={{color: '#fff'}}> Cerrar </Text>
             <Image style={styles.imagemodal} source={{uri: this.state.modalImage}} />
           </View>

         </Modal>
         <BarraLateral {...this.props} title='Cupones' />
         <View>
           <DeckSwiper
             dataSource={this.state.cards}
             renderItem={item =>
               <Card style={{ elevation: 3 }}>
                 <CardItem cardBody>
                   <TouchableWithoutFeedback onPress={() => { this.setModalVisible(true, ipBk + item.image) }}>
                     <Image style={{ height: 300, flex: 1 }} source={{uri: ipBk + item.image}} />
                   </TouchableWithoutFeedback>
                 </CardItem>
               </Card>
             }
           />
         </View>
       </Container>
     )
   } else {
     return (<Viewloading />)
   }
 }
}
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  imagemodal: {
    flex: 1,
    width: null
  }
})
AppRegistry.registerComponent('Cupones', () => Cupones)
