import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRootUserPro = ({component:component,...rest}) => {
  const token = window.localStorage.getItem('token')
  const IsUserPro = window.localStorage.getItem('IsUserPro')

  return(
      token && IsUserPro ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default ProtectedRootUserPro
