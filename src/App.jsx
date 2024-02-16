
import './App.css'
import DestinationDetails from './Components/DestinationDetails/DestinationDetails'
import DestinationsList from './Components/DestinationsList/DestinationsList'
import {Routes, Route, Link} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'



function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<DestinationsList />} />
      <Route path="/destinations" element={<DestinationsList />} />
      <Route path="/destinations/:destinationId" element={<DestinationDetails />} />
      
      
      {/*

 
      
      <Route path="/destinations/:id/edit" element={<DestinationEdit />} />
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
