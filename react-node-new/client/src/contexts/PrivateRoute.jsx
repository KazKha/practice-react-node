// PrivateRoute.js
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <Route
                {...rest}
                render={(props) =>
                    isLoggedIn ? <Component {...props} /> : navigate("/login")
                }
            />
        </>
    );
}

export default PrivateRoute;
