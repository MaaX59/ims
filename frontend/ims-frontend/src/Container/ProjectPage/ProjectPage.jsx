import React from 'react';
import './ProjectPage.css';
import Navbar from '../Navbar/Navbar';

const ProjectPage = ({data}) => {
  
  return (
    <div className='app__projectpage'>
    <Navbar />
    <div>
   { console.log(data.id)}
      </div>
    </div>
    
  )
}

export default ProjectPage