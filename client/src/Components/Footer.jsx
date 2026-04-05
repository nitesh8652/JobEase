import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-[#15163A] text-white mt-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6">

          {/* Left Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">

            <div className="flex items-center gap-3">
              <img
                src={assets.suitcaselogo}
                alt="JobEase Logo"
                className="w-9 h-9 bg-white rounded-full p-1.5 shadow object-contain"
              />

              <h1 className="text-lg font-bold tracking-wide">
                JobEase
              </h1>
            </div>

            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} JobEase. All rights reserved.
            </p>

          </div>

          {/* Right Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4">

            <span className="text-sm text-white/70 hidden sm:block">
              Connect with us
            </span>

            <div className="flex items-center gap-4">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-300 hover:scale-125"
              >
                <img
                  src={assets.facebook_icon}
                  alt="Facebook"
                  className="w-5 h-5 invert brightness-0"
                />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-300 hover:scale-125"
              >
                <img
                  src={assets.x_icon}
                  alt="Twitter"
                  className="w-5 h-5 invert brightness-0"
                />
              </a>

              <a
                href="https://www.linkedin.com/in/nitesh-salian-4792602a4/"
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-300 hover:scale-125"
              >
                <img
                  src={assets.linkedin_icon}
                  alt="LinkedIn"
                  className="w-5 h-5 invert brightness-0"
                />
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer