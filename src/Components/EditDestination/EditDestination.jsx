import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function EditDestination() {
    const API_URL = `https://travel-tips-api.adaptable.app/destinations`;
    const { destinationId } = useParams();
    const [EditDestination, setEditDestination] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getDestination();
    }, [destinationId]);

    const getDestination = () => {
        axios.get(`${API_URL}/${destinationId}`)
            .then((response) => {
                setEditDestination(response.data);
            })
            .catch((error) => {
                console.log("Error getting the destination details from API", error);
            });
    }
  
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditDestination({ ...EditDestination, [name]: value });
    };

    const updateDestination = () => {
        axios.put(`${API_URL}/${destinationId}`, {
            neighbourhood: EditDestination.neighbourhood,
    ///////// Add other properties herec /////////////////////////////////
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
        navigate('/destinations');
    }

    return (
        <div className="edit-container">
            <div className="house-container">
                <form onSubmit={handleSubmit}>
                    <h2>Edit your Travel Tip here!</h2>
                    <label className="form-label">
                        Best Neighbourhood:
                        <input
                            className="form-input"
                            type="text"
                            name="neighbourhood"
                            placeholder="Enter your favorite neighbourhood"
                            value={EditDestination.neighbourhood || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    {/* Add other  fields  */}




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
