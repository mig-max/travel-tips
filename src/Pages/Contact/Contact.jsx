/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import {Input, Heading, Textarea } from "@chakra-ui/react";

import "./Contact.css"

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = {
      name: name,
      phone: phone,
      email: email,
    };
    console.log(message);
    alert(
      `Thank you for your message. 
      We will get back to you as soon as possible.`
    );

    navigate(`/`);

    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="content-container">
    {/* To ensure that there's enough content to make the page scrollable */}

    <div className="edit">
    <Heading
     className="edit-header"
     fontFamily={"Poppins"}
     fontSize={"4xl"}
      color={"#FF6A3D"} 
      > Leave your message here
      </Heading>


      <Form fontFamily={"Poppins"}  fontSize={"xl"} className="edit-container" onSubmit={handleSubmit}>
        <Form.Field>
          <label className="form-label">Name:</label>
          <Input
            className="form-input"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Phone:</label>
          <Input
            className="form-input"
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Email:</label>
          <Input
            className="form-input"
            type="text"
            name="name"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Message:</label>
          <Textarea
            className="form-input"
            type="text"
            name="message"
            cols="60"
            rows="6"
            placeholder="Write your message"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </Form.Field>
        </Form>

        <Form className="button-container" onSubmit={handleSubmit}>
        <Button color="orange" className="link-button" type="submit">
          Send Message
        </Button>

        <Button color="blue" onClick={() => navigate("/")} exact="true">Home</Button>    
      </Form>
    </div>
    </div>
  );
}

export default Contact;
