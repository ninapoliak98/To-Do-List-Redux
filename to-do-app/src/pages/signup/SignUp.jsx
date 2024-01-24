import React, { useState } from 'react'
import { useCreateUserMutation } from '../../store/api/user.api'
import { Link } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../routes/consts'
import Banner from '../../components/Banner'

const defaultValues = {
  email: "",
  password: ""
}

const SignUp = () => {

  const [user, setUser] = useState(defaultValues)

  const [createUser] = useCreateUserMutation();

  const [error, setError] = useState()
  const [signedUp, setSignedUp] = useState()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const data = await createUser(user)
      console.log(data)
      if (data.error) {
        return setError(data.error.data.message)
      }
      setError('')
      setSignedUp(data.data)
      setUser(defaultValues)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-[#F9F9FA]'>
      {error && <Banner message={error}
        className={'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded role="alert" mb-5'} />
      }
      {signedUp &&
        <Banner
          message={signedUp}
          className={'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded role="alert" mb-5'}
        >
          <Link className=' text-green-700 hover:underline' to={LOGIN_ROUTE}> Login</Link>
        </Banner>
      }
      <form onSubmit={handleSubmit}
        className='flex flex-col py-14 px-12 border-2 border-sweetpurple rounded-lg shadow-lg shadow-slate-300 w-[350px]'
      > <h1 className=" text-xl font-bold leading-tight tracking-tight text-gray-500 md:text-2xl mb-5">
          Don't Have an Account?
        </h1>
        <label
          className='block text-s font-semibold text-gray-500 mb-5'>
          Email
          <input type="email" placeholder='email' value={user.email} onChange={e => setUser({ ...user, email: e.target.value })}
            className='bg-gray-50 border-b-2 border-sweetpurple  text-gray-500 sm:text-sm  block w-full p-2.5 focus:outline-none'
          />
        </label>
        <label
          className='block text-s font-semibold text-gray-500 mb-5'>
          Password
          <input type="password" placeholder='password' value={user.password} onChange={e => setUser({ ...user, password: e.target.value })}
            className='bg-gray-50 border-b-2 border-sweetpurple  text-gray-500 sm:text-sm  block w-full p-2.5 focus:outline-none'
          />
        </label>
        <button type='submit'
          className='w-full text-gray-700 rounded-lg text-sm px-5 py-2.5 text-center bg-sweetpurple font-semibold hover:underline hover:bg-[#AF9EDF] bg-b'
        >
          Sign Up
        </button>
      </form>
      <div className='mt-5'>
        <span className='text-gray-700'> Already have an account?</span>  <Link className='text-[#786d99] hover:underline' to={LOGIN_ROUTE}>Login</Link>
      </div>
    </div>

  )
}

export default SignUp