import React, { useEffect, useState } from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";


const Managejobs = () => {

  const [jobs, setJobs] = useState([]);
  const { backendUrl, companyToken } = useContext(AppContext);

  //fetch job applicatints data

  const fetchCompanyJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/listjobs', {
        headers: { token: companyToken }
      })

      if (data.success) {
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeJobVisibility = async (id)=>{
     try {
      const {data} = await axios.post(backendUrl+'/api/company/changevisibility',{
        id
      },{
        headers:{token:companyToken}
      })
      if (data.success) {
        toast.success(data.message)
        fetchCompanyJob()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.message)
      
     }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJob()
    }
  }, [companyToken])

  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow rounded-lg text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 sm:p-3 border-b">#</th>
              <th className="p-2 sm:p-3 border-b">Job Title</th>
              <th className="p-2 sm:p-3 border-b">Date</th>
              <th className="p-2 sm:p-3 border-b">Location</th>
              <th className="p-2 sm:p-3 border-b">Applicants</th>
              <th className="p-2 sm:p-3 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>

            {jobs.map((job, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition border-b last:border-none"
              >
                <td className="p-2 sm:p-3">{index + 1}</td>
                <td className="p-2 sm:p-3 min-w-[150px] truncate">{job.title}</td>
                <td className="p-2 sm:p-3">{moment(job.date).format("ll")}</td>
                <td className="p-2 sm:p-3">{job.location}</td>
                <td className="p-2 sm:p-3">{job.applicants}</td>
                <td className="p-2 sm:p-3 text-center">
                  <input
                  onChange={()=>changeJobVisibility(job._id)}
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer accent-blue-600"
                    checked={job.visible}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>



      </div>
    </div>
  );
};

export default Managejobs;
