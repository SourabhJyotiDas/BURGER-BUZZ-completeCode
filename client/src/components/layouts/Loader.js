import React from 'react';
import { BiLoader } from "react-icons/bi"

export default function Loader() {
    return (
        <div className='h-[100vh] w-[100vw] flex items-center justify-center bg-black text-white para'>
            <h4 className='text-3xl uppercase'>Loading</h4>
            <BiLoader className="text-3xl mx-5" />
        </div>
    )
}
