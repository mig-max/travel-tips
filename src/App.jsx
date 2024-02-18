

import {Routes, Route} from 'react-router-dom'
import './App.css'
import DestinationDetails from './Components/DestinationDetails/DestinationDetails'
import DestinationsList from './Components/DestinationsList/DestinationsList'
import Navbar from './Components/Navbar/Navbar'
import EditDestination from './Components/EditDestination/EditDestination'
import SearchBar from './Pages/SearchBar/SearchBar'


function App() {

  return (
    <>
    <Navbar/>
    
    <Routes>
      <Route path="/" element={<DestinationsList />} />
      <Route path="/destinations" element={<DestinationsList />} />
      <Route path="/search" element={<SearchBar/>} />
      <Route path="/destinations/:destinationId" element={<DestinationDetails />} />
      <Route path="/destinations/:destinationId/edit" element={<EditDestination />} />
    
      
      
      {/*

 
      
      
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFount/>} /> 

      */}

    </Routes>

 
    
     
    </>
  )
}

export default App
