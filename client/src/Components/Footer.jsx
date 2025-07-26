import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-[#1447E6] text-white">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between p-4">
                {/* Left: Logo + Site Name */}
                <div className="flex items-center gap-4">
                    <img
                        src={assets.logo}
                        alt="JobEase Logo"
                        className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-md"
                    />
                    {/* Change items-baseline to items-center here */}
                    <div className="flex items-center space-x-2">
                        <h1 className="text-lg sm:text-2xl font-bold">Nitesh</h1>
                        <span className="hidden sm:inline-block border-l border-white h-8"></span>
                        <h2 className="hidden sm:block text-lg sm:text-2xl font-light">All rights reserved</h2>
                    </div>
                </div>

                {/* Right: Connect Us Here */}
                <div className="mt-4 sm:mt-0">
                    <div className="inline-flex flex-col sm:flex-row items-center bg-amber-50 text-gray-800 rounded-lg p-2 sm:p-4 gap-2 sm:gap-4">
                        <span className="underline text-sm sm:text-base">Connect Us Here</span>
                        <div className="flex items-center gap-3">
                            <a href="https://facebook.com" aria-label="Facebook">
                                <img src={assets.facebook_icon} alt="" className="w-6 h-6" />
                            </a>
                            <a href="https://twitter.com" aria-label="X (Twitter)">
                                <img src={assets.twitter_icon} alt="" className="w-6 h-6" />
                            </a>
                            <a href="https://linkedin.com" aria-label="LinkedIn">
                                <img src={assets.linkedin_icon} alt="" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
