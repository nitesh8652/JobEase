import { createContext, useEffect, useState } from "react";
import { useUser , useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
    const { user } = useUser()
    const { getToken } = useAuth()

    const [searchfilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [issearched, setsearched] = useState(false);

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [companyToken, setCompanyToken] = useState(null)

    const [companyData, setCompanyData] = useState(null)

    const [userData, setUserData] = useState(null)
    const [userApplication, setuserApplication] = useState(null)

    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/jobs')
            if (data.success) {
                setJobs(data.jobs)
                console.log("Jobs Fetched", data.jobs)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })
            if (data.success) {
                setCompanyData(data.company)
                console.log("Company Data Fetched", data)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


const fetchUserData = async () => {
    try {
        const token = await getToken()
        const url = backendUrl + '/api/users/user'
        
        console.log("Fetching user from:", url)
        console.log("Token:", token ? "exists" : "missing")
        
        const { data } = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            validateStatus: () => true
        })




        console.log("User fetch response:", data)

        if (data.success) {
            setUserData(data.user)
            console.log("User Data Fetched", data.user)
        } else {
            console.log("User fetch failed:", data.message)
        }

    } catch (error) {
        console.log("Error fetching user:", error.message)
    }
}


// const fetchUserData = async () => {
//   try {
//     const token = await getToken({ template: "server" });  // 👈 IMPORTANT

//     console.log("Client token:", token);

//     if (!token) {
//       console.log("No token returned from Clerk.");
//       return;
//     }

//     const { data } = await axios.get(backendUrl + '/api/users/user', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log("User fetch response:", data);

//     if (data.success) {
//       setUserData(data.user);
//     } else {
//       console.log("User fetch failed:", data.message);
//     }
//   } catch (error) {
//     console.log("User fetch failed:", error.message);
//   }
// };


    useEffect(() => {
        fetchJobs()
        const storedCompanyToken = localStorage.getItem('companyToken')
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }
    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    }, [companyToken])


    useEffect(() => {
        if (user) {
            fetchUserData()
        }
    }, [user])


    const value = {
        setSearchFilter, searchfilter,
        setsearched, issearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userData, setUserData,
        userApplication, setuserApplication,
        fetchUserData
    }

    return (<AppContext.Provider value={value} >

        {props.children}

    </AppContext.Provider>)

}
