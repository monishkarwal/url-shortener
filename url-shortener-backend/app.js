const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Database
const database = require("./database/database");

// Routes
const shortenerRoute = require("./routes/shortener");
const redirectRoute = require("./routes/redirect");

// App Instance
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/", redirectRoute);
app.use("/api/shortener", shortenerRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`[App] : Listening on Port ${PORT}`);
});
