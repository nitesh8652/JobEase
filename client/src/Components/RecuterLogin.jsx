import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'

const RecuterLogin = () => {
    const [state, setstate] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('False')
    const [data, setdata] = useState('False')

    return (
        <>
            <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">

                <form className='relative bg-white p-10 rounded-xl text-slate-500'>

                    <h1 className='text-center text-2xl text-neutral-700 font-medium '>
                        Recruiter {state}
                    </h1>
                    <p className='text-center text-sm text-neutral-500'> Please Sign In To Continue </p>

                    <>
                        {state !== "Login" && (

                            <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                                <img src={assets.person_icon} />
                                <input className='outline-none text-sm' onchange={e => setName(e.target.value)} value={name} type="text" placeholder='Company Name ' required />
                            </div>
                        )}

                        <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                            <img src={assets.email_icon} />
                            <input className='outline-none text-sm' onchange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Company Email' required />
                        </div>

                        <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                            <img src={assets.lock_icon} />
                            <input className='outline-none text-sm' onchange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />

                        </div>

                        <p className='cursor-pointer text-sm text-blue-600 my-5'>Forget Password?</p>


                    </>

                    <button className='bg-blue-600 w-full text-white py-2 rounded-full'>
                        {state === 'Login' ? 'Login' : "create account"}
                    </button>
                    {
                        state === 'Login'
                            ? <p>Don't Have Account <span>Sign Up</span> </p> :
                            <p>Already Have Account <span>Login</span> </p>  
                    }

                </form>
            </div>
        </>
    )
}

export default RecuterLogin