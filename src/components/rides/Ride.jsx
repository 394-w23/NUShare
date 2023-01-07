import React from "react";
import Card from "react-bootstrap/Card";

const Ride = ({ride}) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Text>
            <Card.Title>
              Trip to {ride.end.address}, {ride.end.city}, {ride.end.zip}
            </Card.Title>
            <Card.Title>
              Starting from {ride.start.address}, {ride.start.city}, {ride.start.zip}
            </Card.Title>
            <Card.Title>
              On {ride.date} at {ride.time}
            </Card.Title>
            <Card.Title>
              Seats available: {ride.available_seats}/3
            </Card.Title>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Ride;
