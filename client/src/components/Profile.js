import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import me from "../assets/founder.jpeg"
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loadUser, logout } from '../redux/actions/user';
import Loader from './layouts/Loader';

export default function Profile() {

    const { error, loading, message, user } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await dispatch(logout())
        navigate("/login")
    }


    const options = {
        initial: {
            y: "-100%",
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        }
    }
    return (
        <>
            {
                loading ? <Loader /> :
                    <div>
                        {
                            user && <main className='w-[100%] mx-auto flex flex-col items-center justify-center p-3 space-y-5 para tracking-widest'>
                                <motion.img className='h-[15vh] rounded-full' src={user.avatar.url} alt='User' {...options} transition={{ delay: 0.2 }} />

                                <motion.h5 {...options} transition={{ delay: 0.5 }} className='font-bold uppercase text-2xl'> {user.name} </motion.h5>


                                {
                                    user && user.role === "admin" && <motion.button {...options} transition={{ delay: 0.5 }} className=' cursor-pointer py-2 px-5 rounded-md bg-black text-white  hover:bg-transparent hover:text-black border hover:border-black hover:ease-in-out duration-300 '>
                                        <Link className='flex items-center' to="/admin/dashboard"><MdOutlineDashboard className='mx-1' /> Dashboard</Link>
                                    </motion.button> 
                                }

                                <motion.button {...options} transition={{ delay: 0.5 }} className=' cursor-pointer py-2 px-5 rounded-md bg-black text-white  hover:bg-transparent hover:text-black border hover:border-black hover:ease-in-out duration-300 flex items-center'>
                                    <Link to="/myorders">My Orders</Link>
                                </motion.button>

                                <motion.button onClick={handleLogout} className=' cursor-pointer py-2 px-5 rounded-md bg-orange-500 text-white hover:bg-transparent hover:text-black border hover:border-orange-500 hover:ease-in-out duration-300 flex items-center' {...options} transition={{ delay: 0.5 }}>Logout</motion.button>

                            </main>
                        }
                    </div>
            }
        </>
    )
}
