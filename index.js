import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';
//import App from './App';
import BarraLateral from './src/components/BarraLateral';
import SideMenu from './src/components/SideMenu';
import Products from './src/pages/Products';
import Cupones from './src/pages/Cupones';
import Propaganda from './src/pages/Propaganda';
//import TabNavegador from './src/components/TabNavegador';
import Signup from './src/pages/Signup';
import Registro from './src/pages/Registro';


//Screen size
var {height, width} = Dimensions.get('window');
const Home = "Home";
const Cupone = "Cupones";
const Signups = "Signup";
const Menu = "Menu";
const Acceder = "Acceder";
const Register = "Registro";

let routeConfigs = {
    Home: {
    	path: '/',
        screen: Propaganda,
    },
    Menu: {
        screen: Products,
    },
    Cupone: {
        screen: Cupones,
    },
    Signups:{
    	screen:Registro,
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
