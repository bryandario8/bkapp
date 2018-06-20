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

const backgroundColor = '#0067a7';
var {height, width} = Dimensions.get('window');
var heightPantalla = height - 60;
const ipBk = 'http://132.148.147.172:9999';

export default class Propanganda extends Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      loading: false
    }
  }
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
        this.setState({loading : true });
        fetch(ipBk + '/api/catalogue/offers',{
          method: "get",
            headers: {
                      'Accept' : 'application/json',
                      'Content-type' :'application/json',
                    }
        })
        .then((response) => response.json())
            .then((response) =>{
              if (response.length != 0) {
                  this.setState({data: response});
                  this.setState({loading : false });
              }else{
                this.setState({loading : false });
              }
            });
      }catch(error){
            this.setState({loading : false });
             console.log(error);
        }
  };
  componentDidMount(){
      this.fetchData();
    }
  render() {
    let sizeData = this.state.data.length;
    const images = [ "http://132.148.147.172:9999/media/products/photo4.jpg",
            "http://132.148.147.172:9999/media/products/photo5.jpg"];
    
    if (this.state.loading == false) {
         return (
             <View style={{
                  flex: 1,
                  flexDirection: 'column',
              }}>      
               <BarraLateral {...this.props} title='Home'/>
               <View style={styles.pantalla} >
                <ImageSlider 
                  autoPlayWithInterval={3000} 
                  style={{flex:0.5, height:270, width:width}} 
                  images = {images}/>
              </View> 
            </View> 
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
  }
});
AppRegistry.registerComponent('Propanganda', () => Propanganda);