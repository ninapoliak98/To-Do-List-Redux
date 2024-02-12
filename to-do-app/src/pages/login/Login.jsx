import { useState } from 'react';
import { useLoginUserMutation } from '../../store/api/user.api';
import { Link, useNavigate } from 'react-router-dom'
import { SIGNUP_ROUTE, TODO_ROUTE } from '../../routes/consts';
import { useActions } from '../../hooks/useActions';
import Banner from '../../components/Banner';

const defaultValues = {
  email: "",
  password: ""
}

const Login = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState(defaultValues)

  const [loginUser] = useLoginUserMutation();

  const [error, setError] = useState()

  const { isAuth } = useActions()

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const data = await loginUser(user)
      if (data.error) {
        return setError(data.error.data.message)
      }
      localStorage.setItem('user', data.data?.token)
      isAuth(true)
      setUser(defaultValues)
      if (localStorage.getItem('user')) {
        setError('')
        navigate(TODO_ROUTE)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div
      className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-shark-50'>

      {error && <Banner message={error}
        className={'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded role="alert" mb-5'} />}

      <form onSubmit={handleSubmit} className='flex flex-col py-14 px-12 border-2 border-shark-300 rounded-lg shadow-lg shadow-slate-300 w-[350px]' >
        <h1 className=" text-xl font-bold leading-tight tracking-tight text-shark-500 md:text-2xl mb-5">
          Login to your account
        </h1>
        <label className='block text-s font-semibold text-shark-500 mb-5'>
          Email
          <input type="email" placeholder='email' value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
            className='bg-shark-50 border-b-2 border-shark-300  text-shark-500 sm:text-sm  block w-full p-2.5 focus:outline-none'
            required />
        </label>
        <label className='block text-s font-semibold text-gray-500 mb-5'>
          Password
          <input type="password" placeholder='password' value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
            className='bg-shark-50 text-shark-500 border-b-2 border-shark-300 sm:text-sm  block w-full p-2.5 focus:outline-none'
            required />
        </label>
        <button type='submit'
          className='w-full text-shark-700 rounded-lg text-sm px-5 py-2.5 text-center bg-shark-300 font-semibold hover:underline hover:bg-shark-200 bg-b'>
          Sign In</button>
      </form>
      <div className='mt-5'>
        <span className='text-gray-700'>Don't have an account?</span> <Link className='text-shark-300 hover:underline' to={SIGNUP_ROUTE}>Sign Up</Link>
      </div>
    </div>
  )
}

export default Login