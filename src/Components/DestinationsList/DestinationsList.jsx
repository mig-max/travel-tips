import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import heartEmpty from "../../assets/heart-empty.png";
import heart from "../../assets/heart.png";
import iconStarEmpty from "./../../assets/star_empty.svg";
import iconStarFull from "./../../assets/star_full.svg";
import { Button } from "semantic-ui-react";
import { Heading, Text, Img } from "@chakra-ui/react";

import ImageCarousel from "../ImageCarousel/ImageCarousel";

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
      .then((response) => {
        const sortedData = response.data.sort((a, b) => b.rating - a.rating);
        setDestination(sortedData);
      })
      .catch((error) => console.log("Error from API", error));
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
  const sortByRating = (data) => data.sort((a, b) => b.rating - a.rating);

  const updateRating = (destinationId, newRating) => {
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
  };

  const _rating = (destination) => {
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
  };

  return (
    <div className="image-carousel-container">
      <ImageCarousel />
      <div className="destinations-list">
        {destination &&
          destination.map((dest) => (
            <div key={dest.id} className="destination-card">
              <Heading
                fontFamily={"Poppins"}
                color={"#FF6A3D"}
                size={"lg"}
                padding={"10px"}
              >
                {dest.city}
              </Heading>

              <Img
                src={dest.imageURL}
                alt={dest.name}
                borderRadius={"sm"}
                mx={"auto"}
                display={"block"}
              />

              <Text fontFamily={"Poppins"} fontSize={"xl"} padding={"10px"}>
               {dest.topTip}
              </Text>

              <Button
                color="orange"
                onClick={() => navigate(`/destinations/${dest.id}`)}
              >
                Details
              </Button>

              <Button
                color="blue"
                onClick={() => deleteButton(dest.id)}
                disabled={deletingId === dest.id}
                exact="true"
              >
                {" "}
                Delete{" "}
              </Button>

              <div className="rating-icon-container">{_rating(dest)}</div>

              <button onClick={() => addToFavorites(dest.id, !dest.isFavorite)}>
                <div className="heart-icon-container">
                  {dest.isFavorite ? (
                    <img src={heart} className="heart-icon" alt="Fav" />
                  ) : (
                    <img
                      src={heartEmpty}
                      className="heart-icon"
                      alt="Not Fav"
                    />
                  )}
                </div>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DestinationsList;
