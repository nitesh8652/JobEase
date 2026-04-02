import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/AppContext";
import { assets } from "../../assets/assets";
import Loading from "../Components/Loading";

const ViewApplication = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanyJobApplications = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/company/applicants`,
        { headers: { token: companyToken } }
      );

      if (data.success) {
        setApplications(data.applications || []);
      } else {
        toast.error(data.message);
        setApplications([]);
      }
    } catch (error) {
      toast.error(error.message);
      setApplications([]);
    }
    setLoading(false);
  };

  //user application update

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/changestatus`,
        {}, // <-- empty body
        {
          headers: {
            token: companyToken,
            "application-id": id,
            "application-status": status,
          },
        }
      );

      if (data.success) {
        toast.success("Status updated to " + status);
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    if (companyToken) fetchCompanyJobApplications();
  }, [companyToken]);

  if (loading) return <Loading />;

  if (!applications || applications.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl bold">No Applications Found</p>
      </div>
    );
  }

  return  (
    <div className="p-4 sm:p-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow rounded-lg text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 sm:p-3 border-b">Sr.No</th>
              <th className="p-2 sm:p-3 border-b">User Name</th>
              <th className="p-2 sm:p-3 border-b">Job Title</th>
              <th className="p-2 sm:p-3 border-b">Location</th>
              <th className="p-2 sm:p-3 border-b">Resume</th>
              <th className="p-2 sm:p-3 border-b text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {applications
              .filter(item => item.userId && item.jobId)
              .map((applicant, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition border-b last:border-none"
                >
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">{index + 1}</td>

                  {/* User Info */}
                  <td className="p-2 sm:p-3 flex items-center gap-2 min-w-[150px]">
                    <img
                      src={applicant.userId.image}
                      alt=""
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                    />
                    <span className="truncate max-w-[100px] sm:max-w-none">
                      {applicant.userId.name}
                    </span>
                  </td>

                  {/* Job Title */}
                  <td className="p-2 sm:p-3">{applicant.jobId.title}</td>

                  {/* Location */}
                  <td className="p-2 sm:p-3">{applicant.jobId.location}</td>

                  {/* Resume */}
                  <td className="p-2 sm:p-3">
                    <a
                      href={applicant.userId.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 bg-blu hover:underline text-xs sm:text-sm"
                    >
                      Resume
                      <img
                        src={assets.resume_download_icon}
                        alt=""
                        className="w-4 h-4"
                      />
                    </a>
                  </td>

                  {/* ACTION BUTTONS (MINIMAL STYLE) */}
                  <td className="p-2 sm:p-3 text-center">

                    {applicant.status === "Applied"
                      ?

                      <div className="flex gap-2 justify-center">

                        <button
                          className="px-3 py-1 border border-green-500 text-green-600 rounded-md text-xs sm:text-sm hover:bg-green-50 transition"
                          onClick={() => changeJobApplicationStatus(applicant._id, "Accepted")}
                        >
                          Accept
                        </button>

                        <button
                          className="px-3 py-1 border border-red-500 text-red-600 rounded-md text-xs sm:text-sm hover:bg-red-50 transition"
                          onClick={() => changeJobApplicationStatus(applicant._id, "Rejected")}
                        >
                          Reject
                        </button>

                      </div>

                      : <div>{applicant.status}</div>

                    }


                  </td>

                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplication;
