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
  const [rides, errorRides, isLoadingRides] = useDbData("/rides")
  console.log(rides);
  
  return (
    <div>
      <h1>NUShare</h1>
      
      { typeof(rides) != 'undefined' && rides != null && Object.values(rides).map(ride => <Ride ride={ride}/>)}
      <button onClick={CreateRide}>Create Ride</button>
    </div>
    );
};

const CreateRide = () => {
  window.location.href = "/Create";
}

export default Home;