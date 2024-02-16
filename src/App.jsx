
import './App.css'
import DestinationDetails from './Components/DestinationDetails/DestinationDetails'
<<<<<<< HEAD
import DestinationsList from './Components/DestinationsList/DestinationsList'
import {Routes, Route, Link} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
=======
import EditDestination from './Components/EditDestination/EditDestination'

>>>>>>> be112f9 (adding page for editing and updating)



function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<DestinationsList />} />
      <Route path="/destinations" element={<DestinationsList />} />
      <Route path="/destinations/:destinationId" element={<DestinationDetails />} />
      <Route path="/destinations/:id/edit" element={<EditDestination />} />
    
      
      
      {/*

 
      
        <Route path="/destinations/new" element={<DestinationNew />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFount/>} /> 

      */}

    </Routes>

 
    
     
    </>
  )
}

export default App
