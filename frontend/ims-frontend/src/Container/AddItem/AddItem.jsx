import React from 'react'
import './AddItem.css'
import Navbar from '../Navbar/Navbar'
import AddItemForm from '../../Components/AddItemForm'

const AddItem = () => {
  return (
    <div className='app__additem'>
        <Navbar />
        <AddItemForm / >
        {/* <div className='app__additem-content'>
        
        <div className="title">Add an item!</div>
        <div className="input-container ic1">
          <input
            id="item-name"
            className="input"
            type="text"
            placeholder=" "
          />
          
          <label for="item-name" className="placeholder">
            Item Name*
          </label>
        </div>
        <div className="input-container ic2">
          <input
            id="item-description"
            className="input"
            type="text"
            placeholder=" "
            required
          />
          
          <label for="item-description" className="placeholder">
            Item description
          </label>
        </div>

        <div className="input-container ic2">
          <input
            id="item-location"
            className="input"
            type="text"
            placeholder=" "
           
          />
          <label for="item-location" className="placeholder">
            Item Location
          </label>
        </div>

        <div className="input-container ic2">
          <input
            id="item-amount"
            className="input"
            type="number"
            placeholder=" "
            required
          />
          <label for="item-amount" className="placeholder">
           Amount*
          </label>
        </div>
<div className='form-required'> * field is required</div>
        <button type="text" className="submit">
          Create
        </button>
      </div> */}
        </div>
       
  

  )
}

export default AddItem