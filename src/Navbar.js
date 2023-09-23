import React from "react";

function Navbar() {
  return (
    <div className="flex p-3 justify-between" style={{ gap: 13 }}>
      <h1 className="flex-grow" style={{ fontSize: 30 }}>
        Self-study Dashboard Development
      </h1>
      <div style={{ alignSelf: "end" }}>
        {/* <Link href="/pricingHistory">Pricing History</Link> */}
      </div>
      <div style={{ alignSelf: "end" }}>
        {/* <Link href="/myPortfolio">My Portfolio</Link> */}
      </div>
    </div>
  );
}

export default Navbar;
