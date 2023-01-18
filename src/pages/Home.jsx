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

  let rideArray = []

  if (typeof rides != "undefined" && rides != null){
    rideArray = Object.entries(rides)
    let objectDate = new Date()
    var today = objectDate.getFullYear() + "-" + objectDate.getMonth() + 1 + "-" + objectDate.getDate()
    for (let i = 0; i < rideArray.length; i++){
      if (rideArray[i][1].date < today){
        // remove from db
      }
    }
    
    rideArray.sort((a, b) => (a[1].date + " " + a[1].time < b[1].date + " " + b[1].time ? -1 : 1))

  }
  
  return (
    <div>
      {typeof rides != "undefined" &&
        rides != null &&
        rideArray &&
        rideArray.map(ride => (
          <div className="mb-5">
            <Ride ride={ride[1]} id={ride[0]} />
          </div>
        ))}
    </div>
  );
};

export default Home;
