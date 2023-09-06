import React from 'react'

function PsSidebar() {
  return (
    <div className='space-y-4'>
      <Link to='/PsDashboard'><button>Dashboard</button></Link>
      <Link to='/PsDashboard/Inward'><button>Inward Applications</button></Link>
      <Link to='/PsDashboard/Outward'><button>Outward Application</button></Link>
      <Link to='/PsDashboard/Search'><button>Search Application</button></Link>
      <Link to='/PsDashboard/Re-validation'><button>Re-validation</button></Link>
    </div>
  )
}

export default PsSidebar;