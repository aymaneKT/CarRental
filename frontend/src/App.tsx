import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./Pages/Home";
import CarDetails from "./Pages/CarDetails";
import MyBooking from "./Pages/MyBooking";
import Cars from "./Pages/Cars";
import Footer from "./components/Footer";
import Layout from "./Pages/owner/Layout";
import Dashboard from "./Pages/owner/Dashboard";
import AddCar from "./Pages/owner/AddCar";
import ManageCars from "./Pages/owner/ManageCars";
import ManageBookings from "./Pages/owner/ManageBookings";

function App() {
  const isOwner = useLocation().pathname.includes("owner");
  return (
    <>
      {!isOwner && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      {!isOwner && <Footer />}
    </>
  );
}

export default App;
