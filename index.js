import { AppRegistry, Dimensions } from 'react-native'
import { createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import SideMenu from './src/components/SideMenu'
import Menu from './src/pages/Products'
import Cupones from './src/pages/Cupones'
import Propaganda from './src/pages/Propaganda'
import Signup from './src/pages/Signup'
import Registros from './src/pages/Registros'

// Screen size
var {width} = Dimensions.get('window').width
const Home = 'Home'

export const Stack = createSwitchNavigator(
  {
    Home: { screen: Propaganda },
    Login: { screen: Signup },
    Register: {screen: Registros}
  },
  {
    initialRouteName: 'Home'
  }
)

let routeConfigs = {
  Home: {screen: Stack},
  Menu: {screen: Menu},
  Cupone: {screen: Cupones},
  Signups: {screen: Signup}

}
let drawerNavigatorConfig = {
  initialRouteName: Home,
  drawerWidth: width / 1.5,
  drawerPosition: 'left',
  contentComponent: SideMenu,
  contentOptions: {
    activeTintColor: 'red'
  }
}

const App = createDrawerNavigator(routeConfigs, drawerNavigatorConfig)
AppRegistry.registerComponent('bkapp', () => App)
