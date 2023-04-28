import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../redux/actions/order';
import Loader from './layouts/Loader';

export default function OrderDetails() {

    const params = useParams();

    const { order, loading } = useSelector((state) => state.orders);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderDetails(params.id));
    }, [params.id, dispatch]);

    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        {
                            order && <div className='flex items-center justify-center text-center bg-orange-100'>
                                <main className='w-[auto] mx-auto flex flex-col space-y-5 py-10 leading-loose bg-white'>

                                    <h1 className='text-3xl uppercase tracking-wide underline'>Order Details</h1>
                                    <div>
                                        <h1 className='font-semibold text-xl'>Shipping</h1>
                                        <p>
                                            <b>Address : </b>
                                            {`${order.shippingInfo.hNo} ${order.shippingInfo.city} ${order.shippingInfo.state} ${order.shippingInfo.country} ${order.shippingInfo.pinCode}`}
                                        </p>
                                    </div>
                                    <div>
                                        <h1 className='font-semibold text-xl'>Contact</h1>
                                        <p>
                                            <b>Name : </b>
                                            {order.user.name}
                                        </p>
                                    </div>
                                    <div>
                                        <h1 className='font-semibold text-xl'>Phone</h1>
                                        <p>
                                            <b>Number : </b>
                                            {order.shippingInfo.phoneNo}
                                        </p>
                                    </div>
                                    <div>
                                        <h1 className='font-semibold text-xl'>Status</h1>
                                        <p>
                                            <b>Order Status : </b>
                                            {order.orderStatus}
                                        </p>
                                        <p>
                                            <b>Placed At : </b>
                                            {order.createdAt.split("T")[0]}
                                        </p>
                                        <p>
                                            <b>Delivered At : </b>
                                            {order.deliveredAt ? order.deliveredAt.split("T")[0] : "NA"}
                                        </p>
                                    </div>


                                    <div>
                                        <h1 className='font-semibold text-xl'>Payment</h1>
                                        <p>
                                            <b>Payment Method : </b>
                                            {order.paymentMethod}
                                        </p>
                                        <p>
                                            <b>Payment Reference : </b>
                                            {order.paymentMethod === "Online"
                                                ? `#${order.paymentInfo}`
                                                : "NA"}
                                        </p>
                                        <p>
                                            <b>Paid at : </b>
                                            {order.paymentMethod === "Online"
                                                ? order.paidAt.split("T")[0]
                                                : "NA"}
                                        </p>
                                    </div>


                                    <div>
                                        <h1 className='font-semibold text-xl'>Amount</h1>
                                        <p>
                                            <b>Items Total : </b>
                                            ₹{order.itemsPrice}
                                        </p>
                                        <p>
                                            <b>Shipping Charges : </b>
                                            ₹{order.shippingCharges}
                                        </p>
                                        <p>
                                            <b>Tax charges : </b>
                                            ₹{order.taxPrice}
                                        </p>
                                        <p>
                                            <b>Total Amount : </b>
                                            ₹{order.totalAmount}
                                        </p>
                                    </div>

                                    <div className='bg-gray-500 h-[1px] w-[100%] text-center'> </div>
                                    <article className='font-semibold space-y-3 '>
                                        <h1 className='text-3xl text-left'>Ordered Items</h1>
                                        <div className='w-[90%] mx-auto flex items-center justify-between bg-gray-200 p-3 rounded-md'>
                                            <h1>Chese Burger</h1>
                                            <div>
                                                <span>{order.orderItems.cheeseBurger.quantity}</span>  x{" "} <span>{order.orderItems.cheeseBurger.price}</span>
                                            </div>
                                        </div>
                                        <div className='w-[90%] mx-auto flex items-center justify-between bg-gray-200 p-3 rounded-md'>
                                            <h1>Veg Chese Burger</h1>
                                            <div>
                                                <span>{order.orderItems.vegCheeseBurger.quantity}</span> x{" "}
                                                <span>{order.orderItems.vegCheeseBurger.price}</span>
                                            </div>
                                        </div>
                                        <div className='w-[90%] mx-auto flex items-center justify-between bg-gray-200 p-3 rounded-md'>
                                            <h1>Chese Burger with french fries</h1>
                                            <div>
                                                <span>{order.orderItems.burgerWithFries.quantity}</span> x{" "}
                                                <span>{order.orderItems.burgerWithFries.price}</span>
                                            </div>
                                        </div>

                                        <div className='w-[90%] mx-auto flex items-center justify-between bg-gray-200 p-3 rounded-md'>
                                            <h1>Sub Total</h1>
                                            <div>
                                                <span>₹{order.itemsPrice}</span>
                                            </div>
                                        </div>

                                    </article>

                                </main>
                            </div>
                        }
                    </>
            }
        </>
    )
}
