import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const Login = () => {

    const { setShowLogin, setUser } = useContext(AppContext)

    const [state, setState] = useState('Login')
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'User',
        organization_name: '',
        organization_logo: null,
    })

    const handleChange = (e) => {
        setMsg('')
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleFileChange = (e) => {
        if(e.target.files[0]){
            setFormData({
                ...formData,
                organization_logo: e.target.files[0],
            })
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if(state === 'Login'){
                const response = await axios.post('http://localhost:5000/auth/login', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                if(response.data.user !== null){
                    setUser(response.data.user)
                    setShowLogin(false)
                }
            }else if(state === 'Sign Up'){
                const response = await axios.post('http://localhost:5000/auth/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                })
                if(response.data.user !== null){
                    setState('Login')
                }
            }
        } catch (error) {
            setMsg("Wrong Credentials or User doesn't exist")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    })
    

  return (
    <div className='fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center' >
        <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl rext-slate-500">
            <h1 className='text-center text-2xl text-neutral-700 font-medium'> {state}</h1>
            <p className='text-sm'>Welcome back ! Please sign in to continue.</p>

            { state === 'Sign Up' &&
            <>
            <div className="mt-4">
                <div className="flex gap-4">
                    {/* User Role */}
                    <label className="flex items-center">
                        <input type="radio" name="role" value="User" checked={formData.role === 'User'} onChange={handleChange} className="mr-2"/> User
                    </label>
                    {/* Provider Role */}
                    <label className="flex items-center">
                        <input type="radio" name="role" value="Provider" checked={formData.role === 'Provider'} onChange={handleChange} className="mr-2" /> Provider
                    </label>
                </div>
            </div>

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.lock_icon} alt="" />
                <input name="name" className='outline-none text-sm' onChange={handleChange} value={formData.name} type="text" placeholder='Name' required/>
            </div>
            </>
            }

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.email_icon} alt="" />
                <input name="email" className='outline-none text-sm' onChange={handleChange} value={formData.email} type="email" placeholder='Email ID' required/>
            </div>

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.lock_icon} alt="" />
                <input name="password" className='outline-none text-sm' onChange={handleChange} value={formData.password} type="password" placeholder='Password' required/>
            </div>

            {state === "Sign Up" && formData.role === 'Provider' &&
            <>
            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.person_icon} alt="" />
                <input name="organization_name" className='outline-none text-sm' onChange={handleChange} value={formData.organization_name} type="text" placeholder='Company Name' required/>
            </div>

            <div className='flex items-center gap-4 mt-5'>
                <label htmlFor="image">
                    <img className='w-10 rounded-full' src={formData.organization_logo ? URL.createObjectURL(formData.organization_logo): assets.upload_area} alt="" />
                    <input onChange={handleFileChange} type="file" id='image' name="organization_logo" accept="image/*" hidden/>
                </label>
                <p>Upload Company Logo</p>
            </div>
            </> 
            }

            {state === "Login" && <p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forgot password</p>} 
            
            <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>
                {state === 'Login' ? 'login' : 'create account'}
            </button>

            { msg !== '' &&
                <p className='mt-5 text-center text-red-500'>{msg}</p>
            }

            { state === 'Login'
                ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=> setState("Sign Up")}>Sign up</span></p>
                :<p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=> setState("Login")}>Login</span></p>
            }
            
            <img onClick={e=> setShowLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
        </form>
    </div>
  )
}

export default Login