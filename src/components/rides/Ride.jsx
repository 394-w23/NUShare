import React from "react";
import { useDbUpdate } from "../../utils/firebase";
import { signInWithGoogle } from "../../utils/firebase";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useProfile } from "../../utils/userProfile";

const Ride = ({ id, ride }) => {
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");

  const handleJoin = (userId) => {
    const seats = ride.availableSeats;
    const updatedPassenger = ride.passengers;
    updatedPassenger.push(userId)
    const updatedRide = { ...ride, availableSeats: seats - 1, passengers: updatedPassenger };
    updateData({ ["/rides/" + id]: updatedRide });
  };

  const handleLeave = (userId) => {
    const seats = ride.availableSeats + 1;
    const updatedPassenger = ride.passengers;
    for (var i = 0; i < updatedPassenger.length; i++){
      if (updatedPassenger[i] == userId) {
        updatedPassenger.splice(i, 1);
      }
    }
    const updatedRide = { ...ride, availableSeats: seats, passengers: updatedPassenger };
    updateData({ ["/rides/" + id]: updatedRide })
    if (seats === 4){
      updateData({ ["/rides/" + id]: null });
    } 
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
            <Card.Title>Seats available: {ride.availableSeats}/4</Card.Title>
            {user && ride.passengers && ride.passengers.includes(user.uid) && (
              <Button class="join" variant="danger" onClick={() => handleLeave(user.uid)}>
                Leave
              </Button>
            )}
            {user && ride.passengers && !ride.passengers.includes(user.uid) && ride.availableSeats > 0 && (
              <Button class="join" onClick={() => handleJoin(user.uid)}>
                Join
              </Button>
            )}
            {!user && ride.passengers && ride.availableSeats > 0 && (
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
