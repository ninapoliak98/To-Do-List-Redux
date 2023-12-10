import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthRoutes, PublicRoutes } from '../routes'
import NotFound from '../pages/404/NotFound'

const AppRouter = () => {
  return (
    <Routes>
      {PublicRoutes.map(({ path, Component }, index) =>
        <Route key={index} path={path} element={<Component />} />
      )}

      {localStorage.getItem('user') && AuthRoutes.map(({ path, Component }, index) =>
        <Route key={index} path={path} element={<Component />} />
      )}

      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}

export default AppRouter