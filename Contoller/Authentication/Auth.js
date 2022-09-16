const service = require("../../Service/Authentication/Auth")
const validation = require("../../Validation/Authentication/Validation/Auth.validation");
const common = require("../../Common/Common");
const CreateError = require("http-errors");


class controller {
    async AttendanceClientLogin(req, res, next) {
        try {
            common.parseJsonRequest(req, async (request) => {
                if (request.Type == 'PhoneNumber') {
                    const result = await validation.LoginWithPhoneNumber(request)
                    if (result.status) {
                        var data = {
                            PhoneNumber: request.PhoneNumber,
                            Password: request.Password,
                        }
                        await service.FetchDataWithPhoneNumber(data.PhoneNumber).then(async (response) => {
                            if (response.recordset.length) {
                                let UserId = response.recordset[0].UserId;
                                let UserType = response.recordset[0].UserType;
                                
                                var payload = {
                                    PhoneNumber: response.recordset[0].PhoneNumber,
                                    EmailId: response.recordset[0].EmailId
                                }
                                if (response.recordset[0].Dstatus == 'V') {
                                    if (response.recordset[0].Password == data.Password) {
                                        let generatedToken = await service.GenerateToken(payload);
                                        if (generatedToken) {
                                            await service.UpdateTime(UserId).then(async (response) => {
                                                if (response.rowsAffected) {
                                                    return res.setHeader("set-cookie", [`Token = ${generatedToken}`,`UserType = ${UserType}`,`UserId = ${UserId}`], { HttpOnly: true }).status(200).json(
                                                        {
                                                            code: '1',
                                                            message: "logged in successfully",
                                                            UserType : UserType,
                                                            Token: generatedToken,
                                                            UserId : UserId
                                                        });
                                                }
                                                else {
                                                    next(CreateError.InternalServerError("something went wrong"));
                                                }
                                            })
                                        }
                                    }
                                    else {
                                        next(CreateError.Unauthorized("invalid password"));
                                    }
                                }
                                else {
                                    next(CreateError.Forbidden("your account has been deactive"));
                                }
                            }
                            else {
                                next(CreateError.Unauthorized("phone Number is not registered"));

                            }
                        })
                    }
                    else {
                        next(CreateError.BadRequest(`${result.response}`));
                    }
                }
                else if (request.Type == 'EmailId') {
                    const result = await validation.LoginWithEmailId(request)
                    if (result.status) {
                        var data_ = {
                            EmailId: request.EmailId,
                            Password: request.Password,
                          
                        }
                        await service.FetchDataWithEmailId(data_.EmailId).then(async (response) => {
                            if (response.recordset.length) {
                                let UserId = response.UserID;
                                let UserType =  response.recordset[0].UserType;
                                var payload = {
                                    PhoneNumber: response.recordset[0].PhoneNumber,
                                    EmailId: response.recordset[0].EmailId
                                }
                                if (response.recordset[0].Dstatus == 'V') {
                                    if (response.recordset[0].Password == data_.Password) {
                                        let generatedToken = await service.GenerateToken(payload);
                                        if (generatedToken) {
                                            await service.UpdateTime(UserId).then(async (response) => {
                                                if (response.rowsAffected) {


                                                    return res.setHeader("set-cookie", [`Token = ${generatedToken}`,`UserType = ${UserType}`,`UserId = ${UserId}`], { HttpOnly: true }).status(200).json(
                                                        {
                                                            code: '1',
                                                            message: "logged in successfully",
                                                            UserType : UserType,
                                                            Token: generatedToken,
                                                            UserId : UserId
                                                        });
                                                }
                                                else {
                                                    next(CreateError.InternalServerError("something went wrong"));
                                                }
                                            })
                                        }
                                    }
                                    else {
                                        next(CreateError.Unauthorized("Invalid Password"));
                                    }
                                }
                                else {
                                    next(CreateError.Forbidden("your account has been deactive"));
                                }
                            }
                            else {
                                next(CreateError.Unauthorized("User is not registered"))
                            }
                        })
                    }
                    else {
                        next(CreateError.BadRequest(`${result.response}`));
                    }
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    //Login API Complete here----s
}
module.exports = controller;