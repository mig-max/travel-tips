
import './App.css'
import DestinationsList from './Components/Destinations_List/DestinationsList'
import Navbar from './Components/Navbar/Navbar'
import {Routes, Route, Link} from 'react-router-dom'




function App() {


  return (
    <>
    <Navbar />

    <Routes>
      <Route path="/" element={<DestinationsList />} />
      <Route path="/destinations" element={<DestinationsList />} />
      <Route path="/destinations/:id" element={<Destination />} />
      <Route path="/destinations/:id/edit" element={<DestinationEdit />} />
      <Route path="/destinations/new" element={<DestinationNew />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFount/>} />
    </Routes>
 
    
     
    </>
  )
}

export default App
