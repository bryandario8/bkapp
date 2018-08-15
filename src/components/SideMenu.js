import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {NavigationActions} from 'react-navigation'
import {ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Linking
} from 'react-native'

class SideMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logeado: false
    }
  }
  // Ruteador de pantalla
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    })
    this.props.navigation.dispatch(navigateAction)
  }
  // renderizar la salida de los componentes
  render () {
    return (
      <View style={styles.container}>
        <ImageBackground style={{flex: 1}} source={require('../images/fondoMenu.jpg')}>
          <View style={{justifyContent: 'center'}}>
            <Image
              style={styles.logo}
              source={require('../images/bk-logo.svg.png')}
            />
          </View>
          <ScrollView>
            <Text style={styles.texto} onPress={this.navigateToScreen('Home')}>
              Home
            </Text>
            <Text style={styles.texto} onPress={this.navigateToScreen('Menu')}>
              Menú
            </Text>
            <Text style={styles.texto} onPress={this.navigateToScreen('Cupone')}>
              Cupones
            </Text>
          </ScrollView>
          <View style={styles.footerContainer}>
            <View style={styles.viewspeques}>
              <Text style={styles.viewspeques} onPress={() => { Linking.openURL('https://www.facebook.com/BurgerKingEcuador/') }}>
                <Image source={require('../images/facebook.png')} />
              </Text>
            </View>
            <View style={styles.viewspeques}>
              <Text style={styles.viewspeques} onPress={() => { Linking.openURL('https://www.instagram.com/burgerkingec/?hl=es-la') }}>
                <Image source={require('../images/instagram.png')} />
              </Text>
            </View>
            <View style={styles.viewspeques}>
              <Text style={styles.viewspeques} onPress={() => { Linking.openURL('http://www.burgerking.com.ec') }}>
                <Image source={require('../images/bk-logo.png')} />
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
}

// Estilo de los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ec7801'
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  footerContainer: {
    padding: 20,
    flexDirection: 'row'
  },
  texto: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    width: '100%',
    height: 50,
    textAlign: 'center'
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: '30%',
    marginRight: '30%',
    marginTop: '10%',
    marginBottom: '10%'
  },
  icono: {
    width: 50,
    height: 50
  },
  viewspeques: {
    width: 50,
    height: 50,
    marginLeft: '10%'

  }

})
export default SideMenu
