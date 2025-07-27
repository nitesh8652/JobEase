import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { useContext } from 'react'

const ApplyJob = () => {

    const { id } = useParams()

    const [jobdata, setjobdata] = useState(null)
    const { jobs } = useContext(AppContext)

    const fetchjob = async () => {
        const data = jobs.filter(job => job._id === id)
       if(data.length !== 0) {
            setjobdata(data[0])
            console.log(data[0])
       }
    }

    useEffect(()=>{
fetchjob()
    },[id])

    return (
        <div>

        </div>
    )
}

export default ApplyJob


