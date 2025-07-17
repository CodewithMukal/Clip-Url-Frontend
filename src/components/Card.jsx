import React from 'react'
import increase from '../assets/increase.svg'
import decrease from '../assets/decrease.svg'

export const Card = (props) => {
  return (
    <div className='bg-white max-w-[500px] w-[100%] hover:scale-120 transition-transform px-5 py-5 flex flex-col gap-12 shadow rounded'>
        <div className='flex justify-between items-center'>
            <div className='flex justify-center items-center gap-3'>
                <img src={props.image} alt="" />
                <p className='text-[#8C8C8C] font-[Inter] font-medium'>{props.text}</p>
            </div>
            <h1 className='text-3xl font-bold'>
                {props.num}
            </h1>
        </div>
        <div className='flex text-[8px] md:text-[14px] lg:text-[16px] text-nowrap justify-start gap-2 items-center'>
            <img src={increase} alt="" />
            <p className='text-[#009661]'>xx% more than yesterday</p>
        </div>
    </div>
  )
}
