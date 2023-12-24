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

  const { isAuth } = useActions()




  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const data = await loginUser(user)
      localStorage.setItem('user', data.data.token)
      isAuth(true)
      setUser(defaultValues)
      if (localStorage.getItem('user')) navigate(TODO_ROUTE)

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div
      className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-[#F9F9FA] '>

      <form onSubmit={handleSubmit} className='flex flex-col py-14 px-12 border-2 border-sweetpurple rounded-lg shadow-lg shadow-slate-300 w-[350px]' >
        <h1 className=" text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-5">
          Sign in to your account
        </h1>
        <label className='block text-sm font-medium text-gray-900 mb-5'>
          Email
          <input type="email" placeholder='email' value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
            className='bg-gray-50 border-b-2 border-sweetpurple  text-gray-900 sm:text-sm  block w-full p-2.5 focus:outline-none' />
        </label>
        <label className='block text-sm font-medium text-gray-900 mb-5'>
          Password
          <input type="password" placeholder='password' value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
            className='bg-gray-50 text-gray-900 border-b-2 border-sweetpurple sm:text-sm  block w-full p-2.5 focus:outline-none' />
        </label>
        <button type='submit'
          className='w-full text-black rounded-lg text-sm px-5 py-2.5 text-center bg-sweetpurple font-semibold hover:underline hover:bg-[#AF9EDF] bg-b'>
          Sign In</button>
      </form>
      <div className='mt-5'>
        <span className=''>Don't have an account?</span> <Link className='text-[#786d99] hover:underline' to={SIGNUP_ROUTE}>Sign Up</Link>
      </div>
    </div>
  )
}

export default Login