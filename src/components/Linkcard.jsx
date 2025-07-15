import React, { useState } from 'react'
import copy from '../assets/copy.svg'
import { toast, ToastContainer } from 'react-toastify';

export const Linkcard = (props) => {
  return (
    <div className='bg-white font-[Inter] shadow w-[95%] flex flex-col mx-auto mt-[20px] px-[30px] py-[20px]'>
        <ToastContainer/>
        <div className='flex items-center justify-between gap-60'>
            <a className='text-2xl font-medium text-[#46A6FF]'>{props.shortID}</a>
            <p className='font-bold text-xl'>Clicks: {props.clicks}</p>
        </div>
        <div className='flex flex-row gap-2 text-[#7f7f7f] text-left'>
            <p className='text-[14px]'>Created at: 12/07/25</p>
            <p className='text-[14px]'>09:34 PM</p>
        </div>
            <label className='text-[18px] my-2 font-bold' htmlFor="">Original Link</label>
        <div className='flex items-start relative justify-center flex-col gap-2 '>
            <input className='w-full bg-[#EDEDED] text-[18px] px-[10px] py-2' value={props.orgLink} readOnly  type="text" />
            <button onClick={()=> {navigator.clipboard.writeText(props.orgLink); toast.success("Orginal Link Copied!")} } className='absolute top-[50%] bg-black/10 hover:bg-black/20 py-[12px] flex justify-center items-center px-[12px] -translate-y-[50%] right-0'>
                <img src={copy} alt="" />
            </button>
        </div>
            <label className='text-[18px] my-2 font-bold' htmlFor="">Short Link</label>
        <div className='flex items-start relative justify-center flex-col gap-2 '>
            <input className='w-full bg-[#EDEDED] text-[18px] px-[10px] py-2' value={`clipurlx.vercel.app/r/${props.shortID}`} readOnly  type="text" />
            <button onClick={()=>{navigator.clipboard.writeText("clipurlx.vercel.app/r/"+props.shortID); toast.success("Short Link Copied!")}} className='absolute top-[50%] bg-black/10 hover:bg-black/20 py-[12px] flex justify-center items-center px-[12px] -translate-y-[50%] right-0'>
                <img src={copy} alt="" />
            </button>
        </div>
    </div>
  )
}
