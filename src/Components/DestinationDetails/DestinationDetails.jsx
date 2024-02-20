import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Label, LabelDetail } from "semantic-ui-react";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Box,
  Flex,
  Divider,
} from "@chakra-ui/react";
import "@fontsource/poppins"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const API_URL = `https://travel-tips-api.adaptable.app/destinations`;

//Google Maps
const libraries = ['places'];
const mapContainerStyle = {
  width: '30vh',
  height: '30vh',
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

function DestinationDetails() {
  const { destinationId } = useParams();

  const [destination, setDestination] = useState(API_URL[0]);

  const navigate = useNavigate();

  //Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDPv7elQ1AbUD8wKguP3J1La09U5BCwykA',
    libraries,
  });


  // get database with given id
  const getDestination = () => {
    axios
      .get(`${API_URL}/${destinationId}`)
      .then((response) => {
        setDestination(response.data);
      })
      .catch((error) => {
        console.log("Error getting the destination details from API", error);
      });
  };

  useEffect(() => {
    getDestination();
  }, [destinationId]);

  return (
    <div className="content-container">
    {/* To ensure that there's enough content to make the page scrollable */}
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      boxShadow={"md"}
      borderRadius={"md"}
      margin={"20px"}
      p={4}
    >
        <Flex flex="1" gap="1" alignItems="center" flexWrap="wrap" >
          <Image
            boxSize={"600px"}
            objectFit={"cover"}
            src={destination.imageURL}
            alt={destination.city}
            className="destination-details-image"
            borderRadius={"lg"}
            mx={"auto"}
            display={"block"}
          />
        </Flex>
          <CardBody>
            <Stack mt="6" spacing="3">
              <Box>
                <Heading fontFamily={"Poppins"} fontSize={"5xl"} color={"#FF6A3D"}>{destination.city}</Heading>
                <Text fontFamily={"Poppins"} fontSize={"xl"}>{destination.description}</Text>
              </Box>
              <Text fontFamily={"Poppins"} fontSize={"xl"} lineHeight={"32px"}>
              <br/><b>Top Tip:</b>  {destination.topTip}
              <br/><b> Top Bite:</b> {destination.topBite}
              <br/><b>Top Sight:</b> {destination.topSight}
              <br/><b>Daily Budget:</b> {destination.dailyBudget}€
              <br/><b>Where to Sleep:</b> {destination.accommodation}
              <br/><b>Top neighbourhood:</b> {destination.neighbourhood}
              <br/><b>Top park:</b> {destination.park}
              <br/><b>Top museum:</b> {destination.museum}
              <div>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={10}
                  center={center}
                >
                  <Marker position={center} />
                </GoogleMap>
              </div>

              <Divider margin={"10px"}/>

                {destination.isGoodForNight === true && (
                  <Label color="blue">
                    <LabelDetail>
                      <span className="good-for-night">
                      <strong>Good for night out!</strong>
                      </span>
                    </LabelDetail>
                  </Label>
                )}

                {destination.isGoodForFamily === true && (
                  <Label color="green">
                    <LabelDetail>
                      <span className="good-for-family">
                      <strong>Good for family!</strong></span>
                    </LabelDetail>
                  </Label>
                )}
              </Text>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing="4"
                mt="4"
              >
                <Button color="orange" onClick={() => navigate(`/destinations/${destination.id}/edit`)} exact="true" >
                  Edit
                </Button>

                <Button color="blue" onClick={() => navigate("/")} exact="true">
                  Home
                </Button>

                <Button color="blue" onClick={() => navigate(-1)} exact="true" >
                  Back
                </Button>
              </Stack>
            </Stack>
          </CardBody>
    </Card>
    </div>
    
  );
}

export default DestinationDetails;
