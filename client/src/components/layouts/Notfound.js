import React from 'react';
import { TbError404 } from "react-icons/tb"
import { Link } from 'react-router-dom';

export default function Notfound() {
    return (
        <div className='h-[100vh] w-[100vw] flex flex-col items-center justify-center para'>
            <TbError404 className='text-4xl' />
            <h4 className='text-3xl uppercase leading-loose'>Notfound</h4>

            <Link to={'/'}>
                <button className='p-3  bg-orange-500 flex items-center rounded-md hover:bg-orange-700 ease-in-out duration-300'>Back To Home </button>
            </Link>

        </div>
    )
}
