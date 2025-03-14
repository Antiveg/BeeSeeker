import React, { useContext, useEffect, useRef, useState } from 'react';  
import { assets } from '../assets/assets';  
import { AppContext } from '../context/AppContext';  
import axios from 'axios'

const Hero = () => {  
  const {setSearchFilter, setIsSearched} = useContext(AppContext)  

  const titleRef = useRef(null)  
  const locationRef = useRef(null)  
  const jobListingSectionRef = useRef(null)

  const [organizations, setOrganizations] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getOrganizationLogos = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:5000/organizations')
        setOrganizations(response.data.organizations)
      }catch(error) {
        console.log('Error in fetching organizations info...', error)
      }finally {
        setLoading(false)
      }
    }
    getOrganizationLogos()
  }, [])

  const onSearch = () => {  
    setSearchFilter({  
      title: titleRef.current.value,  
      location: locationRef.current.value   
    })  
  
    setIsSearched(true)  
  
    // Scroll to the next section  
    const jobListingSection = document.getElementById('job-listing');  
    if (jobListingSection) {  
      jobListingSection.scrollIntoView({   
        behavior: 'smooth',  
        block: 'start'  
      });  
    }  
  }  

  return (  
    <>  
      <div className='relative min-h-screen flex flex-col justify-center px-4 pt-10 sm:px-6 lg:px-8 pb-16'>  
        {/* Background Gradient */}  
        <div className='absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 opacity-90 z-0'></div>  
        
        {/* Subtle Animated Background Shapes */}  
        <div className='absolute inset-0 overflow-hidden opacity-20'>  
          <div className='absolute -top-20 -right-20 w-96 h-96 bg-blue-300 rounded-full animate-blob hidden md:block'></div>  
          <div className='absolute top-1/3 -left-20 w-80 h-80 bg-blue-400 rounded-full animate-blob animation-delay-2000 hidden md:block'></div>  
          <div className='absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full animate-blob animation-delay-4000 hidden md:block'></div>  
        </div>  

        <div className='container mx-auto relative z-10'>  
          <div className='text-white text-center'>  
            <h2 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight'>  
             Buzz Your Way to <span className='text-yellow-300'>Scholarships!</span>
            </h2>  
            <p className='mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-lg font-light px-2 md:px-5 text-blue-100'>  
             Discover Scholarships Tailored Just for You—Pave Your Path to Success
            </p>  
            
            <div className='flex flex-col md:flex-row items-center justify-center bg-white/10 backdrop-blur-lg rounded-xl max-w-4xl mx-auto p-2 border border-white/20 shadow-2xl'>   
              <div className='flex items-center flex-grow m-1 md:m-2 bg-white/10 rounded-lg px-2 md:px-4 py-2 md:py-3 w-full'>  
                <img className='h-4 md:h-6 mr-2 md:mr-3 opacity-70' src={assets.search_icon} alt="Search Icon" />  
                <input  
                  type="text"  
                  placeholder='Search for scholarships'  
                  className='text-white placeholder-blue-200 bg-transparent outline-none w-full text-sm md:text-lg'  
                  ref={titleRef}  
                />
              </div>
              
              <div className='flex items-center flex-grow m-1 md:m-2 bg-white/10 rounded-lg px-2 md:px-4 py-2 md:py-3 w-full'>  
                <img className='h-4 md:h-6 mr-2 md:mr-3 opacity-70' src={assets.location_icon} alt="Location Icon" />  
                <input  
                  type="text"  
                  placeholder='Location'  
                  className='px-1 text-white placeholder-blue-200 bg-transparent outline-none w-full text-sm md:text-lg'  
                  ref={locationRef}  
                />  
              </div>  
              
              <button   
                onClick={onSearch}   
                className='m-1 md:m-2 bg-yellow-500 hover:bg-yellow-600 transition-colors px-4 md:px-8 py-2 md:py-3 rounded-lg text-blue-900 font-semibold text-sm md:text-base'  
              >  
                Search  
              </button>  
            </div>   
          </div>  
        </div>  

        {/* Supported By Section */}  
        <div className='relative z-10 mt-8 md:mt-16'>  
          <div className='container mx-auto'>  
            <div className='bg-white backdrop-blur-lg rounded-xl p-4 md:p-6 max-w-4xl mx-auto shadow-lg'>  
              <div className='flex justify-center items-center gap-4 md:gap-8 flex-wrap'>  
                <p className='font-medium text-gray-800 text-sm md:text-base'>Supported by</p>  
                {organizations.map((organization, index) => (  
                  <img   
                    key={index}   
                    className='h-4 md:h-8 hover:scale-110 transition-all duration-300'   
                    src={organization.logo}   
                    alt="Supporter Logo"   
                  />  
                ))}  
              </div>  
            </div>  
          </div>  
        </div>  

        {/* Scroll Down Indicator */}  
        <div className='absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 text-center'>  
          <div className='animate-bounce'>  
            <svg   
              xmlns="http://www.w3.org/2000/svg"   
              className="h-6 w-6 md:h-10 md:w-10 text-white opacity-70"   
              fill="none"   
              viewBox="0 0 24 24"   
              stroke="currentColor"  
            >  
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />  
            </svg>  
          </div>  
        </div>  
      </div>  

      {/* Job Listing Section with Ref */}  
      <div ref={jobListingSectionRef} id="job-listing">  
        {/* Your Job Listing Component Goes Here */}  
      </div>  
    </>  
  );  
}  

export default Hero;  