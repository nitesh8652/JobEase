import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecuterLogin = () => {
    const navigate = useNavigate();

    const [state, setState] = useState('Login');
    const [resetStep, setResetStep] = useState(1);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [signupStep, setSignupStep] = useState(false);

    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            // ================= LOGIN =================
            if (state === "Login") {
                const { data } = await axios.post(
                    backendUrl + '/api/company/login',
                    { email, password }
                );

                if (data.success) {
                    setCompanyData(data.company);
                    setCompanyToken(data.token);
                    localStorage.setItem('companyToken', data.token);
                    setShowRecruiterLogin(false);
                    navigate('/dashboard');
                } else {
                    toast.error(data.message);
                }
            }

            // ================= SIGN UP =================
            else if (state === "Sign Up") {

                // Step 1: Just move to next step
                if (!signupStep) {
                    setSignupStep(true);
                    return;
                }

                // Step 2: Validation (FIXED: Manual check instead of 'required' attribute)
                if (!image) {
                    toast.error("Please upload a company logo");
                    return;
                }

                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('image', image);

                const { data } = await axios.post(
                    backendUrl + '/api/company/register',
                    formData
                );

                if (data.success) {
                    setCompanyData(data.company);
                    setCompanyToken(data.token);
                    localStorage.setItem('companyToken', data.token);
                    setShowRecruiterLogin(false);
                    navigate('/dashboard');
                } else {
                    toast.error(data.message);
                }
            }

            // ================= FORGOT PASSWORD =================
            else if (state === "Forgot Password") {

                // STEP 1 → Send token
                if (resetStep === 1) {
                    const { data } = await axios.post(
                        backendUrl + '/api/company/forgot-password',
                        { email }
                    );

                    if (data.success) {
                        toast.success("Reset token sent to email");
                        setResetStep(2);
                    } else {
                        toast.error(data.message);
                    }
                }

                // STEP 2 → Verify token + reset
                else {
                    if (newPassword !== confirmPassword) {
                        toast.error("Passwords do not match");
                        return;
                    }

                    const { data } = await axios.post(
                        backendUrl + '/api/company/reset-password',
                        { email, token, newPassword }
                    );

                    if (data.success) {
                        toast.success("Password reset successfully");
                        setState('Login');
                        setResetStep(1);
                        setEmail('');
                        setToken('');
                        setNewPassword('');
                        setConfirmPassword('');
                    } else {
                        toast.error(data.message);
                    }
                }
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
     <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/30 flex justify-center items-center">

            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500 w-96'>

                <h1 className='text-center text-2xl text-neutral-700 font-medium'>
                    Recruiter {state}
                </h1>

                {/* ================= LOGIN + SIGNUP FIELDS ================= */}

                {(state === "Login" || state === "Sign Up") && !signupStep && (
                    <>
                        {state === "Sign Up" && (
                            <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                                <img src={assets.person_icon} alt="" />
                                <input
                                    className='outline-none text-sm w-full'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    type="text"
                                    placeholder='Company Name'
                                    required
                                />
                            </div>
                        )}

                        <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                            <img src={assets.email_icon} alt="" />
                            <input
                                className='outline-none text-sm w-full'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                placeholder='Company Email'
                                required
                            />
                        </div>

                        <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                            <img src={assets.lock_icon} alt="" />
                            <input
                                className='outline-none text-sm w-full'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                placeholder='Password'
                                required
                            />
                        </div>
                    </>
                )}

                {/* SIGNUP STEP 2 */}
                {state === "Sign Up" && signupStep && (
                    <div className='mt-5 flex items-center gap-4 my-10'>
                        <label htmlFor='image'>
                            <img
                                className='w-16 rounded-full'
                                src={image ? URL.createObjectURL(image) : assets.upload_area}
                                alt=""
                            />
                            <input
                                type="file"
                                hidden
                                id='image'
                                // FIXED: Removed 'required' attribute to fix hidden input blocking submission
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </label>
                        <p>Upload Company Logo</p>
                    </div>
                )}

                {/* ================= FORGOT PASSWORD ================= */}

                {state === "Forgot Password" && resetStep === 1 && (
                    <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                        <img src={assets.email_icon} alt="" />
                        <input
                            className='outline-none text-sm w-full'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                )}

                {state === "Forgot Password" && resetStep === 2 && (
                    <>
                        <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                            <input
                                className='outline-none text-sm w-full'
                                value={token}
                                onChange={e => setToken(e.target.value)}
                                type="text"
                                placeholder='Enter token from email'
                                required
                            />
                        </div>

                        <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                            <input
                                className='outline-none text-sm w-full'
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                type="password"
                                placeholder='New Password'
                                required
                            />
                        </div>

                        <div className='border flex px-4 py-2 items-center gap-2 rounded-full mt-5'>
                            <input
                                className='outline-none text-sm w-full'
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                type="password"
                                placeholder='Confirm Password'
                                required
                            />
                        </div>
                    </>
                )}

                {/* ================= FORGOT PASSWORD LINK ================= */}

                {state === "Login" && (
                    <p
                        onClick={() => {
                            setState("Forgot Password");
                            setResetStep(1);
                        }}
                        className='cursor-pointer text-sm text-blue-600 my-5 text-center'
                    >
                        Forgot Password?
                    </p>
                )}

                <button
                    type='submit'
                    className='bg-blue-600 w-full text-white py-2 rounded-full mt-6'
                >
                    {state === "Login"
                        ? "Login"
                        : state === "Sign Up"
                            ? signupStep ? "Create Account" : "Next"
                            : resetStep === 1 ? "Send Token" : "Reset Password"}
                </button>

                {/* Toggle */}

                {state !== "Forgot Password" ? (
                    <p className='mt-4 text-center'>
                        {state === "Login" ? "Don't have an account?" : "Already have an account?"}
                        <span
                            className='text-blue-600 cursor-pointer ml-1'
                            onClick={() => {
                                setState(state === "Login" ? "Sign Up" : "Login");
                                setSignupStep(false);
                            }}
                        >
                            {state === "Login" ? "Sign Up" : "Login"}
                        </span>
                    </p>
                ) : (
                    <p className='mt-4 text-center'>
                        <span
                            className='text-blue-600 cursor-pointer'
                            onClick={() => setState("Login")}
                        >
                            Back to Login
                        </span>
                    </p>
                )}

                <img
                    onClick={() => setShowRecruiterLogin(false)}
                    className='absolute top-5 right-5 cursor-pointer'
                    src={assets.cross_icon}
                    alt=""
                />
            </form>
        </div>
    );
};

export default RecuterLogin;