import React from 'react'
import user from '../assets/user.svg'
import star from '../assets/star.svg'
import greystar from '../assets/greystar.svg'

export const CustomerReview = (props) => {
    let starDiv = []
    for(let i = 0; i < props.rating; i++) {
        starDiv.push(
            <div key={i}>
                <img src={star} alt="" />
            </div>
        )
    }
    for(let i = 0; i < 5 - props.rating; i++) {
        starDiv.push(
            <div key={i + props.rating}>
                <img src={greystar} alt="" />
            </div>
        )
    }

    return (
        <div className='w-[350px] min-h-[300px] mx-4 rounded-[20px] flex flex-col justify-between px-[20px] py-[20px] gap-[20px] bg-white shadow-md'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    {!props.imge?(
                        <img 
                        src={user} 
                        className='bg-black/10 p-[10px] rounded-full w-[40px]' 
                        alt="" 
                    />
                    ):
                    (
                        <img className='w-[40px] h-[40px]' src={props.imge}></img>
                    )}
                    <h1 className='font-semibold text-[18px] font-[Inter]'>{props.name}</h1>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1'>
                        {starDiv}
                    </div>
                    <p className='text-sm font-medium'>{props.rating}/5</p>
                </div>
            </div>
            <div className='flex justify-center items-center grow'>
                {
                    props.review && (
                        <div className='text-[16px] text-center italic'>
                            "{props.review}"
                        </div>
                    )
                }
            </div>
        </div>
    )
}
