import { createContext, useContext, useState } from "react";

 const AuthContext = createContext();

 const AuthProvider =  ({ child  }) => {
    
    const [data, setData] = useState({
        listform: 1,
        isLoginIn: false
    });
 
    const userLogin = () => {
        setData( data.isLoginIn, true  );
    }
    const logout = () => {
        
        setData( data.isLoginIn, false  );
    };

    return (
        <AuthProvider.Provider value={{ data, userLogin, logout }}  >
            { child }
        </AuthProvider.Provider>
    );

};



 const Auth = () => useContext(AuthContext);
 
 export  {
    AuthContext,
    AuthProvider,
    Auth
  };
  
