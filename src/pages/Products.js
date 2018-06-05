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
import BarraLateral from '../components/BarraLateral';
import flatListProduct from '../data/flatListProduct';

const backgroundColor = '#0067a7';
class FlatListItem extends Component<{}> {
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

/// Clase  la vista Products
export default class Products extends Component<{}> {
    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Menu';
        let drawerIcon = () => (
            <Image
                source={require('../images/home-icon.png')}
                style={{ width: 26, height: 26, tintColor: backgroundColor }}/>
        );
        return {drawerLabel, drawerIcon};
    }

    state={
		data:[]
    };
    
    fetchData = async() =>{
		try{
            const { params } = this.props.navigation.state;
            const response =  await fetch('http://192.188.59.104:8000/api/catalogue/products/');
            const products = await response.json(); // products have array data
            this.setState({data: products}); // filled data with dynamic array
        }catch(error){
             console.error(error);
        }
    };

    componentDidMount(){
		this.fetchData();
	}
    
    render() {
        const { params } = this.props.navigation.state;
        var name = params ? params.name : "Productos";
        return (
            
            <View style={{flex: 1}}> 
                <BarraLateral {...this.props} title='Menu'/>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(x,i) => i}
                    renderItem={({item, index}) => {
                        return ( <FlatListItem item={item} index={index}></FlatListItem>);
                    }}
                />
            </View>
        );
    }
}

/// Estilos de los componentes
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
		margin:10,
		color:'#185494', textAlign:'center'
	}
});

AppRegistry.registerComponent('products', () => products);

