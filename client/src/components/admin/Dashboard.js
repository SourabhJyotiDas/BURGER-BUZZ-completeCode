import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Box from "../layouts/Box.js";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js"
import { useDispatch, useSelector } from 'react-redux';
import { getAdminStats } from '../../redux/actions/admin.js';
import Loader from "../layouts/Loader"

ChartJS.register(Tooltip, ArcElement, Legend)

export default function Dashboard() {

    const dispatch = useDispatch();
    const { loading, usersCount, ordersCount, totalIncome } = useSelector((state) => state.admin);

    const data = {
        labels: ["Preparing", "Shipped", "Delivered"],
        datasets: [
            {
                label: "# of orders",
                data: ordersCount
                    ? [ordersCount.preparing, ordersCount.shipped, ordersCount.delivered]
                    : [0, 0, 0],
                backgroundColor: [
                    "rgba(159,63,176,0.1)",
                    "rgba(78,63,176,0.2)",
                    "rgba(156,0,60,0.3)",
                ],
                borderColor: ["rgb(159,63,176)", "rgb(78,63,176)", "rgb(156,0,60)"],
                borderWidth: 1,
            },
        ],
    };



    useEffect(() => {
        dispatch(getAdminStats());
    }, [dispatch]);

    return (
        <div>
            {loading ? <Loader /> : <main className='h-[100] w-[100%] mx-auto bg-white p-3'>
                <article className='flex text-center justify-evenly'>
                    <Box title={"Users"} value={usersCount} />
                    <Box title={"Orders"} value={ordersCount && ordersCount.total} />
                    <Box title={"income"} value={totalIncome} />
                </article>

                <section className='flex flex-col md:flex-row items-center md:justify-center py-5 '>
                    <div className='flex flex-col space-y-5'>
                        <Link className='py-2 px-5 bg-gray-600 text-white rounded-md hover:bg-gray-950 ease-in-out duration-300' to={"/admin/orders"} >View Orders</Link>
                        <Link className='py-2 px-5 bg-gray-600 text-white rounded-md hover:bg-gray-950 ease-in-out duration-300' to={"/admin/users"} >View Users</Link>
                    </div>
                    <aside className='w-[100%] mx-auto md:w-[50%] lg:w-[30%] md:mx-0'>
                        <Doughnut data={data} className='h-[50vh] '/>
                    </aside>
                </section>

            </main>}
        </div>
    )
}
