import { AppRegistry, Dimensions } from 'react-native'
import { createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import SideMenu from './src/components/SideMenu'
import Menu from './src/pages/Products'
import Cupones from './src/pages/Cupones'
import Ini from './src/pages/Home'
import SignIn from './src/pages/SignIn'
import SignUp from './src/pages/SignUp'

// Screen size
var {width} = Dimensions.get('window').width
const Home = 'Home'

export const Stack = createSwitchNavigator(
  {
    Home: { screen: Ini },
    Login: { screen: SignIn },
    Register: {screen: SignUp}
  },
  {
    initialRouteName: 'Home'
  }
)

let routeConfigs = {
  Home: {screen: Stack},
  Menu: {screen: Menu},
  Cupone: {screen: Cupones},
  SignIn: {screen: SignIn}

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
