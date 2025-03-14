import React from 'react'  
import { assets } from '../assets/assets';  
import { useNavigate } from 'react-router-dom';

const Footer = () => {  

  const navigate = useNavigate()

  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>   
      <div className='flex items-center gap-4'>  
       <img onClick={()=>navigate('/')} src={assets.logo} alt="Logo" className="cursor-pointer mb-3 h-10 relative w-auto" /> 
        <p className='flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>  
          Copyright @beeseeker.team | All right reserved.  
        </p>  
      </div>  
      <div className='flex gap-2.5'>  
        <img width={38} src={assets.facebook_icon} alt="Facebook" />  
        <img width={38} src={assets.instagram_icon} alt="Instagram" />  
        <img width={38} src={assets.twitter_icon} alt="Twitter" />  
      </div>
    </div>  
  )  
}  

export default Footer  