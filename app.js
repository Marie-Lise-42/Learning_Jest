const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json("Hello the world!");
});

app.listen(3000, () => {
    console.log("Server is now running on port 3000!");
});