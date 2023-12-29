const express = require("express");
const http_server_app = express();
const cors = require("cors");
const PORT = 5000;
const { connectToDb } = require('./db/db');
const bodyParser = require("body-parser");

//connect to mongodb
connectToDb();

//  Configure the server to accept JSON
http_server_app.use(bodyParser.json());


// listen to port
http_server_app.listen(PORT, () => {
    console.log("Server started");
})

http_server_app.use(cors());

//  mentor & student controlls
http_server_app.use("/API/mentor", require("./controllers/mentor.controller"))
http_server_app.use("/API/student", require("./controllers/student.contoller"))


//      all server status
http_server_app.all("/", (req, res) => {
    return res.status(200).json({
        message: "Request successful"
    })
})