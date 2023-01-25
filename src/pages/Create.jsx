import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDbUpdate, useDbData } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useProfile } from "../utils/userProfile";
import getTodaysDate from "../utils/todayDate";

const Create = () => {
  const navigate = useNavigate();
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");
  const [airports] = useDbData("/airports");
  const [campus] = useDbData("/campus");
  const [seats] = useDbData("/seats");

  const [checkbox, setCheckbox] = useState("to");
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numSeats, setNumSeats] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (airports && campus) {
      setStartAddress("North Campus");
      setEndAddress("Chicago O'Hare International Airport (ORD)");
    }
  }, [airports, campus]);

  if (!user) return <h4 className="text-muted">Loading user profile...</h4>;
  if (!airports)
    return <h4 className="text-muted">Loading airports addresses...</h4>;
  if (!campus)
    return <h4 className="text-muted">Loading campus addresses...</h4>;
  if (!seats) return <h4 className="text-muted">Loading number of seats...</h4>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startAddress || !endAddress || !date || !time || !numSeats) {
      setError("All the fields are required");
    } else {
      const ride = {
        start: { address: startAddress },
        end: { address: endAddress },
        date: date,
        time: time,
        passengers: [user.uid],
        availableSeats: numSeats,
      };
      setError("");
      updateData({ ["/rides/" + uuidv4()]: ride });
      navigate("/");
    }
  };

  const handleCheckbox = (tag) => {
    if (tag === "to") {
      setCheckbox("to");
      setStartAddress("North Campus");
      setEndAddress("Chicago O'Hare International Airport (ORD)");
    } else if (tag === "from") {
      setCheckbox("from");
      setStartAddress("Chicago O'Hare International Airport (ORD)");
      setEndAddress("North Campus");
    }
  };

  const getOptions = (data) => {
    let arr = [];
    if (data !== "undefined" && data !== null) {
      for (let i = 0; i < data.length; i++) {
        arr.push(
          <option key={i} value={data[i]}>
            {" "}
            {data[i]}
          </option>
        );
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
          defaultChecked="true"
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
          <Form.Select onChange={(e) => setStartAddress(e.target.value)}>
            {checkbox === "to" ? getOptions(campus) : getOptions(airports)}
          </Form.Select>
          <Form.Text className="text-muted">
            Select your starting address for the ride pickup
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Destination Address</Form.Label>
          <Form.Select onChange={(e) => setEndAddress(e.target.value)}>
            {checkbox === "to" ? getOptions(airports) : getOptions(campus)}
          </Form.Select>
          <Form.Text className="text-muted">
            Select your destination address for the ride pickup
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            min={getTodaysDate()}
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
        <Form.Group className="mb-3">
          <Form.Label># of Passengers</Form.Label>
          <Form.Select onChange={(e) => setNumSeats(Number(e.target.value))}>
            <option value="" selected disabled hidden />
            {getOptions(seats)}
          </Form.Select>
          <Form.Text className="text-muted">
            Select the number of total passengers
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
