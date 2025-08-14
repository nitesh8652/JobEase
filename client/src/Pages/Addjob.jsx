import React, { useState } from 'react'

const Addjob = () => {

    const [title, settittle] = useState('')
    const [location, setlocation] = useState('bangalore')
    const [category, setcategory] = useState('programming')
    const [level, setlevel] = useState('begnier')
    const [salary, setsalary] = useState(0)

    return (
        <form>
            <div>
                <p> Job Tittle </p>
                <input type="text" placeholder='Type Here' onChange={e => settittle(e.target.value)} value={title} required/>
            </div>
        </form>
    )
}

export default Addjob