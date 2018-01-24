import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList
} from 'react-native';

import flatListProduct from '../data/flatListProduct';

import {Actions} from 'react-native-router-flux';

class FlatListItem extends Component<{}> {

    goBack() {
        Actions.pop();
    }

    render() {
        return (
            <View style={styles.productBox}>
                <Text style={styles.flatListItem} > {this.props.item.name}></Text>
                <Text style={styles.flatListItem} > {this.props.item.foodDescription}></Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'gray',
        padding: 10,
        fontSize: 16,
    },
    productBox:{
        padding:5,
        margin:10,
        borderColor:'orange',
        borderBottomWidth:1
	},
});

export default class Products extends Component<{}> {
    static navigationOptions= ({navigation}) =>({
        title: 'Productos',			
        headerRight:<TouchableOpacity onPress={this.goBack}
        //style={{backgroundColor:'orange', margin:10,padding:10}}
        >
        <Text style={{color:'#fff'}}>Home</Text></TouchableOpacity>
    });

    /*state={
		data:[]
    };*/
    
    fetchData = async() =>{
		const { params } = this.props.navigation.state;
		//const response =  await fetch('http://hardeepcoder.com/laravel/easyshop/api/products/' + params.id);
		//const products = await response.json(); // products have array data
		//this.setState({data: products}); // filled data with dynamic array
    };

    componentDidMount(){
		this.fetchData();
	}
    
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={{flex: 1, marginTop: 22}}> 
                <Text style={styles.pageName}>{params.cat}</Text>
                <FlatList
                    data={flatListProduct}
                    renderItem={({item, index}) => {
                        return (
                            <FlatListItem item={item} index={index} >

                            </FlatListItem>
                        )
                    }}
                />
            </View>
        )
    }
}

/*const styles = StyleSheet.create({
	container:{
		 flex: 1,
        flexDirection: 'column',
		justifyContent: 'center',

	},
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},
	price:{
		padding:5, color:'orange',fontWeight:'bold',textAlign:'center'
	},
	proName:{
		padding:5,color:'blue',textAlign:'center'
	}
});*/

AppRegistry.registerComponent('products', () => products);