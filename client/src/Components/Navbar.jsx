import React from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const Navbar = () => {

    const { openSignIn } = useClerk()
    const { user } = useUser()
    const navigate = useNavigate()
    const {setShowRecruiterLogin} = useContext(AppContext)

    return (
        <div className="bg-[#ffffff] h-16 flex items-center justify-between px-4 shadow py-4">
            <div className="block sm:hidden">
                <img onClick={() => navigate('/')} src={assets.mobileview} className='w-[50%] h-[50%]  ' />
            </div>

            <div className="hidden sm:block">
                <img onClick={() => navigate('/')} src={assets.logo} className='w-[220px] h-[213px] cursor-pointer' />
            </div>

            {
                user ? <div className="flex items-center gap-2 text-sm">
                    <Link to={'/application'} className="whitespace-nowrap"> Applied Jobs </Link>
                    <button className="bg-gradient-to-r from-[#00b3b3] to-[#00b3e6] text-white px-3 py-2 rounded whitespace-nowrap max-sm:px-[3px]"> Resume Builder </button>
                    <UserButton />
                </div> :
                    <div className='flex items-center gap-8 max-sm:text-xs'>
                        <button onClick={e=> setShowRecruiterLogin(true)} className=' whitespace-nowrap '> Recruiter Login </button>
                        <button onClick={e => openSignIn()} className="bg-blue-500 text-white px-6 sm:px-9 py-2 rounded-full md:px-[3px]"> Login </button>
                    </div>
            }


        </div>
    )
}

export default Navbar
