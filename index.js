import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
//import App from './App';
import BarraLateral from './src/components/BarraLateral';
import Signup from './src/pages/Signup';
import Principal from './src/pages/Home';
import Products from './src/pages/Products';
import Coupons from './src/pages/Coupons';
import Propaganda from './src/pages/Propaganda';
import Registro from './src/pages/Registro';
//Screen size
var {height, width} = Dimensions.get('window');
const Home = "Home";
const Cupones = "Cupones";
const Signups = "Signup";
const Menu = "Menu";
const Sesion = "Iniciar sesion";
const Registros = "Registro";

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
    Signups:{
    	screen:Signup,
    },
    Registros:{
    	screen:Registro,
    },
};
let drawerNavigatorConfig = {    
    initialRouteName: Home,
    drawerWidth: width / 1.5,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',  
    drawerBackgroundColor: '#e6d2b0',
    contentOptions: {
        activeTintColor: 'red',
    }
};
const App = DrawerNavigator(routeConfigs, drawerNavigatorConfig);
AppRegistry.registerComponent('bkapp', () => App);
