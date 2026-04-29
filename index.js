const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const POSTEX_TOKEN = "NzFhNTQ0MDczZDBmNGY3Zjk3NjBmMTg4NGFiNzlhZTM6NWMwYWNkYjk3MDk4NDI2NGIyOWQ5ZDIxMTI0NzY1Mjc=";

app.get("/track/:trackingNumber", async (req, res) => {
  const { trackingNumber } = req.params;
  try {
    const response = await fetch(
      `https://api.postex.pk/services/integration/api/order/v3/get-track-order?trackingNumber=${trackingNumber}`,
      { method: "GET", headers: { "token": POSTEX_TOKEN, "Content-Type": "application/json" } }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "PostEx se connect nahi ho saka" });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "Server chal raha hai!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server port ${PORT} pe chal raha hai`));
