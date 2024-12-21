import React, { useState } from 'react';
import axios from 'axios';
import  './DeleteBtn.css';
const DeleteBtn = ({ item, onItemDeleted }) => 
    {
    const [showModal, setShowModal] = useState(false);

    // Handle item deletion
    const deleteItem = async () => {
        try {
            await axios.delete(`http://localhost:5000/items/${item.ItemID}`);
           
            onItemDeleted(item.ItemID)// Notify parent component to refresh the list
            setShowModal(false); // Close the modal
        } catch (error) {
            console.error('Error deleting item', error);
        }
    };

    return (
        <div>
             <button className='btn btn-color-red 'onClick={() => setShowModal(true)}  >Delete</button>
            

            {/* Confirmation Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this item?</h3>
                        <p>Name: {item.Name}</p> 
                        <div className='buttons-container'>
                        <button className='btn btn-red' onClick={deleteItem}>Yes, Delete</button>
                        <button className='btn btn-success' onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteBtn;
