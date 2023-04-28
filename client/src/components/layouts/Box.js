import React from 'react'

export default function Box({ value, title }) {
    return (
        <div className=' rounded-full bg-gray-700 text-white w-[90px] h-[90px] flex flex-col items-center justify-center'>
            <p className=' uppercase underline'>{title}</p>
            <h3 className=''>
            {title === "income" && "₹" }
              {value}</h3>
        </div>
    )
}
