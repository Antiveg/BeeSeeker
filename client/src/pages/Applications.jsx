import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets, jobsApplied } from '../assets/assets'
import axios from 'axios'

const Applications = () => {
 
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userScholarships, setUserScholarships] = useState([])

  useEffect(() => {
    const getUserScholarships = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:5000/scholarship/user', {
          withCredentials: true
        })
        setUserScholarships(response.data.userScholarships)
      }catch(error) {
        console.log('Error in getting user scholarships', error.name)
      }finally {
        setLoading(false)
      }
    }
    getUserScholarships()
  }, [])

  return (
    <div>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10 pt-20'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isEdit ? <>
            <label className='flex items-center' htmlFor="resumeUpload">
              <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>Select Resume</p>
              <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
              <img src={assets.profile_upload_icon} alt="" />
            </label>
            <button onClick={e=>setIsEdit(false)} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
              
            </>
            : <div className='flex gap-2'>
              <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href="">
                Resume
              </a>
              <button onClick={()=>setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>
                Edit
              </button>
            </div>
          }
        </div>
          <h2 className='text-xl font-semibold mb-4'>Job Applied</h2>
          <table className='min-w-full bg-white border rounded-lg'>
            <thead>
              <tr>
                <th className='py-3 px-4 border-b text-left'>Company</th>
                <th className='py-3 px-4 border-b text-left'>Title</th>
                <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
                <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
                <th className='py-3 px-4 border-b text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              {userScholarships.map((scholarship) => (
                <tr key={scholarship.id}> 
                  <td className='py-3 px-4 flex items-center gap-2 border-b'>
                    <img className='w-8 h-8' src={scholarship.Scholarship.Provider.Organization.logo} alt="" />
                    {scholarship.Scholarship.Provider.Organization.name}
                  </td>
                  <td className='py-2 px-4 border-b'>{scholarship.Scholarship.title}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{scholarship.Scholarship.Location.name}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{scholarship.Scholarship.deadline}</td>
                  <td className='py-2 px-4 border-b'>  
                    {scholarship.isaccepted === true &&
                      <span className='px-4 py-1.5 rounded inline-block bg-green-100 text-green-800'>Accepted</span>
                    }
                    {scholarship.isaccepted === false &&
                      <span className='px-4 py-1.5 rounded inline-block bg-red-100 text-red-800'>Rejected</span>
                    }
                    {scholarship.isaccepted === null &&
                      <span className='px-4 py-1.5 rounded inline-block bg-blue-100 text-blue-800'>Pending</span>
                    }
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      <Footer />
    
    </div>
  )
}

export default Applications