import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Home from "./components/Home/Home";
import AddItem from "./components/AddItems/AddItem";
import Navbar from "./components/Navbar/Navbar";
import EditDetails from "./components/EditDetails/EditDetails";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";


function App() {
  return (
    <BrowserRouter>
<Navbar/>
<div style={{ marginTop: '60px' }}>
   <Routes> 
    <Route path="/" element={<Home/>} />
    <Route path="/additem" element={<AddItem/>}/> 
    <Route path="/contact" element={<Contact/>} /> 
    <Route path="/about" element={<About/>}/>
    
    
    <Route path="/edit-item/:id" element={<EditDetails/>} />
  
  

   </Routes>
   </div> 
  
   </BrowserRouter>
  );
}

export default App;