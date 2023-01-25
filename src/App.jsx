import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/layout/Header";
import Login from "./pages/auth/Login";
import Create from "./pages/Create";
import Home from "./pages/Home";
import RideDetails from "./components/rides/RideDetails";
import { useProfile } from "./utils/userProfile";

const App = () => {
  const [user] = useProfile();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            user ? (
              <>
                <Header />
                <Home />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/ride/:id"
          element={
            user ? (
              <>
                <Header />
                <RideDetails />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/create-ride"
          element={
            user ? (
              <>
                <Header />
                <Create />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
