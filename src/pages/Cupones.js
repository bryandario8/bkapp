import React, { Component } from 'react';
import { 
  Image,
  AppRegistry,
  StyleSheet,
  Modal,
  TouchableHighlight 
} from 'react-native';
import { 
  Container, 
  Header, 
  View, 
  DeckSwiper, 
  Card, 
  CardItem, 
  Thumbnail, 
  Text, 
  Left, 
  Body, 
  Icon,
  Button
} from 'native-base';
import BarraLateral from '../components/BarraLateral';

export default class Cupones extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards : '',
      loading: true,
      vacio : false,
      modalVisible : false
    }
  }

 fetchData = async() =>{
      try{
           this.setState({loading : true });
          fetch('http://132.148.147.172:9999/api/catalogue/coupons/',{
            method: "get",
            header: {
                      'Accept' : 'application/json',
                      'Content-type' :'application/json',
                    }
          })
          .then((response) => response.json())
            .then((response) =>{
              if (response.length != 0) {
                  this.setState({cards: response});
                  this.setState({vacio : false });
                  this.setState({loading : false });
              }else{
                this.setState({vacio : true });
                this.setState({loading : false });
                
              }
            });
        }catch(error){
             console(error)
        }
    };
    componentDidMount(){
      this.fetchData();
    }
    setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    if (this.state.loading == false) {
        return (
          <Container>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <Button block info onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}><Text> Cerrar </Text>
                      </Button>
                  </View>
                </View>
              </Modal>
            <BarraLateral {...this.props} title='Cupones'/>
            <View>
              <DeckSwiper
                dataSource={this.state.cards}
                renderItem={item =>
                  <Card style={{ elevation: 3 }}>
                    <CardItem cardBody>
                      <Image style={{ height: 300, flex: 1 }} source={{uri:'http://132.148.147.172:9999' + item.image}} />
                    </CardItem>
                    <CardItem >
                     <Button block success onPress={() => {this.setModalVisible(true);}}><Text> info </Text></Button>
                    </CardItem>
                  </Card>
                }
                />
            </View>
          </Container>
        );
    }else{
      return (
        <Container >
           <Image style={styles.logo} source={require('../images/bk-logo.svg.png')}/>
      </Container>);
    }
    
  }
}
const styles = StyleSheet.create({
  logo:{
     width: 150, 
     height: 150,
     marginTop:"50%",
     marginRight:"30%",
     marginLeft:"30%",
  },contenedor:{
    
  }
});
AppRegistry.registerComponent('Cupones', () => Cupones);