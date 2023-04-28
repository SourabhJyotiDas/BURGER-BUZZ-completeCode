import React from 'react';
import { Link } from 'react-router-dom';

export default function Paymentsuccess() {
    return (
        <div className='h-[100vh] flex flex-col text-center justify-center space-y-5 p-3'>
            <h1 className='uppercase heading text-2xl'>Order confirm</h1>
            <p className='para text-xl'>order placed successfully, You can check order status below</p>
            <Link to={"/myorders"} >
                <button className='bg-orange-500 para p-2 text-white hover:bg-transparent hover:border-orange-500 border hover:text-black ease-in-out duration-300 rounded-md'>Check Status</button>
            </Link>
        </div>
    )
}
