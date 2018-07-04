import React, { Component } from 'react'
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
} from 'react-native'
import { 
    Container, 
    Header, 
    Title,
    Button, 
    Left,  
    Body, 
    Icon,
    Content
} from 'native-base'
import { Pages } from 'react-native-pages'
import ImageSlider from 'react-native-image-slider'
import BarraLateral from '../components/BarraLateral'
import Viewloading from '../components/Viewloading'

const backgroundColor = '#0067a7'
var {height, width} = Dimensions.get('window')
var heightPantalla = height - 60
const ipBk = 'http://132.148.147.172:9999'
var images1 = [];
export default class Propanganda extends Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      images: [],
      loading: false,
      iterarYa: false
    }
  }
    agregarLista(dato,dns){
        images1.push(dns + dato);
    }
    iterator(uri){
        if (this.state.iterarYa == true) {
          let sizeData = this.state.data.length;
          var img = '';
          for (var i = 0; i >= sizeData; i++) {
            img = this.state.data.pop().toString();
            this.agregarLista(img,uri);
          }
          alert(img.toString());

        }

        this.setState({images : images1 });
        this.setState({loading : false });
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
                  this.setState({iterarYa: true});
                  this.iterator(ipBk);

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
    
   // if (this.state.loading == false) {
         return (
             <View style={{
                  flex: 1,
                  flexDirection: 'column',
              }}>      
               <BarraLateral {...this.props} title='Home'/>
               <View style={styles.pantalla} >
                <ImageSlider 
                  autoPlayWithInterval={3000} 
                  style={{flex:0, height:270, width:width}} 
                  images = {this.state.images}/>
              </View> 
            </View> 
          );
   /* }else{
     return(<Viewloading/>);
    }*/
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
  },
});
AppRegistry.registerComponent('Propanganda', () => Propanganda);