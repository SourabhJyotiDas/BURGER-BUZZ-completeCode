import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/actions/user';
import { toast } from 'react-toastify';
import Loader from './layouts/Loader';

export default function Register() {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [password, setPassword] = useState("");


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, message, error } = useSelector((state) => state.auth);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
            }
        };
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(registerUser(name, email, password, avatar));
        navigate("/me")
    };

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
        <div>
            {
                loading ? <Loader /> :
                    <div className='h-[] flex items-center justify-center para md:h-[100vh]'>
                        <form onSubmit={submitHandler} className='w-[100%] flex flex-col items-center justify-center mx-auto space-y-5 p-3'>

                        <div className='flex flex-col md:flex-row items-center '>
                                <label htmlFor="">Name</label>
                                <input value={name} onChange={(e) => { setName(e.target.value) }} className='outline-none mx-3 border-b-2 border-orange-500' type="text" placeholder='Enter your name' />
                            </div>
                            <div className='flex flex-col md:flex-row items-center '>
                                <label htmlFor="">Email</label>
                                <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='outline-none mx-3 border-b-2 border-orange-500' type="email" placeholder='Enter your email' />
                            </div>
                            <div className='flex flex-col md:flex-row items-center '>
                                <label htmlFor="">Password</label>
                                <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='outline-none mx-3 border-b-2 border-orange-500' type="password" placeholder='Enter your password' />
                            </div>

                            <div>
                                {avatar && <img className='h-[100px] w-[100px] mx-auto rounded-full border-2 border-black' src={avatar} alt="post" />}

                                <input className='w-[90%]' type="file" accept='image/*' onChange={handleImageChange} />
                            </div>

                            <button type='submit' className=' cursor-pointer py-2 px-5 rounded-md bg-orange-500 text-white hover:bg-transparent hover:text-black border hover:border-orange-500 hover:ease-in-out duration-300'>Register</button>

                            <div>
                                <p>Already have a account ?   <Link className='text-orange-500 font-semibold underline' to={"/login"} >Login</Link> </p>
                            </div>

                        </form>
                    </div>
            }
        </div>
    )
}
