const { poolconnect } = require("../../Database/Config");
const jwt = require("jsonwebtoken");
require("dotenv").config();


var service = {

    FetchDataWithPhoneNumber: async (data) => {
        try {
            let query = `select [Password] , [PhoneNumber],[UserId],[Dstatus],[EmailId],[UserType] from Attendance_User_Login where [PhoneNumber] = '${data}' `;
            const response = await poolconnect.request().query(query);
            if(response.recordset.length){
            return response;
           }
           else{
            console.log("Connection Error");
           }
        }
        catch (error) {
            console.log(error)
        }
    },
    GenerateToken: async (data) => {
        try {


            let token = jwt.sign(data, process.env.Secret_Key,{expiresIn : "60m"})
            return token
        }
        catch (error) {
            console.log(error)
        }

    },
    UpdateTime: async (data) => {
        try {
            let query = `update Attendance_User_Login  set [LastLogin] = getdate(), [CreatedAt] = getdate() , [UpdatedAt] = getdate() where [userId] = '${data}' `;
            let response = await poolconnect.request().query(query);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    },
    FetchDataWithEmailId: async (data) => {
        try {
            let query = `select [Password],[EmailId],[UserId],[Dstatus],[PhoneNumber], [UserType] from Attandance_User_Login where [EmailId] = '${data}' `;
            const response = await poolconnect.request().query(query);
            return response;
        }
        catch (error) {
            console.log(error)
        }
    },
}
module.exports = service;