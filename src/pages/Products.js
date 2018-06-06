import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  SectionList,
  Image,
  ScrollView
} from 'react-native';
import BarraLateral from '../components/BarraLateral';
import flatListProduct from '../data/flatListProduct';

const backgroundColor = '#0067a7';
class SectionListItem extends Component<{}> {
    render() {
        return (
            <View>
                <Image style={{height:250, width:'100%'}} source={{uri:'http://192.168.1.6:8000' + this.props.item.image}} />
            </View>
        );
    }
}

///Clase Vista de Nombres de Categoría de productos
class SectionHeader extends Component{

    render() {
        return (
            <View style={{
                flex: 1, 
                backgroundColor: 'rgb(77, 120, 140)',
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                    margin: 20
                }}>{this.props.section.name}
                </Text>
            </View>
        )
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
		sections:[]
    };
    
    fetchData = async() =>{
		try{
            const { params } = this.props.navigation.state;
            const response =  await fetch('http://192.168.1.6:8000/api/catalogue/products/');
            const products = await response.json(); // products have array data
            this.setState({sections: products}); // filled data with dynamic array
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
            
            <View style={{ flex: 1 }}> 
                <BarraLateral {...this.props} title='Menu'/>
                    <ScrollView>
                        <SectionList
                            sections={this.state.sections}
                            //sections={flatListProduct}
                            keyExtractor={( item, index ) => item.id}
                            renderItem={({ item, index }) => {
                                return ( <SectionListItem item={item} index={index} >

                                    </SectionListItem>);
                            }}
                            renderSectionHeader = {({ section }) => {
                                return(<SectionHeader section={section} />)
                            }}
                                                
                        >
                        </SectionList>
                    </ScrollView>
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

