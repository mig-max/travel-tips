import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Button, List } from "semantic-ui-react";
import  heartEmpty  from "../../assets/heart-empty.png";
import  heart  from "../../assets/heart.png";
import iconStarEmpty from './../../assets/star_empty.svg';
import iconStarFull from './../../assets/star_full.svg';

import './DestinationsList.css';


const API_URL = `https://travel-tips-api.adaptable.app/destinations`;

function DestinationsList() {

    const [destination, setDestination] = useState([]);
    const [deletingId, setDeletingId] = useState(null);
    //useState fav destinations
    const [favoriteDestinationToDisplay, setFavoriteDestinationToDisplay] = useState([]);
    //isFav
    const [isFavorite, setIsFavorite] = useState(false);
    //sort
    const [sortedDestination, setSortedDestination] = useState([]);

    const getAllDestinationsToDisplay = () => {
        axios.get(API_URL)
            .then((response) => setDestination(response.data))
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
                setDestination(prevDestinations => prevDestinations.filter(destination => destination.id !== id));
                console.log("Destination deleted");
            })
            .catch(error => console.log("Error deleting destination", error))
            .finally(() => {
                setDeletingId(null); // Reset deletingId once deletion is finished (success or failure)
            }); 
    }


    // Add new destination to destination list 
    const destinationAdd = (destination) => {
        setDestination(prevDestinations => [...prevDestinations, destination]);
    }

    //add to favorites
    const addToFavorites = (id, isFavorite) => {
        let newDestination = {};

        for (let i = 0; i < destination.length; i++) {
            const destinationFav = destination[i];

            if (destinationFav.id === id) {
                newDestination = destinationFav;
                break;
            }
        }
        newDestination.isFavorite = isFavorite;
        setFavoriteDestinationToDisplay([newDestination, ...favoriteDestinationToDisplay]);
        //setIsFavorite(true);
    }

    //remove from favorites
    const removeFromFavorites = (id) => {
        const newList = favoriteDestinationToDisplay.filter(
            (element) => element.id !== id,
        );
        setFavoriteDestinationToDisplay(newList);
    }

    //rating
    function _rating(destination) {
        const elements = Array.from({ length: 5 }, (v, i) => (
          <button
            key={i}
            onClick={() => {
              updateRating(destination.id, i + 1);
            }}
            //className='button item-card__rating-button'
          >
            <img
              className='item-card__rating-icon'
              src={destination.rating >= i + 1 ? iconStarFull : iconStarEmpty}
              alt={`grade in ${i + 1} star`}
            />
          </button>
        ));
    
        return <>{elements}</>;
      }


    // sort data by rating
    function sortByRating(data) {
        return data.sort((a, b) => b.rating - a.rating);
      }

      useEffect(() => {
        axios.get(API_URL)
            .then((response) => {
                const sortedData = sortByRating(response.data);
                setDestination(response.data);
                setSortedDestination(sortedData);
            })
            .catch((error) => console.log("Error getting the list from API", error));
    }, []);

    function updateRating(destinationId, newRating) {
        const updatedDestinations = destination.map((dest) => {
            if (dest.id === destinationId) {
                return { ...dest, rating: newRating };
            }
            return dest;
        });
        setDestination(updatedDestinations);
        setSortedDestination(sortByRating(updatedDestinations));
    }

    return (

        <div className='destinations-list' key={destination.id}>


            {destination && destination.map((destination) => (
                <div key={destination.id} className='destination-card'>
                    <h1>{destination.city}</h1>
                    <img src={destination.imageURL} alt={destination.name} />
                    <h2>Tip: {destination.topTip}</h2>

                    <Link className='link-button' to={`/destinations/${destination.id}`} exact="true">Details</Link>

                    <Button onClick={() => deleteButton(destination.id)} disabled={deletingId === destination.id} exact="true">Delete</Button>
                    <div className='rating-icon-container'>
                        {_rating(destination)}
                    </div>
                    <button onClick={() => addToFavorites(destination.id, !destination.isFavorite)}
                    >
                        <div className="heart-icon-container">
                        {destination.isFavorite ? <img src={heart} className="heart-icon" alt="Fav" /> : <img src= {heartEmpty} className="heart-icon" alt="Not Fav" />}
                        </div>
                        </button>
                </div>
            ))}

            
            
        </div>
    );
}

export default DestinationsList;
