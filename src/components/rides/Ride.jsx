import React from "react";
import { useDbUpdate, useDbData } from "../../utils/firebase";
<<<<<<< HEAD
import { useProfile } from "../../utils/userProfile";
=======
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase";
>>>>>>> 31a930c (Ride details)
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { FcPlanner, FcClock, FcAutomotive } from "react-icons/fc";
import { FcPlus, FcCancel, FcViewDetails } from "react-icons/fc";
import { BsFillPinMapFill } from "react-icons/bs";

const Ride = ({ id, ride }) => {
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");
  const [users, errorUsers, isLoadingUsers] = useDbData("/users");
  const navigate = useNavigate();

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

  const handleDetails = () => {};

  return (
    <div>
      {typeof users != "undefined" && users != null && (
        <Card bg="light">
          <Card.Header>
            <Card.Title className="ride-header text-muted">
              {endAddress}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text className="ride-pickup-title">
              <BsFillPinMapFill size={28} />
              <span>Pickup Location:</span> {startAddress}
            </Card.Text>
            <Card.Text className="ride-pickup-date text-muted">
              <FcPlanner size={28} />
              <span>Pickup Date:</span>{" "}
              {moment(ride.date).format("dddd, MMM D YYYY")}
            </Card.Text>
            <Card.Text className="ride-pickup-time text-muted">
              <FcClock size={28} />
              <span>Pickup Time:</span> {ride.time}
            </Card.Text>
            <Card.Text className="ride-available-seats text-muted">
              <FcAutomotive size={28} />
              <span>Seats available:</span> {ride.availableSeats} / 4
            </Card.Text>
            <hr />
            <Card.Text className="ride-passengers-title text-muted">
              Ride Passengers
            </Card.Text>
            <Card.Text className="ride-passengers-grid">
              {ride.passengers.map((userId, idx) => (
                <div className="ride-passengers-container">
                  <div className="ride-passengers-image">
                    <img
                      key={idx}
                      src={users[userId].profilePic}
                      alt="profile"
                    />
                  </div>
                  <div className="ride-passengers-name text-muted">
                    {users[userId].displayName}
                  </div>
                </div>
<<<<<<< HEAD
              ))}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              className="ride-button"
              variant="info"
              onClick={handleDetails}
            >
              <Card.Text className="ride-details-button">
                <FcViewDetails className="ride-button-icon" size={28} />
                Details
              </Card.Text>
            </Button>
            {user && ride.passengers && ride.passengers.includes(user.uid) && (
              <Button
                className="ride-button"
                variant="danger"
                onClick={() => handleLeave(user.uid)}
              >
                <Card.Text className="ride-leave-button">
                  <FcCancel className="ride-button-icon" size={28} />
                  Leave
                </Card.Text>
              </Button>
            )}
            {user &&
              ride.passengers &&
              !ride.passengers.includes(user.uid) &&
              ride.availableSeats > 0 && (
                <Button
                  className="ride-button"
                  variant="success"
                  onClick={() => handleJoin(user.uid)}
                >
                  <Card.Text className="ride-join-button">
                    <FcPlus className="ride-button-icon" size={28} />
                    Join
                  </Card.Text>
                </Button>
              )}
          </Card.Footer>
        </Card>
=======
                <div class="col-4">
                  <Card className="profilePics">
                    <div className="row">{retrieveProfilePics()}</div>
                  </Card>
                  <Card className="profilePics">
                    <div className="row"
                        onClick={() => navigate("/rideDetails", {state: {id: user.uid, ride: ride}})}
                      >
                        Check Ride details
                      </div>
                  </Card>
                  <Card>
                    {user &&
                      ride.passengers &&
                      ride.passengers.includes(user.uid) && (
                        <Button
                          class="join"
                          variant="danger"
                          onClick={() => handleLeave(user.uid)}
                        >
                          Leave
                        </Button>
                      )}
                    {user &&
                      ride.passengers &&
                      !ride.passengers.includes(user.uid) &&
                      ride.availableSeats > 0 && (
                        <Button
                          class="join"
                          onClick={() => handleJoin(user.uid)}
                        >
                          Join
                        </Button>
                      )}
                    {!user && ride.passengers && ride.availableSeats > 0 && (
                      <Button class="join" onClick={signInWithGoogle}>
                        Join
                      </Button>
                    )}
                  </Card>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
>>>>>>> 31a930c (Ride details)
      )}
    </div>
  );
};

export default Ride;
