
const Schema = require("../../Authentication/Schema/ChechInOut.Scheme")
var CheckInOut = {
    CheckIn: async function (data, res) {
        try {
            const response = Schema.CheckIn.validate(data)
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
    CheckOut: async function (data, res) {
        try {
            const response = Schema.CheckOut.validate(data)
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
    CheckInOut: async function (data, res) {
        try {
            const response = Schema.CheckInOut.validate(data)
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
    
    
}
module.exports = CheckInOut;

