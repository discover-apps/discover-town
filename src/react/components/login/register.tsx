import React from 'react';
import OAuthButton from "./oauthButton";

export const Register = () => {
    return (
        <main className="register_container paper elevation-3">
            <section className="oauth">
                <OAuthButton platform="facebook"/>
                <OAuthButton platform="google"/>
            </section>
            <h4>OR</h4>
            <section className="credentials">
                <form>
                    <input type="name" id="name" name="name" placeholder="Your name"/>
                    <input type="email" id="email" name="email" placeholder="Email address"/>
                    <input type="password" id="password" name="password" placeholder="Password"/>
                    <p>Your name is public. We'll use your email address to send you updates, and your location to find
                        events near you.</p>
                    <button>Log in</button>
                </form>
            </section>
            <section className="policy">
                <p>When you "Continue", you agree to our <a href="#">Terms of Service</a>.</p>
                <p>We will manage information about you as described in our <a href="#">Privacy Policy</a>, and <a
                    href="#">Cookie Policy</a>.</p>
                <hr/>
                <p>Already a member? <a href="/login">Log in</a></p>
            </section>
        </main>
    )
};

export default Register;