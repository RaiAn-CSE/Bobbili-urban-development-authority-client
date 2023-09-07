import React from 'react'
import { Outlet } from 'react-router';

function PsDashboard() {
  const CurrentUser="PS";
  return (
    <div>
     {CurrentUser ==="PS"&&  <Outlet/>}
    </div>
  )
}

export default PsDashboard;