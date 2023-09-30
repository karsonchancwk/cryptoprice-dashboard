import React, { useState, useEffect } from "react";
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
import Cookies from "js-cookie";

import AllCoins from "./frontend_dataset/summary.json";
import AllPrices from "./frontend_dataset/AllPrices.json";

function MyPortfolio() {
  const [record, setRecord] = useState([]);
  const [position, setPosition] = useState([]); // [[coin, amt], [coin, amount],...]

  useEffect(() => {
    const cookie = Cookies.get("record");
    // console.log(cookie);
    if (cookie) {
      const jsoncookie = JSON.parse(cookie);
      setRecord(jsoncookie); // update record from cookie data

      // update position from cookie data
      var tempPos = {};
      for (var r of jsoncookie)
        tempPos[r.coin] =
          (tempPos[r.coin] || 0) + r.amount * (2 * r.action - 1);

      setPosition(tempPos);
    }
  }, []);

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
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // field data checking
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
    // update record and position and cookie after data checking
    else {
      var coin = txLog.coin;
      var txdate = new Date(txLog.txdate).toDateString();
      var priceUSD = parseFloat(
        AllPrices[coin].filter(
          (day) => new Date(day.Date).toDateString() === txdate
        )[0].Close
      );
      var amount = parseFloat(txLog.amount);

      // update record & cookie
      setRecord((p) => {
        const obj = { action: txLog.action, coin, amount, txdate, priceUSD };
        Cookies.set("record", JSON.stringify([obj, ...p]));
        return [obj, ...p];
      });
      // update position
      setPosition((p) => ({
        ...p,
        [coin]: (p[coin] || 0) + amount * (2 * txLog.action - 1),
      }));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-around">
        <div className="col-6 col-sm-7 col-md-8">
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

                {/* Confirm or Cancel */}
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

          {/* Portfolio record */}
          <Table dataSource={record} columns={columns} />
        </div>

        {/* Summary of coins */}
        <Card className="col-5 col-sm-4 col-md-3">
          <Card.Header>Total holdings</Card.Header>

          {record.length ? (
            <ListGroup
              variant="flush"
              style={{ height: "max-content" }}
              className="d-flex flex-column align-items-center mw-100"
            >
              {Object.entries(position) // each coin is [coin name, amt]
                .map(
                  (c) =>
                    c[1] !== 0.0 && (
                      <ListGroup.Item
                        className="px-auto mw-100"
                        style={{ width: "-webkit-fill-available" }}
                      >
                        {c[1] > 0 ? (
                          <Tag color="green">Long</Tag>
                        ) : (
                          <Tag color="red">Short</Tag>
                        )}
                        {c[0]} {Math.abs(c[1])}
                      </ListGroup.Item>
                    )
                )}
            </ListGroup>
          ) : (
            <div className="p-md-2 m-auto text-muted">
              No holdings on record
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default MyPortfolio;
