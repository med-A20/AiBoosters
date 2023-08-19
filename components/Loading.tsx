import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen md:min-h-[20rem] md:min-w-[24rem] flex flex-col justify-center items-center'>
      <div className='relative w-20 h-20 border-b-2 border-l-2 border-rose-400 rounded-full animate-spin'>
        {/* <Image 
          src="/logo.png"
          alt="loading..."
          fill
        /> */}
      </div>
    </div>
  )
}

export default Loading