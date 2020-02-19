import React from 'react';
import fbLogo from "../../../assets/img/facebook-logo.png";
import googleLogo from "../../../assets/img/google-logo.png";

interface Props {
    platform: string;
}

export const OAuthButton = (props: Props) => {
    return <button className={props.platform === "google" ? "btn-google-login" : "btn-facebook-login"}>
        <div className="logo">
            <img src={props.platform === "google" ? googleLogo : fbLogo}
                 alt={props.platform === "google" ? "google" : "facebook"}/>
        </div>
        <div className="text">{props.platform === "google" ? "Log in with Google" : "Log in with Facebook"}</div>
    </button>
};

export default OAuthButton;