// App.js
import React from 'react';
import { Routes , Route , useNavigate} from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
//import PrivateRoute from './contexts/PrivateRoute';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
  
    return (
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  };

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
            </Routes>
        </AuthProvider>
    );
}

export default App;