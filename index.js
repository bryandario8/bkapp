import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';
//import App from './App';
import BarraLateral from './src/components/BarraLateral';
import SideMenu from './src/components/SideMenu';
import Products from './src/pages/Products';
import Coupons from './src/pages/Coupons';
import Propaganda from './src/pages/Propaganda';
import TabNavegador from './src/components/TabNavegador';
//Screen size
var {height, width} = Dimensions.get('window');
const Home = "Home";
const Cupones = "Cupones";
const Signups = "Signup";
const Menu = "Menu";
const SesionRegistro = "Acceder o Registrar";

let routeConfigs = {
    Home: {
    	path: '/',
        screen: Propaganda,
    },
    Menu: {
        screen: Products,
    },
    Cupones: {
        screen: Coupons,
    },
    SesionRegistro:{
    	screen:TabNavegador,
    }
};
let drawerNavigatorConfig = {    
    initialRouteName: Home,
    drawerWidth: width / 1.5,
    drawerPosition: 'left',
    contentComponent:SideMenu,
    contentOptions: {
        activeTintColor: 'red',
    }
};
const App = DrawerNavigator(routeConfigs, drawerNavigatorConfig);
AppRegistry.registerComponent('bkapp', () => App);
