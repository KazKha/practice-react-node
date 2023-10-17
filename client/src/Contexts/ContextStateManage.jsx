import React, { useReducer, useContext, createContext } from "react";

const initialState = {
    listform: 1,
    errMsg: null,
    sucMsg: null,
    islogin: false,
    __tokenKey: null,
    loginId: null,
};

//sessionStorage.getItem("items") === true ?    initialState.__tokenKey =sessionStorage.getItem("items"):'';


const stateReducers = (initialState, action) => {
    if (action.type === "LOGIN") {
        return { ...initialState, __tokenKey: action.payload.token,loginId: action.payload.loginId, islogin: true };
    }else if ( action.type === 'LOGOUT'){
        sessionStorage.removeItem('items')
        return { ...initialState, __tokenKey: null, loginId:null, islogin: false };
    }else if ( action.type === 'ERR'){

        return { ...initialState, errMsg: action.payload.err_msg  };
    }else{
        return initialState;
    }
};

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(stateReducers, initialState);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};
