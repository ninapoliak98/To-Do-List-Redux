import { useState } from 'react';
import { useLoginUserMutation } from '../../store/api/user.api';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { SIGNUP_ROUTE, TODO_ROUTE } from '../../routes/consts';
import { useActions } from '../../hooks/useActions';
import { useAuth } from '../../hooks/useAuth';


const defaultValues = {
  email: "",
  password: ""
}

const Login = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState(defaultValues)

  const [loginUser] = useLoginUserMutation();

  const { isAuth } = useActions();

  const { auth } = useAuth()




  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const data = await loginUser(user)
      localStorage.setItem('user', data.data.token)
      isAuth()
      setUser(defaultValues)
      if (localStorage.getItem('user')) navigate(TODO_ROUTE)

    } catch (error) {
      console.log(error.message)
    }
  }

  console.log(auth)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="email" placeholder='email' value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
        </label>
        <label>
          <input type="password" placeholder='password' value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
        </label>
        <button type='submit'>Login</button>
      </form>
      <div>
        Don't have an account? <Link to={SIGNUP_ROUTE}>Sign Up</Link>
      </div>
    </div>
  )
}

export default Login