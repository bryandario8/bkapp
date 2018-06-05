/**
 * @fileoverview Vista de Cupones
 * 
 * @version v1.0.1
 *
 */

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
  Image,
  Button,
  ScrollView
} from 'react-native';
import BarraLateral from '../components/BarraLateral';
import Download from '../components/Download';

const backgroundColor = '#0067a7';
// Se realiza una lista de items de la data de cupones del servidor
class FlatListItem extends Component<{}> {
    
    render() {
        
        return (
            <ScrollView>
            <View style={styles.productBox}>
                <Image style={{height:250, width:'100%'}} source={{uri:this.props.item.image}} />
                <View>
                    <Download>
                        
                    </Download>
                </View>
            </View>
            </ScrollView>
        );
    }
}

// Estilos de los componentes
const styles = StyleSheet.create({
    flatListItem: {
        color: 'gray',
        padding: 4,
        fontSize: 16,
    },
    productBox:{
        padding:5,
        margin:10,
        borderColor:'#faaf18',
        borderBottomWidth:1
    },
    pageName:{
        margin:10,
        color:'#185494',
        textAlign:'center'
    }
});

// Clase principal de la vista
export default class Coupons extends Component<{}> {
    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Cupones';
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
            const response =  await fetch('http://192.188.59.104:8000/api/catalogue/coupons/');
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
        var name = params ? params.name : "Cupones";
        return (
            <View style={{flex: 1}}> 
            <BarraLateral {...this.props} title='Cupones'/>
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
        );
    }
}


AppRegistry.registerComponent('coupons', () => coupons);