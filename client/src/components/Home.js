import React from 'react';
import { motion } from "framer-motion";
import Founder from "./layouts/Founder.js"
import Menu from "./Menu.js"


export default function Home() {
    return (
        <>
            <div className='h-[100vh] flex flex-col items-center justify-center leading-loose text-center'>
                <h1 className='heading text-4xl'>Burger Buzz</h1>
                <p className='para capitalize leading-loose tracking-widest '>Delight your taste buds with every bite</p>
                <motion.div initial={{ x: "-100%" }} whileInView={{ x: 0 }}>
                    <a href="#menu">
                        <button className='py-2 px-5 bg-orange-500 text-white rounded-md para hover:bg-transparent ease-in-out duration-300 border hover:text-black hover:border-orange-500 '>Explore menu</button>
                    </a>
                </motion.div>
            </div>

            <Founder />
            <Menu />

        </>
    )
}
