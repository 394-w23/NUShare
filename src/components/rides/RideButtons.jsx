import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FcPlus, FcCancel, FcViewDetails } from "react-icons/fc";

const RideButtons = ({ user, ride, rideId, handleLeave, handleJoin }) => {
  const navigate = useNavigate();

  return (
    <>
      {user && (
        <>
          {ride.passengers && ride.passengers.includes(user.uid) && (
            <Button
              className="ride-button"
              variant="info"
              onClick={() =>
                navigate("/ride/" + rideId, {
                  state: { id: user.uid, ride: ride, rideId: rideId },
                })
              }
            >
              <Card.Text className="ride-details-button">
                <FcViewDetails className="ride-button-icon" size={28} />
                Details
              </Card.Text>
            </Button>
          )}
          {ride.passengers && ride.passengers.includes(user.uid) && (
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
          {ride.passengers &&
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
        </>
      )}
    </>
  );
};

export default RideButtons;
