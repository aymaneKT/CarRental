import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./Pages/Home";
import CarDetails from "./Pages/CarDetails";
import MyBooking from "./Pages/MyBooking";
import Cars from "./Pages/Cars";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="car-details/:id" element={<CarDetails />} />
        <Route path="my-bookings" element={<MyBooking />} />
        <Route path="cars" element={<Cars />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
