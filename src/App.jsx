import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Ride from "./components/rides/Ride";
import Login from "./pages/auth/Login";
import Create from "./pages/Create";
import Home from "./pages/Home";
import RideDetails from "./components/rides/RideDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ride" element={<Ride />} />
          <Route path="/ride/:id" element={<RideDetails />} />
          <Route path="/create-ride" element={<Create />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
