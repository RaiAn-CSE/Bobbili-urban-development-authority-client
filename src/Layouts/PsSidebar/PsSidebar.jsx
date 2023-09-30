import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function PsSidebar() {
  const path = useLocation().pathname;

  return (
    <div className='min-h-screen flex flex-col space-y-4'>
      {/* <li className={`${path === "/PsDashboard" && "active"} mt-10`}>
        <span>
          <MdSpaceDashboard size={20} />
        </span>
        <Link className={`p-[10px] font-medium `} to="/PsDashboard">
          Dashboard
        </Link>
      </li> */}
      <Link to='/dashboard'><button>Dashboard</button></Link>
      <Link to='/dashboard/Inward'><button>Inward Applications</button></Link>
      <Link to='/PsDashboard/Outward'><button>Outward Application</button></Link>
      <Link to='/PsDashboard/Search'><button>Search Application</button></Link>
      <Link to='/PsDashboard/ReValidation'><button>Re-validation</button></Link>
    </div>
  )
}

export default PsSidebar;