import React, { useState, useRef, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css' // ✅ Import Quill CSS

const Addjob = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('bangalore')
  const [category, setCategory] = useState('programming')
  const [level, setLevel] = useState('beginner')
  const [salary, setSalary] = useState(0)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write job description here...',
      })
    }
  }, [])

  return (
    <form className="p-4 space-y-4">
      <div>
        <p className="mb-1 font-medium">Job Title</p>
        <input
          type="text"
          placeholder="Type Here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <p className="mb-1 font-medium">Job Description</p>
        <div
          ref={editorRef}
          className="h-40 bg-white border rounded"
        />
      </div>
    </form>
  )
}

export default Addjob
