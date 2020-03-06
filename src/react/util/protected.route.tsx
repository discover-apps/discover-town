import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import store from '../store/store';

// @ts-ignore
export const ProtectedRoute = ({component: Component, ...rest}) => {
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