import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Label, LabelDetail } from "semantic-ui-react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";

const API_URL = `https://travel-tips-api.adaptable.app/destinations`;

function DestinationDetails() {
  const { destinationId } = useParams();

  const [destination, setDestination] = useState(API_URL[0]);

  const navigate = useNavigate();

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
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      boxShadow={"md"}
      borderRadius={"md"}
      margin={"20px"}
      p={4}
    >
     
        <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
          <Image
            boxSize={"600px"}
            objectFit={"cover"}
            src={destination.imageURL}
            alt={destination.city}
            className="destination-details-image"
            borderRadius={"lg"}
            mx="auto" // Added to horizontally center the image
            display="block" // Added for consistent styling
          />
          <CardBody>
            <Stack mt="6" spacing="3">
              <Box>
                <Heading size="lg">{destination.city}</Heading>
                <Text>{destination.description}</Text>
              </Box>
              <Text py="0">
                  Top Tip: {destination.topTip}
                  Top Bite: {destination.topBite}
                  Top Sight: {destination.topSight}
                  Daily Budget: {destination.dailyBudget}€
                  Where to Sleep: {destination.accommodation}
                  Top neighbourhood: {destination.neighbourhood}
                  Top park: {destination.park}
                  Top museum: {destination.museum}

                {destination.isGoodForNight === true && (
                  <Label color="blue">
                    <LabelDetail>
                      <span className="good-for-night">
                        Good for night out!{" "}
                      </span>
                    </LabelDetail>{" "}
                  </Label>
                )}

                {destination.isGoodForFamily === true && (
                  <Label color="green">
                    <LabelDetail>
                      <span className="good-for-family">Good for family!</span>
                    </LabelDetail>{" "}
                  </Label>
                )}
              </Text>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing="4"
                mt="4"
              >
                <Button
                  className="destination-details-button"
                  onClick={() =>
                    navigate(`/destinations/${destination.id}/edit`)
                  }
                >
                  Edit
                </Button>
                <Button
                  className="back-button"
                  onClick={() => navigate(-1)}
                  exact="true"
                >
                  Back
                </Button>
                <Button
                  className="back-button"
                  onClick={() => navigate("/")}
                  exact="true"
                >
                  Home
                </Button>
              </Stack>
            </Stack>
          </CardBody>
        </Flex>
    
    </Card>
  );
}

export default DestinationDetails;
