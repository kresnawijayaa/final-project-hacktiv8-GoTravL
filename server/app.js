require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ErrorHandler } = require("./middlewares");
const router = require("./routes");
const app = express();
const port = 3099;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server Running",
  });
});
app.use(router);

app.listen(port, () => {
  console.log(`listen to http://localhost:${port}`);
});

app.use(ErrorHandler);
