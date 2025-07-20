import React from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext'
import { useContext, useRef } from 'react'

const Banner = () => {

    const { setSearchFilter, setsearched } = useContext(AppContext)
    const titleref = useRef(null)
    const locationref = useRef(null)

    const onSearch =()=>{
        setSearchFilter({
            title:titleref.current.value,
            location:locationref.current.value
        })
        setsearched(true)
        console.log("search", {
            title:titleref.current.value,
            location:locationref.current.value
        })
    }

    return (
        <div className='container 2xl:px-20 mx-auto my-10 text-center '>

            <div className='bg-gradient-to-br from-[#062759] via-[#0576A7] to-[#0288AB] rounded-[6px] py-15 px-10 text-white  '>
                <h3 className='text-2xl md:text3xl lg:text-4xl font-medium'> Over 5,000+ Jobs Available </h3>
                <p className='text-sm font-light mx-auto px-10 py-5 max-w-xl' >  
                    Your Dream Job Awaits You! Build Your Resume With JobEase. And Path Your Career.
                    </p>
                <div className='flex items-center justify-center gap-4 max-sm:flex-col max-sm:gap-2'>
                    <div className='flex items-center gap-2 max-sm:flex-col max-sm:gap-1 pl-4 mx-4 bg-white px-4 rounded-3xl'>
                        <img src={assets.search_icon} />

                        <input type="text"
                            placeholder='Search for Jobs'
                            className='max-sm:text-xs px-8 py-2 rounded w-full outline-none bg-white text-gray-400' 
                            ref={titleref}/>

                    </div>
                    <div className='flex items-center gap-2 max-sm:flex-col max-sm:gap-1 bg-white px-4 rounded-3xl'>
                        <img src={assets.location_icon} />

                        <input type="text"
                            placeholder='Location'
                            className='max-sm:text-xs px-8 py-2 rounded w-full outline-none bg-white text-gray-400' 
                            ref={locationref}/>

                    </div>
                    <button onClick={e => onSearch()} className='bg-[#032252] px-5 py-2 rounded-[12px]'> Search </button>
                </div>
            </div>

            <div className="trustedby mt-10 shadow-2xl p-4 rounded-[12px] flex flex-col gap-16">
                <h4 className="text-2xl font-medium text-center mb-4">Trusted By</h4>

                <div className="flex flex-wrap items-center justify-around gap-4">
                    <img className="h-[30px]" src={assets.microsoft_logo} alt="Microsoft" />
                    <img className="h-[30px]" src={assets.walmart_logo} alt="Walmart" />
                    <img className="h-[30px]" src={assets.adobe_logo} alt="Adobe" />
                    <img className="h-[35px]" src={assets.accenture_logo} alt="Accenture" />
                    <img className="h-[35px]" src={assets.samsung_logo} alt="Samsung" />
                </div>
            </div>
        </div>
    )
}

export default Banner
