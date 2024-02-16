import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import AddDestination from '../AddDestination/AddDestination';
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

        <div className='destinations-list' key={destinationsToDisplay.id}>

         <AddDestination AddNewDestination={destinationAdd}/>

            {destinationsToDisplay && destinationsToDisplay.map((destination) => (
                <div key={destination.id} className='destination-card'>
                    <h1>{destination.city}</h1>
                    <img src={destination.imageURL} alt={destination.name} />
                    <h2>{destination.topTip}</h2>

                    <Link className='link-button' to={`/destinations/${destination.id}`}>Details</Link>

                    <button onClick={() => deleteButton(destination.id)} disabled={deletingId === destination.id}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default DestinationsList;
