import React from 'react'
import { assets } from '../assets/assets' 

// Mock assets for preview purposes. 
// In your local project, uncomment the import above and remove this const.
// const assets = {
//     logo: "https://via.placeholder.com/64/1447E6/FFFFFF?text=JobEase",
//     facebook_icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
//     x_icon: "https://cdn-icons-png.flaticon.com/512/5969/5969020.png",
//     linkedin_icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png"
// }


const Footer = () => {
  return (
    <div className="bg-[#1447E6] text-white py-3 mt-10">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left Side: Logo & Brand */}
        <div className="flex items-center gap-3">
          <img 
            src={assets.logo} 
            alt="Logo" 
            className="w-8 h-8 bg-white rounded-full p-1 shadow-sm object-contain"
          />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-wide">JobEase</h1>
            <span className="text-white/40">|</span>
            <p className="text-xs text-white/80 font-light">All rights reserved.</p>
          </div>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/70 hidden sm:block">Connect with us</span>
          <div className="flex gap-3">
            <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="transition-transform duration-300 hover:scale-125 hover:drop-shadow-lg"
            >
                <img src={assets.facebook_icon} alt="Facebook" className="w-5 h-5" />
            </a>
            <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="transition-transform duration-300 hover:scale-125 hover:drop-shadow-lg"
            >
                <img src={assets.x_icon} alt="Twitter" className="w-5 h-5 invert brightness-0" />
            </a>
            <a 
                href="https://www.linkedin.com/in/nitesh-salian-4792602a4/" 
                target="_blank" 
                rel="noreferrer"
                className="transition-transform duration-300 hover:scale-125 hover:drop-shadow-lg"
            >
                <img src={assets.linkedin_icon} alt="LinkedIn" className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Footer