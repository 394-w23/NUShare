import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDbUpdate, useDbData } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useProfile } from "../utils/userProfile";

const Create = () => {
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");
  const navigate = useNavigate();
  const [airports] = useDbData("/airports");
  const [campus] = useDbData("/campus");

  const [checkbox, setCheckbox] = useState("");
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  let objectDate = new Date();
  var today =
    objectDate.getFullYear() +
    "-" +
    objectDate.getMonth() +
    1 +
    "-" +
    objectDate.getDate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startAddress || !endAddress || !date || !time) {
      setError("All the fields are required");
    } else {
      const ride = {
        start: { address: startAddress },
        end: { address: endAddress },
        date: date,
        time: time,
        passengers: [user.uid],
        availableSeats: 3,
      };
      setError("");
      updateData({ ["/rides/" + uuidv4()]: ride });
      navigate("/");
    }
  };

  const handleCheckbox = (tag) => {
    if (tag === "to") {
      setCheckbox("to");
    } else if (tag === "from") {
      setCheckbox("from");
    }
  };

  const getOptions = (data) => {
    let arr = [];
    if (data != "undefined" && data != null) {
      for (let i = 0; i < data.length; i++) {
        arr.push(<option value={data[i]}> {data[i]}</option>);
      }
    }

    return arr;
  };

  return (
    <div className="container mb-5">
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
          <Form.Select onChange={(e) => setStartAddress(e.currentTarget.value)}>
            {checkbox === "to" ? getOptions(campus) : getOptions(airports)}
          </Form.Select>
          <Form.Text className="text-muted">
            Enter your starting address for the ride pickup
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Destination Address</Form.Label>
          <Form.Select onChange={(e) => setEndAddress(e.currentTarget.value)}>
            {checkbox === "to" ? getOptions(airports) : getOptions(campus)}
          </Form.Select>
          <Form.Text className="text-muted">
            Enter your destination address for the ride pickup
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            min={today}
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
        {error && <Alert variant="danger text-center">{error}</Alert>}
        <Button
          className="mt-3 w-100 create-ride-button"
          variant="info"
          type="submit"
        >
          Create Ride
        </Button>
      </Form>
    </div>
  );
};

export default Create;
