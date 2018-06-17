import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { 
    Container, 
    Header, 
    Title,
    Button, 
    Left,  
    Body, 
    Icon,
    Content
} from 'native-base';
import { Pages } from 'react-native-pages';
import ImageSlider from 'react-native-image-slider';
import BarraLateral from '../components/BarraLateral';
import Carga from '../components/Carga';

const backgroundColor = '#0067a7';
var {height, width} = Dimensions.get('window');
var heightPantalla = height - 60;

export default class Propanganda extends Component{
  state={
      data:[],
      loaded: false
  };
  constructor(){
    super();
    Carga.load(v =>this.setState({loaded:true}));
  };
  static navigationOptions = ({ navigation }) => {
        let drawerLabel = "Ofertas";
        let drawerIcon = () => (
            <Image
                source={require('../images/home-icon.png')}
                style={{ width: 26, height: 26, tintColor: backgroundColor }}
            />
        );
        return {drawerLabel, drawerIcon};
    }
    
    fetchData = async() =>{
    try{
            const { params } = this.props.navigation.state;
            const response =  await fetch('http://132.148.147.172:9999/api/catalogue/offers');
            const offers = await response.json(); // products have array data
            this.setState({data: offers}); // filled data with dynamic array
        }catch(error){
             console.log(error);
        }
    };
  render() {
    return (
       <View style={{
            flex: 1,
            flexDirection: 'column',
        }}>      
         <BarraLateral {...this.props} title='Home'/>
         {this.state.loaded ?<View style={styles.pantalla} >
          <ImageSlider 
            autoPlayWithInterval={3000} 
            style={{flex:0.5, height:270, width:width}}
            images = {images = [
              "http://132.148.147.172:9999/media/products/photo3.jpg",
              "http://132.148.147.172:9999/media/products/photo4.jpg",
              "http://132.148.147.172:9999/media/products/photo5.jpg"]}/>
        </View>: <Container style={{flex:1}}>
        <Content style={styles.contenedor}>
          <Image style={styles.logo} source={require('../images/bk-logo.svg.png')}/>
        </Content>
      </Container>}
      </View> 
    );
  }
}
const styles = StyleSheet.create({
  imagen:{
    flex: 0,
    
  },
  pantalla:{
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    //width: width
  },logo:{
     width: 150, 
     height: 150,
     marginTop:"50%",
     marginRight:"30%",
     marginLeft:"30%",
  },contenedor:{
    
  }
});
AppRegistry.registerComponent('Propanganda', () => Propanganda);