import React, { Component } from 'react';
import {
    Text, 
    View, 
    Image, 
    TouchableHighlight,
    StatusBar
} from 'react-native';
import { 
    Container, 
    Header, 
    Title,
    Button, 
    Left,  
    Body, 
    Icon
} from 'native-base';
export default class BarraLateral extends Component {

    render() {
        return (
          
        <View style={{
            flex: 0,
        }}>
        <Header style={{
            backgroundColor:'#ec7801'
        }}>
        <Left>
            <Button transparent  onPress={() => {this.props.navigation.openDrawer();
                }}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize:30,fontWeight: "500",textAlign:'center',color: 'white'}}>{this.props.title}</Title>
          </Body>
        </Header>
        </View>);
    }
}