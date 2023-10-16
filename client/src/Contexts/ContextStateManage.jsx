import React, { useReducer, useContext, createContext } from "react";

const initialState = {
    listform: 1,
    errMsg: "",
    sucMsg: "",
    islogin: false,
    __tokenKey: "",
};

console.log(sessionStorage.getItem("items"));


const stateReducers = (initialState, action) => {
    if (action.type === "LOGIN") {
        return { ...initialState, __tokenKey: action.payload.token, islogin: true };
    }else if ( action.type === 'LOGOUT'){
        return { ...initialState, __tokenKey: "", islogin: false };
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
