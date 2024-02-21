import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Input, TextArea } from "semantic-ui-react";
import { Heading } from "@chakra-ui/react";
import "./EditDestination.css";

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

  const [imageURL, setImageURL] = useState("");
  const [image, setImage] = useState(null);
  const [waitingForImageUrl, setWaitingForImageUrl] = useState(false);

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

        axios // Update the destination in the database
          .put(`${API_URL}/${destinationId}`, updatedDestinationData)
          .then((response) => {
            console.log("Destination updated successfully", response);
            alert("Destination updated successfully");
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

  // Upload image to the server
  const handleFileUpload = (event) => {
    setWaitingForImageUrl(true);

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
        setDestinationData({
          ...destinationData,
          imageURL: response.data.secure_url,
        });
      })
      .catch((error) => {
        console.error("Error uploading the image", error);
        setWaitingForImageUrl(false);
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
          {" "}
          Edit your Travel Tip here!
        </Heading>

        <Form
          fontFamily={"Poppins"}
          fontSize={"xl"}
          className="edit-container"
          onSubmit={handleSubmit}
        >
          <Form.Field>
            <label className="form-label">City:</label>
            <Input
              name="city"
              type="text"
              placeholder="City"
              value={destinationData.city}
              disabled={destinationData.city !== ""}
              onChange={handleInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Top Tip:</label>
            <Input
              name="topTip"
              type="text"
              placeholder="Top Tip"
              value={destinationData.topTip}
              onChange={handleInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Top Bite:</label>
            <Input
              name="topBite"
              type="text"
              placeholder="Top Bite"
              value={destinationData.topBite}
              onChange={handleInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Top Sight:</label>
            <Input
              name="topSight"
              type="text"
              placeholder="Top Sight"
              value={destinationData.topSight}
              onChange={handleInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Where to sleep:</label>
            <Input
              name="accommodation"
              type="text"
              placeholder="Accomodation"
              value={destinationData.accommodation}
              onChange={handleInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Daily Budget:</label>
            <Input
              name="dailyBudget"
              type="number"
              placeholder="Daily Budget"
              value={destinationData.dailyBudget}
              onChange={handleInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Image URL:</label>
            <Input
              name="imageURL"
              type="url"
              placeholder="Insert image URL"
              value={destinationData.imageURL}
              onChange={handleInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Upload Image:</label>
            <input type="file" name="imageUpload" onChange={handleFileUpload} />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Top neighbourhood: </label>
            <Input
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
            <Input
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
            <Input
              className="form-input"
              type="text"
              name="museum"
              placeholder="Enter your favorite museum"
              value={destinationData.museum}
              onChange={handleInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Good For Night Out:</label>
            <Input
              type="checkbox"
              name="isGoodForNight"
              checked={destinationData.isGoodForNight}
              onChange={handleInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Good For Families:</label>
            <Input
              type="checkbox"
              name="isGoodForFamily"
              checked={destinationData.isGoodForFamily}
              onChange={handleInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Description:</label>
            <TextArea
              name="description"
              type="text"
              placeholder="Description"
              value={destinationData.description}
              onChange={handleInputChange}
            />
          </Form.Field>
        </Form>

        <Form className="button-container" onSubmit={handleSubmit}>
          <Button color="orange" type="submit" exact="true">
            Update
          </Button>

          <Button
            color="blue"
            onClick={() => navigate(`/destinations/${destinationId}`)}
            exact="true"
          >
            {" "}
            Back{" "}
          </Button>

          <Button color="blue" onClick={() => navigate("/")} exact="true">
            {" "}
            Home{" "}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditDestination;
