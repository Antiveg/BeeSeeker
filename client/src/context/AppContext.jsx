import { createContext, useEffect, useState } from "react";  
import { jobsData } from "../assets/assets";  
import axios from 'axios'

export const AppContext = createContext();  

export const AppContextProvider = ({ children }) => {  

    const [searchFilter, setSearchFilter] = useState({  
        title: '',  
        location: ''  
    })
    const [isSearched, setIsSearched] = useState(false)
    const [isLoading, setLoading] = useState(true)  
    const [showLogin, setShowLogin] = useState(false)
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [scholarships, setScholarship] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const getScholarships = async () => {
            try {
                setLoading(true)
                const response = await axios.get('http://localhost:5000/scholarships')
                setScholarship(response.data.scholarships)
            }catch(error) {
                console.log('Error fetching scholarship data', error);
            }finally {
                setLoading(false)
            }
        }
        getScholarships()
    }, [refresh])

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const value = {   
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,  
        // jobs, setJobs,  
        isLoading, setLoading,
        showLogin, setShowLogin,
        user, setUser,
        scholarships, setScholarship,
        refresh, setRefresh
    };  

    // console.log(scholarships)

    return (  
        <AppContext.Provider value={value}>  
            {children}  
        </AppContext.Provider>  
    );  
};  

