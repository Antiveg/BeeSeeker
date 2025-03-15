import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const ViewApplication = () => {

    const [loading, setLoading] = useState(false)
    const { scholarships, user } = useContext(AppContext)
    const [refresh, setRefresh] = useState(false)
    const [providerScholarships, setProviderScholarships] = useState([])
  
    const recruiterScholarships = scholarships.filter(scholarship => scholarship.Provider.userid === user.id)

    useEffect(() => {
      try {
        const getApplicantsDetails = async () => {
          setLoading(true)
          const response = await axios.get(`http://localhost:5000/scholarships/provider/${user.provider_id}`, {
            withCredentials: true
          })
          setProviderScholarships(response.data.scholarships)
        }
        getApplicantsDetails()
      }catch(error){
        console.log('Error fetching provider scholarships', error)
      }finally{
        setLoading(false)
      }
    }, [refresh])

    if(loading){
      return <div>Loading...</div>
    }
    
    const handleChange = async (e, sid, uid) => {
      try {
        const response = await axios.put(`http://localhost:5000/user/${uid}/scholarship/${sid}`, {
          isaccepted : (e.target.value === "true") ? true : (e.target.value === "false") ? false : null
        }, {
          withCredentials: true
        })
        setRefresh(!refresh)
      }catch(error){
        console.log("Error editing user accepted status", error)
      }
    }

    // console.log(providerScholarships)
  
    return (
      <>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left'>#</th>
              <th className='py-3 px-4 border-b text-left'>Applicant</th>
              <th className='py-3 px-4 border-b text-left'>Scholarship Title</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left'>Resume</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
          {providerScholarships <= 0 && "No scholarship applicant yet ..."}
          {(() => {
            let counter = 1
            return providerScholarships.map((scholarship) =>
              scholarship.users?.map((user) => (
                <tr key={`${scholarship.id}-${user.id}`}>
                  <td className='py-6 px-4 gap-2 border-b'>{counter++}</td>
                  <td className='py-6 px-4 gap-2 border-b'>{user.name}</td>
                  <td className='py-6 px-4 gap-2 border-b'>{scholarship.title}</td>
                  <td className='py-6 px-4 border-b'>{scholarship.location}</td>
                  <td className='py-6 px-4 border-b max-sm:hidden'>
                  <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href={user.resume}>Resume</a>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      className={`px-4 py-1.5 rounded inline-block  
                        ${user.isaccepted === null ? "bg-blue-100 text-blue-800" : user.isaccepted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      value={user.isaccepted === null ? "null" : user.isaccepted}
                      onChange={(e) => handleChange(e, scholarship.id, user.id)}
                    >
                      {user.isaccepted === null && <option value="null" className="text-blue-800">Pending</option>}
                      <option value="true" className="text-green-800">Accepted</option>
                      <option value="false" className="text-red-800">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            )
          })()}
          </tbody>
        </table>
      </>
    )
}

export default ViewApplication