import { Fragment, useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import "./Navigation.styles.scss";
import "../../App.scss";

import HomeIcon from "../../Assets/home.png";
import HistoryIcon from "../../Assets/history.png";


const Navigation = ({setFileUpload, setHistoryDisplayed}) => {

    const handleHomeClick = () => {
        console.log("returning back home && toggling history off")
        setFileUpload(false)
        setHistoryDisplayed(false)
    }

    const handleHistoryClick = () => {
        console.log("showing history...")
        setHistoryDisplayed(true)
    }

    return (
        <div className="App">
            <nav className="Navigation">
                <div className="logo">
                    <h1>OptImplant</h1>
                </div>
                <div className="menu">
                    <div onClick={handleHomeClick} className="section">
                        <img src={HomeIcon} alt="" />
                        <h3>Home</h3>
                    </div>
                    <div onClick={handleHistoryClick} className="section">
                        <img src={HistoryIcon} alt="" />
                        <h3>History</h3>
                    </div>
                </div>

            </nav>
            <div className="pages">
                <Outlet />
            </div>
        </div>
    );
};

export default Navigation;