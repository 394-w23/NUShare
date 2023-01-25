import React from "react";
import { useDbData } from "../../utils/firebase";
import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { BsFillPinMapFill } from "react-icons/bs";
import { FcPlanner, FcClock, FcAutomotive } from "react-icons/fc";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


const RideDetails = () => {
  const location = useLocation();
  const [users] = useDbData("/users");

  const ride = location.state.ride;

  const startAddress = ride.start.address;

  const endAddress = ride.end.address;


  const convertTime = (time) => {
    var oldFormatTimeArray = time.split(":");

    var HH = parseInt(oldFormatTimeArray[0]);
    var min = oldFormatTimeArray[1];

    var AMPM = HH >= 12 ? "PM" : "AM";
    var hours;
    if (HH == 0) {
      hours = HH + 12;
    } else if (HH > 12) {
      hours = HH - 12;
    } else {
      hours = HH;
    }
    var newFormatTime = hours + ":" + min + " " + AMPM;
    return newFormatTime;
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
          <Card.Text>
            Name: {users[passengerId].displayName} <br />
            Email: {users[passengerId].email} <br />
          </Card.Text>
        </div>
      </div>
    ));

    return populatePassengers;
  };

  const navigate = useNavigate();

  return (
    <div className="container mb-5">
      {typeof users != "undefined" && users != null && (
        <div className="col">
          <Card bg="light">
            <Card.Header>
            <Button className="close" variant="danger" onClick={() => navigate("/")}>
                  Close
                </Button>
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
