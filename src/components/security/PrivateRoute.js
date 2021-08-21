import React from "react";
import {Redirect, Route} from "react-router-dom";

export const PrivateRoute = ({component: Component, authenticated, teacherId, ...other}) => (
    <Route {...other} render={props => authenticated ?
        (<Component {...props} teacherId={teacherId}/>) :
        (<Redirect to={{pathname: "/", state: {from: props.location}}}/>)
    }
    />
)