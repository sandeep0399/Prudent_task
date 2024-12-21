import React, { useState } from 'react';
import axios from 'axios';
import "./AddItem.css"



const AddItem = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Price: '',
        Quantity: '',
        Category: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send book details to the backend
            const response = await axios.post('http://localhost:5000/Items', formData);
            alert('item added successfully!');
            console.log(response.data); // Optionally log the response
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add the item. Please try again.');
        }
    };

    return (
        <div className='add-book-container'>
          
            <h1>Add a New Item</h1>
            <div className='add-book-box'>
                <div className='form-element-container'>
            <form className='form-container' onSubmit={handleSubmit}>
                <div className='label-input-container'>
                    <label>Name</label>
                    <input
                        type="text"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='label-input-container'>
                    <label>Category</label>
                    <input
                        type="text"
                        name="Category"
                        value={formData.Category}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className='label-input-container'>
                    <label> Price</label>
                    <input
                        type="text"
                        name="Price"
                        value={formData.Price}
                        onChange={handleChange}
                        placeholder="Enter  Price "
                        required
                    />
                </div>
                <div className='label-input-container'>
                    <label>Quantity</label>
                    <input
                        type="text"
                        name="Quantity"
                        value={formData.Quantity}
                        onChange={handleChange}
                        placeholder="Enter Quantity"
                        required
                    />
                </div>
                
                
                <div className='button-container'>
                <button className='btn btn-red' type="submit">Add item</button>
                
                </div>
            </form> 
            </div>
            <div className='add-decripiton'>
                
            </div>
           
            
            </div>
        </div>
    );
};

export default AddItem;
