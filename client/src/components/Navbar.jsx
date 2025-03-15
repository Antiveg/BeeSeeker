import React, { useContext, useState } from 'react';  
import { assets } from '../assets/assets';  
// import { useClerk, UserButton, useUser } from '@clerk/clerk-react';  
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios'

const Navbar = () => {  
    // const { openSignIn } = useClerk();  
    const navigate = useNavigate()

    const { user, setUser, setShowLogin } = useContext(AppContext)

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/auth/logout', {}, {
                withCredentials: true
            })
            if(response.status === 200){
                setUser(null)
                localStorage.removeItem('user')
                navigate('/')
            }
        }catch(error) {
            console.log('Failed to logout...', error)
        }
    }

    // console.log(user)

    return (  
        <div className='fixed top-0 left-0 right-0 shadow py-4 h-20 bg-white z-50'>  
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>  
            <img onClick={()=>navigate('/')} src={assets.logo} alt="Logo" className="cursor-pointer h-10 w-auto" />     
                {
                    user ? (  
                        <div className="flex items-center gap-3">  
                            { user.role === "User" ?
                                <Link to="/applications" className='text-gray-600'>My Profile & Applied Scholarships</Link> :
                                <div className="flex flex-row items-center gap-3">
                                    <Link to="/dashboard/manage-job" className='text-gray-600'>Recruiter Dashboard</Link>
                                    <img 
                                    src={user.organization_logo} 
                                    alt="No Image" 
                                    className="w-10 h-10 object-cover rounded-full border border-gray-300 shadow-sm"/>
                                </div>
                            }  
                            <span className="mx-2">|</span>  
                            <p className='max-sm:hidden'>Hi, {user.name}</p>
                            <button className='border border-gray-500 text-gray-500 bg-transparent px-2 rounded' onClick={e => logout()}>Logout</button>
                        </div>  
                    ) : (  
                        <div className='flex gap-4 max-sm:text-xs'>  
                            <button onClick={e => setShowLogin(true)} className='text-gray-600'>Login</button>  
                        </div>  
                    )  
                }  
            </div>  
        </div>  
    );  
}  

export default Navbar;  