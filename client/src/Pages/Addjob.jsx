import React, { useState, useRef, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css' 
import { JobCategories, JobLocations } from '../assets/assets'
import axios from 'axios'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { toast } from 'react-toastify'

const Addjob = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('bangalore')
  const [category, setCategory] = useState('programming')
  const [level, setLevel] = useState('beginner')
  const [salary, setSalary] = useState(0)

  // States for custom inputs
  const [customCategory, setCustomCategory] = useState('')
  const [customLocation, setCustomLocation] = useState('')
  const [customLevel, setCustomLevel] = useState('') // New state for custom level

  const editorRef = useRef(null)
  const quillRef = useRef(null)
  const {backendUrl , companyToken} = useContext(AppContext)

  const onsubmithandler = async (e) => {
    e.preventDefault()
    try{
      const description = quillRef.current.root.innerHTML

      // Logic to determine final values (Dropdown vs Custom Input)
      const finalCategory = category === 'Other' ? customCategory : category
      const finalLocation = location === 'Other' ? customLocation : location
      const finalLevel = level === 'Other' ? customLevel : level // Logic for Experience

      const {data} = await axios.post(backendUrl+'/api/company/post-job',{
        title,
        description,
        location: finalLocation,
        salary,
        category: finalCategory,
        level: finalLevel,
      },{headers:{token:companyToken}}
    ) 

    if (data.success){
      toast.success(data.message)
      setTitle('')
      setSalary(0)
      
      // Reset dropdowns to defaults
      setCategory('programming')
      setLocation('bangalore')
      setLevel('beginner')
      
      // Clear custom inputs
      setCustomCategory('')
      setCustomLocation('')
      setCustomLevel('')
      
      quillRef.current.root.innerHTML = ""
    }else{
      toast.error(data.message)
    }

    }catch(error){
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Job Description',
      })
    }
  }, [])

  return (
    <form onSubmit={onsubmithandler} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl space-y-6">
     
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Job Title</label>
        <input
          type="text"
          placeholder="Type Here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Job Description */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Job Description</label>
        <div
          ref={editorRef}
          className="h-40 bg-white border border-gray-300 rounded-lg"
        />
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Job Category */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Job Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {JobCategories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>

          {category === 'Other' && (
            <input
              type="text"
              placeholder="Type your category..."
              onChange={(e) => setCustomCategory(e.target.value)}
              value={customCategory}
              required
              className="mt-2 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )}
        </div>

        {/* Job Location */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Job Location</label>
          <select
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {JobLocations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>

          {location === 'Other' && (
            <input
              type="text"
              placeholder="Type your location..."
              onChange={(e) => setCustomLocation(e.target.value)}
              value={customLocation}
              required
              className="mt-2 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )}
        </div>

        {/* Experience Level - Updated */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Experience</label>
          <select
            onChange={(e) => setLevel(e.target.value)}
            value={level}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">5+ Years</option>
            <option value="None">None</option>
            <option value="Other">Other</option>
          </select>

          {level === 'Other' && (
            <input
              type="text"
              placeholder="Type experience level..."
              onChange={(e) => setCustomLevel(e.target.value)}
              value={customLevel}
              required
              className="mt-2 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )}
        </div>

        {/* Salary */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Salary</label>
          <input
            type="number"
            placeholder="Monthly Salary"
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full md:w-auto bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        POST
      </button>
    </form>
  )
}

export default Addjob