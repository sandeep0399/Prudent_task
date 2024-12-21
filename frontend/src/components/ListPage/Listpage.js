import React, { useEffect,useState } from 'react'
import axios from 'axios'; 
import './Listpage.css'
import DeleteBtn from '../Delete/DeleteBtn';
import DetailsBtn from '../Details/DetailsBtn';

const Listpage = () => { 
    const[list,setList]=useState([]) 



   useEffect(() => {
    axios.get("http://localhost:5000/items")
      .then(response => {
        setList(prevTasks => [...response.data.data]); // Spread operator to add new data
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);  


 const  handleItemDeleted =(ItemID)=>{ 
    
        setList(list.filter((item) => item.ItemID !== ItemID));
 }


  return ( 
    <div> 
        <h1>LIST items</h1>
    <div className='list-result'>
        <ul> 
            <li className='list-item'>
            <h3>Name</h3> -<span>Price</span><span>Quantity</span>
            </li>
      {
        list.map((each)=>(
            <li className='list-item' key={each.ItemID}>
            <h3>{each.Name}</h3> -<span>{each.Price}</span><span>{each.Quantity}</span>
            <div className='buttons-container'> 
                <DeleteBtn key={each.ItemID} item={each} onItemDeleted={handleItemDeleted}  />
                
                <DetailsBtn key={each.ItemID} item={each}/>
                
                
            </div>
        </li>
        ))
      }
      </ul>
      </div>
    </div>
  )
}

export default Listpage
