import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function EditDestination() {
    const API_URL = `https://travel-tips-api.adaptable.app/destinations`;

    const { destinationId } = useParams();

    const [EditDestination, setEditDestination] = useState({});

    const [neighbourhood, setNeighbourhood] = useState("");
    const [park, setPark] = useState("");
    const [museum, setMuseum] = useState("");
  

    const navigate = useNavigate();

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditDestination({ ...EditDestination, [name]: value });
    
        // Set each state variable to its respective value
        if (name === "neighbourhood") {
            setNeighbourhood(value);
        } else if (name === "park") {
            setPark(value);
        } else if (name === "museum") {
            setMuseum(value);
        }

        console.log(name, value); // testing
    };
    

    const updateDestination = () => {
        axios.put(`${API_URL}/${destinationId}`, {
            ...EditDestination,
            neighbourhood,
            park,
            museum
    ///////// Add other properties here /////////////////////////////////
        })
        .then((response) => {
            console.log("Destination updated successfully", response);
            goBack();
        })
        .catch((error) => {
            console.log("Error updating the destination in the database", error);
        });
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        updateDestination();
    }

    const goBack = () => {
        navigate(`/`);
    }

    return (
        <div className="edit-container">
            <div className="house-container">
                <form onSubmit={handleSubmit}>
                    <h2>Edit your Travel Tip here!</h2>
                    <label className="form-label">
                        Best neighbourhood:
                        <input
                            className="form-input"
                            type="text"
                            name="neighbourhood"
                            placeholder="Enter your favorite neighbourhood"
                            value={neighbourhood}
                            onChange={handleInputChange}
                        />
                    </label>
                    {/* Add other  fields  */}

                    <label className="form-label">
                        Best park:
                        <input
                            className="form-input"
                            type="text"
                            name="park"
                            placeholder="Enter your favorite park"
                            value={park}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label className="form-label">
                        Best museum:
                        <input
                            className="form-input"
                            type="text"
                            name="museum"
                            placeholder="Enter your favorite museum"
                            value={museum}
                            onChange={handleInputChange}
                        />
                    </label>




                    <button type="submit">Save</button>

                    <Link className="link-button" to={`/destination/${destinationId}`}>
                        Back
                    </Link>
                    <Link className="link-button" to="/">
                        Home page
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default EditDestination;
