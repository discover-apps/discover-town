import React, {useEffect, useState} from 'react';
import NoResults from "../../../assets/img/no-results.png";
import {Link, Redirect} from "react-router-dom";

export const ErrorPage = () => {
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
    return <main className="error">
        <div className="image">
            <img src={NoResults} alt="no_results.png"/>
        </div>
        <h1>404 Page Not Found</h1>
        <p>Sorry, the requested resource could not be found. You will be redirected in {seconds} seconds.</p>
        <p><Link to={'/'}>Click here</Link> to redirect now</p>
    </main>
};