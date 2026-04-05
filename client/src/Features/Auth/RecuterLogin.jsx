import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../Context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EyeClosed, EyeClosedIcon, EyeIcon } from 'lucide-react';
import Loading from '../../Components/Loading';


const RecuterLogin = () => {
    const navigate = useNavigate();

    const [state, setState] = useState('Login');
    const [resetStep, setResetStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [signupStep, setSignupStep] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);

            //  LOGIN 
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
                    navigate('/dashboard/add-job');
                } else {
                    toast.error(data.message);
                }
            }

            //  SIGN UP 
            else if (state === "Sign Up") {

                // Step 1: Just move to next step
                if (!signupStep) {
                    setSignupStep(true);
                    return;
                }

                // Step 2: Validation 
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

            //  FORGOT PASSWORD 
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
        }finally{
            setIsLoading(false);
        }
    };

  return (
    <div className="fixed inset-0 z-9999 backdrop-blur-sm bg-black/30 flex justify-center items-center px-4">
        
        {isLoading && <Loading />}

        <form
            onSubmit={onSubmitHandler}
            className="relative bg-white w-full max-w-md sm:max-w-lg p-6 sm:p-10 rounded-xl text-slate-500"
        >

            <h1 className="text-center text-xl sm:text-2xl text-neutral-700 font-medium">
                 {state}
            </h1>

            {/* ================= LOGIN + SIGNUP ================= */}
            {(state === "Login" || state === "Sign Up") && !signupStep && (
                <>
                    {state === "Sign Up" && (
                        <div className="border flex px-3 sm:px-4 py-2 items-center gap-2 rounded-full mt-4 sm:mt-5">
                            <img src={assets.person_icon} alt="" className="w-4 sm:w-5" />
                            <input
                                className="outline-none text-sm w-full"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                type="text"
                                placeholder="Company Name"
                                required
                            />
                        </div>
                    )}

                    <div className="border flex px-3 sm:px-4 py-2 items-center gap-2 rounded-full mt-4 sm:mt-5">
                        <img src={assets.email_icon} alt="" className="w-4 sm:w-5" />
                        <input
                            className="outline-none text-sm w-full"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            placeholder="Company Email"
                            required
                        />
                    </div>

                    <div className="border flex px-3 sm:px-4 py-2 items-center gap-2 rounded-full mt-4 sm:mt-5">
                        <img src={assets.lock_icon} alt="" className="w-4 sm:w-5" />
                        <input
                            className="outline-none text-sm w-full"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                        />
                        {showPassword ? (
                            <EyeClosedIcon
                                className="text-gray-400 cursor-pointer"
                                size={18}
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <EyeIcon
                                className="text-gray-400 cursor-pointer"
                                size={18}
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                </>
            )}

            {/* SIGNUP STEP 2 */}
            {state === "Sign Up" && signupStep && (
                <div className="mt-5 flex flex-col sm:flex-row items-center gap-4 my-6 sm:my-10 text-center sm:text-left">
                    <label htmlFor="image">
                        <img
                            className="w-14 sm:w-16 rounded-full mx-auto sm:mx-0"
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt=""
                        />
                        <input
                            type="file"
                            hidden
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                    <p className="text-sm">Upload Company Logo</p>
                </div>
            )}

            {/* FORGOT PASSWORD */}
            {state === "Forgot Password" && resetStep === 1 && (
                <div className="border flex px-3 sm:px-4 py-2 items-center gap-2 rounded-full mt-5">
                    <img src={assets.email_icon} alt="" className="w-4 sm:w-5" />
                    <input
                        className="outline-none text-sm w-full"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
            )}

            {state === "Forgot Password" && resetStep === 2 && (
                <>
                    {[token, newPassword, confirmPassword].map((_, i) => (
                        <div key={i} className="border flex px-3 sm:px-4 py-2 items-center gap-2 rounded-full mt-4">
                            <input
                                className="outline-none text-sm w-full"
                                value={[token, newPassword, confirmPassword][i]}
                                onChange={(e) =>
                                    [setToken, setNewPassword, setConfirmPassword][i](e.target.value)
                                }
                                type={i === 0 ? "text" : "password"}
                                placeholder={
                                    i === 0
                                        ? "Enter token"
                                        : i === 1
                                            ? "New Password"
                                            : "Confirm Password"
                                }
                                required
                            />
                        </div>
                    ))}
                </>
            )}

            {/* Forgot link */}
            {state === "Login" && (
                <p
                    onClick={() => {
                        setState("Forgot Password");
                        setResetStep(1);
                    }}
                    className="cursor-pointer text-xs sm:text-sm text-blue-600 my-4 text-center"
                >
                    Forgot Password?
                </p>
            )}

            {/* Button */}
            <button
                type="submit"
                className="bg-blue-600 w-full text-white py-2.5 rounded-full mt-5 text-sm sm:text-base"
            >
                {state === "Login"
                    ? "Login"
                    : state === "Sign Up"
                        ? signupStep ? "Create Account" : "Next"
                        : resetStep === 1 ? "Send Token" : "Reset Password"}
            </button>

            {/* Toggle */}
            <p className="mt-4 text-center text-xs sm:text-sm">
                {state !== "Forgot Password" ? (
                    <>
                        {state === "Login"
                            ? "Don't have an account?"
                            : "Already have an account?"}
                        <span
                            className="text-blue-600 cursor-pointer ml-1"
                            onClick={() => {
                                setState(state === "Login" ? "Sign Up" : "Login");
                                setSignupStep(false);
                            }}
                        >
                            {state === "Login" ? "Sign Up" : "Login"}
                        </span>
                    </>
                ) : (
                    <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => setState("Login")}
                    >
                        Back to Login
                    </span>
                )}
            </p>

            {/* Close Button */}
            <img
                onClick={() => setShowRecruiterLogin(false)}
                className="absolute top-4 right-4 w-4 sm:w-5 cursor-pointer"
                src={assets.cross_icon}
                alt=""
            />
        </form>
    </div>
);  
};

export default RecuterLogin;