import React, { Component } from 'react';
import { AppRegistry, View, Text,Image } from 'react-native';
import { Provider } from "react-redux";
import store from "../../store";
import RegistroFormulario from '../components/RegistroFormulario';
import BarraLateral from '../components/BarraLateral';
const backgroundColor = '#0067a7';
export default class Registro extends Component {
static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Registro';
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
        	
        	<View> 
	        	<BarraLateral {...this.props} /> 
	            <Provider store={store}>
	                <RegistroFormulario />
	            </Provider>
            </View> 
        );
    }
};

AppRegistry.registerComponent('Registro', () => Registro);