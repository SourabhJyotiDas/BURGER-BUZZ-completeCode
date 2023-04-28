import React, { useEffect } from 'react'
import me from "../../assets/founder.jpeg"
import { useDispatch, useSelector } from 'react-redux';
import { getAdminUsers } from '../../redux/actions/admin';
import Loader from '../layouts/Loader';


export default function Users() {

    const dispatch = useDispatch();

    const { loading, users } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAdminUsers());
    }, [dispatch]);
    return (
        <>
            {
                loading ? <Loader /> :
                    <section>
                        <div className='para h-[100%] w-[100%]'>
                            <main className='w-[100%] mx-auto h-[100%] p-3 overflow-x-auto'>
                                <table className='w-[100%] text-center '>
                                    <thead >
                                        <tr className='bg-orange-300 '>
                                            <th>user Id</th>
                                            <th>Name</th>
                                            <th>Photo</th>
                                            <th>Role</th>
                                            <th>Since</th>
                                        </tr>
                                    </thead>

                                    <tbody className='my-3'>
                                        {users &&
                                            users.map((i) => (
                                                <tr key={i._id}>
                                                    <td>#{i._id}</td>
                                                    <td>{i.name}</td>
                                                    <td>
                                                        <img className="h-[35px] w-[35px] rounded-full" src={i.avatar.url} alt="User" />
                                                    </td>
                                                    <td>{i.role}</td>
                                                    <td>{i.createdAt.split("T")[0]}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </main>
                        </div>
                    </section>
            }
        </>
    )
}
