import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'



function DestinationsList() {
    const API_URL = `https://travel-tips-api.adaptable.app/destinations`
    
    const [destinationsToDisplay, setDestinationsToDisplay] = useState(null);

    const getAllDestinationsToDisplay = () => {
        axios.get(`${API_URL}`)
        .then((response) => setDestinationsToDisplay(response.data))
        .catch((error) => console.log("Error getting the list from API", error));
        
    }

    
    useEffect(() => {
        getAllDestinationsToDisplay()
    }, [])

  return (
    <div>
      {destinationsToDisplay && destinationsToDisplay.map((destination, index) => {
        return (
            <div key={destination.id}>
            {destination.city}
            </div>
        )
    })}
    </div>
  )
}

export default DestinationsList


