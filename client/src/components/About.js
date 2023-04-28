import React from 'react'
import me from "../assets/founder.jpeg"

export default function About() {
    return (
        <section className="bg-orange-100 p-3">
            <main className='max-w-[900px] bg-white mx-auto text-center h-[100vh] flex flex-col items-center justify-center'>
                <h1 className='text-2xl text-orange-500 uppercase underline'>About Us</h1>

                <article className='para leading-loose'>
                    <h4>Burger Buzz</h4>
                    <p>
                        We are Burger Buzz. The place for most tasty burgers on the
                        enitre earth.
                    </p>

                    <p>
                        Explore the various type of food and burgers. Click below to see the
                        menu
                    </p>
                </article>

                <div>
                    <h2>Founder</h2>
                    <article>
                        <div>
                            <img className='h-[20vh] rounded-full mx-auto' src={me} alt="Founder" />
                            <h3>Sourabh jyoti Das</h3>
                        </div>

                        <p>
                            I am Sourabh, the founder of <span>Burger Buzz</span> Affiliated to
                            God Taste...
                        </p>
                    </article>
                </div>
            </main>
        </section>
    )
}
