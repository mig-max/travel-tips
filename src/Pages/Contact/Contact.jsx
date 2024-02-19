/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

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
    <div className="message-container">
      <h1>Leave your message here!</h1>

      <Form onSubmit={handleSubmit} className="house-container">
        <Form.Field>
          <label className="form-label">Name:</label>
          <input
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
          <input
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
          <input
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

          <textarea
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

        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>

        <Button className="link-button" type="submit">
          Send Message
        </Button>

        <Link to="/" className="link-button">
          Back to Home Page
        </Link>
      </Form>
    </div>
  );
}

export default Contact;
