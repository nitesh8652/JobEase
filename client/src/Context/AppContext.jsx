import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [searchfilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [issearched, setsearched] = useState(false);

    const [jobs, setJobs] = useState([])

    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    const value = {
        setSearchFilter, searchfilter,
        setsearched, issearched,
        jobs, setJobs
    }

    return (<AppContext.Provider value={value} >

        {props.children}

    </AppContext.Provider>)

}
