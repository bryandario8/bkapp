import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView,StyleSheet, Text, View,TouchableHighlight,Image,ImageBackground} from 'react-native';
class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      
      <View style={styles.container}>
        <ImageBackground style={{flex: 1}} source={require('../images/fondoMenu.jpg')}>
        <ScrollView>
            <View style={{backgroundColor:'white',justifyContent: 'center'}}>
             <Image
                    style={{ width: 100, height: 100 ,marginLeft: 90}}
                    source={require('../images/bk-logo.svg.png')}
                />
            </View>
                <Text style={styles.texto} onPress={this.navigateToScreen("Home")}>
                     Home
                </Text>
                <Text style={styles.texto} onPress={this.navigateToScreen("Menu")}>
                  Menú
                </Text>
                  <Text style={styles.texto} onPress={this.navigateToScreen("Cupones")}>
                    Cupones
                  </Text>
                  <Text style={styles.texto} onPress={this.navigateToScreen("SesionRegistro")}>
                    Acceder o Registrar
                  </Text>
           
        </ScrollView>
        
        <View style={styles.footerContainer}>
          <Text>Redes sociales</Text>
        </View>
        
        </ImageBackground>
      </View>
      
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ec7801',
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  },
  texto:{
    fontSize:25,
    color: "white",
    fontWeight: 'bold',
    width: "100%",
    height: 50,
    textAlign: 'center'

  }
});
export default SideMenu;