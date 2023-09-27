import React, { useState } from "react";
import { Card, Form, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import { Table } from "antd";
import Plot from "react-plotly.js";

import AllCoins from "./frontend_dataset/summary.json";

// Todo: restrain date input, make table
function MyPortfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [txLog, setTxLog] = useState({
    action: true,
    coin: "",
    amount: 0.0,
    txdate: "",
  });
  const columns = [
    { title: "Transaction Date", dataIndex: "date", key: "date" },
    { title: "Crypto", dataIndex: "coin", key: "coin" },
    { title: "Buy / Sell", key: "action", render: (a) => <span>{a}</span> },
    { title: "Amount", dataIndex: "amount", key: "amount" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <div>
      <div className="d-flex">
        <Button onClick={() => console.log(txLog)}>hi</Button>
        {/* <Plotly /> onChange={(c) => console.log(c)}*/}
        <Card>
          <Card.Header as="h5">Input your Buy&Sell Record</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {/* Buy or sell */}
              <ButtonGroup
                onClick={(e) =>
                  setTxLog((p) => ({ ...p, action: e.target.id === "buy" }))
                }
              >
                <Button id="buy" variant={txLog?.action ? "primary" : "light"}>
                  Buy
                </Button>
                <Button id="sell" variant={txLog?.action ? "light" : "primary"}>
                  Sell
                </Button>
              </ButtonGroup>

              {/* Currency & amt */}
              <InputGroup>
                {/* Currency */}
                <Form.Select
                  id="coin"
                  required
                  value={txLog?.coin}
                  onChange={(e) =>
                    setTxLog((p) => ({ ...p, [e.target.id]: e.target.value }))
                  }
                >
                  <option value="">Select your currency</option>
                  {AllCoins.map((i) => (
                    <option value={i.Symbol}>
                      {i.Name} ({i.Symbol})
                    </option>
                  ))}
                </Form.Select>

                {/* Amt */}
                <Form.Control
                  placeholder="0.00"
                  id="amount"
                  value={txLog?.amount}
                  onChange={(e) =>
                    setTxLog((p) => ({
                      ...p,
                      [e.target.id]: e.target.value,
                    }))
                  }
                />
              </InputGroup>

              {/* Tx date */}
              <Form.Control
                required
                id="txdate"
                type="date"
                value={txLog?.txdate}
                placeholder="Transaction date"
                onChange={(e) =>
                  setTxLog((p) => ({
                    ...p,
                    [e.target.id]: e.target.value,
                  }))
                }
              />
              <Button variant="primary" type="submit">
                Confirm
              </Button>
              <Button
                variant="light"
                onClick={() =>
                  setTxLog({ action: true, coin: "", amount: 0.0, txdate: "" })
                }
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <Table />
    </div>
  );
}

export default MyPortfolio;
