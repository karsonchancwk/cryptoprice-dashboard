import React, { useState, useEffect } from "react";
import { ListGroup, Form, Button, ButtonGroup } from "react-bootstrap";
import Papa from "papaparse";
import Plot from "react-plotly.js";

import CSVs from "./frontend_dataset/CSVs";
import AllCoins from "./frontend_dataset/summary.json";

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

// TODO:
// make the graph exp
// adjust time horizons
// scroll down for the list box

export default function PricingHistory() {
  const [data, setData] = useState({});
  const [selectedCoins, setSelectedCoins] = useState([]); // the symbols of the checked coin

  useEffect(() => {
    AllCoins.map((i) =>
      Papa.parse(CSVs[i.Symbol], {
        header: true,
        download: true,
        complete: (r) => {
          if (r?.data) {
            let temp = data;
            temp[i.Symbol] = r.data;
            setData(temp);
          }
        },
      })
    );
  }, []);

  return (
    <>
      <button onClick={() => console.log(data)}>What is data</button>
      <div className="d-flex">
        <div>
          <Plot
            data={selectedCoins.map((coin) =>
              Object({
                x: data[coin].map((i) => i.Date),
                y: data[coin].map((i) => i.Close),
                type: "scatter",
                marker: {
                  color: colors[Math.floor(Math.random() * colors.length)],
                },
              })
            )}
            // layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
          />
          <ButtonGroup></ButtonGroup>
        </div>
        <Form
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
          <ListGroup title="Select your coin" variant="primary">
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
    </>
  );
}
