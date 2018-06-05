import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView,StyleSheet, Text, View,TouchableHighlight,Image} from 'react-native';
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
        <ScrollView>
            <View style={{backgroundColor:'white',justifyContent: 'center'}}>
             <Image
                    style={{ width: 100, height: 100 ,marginLeft: 90}}
                    source={require('../images/bk-logo.svg.png')}
                />
            </View>
            <View style={styles.navSectionStyle}>
              <TouchableHighlight style={styles.button} onPress={this.navigateToScreen("Home")} >
                <Text>
                     Home
                </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.navSectionStyle}>
            <TouchableHighlight style={styles.button} onPress={this.navigateToScreen("Menu")}>
                <Text>
                  Menú
                </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.navSectionStyle}>
                <TouchableHighlight style={styles.button} onPress={this.navigateToScreen("Cupones")}>
                  <Text>
                    Cupones
                  </Text>
                  </TouchableHighlight>
            </View>
            <View style={styles.navSectionStyle}>
                <TouchableHighlight style={styles.button} onPress={this.navigateToScreen("SesionRegistro")}>
                  <Text>
                    Acceder o Registrar
                  </Text>
                  </TouchableHighlight>
            </View>
        </ScrollView>
        
        <View style={styles.footerContainer}>
          <Text>Redes sociales</Text>
        </View>
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
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  },
   button: {
    alignItems: 'center',
    backgroundColor:'#DDDDDD',
    padding: 10
  },
});
export default SideMenu;