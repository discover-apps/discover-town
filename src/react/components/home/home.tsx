import React from 'react';
import {useSelector} from "react-redux";

export const Home = () => {
    const jwt = useSelector((state: any) => state.auth.accessToken);

    return (<main>
        {jwt ? <h1>Authorized</h1> : <h1>Homepage</h1>}
    </main>)
};

export default Home;