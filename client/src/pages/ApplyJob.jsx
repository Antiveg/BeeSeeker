import React, { useContext, useEffect, useState } from 'react'  
import { AppContext } from '../context/AppContext'  
import { useParams } from 'react-router-dom'  
import { assets } from '../assets/assets'  
import Navbar from '../components/Navbar'  
import moment from 'moment';  
import ScholarshipCard from '../components/ScholarshipCard'  
import Footer from '../components/Footer'
import axios from 'axios'

const ApplyJob = () => {  

    const {scholarships, setShowLogin, user } = useContext(AppContext)

    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [scholarship, setScholarship] = useState({})
    const [isApplied, setApplied] = useState(false)

    useEffect(() => {
        const getScholarshipDetails = async () => {
            try {
                setLoading(true)
                const userIdParam = user?.id ? `?userId=${user.id}` : '';
                const response = await axios.get(`http://localhost:5000/scholarship/detail/${id}${userIdParam}`);
                setScholarship(response.data.scholarship)
                setApplied(response.data.isapplied)
            } catch (error) {
                console.error('Error fetching scholarship details:', error);
            } finally {
                setLoading(false)
            }
        }
        getScholarshipDetails();
    }, [user])

    const handleApply = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/create/user/scholarship/${scholarship.id}`, {}, {
                withCredentials: true
            })
            setApplied(true)
        }catch(error) {
            console.log('Failed to apply for the scholarship')
            setShowLogin(true)
        }
    }
    
    if(loading){
        return <div>Loading...</div>
    }

    console.log(isApplied)

    return (  
        <>  
        <Navbar/>  
        <div className='min-h-screen bg-gray-50 flex flex-col px-4 md:px-8 py-10 container 2xl:px-20 mx-auto pt-28'>  
            <div className='bg-white shadow-lg rounded-lg overflow-hidden w-full'>   
                <div className='flex flex-col md:flex-row justify-between items-center p-6 md:p-8 bg-sky-50 border-b border-blue-200'>   
                    <div className='flex items-center space-x-4 mb-4 md:mb-0'>  
                        <img   
                        className='h-20 w-20 object-contain bg-white rounded-lg p-2 border shadow-sm'   
                        src={null}   
                        alt={`logo`}   
                        />  
                        <div>  
                            <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>{scholarship?.title}</h1>  
                            <div className='flex flex-wrap items-center space-x-4 text-gray-600 mt-2'>  
                                <span className='flex items-center space-x-1'>  
                                <img src={assets.suitcase_icon} alt="" className='w-4 h-4'/>  
                                <span>{scholarship?.Provider?.Organization?.name}</span>  
                                </span>  
                                <span className='flex items-center space-x-1'>  
                                <img src={assets.location_icon} alt="" className='w-4 h-4'/>  
                                <span>{scholarship?.Location?.name}</span>  
                                </span>  
                                <span className='flex items-center space-x-1'>  
                                <img src={assets.person_icon} alt="" className='w-4 h-4'/>  
                                <span>{scholarship?.Education?.name}</span>  
                                </span>  
                                <span className='flex items-center space-x-1'>  
                                <img src={assets.money_icon} alt="" className='w-4 h-4'/>  
                                <span>CTC: {scholarship?.funding}</span>  
                                </span>  
                            </div>  
                        </div>  
                    </div>  

                    <div className='flex flex-col items-center md:items-end'>  
                    <button className={`bg-blue-600 hover:bg-blue-700 transition-colors p-2.5 px-6 text-white rounded-md mb-2 shadow-md ${
                        isApplied ? "opacity-50 cursor-not-allowed" : ""
                    }`} onClick={handleApply} disabled={isApplied}>
                    {isApplied ? "Already Applied" : "Apply Now"}
                    </button>
                        <p className='text-sm text-gray-500'>  
                            Posted {scholarship?.createdAt}  
                        </p>  
                    </div>  
                </div>  
                <div className='flex flex-col lg:flex-row p-6 md:p-8 gap-8'>  
                    <div className='w-full lg:w-2/3'>
                        <h2 className='font-bold text-2xl mb-4'>Description</h2>  
                        <div className='rich-text' dangerouslySetInnerHTML={{__html: scholarship?.description}}></div>  
                        <button className={`bg-blue-600 p-2.5 px-10 text-white rounded mt-10 ${
                            isApplied ? "opacity-50 cursor-not-allowed" : ""
                        }`} onClick={handleApply} disabled={isApplied}>
                        {isApplied ? "Already Applied" : "Apply Now"}
                        </button>
                    </div>
                
                    <div className='w-full lg:w-1/3'>  
                        <h2 className='text-xl font-bold text-gray-800 mb-4'>  
                        More Scholarships
                        </h2>  
                        <div className='space-y-4'>  
                        {scholarships  
                            .filter(other => other?.id !== scholarship?.id)  
                            .slice(0, 4)  
                            .map((other, index) => (  
                                <ScholarshipCard key={index} job={other}/>  
                            ))  
                        }  
                        </div>  
                    </div>  
                </div>  
            </div>  
        </div>  
        <Footer />
        </>  
    )
}  

export default ApplyJob  