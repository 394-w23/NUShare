import React from "react";
import { useDbUpdate, useDbData } from "../../utils/firebase";
import { signInWithGoogle } from "../../utils/firebase";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useProfile } from "../../utils/userProfile";
import "../../styles/rides.css";

const Ride = ({ id, ride }) => {
  const [user] = useProfile();
  const [updateData] = useDbUpdate("/");
  const [users, errorUsers, isLoadingUsers] = useDbData("/users");

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
      if (updatedPassenger[i] == userId) {
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

  const retrieveProfilePics = () => {
    let profilePics = ride.passengers.map((passengerId) => (
      <div className="col">
        <img className="profileImages" src={users[passengerId].profilePic} />
      </div>
    ));

    while (profilePics.length < 4) {
      profilePics.push(<div className="col" />);
    }

    return profilePics;
  };

  return (
    <div>
      {typeof users != "undefined" && users != null && (
        <div className="row">
          <Card>
            <Card.Body>
              <div className="row">
                <div className="col-8">
                  <Card.Text>
                    <Card.Title>
                      Trip to {ride.end.address}, {ride.end.city},{" "}
                      {ride.end.zip}
                    </Card.Title>
                    <Card.Title>
                      Starting from {ride.start.address}, {ride.start.city},{" "}
                      {ride.start.zip}
                    </Card.Title>
                    <Card.Title>
                      On {ride.date} at {ride.time}
                    </Card.Title>
                    <Card.Title>
                      Seats available: {ride.availableSeats}/4
                    </Card.Title>
                  </Card.Text>
                </div>
                <div class="col-4">
                  <Card className="profilePics">
                    <div className="row">{retrieveProfilePics()}</div>
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
      )}
    </div>
  );
};

export default Ride;
