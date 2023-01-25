import React, { useState } from "react";
import { useDbUpdate, useDbData } from "../../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsFillPinMapFill } from "react-icons/bs";
import { FcPlanner, FcClock, FcAutomotive } from "react-icons/fc";
import moment from "moment";
import RideButtons from "./RideButtons";
import { useProfile } from "../../utils/userProfile";

const RideDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");
  const [users] = useDbData("/users");

  const [joinButton, setJoinButton] = useState(false);
  const ride = location.state.ride;

  const startAddress =
    `${ride.start.address}, ${ride.start.city}, ${ride.start.zip}` ===
    "10000 W Balmoral Ave, Chicago, 60666"
      ? "Chicago O'Hare International Airport"
      : `${ride.start.address}, ${ride.start.city}, ${ride.start.zip}`;

  const endAddress =
    `${ride.end.address}, ${ride.end.city}, ${ride.end.zip}` ===
    "10000 W Balmoral Ave, Chicago, 60666"
      ? "Chicago O'Hare International Airport"
      : `${ride.end.address}, ${ride.end.city}, ${ride.end.zip}`;

  const handleJoin = (userId) => {
    const seats = ride.availableSeats;
    const updatedPassenger = ride.passengers;
    updatedPassenger.push(userId);
    const updatedRide = {
      ...ride,
      availableSeats: seats - 1,
      passengers: updatedPassenger,
    };
    updateData({ ["/rides/" + rideId]: updatedRide });
    setJoinButton(false);
  };

  const convertTime = (time) => {
    var oldFormatTimeArray = time.split(":");

    var HH = parseInt(oldFormatTimeArray[0]);
    var min = oldFormatTimeArray[1];

    var AMPM = HH >= 12 ? "PM" : "AM";
    var hours;
    if (HH == 0) {
      hours = HH + 12;
    } else if (HH > 12) {
      hours = HH - 12;
    } else {
      hours = HH;
    }
    var newFormatTime = hours + ":" + min + " " + AMPM;
    return newFormatTime;
  };

  const handleLeave = (userId) => {
    const seats = ride.availableSeats + 1;
    const updatedPassenger = ride.passengers;
    for (var i = 0; i < updatedPassenger.length; i++) {
      if (updatedPassenger[i] == userId) {
        updatedPassenger.splice(i, 1);
      }
    }
    const updatedRide = {
      ...ride,
      availableSeats: seats,
      passengers: updatedPassenger,
    };
    updateData({ ["/rides/" + rideId]: updatedRide });
    setJoinButton(true);
  };

  const populatePassengers = () => {
    let populatePassengers = ride.passengers.map((passengerId) => (
      <div className="passengerCol">
        <img
          className="profileImages"
          referrerPolicy="no-referrer"
          src={users[passengerId].profilePic}
        />
        <div className="profileInfo">
          <Card.Title>
            Name: {users[passengerId].displayName} <br />
            Email: {users[passengerId].email} <br />
          </Card.Title>
        </div>
      </div>
    ));

    return populatePassengers;
  };

  return (
    <div className="container mb-5">
      {typeof users != "undefined" && users != null && (
        <div className="col">
          <Card bg="light">
            <Card.Header>
              <Card.Title className="ride-header text-muted">
                Destination: {endAddress}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text className="ride-pickup-title">
                <BsFillPinMapFill size={28} /> <span> Pickup Location:</span>{" "}
                {startAddress}
              </Card.Text>
              <Card.Text className="ride-pickup-date text-muted">
                <FcPlanner size={28} />
                <span>Pickup Date:</span> <p>&nbsp;</p>
                {moment(ride.date).format("dddd, MMM D YYYY")}
              </Card.Text>
              <Card.Text className="ride-pickup-time text-muted">
                <FcClock size={28} />
                <span>Pickup Time:</span> <p>&nbsp;</p>
                {convertTime(ride.time)}
              </Card.Text>
              <Card.Text className="ride-available-seats text-muted">
                <FcAutomotive size={28} />
                <span>Seats available:</span> <p>&nbsp;</p>
                {ride.availableSeats} / 4
              </Card.Text>
              <hr />
            </Card.Body>
            <Card.Footer>
              <div className="col">{populatePassengers()}</div>
            </Card.Footer>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RideDetails;
