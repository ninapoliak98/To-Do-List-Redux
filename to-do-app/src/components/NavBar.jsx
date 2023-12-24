import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useAuth } from '../hooks/useAuth'
import { TODO_ROUTE } from '../routes/consts'

const NavBar = () => {

  const navigate = useNavigate
  const { isAuth } = useActions()
  const { auth } = useAuth()

  const logout = () => {
    try {
      localStorage.removeItem('user')
      isAuth(false)
      navigate(LOGIN_ROUTE)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      {auth &&
        <>
          <Link to={TODO_ROUTE}>To Do</Link>
          <button onClick={logout}>logout</button>
        </>
      }
    </div>
  )
}

export default NavBar