require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const PORT  = 6005;


app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json("server start")
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});