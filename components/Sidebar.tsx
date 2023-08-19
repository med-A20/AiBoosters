"use client"

import Image from "next/image";
import { Cairo } from "next/font/google";
import { cn } from "@/lib/utils"
import { LayoutDashboardIcon, MessageSquare, Settings, Code, ImageIcon, VideoIcon, Music, Key } from "lucide-react"
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";

const cairo = Cairo({
    weight: "700", subsets: ['latin']
})
const routes = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboardIcon,
        color: "text-cyan-400"
    },
    {
        label: "Coversation",
        href: "/dashboard/conversation",
        icon: MessageSquare,
        color: "text-red-400"
    },
    {
        label: "Code",
        href: "/dashboard/code",
        icon: Code,
        color: "text-orange-400"
    },
    {
        label: "Image",
        href: "/dashboard/image",
        icon: ImageIcon,
        color: "text-slate-700"
    },
    {
        label: "Video",
        href: "/dashboard/video",
        icon: VideoIcon,
        color: "text-cyan-400"
    },
    {
        label: "Music",
        href: "/dashboard/music",
        icon: Music,
        color: "text-pink-400"
    },
    // {
    //     label:"Settings",
    //     href : "/dashboard/settings",
    //     icon: Settings,
    //     color : "text-yellow-400"
    // },
]
const Sidebar = () => {
    const pathName = usePathname()
    return <section className="w-full h-full bg-[#06283D] px-4 flex flex-col">
        {/* logo */}
        <div className="flex justify-center items-center gap-2 m-4">
            <div className="w-11 h-11 relative">
                <Image
                    src={"/logo.png"}
                    alt="logo"
                    fill
                />
            </div>
            <p className={cn('text-xl font-medium text-[#E6FFFD]', cairo.className)}>
                AIBoosters
            </p>
        </div>



        {/* Routes */}
        <article className="w-full flex flex-col gap-3 justify-start my-3">
            {routes.map((route, Key) => {
                return <Link
                    className={cn("flex-1 flex items-center m-1 p-1 text-[#E6FFFD] font-medium text-lg hover:bg-[#1363DF]/90 rounded-lg  transition-all", pathName === route.href ? "text-[#FFF]/90 bg-[#1363DF]" : "")}
                    href={route.href}
                    key={Key}
                >
                    <div>
                        <route.icon className={cn("mx-1", route.color)} />
                        {route.label}
                    </div>
                </Link>
            })}
        </article>

        {/* Billing */}
        {/* <article className="flex-1 flex flex-col justify-end">
            Billing
        </article> */}
    </section>
}

export default Sidebar;