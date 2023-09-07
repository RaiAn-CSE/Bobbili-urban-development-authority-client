import React from 'react';
import { Outlet } from 'react-router';

const LtpDashboard = () => {
    const CurrentUser = "LTP";
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default LtpDashboard;