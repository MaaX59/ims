import React from 'react'
import './Homepage.css'
import Navbar from '../Navbar/Navbar'

const Homepage = () => {
  return (
     
    <div className='app__homepage'>
        <Navbar />
        <div className='app__homepage-content'>
            <h1>Homepage</h1> 
        </div>
       
    </div>
  )
}

export default Homepage