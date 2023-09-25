import React, { useState } from "react";
import Papa from "papaparse";
import csvFile from "./frontend_dataset/coin_Aave.csv";
import Plot from "react-plotly.js";

export default function PricingHistory() {
  const [data, setData] = useState([]);
  const f = async () => {
    const res = Papa.parse(csvFile, {
      header: true,
      download: true,
      complete: function (results) {
        console.log(results);
        if (results.data) setData(results.data);
      },
    });
  };
  //
  return (
    <>
      <button onClick={f}>PricingHistory</button>
      <button onClick={() => console.log(data)}>What is data</button>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            marker: { color: "red" },
          },
          { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        // layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
      />
    </>
  );
}
