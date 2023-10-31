import React from 'react'
import './AddItem.css'
import Navbar from '../Navbar/Navbar'

const AddItem = () => {
  return (
    <div className='app__additem'>
        <Navbar />
        <div className='app__additem-content'>
            <h1>Add items</h1> 
        </div>
       
    </div>

  )
}

export default AddItem