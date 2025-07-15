import React from 'react'
import { Home } from './Home'
import { useNavigate } from 'react-router'

export const Notfound = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  }
  return (
   <div>
    <div className="text-center w-fit mx-auto mt-8 font-[Inter] py-5 px-10 bg-white rounded-2xl shadow ">
      <h1 className='text-[24px] font-bold'>404 Not Found</h1>
      <p className='text-[18px]'>The page you are looking for does not exist.</p>
      <button onClick={()=>handleRedirect()} className='mt-4 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded'>Go to Home</button>
    </div>
   </div>
  )
}
