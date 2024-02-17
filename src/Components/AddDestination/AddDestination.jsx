/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";


function AddDestination(props) {
    const API_URL = `https://travel-tips-api.adaptable.app/destinations`;

   
   
    const [city, setCity] = useState("");
    const [description, setDescription] = useState("");
    const [topBite, setTopBite] = useState("");
    const [topSight, setTopSight] = useState("");
    const [topTip, setTopTip] = useState("");
    const [accommodation, setAccommodation] = useState("");
    const [dailyBudget, setDailyBudget] = useState(0)
    const [isGoodForNight, setIsGoodForNight] = useState(false);
    const [isGoodForFamily, setIsGoodForFamily] = useState(false);
    const [imageURL, setImageURL] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();

      const newDestination = {
          id: Math.floor(Math.random() * 100), // temporary unique ID until backend is implemented
          city,
          description,
          topBite,
          topSight,
          topTip,
          accommodation,
          dailyBudget,
          isGoodForNight,
          isGoodForFamily,
          imageURL
      };


        axios.post(API_URL, newDestination)
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
            props.AddNewDestination(newDestination);
            props.getAllDestinationsToDisplay(newDestination);
        })
        .catch((error) => console.log("Error posting the new destination", error));
      
  };
  


  return (
    <div className="add-destination">
    <form onSubmit={handleSubmit}>
    <h1>Add a new destination</h1>

    <label className="form-label">
        City:
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
    </label>

    <label className="form-label">
        Description:
        <textarea
          name="description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
    </label>

    <label className="form-label">
    Top Bite:
    <input
      name="topBite"
      type="text"
      placeholder="Top Bite"
      value={topBite}
      onChange={(event) => {
        setTopBite(event.target.value);
      }}
      />
    </label>

    <label className="form-label">
    Top Sight:
    <input
      name="topSight"
      type="text"
      placeholder="Top Sight"
      value={topSight}
      onChange={(event) => {
        setTopSight(event.target.value);
      }}
      />
    </label>

    <label className="form-label">
    Top Tip:
    <input
      name="topTip"
      type="text"
      placeholder="Top Tip"
      value={topTip}
      onChange={(event) => {
        setTopTip(event.target.value);
      }}
      />
    </label>

    <label className="form-label">
    Where to sleep:
    <input
      name="accommodation"
      type="text"
      placeholder="Accomodation"
      value={accommodation}
      onChange={(event) => {
        setAccommodation(event.target.value);
      }}
      />
    </label>

    <label className="form-label">
    Daily Budget:
    <input
      name="dailyBudget"
      type="number"
      placeholder="Daily Budget"
      value={dailyBudget}
      onChange={(event) => {
        setDailyBudget(event.target.value);
      }}
      />
    </label>

    <label className="form-label">
    Good For Night Out:
    <input
      name="isGoodForNight"
      type="checkbox"
      checked={isGoodForNight}
      onChange={(event) => {
        setIsGoodForNight(event.target.checked);
      }}
      />
    </label>

    <label className="form-label">
        Good For Families:
        <input
          name="isGoodForFamily"
          type="checkbox"
          checked={isGoodForFamily}
          onChange={(event) => {
            setIsGoodForFamily(event.target.checked);
          }}
        />
    </label>

    <label className="form-label">
    Image URL:
    <input
      name="imageURL"
      type="url"
      placeholder="Insert image URL"
      value={imageURL}
      onChange={(event) => {
        setImageURL(event.target.value);
      }}
      />
    </label>

    <button type="submit">Add destination</button>
    </form>
    </div>
  )
}

export default AddDestination

