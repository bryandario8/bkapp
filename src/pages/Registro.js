import React, { Component } from 'react';
import { AppRegistry, View, Text,Image } from 'react-native';
import { Provider } from "react-redux";
import store from "../../store";
import RegistroFormulario from '../components/RegistroFormulario';
import BarraLateral from '../components/BarraLateral';
import { TabNavigator } from 'react-navigation';

const backgroundColor = '#0067a7';
export default class Registro extends Component {
    render() {
        return (
        	<View> 
	        	<BarraLateral {...this.props} title='Registro' /> 
	            <Provider store={store}>
	                <RegistroFormulario />
	            </Provider>
            </View> 
        );
    }
}

AppRegistry.registerComponent('Registro', () => Registro);