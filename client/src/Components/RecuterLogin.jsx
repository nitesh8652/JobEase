import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecuterLogin = () => {
    const navigate = useNavigate()
    const [state, setstate] = useState('Login'); // 'Login' or 'Sign Up'
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [data, setdata] = useState(false);
    const { setShowRecruiterLogin , backendUrl , setCompanyToken , setCompanyData } = useContext(AppContext);
    

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const onsubmithandler = async (e) => {
        e.preventDefault();
        if (state === "Sign Up" && !data) {
            setdata(true);
            return;
        }

        // Handle actual form submission
        if (state === 'Login') {
            console.log('Logging in:', { email, password });
        } else {
            console.log('Signing up:', { name, email, password, image });
        }

        try {
            
            if (state==="Login") {
                const {data} = await axios.post(backendUrl + '/api/company/login' , {email,password})
            
            if (data.success) {
                console.log(data)
                setCompanyData(data.company)
                setCompanyToken(data.token)
                localStorage.setItem('companyToken',data.token)
                setShowRecruiterLogin(false)
                navigate('/dashboard')
            } else{
                toast.error(data.message)
            }
            
            }

        } catch (error) {
            
        }

    };

    return (
        <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <form onSubmit={onsubmithandler} className='relative bg-white p-10 rounded-xl text-slate-500 w-96'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>
                    Recruiter {state}
                </h1>
                <p className='text-center text-sm text-neutral-500 mb-4'>Please Sign In To Continue</p>

                {/* Step 1: Sign Up fields */}
                {state === "Sign Up" && !data && (
                    <>
                        <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                            <img src={assets.person_icon} alt="person" />
                            <input
                                className='outline-none text-sm w-full'
                                onChange={e => setName(e.target.value)}
                                value={name}
                                type="text"
                                placeholder='Company Name'
                                required
                            />
                        </div>
                    </>
                )}

                {/* Common fields (Login + Sign Up) */}
                {!data && (
                    <>
                        <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                            <img src={assets.email_icon} alt="email" />
                            <input
                                className='outline-none text-sm w-full'
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder='Company Email'
                                required
                            />
                        </div>

                        <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                            <img src={assets.lock_icon} alt="lock" />
                            <input
                                className='outline-none text-sm w-full'
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder='Password'
                                required
                            />
                        </div>
                    </>
                )}

                {/* Step 2: Upload image */}
                {state === 'Sign Up' && data && (
                    <div className='mt-5 flex items-center gap-4 my-10'>
                        <label htmlFor='image' >
                            <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} />
                            <input

                                type="file"
                                hidden
                                id='image'
                                required
                                onChange={(e) => setImage(e.target.files[0])}
                                className='w-full text-sm'
                            />
                        </label>
                        <p>Upload Company Logo</p>
                    </div>
                )}

                {state === 'Login' && <p className='cursor-pointer text-sm text-blue-600 my-5 gap-10 text-center'>Forget Password?</p>}

                <button
                    type='submit'
                    className='bg-blue-600 w-full text-white py-2 rounded-full mt-6'
                >
                    {state === 'Login'
                        ? 'Login'
                        : data
                            ? "Create Account"
                            : 'Next'}
                </button>

                {/* Toggle login/sign-up */}
                {
                    state === 'Login' ? (
                        <p className='mt-4 text-center'>
                            Don't have an account?{' '}
                            <span
                                className='text-blue-600 cursor-pointer'
                                onClick={() => {
                                    setstate("Sign Up");
                                    setdata(false);
                                }}
                            >
                                Sign Up
                            </span>
                        </p>
                    ) : (
                        <p className='mt-4 text-center'>
                            Already have an account?{' '}
                            <span
                                className='text-blue-600 cursor-pointer'
                                onClick={() => {
                                    setstate("Login");
                                    setdata(false); // reset step
                                }}
                            >
                                Login
                            </span>
                        </p>
                    )
                }

                <img onClick={e => setShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} />

            </form>
        </div>
    );
};

export default RecuterLogin;
