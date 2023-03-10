import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BsFillPinMapFill } from "react-icons/bs";
import { FcPlanner, FcClock, FcAutomotive, FcSms } from "react-icons/fc";
import moment from "moment";
import { useDbData } from "../../utils/firebase";
import convertTime from "../../utils/convertTime";

const RideDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [users] = useDbData("/users");

  const ride = location.state.ride;
  const rideId = location.state.rideId;
  const userId = location.state.id;

  const handleChatButton = () => {
    navigate("/chat/" + rideId);
  };

  const populatePassengers = () => {
    let populatePassengers = ride.passengers.map((passengerId, idx) => (
      <div key={idx} className="passenger-col">
        <img
          className="profile-images"
          referrerPolicy="no-referrer"
          src={users[passengerId].profilePic}
        />
        <div className="profile-info">
          <Card.Text className="text-muted">
            <span>Name:</span> {users[passengerId].displayName} <br />
            <span>Email:</span> {users[passengerId].email} <br />
          </Card.Text>
        </div>
      </div>
    ));

    return populatePassengers;
  };

  return (
    <div className="container mb-5">
      {typeof users != "undefined" && users != null && (
        <div className="col">
          <Card bg="light">
            <Card.Header>
              <Button
                className="close"
                variant="danger"
                data-cy="close-button"
                onClick={() => navigate("/")}
              >
                Close
              </Button>
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
                {ride.availableSeats} / {ride.totalSeats}
              </Card.Text>
              <hr />
              <Button
                size="md"
                className="chat-button"
                variant="success"
                data-cy="chat-button"
                onClick={handleChatButton}
              >
                <FcSms size={28} /> Chat Board
              </Button>
            </Card.Body>
            <Card.Footer>
              <div className="col">{populatePassengers()}</div>
            </Card.Footer>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RideDetails;
