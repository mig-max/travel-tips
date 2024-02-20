import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import heartEmpty from "../../assets/heart-empty.png";
import heart from "../../assets/heart.png";
import iconStarEmpty from "./../../assets/star_empty.svg";
import iconStarFull from "./../../assets/star_full.svg";
import { Button } from "semantic-ui-react";
import { ViewIcon } from "@chakra-ui/icons";
import { Heading, Text, Img } from "@chakra-ui/react";

import "@fontsource/poppins";

import "./DestinationsList.css";

const API_URL = `https://travel-tips-api.adaptable.app/destinations`;

function DestinationsList() {
  const [destination, setDestination] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  //sort
  const [sortedDestination, setSortedDestination] = useState([]);

  const navigate = useNavigate();

  const getAllDestinationsToDisplay = () => {
    axios
      .get(API_URL)
      .then((response) => setDestination(response.data))
      .catch((error) => console.log("Error getting the list from API", error));
  };
  useEffect(() => {
    getAllDestinationsToDisplay();
  }, []);

  // delete destination from database with given id
  const deleteButton = (id) => {
    setDeletingId(id); // Set deletingId to indicate that deletion is in progress
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setDestination((prevDestinations) =>
          prevDestinations.filter((destination) => destination.id !== id)
        );
        console.log("Destination deleted");
      })
      .catch((error) => console.log("Error deleting destination", error))
      .finally(() => {
        setDeletingId(null); // Reset deletingId once deletion is finished (success or failure)
      });
  };

  //adding favorites
  const addToFavorites = (id, isFavorite) => {
    axios
      .patch(`${API_URL}/${id}`, { isFavorite: isFavorite })
      .then(() => {
        const updatedDestinations = destination.map((dest) => {
          if (dest.id === id) {
            return { ...dest, isFavorite: isFavorite };
          }
          return dest;
        });
        setDestination(updatedDestinations);
      })
      .catch((error) => console.log("Error updating favorite status", error));
  };

//rating
    function sortByRating(data) {
      return data.sort((a, b) => b.rating - a.rating);
    }

    function updateRating(destinationId, newRating) {
      axios
        .patch(`${API_URL}/${destinationId}`, { rating: newRating })
        .then(() => {
          const updatedDestinations = destination.map((dest) => {
            if (dest.id === destinationId) {
              return { ...dest, rating: newRating };
            }
            return dest;
          });
          setDestination(updatedDestinations);
          setSortedDestination(sortByRating(updatedDestinations));
        })
        .catch((error) => console.log("Error updating rating", error));
    }

        

  
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
          className="item-card__rating-icon"
          src={destination.rating >= i + 1 ? iconStarFull : iconStarEmpty}
          alt={`grade in ${i + 1} star`}
        />
      </button>
    ));

    return <>{elements}</>;


  return (
    <div className="destinations-list" key={destination.id}>
      {destination &&
        destination.map((destination) => (
          <div key={destination.id} className="destination-card">
            <Heading fontFamily={"Poppins"} color={"#FF6A3D"} size={"lg"}>
              {destination.city}
            </Heading>

            <Img
              src={destination.imageURL}
              alt={destination.name}
              borderRadius={"sm"}
              mx={"auto"}
              display={"block"}
            />

            <Text fontFamily={"Poppins"} fontSize={"xl"}>
              <ViewIcon color="orange" /> {destination.topTip}
            </Text>

            <Button
              color="orange"
              onClick={() => navigate(`/destinations/${destination.id}`)}
            >
              Details
            </Button>

            <Button
              color="blue"
              onClick={() => deleteButton(destination.id)}
              disabled={deletingId === destination.id}
              exact="true"
            >
              {" "}
              Delete{" "}
            </Button>

            <div className="rating-icon-container">{_rating(destination)}</div>

            <button
              onClick={() =>
                addToFavorites(destination.id, !destination.isFavorite)
              }
            >
              <div className="heart-icon-container">
                {destination.isFavorite ? (
                  <img src={heart} className="heart-icon" alt="Fav" />
                ) : (
                  <img src={heartEmpty} className="heart-icon" alt="Not Fav" />
                )}
              </div>
            </button>
          </div>
        ))}
    </div>
  );
}

export default DestinationsList;
