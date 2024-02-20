import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthRoutes, PublicRoutes } from '../routes'
import NotFound from '../pages/404/NotFound'
import { useAuth } from '../hooks/useAuth'
import { Login } from '../pages'

const AppRouter = () => {

  const { auth } = useAuth();


  return (
    <Routes>
      {PublicRoutes.map(({ path, Component }, index) =>
        <Route key={index} path={path} element={<Component />} />
      )}

      {auth && AuthRoutes.map(({ path, Component }, index) =>
        <Route key={index} path={path} element={<Component />} />
      )}
      {auth ? <Route path='*' element={<NotFound />} /> : <Route path='*' element={<Login />} />}


    </Routes>
  )
}

export default AppRouter