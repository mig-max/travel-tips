/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";
import { Heading, Textarea } from "@chakra-ui/react";
import "./AddDestination.css"


const API_URL = `https://travel-tips-api.adaptable.app/destinations`;


function AddDestination() {

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

     // Check if any required field is empty
     if (!city || !description) {
      alert("Please fill in all required fields.");
      return; // Stop form submission
    }

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

 

        navigate("/");
      })
      .catch((error) =>
        console.log("Error posting the new destination", error)
      );
  };

  return (
    <div className="content-container">
  {/* To ensure that there's enough content to make the page scrollable */}
    <div className="edit">
    <Heading
     className="edit-header"
     fontFamily={"Poppins"}
     fontSize={"3xl"}
      color={"#45474B"} 
      > Add a new destination here
      </Heading>

      <Form fontFamily={"Poppins"}  fontSize={"xl"} className="edit-container" onSubmit={handleSubmit}>
      
        <Form.Field required>
          <label className="form-label">City:</label>
          <Input
            name="city" 
            type="text"
            placeholder="City"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </Form.Field>

        <Form.Field required>
          <label className="form-label">Description:</label>
          <Textarea
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
          <Input
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
          <Input
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
          <Input
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
          <Input
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
          <Input
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
          <label className="form-label">Image URL:</label>
          <Input
            name="imageURL"
            type="url"
            placeholder="Insert image URL"
            value={imageURL}
            onChange={(event) => {
              setImageURL(event.target.value);
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

        </Form>

        <Form className="button-container" onSubmit={handleSubmit}>

        <Button color="orange" type="submit" exact="true">Add destination</Button>

        <Button color="blue" onClick={() => navigate("/")} exact="true">Home</Button>
      </Form>
    </div>
    </div>
  );
}

export default AddDestination;
