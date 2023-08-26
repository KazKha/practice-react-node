import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {Auth as useAuth } from './AuthContext';

const PrivateRoute = ({ path, ...props }) => {
  const { user } = useAuth();

  return user ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default PrivateRoute;