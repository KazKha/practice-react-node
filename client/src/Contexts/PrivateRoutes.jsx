import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import {Auth as useAuth } from './AuthContext';
import { StateContext } from './ContextStateManage';
  

const PrivateRoute = ({ path, ...props }) => {
  //const { user } = useAuth();
   const {state} = useContext(StateContext)  
  return state.islogin ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default PrivateRoute;