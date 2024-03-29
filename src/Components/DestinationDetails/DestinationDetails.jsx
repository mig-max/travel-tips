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
import "@fontsource/poppins";
//Google Maps
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const API_URL = `https://travel-tips-api.adaptable.app/destinations`;

//Google Maps
const libraries = ["places"];
const mapContainerStyle = {
  width: "50vw",
  height: "50vh",
};

function DestinationDetails() {
  const { destinationId } = useParams();

  const [destination, setDestination] = useState(null);

  const navigate = useNavigate();

  //Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDPv7elQ1AbUD8wKguP3J1La09U5BCwykA",
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

  //Google Maps

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  if (!destination) {
    return <div>Loading destination details...</div>;
  }

  const center = {
    lat: destination.lat,
    lng: destination.lng,
  };

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
        marginTop={"5px"}
        p={4}
      >
        <Flex flex="1" gap="1" alignItems="center" flexWrap="wrap">
          <Image
            boxSize={"600px"}
            height={"1000px"}
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
              <Heading
                fontFamily={"Poppins"}
                fontSize={"4xl"}
                color={"#45474B"}
              >
                {destination.city}
              </Heading>
              <Text fontFamily={"Poppins"} fontSize={"xl"}>
                {destination.description}
              </Text>
            </Box>
            <Text fontFamily={"Poppins"} fontSize={"xl"} lineHeight={"32px"}>
              {destination.topTip && (
                <>
                  <br />
                  <b>Top Tip:</b> {destination.topTip}
                </>
              )}
              {destination.topBite && (
                <>
                  <br />
                  <b> Top Bite:</b> {destination.topBite}
                </>
              )}
              {destination.topSight && (
                <>
                  <br />
                  <b>Top Sight:</b> {destination.topSight}
                </>
              )}
              {destination.dailyBudget && destination.dailyBudget !== 0 && (
                <>
                  <br />
                  <b>Daily Budget:</b> {destination.dailyBudget} €/ day
                </>
              )}
              {destination.accommodation && (
                <>
                  <br />
                  <b>Where to Sleep:</b> {destination.accommodation}
                </>
              )}
              {destination.neighbourhood && (
                <>
                  <br />
                  <b>Top neighbourhood:</b> {destination.neighbourhood}
                </>
              )}
              {destination.park && (
                <>
                  <br />
                  <b>Top park:</b> {destination.park}
                </>
              )}
              {destination.museum && (
                <>
                  <br />
                  <b>Top museum:</b> {destination.museum}
                  
                </>
              )}
              <div>
                <br />
                {destination.lat && destination.lng && (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
                    center={center}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                )}
              </div>
              <Divider margin={"10px"} />
              {destination.isGoodForNight && (
                <Label color="blue">
                  <LabelDetail>
                    <span className="good-for-night">
                      <strong>Good for a night out!</strong>
                    </span>
                  </LabelDetail>
                </Label>
              )}
              {destination.isGoodForFamily && (
                <Label color="green">
                  <LabelDetail>
                    <span className="good-for-family">
                      <strong>Family Friendly!</strong>
                    </span>
                  </LabelDetail>
                </Label>
              )}
            </Text>

            <Stack direction={{ base: "column", md: "row" }} spacing="2" mt="2">
              <Button
                color="orange"
                onClick={() => navigate(`/destinations/${destination.id}/edit`)}
                exact="true"
              >
                Edit
              </Button>

              <Button color="blue" onClick={() => navigate("/")} exact="true">
                Home
              </Button>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

export default DestinationDetails;
