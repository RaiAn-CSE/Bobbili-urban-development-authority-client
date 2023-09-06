import React from 'react';
import { Outlet } from 'react-router';

const LtpDashboard = () => {
    return (
        <div className='border-2 min-h-screen text-center'>
            <Outlet/>
        </div>
    );
};

export default LtpDashboard;