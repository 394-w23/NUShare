import React, { useState } from "react";
import Ride from "../components/rides/Ride";
import { useDbData } from "../utils/firebase";

// const rides = [{
//   start: {address: "2145 Sheridan Rd",
//           city: "evanston",
//           zip: "60201"},
//   end: {address: "West O'hare Ave",
//         city: "Chicago",
//         zip: "60666"},
//   date: Date.now(),
//   time: "8:00",
//   available_seats: 3},
//   {
//     start: {address: "2145 Sheridan Rd",
//             city: "evanston",
//             zip: "60201"},
//     end: {address: "West O'hare Ave",
//           city: "Chicago",
//           zip: "60666"},
//     date: Date.now(),
//     time: "8:00",
//     available_seats: 3},
//     {
//   start: {address: "2145 Sheridan Rd",
//           city: "evanston",
//           zip: "60201"},
//   end: {address: "West O'hare Ave",
//         city: "Chicago",
//         zip: "60666"},
//   date: Date.now(),
//   time: "8:00",
//   available_seats: 3}
// ];

const Home = () => {
  const [rides, errorRides, isLoadingRides] = useDbData("/rides");

  return (
    <div>
      {typeof rides != "undefined" &&
        rides != null &&
        Object.entries(rides).map(([key, value]) => (
          <div className="mb-3">
            <Ride ride={value} id={key} />
          </div>
        ))}
    </div>
  );
};

export default Home;
