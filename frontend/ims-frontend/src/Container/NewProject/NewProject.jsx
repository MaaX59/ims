import './NewProject.css'
import React from 'react'
import Navbar from '../Navbar/Navbar'

const NewProject = () => {
  return (
    <div className='app__newproject'>
        <Navbar />
        <div className='app__newproject-content'>
            <h1>New project</h1> 
        </div>
       
    </div>
  )
}

export default NewProject