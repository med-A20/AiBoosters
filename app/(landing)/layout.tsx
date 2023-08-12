import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <main className='w-screen min-h-screen bg-[#111]'>
        <div>
            { children }
        </div>
    </main>
  )
}

export default layout