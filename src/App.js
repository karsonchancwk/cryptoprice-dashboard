import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import PricingHistory from "./PricingHistory";
import MyPortfolio from "./MyPortfolio";

function App() {
  return (
    <>
      <div className="App col-11 col-lg-10 mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<PricingHistory />} />
          <Route path="/pricingHistory" element={<PricingHistory />} />
          <Route path="/myPortfolio" element={<MyPortfolio />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
