import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet
,Button,TouchableOpacity,StatusBar,Image } from 'react-native';

export default class Menu extends Component{
static navigationOptions= ({navigation}) =>({
		  title: 'Burger King',	
	});  
  
	render(){
		const { navigate } = this.props.navigation;
		return(
	        <View >	
   
                <Text style={styles.pageName}>Menu</Text>
                <Button
                    onPress={() => navigate('Products',{cat:'Products',id:'1'})}
                    color="orange"
                    title="Productos"
                />
            
                <Button
                    onPress={() => navigate('Coupons',{cat:'Coupons',id:'2'})}
                    color="red"
                    title="Cupones"
                />
            </View>
		);
	}
}
const styles = StyleSheet.create({
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},
});


AppRegistry.registerComponent('menu', () => menu);