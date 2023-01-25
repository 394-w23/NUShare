import React from "react";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { FcPlanner, FcClock, FcAutomotive } from "react-icons/fc";
import { BsFillPinMapFill } from "react-icons/bs";
import RideButtons from "./RideButtons";
import { useDbUpdate, useDbData } from "../../utils/firebase";
import { useProfile } from "../../utils/userProfile";
import convertTime from "../../utils/convertTime";

const Ride = ({ id, ride }) => {
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");
  const [users] = useDbData("/users");

  if (!ride) return <h4 className="text-muted">Loading ride...</h4>;
  if (!user) return <h4 className="text-muted">Loading user profile...</h4>;
  if (!users) return <h4 className="text-muted">Loading users...</h4>;

  const handleJoin = (userId) => {
    const seats = ride.availableSeats;
    const updatedPassenger = ride.passengers;
    updatedPassenger.push(userId);
    const updatedRide = {
      ...ride,
      availableSeats: seats - 1,
      passengers: updatedPassenger,
    };
    updateData({ ["/rides/" + id]: updatedRide });
  };

  const handleLeave = (userId) => {
    const seats = ride.availableSeats + 1;
    const updatedPassenger = ride.passengers;
    for (var i = 0; i < updatedPassenger.length; i++) {
      if (updatedPassenger[i] === userId) {
        updatedPassenger.splice(i, 1);
      }
    }
    const updatedRide = {
      ...ride,
      availableSeats: seats,
      passengers: updatedPassenger,
    };
    updateData({ ["/rides/" + id]: updatedRide });
    if (seats === 4) {
      updateData({ ["/rides/" + id]: null });
      updateData({ ["/chats/" + id]: null });
    }
  };

  return (
    <Card bg="light">
      <Card.Header>
        <Card.Title className="ride-header text-muted">
          Destination: {ride.end.address}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text className="ride-pickup-title">
          <BsFillPinMapFill size={28} /> <span> Pickup Location:</span>{" "}
          {ride.start.address}
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
        <Card.Text className="ride-passengers-title text-muted">
          Ride Passengers
        </Card.Text>
        <Card.Text className="ride-passengers-grid">
          {ride.passengers.map((userId, idx) => (
            <div key={idx} className="ride-passengers-container">
              <div className="ride-passengers-image">
                <img
                  src={users[userId].profilePic}
                  referrerPolicy="no-referrer"
                  alt="profile"
                />
              </div>
              <div className="ride-passengers-name text-muted">
                {users[userId].displayName}
              </div>
            </div>
          ))}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <RideButtons
          user={user}
          ride={ride}
          rideId={id}
          handleLeave={handleLeave}
          handleJoin={handleJoin}
        />
      </Card.Footer>
    </Card>
  );
};

export default Ride;
