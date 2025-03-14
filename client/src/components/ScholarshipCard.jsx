import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const ScholarshipCard = ({ job }) => {

  const navigate = useNavigate()

  return (
    <div className='border p-6 shadow rounded'>
        <div className='flex justify-between items-center'>
            <img className='h-8' src={job.Provider.Organization.logo} alt="Supported Image" />
        </div>
        <h4 className='font-medium text-xl mt-2 line-clamp-1'>{job.title}</h4>
        <div className='flex items-center gap-3 mt-2 text-xs overflow-x-auto scrollbar-hidden'>
            <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded whitespace-nowrap'>{job.Location.name}</span>
            <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded whitespace-nowrap'>{job.Education.name}</span>
            <span className='bg-yellow-50 border border-red-200 px-4 py-1.5 rounded whitespace-nowrap'>{job.Major.name}</span>
        </div>
        <p   
        className='text-gray-500 text-sm mt-4 line-clamp-4'>{job.description}</p>
        <div className='mt-4 flex gap-4 text-sm'>
            <button onClick={()=> {navigate(`/scholarship/${job.id}`); scrollTo(0,0)}} className='bg-blue-600 text-white px-4 py-2 rounded'>Apply Now</button>
            <button onClick={()=> {navigate(`/scholarship/${job.id}`); scrollTo(0,0)}} className='text-gray-500 border border-gray-500 rounded px-4 py-2'>Learn More</button>
        </div>
    </div>
  )
}

export default ScholarshipCard