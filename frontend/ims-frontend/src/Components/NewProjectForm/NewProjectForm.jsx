import React from 'react'
import './NewProjectForm.css'

const NewProjectForm = () => {
  return (
    <div className="form">
    <div className="title">Start Project</div>
    <div className="subtitle">Let's create a new project!</div>
    <div className="input-container ic1">
      <input
        id="project-name"
        className="input"
        type="text"
        placeholder=" "
        required
      />
     
      <label for="project-name" className="placeholder">
        Project Name*
      </label>
    </div>
    <div className="input-container ic2">
      <input
        id="project-description"
        className="input"
        type="text"
        placeholder=" "
      />
     
      <label for="project-description" className="placeholder">
        Description
      </label>
    </div>
    <div className='form-required'> * field is required</div>

    <button type="text" className="submit">
      Create
    </button>
  </div>
  )
}

export default NewProjectForm