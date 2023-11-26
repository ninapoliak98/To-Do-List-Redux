import React, { useState } from 'react'
import { useCreateUserMutation } from '../../store/api/user.api'
import { Link } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../routes/consts'


//default values have to match backend values 
const defaultValues = {
  email: "",
  password: ""
}

const SignUp = () => {

  const [user, setUser] = useState(defaultValues)

  const [createUser] = useCreateUserMutation();

  const handleSubmit = e => {
    console.log(user)
    e.preventDefault()
    createUser(user).then(() =>
      setUser(defaultValues)
    )

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
        <button type='submit'>Sign Up</button>
      </form>
      <div>
        Already have an account?  <Link to={LOGIN_ROUTE}>Login</Link>
      </div>
    </div>

  )
}

export default SignUp