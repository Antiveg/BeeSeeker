import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const ManageJobs = () => {

  const [loading, setLoading] = useState(false)
  const { scholarships, user } = useContext(AppContext)
  const [isChecked, setIsChecked] = useState(true)

  const recruiterScholarships = scholarships.filter(scholarship => scholarship.Provider.userid === user.id);

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
                    checked={isChecked}
                    onClick={e => setIsChecked()}
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