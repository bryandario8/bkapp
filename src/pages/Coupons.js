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
  Button
} from 'react-native';

import Download from '../components/Download';

import {Actions} from 'react-native-router-flux';


class FlatListItem extends Component<{}> {

    goBack() {
        Actions.pop();
    }
    
    /*press () {

    }*/

    render() {
        return (
            <View style={styles.productBox}>
                <Image style={{height:250, width:'100%'}} source={{uri:this.props.item.image}} />
                <View>
                    <Download>
                        
                    </Download>
                </View>
            </View>
        );
    }
}

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
        fontWeight:'bold',
        color:'#185494',
        textAlign:'center'
    }
});

export default class Coupons extends Component<{}> {
    static navigationOptions= ({navigation}) =>({
        title: 'Cupones',			
        headerRight:<TouchableOpacity onPress={this.goBack}
        //style={{backgroundColor:'orange', margin:10,padding:10}}
        >
        </TouchableOpacity>
    });

    state={
		data:[]
    };
    
    fetchData = async() =>{
		const { params } = this.props.navigation.state;
		const response =  await fetch('http://192.168.1.7:8000/api/catalogue/coupons/');
		const products = await response.json(); // products have array data
		this.setState({data: products}); // filled data with dynamic array
    };

    componentDidMount(){
		this.fetchData();
    }
    
    press() {

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


AppRegistry.registerComponent('coupons', () => coupons);