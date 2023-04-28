import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from '../redux/actions/user';
import { toast } from 'react-toastify';
import Loader from "../components/layouts/Loader"

export default function Login() {

    const { error, isAuthenticated, loading, message, user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUser(email, password));
        navigate("/me")
    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
            });
            dispatch({ type: "clearError" });
        }
        if (message) {
            toast.success(message, {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
            });
            dispatch({ type: "clearMessage" });
        }

    }, [error, message, dispatch])

    return (
        <>
            {
                loading ? <Loader /> :
                    <div className=' flex items-center justify-center para md:h-[50vh]'>
                        <form onSubmit={handleSubmit} className='w-[100%] flex flex-col items-center justify-center mx-auto space-y-5 p-3'>

                        <div className='flex flex-col md:flex-row items-center '>
                                <label htmlFor="">Email</label>
                                <input className='outline-none mx-3 border-b-2 border-orange-500' type="email" placeholder='Enter your email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className='flex flex-col md:flex-row items-center '>
                                <label htmlFor="">Password</label>
                                <input className='outline-none mx-3 border-b-2 border-orange-500' type="password" placeholder='Enter your password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </div>

                            <button type='submit' className=' cursor-pointer py-2 px-5 rounded-md bg-orange-500 text-white hover:bg-transparent hover:text-black border hover:border-orange-500 hover:ease-in-out duration-300'>Login</button>

                            <div>
                                <p>Dont have an account ?   <Link className='text-orange-500  font-semibold underline' to={"/register"} >Register</Link> </p>

                            </div>

                        </form>
                    </div>
            }
        </>
    )
}
