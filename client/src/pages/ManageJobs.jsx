import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const ManageJobs = () => {

  const [loading, setLoading] = useState(false)
  const { scholarships, user, setRefresh, refresh } = useContext(AppContext)

  const recruiterScholarships = scholarships.filter(scholarship => scholarship.Provider.userid === user.id)

  const handleChange = async (sid, isvisible) => {
    try {
      setLoading(true)
      const response = await axios.put(`http://localhost:5000/update/scholarship/${sid}`, {
        isvisible: isvisible
      }, {
        withCredentials: true,
      })
      setRefresh(!refresh)
    }catch(error){
      console.log('Error updating scholarship visibility')
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      <table className='min-w-full bg-white border rounded-lg'>
        <thead>
          <tr>
            <th className='py-3 px-4 border-b text-left'>#</th>
            <th className='py-3 px-4 border-b text-left'>Scholarship Title</th>
            <th className='py-3 px-4 border-b text-left'>Date Created</th>
            <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
            <th className='py-3 px-4 border-b text-left'>Visibility</th>
          </tr>
        </thead>
        <tbody>
          {recruiterScholarships <= 0 && "No scholarship made by you yet ..."}
          {recruiterScholarships.map((scholarship, index) => (
            <tr key={scholarship.id}>
              <td className='py-6 px-4 gap-2 border-b'>{index + 1}</td>
              <td className='py-6 px-4 gap-2 border-b'>{scholarship.title}</td>
              <td className='py-6 px-4 border-b'>{scholarship.createdAt}</td>
              <td className='py-6 px-4 border-b max-sm:hidden'>{scholarship.Location.name}</td>
              <td className='py-6 px-4 border-b max-sm:hidden'>
                <input 
                    type="checkbox" 
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={scholarship.isvisible}
                    onChange={(e) => handleChange(scholarship.id, e.target.checked)}
                />
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ManageJobs