import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import { useDbUpdate } from "../utils/firebase";
//import { useProfile } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

const Create = () => {
    //const [user] = useProfile()
    const [updateData] = useDbUpdate("/");
    const navigate = useNavigate()
    
    const [start_address, setStart_address] = useState("");
    const [start_city, setStart_city] = useState("");
    const [start_zip, setStart_zip] = useState("");
    const [end_address, setEnd_address] = useState("");
    const [end_city, setEnd_city] = useState("");
    const [end_zip, setEnd_zip] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const ride = {
                start: {address: start_address, 
                        city: start_city,
                        zip: start_zip},
                end: {address: end_address, 
                      city: end_city,
                      zip: end_zip},
                date: date,
                time: time,
                available_seats: 3,
        }
        updateData({ ["/rides/" + uuidv4()]: ride });
        console.log(ride);
        navigate("/")
    }
  return (
    <div>
      <h1>NUShare</h1>
      <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="startAddress">Start Address</Form.Label>
          <Form.Control
            type="text"
            id="startAddress"
            value={start_address}
            onChange={(e) => setStart_address(e.target.value)}
          />
          <Form.Text muted>Enter your End Address</Form.Text>
          <Form.Label htmlFor="endAddress">End Address</Form.Label>
          <Form.Control
            type="text"
            id="endAddress"
            value={end_address}
            onChange={(e) => setEnd_address(e.target.value)}
          />
          <Form.Text muted>Enter your End Address</Form.Text>
          {/* <Button variant="secondary" type="submit"></Button> */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
     </Form>
    
    </div>
  );
};

export default Create;