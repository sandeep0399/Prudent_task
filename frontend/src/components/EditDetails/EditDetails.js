import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import "./EditDetails.css"

const EditDetails = () => {
    const { id } = useParams(); // Get book ID from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: '',
        Price: '',
        Quantity: '',
        Category: '',
    });

    useEffect(() => {
        // Fetch book details to pre-fill the form
        axios.get(`http://localhost:5000/items/${id}`)
            .then((response) => {
                setFormData(response.data); // Set form data
            })
            .catch((error) => {
                console.error('Error fetching book details for editing:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the book details
        axios.put(`http://localhost:5000/items/${id}`, formData)
            .then(() => {
                alert('Book updated successfully!');
                navigate(`/edit-item/${id}`); // Redirect back to the view details page
            })
            .catch((error) => {
                console.error('Error updating book:', error);
                alert('Failed to update the book. Please try again.');
            });
    };

    return (
        <div className='edit-book-container'>
            <h2 >Edit items  page</h2>
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
                <button className='btn btn-blue' type="submit">Save Changes</button>
            </form>  
            
        </div>
    );
};

export default EditDetails;
