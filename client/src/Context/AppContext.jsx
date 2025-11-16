import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

    const [searchfilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [issearched, setsearched] = useState(false);

    const [jobs, setJobs] = useState([])

    const[showRecruiterLogin,setShowRecruiterLogin] = useState(false)

    const [companyToken,setCompanyToken] = useState(null)
    
    const [companyData,setCompanyData] = useState(null)


    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    const value = {
        setSearchFilter, searchfilter,
        setsearched, issearched,
        jobs, setJobs,
        showRecruiterLogin,setShowRecruiterLogin,
        companyToken,setCompanyToken,
        companyData,setCompanyData,
        backendUrl
    }

    return (<AppContext.Provider value={value} >

        {props.children}

    </AppContext.Provider>)

}
