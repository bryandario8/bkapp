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
	render() {
    return (
      <View style={{
            flex: 1,
            flexDirection: 'column',
        }}>      
      <BarraLateral {...this.props} /> 
      <Pages>
        <View style={{ flex: 1, backgroundColor: 'red' }}/>
        <View style={{ flex: 1, backgroundColor: 'green' }} />
        <View style={{ flex: 1, backgroundColor: 'blue' }} />
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