import React from 'react'
import { AiFillGithub, AiOutlineFacebook, AiOutlineInstagram, AiOutlineYoutube } from 'react-icons/ai'

export default function Footer() {
    return (
        <>
            <div className='bg-orange-500 flex flex-col items-center justify-center p-3'>

                <div className='w-[100%] text-center para my-10'>
                    <h2 className='heading uppercase text-2xl'>Burger Buzz</h2>

                    <p className=' '>If you have any questions, comments, or suggestions, please don't hesitate to get in touch with us. We love hearing from our readers and value your feedback.
                        Don't forget to follow us on social media for more recipe ideas and food inspiration. And if you try one of our recipes, we'd love to see your creations - tag us on Instagram or Facebook!
                    </p>

                    <div className='font-semibold'>All right receieved @Burger Buzz</div>
                </div>

                <div className='w-[100%] flex flex-col items-center justify-center'>
                    <h2 className='para font-semibold text-lg underline'>Follow us on </h2>
                   <div className='flex items-center text-3xl space-x-5 my-3'>
                   <a href="https://www.instagram.com/sourabh_jyoti_das"><AiOutlineInstagram /></a>
                    <a href="https://github.com/SourabhJyotiDas"><AiFillGithub /></a>
                    <a href="https://facebook.com"><AiOutlineFacebook /></a>
                    <a href="https://youtube.com"><AiOutlineYoutube /></a>
                   </div>
                </div>

            </div>
        </>
    )
}
