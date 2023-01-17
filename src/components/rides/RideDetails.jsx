import React from "react";
import { useDbUpdate, useDbData } from "../../utils/firebase";
import { useLocation } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useProfile } from "../../utils/userProfile";
import "../../styles/rideDetails.css";

const RideDetails = () => {
  const location = useLocation();
//   console.log(location.state);
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");
  const [users, errorUsers, isLoadingUsers] = useDbData("/users");
  const ride = location.state.ride;
  const userId = location.state.id;

  const handleJoin = (userId) => {
    const seats = ride.availableSeats;
    const updatedPassenger = ride.passengers;
    updatedPassenger.push(userId);
    const updatedRide = {
      ...location.state.ride,
      availableSeats: seats - 1,
      passengers: updatedPassenger,
    };
    updateData({ ["/rideDetails/"]: location });
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
      ...location.state.ride,
      availableSeats: seats,
      passengers: updatedPassenger,
    };
    updateData({ ["/rideDetails/"]: location });
  };

  const retrieveProfilePics = () => {
    let profilePics = ride.passengers.map((passengerId) => (
      <div className="col">
        <img className="profileImages" src={users[passengerId].profilePic} />
      </div>
    ));

    while (profilePics.length < 4) {
      profilePics.push(<div className="col" />);
    }

    return profilePics;
  };

  const populatePassengers = () => {
    let populatePassengers = ride.passengers.map((passengerId) => (
        <div className="passengerCol">
          <img className="profileImages" src={users[passengerId].profilePic} />
            <div className="profileInfo">
                <Card.Title>
                    Name: {users[passengerId].displayName} <br/>
                    Email: {users[passengerId].email} <br/>
                    Address: address test
                </Card.Title>
            </div>
        </div>
      ));
  
      return populatePassengers;
  };

  return (
    <div>
      {typeof users != "undefined" && users != null && (
        <div className="col">
          <Card>
            <Card.Body>
                <div className="addressContainer">
                    <div>
                        Ride Details
                    </div>
                    <Card.Title>
                        Trip to {ride.end.address}, {ride.end.city},{" "}
                        {ride.end.zip}
                        </Card.Title>
                        <Card.Title>
                        Starting from {ride.start.address}, {ride.start.city},{" "}
                        {ride.start.zip}
                        </Card.Title>
                        <Card.Title>
                        On {ride.date} at {ride.time}
                        </Card.Title>
                        <Card.Title>
                        Seats available: {ride.availableSeats}/4
                        </Card.Title>
                </div>
                <div className="col">{populatePassengers()}</div>
            </Card.Body>

          <Button
            class="join"
            onClick={() => handleJoin(user.uid)}>
                Join
            </Button>
            </Card>
        </div>
      )}
    </div>
  );
};

export default RideDetails;
