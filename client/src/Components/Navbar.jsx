import React from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import {Link} from 'react-router-dom'

const Navbar = () => {

    const { openSignIn } = useClerk()
    const { user } = useUser()


    return (
        <div className="bg-[#ffffff] h-16 flex items-center justify-between px-4 shadow py-4">
            <img src={assets.logo} style={{ width: '220px', height: '213px' }} />

            {
                user ? <div className="flex items-center gap-4">
                    <Link to={'/application'}> Applied Jobs </Link>
                    <button className="bg-gradient-to-r from-[#00b3b3] to-[#00b3e6] text-white px-4 py-2 rounded"> Resume Builder </button>
                    <UserButton />
                </div> :
                <div className='flex items-center gap-8 max-sm:text-xs'>
                    <button> Recruiter Login </button>
                    <button onClick={e => openSignIn()} className="bg-blue-500 text-white px-6 sm:px-9 py-2 rounded-full"> Login </button>
                </div>
            }


        </div>
    )
}

export default Navbar
