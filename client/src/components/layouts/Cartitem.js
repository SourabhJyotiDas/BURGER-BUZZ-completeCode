import React from 'react'

export default function Cartitem({ value, title, img, increment, decrement }) {
    return (
        <div className='flex flex-col md:flex-row md:justify-between items-center w-[100%] my-5 para bg-gray-100 rounded-lg p-3 space-y-2'>
            <div className='flex items-center space-x-10 '>
                <img className='h-[10vh] rounded-lg' src={img} alt={title} />
                <h4>{title}</h4>
            </div>

            <div className=' flex items-center text-2xl space-x-10'>
                <button className='bg-orange-500 p-3 text-white' onClick={decrement}>-</button>
                <div>{value}</div>
                <button className='bg-orange-500 p-3 text-white' onClick={increment}>+</button>
            </div>

        </div>
    )
}
