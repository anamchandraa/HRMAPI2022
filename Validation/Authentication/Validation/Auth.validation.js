const Schema = require("../../Authentication/Schema/Auth.Schema")
var User_validation = {
    LoginWithPhoneNumber: async function (data, res) {
        try {
            const response = Schema.UserWithPhoneNumber.validate(data)
            if (response.error) {
                response_data = {
                    code: '0',
                    message: response.error.details[0].message,
                };
                var result = {
                    response: response_data,
                    status: false
                }
                return result;
            }
            else {
                var result = { status: true }
                return result;
            }
        }
        catch (error) {
            console.log(error)
        }
    },
    LoginWithEmailId : async function (data , res)
    {
        try { 
            const response =  Schema.UserWithEmailId.validate(data)
            if (response.error) {
                response_data = {
                    code: '0',
                    message: response.error.details[0].message,
                };
                var result = {
                    response: response_data,
                    status: false
                }
                return result;
            }
            else {
                var result = { status: true }
                return result;
            }
        }
        catch (error){
            console.log(error)

        }
    },
   
    UserType : async function (data){
        try {
            const response =   Schema.UserLoginType.validate(data);
            if (response.error) {
                response_data = {
                    code: '0',
                    message: response.error.details[0].message,
                };
                var result = {
                    response: response_data,
                    status: false
                }
                console.log(result)
                return result;
            }
            else {
                var result = { status: true , data_ : data }
                return result;
            }
        }
        catch(error){
            console.log(error)
        }
    },
}
module.exports = User_validation;