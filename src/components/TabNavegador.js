import React from 'react'
import { Image } from 'react-native'
import { TabNavigator } from 'react-navigation' // Version can be specified in package.json
import Signup from '../pages/Signup'
import Registro from '../pages/Registro'

var TabNavegador = TabNavigator({
  Sesion: {
    screen: Signup,
    navigationOptions: {
      tabBarLabel: 'Sesion',
      tabBarIcon: ({tintColor}) => (
        <Image
          source={require('../images/home-icon.png')}
          style={{ width: 26, height: 26, tintColor: '#ffffff' }} />
      )
    } },
  Register: {
    screen: Registro,
    navigationOptions: {
      tabBarLabel: 'Register',
      tabBarIcon: ({tintColor}) => (
        <Image
          source={require('../images/home-icon.png')}
          style={{ width: 26, height: 26, tintColor: '#ffffff' }} />
      )}
  }
}
/*
{
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#ec7801',
    activeBackgroundColor: 'white',
    inactiveTintColor: '#724031',
    labelStyle: {
      fontSize: 16,
      padding: 0
    }
  }
}*/)

export default TabNavegador
