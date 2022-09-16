const express = require("express");
const controller = require("../../Contoller/Authentication/Auth");

const Controllers = new controller();

const Router = express.Router();

Router.post("/Api/Login",Controllers.AttendanceClientLogin);

module.exports = Router ;