import React, { useEffect, useState, useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';
import { LogOutIcon, MenuIcon, NotebookPen, PercentSquareIcon, PlusSquare } from 'lucide-react';
import Footer from '../Components/Footer';


const Dashboard = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

    // Logout function
    const logout = () => {
        setCompanyToken(null);
        localStorage.removeItem('companyToken');
        setCompanyData(null);
        navigate('/');
    };



    return (
        <div className='min-h-screen bg-gray-50 flex flex-col'>
            {/* Top Navbar */}
            <div className='bg-white shadow-md h-[60px] flex items-center justify-between px-4 sm:px-6 z-50 relative'>
                <img
                    onClick={() => navigate('/')}
                    src={assets.suitcaselogo}
                    className='h-8 w-8 cursor-pointer'
                    alt="Logo"
                />

                {companyData && (
                    <div className='flex items-center gap-3'>
                        <p className='text-gray-700 text-2xl font-semibold hidden md:block'>
                            Welcome, {companyData.name}
                        </p>
                        <div className='flex items-center gap-2 relative group'>
                            <img
                                src={companyData.image}
                                className='w-28 h-10 border rounded-[8px] border-gray-200 object-contain bg-white p-1 shadow-2xl'
                                alt="Profile"
                            />



                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar + Main Content Layout */}
            <div className='flex-1 flex relative overflow-hidden'>


                {/* Mobile Menu Overlay Background */}
                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 sm:hidden transition-opacity"
                        onClick={() => setMenuOpen(false)}
                    />
                )}



                {/* Sidebar Drawer */}
                <div className={`
                    absolute sm:static top-0 left-0 h-full z-50 bg-white border-r-2
                    transition-transform duration-300 ease-in-out
                    ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
                    sm:translate-x-0 w-64 sm:w-auto md:w-64 min-h-[calc(100vh-60px)]
                `}>
                    <ul className='flex flex-col gap-2 p-4 pt-6 sm:pt-4 text-gray-800'>

                        {/* Mobile Close Button (Optional, good for UX) */}
                        <li className="sm:hidden flex items-center justify-between mb-4 px-2">

                            <span className="text-lg font-semibold text-gray-800">
                                Menu
                            </span>

                            <button
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-500 hover:text-gray-800 text-2xl font-bold p-1 rounded-md transition-colors"
                            >
                                &times;
                            </button>

                        </li>

                        <NavLink
                            to='/dashboard/add-job'
                            onClick={() => setMenuOpen(false)} // Closes menu on mobile when clicked
                            className={({ isActive }) =>
                                `flex items-center p-3 sm:px-4 gap-3 w-full rounded-lg sm:rounded-none sm:border-r-4 transition-all
                                 hover:bg-blue-50 hover:text-blue-600 
                                 ${isActive ? 'bg-blue-100 sm:bg-blue-50 border-blue-600 text-blue-600 font-medium' : 'border-transparent text-gray-600'}`
                            }
                        >
                            <PlusSquare className='w-5 h-5 shrink-0' />
                            {/* Text shows on Mobile overlay OR Desktop. Hides on Tablet (sm) */}
                            <span className='sm:hidden md:block whitespace-nowrap'>Add Job</span>
                        </NavLink>

                        <NavLink
                            to='/dashboard/manage-job'
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center p-3 sm:px-4 gap-3 w-full rounded-lg sm:rounded-none sm:border-r-4 transition-all
                                 hover:bg-blue-50 hover:text-blue-600 
                                 ${isActive ? 'bg-blue-100 sm:bg-blue-50 border-blue-600 text-blue-600 font-medium' : 'border-transparent text-gray-600'}`
                            }
                        >
                            <PercentSquareIcon className='w-5 h-5 shrink-0' />
                            <span className='sm:hidden md:block whitespace-nowrap'>Manage Job</span>
                        </NavLink>

                        <NavLink
                            to='/dashboard/view-application'
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center p-3 sm:px-4 gap-3 w-full rounded-lg sm:rounded-none sm:border-r-4 transition-all
                                 hover:bg-blue-50 hover:text-blue-600 
                                 ${isActive ? 'bg-blue-100 sm:bg-blue-50 border-blue-600 text-blue-600 font-medium' : 'border-transparent text-gray-600'}`
                            }
                        >
                            <NotebookPen className='w-5 h-5 shrink-0' />
                            <span className='sm:hidden md:block whitespace-nowrap'>View Application</span>
                        </NavLink>
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 w-full px-3 py-2.5 sm:px-4 
                                        rounded-lg sm:rounded-md 
                                        text-gray-600 hover:bg-red-50 hover:text-red-600 
                                        transition-all duration-200"
                        >
                            <LogOutIcon className="w-5 h-5 shrink-0" />
                            <span className=" whitespace-nowrap">Logout</span>
                        </button>
                    </ul>
                </div>

                {/* Main Dynamic Content Area */}
                <div className='flex-1 h-[calc(100vh-60px)] overflow-y-auto bg-gray-50 flex flex-col w-full'>

                    {/* Mobile Hamburger Header (Only visible on small screens) */}
                    <div className='sm:hidden bg-white shadow-sm border-b p-4 flex items-center'>
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none transition-colors"
                        >
                            <MenuIcon className='w-6 h-6' />
                        </button>
                        <h1 className="ml-4 font-semibold text-gray-800 text-lg">Dashboard</h1>
                    </div>

                    {/* Outlet renders AddJob, ManageJob, etc. */}
                    <div className='p-4 sm:p-6 w-full max-w-full overflow-y-auto'>
                        <Outlet />
                    </div>
                </div>

            </div>
            {/* <Footer/> */}
            <Footer />
        </div>
    );
}

export default Dashboard;