const joi = require("joi")

const Schema = {
    UserWithPhoneNumber: joi.object({
        PhoneNumber: joi.string().max(10).required(),
        Password : joi.string().required(),
        Type : joi.string().required(),

    }),
    UserWithEmailId : joi.object({
        EmailId  : joi.string().required(),
        Password  : joi.string().required(),
        Type : joi.string().required(),

    }),
   
    UserLoginType : joi.object({
        Type : joi.string().valid("PhoneNumber" , "EmailId").required(),
        UserId:joi.string(),
        EmailId : joi.string(),
        PhoneNumber:joi.string(),
        Password : joi.string(),
    })
}
module.exports = Schema;