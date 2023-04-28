import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { createOrder, paymentVerification } from '../redux/actions/order';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Confirmorder() {
    // shippingInfo,
    //   orderItems,
    //   paymentMethod,
    //   itemsPrice,
    //   taxPrice,
    //   shippingCharges,
    //   totalAmount,

    const [paymentMethod, setPaymentMethod] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);

    const { cartItems, subTotal, tax, shippingCharges, total, shippingInfo } = useSelector((state) => state.cart);
    const { message, error } = useSelector((state) => state.order);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setDisableBtn(true);

        if (paymentMethod === "COD") {
            dispatch(createOrder(shippingInfo, cartItems, paymentMethod, subTotal, tax, shippingCharges, total))
        } else {
            const { data: { order, orderOptions }, } = await axios.post(`/api/v1/createorderonline`,
                {
                    shippingInfo,
                    orderItems: cartItems,
                    paymentMethod,
                    itemsPrice: subTotal,
                    taxPrice: tax,
                    shippingCharges,
                    totalAmount: total,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // console.log(order);
            // console.log(orderOptions);

            const options = {
                key: "rzp_test_hB7LIUIZZnALWu",
                amount: order.amount,
                currency: "INR",
                name: "Food Website",
                description: "Burger App",
                order_id: order.id,
                handler: function (response) {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                    dispatch(paymentVerification(razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions));
                },
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
            });
            dispatch({ type: "clearError" });
            setDisableBtn(false);
        }
        if (message) {
            toast.success(message, {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
            });
            dispatch({ type: "clearMessage" });
            dispatch({ type: "emptyState" });
            navigate('/paymentsuccess')
        }

    }, [error, message, dispatch, navigate])

    return (
        <div>
            <main className='para py-10 px-3'>
                <h1 className='text-2xl underline  my-10 text-center'>Confirm Order</h1>
                <form onSubmit={submitHandler} className='flex flex-col items-center justify-center space-y-5 text-xl' action="">
                    <div className='bg-gray-100 p-3 rounded-md w-[100%] md:w-[60%] flex justify-around'>
                        <label htmlFor="">Cash On Delivery</label>
                        <input className='mx-5 cursor-pointer' type="radio" name="payment" id="" onChange={() => setPaymentMethod("COD")} required />
                    </div>

                    <div className='bg-gray-100 p-3 rounded-md w-[100%] md:w-[60%] flex justify-around'>
                        <label htmlFor="">Online</label>
                        <input className='mx-5 cursor-pointer' type="radio" name="payment" id="" onChange={() => setPaymentMethod("Online")} required />
                    </div>
                    <button disabled={disableBtn} type='submit' className='bg-orange-500 p-2 text-white hover:bg-transparent hover:border-orange-500 border hover:text-black ease-in-out duration-300 rounded-md'>Place Order</button>
                </form>
            </main>
        </div>
    )
}
