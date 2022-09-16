//devloper name - Nisha supyal;
//version - 1.0
//description - to route the global menu api
const express = require("express");
const controller = require("../../Contoller/Dashboard/Menu");
const Controller = new controller();
const menu_router = express.Router();

menu_router.get("/Api/Globalmenus", Controller.AttendanceGlobalMenu);


module.exports = menu_router;