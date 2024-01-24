import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useAuth } from '../hooks/useAuth'
import { TODO_ROUTE } from '../routes/consts'
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    <div className='flex justify-between mb-5'>
      {auth &&
        <>
          <Link to={TODO_ROUTE}>
            <FontAwesomeIcon icon={faHouse} size="xl" style={{ color: '#3f525f' }} />
          </Link>
          <button onClick={logout} className=' text-[#D9727A] '>
            <FontAwesomeIcon icon={faDoorOpen} size="xl" />
          </button>
        </>
      }
    </div>
  )
}

export default NavBar