import React, { useState } from "react";
import Papa from "papaparse";
import csvFile from "./frontend_dataset/coin_Aave.csv";
import csvFile2 from "./frontend_dataset/*.csv";
import Plot from "react-plotly.js";

export default function PricingHistory() {
  const [data, setData] = useState([]);
  const f = async () => {
    Papa.parse(csvFile, {
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
            x: data.map((i) => i.Date),
            y: data.map((i) => i.Close),
            type: "scatter",
            marker: { color: "red" },
          },
        ]}
        // layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
      />
    </>
  );
}
