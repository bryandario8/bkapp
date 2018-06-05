import React, { Component } from 'react';
import {
    Text, View, Image, TouchableHighlight
} from 'react-native';

export default class BarraLateral extends Component {

    render() {
        return (
        <View style={{
            height: 60,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor:'#ec7801',
        }}>
            <TouchableHighlight style={{ marginLeft: 10, marginTop: 0 }}
                onPress={() => {this.props.navigation.openDrawer();
                }}>
                <Image
                    style={{ width: 32, height: 32 }}
                    source={require('../images/menu-icon.png')}
                />
            </TouchableHighlight>
            <Text style={{ fontSize:40,fontWeight: "500",textAlign:'center',color: 'white', marginLeft: "25%" }}>{this.props.title}</Text>
        </View>);
    }
}