
const express = require("express");
const InOutRouter = express.Router();
const  CheckInOut = require("../../Contoller/Attendance/CheckInChekout");
const InOut = new CheckInOut();
var Middleware = require("../../Common/Middleware/Middleware")

InOutRouter.post("/Api/CheckInOut",Middleware.VerifyToken, InOut.CheckInOut);
InOutRouter.post("/APi/GetDatails",Middleware.VerifyToken,InOut.GetAttendanceDetailsByMonthorAttendanceType);

module.exports = InOutRouter;