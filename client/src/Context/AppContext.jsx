import { createContext, useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext();

/**
 * @desc Global state provider using React Context API
 * 
 * @purpose
 * - Centralizes application state (jobs, user, company, filters)
 * - Avoids prop drilling across components
 * 
 * @why Context API?
 * - Allows sharing data globally without passing props manually
 * - Simpler alternative to Redux for medium-scale apps
 */

export const AppContextProvider = (props) => {

  /**
 * @state searchfilter → stores job search inputs (title, location)
 * @state issearched → tracks whether user initiated search
 * @state jobs → stores all fetched job data
 * @state companyToken → JWT token for recruiter authentication
 * @state companyData → logged-in recruiter data
 * @state userData → logged-in user profile data
 * @state userApplications → stores jobs user has applied to
 * @state isLoadingJobs / isLoadingUser → handles loading UI states
 */

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const { user, isSignedIn } = useUser();
  const { getToken, userId } = useAuth();
  const [searchfilter, setSearchFilter] = useState({ title: "", location: "" });
  const [issearched, setsearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]); 
  const [isLoadingJobs, setIsLoadingJobs] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(false)


  /**
 * @desc Fetch all available jobs from backend
 * 
 * @logic
 * - Set loading state
 * - Call backend API (/api/jobs)
 * - Store jobs in global state
 * - Handle errors using toast notifications
 * 
 * @why global?
 * - Jobs are used across multiple components (home, search, dashboard)
 */

  const fetchJobs = async () => {
    try {
      setIsLoadingJobs(true);
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      if (data.success) {
        setJobs(data.jobs);
        console.log("Jobs Fetched", data.jobs);
      } else {
        toast.error(data.message || "Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error(error.message || "Error fetching jobs");
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const fetchCompanyData = async () => {
    if (!companyToken) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setCompanyData(data.company);
        console.log("Company Data Fetched", data);
      } else {
        toast.error(data.message || "Failed to fetch company data");
      }
    } catch (error) {
      console.error("Error fetching company:", error);
      toast.error(error.message || "Error fetching company data");
    }
  };

  /**
 * @desc Fetch user data using Clerk authentication
 * 
 * @logic
 * - Get Clerk token (authentication check)
 * - Send userId in headers to backend
 * - Store user profile in state
 * 
 * @why Clerk?
 * - Handles authentication externally
 * - Reduces backend complexity
 */

  const fetchUserData = async () => {
    try {
      setIsLoadingUser(true);
      const token = await getToken();
      const url = `${backendUrl}/api/users/user`;
      if (!token) {
        console.log("No Clerk token returned. User may not be signed in.");
        return;
      }
      const { data } = await axios.get(url, {
        headers: {
          token: `${userId}`,
        },
      });
      console.log("User fetch response:", data);
      if (data.success) {
        setUserData(data.user);
        console.log("User Data Fetched", data.user);
      } else {
        console.log("User fetch failed:", data.message);
      }
    } catch (error) {
      console.log("Error fetching user:", error.message);
    } finally {
      setIsLoadingUser(false)
    }
  };

  /**
 * @desc Fetch all jobs applied by the user
 * 
 * @logic
 * - Call backend API with userId
 * - Store applications in global state
 * 
 * @usage
 * - Used in user dashboard to show applied jobs
 */

  const fetchUserApplications = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
        headers: {
          token: `${userId}`,
        },
      });
      if (data.success) {
        setUserApplications(data.application || []); // <- set array, default to []
      } else {
        toast.error(data.message || "Failed to fetch applications");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(() => {
    if (isSignedIn && user) {
      fetchUserData();
      fetchUserApplications();
    } else {
      setUserData(null);
      setUserApplications([]);
    }
  }, [isSignedIn, user]);

  const value = {
    setSearchFilter,
    searchfilter,
    setsearched,
    issearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchUserData,
    fetchUserApplications,
    isLoadingJobs,
    isLoadingUser
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};