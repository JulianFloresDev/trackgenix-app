import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Spinner } from 'Components/Share';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const auth = useSelector((store) => store.auth);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (auth.isLoading) {
          return <Spinner />;
        }
        if (rest.role.includes(auth.role)) {
          return <RouteComponent {...routeProps} />;
        }
        return <Redirect to={'auth/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
