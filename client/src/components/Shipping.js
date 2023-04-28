import React, { useState } from 'react';
import { Country, State } from "country-state-city"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Shipping() {

    const { shippingInfo } = useSelector((state) => state.cart);

    const [hNo, setHNo] = useState(shippingInfo.hNo);
    const [city, setCity] = useState(shippingInfo.city);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch({
            type: "addShippingInfo",
            payload: { hNo, city, state, country, pinCode, phoneNo },
        });

        localStorage.setItem("shippingInfo", JSON.stringify({ hNo, city, state, country, pinCode, phoneNo, }));

        navigate("/confirmorder");
    };

    return (
        <div>
            <main className='para w-[100%] mx-auto flex flex-col items-center justify-center py-10'>
                <h1 className='my-5 underline text-2xl'>Shipping Details</h1>
                <form onSubmit={submitHandler} className='w-[100%] flex flex-col items-center justify-center space-y-5'>
                <div className='flex flex-col md:flex-row  items-start '>
                        <label htmlFor="">H.No</label>
                        <input value={hNo} onChange={(e) => setHNo(e.target.value)} required className='outline-none md:mx-5 border-b-2 border-orange-500' type="text" placeholder='Enter house number' />
                    </div>
                    <div className='flex flex-col md:flex-row  items-start '>
                        <label htmlFor="">City</label>
                        <input value={city} onChange={(e) => setCity(e.target.value)} required className='outline-none md:mx-5 border-b-2 border-orange-500' type="text" placeholder='Enter your city' />
                    </div>
                    <div className='flex flex-col md:flex-row  items-start '>
                        <label htmlFor="">Pincode</label>
                        <input value={pinCode} onChange={(e) => setPinCode(e.target.value)} required className='outline-none md:mx-5 border-b-2 border-orange-500' type="text" placeholder='Enter Pincode' />
                    </div>
                    <div className='flex flex-col md:flex-row  items-start '>
                        <label htmlFor="">PhoneNumber</label>
                        <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required className='outline-none md:mx-5 border-b-2 border-orange-500' type="number" placeholder='Enter Phone number' />
                    </div>

                    <div className='flex flex-col md:flex-row  items-start '>
                        <label htmlFor="">Country</label>
                        <select className='w-[90%] mx-auto md:mx-5' name="" id="" value={country} onChange={(e) => setCountry(e.target.value)} required>
                            <option value="">Country</option>
                            {
                                Country && Country.getAllCountries().map((element) => {
                                    return <option key={element.isoCode} value={element.isoCode}>{element.name}</option>
                                })
                            }
                        </select>
                    </div>

                    {
                        country && <div className='flex flex-col md:flex-row items-start '>
                            <label htmlFor="">State</label>
                            <select className='w-[90%] mx-auto md:mx-5' name="" id="" value={state} onChange={(e) => setState(e.target.value)} required>
                                <option value="">State</option>
                                {
                                    State && State.getStatesOfCountry(country).map((element) => {
                                        return <option key={element.isoCode} value={element.isoCode}>{element.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    }



                    <button  type='submit' className='bg-orange-500 p-3 text-white hover:bg-transparent hover:border-orange-500 border hover:text-black ease-in-out duration-150 rounded-md'>Confirm Order</button>

                </form>
            </main>
        </div>
    )
}
