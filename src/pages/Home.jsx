import React from "react";
import Ride from "../components/rides/Ride";

const rides = [{
  start: {address: "2145 Sheridan Rd", 
          city: "evanston",
          zip: "60201"},
  end: {address: "West O'hare Ave", 
        city: "Chicago",
        zip: "60666"},
  date: Date.now(),
  time: "8:00",
  available_seats: 3,
  
}];

const Home = () => {
  return (
    <div>
      <h1>NUShare</h1>
      
      <Ride ride={rides[0]} />
    </div>
  );
};



export default Home;

