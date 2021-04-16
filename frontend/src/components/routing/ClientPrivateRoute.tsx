import React from 'react';
import { Route } from 'react-router-dom';

const ClientPrivateRoute = ({ component, ...rest }: any) => {
	const routeComponent = (props: any) =>
		localStorage.token &&
		(localStorage.userRole === 'customer' || localStorage.userRole === 'admin')
			? React.createElement(component, props)
			: window.open(window.location.origin + `/login`, '_self');
	return <Route {...rest} render={routeComponent} />;
};

export default ClientPrivateRoute;
