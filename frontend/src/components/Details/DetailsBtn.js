import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import "./DetailsBtn.css"

const DetailsBtn = ({ item }) => {
    const [itemDetails, setItemDetails] = useState(null);
    const navigate = useNavigate();
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Fetch book details when View button is clicked
    const fetchBookDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/items/${item.ItemID}`);
            setItemDetails(response.data);
            setShowDetailsModal(true); // Show the modal
        } catch (error) {
            console.error('Error fetching Item details:', error);
        }
    };
    const handleEdit = (id) => {
        navigate(`/edit-item/${id}`); // Redirect to EditBook page
    };

    return (
        <div>
            <button className='btn btn-warring' onClick={fetchBookDetails}>View Details</button>

            {/* Book Details Modal */}
            {showDetailsModal && itemDetails && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Item details</h3>
                        <p><strong>Name:</strong> {itemDetails.Name}</p>
                        <p><strong>Price</strong> {itemDetails.Price}</p>
                        <p><strong>Quantity</strong> {itemDetails.Quantity}</p>
                        <p><strong>Category</strong> {itemDetails.Category}</p>
                         <div className='button-container'><button className='btn btn-success' onClick={() => setShowDetailsModal(false)}>Close</button>
                         <button className='btn btn-warring' onClick={()=>handleEdit(itemDetails.ItemID)}>Edit</button></div>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsBtn;
