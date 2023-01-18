import React, { useState } from "react";
import { useDbUpdate, useDbData } from "../../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useProfile } from "../../utils/userProfile";

const RideDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");
  const [users] = useDbData("/users");

  const [joinButton, setJoinButton] = useState(false);
  const ride = location.state.ride;

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
    <div>
      {typeof users != "undefined" && users != null && (
        <div className="col">
          <Card>
            <Card.Body>
              <Button class="back" onClick={() => navigate("/")}>
                Return
              </Button>
              <div className="addressContainer">
                <Card.Title>Ride Details</Card.Title>
                <Card.Title>
                  Trip to {ride.end.address}, {ride.end.city}, {ride.end.zip}
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
              {/* {joinButton && ride.availableSeats > 0 && (
                <Button
                className="join"
                onClick={() => handleJoin(user.uid)}>
                    Join
                </Button>
            )}
            {!joinButton && ride.availableSeats > 0 && (
                <Button
                className="leave"
                variant="danger"
                onClick={() => handleLeave(user.uid)}>
                    Leave
                </Button>
            )} */}
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RideDetails;
