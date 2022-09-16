var commonFunctions = {
    parseJsonRequest: function (request, callback) {
        try {
            if (request.body) {
                callback(request.body);
            } else {
                callback({});
            }
        } catch (err) {
            console.log(err)
            callback({});
        }
    },
    sendJSONResponse: function (res, responsecode, responsemessage, responsedata) {
        if (responsedata !== null) {
           var response_data = {
                code: responsecode,
                message: responsemessage,
                data: responsedata
            };
            res.status(200).json(response_data);
        } else {
            response_data = {
                code: responsecode,
                message: responsemessage
            };
            res.status(200).json(response_data);
        }
    },
}

module.exports = commonFunctions;