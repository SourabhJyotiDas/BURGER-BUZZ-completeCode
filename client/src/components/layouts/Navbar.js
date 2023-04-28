import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineLogin } from "react-icons/ai"
import { FaHamburger, FaRegUserCircle } from "react-icons/fa"
import { CgClose } from "react-icons/cg"
import { motion } from "framer-motion"


export default function Navbar({ isAuthenticated }) {

    const toggleButton = () => {
        document.getElementById('mobileMenu').classList.toggle('hidden')
        document.getElementById('closeMenu').classList.toggle('hidden')
        document.getElementById('mobilList').classList.toggle('hidden')
    }

    return (
        <div className='sticky top-0 z-10 md:flex md:items-center md:justify-between bg-orange-500 md:px-5'>
            <nav className='flex items-center justify-between p-3 para leading-loose '>
                <Link to="/">
                    <motion.div initial={{ y: "-100%" }} whileInView={{ y: 0 }}
                        className='flex items-center space-x-2 '><span className='heading'>Burger Buzz</span> </motion.div>
                </Link>

                <FaHamburger onClick={toggleButton} id='mobileMenu' className='md:hidden' />
                <CgClose onClick={toggleButton} id='closeMenu' className='hidden' />

            </nav>

            <div id='mobilList' className='hidden md:flex'>
                <div className=' items-center flex justify-center space-x-3 py-3 bg-orange-300 md:bg-transparent '>
                    <Link to="/">Home</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/about">About</Link>
                    <Link to="/cart"><AiOutlineShoppingCart /></Link>

                    <Link to={isAuthenticated ? "/me" : "/login"}>
                        {isAuthenticated ? <FaRegUserCircle /> : <AiOutlineLogin />}
                    </Link >
                </div>
            </div>

        </div>
    )
}
