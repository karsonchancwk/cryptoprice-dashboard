import React, { useState } from "react";
import { ListGroup, Form, Button } from "react-bootstrap";
import Plot from "react-plotly.js";

import AllCoins from "./frontend_dataset/summary.json";
import data from "./frontend_dataset/AllPrices.json";

const colors = {
  AAVE: "#8ecae6",
  BNB: "#fb413c",
  BTC: "#023047",
  ADA: "#ffb703",
  LINK: "#fb8500",
  ATOM: "#355070",
  CRO: "#6d597a",
  DOGE: "#af9770",
  EOS: "#e56b6f ",
  ETH: "#eaac8b",
  MIOTA: "#ef476f",
  LTC: "#bfd166",
  XMR: "#06d6a0 ",
  XEM: "#118ab2",
  DOT: "#073bac",
  SOL: "#f79256",
  XLM: "#fbd1a2",
  USDT: "#7dcfb6",
  TRX: "#00b2ca",
  UNI: "#1d4e89",
  USDC: "#d81159",
  WRTC: "#8f2d56",
  XRP: "#218380",
};

// info about the graph
const layout = {
  title: "Price History",
  xaxis: {
    range: ["2013-04-29", "2021-07-06"],
    rangeselector: {
      buttons: [
        { count: 10, step: "day", label: "1 Day", stepmode: "backward" },
        { count: 3, step: "month", label: "3 Months", stepmode: "backward" },
        { count: 1, step: "year", label: "1 Year", stepmode: "backward" },
      ],
    },
    rangeslider: { range: ["2013-04-29", "2021-07-06"] },
    type: "date",
  },
  yaxis: { autorange: true, type: "log" },
  height: 600,
  width: "max-width",
};

export default function PricingHistory() {
  const [selectedCoins, setSelectedCoins] = useState([]); // the symbols of the checked coin

  return (
    <div className="d-flex">
      <div className="flex-grow-1 col-6 col-md-8">
        <Plot
          data={selectedCoins.map((coin) =>
            Object({
              x: data[coin].map((i) => i.Date),
              y: data[coin].map((i) => i.Close),
              yaxis: "10^y",
              type: "line",
              name: coin,
              marker: { color: colors[coin] },
            })
          )}
          layout={layout}
        />
      </div>

      {/* Select your coin */}
      <Form
        className="col-5 col-md-3 mt-4"
        onChange={(c) => {
          console.log(c.target.id); // the coin symbol
          setSelectedCoins(
            (p) =>
              p.includes(c.target.id) // if the updated item is in the array
                ? p.filter((i) => i !== c.target.id) // remove it from the
                : [...p, c.target.id] // add it to the array
          );
        }}
      >
        <ListGroup
          variant="primary"
          style={{ height: 400, overflowY: "scroll" }}
          className="mb-3"
        >
          {AllCoins.map((i) => (
            <ListGroup.Item>
              <Form.Check
                className="text-start"
                type="checkbox"
                id={i.Symbol}
                label={`  ${i.Name} (${i.Symbol})`}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button onClick={() => setSelectedCoins([])}>Uncheck all</Button>
      </Form>
    </div>
  );
}
