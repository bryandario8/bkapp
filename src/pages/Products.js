import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';

import flatListProduct from '../data/flatListProduct';

// Se importa una libreria qu epermite la navegacion entre paginas
import {Actions} from 'react-native-router-flux';

class FlatListItem extends Component<{}> {

    goBack() {
        Actions.pop();
    }

    functionContent() {
        return <View style={styles.productBox}>
                    <Text style={styles.flatListItem} > {this.props.item.title}</Text>
                    <Text style={styles.flatListItem} > {this.props.item.description}</Text>
                    <Image style={{height:250, width:'100%'}} source={{uri:this.props.item.image}} />
                </View>
    }

    render() {
        return (
            <View>
                {this.props.item.is_active ? this.functionContent() : null }
            </View>
        );
    }
}

// Clase la vista Products
export default class Products extends Component<{}> {
    static navigationOptions= ({navigation}) =>({
        title: 'Productos',			
        headerRight:<TouchableOpacity onPress={this.goBack}
        //style={{backgroundColor:'orange', margin:10,padding:10}}
        >
        <Text style={{color:'#fff'}}>Home</Text></TouchableOpacity>
    });

    state={
		data:[]
    };
    
    fetchData = async() =>{
		const { params } = this.props.navigation.state;
		const response =  await fetch('http://192.168.43.34:8888/api/catalogue/products/');
		const products = await response.json(); // products have array data
		this.setState({data: products}); // filled data with dynamic array
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
                    data={this.state.data}
                    keyExtractor={(x,i) => i}
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

// Estilos de los componentes
const styles = StyleSheet.create({
	flatListItem: {
        color: 'gray',
        padding: 5,
        fontSize: 12,
    },
    productBox:{
        padding:5,
        marginHorizontal:10,
        borderColor:'#faaf18',
        borderBottomWidth:2
    },
    pageName:{
		margin:10,fontWeight:'bold',
		color:'#185494', textAlign:'center'
	}
});

AppRegistry.registerComponent('products', () => products);