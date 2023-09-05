import React from 'react';
import LtpDashboard from '../Pages/LtpDashboard/LtpDashboard';
import LtpSidebar from './LtpSidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className='flex '>
      <LtpSidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;