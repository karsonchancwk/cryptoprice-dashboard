import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import PricingHistory from "./PricingHistory";
import MyPortfolio from "./MyPortfolio";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<PricingHistory />} />
          <Route path="/pricingHistory" element={<PricingHistory />} />
          <Route path="/myPortfolio" element={<MyPortfolio />} />
        </Routes>
      </div>
    </>

    // <header className="App-header">
    //
    //   <img src={logo} className="App-logo" alt="logo" />
    //   <p>
    //     Edit <code>src/App.js</code> and save to reload.
    //   </p>
    //   <a
    //     className="App-link"
    //     href="https://reactjs.org"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     Learn React
    //   </a>
    // </header>
  );
}

export default App;
