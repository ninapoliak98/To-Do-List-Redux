import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../routes/consts'


const ToDo = () => {

  const navigate = useNavigate()

  const logout = () => {
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