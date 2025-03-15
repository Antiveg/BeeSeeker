import React, { useContext, useEffect, useState } from "react";  
import { AppContext } from "../context/AppContext";  
import { assets, JobCategories, JobLocations } from "../assets/assets";  
import ScholarshipCard from "./ScholarshipCard";  
import axios from 'axios'

const JobListing = () => {  

    const { isSearched, searchFilter, setSearchFilter, scholarships } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [showFilter, setShowFilter] = useState(false);  
    const [currentPage, setCurrentPage] = useState(1);  
    const [selectedMajors, setSelectedMajors] = useState([])
    const [selectedEducations, setSelectedEducations] = useState([])
    const [Majors, setMajors] = useState([])
    const [Educations, setEducations] = useState([])
    const [filteredScholarships, setFilteredScholarships] = useState(scholarships)

    const handleCategoryChange = (category) => {  
        setSelectedMajors((prev) =>  
            prev.includes(category)
                ? prev.filter((c) => c !== category)  
                : [...prev, category]  
        )
    }

    const handleLocationChange = (location) => {  
        setSelectedEducations((prev) =>  
            prev.includes(location)  
                ? prev.filter((c) => c !== location)  
                : [...prev, location]  
            );  
    };  

    useEffect(() => {
        const getMajors = async () => {
            try {
                setLoading(true)
                const MajorsRequest = axios.get('http://localhost:5000/majors')
                const EducationsRequest = axios.get('http://localhost:5000/educations')
                // const OrganizationsRequest = axios.get('https://localhost:5000/organizations')

                const responses = await Promise.all([MajorsRequest, EducationsRequest])
                setMajors(responses[0].data.majors)
                setEducations(responses[1].data.educations)
                // setOrganizations(responses[2].data.organizations)
            }catch(error) {
                console.log('Error fetching scholarship filters', error);
            }finally {
                setLoading(false)
            }
        }
        getMajors()
    }, [])

    useEffect(() => {  
        // Existing filtering logic remains the same  
        const matchesMajor = (scholarship) =>  
            selectedMajors.length === 0 ||  
            selectedMajors.includes(scholarship.Major.name);  

        const matchesEducation = (scholarship) =>  
            selectedEducations.length === 0 || selectedEducations.includes(scholarship.Education.name);  

        const matchesTitle = (scholarship) =>  
            searchFilter.title === "" ||  
            scholarship.title.toLowerCase().includes(searchFilter.title.toLowerCase());  

        const matchesSearchLocation = (scholarship) =>  
            searchFilter.location === "" ||  
            scholarship.Location.name.toLowerCase().includes(searchFilter.location.toLowerCase());  

        const newFilteredScholarships = scholarships  
            .slice()  
            .reverse()  
            .filter(  
                (scholarship) =>  
                matchesMajor(scholarship) &&  
                matchesEducation(scholarship) &&  
                matchesTitle(scholarship) &&  
                matchesSearchLocation(scholarship) &&
                scholarship.isvisible
            );  

        setFilteredScholarships(newFilteredScholarships);  
        setCurrentPage(1);  
    }, [scholarships, selectedMajors, selectedEducations, searchFilter]);  

    if(loading){
        return <div>Loading content...</div>
    }

    return (  
        <div   
            id="job-listing"   
            className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-12 px-4 mt-8 md:mt-16 bg-gray-50 relative"  
        >   
            {/* Mobile Filter Overlay */}  
            {showFilter && (  
            <div   
                className="lg:hidden fixed inset-0 bg-black/50 z-40"  
                onClick={() => setShowFilter(false)}  
            />  
            )}  

            {/* Mobile Filter Toggle - Inline with the page */}  
            <div className="lg:hidden w-full mb-4">  
            <button  
                onClick={() => setShowFilter((prev) => !prev)}  
                className="w-full px-6 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-700"  
            >  
                {showFilter ? "Hide Filters" : "Show Filters"}  
            </button>  
            </div>  

            {/* Sidebar with Conditional Rendering */}  
            <div   
            className={`  
                w-full lg:w-1/4 bg-white lg:mr-8 rounded-xl shadow-sm p-6 h-fit   
                lg:sticky lg:top-8   
                ${showFilter   
                ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-md max-h-[90vh] overflow-y-auto'   
                : 'max-lg:hidden'  
                }  
            `}  
            >  
            {/* Mobile Close Button */}  
            {showFilter && (  
                <div className="lg:hidden flex justify-between items-center mb-4 sticky top-0 bg-white z-10">  
                <h3 className="text-xl font-bold">Filters</h3>  
                <button   
                    onClick={() => setShowFilter(false)}  
                    className="text-2xl font-bold"  
                >  
                    ×  
                </button>  
                </div>  
            )}  

            {/* Search Filter from hero component */}  
            {isSearched &&  
                (searchFilter.title != "" || searchFilter.location != "") && (  
                <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4">  
                    <h3 className="font-semibold text-lg mb-4 text-gray-800">Current Search</h3>  
                    <div className="flex flex-wrap gap-2">  
                    {searchFilter.title && (  
                        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">  
                        {searchFilter.title}  
                        <button  
                            onClick={() =>  
                            setSearchFilter((prev) => ({ ...prev, title: "" }))  
                            }  
                            className="ml-2 text-blue-500 hover:text-blue-700"  
                        >  
                            ×  
                        </button>  
                        </span>  
                    )}  
                    {searchFilter.location && (  
                        <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">  
                        {searchFilter.location}  
                        <button  
                            onClick={() =>  
                            setSearchFilter((prev) => ({ ...prev, location: "" }))  
                            }  
                            className="ml-2 text-red-500 hover:text-red-700"  
                        >  
                            ×  
                        </button>  
                        </span>  
                    )}  
                    </div>  
                </div>  
                )}  

            {/* Majors Filter */}  
            <div>  
                <h4 className="font-semibold text-lg py-4 text-gray-800 border-b mb-4 sticky top-0 bg-white z-10">  
                Scholarship Categories  
                </h4>  
                <ul className="space-y-3 text-gray-600">  
                {Majors.map((major, index) => (  
                    <li   
                    className="flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors"   
                    key={index}  
                    >  
                    <input  
                        className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"  
                        type="checkbox"  
                        onChange={() => handleCategoryChange(major.name)}  
                        checked={selectedMajors.includes(major.name)}  
                    />  
                    <label className="flex-grow cursor-pointer">{major.name}</label>  
                    </li>  
                ))}  
                </ul>  
            </div>  

            {/* Location Filter */}  
            <div className="mt-6">  
                <h4 className="font-semibold text-lg py-4 text-gray-800 border-b mb-4 sticky top-0 bg-white z-10">  
                Scholarship Education Levels 
                </h4>  
                <ul className="space-y-3 text-gray-600">  
                {Educations.map((education, index) => (  
                    <li   
                    className="flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors"   
                    key={index}  
                    >  
                    <input  
                        className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"  
                        type="checkbox"  
                        onChange={() => handleLocationChange(education.name)}  
                        checked={selectedEducations.includes(education.name)}  
                    />  
                    <label className="flex-grow cursor-pointer">{education.name}</label>  
                    </li>  
                ))}  
                </ul>
            </div>

            {/* Mobile Apply Filters Button */}  
            {showFilter && (  
                <button   
                onClick={() => setShowFilter(false)}  
                className="w-full mt-4 px-6 py-2 bg-blue-500 text-white rounded-md lg:hidden sticky bottom-0"  
                >  
                Apply Filters  
                </button>  
            )}  
            </div>  


            {/* Scholarship Listings */}  
            <section className="w-full lg:w-3/4 text-gray-800">  
                <div className="mb-8">  
                <h3 className="font-bold text-4xl text-gray-800 mb-3">  
                    Latest Scholarships  
                </h3>  
                <p className="text-gray-600">  
                    Discover and explore exciting opportunities from various sources  
                </p>
                </div>  

                {filteredScholarships.length === 0 ? (  
                <div className="text-center py-12 bg-gray-50 rounded-lg">  
                    <p className="text-2xl text-gray-500">  
                    No scholarships found matching your criteria  
                    </p>  
                </div>  
                ) : (  
                <>  
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">  
                    {filteredScholarships.length <= 0 && "no scholarship met criteria or no scholarship exist yet ..."}
                    {filteredScholarships  
                        .slice((currentPage - 1) * 6, currentPage * 6)  
                        .map((scholarship, index) => (  
                            <ScholarshipCard key={index} job={scholarship} />  
                        ))}  
                    </div>  

                    {/* Pagination */}  
                    <div className="flex items-center justify-center space-x-4 mt-12">  
                    <button  
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}  
                        disabled={currentPage === 1}  
                        className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"  
                    >  
                        <img src={assets.left_arrow_icon} alt="Previous" />  
                    </button>  

                    {Array.from({ length: Math.ceil(filteredScholarships.length / 6) }).map(  
                        (_, index) => (  
                        <button  
                            key={index}  
                            onClick={() => setCurrentPage(index + 1)}  
                            className={`w-10 h-10 rounded-md ${  
                            currentPage === index + 1  
                                ? "bg-blue-500 text-white"  
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"  
                            }`}  
                        >  
                            {index + 1}  
                        </button>  
                        )  
                    )}  

                    <button  
                        onClick={() =>  
                        setCurrentPage(  
                            Math.min(  
                            currentPage + 1,  
                            Math.ceil(filteredScholarships.length / 6)  
                            )  
                        )  
                        }  
                        disabled={currentPage === Math.ceil(filteredScholarships.length / 6)}  
                        className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"  
                    >  
                        <img src={assets.right_arrow_icon} alt="Next" />  
                    </button>  
                    </div>  
                </>  
                )}  
            </section>  
        </div>  
    );  
};  

export default JobListing;  