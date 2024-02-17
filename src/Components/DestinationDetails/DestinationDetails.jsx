import {Link, useParams, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";

const API_URL = `https://travel-tips-api.adaptable.app/destinations`;

function DestinationDetails () {


    const {destinationId} = useParams();

    const [destination, setDestination] = useState(API_URL[0]);

    const navigate = useNavigate();

    // get database with given id
    const getDestination = () => {
        axios.get(`${API_URL}/${destinationId}`)
         .then((response) => {
            setDestination(response.data)
         })
         .catch((error) => {
            console.log("Error getting the destination details from API", error);
         });
    }

    useEffect(() => {
        getDestination();
    }, [destinationId]);




    return (

        <div className="destination-details-card">
        <h1 className="destination-details-title">{destination.city}</h1>
        <img src={destination.imageURL} alt={destination.city} className="destination-details-image"/>

        <p className="destination-details-description">{destination.description}</p>

        <h2 className="destination-details-sub-title">{destination.topTip}</h2>
        <h3 className="destination-details-sub-title">{destination.topBite}</h3>
        <h3 className="destination-details-sub-title">{destination.topSight}</h3>
        <h3 className="destination-details-sub-title">{destination.dailyBudget}</h3>
        <h3 className="destination-details-sub-title">{destination.accommodation}</h3>

        <p>{destination.description}</p>
        <p>{destination.neighbourhood}</p>
        <p>{destination.park}</p>
        <p>{destination.museum}</p> 



        <h3 className="destination-details-sub-title">{destination.key}</h3>

        {destination.isGoodForNight === true && (
            <span className="good-for-night">Good for night out!</span>
        )}

        {destination.isGoodForFamily === true && (
            <span className="good-for-family">Good for family!</span>
        )}


        <Link className='edit-link' to={`/destinations/${destination.id}/edit`} exact="true">Edit</Link>



        <Button className="back-button" onClick={() => navigate(-1)} exact="true">Back</Button>
      
        </div>

    )
}


export default DestinationDetails;