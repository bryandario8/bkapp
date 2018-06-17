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
import OfflineNotice from '../components/OfflineNotice';

const backgroundColor = '#0067a7';
// Se realiza una lista de items de la data de cupones del servidor
class FlatListItem extends Component<{}> {
    
    render() {
        
        return (
            <ScrollView>
            <View style={styles.productBox}>
                <Image style={{height:250, width:'100%'}} source={{uri:'http://132.148.147.172:9999' + this.props.item.image}} />
                <View>
                    <Download>
                        
                    </Download>
                </View>
            </View>
            </ScrollView>
        );
    }
}



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
		data:[],
        isConnected: true
    };
    
    fetchData = async() =>{
		try{
            const { params } = this.props.navigation.state;
            const response =  await fetch('http://132.148.147.172:9999/api/catalogue/coupons/');
            const products = await response.json(); // products have array data
            this.setState({data: products}); // filled data with dynamic array
        }catch(error){
             console(error)
        }
        
    };
    //LOGIC: Send a http request and use the response to determine the connectivity state
      refresh(callback){ 
          httpAddress = 'http://132.148.147.172:9999/admin' //the site i'm building the app for
          var xhr = new XMLHttpRequest();
          xhr.open('GET', httpAddress);
          xhr.onreadystatechange = (e) => {
            if (xhr.readyState !== 4) { //code for completed request
              return;
            }
            console.log("--- STATUS ---");
            console.log(xhr.status);
            if (xhr.status === 200) { //successful response
              callback(true);
              this.setState({ isConnected : true});
              console.log('result goes here: ' + true);
            } else {                  //unsuccessful response
              /* NOTE: React native often reacts strangely to offline uses and as such,
              it may be necessary to directly set state here rather than to rely on a callback */
              callback(false)  //OR: this.state.splash = false
              this.setState({ isConnected : false });
              console.log('result goes here: ' + false);
            }
          };
          xhr.send();
      }

    componentDidMount(){
		this.fetchData();
    }
    componentWillMount(){
      this.refresh((result) => {this.state.splash = result});
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

AppRegistry.registerComponent('coupons', () => coupons);