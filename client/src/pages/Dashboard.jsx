import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'

const Dashboard = () => {

    const navigate = useNavigate()

  return (
    <div className='min-h-screen'>
        
        {/* Navbar for Recruiter Panel */}
        <Navbar/>

        <div className='flex items-start pt-20'>
            {/* Left sidebar with option to add scholarship, manage scholarship, and view applications */}
            <div className='inline-block min-h-screen border-r-2'>
                <ul className='flex flex-col items-start pt-5 text-gray-800'>
                    <NavLink className={({isActive})=> ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
                        <img className='min-w-4' src={assets.add_icon} alt="" />
                        <p className='max-sm:hidden'>Add Scholarship</p>
                    </NavLink>

                    <NavLink className={({isActive})=> ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-job'}>
                        <img className='min-w-4' src={assets.home_icon} alt="" />
                        <p className='max-sm:hidden'>Manage Scholarships</p>
                    </NavLink>

                    <NavLink className={({isActive})=> ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-applications'}>
                        <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                        <p className='max-sm:hidden'>View Applications</p>
                    </NavLink>

               
                </ul>
            </div >

            {/* Content area for outlet */}
            <div className='flex-1 p-4'>  
            <Outlet />
            </div>
        </div>
    </div>
    
  )
}

export default Dashboard