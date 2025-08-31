import React, { useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplication = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="p-4 sm:p-6">
      {/* Table container for horizontal scroll on small screens */}
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
            {viewApplicationsPageData.map((applicant, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition border-b last:border-none"
              >
                <td className="p-2 sm:p-3 text-xs sm:text-sm">{index + 1}</td>

                {/* User Info */}
                <td className="p-2 sm:p-3 flex items-center gap-2 min-w-[150px]">
                  <img
                    src={applicant.imgSrc}
                    alt=""
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  />
                  <span className="truncate max-w-[100px] sm:max-w-none">
                    {applicant.name}
                  </span>
                </td>

                {/* Job Title */}
                <td className="p-2 sm:p-3 min-w-[120px] truncate">
                  {applicant.jobTitle}
                </td>

                {/* Location */}
                <td className="p-2 sm:p-3 min-w-[120px] truncate">
                  {applicant.location}
                </td>

                {/* Resume */}
                <td className="p-2 sm:p-3">
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline text-xs sm:text-sm"
                  >
                    <span>Resume</span>
                    <img
                      src={assets.resume_download_icon}
                      alt=""
                      className="w-4 h-4"
                    />
                  </a>
                </td>

                {/* Actions */}
                <td className="p-2 sm:p-3 text-center relative">
                  <button
                    className={`px-2 py-1 rounded transition text-lg sm:text-xl
                      ${openDropdown === index ? "bg-gray-200" : "hover:bg-gray-200"}`}
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                  >
                    …
                  </button>

                  {openDropdown === index && (
                    <div className="absolute right-0 top-full mt-2 w-28 sm:w-32 bg-white rounded-lg shadow-[0px_0px_15px_rgba(0,0,0,0.2)] z-20">
                      <button className="w-full text-left px-3 sm:px-4 py-2 hover:bg-green-100 text-green-600 text-xs sm:text-sm">
                        Accept
                      </button>
                      <button className="w-full text-left px-3 sm:px-4 py-2 hover:bg-red-100 text-red-600 text-xs sm:text-sm">
                        Reject
                      </button>
                    </div>
                  )}
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
