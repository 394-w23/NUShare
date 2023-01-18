import React, { useState } from "react";
import Ride from "../components/rides/Ride";
import { useDbUpdate } from "../utils/firebase";
import { useDbData } from "../utils/firebase";

const Home = () => {
  const [rides] = useDbData("/rides");

  const [updateData] = useDbUpdate("/");

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

  return (
    <div>
      {typeof rides != "undefined" &&
        rides != null &&
        rideArray &&
        rideArray.map((ride, idx) => (
          <div key={idx} className="mb-5">
            <Ride ride={ride[1]} id={ride[0]} />
          </div>
        ))}
    </div>
  );
};

export default Home;
