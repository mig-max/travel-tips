import { Button } from "semantic-ui-react";
import { Box, Heading, Text } from "@chakra-ui/react";

import "./About.css";
function About() {
  return (
    <div className="content-container">
      {/* To ensure that there's enough content to make the page scrollable */}

      <div className="about">
        <Box bg="whitesmoke"  w="100%" p={4} color="black">
          <Heading fontFamily={"Poppins"} fontSize={"3xl"} color={"#45474B"} >
            About this project
          </Heading>

          <Text fontFamily={"Poppins"} fontSize={"xl"}>
            <p>
              This project was created as part of the Ironhack full-stack web
              development bootcamp.
              <br />
              The project consist in building a React application and
              integrating it with either our own mock backend or an external
              API.
            </p>
            <Heading fontFamily={"Poppins"} fontSize={"2xl"} color={"#45474B"} >
            Requirements
            </Heading>
            <p>
              Create a Single Page Application (SPA), using React, consisting of
              multiple views.
              <br /> The React application should be integrated with either a
              mock backend or an external API and should perform all CRUD
              (Create, Read, Update, Delete) operations on that API.
              <br /> The app should be responsive.
            </p>
          </Text>

          <div className="button-container">
          <div className="miguel">
          <h3>Miguel Chito</h3>
          <a href="https://github.com/donxito">
            <Button color="orange">Github</Button>
          </a>
          <a href="XXXXXXXXXXX">
            <Button color="blue">LinkedIn</Button>
          </a>
          </div>
          <div className="max">
          <h3>Max Wellings</h3>
          <a href="https://github.com/Logrance">
            <Button color="orange">Github</Button>
          </a>
          <a href="XXXXXXX">
            <Button color="blue">LinkedIn</Button>
          </a>
          </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default About;
