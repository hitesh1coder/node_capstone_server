const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile("hello server");
});
const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
