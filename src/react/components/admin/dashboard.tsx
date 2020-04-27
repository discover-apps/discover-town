import React, {useEffect, useState} from "react";
import {CircularProgress} from "@material-ui/core";

export const Dashboard = () => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearInterval(delay);
    }, []);

    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else {
        return <main>
            <header className="sub-menu">
                <div className="actions">
                    <div className="back-action">

                    </div>
                    <h3 className="title">Admin Panel</h3>
                </div>
                <div className="tabs">
                    <div className={`tab ${page == 0 ? "selected" : ""}`} onClick={() => setPage(0)}>
                        Events
                    </div>
                    <div className={`tab ${page == 1 ? "selected" : ""}`} onClick={() => setPage(1)}>
                        Reports
                    </div>
                </div>
            </header>
        </main>
    }
};