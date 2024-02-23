import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Message } from "semantic-ui-react";
import { Heading, Textarea } from "@chakra-ui/react";
import "./AddDestination.css";


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
  const [image, setImage] = useState(null);
  const [waitingForImageUrl, setWaitingForImageUrl] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const handleSubmit = () => {
   

    // Check if any required field is empty
    if (!city || !description || !topTip) {
      setHasErrors(true);
      return; // Stop form submission
    }

    // hide error msg
    setHasErrors(false);

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
      image,
    };

    axios
      .post(API_URL, newDestination)
      .then((response) => {
        console.log(response);

        const newDestination = response.data.id;
        console.log(newDestination);

        // Show success message
        setFormSubmitted(true);

        // Clear form fields after submission
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
        setImage([]);

        // Navigate back to destinations
        navigate(`/destinations/${newDestination}`);
      })
      .catch((error) =>
        console.log("Error posting the new destination", error)
      );
  };

  // upload image to the server
  const handleFileUpload = (event) => {
    setWaitingForImageUrl(true); // Disable the button until the image is uploaded to the server

    const cloudinaryName = import.meta.env.VITE_CLOUDINARY_NAME;
    const uploadPreset = import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET;

    const IMAGE_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudinaryName}/upload`;

    const imageToUpload = new FormData();
    imageToUpload.append("file", event.target.files[0]);
    imageToUpload.append("upload_preset", uploadPreset);

    axios
      .post(IMAGE_UPLOAD_URL, imageToUpload)
      .then((response) => {
        console.log("Image uploaded successfully", response.data);
        setImageURL(response.data.secure_url);
        setWaitingForImageUrl(false);
      })
      .catch((error) => {
        console.error("Error uploading the image", error);
      
      });
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
        >
          Add a new destination here
        </Heading>

        <Form
          display={"flex"}
          fontFamily={"Poppins"}
          fontSize={"xl"}
          className="edit-container"
          onSubmit={handleSubmit}
        >
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

          <Form.Field required>
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
            <label className="form-label">Upload Image:</label>
            <input type="file" name="imageUpload" onChange={handleFileUpload} />
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
          {hasErrors && (
            <Message 
              negative
              className="error-msg"
              fontFamily={"Poppins"}
              justifyContent={"center"}
            >
              Please fill in all required fields
            </Message>
          )}

          <Button 
          color="orange" 
          type="submit"
          exact="true" 
          disabled={waitingForImageUrl || formSubmitted}>
            {waitingForImageUrl ? "Uploading image..." : formSubmitted ? "Adding destination" : "Add Destination"}
          </Button>

          <Button color="blue" onClick={() => navigate("/")} exact="true">
            Home
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddDestination;
