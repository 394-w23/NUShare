import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Create from "./components/Create";
import Ride from "./components/rides/Ride";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ride" element={<Ride/>} />
          <Route path="/Create" element={<Create/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

