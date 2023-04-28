import React from 'react';
import founderImg from "../../assets/founder.jpeg";
import { motion } from "framer-motion"



export default function Founder() {

    return (
        <div className='bg-orange-500'>
            <motion.div initial={{ x: "-100%", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className='flex flex-col items-center justify-center p-3 text-center'>
                <img className='h-[30vh] rounded-full' src={founderImg} alt="Founder" />
                <div className='my-5 p-3  flex flex-col items-center justify-center rounded-2xl  space-y-5'>
                    <h3 className='para underline text-2xl'>Sourabh Jyoti Das</h3>
                    <p className='para '>  Hello! I'm Sourabh, the founder of "Burger Buzz", a food website dedicated to sharing delicious recipes and culinary inspiration with food lovers all over the world.</p>
                    
                </div>
            </motion.div>
        </div>
    )
}
