import React from "react";
import { useDbUpdate } from "../../utils/firebase";
import { signInWithGoogle } from "../../utils/firebase";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useProfile } from "../../utils/userProfile";

const Ride = ({ id, ride }) => {
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");

  const handleJoin = () => {
    const seats = ride.availableSeats;
    const updatedRide = { ...ride, availableSeats: seats - 1 };
    updateData({ ["/rides/" + id]: updatedRide });
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Text>
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
            <Card.Title>Seats available: {ride.availableSeats}/3</Card.Title>
            {user && user.uid === ride.creator && (
              <Button class="join" variant="danger">
                Cancel
              </Button>
            )}
            {user && user.uid !== ride.creator && ride.availableSeats > 0 && (
              <Button class="join" onClick={handleJoin}>
                Join
              </Button>
            )}
            {!user && ride.availableSeats > 0 && (
              <Button class="join" onClick={signInWithGoogle}>
                Join
              </Button>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Ride;
