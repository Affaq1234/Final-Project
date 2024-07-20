import React from 'react'
import SignupForm from '../components/SignUp'
const Home = () => {
  return (
    <center>
      <p className='text-4xl font-bold mt-5 text-sky-500 text-wrap mb-4'>Welcome to our Store!</p>
      <div className='flex flex-wrap gap-2 shadow p-3 w-3/4'>
      </div>
      <SignupForm/>
    </center>
  )
}

export default Home