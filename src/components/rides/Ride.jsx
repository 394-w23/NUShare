import React from "react";
import { useDbUpdate, useDbData } from "../../utils/firebase";
import { useProfile } from "../../utils/userProfile";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { FcPlanner, FcClock, FcAutomotive } from "react-icons/fc";
import { BsFillPinMapFill } from "react-icons/bs";
import RideButtons from "./RideButtons";

const Ride = ({ id, ride }) => {
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");
  const [users] = useDbData("/users");

  const startAddress =
    `${ride.start.address}` ===
    "10000 W Balmoral Ave, Chicago, 60666"
      ? "Chicago O'Hare International Airport"
      : `${ride.start.address}`;

  const endAddress =
    `${ride.end.address}` ===
    "10000 W Balmoral Ave, Chicago, 60666"
      ? "Chicago O'Hare International Airport"
      : `${ride.end.address}`;

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
    }
  };

  const convertTime = (time) => {
    var oldFormatTimeArray = time.split(":");

    var HH = parseInt(oldFormatTimeArray[0]);
    var min = oldFormatTimeArray[1];

    var AMPM = HH >= 12 ? "PM" : "AM";
    var hours;
    if(HH == 0){
      hours = HH + 12;
    } else if (HH > 12) {
      hours = HH - 12;
    } else {
      hours = HH;
    }
    var newFormatTime = hours + ":" + min + " " + AMPM;
    return newFormatTime
  }

  return (
    <div>
      {typeof users != "undefined" && users != null && (
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
              handleLeave={handleLeave}
              handleJoin={handleJoin}
            />
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default Ride;
