import React, {useEffect, useState} from 'react';
import NoResults from "../../../assets/img/no-results.png";
import {Link, Redirect} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";

export const ErrorPage = () => {
    const [loading, setLoading] = useState(true);
    const [seconds, setSeconds] = useState(5);
    useEffect(() => {
        const interval = setTimeout(() => {
            setSeconds(seconds => seconds - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds]);
    if (seconds <= 0) {
        return <Redirect to={'/'}/>
    }
    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else {
        return <main className="error">
            <div className="image">
                <img src={NoResults} alt="no_results.png"/>
            </div>
            <h1>404 Page Not Found</h1>
            <p>Sorry, the requested resource could not be found. You will be redirected in {seconds} seconds.</p>
            <p><Link to={'/'}>Click here</Link> to redirect now</p>
        </main>
    }
};