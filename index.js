import { AppRegistry, Dimensions } from 'react-native'
import { DrawerNavigator } from 'react-navigation'
// import App from './App';
import SideMenu from './src/components/SideMenu'
import Products from './src/pages/Products'
import Cupones from './src/pages/Cupones'
import Propaganda from './src/pages/Propaganda'
// import TabNavegador from './src/components/TabNavegador';
import Signup from './src/pages/Signup'
import Registros from './src/pages/Registros'

// Screen size
var {height, width} = Dimensions.get('window')
const Home = 'Home'
const Cupone = 'Cupones'
const Signups = 'Signup'
const Menu = 'Menu'
const Register = 'Registros'

let routeConfigs = {
  Home: {
    path: '/',
    screen: Propaganda
  },
  Menu: {
    screen: Products
  },
  Cupone: {
    screen: Cupones
  },
  Signups: {
    screen: Signup
  },
  Register: {
    screen: Registros
  }
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

const App = DrawerNavigator(routeConfigs, drawerNavigatorConfig)
AppRegistry.registerComponent('bkapp', () => App)
