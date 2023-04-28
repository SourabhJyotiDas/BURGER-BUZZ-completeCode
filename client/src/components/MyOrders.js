import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineEye } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getMyOrders } from '../redux/actions/order';
import Loader from "./layouts/Loader"

export default function Orders() {

    const dispatch = useDispatch();

    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }

        dispatch(getMyOrders());
    }, [dispatch, error]);



    return (
        <>
            {
                loading ? <Loader /> :
                    <div className='para h-[100%] w-[100%]'>
                        <main className='w-[100%] mx-auto h-[100%] p-3 overflow-x-auto'>
                            <table className='w-[100%] text-center '>
                                <thead >
                                    <tr className='bg-orange-300 '>
                                        <th>Order Id</th>
                                        <th>Status</th>
                                        <th>Quantity</th>
                                        <th>Amount</th>
                                        <th>Payment Method</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody >
                                    {
                                        orders && orders.map((element, index) => {
                                            return <tr key={element._id}>
                                                <td>{element._id}</td>
                                                <td>{element.orderStatus}</td>
                                                <td>
                                                    {
                                                        element.orderItems.cheeseBurger.quantity +
                                                        element.orderItems.vegCheeseBurger.quantity +
                                                        element.orderItems.burgerWithFries.quantity
                                                    }
                                                </td>
                                                <td>{element.totalAmount}</td>
                                                <td>{element.paymentMethod}</td>
                                                <td>
                                                    <Link className='flex items-center' to={`/order/${element._id}`} >
                                                        <button className='p-3 bg-orange-500 flex items-center rounded-md hover:text-white ease-in-out duration-300'> <AiOutlineEye />Order details </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </main>
                    </div>
            }
        </>
    )
}
