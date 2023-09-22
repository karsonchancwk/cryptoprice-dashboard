import React from "react";
import Link from "next/link";

export default function Navbar() {
  console.log("this is a navbar");
  return (
    <div className="flex p-3 justify-between" style={{ gap: 13 }}>
      <h1 className="flex-grow" style={{ fontSize: 30 }}>
        Self-study Dashboard Development
      </h1>
      <div style={{ alignSelf: "end" }}>
        <Link href="/pricingHistory">Pricing History</Link>
      </div>
      <div style={{ alignSelf: "end" }}>
        <Link href="/myPortfolio">My Portfolio</Link>
      </div>
    </div>
  );
}
