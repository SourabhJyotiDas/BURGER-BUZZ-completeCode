import React, { useEffect } from 'react';
import Cartitem from "./layouts/Cartitem.js";
import buger1 from "../assets/item1.jpg"
import buger2 from "../assets/item2.jpg"
import buger3 from "../assets/item3.webp"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"

export default function Cart() {

    const { cartItems: {
        cheeseBurger: { quantity: cheeseBurger },
        vegCheeseBurger: { quantity: vegCheeseBurger },
        burgerWithFries: { quantity: burgerWithFries }
    },
        subTotal,
        tax,
        shippingCharges,
        total } = useSelector((state) => state.cart)
    const { cartItems: orderItems } = useSelector((state) => state.cart)

    const dispatch = useDispatch();

    const increment = (item) => {
        switch (item) {
            case 1:
                dispatch({ type: "cheeseBurgerIncrement" });
                dispatch({ type: "calculatePrice" });
                break;
            case 2:
                dispatch({ type: "vegCheeseBurgerIncrement" });
                dispatch({ type: "calculatePrice" });
                break;
            case 3:
                dispatch({ type: "burgerWithFriesIncrement" });
                dispatch({ type: "calculatePrice" });
                break;

            default:
                dispatch({ type: "cheeseBurgerIncrement" });
                dispatch({ type: "calculatePrice" });
                break;
        }
    };

    const decrement = (item) => {
        switch (item) {
            case 1:
                if (cheeseBurger === 0) break;
                dispatch({ type: "cheeseBurgerDecrement" });
                dispatch({ type: "calculatePrice" });
                break;
            case 2:
                if (vegCheeseBurger === 0) break;
                dispatch({ type: "vegCheeseBurgerDecrement" });
                dispatch({ type: "calculatePrice" });
                break;
            case 3:
                if (burgerWithFries === 0) break;
                dispatch({ type: "burgerWithFriesDecrement" });
                dispatch({ type: "calculatePrice" });
                break;

            default:
                if (cheeseBurger === 0) break;
                dispatch({ type: "cheeseBurgerDecrement" });
                dispatch({ type: "calculatePrice" });
                break;
        }
    };


    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(orderItems));
        localStorage.setItem("cartPrices", JSON.stringify({
            subTotal,
            tax,
            shippingCharges,
            total,
        })
        );
    }, [orderItems, subTotal, tax, shippingCharges, total]);

    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <Cartitem
                    value={cheeseBurger}
                    title={"cheeseBurger"}
                    img={buger1}
                    increment={() => increment(1)}
                    decrement={() => decrement(1)}
                />

                <Cartitem
                    value={vegCheeseBurger}
                    title={"vegCheeseBurger"}
                    img={buger2}
                    increment={() => increment(2)}
                    decrement={() => decrement(2)}
                />

                <Cartitem
                    value={burgerWithFries}
                    title={"burgerWithFries"}
                    img={buger3}
                    increment={() => increment(3)}
                    decrement={() => decrement(3)}
                />

            </div>


            <div className='flex flex-col items-center p-3 w-[100%] md:w-[50%] mx-auto para leading-loose'>

                <div className='flex w-full justify-between'>
                    <h4>Sub Total</h4>
                    <p>₹{subTotal}</p>
                </div>
                <div className='flex w-full justify-between'>
                    <h4>Tax</h4>
                    <p>₹{tax}</p>
                </div>
                <div className='flex w-full justify-between'>
                    <h4>Shipping Charges</h4>
                    <p>₹{shippingCharges}</p>
                </div>
                <div className='flex w-full justify-between'>
                    <h4>Total</h4>
                    <p>₹{total}</p>
                </div>

                <Link to="/shipping">
                    <button className='bg-orange-500 p-2 text-white hover:bg-transparent hover:border-orange-500 border hover:text-black ease-in-out duration-150 rounded-md'>Checkout</button>
                </Link>
            </div>
        </>
    )
}
