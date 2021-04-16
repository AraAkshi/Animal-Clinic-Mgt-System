import React from 'react';
import { Route } from 'react-router-dom';

const AdminPrivateRoute = ({ component, ...rest }: any) => {
	const routeComponent = (props: any) =>
		localStorage.token && localStorage.userRole === 'admin'
			? React.createElement(component, props)
			: window.open(window.location.origin + `/access-denied`, '_self');
	return <Route {...rest} render={routeComponent} />;
};

export default AdminPrivateRoute;
