import React from 'react'
import './ProjectPage.css'

const ProjectPage = ({data}) => {
  return (
    <div className='app__projectpage'>
    <h1>{data.project_name}</h1></div>
  )
}

export default ProjectPage