import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Logo extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: 100, height: 100}}
          source={require('../images/bk-logo.svg.png')}
          //source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
        <Text style={styles.welcome}>
          Welcome to Burger King's App!
        </Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff833a',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'rgba(0,0,0,0.5)',
  },
});