const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const connectDb = require("./connectDb/connectDb")

app.use(express.static(path.join(__dirname, "../frontend")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

connectDb();

app.listen(process.env.PORT || 4000, () => {
    console.log("Server is running on port 4000");
});
