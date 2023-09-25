import React, { useState } from "react";
import { ListGroup, Form } from "react-bootstrap";
import Papa from "papaparse";
import Plot from "react-plotly.js";

import CSVs from "./frontend_dataset/CSVs";
import AllCoins from "./frontend_dataset/summary.json";

export default function PricingHistory() {
  const [data, setData] = useState([]);
  const [allCoins, setAllCoins] = useState();
  const f = () => {
    Papa.parse(CSVs["AAVE"], {
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
      <div className="d-flex">
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
        <Form onChange={(key) => console.log(key.target.eventkey)}>
          <ListGroup
            title="Select your coin"
            // onSelect={}
            variant="primary"
          >
            {AllCoins.map((i) => (
              <ListGroup.Item>
                <Form.Check
                  className="text-start"
                  type="checkbox"
                  id={i.Symbol}
                  label={`  ${i.Name} (${i.Symbol})`}
                  eventKey={i.Symbol}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Form>
      </div>
    </>
  );
}
