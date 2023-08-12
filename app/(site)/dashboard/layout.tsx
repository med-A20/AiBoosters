import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React from 'react'

const DashboardLayout = ({children }:{children : React.ReactNode}) => {
  return (
    <div className='w-screen m-auto h-screen grid grid-cols-12'>
        {/* Side bar */}
        <section className='h-screen hidden md:block md:col-span-3'>
            <Sidebar />
        </section>

        {/* dashboard */}
        <section className='h-screen container px-0 overflow-y-auto  col-span-full md:col-span-9'>
            <main>
                <Navbar />
                <section className='px-3'>
                  { children }
                </section>
            </main>
        </section>
    </div>
  )
}

export default DashboardLayout;