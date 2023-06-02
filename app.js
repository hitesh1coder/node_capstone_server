const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const healthcheck = require("./routes/helthchecker");
const { default: mongoose } = require("mongoose");
const registerRoute = require("./routes/AuthRoutes/RegisterRoutes");
const loginRoute = require("./routes/AuthRoutes/LoginRout");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use("/healthcheck", healthcheck);

app.get("/", (req, res) => {
  res.send("hello server");
});

// routes
app.post("/register", registerRoute);
app.post("/login", loginRoute);
const port = process.env.PORT || 5500;

app.listen(port, () => {
  mongoose
    .connect(process.env.MONGODB_PORT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Server running on port ${port} and DB connected`);
    })
    .catch((err) => console.log("connection error: " + err));
});
