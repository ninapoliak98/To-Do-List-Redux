import { useState } from 'react';
import { useLoginUserMutation } from '../../store/api/user.api';
import { Link } from 'react-router-dom'
import { SIGNUP_ROUTE } from '../../routes/consts';

const defaultValues = {
  email: "",
  password: ""
}

const Login = () => {
  const [user, setUser] = useState(defaultValues)

  const [loginUser] = useLoginUserMutation();


  const handleSubmit = e => {
    e.preventDefault()
    console.log(user)
    loginUser(user).then((data) => {
      localStorage.setItem('user', data.data.token)
      setUser(defaultValues)
    }
    )
    console.log(localStorage.getItem('user'))
  }

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