import Image from 'next/image'
import React from 'react'

const Empty = ({text} :any) => {
    return (
        <div className='flex flex-col items-center'>
            <div className='w-72 h-72 relative'>

                <Image 
                    alt ="empty"
                    src ={'/empty.png'}
                    fill
                />
            </div>
        <p className='text-sm italic text-muted-foreground'>{text}</p>
        </div>
    )
}

export default Empty