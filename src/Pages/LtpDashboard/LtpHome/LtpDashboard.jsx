import React from 'react';
import { Outlet } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import LtpDefault from './LtpDefault';

const LtpDashboard = () => {
    const navigate = useNavigate()
    const CurrentUser = "LTP";
    const path = useLocation().pathname;
   
    if (CurrentUser != "LTP") {
        return navigate("/")
    }
    return (
        <div>
            {path === "/ltpDashboard" ? <LtpDefault /> : <Outlet />}
        </div>
    );
};

export default LtpDashboard;