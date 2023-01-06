import React from "react";
import Card from "react-bootstrap/Card";

const Ride = ({ride}) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>
            Trip to {ride.end.address}
          </Card.Title>
          <Card.Title>
            Starting from {ride.start.address}
          </Card.Title>
          <Card.Text>
            Number of seats available: {ride.available_seats}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Ride;
