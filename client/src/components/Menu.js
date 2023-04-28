import React from 'react';
import Menucard from "../components/layouts/Menucard.js";
import burger1 from "../assets/item1.jpg"
import burger2 from "../assets/item2.jpg"
import burger3 from "../assets/item3.webp"
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function Menu() {

    const dispatch = useDispatch();

    const addToCart = (itemNum) => {
        switch (itemNum) {
            case 1:
                dispatch({ type: "cheeseBurgerIncrement" });
                dispatch({ type: "calculatePrice" });
                toast.success("Added To Cart", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "colored",
                });
                break;
            case 2:
                dispatch({ type: "vegCheeseBurgerIncrement" });
                dispatch({ type: "calculatePrice" });
                toast.success("Added To Cart", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "colored",
                });
                break;
            case 3:
                dispatch({ type: "burgerWithFriesIncrement" });
                dispatch({ type: "calculatePrice" });
                toast.success("Added To Cart", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "colored",
                });
                break;

            default:
                dispatch({ type: "cheeseBurgerIncrement" });
                dispatch({ type: "calculatePrice" });
                toast.success("Added To Cart", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "colored",
                });
                break;
        }
    };

    return (
        <div id='menu'>
            <div className='h-[100%] py-10'>
                <h1 className='text-center heading text-5xl leading-loose tracking-wide'>MENU</h1>
                <div className='flex flex-col md:flex-row items-center justify-center text-center lg:space-x-5'>
                    <Menucard itemNum={1} burgerSrc={burger1} price={200} delay={0.1} title={"Cheese Burger"} handler={addToCart} />
                    <Menucard itemNum={2} burgerSrc={burger2} price={400} delay={0.5} title={"Veg Cheese Burger"} handler={addToCart} />
                    <Menucard itemNum={3} burgerSrc={burger3} price={850} delay={0.8} title={"Cheese Burger with French Fries"} handler={addToCart} />
                </div>
            </div>
        </div>
    )
}
