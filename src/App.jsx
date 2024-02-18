

import {Routes, Route} from 'react-router-dom'
import './App.css'
import DestinationDetails from './Components/DestinationDetails/DestinationDetails'
import DestinationsList from './Components/DestinationsList/DestinationsList'
import Navbar from './Components/Navbar/Navbar'
import EditDestination from './Components/EditDestination/EditDestination'
import SearchBar from './Pages/SearchBar/SearchBar'
import AddDestination from './Components/AddDestination/AddDestination'


function App() {
  

  return (
    <>
    <Navbar/>

    <Routes>

      <Route path="/" element={<DestinationsList />} />
      <Route path="/destinations" element={<DestinationsList />} />
      <Route path="/search" element={<SearchBar/>} />
      <Route path="/destinations/:destinationId" element={<DestinationDetails />} />
      <Route path="/add" element={<AddDestination/>} />
      <Route path="/destinations/:destinationId/edit" element={<EditDestination />} />
    
      
      
      {/*

 
      
      
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound/>} /> 
      
    </Routes>

{/* <Footer/> */}
    

 </Routes>
    
     
    </>
  )
}

export default App
