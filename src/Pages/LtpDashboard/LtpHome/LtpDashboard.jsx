import React from 'react';
import { Outlet } from 'react-router';

const LtpDashboard = () => {
    const CurrentUser = "LTP";
    return (
        <div>
            {CurrentUser === "LTP" && <Outlet />}
        </div>
    );
};

export default LtpDashboard;