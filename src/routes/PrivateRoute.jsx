import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Spinner } from 'Components/Share';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { role, isLoading } = useSelector((state) => state.auth);

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
        return <Redirect to={'/home'} />;
      }}
    />
  );
};

export default PrivateRoute;
