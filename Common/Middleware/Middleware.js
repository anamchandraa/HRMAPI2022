const jwt = require("jsonwebtoken");
const CreateError = require("http-errors");

require("dotenv").config();
var Middleware = {
    VerifyToken: async (req, res, next) => {
        if (!req.headers['authorization']) {
            return next(CreateError.Unauthorized("UnAuthorized"));
        }
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const Token = bearerToken[1];
        try {
            
            jwt.verify(Token, process.env.Secret_key, (err, payload) => {
                // console.log(err);
                if (err) {
                    return next(CreateError.Unauthorized("UnAuthorized"));
                }
                req.payload = payload;
                next();
            })
        }
        catch (err) {
            console.log(err);
        }


    },
    Error: async (req, res, next) => {

        // const error = new  Error("not found");
        // error.status = 404
        // next(error)
        next(CreateError.NotFound("this is not the valid route"));
    },
    ErrorHandler: async (err, req, res, next) => {
        res.status(err.status || 500);
        res.send({
            error: {
                status: err.status || 500,
                message: err.message
            }
        })
    },
    
}



module.exports = Middleware;

