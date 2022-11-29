import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Spinner } from 'Components/Share';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { role, isLoading } = useSelector((store) => store.auth);
  console.log('Role: ', role);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (isLoading) {
          return <Spinner />;
        }
        if (rest.role.includes(role)) {
          return <RouteComponent {...routeProps} />;
        }
        return <Redirect to={'/auth/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
