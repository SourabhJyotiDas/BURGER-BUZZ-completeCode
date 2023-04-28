import React, { useEffect } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { GiArmoredBoomerang } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getAdminOrders, processOrder } from '../../redux/actions/admin';
import { toast } from 'react-toastify';
import Loader from '../layouts/Loader';

export default function Orders() {

    const dispatch = useDispatch();
    const { loading, orders, message, error } = useSelector(
        (state) => state.admin
    );

    const processOrderHandler = (id) => {
        dispatch(processOrder(id));
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }

        dispatch(getAdminOrders());
    }, [dispatch, error, message]);


    return (
        <div>
            {loading ? <Loader /> : <div className='para  w-[100%]'>
                <main className='w-[100%] mx-auto h-[100%] p-3 overflow-x-auto'>
                    <table className='w-[100%] text-center '>
                        <thead >
                            <tr className='bg-orange-300 '>
                                <th>Order Id</th>
                                <th>Status</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>User</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders &&
                                orders.map((i) => (
                                    <tr key={i._id}>
                                        <td>#{i._id}</td>
                                        <td>{i.orderStatus}</td>
                                        <td>
                                            {i.orderItems.cheeseBurger.quantity +
                                                i.orderItems.vegCheeseBurger.quantity +
                                                i.orderItems.burgerWithFries.quantity}
                                        </td>
                                        <td>₹{i.totalAmount}</td>
                                        <td>{i.paymentMethod}</td>
                                        <td>{i.user.name}</td>
                                        <td>
                                            <Link to={`/order/${i._id}`}>
                                                <AiOutlineEye />
                                            </Link>

                                            <button onClick={() => processOrderHandler(i._id)}>
                                                <GiArmoredBoomerang />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </main>
            </div>}
        </div>
    )
}
