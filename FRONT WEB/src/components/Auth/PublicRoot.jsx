import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'

const PublicRoot = ({component:component,...rest}) => {
  const token = window.localStorage.getItem('token')
  const isAdmin = window.localStorage.getItem('IsAdmin')

  return(
    !token && !isAdmin ?<Outlet/> :token && isAdmin ?<Navigate to="/admin"/> : <Navigate to="/user"/>    )
}

export default PublicRoot




