import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Ride from "../components/rides/Ride";
import Form from "react-bootstrap/Form";
import { useDbData, useDbUpdate } from "../utils/firebase";
import { useProfile } from "../utils/userProfile";
import sortRides from "../utils/sortRides";
import getTodaysDate from "../utils/todayDate";

const Home = () => {
  const navigate = useNavigate();
  const [user] = useProfile();
  const [rides] = useDbData("/rides");
  const [updateData] = useDbUpdate("/");

  const [searchStart, setSearchStart] = useState("");
  const [searchEnd, setSearchEnd] = useState("");
  const [searchDate, setSearchDate] = useState("");
  
  if (!rides)
    return <h4 className="text-muted">There are currently no rides</h4>;
  if (!user) return <h4 className="text-muted">Loading user profile...</h4>;

  const handleToORDAirport = () => {
    setSearchEnd("Chicago O'Hare International Airport (ORD)");
    setSearchStart("");
  };

  const handleFromORDAirport = () => {
    setSearchStart("Chicago O'Hare International Airport (ORD)");
    setSearchEnd("");
  };

  const handleToMDWAirport = () => {
    setSearchEnd("Chicago Midway International Airport (MDW)");
    setSearchStart("");
  };

  const handleFromMDWAirport = () => {
    setSearchStart("Chicago Midway International Airport (MDW)");
    setSearchEnd("");
  };

  const handleAll = () => {
    setSearchStart("");
    setSearchEnd("");
  };

  const handleDate = (date) => {
    setSearchDate(date);
  };

  //First check if any ride needs to be deleted from the db because of date
  let filteredRides = Object.entries(rides).forEach(([idx, ride]) => {
    if (ride.date < getTodaysDate()) {
      updateData({ ["/chats" + idx]: null })
      updateData({ ["/rides/" + idx]: null });
    }
  });

  //Filter the rides by queries made on the forms
  filteredRides = sortRides(rides, user).filter(
    (ride) =>
      (!searchStart || ride[1].start.address === searchStart) &&
      (!searchEnd || ride[1].end.address === searchEnd) &&
      (!searchDate || ride[1].date === searchDate)
  );

  return (
    <div className="container mb-5">
      <Form.Text className="text-muted me-4">Where?</Form.Text>
      <br></br>
      <Form.Check
        inline="true"
        label="To ORD Airport"
        name="group1"
        type="radio"
        onClick={() => handleToORDAirport()}
      />
      <Form.Check
        inline="true"
        label="From ORD Airport"
        name="group1"
        type="radio"
        onChange={() => handleFromORDAirport()}
      />
      <Form.Check
        inline="true"
        label="To MDW Airport"
        name="group1"
        type="radio"
        onClick={() => handleToMDWAirport()}
      />
      <Form.Check
        inline="true"
        label="From MDW Airport"
        name="group1"
        type="radio"
        onChange={() => handleFromMDWAirport()}
      />
      <Form.Check
        inline="true"
        label="All Rides"
        name="group1"
        type="radio"
        onClick={() => handleAll()}
      />
      <br></br>
      <Form.Text className="text-muted me-4">When?</Form.Text>
      <br></br>
      <Form.Control
        inline="true"
        name="group1"
        type="date"
        min={getTodaysDate()}
        onChange={(e) => handleDate(e.target.value)}
      />
      <hr className="mt-3 mb-3" />
      {filteredRides && filteredRides.length === 0 && (
        <h4 className="text-muted text-center">
          There are currently no rides for the filter selected
        </h4>
      )}
      {filteredRides &&
        filteredRides.map((ride, idx) => (
          <div key={idx} className="mb-5">
            <Ride ride={ride[1]} id={ride[0]} />
          </div>
        ))}
    </div>
  );
};

export default Home;
