const joi = require("joi")

const Schema = {
    CheckIn: joi.object({
        EmployeeId : joi.string().required(),
   
        InLocation : joi.string().required()
    }),
    CheckOut : joi.object({
        EmployeeId : joi.string().required(),
        OutLocation : joi.string().required(),
       
    }),
    CheckInOut : joi.object({
        EmployeeId : joi.string().required(),
        InLocation : joi.string(),     
        OutLocation : joi.string(),
    })
}
module.exports = Schema;