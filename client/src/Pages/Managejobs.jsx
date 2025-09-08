import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";

const Managejobs = () => {
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
            {manageJobsData.map((job, index) => (
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
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer accent-blue-600"
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
