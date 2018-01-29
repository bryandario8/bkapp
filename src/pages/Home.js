import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import Menu from '../components/Menu';

import {Actions} from 'react-native-router-flux';

export default class Home extends Component<{}> {
  
  goBack() {
    Actions.pop();
  }

  /*products() {
		Actions.products()
  }

  coupons() {
		Actions.coupons()
  }*/

  static navigationOptions= ({navigation}) =>({
    title: 'Burger King'
});  

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>	

       <Text style={styles.pageName}>Catalogo</Text>	   
	      <TouchableOpacity
		      style={styles.cat}
		      onPress={Actions.products}>
	        <Text style={styles.btnText}> Productos > </Text>
	      </TouchableOpacity>

	      <TouchableOpacity
		      style={styles.cat}
		      onPress={Actions.coupons}>
	        <Text style={styles.btnText}> Cupones > </Text>
	      </TouchableOpacity>	   
	           
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		display:'flex',alignItems:'center',
		justifyContent:'center'
	},
	cat:{
		backgroundColor:'#faaf18',
		padding:10,margin:10,width:'95%'
	},
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#185494', textAlign:'center',
		fontSize: 16
	},
	btnText:{
		color:'#185494',fontWeight:'bold'
	},
	 icon: {
    width: 24,
    height: 24,
  },
});


AppRegistry.registerComponent('home', () => home);