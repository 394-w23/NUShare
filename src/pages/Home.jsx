import React, { useState } from "react";
import Ride from "../components/rides/Ride";
import { useDbUpdate } from "../utils/firebase";
import { useDbData } from "../utils/firebase";
import Form from "react-bootstrap/Form";
import { useProfile } from "../utils/userProfile";

const Home = () => {
  const [user] = useProfile();

  const [rides] = useDbData("/rides");

  const [updateData] = useDbUpdate("/");

  const [searchStart, setSearchStart] = useState("");
  const [searchEnd, setSearchEnd] = useState("");
  const [searchDate, setSearchDate] = useState("");

  let rideArray = [];

  if (typeof rides != "undefined" && rides != null) {
    rideArray = Object.entries(rides);
    let objectDate = new Date();
    var today =
      objectDate.getFullYear() +
      "-" +
      objectDate.getMonth() +
      1 +
      "-" +
      objectDate.getDate();

    for (let i = 0; i < rideArray.length; i++) {
      if (rideArray[i][1].date < today) {
        updateData({ ["/rides/" + rideArray[i][0]]: null });
      }
    }

    rideArray.sort(function (a, b) {
      if (user) {
        if (
          a[1].passengers.includes(user.uid) &&
          !b[1].passengers.includes(user.uid)
        ) {
          return -1;
        }
        if (
          !a[1].passengers.includes(user.uid) &&
          b[1].passengers.includes(user.uid)
        ) {
          return 1;
        }
      }
      a[1].date + " " + a[1].time < b[1].date + " " + b[1].time ? -1 : 1;
    });

    console.log(rideArray);
  }

  const handleToAirport = () => {
    setSearchEnd("10000 W Balmoral Ave");
    setSearchStart("");
  };

  const handleFromAirport = () => {
    setSearchStart("10000 W Balmoral Ave");
    setSearchEnd("");
  };

  const handleAll = () => {
    setSearchStart("");
    setSearchEnd("");
  };

  const handleDate = (date) => {
    setSearchDate(date);
  };

  const filteredRides = rideArray.filter(
    (ride) =>
      (!searchStart || ride[1].start.address === searchStart) &&
      (!searchEnd || ride[1].end.address === searchEnd) &&
      (!searchDate || ride[1].date === searchDate)
  );

  return (
    <div>
      <Form.Text className="text-muted me-4">Where?</Form.Text>
      <br></br>
      <Form.Check
        inline
        label="To Airport"
        name="group1"
        type="radio"
        onClick={() => handleToAirport()}
      />
      <Form.Check
        inline
        label="From Airport"
        name="group1"
        type="radio"
        onChange={() => handleFromAirport()}
      />
      <Form.Check
        inline
        label="All Rides"
        name="group1"
        type="radio"
        onClick={() => handleAll()}
      />
      <br></br>
      <Form.Text className="text-muted me-4">When?</Form.Text>
      <br></br>
      <Form.Control
        inline
        name="group1"
        type="date"
        min={today}
        onChange={(e) => handleDate(e.target.value)}
      />
      <hr className="mt-3 mb-3" />
      {typeof rides != "undefined" &&
        rides != null &&
        filteredRides &&
        filteredRides.map((ride, idx) => (
          <div key={idx} className="mb-5">
            <Ride ride={ride[1]} id={ride[0]} />
          </div>
        ))}
    </div>
  );
};

export default Home;
