"use client"
import React from 'react'
import TypewriterComponent from "typewriter-effect"
import { Button } from './ui/button'
import { useAuth } from "@clerk/nextjs"
import Link from 'next/link'

const LandingHero = () => {
    const { isSignedIn } = useAuth()
    return (
        <section className='container mx-auto flex flex-col justify-around items-center mt-28'>
            <div className=' md:w-3/4 m-auto '>
                <h1 className='text-[#E6FFFD] font-bold text-center text-5xl md:text-4xl xl:text-5xl'>
                    Unleash the Power of AI: Your Ultimate Solution for
                </h1>
                <div className='min-h-[5rem] mt-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-800 font-bold text-center text-xl md:text-3xl xl:text-4xl'>
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Conversational Charm - Where Chatbots Come to Life.",
                                "Visual & Motion Mastery - Crafting Photos and Videos Beyond Imagination.",
                                "Harmonious Melodies - Unleash the Symphony of AI-Generated Music."
                            ],
                            autoStart: true,
                            loop: true,
                            delay: 3,
                            deleteSpeed: 3
                        }}
                    />
                </div>
                <div className=''>
                    <p className='text-center text-zinc-100 italic text-muted-foreground'>Embark on Your Creative Expedition for Free</p>
                </div>
                <div className='flex m-3'>
                    <Link href={isSignedIn ? "/sign-in" : "/sign-up"}
                        className='m-auto text-xl'>
                        <Button >
                            Get Started Now!
                        </Button>
                    </Link>
                </div>
                <div>
                    <p className='text-center text-zinc-100 italic text-muted-foreground'>

                        Zero credit card commitments. Just boundless creativity.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default LandingHero