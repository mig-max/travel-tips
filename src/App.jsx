
import './App.css'
import DestinationsList from './Components/Destinations_List/DestinationsList'
import {BrowserRouter as Routes, Route, Link} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'



function App() {

  return (
    <>

    <h1 className='text-3xl font-bold underline'>TESTING APP</h1>

  
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
