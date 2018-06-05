import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import { Pages } from 'react-native-pages';
import BarraLateral from '../components/BarraLateral';

const backgroundColor = '#0067a7';
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
            const response =  await fetch('http://192.168.0.104:8000/api//images/');
            const propaganda = await response.json(); // products have array data
            this.setState({data: images}); // filled data with dynamic array
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
      <BarraLateral {...this.props} title='Ofertas'/> 
      <Pages>
        <View style={{ flex: 1}}>
        <Image style={{ width: "100%", height: "100%" }} /*source={require(this.state.data)}*//>
        </View>

        <View style={{ flex: 1}} />
        <View style={{ flex: 1}} />
      </Pages>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cat:{
    backgroundColor:'#faaf18',
    padding:10,margin:10,width:'95%'
  }
});
AppRegistry.registerComponent('Propanganda', () => Propanganda);