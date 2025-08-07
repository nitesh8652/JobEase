import React from 'react'
import { Outlet } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    
    const navigate = useNavigate();

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Navbar */}
            <div className='bg-white shadow-md h-[50px] flex items-center justify-between px-4'>
                <img onClick={() => navigate('/')} src={assets.logo} className='h-8 w-8 cursor-pointer' />
                <div className='flex items-center gap-3'>
                    <p className='text-gray-700 text-sm max-sm:hidden'>Welcome, baby</p>
                    <div className='flex items-center gap-2 relative group'>
                        <img src={assets.company_icon} className='w-6 h-6' />
                        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 '>
                            <ul className='list-none m-0 p-2 bg-white rounded-md  text-sm shadow-xl'>
                                <li className=' py-1 px-2 pr-10 cursor-pointer text-red-600 hover:text-red-800 text-sm'>Logout</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            {/* Page Content */}
            <div className='p-4'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
