import React from 'react'

export default function Contact() {
    return (
        <>
            <div className='h-[100vh] flex items-center justify-center para p-3'>
                <form className='w-[100%] mx-auto shadow-lg flex flex-col items-center justify-center border border-orange-500 py-5' action="">
                    <h2 className='text-3xl underline'>Contact us</h2>
                    <input className='w-[80%] p-3 my-5 outline-none border-b-2 border-orange-500' type="text" placeholder='Name' />
                    <input className='w-[80%] p-3 my-5 outline-none border-b-2 border-orange-500' type="text" placeholder='Email' />
                    <input className='w-[80%] p-3 my-5 outline-none border-b-2 border-orange-500' type="text" placeholder='Message' />
                  <button className=' cursor-pointer p-3 w-[70%] rounded-md bg-orange-500 text-white hover:bg-transparent hover:text-black hover:border border-orange-500 hover:ease-in-out duration-300'>Send</button>
                </form>
            </div>
        </>
    )
}
