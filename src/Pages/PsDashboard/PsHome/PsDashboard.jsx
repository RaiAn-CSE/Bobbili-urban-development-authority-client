import React from 'react'
import { Outlet } from 'react-router';
import { useNavigate,useLocation } from 'react-router-dom';
import PsDefault from './PsDefault';

function PsDashboard() {
  const navigate = useNavigate()
  const CurrentUser = "PS";
  const path = useLocation().pathname;
 
  if (CurrentUser !== "PS") {
      return navigate("/")
  }
  return (
    <div>
     {path==="/PsDashboard"?<PsDefault/>:  <Outlet/>}
    </div>
  )
}

export default PsDashboard;