import { useState, useEffect } from 'react';
import axios from 'axios';

import AddDestination from '../Destination/AddDestination/AddDestination';
import './DestinationsList.css';

function DestinationsList() {
    const API_URL = `https://travel-tips-api.adaptable.app/destinations`;
    
    const [destinationsToDisplay, setDestinationsToDisplay] = useState([]);
    const [deletingId, setDeletingId] = useState(null);

    const getAllDestinationsToDisplay = () => {
        axios.get(API_URL)
            .then((response) => setDestinationsToDisplay(response.data))
            .catch((error) => console.log("Error getting the list from API", error));
    }

    useEffect(() => {
        getAllDestinationsToDisplay();
    }, []);

    // delete destination from database with given id
    const deleteButton = (id) => {
        setDeletingId(id); // Set deletingId to indicate that deletion is in progress
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                setDestinationsToDisplay(prevDestinations => prevDestinations.filter(destination => destination.id !== id));
                console.log("Destination deleted");
            })
            .catch(error => console.log("Error deleting destination", error))
            .finally(() => {
                setDeletingId(null); // Reset deletingId once deletion is finished (success or failure)
            }); 
    }
    // Add new destination to destination list 
    const destinationAdd = (destination) => {
        setDestinationsToDisplay(prevDestinations => [...prevDestinations, destination]);
    }




    return (

        <div className='destinations-list'>

         <AddDestination AddNewDestination={destinationAdd}/>

            {destinationsToDisplay.map((destination, index) => (
                <div key={destination.id} className='destination-card'>
                    <h1>{destination.city}</h1>
                    <p>{destination.description}</p>
                    <img src={destination.imageURL} alt={destination.name} />
                    <button onClick={() => deleteButton(destination.id)} disabled={deletingId === destination.id}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default DestinationsList;
