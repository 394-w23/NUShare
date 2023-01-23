import React, { useState } from "react";
import Ride from "../components/rides/Ride";
import { useDbUpdate } from "../utils/firebase";
import { useDbData } from "../utils/firebase";
import Form from "react-bootstrap/Form";

const Home = () => {
  const [rides] = useDbData("/rides");

  const [updateData] = useDbUpdate("/");

  const [searchStart, setSearchStart] = useState('');
  const [searchEnd, setSearchEnd] = useState('');

  let rideArray = [];

  if (typeof rides != "undefined" && rides != null) {
    rideArray = Object.entries(rides);
    let objectDate = new Date();
    var today =
      objectDate.getFullYear() +
      "-" +
      objectDate.getMonth() +
      1 +
      "-" +
      objectDate.getDate();
    
    for (let i = 0; i < rideArray.length; i++) {
      if (rideArray[i][1].date < today) {
        updateData({ ["/rides/" + rideArray[i][0]]: null });
      }
    }

    rideArray.sort((a, b) =>
      a[1].date + " " + a[1].time < b[1].date + " " + b[1].time ? -1 : 1
    );
  }

  const handleToAirport = () => {
		setSearchEnd('10000 W Balmoral Ave')
    setSearchStart('')
	}

  const handleFromAirport = () => {
		setSearchStart('10000 W Balmoral Ave')
    setSearchEnd('')
	}


  const filteredRides = rideArray.filter(
		ride => (!searchStart || (ride[1].start.address === searchStart)) &&
            (!searchEnd || (ride[1].end.address === searchEnd))
		)

  return (
    <div>
      <Form.Text className="text-muted me-4">
          What ride are you looking for?
      </Form.Text>
      <Form.Check
        inline
        label="To Airport"
        name="group1"
        type="radio"
        onClick={() => handleToAirport()}
      />
      <Form.Check
        inline
        label="From Airport"
        name="group1"
        type="radio"
        onClick={() => handleFromAirport()}
      />
      <hr className="mt-3 mb-3" />
      {typeof rides != "undefined" &&
        rides != null &&
        filteredRides &&
        filteredRides.map((ride, idx) => (
          <div key={idx} className="mb-5">
            <Ride ride={ride[1]} id={ride[0]} />
          </div>
        ))}
    </div>
  );
};

export default Home;
