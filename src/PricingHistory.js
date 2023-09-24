import React from "react";
import Papa from "papaparse";
import csvFile from "./frontend_dataset/coin_Aave.csv";
import { Utils } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function PricingHistory() {
  const f = async () => {
    var data;
    const res = Papa.parse(csvFile, {
      header: true,
      download: true,
      complete: function (results) {
        console.log(results);
        data = results.data;
      },
    });
    console.log(res);
  };
  //
  return (
    <>
      <button onClick={f}>PricingHistory</button>
      <Line
        datasetIdKey="id"
        data={{
          // labels: Utils,
          datasets: [
            {
              id: 1,
              label: "",
              data: [5, 6, 7],
            },
            {
              id: 2,
              label: "",
              data: [3, 2, 1],
            },
          ],
        }}
      />
    </>
  );
}
