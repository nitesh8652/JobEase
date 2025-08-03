import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'

const RecuterLogin = () => {
    const [state, setstate] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassowrd] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('False')
    const [data, setdata] = useState('False')

    return (
        <>

            <form>

                <h1>
                    Recruiter {state}
                </h1>
                <p> Please Sign In To Continue </p>

                <>

                    <div>
                        <img src={assets.person_icon} />
                        <input onchange={e => setName(e.target.value)} value={name} type="text" placeholder='Company Name ' required />
                    </div>

                    <div>
                        <img src={assets.email_icon} />
                        <input onchange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Company Email' required />
                    </div>

                    <div>
                        <img src={assets.lock_icon} />
                        <input onchange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
                    </div>
                
                </>

        <button>
            {state === 'Login'? 'Login' : "create account"}
        </button>

            </form>

        </>
    )
}

export default RecuterLogin