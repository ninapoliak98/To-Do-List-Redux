import React, { useState } from 'react'
import { useCreateUserMutation } from '../../store/api/user.api'

const defaultValues = {
  id: null,
  username: "",
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

    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" placeholder='username' value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} />
      </label>
      <label>
        <input type="password" placeholder='password' value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
      </label>
      <button type='submit'>Sign Up</button>
    </form>

  )
}

export default SignUp