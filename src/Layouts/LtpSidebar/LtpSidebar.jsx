import React from 'react';
import { Link } from 'react-router-dom';

const LtpSidebar = () => {
    return (
        <div className='flex flex-col min-h-screen border-2'>
            <Link to='/ltpDashboard'><button>Dashboard</button></Link>
            <Link to='/ltpDashboard/draftApplication/appChecklist'><button>Draft Application</button></Link>
            <Link to='/ltpDashboard/submitApplication'><button>Submitted Application</button></Link>
            <Link to='/ltpDashboard/approved'><button>Approved</button></Link>
        </div>
    );
};

export default LtpSidebar;