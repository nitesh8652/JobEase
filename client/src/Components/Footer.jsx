import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className="flex justify-between bg-[#1447E6] py-4">
            
            <div className="flex items-center">
                <img
                    src={assets.mobileview}
                    alt="Logo"
                    className="w-16 bg-white rounded-bl-[20px] ml-4"
                />
                <h4 className="bg-white p-5 rounded-tr-[20px] rounded-br-[20px] text-gray-800">
                    Copyright Nitesh | All rights reserved.
                </h4>
            </div>

           
            <div className="flex items-center ">
                <div className="flex  items-center bg-amber-50 p-4 rounded-[20px] mr-4 gap-4">
                    <h4 className="underline text-gray-800  flex items-center">
                        Connect Us Here
                    </h4>
                    <div className="flex items-center gap-4">
                        <img
                            src={assets.linkedin_icon}
                            alt="Facebook"
                            className="w-6 h-6"
                            />
                        <img
                            src={assets.x_icon}
                            alt="X"
                            className="w-6 h-6"
                            />
                        <img
                            src={assets.facebook_icon}
                            alt="LinkedIn"
                            className="w-6 h-6"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
