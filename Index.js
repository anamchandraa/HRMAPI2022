/*required packages here !
NAME- NISHA supyal 
created date - 10-09-2022

*/ 

const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require("path");
const AuthRouter = require("./Router/Authentication/Auth");
const MenuRoute = require("./Router/Dashboard/Menu");
const Middleware = require("./Common/Middleware/Middleware");
const cookieParser = require("cookie-parser");
const ip = require("ip");
const InOutRouter = require("./Router/Attendance/CheckInCheckOut");


require("dotenv").config();

const Port = process.env.PORT;

const app = express();
//configuration 
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.json());

app.use("/",AuthRouter);
app.use("/",MenuRoute);
app.use("/",InOutRouter);

app.use(Middleware.Error);
app.use(Middleware.ErrorHandler);
app.listen(Port, () => {
    console.log(`listening on ${Port} and ${ip.address()}`);
});






