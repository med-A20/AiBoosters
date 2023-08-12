import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { Cairo } from "next/font/google";
import Link from 'next/link';
import { Button } from './ui/button';

const cairo = Cairo({
    weight: "700", subsets: ['latin']
})
const LandingNavbar = () => {
    return (
        <div>
            {/* logo */}
            <section className='container mx-auto flex justify-between items-center py-4'>
                <div className='flex items-center'>
                    <div className='relative w-8 h-8'>
                        <Image
                            alt="logo"
                            fill
                            src={"/logo.png"}
                        />
                    </div>
                    <p className={cn('text-xl font-medium text-[#E6FFFD]', cairo.className)}>AiBoosters</p>
                </div>
                <div>
                    <Link href='/sign-in'>
                        <Button variant={'ghost'} className='text-[#E6FFFD]'>
                            Sign In
                        </Button>
                    </Link>
                    <Link href='/sign-up'>
                        <Button >
                            Register
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default LandingNavbar