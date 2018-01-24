import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Principal from './pages/Home';
import Products from './pages/Coupons';

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      	<Scene key="login" component={Login} title="Login" initial={true}/>
			      	<Scene key="signup" component={Signup} title="Register"/>
					<Scene key="home" component={Principal} title="Home"/>
			    	<Scene key="products" component={Products} title="Products"/>
					<Scene key="coupons" component={Products} title="Coupons"/>
				</Stack>
			 </Router>
			)
	}
}