import {Navigate, Outlet} from 'react-router-dom';
import UserContext from '../../context/UserContext'
import React from "react";

function ProtectedRoute (props) {
    const user = React.useContext(UserContext);

    if (!props.loggedIn) {
        return <Navigate to="/register" replace  />;
    }

    return  props.children ? props.children : <Outlet />;

};

export default ProtectedRoute;