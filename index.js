import { AppRegistry, Dimensions } from 'react-native'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import SideMenu from './src/components/SideMenu'
import Products from './src/pages/Products'
import Cupones from './src/pages/Cupones'
import Propaganda from './src/pages/Propaganda'
import Signup from './src/pages/Signup'
import Registros from './src/pages/Registros'

// Screen size
var {width} = Dimensions.get('window').width
const Home = 'Home'

export const Stack = StackNavigator({
  Home: { screen: Propaganda },
  Register: {screen: Registros}
},
{
  initialRouteName: 'Home'}
)

let routeConfigs = {
  Home: {screen: Stack},
  Menu: {screen: Products},
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

const App = DrawerNavigator(routeConfigs, drawerNavigatorConfig)
AppRegistry.registerComponent('bkapp', () => App)
