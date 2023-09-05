import React from 'react';
import LtpDashboard from '../Pages/LtpDashboard/LtpDashboard';
import LtpSidebar from './LtpSidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className='flex'>
      <div className='basis-[20%]'>
        <LtpSidebar />
      </div>
      <div className='basis-[80%]'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;