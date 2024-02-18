/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";

const API_URL = `https://travel-tips-api.adaptable.app/destinations`;


function AddDestination(props) {

  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [topBite, setTopBite] = useState("");
  const [topSight, setTopSight] = useState("");
  const [topTip, setTopTip] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [dailyBudget, setDailyBudget] = useState(0);
  const [isGoodForNight, setIsGoodForNight] = useState(false);
  const [isGoodForFamily, setIsGoodForFamily] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newDestination = {
      id: Math.floor(Math.random() * 100), // temporary unique ID
      city,
      description,
      topBite,
      topSight,
      topTip,
      accommodation,
      dailyBudget,
      isGoodForNight,
      isGoodForFamily,
      imageURL,
    };

    axios
      .post(API_URL, newDestination)
      .then((response) => {
        alert("Destination added successfully!");

        console.log(response);

        // Clear form fields after successful submission
        setCity("");
        setDescription("");
        setTopBite("");
        setTopSight("");
        setTopTip("");
        setAccommodation("");
        setDailyBudget(0);
        setIsGoodForNight(false);
        setIsGoodForFamily(false);
        setImageURL("");

        // Trigger parent component methods
     
        props.getAllDestinationsToDisplay(newDestination);

        navigate("/");
      })
      .catch((error) =>
        console.log("Error posting the new destination", error)
      );
  };

  return (
    <div className="add-destination">
      <h1>Add a new destination</h1>

      <Form className="create-form" onSubmit={handleSubmit}>
        <Form.Field>
          <label className="form-label">City:</label>
          <input
            required
            name="city"
            type="text"
            placeholder="City"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Top Bite:</label>
          <input
            name="topBite"
            type="text"
            placeholder="Top Bite"
            value={topBite}
            onChange={(event) => {
              setTopBite(event.target.value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Top Sight:</label>
          <input
            name="topSight"
            type="text"
            placeholder="Top Sight"
            value={topSight}
            onChange={(event) => {
              setTopSight(event.target.value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Top Tip:</label>
          <input
            name="topTip"
            type="text"
            placeholder="Top Tip"
            value={topTip}
            onChange={(event) => {
              setTopTip(event.target.value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Where to sleep:</label>
          <input
            name="accommodation"
            type="text"
            placeholder="Accomodation"
            value={accommodation}
            onChange={(event) => {
              setAccommodation(event.target.value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Daily Budget:</label>
          <input
            name="dailyBudget"
            type="number"
            placeholder="Daily Budget"
            value={dailyBudget}
            onChange={(event) => {
              setDailyBudget(event.target.value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            className="form-label"
            label="Good For Night Out:"
            name="isGoodForNight"
            checked={isGoodForNight}
            onChange={(event) => {
              setIsGoodForNight(event.target.checked);
            }}
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            className="form-label"
            label="Good For Families:"
            name="isGoodForFamily"
            checked={isGoodForFamily}
            onChange={(event) => {
              setIsGoodForFamily(event.target.checked);
            }}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Image URL:</label>
          <input
            name="imageURL"
            type="url"
            placeholder="Insert image URL"
            value={imageURL}
            onChange={(event) => {
              setImageURL(event.target.value);
            }}
          />
        </Form.Field>

        <Button type="submit" exact="true">Add destination</Button>
      </Form>
    </div>
  );
}

export default AddDestination;
