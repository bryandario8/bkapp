import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import Menu from '../components/Menu';

import {Actions} from 'react-native-router-flux';

export default class Principal extends Component<{}> {

  goBack() {
    Actions.pop();
  }

  render() {
    return (
      <View>
        <Menu/>
        <Text>Hola</Text>
      </View>
    )
  }
}