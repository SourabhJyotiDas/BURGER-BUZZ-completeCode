import React from 'react';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

export default function Menucard({ itemNum, burgerSrc, price, handler, title, delay }) {
    return (
        <motion.div initial={{ x: "-100%", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: delay }}
            className='para p-5 shadow-lg flex flex-col items-center justify-center space-y-5 border hover:scale-105 ease-in-out duration-300 '>
            <div>{itemNum}</div>
            <img className='h-[40vh] rounded-md' src={burgerSrc} alt={itemNum} />
            <h5> ₹{price}</h5>
            <p className='uppercase'>{title}</p>
            <Link to={"/cart"}>
                <button className=' cursor-pointer p-3 rounded-md bg-orange-500 text-white hover:bg-transparent hover:text-black border hover:border-orange-500 hover:ease-in-out duration-300' onClick={() => handler(itemNum)}>Add to cart</button>
            </Link>
        </motion.div>
    )
}
