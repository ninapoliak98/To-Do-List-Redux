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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await createUser(user)
      setUser(defaultValues)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-[#F9F9FA]'>
      <form onSubmit={handleSubmit}
        className='flex flex-col py-14 px-12 border-2 border-sweetpurple rounded-lg shadow-lg shadow-slate-300 w-[350px]'
      > <h1 className=" text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-5">
          Don't Have an Account? Sign Up
        </h1>
        <label
          className='block text-sm font-medium text-gray-900 mb-5'>
          Email
          <input type="email" placeholder='email' value={user.email} onChange={e => setUser({ ...user, email: e.target.value })}
            className='bg-gray-50 border-b-2 border-sweetpurple  text-gray-900 sm:text-sm  block w-full p-2.5 focus:outline-none'
          />
        </label>
        <label
          className='block text-sm font-medium text-gray-900 mb-5'>
          Password
          <input type="password" placeholder='password' value={user.password} onChange={e => setUser({ ...user, password: e.target.value })}
            className='bg-gray-50 border-b-2 border-sweetpurple  text-gray-900 sm:text-sm  block w-full p-2.5 focus:outline-none'
          />
        </label>
        <button type='submit'
          className='w-full text-black rounded-lg text-sm px-5 py-2.5 text-center bg-sweetpurple font-semibold hover:underline hover:bg-[#AF9EDF] bg-b'
        >
          Sign Up
        </button>
      </form>
      <div className='mt-5'>
        Already have an account?  <Link className='text-[#786d99] hover:underline' to={LOGIN_ROUTE}>Login</Link>
      </div>
    </div>

  )
}

export default SignUp