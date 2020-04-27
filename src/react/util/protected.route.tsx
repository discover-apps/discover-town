import React, {Component, useEffect, useState} from "react";
import {Redirect, Route} from "react-router-dom";
import store from "../store/store";
import {verifyAdmin} from "../api/auth.api";
import {CircularProgress} from "@material-ui/core";

// @ts-ignore
export const UserRoute = ({component: Component, ...rest}) => {
    const authenticated: boolean = store.getState().auth.accessToken;
    return <Route
        {...rest}
        render={props => {
            if (authenticated) {
                return <Component {...props} />;
            } else {
                return (
                    <Redirect to={{
                        pathname: "/login"
                    }}/>
                );
            }
        }}
    />
};

// @ts-ignore
export const AdminRoute = ({component: Component, ...rest}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        verifyAdmin().then(() => {
            setAuthenticated(true);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return <Route
        {...rest}
        render={props => {
            if (loading) {
                return <div className="loading">
                    <CircularProgress/>
                </div>
            } else if (authenticated) {
                return <Component {...props} />;
            } else {
                return (
                    <Redirect to={{
                        pathname: "/"
                    }}/>
                );
            }
        }}
    />
};