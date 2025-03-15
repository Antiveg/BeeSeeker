import React, { useEffect, useRef, useState, useContext } from 'react'  
import { AppContext } from '../context/AppContext'
import Quill from 'quill'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddJob = () => {  

    const navigate = useNavigate()
    const { refresh, setRefresh } = useContext(AppContext)

    const editorRef = useRef(null)  
    const quillRef = useRef(null)
    
    const [Majors, setMajors] = useState([])
    const [Educations, setEducations] = useState([])
    const [Locations, setLocations] = useState([])
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        funding: 0,
        title: '',
        description: '',
        major: '',
        education: '',
        location: '',
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post('http://localhost:5000/create/scholarship', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setRefresh(!refresh)
            navigate('/dashboard/manage-job')
        }catch(error) {
            console.log("Error creating new scholarship...")
        }finally {
            setLoading(false)
        }
    }

    useEffect(()=>{  
        // initiate quill once  
        if (!quillRef.current && editorRef.current) {  
            quillRef.current = new Quill(editorRef.current, {  
                theme: 'snow',  
            })  
            quillRef.current.on("text-change", () => {
                setFormData((prevData) => ({
                    ...prevData,
                    description: quillRef.current.root.innerHTML,
                    // description: quillRef.current.getText(),
                }));
            });
        }  
    }, [])  

    useEffect(() => {
        const getMajors = async () => {
            try {
                setLoading(true)
                const MajorsRequest = axios.get('http://localhost:5000/majors')
                const EducationsRequest = axios.get('http://localhost:5000/educations')
                const LocationsRequest = axios.get('http://localhost:5000/locations')

                const responses = await Promise.all([MajorsRequest, EducationsRequest, LocationsRequest])
                setMajors(responses[0].data.majors)
                setEducations(responses[1].data.educations)
                setLocations(responses[2].data.locations)

                setFormData((prev) => ({
                    ...prev,
                    major: Majors.length ? Majors[0].id : '',
                    education: Educations.length ? Educations[0].id : '',
                    location: Locations.length ? Locations[0].id : ''
                }));
            }catch(error) {
                console.log('Error fetching scholarship filters', error);
            }finally {
                setLoading(false)
            }
        }
        getMajors()
    }, [])

  return (  
    <form className='container p-4 flex flex-col w-full items-start gap-3' onSubmit={handleSubmit}>  
        <div className='w-full'>  
            <p className='mb-2'>Title</p>  
            <input   
                type="text"   
                name="title"
                placeholder='Scholarship title'  
                onChange={handleChange}   
                value={formData.title}  
                required  
                className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
            />  
        </div>  

        <div className='w-full max-w-lg'>  
            <p className='my-2'>Description</p>  
            <div ref={editorRef}></div>  
        </div>  

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>  
            <div>  
                <p className='mb-2'>Major</p>  
                <select 
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded'   
                    name="major"
                    onChange={handleChange}  
                    value={formData.major}  
                    required>
                    <option value="">Select a Major</option>
                    {Majors.map((maj, index) => (
                        <option key={index} value={maj?.id}>{maj?.name}</option> 
                    ))}
                </select> 
            </div>  

            <div>  
                <p className='mb-2'>Location</p>  
                <select 
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded'   
                    name="location"
                    onChange={handleChange}  
                    value={formData.location}  
                    required>
                    <option value="">Select a location</option> 
                    {Locations.map((maj, index) => (
                        <option key={index} value={maj?.id}>{maj?.name}</option> 
                    ))}
                </select> 
            </div> 

            <div>  
                <p className='mb-2'>Education</p>  
                <select 
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded'   
                    name="education"
                    onChange={handleChange}  
                    value={formData.education}  
                    required>
                    <option value="">Select a education</option> 
                    {Educations.map((maj, index) => (
                        <option key={index} value={maj?.id}>{maj?.name}</option> 
                    ))}
                </select> 
            </div> 


        </div>  

        <div>  
            <p className='mb-2'>Scholarship Funding (IDR)</p>  
            <div className="flex items-center">  
                <input   
                    type="number" 
                    name="funding" 
                    min={0}
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[200px]'   
                    value={formData.funding || 0}
                    onChange={handleChange}  
                />
            </div>  
        </div>  

        <button className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>  
  )  
}  

export default AddJob  