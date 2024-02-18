import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "semantic-ui-react";

const API_URL = `https://travel-tips-api.adaptable.app/destinations`;

function EditDestination() {
  const { destinationId } = useParams();

  const [destinationData, setDestinationData] = useState({
    city: "",
    description: "",
    topBite: "",
    topSight: "",
    topTip: "",
    accommodation: "",
    dailyBudget: 0,
    isGoodForNight: false,
    isGoodForFamily: false,
    imageURL: "",
    neighbourhood: "",
    park: "",
    museum: "",
  });

  const navigate = useNavigate();

  // Function to get existing destination data from the server and pre-populate the form
  useEffect(() => {
    const fetchDestinationData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${destinationId}`);
        const existingDestinationData = response.data;
        setDestinationData(existingDestinationData);
      } catch (error) {
        console.error("Error fetching existing destination data:", error);
      }
    };

    fetchDestinationData();
  }, [destinationId]);

  // Function to update destination
  const updateDestination = () => {
    axios
      .get(`${API_URL}/${destinationId}`)
      .then((response) => {
        const existingDestinationData = response.data; // Assuming the response contains the existing destination data

        // Merge destinationData into existingDestinationData, updating only non-empty fields
        const updatedDestinationData = {
          ...existingDestinationData,
          ...Object.keys(destinationData).reduce((value, key) => {
            if (destinationData[key] !== "") {
              value[key] = destinationData[key];
            }
            return value;
          }, {}),
        };

        axios  // Update the destination in the database
          .put(`${API_URL}/${destinationId}`, updatedDestinationData)
          .then((response) => {
            console.log("Destination updated successfully", response);
            goBack();
          })
          .catch((error) => {
            console.log(
              "Error updating the destination in the database",
              error
            );
          });
      })
      .catch((error) => {
        console.log("Error fetching the existing destination data", error);
      });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    updateDestination();
  };
  // Function to navigate back
  const goBack = () => {
    navigate(`/`);
  };

  // Update the destination data state and user interface
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    const inputValue = type === "checkbox" ? event.target.checked : value;

    setDestinationData({ ...destinationData, [name]: inputValue });
  };

  return (
    <div className="edit-container">
      <h2>Edit your Travel Tip here!</h2>
      <Form className="create-form" onSubmit={handleSubmit}>
        <Form.Field>
          <label className="form-label">City:</label>
          <input
            name="city"
            type="text"
            placeholder="City"
            value={destinationData.city}
            disabled={destinationData.city !== ""}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            type="text"
            placeholder="Description"
            value={destinationData.description}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Top Tip:</label>
          <input
            name="topTip"
            type="text"
            placeholder="Top Tip"
            value={destinationData.topTip}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Top Bite:</label>
          <input
            name="topBite"
            type="text"
            placeholder="Top Bite"
            value={destinationData.topBite}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Top Sight:</label>
          <input
            name="topSight"
            type="text"
            placeholder="Top Sight"
            value={destinationData.topSight}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Where to sleep:</label>
          <input
            name="accommodation"
            type="text"
            placeholder="Accomodation"
            value={destinationData.accommodation}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Daily Budget:</label>
          <input
            name="dailyBudget"
            type="number"
            placeholder="Daily Budget"
            value={destinationData.dailyBudget}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Good For Night Out:</label>
          <input
            type="checkbox"
            name="isGoodForNight"
            checked={destinationData.isGoodForNight}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Good For Families:</label>
          <input
            type="checkbox"
            name="isGoodForFamily"
            checked={destinationData.isGoodForFamily}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Image URL:</label>
          <input
            name="imageURL"
            type="url"
            placeholder="Insert image URL"
            value={destinationData.imageURL}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Top neighbourhood: </label>
          <input
            className="form-input"
            type="text"
            name="neighbourhood"
            placeholder="Enter your favorite neighbourhood"
            value={destinationData.neighbourhood}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Top park:</label>
          <input
            className="form-input"
            type="text"
            name="park"
            placeholder="Enter your favorite park"
            value={destinationData.park}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Top museum:</label>
          <input
            className="form-input"
            type="text"
            name="museum"
            placeholder="Enter your favorite museum"
            value={destinationData.museum}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Button type="submit" exact="true">
          Save
        </Button>

        <Link
          className="link-button"
          to={`/destinations/${destinationId}`}
          exact="true"
        >
          Back
        </Link>

        <Button
          className="back-button"
          onClick={() => navigate("/")}
          exact="true"
        >
          Home
        </Button>
      </Form>
    </div>
  );
}

export default EditDestination;
