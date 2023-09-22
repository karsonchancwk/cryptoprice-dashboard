import React from "react";
import Link from "next/link";

export default function Navbar() {
  console.log("this is a navbar");
  return (
    <div className="d-flex justify-between">
      <div>Self-study Dashboard Development</div>
      <div>
        <Link href="/pricingHistory">Pricing History</Link>
        <Link href="/myPortfolio">My Portfolio</Link>
      </div>
    </div>
  );
}
