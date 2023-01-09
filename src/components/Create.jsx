import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDbUpdate } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Create = () => {
  const [updateData] = useDbUpdate("/");
  const navigate = useNavigate();

  const [checkbox, setCheckbox] = useState("");
  const [startAddress, setStartAddress] = useState("");
  const [startCity, setStartCity] = useState("");
  const [startZip, setStartZip] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [endCity, setEndCity] = useState("");
  const [endZip, setEndZip] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const ride = {
      start: { address: startAddress, city: startCity, zip: startZip },
      end: { address: endAddress, city: endCity, zip: endZip },
      date: date,
      time: time,
      availableSeats: 3,
    };
    updateData({ ["/rides/" + uuidv4()]: ride });
    navigate("/");
  };

  const handleCheckbox = (tag) => {
    if (tag === "to") {
      setCheckbox("to");
      setEndAddress("10000 W Balmoral Ave");
      setEndCity("Chicago");
      setEndZip("60666");
      setStartAddress("");
      setStartCity("");
      setStartZip("");
    } else if (tag === "from") {
      setCheckbox("from");
      setEndAddress("");
      setEndCity("");
      setEndZip("");
      setStartAddress("10000 W Balmoral Ave");
      setStartCity("Chicago");
      setStartZip("60666");
    }
  };

  return (
    <div>
      <div className="create-ride-header">
        <h3 className="mb-3">Create a Ride</h3>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Text className="text-muted me-4">
          Is your ride to or from the airport?
        </Form.Text>
        <Form.Check
          inline
          label="To Airport"
          name="group1"
          type="radio"
          onClick={() => handleCheckbox("to")}
        />
        <Form.Check
          inline
          label="From Airport"
          name="group1"
          type="radio"
          onClick={() => handleCheckbox("from")}
        />
        <hr className="mt-3 mb-3" />
        <Form.Group className="mb-3">
          <Form.Label>Start Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your starting address"
            name="startAddress"
            value={startAddress}
            onChange={(e) => setStartAddress(e.target.value)}
            disabled={checkbox === "from"}
          />
          <Form.Text className="text-muted">
            Enter your starting address for the ride pickup
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your starting city"
            name="startCity"
            value={startCity}
            onChange={(e) => setStartCity(e.target.value)}
            disabled={checkbox === "from"}
          />
          <Form.Text className="text-muted">
            Enter your starting city for the ride pickup
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start Zip</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your starting Zip code"
            name="startZip"
            value={startZip}
            onChange={(e) => setStartZip(e.target.value)}
            disabled={checkbox === "from"}
          />
          <Form.Text className="text-muted">
            Enter your starting Zip code for the ride pickup
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Destination Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your destination address"
            name="endAddress"
            value={endAddress}
            onChange={(e) => setEndAddress(e.target.value)}
            disabled={checkbox === "to"}
          />
          <Form.Text className="text-muted">
            Enter your destination address for the ride pickup
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Destination City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your destination city"
            name="endCity"
            value={endCity}
            onChange={(e) => setEndCity(e.target.value)}
            disabled={checkbox === "to"}
          />
          <Form.Text className="text-muted">
            Enter your destination city for the ride pickup
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Destination Zip</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your destination Zip code"
            name="endZip"
            value={endZip}
            onChange={(e) => setEndZip(e.target.value)}
            disabled={checkbox === "to"}
          />
          <Form.Text className="text-muted">
            Enter your destination Zip code for the ride pickup
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Form.Text className="text-muted">
            Enter your initial date for the ride pickup
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Form.Text className="text-muted">
            Enter your initial time for the ride pickup
          </Form.Text>
        </Form.Group>
        <Button
          className="mt-3 w-100 create-ride-button"
          variant="info"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Create;
