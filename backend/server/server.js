const express = require("express");
const itemController = require("../controllers/ItemController");

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ivantest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.get("/api/items", itemController);
app.get("/api/newItem", itemController);