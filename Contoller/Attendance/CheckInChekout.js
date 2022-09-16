const createHttpError = require("http-errors");
const commonFunctions = require("../../Common/Common")
const CheckInOutService = require("../../Service/Attendance/CheckInCheckOut");
const validation = require("../../Validation/Authentication/Validation/CheckInOut.validation")
const Ip = require("ip");


class CheckInOut {
    async CheckInOut(req, res, next) {
        try {
            commonFunctions.parseJsonRequest(req, (request) => {
                validation.CheckInOut(request).then((result) => {
                    if (result.status) {
                        let EmployeeId = request.EmployeeId;
                        CheckInOutService.GetShift(EmployeeId).then((response) => {
                            if (response.recordset.length) {
                                let InShiftTime = response.recordset[0].InShiftTime;
                                let OutShiftTime = response.recordset[0].OutShiftTime;
                                var dateTime = new Date();
                                var date = JSON.stringify(dateTime).substring(1,11);

                                CheckInOutService.FetchDataWithData(date).then((response) => {
                                    if (response.recordset.length) {
                                        // if out Time     
                                        var data = {
                                            OutTime: request.OutTime,
                                            OutLocation: request.OutLocation,
                                            Date: request.Date,
                                            OutShiftTime: OutShiftTime
                                        }
                                        validation.CheckOut(request).then((response) => {
                                            if (response.status) {
                                                CheckInOutService.InsertOutTime(data).then((response) => {
                                                    if (response.rowsAffected) {
                                                        //
                                                        res.status(200).json({
                                                            code: '1',
                                                            message: "Out Time Inserted Successfully",
                                                        })
                                                    }
                                                    else {
                                                        //internal seerver error
                                                        return next(createHttpError.InternalServerError("internal server error"));
                                                    }
                                                })
                                            }
                                            else {
                                                return next(createHttpError.BadRequest(`${response.response.message}`))
                                            }
                                        })
                                    }
                                    else {
                                        // if, in time
                                        validation.CheckIn(request).then((response) => {
                                            if (response.status) {
                                                var ip = Ip.address();
                                                var data = {
                                                    EmployeeId: request.EmployeeId,
                                                    Date: request.Date,
                                                    InTime: request.InTime,
                                                    WorkingDay: request.Day,
                                                    IpAddress: ip,
                                                    InLocation: request.InLocation,
                                                    InShiftTime: InShiftTime,
                                                }

                                                CheckInOutService.InsertInTime(data).then((response) => {
                                                    if (response.rowsAffected) {
                                                        res.status(200).json({
                                                            code: '1',
                                                            message: "Intime Is Entered Successfully"
                                                        });
                                                    }
                                                    else {
                                                        // internal server error // couldn't insert 
                                                        return next(createHttpError.InternalServerError("internal server error"));
                                                    }
                                                })
                                            }
                                            else {
                                                return next(createHttpError.BadRequest(`${response.response.message}`))
                                            }
                                        })
                                    }
                                })
                            }
                            else {
                                return next(createHttpError.InternalServerError("Interval Server Error"));
                            }
                        })
                    }
                    else {
                        return next(createHttpError.BadRequest(`${result.response.message}`))
                    }
                })
            })
        }
        catch (err) {
            console.log(err);

        }
    }
    async GetAttendanceDetailsByMonthorAttendanceType(req, res, next) {
        try {
            commonFunctions.parseJsonRequest(req, (request) => {
                if (request.AttendanceType == undefined) {
                    // get by month 

                    CheckInOutService.GetAttendancedetailsByMonth(request).then((response) => {
                        if (response.recordset.length) {
                            return res.status(200).json({
                                code: '1',
                                date: response.recordset,
                            })
                        }
                        else {
                            return next(createHttpError.NotFound("Not found"))
                        }
                    })
                }
                else {
                    // get by month with Attendence type
                    CheckInOutService.GetAttendanceDetailsByAttendanceType(request).then((result) => {
                        if (result.recordset.length) {
                            return res.status(200).json({
                                code: '1',
                                date: result.recordset,
                            })
                        }
                        else {
                            return next(createHttpError.NotFound("Not found"))
                        }

                    })


                }


            })

        }
        catch (err) {
            console.log(err);
        }
    }

}
module.exports = CheckInOut;



