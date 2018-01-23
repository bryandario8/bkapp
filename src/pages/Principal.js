import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Principal extends Component<{}> {

  goBack() {
    Actions.pop();
}

  static navigationOptions = {
    tabBarLabel: 'Productos',
    drawerIcons: () => {
      return (
        <MaterialIcons>
        
        </MaterialIcons>
      )
    }
  }
  render() {
    <View>

    </View>
  }
}