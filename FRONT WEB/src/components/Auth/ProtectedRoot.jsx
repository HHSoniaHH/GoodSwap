import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoot = ({component:component,...rest}) => {
  const token = window.localStorage.getItem('token')
  const IsAdmin = window.localStorage.getItem('IsAdmin')

  return(
      token && !IsAdmin? <Outlet/> : <Navigate to="/login"/>
  )
}

export default ProtectedRoot

