import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Navbar */}
            <div className='bg-white shadow-md h-[50px] flex items-center justify-between px-4'>
                <img
                    onClick={() => navigate('/')}
                    src={assets.logo}
                    className='h-8 w-8 cursor-pointer'
                />
                <div className='flex items-center gap-3'>
                    <p className='text-gray-700 text-sm max-sm:hidden'>Welcome, baby</p>
                    <div className='flex items-center gap-2 relative group'>
                        <img src={assets.company_icon} className='w-6 h-6' />
                        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                            <ul className='list-none m-0 p-2 bg-white rounded-md text-sm shadow-xl'>
                                <li className='py-1 px-2 pr-10 cursor-pointer text-red-600 hover:text-red-800 text-sm'>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar + Content */}
            <div className='flex items-start'>
                {/* Sidebar */}
                <div className='inline-block min-h-screen border-r-2'>
                    <ul className='flex flex-col items-start text-gray-800 gap-4 p-4'>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 
                                 ${isActive ? 'bg-blue-200 border-r-4 border-blue-500' : ''}`
                            }
                            to='/dashboard/add-job'
                        >
                            <img className='min-w-4' src={assets.add_icon} />
                            <p className='max-sm:hidden'>Add Job</p>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 
                                 ${isActive ? 'bg-blue-200 border-r-4 border-blue-500' : ''}`
                            }
                            to='/dashboard/manage-job'
                        >
                            <img className='min-w-4' src={assets.home_icon} />
                            <p className='max-sm:hidden'>Manage Job</p>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 
                                 ${isActive ? 'bg-blue-200 border-r-4 border-blue-500' : ''}`
                            }
                            to='/dashboard/view-application'
                        >
                            <img className='min-w-4' src={assets.person_tick_icon} />
                            <p className='max-sm:hidden'>View Application</p>
                        </NavLink>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className='flex-1 p-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
