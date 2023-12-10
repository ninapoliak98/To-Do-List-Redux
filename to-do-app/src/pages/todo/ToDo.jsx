import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../routes/consts'
import { useActions } from '../../hooks/useActions'


const ToDo = () => {

  const navigate = useNavigate()
  const { isAuth } = useActions()

  const logout = () => {
    isAuth(false)
    localStorage.clear()
    navigate(LOGIN_ROUTE)
  }

  return (
    <div>
      <button onClick={logout}>logout</button>

    </div>
  )
}

export default ToDo