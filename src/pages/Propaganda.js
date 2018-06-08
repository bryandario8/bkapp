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
import { Pages } from 'react-native-pages';
import ImageSlider from 'react-native-image-slider';
import BarraLateral from '../components/BarraLateral';

const backgroundColor = '#0067a7';
var {height, width} = Dimensions.get('window');
var heightPantalla = height - 60;
export default class Propanganda extends Component{
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
    state={
      data:[]
    };
    fetchData = async() =>{
    try{
            const { params } = this.props.navigation.state;
            const response =  await fetch('http://192.168.1.6:8000/api/catalogue/coupons');
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
      <View style={styles.pantalla} >
        <ImageSlider 
          autoPlayWithInterval={3000} 
          style={{flex:0, height:270, width:width}}
          images = {images = [
            "http://192.168.1.6:8000/media/products/photo5134175237187938245.jpg",
            "http://192.168.1.6:8000/media/products/photo5134175237187938244.jpg",
            "http://192.168.1.6:8000/media/products/photo5134175237187938252.jpg",
            "http://192.168.1.6:8000/media/products/photo5134175237187938242_J5LMcWP.jpg",
            "http://192.168.1.6:8000/media/products/photo5134175237187938241_UiqD2I7.jpg"
    ]}
        />
      </View> 
      
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
  },
});
AppRegistry.registerComponent('Propanganda', () => Propanganda);