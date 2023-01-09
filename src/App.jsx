import { BrowserRouter, Routes, Route } from "react-router-dom";

import Create from "./components/Create";
import Header from "./components/layout/Header";
import Ride from "./components/rides/Ride";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ride" element={<Ride />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
