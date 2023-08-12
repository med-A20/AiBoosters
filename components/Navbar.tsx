"use client"
import { UserButton } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import Sidebar from './Sidebar'

const Navbar = () => {
    const [Mounted, isMounted] = useState(false);
    useEffect(() => {
        isMounted(true);
    }, [])

    if (!Mounted) {
        return null;
    }
    return (
        <div className='flex w-full p-2 justify-between items-center'>
            <Sheet>
                <SheetTrigger className="md:hidden">
                    <Button variant={"ghost"} size={"icon"} className='md:hidden'>
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"} className='p-0'>
                    <Sidebar />
                    
                </SheetContent>
            </Sheet>
            <div className='self-end'>
                <UserButton afterSignOutUrl='/'/>
            </div>
        </div>
    )
}

export default Navbar