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
    /*fetchData = async() =>{
    try{
            const { params } = this.props.navigation.state;
            const response =  await fetch('http://172.168.0.104:8000/api/catalogue/offers');
            const propaganda = await response.json(); // products have array data
            this.setState({data: images}); // filled data with dynamic array
        }catch(error){
             console.log(error);
        }
    };*/
	render() {
    return (
      <View style={{
            flex: 1,
            flexDirection: 'column',
        }}>      
      <BarraLateral {...this.props} title='Ofertas'/> 
      <Pages style={styles.pantalla}>
        <View style={styles.pantalla}>
        <Image style={styles.imagen} source={require('../images/photo2.jpg')}/>
        </View>

        <View style={styles.pantalla} >
        <Image style={styles.imagen} source={require('../images/photo1.jpg')}/>
        </View>
        <View style={styles.pantalla} >
        <Image style={styles.imagen} source={require('../images/photo3.jpg')}/>
        </View>
      </Pages>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imagen:{
    flex: 1,
    width: width
  },
  pantalla:{
    flex: 1,
    width: width
  },
});
AppRegistry.registerComponent('Propanganda', () => Propanganda);