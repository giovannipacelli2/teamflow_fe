import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardPage : React.FC = () => {
  return (
    <div>
      DashboardPage works
      <Outlet/>
    </div>
  )
}

export default DashboardPage
