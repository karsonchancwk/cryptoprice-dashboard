import React, { useState } from "react";
import {
  Card,
  Form,
  InputGroup,
  Button,
  ButtonGroup,
  ListGroup,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Table, Tag } from "antd";

import AllCoins from "./frontend_dataset/summary.json";
import AllPrices from "./frontend_dataset/AllPrices.json";

function MyPortfolio() {
  const [record, setRecord] = useState([]);

  const [txLog, setTxLog] = useState({
    action: true, // buy: true, sell: false
    coin: "",
    amount: 0.0,
    txdate: "",
  });
  const columns = [
    { title: "Transaction Date", key: "date", dataIndex: "txdate" },
    {
      title: "Buy / Sell",
      key: "action",
      render: (r) =>
        r.action ? <Tag color="green">Buy</Tag> : <Tag color="red">Sell</Tag>,
    },
    { title: "Crypto", key: "coin", dataIndex: "coin" },
    { title: "Amount", key: "amount", dataIndex: "amount" },
    {
      title: "Transaction Rate",
      key: "txrate",
      render: (r) => `1 ${r.coin} = ${r.priceUSD.toFixed(4)} USD`,
    },
    // {
    //   title: "Transaction Amount",
    //   key: "txamt",
    //   render: (r) => `${r.txAmtUSD.toFixed(4)} USD`,
    // },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (txLog.coin === "") alert("Please select your coin");
    else if (parseFloat(txLog.amount) <= 0.0 || isNaN(parseFloat(txLog.amount)))
      alert("Please enter a valid amount");
    else if (
      txLog.txdate === "" ||
      !AllPrices[txLog.coin]
        .map((day) => new Date(day.Date).toDateString())
        .includes(new Date(txLog.txdate).toDateString())
    )
      alert("Please enter a valid transaction date");
    else {
      var txdate = new Date(txLog.txdate).toDateString();
      var priceUSD = parseFloat(
        AllPrices[txLog.coin].filter(
          (day) => new Date(day.Date).toDateString() === txdate
        )[0].Close
      );
      var amount = parseFloat(txLog.amount);
      setRecord((p) => [
        {
          action: txLog.action,
          coin: txLog.coin,
          amount,
          txdate,
          priceUSD,
          // txAmtUSD: priceUSD * amount,
        },
        ...p,
      ]);
    }
  };

  return (
    <div>
      <div className="d-flex gap-4">
        <Button onClick={() => console.log(record)}>Record</Button>
        <div className="flex-grow-1">
          {/* Input field */}
          <Card className="mb-4">
            <Card.Header as="h5">Input your Buy&Sell Record</Card.Header>
            <Form onSubmit={handleSubmit}>
              <Card.Body className="d-flex flex-wrap gap-3 p-4">
                {/* Buy or sell */}

                <ButtonGroup
                  onClick={(e) =>
                    setTxLog((p) => ({ ...p, action: e.target.id === "buy" }))
                  }
                >
                  <Button
                    id="buy"
                    variant={txLog?.action ? "primary" : "light"}
                  >
                    Buy
                  </Button>
                  <Button
                    id="sell"
                    variant={txLog?.action ? "light" : "primary"}
                  >
                    Sell
                  </Button>
                </ButtonGroup>

                {/* Currency & amt */}
                <InputGroup hasValidation style={{ width: "fit-content" }}>
                  {/* Currency */}
                  <Form.Select
                    id="coin"
                    value={txLog?.coin}
                    onChange={(e) =>
                      setTxLog((p) => ({
                        ...p,
                        [e.target.id]: e.target.value,
                      }))
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
                <OverlayTrigger
                  placement="top"
                  overlay={(props) => (
                    <Tooltip {...props}>Transaction date</Tooltip>
                  )}
                >
                  <Form.Control
                    id="txdate"
                    type="date"
                    value={txLog?.txdate}
                    className="me-auto"
                    style={{ width: "fit-content" }}
                    onChange={(e) =>
                      setTxLog((p) => ({
                        ...p,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />
                </OverlayTrigger>

                {/* Confirm / Cancel */}
                <div className="d-inline ms-auto">
                  <Button variant="primary" type="submit">
                    Confirm
                  </Button>
                  <Button
                    variant="light"
                    onClick={() =>
                      setTxLog({
                        action: true,
                        coin: "",
                        amount: 0.0,
                        txdate: "",
                      })
                    }
                  >
                    Cancel
                  </Button>
                </div>
              </Card.Body>
            </Form>
          </Card>

          {/* Portfolio status */}
          <Table dataSource={record} columns={columns} />
        </div>

        {/* Summary of coins */}
        <Card>
          <Card.Header>Total holdings</Card.Header>

          {record.length ? (
            <ListGroup
              variant="flush"
              style={{ minWidth: "12rem", height: "max-content" }}
            >
              {record
                .sort((r1, r2) => r1.amount > r2.amount)
                .map((r) => (
                  <ListGroup.Item>
                    <Tag>{r.action ? "LONG" : "SHORT"}</Tag>
                    {r.coin} {r.amount}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          ) : (
            <div className="text-muted my-auto p-lg-1">
              No holdings on record
            </div>
          )}
        </Card>
        {/* </Card.Body>
        </Card> */}
      </div>
    </div>
  );
}

export default MyPortfolio;
