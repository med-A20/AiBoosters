import React from 'react'
import {LucideIcon} from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
interface HeadingProps {
    title : string,
    desc : string,
    icon : LucideIcon,
    iconColor ? : string,
    bgColor ? : string
}

const Heading = ({
    title, desc, icon : Icon, iconColor, bgColor
} : HeadingProps) => {
  return (
    <>
        {/* Icon */}
        <div className='mt-4 flex items-center gap-x-2'>
            <Button className={cn(bgColor)}>
                <Icon className={cn(iconColor)}/>
            </Button>
            {/* texte */}
            <div>
                <h3 className='text-2xl font-semibold'>{title}</h3>
                <p className='text-sm font-light'>{desc}</p>
            </div>
        </div>

    </>
  )
}

export default Heading